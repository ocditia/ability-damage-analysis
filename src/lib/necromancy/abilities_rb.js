import { ABILITIES } from '../calc/const/const';
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
    [ABILITIES.CONJURE_UNDEAD_ARMY]: {
        title: 'Conjure Undead Army',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/conj-skele.png'
    },
    [ABILITIES.CONJURE_SKELETON_WARRIOR]: {
        title: 'Conjure Skeleton Warrior',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/conj-skele.png'
    },
    [ABILITIES.COMMAND_SKELETON_WARRIOR]: {
        title: 'Command Skeleton Warrior',
        calc: ability_damage_calculation,
        icon: '/ability_icons/necro/30x30/comm-skele.png'
    },
    [ABILITIES.CONJURE_VENGEFUL_GHOST]: {
        title: 'Conjure Vengeful Ghost',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/ghost.png'
    },
    [ABILITIES.CONJURE_PUTRID_ZOMBIE]: {
        title: 'Conjure Putrid Zombie',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/conj-zom.png'
    },
    [ABILITIES.COMMAND_PUTRID_ZOMBIE]: {
        title: 'Command Putrid Zombie',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/comm-zom.png'
    },
    [ABILITIES.CONJURE_PHANTOM_GUARDIAN]: {
        title: 'Conjure Phantom Guardian',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/command_phantom_guardian.png'
    },
    [ABILITIES.COMMAND_VENGEFUL_GHOST]: {
        title: 'Command Vengeful Ghost',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/30x30/ghost.png'
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
    [ABILITIES.DEATHSKULLS_4]: {
        title: 'Death Skulls',
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
    [ABILITIES.VOLLEY_OF_SOULS_DYNAMIC]: {
        title: 'Volley of souls',
        calc: ability_damage_calculation,
        'ability classification': 'multihit',
        icon: '/ability_icons/necro/30x30/volley-2.png'
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
    },
    [ABILITIES.LIFE_TRANSFER]: {
        title: 'Life Transfer',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/incantations/Life_Transfer.png'
    },
    [ABILITIES.THREADS_OF_FATE]: {
        title: 'Threads of Fate',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/incantations/Threads_of_Fate_icon.png'
    },
    [ABILITIES.INVOKE_DEATH]: {
        title: 'Invoke Death',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/incantations/Invoke_Death_icon.png'
    },
    [ABILITIES.SPLIT_SOUL_NECRO]: {
        title: 'Split Soul',
        calc: hit_damage_calculation,
        icon: '/ability_icons/necro/incantations/Split_Soul_icon.png'
    },
    [ABILITIES.LIVING_DEATH]: {
        title: 'Living Death',
        calc: hit_damage_calculation,
        icon: '/effect_icons/living_death.png'
    }
};

export { abilities };
