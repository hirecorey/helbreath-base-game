import type { Scene } from 'phaser';
import { TILE_SIZE } from '../game/assets/HBMap';
import { VISIBILITY_FEATHER_TILES, VISIBILITY_FOG_DEPTH, VISIBILITY_RADIUS_TILES } from '../Config';

const FOG_TEXTURE_KEY = 'visibility-fog';

/** Half-size in pixels of the dark area around the fog circle; covers the whole view at minimum camera zoom */
const FOG_EXTENT_PX = 200000;

/**
 * Limited visibility around the player. Draws a fog layer above the world (clear center, feathered edge,
 * dark outside) that follows the player, and answers whether a world position is within sight.
 *
 * Only the fog's position changes per frame; the gradient texture is generated once.
 */
export class VisibilityManager {
    private readonly radiusPx = VISIBILITY_RADIUS_TILES * TILE_SIZE;
    private readonly circle: Phaser.GameObjects.Image;
    /** Dark rectangles above, below, left and right of the circle's square */
    private readonly surround: Phaser.GameObjects.Rectangle[];
    private centerX = 0;
    private centerY = 0;

    constructor(scene: Scene) {
        const size = this.radiusPx * 2;
        if (!scene.textures.exists(FOG_TEXTURE_KEY)) {
            const texture = scene.textures.createCanvas(FOG_TEXTURE_KEY, size, size);
            if (!texture) {
                throw new Error('[VisibilityManager] Failed to create fog texture');
            }
            const context = texture.getContext();
            const gradient = context.createRadialGradient(this.radiusPx, this.radiusPx, 0, this.radiusPx, this.radiusPx, this.radiusPx);
            const clearUntil = Math.max(0, (VISIBILITY_RADIUS_TILES - VISIBILITY_FEATHER_TILES) / VISIBILITY_RADIUS_TILES);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(clearUntil, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);
            texture.refresh();
            // Smooth gradient when the camera zooms (the game otherwise uses pixel-art nearest filtering)
            texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
        }

        this.circle = scene.add.image(0, 0, FOG_TEXTURE_KEY).setDepth(VISIBILITY_FOG_DEPTH);
        this.surround = [0, 1, 2, 3].map(() =>
            scene.add.rectangle(0, 0, 1, 1, 0x000000).setOrigin(0, 0).setDepth(VISIBILITY_FOG_DEPTH));
    }

    /**
     * Centers the visible area on a pixel position (the player's animated center).
     */
    public setCenter(pixelX: number, pixelY: number): void {
        this.centerX = pixelX;
        this.centerY = pixelY;
        const r = this.radiusPx;
        this.circle.setPosition(pixelX, pixelY);
        const [top, bottom, left, right] = this.surround;
        top.setPosition(pixelX - FOG_EXTENT_PX, pixelY - FOG_EXTENT_PX).setSize(FOG_EXTENT_PX * 2, FOG_EXTENT_PX - r);
        bottom.setPosition(pixelX - FOG_EXTENT_PX, pixelY + r).setSize(FOG_EXTENT_PX * 2, FOG_EXTENT_PX - r);
        left.setPosition(pixelX - FOG_EXTENT_PX, pixelY - r).setSize(FOG_EXTENT_PX - r, r * 2);
        right.setPosition(pixelX + r, pixelY - r).setSize(FOG_EXTENT_PX - r, r * 2);
    }

    /**
     * Whether a pixel position is inside the visibility radius (anything farther is fully dark).
     */
    public isVisibleAt(pixelX: number, pixelY: number): boolean {
        const dx = pixelX - this.centerX;
        const dy = pixelY - this.centerY;
        return dx * dx + dy * dy <= this.radiusPx * this.radiusPx;
    }

    public destroy(): void {
        this.circle.destroy();
        for (const rectangle of this.surround) {
            rectangle.destroy();
        }
    }
}
