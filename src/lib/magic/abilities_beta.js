import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation, calc_aftershock } from '../calc/damage_calc_beta.js';

const abilities = {
    [ABILITIES.MAGIC_BETA]: {
        title: 'Magic auto',
        calc: hit_damage_calculation,
    },
    [ABILITIES.SONIC_WAVE]: {
        title: 'Sonic',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GSONIC_BETA]: {
        title: 'Gsonic',
        calc: hit_damage_calculation,
    },
    [ABILITIES.DRAGON_BREATH_BETA]: {
        title: 'Dragon breath',
        calc: hit_damage_calculation,
    },
    [ABILITIES.GCHAIN_BETA]: {
        title: 'Gchain',
        calc: hit_damage_calculation,
    },
    [ABILITIES.IMPACT_BETA]: {
        title: 'Impact',
        calc: hit_damage_calculation,
    },
    [ABILITIES.CONCENTRATED_BLAST]: {
        title: 'Concentrated blast',
        calc: ability_damage_calculation,
    },
    [ABILITIES.GCONC_BETA]: {
        title: 'Gconc',
        calc: ability_damage_calculation,
    },
    [ABILITIES.MAGMA_BETA]: {
        title: 'Magma tempest',
        calc: ability_damage_calculation,
    },
    [ABILITIES.COMBUST_BETA]: {
        title: 'Combust',
        calc: ability_damage_calculation,
    },
    [ABILITIES.CORRUPTION_BLAST_BETA]: {
        title: 'Corruption blast',
        calc: hit_damage_calculation,
    },
    [ABILITIES.WILD_MAGIC_BETA]: {
        title: 'Wild magic',
        calc: ability_damage_calculation,
    },
    [ABILITIES.ASPHYXIATE]: {
        title: 'Asphyx',
        calc: ability_damage_calculation,
    },
    [ABILITIES.SMOKE_TENDRILS_BETA]: {
        title: 'Smoke tendrils',
        calc: ability_damage_calculation,
    },
    [ABILITIES.OMNIPOWER_BETA]: {
        title: 'Omnipower',
        calc: ability_damage_calculation,
    },
    [ABILITIES.TSUNAMI]: {
        title: 'Tsunami',
        calc: hit_damage_calculation,
    },
     [ABILITIES.CLAWS_OF_GUTHIX]: {
        title: 'Claws of Guthix',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/guthix_staff-bg.png'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL]: {
        title: 'Tempest of Armadyl',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/armadyl_battlestaff-bg.png'
    },
    [ABILITIES.IBAN_BLAST]: {
        title: 'Iban blast',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/iban_staff.png'
    },
    [ABILITIES.INSTABILITY]: {
        title: 'Instability',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/Fractured_Staff_of_Armadyl.webp'
    },
    [ABILITIES.THE_LAST_COMMAND]: {
        title: 'The last command',
        calc: hit_damage_calculation,
        icon: '/gear_icons/legatuss_emberstaff.png'
    },
    [ABILITIES.RUNE_FLAME]: {
        title: 'Rune flame',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/mindspike.png'
    },
    [ABILITIES.DEVOUR]: {
        title: 'Devour',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/obliteration.png'
    },
    [ABILITIES.REAP]: {
        title: 'Reap',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/penance_trident.png'
    },
    [ABILITIES.SOULFIRE]: {
        title: 'Soulfire',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/roar_of_awakening.png'
    },
    [ABILITIES.SARADOMIN_STRIKE]: {
        title: 'Saradomin strike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/saradomin_staff.png'
    },
    [ABILITIES.FROM_THE_SHADOWS]: {
        title: 'From the shadows',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/staff_of_sliske.png'
    },
    [ABILITIES.FLAMES_OF_ZAMORAK]: {
        title: 'Flames of Zamorak',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/zamorak_staff.png'
    },
    [ABILITIES.MIASMIC_BARRAGE]: {
        title: 'Miasmic barrage',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/zuriels_staff.png'
    },
    [ABILITIES.AFTERSHOCK]: {
        title: 'Aftershock',
        calc: calc_aftershock,
        icon: '/ability_icons/magic/30x30/zuriels_staff.png'
    }
};

export { abilities };
