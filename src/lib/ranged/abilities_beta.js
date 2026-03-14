import { ABILITIES } from '../calc/const';
import { ability_damage_calculation, hit_damage_calculation, calc_aftershock } from '../calc/damage_calc_beta.js';

const abilities = {
    [ABILITIES.RANGED_BETA]: {
        title: 'Ranged Auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GALESHOT]: {
        title: 'Galeshot',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GALESHOT_BONUS]: {
        title: 'Galeshot Per-Hit Damage',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GRICO_BETA]: {
        title: 'Greater Ricochet',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/grico.png'
    },
    [ABILITIES.PIERCING_SHOT_BETA]: {
        title: 'Piercing Shot',
        calc: ability_damage_calculation,
    },
    [ABILITIES.SNIPE_BETA]: {
        title: 'Snipe',
        calc: ability_damage_calculation,
    },
    [ABILITIES.CORRUPTION_SHOT_BETA]: {
        title: 'Corruption shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/corrupt-shot.png'
    },
    [ABILITIES.BINDING_SHOT_BETA]: {
        title: 'Binding Shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/binding.png'
    },
    [ABILITIES.SNAP_SHOT_BETA]: {
        title: 'Snap Shot',
        calc: ability_damage_calculation,
    },
    [ABILITIES.RAPID_FIRE_BETA]: {
        title: 'Rapid Fire',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rapid.png'
    },
    [ABILITIES.SHADOW_TENDRILS_BETA]: {
        title: 'Shadow tendrils',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/tendril.png'
    },
    [ABILITIES.BOMBARDMENT_BETA]: {
        title: 'Bombardment',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/bombard.png'
    },
    [ABILITIES.DEADSHOT_BETA]: {
        title: 'Deadshot',
        calc: ability_damage_calculation,
    },
    [ABILITIES.CRYSTAL_RAIN]: {
        title: 'Crystal Rain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/sgb.png'
    },
    [ABILITIES.BALANCE_BY_FORCE]: {
        title: 'Balance by Force',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/bolg.png'
    },
    [ABILITIES.DESTRUCTIVE_SHOT]: {
        title: 'Destructive Shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/zamorak_bow.png'
    },
    [ABILITIES.DESCENT_OF_DARKNESS]: {
        title: 'Descent of Darkness',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/dbow.png'
    },
    [ABILITIES.SHADOWFALL]: {
        title: 'Shadowfall',
        calc: ability_damage_calculation,
        icon: '/gear_icons/gloomfire_bow.png'
    },
    [ABILITIES.BALANCED_SHOT]: {
        title: 'Balanced Shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/guthix_bow.png'
    },
    [ABILITIES.AIMED_SHOT]: {
        title: 'Aimed Shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/hand_cannon.png'
    },
    [ABILITIES.POWER_SHOT]: {
        title: 'Power Shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/magic_shieldbow.png'
    },
    [ABILITIES.TWIN_FANG]: {
        title: 'Twin Fang',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/msb.png'
    },
    [ABILITIES.PHANTOM_STRIKE]: {
        title: 'Phantom Strike',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/morrigans_javelin.png'
    },
    [ABILITIES.HAMSTRING]: {
        title: 'Hamstring',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/morrigans_throwing_axe.png'
    },
    [ABILITIES.TWIN_SHOT]: {
        title: 'Twin Shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/quickbow.png'
    },
    [ABILITIES.CHAIN_HIT]: {
        title: 'Chain Hit',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rune_throwing_axe.png'
    },
    [ABILITIES.RESTORATIVE_SHOT]: {
        title: 'Restorative Shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/saradomin_bow.png'
    },
    [ABILITIES.SOUL_SHOT]: {
        title: 'Soul Shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/seercull.png'
    },
    [ABILITIES.DEEP_BURN]: {
        title: 'Deep Burn',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/strykebow.png'
    },
    [ABILITIES.DEFIANCE]: {
        title: 'Defiance',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/zaniks_crossbow.png'
    },
    [ABILITIES.AFTERSHOCK_RANGED]: {
        title: 'Aftershock',
        calc: calc_aftershock,
        icon: '/effect_icons/Aftershock.webp'
    }
};

export { abilities };
