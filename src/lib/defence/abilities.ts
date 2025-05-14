import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    // these need adding to const.js
    // [ABILITIES.FREEDOM]: { 
    //     title: 'Natural Instinct',
    //     calc: null,
    //     icon: '/ability_icons/defence/30px-Freedom.png'
    // },
    // [ABILITIES.ANTICIPATION]: {
    //     title: 'Anticipation',
    //     calc: null,
    //     icon: '/ability_icons/defence/30px-Anticipation.png'
    // },
    [ABILITIES.RESONANCE]: {
        title: 'Resonance',
        calc: null,
        icon: '/ability_icons/defence/30px-Resonance.png'
    },
    // [ABILITIES.DEVOTION]: {
    //     title: 'Devotion',
    //     calc: null,
    //     icon: '/ability_icons/defence/30px-Devotion.png'
    // },
    // [ABILITIES.BARRICADE]: {
    //     title: 'Barricade',
    //     calc: null,
    //     icon: '/ability_icons/defence/30px-Barricade.png'
    // },
    [ABILITIES.NATURAL_INSTINCT]: {
        title: 'Natural Instinct',
        calc: null,
        icon: '/ability_icons/defence/30px-Natural_Instinct.png'
    }
};

export { abilities };
