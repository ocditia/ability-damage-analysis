import { next_cast, next_hit, next_tick } from './ability_helper';
import { ABILITIES, abils, armour, gear, prayers, weapons } from './const';
import { create_object } from './object_helper';
import { SETTINGS } from './settings';

function calc_tfn_pieces(settings) {
    let count = 0;
    if (settings[SETTINGS.HELMET] === SETTINGS.NECRO_HELMET_VALUES.TFN) {
        count += 1;
    }
    if (settings[SETTINGS.HELMET] === SETTINGS.NECRO_HELMET_VALUES.TFN_ADDON) {
        count += 2;
    }
    if (settings[SETTINGS.BODY] === SETTINGS.NECRO_BODY_VALUES.TFN) {
        count += 1;
    }
    if (settings[SETTINGS.LEGS] === SETTINGS.NECRO_LEGS_VALUES.TFN) {
        count += 1;
    }
    if (settings[SETTINGS.GLOVES] === SETTINGS.NECRO_GLOVES_VALUES.TFN) {
        count += 1;
    }
    if (settings[SETTINGS.BOOTS] === SETTINGS.NECRO_BOOTS_VALUES.TFN) {
        count += 1;
    }

    return Math.min(count, 5);
}
export { calc_tfn_pieces };