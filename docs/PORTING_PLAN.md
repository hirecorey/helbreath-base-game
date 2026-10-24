# Porting Plan: Server Gameplay → Single-Player Client

Goal: move the gameplay that today only exists in the C# multiplayer server (`multiplayer/server`) into the single-player browser client (`sp-client`), then delete `multiplayer/`.

**Status: complete.** All phases are done and `multiplayer/` was removed in Phase 6. The removed code (server, multiplayer client, protobuf schemas, client simulator) is preserved at the git tag `multiplayer-final`; paths below that start with `multiplayer/` refer to that tag, e.g. `git show multiplayer-final:multiplayer/server/Config/GameWorlds.json`.

## Background

- `sp-client` is already purely single-player: one `Player`, no networking.
- The server holds ~5,100 lines of gameplay rules (out of ~15,000; the rest is networking, threading, anti-cheat and visibility, which single-player does not need).
- `sp-client` has no concept of a *world*, only maps. The server defines 63 worlds on 55 maps (`multiplayer/server/Config/GameWorlds.json`); spawns, teleports and NPCs attach to a world.
- Monster stats (HP, damage range, speeds, chase distances, allegiance, respawn) live in `multiplayer/server/Config/Monsters.json`. In `sp-client` they came from the Summon dialog. The two catalogs are **not** in the same order (sp-client has 4 extra monsters), so they are joined on sprite name; all 63 server monsters match.
- Busy maps spawn 340–420 monsters (Aresden 361, Elvine 340, Promiseland 420). `sp-client` updates every monster every frame today, so far-away monsters need to go dormant.
- Monster-vs-monster only happens between *hostile* and *friendly* monsters. Every catalog monster is hostile by default, so in practice this means summoned allies. **Decision (scope):** the fork is a single-player game where monsters only ever fight the player, so monster-vs-monster, summoned allies and allegiance are out of scope.
- Spells have no damage values; the server uses the caster's damage stat. The work is the hit shapes (square, cone, line, ground effects over time) timed to the visuals.
- World data is thinner than the original game: 32 spawn areas across 3 cities, only 2 teleport links (Aresden ↔ Promiseland) and 2 NPC placements (blacksmith).

## Phases

| # | Phase | What gets built | Risk | Size | Status |
|---|---|---|---|---|---|
| 0 | Data foundation | `Worlds` catalog from `GameWorlds.json`; real monster stats in the monster catalog; game state remembers the current world, not just the map | Low | Small | Done |
| 1 | Spawn areas | Worlds populate their spawn rectangles on load; dead monsters respawn on a timer; wander stays inside the rectangle; far-away monsters go dormant for performance; Summon dialog kept for testing | Medium | Medium | Done |
| 2 | Monster combat (slim) | Player-only targeting kept. Monsters fight back when hit from any range; chase continues to a give-up distance; damage rolls per hit; pause after landing a hit; Stun hits; attack timing from real animation frame counts | Low | Small-medium | Done |
| 3 | Spell damage | All 26 spells deal damage in their shapes, timed to visuals; ground spells (Ice Storm, Fire Wall, Poison Cloud, Spike Field) tick; the 3 spellcasting monsters (Orc, Guard, Sorceress) cast at the player | Medium | Medium-large | Done |
| 4 | Buffs and debuffs | Chill (−50% move/attack/cast, 10s), Berserk (+50%, 40s), Invisibility (40s) on player and monsters; one active effect per group; visuals from mp-client `GameAssetVisualEffect.ts` | Low-medium | Small-medium | Done |
| 5 | Teleports and NPCs | Stepping on a teleport cell moves to the target world/position; NPCs placed from world data | Low | Small | Done |
| 6 | Remove multiplayer | Tag the commit, delete `multiplayer/`, client-simulator/protobuf tooling, and multiplayer docs/launch configs | None | Removes ~75k lines, ~310 MB | Done |

