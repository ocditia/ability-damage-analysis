import { hit_damage_calculation, ability_damage_calculation } from '../new_stuff/damage_calc.js';
import { ABILITIES } from '../new_stuff/const.js';

const abilities = {
	[ABILITIES.NECRO_AUTO]: {
		title: 'Necro auto',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.TOUCH_OF_DEATH]: {
		title: 'Touch of Death',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SOUL_SAP]: {
		title: 'Soul sap',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SKELETON_WARRIOR_AUTO]: {
		title: 'Skeleton warrior auto',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SKELETON_WARRIOR_AUTO_10]: {
		title: 'Skeleton warrior auto',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
};

export { abilities };
