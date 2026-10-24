import type { Scene } from 'phaser';
import type { HBMap } from '../game/assets/HBMap';
import { Monster } from '../game/objects/Monster';
import type { Player } from '../game/objects/Player';
import { getFireWallCells } from '../game/spells/FireWall';
import { CONE_SPELL_DAMAGE_DELAY_MS, SPELL_DAMAGE, SpellDamageShape, type SpellDamageConfig } from '../constants/SpellDamage';
import { SPELL_FIRE_WALL_ID } from '../constants/Spells';
import { SPELL_TEMPORARY_EFFECTS } from '../constants/TemporaryEffects';
import { TILE_SIZE } from '../game/assets/HBMap';
import { AttackType } from '../Types';
import { getDistance } from './CoordinateUtils';

export interface SpellDamageManagerConfig {
    scene: Scene;
    getMap: () => HBMap;
    getPlayer: () => Player | undefined;
    getMonsters: () => readonly Monster[];
}

/**
 * A long-lived spell effect on one cell (Fire Wall, Poison Cloud, Ice Storm, Spike Field).
 */
type GroundEffect = {
    spellId: number;
    x: number;
    y: number;
    group: number;
    damage: number;
    attackType: AttackType;
    /** Damage interval; undefined = damages only entities stepping onto the cell */
    tickRateMs?: number;
    msSinceTick: number;
    remainingMs: number;
};

/**
 * Applies spell damage. Targets are chosen when the spell is cast and damaged after the spell's travel delay,
 * so a monster that walks out of the area after the cast is still hit. Ground effects damage whoever stands on
 * their cell each tick (including the caster), or whoever steps onto it for step-only effects.
 */
export class SpellDamageManager {
    private scene: Scene;
    private getMap: () => HBMap;
    private getPlayer: () => Player | undefined;
    private getMonsters: () => readonly Monster[];

    /** Ground effects by cell index (y * map width + x) */
    private groundEffectsByCell = new Map<number, GroundEffect[]>();

    /** Last cell index of each entity, tracked only while step-only ground effects exist */
    private lastCellByEntity = new Map<Player | Monster, number>();

    constructor(config: SpellDamageManagerConfig) {
        this.scene = config.scene;
        this.getMap = config.getMap;
        this.getPlayer = config.getPlayer;
        this.getMonsters = config.getMonsters;
    }

    /**
     * Applies a player-cast spell. The caster is never hit by their own spell, except by ground effects they stand in.
     */
    public castPlayerSpell(spellId: number, casterX: number, casterY: number, targetX: number, targetY: number, damage: number): void {
        const spell = SPELL_DAMAGE[spellId];
        if (!spell) {
            console.warn(`[SpellDamageManager] No damage rules for spell ${spellId}`);
            return;
        }

        const cells = this.getAffectedCells(spellId, spell, casterX, casterY, targetX, targetY);
        if (spell.shape === SpellDamageShape.GroundEffect) {
            this.placeGroundEffects(spellId, spell, cells, damage);
            return;
        }

        const targets = this.getMonsters().filter(monster =>
            !monster.getIsDead() && cells.has(this.getCellIndex(monster.getWorldX(), monster.getWorldY())));
        this.deliverAfter(this.getDamageDelayMs(spell, casterX, casterY, targetX, targetY), () => {
            for (const monster of targets) {
                if (monster.getIsDead()) {
                    continue;
                }
                monster.takeDamage(damage, spell.attackType);
                this.applySpellEffectsOnHit(spellId, monster);
            }
        });
    }

