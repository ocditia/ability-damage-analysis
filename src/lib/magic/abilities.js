import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const abilities = {
	[ABILITIES.WRACK]: {
		title: 'Wrack',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.IMPACT]: {
		title: 'Impact',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.WRACK_AND_RUIN]: {
		title: 'Wrack and ruin',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.DRAGON_BREATH]: {
		title: 'Dragon breath',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.SONIC_WAVE]: {
		title: 'Sonic wave',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.SHOCK]: {
		title: 'Shock',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.CONCENTRATED_BLAST]: {
		title: 'Concentrated blast',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.GREATER_CONCENTRATED_BLAST]: {
		title: 'Gconc',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.COMBUST]: {
		title: 'combust',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.CHAIN]: {
		title: 'Chain',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.GREATER_CHAIN]: {
		title: 'Greater chain',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.MAGMA_TEMPEST]: {
		title: 'Magma tempest',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.GREATER_SONIC_WAVE]: {
		title: 'Greater sonic wave',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.ASPHYXIATE]: {
		title: 'Asphyxiate',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.DEEP_IMPACT]: {
		title: 'Deep impact',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.HORROR]: {
		title: 'Horror',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.WILD_MAGIC]: {
		title: 'Wild magic',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.SMOKE_TENDRILS]: {
		title: 'Smoke tendrils',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.OMNIPOWER]: {
		title: 'Omnipower',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.TSUNAMI]: {
		title: 'Tsunami',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.TEMPEST_OF_ARMADYL]: {
		title: 'Tempest of armadyl',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.INSTABILITY]: {
		title: 'Instability',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.CLAWS_OF_GUTHIX]: {
		title: 'Claws of guthix',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.IBAN_BLAST]: {
		title: 'Iban blast',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.RUNE_FLAME]: {
		title: 'Rune flame',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.DEVOUR]: {
		title: 'Devour',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.REAP]: {
		title: 'Reap',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.SOULFIRE]: {
		title: 'Soulfire',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.SARADOMIN_STRIKE]: {
		title: 'Saradomin strike',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.FROM_THE_SHADOWS]: {
		title: 'From the shadows',
		calc: ability_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.FLAMES_OF_ZAMORAK]: {
		title: 'Flames of zamorak',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
	[ABILITIES.MIASMIC_BARRAGE]: {
		title: 'Miasmic barrage',
		calc: hit_damage_calculation,
		icon: '/ability_icons/magic/30x30/wrack.png'
	},
};

export { abilities };
