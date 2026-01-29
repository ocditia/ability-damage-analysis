import { ABILITIES, abils } from '../const/const';
import { create_damage_object } from './rota_object_helper';
import { SETTINGS } from '../settings';
import { calc_crit_damage, get_hit_sequence, calc_split_soul_hit, add_adrenaline } from './calculation_utils';
import { handle_sgb } from './rotation_damage_helper';
import { DamageObject, DamageKind, DamageDistribution } from '../types';
import { Logger, LogCategory } from '../../utils/Logger';
import {
    applyStyleBoostedADEffects,
    applyStyleAbilitySpecificEffects,
    applyStyleAbilityPercentModifiers,
    applyStyleStackEffects,
    applyStyleBonusDamageEffects,
    applyStyleMinVarEffects,
    applyStyleMultiplicativeEffects,
    calculatePrayerBoost,
    applyAllDamageModifiers,
    applyAdditiveBoosts,
    applyPvEBoosts,
    handleWenBuffConsumption,
    EffectContext,
    DamageModifierContext
} from './effects';

// Initialize logger
const logger = Logger.getInstance();

// Helper functions for accessing the new DamageObject structure
function getDamageDistribution(dmgObject: DamageObject, kind: DamageKind): DamageDistribution | undefined {
    return dmgObject.distributions[kind];
}


function iterateDistributions(dmgObject: DamageObject, callback: (distribution: DamageDistribution, kind: DamageKind) => void): void {
    for (const kind of ['non_crit', 'crit'] as DamageKind[]) {
        const distribution = dmgObject.distributions[kind];
        if (distribution) {
            callback(distribution, kind);
        }
    }
}

// These are the things that happen before an ability is released - 
// adrenaline and cooldowns before on_cast is called.
// This is at the same time, except when an ability is stalled.
function on_stall(settings: Record<string, any>, abilityKey: string) {
    const type = abils[abilityKey]['ability type'];
    if (type == 'basic') {
        add_adrenaline(settings, settings[SETTINGS.FURY_OF_THE_SMALL] ? 9 : 8); // Normal 8/9%
        if (settings[SETTINGS.EXPECTED_ADRENALINE]) {
            add_adrenaline(settings, settings[SETTINGS.IMPATIENT] * 0.09 * 3); // Impatient
        }
    }
    else if (type == 'threshold') {
        add_adrenaline(settings, -15);
    }
    else if (type == 'ultimate') { 
        let cost = 100;
        cost -= settings[SETTINGS.VIGOUR] ? 10 : 0;
        cost -= settings[SETTINGS.CONSERVATION_OF_ENERGY] ? 10 : 0;
        let igneous = [ABILITIES.OMNIPOWER, ABILITIES.OVERPOWER, ABILITIES.DEADSHOT, ABILITIES.DEATHSKULLS].includes(abilityKey as ABILITIES);
        cost -= igneous && settings[SETTINGS.CAPE] === SETTINGS.CAPE_VALUES.ZUK ? 40 : 0;
        add_adrenaline(settings, -cost);
    }
    else if (type == 'special attack') {
        let cost = abils[abilityKey].adrenaline;
        const multi = settings[SETTINGS.VIGOUR] ? 0.9 : 1;
        cost *= multi;
        add_adrenaline(settings, -cost)
    }
}

