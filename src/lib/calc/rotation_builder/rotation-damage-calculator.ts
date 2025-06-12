import { abils } from '../const';
import { hit_damage_calculation, get_hit_sequence, style_specific_unification, calc_base_ad, apply_additional } from '../damage_calc';
import { calc_channelled_hit, handle_buffs, get_user_value, handle_edraco } from './rotation_damage_helper';
import { SETTINGS } from '../settings';
import { on_stall, on_cast, on_hit, on_damage } from './damage_calc_new.js';
import { create_object } from '../object_helper';
import { create_damage_object } from './rota_object_helper';
import { buffs } from './rotation_consts';
import { abilities as rangedAbils } from '../../ranged/abilities';
import { abilities as magicAbils } from '../../magic/abilities';
import { gearSwaps, offGcdAbilities as specialAbils } from '../../special/abilities';
import { DamageObject } from '../types';

// Interface for the game state
interface GameState {
    totalDamage: number;
    settings: Record<string, { value: any }>;
    abilityBar: (string | null)[];
    extraActionBar: (any | null)[][];
    buffs: Record<string, { buffTicks: (boolean | number)[] }>;
    stacks: Record<string, { stackTicks: number[] }>;
    nulledTicks: boolean[];
    stalledAbilities: string[];
}

interface RotationState {
    dmgs: number[];
    damageQueue: Record<number, any[]>;
    timers: Record<string, number>;
    tick: number;
    hit_delay: number;
    start_tick: number;
    hitCount: number;
}

//TODO use this for the return type of calculateTotalDamage
interface DamageResult {
    regularDamage: number;
    poisonDamage: number;
}

const allAbilities = { ...rangedAbils, ...magicAbils };
/**
 * Calculates the total damage for a given rotation over a specified number of ticks.
 * 
 * The calculation process:
 * 1. Processes each tick of the rotation sequentially
 * 2. For each tick:
 *    - Handles any stalled abilities that should activate
 *    - Processes the current ability if one exists
 *    - Performs chanelled hit if channelling 
 *    - Manages damage queues and timers
 *    - Handles extra actions and buffs
 * 3. Approximates poison damage
 * 
 * @param gameState - The current state of the game, including settings, ability bar, and buffs
 * @param BAR_SIZE - The number of ticks to process in the rotation
 * @returns A tuple containing [totalDamage, poisonDamage]:

 */
export function calculateTotalDamage(gameState: GameState, BAR_SIZE: number): [number, number] {
    const state: RotationState = {
        dmgs: [],
        damageQueue: {},
        timers: {},
        tick: 0,
        hit_delay: 1, // TODO implement hit delay properly (define min delay for each ability)
        start_tick: 0,
        hitCount: 0
    };

    const adaptedSettings = Object.fromEntries(
        Object.entries(gameState.settings).map(([key, value]) => [key, value.value])
    );
    const settingsCopy = structuredClone(adaptedSettings);

    // Process through each tick until we reach the end, +20 to finish handling bleeds
    while (state.tick < BAR_SIZE + 20) {
        processCurrentTick(state, gameState, settingsCopy, BAR_SIZE);
    }
    const totalDamage = state.dmgs.reduce((acc, current) => acc + current, 0);
    const poisonDamage = calcPoisonDamage(state.hitCount, settingsCopy);
    return [totalDamage, poisonDamage];
}

/**
 * Processes a tick of the rotation, handling both stalled and regular abilities.
 * 
 * The processing order:
 * 1. Check if the current tick is nulled (no damage)
 * 2. Process any stalled ability that should activate on this tick
 * 3. If no ability is queued for this tick:
 *    - Handle extra actions (like potions or gear swaps)
 *    - Update buff timers and stacks
 * 4. If an ability is queued:
 *    - Process the ability and its effects
 *    - Handle ability-specific mechanics
 *    - Queue the resulting damage for future ticks
 * 
 * @param state - The current rotation state tracking damage, queues, and timers
 * @param gameState - The game state containing settings, ability bar, and buffs
 * @param settingsCopy - A copy of the game settings that can be modified during processing
 * @param BAR_SIZE - The total size of the ability bar
 */
