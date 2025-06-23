import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    [ABILITIES.MELEE_AUTO]: {
        title: 'Auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.SEVER]: {
        title: 'Sever',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/sever.png'
    },
    [ABILITIES.CLEAVE]: {
        title: 'Cleave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/cleave.png'
    },
    [ABILITIES.DECIMATE]: {
        title: 'Decimate',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/deci.png'
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
    [ABILITIES.HAVOC]: {
        title: 'Havoc',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/havoc.png'
    },
    [ABILITIES.SMASH]: {
        title: 'Smash',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/smash.png'
    },
    [ABILITIES.SLICE]: {
        title: 'Slice',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/slice.png'
    },
    [ABILITIES.FURY]: {
        title: 'Fury',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/fury.png'
    },
    [ABILITIES.KICK]: {
        title: 'Kick',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/kick.png'
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
    [ABILITIES.DESTROY]: {
        title: 'Destroy',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/destroy.png'
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
        icon: '/ability_icons/melee/30x30/slaughter.png'
    },
    [ABILITIES.FORCEFUL_BACKHAND]: {
        title: 'Forceful backhand',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/forceful.png'
    },
    [ABILITIES.FLURRY]: {
        title: 'Flurry',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/flurry.png'
    },
    [ABILITIES.BLOOD_TENDRILS]: {
        title: 'Blood tendrils',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/blood-tend.png'
    },
    [ABILITIES.STOMP]: {
        title: 'Stomp',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/stomp.png'
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
        icon: '/ability_icons/melee/30x30/massacre.png'
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
        icon: '/ability_icons/melee/30x30/gmaul-bg.png'
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
        icon: '/ability_icons/melee/ags.png'
    },
    [ABILITIES.DRACONIC_CLEAVE]: {
        title: 'Draconic cleave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dlong-bg.png'
    },
    [ABILITIES.ENERGY_DRAIN]: {
        title: 'Energy drain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/abyssal_whip.png'
    },
    [ABILITIES.FAVOUR_OF_THE_WAR_GOD]: {
        title: 'Favour of the war god',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/ancient_mace.png'
    },
    [ABILITIES.WARSTRIKE]: {
        title: 'Warstrike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/bandos_godsword.png'
    },
    [ABILITIES.SUNDER]: {
        title: 'Sunder',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/barrelchest_anchor.png'
    },
    [ABILITIES.BACKSTAB]: {
        title: 'Backstab',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/bone_dagger.png'
    },
    [ABILITIES.LIQUEFY]: {
        title: 'Liquefy',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/brine_sabre.png'
    },
    [ABILITIES.CLOBBER]: {
        title: 'Clobber',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_hatchet.png'
    },
    [ABILITIES.WEAKEN_SPECIAL_ATTACK]: {
        title: 'Weaken',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/darklight.png'
    },
    [ABILITIES.POWERSTAB]: {
        title: 'Powerstab',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_2h_sword.png'
    },
    [ABILITIES.DRACONIC_PUNCTURE]: {
        title: 'Draconic puncture',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/dds.png'
    },
    [ABILITIES.SWEEP]: {
        title: 'Sweep',
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/dhally.png'
    },
    [ABILITIES.DRACONIC_BLOW]: {
        title: 'Draconic blow',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/dmace.png'
    },
    [ABILITIES.DRACONIC_SLASH]: {
        title: 'Draconic slash',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/dragon_scimitar.png'
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
        icon: '/ability_icons/melee/30x30/keenblade.png'
    },
    [ABILITIES.DISRUPT]: {
        title: 'Disrupt',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/korasis_sword.png'
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
        icon: '/ability_icons/melee/30x30/rune_claws.png'
    },
    [ABILITIES.HEALING_BLADE]: {
        title: 'Healing blade',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/saradomin_godsword.png'
    },
    [ABILITIES.SARADOMINS_LIGHTNING]: {
        title: "Saradomin's lightning",
        calc: ability_damage_calculation,
        icon: '/ability_icons/melee/30x30/saradomin_sword.png'
    },
    [ABILITIES.OBLITERATE]: {
        title: 'Obliterate',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/statius_warhammer.png'
    },
    [ABILITIES.FEINT]: {
        title: 'Feint',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/vls.png'
    },
    [ABILITIES.SPEAR_WALL]: {
        title: 'Spear wall',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/vestas_spear.png'
    },
    [ABILITIES.ICE_CLEAVE]: {
        title: 'Ice cleave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/melee/30x30/zamorak_godsword.png'
    }
};

export { abilities };