// TODO some changes might have to be made.
// TODO e.g. currently conflagrate is true/false, but this should be a timer so it should check conflagrate >=1.
// Detonate, Flanking GBarge, Icy Tempest, Salt the Wound, deathguard spec
// 
function on_cast(settings: Record<string, any>, dmgObject: DamageObject, timers: Record<string, number>, abilityKey: ABILITIES): DamageObject[] {
    // This function happens as an ability is cast
    // Ensure settings['ability'] is set for functions that depend on it (like get_hit_sequence)
    settings['ability'] = abilityKey;

    // scale to hit chance / damage potential
    logger.log(LogCategory.ABILITY_DAMAGE, `on_cast called for ${abilityKey}`, {
        abilityDamage: settings[SETTINGS.ABILITY_DAMAGE],
        hitChance: settings[SETTINGS.HIT_CHANCE]
    });
    logger.log(LogCategory.ABILITY_DAMAGE, 'BASE AD', settings[SETTINGS.ABILITY_DAMAGE]);
    const dmgObjects = [];
    iterateDistributions(dmgObject, (distribution) => {
        distribution['boosted AD'] = Math.floor(settings[SETTINGS.ABILITY_DAMAGE] * 
            Math.min(settings[SETTINGS.HIT_CHANCE] / 100, 1));
        logger.log(LogCategory.ABILITY_DAMAGE, `Set boosted AD for ${abilityKey}`, distribution['boosted AD']);
    });
    
    // Handle Wen buff consumption for ranged abilities
    handleWenBuffConsumption(settings, timers, abilityKey);
    // Marco - turn off hit chance stuff here (idt anything exists)
    // TODO - ingenuity of the humans, and check if accuracy penalty from wrong style gear is implemented
    // calculate boosted AD / invisible AD
    const effectCtx: EffectContext = { settings, abilityKey };
    const cleanupFunctions: Array<() => void> = [];

    iterateDistributions(dmgObject, (distribution) => {
        // Apply style-specific boosted AD effects (weapons, flow stacks, chaos roar, etc.)
        // Also applies shared pocket effects (Scripture of Amascut)
        const result = applyStyleBoostedADEffects(effectCtx, distribution);
        if (result.cleanup) {
            cleanupFunctions.push(result.cleanup);
        }
    });

    // Execute any cleanup functions (e.g., turn off chaos roar after it's been used)
    cleanupFunctions.forEach(cleanup => cleanup());

    let preability_AD = dmgObject.distributions.non_crit['boosted AD'];
    // apply ability specific effects
    iterateDistributions(dmgObject, (distribution) => {
        applyStyleAbilitySpecificEffects(effectCtx, distribution);
    });

    // Marco - turn off ability specific stuff here
    // e.g. turn off conflagrate after it's been used
    

    // Split single cast up into the different effects
    if (abils[abilityKey]['ability classification'] == 'multihit') {
        let hits = get_hit_sequence(settings);      

        for (let tick in hits) {
            for (let hit in hits[tick]) {
                if (abils[hits[tick][hit]]) { //filter 'next tick'/'next hit' entries 
                    let clone = create_damage_object(settings, hits[tick][hit]);
                    iterateDistributions(clone, (cloneDist, kind) => {
                        const sourceDist = getDamageDistribution(dmgObject, kind);
                        if (sourceDist && cloneDist) {
                            cloneDist['probability'] = sourceDist['probability'];
                            cloneDist['boosted AD'] = sourceDist['boosted AD'];
                        }
                    });
                    clone.ability = hits[tick][hit];
                    dmgObjects.push(clone);
                }
            }
        }

        // Consume residual souls after Volley of Souls cast (hit sequence already calced)
        if (abilityKey === ABILITIES.VOLLEY_OF_SOULS_DYNAMIC && settings[SETTINGS.RESIDUAL_SOULS] >= 2) {
            settings[SETTINGS.RESIDUAL_SOULS] = 0;
        }
    }
    else if (['bleed', 'burn', 'dot'].includes(abils[abilityKey]['ability classification'])) {
        let n_hits = abils[abilityKey]['hits'][1].length;
        for (let i = 0; i < n_hits; i++) {
            const clone = structuredClone(dmgObject);
            const hitAbility = abils[abilityKey]['hits'][1][i];
            clone.ability = hitAbility as ABILITIES;
            if (clone.ability === ABILITIES.SOULFIRE_INITIAL) {
                iterateDistributions(clone, (distribution) => {
                    distribution['boosted AD'] = preability_AD;
                });
            }

            dmgObjects.push(clone);
        }
    }
    else if (abils[abilityKey]['ability classification'] == 'channel') {
    }
    else {
        dmgObjects.push(dmgObject);
    }
    dmgObjects.forEach(dmgObject => {
        set_min_var(settings, dmgObject);
    });
    return dmgObjects;
}

