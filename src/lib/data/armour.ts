import { SETTINGS } from "../calc/settings_rb";
import type { Equipment } from "../calc/types";


export const armour: Record<string, Equipment> = {
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
        style: 'hybrid',
        popular: true
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
        style: 'magic',
        popular: true
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
        popular: false
    },
    [SETTINGS.MELEE_BODY_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 34.8,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_LEGS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 29,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_GLOVES_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_BOOTS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        offensiveTier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_HELMET_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 24,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_BODY_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 36,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_LEGS_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 31,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_BOOTS_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee',
        popular: false
    },
    [SETTINGS.MELEE_GLOVES_VALUES.TMW]: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        offensiveTier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee',
        popular: false
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
        popular: false
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
        style: 'hybrid',
        popular: true
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
        style: 'magic',
        popular: true
    },
    [SETTINGS.RING_VALUES.CHANNELLER_E]: {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'magic',
        popular: true
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
        style: 'melee',
        popular: true
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
        style: 'necromancy',
        popular: true
    },
    'occultists ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 0, necro: 92 },
        slot: 'ring',
        style: 'hybrid',
        popular: true
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
        popular: false
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
        style: 'magic',
        popular: true
    },
    [SETTINGS.MAGIC_BOOTS_VALUES.MASTERWORK]: {
        'necromancy strength': 0,
        'magic strength': 19,
        'melee strength': 0,
        'ranged strength': 0,
        offensiveTier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'boots',
        style: 'magic',
        popular: true
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