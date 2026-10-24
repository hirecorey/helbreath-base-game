import type { Scene } from 'phaser';
import type { HBMap } from '../game/assets/HBMap';
import { TILE_SIZE } from '../game/assets/HBMap';
import { Direction, getDirectionOffset } from './CoordinateUtils';
import { EventBus } from '../game/EventBus';
import { OUT_UI_MINIMAP_FOG_UPDATED } from '../constants/EventNames';
import type { MinimapFogUpdatedEvent } from '../Types';
import {
    VISION_EDGE_SOFTNESS_TILES,
    VISION_EXPLORED_DARKNESS,
    VISION_FOG_DEPTH,
    VISION_RANGE_BEHIND_TILES,
    VISION_RANGE_FORWARD_TILES,
    VISION_SHAPE_EXPONENT,
    VISION_TURN_SMOOTHING_MS,
} from '../Config';

/** Game objects with this name are never hidden by vision (e.g. screen-wide weather particles) */
export const VISION_EXEMPT_NAME = 'vision-exempt';

const EXPLORATION_STORAGE_PREFIX = 'exploration:';

/** How often explored tiles are saved while playing, in ms (also saved when leaving the map) */
const EXPLORATION_SAVE_INTERVAL_MS = 3000;

/** How often the minimap is told the fog changed while the player moves, in ms */
const MINIMAP_UPDATE_INTERVAL_MS = 250;

/** Farthest tile distance from the player that can be (partly) visible */
const MAX_VISION_TILES = VISION_RANGE_FORWARD_TILES + VISION_EDGE_SOFTNESS_TILES / 2 + 1;

type TileRect = { x0: number; y0: number; x1: number; y1: number };

/**
 * Directional vision and fog of war for one map.
 *
 * Every tile is in one of three states: currently visible (clear), explored (dimmed terrain) or unexplored (black).
 * The fog is a texture with one pixel per tile, stretched over the map with linear filtering so state edges
 * blend smoothly. Only the area around the player is recomputed, and only when the player moves or turns.
 *
 * Dynamic objects (spell effects, projectiles, floating text) added to the scene after the map was set up are
 * hidden outside current vision; monsters, NPCs and ground items are handled by GameWorld with isVisibleAt().
 */
export class VisionManager {
    private readonly scene: Scene;
    private readonly sizeX: number;
    private readonly sizeY: number;
    private readonly storageKey: string;
    private readonly textureKey: string;
    private readonly texture: Phaser.Textures.CanvasTexture;
    private readonly image: Phaser.GameObjects.Image;
    private readonly pixels: ImageData;
    /** 1 for every tile the player has seen */
    private readonly explored: Uint8Array;
    private exploredDirty = false;
    private msSinceSave = 0;
    /** Fog changed since the minimap was last notified */
    private minimapDirty = false;
    private msSinceMinimapUpdate = 0;

    /** Player position in tile units (tile centers are whole numbers) */
    private centerX = 0;
    private centerY = 0;
    /** Smoothed facing as a unit vector, and the direction it is turning toward */
    private facingX = 0;
    private facingY = 1;
    private targetFacingX = 0;
    private targetFacingY = 1;
    /** Tiles written in the last fog update, so tiles that leave vision get re-dimmed */
    private lastRect: TileRect | undefined = undefined;
    private hasRendered = false;

    /** Game objects added after the map was set up; candidates for hiding outside vision */
    private readonly dynamicObjects = new Set<Phaser.GameObjects.GameObject>();
    /** Dynamic objects this manager hid, so only those are shown again */
    private readonly hiddenByVision = new WeakSet<Phaser.GameObjects.GameObject>();
    private readonly onAddedToScene = (gameObject: Phaser.GameObjects.GameObject) => {
        this.dynamicObjects.add(gameObject);
    };
    private readonly onRemovedFromScene = (gameObject: Phaser.GameObjects.GameObject) => {
        this.dynamicObjects.delete(gameObject);
    };