With monster-vs-monster out of scope, no phase depends on generalized targeting: Phases 3, 4 and 5 can be done in any order after Phase 1. Phase 3 is most useful after Phase 2, so monsters hit by spells fight back.

Dropped from the original Phase 2: generalized targeting (monsters attacking any entity), monster-vs-monster fights, summoned allies, and allegiance (hostile / neutral / friendly). `MonsterAllegiance` and the `allegiance` stat stay in the data but are unused.

## Phase 0–1 notes

What landed:

- `sp-client/src/constants/Worlds.ts`: 63 worlds (map, music, spawn areas, teleports, NPC placements), generated from `GameWorlds.json`. Spawn areas and NPCs reference monsters/NPCs by sprite name.
- `sp-client/src/constants/MonsterStats.ts`: gameplay stats for the 63 server monsters with server defaults filled in, joined to `Monsters.ts` on `spriteName`. Speeds are stored in milliseconds; `movementSpeedMsToSlider` / `attackSpeedMsToSlider` convert to the `Monster` slider scale.
- `MonsterAllegiance` enum in `Types.ts`.
- `GameStateManager` stores `worldId` and keeps it consistent with the map (`resolveWorldForMap`).
- `GameWorld.spawnMonster` is shared by the Summon dialog and spawn areas. `spawnWorldMonsters` fills each area after the player is placed; corpses of spawn-area monsters are replaced after `respawnTimeMs`.
- `Monster` accepts `wanderArea` (wander stays inside it) and `wanderRestMs` (random rest after each wander leg). Summoned monsters keep the old whole-map, no-rest wandering.
- Idle monsters outside the camera view (plus a 6-cell margin) skip their update. Verified at ~96–100 fps with 361 monsters in Aresden.

Verified in the browser: Aresden spawns 361 and Elvine 340 (matching the server), every monster inside its rectangle, no shared cells, wander + 3–5s rests inside a rectangle, respawn ~3s after corpse removal, Summon dialog unchanged.

Deferred to Phase 2 (monster combat):

- **Damage rolls:** spawn-area monsters use the midpoint of `attackDamageMin`–`attackDamageMax` per hit.
- **Stun:** the server's Stun attack type has no sp-client equivalent yet; those monsters use Interrupt and carry `stunsTarget` / `attackStunDurationMs` for later.
- **Attack speed:** converted assuming an 8-frame attack animation, so swing timing is approximate for monsters with other frame counts.
- **Chase give-up distance, attack recovery:** stored in `MonsterStats` but not used yet.
- **Monster spells:** moved to Phase 3. **Allegiance:** dropped (see Phases).

Data quirk kept as-is: Aresden places one Stone Golem (100–200 damage) in the town center next to the default spawn point.

## Phase 2 notes

What landed (all in `sp-client`):

- **Fight back:** any player hit starts a chase that only ends past `MONSTER_MAX_FOLLOW_DISTANCE` (20 cells) or when the player dies.
- **Chase give-up:** a normal chase starts within `chaseDistance` and continues until the player is past `chaseMaxDistance`.
- **Damage rolls:** each hit rolls `attackDamageMin`–`attackDamageMax`; the hover overlay shows the range.
- **Attack recovery:** after each swing the monster idles for `attackRecoveryTimeMs`.
- **Stun:** monsters with `stunsTarget` hit as Interrupt and queue a stunlock of `attackStunDurationMs` on the player (`GameObject.queueStun`).
- **Attack timing:** spawn-area monsters pass `attackDurationMs`; the attack frame rate is fitted to the frames the sprite sheet actually plays, so a swing lasts exactly the server duration.
- **Bug fix (Phase 1):** monsters spawned with the placeholder sprite now pick up `temporalCoefficient`, `opacity`, `corpseDecayTime` and `bowAttack` when their real assets load.

Verified (game loop stepped from the page): fight-back from 12 cells, chase starts at 4 / gives up past 8 (Stone Golem), damage chase gives up past 20, hits every ~1,390 ms (700 ms swing + 700 ms recovery) for 100–200, stun locks the player ~500 ms / ~200 ms, Summon dialog unchanged.

