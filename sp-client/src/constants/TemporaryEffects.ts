import {
    SPELL_BERSERK_ID,
    SPELL_BLIZZARD_ID,
    SPELL_CHILL_WIND_ID,
    SPELL_ICE_STORM_ID,
    SPELL_ICE_STRIKE_ID,
    SPELL_INVISIBILITY_ID,
    SPELL_MASS_BLIZZARD_ID,
    SPELL_MASS_CHILL_WIND_ID,
} from './Spells';

/**
 * Timed buffs and debuffs on the player or monsters.
 */
export enum TemporaryEffectType {
    /** Monsters ignore an invisible player; invisible monsters cannot be targeted. Ends when the holder attacks or casts. */
    Invisibility = 0,
    /** Slows movement, attack and cast speed */
    Chill = 1,
    /** Speeds up movement, attack and cast speed */
    Berserk = 2,
}

/**
 * A temporary effect a spell applies. Speed modifiers add up across active effects;
 * an action's duration becomes base / (1 + sum), so -0.5 doubles it and +0.5 divides it by 1.5.
 */
export interface TemporaryEffectSpec {
    type: TemporaryEffectType;
    /** Only one effect per group can be active; a new one in an occupied group is ignored (no refresh) */
    group: number;
    durationMs: number;
    movementSpeedModifier: number;
    attackSpeedModifier: number;
    castSpeedModifier: number;
}

const CHILL: TemporaryEffectSpec = {
    type: TemporaryEffectType.Chill,
    group: 1,
    durationMs: 10000,
    movementSpeedModifier: -0.5,
    attackSpeedModifier: -0.5,
    castSpeedModifier: -0.5,
};

const BERSERK: TemporaryEffectSpec = {
    type: TemporaryEffectType.Berserk,
    group: 2,
    durationMs: 40000,
    movementSpeedModifier: 0.5,
    attackSpeedModifier: 0.5,
    castSpeedModifier: 0.5,
};

const INVISIBILITY: TemporaryEffectSpec = {
    type: TemporaryEffectType.Invisibility,
    group: 0,
    durationMs: 40000,
    movementSpeedModifier: 0,
    attackSpeedModifier: 0,
    castSpeedModifier: 0,
};

/**
 * Effects applied by spells, keyed by spell id. Damage spells apply theirs to each target they hit;
 * buff-only spells (no entry in SPELL_DAMAGE) apply theirs to whoever stands on the target cell.
 */
export const SPELL_TEMPORARY_EFFECTS: Record<number, TemporaryEffectSpec[]> = {
    [SPELL_CHILL_WIND_ID]: [CHILL],
    [SPELL_ICE_STORM_ID]: [CHILL],
    [SPELL_ICE_STRIKE_ID]: [CHILL],
    [SPELL_MASS_CHILL_WIND_ID]: [CHILL],
    [SPELL_BLIZZARD_ID]: [CHILL],
    [SPELL_MASS_BLIZZARD_ID]: [CHILL],
    [SPELL_INVISIBILITY_ID]: [INVISIBILITY],
    [SPELL_BERSERK_ID]: [BERSERK],
};
