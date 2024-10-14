import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const abilities = {
  [ABILITIES.WRACK]: {
		title: 'Wrack',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
};

export { abilities };