    /**
     * @param scene - Scene the fog is drawn in
     * @param map - Loaded map (for its size)
     * @param explorationKey - Key exploration is saved under (the world id, or the map file when no world uses it)
     */
    constructor(scene: Scene, map: HBMap, explorationKey: string) {
        this.scene = scene;
        this.sizeX = map.sizeX;
        this.sizeY = map.sizeY;
        this.storageKey = EXPLORATION_STORAGE_PREFIX + explorationKey;
        this.explored = this.loadExplored();

        this.textureKey = `vision-fog-${explorationKey}-${Date.now()}`;
        const texture = scene.textures.createCanvas(this.textureKey, this.sizeX, this.sizeY);
        if (!texture) {
            throw new Error('[VisionManager] Failed to create fog texture');
        }
        this.texture = texture;
        const context = this.texture.getContext();
        this.pixels = context.createImageData(this.sizeX, this.sizeY);
        for (let i = 0; i < this.explored.length; i++) {
            this.pixels.data[i * 4 + 3] = this.getDarkness(i, 0);
        }
        context.putImageData(this.pixels, 0, 0);
        this.refreshTexture();

        this.image = scene.add.image(0, 0, this.textureKey)
            .setOrigin(0, 0)
            .setScale(TILE_SIZE)
            .setDepth(VISION_FOG_DEPTH)
            .setName(VISION_EXEMPT_NAME);

        scene.sys.events.on(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene);
        scene.sys.events.on(Phaser.Scenes.Events.REMOVED_FROM_SCENE, this.onRemovedFromScene);

        this.minimapDirty = true;
    }

    /**
     * Moves and turns the vision area, reveals tiles and updates the fog. Call every frame.
     *
     * @param pixelX - Player's animated center in world pixels
     * @param pixelY - Player's animated center in world pixels
     * @param direction - Direction the player is facing
     */
    public update(delta: number, pixelX: number, pixelY: number, direction: Direction): void {
        if (direction !== Direction.None) {
            const [dx, dy] = getDirectionOffset(direction);
            const length = Math.hypot(dx, dy);
            this.targetFacingX = dx / length;
            this.targetFacingY = dy / length;
        }

        const previousCenterX = this.centerX;
        const previousCenterY = this.centerY;
        const previousFacingX = this.facingX;
        const previousFacingY = this.facingY;
        this.centerX = pixelX / TILE_SIZE - 0.5;
        this.centerY = pixelY / TILE_SIZE - 0.5;
        if (this.hasRendered) {
            this.turnFacing(delta);
        } else {
            this.facingX = this.targetFacingX;
            this.facingY = this.targetFacingY;
        }

        const changed = !this.hasRendered ||
            Math.abs(this.centerX - previousCenterX) > 0.01 || Math.abs(this.centerY - previousCenterY) > 0.01 ||
            Math.abs(this.facingX - previousFacingX) > 0.001 || Math.abs(this.facingY - previousFacingY) > 0.001;
        if (changed) {
            this.renderAroundPlayer();
        }

        this.msSinceSave += delta;
        if (this.exploredDirty && this.msSinceSave >= EXPLORATION_SAVE_INTERVAL_MS) {
            this.saveExplored();
        }

        this.msSinceMinimapUpdate += delta;
        if (this.minimapDirty && (this.msSinceMinimapUpdate >= MINIMAP_UPDATE_INTERVAL_MS || delta === 0)) {
            this.minimapDirty = false;
            this.msSinceMinimapUpdate = 0;
            EventBus.emit(OUT_UI_MINIMAP_FOG_UPDATED, { canvas: this.texture.getCanvas() } satisfies MinimapFogUpdatedEvent);
        }
    }

    /**
     * Whether a world pixel position is currently visible to the player (inside the vision area).
     */
    public isVisibleAt(pixelX: number, pixelY: number): boolean {
        return this.getVisibility(pixelX / TILE_SIZE - 0.5, pixelY / TILE_SIZE - 0.5) >= 0.5;
    }

