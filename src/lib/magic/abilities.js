import { ABILITIES } from '../calc/const.js';
import { ability_damage_calculation, hit_damage_calculation } from '../calc/damage_calc.js';

const abilities = {
    [ABILITIES.WRACK]: {
        title: 'Wrack',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/wrack.png'
    },
    [ABILITIES.TIME_STRIKE]: {
        title: 'Timestrike',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/wrack.png'
    },
    [ABILITIES.IMPACT]: {
        title: 'Impact',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/impact.png'
    },
    [ABILITIES.WRACK_AND_RUIN]: {
        title: 'Wrack and ruin',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/wrack_and_ruin.png'
    },
    [ABILITIES.DRAGON_BREATH]: {
        title: 'Dragon breath',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/dragon_breath.png'
    },
    [ABILITIES.CORRUPTION_BLAST]: {
        title: 'Corruption blast',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/corruption_blast.png'
    },
    [ABILITIES.SONIC_WAVE]: {
        title: 'Sonic wave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/sonic_wave.png'
    },
    [ABILITIES.SHOCK]: {
        title: 'Shock',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/shock.png'
    },
    [ABILITIES.CONCENTRATED_BLAST]: {
        title: 'Concentrated blast',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/concentrated_blast.png'
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST]: {
        title: 'Gconc',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/greater_concentrated_blast.png'
    },
    [ABILITIES.COMBUST]: {
        title: 'Combust',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/combust.png'
    },
    [ABILITIES.CHAIN]: {
        title: 'Chain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/chain.png'
    },
    [ABILITIES.GREATER_CHAIN]: {
        title: 'Greater chain',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/greater_chain.png'
    },
    [ABILITIES.MAGMA_TEMPEST]: {
        title: 'Magma tempest',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/magma_tempest.png'
    },
    [ABILITIES.GREATER_SONIC_WAVE]: {
        title: 'Greater sonic wave',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/greater_sonic_wave.png'
    },
    [ABILITIES.ASPHYXIATE]: {
        title: 'Asphyxiate',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/asphyxiate.png'
    },
    [ABILITIES.DEEP_IMPACT]: {
        title: 'Deep impact',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/deep_impact.png'
    },
    [ABILITIES.DETONATE]: {
        title: 'Detonate',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/deep_impact.png'
    },
    [ABILITIES.HORROR]: {
        title: 'Horror',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/horror.png'
    },
    [ABILITIES.WILD_MAGIC]: {
        title: 'Wild magic',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/wild_magic.png'
    },
    [ABILITIES.SMOKE_TENDRILS]: {
        title: 'Smoke tendrils',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/smoke_tendrils.png'
    },
    [ABILITIES.OMNIPOWER]: {
        title: 'Omnipower',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/omnipower.png'
    },
    [ABILITIES.TSUNAMI]: {
        title: 'Tsunami',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/tsunami.png'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL]: {
        title: 'Tempest of Armadyl',
        calc: ability_damage_calculation,
        icon: '/ability_icons/magic/30x30/armadyl_battlestaff-bg.png'
    },
    [ABILITIES.INSTABILITY]: {
        title: 'Instability',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/time_strike-bg.png'
    },
    [ABILITIES.CLAWS_OF_GUTHIX]: {
        title: 'Claws of Guthix',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/guthix_staff-bg.png'
    },
    [ABILITIES.IBAN_BLAST]: {
        title: 'Iban blast',
        calc: hit_damage_calculation,
        icon: '/ability_icons/magic/30x30/iban_staff.png'
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
    }
};

export { abilities };
