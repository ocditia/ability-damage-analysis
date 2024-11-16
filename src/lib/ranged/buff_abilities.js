import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const ranged_buff_abilities = {
	[ABILITIES.DEATHS_SWIFTNESS]: {
		title: 'Death\`s swiftness',
		calc: ability_damage_calculation,
		icon: '/ability_icons/ranged/Death\'s_Swiftness.png'
	},
	[ABILITIES.GREATER_DEATHS_SWIFTNESS]: {
		title: 'Greater death\`s swiftness',
		calc: ability_damage_calculation,
		icon:  '/ability_icons/ranged/Greater_Death\'s_Swiftness.png'
	},
    [ABILITIES.SPLIT_SOUL_ECB]: {
		title: 'Split soul (ECB)',
		calc: hit_damage_calculation,
		icon: '/ability_icons/ranged/Eldritch_crossbow.png'
	}
};

export { ranged_buff_abilities };
