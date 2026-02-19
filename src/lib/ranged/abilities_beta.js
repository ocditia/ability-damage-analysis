import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc_beta.js';

const abilities = {
    [ABILITIES.RANGED_DW_BETA]: {
        title: 'DW auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.RANGED_TH_BETA]: {
        title: '2h auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GALESHOT]: {
        title: 'Galeshot',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GALESHOT_BONUS]: {
        title: 'Galeshot bonus damage',
        calc: hit_damage_calculation,
    },
    [ABILITIES.BINDING_SHOT_BETA]: {
        title: 'Binding shot',
        calc: hit_damage_calculation,
    },
    [ABILITIES.PIERCING_SHOT_BETA]: {
        title: 'Piercing shot',
        calc: ability_damage_calculation,
    },
    [ABILITIES.SNIPE_BETA]: {
        title: 'Snipe',
        calc: ability_damage_calculation,
    },
    [ABILITIES.GRICO_BETA]: {
        title: 'Grico',
        calc: ability_damage_calculation,
    },
    [ABILITIES.CORRUPTION_SHOT_BETA]: {
        title: 'Corruption shot',
        calc: hit_damage_calculation,
    },
    [ABILITIES.SNAP_SHOT_BETA]: {
        title: 'Snap shot',
        calc: ability_damage_calculation,
    },
    [ABILITIES.BOMBARDMENT_BETA]: {
        title: 'Bombardment',
        calc: hit_damage_calculation,
    },
    [ABILITIES.RAPID_FIRE_BETA]: {
        title: 'Rapid fire',
        calc: ability_damage_calculation,
    },
    [ABILITIES.SHADOW_TENDRILS_BETA]: {
        title: 'Shadow tendrils',
        calc: hit_damage_calculation,
    },
    [ABILITIES.DEADSHOT_BETA]: {
        title: 'Deadshot',
        calc: ability_damage_calculation,
    },
};

export { abilities };
