import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc_beta.js';

const abilities = {
    [ABILITIES.ATTACK_BETA]: {
        title: '2h auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.ATTACK_DW_BETA]: {
        title: 'DW auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.BACKHAND_BETA]: {
        title: 'Backhand',
        calc: hit_damage_calculation,
    },
    [ABILITIES.ASSAULT_BETA]: {
        title: 'Assault',
        calc: ability_damage_calculation,
    },
    [ABILITIES.ADAPTIVE_STRIKE_DW_BETA]: {
        title: 'Adaptive strike dw',
        calc: ability_damage_calculation,
    },
    [ABILITIES.ADAPTIVE_STRIKE_TH_BETA]: {
        title: 'Adaptive strike 2h',
        calc: hit_damage_calculation,
    },
    [ABILITIES.PRESSING_BLOW_BETA]: {
        title: 'Pressing blow',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GFURY_BETA]: {
        title: 'Gfury',
        calc: hit_damage_calculation,
    },
    [ABILITIES.HURRICANE_BETA]: {
        title: 'Hurricane',
        calc: ability_damage_calculation,
    },
    [ABILITIES.GLFURRY_BETA]: {
        title: 'Gflurry',
        calc: ability_damage_calculation,
    },
    [ABILITIES.DISMEMBER_1_BETA]: {
        title: 'Dismember 1',
        calc: ability_damage_calculation,
    },
    [ABILITIES.DISMEMBER_2_BETA]: {
        title: 'Dismember 2',
        calc: ability_damage_calculation,
    },
    [ABILITIES.DISMEMBER_3_BETA]: {
        title: 'Dismember 3',
        calc: ability_damage_calculation,
    },
    [ABILITIES.PUNISH_BETA]: {
        title: 'Punish',
        calc: hit_damage_calculation,
    },
    [ABILITIES.PULVERISE_BETA]: {
        title: 'Pulverise',
        calc: hit_damage_calculation,
    },
    [ABILITIES.METEOR_STRIKE_BETA]: {
        title: 'Meteor strike',
        calc: hit_damage_calculation,
    },
    [ABILITIES.CHAOS_ROAR_BETA]: {
        title: 'Chaos roar',
        calc: hit_damage_calculation,
    },
    [ABILITIES.FINAL_FLURRY_BETA]: {
        title: 'The final flurry',
        calc: ability_damage_calculation,
    },
};

export { abilities };
