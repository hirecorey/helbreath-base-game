/**
 * Item data imported from the original Helbreath item configs (reference/Item.cfg, Item2.cfg, Item3.cfg).
 *
 * Values are as in the original game. Field meanings come from the original server's config parser and client
 * shop screen; enum numbers were reconstructed (the original header is not in the repo) and checked against how
 * the data uses them. Nothing in the game reads these yet.
 */

/** What kind of item it is (how it is used) */
export enum OriginalItemType {
    None = 0,
    Equip = 1,
    /** Used up when used (manuals, dilution potion) */
    UseDeplete = 3,
    /** Loot and currency (gold, monster parts) */
    Consume = 5,
    Arrow = 6,
    /** Potions and food */
    Eat = 7,
    /** Tool for a skill (fishing rod) */
    UseSkill = 8,
    /** Reusable (map) */
    UsePermanent = 9,
    /** Opens a skill dialog (alchemy bowl, manufacturing hammer) */
    UseSkillDialog = 10,
    /** Used up on a target (flags, dyes) */
    UseDepleteOnTarget = 11,
    /** Crafting material (ingots, coal) */
    Material = 12,
}

/** Where an equippable item is worn */
export enum OriginalEquipSlot {
    None = 0,
    Head = 1,
    Body = 2,
    Arms = 3,
    Pants = 4,
    Boots = 5,
    Neck = 6,
    LeftHand = 7,
    RightHand = 8,
    TwoHands = 9,
    RightFinger = 10,
    LeftFinger = 11,
    Back = 12,
    /** Costumes that replace all other gear */
    FullBody = 13,
}

/**
 * What an item does. Meaning of effectValues per type:
 * - Attack / AttackArrow: [dice, sides, bonus] vs small-medium targets, then [dice, sides, bonus] vs large targets
 * - Defense: [defense %, ?, ?, requirementStat (10 Str, 11 Dex, 12 Vit, 13 Int, 14 Mag, 15 Chr), requirementValue, ?]
 * - Hp / Mp / Sp: [dice, sides, bonus] restored
 * - AttackManaSave: weapon damage like Attack, value 4 = % mana saved
 */
export enum OriginalItemEffectType {
    None = 0,
    Attack = 1,
    Defense = 2,
    AttackArrow = 3,
    Hp = 4,
    Mp = 5,
    Sp = 6,
    /** Food: heals over time */
    HpStock = 7,
    StudySkill = 9,
    ShowLocation = 10,
    /** Scrolls: casts a spell */
    Magic = 11,
    /** Hair, skin, gender potions */
    ChangeAttribute = 12,
    AttackManaSave = 13,
    /** Rings and necklaces with bonuses */
    AddEffect = 14,
    MagicDamageSave = 15,
    OccupyFlag = 16,
    Dye = 17,
    StudyMagic = 18,
    AttackMaxHpDown = 19,
    AttackDefense = 20,
    FirmStamina = 22,
    Lottery = 23,
    AttackSpecialAbility = 24,
    DefenseSpecialAbility = 25,
    AlterItemDrop = 26,
    /** Cures freezing */
    Warm = 28,
    Farming = 30,
    Slates = 31,
    ArmorDye = 32,
}

export interface OriginalItem {
    /** Id in the original item configs */
    id: number;
    /** Name as written in the original configs */
    name: string;
    type: OriginalItemType;
    equipSlot: OriginalEquipSlot;
    effectType: OriginalItemEffectType;
    /** Six effect values; meaning depends on effectType (see OriginalItemEffectType) */
    effectValues: [number, number, number, number, number, number];
    /** Durability */
    maxDurability: number;
    specialEffect: number;
    specialEffectValues: [number, number];
    /** Shop price in gold */
    price: number;
    /** Whether shops sell it */
    forSale: boolean;
    /** Weight in hundredths; weapons and armor need Strength of at least weight / 100 */
    weight: number;
    /** Weapon attack speed (higher is slower; 0 for other items) */
    speed: number;
    /** Minimum character level (0 = none) */
    levelLimit: number;
    /** 0 any, 1 male, 2 female */
    genderLimit: number;
    /** Skill trained when used (-1 = none) */
    relatedSkill: number;
    category: number;
    color: number;
}

/** A dice roll: dice × d(sides) + bonus */
export interface DiceRoll {
    dice: number;
    sides: number;
    bonus: number;
}