function processCurrentTick(state: RotationState, gameState: GameState, settingsCopy: any, BAR_SIZE: number) {
    // Store nulled state at the start
    const isNulledTick = gameState.nulledTicks[state.tick];
    settingsCopy.isNulledTick = isNulledTick;
    

    // First process any stalled ability on this tick
    const stalledAbility = gameState.stalledAbilities[state.tick];
    if (stalledAbility) {
        style_specific_unification(settingsCopy, abils[stalledAbility]['main style']); //Update gear/combat style
        const abil_duration = typeof abils[stalledAbility]['duration'] === 'number' ? abils[stalledAbility]['duration'] : 3;
        settingsCopy['ability'] = stalledAbility;
        // Skip on_stall() call but do everything else
        
        settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
        
        state.start_tick = state.tick;
        const hit_tick = state.tick + state.hit_delay;
        state.damageQueue[hit_tick] ??= [];
        handle_buffs(settingsCopy, state.timers, stalledAbility);

        if (stalledAbility in rangedAbils) {
            processRangedAbility(state, settingsCopy, stalledAbility, hit_tick); //TODO fix / remove
        }
    }
    // Then process any regular ability on this tick

    // handle either afking or chanelling if no ability on this tick
    const abilityKey = gameState.abilityBar[state.tick];
    if (abilityKey == null) {
        handleNullAbilityTick(state, gameState, settingsCopy);
        return;
    }

    const abil_duration = typeof abils[abilityKey]['duration'] === 'number' ? abils[abilityKey]['duration'] : 3;
    settingsCopy['ability'] = abilityKey;
    
    processAbility(state, gameState, settingsCopy, abilityKey, abil_duration);
}

function handleNullAbilityTick(state: RotationState, gameState: GameState, settingsCopy: any) {
    handleExtraActions(settingsCopy, state.timers, state.tick, gameState);
    copyStacks(state.tick, settingsCopy, gameState);
    handleTimers(state.timers, settingsCopy);
    processQueuedDamage(state.tick, state, settingsCopy);
    state.tick += 1;
}

function processAbility(
    state: RotationState, 
    gameState: GameState, 
    settingsCopy: any, 
    abilityKey: string, 
    abil_duration: number
) {
    //TODO release stalled abilities here
    style_specific_unification(settingsCopy, abils[abilityKey]['main style']); //Update gear/combat style
    on_stall(settingsCopy, abilityKey);
    settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
    
    state.start_tick = state.tick;
    const hit_tick = state.tick + state.hit_delay;
    state.damageQueue[hit_tick] ??= [];
    
    handle_buffs(settingsCopy, state.timers, abilityKey);
    
    if (abilityKey in allAbilities) {
        if (allAbilities[abilityKey].calc == hit_damage_calculation) {
            processSingleHitAbility(state, settingsCopy, abilityKey, hit_tick);
        } else if (isChannelled(settingsCopy, abilityKey)) {
            // Handled in processAbilityTicks
        } else if (abils[abilityKey]['ability classification'] === 'multihit') {
            processMultiHitAbility(state, settingsCopy, abilityKey, hit_tick);
        } else {
            processBleedAbility(state, settingsCopy, abilityKey, hit_tick);
        }
    }

    processAbilityTicks(state, gameState, settingsCopy, abilityKey, abil_duration);
}

function processRangedAbility(
    state: RotationState, 
    settingsCopy: any, 
    abilityKey: string, 
    hit_tick: number
) {
    if (rangedAbils[abilityKey].calc == hit_damage_calculation) {
        processSingleHitAbility(state, settingsCopy, abilityKey, hit_tick);
    } else if (isChannelled(settingsCopy, abilityKey)) {
        // Handled in processAbilityTicks
    } else if (abils[abilityKey]['ability classification'] === 'multihit') {
        processMultiHitAbility(state, settingsCopy, abilityKey, hit_tick);
    } else {
        processBleedAbility(state, settingsCopy, abilityKey, hit_tick);
    }
}

function zeroDamageObject(dmgObject: any) {
    // Zero out all damage values while preserving the object structure
    if (dmgObject.non_crit) {
        // Handle both property naming conventions
        if (dmgObject.non_crit['damage list']) {
            dmgObject.non_crit['damage list'] = dmgObject.non_crit['damage list'].map(() => 0);
        }
        if (dmgObject.non_crit.damage_list) {
            dmgObject.non_crit.damage_list = dmgObject.non_crit.damage_list.map(() => 0);
        }
        dmgObject.non_crit.min_hit = 0;
        dmgObject.non_crit.var_hit = 0;
    }
    if (dmgObject.crit) {
        if (dmgObject.crit['damage list']) {
            dmgObject.crit['damage list'] = dmgObject.crit['damage list'].map(() => 0);
        }
        if (dmgObject.crit.damage_list) {
            dmgObject.crit.damage_list = dmgObject.crit.damage_list.map(() => 0);
        }
        dmgObject.crit.min_hit = 0;
        dmgObject.crit.var_hit = 0;
    }
    return dmgObject;
}