function on_hit(settings: Record<string, any>, dmgObject: DamageObject, timers: Record<string, number>, abilityKey: ABILITIES): DamageObject[] {
    // this function runs for all hits (note: not hitsplats)
    const dmgObjects = [dmgObject];
    const effectCtx: EffectContext = { settings, abilityKey };
    Logger.getInstance().log(LogCategory.ABILITY_DAMAGE, 'on_hit', abilityKey, dmgObject);
    // compute on-hit effects
    if (abils[abilityKey]['on-hit effects'] === true) {
        // TODO: add needle strike back - turn on additive boosts if inside timer window

        iterateDistributions(dmgObject, (distribution) => {
            // 1. Style-specific min/var effects (ammo effects, precise perk, etc.)
            applyStyleMinVarEffects(effectCtx, distribution);

            // 2. Additive boosts (stone of jas, void, etc.)
            applyAdditiveBoosts(effectCtx, distribution);

            // 3. Multiplicative shared buffs (prayer, ultimates, revenge, ruthless)
            let boost = 10000;
            boost = Math.floor(boost * calculatePrayerBoost(settings, abilityKey));
            boost = applyStyleMultiplicativeEffects(effectCtx, distribution, boost);
            distribution['min hit'] = Math.floor((distribution['min hit'] * boost) / 10000);
            distribution['var hit'] = Math.floor((distribution['var hit'] * boost) / 10000);

            // 4. PvE multiplicative buffs (slayer helm, guardhouse, etc.)
            applyPvEBoosts(effectCtx, distribution);

            // 5. Bonus damage (flat additions like frostblades)
            applyStyleBonusDamageEffects(effectCtx, distribution);
        });
    }
    // roll damage
    logger.log(LogCategory.ABILITY_DAMAGE, 'roll_damage start', {
        ability: abilityKey,
        hasOnHitEffects: abils[abilityKey]['on-hit effects']
    });
    iterateDistributions(dmgObject, (distribution) => {
        logger.log(LogCategory.ABILITY_DAMAGE, 'roll_damage iteration', {
            minHit: distribution['min hit'],
            varHit: distribution['var hit'],
            damageListLengthBefore: distribution['damage list'].length
        });
        for (let i = 0; i <= distribution['var hit']; i++) {
            distribution['damage list'].push(distribution['min hit'] + i);
        }
        logger.log(LogCategory.ABILITY_DAMAGE, 'roll_damage after', {
            damageListLength: distribution['damage list'].length
        });
    });
    
    // store igneous cleave damage
    if (abilityKey === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        settings['igneous cleave bleed damage']['damage list'] = structuredClone(dmgObject);
    }

    // Add stacks (bolg, wen, bik, residual souls, necrosis)
    if (abils[abilityKey]['on-hit effects'] === true &&
        abils[abilityKey]['ability type'] != 'proc') {
        // BOLG perfect equilibrium stacks (special condition - needs on-hit and not proc)
        if (settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
                settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] += 1;
        }
    }

    // Apply style-specific stack effects (wen, bik, residual souls, necrosis)
    applyStyleStackEffects(effectCtx);

    // calc core
    if (abils[abilityKey]['on-hit effects'] === true) {
        iterateDistributions(dmgObject, (distribution) => {
            for (let i=0; i<distribution['damage list'].length; i++) {
                // berserker's fury
                distribution['damage list'][i] = Math.floor(
                    distribution['damage list'][i] * (1 + settings[SETTINGS.BERSERKERS_FURY] / 100)
                );
        
                // dharock's gear (proc based, so added later)
                //crits
                if (distribution['crit'] === true && abils[abilityKey]['crit effects'] === true) {
                    distribution['damage list'][i] = Math.floor(
                        distribution['damage list'][i] * (1 + calc_crit_damage(settings))
                    );
                }
            }
        });

    
        handleBolgProc(settings, dmgObject, timers, dmgObjects);
        handleFsoa(abilityKey, settings, dmgObject, timers, dmgObjects); // store fsoa damage

        // store bloat damages
        if (abilityKey === ABILITIES.BLOAT) {
            settings[SETTINGS.BLOAT] = structuredClone(dmgObject);
        }

        if (abilityKey == ABILITIES.CRYSTAL_RAIN) {
            dmgObjects.push(...handle_sgb(settings, dmgObject));            
        }
    }    
    return dmgObjects;
}

