import { settingsConfig, SETTINGS } from '../settings.js';
import { SettingsCombatStyles } from './types/SettingsCombatStyles';

/*
 * All the buffs displayed as bars under the rotation in the UI.
 */
export const buffs = [
    SETTINGS.CRIT_BUFF, 
    SETTINGS.NATURAL_INSTINCT, 
    SETTINGS.DEATH_SWIFTNESS, 
	SETTINGS.SUNSHINE, 
    SETTINGS.BERSERK,
    
    SETTINGS.SPLIT_SOUL, 
    SETTINGS.GREATER_DRACOLICH_INFUSION,
	SETTINGS.ICY_PRECISION, 
    SETTINGS.BALANCE_BY_FORCE,
    SETTINGS.INSTABILITY,
    SETTINGS.CHAOS_ROAR,
    SETTINGS.BLACKHOLE
];

export function createBuffTimings(barSize: number) {
    return (
        {
            [SETTINGS.CRIT_BUFF]: {
                title: 'Crit Buff',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#FFD700'
            },
            [SETTINGS.DEATH_SWIFTNESS]: {
                title: 'Death\'s Swiftness',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#00bf63'
            },
            [SETTINGS.SUNSHINE]: {
                title: 'Sunshine',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#86F6FE'
            },
            [SETTINGS.BERSERK]: {
                title: 'Berserk',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#E28329'
            },
            [SETTINGS.NATURAL_INSTINCT]: {
                title: 'Natural Instinct',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#B3B3B4'
            },
            [SETTINGS.SPLIT_SOUL]: {
                title: 'Split Soul',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#5b1db6'//
            },
            [SETTINGS.GREATER_DRACOLICH_INFUSION]: {
                title: 'Dracolich Infusion (Greater)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#0D1EB1'
            },
            [SETTINGS.ICY_PRECISION]: {
                title: 'Icy Precision',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#5AC8E1'
            },
            [SETTINGS.BALANCE_BY_FORCE]: {
                title: 'Balance By Force',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#266d63'
            },
            [SETTINGS.INSTABILITY]: {
                title: 'Instability',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#76ffbc'
            },
            [SETTINGS.CHAOS_ROAR]: {
                title: 'Chaos Roar',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#ef353a'
            },
            [SETTINGS.BLACKHOLE]: {
                title: 'Blackhole',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [], // Array of row indices where this buff is active
                colour: '#efbdf7'
            }
        }
    )
}

export function createStackTimings(barSize: number) {
    return (
        {
            [SETTINGS.ADRENALINE]: {
                title: 'Adrenaline',
                displaySetting: SETTINGS.SHOW_ADRENALINE,
                idx: -1,
                image: '/effect_icons/Crit_buff.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#f5e942',
                number: 'true',
                combatStyle: SettingsCombatStyles.ALL
            },
            [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: {
                title: 'Perfect Equilibrium stacks',
                displaySetting: SETTINGS.SHOW_BOLG_STACKS,
                idx: -1,
                image: '/effect_icons/Perfect Equilibrium (self status).png',
                stackTicks: Array(barSize).fill(0),
                colour: '#4cfc42',
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.ICY_CHILL_STACKS]: {
                title: 'Icy Chill stacks',
                displaySetting: SETTINGS.SHOW_ICY_CHILL_STACKS,
                idx: -1,
                image: '/effect_icons/Icy_Chill.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#03f4fc',
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.BIK_STACKS]: {
                title: 'Evolving Toxin stacks',
                displaySetting: SETTINGS.SHOW_BIK_STACKS,
                idx: -1,
                image: '/effect_icons/evolving_toxin.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#8CFA3A',
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.NECROSIS_STACKS]: {
                title: 'Necrosis stacks',
                displaySetting: SETTINGS.SHOW_NECROSIS_STACKS,
                idx: -1,
                image: '/effect_icons/necrosis.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#8B008B',
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.RESIDUAL_SOULS]: {
                title: 'Residual Souls',
                displaySetting: SETTINGS.SHOW_RESIDUAL_SOULS,
                idx: -1,
                image: '/effect_icons/residual_soul.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#00CED1',
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.ESSENCE_CORRUPTION]: {
                title: 'Essence Corruption',
                displaySetting: SETTINGS.SHOW_ESSENCE_CORRUPTION,
                idx: -1,
                image: '/effect_icons/essence_corruption.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#9932CC',
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
        }
    )
}