    /**
     * Hides dynamic objects (effects, projectiles, floating text) outside current vision and shows them again
     * when they come into view. Objects in `managedElsewhere` (monsters, NPCs, items, the player) are skipped.
     */
    public updateDynamicObjects(managedElsewhere: Set<Phaser.GameObjects.GameObject>): void {
        for (const gameObject of this.dynamicObjects) {
            if (!gameObject.scene) {
                this.dynamicObjects.delete(gameObject);
                continue;
            }
            // Graphics draw in world coordinates from (0, 0), so their position says nothing about where they are
            if (managedElsewhere.has(gameObject) || gameObject.name === VISION_EXEMPT_NAME ||
                !(gameObject instanceof Phaser.GameObjects.Sprite ||
                    gameObject instanceof Phaser.GameObjects.Image ||
                    gameObject instanceof Phaser.GameObjects.Text)) {
                continue;
            }
            const visible = this.isVisibleAt(gameObject.x, gameObject.y);
            if (!visible && gameObject.visible) {
                gameObject.setVisible(false);
                this.hiddenByVision.add(gameObject);
            } else if (visible && this.hiddenByVision.has(gameObject)) {
                gameObject.setVisible(true);
                this.hiddenByVision.delete(gameObject);
            }
        }
    }

    /**
     * Saves exploration and removes the fog.
     */
    public destroy(): void {
        if (this.exploredDirty) {
            this.saveExplored();
        }
        this.scene.sys.events.off(Phaser.Scenes.Events.ADDED_TO_SCENE, this.onAddedToScene);
        this.scene.sys.events.off(Phaser.Scenes.Events.REMOVED_FROM_SCENE, this.onRemovedFromScene);
        this.dynamicObjects.clear();
        EventBus.emit(OUT_UI_MINIMAP_FOG_UPDATED, { canvas: undefined } satisfies MinimapFogUpdatedEvent);
        this.image.destroy();
        this.scene.textures.remove(this.textureKey);
    }

    /** Swings the facing toward the target direction over VISION_TURN_SMOOTHING_MS */
    private turnFacing(delta: number): void {
        const t = Math.min(1, delta / VISION_TURN_SMOOTHING_MS);
        let x = this.facingX + (this.targetFacingX - this.facingX) * t;
        let y = this.facingY + (this.targetFacingY - this.facingY) * t;
        if (Math.hypot(x, y) < 0.01) {
            // Turning exactly around: swing through the side instead of collapsing through zero
            x = this.facingX - this.facingY * 0.1;
            y = this.facingY + this.facingX * 0.1;
        }
        const length = Math.hypot(x, y);
        this.facingX = x / length;
        this.facingY = y / length;
    }

