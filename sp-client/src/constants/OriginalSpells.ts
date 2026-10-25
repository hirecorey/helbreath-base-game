import {
    SPELL_ENERGY_BOLT_ID,
    SPELL_FIRE_BALL_ID,
    SPELL_FIRE_STRIKE_ID,
    SPELL_FIRE_WALL_ID,
    SPELL_CHILL_WIND_ID,
    SPELL_POISON_CLOUD_ID,
    SPELL_TRIPLE_ENERGY_BOLT_ID,
    SPELL_LIGHTNING_BOLT_ID,
    SPELL_SPIKE_FIELD_ID,
    SPELL_ICE_STORM_ID,
    SPELL_ICE_STRIKE_ID,
    SPELL_ENERGY_STRIKE_ID,
    SPELL_MASS_FIRE_STRIKE_ID,
    SPELL_MASS_CHILL_WIND_ID,
    SPELL_EARTHWORM_STRIKE_ID,
    SPELL_ARMOR_BREAK_ID,
    SPELL_BLOODY_SHOCK_WAVE_ID,
    SPELL_MASS_ICE_STRIKE_ID,
    SPELL_LIGHTNING_STRIKE_ID,
    SPELL_METEOR_STRIKE_ID,
    SPELL_BLIZZARD_ID,
    SPELL_EARTH_SHOCK_WAVE_ID,
    SPELL_INVISIBILITY_ID,
    SPELL_BERSERK_ID,
} from './Spells';
import type { DiceRoll } from './OriginalItems';

/**
 * Spell data imported from the original Helbreath magic config (reference/Magic.cfg).
 *
 * Values are as in the original game. Field meanings come from the original server's config parser and spell
 * handling; type numbers were reconstructed (the original header is not in the repo) and checked against how each
 * spell uses its values. Nothing in the game reads these yet.
 */

/** How a spell works in the original game */
export enum OriginalSpellType {
    /** Damage on the target cell only (Magic Missile, Lightning Arrow) */
    DamageSpot = 1,
    Heal = 2,
    /** Damage on the target cell (targetDamage) and everyone in the area (areaDamage) */
    DamageArea = 3,
    StaminaDownArea = 5,
    StaminaUpArea = 7,
    Teleport = 8,
    Summon = 9,
    Create = 10,
    /** Defense / arrow / magic protection */
    Protect = 11,
    /** Hold Person, Paralyze */
    HoldObject = 12,
    /** Invisibility, Detect Invisibility */
    Invisibility = 13,
    /** Lasting ground objects (Fire Wall, Poison Cloud, Spike Field, Ice Storm); extraValues[0] = object kind */
    CreateDynamic = 14,
    Possession = 15,
    Confuse = 16,
    /** Poison, Cure */
    Poison = 17,
    Berserk = 18,
    /** Line from caster to target (Lightning Bolt, Bloody Shock Wave) */
    DamageLinear = 19,
    /** Area damage without a separate target-cell hit (Energy Strike, Meteor Strike) */
    DamageAreaNoSpot = 21,
    Tremor = 22,
    /** Damage plus freezing; extraValues[0] = freeze seconds (Chill Wind, Ice Strike) */
    Ice = 23,
    DamageAreaStaminaDown = 25,
    /** Cone from caster to target (Blizzard) */
    IceLinear = 26,
    ArmorBreak = 28,
    Cancellation = 29,
    /** Line from caster to target that also drains stamina (Earth Shock Wave) */
    DamageLinearStaminaDown = 30,
    Inhibition = 31,
    Resurrection = 32,
    Scan = 33,
    Haste = 45,
}

/** Spell element; 0 = none */
export enum OriginalSpellElement {
    None = 0,
    Earth = 1,
    Air = 2,
    Fire = 3,
    Water = 4,
}

export interface OriginalSpell {
    /** Id in the original magic config */
    id: number;
    /** Name as written in the original config */
    name: string;
    type: OriginalSpellType;
    delay: number;
    /** How long a lasting effect stays, in seconds (0 = instant) */
    durationSeconds: number;
    manaCost: number;
    /** Half-size of the affected area in cells */
    areaRadiusX: number;
    areaRadiusY: number;
    /** Damage (or healing) on the target */
    targetDamage: DiceRoll;
    /** Damage on others in the area */
    areaDamage: DiceRoll;
    /** Type-specific values (ground object kind, freeze time, armor reduction, ...) */
    extraValues: [number, number, number];
    /** Intelligence needed to learn it */
    requiredIntelligence: number;
    /** Price of learning it in gold */
    price: number;
    /** Whether it can be bought */
    forSale: boolean;
    category: number;
    element: OriginalSpellElement;
}

