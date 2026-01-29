import { abils, ABILITIES } from '../const/const';
import { hit_damage_calculation, get_hit_sequence, style_specific_unification, calc_base_ad, apply_additional } from '../damage_calc';
import { calc_channelled_hit, handleBuffs, get_user_value, handle_edraco } from './rotation_damage_helper';
import { SETTINGS } from '../settings';
import { on_stall, on_cast, on_hit, on_damage } from './damage_calc_new.js';
import { create_damage_object } from './rota_object_helper';
import { buffs } from './rotation_consts';
import { abilities as rangedAbils } from '../../ranged/abilities';
import { abilities as magicAbils } from '../../magic/abilities';
import { abilities as meleeAbils } from '../../melee/abilities';
import { abilities as necroAbils } from '../../necromancy/abilities';
import { gearSwaps, offGcdAbilities as specialAbils } from '../../special/abilities';
import { CombatStyle, DamageObject, RotationInput } from '../types';
import { familiars } from '$lib/familiars/familiars';
import { Logger, LogCategory } from '$lib/utils/Logger';
import { rotationStore } from '$lib/stores/rotationStore.svelte.js';
import { settingsStore } from '$lib/stores/settingsStore.svelte.js';
import { uiActions, uiStore } from '$lib/stores/uiStore.svelte';
const logger = Logger.getInstance();

interface RotationState {
    dmgs: number[];
    damageQueue: Record<number, any[]>;
    timers: Record<string, number>;
    tick: number;
    hit_delay: number;
    start_tick: number;
    cinderHitCount: number;
    lastAftershockProc: number; // Track damage at last proc
    distributionStats: DamageDistributionStat[]; // Track distribution statistics for Gaussian modeling
    combatStyle: CombatStyle;
}

interface DamageDistributionStat {
    tick: number;
    likelihood: number;
    minDamage: number;
    maxDamage: number;
    ability: string;
    distributionType: 'crit' | 'non_crit' | 'combined';
    // For combined distributions, store the mixture components
    critProbability?: number;
    critMean?: number;
    critVariance?: number;
    critMin?: number;
    critMax?: number;
    nonCritProbability?: number;
    nonCritMean?: number;
    nonCritVariance?: number;
    nonCritMin?: number;
    nonCritMax?: number;
}

interface DamageResult {
    regularDamage: number;
    poisonDamage: number;
    familiarDamage: number;
    distributionStats: DamageDistributionStat[];
}

const allAbilities = { ...rangedAbils, ...magicAbils, ...meleeAbils, ...necroAbils };
/**
 * Calculates the total damage for a given rotation over a specified number of ticks.
 *
 * The calculation process:
 * 1. Processes each tick of the rotation sequentially
 * 2. For each tick:
 *    - Handles any stalled abilities that should activate
 *    - Processes the current ability if one exists
 *    - Performs channelled hit if channelling
 *    - Manages damage queues and timers
 *    - Handles extra actions and buffs
 * 3. Approximates poison damage
 * 4. Approximates familiar damage
 *
 * @param BAR_SIZE - The number of ticks to process in the rotation
 * @returns DamageResult containing regularDamage, poisonDamage, familiarDamage, distributionStats
 */
export function calculateTotalDamage(BAR_SIZE: number): DamageResult {
    const state: RotationState = {
        dmgs: [],
        damageQueue: {},
        timers: {},
        tick: 0,
        hit_delay: 1, // TODO implement hit delay properly (define min delay for each ability)
        start_tick: 0,
        cinderHitCount: 0,
        lastAftershockProc: 0,
        distributionStats: [],
        combatStyle: "melee"
    };

    // Get settings from the store
    const adaptedSettings = Object.fromEntries(
        Object.entries(settingsStore.settings).map(([key, value]: [string, { value: any }]) => [key, value.value])
    );
    const settingsCopy = structuredClone(adaptedSettings);

    logger.log(LogCategory.SETTINGS, 'Damage calculation settings', {
        abilityDamage: settingsCopy[SETTINGS.ABILITY_DAMAGE],
        hitChance: settingsCopy[SETTINGS.HIT_CHANCE],
        rangedLevel: settingsCopy[SETTINGS.RANGED_LEVEL],
        magicLevel: settingsCopy[SETTINGS.MAGIC_LEVEL],
        strengthLevel: settingsCopy[SETTINGS.STRENGTH_LEVEL]
    });

    // Process through each tick until we reach the end, +20 to finish handling bleeds
    const extraTicks = 20;
    while (state.tick < BAR_SIZE + extraTicks) {
        processCurrentTick(state, settingsCopy, BAR_SIZE);
    }
    const totalDamage = state.dmgs.reduce((acc, current) => acc + current, 0);
    const poisonDamage = calcPoisonDamage(state.cinderHitCount, settingsCopy);
    const familiarDamage = calcFamiliarDamage(rotationStore.abilityBar, settingsCopy);
    return {
        regularDamage: totalDamage,
        poisonDamage: poisonDamage,
        familiarDamage: familiarDamage,
        distributionStats: state.distributionStats
    };
}

