import type { Scene } from 'phaser';
import { convertPixelPosToWorldPos, convertWorldPosToPixelPos, getNextDirection, getDirectionOffset } from '../../utils/CoordinateUtils';
import { TILE_SIZE } from '../assets/HBMap';
import { FireInstance } from './FireInstance';
import type { SoundManager } from '../../utils/SoundManager';
import type { Effect } from '../effects/Effect';

/** Wall length: 2 tiles in each direction from center */
const WALL_LENGTH = 2;

/**
 * World cells covered by a Fire Wall cast from origin toward target: the target cell plus
 * WALL_LENGTH cells on each side along the cast direction offset. Shared by the visual and spell damage.
 */
export function getFireWallCells(originWorldX: number, originWorldY: number, targetWorldX: number, targetWorldY: number): [number, number][] {
    const [rx, ry] = getDirectionOffset(getNextDirection(originWorldX, originWorldY, targetWorldX, targetWorldY));
    const tiles: [number, number][] = [[targetWorldX, targetWorldY]];
    for (let i = 1; i <= WALL_LENGTH; i++) {
        tiles.push([targetWorldX + i * rx, targetWorldY + i * ry]);
        tiles.push([targetWorldX - i * rx, targetWorldY - i * ry]);
    }
    return tiles;
}

export type FireWallConfig = {
    /** Duration in milliseconds each fire instance lasts (default: 30000) */
    duration?: number;
    /** Sound manager for E45 cast sound */
    soundManager?: SoundManager;
    /** Player world X for spatial audio */
    playerWorldX?: number;
    /** Player world Y for spatial audio */
    playerWorldY?: number;
    /** Called when each fire effect is created. Returns onDestroy to remove from effects array. */
    onEffectCreated?: (effect: Effect) => () => void;
};

/**
 * Fire Wall spell. Creates a line of fire tiles from caster toward target, 5 tiles (center + 2 each direction).
 * Plays E45 when cast. Each tile uses Positional Fire 1 effect in a loop.
 */
export class FireWall {
    private instances: FireInstance[] = [];

    constructor(
        scene: Scene,
        originPixelX: number,
        originPixelY: number,
        targetPixelX: number,
        targetPixelY: number,
        config: FireWallConfig
    ) {
        const tiles = getFireWallCells(
            convertPixelPosToWorldPos(originPixelX),
            convertPixelPosToWorldPos(originPixelY),
            convertPixelPosToWorldPos(targetPixelX),
            convertPixelPosToWorldPos(targetPixelY),
        );

        for (const [wx, wy] of tiles) {
            const pixelX = convertWorldPosToPixelPos(wx) + TILE_SIZE / 2;
            const pixelY = convertWorldPosToPixelPos(wy) + TILE_SIZE / 2;
            const instance = new FireInstance(scene, pixelX, pixelY, {
                duration: config.duration ?? 30000,
                onEffectCreated: config.onEffectCreated,
            });
            this.instances.push(instance);
        }
    }

    public destroy(): void {
        for (const instance of this.instances) {
            instance.destroy();
        }
        this.instances = [];
    }
}
