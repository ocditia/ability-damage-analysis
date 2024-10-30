import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    [ABILITIES.PIERCING_SHOT]: {
        title: 'piercing shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/piercing.png'
    },
    [ABILITIES.BINDING_SHOT]: {
        title: 'Binding shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/binding.png'
    },
    [ABILITIES.SNIPE]: {
        title: 'Snipe',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/snipe.png'
    },
    [ABILITIES.DAZING_SHOT]: {
        title: 'Dazing shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/dazing.png'
    },
    [ABILITIES.DEMORALISE]: {
        title: 'Demoralise',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/demoralise.png'
    },
    [ABILITIES.NEEDLE_STRIKE]: {
        title: 'Needle strike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/needle.png'
    },
    [ABILITIES.FRAGMENTATION_SHOT]: {
        title: 'Fragmentation Shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/frag-shot.png'
    },
    [ABILITIES.RICOCHET]: {
        title: 'Ricochet',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rico.png'
    },
    [ABILITIES.GREATER_RICOCHET]: {
        title: 'Greater ricochet',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/grico.png'
    },
    [ABILITIES.CORRUPTION_SHOT]: {
        title: 'Corruption shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/corrupt-shot.png'
    },
    [ABILITIES.SNAP_SHOT]: {
        title: 'Snap shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/snapshot.png'
    },
    [ABILITIES.TIGHT_BINDINGS]: {
        title: 'Tight bindings',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/tbind.png'
    },
    [ABILITIES.ROUT]: {
        title: 'Rout',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rout.png'
    },
    [ABILITIES.RAPID_FIRE]: {
        title: 'Rapid fire',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rapid.png'
    },
    [ABILITIES.BOMBARDMENT]: {
        title: 'Bombardment',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/bombard.png'
    },
    [ABILITIES.SALT_THE_WOUND]: {
        title: 'Salt the wound',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/salt.png'
    },
    [ABILITIES.SHADOW_TENDRILS]: {
        title: 'Shadow tendrils',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/tendril.png'
    },
    [ABILITIES.DEADSHOT_INITIAL]: {
        title: 'Deadshot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/deadshot.png'
    },
    [ABILITIES.INCENDIARY_SHOT]: {
        title: 'Incendiary shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/incend.png'
    },
    [ABILITIES.UNLOAD]: {
        title: 'Unload',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/unload.png'
    },
    [ABILITIES.BALANCE_BY_FORCE]: {
        title: 'Balance by force',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/bolg.png'
    },
    [ABILITIES.DESCENT_OF_DARKNESS]: {
        title: 'Descent of Darkness',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/dbow.png'
    },
    [ABILITIES.BALANCED_SHOT]: {
        title: 'Balanced shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/guthix_bow.png'
    },
    [ABILITIES.AIMED_SHOT]: {
        title: 'Aimed shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/hand_cannon.png'
    },
    [ABILITIES.POWER_SHOT]: {
        title: 'Power shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/magic_shieldbow.png'
    },
    [ABILITIES.TWIN_FANG]: {
        title: 'Twin fang',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/msb.png'
    },
    [ABILITIES.PHANTOM_STRIKE]: {
        title: 'Phantom strike',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/morrigans_javelin.png'
    },
    [ABILITIES.HAMSTRING]: {
        title: 'Hamstring',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/morrigans_throwing_axe.png'
    },
    [ABILITIES.TWIN_SHOT]: {
        title: 'Twin shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/quickbow.png'
    },
    [ABILITIES.CHAIN_HIT]: {
        title: 'Chain hit',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/rune_throwing_axe.png'
    },
    [ABILITIES.RESTORATIVE_SHOT]: {
        title: 'Restorative shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/saradomin_bow.png'
    },
    [ABILITIES.SOUL_SHOT]: {
        title: 'Soul shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/seercull.png'
    },
    [ABILITIES.CRYSTAL_RAIN]: {
        title: 'Crystal rain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/sgb.png'
    },
    [ABILITIES.DEEP_BURN]: {
        title: 'Deep burn',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/strykebow.png'
    },
    [ABILITIES.DESTRUCTIVE_SHOT]: {
        title: 'Destrucive shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/ranged/30x30/zamorak_bow.png'
    },
    [ABILITIES.DEFIANCE]: {
        title: 'Defiance',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/zaniks_crossbow.png'
    }
};

export { abilities };
