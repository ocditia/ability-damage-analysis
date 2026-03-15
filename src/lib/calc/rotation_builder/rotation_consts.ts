import { settingsConfig, SETTINGS } from '../settings_rb.js';
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
    SETTINGS.BLACKHOLE,
    SETTINGS.SEARING_WINDS,
    SETTINGS.SHADOW_IMBUED,
    SETTINGS.DEATHSPORE_BUFF,
    SETTINGS.ESS_CORRUPTION_ADREN,
    SETTINGS.LIVING_DEATH,
    SETTINGS.HAUNTED,
    SETTINGS.THREADS_OF_FATE,
    SETTINGS.INVOKE_DEATH,
    SETTINGS.SPLIT_SOUL_NECRO,
    SETTINGS.METEOR_STRIKE_BUFF,
    SETTINGS.VESTMENTS_REGEN,
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
                activeRows: [],
                colour: '#efbdf7'
            },
            [SETTINGS.SEARING_WINDS]: {
                title: 'Searing Winds',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#ff8c00'
            },
            [SETTINGS.SHADOW_IMBUED]: {
                title: 'Shadow Imbued',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#6a0dad'
            },
            [SETTINGS.DEATHSPORE_BUFF]: {
                title: 'Feasting Spores',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#4a7c59'
            },
            [SETTINGS.ESS_CORRUPTION_ADREN]: {
                title: 'Essence Corruption Adrenaline',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#9932CC'
            },
            [SETTINGS.LIVING_DEATH]: {
                title: 'Living Death',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#4B0082'
            },
            [SETTINGS.HAUNTED]: {
                title: 'Haunted',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#6B21A8'
            },
            [SETTINGS.THREADS_OF_FATE]: {
                title: 'Threads of Fate',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#9333EA'
            },
            [SETTINGS.INVOKE_DEATH]: {
                title: 'Invoke Death',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#DC2626'
            },
            [SETTINGS.SPLIT_SOUL_NECRO]: {
                title: 'Split Soul (Necro)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#7C3AED'
            },
            [SETTINGS.METEOR_STRIKE_BUFF]: {
                title: 'Meteor Strike',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#FF4500'
            },
            [SETTINGS.VESTMENTS_REGEN]: {
                title: 'Vestments Regen',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#521c18'
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
            [SETTINGS.BLOODLUST_STACKS]: {
                title: 'Bloodlust stacks',
                displaySetting: SETTINGS.SHOW_BLOODLUST_STACKS,
                idx: -1,
                image: '/effect_icons/Bloodlust.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#cc0000',
                combatStyle: SettingsCombatStyles.MELEE
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
            [SETTINGS.DEATHSPORE_STACKS]: {
                title: 'Feasting Spores stacks',
                displaySetting: SETTINGS.SHOW_DEATHSPORE_STACKS,
                idx: -1,
                image: '/gear_icons/ranged/deathspore arrows.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#4a7c59',
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
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.DEATH_SPARK_STACKS]: {
                title: 'Death Spark',
                displaySetting: SETTINGS.SHOW_DEATH_SPARK_STACKS,
                idx: -1,
                image: '/effect_icons/necrosis.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#FFD700',
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.SOUL_REAVE_STACKS]: {
                title: 'Soul Reave',
                displaySetting: SETTINGS.SHOW_SOUL_REAVE_STACKS,
                idx: -1,
                image: '/effect_icons/necromancy/Soul_Reave.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#7B68EE',
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.BLOOD_TITHE]: {
                title: 'Blood Tithe stacks',
                displaySetting: SETTINGS.SHOW_BLOOD_TITHE,
                idx: -1,
                image: '/effect_icons/Exsanguinate_icon.webp',
                stackTicks: Array(barSize).fill(0),
                colour: '#cc0000',
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.GLACIAL_EMBRACE]: {
                title: 'Glacial Embrace stacks',
                displaySetting: SETTINGS.SHOW_GLACIAL_EMBRACE,
                idx: -1,
                image: '/effect_icons/Glacial_Embrace.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#5AC8E1',
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.FAMILIAR_SPEC_POINTS]: {
                title: 'Special Move Points',
                displaySetting: SETTINGS.SHOW_FAMILIAR_SPEC_POINTS,
                idx: -1,
                image: '/effect_icons/familiar.png',
                stackTicks: Array(barSize).fill(0),
                colour: '#ff9900',
                number: 'true',
                combatStyle: SettingsCombatStyles.ALL
            },
        }
    )
}