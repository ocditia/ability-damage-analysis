import { SETTINGS } from './settings';
import { ABILITIES } from './const';

function next_tick(settings) {
    // needle strike logic
    if (settings['needle strike'] === true) {
        let single_tick_gear = ['essence of finality', 'amulet of souls'];
        if (single_tick_gear.includes(settings['necklace'])) {
            settings['needle strike'] = false;
        } else {
            settings['needle strike'] = 'fleeting';
        }
    } else if (settings['needle strike'] === 'fleeting') {
        settings['needle strike'] = false;
    }

    // enduring ruin / gloves of passage logic
    if (settings['enduring ruin - hit'] === true) {
        let single_tick_gear = ['essence of finality', 'amulet of souls'];
        if (single_tick_gear.includes(settings['necklace'])) {
            settings['enduring ruin - hit'] = false;
        } else {
            settings['enduring ruin - hit'] = 'fleeting';
        }
    } else if (settings['enduring ruin - hit'] === 'fleeting') {
        settings['enduring ruin - hit'] = false;
    }

    settings = next_cast(settings);
    settings = next_hit(settings);

    return settings;
}

function next_cast(settings) {
    // turn off chaos roar
    if (settings['chaos roar'] === true) {
        settings['chaos roar'] = false;
    }
    return settings;
}

function next_hit(settings) {
    // turn off (g)fury
    if (settings['fury'] === 'regular' || settings['fury'] === 'greater') {
        settings['fury'] = 'off';
    }

    // turn off (g)conc
    settings['conc stacks'] = 0; // this does not properly handle conc buffing itself

    // bolg stack tracker
    if (
        settings[SETTINGS.TH] === 'bolg' &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] += 1;
        if (
            settings[SETTINGS.BALANCE_BY_FORCE] === true &&
            settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4
        ) {
            settings['bolg stacks'] = 0;
        } else if (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 7) {
            settings['bolg stacks'] = 0;
        }
    }

    if (settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO) {
        settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS] = Math.min(
            25,
            settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS] + 1
        );
    }

    return settings;
}

export { next_tick, next_hit, next_cast };
