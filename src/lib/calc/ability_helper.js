import { SETTINGS } from './settings';
import { abils, ABILITIES } from './const';

function next_tick(settings) {
    settings = next_cast(settings);

    return settings;
}

function next_cast(settings) {
    // turn off chaos roar
    if (settings[SETTINGS.CHAOS_ROAR] === true) {
        settings[SETTINGS.CHAOS_ROAR] = false;
    }

    if (settings[SETTINGS.ENDURING_RUIN_HIT] != SETTINGS.ENDURING_RUIN_HIT_VALUES.NONE) {
        settings[SETTINGS.ENDURING_RUIN_HIT] = SETTINGS.ENDURING_RUIN_HIT_VALUES.NONE;
    }

    // channeller's ring
    if (
        (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER || settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER_E) &&
        abils[settings['ability']]['ability classification'] === 'channel'
    ) {
        settings[SETTINGS.CHANNELER_RING_STACKS] += 1
    }

    // gconc bbeta
    settings[SETTINGS.GCONC_STACKS] = 0;
    settings[SETTINGS.CONCENTRATED_BLAST_STACKS] = 0;

    settings = next_hit(settings);

    return settings;
}

function next_hit(settings) {
    // turn off (g)fury
    if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.REGULAR || 
        settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.GREATER) {
        settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.NONE;
    }

    // turn off (g)fury beta
    settings[SETTINGS.GFURY_BETA] = false
    
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
        } else if (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 8) {
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