/**
 * Core damage calculation function - decoupled from stores.
 * Can be called directly for single-ability calculations or testing.
 *
 * @param settings - Flat settings object (key -> value)
 * @param rotation - Rotation data (ability bar, extra actions, nulled ticks, stalled abilities)
 * @param barSize - The number of ticks to process
 * @returns DamageResult containing regularDamage, poisonDamage, familiarDamage, distributionStats
 */
export function calculateRotationDamageCore(
    settings: Record<string, any>,
    rotation: RotationInput,
    barSize: number
): DamageResult {
    const state: RotationState = {
        dmgs: [],
        damageQueue: {},
        timers: {},
        tick: 0,
        hit_delay: 1,
        start_tick: 0,
        cinderHitCount: 0,
        lastAftershockProc: 0,
        distributionStats: [],
        combatStyle: "melee"
    };

    const settingsCopy = structuredClone(settings);

    logger.log(LogCategory.SETTINGS, 'Core damage calculation settings', {
        abilityDamage: settingsCopy[SETTINGS.ABILITY_DAMAGE],
        hitChance: settingsCopy[SETTINGS.HIT_CHANCE]
    });

    // Process through each tick until we reach the end, +20 to finish handling bleeds
    const extraTicks = 20;
    while (state.tick < barSize + extraTicks) {
        processCurrentTickCore(state, settingsCopy, barSize, rotation);
    }

    const totalDamage = state.dmgs.reduce((acc, current) => acc + current, 0);
    const poisonDamage = calcPoisonDamage(state.cinderHitCount, settingsCopy);
    const familiarDamage = calcFamiliarDamage(rotation.abilityBar, settingsCopy);

    return {
        regularDamage: totalDamage,
        poisonDamage: poisonDamage,
        familiarDamage: familiarDamage,
        distributionStats: state.distributionStats
    };
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
 * @param settingsCopy - A copy of the game settings that can be modified during processing
 * @param BAR_SIZE - The total size of the ability bar
 */
function processCurrentTick(state: RotationState, settingsCopy: any, BAR_SIZE: number) {
    // Store nulled state at the start
    const isNulledTick = rotationStore.nulledTicks[state.tick];
    settingsCopy.isNulledTick = isNulledTick;


    // First process any stalled ability on this tick
    const stalledAbility = rotationStore.stalledAbilities[state.tick];
    if (stalledAbility) {
        style_specific_unification(settingsCopy, abils[stalledAbility]['main style']); //Update gear/combat style
        const abil_duration = typeof abils[stalledAbility]['duration'] === 'number' ? abils[stalledAbility]['duration'] : 3;
        settingsCopy['ability'] = stalledAbility;
        // Skip on_stall() call but do everything else

        if (!settingsCopy[SETTINGS.USE_RAW_ABILITY_DAMAGE]) {
            settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
        }

        state.start_tick = state.tick;
        const hit_tick = state.tick + state.hit_delay;
        state.damageQueue[hit_tick] ??= [];
        handleBuffs(settingsCopy, state.timers, stalledAbility);
        if (stalledAbility in allAbilities) {
            processStalledAbility(state, settingsCopy, stalledAbility, hit_tick); //TODO fix / remove
        }
    }
    // Then process any regular ability on this tick

    // handle either afking or chanelling if no ability on this tick
    const abilityKey = rotationStore.abilityBar[state.tick];
    if (abilityKey == null) {
        handleNullAbilityTick(state, settingsCopy);
        return;
    }

    const abil_duration = typeof abils[abilityKey]['duration'] === 'number' ? abils[abilityKey]['duration'] : 3;
    settingsCopy['ability'] = abilityKey;

    processAbility(state, settingsCopy, abilityKey as ABILITIES, abil_duration);
}

/**
 * Core version of processCurrentTick that uses rotation parameter instead of store.
 * Used for single-ability calculations and testing.
 */
function processCurrentTickCore(
    state: RotationState,
    settingsCopy: any,
    barSize: number,
    rotation: RotationInput
) {
    // Store nulled state at the start
    const isNulledTick = rotation.nulledTicks[state.tick] ?? false;
    settingsCopy.isNulledTick = isNulledTick;

    // First process any stalled ability on this tick
    const stalledAbility = rotation.stalledAbilities[state.tick];
    if (stalledAbility) {
        style_specific_unification(settingsCopy, abils[stalledAbility]['main style']);
        const abil_duration = typeof abils[stalledAbility]['duration'] === 'number' ? abils[stalledAbility]['duration'] : 3;
        settingsCopy['ability'] = stalledAbility;

        if (!settingsCopy[SETTINGS.USE_RAW_ABILITY_DAMAGE]) {
            settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
        }

        state.start_tick = state.tick;
        const hit_tick = state.tick + state.hit_delay;
        state.damageQueue[hit_tick] ??= [];
        handleBuffs(settingsCopy, state.timers, stalledAbility);
        if (stalledAbility in allAbilities) {
            processStalledAbility(state, settingsCopy, stalledAbility, hit_tick);
        }
    }

    // handle either afking or channelling if no ability on this tick
    const abilityKey = rotation.abilityBar[state.tick];
    if (abilityKey == null) {
        handleNullAbilityTickCore(state, settingsCopy, rotation);
        return;
    }

    const abil_duration = typeof abils[abilityKey]['duration'] === 'number' ? abils[abilityKey]['duration'] : 3;
    settingsCopy['ability'] = abilityKey;

    processAbilityCore(state, settingsCopy, abilityKey as ABILITIES, abil_duration, rotation);
}

/**
 * Core version - handles null ability tick without store access
 */
function handleNullAbilityTickCore(state: RotationState, settingsCopy: any, rotation: RotationInput) {
    processTickOperationsCore(state.tick, state, settingsCopy, rotation);
}

/**
 * Core version - processes tick operations without store access for UI updates
 */
function processTickOperationsCore(
    tickToProcess: number,
    state: RotationState,
    settingsCopy: any,
    rotation: RotationInput
) {
    handleExtraActionsCore(settingsCopy, state.timers, state.tick, rotation);
    // Skip copyStacks - no UI updates needed for headless calculation
    handleTimers(state.timers, settingsCopy);
    processQueuedDamage(tickToProcess, state, settingsCopy);
    handleAftershock(state, settingsCopy);

    state.tick += 1;
}

/**
 * Core version - handles extra actions using rotation parameter
 */
function handleExtraActionsCore(settings: any, timers: Record<string, number>, tick: number, rotation: RotationInput) {
    if (timers["Adrenaline renewal potion"] >= 0) {
        settings[SETTINGS.ADRENALINE] += 4;
    }
    if (!rotation.extraActionBar[tick]) return;

    rotation.extraActionBar[tick].forEach(element => {
        if (!element) return;
        if (specialAbils[element]) {
            if (element === "Adrenaline renewal potion") {
                timers[element] = 10;
            }
            else if (element.includes("Adrenaline")) {
                const amount = parseInt(element.split(" ")[1]);
                settings[SETTINGS.ADRENALINE] += amount;
            }
        }
        else if (gearSwaps[element.title]) {
            const slot = gearSwaps[element.title];
            settings[slot] = element.title;
        }
    });
}

/**
 * Core version of processAbility - uses rotation parameter
 */
function processAbilityCore(
    rotationState: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    abil_duration: number,
    rotation: RotationInput,
    onStall = true
) {
    style_specific_unification(settingsCopy, abils[abilityKey]['main style']);

    on_stall(settingsCopy, abilityKey);
    if (!settingsCopy[SETTINGS.USE_RAW_ABILITY_DAMAGE]) {
        settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
    }

    rotationState.start_tick = rotationState.tick;
    const hit_tick = rotationState.tick + rotationState.hit_delay;
    rotationState.damageQueue[hit_tick] ??= [];

    handleBuffs(settingsCopy, rotationState.timers, abilityKey);

    if (abilityKey in allAbilities) {
        if (allAbilities[abilityKey].calc == hit_damage_calculation) {
            processSingleHitAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        } else if (isChannelled(settingsCopy, abilityKey)) {
            // Handled in processAbilityTicksCore
        } else if (allAbilities[abilityKey]['ability classification'] === 'multihit') {
            processMultiHitAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        } else {
            processBleedAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        }
    }

    processAbilityTicksCore(rotationState, settingsCopy, abilityKey, abil_duration, rotation);
}

/**
 * Core version of processAbilityTicks - uses rotation parameter
 */
function processAbilityTicksCore(
    state: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    abil_duration: number,
    rotation: RotationInput
) {
    let rota;
    const isChannel = isChannelled(settingsCopy, abilityKey);
    const hasHits = abils[abilityKey]?.['hits'] !== undefined;
    if (isChannel && hasHits) {
        rota = get_hit_sequence(settingsCopy);
    }

    const end_tick = state.start_tick + abil_duration;
    for (let i = state.start_tick; i < end_tick; i++) {
        if (isChannel && hasHits) {
            processChannelledTickCore(state, settingsCopy, abilityKey, i, rota, rotation);
        }
        processTickOperationsCore(i, state, settingsCopy, rotation);
        if (rotation.abilityBar[i+1]) {
            break;
        }
    }
}

/**
 * Core version of processChannelledTick - uses rotation parameter
 */
function processChannelledTickCore(
    state: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    currentTick: number,
    hitSequence: ABILITIES[][],
    rotation: RotationInput
) {
    if (currentTick > state.start_tick && rotation.abilityBar[state.tick]) {
        return; // Cancel channel if new ability
    }
    let hit_index = 1 + currentTick - state.start_tick;
    let dmgObjects: DamageObject[] = [];

    if (hitSequence[hit_index].length > 0) {
        let hitKey = hitSequence[hit_index][0];
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
 * Processes a single tick's worth of common operations that happen every tick.
 * This includes handling extra actions, copying stacks, managing timers,
 * processing queued damage, and advancing the tick counter.
 *
 * @param tickToProcess - The specific tick number to process (may differ from state.tick for channeled abilities)
 * @param state - The rotation state tracking damage, queues, and timers
 * @param settingsCopy - A copy of the game settings that can be modified during processing
 */
function processTickOperations(
    tickToProcess: number,
    state: RotationState,
    settingsCopy: any
) {
    handleExtraActions(settingsCopy, state.timers, state.tick);
    copyStacks(state.tick, settingsCopy);
    handleTimers(state.timers, settingsCopy);
    processQueuedDamage(tickToProcess, state, settingsCopy);
    handleAftershock(state, settingsCopy);


    state.tick += 1;
}

function handleNullAbilityTick(state: RotationState, settingsCopy: any) {
    processTickOperations(state.tick, state, settingsCopy);
}

function processAbility(
    rotationState: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    abil_duration: number,
    onStall = true
) {
    //TODO release stalled abilities here
    style_specific_unification(settingsCopy, abils[abilityKey]['main style']); //Update gear/combat style

    on_stall(settingsCopy, abilityKey);
    if (!settingsCopy[SETTINGS.USE_RAW_ABILITY_DAMAGE]) {
        settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
    }

    rotationState.start_tick = rotationState.tick;
    const hit_tick = rotationState.tick + rotationState.hit_delay;
    rotationState.damageQueue[hit_tick] ??= [];

    handleBuffs(settingsCopy, rotationState.timers, abilityKey);

    if (abilityKey in allAbilities) {
        if (allAbilities[abilityKey].calc == hit_damage_calculation) {
            processSingleHitAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        } else if (isChannelled(settingsCopy, abilityKey)) {
            // Handled in processAbilityTicks
        } else if (allAbilities[abilityKey]['ability classification'] === 'multihit') {
            processMultiHitAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        } else {
            processBleedAbility(rotationState, settingsCopy, abilityKey, hit_tick);
        }
    }

    processAbilityTicks(rotationState, settingsCopy, abilityKey, abil_duration);
}

function processStalledAbility(
    state: RotationState, 
    settingsCopy: any, 
    abilityKey: string, 
    hit_tick: number
) {
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

function zeroDamageObject(dmgObject: DamageObject) {
    // Zero out all damage values while preserving the object structure
    Object.values(dmgObject.distributions).forEach(distribution => {
        if (distribution) {
            if (distribution['damage list']) {
                distribution['damage list'] = distribution['damage list'].map(() => 0);
            }
            distribution['min hit'] = 0;
            distribution['var hit'] = 0;
        }
    });
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
            state.damageQueue[hit_tick] ??= [];
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
            state.damageQueue[hit_tick] ??= [];
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
        let hits = on_hit(settingsCopy, element, state.timers, element.ability); // todo fix
        hits.forEach(hit => {
            if (settingsCopy.isNulledTick) {
                hit = zeroDamageObject(hit);
            }
            let htick = hit_tick + abils[abilityKey].hitTimings[i];
            state.damageQueue[htick] ??= [];
            state.damageQueue[htick].push(hit);
        });
        i++;
    });
}

function processAbilityTicks(
    state: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    abil_duration: number
) {
    let rota;
    const isChannel = isChannelled(settingsCopy, abilityKey);
    const hasHits = abils[abilityKey]?.['hits'] !== undefined;
    if (isChannel && hasHits) {
        rota = get_hit_sequence(settingsCopy);
    }

    const end_tick = state.start_tick + abil_duration;
    for (let i = state.start_tick; i < end_tick; i++) {
        if (isChannel && hasHits) {
            processChannelledTick(state, settingsCopy, abilityKey, i, rota);
        }
        processTickOperations(i, state, settingsCopy);
        if (rotationStore.abilityBar[i+1]) {
            break;
        }
    }
}

function processChannelledTick(
    state: RotationState,
    settingsCopy: any,
    abilityKey: ABILITIES,
    currentTick: number,
    rotation: ABILITIES[][]
) {
    if (currentTick > state.start_tick && rotationStore.abilityBar[state.tick]) {
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
 *    - Applying on damage effects
 * 4. Scales damage by likelihood of hit occuring 
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
            
            const damageObjects = on_damage(settingsCopy, namedDmgObject);
            damageObjects.forEach(dmgObj => {
                let dmg = get_user_value(settingsCopy, dmgObj);
                state.dmgs.push(Math.floor(dmg * scale)); // Scale damage by likelihood of hit occuring
                state.cinderHitCount += scale;

                // Collect distribution statistics for Gaussian modeling
                // Treat crit and non-crit as a single combined distribution per ability
                const critDist = dmgObj.distributions['crit'];
                const nonCritDist = dmgObj.distributions['non_crit'];
                
                if (critDist && critDist['damage list'].length > 0 &&
                    nonCritDist && nonCritDist['damage list'].length > 0) {

                    // Calculate crit and non-crit components for mixture
                    const critDamageList = critDist['damage list'];
                    const nonCritDamageList = nonCritDist['damage list'];

                    // Crit stats
                    const critMin = Math.min(...critDamageList);
                    const critMax = Math.max(...critDamageList);
                    const critMean = (critMin + critMax) / 2;
                    const critVariance = Math.pow((critMax - critMin) / 2, 2) / 3;

                    // Non-crit stats
                    const nonCritMin = Math.min(...nonCritDamageList);
                    const nonCritMax = Math.max(...nonCritDamageList);
                    const nonCritMean = (nonCritMin + nonCritMax) / 2;
                    const nonCritVariance = Math.pow((nonCritMax - nonCritMin) / 2, 2) / 3;

                    // Calculate combined min/max for display (includes both crit and non-crit)
                    const allDamage = [...critDamageList, ...nonCritDamageList];
                    const minDamage = Math.min(...allDamage);
                    const maxDamage = Math.max(...allDamage);

                    // Store as a single distribution with mixture components
                    state.distributionStats.push({
                        tick: tick,
                        likelihood: scale, // Total likelihood (crit + non-crit = 1)
                        minDamage: minDamage,
                        maxDamage: maxDamage,
                        ability: namedDmgObject.ability,
                        distributionType: 'combined',
                        critProbability: critDist['probability'],
                        critMean: critMean,
                        critVariance: critVariance,
                        critMin: critMin,
                        critMax: critMax,
                        nonCritProbability: nonCritDist['probability'],
                        nonCritMean: nonCritMean,
                        nonCritVariance: nonCritVariance,
                        nonCritMin: nonCritMin,
                        nonCritMax: nonCritMax
                    });
                } else if (critDist && critDist['damage list'].length > 0) {
                    // Only crit distribution exists
                    const damageList = critDist['damage list'];
                    state.distributionStats.push({
                        tick: tick,
                        likelihood: scale * critDist['probability'],
                        minDamage: Math.min(...damageList),
                        maxDamage: Math.max(...damageList),
                        ability: namedDmgObject.ability,
                        distributionType: 'crit'
                    });
                } else if (nonCritDist && nonCritDist['damage list'].length > 0) {
                    // Only non-crit distribution exists
                    const damageList = nonCritDist['damage list'];
                    state.distributionStats.push({
                        tick: tick,
                        likelihood: scale * nonCritDist['probability'],
                        minDamage: Math.min(...damageList),
                        maxDamage: Math.max(...damageList),
                        ability: namedDmgObject.ability,
                        distributionType: 'non_crit'
                    });
                }
            });
        });
    }
}