function on_damage(settings: Record<string, any>, dmgObject: DamageObject): DamageObject[] {
    const abilityKey = dmgObject.ability;
    const modifierCtx: DamageModifierContext = { settings, abilityKey };

    iterateDistributions(dmgObject, (distribution) => {
        for (let i = 0; i < distribution['damage list'].length; i++) {
            // Apply all damage modifiers using the extracted effects
            distribution['damage list'][i] = applyAllDamageModifiers(
                modifierCtx,
                distribution['damage list'][i]
            );
        }
        // store damage into soul split for reference
        settings['soul split'] = distribution;
    });

    // Prepare result array starting with original damage object
    const results: DamageObject[] = [dmgObject];

    // Create split soul damage object if applicable
    if (settings['split soul'] === true && ['magic', 'melee', 'ranged', 'necrotic'].includes(
            abils[abilityKey]['damage type']) && settings['soul split']['damage list'])
    {
        // Create a new damage object for split soul
        const splitSoulObject = create_damage_object(settings, ABILITIES.SPLIT_SOUL_ECB);
        splitSoulObject.likelihood = dmgObject.likelihood;

        // Calculate only the split soul damage for each distribution
        iterateDistributions(dmgObject, (distribution, kind) => {
            const splitSoulDist = getDamageDistribution(splitSoulObject, kind);
            if (splitSoulDist && distribution['damage list']) {
                // Copy basic properties
                splitSoulDist['probability'] = distribution['probability'];
                splitSoulDist['crit'] = distribution['crit'];
                
                // Calculate only the split soul damage (not adding to original)
                splitSoulDist['damage list'] = distribution['damage list'].map(damage => 
                    calc_split_soul_hit(damage, settings)
                );
            }
        });

        results.push(splitSoulObject);
    }

    // Adrenaline from crit buff/inspiration
    // TODO check when this actually applies
    if (settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.INSPIRATION) {
        add_adrenaline(settings, 0.5);
    }
    if (
        (abils[abilityKey]['crit effects'] === true) &&
        settings[SETTINGS.CRIT_BUFF] && settings[SETTINGS.EXPECTED_ADRENALINE]
    ) {
        const critDist = getDamageDistribution(dmgObject, 'crit');
        let prob = critDist ? critDist['probability'] : 0;
        prob = prob * dmgObject.likelihood; 
        add_adrenaline(settings, (prob * 8));
    }


    return results;

    // TODO
    // Marco - apply any effects that happen on-damage here
    // I think currently that is only rng stuff like applying poison
    // also if the hit is a crit it should proc fsoa and give crit adren here for example

}

/**
 * Sets the min and var hit values for a given dmgObject as follows:
 * 1. Looks up and sets ability % values
 * 2. Applies style specific modifiers
 * 3. Calculates real damage ranges based on boosted AD
 * @param settings - Overall settings object
 * @param dmgObject - The dmgObject to set the min and var hit values for
 * @returns The dmgObject
 */
function set_min_var(settings: Record<string, any>, dmgObject: DamageObject) {
    const abilityKey = dmgObject.ability;
    const ctx: EffectContext = { settings, abilityKey };

    iterateDistributions(dmgObject, (distribution) => {
        // 1. Set base ability % values
        distribution['min hit'] = abils[abilityKey]['min hit'];
        distribution['var hit'] = abils[abilityKey]['var hit'];
        logger.log(LogCategory.ABILITY_DAMAGE, `set_min_var for ${abilityKey}`, {
            minHit: distribution['min hit'],
            varHit: distribution['var hit']
        });

        // 2. Apply style-specific ability percent modifiers (detonate, flanking, greater barge, etc.)
        applyStyleAbilityPercentModifiers(ctx, distribution);

        // 3. Shared effects (not style-specific)
        if (abilityKey === ABILITIES.AFTERSHOCK) {
            distribution['min hit'] = distribution['min hit'] * settings[SETTINGS.AFTERSHOCK];
            distribution['var hit'] = distribution['var hit'] * settings[SETTINGS.AFTERSHOCK];
        }

        if (abilityKey === ABILITIES.POISON_DAMAGE) {
            let poison_tier = Object.values(SETTINGS.POISON_VALUES).indexOf(settings[SETTINGS.POISON]);
            if (poison_tier !== 0) {
                if (settings[SETTINGS.GLOVES] === SETTINGS.RANGED_GLOVES_VALUES.CINDERS) {
                    poison_tier = Math.min(5, Math.max(2, poison_tier + 1));
                }
                let multi = 1 + 0.25 * (poison_tier - 1);
                multi *= 1 + 0.02 * settings[SETTINGS.BIK_STACKS];
                distribution['min hit'] = distribution['min hit'] * multi;
                distribution['var hit'] = distribution['var hit'] * multi;
            }
        }

        // 4. Convert percent values to actual damage using boosted AD
        distribution['min hit'] = Math.floor(distribution['min hit'] * distribution['boosted AD']);
        distribution['var hit'] = Math.floor(distribution['var hit'] * distribution['boosted AD']);
    });

    return dmgObject;
}

