import { AbilityInfo } from "$lib/types/AbilityTypes";
import { SETTINGS } from "../settings_rb";
import type { Equipment } from "../types";


const weapons: Record<string, Equipment> = {
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
    popular: true
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

const gear = {
    'full slayer helmet': {
        // base helmet is the same as full helmet for melee
        boost: 0.075
    },
    'reinforced slayer helmet': {
        boost: 0.08
    },
    'strong slayer helmet': {
        boost: 0.085
    },
    'mighty slayer helmet': {
        boost: 0.09
    },
    'corrupted slayer helmet': {
        boost: 0.095
    },
    none: {
        boost: 0
    }
};

const armour: Record<string, Equipment> = {
    [SETTINGS.RING_VALUES.TOKKUL]: {
        'necromancy strength': 2.4,
        'magic strength': 2.4,
        'melee strength': 2.4,
        'ranged strength': 2.4,
        offensiveTier: { melee: 10, ranged: 10, magic: 10, necro: 10 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.TUSKA]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.TUSKA]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'hybrid'
    },
    [SETTINGS.CAPE_VALUES.TUSKA]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'hybrid'
    },
    [SETTINGS.RANGED_HELMET_VALUES.SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_BODY_VALUES.SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_LEGS_VALUES.SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid',
        popular: false
    },
    [SETTINGS.RANGED_HELMET_VALUES.ELITE_SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_BODY_VALUES.ELITE_SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_LEGS_VALUES.ELITE_SIRENIC]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_HELMET_VALUES.DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_BODY_VALUES.DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_LEGS_VALUES.DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_GLOVES_VALUES.DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_BOOTS_VALUES.DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.MAGIC_HELMET_VALUES.VIRTUS]: {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'helmet',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_BODY_VALUES.VIRTUS]: {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'body',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_LEGS_VALUES.VIRTUS]: {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_HELMET_VALUES.TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 23.2,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'helmet',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_BODY_VALUES.TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 34.8,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'body',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_LEGS_VALUES.TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 29,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'legs',
        style: 'magic',
        popular: false
    },
    [SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 24,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'helmet',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 36,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'body',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC]: {
        'necromancy strength': 0,
        'magic strength': 31,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'legs',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_HELMET_VALUES.SLISKE]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_BODY_VALUES.SLISKE]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_LEGS_VALUES.SLISKE]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.DTB]: {
        'necromancy strength': 14.5,
        'magic strength': 14.5,
        'melee strength': 14.5,
        'ranged strength': 14.5,
        offensiveTier: { melee: 90, ranged: 90, magic: 90, necro: 90 },
        slot: 'helmet',
        style: 'hybrid'
    },
    'none/tank': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    [SETTINGS.NECRO_HELMET_VALUES.TFN]: {
        'necromancy strength': 25,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'helmet',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_HELMET_VALUES.TFN_ADDON]: {
        'necromancy strength': 25,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'helmet',
        style: 'necromancy'
    },
    [SETTINGS.NECRO_BODY_VALUES.TFN]: {
        'necromancy strength': 37,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'body',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_LEGS_VALUES.TFN]: {
        'necromancy strength': 32,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'legs',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_GLOVES_VALUES.TFN]: {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'gloves',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_BOOTS_VALUES.TFN]: {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'boots',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_HELMET_VALUES.T90DD]: {
        'necromancy strength': 23.2,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'helmet',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_BODY_VALUES.T90DD]: {
        'necromancy strength': 34.8,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'body',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_LEGS_VALUES.T90DD]: {
        'necromancy strength': 29,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'legs',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_GLOVES_VALUES.T90DD]: {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'gloves',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.NECRO_BOOTS_VALUES.T90DD]: {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'boots',
        style: 'necromancy',
        popular: true
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.CINDERS]: {
        'necromancy strength': 11,
        'magic strength': 11,
        'melee strength': 11,
        'ranged strength': 11,
        offensiveTier: { melee: 85, ranged: 85, magic: 85, necro: 85 },
        slot: 'gloves',
        style: 'hybrid'
    },
    [SETTINGS.MELEE_BOOTS_VALUES.LACERATION]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        offensiveTier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    [SETTINGS.MELEE_BOOTS_VALUES.ENHANCED_LACERATION]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    [SETTINGS.RANGED_BOOTS_VALUES.FLEETING]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 12.7,
        offensiveTier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    [SETTINGS.RANGED_BOOTS_VALUES.ENHANCED_FLEETING]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.BLAST]: {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.BLAST_E]: {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    [SETTINGS.RANGED_BOOTS_VALUES.SH]: {
        'necromancy strength': 6.9,
        'magic strength': 6.9,
        'melee strength': 6.9,
        'ranged strength': 6.9,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'boots',
        style: 'hybrid'
    },
    [SETTINGS.MELEE_HELMET_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 23.2,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BODY_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 34.8,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_LEGS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 29,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_GLOVES_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BOOTS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_HELMET_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 24,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BODY_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 36,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_LEGS_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 31,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BOOTS_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_GLOVES_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_GLOVES_VALUES.GOP]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 13.5,
        'ranged strength': 0,
        offensiveTier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    [SETTINGS.MELEE_GLOVES_VALUES.GOP_E]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_HELMET_VALUES.VESTMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 28,
        'ranged strength': 0,
        offensiveTier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BODY_VALUES.VESTMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 42,
        'ranged strength': 0,
        offensiveTier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_LEGS_VALUES.VESTMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 37,
        'ranged strength': 0,
        offensiveTier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 19,
        'ranged strength': 0,
        offensiveTier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee',
        popular: true
    },
    [SETTINGS.CAPE_VALUES.ZUK]: {
        'necromancy strength': 43,
        'magic strength': 43,
        'melee strength': 43,
        'ranged strength': 43,
        offensiveTier: { melee: 99, ranged: 99, magic: 99, necro: 99 },
        slot: 'cape',
        style: 'hybrid',
        popular: true
    },
    'igneous kal-mor': {
        'necromancy strength': 43,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 99 },
        slot: 'cape',
        style: 'necromancy'
    },
    'igneous kal-xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 43,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'ranged'
    },
    'igneous kal-mej': {
        'necromancy strength': 0,
        'magic strength': 43,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 99, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    'igneous kal-ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 43,
        'ranged strength': 0,
        offensiveTier: { melee: 99, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'melee'
    },
    [SETTINGS.NECKLACE_VALUES.EOF]: {
        'necromancy strength': 56,
        'magic strength': 56,
        'melee strength': 56,
        'ranged strength': 56,
        offensiveTier: { melee: 97, ranged: 97, magic: 97, necro: 97 },
        slot: 'necklace',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.NECKLACE_VALUES.EOFOR]: {
        'necromancy strength': 59,
        'magic strength': 59,
        'melee strength': 59,
        'ranged strength': 59,
        offensiveTier: { melee: 102, ranged: 102, magic: 102, necro: 102 },
        slot: 'necklace',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.NECKLACE_VALUES.AOS]: {
        'necromancy strength': 46.3,
        'magic strength': 46.3,
        'melee strength': 46.3,
        'ranged strength': 46.3,
        offensiveTier: { melee: 84, ranged: 84, magic: 84, necro: 84 },
        slot: 'necklace',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.NECKLACE_VALUES.AOSOR]: {
        'necromancy strength': 48,
        'magic strength': 48,
        'melee strength': 48,
        'ranged strength': 48,
        offensiveTier: { melee: 87, ranged: 87, magic: 87, necro: 87 },
        slot: 'necklace',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.NECKLACE_VALUES.BERSERKER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.2,
        'ranged strength': 0,
        offensiveTier: { melee: 60, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee'
    },
    [SETTINGS.NECKLACE_VALUES.DESERT]: {
        'necromancy strength': 30.2,
        'magic strength': 30.2,
        'melee strength': 30.2,
        'ranged strength': 30.2,
        offensiveTier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'necklace',
        style: 'hybrid'
    },
    [SETTINGS.NECKLACE_VALUES.DRAGON_RIDER_NECKLACE]: {
        'necromancy strength': 30.2,
        'magic strength': 30.2,
        'melee strength': 30.2,
        'ranged strength': 30.2,
        offensiveTier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'blood amulet of fury': {
        'necromancy strength': 37.3,
        'magic strength': 37.3,
        'melee strength': 37.3,
        'ranged strength': 37.3,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'arcane blood necklace': {
        'necromancy strength': 0,
        'magic strength': 46,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'necklace',
        style: 'magic'
    },
    "brawler's blood necklace": {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 46,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee'
    },
    'farsight blood necklace': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 46,
        offensiveTier: { melee: 0, ranged: 80, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'ranged'
    },
    [SETTINGS.POCKET_VALUES.GRIM]: {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.POCKET_VALUES.FUL]: {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.POCKET_VALUES.JAS]: {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.AMASCUT]: {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.GWD3]: {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.IGOD]: {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.ELEMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'magic'
    },
    [SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'magic'
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.KWW]: {
        'necromancy strength': 0,
        'magic strength': 13.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.KWW_E]: {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    [SETTINGS.RANGED_GLOVES_VALUES.NIGHTMARES]: {
        'necromancy strength': 13.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    [SETTINGS.RANGED_GLOVES_VALUES.NIGHTMARES_E]: {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    [SETTINGS.MELEE_HELMET_VALUES.JAWS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 21.6,
        'ranged strength': 0,
        offensiveTier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    [SETTINGS.NECKLACE_VALUES.SALVE]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'hybrid'
    },
    [SETTINGS.NECKLACE_VALUES.SALVEE]: {
        'necromancy strength': 4.2,
        'magic strength': 4.2,
        'melee strength': 4.2,
        'ranged strength': 4.2,
        offensiveTier: { melee: 10, ranged: 10, magic: 10, necro: 10 },
        slot: 'necklace',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.REAVERS]: {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        offensiveTier: { melee: 88, ranged: 88, magic: 88, necro: 88 },
        slot: 'ring',
        style: 'hybrid',
        popular: true
    },
    [SETTINGS.RING_VALUES.CHANNELLER]: {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'ring',
        style: 'magic'
    },
    [SETTINGS.RING_VALUES.CHANNELLER_E]: {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'magic'
    },
    [SETTINGS.RING_VALUES.STALKER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'ranged',
        popular: false
    },
    [SETTINGS.RING_VALUES.STALKER_E]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.RING_VALUES.CHAMPION]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'melee',
    },
    [SETTINGS.RING_VALUES.CHAMPION_E]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'melee'
    },
    [SETTINGS.RING_VALUES.ASR]: {
        'necromancy strength': 21,
        'magic strength': 21,
        'melee strength': 21,
        'ranged strength': 21,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.ROD]: {
        'necromancy strength': 25.2,
        'magic strength': 25.2,
        'melee strength': 25.2,
        'ranged strength': 25.2,
        offensiveTier: { melee: 80, ranged: 80, magic: 80, necro: 80 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.RODI]: {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        offensiveTier: { melee: 88, ranged: 88, magic: 88, necro: 88 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.ASRI]: {
        'necromancy strength': 23.4,
        'magic strength': 23.4,
        'melee strength': 23.4,
        'ranged strength': 23.4,
        offensiveTier: { melee: 78, ranged: 78, magic: 78, necro: 78 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.ZORGOTH]: {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 92 },
        slot: 'ring',
        style: 'necromancy'
    },
    'occultists ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 92 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.LOTD]: {
        'necromancy strength': 17.3,
        'magic strength': 17.3,
        'melee strength': 17.3,
        'ranged strength': 17.3,
        offensiveTier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.LOTD_I]: {
        'necromancy strength': 19.8,
        'magic strength': 19.8,
        'melee strength': 19.8,
        'ranged strength': 19.8,
        offensiveTier: { melee: 69, ranged: 69, magic: 69, necro: 69 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.HSR]: {
        'necromancy strength': 21.0,
        'magic strength': 21.0,
        'melee strength': 21.0,
        'ranged strength': 21.0,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.RING_VALUES.HSR_I]: {
        'necromancy strength': 23.7,
        'magic strength': 23.7,
        'melee strength': 23.7,
        'ranged strength': 23.7,
        offensiveTier: { melee: 79, ranged: 79, magic: 79, necro: 79 },
        slot: 'ring',
        style: 'hybrid'
    },
    [SETTINGS.NECKLACE_VALUES.ZEALOTS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'hybrid',
        popular: true
    },
    'TokHaar-Kal-Ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 33.5,
        'ranged strength': 0,
        offensiveTier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'melee'
    },
    'TokHaar-Kal-Xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 33.5,
        offensiveTier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'ranged'
    },
    'TokHaar-Kal-Mej': {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    [SETTINGS.CAPE_VALUES.KILN]: {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 85 },
        slot: 'cape',
        style: 'necromancy'
    },
    [SETTINGS.CAPE_VALUES.COMP]: {
        'necromancy strength': 31.5,
        'magic strength': 31.5,
        'melee strength': 31.5,
        'ranged strength': 31.5,
        offensiveTier: { melee: 80, ranged: 80, magic: 80, necro: 80 },
        slot: 'cape',
        style: 'hybrid'
    },
    [SETTINGS.CAPE_VALUES.MAX]: {
        'necromancy strength': 31.5,
        'magic strength': 31.5,
        'melee strength': 31.5,
        'ranged strength': 31.5,
        offensiveTier: { melee: 80, ranged: 80, magic: 80, necro: 80 },
        slot: 'cape',
        style: 'hybrid'
    },
    [SETTINGS.CAPE_VALUES.GOD]: {
        'necromancy strength': 0,
        'magic strength': 31.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    [SETTINGS.CAPE_VALUES.SKILL]: {
        'necromancy strength': 21.6,
        'magic strength': 21.6,
        'melee strength': 21.6,
        'ranged strength': 21.6,
        offensiveTier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'cape',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM]: {
        'necromancy strength': 15,
        'magic strength': 15,
        'melee strength': 15,
        'ranged strength': 15,
        offensiveTier: { melee: 95, ranged: 95, magic: 95, necro: 95 },
        slot: 'pocket',
        style: 'hybrid'
    },
    [SETTINGS.POCKET_VALUES.CRUELTY]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'ranged'
    },
    [SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'ranged'
    },
    // Ammo
    [SETTINGS.AMMO_VALUES.FUL_ARROWS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.AMMO_VALUES.WEN_ARROWS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.AMMO_VALUES.DEATHSPORE_ARROWS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 95, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.AMMO_VALUES.JAS_ARROWS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.AMMO_VALUES.BIK_ARROWS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    [SETTINGS.AMMO_VALUES.HYDRIX_BOLTS]: {
        'necromancy strength': 0, 'magic strength': 0, 'melee strength': 0, 'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'ranged',
        popular: true
    },
    'underworld grimoire 3': {
        'necromancy strength': 10,
        'magic strength': 10,
        'melee strength': 10,
        'ranged strength': 10,
        offensiveTier: { melee: 65, ranged: 65, magic: 65, necro: 65 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'leagues pocket': {
        'necromancy strength': 15.0,
        'magic strength': 15.0,
        'melee strength': 15.0,
        'ranged strength': 15.0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'reaper necklace': {
        'necromancy strength': 36.8,
        'magic strength': 36.8,
        'melee strength': 36.8,
        'ranged strength': 36.8,
        offensiveTier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'necklace',
        style: 'hybrid',
        popular: false
    },
    'reaper necklace (or)': {
        'necromancy strength': 38.4,
        'magic strength': 38.4,
        'melee strength': 38.4,
        'ranged strength': 38.4,
        offensiveTier: { melee: 73, ranged: 73, magic: 73, necro: 73 },
        slot: 'necklace',
        style: 'hybrid',
        popular: false
    },
    [SETTINGS.NECKLACE_VALUES.MOONSTONE]: {
        'necromancy strength': 44.1,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 80 },
        slot: 'necklace',
        style: 'necromancy'
    },
    [SETTINGS.NECKLACE_VALUES.AM_ZI]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 52,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee'
    },
    [SETTINGS.NECKLACE_VALUES.AM_HEJ]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 52,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee'
    },
    'anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'refined anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 21.6,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'refined anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 32.5,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'refined anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 27.1,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'virtus robe bottom': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'virtus gloves': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    'virtus boots': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    'bandos helmet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 17.7,
        'ranged strength': 0,
        offensiveTier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'bandos chestplate': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 26.5,
        'ranged strength': 0,
        offensiveTier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'bandos tassets': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 22.1,
        'ranged strength': 0,
        offensiveTier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'bandos gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        offensiveTier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'bandos boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        offensiveTier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'torva helmet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 20.3,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'torva platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.5,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'torva platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 25.4,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'torva gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'torva boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        offensiveTier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    [SETTINGS.MAGIC_HELMET_VALUES.GHOST_HUNTER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    [SETTINGS.MELEE_BODY_VALUES.GHOST_HUNTER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'hybrid'
    },
    [SETTINGS.MELEE_LEGS_VALUES.GHOST_HUNTER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid'
    },
    [SETTINGS.CAPE_VALUES.GHOST_HUNTER]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'hybrid'
    },
    [SETTINGS.MAGIC_HELMET_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 28,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    [SETTINGS.MAGIC_BODY_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 42,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    [SETTINGS.MAGIC_LEGS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 37,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 19,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 19,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    [SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE]: {
        'necromancy strength': 0,
        'magic strength': 25,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 95, necro: 0 },
        slot: 'helmet',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE]: {
        'necromancy strength': 0,
        'magic strength': 37,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 95, necro: 0 },
        slot: 'body',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE]: {
        'necromancy strength': 0,
        'magic strength': 32,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 95, necro: 0 },
        slot: 'legs',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE]: {
        'necromancy strength': 0,
        'magic strength': 16,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 95, necro: 0 },
        slot: 'gloves',
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE]: {
        'necromancy strength': 0,
        'magic strength': 16,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 95, necro: 0 },
        slot: 'boots',
        style: 'magic',
        popular: true
    },
    'am-zi': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 52,
        'ranged strength': 0,
        slot: 'necklace',
        style: 'melee'
    },
    'am-hej': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 52,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee',
        popular: true
    },
    [SETTINGS.MELEE_AMMO_SLOT_VALUES.NODON_SPIKE_HARNESS]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 24,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'ammo',
        style: 'melee',
        popular: true
    },
};