/**
 * Calculates the poison damage for the rotation. //TODO properly implement
 * 1/8 Chance to proc on hit
 * 15% + 5% per tier damage, then rolls 65-130% (avg 97.5%)
 * @param n_hits - The number of hits in the rotation.
 * @param settingsCopy - The settings copy used for rotation damage calculation.
 * @returns The total poison damage for the rotation.
 */
export function calcPoisonDamage(n_hits: number, settingsCopy: any) {
    let poison_dmg = 0;
    let poison_tier = Object.values(SETTINGS.POISON_VALUES).indexOf(settingsCopy[SETTINGS.POISON]);
    if (settingsCopy[SETTINGS.GLOVES] === SETTINGS.RANGED_GLOVES_VALUES.CINDERS) {
        poison_tier = Math.max(2, poison_tier+1);
    }
    if (poison_tier === 0) {
        return 0;
    }
    const abilDmg = settingsCopy[SETTINGS.ABILITY_DAMAGE];
    poison_dmg = Math.floor(abilDmg * 0.125 * (0.15 + 0.05 * poison_tier) * 0.975);
    return Math.floor(poison_dmg * n_hits);
}

/**
 * Calculates the familiar damage for the rotation. //TODO properly implement
 * @param abilityBar - The ability bar array.
 * @param settingsCopy - The settings copy used for rotation damage calculation.
 * @returns The total familiar damage for the rotation.
 */
