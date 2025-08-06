import { SETTINGS } from './settings';
import { abils, ABILITIES } from './const';

function next_tick(settings) {
    // needle strike logic
    if (settings['needle strike'] === true) {
        let single_tick_gear = [SETTINGS.NECKLACE_VALUES.AOS, SETTINGS.NECKLACE_VALUES.AOSOR, SETTINGS.NECKLACE_VALUES.EOF, SETTINGS.NECKLACE_VALUES.EOFOR];
        if (single_tick_gear.includes(settings['necklace'])) {
            settings['needle strike'] = false;
        } else {
            settings['needle strike'] = 'fleeting';
        }
    } else if (settings['needle strike'] === 'fleeting') {
        settings['needle strike'] = false;
    }

    // enduring ruin / gloves of passage logic
    if (settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.ENCHANTED || settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.REGULAR) {
        let single_tick_gear = [SETTINGS.NECKLACE_VALUES.AOS, SETTINGS.NECKLACE_VALUES.AOSOR, SETTINGS.NECKLACE_VALUES.EOF, SETTINGS.NECKLACE_VALUES.EOFOR];
        if (single_tick_gear.includes(settings['necklace'])) {
            settings[SETTINGS.ENDURING_RUIN_HIT] = false;
        } else {
            settings[SETTINGS.ENDURING_RUIN_HIT] = 'fleeting';
        }
    } else if (settings[SETTINGS.ENDURING_RUIN_HIT] === 'fleeting') {
        settings[SETTINGS.ENDURING_RUIN_HIT] = false;
    }

    settings = next_cast(settings);

    return settings;
}

function next_cast(settings) {
    // turn off chaos roar
    if (settings[SETTINGS.CHAOS_ROAR] === true) {
        settings[SETTINGS.CHAOS_ROAR] = false;
    }

    // channeller's ring
    if (
        (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER || settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER_E) &&
        abils[settings['ability']]['ability classification'] === 'channel'
    ) {
        settings[SETTINGS.CHANNELER_RING_STACKS] += 1
    }

    settings = next_hit(settings);

    return settings;
}

function next_hit(settings) {
    // turn off (g)fury
    if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.REGULAR || 
        settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.GREATER) {
        settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.NONE;
    }

    // turn off (g)conc
    settings[SETTINGS.CONCENTRATED_BLAST_STACKS] = 0; // this does not properly handle conc buffing itself

    // bolg stack tracker
    if (
        settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] += 1;
        if (
            settings[SETTINGS.BALANCE_BY_FORCE] === true &&
            settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4
        ) {
            settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] = 0;
        } else if (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 7) {
            settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] = 0;
        }
    }

    if (settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO_10 ||
        settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO
    ) {
        settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS] = Math.min(
            25,
            settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS] + 1
        );
    }

    return settings;
}

export { next_tick, next_hit, next_cast};
