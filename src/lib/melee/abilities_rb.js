import { ABILITIES } from '../calc/const/const';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc_rb.js';

const abilities = {
    [ABILITIES.MELEE_AUTO]: {
        title: 'Auto',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/Attack_ability.png'
    },
    [ABILITIES.ADAPTIVE_STRIKE]: {
        title: 'Adaptive strike',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/Adaptive_Strike.png'
    },
    [ABILITIES.REND]: {
        title: 'Rend',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/Rend.png'
    },
    [ABILITIES.GREATER_BARGE]: {
        title: 'Greater barge',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/gbarge.png'
    },
    [ABILITIES.PUNISH]: {
        title: 'Punish',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/punish.png'
    },
    [ABILITIES.GREATER_FURY]: {
        title: 'Greater fury',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/gfury.png'
    },
    [ABILITIES.CHAOS_ROAR]: {
        title: 'Chaos roar',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/roar.png'
    },
    [ABILITIES.DISMEMBER]: {
        title: 'Dismember',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/dismember.png'
    },
    [ABILITIES.FURY]: {
        title: 'Fury',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/fury.png'
    },
    [ABILITIES.BACKHAND]: {
        title: 'Backhand',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/backhand.png'
    },
    [ABILITIES.BARGE]: {
        title: 'Barge',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/barge.png'
    },
    [ABILITIES.BLADED_DIVE]: {
        title: 'Bladed dive',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/bd.png'
    },
    [ABILITIES.ASSAULT]: {
        title: 'Assault',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/assault.png'
    },
    [ABILITIES.GREATER_FLURRY]: {
        title: 'Greater flurry',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/gflurry.png'
    },
    [ABILITIES.HURRICANE]: {
        title: 'Hurricane',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/cane.png'
    },
    [ABILITIES.QUAKE]: {
        title: 'Quake',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/quake.png'
    },
    [ABILITIES.SLAUGHTER]: {
        title: 'Slaughter',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/Slaughter.png'
    },
    [ABILITIES.FLURRY]: {
        title: 'Flurry',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/flurry.png'
    },
    [ABILITIES.OVERPOWER]: {
        title: 'Overpower',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/overpower.png'
    },
    [ABILITIES.METEOR_STRIKE]: {
        title: 'Meteor strike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/meteor.png'
    },
    [ABILITIES.MASSACRE]: {
        title: 'Massacre',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/Massacre.png'
    },
    [ABILITIES.PULVERISE]: {
        title: 'Pulverise',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/pulverise.png'
    },
    [ABILITIES.FRENZY]: {
        title: 'Frenzy',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/frenzy.png'
    },
    [ABILITIES.SLICE_N_DICE]: {
        title: 'Slice & dice',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/dclaw-bg.png'
    },
    [ABILITIES.ICY_TEMPEST]: {
        title: 'Icy tempest',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/leng.png'
    },
    [ABILITIES.QUICK_SMASH]: {
        title: 'Quick smash',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/gmaul-bg.png',
        common: false
    },
    [ABILITIES.IGNEOUS_CLEAVE]: {
        title: 'Igneous cleave',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/ezk-bg.png'
    },
    [ABILITIES.IGNEOUS_SHOWDOWN]: {
        title: 'Igneous showdown',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/ezk-bg.png'
    },
    [ABILITIES.ARMADYLS_JUDGEMENT]: {
        title: "Armadyl's judgement",
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/ags.png',
        common: false
    },
    [ABILITIES.DRACONIC_CLEAVE]: {
        title: 'Draconic cleave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dlong-bg.png',
        common: false
    },
    [ABILITIES.ENERGY_DRAIN]: {
        title: 'Energy drain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/abyssal_whip.png',
        common: false
    },
    [ABILITIES.FAVOUR_OF_THE_WAR_GOD]: {
        title: 'Favour of the war god',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/ancient_mace.png',
        common: false
    },
    [ABILITIES.WARSTRIKE]: {
        title: 'Warstrike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/bandos_godsword.png',
        common: false
    },
    [ABILITIES.SUNDER]: {
        title: 'Sunder',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/barrelchest_anchor.png',
        common: false
    },
    [ABILITIES.BACKSTAB]: {
        title: 'Backstab',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/bone_dagger.png',
        common: false
    },
    [ABILITIES.LIQUEFY]: {
        title: 'Liquefy',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/brine_sabre.png',
        common: false
    },
    [ABILITIES.CLOBBER]: {
        title: 'Clobber',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_hatchet.png',
        common: false
    },
    [ABILITIES.WEAKEN_SPECIAL_ATTACK]: {
        title: 'Weaken',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/darklight.png',
        common: false
    },
    [ABILITIES.POWERSTAB]: {
        title: 'Powerstab',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_2h_sword.png',
        common: false
    },
    [ABILITIES.DRACONIC_PUNCTURE]: {
        title: 'Draconic puncture',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/dds.png',
        common: false
    },
    [ABILITIES.SWEEP]: {
        title: 'Sweep',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/dhally.png',
        common: false
    },
    [ABILITIES.DRACONIC_BLOW]: {
        title: 'Draconic blow',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/dmace.png',
        common: false
    },
    [ABILITIES.DRACONIC_SLASH]: {
        title: 'Draconic slash',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_scimitar.png',
        common: false
    },
    // abil just does 0 damage
    /*[ABILITIES.SHOVE]: {
        title: 'Shove',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_spear.png'
    },*/
    [ABILITIES.AIMED_STRIKE]: {
        title: 'Aimed strike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/keenblade.png',
        common: false
    },
    [ABILITIES.DISRUPT]: {
        title: 'Disrupt',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/korasis_sword.png',
        common: false
    },
    // abil does 0 damage
    /*[ABILITIES.GET_OVER_HERE]: {
        title: 'Get over here!',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/lava_whip.png'
    },*/
    [ABILITIES.IMPALE]: {
        title: 'Impale',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/rune_claws.png',
        common: false
    },
    [ABILITIES.HEALING_BLADE]: {
        title: 'Healing blade',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/saradomin_godsword.png',
        common: false
    },
    [ABILITIES.SARADOMINS_LIGHTNING]: {
        title: "Saradomin's lightning",
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/saradomin_sword.png',
        common: false
    },
    [ABILITIES.OBLITERATE]: {
        title: 'Obliterate',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/statius_warhammer.png',
        common: false
    },
    [ABILITIES.FEINT]: {
        title: 'Feint',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/vls.png',
        common: false
    },
    [ABILITIES.SPEAR_WALL]: {
        title: 'Spear wall',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/vestas_spear.png',
        common: false
    },
    [ABILITIES.ICE_CLEAVE]: {
        title: 'Ice cleave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/zamorak_godsword.png',
        common: false
    },
    [ABILITIES.SUNFALL_SLAM]: {
        title: 'Sunfall slam',
        calc: hit_damage_calculation,
        icon: '/gear_icons/melee/tumeken\'s light.png'
    },
    [ABILITIES.LESSER_PURIFYING_LIGHT]: {
        title: 'Lesser purifying light',
        calc: hit_damage_calculation,
    },
    [ABILITIES.PURIFYING_LIGHT]: {
        title: 'purifying light',
        calc: hit_damage_calculation,
    }
};

export { abilities };
