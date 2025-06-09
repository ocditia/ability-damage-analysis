import { create_damage_object } from './rota_object_helper';
import { SETTINGS } from '../settings';
import { ABILITIES, abils } from '../const';
import { on_cast, on_hit } from './damage_calc_new';


/**
 * Calculates the damage object for a single tick of a channelled ability
 * @param {*} settings
 * @param {number} hit_index - which hit to calculate
 * @param {} rotation - information on all hits of the ability (e.g. {1: [hit1, hit2...], 2: [], 3: [hit1], etc.})
 * @param {} timers - timers object containing buff timer information
 * @returns
 */
function calc_channelled_hit(settings, hit_index, rotation, timers, abilityKey) {
    let hits = [];
    let dmgObject = create_damage_object(settings, abilityKey);
    for (let iter = 0; iter < rotation[hit_index].length; iter++) {
        settings['ability'] = rotation[hit_index][iter];
        let dmgObjects = on_cast(settings, dmgObject, timers, abilityKey);
        for (let obj of dmgObjects) {
            let o = on_hit(settings, obj, timers, obj['crit']['ability']);
            for (let hit of o) {
                hits.push(hit);
                handle_edraco(settings, timers, hit['crit']['ability']);
            }
        }
    }
    return hits;
}

/**
 * Handles the toggling and timer initialisation of most ranged buffs, exlcuding (e)dracolich
 * @param {*} settings 
 * @param {Object} timers - map of (buff_name -> buff_duration)
 * @param {String} abilityKey 
 */
function handle_buffs(settings, timers, abilityKey) {
    //TODO handle swiftness' weird damage calc + cleanup format
    if (abilityKey == ABILITIES.DEATHS_SWIFTNESS) {
        settings['death swiftness'] = true;
        timers['death swiftness'] = 50;
    }
    else if (abilityKey == ABILITIES.GREATER_DEATHS_SWIFTNESS) {
        settings['death swiftness'] = true;
        timers['death swiftness'] = 63;
    }
    //TODO remove split soul on changing weapon
    else if (abilityKey == ABILITIES.SPLIT_SOUL_ECB) {
        settings['split soul'] = true; //TODO dont let non ranged hits proc split soul
        timers['split soul'] = 25;
    }
    else if (abilityKey == ABILITIES.BALANCE_BY_FORCE) {
        settings[ABILITIES.BALANCE_BY_FORCE] = true; 
        timers[ABILITIES.BALANCE_BY_FORCE] = 50;
    }
    else if ([ABILITIES.INCENDIARY_SHOT, ABILITIES.METEOR_STRIKE, ABILITIES.TSUNAMI].includes(abilityKey)) {
        settings[SETTINGS.CRIT_BUFF] = true; 
        timers[SETTINGS.CRIT_BUFF] = 50;
    }
    else if (abilityKey == ABILITIES.NATURAL_INSTINCT) {
        settings[SETTINGS.NATURAL_INSTINCT] = true; 
        timers[ABILITIES.NATURAL_INSTINCT] = 34;
    }
}

export function handle_wen_buff(settings, timers) {
    settings[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_CHILL_STACKS];
    settings[SETTINGS.ICY_CHILL_STACKS] = 0;
    timers[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_PRECISION]; // time in ticks is same as n stacks
}

/**
 * Sets (greater) dracolich infusion buff to active if applicable
 */
function handle_edraco(settings, timers, abilityKey) {
    let body = settings['body'];
    let helmet = settings['helmet'];
    let gloves = settings['gloves'];
    let legs = settings['legs'];
    let boots = settings['boots'];

    let items = [body, helmet, gloves, legs, boots];
    function dracoBuff(startString, adrenGain, infusionTier) {
        let count = items.filter(item => item && item.startsWith(startString)).length;
        if (abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT || abilityKey == ABILITIES.RAPID_FIRE_HIT) {
            settings[SETTINGS.ADRENALINE] += count * adrenGain;
        }
        //Handle crit chance buff
        if (abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT) {
            if (count >= 3) {
                let buff_duration = 5 + (3 * Math.max(count - 3, 0)); // 5 tick base duration
                settings['dracolich infusion'] = infusionTier;
                timers['dracolich infusion'] = buff_duration; 
            }
        }
    }
    dracoBuff('elite dracolich', 0.5, 'greater');
    //dracoBuff('dracolich', 0.2, 'regular'); 
    //TOOD solve the floating point error for regular draco
}

/**
 * Not yet implemented - does nothing currently, but will handle sgb by creating multiple
 * hits instead of current impl simply multiplying damage
 */
function handle_sgb(settings, dmgObject, damageTracker, hitTick) {
    const hits = [0, 1.16, 1.64, 2.44, 3.56, 5.0];
    const size = Math.min(settings[SETTINGS.TARGET_SIZE], 5);
    const n_hits = (hits[size] - 1);
    console.log('N hits = ' + n_hits);
    console.log(dmgObject);
}

export { 
    handle_buffs,
    calc_channelled_hit
};