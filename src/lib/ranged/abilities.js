import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    [ABILITIES.PIERCING_SHOT]: {
        title: 'piercing shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/ranged/30x30/piercing.png'
    },
    [ABILITIES.BINDING_SHOT]: {
        title: 'Binding shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.SNIPE]: {
        title: 'Snipe',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DAZING_SHOT]: {
        title: 'Dazing shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DEMORALISE]: {
        title: 'Demoralise',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.NEEDLE_STRIKE]: {
        title: 'Needle strike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.FRAGMENTATION_SHOT]: {
        title: 'Snipe',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.RICOCHET]: {
        title: 'Ricochet',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.GREATER_RICOCHET]: {
        title: 'Greater ricochet',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.CORRUPTION_SHOT]: {
        title: 'Corruption shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.SNAP_SHOT]: {
        title: 'Snap shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.TIGHT_BINDINGS]: {
        title: 'Tight bindings',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.ROUT]: {
        title: 'Rout',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.RAPID_FIRE]: {
        title: 'Rapid fire',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.BOMBARDMENT]: {
        title: 'Bombardment',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.SALT_THE_WOUND]: {
        title: 'Salt the wound',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.SHADOW_TENDRILS]: {
        title: 'Shadow tendrils',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DEADSHOT_INITIAL]: {
        title: 'Deadshot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.INCENDIARY_SHOT]: {
        title: 'Incendiary shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.UNLOAD]: {
        title: 'Unload',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.BALANCE_BY_FORCE]: {
        title: 'Balance by force',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DESCENT_OF_DARKNESS]: {
        title: 'Incendiary shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.BALANCED_SHOT]: {
        title: 'Balanced shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.AIMED_SHOT]: {
        title: 'Aimed shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.POWER_SHOT]: {
        title: 'Power shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.TWIN_FANG]: {
        title: 'Twin fang',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.PHANTOM_STRIKE]: {
        title: 'Phantom strike',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.HAMSTRING]: {
        title: 'Hamstring',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.TWIN_SHOT]: {
        title: 'Twin shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.CHAIN_HIT]: {
        title: 'Chain hit',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.RESTORATIVE_SHOT]: {
        title: 'Restorative shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.SOUL_SHOT]: {
        title: 'Soul shot',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.CRYSTAL_RAIN]: {
        title: 'Crystal rain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DEEP_BURN]: {
        title: 'Deep burn',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DESTRUCTIVE_SHOT]: {
        title: 'Destrucive shot',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.DEFIANCE]: {
        title: 'Defiance',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    }
};

export { abilities };