function processSingleHitAbility(
    state: RotationState, 
    settingsCopy: any, 
    abilityKey: string, 
    hit_tick: number
) {
    let dmgObject = create_damage_object(settingsCopy, abilityKey);
    let dmgObjects = on_cast(settingsCopy, dmgObject, state.timers, abilityKey);
    dmgObjects.forEach(element => {
        let hitKey = element.ability;
        settingsCopy['ability'] = hitKey;
        let namedDmgObjects = on_hit(settingsCopy, element, state.timers, hitKey);
        namedDmgObjects.forEach(namedDmgObject => {
            if (settingsCopy.isNulledTick) {
                namedDmgObject = zeroDamageObject(namedDmgObject);
            }
            state.damageQueue[hit_tick].push(namedDmgObject);
        });
    });
}

function processMultiHitAbility(
    state: RotationState, 
    settingsCopy: any, 
    abilityKey: string, 
    hit_tick: number
) {

    let dmgObject = create_damage_object(settingsCopy, abilityKey);
    let dmgObjects = on_cast(settingsCopy, dmgObject, state.timers, abilityKey);
    dmgObjects.forEach(element => {
        let namedDmgObjects = on_hit(settingsCopy, element, state.timers, element.ability);
        namedDmgObjects.forEach(namedDmgObject => {
            namedDmgObject = settingsCopy.isNulledTick ? zeroDamageObject(namedDmgObject) : namedDmgObject;
            state.damageQueue[hit_tick].push(namedDmgObject);
        });
    });
}

function processBleedAbility(
    state: RotationState, 
    settingsCopy: any, 
    abilityKey: string, 
    hit_tick: number
) {
    let dmgObject = create_damage_object(settingsCopy, abilityKey);
    let dmgObjects = on_cast(settingsCopy, dmgObject, state.timers, abilityKey);
    let i = 0;
    dmgObjects.forEach(element => {
        let hit = on_hit(settingsCopy, element, state.timers, abilityKey)[0]; // todo fix
        if (settingsCopy.isNulledTick) {
            dmgObject = zeroDamageObject(dmgObject);
        }
        let htick = hit_tick + abils[abilityKey]['hit_timings'][i];
        state.damageQueue[htick] ??= [];
        state.damageQueue[htick].push(hit);
        i++;
    });
}

function processAbilityTicks(
    state: RotationState, 
    gameState: GameState, 
    settingsCopy: any, 
    abilityKey: string, 
    abil_duration: number
) {
    let rota;
    if (isChannelled(settingsCopy, abilityKey)) {
        rota = get_hit_sequence(settingsCopy);
    }

    const end_tick = state.start_tick + abil_duration;
    for (let i = state.start_tick; i < end_tick; i++) {
        if (isChannelled(settingsCopy, abilityKey)) {
            processChannelledTick(state, gameState, settingsCopy, abilityKey, i, rota);
        }
        handleExtraActions(settingsCopy, state.timers, state.tick, gameState);
        copyStacks(state.tick, settingsCopy, gameState);
        handleTimers(state.timers, settingsCopy);
        processQueuedDamage(i, state, settingsCopy);
        state.tick += 1;
        if (gameState.abilityBar[i+1]) {
            break;
        }
    }
}

function processChannelledTick(
    state: RotationState, 
    gameState: GameState, 
    settingsCopy: any, 
    abilityKey: string, 
    currentTick: number, 
    rotation: string[][]
) {
    if (currentTick > state.start_tick && gameState.abilityBar[state.tick]) {
        return; // Cancel channel if new ability
    }
    let hit_index = 1 + currentTick - state.start_tick;
    let dmgObjects: DamageObject[] = [];
    
    if (rotation[hit_index].length > 0) {
        let hitKey = rotation[hit_index][0];
        let dmgObject = create_damage_object(settingsCopy, hitKey);
        let dmgObjs = on_cast(settingsCopy, dmgObject, state.timers, hitKey);
        dmgObjs.forEach(dmgObj => {
            let o = on_hit(settingsCopy, dmgObj, state.timers, dmgObj.ability);
            for (let hit of o) {
                dmgObjects.push(hit);
            }
        });
            handle_edraco(settingsCopy, state.timers, hitKey);
    }
    dmgObjects.forEach(dmgObject => {
        if (settingsCopy.isNulledTick) {
            dmgObject = zeroDamageObject(dmgObject);
        }
        
        if (dmgObject.distributions['non_crit']['damage list'].length > 0) {
            let hit_tick = currentTick + state.hit_delay;
            (state.damageQueue[hit_tick] ??= []).push(dmgObject);
        }
    });
}

