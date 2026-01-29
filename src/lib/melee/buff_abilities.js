import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const/const.ts';

export const melee_buff_abilities = {
    [ABILITIES.BLACKHOLE]: {
        title: 'Blackhole',
        calc: ability_damage_calculation,
        icon:  '/ability_icons/melee/blackhole.webp'
    },
    [ABILITIES.BERSERK]: {
        title: 'Berserk',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/berserk.webp'
    }
};