Known gaps:

- Monsters attack whenever the player is inside `attackRange`, even before they start chasing (existing sp-client behavior). The Dark Elf (range 10, notices at 4) can shoot before it chases.
- Monsters with `movementSpeedMs` 0 still never attack (existing sp-client behavior); no catalog monster uses 0.
- Stun is only applied on Interrupt hits, not on knockback hits.
- Summoned monsters (Summon dialog) keep slider-based attack speed and now also fight back when hit.

## Phase 3 notes

What landed (all in `sp-client`):

- `constants/SpellDamage.ts`: damage rules for all 24 sp-client spells, keyed by sp-client spell id (the server numbers spells differently and calls Fire Wall "Fire Field"). Shapes: area (square around target), cone (Blizzard), line (shock waves), ground effect.
- `utils/SpellDamageManager.ts`: picks targets when the spell is cast and damages them after the server's delay (projectile travel time, fixed drop distance, 200 ms for cones, half the duration for lines). Ground effects tick every second (Fire Wall, Poison Cloud, Ice Storm) or damage whoever steps on (Spike Field); one effect per group per cell; 30 s duration.
- Spells deal the caster's damage: the player's damage stat, or the monster's rolled attack damage.
- `CastManager.playSpellVisual` plays spell visuals for player and monster casts; `onPlayerSpellCast` hands player casts to the damage manager.
- Monster spellcasting: while chasing, a caster rolls each spell's chance on every decision before trying melee (player within 16×9 cells). The cast plays the attack pose without a melee hit. Orc: Fire Ball 20%; Guard: Lightning Bolt 50%; Sorceress: Earthworm Strike, Bloody Shock Wave, Meteor Strike, Mass Lightning Strike, Blizzard, Earth Shock Wave (100% each). Summoned monsters get their type's spells too.

Verified in the browser with training dummies: every shape hits exactly the predicted cells, timings match (Fire Ball ~121 ms, Ice Strike ~334 ms, Meteor 400 ms, cone/line ~200 ms, instant spells next frame), ground effects tick at 1 s, step-on damage fires once per entry, same-group effects don't stack, the caster is never hit by their own non-ground spell. Orc cast on ~25% of attacks, Guard ~56%, Sorceress every attack; all monster spells landed. No console errors.

Differences from the server (deliberate):

- **Fire Wall** damages the 5 tiles the sp-client visual draws (`getFireWallCells`, along the cast direction), not the server's 5×5 square.
- **Monster spells only damage the player** (the server also splashes other monsters), per the single-player scope.
- **Ground effects hurt their caster** if they stand in them, same as the server.
- Player-cast stunning spells (Blizzard) interrupt monsters but don't add a stun beyond the normal monster stunlock.

## Phase 4 notes

What landed (all in `sp-client`):

- `constants/TemporaryEffects.ts`: Chill (−50% move/attack/cast, 10 s, group 1), Berserk (+50%, 40 s, group 2), Invisibility (40 s, group 0), and which spells apply them. Chill comes on hit from Chill Wind, Mass Chill Wind, Ice Strike, Ice Storm (each tick), Blizzard and Mass Blizzard; Mass Ice Strike has none, as on the server.
- New spells **Invisibility** (25) and **Berserk** (26) in the Cast dialog. They affect whoever stands on the clicked cell: the player first, otherwise a monster.
- `GameObject` holds active effects with scene-clock expiry (so dormant monsters still expire on time), the one-per-group rule (no refresh), and `getTemporaryEffectSpeedFactor`. Durations are divided by (1 + sum of modifiers), frame rates multiplied.
- `Player` and `Monster` keep their base speeds and recompute when effects change; visuals layer on top of the Player dialog / Summon dialog settings (chill tint, berserk overlay; invisible player at 50% opacity, invisible monster fully hidden).
- Invisibility: monsters drop the chase and their hits miss an invisible player (`PLAYER_INVISIBILITY_CHANGED`); invisible monsters can't be clicked. It ends when the holder starts an attack or a cast. Death clears all effects.