export const ORIGINAL_SPELLS: OriginalSpell[] = [
    { id: 0, name: 'Magic-Missile', type: 1, delay: 0, durationSeconds: 0, manaCost: 8, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 8, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 18, price: 100, forSale: true, category: 1, element: 2 },
    { id: 1, name: 'Heal', type: 2, delay: 0, durationSeconds: 0, manaCost: 15, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 6, bonus: 10 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 20, price: 100, forSale: true, category: 0, element: 4 },
    { id: 2, name: 'Create-Food', type: 10, delay: 0, durationSeconds: 0, manaCost: 18, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 18, price: 100, forSale: true, category: 0, element: 0 },
    { id: 10, name: 'Energy-Bolt', type: 3, delay: 0, durationSeconds: 0, manaCost: 15, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 4, bonus: 1 }, areaDamage: { dice: 2, sides: 4, bonus: 1 }, extraValues: [0, 0, 0], requiredIntelligence: 24, price: 200, forSale: true, category: 1, element: 2 },
    { id: 11, name: 'Staminar-Drain', type: 5, delay: 0, durationSeconds: 0, manaCost: 14, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 4, sides: 6, bonus: 10 }, areaDamage: { dice: 2, sides: 6, bonus: 5 }, extraValues: [0, 0, 0], requiredIntelligence: 22, price: 200, forSale: true, category: 1, element: 0 },
    { id: 12, name: 'Recall', type: 8, delay: 0, durationSeconds: 0, manaCost: 15, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 20, price: 120, forSale: true, category: 0, element: 0 },
    { id: 13, name: 'Defense-Shield', type: 11, delay: 0, durationSeconds: 60, manaCost: 19, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 3, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 26, price: 200, forSale: true, category: 2, element: 0 },
    { id: 14, name: 'Celebrating-Light', type: 5, delay: 0, durationSeconds: 0, manaCost: 20, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 25, price: 400, forSale: true, category: 0, element: 0 },
    { id: 20, name: 'Fire-Ball', type: 3, delay: 0, durationSeconds: 0, manaCost: 27, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 6, bonus: 2 }, areaDamage: { dice: 2, sides: 6, bonus: 2 }, extraValues: [0, 0, 0], requiredIntelligence: 26, price: 500, forSale: true, category: 1, element: 3 },
    { id: 21, name: 'Great-Heal', type: 2, delay: 0, durationSeconds: 0, manaCost: 28, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 4, sides: 10, bonus: 20 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 28, price: 500, forSale: true, category: 0, element: 0 },
    { id: 23, name: 'Staminar-Recovery', type: 7, delay: 0, durationSeconds: 0, manaCost: 20, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 4, sides: 8, bonus: 8 }, areaDamage: { dice: 2, sides: 6, bonus: 5 }, extraValues: [0, 0, 0], requiredIntelligence: 20, price: 300, forSale: true, category: 0, element: 0 },
    { id: 24, name: 'Protection-From-Arrow', type: 11, delay: 0, durationSeconds: 60, manaCost: 22, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 20, price: 300, forSale: true, category: 2, element: 0 },
    { id: 25, name: 'Hold-Person', type: 12, delay: 0, durationSeconds: 30, manaCost: 24, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 26, price: 500, forSale: true, category: 1, element: 0 },
    { id: 26, name: 'Possession', type: 15, delay: 0, durationSeconds: 0, manaCost: 25, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 26, price: 500, forSale: true, category: 1, element: 0 },
    { id: 27, name: 'Poison', type: 17, delay: 0, durationSeconds: 0, manaCost: 28, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 15, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 29, price: 700, forSale: true, category: 1, element: 1 },
    { id: 28, name: 'Great-Staminar-Recov.', type: 7, delay: 0, durationSeconds: 0, manaCost: 45, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 4, sides: 16, bonus: 16 }, areaDamage: { dice: 2, sides: 12, bonus: 10 }, extraValues: [0, 0, 0], requiredIntelligence: 30, price: 800, forSale: true, category: 0, element: 0 },
    { id: 30, name: 'Fire-Strike', type: 3, delay: 0, durationSeconds: 0, manaCost: 36, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 8, bonus: 3 }, areaDamage: { dice: 2, sides: 8, bonus: 3 }, extraValues: [0, 0, 0], requiredIntelligence: 34, price: 1000, forSale: true, category: 1, element: 3 },
    { id: 31, name: 'Summon-Creature', type: 9, delay: 0, durationSeconds: 0, manaCost: 35, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 1, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 38, price: 1000, forSale: true, category: 1, element: 1 },
    { id: 32, name: 'Invisibility', type: 13, delay: 0, durationSeconds: 60, manaCost: 31, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 30, price: 800, forSale: true, category: 1, element: 0 },
    { id: 33, name: 'Protection-From-Magic', type: 11, delay: 0, durationSeconds: 60, manaCost: 35, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 32, price: 850, forSale: true, category: 2, element: 0 },
    { id: 34, name: 'Detect-Invisibility', type: 13, delay: 0, durationSeconds: 0, manaCost: 33, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 30, price: 700, forSale: true, category: 0, element: 0 },
    { id: 35, name: 'Paralyze', type: 12, delay: 0, durationSeconds: 50, manaCost: 35, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 36, price: 1000, forSale: true, category: 1, element: 0 },
    { id: 36, name: 'Cure', type: 17, delay: 0, durationSeconds: 0, manaCost: 32, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 35, price: 700, forSale: true, category: 0, element: 1 },
    { id: 37, name: 'Lightning-Arrow', type: 1, delay: 0, durationSeconds: 0, manaCost: 32, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 4, sides: 5, bonus: 10 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 38, price: 1100, forSale: true, category: 1, element: 2 },
    { id: 38, name: 'Tremor', type: 22, delay: 0, durationSeconds: 0, manaCost: 34, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 3, sides: 4, bonus: 3 }, areaDamage: { dice: 3, sides: 4, bonus: 3 }, extraValues: [0, 0, 0], requiredIntelligence: 33, price: 1000, forSale: true, category: 1, element: 1 },
    { id: 40, name: 'Fire-Wall', type: 14, delay: 0, durationSeconds: 30, manaCost: 42, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 8, bonus: 0 }, areaDamage: { dice: 2, sides: 8, bonus: 0 }, extraValues: [1, 1, 2], requiredIntelligence: 45, price: 1200, forSale: true, category: 1, element: 3 },
    { id: 41, name: 'Fire-Field', type: 14, delay: 0, durationSeconds: 30, manaCost: 48, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 8, bonus: 0 }, areaDamage: { dice: 2, sides: 8, bonus: 0 }, extraValues: [1, 2, 1], requiredIntelligence: 48, price: 1400, forSale: true, category: 1, element: 3 },
    { id: 42, name: 'Confuse-Language', type: 16, delay: 0, durationSeconds: 120, manaCost: 40, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 42, price: 1300, forSale: true, category: 1, element: 0 },
    { id: 43, name: 'Lightning', type: 1, delay: 0, durationSeconds: 0, manaCost: 44, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 4, sides: 7, bonus: 12 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 47, price: 1700, forSale: true, category: 1, element: 2 },
    { id: 44, name: 'Great-Defense-Shield', type: 11, delay: 0, durationSeconds: 40, manaCost: 45, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 4, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 46, price: 1500, forSale: true, category: 2, element: 0 },
    { id: 45, name: 'Chill-Wind', type: 23, delay: 0, durationSeconds: 0, manaCost: 48, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 8, bonus: 3 }, areaDamage: { dice: 2, sides: 8, bonus: 3 }, extraValues: [5, 0, 0], requiredIntelligence: 50, price: 2000, forSale: true, category: 1, element: 4 },
    { id: 46, name: 'Poison-Cloud', type: 14, delay: 0, durationSeconds: 30, manaCost: 48, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 0, sides: 15, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [10, 2, 1], requiredIntelligence: 49, price: 1800, forSale: true, category: 1, element: 1 },
    { id: 47, name: 'Triple-Energy-Bolt', type: 3, delay: 0, durationSeconds: 0, manaCost: 40, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 4, bonus: 2 }, areaDamage: { dice: 3, sides: 8, bonus: 3 }, extraValues: [0, 0, 0], requiredIntelligence: 45, price: 1700, forSale: true, category: 1, element: 2 },
    { id: 50, name: 'Berserk', type: 18, delay: 0, durationSeconds: 40, manaCost: 57, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 59, price: 2200, forSale: true, category: 1, element: 0 },
    { id: 51, name: 'Lightning-Bolt', type: 19, delay: 0, durationSeconds: 0, manaCost: 58, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 4, sides: 5, bonus: 18 }, areaDamage: { dice: 4, sides: 2, bonus: 6 }, extraValues: [0, 0, 0], requiredIntelligence: 58, price: 2500, forSale: true, category: 1, element: 2 },
    { id: 53, name: 'Mass-Poison', type: 17, delay: 0, durationSeconds: 0, manaCost: 54, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 40, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 52, price: 2100, forSale: true, category: 1, element: 1 },
    { id: 54, name: 'Spike-Field', type: 14, delay: 0, durationSeconds: 30, manaCost: 56, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 2, sides: 8, bonus: 0 }, areaDamage: { dice: 2, sides: 8, bonus: 0 }, extraValues: [9, 2, 2], requiredIntelligence: 56, price: 2300, forSale: true, category: 1, element: 1 },
    { id: 55, name: 'Ice-Storm', type: 14, delay: 0, durationSeconds: 30, manaCost: 58, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 4, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [8, 1, 0], requiredIntelligence: 59, price: 1, forSale: false, category: 1, element: 4 },
    { id: 56, name: 'Mass-Lightning-Arrow', type: 1, delay: 0, durationSeconds: 0, manaCost: 55, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 5, sides: 6, bonus: 20 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 53, price: 3000, forSale: true, category: 1, element: 2 },
    { id: 57, name: 'Ice-Strike', type: 23, delay: 0, durationSeconds: 0, manaCost: 59, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 5, sides: 6, bonus: 12 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [4, 0, 0], requiredIntelligence: 60, price: 4200, forSale: true, category: 1, element: 4 },
    { id: 60, name: 'Energy-Strike', type: 21, delay: 0, durationSeconds: 0, manaCost: 65, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 6, bonus: 17 }, extraValues: [0, 0, 0], requiredIntelligence: 67, price: 5000, forSale: true, category: 1, element: 2 },
    { id: 61, name: 'Mass-Fire-Strike', type: 3, delay: 0, durationSeconds: 0, manaCost: 80, areaRadiusX: 2, areaRadiusY: 3, targetDamage: { dice: 5, sides: 6, bonus: 12 }, areaDamage: { dice: 7, sides: 10, bonus: 18 }, extraValues: [0, 0, 0], requiredIntelligence: 85, price: 1, forSale: false, category: 1, element: 3 },
    { id: 62, name: 'Confusion', type: 16, delay: 0, durationSeconds: 20, manaCost: 78, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 75, price: 7500, forSale: true, category: 1, element: 0 },
    { id: 63, name: 'Mass-Chill-Wind', type: 23, delay: 0, durationSeconds: 0, manaCost: 90, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 3, sides: 8, bonus: 6 }, areaDamage: { dice: 3, sides: 8, bonus: 6 }, extraValues: [10, 0, 0], requiredIntelligence: 93, price: 9800, forSale: true, category: 1, element: 4 },
    { id: 64, name: 'Earthworm-Strike', type: 25, delay: 0, durationSeconds: 0, manaCost: 80, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 7, sides: 6, bonus: 17 }, areaDamage: { dice: 7, sides: 6, bonus: 17 }, extraValues: [0, 0, 0], requiredIntelligence: 97, price: 12000, forSale: true, category: 1, element: 1 },
    { id: 65, name: 'Absolute-Magic-Protect.', type: 11, delay: 0, durationSeconds: 60, manaCost: 90, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 5, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 112, price: 13500, forSale: true, category: 2, element: 0 },
    { id: 66, name: 'Armor-Break', type: 28, delay: 0, durationSeconds: 0, manaCost: 90, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 7, sides: 6, bonus: 17 }, areaDamage: { dice: 7, sides: 6, bonus: 17 }, extraValues: [15, 0, 0], requiredIntelligence: 97, price: 20000, forSale: true, category: 1, element: 1 },
    { id: 67, name: 'Scan', type: 33, delay: 0, durationSeconds: 0, manaCost: 50, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 70, price: 7500, forSale: true, category: 1, element: 1 },
    { id: 70, name: 'Bloody-Shock-Wave', type: 19, delay: 0, durationSeconds: 0, manaCost: 120, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 5, sides: 8, bonus: 20 }, areaDamage: { dice: 5, sides: 4, bonus: 9 }, extraValues: [0, 0, 0], requiredIntelligence: 105, price: 1, forSale: false, category: 1, element: 2 },
    { id: 71, name: 'Mass-Confusion', type: 16, delay: 0, durationSeconds: 60, manaCost: 125, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 2, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 130, price: 15000, forSale: true, category: 1, element: 0 },
    { id: 72, name: 'Mass-Ice-Strike', type: 23, delay: 0, durationSeconds: 0, manaCost: 120, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 7, sides: 8, bonus: 25 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [7, 0, 0], requiredIntelligence: 133, price: 21000, forSale: true, category: 1, element: 4 },
    { id: 73, name: 'Cloud-Kill', type: 14, delay: 0, durationSeconds: 30, manaCost: 130, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 0, sides: 40, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [10, 2, 2], requiredIntelligence: 120, price: 20000, forSale: true, category: 1, element: 1 },
    { id: 74, name: 'Lightning-Strike', type: 21, delay: 0, durationSeconds: 0, manaCost: 90, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 7, bonus: 20 }, extraValues: [0, 0, 0], requiredIntelligence: 123, price: 35000, forSale: true, category: 1, element: 2 },
    { id: 76, name: 'Cancellation', type: 29, delay: 0, durationSeconds: 30, manaCost: 120, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 135, price: 200, forSale: false, category: 1, element: 0 },
    { id: 77, name: 'Illusion-Movement', type: 21, delay: 0, durationSeconds: 0, manaCost: 130, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 7, bonus: 20 }, extraValues: [0, 0, 0], requiredIntelligence: 160, price: 27000, forSale: true, category: 1, element: 2 },
    { id: 78, name: 'Haste', type: 45, delay: 0, durationSeconds: 5, manaCost: 60, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 1, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 150, price: 1, forSale: false, category: 1, element: 0 },
    { id: 80, name: 'Illusion', type: 16, delay: 0, durationSeconds: 20, manaCost: 143, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 3, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 150, price: 27000, forSale: true, category: 1, element: 0 },
    { id: 81, name: 'Meteor-Strike', type: 21, delay: 0, durationSeconds: 0, manaCost: 120, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 6, sides: 8, bonus: 12 }, areaDamage: { dice: 7, sides: 12, bonus: 18 }, extraValues: [0, 0, 0], requiredIntelligence: 169, price: 40000, forSale: true, category: 1, element: 3 },
    { id: 82, name: 'Mass-Magic-Missile', type: 21, delay: 0, durationSeconds: 0, manaCost: 160, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 7, bonus: 30 }, extraValues: [0, 0, 0], requiredIntelligence: 185, price: 45000, forSale: true, category: 1, element: 2 },
    { id: 83, name: 'Inhibition-Casting', type: 31, delay: 0, durationSeconds: 0, manaCost: 180, areaRadiusX: 1, areaRadiusY: 1, targetDamage: { dice: 8, sides: 20, bonus: 30 }, areaDamage: { dice: 4, sides: 10, bonus: 30 }, extraValues: [0, 0, 0], requiredIntelligence: 180, price: 1, forSale: false, category: 0, element: 0 },
    { id: 90, name: 'Mass-Illusion', type: 16, delay: 0, durationSeconds: 60, manaCost: 200, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 3, sides: 0, bonus: 0 }, areaDamage: { dice: 0, sides: 0, bonus: 0 }, extraValues: [0, 0, 0], requiredIntelligence: 180, price: 35000, forSale: true, category: 1, element: 0 },
    { id: 91, name: 'Blizzard', type: 26, delay: 0, durationSeconds: 20, manaCost: 170, areaRadiusX: 3, areaRadiusY: 3, targetDamage: { dice: 5, sides: 1, bonus: 20 }, areaDamage: { dice: 7, sides: 8, bonus: 16 }, extraValues: [2, 0, 0], requiredIntelligence: 195, price: 43000, forSale: true, category: 1, element: 4 },
    { id: 94, name: 'Resurrection', type: 32, delay: 600, durationSeconds: 0, manaCost: 200, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 3, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 7, bonus: 20 }, extraValues: [0, 0, 0], requiredIntelligence: 0, price: 1, forSale: false, category: 1, element: 2 },
    { id: 95, name: 'Mass-Illusion-Movement', type: 21, delay: 0, durationSeconds: 0, manaCost: 200, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 0, sides: 0, bonus: 0 }, areaDamage: { dice: 7, sides: 7, bonus: 20 }, extraValues: [0, 0, 0], requiredIntelligence: 200, price: 27000, forSale: true, category: 1, element: 2 },
    { id: 96, name: 'Earth-Shock-Wave', type: 30, delay: 0, durationSeconds: 0, manaCost: 180, areaRadiusX: 2, areaRadiusY: 2, targetDamage: { dice: 5, sides: 1, bonus: 20 }, areaDamage: { dice: 7, sides: 8, bonus: 16 }, extraValues: [0, 0, 0], requiredIntelligence: 200, price: 1, forSale: false, category: 1, element: 1 },
];