export function calcFamiliarDamage(abilityBar: string[], settingsCopy: any) {
    let familiar_dmg = 0;
    let familiar = settingsCopy[SETTINGS.FAMILIAR];
    let lastTick = findLastValueIndex(abilityBar);

    if (Object.keys(familiars).includes(familiar)) {
        let expDamage = (settingsCopy[SETTINGS.FAMILIAR_ACCURACY] / 100.0) * (familiars[familiar].max_hit*1.2) / 2; // rolls 20-100%
        let n_hits = Math.floor(lastTick / familiars[familiar].attack_rate);
        familiar_dmg = expDamage * n_hits;
    }
    return Math.floor(familiar_dmg);
}

/*
 * Copies stacks from the settings to the rotationStore.
 * @param tick - The current tick being processed
 * @param settings - The current settings used for rotation damage calculation.
*/
function copyStacks(tick: number, settings: any) {
    for(let key in rotationStore.stacks) {
        // Convert to number before storing
        const value = typeof settings[key] === 'number' ? settings[key] : Number(settings[key]) || 0;
        rotationStore.stacks[key].stackTicks[tick] = value;
    }
    buffs.forEach(buffTitle => {
        if (buffTitle === SETTINGS.GREATER_DRACOLICH_INFUSION) {
            rotationStore.buffs[buffTitle].buffTicks[tick] = settings[SETTINGS.GREATER_DRACOLICH_INFUSION];
            logger.log(LogCategory.BUFFS, `Tick ${tick} - rotationStore.buffs['greater'].buffTicks[${tick}] = ${settings[SETTINGS.GREATER_DRACOLICH_INFUSION]}`);
        }
        else {
            rotationStore.buffs[buffTitle].buffTicks[tick] = settings[buffTitle];
        }
    });
    //Only calc indices on last tick
    if (tick === uiStore.bar.size - 1) {

    // Update buff idx values for UI display order and calculate active rows
        let buffIndex = 0;
        for (let key in rotationStore.buffs) {
            if (Object.hasOwnProperty.call(rotationStore.buffs, key)) {
                // Clear previous active rows
                rotationStore.buffs[key].activeRows = [];

                // Calculate which rows this buff is active on
                for (let rowIndex = 0; rowIndex < rotationStore.buffs[key].buffTicks.length; rowIndex++) {
                    const tickValue = rotationStore.buffs[key].buffTicks[rowIndex];
                    if (tickValue !== 0 && tickValue !== false && tickValue !== null && tickValue !== 'none') {
                        rotationStore.buffs[key].activeRows.push(rowIndex);
                    }
                }

                // Set idx based on whether buff is active anywhere
                if (rotationStore.buffs[key].activeRows.length > 0) {
                    rotationStore.buffs[key].idx = buffIndex;
                    buffIndex++;
                } else {
                    rotationStore.buffs[key].idx = -1;
                }
            }
        }
        uiActions.updateBarLastIndex(buffIndex);
    }
}

