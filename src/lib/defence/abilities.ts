import { ABILITIES } from '../calc/const/const';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc_rb.js';

const abilities = {
    // Basics
    [ABILITIES.FREEDOM]: { 
        title: 'Freedom',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Freedom.png'
    },
    [ABILITIES.ANTICIPATION]: {
        title: 'Anticipation',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Anticipation.png'
    },
    [ABILITIES.RESONANCE]: {
        title: 'Resonance',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Resonance.png'
    },
    [ABILITIES.DIVERT]: {
        title: 'Divert',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/Divert.png'
    },
    [ABILITIES.PREPARATION]: {
        title: 'Preparation',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Preparation.png'
    },
    // Thresholds
    [ABILITIES.REFLECT]: {
        title: 'Reflect',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Reflect.png'
    },
    [ABILITIES.DEVOTION]: {
        title: 'Devotion',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Devotion.png'
    },
    [ABILITIES.REVENGE]: {
        title: 'Revenge',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Revenge.png'
    },
    // Ultimates
    [ABILITIES.BARRICADE]: {
        title: 'Barricade',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Barricade.png'
    },
    [ABILITIES.NATURAL_INSTINCT]: {
        title: 'Natural Instinct',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Natural_Instinct.png'
    },
    [ABILITIES.IMMORTALITY]: {
        title: 'Immortality',
        calc: ability_damage_calculation,
        icon: '/ability_icons/defence/30px-Immortality.png'
    }
};

export { abilities };