/**
 * Handles BOLG (Bow of the Last Guardian) perfect equilibrium proc
 * @param settings - game settings object
 * @param dmgObject - the triggering damage object (used to calculate bonus damage)
 * @param timers - timer state
 * @param dmgObjects - array to push resulting damage objects into
 * @returns true if proc was triggered, false otherwise
 */
function handleBolgProc(
    settings: Record<string, any>,
    dmgObject: DamageObject,
    timers: Record<string, number>,
    dmgObjects: DamageObject[]
): boolean {
    const isBolg = settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH;

    const shouldProc = settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 8 ||
        (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4 && settings[SETTINGS.BALANCE_BY_FORCE] === true);

    if (!isBolg || !shouldProc) {
        return false;
    }

    // Reset stacks and create proc damage
    settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] = 0;

    let bolgDmgObject = create_damage_object(settings, ABILITIES.BOLG_PROC);
    bolgDmgObject = on_cast(settings, bolgDmgObject, timers, ABILITIES.BOLG_PROC)[0];

    // Get damage list from triggering hit to calculate bonus damage
    const dmgList = getDamageDistribution(dmgObject, 'non_crit')?.['damage list'] || [];

    // Add 33-37% of triggering hit's damage to BOLG proc
    if (dmgList.length > 0) {
        const minBonus = Math.floor(dmgList[0] * 0.33);
        const maxBonus = Math.floor(dmgList[dmgList.length - 1] * 0.37);
        const varBonus = maxBonus - minBonus;

        const bolgCritDist = getDamageDistribution(bolgDmgObject, 'crit');
        const bolgNonCritDist = getDamageDistribution(bolgDmgObject, 'non_crit');

        if (bolgCritDist) {
            bolgCritDist['min hit'] += minBonus;
            bolgCritDist['var hit'] += varBonus;
        }
        if (bolgNonCritDist) {
            bolgNonCritDist['min hit'] += minBonus;
            bolgNonCritDist['var hit'] += varBonus;
        }
    }

    const bolgDmgObjects = on_hit(settings, bolgDmgObject, timers, ABILITIES.BOLG_PROC);
    dmgObjects.push(...bolgDmgObjects);

    return true;
}

/**
 * Handles FSOA (Fractured Staff of Armadyl) instability proc
 * Creates Time Strike damage on magic critical hits
 */
function handleFsoa(
    abilityKey: ABILITIES,
    settings: Record<string, any>,
    dmgObject: DamageObject,
    timers: Record<string, number>,
    dmgObjects: DamageObject[]
): void {
    if (abils[abilityKey]['crit effects'] === true
        && settings[SETTINGS.INSTABILITY] === true
        && abils[abilityKey]['damage type'] === 'magic'
        && abilityKey != 'time strike') {

        let fsoaDmgObject = create_damage_object(settings, ABILITIES.TIME_STRIKE);
        fsoaDmgObject.likelihood = dmgObject.distributions.crit.probability || 0;
        fsoaDmgObject = on_cast(settings, fsoaDmgObject, timers, ABILITIES.TIME_STRIKE)[0];
        let fsoaDmgObjects = on_hit(settings, fsoaDmgObject, timers, ABILITIES.TIME_STRIKE);
        dmgObjects.push(...fsoaDmgObjects);
    }
}

export {on_stall, on_cast, on_hit, on_damage}