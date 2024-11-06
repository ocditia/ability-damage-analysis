import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    [ABILITIES.NECRO_AUTO]: {
        title: 'Necro auto',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/auto.png'
    },
    [ABILITIES.TOUCH_OF_DEATH]: {
        title: 'Touch of Death',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/tod.png'
    },
    [ABILITIES.SOUL_SAP]: {
        title: 'Soul sap',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/soul-sap.png'
    },
    [ABILITIES.SKELETON_WARRIOR_AUTO]: {
        title: 'Skeleton Warrior auto',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/conj-skele.png'
    },
    [ABILITIES.SKELETON_WARRIOR_AUTO_10]: {
        title: 'Command Skeleton Warrior',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/comm-skele.png'
    },
    [ABILITIES.VENGEFUL_GHOST_AUTO]: {
        title: 'Vengeful Ghost auto',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/ghost.png'
    },
    [ABILITIES.PUTRID_ZOMBIE_AUTO]: {
        title: 'Putrid Zombie auto',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/conj-zom.png'
    },
    [ABILITIES.COMMAND_PUTRID_ZOMBIE]: {
        title: 'Command Putrid Zombie',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/comm-zom.png'
    },
    [ABILITIES.COMMAND_PHANTOM_GUARDIAN]: {
        title: 'Command Phantom Guardian',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/command_phantom_guardian.png'
    },
    [ABILITIES.FINGER_OF_DEATH]: {
        title: 'Finger of death',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/FOD.png'
    },
    [ABILITIES.DEATHSKULLS]: {
        title: 'Deathskulls (1 hit)',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/skulls.png'
    },
    [ABILITIES.DEATHSKULLS_4]: {
        title: 'Deathskulls (4 hits)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/skulls.png'
    },
    [ABILITIES.DEATHSKULLS_7]: {
        title: 'Deathskulls (7 hits)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/skulls.png'
    },
    [ABILITIES.SOUL_STRIKE]: {
        title: 'Soul strike main',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/soul_strike.png'
    },
    [ABILITIES.SOUL_STRIKE_AOE]: {
        title: 'Soul strike aoe',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/soul_strike.png'
    },
    [ABILITIES.VOLLEY_OF_SOULS_2]: {
        title: 'Volley of souls (2)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/volley-2.png'
    },
    [ABILITIES.VOLLEY_OF_SOULS_3]: {
        title: 'Volley of souls (3)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/volley-3.png'
    },
    [ABILITIES.VOLLEY_OF_SOULS_4]: {
        title: 'Volley of souls (4)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/volley-4.png'
    },
    [ABILITIES.VOLLEY_OF_SOULS_5]: {
        title: 'Volley of souls (5)',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/volley-5.png'
    },
    [ABILITIES.SPECTRAL_SCYTHE_1]: {
        title: 'Spectral scythe 1',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/scyth-1.png'
    },
    [ABILITIES.SPECTRAL_SCYTHE_2]: {
        title: 'Spectral scythe 2',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/scyth-2.png'
    },
    [ABILITIES.SPECTRAL_SCYTHE_3]: {
        title: 'Spectral scythe 3',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/scyth-3.png'
    },
    [ABILITIES.BLOAT]: {
        title: 'Bloat',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/bloat.png'
    },
    [ABILITIES.BLOOD_SIPHON]: {
        title: 'Blood siphon',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/blood-siphon.png'
    },
    [ABILITIES.DEATH_GRASP]: {
        title: 'Death grasp',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/deathguard-bg.png'
    },
    [ABILITIES.DEATH_ESSENCE]: {
        title: 'Death essence',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/omniguard-bg.png'
    }
};

export { abilities };