export enum ABILITIES {
    NECRO_AD = 'necro base damage',
    NECRO_AUTO = 'necromancy auto',
    TOUCH_OF_DEATH = 'touch of death',
    SOUL_SAP = 'soul sap',
    CONJURE_UNDEAD_ARMY = 'conjure undead army',
    CONJURE_SKELETON_WARRIOR = 'conjure skeleton warrior',
    SKELETON_WARRIOR_AUTO = 'skeleton warrior auto',
    COMMAND_SKELETON_WARRIOR = 'command skeleton warrior',
    SKELETON_WARRIOR_AUTO_10 = 'skeleton warrior auto 10',
    CONJURE_VENGEFUL_GHOST = 'conjure vengeful ghost',
    VENGEFUL_GHOST_AUTO = 'vengeful ghost auto',
    CONJURE_PUTRID_ZOMBIE = 'conjure putrid zombie',
    PUTRID_ZOMBIE_AUTO = 'putrid zombie auto',
    PUTRID_ZOMBIE_POISON = 'putrid zombie poison',
    CONJURE_PHANTOM_GUARDIAN = 'conjure phantom guardian',
    LIFE_TRANSFER = 'life transfer',
    THREADS_OF_FATE = 'threads of fate',
    INVOKE_DEATH = 'invoke death',
    SPLIT_SOUL_NECRO = 'split soul necro',
    COMMAND_PUTRID_ZOMBIE = 'command putrid zombie',
    COMMAND_VENGEFUL_GHOST = 'command vengeful ghost',
    COMMAND_PHANTOM_GUARDIAN = 'command phantom guardian',
    FINGER_OF_DEATH = 'finger of death',
    DEATHSKULLS = 'death skulls',
    DEATHSKULLS_4 = 'death skulls 4',
    DEATHSKULLS_7 = 'death skulls 7',
    SOUL_CRUSH = 'soul crush',
    SOUL_STRIKE = 'soul strike',
    SOUL_STRIKE_AOE = 'soul strike aoe',
    VOLLEY_OF_SOULS = 'volley of souls',
    VOLLEY_OF_SOULS_DYNAMIC = 'volley of souls dynamic',
    VOLLEY_OF_SOULS_2 = 'volley of souls 2',
    VOLLEY_OF_SOULS_3 = 'volley of souls 3',
    VOLLEY_OF_SOULS_4 = 'volley of souls 4',
    VOLLEY_OF_SOULS_5 = 'volley of souls 5',
    SPECTRAL_SCYTHE_1 = 'spectral scythe 1',
    SPECTRAL_SCYTHE_2 = 'spectral scythe 2',
    SPECTRAL_SCYTHE_3 = 'spectral scythe 3',
    BLOOD_SIPHON = 'blood siphon',
    BLOAT = 'bloat',
    DEATH_GRASP = 'death grasp',
    DEATH_ESSENCE = 'death essence',
    LIVING_DEATH = 'living death',

    RANGED_AUTO = 'ranged auto',
    PIERCING_SHOT_HIT = 'piercing shot hit',
    PIERCING_SHOT = 'piercing shot',
    GALESHOT = 'galeshot',
    GALESHOT_BONUS = 'galeshot bonus',
    IMBUE_SHADOWS = 'imbue shadows',
    BINDING_SHOT = 'binding shot',
    SNIPE_HIT = 'snipe hit',
    SNIPE_HIT_2 = 'snipe hit nightmare gauntlets',
    SNIPE = 'snipe',
    RICOCHET = 'ricochet',
    GREATER_RICOCHET_1 = 'greater ricochet 1',
    GREATER_RICOCHET_2 = 'greater ricochet 2',
    GREATER_RICOCHET_3 = 'greater ricochet 3',
    GREATER_RICOCHET = 'greater ricochet',
    CORRUPTION_SHOT = 'corruption shot',
    CORRUPTION_SHOT_HIT_1 = 'corruption shot hit 1',
    CORRUPTION_SHOT_HIT_2 = 'corruption shot hit 2',
    CORRUPTION_SHOT_HIT_3 = 'corruption shot hit 3',
    CORRUPTION_SHOT_HIT_4 = 'corruption shot hit 4',
    CORRUPTION_SHOT_HIT_5 = 'corruption shot hit 5',
    SNAP_SHOT_HIT = 'snap shot 1',
    SNAP_SHOT = 'snap shot',
    RAPID_FIRE_LAST_HIT = 'rapid fire last hit',
    RAPID_FIRE_HIT = 'rapid fire hit',
    RAPID_FIRE = 'rapid fire',
    BOMBARDMENT = 'bombardment',
    SHADOW_TENDRILS = 'shadow tendrils',
    DEADSHOT_INITIAL = 'deadshot initial',
    DEADSHOT = 'deadshot',
    IGNEOUS_DEADSHOT_HIT = 'igneous_deadshot_hit',
    IGNEOUS_DEADSHOT = 'igneous_deadshot',
    DEATHS_SWIFTNESS_DOT = 'death\'s swiftness dot',
    DEATHS_SWIFTNESS = 'death\'s swiftness',
    GREATER_DEATHS_SWIFTNESS = 'greater death\'s swiftness',
    BALANCE_BY_FORCE = 'balance by force',
    BOLG_PROC = 'bolg proc',
    BOLG_PROC_PERCENTAGES = 'bolg proc percentages',
    DESCENT_OF_DARKNESS_HIT = 'descent of darkness hit',
    DESCENT_OF_DARKNESS = 'descent of darkness',
    BALANCED_SHOT = 'balanced shot',
    AIMED_SHOT = 'aimed shot',
    AIMED_SHOT_HIT = 'aimed shot hit',
    POWER_SHOT = 'power shot',
    TWIN_FANG_HIT = 'twin fang hit',
    TWIN_FANG = 'twin fang',
    PHANTOM_STRIKE_INITIAL = 'phantom strike initial',
    PHANTOM_STRIKE_BLEED = 'phantom strike bleed',
    PHANTOM_STRIKE = 'phantom strike',
    HAMSTRING = 'hamstring',
    TWIN_SHOT_HIT = 'twin shot hit',
    TWIN_SHOT = 'twin shot',
    CHAIN_HIT = 'chain hit',
    RESTORATIVE_SHOT = 'restorative shot',
    SOUL_SHOT = 'soul shot',
    SPLIT_SOUL_ECB = 'split soul ecb',
    CRYSTAL_RAIN = 'crystal rain',
    DEEP_BURN = 'deep burn',
    DESTRUCTIVE_SHOT_HIT = 'destructive shot hit',
    DESTRUCTIVE_SHOT = 'destructive shot',
    DEFIANCE = 'defiance',
    SHADOWFALL_1 = 'shadowfall 1',
    SHADOWFALL_2 = 'shadowfall 2',
    SHADOWFALL = 'shadowfall',


