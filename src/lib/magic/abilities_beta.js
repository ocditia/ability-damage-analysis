import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation, calc_aftershock } from '../calc/damage_calc_beta.js';

const abilities = {
    [ABILITIES.MAGIC_BETA]: {
        title: 'Auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GSONIC_BETA]: {
        title: 'Gsonic',
        calc: hit_damage_calculation,
    },
    [ABILITIES.DRAGON_BREATH_BETA]: {
        title: 'Dragon breath',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GCHAIN_BETA]: {
        title: 'Gchain',
        calc: hit_damage_calculation,
    },
    [ABILITIES.IMPACT_BETA]: {
        title: 'Impact',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GCONC_BETA]: {
        title: 'Gconc',
        calc: ability_damage_calculation,
    },
    [ABILITIES.MAGMA_BETA]: {
        title: 'Magma tempest',
        calc: ability_damage_calculation,
    },
    [ABILITIES.COMBUST_BETA]: {
        title: 'Combust',
        calc: ability_damage_calculation,
    },
    [ABILITIES.CORRUPTION_BLAST_BETA]: {
        title: 'Corruption blast',
        calc: hit_damage_calculation,
    },
    [ABILITIES.WILD_MAGIC_BETA]: {
        title: 'Wild magic',
        calc: ability_damage_calculation,
    },
    [ABILITIES.ASPHYXIATE]: {
        title: 'Asphyx',
        calc: ability_damage_calculation,
    },
    [ABILITIES.SMOKE_TENDRILS_BETA]: {
        title: 'Smoke tendrils',
        calc: ability_damage_calculation,
    },
    [ABILITIES.OMNIPOWER_BETA]: {
        title: 'Omnipower',
        calc: ability_damage_calculation,
    },
    [ABILITIES.TSUNAMI]: {
        title: 'Tsunami',
        calc: hit_damage_calculation,
    },
    [ABILITIES.ONSLAUGHT_MOLD]: {
        title: 'Onslaught loles',
        calc: ability_damage_calculation,
    },
};

export { abilities };