export const ORIGINAL_ITEMS: OriginalItem[] = [
    { id: 1, name: 'Dagger', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 5, 0, 1, 4, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 25, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 2, name: 'Dagger(S.C)', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 4, 0, 1, 3, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -10], price: 55, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 3, name: 'Dagger(Swd.breaker)', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 4, 0, 1, 3, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, -10], price: 55, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 4, name: 'Dagger+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 5, 1, 1, 4, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -10], price: 100, forSale: true, weight: 200, speed: 0, levelLimit: 10, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 6, name: 'KightDagger', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 4, 0, 1, 3, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -10], price: 35, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 7, name: 'Dirk', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 4, 0, 1, 3, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -10], price: 35, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 8, name: 'ShortSword', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 0, 1, 5, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, -5], price: 50, forSale: true, weight: 800, speed: 2, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 9, name: 'ShortSword+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 1, 1, 5, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -5], price: 200, forSale: true, weight: 800, speed: 2, levelLimit: 10, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 11, name: 'ShortSword(S.C)', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 0, 1, 5, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -5], price: 100, forSale: false, weight: 800, speed: 2, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 12, name: 'MainGauche', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 0, 1, 6, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, -2], price: 50, forSale: true, weight: 800, speed: 2, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 13, name: 'MainGauche+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 1, 1, 6, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -2], price: 200, forSale: true, weight: 800, speed: 2, levelLimit: 15, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 14, name: 'MainGauche(S.C)', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 0, 1, 4, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -2], price: 100, forSale: false, weight: 800, speed: 2, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 15, name: 'Gradius', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 0, 1, 7, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, -2], price: 90, forSale: true, weight: 800, speed: 2, levelLimit: 0, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 16, name: 'Gradius+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 1, 1, 7, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, -2], price: 350, forSale: true, weight: 800, speed: 2, levelLimit: 20, genderLimit: 0, relatedSkill: 7, category: 1, color: 0 },
    { id: 17, name: 'LongSword', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 9, 0, 1, 10, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-1, 0], price: 180, forSale: true, weight: 1400, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 18, name: 'LongSword+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 9, 1, 1, 10, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-1, 0], price: 650, forSale: true, weight: 1400, speed: 6, levelLimit: 25, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 19, name: 'LongSword+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 9, 2, 1, 10, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-1, 0], price: 2600, forSale: false, weight: 1600, speed: 6, levelLimit: 50, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 20, name: 'Excaliber', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 10, 4, 2, 12, 4], maxDurability: 8000, specialEffect: 0, specialEffectValues: [-1, 0], price: 31000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 22, name: 'LongSword(S.C)', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 0, 1, 12, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-1, 0], price: 250, forSale: false, weight: 1400, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 23, name: 'Sabre', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 0, 1, 9, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-1, 0], price: 150, forSale: true, weight: 1200, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 24, name: 'Sabre+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 1, 1, 9, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-1, 0], price: 600, forSale: true, weight: 1200, speed: 5, levelLimit: 20, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 25, name: 'Scimitar', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 10, 0, 1, 12, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-1, 3], price: 200, forSale: true, weight: 1800, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 26, name: 'Scimitar+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 10, 1, 1, 12, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-1, 3], price: 800, forSale: true, weight: 1800, speed: 6, levelLimit: 30, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 27, name: 'Scimitar+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 10, 2, 1, 12, 2], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-1, 3], price: 3200, forSale: false, weight: 2000, speed: 6, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 28, name: 'Falchion', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 12, 0, 2, 7, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-2, 2], price: 250, forSale: true, weight: 2200, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 29, name: 'Falchion+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 12, 1, 2, 7, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-2, 2], price: 1000, forSale: true, weight: 2200, speed: 6, levelLimit: 35, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 30, name: 'Falchion+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 12, 2, 2, 7, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-2, 2], price: 4000, forSale: false, weight: 2200, speed: 6, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 31, name: 'Esterk', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 0, 1, 12, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 400, forSale: true, weight: 1200, speed: 4, levelLimit: 0, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 32, name: 'Esterk+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 1, 1, 12, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [0, 0], price: 800, forSale: true, weight: 1200, speed: 4, levelLimit: 20, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 33, name: 'Esterk+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 2, 1, 12, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [0, 0], price: 3200, forSale: false, weight: 1200, speed: 4, levelLimit: 70, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 34, name: 'Rapier', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 0, 1, 10, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: true, weight: 1100, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 35, name: 'Rapier+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 1, 1, 10, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 1300, forSale: true, weight: 1100, speed: 3, levelLimit: 30, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 36, name: 'Rapier+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 2, 1, 10, 2], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 5200, forSale: false, weight: 1100, speed: 3, levelLimit: 70, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 37, name: 'TemplerSword', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 0, 1, 12, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-1, 1], price: 1000, forSale: false, weight: 1200, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 38, name: 'BroadSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 7, 0, 2, 8, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-3, 2], price: 250, forSale: true, weight: 2800, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 39, name: 'BroadSword+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 7, 1, 2, 8, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-3, 2], price: 1100, forSale: true, weight: 2800, speed: 6, levelLimit: 30, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 40, name: 'BroadSword+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 7, 2, 2, 8, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-3, 2], price: 4400, forSale: false, weight: 2800, speed: 6, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 41, name: 'BroadSword(S.C)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 7, 0, 2, 8, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-3, 2], price: 400, forSale: false, weight: 2800, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 42, name: 'BastadSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 8, 0, 2, 9, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-4, 3], price: 300, forSale: true, weight: 3300, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 43, name: 'BastadSword+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 8, 1, 2, 9, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-4, 3], price: 1200, forSale: true, weight: 3300, speed: 6, levelLimit: 35, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 44, name: 'BastadSword+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 8, 2, 2, 9, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-4, 3], price: 4800, forSale: false, weight: 3300, speed: 6, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 45, name: 'BastadSword(S.C)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 5, 0, 2, 9, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-4, 3], price: 450, forSale: false, weight: 3300, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 46, name: 'Claymore', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 9, 0, 2, 10, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-5, 4], price: 400, forSale: true, weight: 4000, speed: 7, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 47, name: 'Claymore+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 9, 1, 2, 10, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-5, 4], price: 1800, forSale: true, weight: 4000, speed: 7, levelLimit: 40, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 48, name: 'Claymore+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 9, 2, 2, 10, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-5, 4], price: 7200, forSale: false, weight: 4000, speed: 7, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 49, name: 'Claymore(S.C)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 9, 0, 2, 10, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-5, 4], price: 600, forSale: false, weight: 4000, speed: 7, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 50, name: 'GreatSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 0, 2, 11, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-8, 5], price: 500, forSale: true, weight: 5200, speed: 8, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 51, name: 'GreatSword+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 1, 2, 11, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-8, 5], price: 2300, forSale: true, weight: 5200, speed: 8, levelLimit: 50, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 52, name: 'GreatSword+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 2, 2, 11, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-8, 5], price: 9200, forSale: false, weight: 5200, speed: 8, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 53, name: 'GreatSword(S.C)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 0, 2, 11, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-8, 5], price: 700, forSale: false, weight: 5200, speed: 8, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 54, name: 'Flameberge', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 0, 2, 12, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-15, 10], price: 700, forSale: true, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 55, name: 'Flameberge+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 1, 2, 12, 1], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-15, 10], price: 3300, forSale: true, weight: 6000, speed: 10, levelLimit: 60, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 56, name: 'Flameberge+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 2, 2, 12, 2], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-15, 10], price: 13200, forSale: false, weight: 6000, speed: 10, levelLimit: 70, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 57, name: 'Flameberge(S.C)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 0, 2, 12, 0], maxDurability: 1400, specialEffect: 0, specialEffectValues: [-15, 10], price: 1000, forSale: false, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 59, name: 'LightAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 0, 1, 7, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1400, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 60, name: 'LightAxe+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 1, 1, 7, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 350, forSale: true, weight: 1400, speed: 3, levelLimit: 10, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 61, name: 'LightAxe+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 6, 2, 1, 7, 2], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 1400, forSale: false, weight: 1400, speed: 3, levelLimit: 70, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 62, name: 'Tomahoc', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 3, 0, 2, 4, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 180, forSale: true, weight: 1700, speed: 4, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 63, name: 'Tomahoc+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 3, 1, 2, 4, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 700, forSale: true, weight: 1700, speed: 4, levelLimit: 20, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 64, name: 'Tomahoc+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 3, 2, 2, 4, 2], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 2800, forSale: false, weight: 1700, speed: 4, levelLimit: 70, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 65, name: 'SexonAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 4, 0, 2, 5, 0], maxDurability: 700, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 2000, speed: 4, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 66, name: 'SexonAxe+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 4, 1, 2, 5, 1], maxDurability: 700, specialEffect: 0, specialEffectValues: [0, 0], price: 800, forSale: true, weight: 2000, speed: 4, levelLimit: 30, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 67, name: 'SexonAxe+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 4, 2, 2, 5, 2], maxDurability: 700, specialEffect: 0, specialEffectValues: [0, 0], price: 3200, forSale: false, weight: 2000, speed: 4, levelLimit: 70, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 68, name: 'DoubleAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 3, 0, 3, 3, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 560, forSale: true, weight: 3300, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 69, name: 'DoubleAxe+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 3, 1, 3, 3, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 1200, forSale: true, weight: 3300, speed: 5, levelLimit: 40, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 70, name: 'DoubleAxe+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 3, 2, 3, 3, 2], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 4800, forSale: false, weight: 3300, speed: 5, levelLimit: 70, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 71, name: 'WarAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 5, 0, 3, 6, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 700, forSale: true, weight: 4400, speed: 8, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 72, name: 'WarAxe+1', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 5, 1, 3, 6, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: true, weight: 4400, speed: 8, levelLimit: 60, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 73, name: 'WarAxe+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 5, 2, 3, 6, 2], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 8000, forSale: false, weight: 4400, speed: 8, levelLimit: 70, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 74, name: '4BladeGoldenAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [3, 6, 0, 3, 6, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [0, 0], price: 52000, forSale: false, weight: 2000, speed: 6, levelLimit: 60, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 75, name: 'ShortBow', type: 1, equipSlot: 9, effectType: 3, effectValues: [1, 6, 0, 1, 6, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [5, 0], price: 100, forSale: true, weight: 800, speed: 4, levelLimit: 0, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 76, name: 'LongBow', type: 1, equipSlot: 9, effectType: 3, effectValues: [1, 7, 0, 1, 7, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 5], price: 200, forSale: true, weight: 1200, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 77, name: 'Arrow', type: 6, equipSlot: 0, effectType: 0, effectValues: [1, 4, 0, 1, 4, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: true, weight: 10, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 0, category: 4, color: 0 },
    { id: 78, name: 'PoisonArrow', type: 6, equipSlot: 0, effectType: 0, effectValues: [1, 8, 0, 1, 8, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5, forSale: false, weight: 10, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 0, category: 4, color: 0 },
    { id: 79, name: 'WoodShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [8, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 800, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 80, name: 'LeatherShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [10, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 150, forSale: true, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 81, name: 'TargeShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [13, 1, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 250, forSale: true, weight: 1800, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 82, name: 'ScootermShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [16, 1, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 83, name: 'BlondeShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [18, 1, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [0, 0], price: 450, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 84, name: 'IronShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [22, 1, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [-2, 0], price: 700, forSale: true, weight: 2500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 85, name: 'LagiShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [26, 1, 1, 1, 1, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [-4, 0], price: 1300, forSale: true, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 86, name: 'KnightShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [30, 1, 1, 1, 1, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [-8, -5], price: 1500, forSale: true, weight: 3200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 87, name: 'TowerShield', type: 1, equipSlot: 7, effectType: 2, effectValues: [35, 1, 1, 1, 1, 1], maxDurability: 800, specialEffect: 0, specialEffectValues: [-10, -10], price: 1800, forSale: true, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 88, name: 'GuildAdmissionTicket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 5, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 89, name: 'GuildSecessionTicket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 5, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 90, name: 'Gold', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 91, name: 'RedPotion', type: 7, equipSlot: 0, effectType: 4, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 92, name: 'BigRedPotion', type: 7, equipSlot: 0, effectType: 4, effectValues: [3, 8, 40, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 65, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 93, name: 'BluePotion', type: 7, equipSlot: 0, effectType: 5, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 94, name: 'BigBluePotion', type: 7, equipSlot: 0, effectType: 5, effectValues: [4, 8, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 65, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 95, name: 'GreenPotion', type: 7, equipSlot: 0, effectType: 6, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 96, name: 'BigGreenPotion', type: 7, equipSlot: 0, effectType: 6, effectValues: [4, 8, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 65, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 97, name: 'DilutionPotion', type: 3, equipSlot: 0, effectType: 9, effectValues: [23, 20, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 98, name: 'Baguette', type: 7, equipSlot: 0, effectType: 7, effectValues: [2, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5, forSale: true, weight: 17, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 99, name: 'Meat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 52, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 100, name: 'Fish', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 30, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 101, name: 'RedFish', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 60, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 400, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 102, name: 'GreenFish', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 40, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 103, name: 'YellowFish', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 30, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 104, name: 'Map', type: 9, equipSlot: 0, effectType: 10, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 35, specialEffect: 0, specialEffectValues: [0, 0], price: 30, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 105, name: 'FishingRod', type: 8, equipSlot: 0, effectType: 0, effectValues: [1, 8, 0, 0, 0, 0], maxDurability: 200, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 300, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 1, category: 43, color: 0 },
    { id: 106, name: 'PretendCorpseManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [19, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 107, name: 'ArcheryManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [6, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 108, name: 'ShieldManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [11, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 109, name: 'LongSwordManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [8, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 110, name: 'FencingManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [9, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 111, name: 'FishingManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [1, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 112, name: 'AxeManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [10, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 113, name: 'MagicResistManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [3, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 114, name: 'RecallScroll', type: 3, equipSlot: 0, effectType: 11, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 120, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 115, name: 'InvisibilityScroll', type: 3, equipSlot: 0, effectType: 11, effectValues: [2, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 560, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 116, name: 'DetectInviScroll', type: 3, equipSlot: 0, effectType: 11, effectValues: [3, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 330, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 117, name: 'BleedingIslandTicket', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 1, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 188, name: 'SnakeMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 20, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 57, forSale: false, weight: 45, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 189, name: 'SnakeSkin', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 175, forSale: false, weight: 20, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 190, name: 'SnakeTeeth', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 55, forSale: false, weight: 5, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 191, name: 'SnakeTongue', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 3, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 192, name: 'AntLeg', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 32, forSale: false, weight: 17, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 193, name: 'AntFeeler', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 34, forSale: false, weight: 10, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 194, name: 'CyclopsEye', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 170, forSale: false, weight: 330, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 195, name: 'CyclopsHandEdge', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 270, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 196, name: 'CyclopsHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 160, forSale: false, weight: 1230, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 197, name: 'CyclopsMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 30, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 90, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 198, name: 'CyclopsLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 600, forSale: false, weight: 350, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 199, name: 'HelboundHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 90, forSale: false, weight: 820, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 200, name: 'HelboundLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 320, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 201, name: 'HelboundTail', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 70, forSale: false, weight: 250, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 202, name: 'HelboundTeeth', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 70, forSale: false, weight: 130, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 203, name: 'HelboundClaw', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 70, forSale: false, weight: 280, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 204, name: 'HelboundTongue', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 75, forSale: false, weight: 150, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 205, name: 'LumpofClay', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 95, forSale: false, weight: 230, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 206, name: 'OrcMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [2, 4, 5, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 207, name: 'OrcLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 193, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 208, name: 'OrcTeeth', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 56, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 209, name: 'OgreHair', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 230, forSale: false, weight: 250, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 210, name: 'OgreHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 340, forSale: false, weight: 1580, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 211, name: 'OgreMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 710, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 212, name: 'OgreLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 840, forSale: false, weight: 650, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 213, name: 'OgreTeeth', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 215, forSale: false, weight: 230, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 214, name: 'OgreClaw', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 215, forSale: false, weight: 370, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 215, name: 'ScorpionPincers', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 216, name: 'ScorpionMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 25, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 55, forSale: false, weight: 450, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 217, name: 'ScorpionSting', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 55, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 218, name: 'ScorpionSkin', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 90, forSale: false, weight: 380, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 219, name: 'SkeletonBones', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 1300, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 220, name: 'SlimeJelly', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 221, name: 'StoneGolemPiece', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 222, name: 'TrollHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 145, forSale: false, weight: 1050, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 223, name: 'TrollMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 180, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 224, name: 'TrollLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 335, forSale: false, weight: 450, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 225, name: 'TrollClaw', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 70, forSale: false, weight: 290, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 226, name: 'AlchemyManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [12, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 227, name: 'AlchemyBowl', type: 10, equipSlot: 0, effectType: 0, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: true, weight: 700, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 230, name: 'MiningManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [0, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 231, name: 'PickAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 4, 0, 2, 4, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: true, weight: 1000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 0, category: 1, color: 0 },
    { id: 232, name: 'Hoe', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 4, 0, 2, 4, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: true, weight: 1000, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 1, color: 0 },
    { id: 235, name: 'ManufacturingManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [13, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 236, name: 'ManufacturingHammer', type: 10, equipSlot: 0, effectType: 0, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 1500, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 237, name: 'HammerAttackManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [14, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 245, name: 'AresdenFlag(Master)', type: 11, equipSlot: 0, effectType: 16, effectValues: [1, 1, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 246, name: 'ElvineFlag(Master)', type: 11, equipSlot: 0, effectType: 16, effectValues: [2, 1, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 247, name: 'AresdenFlag', type: 11, equipSlot: 0, effectType: 16, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 248, name: 'ElvineFlag', type: 11, equipSlot: 0, effectType: 16, effectValues: [2, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 250, name: 'WandAttackManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [21, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 256, name: 'MagicWand(MS20)', type: 1, equipSlot: 8, effectType: 13, effectValues: [2, 4, 0, 20, 0, 0], maxDurability: 3600, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: true, weight: 1000, speed: 3, levelLimit: 50, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 257, name: 'MagicWand(MS10)', type: 1, equipSlot: 8, effectType: 13, effectValues: [2, 4, 0, 10, 0, 0], maxDurability: 2400, specialEffect: 0, specialEffectValues: [0, 0], price: 2500, forSale: true, weight: 1000, speed: 3, levelLimit: 40, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 258, name: 'MagicWand(MS0)', type: 1, equipSlot: 8, effectType: 13, effectValues: [2, 4, 0, 0, 0, 0], maxDurability: 1200, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: true, weight: 1000, speed: 3, levelLimit: 30, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 259, name: 'MagicWand(M.Shield)', type: 1, equipSlot: 8, effectType: 20, effectValues: [2, 4, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 30, specialEffectValues: [0, 0], price: 8200, forSale: false, weight: 1000, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 270, name: 'HairColorPotion', type: 7, equipSlot: 0, effectType: 12, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 271, name: 'HairStylePotion', type: 7, equipSlot: 0, effectType: 12, effectValues: [2, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 400, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 272, name: 'SkinColorPotion', type: 7, equipSlot: 0, effectType: 12, effectValues: [3, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 273, name: 'InvisibilityPotion', type: 7, equipSlot: 0, effectType: 11, effectValues: [2, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 700, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 274, name: 'SexChangePotion', type: 7, equipSlot: 0, effectType: 12, effectValues: [4, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 4000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 275, name: 'OgrePotion', type: 7, equipSlot: 0, effectType: 11, effectValues: [5, 8, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 276, name: 'UnderWearPotion', type: 7, equipSlot: 0, effectType: 12, effectValues: [5, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 4000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 290, name: 'Flameberge+3(LLF)', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 3, 2, 12, 3], maxDurability: 8000, specialEffect: 0, specialEffectValues: [-15, 10], price: 21000, forSale: false, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 291, name: 'MagicWand(MS30-LLF)', type: 1, equipSlot: 8, effectType: 13, effectValues: [2, 4, 0, 30, 0, 0], maxDurability: 4800, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 1000, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 292, name: 'GoldenAxe(LLF)', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 8, 0, 2, 8, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [0, 0], price: 32000, forSale: false, weight: 2000, speed: 6, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 300, name: 'MagicNecklace(RM10)', type: 1, equipSlot: 6, effectType: 14, effectValues: [1, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2250, forSale: false, weight: 400, speed: 0, levelLimit: 30, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 305, name: 'MagicNecklace(DM+1)', type: 1, equipSlot: 6, effectType: 14, effectValues: [3, 1, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 39800, forSale: false, weight: 400, speed: 0, levelLimit: 65, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 308, name: 'MagicNecklace(MS10)', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 7000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 311, name: 'MagicNecklace(DF+10)', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 19000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 315, name: 'GoldNecklace', type: 1, equipSlot: 6, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 1000, forSale: true, weight: 300, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 316, name: 'SilverNecklace', type: 1, equipSlot: 6, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 500, forSale: true, weight: 300, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 331, name: 'GoldRing', type: 1, equipSlot: 10, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 700, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 332, name: 'SilverRing', type: 1, equipSlot: 10, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 350, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 333, name: 'PlatinumRing', type: 1, equipSlot: 10, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 750, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 334, name: 'LuckyGoldRing', type: 1, equipSlot: 10, effectType: 14, effectValues: [5, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2750, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 335, name: 'EmeraldRing', type: 1, equipSlot: 10, effectType: 15, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 9000, specialEffect: 0, specialEffectValues: [0, -10], price: 2500, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 336, name: 'SapphireRing', type: 1, equipSlot: 10, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, -10], price: 2450, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 337, name: 'RubyRing', type: 1, equipSlot: 10, effectType: 15, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, -10], price: 1800, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 338, name: 'MemorialRing', type: 1, equipSlot: 10, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 1000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 350, name: 'Diamond', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 351, name: 'Ruby', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 352, name: 'Sapphire', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 353, name: 'Emerald', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 354, name: 'GoldNugget', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 300, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 355, name: 'Coal', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 356, name: 'SilverNugget', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 220, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 357, name: 'IronOre', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 250, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 358, name: 'Crystal', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 360, name: 'Dye(Indigo)', type: 11, equipSlot: 0, effectType: 17, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 361, name: 'Dye(Crimson-Red)', type: 11, equipSlot: 0, effectType: 17, effectValues: [2, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 362, name: 'Dye(Brown)', type: 11, equipSlot: 0, effectType: 17, effectValues: [3, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 363, name: 'Dye(Gold)', type: 11, equipSlot: 0, effectType: 17, effectValues: [4, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 364, name: 'Dye(Green)', type: 11, equipSlot: 0, effectType: 17, effectValues: [5, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 365, name: 'Dye(Gray)', type: 11, equipSlot: 0, effectType: 17, effectValues: [6, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 366, name: 'Dye(Aqua)', type: 11, equipSlot: 0, effectType: 17, effectValues: [7, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 367, name: 'Dye(Pink)', type: 11, equipSlot: 0, effectType: 17, effectValues: [8, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 368, name: 'Dye(Violet)', type: 11, equipSlot: 0, effectType: 17, effectValues: [9, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 369, name: 'Dye(Blue)', type: 11, equipSlot: 0, effectType: 17, effectValues: [10, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 370, name: 'Dye(Tan)', type: 11, equipSlot: 0, effectType: 17, effectValues: [11, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 371, name: 'Dye(Khaki)', type: 11, equipSlot: 0, effectType: 17, effectValues: [12, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 372, name: 'Dye(Yellow)', type: 11, equipSlot: 0, effectType: 17, effectValues: [13, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 373, name: 'Dye(Red)', type: 11, equipSlot: 0, effectType: 17, effectValues: [14, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 374, name: 'Dye(Black)', type: 11, equipSlot: 0, effectType: 17, effectValues: [15, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 375, name: 'DecolorationPotion', type: 11, equipSlot: 0, effectType: 17, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 380, name: 'IceStormManual', type: 3, equipSlot: 0, effectType: 18, effectValues: [55, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 1 },
    { id: 381, name: 'MassFireStrikeManual', type: 3, equipSlot: 0, effectType: 18, effectValues: [61, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 2 },
    { id: 382, name: 'BloodyShockW.Manual', type: 3, equipSlot: 0, effectType: 18, effectValues: [70, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 2 },
    { id: 385, name: 'HandAttackManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [5, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 386, name: 'ShortSwordManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [7, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 390, name: 'PowerGreenPotion', type: 7, equipSlot: 0, effectType: 22, effectValues: [300, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 600, forSale: false, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 391, name: 'SuperGreenPotion', type: 7, equipSlot: 0, effectType: 22, effectValues: [600, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1200, forSale: false, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 400, name: 'AresdenHeroCape', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 13, color: 0 },
    { id: 401, name: 'ElvineHeroCape', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 13, color: 0 },
    { id: 402, name: 'Cape', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 12, color: 0 },
    { id: 403, name: 'aHeroHelm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [18, 24, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 16000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 404, name: 'aHeroHelm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [18, 24, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 16000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 405, name: 'eHeroHelm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [18, 24, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 16000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 406, name: 'eHeroHelm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [18, 24, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 16000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 407, name: 'aHeroCap(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 15, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-7, -7], price: 12000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 408, name: 'aHeroCap(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 15, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-7, -7], price: 12000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 409, name: 'eHeroCap(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 15, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-7, -7], price: 12000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 410, name: 'eHeroCap(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 15, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-7, -7], price: 12000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 411, name: 'aHeroArmor(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [45, 48, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [-5, -5], price: 40000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 412, name: 'aHeroArmor(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [45, 48, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [-5, -5], price: 40000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 413, name: 'eHeroArmor(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [45, 48, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [-5, -5], price: 40000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 414, name: 'eHeroArmor(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [45, 48, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [-5, -5], price: 40000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 415, name: 'aHeroRobe(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 30000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 13, color: 0 },
    { id: 416, name: 'aHeroRobe(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 30000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 13, color: 0 },
    { id: 417, name: 'eHeroRobe(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 30000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 13, color: 0 },
    { id: 418, name: 'eHeroRobe(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 30000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 13, color: 0 },
    { id: 419, name: 'aHeroHauberk(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [15, 15, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-3, -3], price: 14000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 420, name: 'aHeroHauberk(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [15, 15, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-3, -3], price: 14000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 421, name: 'eHeroHauberk(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [15, 15, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-3, -3], price: 14000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 422, name: 'eHeroHauberk(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [15, 15, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-3, -3], price: 14000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 423, name: 'aHeroLeggings(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [18, 25, 1, 1, 1, 1], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-6, -6], price: 22000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 424, name: 'aHeroLeggings(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [18, 25, 1, 1, 1, 1], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-6, -6], price: 22000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 425, name: 'eHeroLeggings(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [18, 25, 1, 1, 1, 1], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-6, -6], price: 22000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 426, name: 'eHeroLeggings(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [18, 25, 1, 1, 1, 1], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-6, -6], price: 22000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 427, name: 'AresdenHeroCape+1', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 13, color: 0 },
    { id: 428, name: 'ElvineHeroCape+1', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 13, color: 0 },
    { id: 429, name: 'Cape+1', type: 1, equipSlot: 12, effectType: 2, effectValues: [2, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 12, color: 0 },
    { id: 450, name: 'Shoes', type: 1, equipSlot: 5, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 0, category: 12, color: 0 },
    { id: 451, name: 'LongBoots', type: 1, equipSlot: 5, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 0, category: 12, color: 0 },
    { id: 453, name: 'Shirt(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 0 },
    { id: 454, name: 'Hauberk(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [8, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [-3, -3], price: 400, forSale: true, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 455, name: 'LeatherArmor(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [10, 10, 0, 0, 0, 0], maxDurability: 400, specialEffect: 0, specialEffectValues: [-5, -5], price: 500, forSale: true, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 456, name: 'ChainMail(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [30, 32, 0, 0, 0, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-12, -12], price: 1200, forSale: true, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 457, name: 'ScaleMail(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 600, specialEffect: 0, specialEffectValues: [-8, -8], price: 900, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 458, name: 'PlateMail(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [37, 40, 0, 0, 0, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-10, -10], price: 4500, forSale: true, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 459, name: 'Trousers(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 80, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 0 },
    { id: 460, name: 'KneeTrousers(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 0 },
    { id: 461, name: 'ChainHose(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [6, 10, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [-3, -3], price: 400, forSale: true, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 462, name: 'PlateLeggings(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [12, 20, 1, 1, 1, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-6, -6], price: 1000, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 0 },
    { id: 470, name: 'Chemise(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 471, name: 'Shirt(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 472, name: 'Hauberk(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [8, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [-3, -3], price: 400, forSale: true, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 473, name: 'Bodice(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 400, specialEffect: 0, specialEffectValues: [-1, -1], price: 150, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 474, name: 'LongBodice(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 400, specialEffect: 0, specialEffectValues: [-1, -1], price: 180, forSale: true, weight: 200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 475, name: 'LeatherArmor(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [10, 10, 0, 0, 0, 0], maxDurability: 400, specialEffect: 0, specialEffectValues: [-5, -5], price: 500, forSale: true, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 476, name: 'ChainMail(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [30, 32, 0, 0, 0, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-12, -12], price: 1200, forSale: true, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 477, name: 'ScaleMail(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [20, 20, 0, 0, 0, 0], maxDurability: 600, specialEffect: 0, specialEffectValues: [-8, -8], price: 900, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 478, name: 'PlateMail(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [37, 40, 0, 0, 0, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [-10, -10], price: 4500, forSale: true, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 479, name: 'Skirt(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 480, name: 'Trousers(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 80, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 481, name: 'KneeTrousers(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [1, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 482, name: 'ChainHose(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [6, 10, 1, 1, 1, 1], maxDurability: 500, specialEffect: 0, specialEffectValues: [-3, -3], price: 400, forSale: true, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 483, name: 'PlateLeggings(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [12, 20, 1, 1, 1, 1], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-6, -6], price: 1000, forSale: true, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 0 },
    { id: 484, name: 'Tunic(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [3, 1, 1, 1, 1, 1], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 350, forSale: true, weight: 500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 0 },
    { id: 490, name: 'BloodSword', type: 1, equipSlot: 9, effectType: 19, effectValues: [4, 7, 1, 4, 7, 1], maxDurability: 8000, specialEffect: 5, specialEffectValues: [0, 0], price: 31000, forSale: false, weight: 13100, speed: 11, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 9 },
    { id: 491, name: 'BloodAxe', type: 1, equipSlot: 8, effectType: 19, effectValues: [3, 6, 2, 3, 6, 2], maxDurability: 5000, specialEffect: 5, specialEffectValues: [0, 0], price: 25000, forSale: false, weight: 6100, speed: 8, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 9 },
    { id: 492, name: 'BloodRapier', type: 1, equipSlot: 8, effectType: 19, effectValues: [2, 5, 2, 2, 5, 2], maxDurability: 5000, specialEffect: 5, specialEffectValues: [0, 0], price: 25000, forSale: false, weight: 1100, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 9, category: 1, color: 9 },
    { id: 500, name: 'IronIngot', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 501, name: 'SuperCoal', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 502, name: 'UltraCoal', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 503, name: 'GoldIngot', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 504, name: 'SilverIngot', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 505, name: 'BlondeIngot', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 506, name: 'MithralIngot', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 800, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 507, name: 'BlondeStone', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 160, forSale: false, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 508, name: 'Mithral', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50, forSale: false, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 511, name: 'ArenaTicket', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 11, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 513, name: 'ArenaTicket(2)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 12, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 515, name: 'ArenaTicket(3)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 13, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 517, name: 'ArenaTicket(4)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 14, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 520, name: 'Bouquette', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: true, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 521, name: 'FlowerBasket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1500, forSale: true, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 522, name: 'Flowerpot', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: true, weight: 180, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 530, name: 'ArenaTicket(5)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 15, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 531, name: 'ArenaTicket(6)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 16, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 532, name: 'ArenaTicket(7)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 17, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 533, name: 'ArenaTicket(8)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 18, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 534, name: 'ArenaTicket(9)', type: 3, equipSlot: 0, effectType: 11, effectValues: [4, 19, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 540, name: 'DemonEye', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 530, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 541, name: 'DemonHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 542, name: 'DemonMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 543, name: 'DemonLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 900, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 544, name: 'UnicornHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 230, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 545, name: 'UnicornHorn', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50000, forSale: false, weight: 250, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 546, name: 'UnicornMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 547, name: 'UnicornLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 650, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 548, name: 'WerewolfHeart', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 210, forSale: false, weight: 350, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 549, name: 'WerewolfNail', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 140, forSale: false, weight: 290, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 550, name: 'WerewolfMeat', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 250, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 551, name: 'WerewolfTail', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 550, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 552, name: 'WerewolfTeeth', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 140, forSale: false, weight: 290, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 553, name: 'WerewolfLeather', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 820, forSale: false, weight: 450, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 554, name: 'WerewolfClaw', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 140, forSale: false, weight: 290, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 560, name: 'BattleAxe', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 8, 0, 3, 9, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [0, 0], price: 3500, forSale: true, weight: 9000, speed: 13, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 570, name: 'RedCarp', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 30, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1200, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 571, name: 'GreenCarp', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 40, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1500, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 572, name: 'GoldCarp', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 60, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 573, name: 'CrucianCarp', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 574, name: 'BlueSeaBream', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 80, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 575, name: 'Salmon', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 800, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 576, name: 'RedSeaBream', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 50, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 80, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 577, name: 'GrayMullet', type: 7, equipSlot: 0, effectType: 7, effectValues: [8, 4, 5, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 580, name: 'BattleAxe+1', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 8, 1, 3, 9, 1], maxDurability: 2000, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: true, weight: 9000, speed: 13, levelLimit: 110, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 581, name: 'BattleAxe+2', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 8, 2, 3, 9, 2], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 48000, forSale: false, weight: 9000, speed: 13, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 582, name: 'Sabre+2', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 8, 2, 1, 8, 2], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-1, 0], price: 2400, forSale: false, weight: 1200, speed: 5, levelLimit: 20, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 590, name: 'Robe(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [12, 1, 0, 14, 100, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: true, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 0 },
    { id: 591, name: 'Robe(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [12, 1, 0, 14, 100, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: true, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 0 },
    { id: 600, name: 'Helm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [5, 10, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-4, -4], price: 800, forSale: true, weight: 5200, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 601, name: 'FullHelm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [10, 20, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-7, -7], price: 1500, forSale: true, weight: 8500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 602, name: 'Helm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [5, 10, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [-4, -4], price: 800, forSale: true, weight: 5200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 603, name: 'FullHelm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [10, 20, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-7, -7], price: 1500, forSale: true, weight: 8500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 610, name: 'XelimaBlade', type: 1, equipSlot: 9, effectType: 24, effectValues: [2, 11, 2, 2, 12, 2], maxDurability: 8000, specialEffect: 1, specialEffectValues: [60, 0], price: 31000, forSale: false, weight: 12000, speed: 11, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 611, name: 'XelimaAxe', type: 1, equipSlot: 9, effectType: 24, effectValues: [3, 8, 1, 3, 9, 1], maxDurability: 5000, specialEffect: 1, specialEffectValues: [60, 0], price: 31000, forSale: false, weight: 12000, speed: 13, levelLimit: 0, genderLimit: 0, relatedSkill: 10, category: 1, color: 0 },
    { id: 612, name: 'XelimaRapier', type: 1, equipSlot: 8, effectType: 24, effectValues: [2, 6, 1, 2, 6, 1], maxDurability: 5000, specialEffect: 1, specialEffectValues: [60, 0], price: 25000, forSale: false, weight: 1100, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 9, category: 1, color: 0 },
    { id: 613, name: 'SwordofMedusa', type: 1, equipSlot: 9, effectType: 24, effectValues: [2, 11, 2, 2, 12, 2], maxDurability: 7000, specialEffect: 3, specialEffectValues: [60, 0], price: 31000, forSale: false, weight: 10000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 614, name: 'SwordofIceElemental', type: 1, equipSlot: 9, effectType: 24, effectValues: [2, 11, 2, 2, 12, 2], maxDurability: 7000, specialEffect: 2, specialEffectValues: [60, 0], price: 31000, forSale: false, weight: 10000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 615, name: 'GiantSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 11, 3, 2, 12, 3], maxDurability: 1500, specialEffect: 0, specialEffectValues: [0, 0], price: 8000, forSale: true, weight: 13000, speed: 12, levelLimit: 100, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 616, name: 'DemonSlayer', type: 1, equipSlot: 9, effectType: 1, effectValues: [4, 7, 2, 4, 8, 2], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 25000, forSale: false, weight: 12000, speed: 12, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 9 },
    { id: 617, name: 'CompositeBow', type: 1, equipSlot: 9, effectType: 3, effectValues: [1, 6, 0, 1, 6, 0], maxDurability: 1200, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: true, weight: 4000, speed: 5, levelLimit: 70, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 618, name: 'DarkElfBow', type: 1, equipSlot: 9, effectType: 3, effectValues: [2, 7, 0, 2, 7, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [0, 0], price: 8000, forSale: false, weight: 8000, speed: 4, levelLimit: 0, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 620, name: 'MerienShield', type: 1, equipSlot: 7, effectType: 25, effectValues: [50, 1, 1, 1, 1, 1], maxDurability: 1600, specialEffect: 52, specialEffectValues: [60, 0], price: 45000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 621, name: 'MerienPlateMailM', type: 1, equipSlot: 2, effectType: 25, effectValues: [60, 45, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 50, specialEffectValues: [60, 0], price: 45000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 5 },
    { id: 622, name: 'MerienPlateMailW', type: 1, equipSlot: 2, effectType: 25, effectValues: [60, 45, 0, 0, 0, 0], maxDurability: 5000, specialEffect: 50, specialEffectValues: [60, 0], price: 45000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 5 },
    { id: 623, name: 'GM-Shield', type: 1, equipSlot: 7, effectType: 25, effectValues: [50, 1, 1, 1, 1, 1], maxDurability: 1600, specialEffect: 53, specialEffectValues: [60, 0], price: 1000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: 11, category: 5, color: 0 },
    { id: 630, name: 'RingoftheXelima', type: 1, equipSlot: 10, effectType: 14, effectValues: [3, 7, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 631, name: 'RingoftheAbaddon', type: 1, equipSlot: 10, effectType: 14, effectValues: [3, 10, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 19000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 632, name: 'RingofOgrepower', type: 1, equipSlot: 10, effectType: 14, effectValues: [3, 2, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 633, name: 'RingofDemonpower', type: 1, equipSlot: 10, effectType: 14, effectValues: [3, 4, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 634, name: 'RingofWizard', type: 1, equipSlot: 10, effectType: 14, effectValues: [6, 1, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 635, name: 'RingofMage', type: 1, equipSlot: 10, effectType: 14, effectValues: [6, 2, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 636, name: 'RingofGrandMage', type: 1, equipSlot: 10, effectType: 14, effectValues: [6, 3, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 637, name: 'KnecklaceOfLightPro', type: 1, equipSlot: 6, effectType: 14, effectValues: [7, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 638, name: 'KnecklaceOfFirePro', type: 1, equipSlot: 6, effectType: 14, effectValues: [9, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 639, name: 'KnecklaceOfPoisonPro', type: 1, equipSlot: 6, effectType: 14, effectValues: [11, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 640, name: 'KnecklaceOfSufferent', type: 1, equipSlot: 6, effectType: 14, effectValues: [11, 110, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 641, name: 'KnecklaceOfMedusa', type: 1, equipSlot: 6, effectType: 14, effectValues: [11, 500, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 5 },
    { id: 642, name: 'KnecklaceOfIcePro', type: 1, equipSlot: 6, effectType: 14, effectValues: [10, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 643, name: 'KnecklaceOfIceEle', type: 1, equipSlot: 6, effectType: 14, effectValues: [10, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 644, name: 'KnecklaceOfAirEle', type: 1, equipSlot: 6, effectType: 14, effectValues: [7, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 645, name: 'KnecklaceOfEfreet', type: 1, equipSlot: 6, effectType: 14, effectValues: [9, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 646, name: 'NecklaceOfBeholder', type: 1, equipSlot: 6, effectType: 14, effectValues: [9, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 647, name: 'NecklaceOfStoneGol', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 648, name: 'NecklaceOfLiche', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 15, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 10000, forSale: false, weight: 600, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 650, name: 'ZemstoneofSacrifice', type: 0, equipSlot: 0, effectType: 26, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 5000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 0, color: 0 },
    { id: 651, name: 'GreenBall', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 652, name: 'RedBall', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 653, name: 'YellowBall', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 654, name: 'BlueBall', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 655, name: 'PearlBall', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 656, name: 'StoneOfXelima', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 657, name: 'StoneOfMerien', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 3, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 658, name: 'AresdenMinePotion', type: 7, equipSlot: 0, effectType: 4, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 659, name: 'ElvineMinePotion', type: 7, equipSlot: 0, effectType: 4, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10, forSale: true, weight: 30, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 660, name: 'UnfreezePotion', type: 7, equipSlot: 0, effectType: 28, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 671, name: 'KnightRapier', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 2, 1, 7, 2], maxDurability: 1100, specialEffect: 0, specialEffectValues: [0, 0], price: 3200, forSale: true, weight: 1200, speed: 3, levelLimit: 95, genderLimit: 0, relatedSkill: 9, category: 1, color: 11 },
    { id: 672, name: 'KnightGreatSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 8, 2, 2, 10, 2], maxDurability: 1200, specialEffect: 0, specialEffectValues: [-8, 5], price: 3500, forSale: true, weight: 5200, speed: 8, levelLimit: 85, genderLimit: 0, relatedSkill: 8, category: 1, color: 11 },
    { id: 673, name: 'KnightFlameberge', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 2, 2, 12, 2], maxDurability: 1200, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: true, weight: 6000, speed: 10, levelLimit: 95, genderLimit: 0, relatedSkill: 8, category: 1, color: 11 },
    { id: 674, name: 'KnightWarAxe', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 6, 2, 2, 8, 2], maxDurability: 1200, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: true, weight: 4400, speed: 8, levelLimit: 85, genderLimit: 0, relatedSkill: 10, category: 1, color: 11 },
    { id: 675, name: 'KnightPlateMail(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [40, 42, 0, 0, 0, 0], maxDurability: 3500, specialEffect: 0, specialEffectValues: [-10, -10], price: 6000, forSale: true, weight: 10000, speed: 0, levelLimit: 85, genderLimit: 1, relatedSkill: 0, category: 6, color: 11 },
    { id: 676, name: 'KnightPlateMail(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [40, 42, 0, 0, 0, 0], maxDurability: 3500, specialEffect: 0, specialEffectValues: [-10, -10], price: 6000, forSale: true, weight: 10000, speed: 0, levelLimit: 85, genderLimit: 2, relatedSkill: 0, category: 6, color: 11 },
    { id: 677, name: 'KnightPlateLeg(M)', type: 1, equipSlot: 4, effectType: 2, effectValues: [15, 22, 1, 1, 1, 1], maxDurability: 1100, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: true, weight: 2000, speed: 0, levelLimit: 80, genderLimit: 1, relatedSkill: 0, category: 6, color: 11 },
    { id: 678, name: 'KnightPlateLeg(W)', type: 1, equipSlot: 4, effectType: 2, effectValues: [15, 22, 1, 1, 1, 1], maxDurability: 1100, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: true, weight: 2000, speed: 0, levelLimit: 80, genderLimit: 2, relatedSkill: 0, category: 6, color: 11 },
    { id: 679, name: 'KnightFullHelm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 22, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-7, -7], price: 3500, forSale: true, weight: 8500, speed: 0, levelLimit: 80, genderLimit: 1, relatedSkill: -1, category: 6, color: 11 },
    { id: 680, name: 'KnightFullHelm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [12, 22, 0, 0, 0, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [-7, -7], price: 3500, forSale: true, weight: 8500, speed: 0, levelLimit: 80, genderLimit: 2, relatedSkill: -1, category: 6, color: 11 },
    { id: 681, name: 'WizardHauberk(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [12, 12, 0, 14, 100, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: true, weight: 1200, speed: 0, levelLimit: 90, genderLimit: 1, relatedSkill: 0, category: 6, color: 11 },
    { id: 682, name: 'WizardHauberk(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [12, 12, 0, 14, 100, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: true, weight: 1200, speed: 0, levelLimit: 90, genderLimit: 2, relatedSkill: 0, category: 6, color: 11 },
    { id: 683, name: 'WizMagicWand(MS20)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 20, 0, 0], maxDurability: 3600, specialEffect: 10, specialEffectValues: [0, 0], price: 6000, forSale: true, weight: 1000, speed: 3, levelLimit: 95, genderLimit: 0, relatedSkill: 21, category: 8, color: 4 },
    { id: 684, name: 'WizMagicWand(MS10)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 10, 0, 0], maxDurability: 3600, specialEffect: 10, specialEffectValues: [0, 0], price: 5500, forSale: true, weight: 1000, speed: 3, levelLimit: 90, genderLimit: 0, relatedSkill: 21, category: 8, color: 4 },
    { id: 685, name: 'WizardRobe(M)', type: 1, equipSlot: 2, effectType: 2, effectValues: [12, 1, 0, 14, 100, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: true, weight: 1000, speed: 0, levelLimit: 80, genderLimit: 1, relatedSkill: 0, category: 13, color: 11 },
    { id: 686, name: 'WizardRobe(W)', type: 1, equipSlot: 2, effectType: 2, effectValues: [12, 1, 0, 14, 100, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: true, weight: 1000, speed: 0, levelLimit: 80, genderLimit: 2, relatedSkill: 0, category: 13, color: 11 },
    { id: 687, name: 'KnightHauberk(M)', type: 1, equipSlot: 3, effectType: 2, effectValues: [12, 12, 0, 11, 100, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: true, weight: 1200, speed: 0, levelLimit: 70, genderLimit: 1, relatedSkill: 0, category: 6, color: 11 },
    { id: 688, name: 'KnightHauberk(W)', type: 1, equipSlot: 3, effectType: 2, effectValues: [12, 12, 0, 11, 100, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: true, weight: 1200, speed: 0, levelLimit: 70, genderLimit: 2, relatedSkill: 0, category: 6, color: 11 },
    { id: 700, name: 'SangAhHauberk', type: 1, equipSlot: 3, effectType: 2, effectValues: [18, 18, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 701, name: 'SangAhFullHel', type: 1, equipSlot: 1, effectType: 2, effectValues: [17, 27, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-7, -7], price: 3500, forSale: false, weight: 8500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 6 },
    { id: 702, name: 'SangAhLeggings', type: 1, equipSlot: 4, effectType: 2, effectValues: [21, 28, 1, 1, 1, 1], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 703, name: 'SangAhFlameberge', type: 1, equipSlot: 9, effectType: 1, effectValues: [4, 7, 0, 4, 7, 0], maxDurability: 50000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 704, name: 'SangAhPlateMail', type: 1, equipSlot: 2, effectType: 2, effectValues: [53, 55, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-10, -10], price: 1000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 705, name: 'SangAhJewel', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 706, name: 'DarkKnightHauberk', type: 1, equipSlot: 3, effectType: 2, effectValues: [18, 18, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 707, name: 'DarkKnightFullHelm', type: 1, equipSlot: 1, effectType: 2, effectValues: [17, 27, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-7, -7], price: 3500, forSale: false, weight: 8500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: -1, category: 6, color: 6 },
    { id: 708, name: 'DarkKnightLeggings', type: 1, equipSlot: 4, effectType: 2, effectValues: [21, 28, 1, 1, 1, 1], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 709, name: 'DarkKnightFlameberge', type: 1, equipSlot: 9, effectType: 1, effectValues: [4, 7, 0, 4, 7, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 710, name: 'DarkKnightPlateMail', type: 1, equipSlot: 2, effectType: 2, effectValues: [53, 55, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-10, -10], price: 6000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 711, name: 'DarkMageHauberk', type: 1, equipSlot: 3, effectType: 2, effectValues: [18, 18, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 712, name: 'DarkMageChainMail', type: 1, equipSlot: 2, effectType: 2, effectValues: [36, 38, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-12, -12], price: 1200, forSale: false, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 713, name: 'DarkMageLeggings', type: 1, equipSlot: 4, effectType: 2, effectValues: [21, 28, 1, 1, 1, 1], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 714, name: 'DarkMageMagicStaff', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 25, 0, 0], maxDurability: 30000, specialEffect: 10, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 1000, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 21, category: 8, color: 6 },
    { id: 715, name: 'DarkMageRobe', type: 1, equipSlot: 2, effectType: 2, effectValues: [22, 20, 0, 14, 100, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 11, color: 6 },
    { id: 716, name: 'DarkMageLedderArmor', type: 1, equipSlot: 2, effectType: 2, effectValues: [24, 22, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-5, -5], price: 2000, forSale: false, weight: 1500, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 717, name: 'DarkKnightRapier', type: 1, equipSlot: 8, effectType: 1, effectValues: [1, 7, 0, 1, 7, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 1100, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 9, category: 1, color: 6 },
    { id: 718, name: 'DarkKnightGreatSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 8, 0, 2, 10, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-8, 5], price: 3000, forSale: false, weight: 5200, speed: 8, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 719, name: 'DarkMageScaleMail', type: 1, equipSlot: 2, effectType: 2, effectValues: [32, 30, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-8, -8], price: 1000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 6, color: 6 },
    { id: 720, name: 'Songpyon', type: 7, equipSlot: 0, effectType: 22, effectValues: [900, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2400, forSale: false, weight: 20, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 721, name: 'Ginseng', type: 7, equipSlot: 0, effectType: 28, effectValues: [2, 12, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 600, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 722, name: 'BeefRibSet', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 50000, forSale: false, weight: 5000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 0, color: 0 },
    { id: 723, name: 'Wine', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 25000, forSale: false, weight: 250, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 0, color: 0 },
    { id: 724, name: 'DarkKnightHauberkW', type: 1, equipSlot: 3, effectType: 2, effectValues: [18, 18, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 725, name: 'DarkKnightFullHelmW', type: 1, equipSlot: 1, effectType: 2, effectValues: [17, 27, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-7, -7], price: 3500, forSale: false, weight: 8500, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: -1, category: 6, color: 6 },
    { id: 726, name: 'DarkKnightLeggingsW', type: 1, equipSlot: 4, effectType: 2, effectValues: [21, 28, 1, 1, 1, 1], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 727, name: 'DarkKnightFlamebergW', type: 1, equipSlot: 9, effectType: 1, effectValues: [4, 7, 0, 4, 7, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 728, name: 'DarkKnightPlateMailW', type: 1, equipSlot: 2, effectType: 2, effectValues: [53, 55, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-10, -10], price: 6000, forSale: false, weight: 10000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 729, name: 'DarkMageHauberkW', type: 1, equipSlot: 3, effectType: 2, effectValues: [18, 18, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-3, -3], price: 2400, forSale: false, weight: 1200, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 730, name: 'DarkMageChainMailW', type: 1, equipSlot: 2, effectType: 2, effectValues: [36, 38, 0, 0, 0, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-12, -12], price: 1200, forSale: false, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 731, name: 'DarkMageLeggingsW', type: 1, equipSlot: 4, effectType: 2, effectValues: [21, 28, 1, 1, 1, 1], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-6, -6], price: 3000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 6, color: 6 },
    { id: 732, name: 'DarkMageMagicStaffW', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 25, 0, 0], maxDurability: 30000, specialEffect: 10, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 1000, speed: 3, levelLimit: 0, genderLimit: 0, relatedSkill: 21, category: 8, color: 6 },
    { id: 733, name: 'DarkMageRobeW', type: 1, equipSlot: 2, effectType: 2, effectValues: [22, 20, 0, 14, 100, 0], maxDurability: 30000, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 11, color: 6 },
    { id: 734, name: 'RingofArcmage', type: 1, equipSlot: 10, effectType: 14, effectValues: [6, 4, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 735, name: 'RingofDragonpower', type: 1, equipSlot: 10, effectType: 14, effectValues: [3, 5, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 736, name: 'SangAhGiantSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 2, 2, 12, 2], maxDurability: 50000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 120, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 737, name: 'DarkKnightGiantSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 2, 2, 12, 2], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 120, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 738, name: 'DarkMageMagicWand', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 28, 0, 0], maxDurability: 30000, specialEffect: 10, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 1000, speed: 3, levelLimit: 120, genderLimit: 0, relatedSkill: 21, category: 8, color: 6 },
    { id: 740, name: '5000GoldPocket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 500, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 741, name: '10000GoldPocket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 742, name: '50000GoldPocket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100000, forSale: false, weight: 2000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 743, name: '100000GoldPocket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200000, forSale: false, weight: 3000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 744, name: '1000000GoldPocket', type: 0, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000000, forSale: false, weight: 4000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 745, name: 'BlackKnightTemple', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 10, 2, 2, 12, 2], maxDurability: 30000, specialEffect: 0, specialEffectValues: [-15, 10], price: 3700, forSale: false, weight: 6000, speed: 10, levelLimit: 120, genderLimit: 0, relatedSkill: 8, category: 1, color: 6 },
    { id: 746, name: 'BlackMageTemple', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 28, 0, 0], maxDurability: 30000, specialEffect: 10, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 1000, speed: 3, levelLimit: 120, genderLimit: 0, relatedSkill: 21, category: 8, color: 6 },
    { id: 750, name: 'Horned-Helm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [17, 24, 0, 0, 0, 0], maxDurability: 3500, specialEffect: 0, specialEffectValues: [-7, -7], price: 4000, forSale: true, weight: 16000, speed: 0, levelLimit: 120, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 751, name: 'Wings-Helm(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [15, 22, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 5000, forSale: true, weight: 13000, speed: 0, levelLimit: 100, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 752, name: 'Wizard-Cap(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [5, 10, 0, 14, 110, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [-7, -7], price: 1500, forSale: true, weight: 1500, speed: 0, levelLimit: 90, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 753, name: 'Wizard-Hat(M)', type: 1, equipSlot: 1, effectType: 2, effectValues: [10, 15, 0, 14, 130, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-7, -7], price: 3000, forSale: true, weight: 1500, speed: 0, levelLimit: 120, genderLimit: 1, relatedSkill: -1, category: 6, color: 0 },
    { id: 754, name: 'Horned-Helm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [17, 24, 0, 0, 0, 0], maxDurability: 3500, specialEffect: 0, specialEffectValues: [-7, -7], price: 4000, forSale: true, weight: 16000, speed: 0, levelLimit: 120, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 755, name: 'Wings-Helm(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [15, 22, 0, 0, 0, 0], maxDurability: 2500, specialEffect: 0, specialEffectValues: [-7, -7], price: 5000, forSale: true, weight: 13000, speed: 0, levelLimit: 100, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 756, name: 'Wizard-Cap(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [5, 10, 0, 14, 110, 0], maxDurability: 500, specialEffect: 0, specialEffectValues: [-7, -7], price: 1500, forSale: true, weight: 1500, speed: 0, levelLimit: 90, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 757, name: 'Wizard-Hat(W)', type: 1, equipSlot: 1, effectType: 2, effectValues: [10, 15, 0, 14, 130, 0], maxDurability: 800, specialEffect: 0, specialEffectValues: [-7, -7], price: 3000, forSale: true, weight: 1500, speed: 0, levelLimit: 120, genderLimit: 2, relatedSkill: -1, category: 6, color: 0 },
    { id: 760, name: 'Hammer', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 7, 0, 3, 9, 0], maxDurability: 2000, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: true, weight: 9000, speed: 12, levelLimit: 0, genderLimit: 0, relatedSkill: 14, category: 1, color: 0 },
    { id: 761, name: 'BattleHammer', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 7, 2, 3, 9, 2], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 9000, forSale: true, weight: 12000, speed: 14, levelLimit: 110, genderLimit: 0, relatedSkill: 14, category: 1, color: 0 },
    { id: 762, name: 'GiantBattleHammer', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 9, 3, 3, 10, 3], maxDurability: 6000, specialEffect: 0, specialEffectValues: [0, 0], price: 15000, forSale: false, weight: 14000, speed: 14, levelLimit: 110, genderLimit: 0, relatedSkill: 14, category: 1, color: 9 },
    { id: 765, name: 'ThirdMemorialRing', type: 1, equipSlot: 10, effectType: 4, effectValues: [0, 0, 0, 10, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 1000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 770, name: 'SantaCostume(M)', type: 1, equipSlot: 13, effectType: 14, effectValues: [10, 25, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [0, 0], price: 18000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 1, relatedSkill: 0, category: 15, color: 0 },
    { id: 771, name: 'SantaCostume(W)', type: 1, equipSlot: 13, effectType: 14, effectValues: [10, 25, 0, 0, 0, 0], maxDurability: 1500, specialEffect: 0, specialEffectValues: [0, 0], price: 18000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 2, relatedSkill: 0, category: 15, color: 0 },
    { id: 780, name: 'RedCandy', type: 7, equipSlot: 0, effectType: 4, effectValues: [3, 8, 200, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 781, name: 'BlueCandy', type: 7, equipSlot: 0, effectType: 5, effectValues: [4, 8, 200, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 782, name: 'GreenCandy', type: 7, equipSlot: 0, effectType: 6, effectValues: [4, 8, 200, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 800, name: 'FarmingManual', type: 3, equipSlot: 0, effectType: 9, effectValues: [2, 20, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 801, name: 'SeedBag(WaterMelon)', type: 11, equipSlot: 0, effectType: 30, effectValues: [1, 20, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 802, name: 'SeedBag(Pumpkin)', type: 11, equipSlot: 0, effectType: 30, effectValues: [2, 20, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 803, name: 'SeedBag(Garlic)', type: 11, equipSlot: 0, effectType: 30, effectValues: [3, 30, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 150, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 804, name: 'SeedBag(Barley)', type: 11, equipSlot: 0, effectType: 30, effectValues: [4, 30, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 150, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 805, name: 'SeedBag(Carrot)', type: 11, equipSlot: 0, effectType: 30, effectValues: [5, 40, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 806, name: 'SeedBag(Radish)', type: 11, equipSlot: 0, effectType: 30, effectValues: [6, 40, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 807, name: 'SeedBag(Corn)', type: 11, equipSlot: 0, effectType: 30, effectValues: [7, 50, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 250, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 808, name: 'SeedBag(CBellflower)', type: 11, equipSlot: 0, effectType: 30, effectValues: [8, 50, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 250, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 809, name: 'SeedBag(Melone)', type: 11, equipSlot: 0, effectType: 30, effectValues: [9, 60, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 810, name: 'SeedBag(Tommato)', type: 11, equipSlot: 0, effectType: 30, effectValues: [10, 60, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 811, name: 'SeedBag(Grapes)', type: 11, equipSlot: 0, effectType: 30, effectValues: [11, 70, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 350, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 812, name: 'SeedBag(BlueGrapes)', type: 11, equipSlot: 0, effectType: 30, effectValues: [12, 70, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 350, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 813, name: 'SeedBag(Mushroom)', type: 11, equipSlot: 0, effectType: 30, effectValues: [13, 80, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 400, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 814, name: 'SeedBag(Ginseng)', type: 11, equipSlot: 0, effectType: 30, effectValues: [14, 90, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 450, forSale: true, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 820, name: 'WaterMelon', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 120, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 821, name: 'Pumpkin', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 120, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 822, name: 'Garlic', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 180, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 823, name: 'Barley', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 180, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 824, name: 'Carrot', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 825, name: 'Radish', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 200, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 826, name: 'Corn', type: 7, equipSlot: 0, effectType: 7, effectValues: [4, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 240, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 827, name: 'ChineseBellflower', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 240, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 828, name: 'Melone', type: 7, equipSlot: 0, effectType: 7, effectValues: [5, 7, 12, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 829, name: 'Tommato', type: 7, equipSlot: 0, effectType: 7, effectValues: [5, 7, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 830, name: 'Grapes', type: 7, equipSlot: 0, effectType: 7, effectValues: [5, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 360, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 831, name: 'BlueGrapes', type: 7, equipSlot: 0, effectType: 7, effectValues: [5, 8, 10, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 360, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 832, name: 'Mushroom', type: 5, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 400, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 840, name: 'SuperRedPotion', type: 7, equipSlot: 0, effectType: 4, effectValues: [3, 8, 130, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 841, name: 'SuperBluePotion', type: 7, equipSlot: 0, effectType: 5, effectValues: [3, 8, 130, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 842, name: 'SuperGreenPotion', type: 7, equipSlot: 0, effectType: 6, effectValues: [4, 8, 130, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 2000, forSale: false, weight: 100, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 843, name: 'BarbarianHammer', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 9, 2, 3, 10, 2], maxDurability: 4500, specialEffect: 0, specialEffectValues: [0, 0], price: 15000, forSale: true, weight: 20000, speed: 15, levelLimit: 110, genderLimit: 0, relatedSkill: 14, category: 1, color: 0 },
    { id: 844, name: 'BlackShadowSword', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 12, 3, 2, 12, 3], maxDurability: 2800, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: true, weight: 15000, speed: 14, levelLimit: 120, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 845, name: 'StormBringer', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 10, 0, 3, 11, 0], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 12000, forSale: false, weight: 11000, speed: 11, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 846, name: 'The_Devastator', type: 1, equipSlot: 9, effectType: 1, effectValues: [4, 8, 1, 4, 9, 1], maxDurability: 3000, specialEffect: 0, specialEffectValues: [0, 0], price: 18000, forSale: false, weight: 20000, speed: 15, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 847, name: 'DarkExecutor', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 12, 3, 2, 13, 3], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 14000, forSale: false, weight: 14000, speed: 13, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 848, name: 'LightingBlade', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 12, 3, 2, 13, 3], maxDurability: 4000, specialEffect: 0, specialEffectValues: [0, 0], price: 14000, forSale: false, weight: 14000, speed: 13, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 849, name: 'KlonessBlade', type: 1, equipSlot: 9, effectType: 1, effectValues: [2, 12, 2, 2, 13, 2], maxDurability: 8000, specialEffect: 0, specialEffectValues: [0, 0], price: 12000, forSale: false, weight: 12000, speed: 12, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 850, name: 'KlonessAxe', type: 1, equipSlot: 9, effectType: 1, effectValues: [3, 9, 1, 3, 10, 1], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 8000, forSale: false, weight: 15000, speed: 14, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 851, name: 'KlonessEsterk', type: 1, equipSlot: 8, effectType: 1, effectValues: [2, 6, 2, 2, 7, 2], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: false, weight: 5000, speed: 5, levelLimit: 0, genderLimit: 0, relatedSkill: 8, category: 1, color: 0 },
    { id: 852, name: 'CancelManual', type: 3, equipSlot: 0, effectType: 18, effectValues: [76, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 1 },
    { id: 853, name: 'E.S.W.Manual', type: 3, equipSlot: 0, effectType: 18, effectValues: [96, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 1 },
    { id: 857, name: 'I.M.CManual', type: 3, equipSlot: 0, effectType: 18, effectValues: [83, 0, 0, 0, 0, 0], maxDurability: 0, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 1 },
    { id: 858, name: 'NecklaceOfMerien', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 50, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 859, name: 'NecklaceOfKloness', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 860, name: 'NecklaceOfXelima', type: 1, equipSlot: 6, effectType: 14, effectValues: [12, 100, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 20000, forSale: false, weight: 1000, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 5 },
    { id: 861, name: 'BerserkWand(MS.20)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 20, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 12000, forSale: false, weight: 1000, speed: 3, levelLimit: 100, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 862, name: 'BerserkWand(MS.10)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 10, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 12000, forSale: false, weight: 1000, speed: 3, levelLimit: 100, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 863, name: 'KlonessWand(MS.20)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 20, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 14000, forSale: false, weight: 1000, speed: 3, levelLimit: 120, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 864, name: 'KlonessWand(MS.10)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 10, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 14000, forSale: false, weight: 1000, speed: 3, levelLimit: 120, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 865, name: 'ResurWand(MS.20)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 20, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 1000, speed: 3, levelLimit: 100, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 866, name: 'ResurWand(MS.10)', type: 1, equipSlot: 8, effectType: 13, effectValues: [1, 6, 0, 10, 0, 0], maxDurability: 5000, specialEffect: 0, specialEffectValues: [0, 0], price: 10000, forSale: false, weight: 1000, speed: 3, levelLimit: 100, genderLimit: 0, relatedSkill: 21, category: 8, color: 0 },
    { id: 867, name: 'AcientTablet', type: 3, equipSlot: 0, effectType: 31, effectValues: [7, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 868, name: 'AcientTablet(LU)', type: 10, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 869, name: 'AcientTablet(LD)', type: 10, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 870, name: 'AcientTablet(RU)', type: 10, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 871, name: 'AcientTablet(RD)', type: 10, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 1, forSale: false, weight: 50, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 31, color: 0 },
    { id: 873, name: 'Fire-Bow', type: 1, equipSlot: 9, effectType: 3, effectValues: [2, 5, 0, 2, 5, 0], maxDurability: 1000, specialEffect: 0, specialEffectValues: [0, 0], price: 6000, forSale: true, weight: 7000, speed: 6, levelLimit: 70, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 874, name: 'Direction-Bow', type: 1, equipSlot: 9, effectType: 3, effectValues: [2, 6, 0, 2, 6, 0], maxDurability: 1200, specialEffect: 0, specialEffectValues: [0, 0], price: 7000, forSale: true, weight: 10000, speed: 8, levelLimit: 70, genderLimit: 0, relatedSkill: 6, category: 3, color: 0 },
    { id: 875, name: 'SummonScroll(SOR)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 9, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 876, name: 'SummonScroll(ATK)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 10, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 877, name: 'SummonScroll(ELF)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 11, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 878, name: 'SummonScroll(DSK)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 12, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 879, name: 'SummonScroll(HBT)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 13, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 880, name: 'SummonScroll(BAR)', type: 3, equipSlot: 0, effectType: 11, effectValues: [5, 14, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 300, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 881, name: 'ArmorDye(Indigo)', type: 11, equipSlot: 0, effectType: 32, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 882, name: 'ArmorDye(CrimsonRed)', type: 11, equipSlot: 0, effectType: 32, effectValues: [4, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 883, name: 'ArmorDye(Gold)', type: 11, equipSlot: 0, effectType: 32, effectValues: [3, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 884, name: 'ArmorDye(Aqua)', type: 11, equipSlot: 0, effectType: 32, effectValues: [7, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 885, name: 'ArmorDye(Pink)', type: 11, equipSlot: 0, effectType: 32, effectValues: [8, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 886, name: 'ArmorDye(Violet)', type: 11, equipSlot: 0, effectType: 32, effectValues: [9, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 887, name: 'ArmorDye(Blue)', type: 11, equipSlot: 0, effectType: 32, effectValues: [10, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 888, name: 'ArmorDye(Khaki)', type: 11, equipSlot: 0, effectType: 32, effectValues: [12, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 889, name: 'ArmorDye(Yellow)', type: 11, equipSlot: 0, effectType: 32, effectValues: [13, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 890, name: 'ArmorDye(Red)', type: 11, equipSlot: 0, effectType: 32, effectValues: [14, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 100, forSale: false, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 1081, name: 'MaginDiamond', type: 1, equipSlot: 11, effectType: 14, effectValues: [14, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 8000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 9 },
    { id: 1082, name: 'MaginRuby', type: 1, equipSlot: 11, effectType: 14, effectValues: [13, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 5000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 9 },
    { id: 1083, name: 'MagicEmerald', type: 1, equipSlot: 11, effectType: 14, effectValues: [15, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 5000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 9 },
    { id: 1084, name: 'MagicSapphire', type: 1, equipSlot: 11, effectType: 14, effectValues: [30, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 5000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 9 },
    { id: 1085, name: 'LuckyPrizeTicket', type: 3, equipSlot: 0, effectType: 23, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 9, specialEffectValues: [0, 0], price: 50000, forSale: true, weight: 1, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 42, color: 0 },
    { id: 1086, name: 'MagicNecklace(DF+15)', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 15, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 19000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1087, name: 'MagicNecklace(DF+20)', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 20, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 19000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1088, name: 'MagicNecklace(DF+25)', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 19000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1089, name: 'MagicNecklace(DF+30)', type: 1, equipSlot: 6, effectType: 14, effectValues: [4, 30, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 19000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1090, name: 'MagicNecklace(DM+2)', type: 1, equipSlot: 6, effectType: 14, effectValues: [3, 2, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 39800, forSale: false, weight: 400, speed: 0, levelLimit: 65, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1091, name: 'MagicNecklace(DM+3)', type: 1, equipSlot: 6, effectType: 14, effectValues: [3, 3, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 39800, forSale: false, weight: 400, speed: 0, levelLimit: 65, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1092, name: 'MagicNecklace(DM+4)', type: 1, equipSlot: 6, effectType: 14, effectValues: [3, 4, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 39800, forSale: false, weight: 400, speed: 0, levelLimit: 65, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1093, name: 'MagicNecklace(DM+5)', type: 1, equipSlot: 6, effectType: 14, effectValues: [3, 5, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 39800, forSale: false, weight: 400, speed: 0, levelLimit: 65, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1094, name: 'MagicNecklace(MS12)', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 12, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 7000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1095, name: 'MagicNecklace(MS14)', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 14, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 7000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1096, name: 'MagicNecklace(MS16)', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 16, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 7000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1097, name: 'MagicNecklace(MS18)', type: 1, equipSlot: 6, effectType: 14, effectValues: [2, 18, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 7000, forSale: false, weight: 400, speed: 0, levelLimit: 50, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1098, name: 'MagicNecklace(RM15)', type: 1, equipSlot: 6, effectType: 14, effectValues: [1, 15, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2250, forSale: false, weight: 400, speed: 0, levelLimit: 30, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1099, name: 'MagicNecklace(RM20)', type: 1, equipSlot: 6, effectType: 14, effectValues: [1, 20, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2250, forSale: false, weight: 400, speed: 0, levelLimit: 30, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1100, name: 'MagicNecklace(RM25)', type: 1, equipSlot: 6, effectType: 14, effectValues: [1, 25, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2250, forSale: false, weight: 400, speed: 0, levelLimit: 30, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1101, name: 'MagicNecklace(RM30)', type: 1, equipSlot: 6, effectType: 14, effectValues: [1, 30, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, -10], price: 2250, forSale: false, weight: 400, speed: 0, levelLimit: 30, genderLimit: 0, relatedSkill: -1, category: 46, color: 0 },
    { id: 1102, name: 'DiamondWare', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 5000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 30, relatedSkill: -1, category: 46, color: 0 },
    { id: 1103, name: 'RubyWare', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 30, relatedSkill: -1, category: 46, color: 0 },
    { id: 1104, name: 'SapphireWare', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 30, relatedSkill: -1, category: 46, color: 0 },
    { id: 1105, name: 'EmeraldWare', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 30, relatedSkill: -1, category: 46, color: 0 },
    { id: 1106, name: 'CrystalWare', type: 12, equipSlot: 0, effectType: 0, effectValues: [0, 0, 0, 0, 0, 0], maxDurability: 1, specialEffect: 0, specialEffectValues: [0, 0], price: 500, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 30, relatedSkill: -1, category: 46, color: 0 },
    { id: 1107, name: 'CraftingVessel', type: 10, equipSlot: 0, effectType: 0, effectValues: [1, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [0, 0], price: 1000, forSale: false, weight: 700, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 21, color: 0 },
    { id: 1108, name: 'AngelicPandent(STR)', type: 1, equipSlot: 11, effectType: 14, effectValues: [16, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [60, -10], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 6 },
    { id: 1109, name: 'AngelicPandent(DEX)', type: 1, equipSlot: 11, effectType: 14, effectValues: [17, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [60, -10], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 6 },
    { id: 1110, name: 'AngelicPandent(INT)', type: 1, equipSlot: 11, effectType: 14, effectValues: [18, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [60, -10], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 6 },
    { id: 1111, name: 'AngelicPandent(MAG)', type: 1, equipSlot: 11, effectType: 14, effectValues: [19, 0, 0, 0, 0, 0], maxDurability: 300, specialEffect: 0, specialEffectValues: [60, -10], price: 3000, forSale: false, weight: 200, speed: 0, levelLimit: 0, genderLimit: 0, relatedSkill: -1, category: 46, color: 6 },
];

/**
 * This project's item ids (Items.ts) mapped to original item ids. Genderless items use the original male
 * variant (the female variant has the same stats). Items without an entry have no clear original:
 * - 23: Aresden Hero Long Cape
 * - 25: Elvine Hero Long Cape
 * - 37: Dark Knight Templar Sword
 * - 41: Dark Mage Templar Wand
 * - 45: Radiance (unofficial)
 * - 77: Magic Wand 1
 * - 78: Magic Wand 2
 * - 79: Berserk Wand
 * - 80: Kloness Wand
 * - 81: Resurrection Wand
 * - 82: Templar Wand
 * - 126: Long Cape
 * - 162: Kloness Rapier
 * - 163: Ticket
 * - 176: Manual
 * - 215: Anvil
 * - 285: Gold Pocket 1
 * - 286: Gold Pocket 2
 * - 287: Gold Pocket 3
 * - 288: Gold Pocket 4
 * - 289: Gold Pocket 5
 * - 293: Seed Bag
 * - 326: Amethyst Ware
 */
export const ITEM_ORIGINAL_IDS: Record<number, number> = {
    1: 843, // Barbarian Battle Hammer -> BarbarianHammer
    2: 845, // Storm Bringer -> StormBringer
    3: 8, // Short Sword -> ShortSword
    4: 87, // Tower Shield -> TowerShield
    5: 86, // Knight Shield -> KnightShield
    6: 85, // Lagi Shield -> LagiShield
    7: 80, // Leather Shield -> LeatherShield
    8: 411, // Aresden Hero Armor -> aHeroArmor(M)
    9: 413, // Elvine Hero Armor -> eHeroArmor(M)
    10: 419, // Aresden Hero Hauberk -> aHeroHauberk(M)
    11: 421, // Elvine Hero Hauberk -> eHeroHauberk(M)
    12: 470, // Chemise -> Chemise(W)
    13: 423, // Aresden Hero Leggings -> aHeroLeggings(M)
    14: 425, // Elvine Hero Leggings -> eHeroLeggings(M)
    15: 403, // Aresden Hero Helmet -> aHeroHelm(M)
    16: 405, // Elvine Hero Helmet -> eHeroHelm(M)
    17: 415, // Aresden Hero Robe -> aHeroRobe(M)
    18: 417, // Elvine Hero Robe -> eHeroRobe(M)
    20: 407, // Aresden Hero Cap -> aHeroCap(M)
    21: 409, // Elvine Hero Cap -> eHeroCap(M)
    22: 400, // Aresden Hero Cape -> AresdenHeroCape
    24: 401, // Elvine Hero Cape -> ElvineHeroCape
    26: 451, // Long Boots (White) -> LongBoots
    27: 1108, // Angelic Pendant (STR) -> AngelicPandent(STR)
    28: 1109, // Angelic Pendant (DEX) -> AngelicPandent(DEX)
    29: 1110, // Angelic Pendant (INT) -> AngelicPandent(INT)
    30: 1111, // Angelic Pendant (MAG) -> AngelicPandent(MAG)
    31: 643, // Necklace of Ice Elemental -> KnecklaceOfIceEle
    32: 331, // Gold Ring -> GoldRing
    33: 332, // Silver Ring -> SilverRing
    34: 335, // Emerald Ring -> EmeraldRing
    35: 90, // Gold -> Gold
    36: 91, // Red Potion -> RedPotion
    38: 37, // Templar Sword -> TemplerSword
    39: 620, // Merien Shield -> MerienShield
    40: 621, // Merien Plate Mail -> MerienPlateMailM
    42: 611, // Xelima Axe -> XelimaAxe
    43: 451, // Long Boots (Red) -> LongBoots
    44: 615, // Giant Sword -> GiantSword
    46: 75, // Short Bow -> ShortBow
    47: 76, // Long Bow -> LongBow
    48: 874, // Direction Bow -> Direction-Bow
    49: 873, // Fire Bow -> Fire-Bow
    50: 617, // Composite Bow -> CompositeBow
    51: 618, // Dark Elf Bow -> DarkElfBow
    52: 1, // Dagger -> Dagger
    53: 17, // Long Sword -> LongSword
    54: 23, // Sabre -> Sabre
    55: 20, // Excalibur -> Excaliber
    56: 25, // Scimitar -> Scimitar
    57: 28, // Falchion -> Falchion
    58: 34, // Rapier -> Rapier
    59: 38, // Broad Sword -> BroadSword
    60: 42, // Bastard Sword -> BastadSword
    61: 46, // Claymore -> Claymore
    62: 50, // Great Sword -> GreatSword
    63: 54, // Flamberge -> Flameberge
    64: 59, // Light Axe -> LightAxe
    65: 62, // Tomahawk -> Tomahoc
    66: 68, // Double Axe -> DoubleAxe
    67: 71, // War Axe -> WarAxe
    68: 74, // 4 Bladed Golden Axe -> 4BladeGoldenAxe
    69: 231, // Pickaxe -> PickAxe
    70: 560, // Battle Axe -> BattleAxe
    71: 850, // Kloness Axe -> KlonessAxe
    72: 232, // Hoe -> Hoe
    73: 81, // Targe Shield -> TargeShield
    74: 82, // Scooterm Shield -> ScootermShield
    75: 83, // Blonde Shield -> BlondeShield
    76: 84, // Iron Shield -> IronShield
    83: 300, // Magic Necklace (RM10) -> MagicNecklace(RM10)
    84: 305, // Magic Necklace (DM+1) -> MagicNecklace(DM+1)
    85: 308, // Magic Necklace (MS10) -> MagicNecklace(MS10)
    86: 311, // Magic Necklace (DF+10) -> MagicNecklace(DF+10)
    87: 315, // Gold Necklace -> GoldNecklace
    88: 316, // Silver Necklace -> SilverNecklace
    89: 637, // Necklace of Lightning Protection -> KnecklaceOfLightPro
    90: 638, // Necklace of Fire Protection -> KnecklaceOfFirePro
    91: 639, // Necklace of Poision Protection -> KnecklaceOfPoisonPro
    92: 641, // Necklace of Medusa -> KnecklaceOfMedusa
    93: 642, // Necklace of Ice Protection -> KnecklaceOfIcePro
    94: 644, // Necklace of Air Elemental -> KnecklaceOfAirEle
    95: 645, // Necklace of Efreet -> KnecklaceOfEfreet
    96: 646, // Necklace of Beholder -> NecklaceOfBeholder
    97: 647, // Necklace of Stone Golem -> NecklaceOfStoneGol
    98: 648, // Necklace of Lich -> NecklaceOfLiche
    99: 858, // Necklace of Merien -> NecklaceOfMerien
    100: 859, // Necklace of Kloness -> NecklaceOfKloness
    101: 860, // Necklace of Xelima -> NecklaceOfXelima
    102: 334, // Lucky Gold Ring -> LuckyGoldRing
    104: 336, // Sapphire Ring -> SapphireRing
    105: 337, // Ruby Ring -> RubyRing
    106: 630, // Ring of Xelima -> RingoftheXelima
    107: 631, // Ring of Abaddon -> RingoftheAbaddon
    108: 632, // Ring of Ogre Power -> RingofOgrepower
    109: 633, // Ring of Demon Power -> RingofDemonpower
    110: 634, // Ring of Wizard -> RingofWizard
    111: 635, // Ring of Mage -> RingofMage
    112: 636, // Ring of Grand Mage -> RingofGrandMage
    123: 734, // Ring of Arch Mage -> RingofArcmage
    124: 735, // Ring of Dragon Power -> RingofDragonpower
    125: 402, // Cape -> Cape
    127: 450, // Shoes -> Shoes
    128: 453, // Shirt -> Shirt(M)
    129: 454, // Hauberk -> Hauberk(M)
    130: 455, // Leather Armor -> LeatherArmor(M)
    131: 456, // Chain Mail -> ChainMail(M)
    132: 457, // Scale Mail -> ScaleMail(M)
    133: 458, // Plate Mail -> PlateMail(M)
    134: 459, // Trousers -> Trousers(M)
    135: 460, // Knee Trousers -> KneeTrousers(M)
    136: 461, // Chain Hose -> ChainHose(M)
    137: 462, // Plate Leggings -> PlateLeggings(M)
    138: 473, // Bodice -> Bodice(W)
    139: 474, // Long Bodice -> LongBodice(W)
    140: 479, // Skirt -> Skirt(W)
    141: 484, // Tunic -> Tunic(M)
    142: 590, // Robe -> Robe(M)
    143: 600, // Helmet -> Helm(M)
    144: 601, // Full Helmet -> FullHelm(M)
    145: 610, // Xelima Blade -> XelimaBlade
    146: 612, // Xelima Rapier -> XelimaRapier
    147: 613, // Sword of Medusa -> SwordofMedusa
    148: 614, // Sword of Ice Elemental -> SwordofIceElemental
    149: 616, // Demon Slayer -> DemonSlayer
    150: 750, // Horned Helmet -> Horned-Helm(M)
    151: 751, // Winged Helmet -> Wings-Helm(M)
    152: 752, // Wizard Cap -> Wizard-Cap(M)
    153: 753, // Wizard Hat -> Wizard-Hat(M)
    154: 760, // Hammer -> Hammer
    155: 761, // Battle Hammer -> BattleHammer
    156: 770, // Santa Costume -> SantaCostume(M)
    157: 844, // Black Shadow Sword -> BlackShadowSword
    158: 846, // Devastator -> The_Devastator
    159: 847, // Dark Executor -> DarkExecutor
    160: 848, // Lightning Blade -> LightingBlade
    161: 849, // Kloness Blade -> KlonessBlade
    164: 92, // Big Red Potion -> BigRedPotion
    165: 93, // Blue Potion -> BluePotion
    166: 94, // Big Blue Potion -> BigBluePotion
    167: 95, // Green Potion -> GreenPotion
    168: 96, // Big Green Potion -> BigGreenPotion
    169: 98, // Baguette -> Baguette
    170: 99, // Meat -> Meat
    171: 100, // Fish -> Fish
    172: 101, // Red Fish -> RedFish
    173: 102, // Green Fish -> GreenFish
    174: 103, // Yellow Fish -> YellowFish
    175: 105, // Fishing Rod -> FishingRod
    177: 188, // Snake Meat -> SnakeMeat
    178: 189, // Snake Skin -> SnakeSkin
    179: 190, // Snake Teeth -> SnakeTeeth
    180: 191, // Snake Tongue -> SnakeTongue
    181: 192, // Ant Leg -> AntLeg
    182: 193, // Ant Feeler -> AntFeeler
    183: 194, // Cyclops Eye -> CyclopsEye
    184: 195, // Cyclops Hand Edge -> CyclopsHandEdge
    185: 196, // Cyclops Heart -> CyclopsHeart
    186: 197, // Cyclops Meat -> CyclopsMeat
    187: 199, // Hellbound Heart -> HelboundHeart
    188: 200, // Hellbound Leather -> HelboundLeather
    189: 201, // Hellbound Tail -> HelboundTail
    190: 202, // Hellbound Teeth -> HelboundTeeth
    191: 203, // Hellbound Claw -> HelboundClaw
    192: 204, // Hellbound Tongue -> HelboundTongue
    193: 205, // Lump of Clay -> LumpofClay
    194: 206, // Orc Meat -> OrcMeat
    195: 207, // Orc Leather -> OrcLeather
    196: 208, // Orc Teeth -> OrcTeeth
    197: 209, // Ogre Hair -> OgreHair
    198: 210, // Ogre Heart -> OgreHeart
    199: 211, // Ogre Meat -> OgreMeat
    200: 212, // Ogre Leather -> OgreLeather
    201: 213, // Ogre Teeth -> OgreTeeth
    202: 214, // Ogre Claw -> OgreClaw
    203: 215, // Scorpion Pincers -> ScorpionPincers
    204: 216, // Scorpion Meat -> ScorpionMeat
    205: 217, // Scorpion Sting -> ScorpionSting
    206: 218, // Scorpion Skin -> ScorpionSkin
    207: 219, // Skeleton Bones -> SkeletonBones
    208: 220, // Slime Jelly -> SlimeJelly
    209: 221, // Stone Golem Piece -> StoneGolemPiece
    210: 222, // Troll Heart -> TrollHeart
    211: 223, // Troll Meat -> TrollMeat
    212: 224, // Troll Leather -> TrollLeather
    213: 225, // Troll Claw -> TrollClaw
    214: 227, // Alchemy Bowl -> AlchemyBowl
    216: 247, // Aresden Flag -> AresdenFlag
    217: 248, // Elvine Flag -> ElvineFlag
    218: 350, // Diamond -> Diamond
    219: 351, // Ruby -> Ruby
    220: 352, // Sapphire -> Sapphire
    221: 353, // Emerald -> Emerald
    222: 354, // Gold Nugget -> GoldNugget
    223: 355, // Coal -> Coal
    224: 356, // Silver Nugget -> SilverNugget
    225: 357, // Iron Ore -> IronOre
    226: 358, // Crystal -> Crystal
    227: 360, // Dye (Indigo) -> Dye(Indigo)
    228: 364, // Dye (Green) -> Dye(Green)
    229: 365, // Dye (Gray) -> Dye(Gray)
    230: 366, // Dye (Aqua) -> Dye(Aqua)
    231: 368, // Dye (Violet) -> Dye(Violet)
    232: 369, // Dye (Blue) -> Dye(Blue)
    233: 370, // Dye (Tan) -> Dye(Tan)
    234: 371, // Dye (Khaki) -> Dye(Khaki)
    235: 372, // Dye (Yellow) -> Dye(Yellow)
    236: 373, // Dye (Red) -> Dye(Red)
    237: 500, // Iron Ingot -> IronIngot
    238: 501, // Super Coal -> SuperCoal
    239: 503, // Gold Ingot -> GoldIngot
    240: 504, // Silver Ingot -> SilverIngot
    241: 505, // Blonde Ingot -> BlondeIngot
    242: 506, // Mithril Ingot -> MithralIngot
    243: 507, // Blonde Stone -> BlondeStone
    244: 508, // Mithril -> Mithral
    245: 511, // Arena Ticket -> ArenaTicket
    246: 520, // Bouquet -> Bouquette
    247: 521, // Flower Basket -> FlowerBasket
    248: 522, // Flowerpot -> Flowerpot
    249: 540, // Demon Eye -> DemonEye
    250: 541, // Demon Heart -> DemonHeart
    251: 542, // Demon Meat -> DemonMeat
    252: 543, // Demon Leather -> DemonLeather
    253: 544, // Unicorn Heart -> UnicornHeart
    254: 545, // Unicorn Horn -> UnicornHorn
    255: 546, // Unicorn Meat -> UnicornMeat
    256: 547, // Unicorn Leather -> UnicornLeather
    257: 548, // Werewolf Heart -> WerewolfHeart
    258: 549, // Werewolf Nail -> WerewolfNail
    259: 550, // Werewolf Meat -> WerewolfMeat
    260: 551, // Werewolf Tail -> WerewolfTail
    261: 552, // Werewolf Teeth -> WerewolfTeeth
    262: 553, // Werewolf Leather -> WerewolfLeather
    263: 554, // Werewolf Claw -> WerewolfClaw
    264: 570, // Red Carp -> RedCarp
    265: 571, // Green Carp -> GreenCarp
    266: 572, // Gold Carp -> GoldCarp
    267: 573, // Crucian Carp -> CrucianCarp
    268: 574, // Blue Sea Bream -> BlueSeaBream
    269: 575, // Salmon -> Salmon
    270: 576, // Red Sea Bream -> RedSeaBream
    271: 577, // Gray Mullet -> GrayMullet
    272: 650, // Zemstone of Sacrifice -> ZemstoneofSacrifice
    273: 651, // Green Ball -> GreenBall
    274: 652, // Red Ball -> RedBall
    275: 653, // Yellow Ball -> YellowBall
    276: 654, // Blue Ball -> BlueBall
    277: 655, // Pearl Ball -> PearlBall
    278: 656, // Stone of Xelima -> StoneOfXelima
    279: 657, // Stone of Merien -> StoneOfMerien
    280: 660, // Unfreeze Potion -> UnfreezePotion
    281: 720, // Songpyon -> Songpyon
    282: 721, // Ginseng -> Ginseng
    283: 722, // Beef Rib Set -> BeefRibSet
    284: 723, // Wine -> Wine
    290: 780, // Red Candy -> RedCandy
    291: 781, // Blue Candy -> BlueCandy
    292: 782, // Green Candy -> GreenCandy
    294: 820, // Water Melon -> WaterMelon
    295: 821, // Pumpkin -> Pumpkin
    296: 822, // Garlic -> Garlic
    297: 823, // Barley -> Barley
    298: 824, // Carrot -> Carrot
    299: 825, // Radish -> Radish
    300: 826, // Corn -> Corn
    301: 827, // Chinese Bellflower -> ChineseBellflower
    302: 828, // Melone -> Melone
    303: 829, // Tommato -> Tommato
    304: 830, // Grapes -> Grapes
    305: 831, // Blue Grapes -> BlueGrapes
    306: 832, // Mushroom -> Mushroom
    307: 840, // Super Red Potion -> SuperRedPotion
    308: 841, // Super Blue Potion -> SuperBluePotion
    309: 391, // Super Green Potion -> SuperGreenPotion
    310: 867, // Ancient Tablet -> AcientTablet
    311: 868, // Ancient Tablet (LU) -> AcientTablet(LU)
    312: 869, // Ancient Tablet (LD) -> AcientTablet(LD)
    313: 870, // Ancient Tablet (RU) -> AcientTablet(RU)
    314: 869, // Ancient Tablet (LD) -> AcientTablet(LD)
    315: 882, // Armor Dye (Crimson Red) -> ArmorDye(CrimsonRed)
    316: 883, // Armor Dye (Gold) -> ArmorDye(Gold)
    318: 885, // Armor Dye (Pink) -> ArmorDye(Pink)
    319: 1081, // Magic Diamond -> MaginDiamond
    320: 1082, // Magic Ruby -> MaginRuby
    321: 1083, // Magic Emerald -> MagicEmerald
    322: 1084, // Magic Sapphire -> MagicSapphire
    323: 1102, // Diamond Ware -> DiamondWare
    324: 1104, // Sapphire Ware -> SapphireWare
    325: 1103, // Ruby Ware -> RubyWare
    327: 1106, // Crystal Ware -> CrystalWare
    328: 1107, // Crafting Vessel -> CraftingVessel
};

/**
 * Original data for one of this project's items, if it has an original counterpart.
 */
export function getOriginalItem(itemId: number): OriginalItem | undefined {
    const originalId = ITEM_ORIGINAL_IDS[itemId];
    return originalId === undefined ? undefined : ORIGINAL_ITEMS.find(item => item.id === originalId);
}

/**
 * Weapon damage rolls (Attack-type effects), or undefined for non-weapons.
 */
export function getOriginalWeaponDamage(item: OriginalItem): { smallMedium: DiceRoll; large: DiceRoll } | undefined {
    switch (item.effectType) {
        case OriginalItemEffectType.Attack:
        case OriginalItemEffectType.AttackArrow:
        case OriginalItemEffectType.AttackManaSave:
        case OriginalItemEffectType.AttackMaxHpDown:
        case OriginalItemEffectType.AttackDefense:
        case OriginalItemEffectType.AttackSpecialAbility: {
            const [dice, sides, bonus, largeDice, largeSides, largeBonus] = item.effectValues;
            return {
                smallMedium: { dice, sides, bonus },
                large: { dice: largeDice, sides: largeSides, bonus: largeBonus },
            };
        }
        default:
            return undefined;
    }
}
