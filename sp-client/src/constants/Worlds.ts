/**
 * A rectangle (inclusive, in world cells) that a world keeps populated with one monster type.
 * Monsters spawned here also wander only inside it.
 */
export interface DwellArea {
    /** Monster sprite name; joins `MONSTER_STATS` and `MONSTERS` */
    spriteName: string;
    /** How many monsters to keep alive in this area */
    count: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

/**
 * A set of map cells that move the player to another world when stepped on.
 */
export interface TeleportLink {
    cells: Array<{ x: number; y: number }>;
    targetWorldId: string;
    targetX: number;
    targetY: number;
}

/**
 * An NPC placed at a fixed cell when the world loads.
 */
export interface WorldNpcPlacement {
    /** NPC sprite name; joins `NPCS` */
    spriteName: string;
    x: number;
    y: number;
    /** Facing direction (0-7) */
    direction: number;
}

/**
 * A playable world: a map plus its music, monster spawn areas, teleports and NPCs.
 * Several worlds can share one map file (for example the Aresden and Elvine shops).
 */
export interface WorldData {
    id: string;
    name: string;
    /** Map filename (e.g., 'aresden.amd') */
    mapFile: string;
    /** Music filename (e.g., 'aresden.mp3') */
    music: string;
    dwellAreas: DwellArea[];
    teleports: TeleportLink[];
    npcs: WorldNpcPlacement[];
}

export const WORLDS: WorldData[] = [
    {
        id: 'promiseland',
        name: 'Promiseland',
        mapFile: '2ndmiddle.amd',
        music: 'default.mp3',
        dwellAreas: [
            { spriteName: 'cyc', count: 60, x1: 115, y1: 106, x2: 136, y2: 152 },
            { spriteName: 'orge', count: 20, x1: 111, y1: 196, x2: 131, y2: 211 },
            { spriteName: 'rudolph', count: 40, x1: 73, y1: 197, x2: 109, y2: 216 },
            { spriteName: 'werewolf', count: 40, x1: 36, y1: 149, x2: 75, y2: 193 },
            { spriteName: 'werewolf', count: 40, x1: 35, y1: 65, x2: 72, y2: 103 },
            { spriteName: 'ettin', count: 40, x1: 31, y1: 27, x2: 72, y2: 56 },
            { spriteName: 'cyc', count: 60, x1: 143, y1: 33, x2: 165, y2: 55 },
            { spriteName: 'orge', count: 50, x1: 139, y1: 69, x2: 168, y2: 84 },
            { spriteName: 'helb', count: 30, x1: 192, y1: 105, x2: 219, y2: 122 },
            { spriteName: 'ettin', count: 40, x1: 190, y1: 173, x2: 157, y2: 219 },
        ],
        teleports: [
            {
                cells: [{ x: 135, y: 228 }, { x: 136, y: 228 }, { x: 137, y: 228 }, { x: 138, y: 228 }, { x: 139, y: 228 }, { x: 140, y: 228 }, { x: 141, y: 228 }, { x: 142, y: 228 }, { x: 143, y: 228 }, { x: 144, y: 228 }, { x: 145, y: 228 }, { x: 146, y: 228 }],
                targetWorldId: 'aresden',
                targetX: 146,
                targetY: 123,
            },
        ],
        npcs: [],
    },
    {
        id: 'aresden',
        name: 'Aresden',
        mapFile: 'aresden.amd',
        music: 'aresden.mp3',
        dwellAreas: [
            { spriteName: 'slm', count: 30, x1: 28, y1: 188, x2: 45, y2: 201 },
            { spriteName: 'orc', count: 30, x1: 37, y1: 171, x2: 58, y2: 183 },
            { spriteName: 'cla', count: 20, x1: 40, y1: 61, x2: 63, y2: 70 },
            { spriteName: 'scp', count: 40, x1: 86, y1: 30, x2: 117, y2: 40 },
            { spriteName: 'ske', count: 30, x1: 105, y1: 45, x2: 131, y2: 55 },
            { spriteName: 'scp', count: 40, x1: 154, y1: 32, x2: 179, y2: 45 },
            { spriteName: 'gol', count: 60, x1: 269, y1: 183, x2: 234, y2: 213 },
            { spriteName: 'cla', count: 60, x1: 190, y1: 224, x2: 232, y2: 254 },
            { spriteName: 'gol', count: 20, x1: 169, y1: 246, x2: 196, y2: 265 },
            { spriteName: 'slm', count: 30, x1: 128, y1: 237, x2: 151, y2: 250 },
            { spriteName: 'gol', count: 1, x1: 138, y1: 138, x2: 144, y2: 142 },
        ],
        teleports: [
            {
                cells: [{ x: 144, y: 123 }, { x: 145, y: 123 }, { x: 145, y: 122 }, { x: 146, y: 122 }],
                targetWorldId: 'promiseland',
                targetX: 141,
                targetY: 227,
            },
        ],
        npcs: [],
    },
    {
        id: 'elvine',
        name: 'Elvine',
        mapFile: 'elvine.amd',
        music: 'elvine.mp3',
        dwellAreas: [
            { spriteName: 'slm', count: 30, x1: 37, y1: 206, x2: 70, y2: 221 },
            { spriteName: 'orc', count: 30, x1: 30, y1: 174, x2: 67, y2: 197 },
            { spriteName: 'cla', count: 20, x1: 24, y1: 123, x2: 40, y2: 141 },
            { spriteName: 'scp', count: 20, x1: 47, y1: 52, x2: 62, y2: 71 },
            { spriteName: 'ske', count: 20, x1: 118, y1: 27, x2: 143, y2: 44 },
            { spriteName: 'gol', count: 40, x1: 144, y1: 31, x2: 171, y2: 53 },
            { spriteName: 'cla', count: 30, x1: 250, y1: 178, x2: 270, y2: 198 },
            { spriteName: 'scp', count: 50, x1: 231, y1: 200, x2: 257, y2: 223 },
            { spriteName: 'orc', count: 30, x1: 119, y1: 231, x2: 151, y2: 247 },
            { spriteName: 'scp', count: 50, x1: 125, y1: 247, x2: 160, y2: 268 },
            { spriteName: 'slm', count: 20, x1: 81, y1: 250, x2: 104, y2: 264 },
        ],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena1',
        name: 'Arena 1',
        mapFile: 'fightzone1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'middleland',
        name: 'Middleland',
        mapFile: 'middleland.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'druncncity',
        name: 'Druncnian City',
        mapFile: 'druncncity.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arebrk11',
        name: 'Barracks 1-1',
        mapFile: 'arebrk11.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arebrk12',
        name: 'Barracks 1-2',
        mapFile: 'arebrk12.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arebrk21',
        name: 'Barracks 2-1',
        mapFile: 'arebrk21.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arebrk22',
        name: 'Barracks 2-2',
        mapFile: 'arebrk22.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arefarm',
        name: 'Aresden Farm',
        mapFile: 'arefarm.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arejail',
        name: 'Jail',
        mapFile: 'arejail.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'aresdend1',
        name: 'Aresden Dungeon 1',
        mapFile: 'aresdend1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'areuni',
        name: 'Aresden Garden',
        mapFile: 'areuni.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvfarm',
        name: 'Elvine Farm',
        mapFile: 'elvfarm.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvined1',
        name: 'Elvine Dungeon 1',
        mapFile: 'elvined1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvuni',
        name: 'Elvine Garden',
        mapFile: 'elvuni.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'middled1n',
        name: 'Middleland Dungeon North',
        mapFile: 'middled1n.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'middled1x',
        name: 'Middleland Dungeon',
        mapFile: 'middled1x.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'abaddon',
        name: 'Abaddon',
        mapFile: 'abaddon.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'infernia-a',
        name: 'Infernia A',
        mapFile: 'inferniaA.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'infernia-b',
        name: 'Infernia B',
        mapFile: 'inferniaB.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'icebound',
        name: 'Icebound',
        mapFile: 'icebound.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'procella',
        name: 'Procella',
        mapFile: 'procella.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'toh1',
        name: 'Tower of Hell 1',
        mapFile: 'toh1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'toh2',
        name: 'Tower of Hell 2',
        mapFile: 'toh2.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'toh3',
        name: 'Tower of Hell 3',
        mapFile: 'toh3.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena4',
        name: 'Arena 4',
        mapFile: 'fightzone4.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena5',
        name: 'Arena 5',
        mapFile: 'fightzone5.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena6',
        name: 'Arena 6',
        mapFile: 'fightzone6.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena7',
        name: 'Arena 7',
        mapFile: 'fightzone7.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arena8',
        name: 'Arena 8',
        mapFile: 'fightzone8.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'huntzone1',
        name: 'Hunt Zone 1',
        mapFile: 'huntzone1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'huntzone2',
        name: 'Hunt Zone 2',
        mapFile: 'huntzone2.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'huntzone3',
        name: 'Hunt Zone 3',
        mapFile: 'huntzone3.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'huntzone4',
        name: 'Hunt Zone 4',
        mapFile: 'huntzone4.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'dglv2',
        name: 'Dungeon Level 2',
        mapFile: 'dglv2.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'dglv3',
        name: 'Dungeon Level 3',
        mapFile: 'dglv3.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'dglv4',
        name: 'Dungeon Level 4',
        mapFile: 'dglv4.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'bisle',
        name: 'Bleeding Island',
        mapFile: 'bisle.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'btfield',
        name: 'Battlefield',
        mapFile: 'btfield.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'godh',
        name: 'God\'s Heldenian',
        mapFile: 'godh.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'hrampart',
        name: 'Heldenian Rampart',
        mapFile: 'HRampart.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'maze',
        name: 'Maze',
        mapFile: 'maze.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'resurr1',
        name: 'Resurrection Zone',
        mapFile: 'resurr1.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'traveler',
        name: 'Traveler Zone',
        mapFile: 'default.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'hbsh6',
        name: 'HB Sleepy Hollow 6 map (unofficial)',
        mapFile: 'hbsh6.amd',
        music: 'default.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'areshop',
        name: 'Aresden Shop',
        mapFile: 'gshop_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arebsmith',
        name: 'Aresden Blacksmith',
        mapFile: 'bsmith_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [
            { spriteName: 'tom', x: 48, y: 33, direction: 7 }, // Tom
        ],
    },
    {
        id: 'arewrus',
        name: 'Aresden Warehouse',
        mapFile: 'wrhus_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'aregldhall',
        name: 'Aresden Guild Hall',
        mapFile: 'gldhall_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arecmdhall',
        name: 'Aresden Command Hall',
        mapFile: 'cmdhall_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arecityhall',
        name: 'Aresden City Hall',
        mapFile: 'cityhall_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arecath',
        name: 'Aresden Cathedral',
        mapFile: 'cath_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'arewzdtwr',
        name: 'Aresden Watch Tower',
        mapFile: 'wzdtwr_1.amd',
        music: 'aresden.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvshop',
        name: 'Elvine Shop',
        mapFile: 'gshop_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvbsmith',
        name: 'Elvine Blacksmith',
        mapFile: 'bsmith_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [
            { spriteName: 'tom', x: 48, y: 33, direction: 7 }, // Tom
        ],
    },
    {
        id: 'elvwrus',
        name: 'Elvine Warehouse',
        mapFile: 'wrhus_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvgldhall',
        name: 'Elvine Guild Hall',
        mapFile: 'gldhall_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvcmdhall',
        name: 'Elvine Command Hall',
        mapFile: 'cmdhall_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvcityhall',
        name: 'Elvine City Hall',
        mapFile: 'cityhall_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvcath',
        name: 'Elvine Cathedral',
        mapFile: 'cath_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
    {
        id: 'elvwzdtwr',
        name: 'Elvine Watch Tower',
        mapFile: 'wzdtwr_1.amd',
        music: 'elvine.mp3',
        dwellAreas: [],
        teleports: [],
        npcs: [],
    },
];

/**
 * Get a world by id.
 */
export function getWorldData(worldId: string): WorldData | undefined {
    return WORLDS.find(world => world.id === worldId);
}

/**
 * Resolves which world the player is in for a map file. Keeps `preferredWorldId` when it uses that map
 * (shared maps such as shops), otherwise returns the first world on the map.
 *
 * @returns The world, or undefined when no world uses the map
 */
export function resolveWorldForMap(mapFile: string, preferredWorldId: string | undefined): WorldData | undefined {
    const preferred = preferredWorldId === undefined ? undefined : getWorldData(preferredWorldId);
    if (preferred && preferred.mapFile === mapFile) {
        return preferred;
    }
    return WORLDS.find(world => world.mapFile === mapFile);
}
