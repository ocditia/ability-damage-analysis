import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const magic_buff_abilities = {
    [ABILITIES.SUNSHINE]: {
        title: 'Sunshine',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/Sunshine.png'
    },
    [ABILITIES.GREATER_SUNSHINE]: {
        title: 'Greater Sunshine',
        calc: ability_damage_calculation,
        icon:  '/ability_icons/magic/Greater_Sunshine.png'
    },
};

export { magic_buff_abilities };