Verified in the browser: chill doubles a monster's step time (600 → 1200 ms) and halves attack speed, recasting doesn't refresh it, it expires 10 s after the hit; Berserk speeds the player's move/attack/cast by exactly 1.5× and a second Berserk is blocked; an invisible player took 0 hits in 3 s (5 in 2.5 s visible) and attacking broke it; invisible monster hidden (alpha 0), not targetable, revealed when it attacked; Sorceress Blizzard and the player's own Ice Storm chill the player; death clears effects; chill tint and berserk overlay render and clear. No console errors.

## Phase 5 notes

What landed (all in `sp-client`):

- **Teleports:** when the player steps onto one of the current world's teleport cells (`WorldData.teleports`), the game switches to the target world at the target cell. The switch is deferred until the current frame finishes (the step happens mid-frame), then saves state and restarts the scene like a Map dialog change. `GameStateManager.setWorld` sets the world and its map together, so worlds that share a map (shops, blacksmiths) stay distinct.
- **NPCs:** each world's NPCs are placed at their exact cells when the world loads, before spawn-area monsters. Like the server, placements may be on cells players can't walk on (Tom stands behind the blacksmith's counter at the forge). The Summon dialog shares `GameWorld.spawnNpc`.

Verified in the browser: Aresden (145,123) → Promiseland at (141,227) with 420 monsters, and back through Promiseland's row to Aresden at (146,123) with 361; Tom appears at (48,33) in both the Aresden and Elvine blacksmiths, including when the map is picked from the Map dialog, and nowhere else. No console errors.

Known gaps:

- The data has only these 2 teleport links and 2 NPC placements; recreating the original game's full teleport network and NPC locations is still to do (also on the original author's list).
- Music still follows the map (sp-client's map catalog), not the world's `music` field, because most worlds list the generic `default.mp3` while the map catalog has specific tracks.

## Phase 6 notes

- Annotated tag `multiplayer-final` marks the last commit with `multiplayer/`.
- Removed `multiplayer/` (C# server, multiplayer client and its duplicate assets, protobuf schemas, stress-test reports, multiplayer Cursor rules), `tools/client-simulator.ts`, the `proto:generate` / `client-simulator` scripts and their packages (`@bufbuild/protobuf`, `grpc-tools`, `ts-proto`, `tsx`).
- Removed the `mp-client` / `mp-server` launch configs and multiplayer sections of the READMEs and asset docs. The root README now describes the single-player fork.
- Kept: `reference/` (original C++ client/server code for game rules) and `tools/PakToSprConverter` (a .NET asset converter, unrelated to multiplayer).

## Server source references

Paths are in the `multiplayer-final` tag (under `multiplayer/server/`).


| Feature | Server files |
|---|---|
| Spawn areas / respawn | `World/Game/GameWorld.cs` (`SpawnDwellAreaMonsters`, `TryFindFreeCellInDwell`, `TryRespawnDwellMonster`), `Config/GameWorlds.json`, `Config/Settings.json` (`monsterDefaults`) |
| Monster AI | `World/Game/GameWorldMonster.cs`, `Helpers/MonsterChase.cs` |
| Spell damage | `Helpers/Casting.cs`, `Helpers/Combat.cs`, `Utils/GroundStateTracker.cs`, `Config/Spells.json` |
| Buffs / debuffs | `Helpers/TemporaryEffects.cs`, `temporaryEffects` in `Config/Spells.json` |
| Teleports / NPCs | `World/Game/GameWorld.cs`, `Helpers/Spawn.cs`, `Helpers/Npc.cs`, `Config/NPCs.json` |

## Verification

`sp-client` has no automated tests. Each phase is checked by:

- **Type checking:** `pnpm exec tsc --noEmit` in `sp-client`.
- **Playing it:** a manual pass in the browser.

Phase 1 also gets a frame-rate check on the busiest map.