function handleExtraActions(settings: any, timers: Record<string, number>, tick: number) {
    if (timers["Adrenaline renewal potion"] >= 0) {
        settings[SETTINGS.ADRENALINE] += 4;
    }
    if (!rotationStore.extraActionBar[tick]) return;

    rotationStore.extraActionBar[tick].forEach(element => {
        if (!element) return;
        if (specialAbils[element]) {
            if (element === "Adrenaline renewal potion") {
                timers[element] = 10;
            }
            else if (element.includes("Adrenaline")) {
                const amount = parseInt(element.split(" ")[1]);
                settings[SETTINGS.ADRENALINE] += amount;
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

/**
 * 
 */
function handleAftershock(state: RotationState, settingsCopy: any) {
        // Check every 10 ticks if 500 damage has been done since last checkpoint
        if (state.tick % 10 === 0 && settingsCopy[SETTINGS.AFTERSHOCK] > 0) {
            const currentTotalDamage = state.dmgs.reduce((acc, current) => acc + current, 0);
            const damageSinceLastCheck = currentTotalDamage - state.lastAftershockProc;
            
            if (damageSinceLastCheck >= 50000) {
                state.lastAftershockProc = currentTotalDamage;
                processSingleHitAbility(state, settingsCopy, ABILITIES.AFTERSHOCK, state.tick+2);
            }
        }
}

function findLastValueIndex(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] != null && arr[i] !== '' && arr[i] !== undefined) {
            return i;
        }
    }
    return -1; // No value found
}

/**
 * Calculates Gaussian parameters (mean and standard deviation) from the collected damage distribution statistics.
 * This models the total damage as a Gaussian distribution for more accurate damage prediction.
 * 
 * @param distributionStats - Array of damage distribution statistics collected during calculation
 * @returns Object containing mean and standard deviation of the total damage distribution
 */
export function calculateGaussianParameters(distributionStats: DamageDistributionStat[]): { mean: number; stdDev: number } {
    if (distributionStats.length === 0) {
        return { mean: 0, stdDev: 0 };
    }

    // Calculate weighted mean and variance
    let totalWeight = 0;
    let weightedSum = 0;
    let weightedSumSquares = 0;

    distributionStats.forEach(stat => {
        const weight = stat.likelihood;
        const meanDamage = (stat.minDamage + stat.maxDamage) / 2;
        const variance = Math.pow((stat.maxDamage - stat.minDamage) / 2, 2) / 3; // Uniform distribution variance

        totalWeight += weight;
        weightedSum += weight * meanDamage;
        weightedSumSquares += weight * (Math.pow(meanDamage, 2) + variance);
    });

    const mean = weightedSum / totalWeight;
    const variance = (weightedSumSquares / totalWeight) - Math.pow(mean, 2);
    const stdDev = Math.sqrt(variance);

    return { mean, stdDev };
}

/**
 * Returns the collected distribution statistics for external analysis.
 * 
 * @param state - The rotation state containing the distribution statistics
 * @returns Array of damage distribution statistics
 */
export function getDistributionStats(state: RotationState): DamageDistributionStat[] {
    return state.distributionStats;
} 