    /**
     * Applies a buff-only spell (Invisibility, Berserk) to whoever stands on the target cell: the player first, otherwise a monster.
     *
     * @returns Whether anyone received the effects
     */
    public castBuffSpell(spellId: number, targetX: number, targetY: number): boolean {
        const effects = SPELL_TEMPORARY_EFFECTS[spellId];
        if (!effects) {
            console.warn(`[SpellDamageManager] No effects for buff spell ${spellId}`);
            return false;
        }
        const player = this.getPlayer();
        const target = player && !player.getIsDead() && player.getWorldX() === targetX && player.getWorldY() === targetY
            ? player
            : this.getMonsters().find(monster => !monster.getIsDead() && monster.getWorldX() === targetX && monster.getWorldY() === targetY);
        if (!target) {
            return false;
        }
        for (const effect of effects) {
            target.applyTemporaryEffect(effect);
        }
        return true;
    }

    /** Whether a spell only applies effects and deals no damage */
    public isBuffSpell(spellId: number): boolean {
        return SPELL_DAMAGE[spellId] === undefined && SPELL_TEMPORARY_EFFECTS[spellId] !== undefined;
    }

    /** Applies a damage spell's on-hit effects (e.g. Chill) to a target that survived the hit */
    private applySpellEffectsOnHit(spellId: number, target: Player | Monster): void {
        if (target.getIsDead()) {
            return;
        }
        for (const effect of SPELL_TEMPORARY_EFFECTS[spellId] ?? []) {
            target.applyTemporaryEffect(effect);
        }
    }

    /**
     * Applies a monster-cast spell. Monster spells only damage the player.
     */
    public castMonsterSpell(
        spellId: number,
        casterX: number,
        casterY: number,
        targetX: number,
        targetY: number,
        damage: number,
        stunDurationMs: number,
    ): void {
        const spell = SPELL_DAMAGE[spellId];
        if (!spell) {
            console.warn(`[SpellDamageManager] No damage rules for spell ${spellId}`);
            return;
        }

        const cells = this.getAffectedCells(spellId, spell, casterX, casterY, targetX, targetY);
        if (spell.shape === SpellDamageShape.GroundEffect) {
            this.placeGroundEffects(spellId, spell, cells, damage);
            return;
        }

        const player = this.getPlayer();
        if (!player || player.getIsDead() || !cells.has(this.getCellIndex(player.getWorldX(), player.getWorldY()))) {
            return;
        }
        this.deliverAfter(this.getDamageDelayMs(spell, casterX, casterY, targetX, targetY), () => {
            if (player.getIsDead()) {
                return;
            }
            player.takeDamage(spell.attackType, damage, casterX, casterY, spell.stuns ? stunDurationMs : 0);
            this.applySpellEffectsOnHit(spellId, player);
        });
    }

    /**
     * Advances ground effects: periodic damage, step-on damage and expiry.
     */
    public update(delta: number): void {
        if (this.groundEffectsByCell.size === 0) {
            return;
        }

        for (const [cellIndex, effects] of this.groundEffectsByCell) {
            for (const effect of effects) {
                effect.remainingMs -= delta;
                if (effect.tickRateMs === undefined) {
                    continue;
                }
                effect.msSinceTick += delta;
                while (effect.msSinceTick >= effect.tickRateMs && effect.remainingMs > 0) {
                    effect.msSinceTick -= effect.tickRateMs;
                    this.damageCell(effect);
                }
            }
            const active = effects.filter(effect => effect.remainingMs > 0);
            if (active.length === 0) {
                this.groundEffectsByCell.delete(cellIndex);
            } else if (active.length !== effects.length) {
                this.groundEffectsByCell.set(cellIndex, active);
            }
        }

        this.applyStepOnDamage();
    }

    /**
     * Removes all ground effects.
     */
    public destroy(): void {
        this.groundEffectsByCell.clear();
        this.lastCellByEntity.clear();
    }

