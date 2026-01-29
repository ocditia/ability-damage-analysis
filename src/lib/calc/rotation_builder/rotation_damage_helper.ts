import { create_damage_object } from './rota_object_helper';
import { SETTINGS } from '../settings';
import { ABILITIES, abils } from '../const/const';
import { on_cast, on_hit } from './damage_calc_new';
import { DamageObject, DamageKind, DamageDistribution } from '../types';

// Import and re-export from calculation_utils
import { add_adrenaline } from './calculation_utils';
export { add_adrenaline };

// Helper functions
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

/**
 * Calculates the damage object for a single tick of a channelled ability
 * @param settings
 * @param hit_index - which hit to calculate
 * @param rotation - information on all hits of the ability (e.g. {1: [hit1, hit2...], 2: [], 3: [hit1], etc.})
 * @param timers - timers object containing buff timer information
 * @returns
 */
function calc_channelled_hit(settings: Record<string, any>, hit_index: number, rotation: Record<number, string[]>, timers: Record<string, number>, abilityKey: ABILITIES) {
    let hits: DamageObject[] = [];
    let dmgObject = create_damage_object(settings, abilityKey);
    for (let iter = 0; iter < rotation[hit_index].length; iter++) {
        settings['ability'] = rotation[hit_index][iter]; //TODO fix
        let dmgObjects = on_cast(settings, dmgObject, timers, abilityKey);
        for (let obj of dmgObjects) {
            let o = on_hit(settings, obj, timers, obj.ability);
            for (let hit of o) {
                hits.push(hit);
                handle_edraco(settings, timers, hit.ability);
            }
        }
    }
    return hits;
}

/**
 * Handles the toggling and timer initialisation of most ranged buffs, exlcuding (e)dracolich
 * The buffs handled are those which are activated upon casting the ability
 * @param settings 
 * @param timers - map of (buff_name -> buff_duration)
 * @param abilityKey 
 */
export function handleBuffs(settings: Record<string, any>, timers: Record<string, number>, abilityKey: string) {
    //TODO handle swiftness' weird damage calc + cleanup format
    switch (abilityKey) {
        // Damage Buff Ults
        case ABILITIES.SUNSHINE:
            settings[SETTINGS.SUNSHINE] = true;
            timers[SETTINGS.SUNSHINE] = 50;
            break;
        case ABILITIES.GREATER_SUNSHINE:
            settings[SETTINGS.SUNSHINE] = true;
            timers[SETTINGS.SUNSHINE] = 63;
            break;
        case ABILITIES.DEATHS_SWIFTNESS:
            settings['death swiftness'] = true;
            timers['death swiftness'] = 50;
            break;
        case ABILITIES.GREATER_DEATHS_SWIFTNESS:
            settings['death swiftness'] = true;
            timers['death swiftness'] = 63;
            break;
        case ABILITIES.BERSERK:
            settings[SETTINGS.BERSERK] = true;
            timers[SETTINGS.BERSERK] = 33;
            break;
        // Buff Special Attacks
        case ABILITIES.BLACKHOLE:
            settings[SETTINGS.BLACKHOLE] = true;
            timers[SETTINGS.BLACKHOLE] = 35;
            break;
        case ABILITIES.SPLIT_SOUL_ECB: //TODO remove split soul on changing weapon
            settings['split soul'] = true; 
            timers['split soul'] = 25;
            break;
        case ABILITIES.BALANCE_BY_FORCE:
            settings[ABILITIES.BALANCE_BY_FORCE] = true; 
            timers[ABILITIES.BALANCE_BY_FORCE] = 50;
            break;
            case ABILITIES.INSTABILITY:
                settings[SETTINGS.INSTABILITY] = true; 
                timers[SETTINGS.INSTABILITY] = 50;
                break;
        // Crit Buff
        case ABILITIES.INCENDIARY_SHOT:
        case ABILITIES.METEOR_STRIKE:
        case ABILITIES.TSUNAMI:
            settings[SETTINGS.CRIT_BUFF] = true; 
            timers[SETTINGS.CRIT_BUFF] = 50;
            break;
        case ABILITIES.NATURAL_INSTINCT:
            settings[SETTINGS.NATURAL_INSTINCT] = true; 
            timers[ABILITIES.NATURAL_INSTINCT] = 34;
            break;
        // Melee Basic Buffs
        case ABILITIES.FURY:
            settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.REGULAR; 
            break;
        case ABILITIES.GREATER_FURY:
            settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.GREATER; 
            break;
        case ABILITIES.CHAOS_ROAR:
            settings[SETTINGS.CHAOS_ROAR] = true; 
            break;
    }
}

