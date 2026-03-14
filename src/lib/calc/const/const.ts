import { AbilityInfo } from "$lib/types/AbilityTypes";
import type { ArmourPiece } from "../types";

const weapons = {
    'custom main-hand weapon': {
        style: 'hybrid',
        'weapon type': 'main-hand',
        tier: 1,
        type: 'none',
        classification: 'none'
    },
    'custom off-hand weapon': {
        style: 'hybrid',
        'weapon type': 'off-hand',
        tier: 1,
        type: 'none',
        classification: 'none'
    },
    'custom two-hand weapon': {
        style: 'hybrid',
        'weapon type': 'two-hand',
        tier: 1,
        type: 'none',
        classification: 'none'
    },
    'wand of the praesul': {
        style: 'magic',
        'weapon type': 'main-hand',
        tier: 92,
        type: 'wand',
        classification: 'none'
    },
    'imperium core': {
        style: 'magic',
        'weapon type': 'off-hand',
        tier: 92,
        type: 'core',
        classification: 'none'
    },
    'inquisitor staff': {
        style: 'magic',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'staff',
        classification: 'none'
    },
    'inquisitor staff+': {
        style: 'magic',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'staff',
        classification: 'none'
    },
    'terrasaur maul': {
        style: 'melee',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'none',
        classification: 'none'
    },
    'terrasaur maul+': {
        style: 'melee',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'none',
        classification: 'none'
    },
    'hexhunter bow': {
        style: 'ranged',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'bow',
        classification: 'none'
    },
    'hexhunter bow+': {
        style: 'ranged',
        'weapon type': 'two-hand',
        tier: 80,
        type: 'bow',
        classification: 'none'
    },
    'bow of the last guardian': {
        style: 'ranged',
        'weapon type': 'two-hand',
        tier: 95,
        'type': 'bow',
        classification: 'none'
    },
    omniguard: {
        style: 'necromancy',
        'weapon type': 'main-hand',
        tier: 95,
        type: 'armguard',
        classification: 'none'
    },
    'soulbound lantern': {
        style: 'necromancy',
        'weapon type': 'off-hand',
        tier: 95,
        type: 'conduit',
        classification: 'none'
    },
    'custom oh': {
        style: 'hybrid',
        'weapon type': 'off-hand',
        tier: 0
    },
    'custom th': {
        style: 'hybrid',
        'weapon type': 'two-hand',
        tier: 0
    },
    'roar of awakening': {
        style: 'magic',
        'weapon type': 'main-hand',
        tier: 95,
        type: 'wand',
        classification: 'none'
    },
    'ode to deceit': {
        style: 'magic',
        'weapon type': 'off-hand',
        tier: 95,
        type: 'orb',
        classification: 'none'
    },
    'dark shard of leng': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 95,
        type: 'none',
        classification: 'none'
    },
    'dark sliver of leng': {
        style: 'melee',
        'weapon type': 'off-hand',
        tier: 95,
        type: 'none',
        classification: 'none'
    },
    'dark ice shard': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 88,
        type: 'none',
        classification: 'none'
    },
    'dark ice sliver': {
        style: 'melee',
        'weapon type': 'off-hand',
        tier: 88,
        type: 'none',
        classification: 'none'
    },
    'masterwork spear of annihilation': {
        style: 'melee',
        'weapon type': 'two-hand',
        tier: 92,
        type: 'spear',
        classification: 'none'
    },
    'spectral shield': {
        style: 'necromancy',
        'weapon type': 'shield',
        tier: 75,
        type: 'shield',
        classification: 'none'
    },
    'keris': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 50,
        type: 'none',
        classification: 'none'
    },
    'keris proc': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 50,
        type: 'none',
        classification: 'none'
    },
    'primed keris': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 70,
        type: 'none',
        classification: 'none'
    },
    'primed keris proc': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 70,
        type: 'none',
        classification: 'none'
    },
    'consecrated keris': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 80,
        type: 'none',
        classification: 'none'
    },
    'consecrated keris proc': {
        style: 'melee',
        'weapon type': 'main-hand',
        tier: 80,
        type: 'none',
        classification: 'none'
    },
    'ful arrows': {
        tier: 99
    },
    'wen arrows':{
        tier: 99
    },
    'deathspore arrows':{
        tier: 99
    },
    'jas arrows':{
        tier: 99
    },
    'bik arrows':{
        tier: 99
    },
    'hydrix bakriminel bolts':{
        tier: 99
    },
    'ezk':{
        style: 'melee',
        'weapon type': 'two-hand',
        tier: 95,
        type: 'none',
        classification: 'obsidian'
    },
    'fractured staff of armadyl':{
        style: 'magic',
        'weapon type': 'two-hand',
        tier: 95,
        type: 'staff',
        classification: 'none'
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

const armour: Record<string, ArmourPiece> = {
    'tokkul-zo': {
        'necromancy strength': 2.4,
        'magic strength': 2.4,
        'melee strength': 2.4,
        'ranged strength': 2.4,
        tier: { melee: 10, ranged: 10, magic: 10, necro: 10 },
        slot: 'ring',
        style: 'hybrid'
    },
    'warpriest of tuska gauntlets': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'hybrid'
    },
    'warpriest of tuska boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'hybrid'
    },
    'warpriest of tuska cape': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'hybrid'
    },
    'sirenic mask': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged'
    },
    'sirenic hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged'
    },
    'sirenic chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid'
    },
    'elite sirenic mask': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged'
    },
    'elite sirenic hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged'
    },
    'elite sirenic chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged'
    },
    'dracolich coif': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged'
    },
    'dracolich hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged'
    },
    'dracolich chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged'
    },
    'dracolich vambraces': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    'dracolich boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    'elite dracolich coif': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'ranged'
    },
    'elite dracolich hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'body',
        style: 'ranged'
    },
    'elite dracolich chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'ranged'
    },
    'elite dracolich vambraces': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    'elite dracolich boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    'virtus mask': {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'virtus robe top': {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'virtus robe legs': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'tectonic mask': {
        'necromancy strength': 0,
        'magic strength': 23.2,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'tectonic robe top': {
        'necromancy strength': 0,
        'magic strength': 34.8,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'tectonic robe bottom': {
        'necromancy strength': 0,
        'magic strength': 29,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'elite tectonic mask': {
        'necromancy strength': 0,
        'magic strength': 24,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'elite tectonic robe top': {
        'necromancy strength': 0,
        'magic strength': 36,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'elite tectonic robe bottom': {
        'necromancy strength': 0,
        'magic strength': 31,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'anima core helm of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    'anima core body of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'hybrid'
    },
    'anima core legs of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid'
    },
    'deathtouch bracelet': {
        'necromancy strength': 14.5,
        'magic strength': 14.5,
        'melee strength': 14.5,
        'ranged strength': 14.5,
        tier: { melee: 90, ranged: 90, magic: 90, necro: 90 },
        slot: 'helmet',
        style: 'hybrid'
    },
    'none/tank': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    'crown of the first necromancer': {
        'necromancy strength': 25,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'helmet',
        style: 'necromancy'
    },
    'robe top of the first necromancer': {
        'necromancy strength': 37,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'body',
        style: 'necromancy'
    },
    'robe bottom of the first necromancer': {
        'necromancy strength': 32,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'legs',
        style: 'necromancy'
    },
    'hand wrap of the first necromancer': {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'gloves',
        style: 'necromancy'
    },
    'foot wraps of the first necromancer': {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 110 },
        slot: 'boots',
        style: 'necromancy'
    },
    'deathdealer hood (tier 90)': {
        'necromancy strength': 23.2,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'helmet',
        style: 'necromancy'
    },
    'deathdealer robe top (tier 90)': {
        'necromancy strength': 34.8,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'body',
        style: 'necromancy'
    },
    'deathdealer robe bottom (tier 90)': {
        'necromancy strength': 29,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'legs',
        style: 'necromancy'
    },
    'deathdealer gloves (tier 90)': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'gloves',
        style: 'necromancy'
    },
    'deathdealer boots (tier 90)': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 90 },
        slot: 'boots',
        style: 'necromancy'
    },
    'cinderbane gloves': {
        'necromancy strength': 11,
        'magic strength': 11,
        'melee strength': 11,
        'ranged strength': 11,
        tier: { melee: 85, ranged: 85, magic: 85, necro: 85 },
        slot: 'gloves',
        style: 'hybrid'
    },
    'laceration boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        tier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'enhanced laceration boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'fleeting boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 12.7,
        tier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    'enhanced fleeting boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'ranged'
    },
    'blast diffusion boots': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    'enhanced blast diffusion boots': {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    'silverhawk boots': {
        'necromancy strength': 6.9,
        'magic strength': 6.9,
        'melee strength': 6.9,
        'ranged strength': 6.9,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'boots',
        style: 'hybrid'
    },
    'masterwork melee helm': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 23.2,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'masterwork melee platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 34.8,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'masterwork melee platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 29,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'masterwork melee gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'masterwork melee boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'trimmed masterwork melee helm': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 24,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'trimmed masterwork melee platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 36,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'trimmed masterwork melee platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 31,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'trimmed masterwork melee boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'trimmed masterwork melee gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'gloves of passage': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 13.5,
        'ranged strength': 0,
        tier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'enhanced gloves of passage': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        tier: { melee: 90, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'vestments of havoc hood': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 28,
        'ranged strength': 0,
        tier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'vestments of havoc robe top': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 42,
        'ranged strength': 0,
        tier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'vestments of havoc robe bottom': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 37,
        'ranged strength': 0,
        tier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'vestments of havoc boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 19,
        'ranged strength': 0,
        tier: { melee: 110, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'igneous kal-zuk': {
        'necromancy strength': 43,
        'magic strength': 43,
        'melee strength': 43,
        'ranged strength': 43,
        tier: { melee: 99, ranged: 99, magic: 99, necro: 99 },
        slot: 'cape',
        style: 'hybrid'
    },
    'igneous kal-mor': {
        'necromancy strength': 43,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 99 },
        slot: 'cape',
        style: 'necromancy'
    },
    'igneous kal-xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 43,
        tier: { melee: 0, ranged: 99, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'ranged'
    },
    'igneous kal-mej': {
        'necromancy strength': 0,
        'magic strength': 43,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 99, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    'igneous kal-ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 43,
        'ranged strength': 0,
        tier: { melee: 99, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'melee'
    },
    'essence of finality amulet': {
        'necromancy strength': 56,
        'magic strength': 56,
        'melee strength': 56,
        'ranged strength': 56,
        tier: { melee: 97, ranged: 97, magic: 97, necro: 97 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'essence of finality amulet (or)': {
        'necromancy strength': 59,
        'magic strength': 59,
        'melee strength': 59,
        'ranged strength': 59,
        tier: { melee: 102, ranged: 102, magic: 102, necro: 102 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'amulet of souls': {
        'necromancy strength': 46.3,
        'magic strength': 46.3,
        'melee strength': 46.3,
        'ranged strength': 46.3,
        tier: { melee: 84, ranged: 84, magic: 84, necro: 84 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'amulet of souls (or)': {
        'necromancy strength': 48,
        'magic strength': 48,
        'melee strength': 48,
        'ranged strength': 48,
        tier: { melee: 87, ranged: 87, magic: 87, necro: 87 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'berserker necklace': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.2,
        'ranged strength': 0,
        tier: { melee: 60, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'melee'
    },
    'desert amulet 4': {
        'necromancy strength': 30.2,
        'magic strength': 30.2,
        'melee strength': 30.2,
        'ranged strength': 30.2,
        tier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'erethdors grimoire': {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of ful': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of jas': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of amascut': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'gwd3 scripture': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'illuminated god book': {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'scrimshaw of elements': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'superior scrimshaw of elements': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'scrimshaw of cruelty': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'superior scrimshaw of cruelty': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'kerapacs wristwraps': {
        'necromancy strength': 0,
        'magic strength': 13.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    'enhanced kerapacs wristwraps': {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 90, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    'nightmare gauntlets': {
        'necromancy strength': 13.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    'enhanced nightmare gauntlets': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 90, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'ranged'
    },
    'jaws of the abyss': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 21.6,
        'ranged strength': 0,
        tier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'salve amulet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'salve amulet (e)': {
        'necromancy strength': 4.2,
        'magic strength': 4.2,
        'melee strength': 4.2,
        'ranged strength': 4.2,
        tier: { melee: 10, ranged: 10, magic: 10, necro: 10 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'reavers ring': {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        tier: { melee: 88, ranged: 88, magic: 88, necro: 88 },
        slot: 'ring',
        style: 'hybrid'
    },
    "channeller's ring": {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 92, necro: 0 },
        slot: 'ring',
        style: 'magic'
    },
    "channeller's ring+": {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'magic'
    },
    "stalker's ring": {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'ranged'
    },
    "stalker's ring+": {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        tier: { melee: 0, ranged: 92, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'ranged'
    },
    "champion's ring": {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'melee'
    },
    "champion's ring+": {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        tier: { melee: 92, ranged: 0, magic: 0, necro: 0 },
        slot: 'ring',
        style: 'melee'
    },
    'asylum surgeons ring': {
        'necromancy strength': 21,
        'magic strength': 21,
        'melee strength': 21,
        'ranged strength': 21,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'ring',
        style: 'hybrid'
    },
    'ring of death': {
        'necromancy strength': 25.2,
        'magic strength': 25.2,
        'melee strength': 25.2,
        'ranged strength': 25.2,
        tier: { melee: 80, ranged: 80, magic: 80, necro: 80 },
        slot: 'ring',
        style: 'hybrid'
    },
    'ring of death (i)': {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        tier: { melee: 88, ranged: 88, magic: 88, necro: 88 },
        slot: 'ring',
        style: 'hybrid'
    },
    'asylum surgeons ring (i)': {
        'necromancy strength': 23.4,
        'magic strength': 23.4,
        'melee strength': 23.4,
        'ranged strength': 23.4,
        tier: { melee: 78, ranged: 78, magic: 78, necro: 78 },
        slot: 'ring',
        style: 'hybrid'
    },
    'zorgoths soul ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 92 },
        slot: 'ring',
        style: 'necromancy'
    },
    'occultists ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 92 },
        slot: 'ring',
        style: 'hybrid'
    },
    'luck of the dwarves': {
        'necromancy strength': 17.3,
        'magic strength': 17.3,
        'melee strength': 17.3,
        'ranged strength': 17.3,
        tier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'ring',
        style: 'hybrid'
    },
    'luck of the dwarves (i)': {
        'necromancy strength': 19.8,
        'magic strength': 19.8,
        'melee strength': 19.8,
        'ranged strength': 19.8,
        tier: { melee: 69, ranged: 69, magic: 69, necro: 69 },
        slot: 'ring',
        style: 'hybrid'
    },
    'hazelmeres signet ring': {
        'necromancy strength': 21.0,
        'magic strength': 21.0,
        'melee strength': 21.0,
        'ranged strength': 21.0,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'ring',
        style: 'hybrid'
    },
    'hazelmeres signet ring (i)': {
        'necromancy strength': 23.7,
        'magic strength': 23.7,
        'melee strength': 23.7,
        'ranged strength': 23.7,
        tier: { melee: 79, ranged: 79, magic: 79, necro: 79 },
        slot: 'ring',
        style: 'hybrid'
    },
    'amulet of zealots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'TokHaar-Kal-Ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 33.5,
        'ranged strength': 0,
        tier: { melee: 85, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'melee'
    },
    'TokHaar-Kal-Xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 33.5,
        tier: { melee: 0, ranged: 85, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'ranged'
    },
    'TokHaar-Kal-Mej': {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    'TokHaar-Kal-Mor': {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 85 },
        slot: 'cape',
        style: 'necromancy'
    },
    'comp/max cape': {
        'necromancy strength': 31.5,
        'magic strength': 31.5,
        'melee strength': 31.5,
        'ranged strength': 31.5,
        tier: { melee: 80, ranged: 80, magic: 80, necro: 80 },
        slot: 'cape',
        style: 'hybrid'
    },
    'god cape': {
        'necromancy strength': 0,
        'magic strength': 31.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'cape',
        style: 'magic'
    },
    'skill cape': {
        'necromancy strength': 21.6,
        'magic strength': 21.6,
        'melee strength': 21.6,
        'ranged strength': 21.6,
        tier: { melee: 60, ranged: 60, magic: 60, necro: 60 },
        slot: 'cape',
        style: 'hybrid'
    },
    'underworld grimoire 4': {
        'necromancy strength': 15,
        'magic strength': 15,
        'melee strength': 15,
        'ranged strength': 15,
        tier: { melee: 95, ranged: 95, magic: 95, necro: 95 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'underworld grimoire 3': {
        'necromancy strength': 10,
        'magic strength': 10,
        'melee strength': 10,
        'ranged strength': 10,
        tier: { melee: 65, ranged: 65, magic: 65, necro: 65 },
        slot: 'pocket',
        style: 'hybrid'
    },
    'reaper necklace': {
        'necromancy strength': 36.8,
        'magic strength': 36.8,
        'melee strength': 36.8,
        'ranged strength': 36.8,
        tier: { melee: 70, ranged: 70, magic: 70, necro: 70 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'reaper necklace (or)': {
        'necromancy strength': 38.4,
        'magic strength': 38.4,
        'melee strength': 38.4,
        'ranged strength': 38.4,
        tier: { melee: 73, ranged: 73, magic: 73, necro: 73 },
        slot: 'necklace',
        style: 'hybrid'
    },
    'conjurers raising amulet': {
        'necromancy strength': 44.1,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 80 },
        slot: 'necklace',
        style: 'necromancy'
    },
    'anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'refined anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 21.6,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'refined anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 32.5,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'refined anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 27.1,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 85, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'virtus robe bottom': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'virtus gloves': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    'virtus boots': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 80, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
    'bandos helmet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 17.7,
        'ranged strength': 0,
        tier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'bandos chestplate': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 26.5,
        'ranged strength': 0,
        tier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'bandos tassets': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 22.1,
        'ranged strength': 0,
        tier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'bandos gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        tier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'bandos boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        tier: { melee: 70, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'torva helmet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 20.3,
        'ranged strength': 0,
        tier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'melee'
    },
    'torva platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.5,
        'ranged strength': 0,
        tier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'melee'
    },
    'torva platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 25.4,
        'ranged strength': 0,
        tier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'melee'
    },
    'torva gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        tier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'gloves',
        style: 'melee'
    },
    'torva boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        tier: { melee: 80, ranged: 0, magic: 0, necro: 0 },
        slot: 'boots',
        style: 'melee'
    },
    'ghost hunter goggles': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'helmet',
        style: 'hybrid'
    },
    'ghost hunter body': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'body',
        style: 'hybrid'
    },
    'ghost hunter legs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'legs',
        style: 'hybrid'
    },
    'ghost hunter backpack': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 0, necro: 0 },
        slot: 'cape',
        style: 'hybrid'
    },
    'masterwork magic hat': {
        'necromancy strength': 0,
        'magic strength': 28,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'helmet',
        style: 'magic'
    },
    'masterwork magic robe top': {
        'necromancy strength': 0,
        'magic strength': 42,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'body',
        style: 'magic'
    },
    'masterwork magic robe bottom': {
        'necromancy strength': 0,
        'magic strength': 37,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'legs',
        style: 'magic'
    },
    'masterwork magic gloves': {
        'necromancy strength': 0,
        'magic strength': 19,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'gloves',
        style: 'magic'
    },
    'masterwork magic boots': {
        'necromancy strength': 0,
        'magic strength': 19,
        'melee strength': 0,
        'ranged strength': 0,
        tier: { melee: 0, ranged: 0, magic: 110, necro: 0 },
        slot: 'boots',
        style: 'magic'
    },
};

export enum ABILITIES {
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
    IMBUE_SHADOWS = 'imbue shadows',
    BINDING_SHOT = 'binding shot',
    SNIPE_HIT = 'snipe hit',
    SNIPE = 'snipe',
    DAZING_SHOT = 'dazing shot',
    GREATER_DAZING_SHOT = 'greater dazing shot',
    DEMORALISE = 'demoralise',
    NEEDLE_STRIKE = 'needle strike',
    FRAGMENTATION_SHOT_HIT = 'fragmentation shot hit',
    FRAGMENTATION_SHOT = 'fragmentation shot',
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
    TIGHT_BINDINGS = 'tight bindings',
    ROUT = 'rout',
    RAPID_FIRE_LAST_HIT = 'rapid fire last hit',
    RAPID_FIRE_HIT = 'rapid fire hit',
    RAPID_FIRE = 'rapid fire',
    BOMBARDMENT = 'bombardment',
    SALT_THE_WOUND = 'salt the wound',
    SHADOW_TENDRILS = 'shadow tendrils',
    DEADSHOT_INITIAL = 'deadshot initial',
    DEADSHOT = 'deadshot',
    IGNEOUS_DEADSHOT_HIT = 'igneous_deadshot_hit',
    IGNEOUS_DEADSHOT = 'igneous_deadshot',
    INCENDIARY_SHOT = 'incendiary shot',
    UNLOAD_HIT = 'unload hit',
    UNLOAD = 'unload',
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
    WRACK = 'wrack',
    IMPACT = 'impact',
    WRACK_AND_RUIN = 'wrack and ruin',
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
    ASPHYXIATE = 'asphyxiate',
    DEEP_IMPACT = 'deep impact',
    HORROR = 'horror',
    DETONATE = 'detonate',
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
    SLICE = 'slice',
    BACKHAND = 'backhand',
    HAVOC = 'havoc',
    SMASH = 'smash',
    BARGE = 'barge',
    GREATER_BARGE = 'greater barge',
    SEVER = 'sever',
    BLADED_DIVE = 'bladed dive',
    SLAUGHTER_HIT = 'slaughter hit',
    SLAUGHTER = 'slaughter',
    FORCEFUL_BACKHAND = 'forceful backhand',
    FLURRY_HIT = 'flurry hit',
    FLURRY = 'flurry',
    GREATER_FLURRY_HIT = 'greater flurry hit',
    GREATER_FLURRY = 'greater flurry',
    HURRICANE_1 = 'hurricane 1',
    HURRICANE_2 = 'hurricane 2',
    HURRICANE = 'hurricane',
    BLOODLUST_HURRICANE_HIT = 'bloodlust hurricane hit',
    BLOOD_TENDRILS_1 = 'blood tendrils 1',
    BLOOD_TENDRILS_2 = 'blood tendrils 2',
    BLOOD_TENDRILS = 'blood tendrils',
    OVERPOWER_HIT = 'overpower hit',
    OVERPOWER = 'overpower',
    MASSACRE_INITIAL = 'massacre initial',
    MASSACRE_BLEED = 'massacre bleed',
    MASSACRE = 'massacre',
    BALANCED_STRIKE = 'balanced strike',
    METEOR_STRIKE = 'meteor strike',
    KICK = 'kick',
    PUNISH = 'punish',
    DISMEMBER_HIT = 'dismember hit',
    DISMEMBER = 'dismember',
    FURY = 'fury',
    GREATER_FURY = 'greater fury',
    CLEAVE = 'cleave',
    DECIMATE = 'decimate',
    ADAPTIVE_STRIKE_HIT = 'adaptive strike hit',
    ADAPTIVE_STRIKE = 'adaptive strike',
    REND = 'rend',
    CHAOS_ROAR = 'chaos roar',
    STOMP = 'stomp',
    DESTROY_HIT = 'destroy hit',
    DESTROY = 'destroy',
    QUAKE = 'quake',
    ASSAULT_HIT = 'assault hit',
    ASSAULT = 'assault',
    PULVERISE = 'pulverise',
    FRENZY_HIT = 'frenzy hit',
    FRENZY = 'frenzy',
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
    IGNEOUS_CLEAVE_INITIAL = 'igneous cleave initial',
    IGNEOUS_CLEAVE_BLEED = 'igneous bleed bleed',
    IGNEOUS_CLEAVE = 'igneous cleave',
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
    ICE_CLEAVE = 'ice cleave',
    BERSERK = 'berserk',
    BLACKHOLE = 'blackhole',

    // perks damage
    AFTERSHOCK = 'aftershock',

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
        'min hit': 0.2, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'auto', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    },
    [ABILITIES.SLICE]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 3},
    [ABILITIES.BACKHAND]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 15},
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
    [ABILITIES.SMASH]: {
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
        cooldown: 20.4},
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
        cooldown: 20.4},
    [ABILITIES.SEVER]: {
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
        cooldown: 5.4},
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
        cooldown: 20.4},
    [ABILITIES.SLAUGHTER_HIT]: {
        // ability name
        'min hit': 0.3, // min % of abil expressed as a decimal
        'var hit': 0.1,
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
        'min hit': 0.9, // min % of abil expressed as a decimal
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
        hitTimings: [1, 1, 3, 5, 7, 9]
    },
    [ABILITIES.FORCEFUL_BACKHAND]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 15},
    [ABILITIES.FLURRY_HIT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
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
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'duration': 7,
        hits: {
            1: [ABILITIES.FLURRY_HIT],
            2: [],
            3: [ABILITIES.FLURRY_HIT],
            4: [],
            5: [ABILITIES.FLURRY_HIT],
            6: [],
            7: [ABILITIES.FLURRY_HIT]
        },
        adrenaline: 25,
        cooldown: 20.4,
        hitTimings: [0, 2, 4, 6]
    },
    [ABILITIES.GREATER_FLURRY_HIT]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
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
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'duration': 7,
        hits: {
            1: [ABILITIES.GREATER_FLURRY_HIT],
            2: [],
            3: [ABILITIES.GREATER_FLURRY_HIT],
            4: [],
            5: [ABILITIES.GREATER_FLURRY_HIT],
            6: [],
            7: [ABILITIES.GREATER_FLURRY_HIT]},
        adrenaline: 25,
        cooldown: 20.4,
        hitTimings: [0, 2, 4, 6]
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
    [ABILITIES.BLOOD_TENDRILS_1]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 45},
    [ABILITIES.BLOOD_TENDRILS_2]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 45},
    [ABILITIES.BLOOD_TENDRILS]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        hits: {
            1: [
                ABILITIES.BLOOD_TENDRILS_1,
                ABILITIES.BLOOD_TENDRILS_2,
                ABILITIES.BLOOD_TENDRILS_2,
                ABILITIES.BLOOD_TENDRILS_2,
                ABILITIES.BLOOD_TENDRILS_2
            ]
        },
        cooldown: 45,
        hitTimings: [1, 3, 5, 7, 9]
    },
    [ABILITIES.OVERPOWER_HIT]: {
        // Igneous Overpower hit: 310-370% per hit (2 hits total)
        'min hit': 3.1,
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
        // Non-igneous: 550-600% single hit. Igneous: 2x 310-370% hits.
        // Default hit sequence is igneous (swapped at calc time if no cape)
        'min hit': 5.5,
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
    },
    [ABILITIES.MASSACRE_INITIAL]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
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
        'min hit': 0.65, // min % of abil expressed as a decimal
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
                ABILITIES.MASSACRE_BLEED
            ]
        },
        hitTimings: [1, 3, 5, 7, 9, 11],
        cooldown: 60
    },
    [ABILITIES.METEOR_STRIKE]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 60},
    [ABILITIES.BALANCED_STRIKE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 120},
    [ABILITIES.KICK]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 15},
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
        cooldown: 24},
    [ABILITIES.DISMEMBER_HIT]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.06,
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
        cooldown: 15},
    [ABILITIES.CLEAVE]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 7.2},
    [ABILITIES.DECIMATE]: {
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
        cooldown: 7.2},
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
        cooldown: 5.4},
    [ABILITIES.CHAOS_ROAR]: {
        // ability name
        'min hit': 0.85, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 60},
    [ABILITIES.STOMP]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 15},
    [ABILITIES.DESTROY_HIT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 20.4},
    [ABILITIES.DESTROY]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.DESTROY_HIT],
            2: [],
            3: [ABILITIES.DESTROY_HIT],
            4: [],
            5: [ABILITIES.DESTROY_HIT],
            6: [],
            7: [ABILITIES.DESTROY_HIT]
        },
        cooldown: 20.4
    },
    [ABILITIES.QUAKE]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 20.4},
    [ABILITIES.ASSAULT_HIT]: {
        // ability name
        'min hit': 1.45, // min % of abil expressed as a decimal
        'var hit': 0.3,
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
        'min hit': 1.45, // min % of abil expressed as a decimal
        'var hit': 0.3,
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
        cooldown: 60},
    [ABILITIES.FRENZY_HIT]: {
        // ability name
        'min hit': 1.45, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 60},
    [ABILITIES.FRENZY]: {
        // ability name
        'min hit': 1.45, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.FRENZY_HIT],
            2: [],
            3: [ABILITIES.FRENZY_HIT],
            4: [],
            5: [ABILITIES.FRENZY_HIT],
            6: [],
            7: [ABILITIES.FRENZY_HIT]
        },
        cooldown: 60
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
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    },
    [ABILITIES.FAVOUR_OF_THE_WAR_GOD]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    },
    [ABILITIES.ARMADYLS_JUDGEMENT]: {
        // ability name
        'min hit': 3.6, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0},
    [ABILITIES.WARSTRIKE]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
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
    },
    [ABILITIES.SUNDER]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
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
    },
    [ABILITIES.BACKSTAB]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
    },
    [ABILITIES.LIQUEFY]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 0
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
        cooldown: 0},
    [ABILITIES.ICY_TEMPEST_1]: {
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
        cooldown: 0},
    [ABILITIES.ICY_TEMPEST_2]: {
        // ability name
        'min hit': 1.5, // min % of abil expressed as a decimal
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
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.ICY_TEMPEST_1, 'next hit', ABILITIES.ICY_TEMPEST_2]
        },
        hitTimings: [0, 0], 
        cooldown: 0
    },
    [ABILITIES.WEAKEN_SPECIAL_ATTACK]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 50,
        cooldown: 0},
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
        cooldown: 0},
    [ABILITIES.SLICE_N_DICE_1]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
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
        'min hit': 0.8, // min % of abil expressed as a decimal
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
        'min hit': 0.4, // min % of abil expressed as a decimal
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
            1: [ABILITIES.DRACONIC_PUNCTURE_HIT, 'next hit', ABILITIES.DRACONIC_PUNCTURE_HIT]
        },
        hitTimings: [1, 1],
        cooldown: 0,
        adrenaline: 25
    },
    [ABILITIES.SWEEP_HIT]: {
        // ability name
        'min hit': 1.05, // min % of abil expressed as a decimal
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
    },
    [ABILITIES.DRACONIC_CLEAVE]: {
        // ability name
        'min hit': 2.5, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 7.2},
    [ABILITIES.DRACONIC_BLOW]: {
        // ability name
        'min hit': 2.1, // min % of abil expressed as a decimal
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
    [ABILITIES.DRACONIC_SLASH]: {
        // ability name
        'min hit': 2.1, // min % of abil expressed as a decimal
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
        'damage type': 'melee'
    ,
        cooldown: 0},
    [ABILITIES.IGNEOUS_CLEAVE_INITIAL]: {
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
        cooldown: 7.2
    },
    [ABILITIES.IGNEOUS_CLEAVE_BLEED]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.15,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        cooldown: 7.2
    },
    [ABILITIES.IGNEOUS_CLEAVE]: {
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
            1: [ABILITIES.IGNEOUS_CLEAVE_INITIAL, ABILITIES.IGNEOUS_CLEAVE_BLEED]
        },
        hitTimings: [1, 1], // TODO fix
        cooldown: 7.2
    },
    [ABILITIES.IGNEOUS_SHOWDOWN_HIT]: {
        // ability name
        'min hit': 2.3, // min % of abil expressed as a decimal
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
    [ABILITIES.IGNEOUS_SHOWDOWN_BONUS]: {
        // ability name
        'min hit': 2.15, // min % of abil expressed as a decimal
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
    [ABILITIES.IGNEOUS_SHOWDOWN]: {
        // ability name
        'min hit': 2.3, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        'hits': {
            1: [ABILITIES.IGNEOUS_SHOWDOWN_HIT]
        },
        hitTimings: [1], // TODO fix
        cooldown: 0
    },
    [ABILITIES.QUICK_SMASH]: {
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
        cooldown: 10.2},
    [ABILITIES.AIMED_STRIKE]: {
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
        cooldown: 0},
    [ABILITIES.DISRUPT]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'magic'
    ,
        cooldown: 0},
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
        'min hit': 1.1, // min % of abil expressed as a decimal
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
    [ABILITIES.HEALING_BLADE]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
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
    [ABILITIES.SARADOMINS_LIGHTNING_HIT]: {
        // ability name
        'min hit': 2.5, // min % of abil expressed as a decimal
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
        cooldown: 0
    },
    [ABILITIES.OBLITERATE]: {
        // ability name
        'min hit': 1.4, // min % of abil expressed as a decimal
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
        cooldown: 0},
    [ABILITIES.FEINT]: {
        // ability name
        'min hit': 2.3, // min % of abil expressed as a decimal
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
    [ABILITIES.SPEAR_WALL]: {
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
        cooldown: 0},
    [ABILITIES.ICE_CLEAVE]: {
        // ability name
        'min hit': 1.6, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    ,
        cooldown: 7.2},
    [ABILITIES.BERSERK]: {
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        adrenaline: 100
    ,
        cooldown: 60},
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
        cooldown: 0},

    [ABILITIES.MAGIC_AUTO]: {
        // ability name
        'min hit': 0.2, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    ,
        cooldown: 0},
    [ABILITIES.WRACK]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 3},
    [ABILITIES.WRACK_AND_RUIN]: {
        // ability name
        'min hit': 1.8, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 3},
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
        cooldown: 15},
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
        cooldown: 7.2},
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
        cooldown: 15},
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
        cooldown: 10.2},
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
        cooldown: 10.2},
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
        cooldown: 15},
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
            7: [ABILITIES.ASPHYXIATE_HIT]
        },
        cooldown: 5.4
    },
    [ABILITIES.DEEP_IMPACT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 15},
    [ABILITIES.HORROR]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 15},
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
    },
    [ABILITIES.DETONATE]: {
        // ability name
        'min hit': 0, // min % of abil expressed as a decimal
        'var hit': 0,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        cooldown: 30
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
        cooldown: 0},
    [ABILITIES.SMOKE_TENDRILS_1]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
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
        'min hit': 0.7, // min % of abil expressed as a decimal
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
    [ABILITIES.SMOKE_TENDRILS_3]: {
        // ability name
        'min hit': 0.8, // min % of abil expressed as a decimal
        'var hit': 0.3,
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
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
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
        cooldown: 60},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},

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
        cooldown: 0},
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
        cooldown: 14.4},
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
        cooldown: 0},
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
        cooldown: 5.4},
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
        cooldown: 9},
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
        cooldown: 0},
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
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0},
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
        adrenaline: 100,
        hitTimings: [0, 2, 4, 6],
        cooldown: 30
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
        cooldown: 0
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
        cooldown: 0},
    [ABILITIES.SOUL_STRIKE_AOE]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0},
    [ABILITIES.VOLLEY_OF_SOULS]: {
        // ability name - single hit component used by multihit
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
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
        cooldown: 0
    },
    [ABILITIES.VOLLEY_OF_SOULS_2]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic',
        hits: {
            1: [ABILITIES.VOLLEY_OF_SOULS, 'next hit', ABILITIES.VOLLEY_OF_SOULS]
        },
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
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        cooldown: 45},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 90},

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
        cooldown: 0},
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
        cooldown: 20.4},
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
        cooldown: 60},
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
        cooldown: 15},
    [ABILITIES.SNIPE_HIT]: {
        // ability name
        'min hit': 3.0, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
    },
    [ABILITIES.DAZING_SHOT]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 5.4},
    [ABILITIES.GREATER_DAZING_SHOT]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 5.4},
    [ABILITIES.DEMORALISE]: {
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
        cooldown: 15},
    [ABILITIES.NEEDLE_STRIKE]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 5.4},
    [ABILITIES.FRAGMENTATION_SHOT_HIT]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 15},
    [ABILITIES.FRAGMENTATION_SHOT]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hitTimings: [1, 3, 5, 7, 9],
        hits: {
            1: [
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT
            ]
        },
        cooldown: 15
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
        cooldown: 10.2},
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
    },
    [ABILITIES.CORRUPTION_SHOT]: {
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
        hits: {
            1: [
                ABILITIES.CORRUPTION_SHOT_HIT_1,
                ABILITIES.CORRUPTION_SHOT_HIT_2,
                ABILITIES.CORRUPTION_SHOT_HIT_3,
                ABILITIES.CORRUPTION_SHOT_HIT_4,
                ABILITIES.CORRUPTION_SHOT_HIT_5
            ]
        },
        cooldown: 15,
        hitTimings: [1, 3, 5, 7, 9],
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
        },
    [ABILITIES.TIGHT_BINDINGS]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 15},
    [ABILITIES.ROUT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 15},
    [ABILITIES.RAPID_FIRE_HIT]: {
        'min hit': 0.15, // 17.5% avg additional hit
        'var hit': 0.05,
        'on-hit effects': true,
        'crit effects': true,
        'damage potential effects': true,
        'ability classification': 'regular',
        'ability type': 'threshold',
        'main style': 'ranged',
        'damage type': 'ranged',
        cooldown: 20.4},
    [ABILITIES.RAPID_FIRE_LAST_HIT]: {
        'min hit': 0.15, // 17.5% avg additional hit
        'var hit': 0.05,
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
        cooldown: 30},
    [ABILITIES.SALT_THE_WOUND]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 15},
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
        cooldown: 45},
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
        hitTimings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]//TODO Find out what these actually are
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
    },
    [ABILITIES.INCENDIARY_SHOT]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 60},
    [ABILITIES.UNLOAD_HIT]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    ,
        cooldown: 60},
    [ABILITIES.UNLOAD]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        'duration': 7,
        hits: {
            1: [ABILITIES.UNLOAD_HIT],
            2: [],
            3: [ABILITIES.UNLOAD_HIT],
            4: [],
            5: [ABILITIES.UNLOAD_HIT],
            6: [],
            7: [ABILITIES.UNLOAD_HIT]
        },
        cooldown: 60
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 10.2},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 0},
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
        cooldown: 30},
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
        cooldown: 0},
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
        cooldown: 0},
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
        'damage type': 'ranged' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
        cooldown: 0},
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
        'damage type': 'ranged' // basic, threshold, special attack, ability (necromancy classification), ultimate
    ,
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
        cooldown: 120},
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
        cooldown: 30},
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
        cooldown: 30},
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
        cooldown: 20.4},
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
        cooldown: 24.6},
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
        cooldown: 30},
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
        cooldown: 60},
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
        cooldown: 45},
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
        cooldown: 120},
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
        cooldown: 60},
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
    [ABILITIES.AFTERSHOCK]: {
        // ability name
        'min hit': 0.24, // min % of abil expressed as a decimal
        'var hit': 0.156,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'perk', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'perk', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        cooldown: 15
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

