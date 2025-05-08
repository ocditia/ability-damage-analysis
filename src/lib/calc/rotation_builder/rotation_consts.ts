import { settingsConfig, SETTINGS } from '../settings.js';

// All the limited duration buffs displayed as bars under the rotation
export const buffs = [
    SETTINGS.CRIT_BUFF, 
    SETTINGS.NATURAL_INSTINCT, 
    SETTINGS.DEATH_SWIFTNESS, 
	SETTINGS.SUNSHINE, 
    SETTINGS.BERSERK, 
    SETTINGS.SPLIT_SOUL, 
	SETTINGS.ICY_PRECISION, 
    SETTINGS.BALANCE_BY_FORCE
];

export function createBuffTimings(barSize: number) {
    return (
        {
            [SETTINGS.CRIT_BUFF]: {
                title: 'Crit Buff',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#FFD700'
            },
            [SETTINGS.NATURAL_INSTINCT]: {
                title: 'Natural Instinct',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#B3B3B4'
            },
            [SETTINGS.DEATH_SWIFTNESS]: {
                title: 'Death\'s Swiftness',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#00bf63'
            },
            [SETTINGS.SUNSHINE]: {
                title: 'Sunshine',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#86F6FE'
            },
            [SETTINGS.BERSERK]: {
                title: 'Berserk',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#E28329'
            },
            [SETTINGS.SPLIT_SOUL]: {
                title: 'Split Soul',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#5b1db6'//'#9303ec'
            },
            [SETTINGS.ICY_PRECISION]: {
                title: 'Icy Precision',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#5AC8E1'
            },
            [SETTINGS.BALANCE_BY_FORCE]: {
                title: 'Balance By Force',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                colour: '#266d63'
            }
        }
    )
}

export function createStackTimings(barSize: number) {
    return (
        {
            [SETTINGS.ADRENALINE]: {
                title: 'Adrenaline',
                //displaySetting: SETTINGS.ADRENALINE,
                displaySetting: SETTINGS.SHOW_ADRENALINE,
                idx: -1,
                image: '/effect_icons/Crit_buff.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#f5e942',
                number: 'true'
            },
            [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: {
                title: 'Perfect Equilibrium stacks',
                displaySetting: SETTINGS.SHOW_BOLG_STACKS,
                idx: -1,
                image: '/effect_icons/Perfect Equilibrium (self status).png',
                stackTicks: Array(barSize).fill(0),
                colour: '#4cfc42'
            },
            [SETTINGS.ICY_CHILL_STACKS]: {
                title: 'Icy Chill stacks',
                displaySetting: SETTINGS.SHOW_ICY_CHILL_STACKS,
                idx: -1,
                image: '/effect_icons/Icy_Chill.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#03f4fc'
            }
        }
    )
}