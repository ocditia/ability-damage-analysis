import { create_object } from './object_helper';
import { SETTINGS } from './settings';
import { ABILITIES, abils, armour, gear, prayers, weapons } from './const';
import { hit_damage_calculation, calc_base_ad, calc_boosted_ad, ability_specific_effects, set_min_var,
    calc_style_specific, calc_on_hit, roll_damage, calc_core, calc_on_npc, style_specific_unification,
get_user_value, get_rotation, add_split_soul, apply_additional_rota} from './damage_calc';
import { next_cast, next_hit, next_tick } from './ability_helper';
import { on_cast, on_hit, on_damage } from './damage_calc_new';

/**
 * Calculates effects that are applied when ability is cast (when adren changes?)
 * Rewrite of calc_damage_object from damage_calc.js
 * @param {} settings
 * @returns {*} dmgObject
 */
function calc_on_cast(settings) {
    settings = style_specific_unification(settings); // initialise some settings
    const dmgObject = create_object(settings);
    for (let key in dmgObject) {
        // calc base AD
        dmgObject[key]['base AD'] = calc_base_ad(settings);
        // calc buffed AD
        dmgObject[key]['boosted AD'] = calc_boosted_ad(settings, dmgObject[key]);
        // ability specific
        dmgObject[key] = ability_specific_effects(settings, dmgObject[key]);
        // set min and var
        dmgObject[key] = set_min_var(settings, dmgObject[key]);
        // style specific
        dmgObject[key] = calc_style_specific(settings, dmgObject[key]);
        //calc on hit effects
        if (abils[settings['ability']]['on-hit effects']) {
            dmgObject[key] = calc_on_hit(settings, dmgObject[key]);
        }
        // roll damage
        dmgObject[key]['damage list'] = roll_damage(settings, dmgObject, key);
        // calc core
        if (abils[settings['ability']]['on-hit effects']) {
            dmgObject[key] = calc_core(settings, dmgObject, key);
        } 
    }
    //next_hit();
    //TODO get user value
    return dmgObject;
}

/**
 * On NPC calculator for rotation calculating
 * Rewrite of calc_on_npc from damage_calc.js
 * @param {} settings 
 * @param {*} dmgObject 
 * @returns 
 */
function rotation_on_npc(settings, dmgObject, experimentalData) {
    for (let key in dmgObject) {  
        if (key == 'ability') {
            continue;
        }      
        // calc on npc
        dmgObject[key] = calc_on_npc(settings, dmgObject[key]);

        // add split soul damage
        if (
            settings['split soul'] === true &&
            ['magic', 'melee', 'ranged', 'necrotic'].includes(
                abils[settings['ability']]['damage type']
            )
        ) {
            dmgObject[key] = add_split_soul(settings, dmgObject[key]);
            //TODO make split soul its own hitsplat
        }
    }
    experimentalData.push({...dmgObject});
    let total_damage = get_user_value(settings, dmgObject);
    total_damage = apply_additional_rota(settings, total_damage);

    return total_damage;
}

function rotation_on_npc_test(settings, dmgObject) {
    for (let key in dmgObject) {  
        if (key == 'ability') {
            continue;
        }      
        // calc on npc
        dmgObject[key] = calc_on_npc(settings, dmgObject[key]);

        // add split soul damage
        if (
            settings['split soul'] === true &&
            ['magic', 'melee', 'ranged', 'necrotic'].includes(
                abils[settings['ability']]['damage type']
            )
        ) {
            dmgObject[key] = add_split_soul(settings, dmgObject[key]);
            //TODO make split soul its own hitsplat
        }
    }
    let total_damage = apply_additional_rota(settings, total_damage);

    return total_damage;
}

/**
 * Calculates the damage objects for multi-hit non-channelled abilities.
 * Rewrite of ability_damage_calculation from damage_calc.js
 * @param {*} settings 
 * @returns 
 */
function rotation_ability_damage(settings) {
    let rotation = get_rotation(settings);
    let damages = [];
    for (let key in rotation) {
        for (let iter = 0; iter < rotation[key].length; iter++) {
            if (rotation[key][iter] === 'next cast') {
                settings = next_cast(settings);
            } else if (rotation[key][iter] === 'next hit') {
                settings = next_hit(settings);
            } else {
                settings['ability'] = rotation[key][iter];
                damages.push(calc_on_cast(settings));
            }
        }
        settings = next_tick(settings);
    }
    return damages;
}

/**
 * Calculates the damage object for a single tick of a channelled ability
 * @param {*} settings
 * @param {number} hit_index - which hit to calculate
 * @param {} rotation - information on all hits of the ability (e.g. {1: [hit1, hit2...], 2: [], 3: [hit1], etc.})
 * @param {} timers - timers object containing buff timer information
 * @returns
 */
function calc_channelled_hit(settings, hit_index, rotation, timers) {
    let dmgObject = create_object(settings);
    for (let iter = 0; iter < rotation[hit_index].length; iter++) {
        settings['ability'] = rotation[hit_index][iter];
        on_cast(settings, dmgObject);
        on_hit(settings, dmgObject);
        handle_edraco(settings, timers, rotation[hit_index][iter]);
    }
    return dmgObject;
}

/**
 * Handles the toggling and timer initialisation of most ranged buffs, exlcuding (e)dracolich
 * @param {*} settings 
 * @param {Object} timers - map of (buff_name -> buff_duration)
 * @param {String} abilityKey 
 */
function handle_ranged_buffs(settings, timers, abilityKey) {
    //TODO handle swiftness' weird damage calc
    if (abilityKey == ABILITIES.DEATHS_SWIFTNESS) {
        settings['death swiftness'] = true;
        timers['death swiftness'] = 51;
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
}

function handle_wen_buff(settings, timers) {
    settings[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_CHILL_STACKS];
    settings[SETTINGS.ICY_CHILL_STACKS] = 0;
    //TODO handle swiftness' weird damage calc
    timers[SETTINGS.ICY_PRECISION] = settings[SETTINGS.ICY_PRECISION];
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
    const edraco = 'elite dracolich';
    let count = items.filter(item => item && item.startsWith(edraco)).length;
    //Handle adrenaline gain
    if (abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT || abilityKey == ABILITIES.RAPID_FIRE_HIT) {
        settings[SETTINGS.ADRENALINE] += (count * 0.5);
    }
    //Handle crit chance buff
    if (abilityKey == ABILITIES.RAPID_FIRE_LAST_HIT) {
        if (count >= 3) {
            let buff_duration = 5 + (3 * Math.max(count - 3, 0)); // 5 tick base duration
            settings['dracolich infusion'] = 'greater';
            timers['dracolich infusion'] = buff_duration; 
        }
    }
    //TODO regular dracolich
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
    calc_on_cast, rotation_on_npc,  rotation_ability_damage, handle_ranged_buffs,
    handle_edraco, handle_sgb, calc_channelled_hit, rotation_on_npc_test
};