    MAGIC_AUTO = 'magic auto',
    IMPACT = 'impact',
    DRAGON_BREATH = 'dragon breath',
    SONIC_WAVE = 'sonic wave',
    SHOCK = 'shock',
    CONCENTRATED_BLAST_1 = 'concentrated blast 1',
    CONCENTRATED_BLAST_2 = 'concentrated blast 2',
    CONCENTRATED_BLAST_3 = 'concentrated blast 3',
    CONCENTRATED_BLAST = 'concentrated blast',
    GREATER_CONCENTRATED_BLAST_1 = 'greater concentrated blast 1',
    GREATER_CONCENTRATED_BLAST_2 = 'greater concentrated blast 2',
    GREATER_CONCENTRATED_BLAST_3 = 'greater concentrated blast 3',
    GREATER_CONCENTRATED_BLAST = 'greater concentrated blast',
    COMBUST_HIT = 'combust hit',
    COMBUST = 'combust',
    CHAIN = 'chain',
    GREATER_CHAIN = 'greater chain',
    MAGMA_TEMPEST_HIT = 'magma tempest hit',
    MAGMA_TEMPEST = 'magma tempest',
    CORRUPTION_BLAST = 'corruption blast',
    CORRUPTION_BLAST_HIT_1 = 'corruption blast hit 1',
    CORRUPTION_BLAST_HIT_2 = 'corruption blast hit 2',
    CORRUPTION_BLAST_HIT_3 = 'corruption blast hit 3',
    CORRUPTION_BLAST_HIT_4 = 'corruption blast hit 4',
    CORRUPTION_BLAST_HIT_5 = 'corruption blast hit 5',
    GREATER_SONIC_WAVE = 'greater sonic wave',
    ASPHYXIATE_HIT = 'asphyxiate hit',
    ASPHYXIATE_LAST_HIT = 'asphyxiate last hit',
    ASPHYXIATE = 'asphyxiate',
    WILD_MAGIC_HIT = 'wild magic hit',
    WILD_MAGIC = 'wild magic',
    SMOKE_CLOUD = 'smoke cloud',
    SMOKE_TENDRILS_1 = 'smoke tendrils 1',
    SMOKE_TENDRILS_2 = 'smoke tendrils 2',
    SMOKE_TENDRILS_3 = 'smoke tendrils 3',
    SMOKE_TENDRILS_4 = 'smoke tendrils 4',
    SMOKE_TENDRILS = 'smoke tendrils',
    OMNIPOWER_REGULAR = 'omnipower regular',
    OMNIPOWER_IGNEOUS_HIT = 'omnipower igneous',
    OMNIPOWER = 'omnipower',
    TSUNAMI = 'tsunami',
    SUNSHINE_DOT = 'sunshine dot',
    SUNSHINE = 'sunshine',
    GREATER_SUNSHINE = 'greater sunshine',
    THE_LAST_COMMAND = 'the last command',
    TEMPEST_OF_ARMADYL_HIT_1 = 'tempest of armadyl hit 1',
    TEMPEST_OF_ARMADYL_HIT_2 = 'tempest of armadyl hit 2',
    TEMPEST_OF_ARMADYL_HIT_3 = 'tempest of armadyl hit 3',
    TEMPEST_OF_ARMADYL_HIT_4 = 'tempest of armadyl hit 4',
    TEMPEST_OF_ARMADYL_HIT_5 = 'tempest of armadyl hit 5',
    TEMPEST_OF_ARMADYL = 'tempest of armadyl',
    INSTABILITY = 'instability',
    CLAWS_OF_GUTHIX = 'claws of guthix',
    IBAN_BLAST = 'iban blast',
    RUNE_FLAME = 'rune flame',
    DEVOUR = 'devour',
    REAP = 'reap',
    SOULFIRE_INITIAL = 'soulfire initial',
    SOULFIRE_BURN = 'soulfire burn',
    SOULFIRE = 'soulfire',
    SARADOMIN_STRIKE = 'saradomin strike',
    POWER_OF_DARKNESS = 'power of darkness',
    FROM_THE_SHADOWS_HIT = 'from the shadows hit',
    FROM_THE_SHADOWS = 'from the shadows',
    FLAMES_OF_ZAMORAK = 'flames of zamorak',
    MIASMIC_BARRAGE = 'miasmic barrage',
    TIME_STRIKE = 'time strike',

    // Melee abilities
    MELEE_AUTO = 'melee auto',
    BACKHAND = 'backhand',
    HAVOC = 'havoc',
    BARGE = 'barge',
    GREATER_BARGE = 'greater barge',
    BLADED_DIVE = 'bladed dive',
    SLAUGHTER_HIT = 'slaughter hit',
    SLAUGHTER = 'slaughter',
    FLURRY_HIT = 'flurry hit',
    FLURRY = 'flurry',
    GREATER_FLURRY_HIT = 'greater flurry hit',
    GREATER_FLURRY = 'greater flurry',
    HURRICANE_1 = 'hurricane 1',
    HURRICANE_2 = 'hurricane 2',
    HURRICANE = 'hurricane',
    BLOODLUST_HURRICANE_HIT = 'bloodlust hurricane hit',
    OVERPOWER_HIT = 'overpower hit',
    OVERPOWER = 'overpower',
    MASSACRE_INITIAL = 'massacre initial',
    MASSACRE_BLEED = 'massacre bleed',
    MASSACRE = 'massacre',
    METEOR_STRIKE = 'meteor strike',
    PUNISH = 'punish',
    DISMEMBER_HIT = 'dismember hit',
    DISMEMBER = 'dismember',
    FURY = 'fury',
    GREATER_FURY = 'greater fury',
    ADAPTIVE_STRIKE_HIT = 'adaptive strike hit',
    ADAPTIVE_STRIKE = 'adaptive strike',
    ADAPTIVE_STRIKE_TH = 'adaptive strike 2h',
    REND = 'rend',
    CHAOS_ROAR = 'chaos roar',
    ASSAULT_HIT = 'assault hit',
    ASSAULT = 'assault',
    PULVERISE = 'pulverise',

    // Melee Special Attacks
    VINE_CALL_INTIAL = 'vine call initial',
    VINE_CALL_AOE = 'vine call aoe',
    VINE_CALL = 'vine call',
    ENERGY_DRAIN = 'energy drain',
    FAVOUR_OF_THE_WAR_GOD = 'favour of the war god',
    ARMADYLS_JUDGEMENT = 'armadyls judgement',
    WARSTRIKE = 'warstrike',
    SUNDER = 'sunder',
    BACKSTAB = 'backstab',
    LIQUEFY = 'liquefy',
    CLOBBER = 'clobber',
    ICY_TEMPEST_1 = 'icy tempest 1',
    ICY_TEMPEST_2 = 'icy tempest 2',
    ICY_TEMPEST = 'icy tempest',
    WEAKEN_SPECIAL_ATTACK = 'weaken special attack',
    POWERSTAB = 'powerstab',
    SLICE_N_DICE_1 = 'slice & dice 1',
    SLICE_N_DICE_2 = 'slice & dice 2',
    SLICE_N_DICE_3 = 'slice & dice 3',
    SLICE_N_DICE = 'slice & dice',
    DRACONIC_PUNCTURE_HIT = 'draconic puncture hit',
    DRACONIC_PUNCTURE = 'draconic puncture',
    SWEEP_HIT = 'sweep hit',
    SWEEP = 'sweep',
    DRACONIC_CLEAVE = 'draconic cleave',
    DRACONIC_BLOW = 'draconic blow',
    DRACONIC_SLASH = 'draconic slash',
    SHOVE = 'shove',
    IGNEOUS_SHOWDOWN_HIT = 'igneous showdown hit',
    IGNEOUS_SHOWDOWN_BONUS = 'igneous showdown bonus',
    IGNEOUS_SHOWDOWN = 'igneous showdown',
    QUICK_SMASH = 'quick smash',
    AIMED_STRIKE = 'aimed strike',
    DISRUPT = 'disrupt',
    GET_OVER_HERE = 'get over here!',
    IMPALE = 'impale',
    HEALING_BLADE = 'healing blade',
    SARADOMINS_LIGHTNING_HIT = 'saradomins lightning hit',
    SARADOMINS_LIGHTNING = 'saradomins lightning',
    OBLITERATE = 'obliterate',
    FEINT = 'feint',
    SPEAR_WALL = 'spear wall',
    SUNFALL_SLAM = 'sunfall slam',
    LESSER_PURIFYING_LIGHT = 'lesser purifying light',
    PURIFYING_LIGHT = 'puyrifying light',
    THE_FINAL_FLURRY_1 = 'the final flurry 1',
    THE_FINAL_FLURRY_2 = 'the final flurry 2',
    THE_FINAL_FLURRY ='the final flurry',
    RAMPAGE = 'rampage',

    ICE_CLEAVE = 'ice cleave',
    BERSERK = 'berserk',
    BLACKHOLE = 'blackhole',

    // perks damage
    AFTERSHOCK_RANGED = 'aftershock ranged',
    AFTERSHOCK_MELEE = 'aftershock melee',
    AFTERSHOCK_MAGIC = 'aftershock magic',
    AFTERSHOCK_NECRO = 'aftershock necro',

    // Defensives
    FREEDOM = 'freedom',
    ANTICIPATION = 'anticipation',
    RESONANCE = 'resonance',
    DIVERT = 'divert',
    PREPARATION = 'preparation',
    REFLECT = 'reflect',
    DEVOTION = 'devotion',
    REVENGE = 'revenge',
    IMMORTALITY = 'immortality',
    BARRICADE = 'barricade',
    NATURAL_INSTINCT = 'natural instinct',
    

    //no gcd abilities
    INGENUITY_OF_THE_HUMANS = 'ingenuity of the humans',
    LIMITLESS = 'limitless',
    DRAGON_SLAYER_ABILITY = 'dragon slayer ability',
    DEMON_SLAYER_ABILITY = 'demon slayer ability',
    UNDEAD_SLAYER_ABILITY = 'undead slayer ability',
    RUNIC_CHARGE = 'runic charge',
    EXSANGUINATE = 'exsanguinate',
    INCITE_FEAR = 'incite fear',
    GLACIAL_EMBRACE_HIT = 'glacial embrace hit',
    SURGE = 'surge',
    ESCAPE = 'escape',
    DIVE = 'dive',
    VENGEANCE = 'vengeance',
    SPELLBOOK_SWAP = 'spellbook swap',
    DISRUPTION_SHIELD = 'disruption shield',
    PRISM_OF_RESTORATION = 'prism of restoration',
    DREADNIP = 'dreadnip',
    DEFLECT_MAGIC = 'deflect magic',
    DEFLECT_MELEE = 'deflect melee',
    DEFLECT_RANGED = 'deflect ranged',
    SOUL_SPLIT = 'soul split',

    // Misc
    POISON_DAMAGE = 'poison damage'
};

