import { hit_damage_calculation, ability_damage_calculation } from '../calc/damage_calc.js';
import { ABILITIES } from '../calc/const.js';

const abilities = {
	[ABILITIES.SLICE]: {
		title: 'Slice',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.BACKHAND]: {
		title: 'Backhand',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.HAVOC]: {
		title: 'Havoc',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SMASH]: {
		title: 'Smash',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.BARGE]: {
		title: 'Barge',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.GREATER_BARGE]: {
		title: 'Greater barge',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SEVER]: {
		title: 'Sever',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.BLADED_DIVE]: {
		title: 'Bladed dive',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SLAUGHTER]: {
		title: 'Slaughter',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FORCEFUL_BACKHAND]: {
		title: 'Forceful backhand',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FLURRY]: {
		title: 'Flurry',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.GREATER_FLURRY]: {
		title: 'Greater flurry',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.HURRICANE]: {
		title: 'Hurricane',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.BLOOD_TENDRILS]: {
		title: 'Blood tendrils',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.OVERPOWER]: {
		title: 'Overpower',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.MASSACRE]: {
		title: 'Massacre',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.METEOR_STRIKE]: {
		title: 'Meteor strike',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.KICK]: {
		title: 'Kick',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.PUNISH]: {
		title: 'Punish',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DISMEMBER]: {
		title: 'Dismember',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FURY]: {
		title: 'Fury',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.GREATER_FURY]: {
		title: 'Greater fury',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.CLEAVE]: {
		title: 'Cleave',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DECIMATE]: {
		title: 'Decimate',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.CHAOS_ROAR]: {
		title: 'Chaos roar',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.STOMP]: {
		title: 'Stomp',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DESTROY]: {
		title: 'Destroy',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.QUAKE]: {
		title: 'Quake',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.ASSAULT]: {
		title: 'Assault',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.PULVERISE]: {
		title: 'Pulverise',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FRENZY]: {
		title: 'Frenzy',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.ENERGY_DRAIN]: {
		title: 'Energy drain',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FAVOUR_OF_THE_WAR_GOD]: {
		title: 'Favour of the war god',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.ARMADYLS_JUDGEMENT]: {
		title: 'Armadyls judgement',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.WARSTRIKE]: {
		title: 'Warstrike',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SUNDER]: {
		title: 'Sunder',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.BACKSTAB]: {
		title: 'Backstab',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.LIQUEFY]: {
		title: 'Liquefy',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.CLOBBER]: {
		title: 'Clobber',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.ICY_TEMPEST]: {
		title: 'Icy tempest',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.WEAKEN_SPECIAL_ATTACK]: {
		title: 'Weaken',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.POWERSTAB]: {
		title: 'Powerstab	',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SLICE_N_DICE]: {
		title: 'Slice & dice',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DRACONIC_PUNCTURE]: {
		title: 'Draconic puncture',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SWEEP]: {
		title: 'Sweep',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DRACONIC_CLEAVE]: {
		title: 'Draconic cleave',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DRACONIC_BLOW]: {
		title: 'Draconic blow',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DRACONIC_SLASH]: {
		title: 'Draconic slash',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SHOVE]: {
		title: 'Shove',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.IGNEOUS_CLEAVE]: {
		title: 'Igenous cleave',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.QUICK_SMASH]: {
		title: 'Quick smash',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.AIMED_STRIKE]: {
		title: 'Aimed strike',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.DISRUPT]: {
		title: 'Disrupt',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.GET_OVER_HERE]: {
		title: 'Get over here!',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.IMPALE]: {
		title: 'Impale',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.HEALING_BLADE]: {
		title: 'Healing blade',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SARADOMINS_LIGHTNING]: {
		title: 'Saradomins lightning',
		calc: ability_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.OBLITERATE]: {
		title: 'Obliterate',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.FEINT]: {
		title: 'Feint',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.SPEAR_WALL]: {
		title: 'Spear wall',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
	[ABILITIES.ICE_CLEAVE]: {
		title: 'Ice cleave',
		calc: hit_damage_calculation,
		icon: '/ability_icons/melee/30x30/slice.png'
	},
};

export { abilities };