    private getAffectedCells(spellId: number, spell: SpellDamageConfig, casterX: number, casterY: number, targetX: number, targetY: number): Set<number> {
        const cells = new Set<number>();
        switch (spell.shape) {
            case SpellDamageShape.Area:
                this.addArea(cells, targetX, targetY, spell.aoeRadius);
                break;
            case SpellDamageShape.GroundEffect:
                if (spellId === SPELL_FIRE_WALL_ID) {
                    for (const [x, y] of getFireWallCells(casterX, casterY, targetX, targetY)) {
                        this.addCell(cells, x, y);
                    }
                } else {
                    this.addArea(cells, targetX, targetY, spell.aoeRadius);
                }
                break;
            case SpellDamageShape.Line:
                this.addLine(cells, casterX, casterY, targetX, targetY);
                if (spell.aoeRadius >= 0) {
                    this.addArea(cells, targetX, targetY, spell.aoeRadius);
                }
                break;
            case SpellDamageShape.Cone:
                if (spell.cone) {
                    this.addCone(cells, casterX, casterY, targetX, targetY, spell.cone);
                }
                break;
        }
        return cells;
    }

    /** Cells within Chebyshev distance `radius` of the center */
    private addArea(cells: Set<number>, centerX: number, centerY: number, radius: number): void {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                if (getDistance(x, y, centerX, centerY) <= radius) {
                    this.addCell(cells, x, y);
                }
            }
        }
    }

    /** Bresenham line from caster to target, thickened by the four orthogonal neighbors of each step */
    private addLine(cells: Set<number>, x0: number, y0: number, x1: number, y1: number): void {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;
        let x = x0;
        let y = y0;
        while (true) {
            this.addCell(cells, x, y);
            this.addCell(cells, x - 1, y);
            this.addCell(cells, x + 1, y);
            this.addCell(cells, x, y - 1);
            this.addCell(cells, x, y + 1);
            if (x === x1 && y === y1) {
                break;
            }
            const e2 = 2 * err;
            if (e2 >= -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 <= dx) {
                err += dx;
                y += sy;
            }
        }
    }

    /** Circles sampled along caster → target, growing from startRadius to endRadius (steps with no shards are skipped) */
    private addCone(
        cells: Set<number>,
        casterX: number,
        casterY: number,
        targetX: number,
        targetY: number,
        cone: NonNullable<SpellDamageConfig['cone']>,
    ): void {
        for (let step = 0; step < cone.emissionSteps; step++) {
            const progress = cone.emissionSteps > 1 ? step / (cone.emissionSteps - 1) : 1;
            const radius = Math.floor(cone.startRadius + (cone.endRadius - cone.startRadius) * progress);
            const shardCount = Math.round(cone.startShards + (cone.endShards - cone.startShards) * progress);
            if (shardCount <= 0) {
                continue;
            }
            const centerX = casterX + (targetX - casterX) * progress;
            const centerY = casterY + (targetY - casterY) * progress;
            for (let y = Math.floor(centerY - radius); y <= Math.ceil(centerY + radius); y++) {
                for (let x = Math.floor(centerX - radius); x <= Math.ceil(centerX + radius); x++) {
                    if ((x - centerX) ** 2 + (y - centerY) ** 2 <= radius * radius) {
                        this.addCell(cells, x, y);
                    }
                }
            }
        }
    }

    private addCell(cells: Set<number>, x: number, y: number): void {
        const map = this.getMap();
        if (x >= 0 && y >= 0 && x < map.sizeX && y < map.sizeY) {
            cells.add(this.getCellIndex(x, y));
        }
    }

    private getCellIndex(x: number, y: number): number {
        return y * this.getMap().sizeX + x;
    }

    /** Milliseconds between the cast and the damage, matching the spell's travel or animation time */
    private getDamageDelayMs(spell: SpellDamageConfig, casterX: number, casterY: number, targetX: number, targetY: number): number {
        switch (spell.shape) {
            case SpellDamageShape.Cone:
                return CONE_SPELL_DAMAGE_DELAY_MS;
            case SpellDamageShape.Line:
                return (spell.durationMs ?? 0) / 2;
            default: {
                if (spell.projectileSpeedPxPerSec === undefined) {
                    return 0;
                }
                const distancePx = spell.projectileDistancePx ??
                    Math.hypot((targetX - casterX) * TILE_SIZE, (targetY - casterY) * TILE_SIZE);
                return Math.ceil(distancePx / spell.projectileSpeedPxPerSec * 1000);
            }
        }
    }

    private deliverAfter(delayMs: number, deliver: () => void): void {
        if (delayMs <= 0) {
            deliver();
            return;
        }
        this.scene.time.delayedCall(delayMs, deliver);
    }

    /** Places one effect per cell; cells that already hold an effect of the same group are skipped */
    private placeGroundEffects(spellId: number, spell: SpellDamageConfig, cells: Set<number>, damage: number): void {
        if (spell.group === undefined || spell.durationMs === undefined) {
            console.warn(`[SpellDamageManager] Ground effect spell ${spellId} is missing group or duration`);
            return;
        }
        const sizeX = this.getMap().sizeX;
        for (const cellIndex of cells) {
            const existing = this.groundEffectsByCell.get(cellIndex) ?? [];
            if (existing.some(effect => effect.group === spell.group)) {
                continue;
            }
            existing.push({
                spellId,
                x: cellIndex % sizeX,
                y: Math.floor(cellIndex / sizeX),
                group: spell.group,
                damage,
                attackType: spell.attackType,
                tickRateMs: spell.tickRateMs,
                msSinceTick: 0,
                remainingMs: spell.durationMs,
            });
            this.groundEffectsByCell.set(cellIndex, existing);
        }

        // Record where everyone stands now, so a step made in the very next frame counts as stepping on
        if (spell.tickRateMs === undefined && this.lastCellByEntity.size === 0) {
            for (const entity of this.getEntities()) {
                this.lastCellByEntity.set(entity, this.getCellIndex(entity.getWorldX(), entity.getWorldY()));
            }
        }
    }

    private getEntities(): Array<Player | Monster> {
        const player = this.getPlayer();
        return player ? [player, ...this.getMonsters()] : [...this.getMonsters()];
    }

    /** Damages the player and monsters standing on an effect's cell */
    private damageCell(effect: GroundEffect): void {
        const player = this.getPlayer();
        if (player && player.getWorldX() === effect.x && player.getWorldY() === effect.y) {
            this.damageEntity(player, effect);
        }
        for (const monster of this.getMonsters()) {
            if (monster.getWorldX() === effect.x && monster.getWorldY() === effect.y) {
                this.damageEntity(monster, effect);
            }
        }
    }

    private damageEntity(entity: Player | Monster, effect: GroundEffect): void {
        if (entity.getIsDead()) {
            return;
        }
        if (entity instanceof Monster) {
            entity.takeDamage(effect.damage, effect.attackType);
        } else {
            entity.takeDamage(effect.attackType, effect.damage, effect.x, effect.y, 0);
        }
        this.applySpellEffectsOnHit(effect.spellId, entity);
    }

    /** Damages entities that moved onto a cell with step-only effects since the last update */
    private applyStepOnDamage(): void {
        let hasStepEffects = false;
        for (const effects of this.groundEffectsByCell.values()) {
            if (effects.some(effect => effect.tickRateMs === undefined)) {
                hasStepEffects = true;
                break;
            }
        }
        if (!hasStepEffects) {
            this.lastCellByEntity.clear();
            return;
        }

        const seen = new Set<Player | Monster>();
        for (const entity of this.getEntities()) {
            seen.add(entity);
            const cellIndex = this.getCellIndex(entity.getWorldX(), entity.getWorldY());
            const previous = this.lastCellByEntity.get(entity);
            this.lastCellByEntity.set(entity, cellIndex);
            if (previous === undefined || previous === cellIndex || entity.getIsDead()) {
                continue;
            }
            for (const effect of this.groundEffectsByCell.get(cellIndex) ?? []) {
                if (effect.tickRateMs === undefined) {
                    this.damageEntity(entity, effect);
                }
            }
        }
        for (const entity of this.lastCellByEntity.keys()) {
            if (!seen.has(entity)) {
                this.lastCellByEntity.delete(entity);
            }
        }
    }
}
