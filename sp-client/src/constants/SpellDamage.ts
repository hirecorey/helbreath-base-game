import { AttackType } from '../Types';
import {
    SPELL_ARMOR_BREAK_ID,
    SPELL_BLIZZARD_ID,
    SPELL_BLOODY_SHOCK_WAVE_ID,
    SPELL_CHILL_WIND_ID,
    SPELL_EARTH_SHOCK_WAVE_ID,
    SPELL_EARTHWORM_STRIKE_ID,
    SPELL_ENERGY_BOLT_ID,
    SPELL_ENERGY_STRIKE_ID,
    SPELL_FIRE_BALL_ID,
    SPELL_FIRE_STRIKE_ID,
    SPELL_FIRE_WALL_ID,
    SPELL_ICE_STORM_ID,
    SPELL_ICE_STRIKE_ID,
    SPELL_LIGHTNING_BOLT_ID,
    SPELL_LIGHTNING_STRIKE_ID,
    SPELL_MASS_BLIZZARD_ID,
    SPELL_MASS_CHILL_WIND_ID,
    SPELL_MASS_FIRE_STRIKE_ID,
    SPELL_MASS_ICE_STRIKE_ID,
    SPELL_MASS_LIGHTNING_STRIKE_ID,
    SPELL_METEOR_STRIKE_ID,
    SPELL_POISON_CLOUD_ID,
    SPELL_SPIKE_FIELD_ID,
    SPELL_TRIPLE_ENERGY_BOLT_ID,
} from './Spells';

/**
 * Which cells a spell damages.
 */
export enum SpellDamageShape {
    /** Square of `aoeRadius` cells around the target */
    Area = 0,
    /** Expanding circles from caster toward target (Blizzard) */
    Cone = 1,
    /** Thick line from caster to target, plus `aoeRadius` around the target when set (shock waves) */
    Line = 2,
    /** Long-lived effects on each cell of the area that damage whoever stands on them */
    GroundEffect = 3,
}

/**
 * Expanding-circle parameters for cone spells. Matches the Blizzard visual configuration in CastManager.
 */
export interface SpellConeConfig {
    emissionSteps: number;
    startRadius: number;
    endRadius: number;
    startShards: number;
    endShards: number;
}

/**
 * Gameplay damage rules for a spell. Visuals live in `game/spells/` and are played by CastManager.
 * Spells deal the caster's damage (player damage stat, or a monster's rolled attack damage).
 */
export interface SpellDamageConfig {
    shape: SpellDamageShape;
    /** Radius in cells (Chebyshev) around the target; 0 = target cell only. Line spells: -1 = the line only. */
    aoeRadius: number;
    /** How a hit affects the target */
    attackType: AttackType;
    /** When true, a hit also stuns the target (players: caster's stun duration) */
    stuns: boolean;
    /** Projectile speed in pixels per second; damage lands after the travel time */
    projectileSpeedPxPerSec?: number;
    /** Fixed travel distance in pixels for the damage delay (drop-from-above spells) instead of caster-to-target distance */
    projectileDistancePx?: number;
    /** Line spells: damage lands after half this duration. Ground effects: how long each effect lasts. */
    durationMs?: number;
    /** Ground effects: damage interval; undefined = damage only when someone steps onto the cell */
    tickRateMs?: number;
    /** Ground effects: one effect per group per cell */
    group?: number;
    /** Cone spells only */
    cone?: SpellConeConfig;
}

/** Delay before cone (Blizzard) damage lands, in milliseconds */
export const CONE_SPELL_DAMAGE_DELAY_MS = 200;

/** Monsters only cast at a player within this many cells horizontally / vertically */
export const MONSTER_SPELL_RANGE_X = 16;
export const MONSTER_SPELL_RANGE_Y = 9;

const BLIZZARD_CONE: SpellConeConfig = { emissionSteps: 10, startRadius: 1, endRadius: 3, startShards: 0, endShards: 10 };

/**
 * Damage rules keyed by spell id (`Spells.ts`).
 */
export const SPELL_DAMAGE: Record<number, SpellDamageConfig> = {
    [SPELL_ENERGY_BOLT_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500 },
    [SPELL_FIRE_BALL_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500 },
    [SPELL_FIRE_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500 },
    [SPELL_CHILL_WIND_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500, projectileDistancePx: 200 },
    [SPELL_POISON_CLOUD_ID]: { shape: SpellDamageShape.GroundEffect, aoeRadius: 1, attackType: AttackType.NoInterrupt, stuns: false, durationMs: 30000, tickRateMs: 1000, group: 0 },
    [SPELL_TRIPLE_ENERGY_BOLT_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500 },
    [SPELL_LIGHTNING_BOLT_ID]: { shape: SpellDamageShape.Area, aoeRadius: 0, attackType: AttackType.Interrupt, stuns: false },
    [SPELL_SPIKE_FIELD_ID]: { shape: SpellDamageShape.GroundEffect, aoeRadius: 2, attackType: AttackType.NoInterrupt, stuns: false, durationMs: 30000, group: 1 },
    // Fire Wall damages the 5-tile wall it draws (see getFireWallCells), not a square
    [SPELL_FIRE_WALL_ID]: { shape: SpellDamageShape.GroundEffect, aoeRadius: 2, attackType: AttackType.NoInterrupt, stuns: false, durationMs: 30000, tickRateMs: 1000, group: 0 },
    [SPELL_ICE_STORM_ID]: { shape: SpellDamageShape.GroundEffect, aoeRadius: 0, attackType: AttackType.NoInterrupt, stuns: false, durationMs: 30000, tickRateMs: 1000, group: 0 },
    [SPELL_ICE_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 600, projectileDistancePx: 200 },
    [SPELL_ENERGY_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 2000 },
    [SPELL_MASS_FIRE_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500 },
    [SPELL_MASS_CHILL_WIND_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500, projectileDistancePx: 200 },
    [SPELL_EARTHWORM_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false },
    [SPELL_ARMOR_BREAK_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false },
    [SPELL_BLOODY_SHOCK_WAVE_ID]: { shape: SpellDamageShape.Line, aoeRadius: -1, attackType: AttackType.Interrupt, stuns: false, durationMs: 400 },
    [SPELL_MASS_ICE_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 600, projectileDistancePx: 200 },
    [SPELL_LIGHTNING_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false },
    [SPELL_METEOR_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 1, attackType: AttackType.Interrupt, stuns: false, projectileSpeedPxPerSec: 1500, projectileDistancePx: 600 },
    [SPELL_MASS_LIGHTNING_STRIKE_ID]: { shape: SpellDamageShape.Area, aoeRadius: 2, attackType: AttackType.Interrupt, stuns: false },
    [SPELL_BLIZZARD_ID]: { shape: SpellDamageShape.Cone, aoeRadius: 0, attackType: AttackType.Interrupt, stuns: true, cone: BLIZZARD_CONE },
    [SPELL_EARTH_SHOCK_WAVE_ID]: { shape: SpellDamageShape.Line, aoeRadius: 2, attackType: AttackType.InterruptKnockback, stuns: false, durationMs: 400 },
    [SPELL_MASS_BLIZZARD_ID]: { shape: SpellDamageShape.Cone, aoeRadius: 0, attackType: AttackType.Interrupt, stuns: true, cone: { ...BLIZZARD_CONE, endRadius: 6, endShards: 20 } },
};