export const abils: Record<ABILITIES, AbilityInfo> = {
    [ABILITIES.MELEE_AUTO]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'auto', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    ,
        title: 'Auto',
        icon: '/ability_icons/melee/Attack_ability.png',
    },
    [ABILITIES.BACKHAND]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 15,
        title: 'Backhand',
        icon: '/ability_icons/melee/30x30/backhand.png',
    },
    [ABILITIES.HAVOC]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 10.2},
    [ABILITIES.BARGE]: {
        // ability name
        'min hit': 0.75, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 20.4,
        title: 'Barge',
        icon: '/ability_icons/melee/30x30/barge.png',
    },
    [ABILITIES.GREATER_BARGE]: {
        // ability name
        'min hit': 0.75, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 20.4,
        title: 'Greater barge',
        icon: '/ability_icons/melee/30x30/gbarge.png',
    },
    [ABILITIES.BLADED_DIVE]: {
        // ability name
        'min hit': 0.75, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 20.4,
        title: 'Bladed dive',
        icon: '/ability_icons/melee/30x30/bd.png',
    },
    [ABILITIES.SLAUGHTER_HIT]: {
        // ability name
        'min hit': 0.8, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 30},
    [ABILITIES.SLAUGHTER]: {
        // ability name
        'min hit': 0.8, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        hits: {
            1: [
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT
            ]}
        ,
        adrenaline: 25,
        cooldown: 30,
        hitTimings: [1, 4, 7, 10, 13, 16]
    ,
        title: 'Slaughter',
        icon: '/ability_icons/melee/Slaughter.png',
    },
    [ABILITIES.FLURRY_HIT]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 20.4},
    [ABILITIES.FLURRY]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'duration': 8,
        hits: {
            1: [ABILITIES.FLURRY_HIT],
            2: [ABILITIES.FLURRY_HIT],
            3: [ABILITIES.FLURRY_HIT],
            4: [ABILITIES.FLURRY_HIT],
            5: [ABILITIES.FLURRY_HIT],
            6: [ABILITIES.FLURRY_HIT],
            7: [ABILITIES.FLURRY_HIT],
            8: [ABILITIES.FLURRY_HIT]
        },
        adrenaline: 25,
        cooldown: 20.4,
        hitTimings: [0, 2, 4, 6]
    ,
        title: 'Flurry',
        icon: '/ability_icons/melee/30x30/flurry.png',
    },
    [ABILITIES.GREATER_FLURRY_HIT]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 20.4},
    [ABILITIES.GREATER_FLURRY]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'duration': 8,
        hits: {
            1: [ABILITIES.GREATER_FLURRY_HIT],
            2: [ABILITIES.GREATER_FLURRY_HIT],
            3: [ABILITIES.GREATER_FLURRY_HIT],
            4: [ABILITIES.GREATER_FLURRY_HIT],
            5: [ABILITIES.GREATER_FLURRY_HIT],
            6: [ABILITIES.GREATER_FLURRY_HIT],
            7: [ABILITIES.GREATER_FLURRY_HIT],
            8: [ABILITIES.GREATER_FLURRY_HIT]},
        adrenaline: 25,
        cooldown: 20.4,
        hitTimings: [0, 1, 2, 3, 4, 5, 6, 7]
    ,
        title: 'Greater flurry',
        icon: '/ability_icons/melee/30x30/gflurry.png',
    },
    [ABILITIES.HURRICANE_1]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 20.4},
    [ABILITIES.HURRICANE_2]: {
        // ability name
        'min hit': 1.55, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 20.4},
    [ABILITIES.HURRICANE]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        adrenaline: 25,
        hitTimings: [0, 0],
        hits: {
            1: [ABILITIES.HURRICANE_1, ABILITIES.HURRICANE_2]
        },
        cooldown: 20.4
    ,
        title: 'Hurricane',
        icon: '/ability_icons/melee/30x30/cane.png',
    },
    [ABILITIES.BLOODLUST_HURRICANE_HIT]: {
        'min hit': 0.75,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'proc',
        'ability type': 'threshold',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0},
    [ABILITIES.OVERPOWER_HIT]: {
        // Igneous Overpower hit: 280-340% per hit (2 hits total)
        'min hit': 2.8,
        'var hit': 0.6,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'ultimate',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 30},
    [ABILITIES.OVERPOWER]: {
        // Non-igneous: 520-570% single hit. Igneous: 2x 280-340% hits.
        // Default hit sequence is igneous (swapped at calc time if no cape)
        'min hit': 5.2,
        'var hit': 0.5,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'ultimate',
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.OVERPOWER_HIT, 'next hit', ABILITIES.OVERPOWER_HIT]
        },
        adrenaline: 60,
        hitTimings: [1, 1],
        cooldown: 30
    ,
        title: 'Overpower',
        icon: '/ability_icons/melee/30x30/overpower.png',
    },
    [ABILITIES.MASSACRE_INITIAL]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 60},
    [ABILITIES.MASSACRE_BLEED]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 60},
    [ABILITIES.MASSACRE]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        hits: {
            1: [
                ABILITIES.MASSACRE_INITIAL,
                ABILITIES.MASSACRE_BLEED,
                ABILITIES.MASSACRE_BLEED,
                ABILITIES.MASSACRE_BLEED,
                ABILITIES.MASSACRE_BLEED,
                ABILITIES.MASSACRE_BLEED,
                ABILITIES.MASSACRE_BLEED
            ]
        },
        hitTimings: [1, 2, 6, 10, 14, 18, 22],
        cooldown: 60
    ,
        title: 'Massacre',
        icon: '/ability_icons/melee/Massacre.png',
    },
    [ABILITIES.METEOR_STRIKE]: {
        // ability name
        'min hit': 2.2, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        adrenaline: 60,
        cooldown: 60,
        title: 'Meteor strike',
        icon: '/ability_icons/melee/30x30/meteor.png',
    },
    [ABILITIES.PUNISH]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 24,
        title: 'Punish',
        icon: '/ability_icons/melee/30x30/punish.png',
    },
    [ABILITIES.DISMEMBER_HIT]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 15},
    [ABILITIES.DISMEMBER]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hitTimings: [1, 3, 5, 7, 9, 11, 13, 15],
        hits: {
            1: [
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
            ]
        },
        cooldown: 24
    ,
        title: 'Dismember',
        icon: '/ability_icons/melee/30x30/dismember.png',
    },
    [ABILITIES.FURY]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 15
    ,
        title: 'Fury',
        icon: '/ability_icons/melee/30x30/fury.png',
    },
    [ABILITIES.GREATER_FURY]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 15,
        title: 'Greater fury',
        icon: '/ability_icons/melee/30x30/gfury.png',
    },
    [ABILITIES.ADAPTIVE_STRIKE_HIT]: {
        'min hit': 0.6,
        'var hit': 0.15,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 5.4},
    [ABILITIES.ADAPTIVE_STRIKE]: {
        'min hit': 0.6,
        'var hit': 0.15,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'basic',
        'main style': 'melee',
        'damage type': 'melee',
        hitTimings: [0, 0],
        hits: {
            1: [ABILITIES.ADAPTIVE_STRIKE_HIT, 'next hit', ABILITIES.ADAPTIVE_STRIKE_HIT]
        },
        cooldown: 5.4,
        title: 'Adaptive strike',
        icon: '/ability_icons/melee/Adaptive_Strike.png',
    },
    [ABILITIES.ADAPTIVE_STRIKE_TH]: {
        'min hit': 1.2,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 5.4},
    [ABILITIES.REND]: {
        'min hit': 1.35,
        'var hit': 0.3,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 5.4,
        title: 'Rend',
        icon: '/ability_icons/melee/Rend.png',
    },
    [ABILITIES.CHAOS_ROAR]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 60,
        title: 'Chaos roar',
        icon: '/ability_icons/melee/30x30/roar.png',
    },
    [ABILITIES.ASSAULT_HIT]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 30
    },
    [ABILITIES.ASSAULT]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        'duration': 7,
        hits: {
            1: [ABILITIES.ASSAULT_HIT],
            2: [],
            3: [ABILITIES.ASSAULT_HIT],
            4: [],
            5: [ABILITIES.ASSAULT_HIT],
            6: [],
            7: [ABILITIES.ASSAULT_HIT]
        },
        adrenaline: 25,
        cooldown: 6,
        hitTimings: [0, 2, 4, 6]
    ,
        title: 'Assault',
        icon: '/ability_icons/melee/30x30/assault.png',
    },
    [ABILITIES.PULVERISE]: {
        // ability name
        'min hit': 3.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 60,
        cooldown: 60,
        title: 'Pulverise',
        icon: '/ability_icons/melee/30x30/pulverise.png',
    },
    [ABILITIES.VINE_CALL_INTIAL]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.VINE_CALL_AOE]: {
        // ability name
        'min hit': 0.2, // min % of abil expressed as a decimal
        'var hit': 0.05,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'grounded', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.VINE_CALL]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 60,
        hits: {
            1: [ABILITIES.VINE_CALL_INTIAL],
            2: [],
            3: [ABILITIES.VINE_CALL_AOE],
            4: [],
            5: [],
            6: [ABILITIES.VINE_CALL_AOE],
            7: [],
            8: [],
            9: [ABILITIES.VINE_CALL_AOE],
            10: [],
            11: [],
            12: [ABILITIES.VINE_CALL_AOE],
            13: [],
            14: [],
            15: [ABILITIES.VINE_CALL_AOE],
            16: [],
            17: [],
            18: [ABILITIES.VINE_CALL_AOE],
            19: [],
            20: [],
            21: [ABILITIES.VINE_CALL_AOE],
            22: [],
            23: [],
            24: [ABILITIES.VINE_CALL_AOE],
            25: [],
            26: [],
            27: [ABILITIES.VINE_CALL_AOE],
            28: [],
            29: [],
            30: [ABILITIES.VINE_CALL_AOE]
        },
        cooldown: 0
    },
    [ABILITIES.ENERGY_DRAIN]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    ,
        title: 'Energy Drain',
        icon: '/ability_icons/melee/30x30/abyssal_whip.png',
        common: false
    },
    [ABILITIES.FAVOUR_OF_THE_WAR_GOD]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    ,
        title: 'Favour of the War God',
        icon: '/ability_icons/melee/30x30/ancient_mace.png',
        common: false
    },
    [ABILITIES.ARMADYLS_JUDGEMENT]: {
        // ability name
        'min hit': 4.0, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0,
        title: 'Armadyl\'s judgement',
        icon: '/ability_icons/melee/ags.png',
        common: false
    },
    [ABILITIES.WARSTRIKE]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0
    ,
        title: 'Warstrike',
        icon: '/ability_icons/melee/30x30/bandos_godsword.png',
        common: false
    },
    [ABILITIES.SUNDER]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0
    ,
        title: 'Sunder',
        icon: '/ability_icons/melee/30x30/barrelchest_anchor.png',
        common: false
    },
    [ABILITIES.BACKSTAB]: {
        // ability name
        'min hit': 1.5, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    ,
        title: 'Backstab',
        icon: '/ability_icons/melee/30x30/bone_dagger.png',
        common: false
    },
    [ABILITIES.LIQUEFY]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    ,
        title: 'Liquefy',
        icon: '/ability_icons/melee/30x30/brine_sabre.png',
        common: false
    },
    [ABILITIES.CLOBBER]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Clobber',
        icon: '/ability_icons/melee/30x30/dragon_hatchet.png',
        common: false
    },
    [ABILITIES.ICY_TEMPEST_1]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0},
    [ABILITIES.ICY_TEMPEST_2]: {
        // ability name
        'min hit': 1.75, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    },
    [ABILITIES.ICY_TEMPEST]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.ICY_TEMPEST_1, 'next hit', ABILITIES.ICY_TEMPEST_2]
        },
        adrenaline: 30,
        hitTimings: [0, 0], 
        cooldown: 15,
        title: 'Icy tempest',
        icon: '/ability_icons/melee/leng.png',
    },
    [ABILITIES.WEAKEN_SPECIAL_ATTACK]: {
        // ability name
        'min hit': 0.75, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0,
        title: 'Weaken',
        icon: '/ability_icons/melee/30x30/darklight.png',
        common: false
    },
    [ABILITIES.POWERSTAB]: {
        // ability name
        'min hit': 2.6, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Powerstab',
        icon: '/ability_icons/melee/30x30/dragon_2h_sword.png',
        common: false
    },
    [ABILITIES.SLICE_N_DICE_1]: {
        // ability name
        'min hit': 1.8, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 3},
    [ABILITIES.SLICE_N_DICE_2]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 3},
    [ABILITIES.SLICE_N_DICE_3]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 3},
    [ABILITIES.SLICE_N_DICE]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [
                ABILITIES.SLICE_N_DICE_1,
                'next hit',
                ABILITIES.SLICE_N_DICE_2,
                'next hit',
                ABILITIES.SLICE_N_DICE_3,
                'next hit',
                ABILITIES.SLICE_N_DICE_3
            ]
        },
        hitTimings: [0, 1, 1, 1],
        cooldown: 3,
        adrenaline: 50
    ,
        title: 'Slice & dice',
        icon: '/ability_icons/melee/30x30/dclaw-bg.png',
    },
    [ABILITIES.DRACONIC_PUNCTURE_HIT]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.DRACONIC_PUNCTURE]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.DRACONIC_PUNCTURE_HIT, 'next hit', ABILITIES.DRACONIC_PUNCTURE_HIT]
        },
        hitTimings: [1, 1],
        cooldown: 0,
        adrenaline: 25
    ,
        title: 'Draconic Puncture',
        icon: '/ability_icons/melee/dds.png',
        common: false
    },
    [ABILITIES.SWEEP_HIT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.SWEEP]: {
        // ability name
        'min hit': 1.05, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 30,
        hits: {
            1: [ABILITIES.SWEEP_HIT, 'next hit', ABILITIES.SWEEP_HIT]
        },
        hitTimings: [1, 1], //Todo fix
        cooldown: 0
    ,
        title: 'Sweep',
        icon: '/ability_icons/melee/30x30/dhally.png',
        common: false
    },
    [ABILITIES.DRACONIC_CLEAVE]: {
        // ability name
        'min hit': 2.75, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 7.2,
        title: 'Draconic Cleave',
        icon: '/ability_icons/melee/30x30/dlong-bg.png',
        common: false
    },
    [ABILITIES.DRACONIC_BLOW]: {
        // ability name
        'min hit': 2.4, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Draconic Blow',
        icon: '/ability_icons/melee/dmace.png',
        common: false
    },
    [ABILITIES.DRACONIC_SLASH]: {
        // ability name
        'min hit': 2.4, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Draconic Slash',
        icon: '/ability_icons/melee/30x30/dragon_scimitar.png',
        common: false
    },
    [ABILITIES.SHOVE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0},
    [ABILITIES.IGNEOUS_SHOWDOWN_HIT]: {
        'min hit': 2.6,
        'var hit': 0.4,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'special attack',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0,
    },
    [ABILITIES.IGNEOUS_SHOWDOWN_BONUS]: {
        'min hit': 2.45,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'special attack',
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0,
    },
    [ABILITIES.IGNEOUS_SHOWDOWN]: {
        'min hit': 2.6,
        'var hit': 0.4,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'special attack',
        'main style': 'melee',
        'damage type': 'melee',
        'hits': {
            1: [ABILITIES.IGNEOUS_SHOWDOWN_HIT]
        },
        hitTimings: [1],
        adrenaline: 50,
        cooldown: 60,
    
        title: 'Igneous showdown',
        icon: '/ability_icons/melee/30x30/ezk-bg.png',
    },
    [ABILITIES.QUICK_SMASH]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 10.2,
        title: 'Quick smash',
        icon: '/ability_icons/melee/30x30/gmaul-bg.png',
        common: false
    },
    [ABILITIES.AIMED_STRIKE]: {
        // ability name
        'min hit': 1.5, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Aimed strike',
        icon: '/ability_icons/melee/30x30/keenblade.png',
        common: false
    },
    [ABILITIES.DISRUPT]: {
        // ability name
        'min hit': 2.3, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'magic'
    ,
        cooldown: 0,
        title: 'Disrupt',
        icon: '/ability_icons/melee/30x30/korasis_sword.png',
        common: false
    },
    [ABILITIES.GET_OVER_HERE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.IMPALE]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Impale',
        icon: '/ability_icons/melee/30x30/rune_claws.png',
        common: false
    },
    [ABILITIES.HEALING_BLADE]: {
        // ability name
        'min hit': 1.85, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Healing Blade',
        icon: '/ability_icons/melee/30x30/saradomin_godsword.png',
        common: false
    },
    [ABILITIES.SARADOMINS_LIGHTNING_HIT]: {
        // ability name
        'min hit': 2.85, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.SARADOMINS_LIGHTNING]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.SARADOMINS_LIGHTNING_HIT, 'next hit', ABILITIES.SARADOMINS_LIGHTNING_HIT]
        },
        hitTimings: [2, 2], // TODO fix
        adrenaline: 100,
        cooldown: 0
    ,
        title: 'Saradomin\'s Lightning',
        icon: '/ability_icons/melee/30x30/saradomin_sword.png',
        common: false
    },
    [ABILITIES.OBLITERATE]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 35
    ,
        cooldown: 0,
        title: 'Obliterate',
        icon: '/ability_icons/melee/30x30/statius_warhammer.png',
        common: false
    },
    [ABILITIES.FEINT]: {
        // ability name
        'min hit': 2.55, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 25,
        cooldown: 0,
        title: 'Feint',
        icon: '/ability_icons/melee/30x30/vls.png',
        common: false
    },
    [ABILITIES.SPEAR_WALL]: {
        // ability name
        'min hit': 1.05, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 0,
        title: 'Spear Wall',
        icon: '/ability_icons/melee/30x30/vestas_spear.png',
        common: false
    },
    [ABILITIES.ICE_CLEAVE]: {
        // ability name
        'min hit': 1.85, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 7.2,
        title: 'Ice Cleave',
        icon: '/ability_icons/melee/30x30/zamorak_godsword.png',
        common: false
    },
    [ABILITIES.SUNFALL_SLAM]: {
        // ability name
        'min hit': 2.9, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        title: 'Sunfall Slam',
        icon: '/gear_icons/melee/tumeken\'s light.png',
    },
    [ABILITIES.LESSER_PURIFYING_LIGHT]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    },
    [ABILITIES.PURIFYING_LIGHT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        title: 'Purifying Light',
    },
    [ABILITIES.THE_FINAL_FLURRY_1]: {
        'min hit': 0.8,
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 0,
    },
    [ABILITIES.THE_FINAL_FLURRY_2]: {
        'min hit': 1.5,
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 0,
    },
    [ABILITIES.THE_FINAL_FLURRY]: {
        'min hit': 0.85,
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        hits: {
            1: [ABILITIES.THE_FINAL_FLURRY_1, 'next hit', ABILITIES.THE_FINAL_FLURRY_1,
                'next hit', ABILITIES.THE_FINAL_FLURRY_2
            ]
        }
    ,
        title: 'The Final Flurry',
        icon: '/gear_icons/melee/varanus\'s mercy.png',
    },
    [ABILITIES.RAMPAGE]: {
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 100,
        cooldown: 0,
        title: 'Rampage',
        icon: '/gear_icons/melee/dragon battleaxe.png',
    },
    [ABILITIES.BERSERK]: {
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 100,
        cooldown: 60,
        title: 'Berserk',
        icon: '/ability_icons/melee/berserk.webp',
    },
    [ABILITIES.BLACKHOLE]: {
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Blackhole',
        icon: '/ability_icons/melee/blackhole.webp',
    },

    [ABILITIES.MAGIC_AUTO]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0,
        title: 'Auto',
        icon: '/ability_icons/magic/Magic_ability.png',
    },
    [ABILITIES.IMPACT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,
        title: 'Impact',
        icon: '/ability_icons/magic/30x30/impact.png',
        common: false
    },
    [ABILITIES.DRAGON_BREATH]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 7.2,
        title: 'Dragon breath',
        icon: '/ability_icons/magic/30x30/dragon_breath.png',
    },
    [ABILITIES.SONIC_WAVE]: {
        // ability name
        'min hit': 0.90, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,
        title: 'Sonic wave',
        icon: '/ability_icons/magic/30x30/sonic_wave.png',
        common: false
    },
    [ABILITIES.SHOCK]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 15},
    [ABILITIES.CONCENTRATED_BLAST_1]: {
        // ability name
        'min hit': 0.30, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 5.4},
    [ABILITIES.CONCENTRATED_BLAST_2]: {
        // ability name
        'min hit': 0.30, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 5.4},
    [ABILITIES.CONCENTRATED_BLAST_3]: {
        // ability name
        'min hit': 0.30, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 5.4},
    [ABILITIES.CONCENTRATED_BLAST]: {
        // ability name
        'min hit': 0.30, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.CONCENTRATED_BLAST_1],
            2: [ABILITIES.CONCENTRATED_BLAST_2],
            3: [ABILITIES.CONCENTRATED_BLAST_3]
        },
        cooldown: 5.4
    ,
        title: 'Concentrated blast',
        icon: '/ability_icons/magic/30x30/concentrated_blast.png',
        common: false
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_1]: {
        // ability name
        'min hit': 0.40, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_2]: {
        // ability name
        'min hit': 0.40, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic', // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_3]: {
        // ability name
        'min hit': 0.40, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
        },
    [ABILITIES.GREATER_CONCENTRATED_BLAST]: {
        // ability name
        'min hit': 0.40, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.GREATER_CONCENTRATED_BLAST_1],
            2: [ABILITIES.GREATER_CONCENTRATED_BLAST_2],
            3: [ABILITIES.GREATER_CONCENTRATED_BLAST_3]
        },
        cooldown: 5.4
    ,
        title: 'Gconc',
        icon: '/ability_icons/magic/30x30/greater_concentrated_blast.png',
    },
    [ABILITIES.COMBUST_HIT]: {
        // ability name
        'min hit': 0.27, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'burn', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 18},
    [ABILITIES.COMBUST]: {
        // ability name
        'min hit': 0.27, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'burn', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT,
                ABILITIES.COMBUST_HIT
            ]
        },
        cooldown: 18,
        hitTimings: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]
    ,
        title: 'Combust',
        icon: '/ability_icons/magic/30x30/combust.png',
    },
    [ABILITIES.CHAIN]: {
        // ability name
        'min hit': 0.70, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 10.2,
        title: 'Chain',
        icon: '/ability_icons/magic/30x30/chain.png',
        common: false
    },
    [ABILITIES.GREATER_CHAIN]: {
        // ability name
        'min hit': 0.80, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 10.2,
        title: 'Greater chain',
        icon: '/ability_icons/magic/30x30/greater_chain.png',
    },
    [ABILITIES.MAGMA_TEMPEST_HIT]: {
        // ability name
        'min hit': 0.35, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 21},
    [ABILITIES.MAGMA_TEMPEST]: {
        // ability name
        'min hit': 0.35, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 20,
        hits: {
            1: [ABILITIES.MAGMA_TEMPEST_HIT],
            2: [ABILITIES.MAGMA_TEMPEST_HIT],
            3: [ABILITIES.MAGMA_TEMPEST_HIT],
            4: [ABILITIES.MAGMA_TEMPEST_HIT],
            5: [ABILITIES.MAGMA_TEMPEST_HIT],
            6: [ABILITIES.MAGMA_TEMPEST_HIT],
            7: [ABILITIES.MAGMA_TEMPEST_HIT],
            8: [ABILITIES.MAGMA_TEMPEST_HIT]
        },
        cooldown: 21,
        hitTimings: [3, 5, 7, 9, 11, 13, 15, 17]
    ,
        title: 'Magma tempest',
        icon: '/ability_icons/magic/30x30/magma_tempest.png',
    },
    [ABILITIES.CORRUPTION_BLAST]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 20,
        hits: {
            1: [
                ABILITIES.CORRUPTION_BLAST_HIT_1,
                ABILITIES.CORRUPTION_BLAST_HIT_2,
                ABILITIES.CORRUPTION_BLAST_HIT_3,
                ABILITIES.CORRUPTION_BLAST_HIT_4,
                ABILITIES.CORRUPTION_BLAST_HIT_5
            ]
        },
        cooldown: 15,
        hitTimings: [1, 3, 5, 7, 9],
    
        title: 'Corruption blast',
        icon: '/ability_icons/magic/30x30/corruption_blast.png',
    },
    [ABILITIES.CORRUPTION_BLAST_HIT_1]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_BLAST_HIT_2]: {
        // ability name
        'min hit': 0.72, // min % of abil expressed as a decimal
        'var hit': 0.16,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_BLAST_HIT_3]: {
        // ability name
        'min hit': 0.576, // min % of abil expressed as a decimal
        'var hit': 0.128,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_BLAST_HIT_4]: {
        // ability name
        'min hit': 0.4608, // min % of abil expressed as a decimal
        'var hit': 0.1024,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_BLAST_HIT_5]: {
        // ability name
        'min hit': 0.36864, // min % of abil expressed as a decimal
        'var hit': 0.08192,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,},
    [ABILITIES.GREATER_SONIC_WAVE]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15,
        title: 'Greater sonic wave',
        icon: '/ability_icons/magic/30x30/greater_sonic_wave.png',
    },
    [ABILITIES.ASPHYXIATE_HIT]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 5.4},
    [ABILITIES.ASPHYXIATE_LAST_HIT]: {
        'min hit': 1.1,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
    },
    [ABILITIES.ASPHYXIATE]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 25,
        'duration': 7,
        hits: {
            1: [ABILITIES.ASPHYXIATE_HIT],
            2: [],
            3: [ABILITIES.ASPHYXIATE_HIT],
            4: [],
            5: [ABILITIES.ASPHYXIATE_HIT],
            6: [],
            7: [ABILITIES.ASPHYXIATE_LAST_HIT]
        },
        cooldown: 5.4
    ,
        title: 'Asphyxiate',
        icon: '/ability_icons/magic/30x30/asphyxiate.png',
    },
    [ABILITIES.WILD_MAGIC_HIT]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 5.4},
    [ABILITIES.WILD_MAGIC]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 25,
        hits: {
            1: [ABILITIES.WILD_MAGIC_HIT, 'next hit', ABILITIES.WILD_MAGIC_HIT]
        },
        cooldown: 5.4,
        hitTimings: [2, 2]
    ,
        title: 'Wild magic',
        icon: '/ability_icons/magic/30x30/wild_magic.png',
    },
    [ABILITIES.SMOKE_CLOUD]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 0,
        cooldown: 0,
        title: 'Smoke cloud',
        icon: '/effect_icons/smoke_cloud.png',
    },
    [ABILITIES.SMOKE_TENDRILS_1]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 45},
    [ABILITIES.SMOKE_TENDRILS_2]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.15,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 45},
    [ABILITIES.SMOKE_TENDRILS_3]: {
        // ability name
        'min hit': 0.75, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 45},
    [ABILITIES.SMOKE_TENDRILS_4]: {
        // ability name
        'min hit': 0.85, // min % of abil expressed as a decimal
        'var hit': 0.25,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 45},
    [ABILITIES.SMOKE_TENDRILS]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        'duration': 7,
        hits: {
            1: [ABILITIES.SMOKE_TENDRILS_1],
            2: [],
            3: [ABILITIES.SMOKE_TENDRILS_2],
            4: [],
            5: [ABILITIES.SMOKE_TENDRILS_3],
            6: [],
            7: [ABILITIES.SMOKE_TENDRILS_4]
        },
        cooldown: 45
    ,
        title: 'Smoke tendrils',
        icon: '/ability_icons/magic/30x30/smoke_tendrils.png',
    },
    [ABILITIES.OMNIPOWER_REGULAR]: {
        // ability name
        'min hit': 4.2, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 30},
    [ABILITIES.OMNIPOWER_IGNEOUS_HIT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 30},
    [ABILITIES.OMNIPOWER]: {
        // ability name
        'min hit': 4.2, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 60,
        hits: {
            1: [ABILITIES.OMNIPOWER_IGNEOUS_HIT, "next hit", ABILITIES.OMNIPOWER_IGNEOUS_HIT, "next hit", ABILITIES.OMNIPOWER_IGNEOUS_HIT, "next hit", ABILITIES.OMNIPOWER_IGNEOUS_HIT]
        },
        cooldown: 30,
        hitTimings: [0, 0, 0, 0]
    ,
        title: 'Omnipower',
        icon: '/ability_icons/magic/30x30/omnipower.png',
    },
    [ABILITIES.THE_LAST_COMMAND]: {
        'min hit': 2.4,
        'var hit': 0.4,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'special attack',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 0
    },
    [ABILITIES.TSUNAMI]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 60,
        title: 'Tsunami',
        icon: '/ability_icons/magic/30x30/tsunami.png',
    },
    [ABILITIES.SUNSHINE_DOT]: {
        // ability name
        'min hit': 0.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 60},
    [ABILITIES.SUNSHINE]: {
        //TODO check number of dot hits
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: new Array(17).fill(ABILITIES.SUNSHINE_DOT)
           },
        cooldown: 60,
        hitTimings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]//TODO Find out what these actually are
    ,
        title: 'Sunshine',
        icon: '/ability_icons/magic/Sunshine.png',
    },
    [ABILITIES.GREATER_SUNSHINE]: {
        //TODO check number of dot hits
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: new Array(17).fill(ABILITIES.SUNSHINE_DOT)
        },
        cooldown: 60,
        hitTimings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]//TODO Find out what these actually are
    ,
        title: 'Greater Sunshine',
        icon: '/ability_icons/magic/Greater_Sunshine.png',
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_1]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_2]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_3]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_4]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_5]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.TEMPEST_OF_ARMADYL]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.TEMPEST_OF_ARMADYL_HIT_1],
            2: [ABILITIES.TEMPEST_OF_ARMADYL_HIT_2],
            3: [ABILITIES.TEMPEST_OF_ARMADYL_HIT_3],
            4: [ABILITIES.TEMPEST_OF_ARMADYL_HIT_4],
            5: [ABILITIES.TEMPEST_OF_ARMADYL_HIT_5]
        },
        cooldown: 0,
        hitTimings: [0, 1, 2, 3, 4],
        duration: 5,
        adrenaline: 50
    ,
        title: 'Tempest of Armadyl',
        icon: '/ability_icons/magic/30x30/armadyl_battlestaff-bg.png',
    },
    [ABILITIES.INSTABILITY]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Instability',
        icon: '/ability_icons/magic/Fractured_Staff_of_Armadyl.webp',
    },
    [ABILITIES.CLAWS_OF_GUTHIX]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 25
    ,
        cooldown: 0,
        title: 'Claws of Guthix',
        icon: '/ability_icons/magic/30x30/guthix_staff-bg.png',
    },
    [ABILITIES.IBAN_BLAST]: {
        // ability name
        'min hit': 3.4, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Iban blast',
        icon: '/ability_icons/magic/30x30/iban_staff.png',
        common: false
    },
    [ABILITIES.RUNE_FLAME]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 35
    ,
        cooldown: 0,
        title: 'Rune flame',
        icon: '/ability_icons/magic/30x30/mindspike.png',
        common: false
    },
    [ABILITIES.DEVOUR]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Devour',
        icon: '/ability_icons/magic/30x30/obliteration.png',
        common: false
    },
    [ABILITIES.REAP]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 45
    ,
        cooldown: 0,
        title: 'Reap',
        icon: '/ability_icons/magic/30x30/penance_trident.png',
        common: false
    },
    [ABILITIES.SOULFIRE_INITIAL]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.SOULFIRE_BURN]: {
        // ability name
        'min hit': 1.7, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'burn', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.SOULFIRE]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1, 
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'burn', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [
                ABILITIES.SOULFIRE_INITIAL,
                ABILITIES.SOULFIRE_BURN,
                ABILITIES.SOULFIRE_BURN,
                ABILITIES.SOULFIRE_BURN,
                ABILITIES.SOULFIRE_BURN,
                ABILITIES.SOULFIRE_BURN,
                ABILITIES.SOULFIRE_BURN,
            ]//2509, 3840
        },
        cooldown: 0,
        hitTimings: [0, 3, 6, 9, 12, 15, 18],
        adrenaline: 35
    ,
        title: 'Soulfire',
        icon: '/ability_icons/magic/30x30/roar_of_awakening.png',
    },
    [ABILITIES.SARADOMIN_STRIKE]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 25
    ,
        cooldown: 0,
        title: 'Saradomin strike',
        icon: '/ability_icons/magic/30x30/saradomin_staff.png',
        common: false
    },
    [ABILITIES.FROM_THE_SHADOWS_HIT]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.FROM_THE_SHADOWS]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [
                ABILITIES.FROM_THE_SHADOWS_HIT,
                ABILITIES.FROM_THE_SHADOWS_HIT,
                ABILITIES.FROM_THE_SHADOWS_HIT,
                ABILITIES.FROM_THE_SHADOWS_HIT,
                ABILITIES.FROM_THE_SHADOWS_HIT
            ]
        },
        cooldown: 0,
        hitTimings: [2, 4, 6, 8, 10],
        adrenaline: 50
    ,
        title: 'From the shadows',
        icon: '/ability_icons/magic/30x30/staff_of_sliske.png',
    },
    [ABILITIES.FLAMES_OF_ZAMORAK]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 25
    ,
        cooldown: 0,
        title: 'Flames of Zamorak',
        icon: '/ability_icons/magic/30x30/zamorak_staff.png',
        common: false
    },
    [ABILITIES.MIASMIC_BARRAGE]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Miasmic barrage',
        icon: '/ability_icons/magic/30x30/zuriels_staff.png',
        common: false
    },

    [ABILITIES.NECRO_AD]: {
        'main style': 'necromancy'
    },
    [ABILITIES.NECRO_AUTO]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0,
        title: 'Necro auto',
        icon: '/ability_icons/necro/30x30/auto.png',
    },
    [ABILITIES.TOUCH_OF_DEATH]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 14.4,
        title: 'Touch of Death',
        icon: '/ability_icons/necro/30x30/tod.png',
    },
    [ABILITIES.FINGER_OF_DEATH]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 60,
        cooldown: 0,
        title: 'Finger of death',
        icon: '/ability_icons/necro/30x30/FOD.png',
    },
    [ABILITIES.SOUL_SAP]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 5.4,
        title: 'Soul sap',
        icon: '/ability_icons/necro/30x30/soul-sap.png',
    },
    [ABILITIES.CONJURE_UNDEAD_ARMY]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'conjure',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 0,
        cooldown: 60
    ,
        title: 'Conjure Undead Army',
        icon: '/ability_icons/necro/30x30/conj-undead-army.png',
    },
    [ABILITIES.CONJURE_SKELETON_WARRIOR]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'conjure',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 0,
        cooldown: 60
    ,
        title: 'Conjure Skeleton Warrior',
        icon: '/ability_icons/necro/30x30/conj-skele.png',
    },
    [ABILITIES.SKELETON_WARRIOR_AUTO]: {
        // ability name
        'min hit': 0.22, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 0},
    [ABILITIES.COMMAND_SKELETON_WARRIOR]: {
        // Command Skeleton Warrior: 10x 22-28% hits over 6s (2 hits every 1.2s)
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'conjure',
        'ability type': 'basic',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 15
    ,
        title: 'Command Skeleton Warrior',
        icon: '/ability_icons/necro/30x30/comm-skele.png',
    },
    [ABILITIES.SKELETON_WARRIOR_AUTO_10]: {
        // ability name
        'min hit': 0.22, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit',
        hits: {
            1: [ABILITIES.SKELETON_WARRIOR_AUTO],
            2: [ABILITIES.SKELETON_WARRIOR_AUTO],
            3: [ABILITIES.SKELETON_WARRIOR_AUTO],
            4: [ABILITIES.SKELETON_WARRIOR_AUTO],
            5: [ABILITIES.SKELETON_WARRIOR_AUTO],
            6: [ABILITIES.SKELETON_WARRIOR_AUTO],
            7: [ABILITIES.SKELETON_WARRIOR_AUTO],
            8: [ABILITIES.SKELETON_WARRIOR_AUTO],
            9: [ABILITIES.SKELETON_WARRIOR_AUTO],
            10: [ABILITIES.SKELETON_WARRIOR_AUTO]
        },
        cooldown: 0
    },
    [ABILITIES.CONJURE_VENGEFUL_GHOST]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 60
    ,
        title: 'Conjure Vengeful Ghost',
        icon: '/ability_icons/necro/30x30/ghost.png',
    },
    [ABILITIES.VENGEFUL_GHOST_AUTO]: {
        // ability name
        'min hit': 0.18, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0},
    [ABILITIES.CONJURE_PUTRID_ZOMBIE]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 60
    ,
        title: 'Conjure Putrid Zombie',
        icon: '/ability_icons/necro/30x30/conj-zom.png',
    },
    [ABILITIES.PUTRID_ZOMBIE_AUTO]: {
        // ability name
        'min hit': 0.18, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0},
    [ABILITIES.PUTRID_ZOMBIE_POISON]: {
        // Putrid Zombie fetid stench: 8-12% poison damage every 1.8s
        'min hit': 0.08,
        'var hit': 0.04,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'conjure',
        'ability type': 'conjure',
        'main style': 'necromancy',
        'damage type': 'poison',
        cooldown: 0
    },
    [ABILITIES.CONJURE_PHANTOM_GUARDIAN]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 60
    ,
        title: 'Conjure Phantom Guardian',
        icon: '/ability_icons/necro/30x30/command_phantom_guardian.png',
    },
    [ABILITIES.COMMAND_PUTRID_ZOMBIE]: {
        // Command Putrid Zombie: single 360-440% spirit damage explosion
        'min hit': 3.6,
        'var hit': 0.8,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'basic',
        'main style': 'necromancy',
        'damage type': 'spirit',
        cooldown: 15
    ,
        title: 'Command Putrid Zombie',
        icon: '/ability_icons/necro/30x30/comm-zom.png',
    },
    [ABILITIES.LIFE_TRANSFER]: {
        // Life Transfer: extends active conjure durations by 21s, costs 50% base LP
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 0
    ,
        title: 'Life Transfer',
        icon: '/ability_icons/necro/incantations/Life_Transfer.png',
    },
    [ABILITIES.THREADS_OF_FATE]: {
        // Threads of Fate: single-target necro attacks also hit up to 4 additional enemies, 6.6s
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 0
    ,
        title: 'Threads of Fate',
        icon: '/ability_icons/necro/incantations/Threads_of_Fate_icon.png',
    },
    [ABILITIES.INVOKE_DEATH]: {
        // Invoke Death: applies Death Mark on next necro attack, 12s duration
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 0
    ,
        title: 'Invoke Death',
        icon: '/ability_icons/necro/incantations/Invoke_Death_icon.png',
    },
    [ABILITIES.SPLIT_SOUL_NECRO]: {
        // Split Soul (Necromancy incantation): 20.4s duration, 60s cooldown
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 60
    ,
        title: 'Split Soul',
        icon: '/ability_icons/necro/incantations/Split_Soul_icon.png',
    },
    [ABILITIES.COMMAND_VENGEFUL_GHOST]: {
        // Command Vengeful Ghost: applies Haunted debuff (10% bonus damage, capped at 20% necro AD)
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'conjure',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        cooldown: 15
    ,
        title: 'Command Vengeful Ghost',
        icon: '/ability_icons/necro/30x30/ghost.png',
    },
    [ABILITIES.COMMAND_PHANTOM_GUARDIAN]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 9,
        title: 'Command Phantom Guardian',
        icon: '/ability_icons/necro/30x30/command_phantom_guardian.png',
    },
    [ABILITIES.BLOAT]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        adrenaline: 20,
        cooldown: 0,
        title: 'Bloat',
        icon: '/ability_icons/necro/30x30/bloat.png',
    },
    [ABILITIES.DEATHSKULLS]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        adrenaline: 60,
        cooldown: 60},
    [ABILITIES.DEATHSKULLS_4]: {
        // Death Skulls - single target, igneous (4 damaging hits: M→P→M→P→M→P→M)
        // Non-igneous swapped at calc time to 3 hits (M→P→M→P→M)
        'min hit': 2.25,
        'var hit': 0.5,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'ultimate',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS
            ]
        },
        adrenaline: 60,
        hitTimings: [0, 2, 4, 6],
        cooldown: 60
    ,
        title: 'Death Skulls',
        icon: '/ability_icons/necro/30x30/skulls.png',
    },
    [ABILITIES.DEATHSKULLS_7]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS,
                ABILITIES.DEATHSKULLS
            ]
        },
        adrenaline: 60,
        cooldown: 0
    },
    [ABILITIES.SOUL_CRUSH]: {
        'min hit': 1.35,
        'var hit': 0.3,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'special attack',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 25,
        cooldown: 60,
        title: 'Soul Crush',
        icon: '/gear_icons/necro/devourer\'s guard.png',
    },
    [ABILITIES.SOUL_STRIKE]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        adrenaline: 0,
        cooldown: 0,
        title: 'Soul Strike Main',
        icon: '/ability_icons/necro/30x30/soul_strike.png',
    },
    [ABILITIES.SOUL_STRIKE_AOE]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 0,
        title: 'Soul strike aoe',
        icon: '/ability_icons/necro/30x30/soul_strike.png',
    },
    [ABILITIES.VOLLEY_OF_SOULS]: {
        // ability name - single hit component used by multihit
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 0,
        cooldown: 0},
    [ABILITIES.VOLLEY_OF_SOULS_DYNAMIC]: {
        // Volley of Souls with dynamic hits based on residual souls
        // Total hits = residual souls (minimum 2 required to cast)
        'min hit': 1.35,
        'var hit': 0.3,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'threshold',
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [] // Built dynamically by get_hit_sequence based on residual souls
        },
        cooldown: 0,
        adrenaline: 0,
        title: 'Volley of souls',
        icon: '/ability_icons/necro/30x30/volley-2.png',
    },
    [ABILITIES.VOLLEY_OF_SOULS_2]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [ABILITIES.VOLLEY_OF_SOULS, 'next hit', ABILITIES.VOLLEY_OF_SOULS]
        },
        adrenaline: 0,
        cooldown: 0
    },
    [ABILITIES.VOLLEY_OF_SOULS_3]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS
            ]
        },
        adrenaline: 0,
        cooldown: 0
    },
    [ABILITIES.VOLLEY_OF_SOULS_4]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS
            ]
        },
        adrenalien: 0,
        cooldown: 0
    },
    [ABILITIES.VOLLEY_OF_SOULS_5]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS,
                'next hit',
                ABILITIES.VOLLEY_OF_SOULS
            ]
        },
        adrenaline: 0,
        cooldown: 0
    },
    [ABILITIES.BLOOD_SIPHON]: {
        // ability name
        'min hit': 1.17, // min % of abil expressed as a decimal
        'var hit': 0.26,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 0,
        cooldown: 45,
        title: 'Blood siphon',
        icon: '/ability_icons/necro/30x30/blood-siphon.png',
    },
    [ABILITIES.SPECTRAL_SCYTHE_1]: {
        // ability name
        'min hit': 0.72, // min % of abil expressed as a decimal
        'var hit': 0.16,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 10,
        cooldown: 0,
        title: 'Spectral scythe 1',
        icon: '/ability_icons/necro/30x30/scyth-1.png',
    },
    [ABILITIES.SPECTRAL_SCYTHE_2]: {
        // ability name
        'min hit': 1.8, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 20,
        cooldown: 0,
        title: 'Spectral scythe 2',
        icon: '/ability_icons/necro/30x30/scyth-2.png',
    },
    [ABILITIES.SPECTRAL_SCYTHE_3]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 30,
        cooldown: 0,
        title: 'Spectral scythe 3',
        icon: '/ability_icons/necro/30x30/scyth-3.png',
    },
    [ABILITIES.DEATH_GRASP]: {
        // ability name
        'min hit': 4.05, // min % of abil expressed as a decimal
        'var hit': 0.9,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 25,
        cooldown: 30,
        title: 'Death Grasp',
        icon: '/ability_icons/necro/30x30/deathguard-bg.png',
    },
    [ABILITIES.DEATH_ESSENCE]: {
        // ability name
        'min hit': 3.6, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 30,
        cooldown: 0,
        title: 'Death essence',
        icon: '/ability_icons/necro/30x30/omniguard-bg.png',
    },
    [ABILITIES.LIVING_DEATH]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        adrenaline: 100,
        cooldown: 90,
        title: 'Living Death',
        icon: '/effect_icons/living_death.png',
    },

    [ABILITIES.RANGED_AUTO]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'auto', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 0,
        title: 'Auto Attack',
        icon: '/ability_icons/ranged/Ranged_ability.png',
    },
    [ABILITIES.PIERCING_SHOT_HIT]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 3},
    [ABILITIES.PIERCING_SHOT]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [1, 1],
        hits: {
            1: [ABILITIES.PIERCING_SHOT, 'next cast', ABILITIES.PIERCING_SHOT]
        },
        cooldown: 3
    ,
        title: 'Piercing shot',
        icon: '/ability_icons/ranged/30x30/piercing.png',
    },
    [ABILITIES.GALESHOT]: {
        'min hit': 0.9,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 20.4,
        title: 'Galeshot',
        icon: '/ability_icons/ranged/30x30/galeshot.png',
    },
    [ABILITIES.GALESHOT_BONUS]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'something that doesnt exist',
        'main style': 'ranged',
        'damage type': 'ranged',
        'adren cost': 0,
    },
    [ABILITIES.IMBUE_SHADOWS]: {
        'min hit': 0,
        'var hit': 0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'threshold',
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 40,
        cooldown: 60,
        title: 'Imbue Shadows',
        icon: '/ability_icons/ranged/30x30/imbue_shadows.png',
    },
    [ABILITIES.BINDING_SHOT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 15,
        title: 'Binding shot',
        icon: '/ability_icons/ranged/30x30/binding.png',
    },
    [ABILITIES.SNIPE_HIT]: {
        // ability name
        'min hit': 3.0, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        },
    [ABILITIES.SNIPE_HIT_2]: {
        // nightmare gauntlets extra hit
        'min hit': 1.5, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        },
    [ABILITIES.SNIPE]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        'duration': 3,
        hits: {
            1: [],
            2: [],
            3: [ABILITIES.SNIPE_HIT]   
        },
        adrenaline: 0,
        hitTimings: [3],
        cooldown: 60.0
    ,
        title: 'Snipe',
        icon: '/ability_icons/ranged/30x30/snipe.png',
    },
    [ABILITIES.RICOCHET]: {
        'min hit': 0.75, // 75-85% initial hit
        'var hit': 0.1,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [0, 0, 0],
        hits: {
            1: [
                ABILITIES.GREATER_RICOCHET_1,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2
            ]
        },
        cooldown: 10.2,
        title: 'Ricochet',
        icon: '/ability_icons/ranged/30x30/rico.png',
        common: false
    },
    [ABILITIES.GREATER_RICOCHET_1]: {
        'min hit': 0.75, // 75-85% initial hit
        'var hit': 0.1,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 10.2},
    [ABILITIES.GREATER_RICOCHET_2]: {
        'min hit': 0.15, // 15-20% additional hit
        'var hit': 0.05,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 10.2},
    [ABILITIES.GREATER_RICOCHET_3]: {
        'min hit': 0.04, // 4-6% greater ricochet additional hit
        'var hit': 0.02,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 10.2},
    [ABILITIES.GREATER_RICOCHET]: {
        'min hit': 0.75, // 75-85% initial hit
        'var hit': 0.1,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'basic',
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [0, 0, 0, 0, 0, 0, 0],
        hits: {
            1: [
                ABILITIES.GREATER_RICOCHET_1,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2,
                'next hit',
                ABILITIES.GREATER_RICOCHET_3,
                'next hit',
                ABILITIES.GREATER_RICOCHET_3,
                'next hit',
                ABILITIES.GREATER_RICOCHET_3,
                'next hit',
                ABILITIES.GREATER_RICOCHET_3
            ]
        },
        cooldown: 10.2
    ,
        title: 'Greater ricochet',
        icon: '/ability_icons/ranged/30x30/grico.png',
    },
    [ABILITIES.CORRUPTION_SHOT]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: [
                ABILITIES.CORRUPTION_SHOT_HIT_1,
                ABILITIES.CORRUPTION_SHOT_HIT_2,
                ABILITIES.CORRUPTION_SHOT_HIT_3,
                ABILITIES.CORRUPTION_SHOT_HIT_4,
                ABILITIES.CORRUPTION_SHOT_HIT_5
            ]
        },
        adrenaline: 20,
        cooldown: 15,
        hitTimings: [1, 3, 5, 7, 9],
    
        title: 'Corruption shot',
        icon: '/ability_icons/ranged/30x30/corrupt-shot.png',
    },
    [ABILITIES.CORRUPTION_SHOT_HIT_1]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_SHOT_HIT_2]: {
        // ability name
        'min hit': 0.72, // min % of abil expressed as a decimal
        'var hit': 0.16,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_SHOT_HIT_3]: {
        // ability name
        'min hit': 0.576, // min % of abil expressed as a decimal
        'var hit': 0.12,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_SHOT_HIT_4]: {
        // ability name
        'min hit': 0.4608, // min % of abil expressed as a decimal
        'var hit': 0.08,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 15,},
    [ABILITIES.CORRUPTION_SHOT_HIT_5]: {
        // ability name
        'min hit': 0.36864, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 15,},
    [ABILITIES.SNAP_SHOT_HIT]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 20.4},
    [ABILITIES.SNAP_SHOT]: {
            // ability name
            'min hit': 0.45, // min % of abil expressed as a decimal
            'var hit': 0.1,
            'on-hit effects': true, // does the ability get on-hit effects
            'crit effects': true, // can the ability crit
            'damage potential effects': true, // is the ability affected by damage potential
            'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
            'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
            'main style': 'ranged',
            'damage type': 'ranged',
            hitTimings: [0, 0], 
            hits: {
                1: [ABILITIES.SNAP_SHOT_HIT, 'next hit', ABILITIES.SNAP_SHOT_HIT]
            },
            adrenaline: 25,
            cooldown: 0
        ,
        title: 'Snap shot',
        icon: '/ability_icons/ranged/30x30/snapshot.png',
    },
    [ABILITIES.RAPID_FIRE_HIT]: {
        'min hit': 0.75, 
        'var hit': 0.10,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'threshold',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 20.4},
    [ABILITIES.RAPID_FIRE_LAST_HIT]: {
        'min hit': 0.75, // 17.5% avg additional hit
        'var hit': 0.10,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'threshold',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 20.4},
    [ABILITIES.RAPID_FIRE]: {
        'min hit': 0.72, // 80% avg initial hit
        'var hit': 0.16,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        'duration': 8,
        hits: {
            1: [ABILITIES.RAPID_FIRE_HIT],
            2: [ABILITIES.RAPID_FIRE_HIT],
            3: [ABILITIES.RAPID_FIRE_HIT],
            4: [ABILITIES.RAPID_FIRE_HIT],
            5: [ABILITIES.RAPID_FIRE_HIT],
            6: [ABILITIES.RAPID_FIRE_HIT],
            7: [ABILITIES.RAPID_FIRE_HIT],
            8: [ABILITIES.RAPID_FIRE_LAST_HIT]
        },
        adrenaline: 25,
        cooldown: 20.4,
        hitTimings: [0, 1, 2, 3, 4, 5, 6, 7]
    ,
        title: 'Rapid fire',
        icon: '/ability_icons/ranged/30x30/rapid.png',
    },
    [ABILITIES.BOMBARDMENT]: {
        // ability name
        'min hit': 2.2, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 25,
        cooldown: 30,
        title: 'Bombardment',
        icon: '/ability_icons/ranged/30x30/bombard.png',
    },
    [ABILITIES.SHADOW_TENDRILS]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 0,
        cooldown: 45,
        title: 'Shadow tendrils',
        icon: '/ability_icons/ranged/30x30/tendril.png',
    },
    [ABILITIES.DEADSHOT_INITIAL]: {
        // ability name
        'min hit': 1.05, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 30},
    [ABILITIES.DEADSHOT]: {
        // Non-igneous: 4x 105-125%. Igneous: 8x 55-75%.
        // Default hit sequence is igneous (swapped at calc time if no cape)
        'min hit': 1.15,
        'var hit': 0.2,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'multihit',
        'ability type': 'ultimate',
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: [ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT,
                ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT]
        },
        cooldown: 30,
        hitTimings: [1, 1, 1, 1, 1, 1, 1, 1],
        adrenaline: 60,
    
        title: 'Deadshot',
        icon: '/ability_icons/ranged/30x30/deadshot.png',
    },
    [ABILITIES.IGNEOUS_DEADSHOT_HIT]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 30},
    [ABILITIES.IGNEOUS_DEADSHOT]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: [ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT,
                ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT, ABILITIES.IGNEOUS_DEADSHOT_HIT
            ]
        },
        cooldown: 30,
        hitTimings: [1, 1, 1, 1, 1, 1, 1, 1],
        adrenaline: 60
    },
    [ABILITIES.DEATHS_SWIFTNESS_DOT]: {
        // ability name
        'min hit': 0.0,// 0.1, // min % of abil expressed as a decimal
        'var hit': 0.0, // 0.1 TODO change back
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
    
        cooldown: 0,},
    [ABILITIES.DEATHS_SWIFTNESS]: {
        //TODO check number of dot hits
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: new Array(17).fill(ABILITIES.DEATHS_SWIFTNESS_DOT)
        },
        cooldown: 60,
        hitTimings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49],//TODO Find out what these actually are
        title: 'Death\'s Swiftness',
        icon: '/ability_icons/ranged/Death\'s_Swiftness.png',
    },
    [ABILITIES.GREATER_DEATHS_SWIFTNESS]: {
        //TODO check number of dot hits
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: { //TODO properly
            1: new Array(21).fill(ABILITIES.DEATHS_SWIFTNESS_DOT)
        },
        cooldown: 60,
        hitTimings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61]//TODO Find out what these actually are
    ,
        title: 'Greater Death\'s Swiftness',
        icon: '/ability_icons/ranged/Greater_Death\'s_Swiftness.png',
    },
    [ABILITIES.BALANCE_BY_FORCE]: {
        // ability name
        'min hit': 2.35, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 30
    ,
        cooldown: 0,
        title: 'Balance by force',
        icon: '/ability_icons/ranged/30x30/bolg.png',
    },
    [ABILITIES.DESCENT_OF_DARKNESS_HIT]: {
        // ability name
        'min hit': 1.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 0},
    [ABILITIES.DESCENT_OF_DARKNESS]: {
        // ability name
        'min hit': 1.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [0, 0], 
        hits: {
            1: [ABILITIES.DESCENT_OF_DARKNESS_HIT, 'next hit', ABILITIES.DESCENT_OF_DARKNESS_HIT]
        },
        cooldown: 0,
        adrenaline: 65
    ,
        title: 'Descent of Darkness',
        icon: '/ability_icons/ranged/30x30/dbow.png',
    },
    [ABILITIES.BALANCED_SHOT]: {
        // ability name
        'min hit': 1.7, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 35
    ,
        cooldown: 0,
        title: 'Balanced shot',
        icon: '/ability_icons/ranged/30x30/guthix_bow.png',
        common: false
    },
    [ABILITIES.AIMED_SHOT_HIT]: {
        // ability name
        'min hit': 3.0, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        //TODO implement this properly
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
    
        cooldown: 0,},
    [ABILITIES.AIMED_SHOT]: {
        // ability name
        'min hit': 3.0, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        //TODO implement this properly
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        'duration': 5,
        hits: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [ABILITIES.AIMED_SHOT_HIT]   
        },
        cooldown: 0,
        adrenaline: 35
    ,
        title: 'Aimed shot',
        icon: '/ability_icons/ranged/30x30/hand_cannon.png',
        common: false
    },
    [ABILITIES.POWER_SHOT]: {
        // ability name
        'min hit': 2.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 35,
        cooldown: 0,
    
        title: 'Power shot',
        icon: '/ability_icons/ranged/30x30/magic_shieldbow.png',
        common: false
    },
    [ABILITIES.TWIN_FANG_HIT]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 0,
    },
    [ABILITIES.TWIN_FANG]: {
        // ability name
        'min hit': 1.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [1, 1],
        hits: {
            1: [ABILITIES.TWIN_FANG_HIT, 'next hit', ABILITIES.TWIN_FANG_HIT]
        },
        cooldown: 0,
        adrenaline: 50
    ,
        title: 'Twin fang',
        icon: '/ability_icons/ranged/30x30/msb.png',
        common: false
    },
    [ABILITIES.PHANTOM_STRIKE_INITIAL]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 0},
    [ABILITIES.PHANTOM_STRIKE_BLEED]: {
        // ability name
        'min hit': 0.3, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 0},
    [ABILITIES.PHANTOM_STRIKE]: {
        // ability name
        'min hit': 1.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [1, 4, 7, 10, 13, 16, 19], //todo actual hit timings 
        hits: {
            1: [
                ABILITIES.PHANTOM_STRIKE_INITIAL,
                ABILITIES.PHANTOM_STRIKE_BLEED,
                ABILITIES.PHANTOM_STRIKE_BLEED,
                ABILITIES.PHANTOM_STRIKE_BLEED,
                ABILITIES.PHANTOM_STRIKE_BLEED,
                ABILITIES.PHANTOM_STRIKE_BLEED
            ]
        },
        cooldown: 0,
        adrenaline: 50
    ,
        title: 'Phantom strike',
        icon: '/ability_icons/ranged/30x30/morrigans_javelin.png',
        common: false
    },
    [ABILITIES.HAMSTRING]: {
        // ability name
        'min hit': 1.5, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Hamstring',
        icon: '/ability_icons/ranged/30x30/morrigans_throwing_axe.png',
        common: false
    },
    [ABILITIES.TWIN_SHOT_HIT]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 0},
    [ABILITIES.TWIN_SHOT]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: [ABILITIES.TWIN_SHOT_HIT, 'next hit', ABILITIES.TWIN_SHOT_HIT]
        },
        hitTimings: [1, 1],
        cooldown: 0,
        adrenaline: 35
    ,
        title: 'Twin shot',
        icon: '/ability_icons/ranged/30x30/quickbow.png',
        common: false
    },
    [ABILITIES.CHAIN_HIT]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 10
    ,
        cooldown: 10.2,
        title: 'Chain hit',
        icon: '/ability_icons/ranged/30x30/rune_throwing_axe.png',
        common: false
    },
    [ABILITIES.RESTORATIVE_SHOT]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 30
    ,
        cooldown: 0,
        title: 'Restorative shot',
        icon: '/ability_icons/ranged/30x30/saradomin_bow.png',
        common: false
    },
    [ABILITIES.SOUL_SHOT]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 50
    ,
        cooldown: 0,
        title: 'Soul shot',
        icon: '/ability_icons/ranged/30x30/seercull.png',
        common: false
    },
    [ABILITIES.SPLIT_SOUL_ECB]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast',
        'ability type': 'special attack',
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 25,
        cooldown: 0,
        title: 'Split soul (ECB)',
        icon: '/ability_icons/ranged/Eldritch_crossbow.png',
    },
    [ABILITIES.CRYSTAL_RAIN]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [3, 4, 4, 4, 4], //TODO check these are correct
        adrenaline: 30,
        cooldown: 30,
        title: 'Crystal rain',
        icon: '/ability_icons/ranged/30x30/sgb.png',
    },
    [ABILITIES.DEEP_BURN]: {
        // ability name
        'min hit': 1.8, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 25,
        cooldown: 0,
        title: 'Deep burn',
        icon: '/ability_icons/ranged/30x30/strykebow.png',
        common: false
    },
    [ABILITIES.DESTRUCTIVE_SHOT_HIT]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 0},
    [ABILITIES.DESTRUCTIVE_SHOT]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hits: {
            1: [ABILITIES.DESTRUCTIVE_SHOT_HIT, 'next hit', ABILITIES.DESTRUCTIVE_SHOT_HIT]
        },
        cooldown: 0,
        hitTimings: [1,1], //todo actual hit timings 
        adrenaline: 40
    ,
        title: 'Destructive shot',
        icon: '/ability_icons/ranged/30x30/zamorak_bow.png',
    },
    [ABILITIES.DEFIANCE]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 40,
        cooldown: 0
    ,
        title: 'Defiance',
        icon: '/ability_icons/ranged/30x30/zaniks_crossbow.png',
        common: false
    },
    [ABILITIES.SHADOWFALL_1]: {
        // ability name
        'min hit': 0.85, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
    },
    [ABILITIES.SHADOWFALL_2]: {
        // ability name
        'min hit': 2.55, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
    },
    [ABILITIES.SHADOWFALL]: {
        // ability name
        'min hit': 0.85, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'multihit', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        adrenaline: 65,
        hits: {
            1: [ABILITIES.SHADOWFALL_1, 'next hit', ABILITIES.SHADOWFALL_1, 'next hit', ABILITIES.SHADOWFALL_2]
        },
        hitTimings: [0, 0, 2] // TODO check
    ,
        title: 'Shadowfall',
        icon: '/gear_icons/ranged/gloomfire bow.png',
    },
    [ABILITIES.TIME_STRIKE]: {
        // ability name
        'min hit': 0.8, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'proc', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0,
        title: 'Timestrike',
        icon: '/ability_icons/magic/30x30/time_strike-bg.png',
    },
    [ABILITIES.BOLG_PROC]: {
        // ability name
        'min hit': 0.12, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'proc', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 0,
        title: 'Bolg proc',
        icon: '/ability_icons/ranged/30x30/bolg.png',
    },
    [ABILITIES.BOLG_PROC_PERCENTAGES]: {
        // ability name
        'min hit': 0.33, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'proc', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 0},
    // Defensives
    [ABILITIES.NATURAL_INSTINCT]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 120,
        title: 'Natural Instinct',
        icon: '/ability_icons/defence/30px-Natural_Instinct.png'
    },
    [ABILITIES.RESONANCE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 30},
    [ABILITIES.FREEDOM]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 30,
        title: 'Freedom',
        icon: '/ability_icons/defence/30px-Freedom.png'
    },
    [ABILITIES.DIVERT]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 30,
        title: 'Divert',
        icon: '/ability_icons/defence/Divert.png'},
    [ABILITIES.PREPARATION]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 20.4,
        title: 'Preparation',
        icon: '/ability_icons/defence/30px-Preparation.png'
    },
    [ABILITIES.ANTICIPATION]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 24.6,
        title: 'Anticipation',
        icon: '/ability_icons/defence/30px-Anticipation.png'
    },
    [ABILITIES.REFLECT]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        adrenaline: 15,
        cooldown: 30,
        title: 'Reflect',
        icon: '/ability_icons/defence/30px-Reflect.png'
    },
    [ABILITIES.DEVOTION]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        adrenaline: 15,
        cooldown: 60,
        title: 'Devotion',
        icon: '/ability_icons/defence/30px-Devotion.png'
    },
    [ABILITIES.REVENGE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        adrenaline: 15,
        cooldown: 45,
        title: 'Revenge',
        icon: '/ability_icons/defence/30px-Revenge.png'        
    },
    [ABILITIES.IMMORTALITY]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 120,
        title: 'Immortality',
        icon: '/ability_icons/defence/30px-Immortality.png'
    },
    [ABILITIES.BARRICADE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'self cast', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 60,
        title: 'Barricade',
        icon: '/ability_icons/defence/30px-Barricade.png'
    },
    [ABILITIES.POWER_OF_DARKNESS]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 0},
    [ABILITIES.INGENUITY_OF_THE_HUMANS]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'melee',//TODO??
        'damage type': 'melee',//TODO??
        'duration': 0,
        cooldown: 90
    },
    [ABILITIES.LIMITLESS]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 90},
    [ABILITIES.DEMON_SLAYER_ABILITY]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 60},
    [ABILITIES.DRAGON_SLAYER_ABILITY]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 60},
    [ABILITIES.UNDEAD_SLAYER_ABILITY]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 60},
    [ABILITIES.SURGE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 0},
    [ABILITIES.DIVE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 20.4},
    [ABILITIES.ESCAPE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate TODO new type
        'main style': 'defence',//TODO??
        'damage type': 'defence',//TODO??
        cooldown: 0},
    [ABILITIES.VENGEANCE]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 30},
    [ABILITIES.SPELLBOOK_SWAP]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 0},
    [ABILITIES.DISRUPTION_SHIELD]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 60},
    [ABILITIES.PRISM_OF_RESTORATION]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 36},
    [ABILITIES.DREADNIP]: {
        'min hit': 0.0,
        'var hit': 0.0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 0},
    [ABILITIES.DEFLECT_MAGIC]: {
        'min hit': 0, 'var hit': 0, 'on-hit effects': false, 'crit effects': false,
        'damage potential effects': false, 'ability classification': 'self cast',
        'ability type': 'spell', 'main style': 'magic', 'damage type': 'magic', cooldown: 0},
    [ABILITIES.DEFLECT_MELEE]: {
        'min hit': 0, 'var hit': 0, 'on-hit effects': false, 'crit effects': false,
        'damage potential effects': false, 'ability classification': 'self cast',
        'ability type': 'spell', 'main style': 'magic', 'damage type': 'magic', cooldown: 0},
    [ABILITIES.DEFLECT_RANGED]: {
        'min hit': 0, 'var hit': 0, 'on-hit effects': false, 'crit effects': false,
        'damage potential effects': false, 'ability classification': 'self cast',
        'ability type': 'spell', 'main style': 'magic', 'damage type': 'magic', cooldown: 0},
    [ABILITIES.SOUL_SPLIT]: {
        'min hit': 0, 'var hit': 0, 'on-hit effects': false, 'crit effects': false,
        'damage potential effects': false, 'ability classification': 'self cast',
        'ability type': 'spell', 'main style': 'magic', 'damage type': 'magic', cooldown: 0},
    [ABILITIES.AFTERSHOCK_RANGED]: {
        'min hit': 0.24, 'var hit': 0.156,
        'on-hit effects': false, 'crit effects': true,
        'damage potential effects': false, 'ability classification': 'perk',
        'ability type': 'perk', 'main style': 'ranged', 'damage type': 'ranged'
    ,
        title: 'Aftershock',
        icon: '/effect_icons/perks/Aftershock.png',
    },
    [ABILITIES.AFTERSHOCK_MAGIC]: {
        'min hit': 0.24, 'var hit': 0.156,
        'on-hit effects': false, 'crit effects': true,
        'damage potential effects': false, 'ability classification': 'perk',
        'ability type': 'perk', 'main style': 'magic', 'damage type': 'magic'
    ,
        title: 'Aftershock',
        icon: '/effect_icons/perks/Aftershock.png',
        common: false
    },
    [ABILITIES.AFTERSHOCK_MELEE]: {
        'min hit': 0.24, 'var hit': 0.156,
        'on-hit effects': false, 'crit effects': true,
        'damage potential effects': false, 'ability classification': 'perk',
        'ability type': 'perk', 'main style': 'melee', 'damage type': 'melee'
    ,
        title: 'Aftershock',
        icon: '/effect_icons/perks/Aftershock.png',
    },
    [ABILITIES.AFTERSHOCK_NECRO]: {
        'min hit': 0.24, 'var hit': 0.156,
        'on-hit effects': false, 'crit effects': true,
        'damage potential effects': false, 'ability classification': 'perk',
        'ability type': 'perk', 'main style': 'necromancy', 'damage type': 'necromancy'
    ,
        title: 'Aftershock',
        icon: '/effect_icons/perks/Aftershock.png',
    },
    [ABILITIES.RUNIC_CHARGE]: {
        'min hit': 0,
        'var hit': 0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 0,
        cooldown: 30
    },
    [ABILITIES.EXSANGUINATE]: {
        'min hit': 0,
        'var hit': 0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 0,
        cooldown: 0
    },
    [ABILITIES.INCITE_FEAR]: {
        'min hit': 0,
        'var hit': 0,
        'on-hit effects': false,
        'crit effects': false,
        'damage potential effects': false,
        'ability classification': 'self cast',
        'ability type': 'spell',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 0,
        cooldown: 0
    },
    [ABILITIES.GLACIAL_EMBRACE_HIT]: {
        'min hit': 0.10,
        'var hit': 0.40,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'proc',
        'ability type': 'proc',
        'main style': 'magic',
        'damage type': 'magic',
        adrenaline: 0,
        cooldown: 20
    ,
        title: 'Glacial Embrace',
        icon: '/effect_icons/Glacial_Embrace.png',
    },
    [ABILITIES.POISON_DAMAGE]: {
        // ability name
        'min hit': 0.13, // min % of abil expressed as a decimal
        'var hit': 0.13,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'perk', // bleed, dot, burn, channel, regular, multihit
        'damage type': 'poison',
        'main style': 'poison',
        'ability type': 'perk', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'cooldown': 0
    }
};



export { armour, gear, weapons };

