import { SETTINGS } from "../calc/settings_rb";
import type { Equipment } from "../calc/types.ts";


export const weapons: Record<string, Equipment> = {
    'custom main-hand weapon': {
        style: 'hybrid',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 1,
        type: 'none',
        classification: 'none',
    popular: true
    },
    'custom off-hand weapon': {
        style: 'hybrid',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 1,
        type: 'none',
        classification: 'none',
    popular: true
    },
    'custom two-hand weapon': {
        style: 'hybrid',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 1,
        type: 'none',
        classification: 'none',
    popular: true
    },
    'custom shield': {
        style: 'hybrid',
        'weapon type': 'shield',
        slot: 'offhand',
        tier: 0,
        type: 'none',
        classification: 'none',
    popular: true
    },
    'wand of the praesul': {
        style: 'magic',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 92,
        type: 'wand',
        classification: 'none',
    },
    'imperium core': {
        style: 'magic',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 92,
        type: 'core',
        classification: 'none',
    },
    [SETTINGS.MAGIC_TH_VALUES.INQ_STAFF]: {
        style: 'magic',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'staff',
        classification: 'none',
    },
    [SETTINGS.MAGIC_TH_VALUES.INQ_STAFF_E]: {
        style: 'magic',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'staff',
        classification: 'none',
    popular: true
    },
    [SETTINGS.MELEE_TH_VALUES.T_MAUL]: {
        style: 'melee',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
    },
    [SETTINGS.MELEE_TH_VALUES.T_MAUL_E]: {
        style: 'melee',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.RANGED_TH_VALUES.HEX]: {
        style: 'ranged',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'bow',
        classification: 'none',
        popular: false
    },
    [SETTINGS.RANGED_TH_VALUES.HEX_E]: {
        style: 'ranged',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'bow',
        classification: 'none',
    },
    [SETTINGS.RANGED_TH_VALUES.BOLG]: {
        style: 'ranged',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'bow',
        classification: 'none',
    },
    [SETTINGS.RANGED_TH_VALUES.BOLG_IM]: {
        style: 'ranged',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'bow',
        classification: 'none',
    popular: true
    },
    [SETTINGS.RANGED_MH_VALUES.BLIGHTBOUND]: {
        style: 'ranged',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 92,
        type: 'crossbow',
        classification: 'none',
    },
    [SETTINGS.RANGED_OH_VALUES.BLIGHTBOUND]: {
        style: 'ranged',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 92,
        type: 'crossbow',
        classification: 'none',
    },
    [SETTINGS.NECRO_MH_VALUES.OMNI_GUARD]: {
        style: 'necromancy',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'armguard',
        classification: 'none',
    popular: true
    },
    [SETTINGS.NECRO_MH_VALUES.OMNI_GUARD_IM]: {
        style: 'necromancy',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'armguard',
        classification: 'none',
    popular: true
    },
    [SETTINGS.NECRO_MH_VALUES.DEVOURERS_GUARD]: {
        style: 'necromancy',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'armguard',
        classification: 'none',
    },
    [SETTINGS.NECRO_MH_VALUES.DEVOURERS_GUARD_IM]: {
        style: 'necromancy',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'armguard',
        classification: 'none',
    popular: true
    },
    'soulbound lantern': {
        style: 'necromancy',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 95,
        type: 'conduit',
        classification: 'none',
    popular: true
    },
    'custom oh': {
        style: 'hybrid',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 0
    },
    'custom th': {
        style: 'hybrid',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 0
    },
    [SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING]: {
        style: 'magic',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'wand',
        classification: 'none',
    },
    [SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING_IM]: {
        style: 'magic',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'wand',
        classification: 'none',
    popular: true
    },
    [SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT]: {
        style: 'magic',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 95,
        type: 'orb',
        classification: 'none',
    },
    [SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT_IM]: {
        style: 'magic',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 100,
        type: 'orb',
        classification: 'none',
    popular: true
    },
    [SETTINGS.MELEE_MH_VALUES.LENG]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.LENG_IM]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'none',
        classification: 'none',
    popular: true
    },
    [SETTINGS.MELEE_OH_VALUES.LENG]: {
        style: 'melee',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 95,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_OH_VALUES.LENG_IM]: {
        style: 'melee',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 100,
        type: 'none',
        classification: 'none',
        popular: true
    },
    [SETTINGS.MELEE_MH_VALUES.KERIS]: {
        style: 'melee', 
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 50,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 50,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.KERIS_AVG]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 50,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 70,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 70,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS_AVG]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 70,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS_AVG]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.DARK_ICE_SHARD]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 88,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER]: {
        style: 'melee',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 88,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_TH_VALUES.MW_SPEAR]: {
        style: 'melee',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 92,
        type: 'spear',
        classification: 'none',
    popular: true
    },
    [SETTINGS.NECRO_OH_VALUES.SOULBOUND_LANTERN]: {
        style: 'necromancy',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 95,
        type: 'none',
        classification: 'none',
        popular: false
    },
    [SETTINGS.NECRO_OH_VALUES.SOULBOUND_LANTERN_IM]: {
        style: 'necromancy',
        'weapon type': 'off-hand',
        slot: 'offhand',
        tier: 100,
        type: 'none',
        classification: 'none',
        popular: true
    },
    [SETTINGS.NECRO_OH_VALUES.SPECTRAL]: {
        style: 'necromancy',
        'weapon type': 'shield',
        slot: 'offhand',
        tier: 75,
        type: 'shield',
        classification: 'none',
        popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.KERIS]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 50,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 50,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 70,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 70,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS_PROC]: {
        style: 'melee',
        'weapon type': 'main-hand',
        slot: 'mainhand',
        tier: 80,
        type: 'none',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MELEE_TH_VALUES.EZK]:{
        style: 'melee',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'none',
        classification: 'obsidian',
    popular: false
    },
    [SETTINGS.MELEE_TH_VALUES.EZK_IM]:{
        style: 'melee',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'none',
        classification: 'obsidian',
    popular: true
    },
    [SETTINGS.MAGIC_TH_VALUES.FSOA]:{
        style: 'magic',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 95,
        type: 'staff',
        classification: 'none',
    popular: false
    },
    [SETTINGS.MAGIC_TH_VALUES.FSOA_IM]:{
        style: 'magic',
        'weapon type': 'two-hand',
        slot: 'mainhand',
        tier: 100,
        type: 'staff',
        classification: 'none',
    popular: true
    },
};