/**
 * This project's spell ids (Spells.ts) mapped to original spell ids.
 * Not in the original config: Mass Lightning Strike, Mass Blizzard.
 */
export const SPELL_ORIGINAL_IDS: Record<number, number> = {
    [SPELL_ENERGY_BOLT_ID]: 10, // Energy Bolt -> Energy-Bolt
    [SPELL_FIRE_BALL_ID]: 20, // Fire Ball -> Fire-Ball
    [SPELL_FIRE_STRIKE_ID]: 30, // Fire Strike -> Fire-Strike
    [SPELL_FIRE_WALL_ID]: 40, // Fire Wall -> Fire-Wall
    [SPELL_CHILL_WIND_ID]: 45, // Chill Wind -> Chill-Wind
    [SPELL_POISON_CLOUD_ID]: 46, // Poison Cloud -> Poison-Cloud
    [SPELL_TRIPLE_ENERGY_BOLT_ID]: 47, // Triple Energy Bolt -> Triple-Energy-Bolt
    [SPELL_LIGHTNING_BOLT_ID]: 51, // Lightning Bolt -> Lightning-Bolt
    [SPELL_SPIKE_FIELD_ID]: 54, // Spike Field -> Spike-Field
    [SPELL_ICE_STORM_ID]: 55, // Ice Storm -> Ice-Storm
    [SPELL_ICE_STRIKE_ID]: 57, // Ice Strike -> Ice-Strike
    [SPELL_ENERGY_STRIKE_ID]: 60, // Energy Strike -> Energy-Strike
    [SPELL_MASS_FIRE_STRIKE_ID]: 61, // Mass Fire Strike -> Mass-Fire-Strike
    [SPELL_MASS_CHILL_WIND_ID]: 63, // Mass Chill Wind -> Mass-Chill-Wind
    [SPELL_EARTHWORM_STRIKE_ID]: 64, // Earthworm Strike -> Earthworm-Strike
    [SPELL_ARMOR_BREAK_ID]: 66, // Armor Break -> Armor-Break
    [SPELL_BLOODY_SHOCK_WAVE_ID]: 70, // Bloody Shock Wave -> Bloody-Shock-Wave
    [SPELL_MASS_ICE_STRIKE_ID]: 72, // Mass Ice Strike -> Mass-Ice-Strike
    [SPELL_LIGHTNING_STRIKE_ID]: 74, // Lightning Strike -> Lightning-Strike
    [SPELL_METEOR_STRIKE_ID]: 81, // Meteor Strike -> Meteor-Strike
    [SPELL_BLIZZARD_ID]: 91, // Blizzard -> Blizzard
    [SPELL_EARTH_SHOCK_WAVE_ID]: 96, // Earth Shock Wave -> Earth-Shock-Wave
    [SPELL_INVISIBILITY_ID]: 32, // Invisibility -> Invisibility
    [SPELL_BERSERK_ID]: 50, // Berserk -> Berserk
};

/**
 * Original data for one of this project's spells, if it has an original counterpart.
 */
export function getOriginalSpell(spellId: number): OriginalSpell | undefined {
    const originalId = SPELL_ORIGINAL_IDS[spellId];
    return originalId === undefined ? undefined : ORIGINAL_SPELLS.find(spell => spell.id === originalId);
}