export function handle_wen_buff(settings: Record<string, any>, timers: Record<string, number>) {
    settings[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_CHILL_STACKS];
    settings[SETTINGS.ICY_CHILL_STACKS] = 0;
    timers[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_PRECISION]; // time in ticks is same as n stacks
}

/**
 * Sets (greater) dracolich infusion buff to active if applicable
 */
export function handle_edraco(settings: Record<string, any>, timers: Record<string, number>, abilityKey: string) {
    let body = settings['body'];
    let helmet = settings['helmet'];
    let gloves = settings['gloves'];
    let legs = settings['legs'];
    let boots = settings['boots'];

    let items = [body, helmet, gloves, legs, boots];
    function dracoBuff(startString: string, adrenGain: number) {
        let nDracoPieces = items.filter(item => item && item.startsWith(startString)).length;
        if (abilityKey == ABILITIES.RAPID_FIRE_HIT || abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT) {

            add_adrenaline(settings, nDracoPieces * adrenGain);
        }
        //Handle crit chance buff
        if (abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT) {
            if (nDracoPieces >= 3) {
                let buff_duration = 5 + (3 * Math.max(nDracoPieces - 3, 0)); // 5 tick base duration
                settings[SETTINGS.GREATER_DRACOLICH_INFUSION] = true;
                timers[SETTINGS.GREATER_DRACOLICH_INFUSION] = buff_duration; 
            }
        }
    }
    dracoBuff('elite dracolich', 0.5);
    //dracoBuff('dracolich', 0.2, 'regular'); 
    //TOOD solve the floating point error for regular draco
}

/**
 * Handle SGB special attack by creating additional damage objects based on target size
 * Each target size corresponds to a hit multiplier where the integer part represents
 * guaranteed hits and the fractional part represents probability of an additional hit
 * 
 * @param settings - game settings object
 * @param dmgObject - base damage object to multiply
 * @param damageTracker - damage tracking object (unused currently)
 * @param hitTick - tick when hit occurs (unused currently)
 * @returns Array of damage objects representing all hits
 */
export function handle_sgb(settings: Record<string, any>, dmgObject: DamageObject): DamageObject[] {
    const hitMultipliers = [0, 1.16, 1.64, 2.44, 3.56, 5.0];
    const size = Math.min(settings[SETTINGS.TARGET_SIZE], 5);
    const hitMultiplier = hitMultipliers[size] - 1; // don't include guaranteed hit
    
    if (hitMultiplier <= 0) {
        return [dmgObject]; // Single hit, no multiplication needed
    }
    
    const guaranteedHits = Math.floor(hitMultiplier);
    const fractionalPart = hitMultiplier - guaranteedHits;
    
    const results: DamageObject[] = [];
    
    // Add guaranteed hits (each with likelihood 1.0)
    for (let i = 0; i < guaranteedHits; i++) {
        const hitCopy = structuredClone(dmgObject);
        hitCopy.likelihood = 1.0;
        results.push(hitCopy);
    }
    
    // Add fractional hit if there is one (with likelihood = fractional part)
    if (fractionalPart > 0) {
        const fractionalHit = structuredClone(dmgObject);
        fractionalHit.likelihood = fractionalPart;
        results.push(fractionalHit);
    }
    return results;
}

