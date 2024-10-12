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
		title: 'Command skeleton warrior',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.VENGEFUL_GHOST_AUTO]: {
		title: 'Vengeful ghost auto',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.PUTRID_ZOMBIE_AUTO]: {
		title: 'Putrid zombie auto',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.COMMAND_PUTRID_ZOMBIE]: {
		title: 'Command putrid zombie',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.COMMAND_PHANTOM_GUARDIAN]: {
		title: 'Command phantom guardian',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.FINGER_OF_DEATH]: {
		title: 'Finger of death',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.DEATHSKULLS]: {
		title: 'Deathskulls',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.DEATHSKULLS_4]: {
		title: 'Deathskulls 4 hit',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.DEATHSKULLS_7]: {
		title: 'Deathskulls 7 hit',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SOUL_STRIKE]: {
		title: 'Soul strike main',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SOUL_STRIKE_AOE]: {
		title: 'soul strike aoe',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.VOLLEY_OF_SOULS_2]: {
		title: 'Volley of souls (2)',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.VOLLEY_OF_SOULS_3]: {
		title: 'Volley of souls (3)',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.VOLLEY_OF_SOULS_4]: {
		title: 'Volley of souls (4)',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.VOLLEY_OF_SOULS_5]: {
		title: 'Volley of souls (5)',
		calc: ability_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SPECTRAL_SCYTHE_1]: {
		title: 'Spectral scythe (1)',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SPECTRAL_SCYTHE_2]: {
		title: 'Spectral scythe 2',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.SPECTRAL_SCYTHE_3]: {
		title: 'Spectral scythe 3',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.BLOAT]: {
		title: 'Bloat',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.BLOOD_SIPHON]: {
		title: 'Blood siphon',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.DEATH_GRASP]: {
		title: 'Death grasp',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
	[ABILITIES.DEATH_ESSENCE]: {
		title: 'Death essence',
		calc: hit_damage_calculation,
		icon: '/ability_icons/necro/30x30/auto.png'
	},
};

export { abilities };