/**
 * Processes all damage hits queued for a specific tick.
 * 
 * For each queued hit:
 * 1. Sets the current ability context
 * 2. Gets user-selected damage metric
 * 3. Calculates the final damage value by:
 *    - Applying damage modifiers
 *    - Adding any additional effects
 * 4. Records the damage and increments hit counter
 * 
 * @param tick - The current game tick being processed
 * @param state - The rotation state containing damage queue and tracking arrays
 * @param settingsCopy - The current game settings used for damage calculation
 */
function processQueuedDamage(tick: number, state: RotationState, settingsCopy: any) {
    if (state.damageQueue[tick]) {
        state.damageQueue[tick].forEach(namedDmgObject => {
            settingsCopy['ability'] = namedDmgObject.ability;
            const scale = namedDmgObject.likelihood;
            
            // on_damage now returns an array of damage objects
            const damageObjects = on_damage(settingsCopy, namedDmgObject);
            damageObjects.forEach(dmgObj => {
                let dmg = get_user_value(settingsCopy, dmgObj);
                state.dmgs.push(dmg * scale); // Scale damage by likelihood of hit occuring 
                state.hitCount += scale;

            
//                 console.log('Ability: ', dmgObj.ability || 'unknown');
//                 console.log('dmgObject - on_damage', dmg);
//                 console.log('tick', tick);
            });
        });
    }
}

/**
 * Calculates the poison damage for the rotation. //TODO properly implement
 * @param state - The current state of the damage calculation.
 * @param settingsCopy - The settings copy used for rotation damage calculation.
 * @returns The total poison damage for the rotation.
 */
export function calcPoisonDamage(n_hits: number, settingsCopy: any) {
    let poison_dmg = 0;
    if (settingsCopy[SETTINGS.RANGED_GLOVES] === SETTINGS.RANGED_GLOVES_VALUES.CINDERS) {
        const abilDmg = settingsCopy[SETTINGS.ABILITY_DAMAGE];
        poison_dmg = Math.floor(abilDmg * 0.125 * 0.39);
    }
    return Math.floor(poison_dmg * n_hits);
}

function copyStacks(tick: number, settings: any, gameState: GameState) {
    for(let key in gameState.stacks) {
        // Convert to number before storing
        const value = typeof settings[key] === 'number' ? settings[key] : Number(settings[key]) || 0;
        gameState.stacks[key].stackTicks[tick] = value;
    }
    buffs.forEach(buffTitle => {
        gameState.buffs[buffTitle].buffTicks[tick] = settings[buffTitle];
    });
}

function handleExtraActions(settings: any, timers: Record<string, number>, tick: number, gameState: GameState) {
    if (timers["Adrenaline renewal potion"] >= 0) {
        settings[SETTINGS.ADRENALINE] += 4;
    }
    if (!gameState.extraActionBar[tick]) return;
    
    gameState.extraActionBar[tick].forEach(element => {
        if (!element) return;
        if (specialAbils[element]) {
            if (element === "Adrenaline renewal potion") {
                timers[element] = 10;
            }
            if (element === "Add 100 Adrenaline") {
                settings[SETTINGS.ADRENALINE] += 100;
            }
        }
        // Handle gear swaps
        //TODO nicer implementation unifying extra actions
        else if (gearSwaps[element.title]) {
            const slot = gearSwaps[element.title];
            settings[slot] = element.title;
        }
    });
}

function handleTimers(timers: Record<string, number>, settings: any) {
    if (Object.keys(timers).length > 0) {
        for (let key in timers) {
            timers[key] -= 1;
            if (timers[key] <= 0) {
                if (key === SETTINGS.ICY_PRECISION) {
                    settings[key] = 0;
                } else {
                    settings[key] = false;
                }
            }
        }
    }
}

function isChannelled(settingsCopy: any, key: string): boolean {
    return abils[key]['ability classification'] === 'channel';
} 