export function get_user_value(settings: Record<string, any>, dmgObject: DamageObject) {
    switch (settings[SETTINGS.MODE]) {
        case SETTINGS.MODE_VALUES.MEAN:
            return get_mean_damage(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MEAN_NO_CRIT:
            return get_mean_no_crit(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MEAN_CRIT:
            return get_mean_crit(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MIN_NO_CRIT:
            return get_min_no_crit(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MIN_CRIT:
            return get_min_crit(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MAX_NO_CRIT:
            return get_max_no_crit(settings, dmgObject);
        case SETTINGS.MODE_VALUES.MAX_CRIT:
            return get_max_crit(settings, dmgObject);
        default:
            return null;
    }
}

function get_mean_damage(settings: Record<string, any>, dmgObject: DamageObject) {
    let mean = 0;
    iterateDistributions(dmgObject, (distribution) => {
        let total = 0;
        let prob = distribution['probability'];
        for (let i = 0; i < distribution['damage list'].length; i++) {
            total += distribution['damage list'][i];
        }
        total = total / distribution['damage list'].length;
        mean += total * prob;
    });
    return Math.round(mean);
}

function get_mean_no_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    let mean = 0;
    const nonCritDist = getDamageDistribution(dmgObject, 'non_crit');
    if (nonCritDist) {
        let total = 0;
        for (let i = 0; i < nonCritDist['damage list'].length; i++) {
            total += nonCritDist['damage list'][i];
        }
        total = total / nonCritDist['damage list'].length;
        mean += total;
    }
    return Math.round(mean);
}

function get_mean_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    const critDist = getDamageDistribution(dmgObject, 'crit');
    if (abils[dmgObject.ability]['crit effects'] === false ||
        !critDist || critDist['probability'] === 0
    ) {
        return get_mean_damage(settings, dmgObject);
    }

    let mean = 0;
    let total = 0;
    for (let i = 0; i < critDist['damage list'].length; i++) {
        total += critDist['damage list'][i];
    }
    total = total / critDist['damage list'].length;
    mean += total;
    return Math.round(mean);
}

function get_min_no_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    let min_hit = 100000000;
    const nonCritDist = getDamageDistribution(dmgObject, 'non_crit');
    if (nonCritDist && nonCritDist['damage list'].length > 0) {
        let lowest_hit = nonCritDist['damage list'][0];
        if (lowest_hit < min_hit) {
            min_hit = lowest_hit;
        }
    }
    return min_hit;
}

function get_min_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    const critDist = getDamageDistribution(dmgObject, 'crit');
    if (abils[dmgObject.ability]['crit effects'] === false ||
        !critDist || critDist['probability'] === 0) {
        return get_min_no_crit(settings, dmgObject);
    }

    let min_hit = 100000000;
    if (critDist['damage list'].length > 0) {
        let lowest_hit = critDist['damage list'][0];
        if (lowest_hit < min_hit) {
            min_hit = lowest_hit;
        }
    }
    return min_hit;
}

function get_max_no_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    let max_hit = 0;
    const nonCritDist = getDamageDistribution(dmgObject, 'non_crit');
    if (nonCritDist && nonCritDist['damage list'].length > 0) {
        let highest_hit = nonCritDist['damage list'][nonCritDist['damage list'].length - 1];
        if (highest_hit > max_hit) {
            max_hit = highest_hit;
        }
    }
    return max_hit;
}

function get_max_crit(settings: Record<string, any>, dmgObject: DamageObject) {
    const critDist = getDamageDistribution(dmgObject, 'crit');
    if (abils[dmgObject.ability]['crit effects'] === false ||
        !critDist || critDist['probability'] === 0) {
        return get_max_no_crit(settings, dmgObject);
    }

    let max_hit = 0;
    if (critDist['damage list'].length > 0) {
        let highest_hit = critDist['damage list'][critDist['damage list'].length - 1];
        if (highest_hit > max_hit) {
            max_hit = highest_hit;
        }
    }
    return max_hit;
}
 