    /**
     * Visibility of a tile position from the player: 1 = clearly visible, 0 = not visible, in between = soft edge.
     * The range is an egg shape: VISION_RANGE_BEHIND_TILES behind, growing to VISION_RANGE_FORWARD_TILES ahead.
     */
    private getVisibility(tileX: number, tileY: number): number {
        const dx = tileX - this.centerX;
        const dy = tileY - this.centerY;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.001) {
            return 1;
        }
        // Clamped: rounding can push the cosine just past -1 or 1, and a fractional power of a negative number is NaN
        const alignment = Math.min(1, Math.max(0, (1 + (dx * this.facingX + dy * this.facingY) / distance) / 2));
        const range = VISION_RANGE_BEHIND_TILES +
            (VISION_RANGE_FORWARD_TILES - VISION_RANGE_BEHIND_TILES) * Math.pow(alignment, VISION_SHAPE_EXPONENT);
        return Math.min(1, Math.max(0, (range - distance) / VISION_EDGE_SOFTNESS_TILES + 0.5));
    }

    /** Fog alpha (0-255) for a tile index: unexplored is black, explored is dimmed, and vision clears either */
    private getDarkness(tileIndex: number, visibility: number): number {
        const base = this.explored[tileIndex] ? VISION_EXPLORED_DARKNESS : 1;
        return Math.round(base * (1 - visibility) * 255);
    }

    /** Recomputes fog and exploration for tiles around the player (and those the last update touched) */
    private renderAroundPlayer(): void {
        const current: TileRect = {
            x0: Math.max(0, Math.floor(this.centerX - MAX_VISION_TILES)),
            y0: Math.max(0, Math.floor(this.centerY - MAX_VISION_TILES)),
            x1: Math.min(this.sizeX - 1, Math.ceil(this.centerX + MAX_VISION_TILES)),
            y1: Math.min(this.sizeY - 1, Math.ceil(this.centerY + MAX_VISION_TILES)),
        };
        const rect = this.lastRect ? {
            x0: Math.min(current.x0, this.lastRect.x0),
            y0: Math.min(current.y0, this.lastRect.y0),
            x1: Math.max(current.x1, this.lastRect.x1),
            y1: Math.max(current.y1, this.lastRect.y1),
        } : current;
        this.lastRect = current;

        const data = this.pixels.data;
        for (let y = rect.y0; y <= rect.y1; y++) {
            for (let x = rect.x0; x <= rect.x1; x++) {
                const index = y * this.sizeX + x;
                const visibility = this.getVisibility(x, y);
                if (visibility >= 0.5 && !this.explored[index]) {
                    this.explored[index] = 1;
                    this.exploredDirty = true;
                }
                data[index * 4 + 3] = this.getDarkness(index, visibility);
            }
        }

        this.texture.getContext().putImageData(
            this.pixels, 0, 0, rect.x0, rect.y0, rect.x1 - rect.x0 + 1, rect.y1 - rect.y0 + 1);
        this.refreshTexture();
        this.hasRendered = true;
        this.minimapDirty = true;
    }

    /**
     * Uploads the fog canvas and switches it to linear filtering, which blends neighboring tiles into soft edges
     * between visibility states. Every upload resets filtering to the game's pixel-art (nearest) default,
     * so it is restored each time.
     */
    private refreshTexture(): void {
        this.texture.refresh();
        const renderer = this.scene.sys.renderer;
        const glTexture = this.texture.source[0].glTexture;
        if (renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer && glTexture) {
            renderer.setTextureFilter(glTexture, Phaser.Textures.FilterMode.LINEAR);
        }
    }

    /** Loads explored tiles saved for this map (one bit per tile, base64) */
    private loadExplored(): Uint8Array {
        const explored = new Uint8Array(this.sizeX * this.sizeY);
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (!saved) {
                return explored;
            }
            const bytes = Uint8Array.from(atob(saved), char => char.charCodeAt(0));
            if (bytes.length !== Math.ceil(explored.length / 8)) {
                console.warn(`[VisionManager] Ignoring saved exploration for '${this.storageKey}': map size changed`);
                return explored;
            }
            for (let i = 0; i < explored.length; i++) {
                explored[i] = (bytes[i >> 3] >> (i & 7)) & 1;
            }
        } catch (error) {
            console.warn(`[VisionManager] Failed to load exploration for '${this.storageKey}':`, error);
        }
        return explored;
    }

    private saveExplored(): void {
        this.exploredDirty = false;
        this.msSinceSave = 0;
        try {
            const bytes = new Uint8Array(Math.ceil(this.explored.length / 8));
            for (let i = 0; i < this.explored.length; i++) {
                if (this.explored[i]) {
                    bytes[i >> 3] |= 1 << (i & 7);
                }
            }
            let binary = '';
            const chunkSize = 0x8000;
            for (let i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
            }
            localStorage.setItem(this.storageKey, btoa(binary));
        } catch (error) {
            console.warn(`[VisionManager] Failed to save exploration for '${this.storageKey}':`, error);
        }
    }
}
