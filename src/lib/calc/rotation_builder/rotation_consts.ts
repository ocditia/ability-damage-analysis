import { settingsConfig, SETTINGS } from '../settings_rb.js';
import { SettingsCombatStyles } from './types/SettingsCombatStyles';
import { BUFF_COLORS, STACK_COLORS } from '../../utils/colors';

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
    SETTINGS.RAMPAGE,
    SETTINGS.FLOW,
    SETTINGS.GREATER_FLOW,
    SETTINGS.FLOW_AC,
    SETTINGS.GREATER_FLOW_AC,
    SETTINGS.ANIMA_CHARGED,
    SETTINGS.BARRICADE,
    SETTINGS.FULLY_CHANNELED_ASPHYX,
    SETTINGS.SMOKE_CLOUD,
    SETTINGS.UNDEAD_SLAYER_ABILITY,
    SETTINGS.DRAGON_SLAYER_ABILITY,
    SETTINGS.DEMON_SLAYER_ABILITY,
];

export function createBuffTimings(barSize: number) {
    return (
        {
            [SETTINGS.CRIT_BUFF]: {
                title: 'Crit Buff',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.crit_buff
            },
            [SETTINGS.DEATH_SWIFTNESS]: {
                title: 'Death\'s Swiftness',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.death_swiftness
            },
            [SETTINGS.SUNSHINE]: {
                title: 'Sunshine',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.sunshine
            },
            [SETTINGS.BERSERK]: {
                title: 'Berserk',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.berserk
            },
            [SETTINGS.NATURAL_INSTINCT]: {
                title: 'Natural Instinct',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.natural_instinct
            },
            [SETTINGS.SPLIT_SOUL]: {
                title: 'Split Soul',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.split_soul
            },
            [SETTINGS.GREATER_DRACOLICH_INFUSION]: {
                title: 'Dracolich Infusion (Greater)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.greater_dracolich
            },
            [SETTINGS.ICY_PRECISION]: {
                title: 'Icy Precision',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.icy_precision
            },
            [SETTINGS.BALANCE_BY_FORCE]: {
                title: 'Balance By Force',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.balance_by_force
            },
            [SETTINGS.INSTABILITY]: {
                title: 'Instability',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.instability
            },
            [SETTINGS.CHAOS_ROAR]: {
                title: 'Chaos Roar',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.chaos_roar
            },
            [SETTINGS.BLACKHOLE]: {
                title: 'Blackhole',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.blackhole
            },
            [SETTINGS.SEARING_WINDS]: {
                title: 'Searing Winds',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.searing_winds
            },
            [SETTINGS.SHADOW_IMBUED]: {
                title: 'Shadow Imbued',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.shadow_imbued
            },
            [SETTINGS.DEATHSPORE_BUFF]: {
                title: 'Feasting Spores',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.deathspore_buff
            },
            [SETTINGS.ESS_CORRUPTION_ADREN]: {
                title: 'Essence Corruption Adrenaline',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.essence_corruption_adren
            },
            [SETTINGS.LIVING_DEATH]: {
                title: 'Living Death',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.living_death
            },
            [SETTINGS.HAUNTED]: {
                title: 'Haunted',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.haunted
            },
            [SETTINGS.THREADS_OF_FATE]: {
                title: 'Threads of Fate',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.threads_of_fate
            },
            [SETTINGS.INVOKE_DEATH]: {
                title: 'Invoke Death',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.invoke_death
            },
            [SETTINGS.SPLIT_SOUL_NECRO]: {
                title: 'Split Soul (Necro)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.split_soul_necro
            },
            [SETTINGS.METEOR_STRIKE_BUFF]: {
                title: 'Meteor Strike',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.meteor_strike_buff
            },
            [SETTINGS.VESTMENTS_REGEN]: {
                title: 'Vestments Regen',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.vestments_regen
            },
            [SETTINGS.RAMPAGE]: {
                title: 'Rampage',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.rampage
            },
            [SETTINGS.FLOW]: {
                title: 'Flow',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#0ce6ff'
            },
            [SETTINGS.GREATER_FLOW]: {
                title: 'Greater Flow',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#0ce6ff'
            },
            [SETTINGS.FLOW_AC]: {
                title: 'Flow (Anima Charged)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#0ce6ff'
            },
            [SETTINGS.GREATER_FLOW_AC]: {
                title: 'Greater Flow (Anima Charged)',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#0ce6ff'
            },
            [SETTINGS.ANIMA_CHARGED]: {
                title: 'Anima Charged',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#a855f7'
            },
            [SETTINGS.BARRICADE]: {
                title: 'Barricade',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.barricade
            },
            [SETTINGS.FULLY_CHANNELED_ASPHYX]: {
                title: "Tumeken's Resplendence",
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: BUFF_COLORS.tumekens_asphyx
            },
            [SETTINGS.SMOKE_CLOUD]: {
                title: 'Smoke Cloud',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#7B68EE'
            },
            [SETTINGS.UNDEAD_SLAYER_ABILITY]: {
                title: 'Undead Slayer',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#8B5CF6'
            },
            [SETTINGS.DRAGON_SLAYER_ABILITY]: {
                title: 'Dragon Slayer',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#EF4444'
            },
            [SETTINGS.DEMON_SLAYER_ABILITY]: {
                title: 'Demon Slayer',
                idx: -1,
                buffTicks: Array(barSize).fill(0),
                activeRows: [],
                colour: '#F97316'
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
                colour: STACK_COLORS.adrenaline,
                number: 'true',
                combatStyle: SettingsCombatStyles.ALL
            },
            [SETTINGS.BLOODLUST_STACKS]: {
                title: 'Bloodlust stacks',
                displaySetting: SETTINGS.SHOW_BLOODLUST_STACKS,
                idx: -1,
                image: '/effect_icons/Bloodlust.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.bloodlust,
                combatStyle: SettingsCombatStyles.MELEE
            },
            [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: {
                title: 'Perfect Equilibrium stacks',
                displaySetting: SETTINGS.SHOW_BOLG_STACKS,
                idx: -1,
                image: '/effect_icons/Perfect Equilibrium (self status).png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.perfect_equilibrium,
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.ICY_CHILL_STACKS]: {
                title: 'Icy Chill stacks',
                displaySetting: SETTINGS.SHOW_ICY_CHILL_STACKS,
                idx: -1,
                image: '/effect_icons/Icy_Chill.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.icy_chill,
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.BIK_STACKS]: {
                title: 'Evolving Toxin stacks',
                displaySetting: SETTINGS.SHOW_BIK_STACKS,
                idx: -1,
                image: '/effect_icons/evolving_toxin.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.bik,
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.DEATHSPORE_STACKS]: {
                title: 'Feasting Spores stacks',
                displaySetting: SETTINGS.SHOW_DEATHSPORE_STACKS,
                idx: -1,
                image: '/gear_icons/ranged/deathspore arrows.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.deathspore,
                combatStyle: SettingsCombatStyles.RANGED
            },
            [SETTINGS.NECROSIS_STACKS]: {
                title: 'Necrosis stacks',
                displaySetting: SETTINGS.SHOW_NECROSIS_STACKS,
                idx: -1,
                image: '/effect_icons/necrosis.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.necrosis,
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.RESIDUAL_SOULS]: {
                title: 'Residual Souls',
                displaySetting: SETTINGS.SHOW_RESIDUAL_SOULS,
                idx: -1,
                image: '/effect_icons/residual_soul.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.residual_souls,
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.ESSENCE_CORRUPTION]: {
                title: 'Essence Corruption',
                displaySetting: SETTINGS.SHOW_ESSENCE_CORRUPTION,
                idx: -1,
                image: '/effect_icons/essence_corruption.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.essence_corruption,
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.DEATH_SPARK_STACKS]: {
                title: 'Death Spark',
                displaySetting: SETTINGS.SHOW_DEATH_SPARK_STACKS,
                idx: -1,
                image: '/effect_icons/necromancy/death_spark2.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.death_spark,
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.SOUL_REAVE_STACKS]: {
                title: 'Soul Reave',
                displaySetting: SETTINGS.SHOW_SOUL_REAVE_STACKS,
                idx: -1,
                image: '/effect_icons/necromancy/soul_reave2.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.soul_reave,
                combatStyle: SettingsCombatStyles.NECROMANCY
            },
            [SETTINGS.BLOOD_TITHE]: {
                title: 'Blood Tithe stacks',
                displaySetting: SETTINGS.SHOW_BLOOD_TITHE,
                idx: -1,
                image: '/effect_icons/Exsanguinate_icon.webp',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.blood_tithe,
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.GLACIAL_EMBRACE]: {
                title: 'Glacial Embrace stacks',
                displaySetting: SETTINGS.SHOW_GLACIAL_EMBRACE,
                idx: -1,
                image: '/effect_icons/Glacial_Embrace.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.glacial_embrace,
                combatStyle: SettingsCombatStyles.MAGIC
            },
            [SETTINGS.FAMILIAR_SPEC_POINTS]: {
                title: 'Special Move Points',
                displaySetting: SETTINGS.SHOW_FAMILIAR_SPEC_POINTS,
                idx: -1,
                image: '/effect_icons/familiar.png',
                stackTicks: Array(barSize).fill(0),
                colour: STACK_COLORS.familiar_spec_points,
                number: 'true',
                combatStyle: SettingsCombatStyles.ALL
            },
        }
    )
}