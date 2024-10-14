import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const abilities = {
	[ABILITIES.WRACK]: {
		title: 'Slice',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	}
};

export { abilities };
