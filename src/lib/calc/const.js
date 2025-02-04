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

const armour = {
    'sirenic mask': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        slot: 'helmet',
        style: 'ranged'
    },
    'sirenic hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        slot: 'body',
        style: 'ranged'
    },
    'sirenic chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        slot: 'legs',
        style: 'hybrid'
    },
    'elite sirenic mask': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        slot: 'helmet',
        style: 'ranged'
    },
    'elite sirenic hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        slot: 'body',
        style: 'ranged'
    },
    'elite sirenic chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        slot: 'legs',
        style: 'ranged'
    },
    'dracolich coif': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 23.2,
        slot: 'helmet',
        style: 'ranged'
    },
    'dracolich hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 34.8,
        slot: 'body',
        style: 'ranged'
    },
    'dracolich chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 29,
        slot: 'legs',
        style: 'ranged'
    },
    'dracolich vambraces': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        slot: 'gloves',
        style: 'ranged'
    },
    'dracolich boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        slot: 'boots',
        style: 'ranged'
    },
    'elite dracolich coif': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 24,
        slot: 'helmet',
        style: 'ranged'
    },
    'elite dracolich hauberk': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 36,
        slot: 'body',
        style: 'ranged'
    },
    'elite dracolich chaps': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 31,
        slot: 'legs',
        style: 'ranged'
    },
    'elite dracolich vambraces': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        slot: 'gloves',
        style: 'ranged'
    },
    'elite dracolich boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 15,
        slot: 'boots',
        style: 'ranged'
    },
    'tectonic mask': {
        'necromancy strength': 0,
        'magic strength': 23.2,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'magic'
    },
    'tectonic robe top': {
        'necromancy strength': 0,
        'magic strength': 34.8,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'magic'
    },
    'tectonic robe bottom': {
        'necromancy strength': 0,
        'magic strength': 29,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'magic'
    },
    'elite tectonic mask': {
        'necromancy strength': 0,
        'magic strength': 24,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'magic'
    },
    'elite tectonic robe top': {
        'necromancy strength': 0,
        'magic strength': 36,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'magic'
    },
    'elite tectonic robe bottom': {
        'necromancy strength': 0,
        'magic strength': 31,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'magic'
    },
    'anima core helm of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'hybrid'
    },
    'anima core body of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'hybrid'
    },
    'anima core legs of sliske': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'hybrid'
    },
    'deathtouch bracelet': {
        'necromancy strength': 14.5,
        'magic strength': 14.5,
        'melee strength': 14.5,
        'ranged strength': 14.5,
        slot: 'helmet',
        style: 'hybrid'
    },
    none: {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'hybrid'
    },
    'none/tank': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'not used',
        style: 'hybrid'
    },
    'crown of the first necromancer': {
        'necromancy strength': 25,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'necromancy'
    },
    'robe top of the first necromancer': {
        'necromancy strength': 37,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'necromancy'
    },
    'robe bottom of the first necromancer': {
        'necromancy strength': 32,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'necromancy'
    },
    'hand wrap of the first necromancer': {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'necromancy'
    },
    'foot wraps of the first necromancer': {
        'necromancy strength': 16,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'boots',
        style: 'necromancy'
    },
    'deathdealer hood (tier 90)': {
        'necromancy strength': 23.2,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'necromancy'
    },
    'deathdealer robe top (tier 90)': {
        'necromancy strength': 34.8,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'necromancy'
    },
    'deathdealer robe bottom (tier 90)': {
        'necromancy strength': 29,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'necromancy'
    },
    'deathdealer gloves (tier 90)': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'necromancy'
    },
    'deathdealer boots (tier 90)': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'boots',
        style: 'necromancy'
    },
    'cinderbane gloves': {
        'necromancy strength': 11,
        'magic strength': 11,
        'melee strength': 11,
        'ranged strength': 11,
        slot: 'gloves',
        style: 'hybrid'
    },
    'laceration boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 12.7,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'enhanced laceration boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'fleeting boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 12.7,
        slot: 'boots',
        style: 'ranged'
    },
    'enhanced fleeting boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 14.5,
        slot: 'boots',
        style: 'ranged'
    },
    'blast diffusion boots': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'boots',
        style: 'magic'
    },
    'enhanced blast diffusion boots': {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'boots',
        style: 'magic'
    },
    'silverhawk boots': {
        'necromancy strength': 6.9,
        'magic strength': 6.9,
        'melee strength': 6.9,
        'ranged strength': 6.9,
        slot: 'boots',
        style: 'hybrid'
    },
    'masterwork helm': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 23.2,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'melee'
    },
    'masterwork platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 34.8,
        'ranged strength': 0,
        slot: 'body',
        style: 'melee'
    },
    'masterwork platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 29,
        'ranged strength': 0,
        slot: 'legs',
        style: 'melee'
    },
    'masterwork gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'melee'
    },
    'masterwork boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'trimmed masterwork helm': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 24,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'melee'
    },
    'trimmed masterwork platebody': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 36,
        'ranged strength': 0,
        slot: 'body',
        style: 'melee'
    },
    'trimmed masterwork platelegs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 31,
        'ranged strength': 0,
        slot: 'legs',
        style: 'melee'
    },
    'trimmed masterwork boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'trimmed masterwork gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 15,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'melee'
    },
    'gloves of passage': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 13.5,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'melee'
    },
    'enhanced gloves of passage': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 14.5,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'melee'
    },
    'vestments of havoc hood': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 28,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'melee'
    },
    'vestments of havoc robe top': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 42,
        'ranged strength': 0,
        slot: 'body',
        style: 'melee'
    },
    'vestments of havoc robe bottom': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 37,
        'ranged strength': 0,
        slot: 'legs',
        style: 'melee'
    },
    'vestments of havoc boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 19,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'igneous kal-zuk': {
        'necromancy strength': 43,
        'magic strength': 43,
        'melee strength': 43,
        'ranged strength': 43,
        slot: 'cape',
        style: 'hybrid'
    },
    'igneous kal-mor': {
        'necromancy strength': 43,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'necromancy'
    },
    'igneous kal-xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 43,
        slot: 'cape',
        style: 'ranged'
    },
    'igneous kal-mej': {
        'necromancy strength': 0,
        'magic strength': 43,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'magic'
    },
    'igneous kal-ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 43,
        'ranged strength': 0,
        slot: 'cape',
        style: 'melee'
    },
    'essence of finality amulet': {
        'necromancy strength': 56,
        'magic strength': 56,
        'melee strength': 56,
        'ranged strength': 56,
        slot: 'necklace',
        style: 'hybrid'
    },
    'essence of finality amulet (or)': {
        'necromancy strength': 59,
        'magic strength': 59,
        'melee strength': 59,
        'ranged strength': 59,
        slot: 'necklace',
        style: 'hybrid'
    },
    'amulet of souls': {
        'necromancy strength': 46.3,
        'magic strength': 46.3,
        'melee strength': 46.3,
        'ranged strength': 46.3,
        slot: 'necklace',
        style: 'hybrid'
    },
    'amulet of souls (or)': {
        'necromancy strength': 48,
        'magic strength': 48,
        'melee strength': 48,
        'ranged strength': 48,
        slot: 'necklace',
        style: 'hybrid'
    },
    'erethdors grimoire': {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of ful': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of jas': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        slot: 'pocket',
        style: 'hybrid'
    },
    'scripture of amascut': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        slot: 'pocket',
        style: 'hybrid'
    },
    'gwd3 scripture': {
        'necromancy strength': 8,
        'magic strength': 8,
        'melee strength': 8,
        'ranged strength': 8,
        slot: 'pocket',
        style: 'hybrid'
    },
    'illuminated god book': {
        'necromancy strength': 7,
        'magic strength': 7,
        'melee strength': 7,
        'ranged strength': 7,
        slot: 'pocket',
        style: 'hybrid'
    },
    'scrimshaw of elements': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'pocket',
        style: 'hybrid'
    },
    'superior scrimshaw of elements': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'pocket',
        style: 'hybrid'
    },
    'scrimshaw of cruelty': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'pocket',
        style: 'hybrid'
    },
    'superior scrimshaw of cruelty': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'pocket',
        style: 'hybrid'
    },
    'kerapacs wristwraps': {
        'necromancy strength': 0,
        'magic strength': 13.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'magic'
    },
    'enhanced kerapacs wristwraps': {
        'necromancy strength': 0,
        'magic strength': 14.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'magic'
    },
    'nightmare gauntlets': {
        'necromancy strength': 13.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'ranged'
    },
    'enhanced nightmare gauntlets': {
        'necromancy strength': 14.5,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'ranged'
    },
    'jaws of the abyss': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 21.6,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'melee'
    },
    'salve amulet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'necklace',
        style: 'hybrid'
    },
    'salve amulet (e)': {
        'necromancy strength': 4.2,
        'magic strength': 4.2,
        'melee strength': 4.2,
        'ranged strength': 4.2,
        slot: 'necklace',
        style: 'hybrid'
    },
    'reavers ring': {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        slot: 'ring',
        style: 'hybrid'
    },
    'channelers ring': {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'ring',
        style: 'magic'
    },
    'channelers ring+': {
        'necromancy strength': 0,
        'magic strength': 30.4,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'ring',
        style: 'magic'
    },
    'stalkers ring': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        slot: 'ring',
        style: 'ranged'
    },
    'stalkers ring+': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 30.4,
        slot: 'ring',
        style: 'ranged'
    },
    'champions ring': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        slot: 'ring',
        style: 'melee'
    },
    'champions ring+': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 30.4,
        'ranged strength': 0,
        slot: 'ring',
        style: 'melee'
    },
    'asylum surgeons ring': {
        'necromancy strength': 21,
        'magic strength': 21,
        'melee strength': 21,
        'ranged strength': 21,
        slot: 'ring',
        style: 'hybrid'
    },
    'ring of death': {
        'necromancy strength': 25.2,
        'magic strength': 25.2,
        'melee strength': 25.2,
        'ranged strength': 25.2,
        slot: 'ring',
        style: 'hybrid'
    },
    'ring of death (i)': {
        'necromancy strength': 27.7,
        'magic strength': 27.7,
        'melee strength': 27.7,
        'ranged strength': 27.7,
        slot: 'ring',
        style: 'hybrid'
    },
    'asylum surgeons ring (i)': {
        'necromancy strength': 23.4,
        'magic strength': 23.4,
        'melee strength': 23.4,
        'ranged strength': 23.4,
        slot: 'ring',
        style: 'hybrid'
    },
    'zorgoths soul ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'ring',
        style: 'necromancy'
    },
    'occultists ring': {
        'necromancy strength': 30.4,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'ring',
        style: 'hybrid'
    },
    'luck of the dwarves': {
        'necromancy strength': 17.3,
        'magic strength': 17.3,
        'melee strength': 17.3,
        'ranged strength': 17.3,
        slot: 'ring',
        style: 'hybrid'
    },
    'luck of the dwarves (i)': {
        'necromancy strength': 19.8,
        'magic strength': 19.8,
        'melee strength': 19.8,
        'ranged strength': 19.8,
        slot: 'ring',
        style: 'hybrid'
    },
    'hazelmeres signet ring': {
        'necromancy strength': 21.0,
        'magic strength': 21.0,
        'melee strength': 21.0,
        'ranged strength': 21.0,
        slot: 'ring',
        style: 'hybrid'
    },
    'hazelmeres signet ring (i)': {
        'necromancy strength': 23.7,
        'magic strength': 23.7,
        'melee strength': 23.7,
        'ranged strength': 23.7,
        slot: 'ring',
        style: 'hybrid'
    },
    'amulet of zealots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'necklace',
        style: 'hybrid'
    },
    'TokHaar-Kal-Ket': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 33.5,
        'ranged strength': 0,
        slot: 'cape',
        style: 'melee'
    },
    'TokHaar-Kal-Xil': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 33.5,
        slot: 'cape',
        style: 'ranged'
    },
    'TokHaar-Kal-Mej': {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'magic'
    },
    'TokHaar-Kal-Mor': {
        'necromancy strength': 0,
        'magic strength': 33.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'necromancy'
    },
    'comp/max cape': {
        'necromancy strength': 31.5,
        'magic strength': 31.5,
        'melee strength': 31.5,
        'ranged strength': 31.5,
        slot: 'cape',
        style: 'hybrid'
    },
    'god cape': {
        'necromancy strength': 0,
        'magic strength': 31.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'magic'
    },
    'skill cape': {
        'necromancy strength': 21.6,
        'magic strength': 21.6,
        'melee strength': 21.6,
        'ranged strength': 21.6,
        slot: 'cape',
        style: 'hybrid'
    },
    'underworld grimoire 4': {
        'necromancy strength': 15,
        'magic strength': 15,
        'melee strength': 15,
        'ranged strength': 15,
        slot: 'pocket',
        style: 'hybrid'
    },
    'underworld grimoire 3': {
        'necromancy strength': 10,
        'magic strength': 10,
        'melee strength': 10,
        'ranged strength': 10,
        slot: 'pocket',
        style: 'hybrid'
    },
    'reaper necklace': {
        'necromancy strength': 36.8,
        'magic strength': 36.8,
        'melee strength': 36.8,
        'ranged strength': 36.8,
        slot: 'necklace',
        style: 'hybrid'
    },
    'reaper necklace (or)': {
        'necromancy strength': 38.4,
        'magic strength': 38.4,
        'melee strength': 38.4,
        'ranged strength': 38.4,
        slot: 'necklace',
        style: 'hybrid'
    },
    'conjurers raising amulet': {
        'necromancy strength': 44.1,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'necklace',
        style: 'necromancy'
    },
    'anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helm',
        style: 'magic'
    },
    'anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'magic'
    },
    'anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'magic'
    },
    'refined anima core of helm of seren': {
        'necromancy strength': 0,
        'magic strength': 21.6,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helm',
        style: 'magic'
    },
    'refined anima core body of seren': {
        'necromancy strength': 0,
        'magic strength': 32.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'magic'
    },
    'refined anima core legs of seren': {
        'necromancy strength': 0,
        'magic strength': 27.1,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'magic'
    },
    'virtus mask': {
        'necromancy strength': 0,
        'magic strength': 20.3,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helm',
        style: 'magic'
    },
    'virtus robe top': {
        'necromancy strength': 0,
        'magic strength': 30.5,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'magic'
    },
    'virtus robe bottom': {
        'necromancy strength': 0,
        'magic strength': 25.4,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'magic'
    },
    'virtus gloves': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'magic'
    },
    'virtus boots': {
        'necromancy strength': 0,
        'magic strength': 12.7,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'boots',
        style: 'magic'
    },
    'bandos helmet': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 17.7,
        'ranged strength': 0,
        slot: 'helm',
        style: 'melee'
    },
    'bandos chestplate': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 26.5,
        'ranged strength': 0,
        slot: 'body',
        style: 'melee'
    },
    'bandos tassets': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 22.1,
        'ranged strength': 0,
        slot: 'legs',
        style: 'melee'
    },
    'bandos gloves': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        slot: 'gloves',
        style: 'melee'
    },
    'bandos boots': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 11,
        'ranged strength': 0,
        slot: 'boots',
        style: 'melee'
    },
    'ghost hunter goggles': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'helmet',
        style: 'hybrid'
    },
    'ghost hunter body': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'body',
        style: 'hybrid'
    },
    'ghost hunter legs': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'legs',
        style: 'hybrid'
    },
    'ghost hunter backpack': {
        'necromancy strength': 0,
        'magic strength': 0,
        'melee strength': 0,
        'ranged strength': 0,
        slot: 'cape',
        style: 'hybrid'
    },
};

const ABILITIES = {
    NECRO_AUTO: 'necromancy auto',
    TOUCH_OF_DEATH: 'touch of death',
    SOUL_SAP: 'soul sap',
    SKELETON_WARRIOR_AUTO: 'skeleton warrior auto',
    SKELETON_WARRIOR_AUTO_10: 'skeleton warrior auto 10',
    VENGEFUL_GHOST_AUTO: 'vengeful ghost auto',
    PUTRID_ZOMBIE_AUTO: 'putrid zombie auto',
    COMMAND_PUTRID_ZOMBIE: 'command putrid zombie',
    COMMAND_PHANTOM_GUARDIAN: 'command phantom guardian',
    FINGER_OF_DEATH: 'finger of death',
    DEATHSKULLS: 'death skulls',
    DEATHSKULLS_4: 'death skulls 4',
    DEATHSKULLS_7: 'death skulls 7',
    SOUL_STRIKE: 'soul strike',
    SOUL_STRIKE_AOE: 'soul strike aoe',
    VOLLEY_OF_SOULS: 'volley of souls',
    VOLLEY_OF_SOULS_2: 'volley of souls 2',
    VOLLEY_OF_SOULS_3: 'volley of souls 3',
    VOLLEY_OF_SOULS_4: 'volley of souls 4',
    VOLLEY_OF_SOULS_5: 'volley of souls 5',
    SPECTRAL_SCYTHE_1: 'spectral scythe 1',
    SPECTRAL_SCYTHE_2: 'spectral scythe 2',
    SPECTRAL_SCYTHE_3: 'spectral scythe 3',
    BLOOD_SIPHON: 'blood siphon',
    BLOAT: 'bloat',
    DEATH_GRASP: 'death grasp',
    DEATH_ESSENCE: 'death essence',

    PIERCING_SHOT_HIT: 'piercing shot hit',
    PIERCING_SHOT: 'piercing shot',
    BINDING_SHOT: 'binding shot',
    SNIPE_HIT: 'snipe hit',
    SNIPE: 'snipe',
    DAZING_SHOT: 'dazing shot',
    GREATER_DAZING_SHOT: 'greater dazing shot',
    DEMORALISE: 'demoralise',
    NEEDLE_STRIKE: 'needle strike',
    FRAGMENTATION_SHOT_HIT: 'fragmentation shot hit',
    FRAGMENTATION_SHOT: 'fragmentation shot',
    RICOCHET: 'ricochet',
    GREATER_RICOCHET_1: 'greater ricochet 1',
    GREATER_RICOCHET_2: 'greater ricochet 2',
    GREATER_RICOCHET_3: 'greater ricochet 3',
    GREATER_RICOCHET: 'greater ricochet',
    CORRUPTION_SHOT: 'corruption shot',
    SNAP_SHOT_1: 'snap shot 1',
    SNAP_SHOT_2: 'snap shot 2',
    SNAP_SHOT: 'snap shot',
    TIGHT_BINDINGS: 'tight bindings',
    ROUT: 'rout',
    RAPID_FIRE_LAST_HIT: 'rapid fire last hit',
    RAPID_FIRE_HIT: 'rapid fire hit',
    RAPID_FIRE: 'rapid fire',
    BOMBARDMENT: 'bombardment',
    SALT_THE_WOUND: 'salt the wound',
    SHADOW_TENDRILS: 'shadow tendrils',
    DEADSHOT_INITIAL: 'deadshot initial',
    DEADSHOT_BLEED: 'deadshot bleed',
    DEADSHOT: 'deadshot',
    INCENDIARY_SHOT: 'incendiary shot',
    UNLOAD_HIT: 'unload hit',
    UNLOAD: 'unload',
    DEATHS_SWIFTNESS_DOT: 'death\'s swiftness dot',
    DEATHS_SWIFTNESS: 'death\'s swiftness',
    GREATER_DEATHS_SWIFTNESS: 'greater death\'s swiftness',
    BALANCE_BY_FORCE: 'balance by force',
    DESCENT_OF_DARKNESS_HIT: 'descent of darkness hit',
    DESCENT_OF_DARKNESS: 'descent of darkness',
    BALANCED_SHOT: 'balanced shot',
    AIMED_SHOT: 'aimed shot',
    POWER_SHOT: 'power shot',
    TWIN_FANG_HIT: 'twin fang hit',
    TWIN_FANG: 'twin fang',
    PHANTOM_STRIKE_INITIAL: 'phantom strike initial',
    PHANTOM_STRIKE_BLEED: 'phantom strike bleed',
    PHANTOM_STRIKE: 'phantom strike',
    HAMSTRING: 'hamstring',
    TWIN_SHOT_HIT: 'twin shot hit',
    TWIN_SHOT: 'twin shot',
    CHAIN_HIT: 'chain hit',
    RESTORATIVE_SHOT: 'restorative shot',
    SOUL_SHOT: 'soul shot',
    SPLIT_SOUL_ECB: 'split soul ecb',
    CRYSTAL_RAIN: 'crystal rain',
    DEEP_BURN: 'deep burn',
    DESTRUCTIVE_SHOT_HIT: 'destructive shot hit',
    DESTRUCTIVE_SHOT: 'destructive shot',
    DEFIANCE: 'defiance',

    WRACK: 'wrack',
    IMPACT: 'impact',
    WRACK_AND_RUIN: 'wrack and ruin',
    DRAGON_BREATH: 'dragon breath',
    SONIC_WAVE: 'sonic wave',
    SHOCK: 'shock',
    CONCENTRATED_BLAST_1: 'concentrated blast 1',
    CONCENTRATED_BLAST_2: 'concentrated blast 2',
    CONCENTRATED_BLAST_3: 'concentrated blast 3',
    CONCENTRATED_BLAST: 'concentrated blast',
    GREATER_CONCENTRATED_BLAST_1: 'greater concentrated blast 1',
    GREATER_CONCENTRATED_BLAST_2: 'greater concentrated blast 2',
    GREATER_CONCENTRATED_BLAST_3: 'greater concentrated blast 3',
    GREATER_CONCENTRATED_BLAST: 'greater concentrated blast',
    COMBUST_HIT: 'combust hit',
    COMBUST: 'combust',
    CHAIN: 'chain',
    GREATER_CHAIN: 'greater chain',
    MAGMA_TEMPEST_HIT: 'magma tempest hit',
    MAGMA_TEMPEST: 'magma tempest',
    CORRUPTION_BLAST: 'corruption blast',
    GREATER_SONIC_WAVE: 'greater sonic wave',
    ASPHYXIATE_HIT: 'asphyxiate hit',
    ASPHYXIATE: 'asphyxiate',
    DEEP_IMPACT: 'deep impact',
    HORROR: 'horror',
    DETONATE: 'detonate',
    WILD_MAGIC_HIT: 'wild magic hit',
    WILD_MAGIC: 'wild magic',
    SMOKE_TENDRILS_1: 'smoke tendrils 1',
    SMOKE_TENDRILS_2: 'smoke tendrils 2',
    SMOKE_TENDRILS_3: 'smoke tendrils 3',
    SMOKE_TENDRILS_4: 'smoke tendrils 4',
    SMOKE_TENDRILS: 'smoke tendrils',
    OMNIPOWER_REGULAR: 'omnipower regular',
    OMNIPOWER_IGNEOUS: 'omnipower igneous',
    OMNIPOWER: 'omnipower',
    TSUNAMI: 'tsunami',
    SUNSHINE_DOT: 'sunshine dot',
    TEMPEST_OF_ARMADYL_HIT_1: 'tempest of armadyl hit 1',
    TEMPEST_OF_ARMADYL_HIT_2: 'tempest of armadyl hit 2',
    TEMPEST_OF_ARMADYL_HIT_3: 'tempest of armadyl hit 3',
    TEMPEST_OF_ARMADYL_HIT_4: 'tempest of armadyl hit 4',
    TEMPEST_OF_ARMADYL_HIT_5: 'tempest of armadyl hit 5',
    TEMPEST_OF_ARMADYL: 'tempest of armadyl',
    INSTABILITY: 'instability',
    CLAWS_OF_GUTHIX: 'claws of guthix',
    IBAN_BLAST: 'iban blast',
    RUNE_FLAME: 'rune flame',
    DEVOUR: 'devour',
    REAP: 'reap',
    SOULFIRE_INITIAL: 'soulfire initial',
    SOULFIRE_BURN: 'soulfire burn',
    SOULFIRE: 'soulfire',
    SARADOMIN_STRIKE: 'saradomin strike',
    POWER_OF_DARKNESS: 'power of darkness',
    FROM_THE_SHADOWS_HIT: 'from the shadows hit',
    FROM_THE_SHADOWS: 'from the shadows',
    FLAMES_OF_ZAMORAK: 'flames of zamorak',
    MIASMIC_BARRAGE: 'miasmic barrage',
    TIME_STRIKE: 'time strike',

    SLICE: 'slice',
    BACKHAND: 'backhand',
    HAVOC: 'havoc',
    SMASH: 'smash',
    BARGE: 'barge',
    GREATER_BARGE: 'greater barge',
    SEVER: 'sever',
    BLADED_DIVE: 'bladed dive',
    SLAUGHTER_HIT: 'slaughter',
    SLAUGHTER: 'slaughter',
    FORCEFUL_BACKHAND: 'forceful backhand',
    FLURRY_HIT: 'flurry hit',
    FLURRY: 'flurry',
    GREATER_FLURRY_HIT: 'greater flurry hit',
    GREATER_FLURRY: 'greater flurry',
    HURRICANE_1: 'hurricane 1',
    HURRICANE_2: 'hurricane 2',
    HURRICANE: 'hurricane',
    BLOOD_TENDRILS_1: 'blood tendrils 1',
    BLOOD_TENDRILS_2: 'blood tendrils 2',
    BLOOD_TENDRILS: 'blood tendrils',
    OVERPOWER_HIT: 'overpower hit',
    OVERPOWER: 'overpower',
    MASSACRE_INITIAL: 'massacre initial',
    MASSACRE_BLEED: 'massacre bleed',
    MASSACRE: 'massacre',
    BALANCED_STRIKE: 'balanced strike',
    METEOR_STRIKE: 'meteor strike',
    KICK: 'kick',
    PUNISH: 'punish',
    DISMEMBER_HIT: 'dismember hit',
    DISMEMBER: 'dismember',
    FURY: 'fury',
    GREATER_FURY: 'greater fury',
    CLEAVE: 'cleave',
    DECIMATE: 'decimate',
    CHAOS_ROAR: 'chaos roar',
    STOMP: 'stomp',
    DESTROY_HIT: 'destroy hit',
    DESTROY: 'destroy',
    QUAKE: 'quake',
    ASSAULT_HIT: 'assault hit',
    ASSAULT: 'assault',
    PULVERISE: 'pulverise',
    FRENZY_HIT: 'frenzy hit',
    FRENZY: 'frenzy',
    VINE_CALL_INTIAL: 'vine call initial',
    VINE_CALL_AOE: 'vine call aoe',
    VINE_CALL: 'vine call',
    ENERGY_DRAIN: 'energy drain',
    FAVOUR_OF_THE_WAR_GOD: 'favour of the war god',
    ARMADYLS_JUDGEMENT: 'armadyls judgement',
    WARSTRIKE: 'warstrike',
    SUNDER: 'sunder',
    BACKSTAB: 'backstab',
    LIQUEFY: 'liquefy',
    CLOBBER: 'clobber',
    ICY_TEMPEST_1: 'icy tempest 1',
    ICY_TEMPEST_2: 'icy tempest 2',
    ICY_TEMPEST: 'icy tempest',
    WEAKEN_SPECIAL_ATTACK: 'weaken special attack',
    POWERSTAB: 'powerstab',
    SLICE_N_DICE_1: 'slice & dice 1',
    SLICE_N_DICE_2: 'slice & dice 2',
    SLICE_N_DICE_3: 'slice & dice 3',
    SLICE_N_DICE: 'slice & dice',
    DRACONIC_PUNCTURE_HIT: 'draconic puncture hit',
    DRACONIC_PUNCTURE: 'draconic puncture',
    SWEEP_HIT: 'sweep hit',
    SWEEP: 'sweep',
    DRACONIC_CLEAVE: 'draconic cleave',
    DRACONIC_BLOW: 'draconic blow',
    DRACONIC_SLASH: 'draconic slash',
    SHOVE: 'shove',
    IGNEOUS_CLEAVE_INITIAL: 'igneous cleave initial',
    IGNEOUS_CLEAVE_BLEED: 'igneous bleed bleed',
    IGNEOUS_CLEAVE: 'igneous cleave',
    QUICK_SMASH: 'quick smash',
    AIMED_STRIKE: 'aimed strike',
    DISRUPT: 'disrupt',
    GET_OVER_HERE: 'get over here!',
    IMPALE: 'impale',
    HEALING_BLADE: 'healing blade',
    SARADOMINS_LIGHTNING_HIT: 'saradomins lightning hit',
    SARADOMINS_LIGHTNING: 'saradomins lightning',
    OBLITERATE: 'obliterate',
    FEINT: 'feint',
    SPEAR_WALL: 'spear wall',
    ICE_CLEAVE: 'ice cleave',

    INGENUITY_OF_THE_HUMANS: 'ingenuity of the humans'
};

const abils = {
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
        'damage type': 'melee'
    },
    [ABILITIES.BACKHAND]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
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
    },
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
    },
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
    },
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
    },
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
    },
    [ABILITIES.SLAUGHTER]: {
        // ability name
        'min hit': 0.3, // min % of abil expressed as a decimal
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
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT,
                ABILITIES.SLAUGHTER_HIT
            ]
        }
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
    },
    [ABILITIES.FLURRY_HIT]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
        hits: {
            1: [ABILITIES.FLURRY_HIT],
            2: [],
            3: [ABILITIES.FLURRY_HIT],
            4: [],
            5: [ABILITIES.FLURRY_HIT],
            6: [],
            7: [ABILITIES.FLURRY_HIT]
        }
    },
    [ABILITIES.GREATER_FLURRY_HIT]: {
        // ability name
        'min hit': 1.0, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
        hits: {
            1: [ABILITIES.GREATER_FLURRY_HIT],
            2: [],
            3: [ABILITIES.GREATER_FLURRY_HIT],
            4: [],
            5: [ABILITIES.GREATER_FLURRY_HIT],
            6: [],
            7: [ABILITIES.GREATER_FLURRY_HIT]
        }
    },
    [ABILITIES.HURRICANE_1]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.HURRICANE_2]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.HURRICANE]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee', // basic, threshold, special attack, ability (necromancy classification), ultimate
        hits: {
            1: [ABILITIES.HURRICANE_1, 'next hit', ABILITIES.HURRICANE_2]
        }
    },
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
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
    },
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
        }
    },
    [ABILITIES.OVERPOWER_HIT]: {
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
    },
    [ABILITIES.OVERPOWER]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [ABILITIES.OVERPOWER_HIT]
        }
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
    },
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
    },
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
        }
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
    },
    [ABILITIES.BALANCED_STRIKE]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'idfk what this is', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
    },
    [ABILITIES.PUNISH]: {
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
    },
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
    },
    [ABILITIES.DISMEMBER]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee',
        hits: {
            1: [
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT,
                ABILITIES.DISMEMBER_HIT
            ]
        }
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
        'damage type': 'melee'
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
    },
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
    },
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
        'damage type': 'melee'
    },
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
        'damage type': 'melee'
    },
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
    },
    [ABILITIES.DESTROY_HIT]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'channel', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    },
    [ABILITIES.DESTROY]: {
        // ability name
        'min hit': 1.2, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'channel', // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        }
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
    },
    [ABILITIES.ASSAULT_HIT]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'channel', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    },
    [ABILITIES.ASSAULT]: {
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
            1: [ABILITIES.ASSAULT_HIT],
            2: [],
            3: [ABILITIES.ASSAULT_HIT],
            4: [],
            5: [ABILITIES.ASSAULT_HIT],
            6: [],
            7: [ABILITIES.ASSAULT_HIT]
        }
    },
    [ABILITIES.PULVERISE]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'melee',
        'damage type': 'melee'
    },
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
    },
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
        }
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
    },
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
    },
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
        }
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
        'damage type': 'melee'
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
        'damage type': 'melee'
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
        'damage type': 'melee'
    },
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
        'damage type': 'melee'
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
        'damage type': 'melee'
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
        'damage type': 'melee'
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
        'damage type': 'melee'
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
    },
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
        'damage type': 'melee'
    },
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
        'damage type': 'melee'
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
        }
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
        'damage type': 'melee'
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
        'damage type': 'melee'
    },
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
    },
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
    },
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
    },
    [ABILITIES.SLICE_N_DICE]: {
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
            1: [
                ABILITIES.SLICE_N_DICE_1,
                'next hit',
                ABILITIES.SLICE_N_DICE_2,
                'next hit',
                ABILITIES.SLICE_N_DICE_3,
                'next hit',
                ABILITIES.SLICE_N_DICE_3
            ]
        }
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
    },
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
        }
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
    },
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
        hits: {
            1: [ABILITIES.SWEEP_HIT, 'next hit', ABILITIES.SWEEP_HIT]
        }
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
    },
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
    },
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
        'damage type': 'melee'
    },
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
        'damage type': 'melee'
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
        'damage type': 'melee'
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
        }
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
        }
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
        'damage type': 'melee'
    },
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
    },
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
    },
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
    },

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
    },
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
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SONIC_WAVE]: {
        // ability name
        'min hit': 0.95, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
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
    },
    [ABILITIES.CONCENTRATED_BLAST_1]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.CONCENTRATED_BLAST_2]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.CONCENTRATED_BLAST_3]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.CONCENTRATED_BLAST]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basiC', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.CONCENTRATED_BLAST_1],
            2: [ABILITIES.CONCENTRATED_BLAST_2],
            3: [ABILITIES.CONCENTRATED_BLAST_3]
        }
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_1]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_2]: {
        // ability name
        'min hit': 0.51, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST_3]: {
        // ability name
        'min hit': 0.57, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.GREATER_CONCENTRATED_BLAST]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
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
        }
    },
    [ABILITIES.COMBUST_HIT]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.06,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'burn', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.COMBUST]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
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
                ABILITIES.COMBUST_HIT
            ]
        }
    },
    [ABILITIES.CHAIN]: {
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
    },
    [ABILITIES.GREATER_CHAIN]: {
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
    },
    [ABILITIES.MAGMA_TEMPEST_HIT]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.05,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.MAGMA_TEMPEST]: {
        // ability name
        'min hit': 0.25, // min % of abil expressed as a decimal
        'var hit': 0.05,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.MAGMA_TEMPEST_HIT],
            2: [ABILITIES.MAGMA_TEMPEST_HIT],
            3: [ABILITIES.MAGMA_TEMPEST_HIT],
            4: [ABILITIES.MAGMA_TEMPEST_HIT],
            5: [ABILITIES.MAGMA_TEMPEST_HIT],
            6: [ABILITIES.MAGMA_TEMPEST_HIT],
            7: [ABILITIES.MAGMA_TEMPEST_HIT],
            8: [ABILITIES.MAGMA_TEMPEST_HIT]
        }
    },
    [ABILITIES.CORRUPTION_BLAST]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.ASPHYXIATE_HIT]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.ASPHYXIATE]: {
        // ability name
        'min hit': 1.1, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        hits: {
            1: [ABILITIES.ASPHYXIATE_HIT],
            2: [],
            3: [ABILITIES.ASPHYXIATE_HIT],
            4: [],
            5: [ABILITIES.ASPHYXIATE_HIT],
            6: [],
            7: [ABILITIES.ASPHYXIATE_HIT]
        }
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
    },
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
    },
    [ABILITIES.WILD_MAGIC_HIT]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.WILD_MAGIC]: {
        // ability name
        'min hit': 1.25, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic',
        hits: {
            1: [ABILITIES.WILD_MAGIC_HIT, 'next hit', ABILITIES.WILD_MAGIC_HIT]
        }
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
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SMOKE_TENDRILS_1]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SMOKE_TENDRILS_2]: {
        // ability name
        'min hit': 0.7, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SMOKE_TENDRILS_3]: {
        // ability name
        'min hit': 0.8, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SMOKE_TENDRILS_4]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
        hits: {
            1: [ABILITIES.SMOKE_TENDRILS_1],
            2: [],
            3: [ABILITIES.SMOKE_TENDRILS_2],
            4: [],
            5: [ABILITIES.SMOKE_TENDRILS_3],
            6: [],
            7: [ABILITIES.SMOKE_TENDRILS_4]
        }
    },
    [ABILITIES.OMNIPOWER_REGULAR]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.OMNIPOWER_IGNEOUS]: {
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
    },
    [ABILITIES.OMNIPOWER]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        hits: {
            1: [ABILITIES.OMNIPOWER_IGNEOUS, "next hit", ABILITIES.OMNIPOWER_IGNEOUS, "next hit", ABILITIES.OMNIPOWER_IGNEOUS, "next hit", ABILITIES.OMNIPOWER_IGNEOUS]
        }
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
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_1]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_2]: {
        // ability name
        'min hit': 0.5, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_3]: {
        // ability name
        'min hit': 0.55, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_4]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    },
    [ABILITIES.TEMPEST_OF_ARMADYL_HIT_5]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'channel', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic'
    },
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
        }
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
        'damage type': 'magic'
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
        'damage type': 'magic'
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
        'damage type': 'magic'
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
        'damage type': 'magic'
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
        'damage type': 'magic'
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
        'damage type': 'magic'
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
    },
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
    },
    [ABILITIES.SOULFIRE]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
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
            ]
        }
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
        'damage type': 'magic'
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
    },
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
        }
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
        'damage type': 'magic'
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
        'damage type': 'magic'
    },

    [ABILITIES.NECRO_AUTO]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.TOUCH_OF_DEATH]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.FINGER_OF_DEATH]: {
        // ability name
        'min hit': 2.7, // min % of abil expressed as a decimal
        'var hit': 0.6,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.SOUL_SAP]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        }
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
    },
    [ABILITIES.COMMAND_PUTRID_ZOMBIE]: {
        // ability name
        'min hit': 3.6, // min % of abil expressed as a decimal
        'var hit': 0.8,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.COMMAND_PHANTOM_GUARDIAN]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': false, // is the ability affected by damage potential
        'ability classification': 'conjure', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'conjure', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'spirit' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.BLOAT]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
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
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    [ABILITIES.DEATHSKULLS_4]: {
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
                ABILITIES.DEATHSKULLS
            ]
        }
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
        }
    },
    [ABILITIES.SOUL_STRIKE]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
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
    },
    [ABILITIES.VOLLEY_OF_SOULS]: {
        // ability name
        'min hit': 1.35, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic'
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
        }
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
        }
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
        }
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
        }
    },
    [ABILITIES.BLOOD_SIPHON]: {
        // ability name
        'min hit': 1.17, // min % of abil expressed as a decimal
        'var hit': 0.26,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic'
    },
    [ABILITIES.SPECTRAL_SCYTHE_1]: {
        // ability name
        'min hit': 0.72, // min % of abil expressed as a decimal
        'var hit': 0.16,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic'
    },
    [ABILITIES.SPECTRAL_SCYTHE_2]: {
        // ability name
        'min hit': 1.8, // min % of abil expressed as a decimal
        'var hit': 0.4,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic'
    },
    [ABILITIES.SPECTRAL_SCYTHE_3]: {
        // ability name
        'min hit': 2.25, // min % of abil expressed as a decimal
        'var hit': 0.5,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'necromancy',
        'damage type': 'necrotic'
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
        'damage type': 'necrotic'
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
        'damage type': 'necrotic'
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
    },
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
        hit_timings: [1, 1],
        hits: {
            1: [ABILITIES.PIERCING_SHOT, 'next cast', ABILITIES.PIERCING_SHOT]
        }
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
    },
    [ABILITIES.SNIPE_HIT]: {
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
        'duration': 4,
        hits: {
            1: [],
            2: [],
            3: [],
            4: [ABILITIES.SNIPE_HIT]   
        }
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
    },
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
    },
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
    },
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
    },
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
    },
    [ABILITIES.FRAGMENTATION_SHOT]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hit_timings: [1, 3, 5, 7, 9],
        hits: {
            1: [
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT,
                ABILITIES.FRAGMENTATION_SHOT_HIT
            ]
        }
    },
    [ABILITIES.RICOCHET]: {
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
    },
    [ABILITIES.GREATER_RICOCHET_1]: {
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
    },
    [ABILITIES.GREATER_RICOCHET_2]: {
        // ability name
        'min hit': 0.3, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.GREATER_RICOCHET_3]: {
        // ability name
        'min hit': 0.1, // min % of abil expressed as a decimal
        'var hit': 0.05,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.GREATER_RICOCHET]: {
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
        hit_timings: [0, 1, 1, 1, 1, 1, 1],
        hits: {
            1: [
                ABILITIES.GREATER_RICOCHET_1,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2,
                'next hit',
                ABILITIES.GREATER_RICOCHET_2
            ]
        }
    },
    [ABILITIES.CORRUPTION_SHOT]: {
        // ability name
        'min hit': 0.6, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'dot', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        hit_timings: [1, 3, 5, 7, 9], 
    },
    [ABILITIES.SNAP_SHOT_1]: {
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
    },
    [ABILITIES.SNAP_SHOT_2]: {
        // ability name
        'min hit': 1.5, // min % of abil expressed as a decimal
        'var hit': 0.3,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
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
        hit_timings: [0, 0], 
        hits: {
            1: [ABILITIES.SNAP_SHOT_1, 'next hit', ABILITIES.SNAP_SHOT_2]
        }
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
    },
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
    },
    [ABILITIES.RAPID_FIRE_HIT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.RAPID_FIRE_LAST_HIT]: {
        // ability name
        'min hit': 0.65, // min % of abil expressed as a decimal
        'var hit': 0.1,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.RAPID_FIRE]: {
        // ability name
        'min hit': 0.45, // min % of abil expressed as a decimal
        'var hit': 0.1,
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
        hit_timings: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    [ABILITIES.BOMBARDMENT]: {
        // ability name
        'min hit': 1.3, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
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
    },
    [ABILITIES.SHADOW_TENDRILS]: {
        // ability name
        'min hit': 2.0, // min % of abil expressed as a decimal
        'var hit': 0.7,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'threshold', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.DEADSHOT_INITIAL]: {
        // ability name
        'min hit': 1.15, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
    },
    [ABILITIES.DEADSHOT]: {
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
            1: [ABILITIES.DEADSHOT_INITIAL, ABILITIES.DEADSHOT_BLEED, ABILITIES.DEADSHOT_BLEED, ABILITIES.DEADSHOT_BLEED, ABILITIES.DEADSHOT_BLEED, ABILITIES.DEADSHOT_BLEED]
        }
    },
    [ABILITIES.DEADSHOT_BLEED]: {
        // ability name
        'min hit': 0.7, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': false, // does the ability get on-hit effects
        'crit effects': false, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'bleed', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ultimate', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged'
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
    },
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
        hit_timings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]//TODO Find out what these actually are
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
        hit_timings: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61]//TODO Find out what these actually are
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
    },
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
    },
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
        'duration': '7',
        hits: {
            1: [ABILITIES.UNLOAD_HIT],
            2: [],
            3: [ABILITIES.UNLOAD_HIT],
            4: [],
            5: [ABILITIES.UNLOAD_HIT],
            6: [],
            7: [ABILITIES.UNLOAD_HIT]
        }
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
        'adren cost': 30
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
    },
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
        hit_timings: [0, 0], 
        hits: {
            1: [ABILITIES.DESCENT_OF_DARKNESS_HIT, 'next hit', ABILITIES.DESCENT_OF_DARKNESS_HIT]
        },
        'adren cost': 65
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
        'adren cost': 35
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
    },
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
        'adren cost': 35
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
        'adren cost': 35
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
        'damage type': 'ranged'
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
        hit_timings: [1, 1],
        hits: {
            1: [ABILITIES.TWIN_FANG_HIT, 'next hit', ABILITIES.TWIN_FANG_HIT]
        },
        'adren cost': 50
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
    },
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
    },
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
        hit_timings: [1, 4, 7, 10, 13, 16, 19], //todo actual hit timings 
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
        'adren cost': 50
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
        'adren cost': 50
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
    },
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
        'adren cost': 35
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
        'adren cost': 10
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
        'adren cost': 30
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
        'adren cost': 50
    },
    [ABILITIES.SPLIT_SOUL_ECB]: {
        // ability name
        'min hit': 0.0, // min % of abil expressed as a decimal
        'var hit': 0.0,
        'on-hit effects': 0, // does the ability get on-hit effects
        'crit effects': 0, // can the ability crit
        'damage potential effects': 0, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'special attack', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged',
        'adren cost': 25
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
        hit_timings: [3, 4, 4, 4, 4], //TODO check these are correct
        'adren cost': 30
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
        'adren cost': 25
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
        'damage type': 'ranged'
    },
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
        'adren cost': 40
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
        'adren cost': 40
    },

    [ABILITIES.TIME_STRIKE]: {
        // ability name
        'min hit': 0.9, // min % of abil expressed as a decimal
        'var hit': 0.2,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'proc', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'basic', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'magic',
        'damage type': 'magic' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    'rapid fire necro': {
        // ability name
        'min hit': 0.33, // min % of abil expressed as a decimal
        'var hit': 0.04,
        'on-hit effects': true, // does the ability get on-hit effects
        'crit effects': true, // can the ability crit
        'damage potential effects': true, // is the ability affected by damage potential
        'ability classification': 'regular', // bleed, dot, burn, channel, regular, multihit
        'ability type': 'ability', // basic, threshold, special attack, ability (necromancy classification), ultimate
        'main style': 'ranged',
        'damage type': 'ranged' // basic, threshold, special attack, ability (necromancy classification), ultimate
    },
    'bolg proc': {
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
    },
    'bolg proc percentages': {
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
    },
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
        'duration': 0
    },
};

const prayers = {
    'charge': {
        'boost': 0.02,
        'style': 'magic',
        'category': 'single-stat boosting'
    },
    'super charge': {
        'boost': 0.04,
        'style': 'magic',
        'category': 'single-stat boosting'
    },
    'overcharge': {
        'boost': 0.06,
        'style': 'magic',
        'category': 'single-stat boosting'
    },
    'augury': {
        'boost': 0.08,
        'style': 'magic',
        'category': 'multi-stat boosting'
    },
    'leech magic strength 2': {
        'boost': 0.02,
        'style': 'magic',
        'category': 'leech curse'
    },
    'leech magic strength 4': {
        'boost': 0.04,
        'style': 'magic',
        'category': 'leech curse'
    },
    'leech magic strength 6': {
        'boost': 0.06,
        'style': 'magic',
        'category': 'leech curse'
    },
    'leech magic strength 8': {
        'boost': 0.08,
        'style': 'magic',
        'category': 'leech curse'
    },
    'torment': {
        'boost': 0.1,
        'style': 'magic',
        'category': 'multi-stat boosting'
    },
    'affliction': {
        'boost': 0.12,
        'style': 'magic',
        'category': 'multi-stat boosting'
    },

    'burst of strength': {
        'boost': 0.02,
        'style': 'melee',
        'category': 'single-stat boosting'
    },
    'superhuman strength': {
        'boost': 0.04,
        'style': 'melee',
        'category': 'single-stat boosting'
    },
    'ultimate strength': {
        'boost': 0.06,
        'style': 'melee',
        'category': 'single-stat boosting'
    },
    'chivalry': {
        'boost': 0.07,
        'style': 'melee',
        'category': 'multi-stat boosting'
    },
    'piety': {
        'boost': 0.08,
        'style': 'melee',
        'category': 'multi-stat boosting'
    },
    'leech melee strength 2': {
        'boost': 0.02,
        'style': 'melee',
        'category': 'leech curse'
    },
    'leech melee strength 4': {
        'boost': 0.04,
        'style': 'melee',
        'category': 'leech curse'
    },
    'leech melee strength 6': {
        'boost': 0.06,
        'style': 'melee',
        'category': 'leech curse'
    },
    'leech melee strength 8': {
        'boost': 0.08,
        'style': 'melee',
        'category': 'leech curse'
    },
    'turmoil': {
        'boost': 0.1,
        'style': 'melee',
        'category': 'multi-stat boosting'
    },
    'malevolence': {
        'boost': 0.12,
        'style': 'melee',
        'category': 'multi-stat boosting'
    },

    'unstoppable force': {
        'boost': 0.02,
        'style': 'ranged',
        'category': 'single-stat boosting'
    },
    'unrelenting force': {
        'boost': 0.04,
        'style': 'ranged',
        'category': 'single-stat boosting'
    },
    'overpowering force': {
        'boost': 0.06,
        'style': 'ranged',
        'category': 'single-stat boosting'
    },
    'rigour': {
        'boost': 0.08,
        'style': 'ranged',
        'category': 'multi-stat boosting'
    },
    'leech ranged strength 2': {
        'boost': 0.02,
        'style': 'ranged',
        'category': 'leech curse'
    },
    'leech ranged strength 4': {
        'boost': 0.04,
        'style': 'ranged',
        'category': 'leech curse'
    },
    'leech ranged strength 6': {
        'boost': 0.06,
        'style': 'ranged',
        'category': 'leech curse'
    },
    'leech ranged strength 8': {
        'boost': 0.08,
        'style': 'ranged',
        'category': 'leech curse'
    },
    'anguish': {
        'boost': 0.1,
        'style': 'ranged',
        'category': 'multi-stat boosting'
    },
    'desolation': {
        'boost': 0.12,
        'style': 'ranged',
        'category': 'multi-stat boosting'
    },

    'decay': {
        'boost': 0.02,
        'style': 'necromancy',
        'category': 'single-stat boosting'
    },
    'hastened decay': {
        'boost': 0.04,
        'style': 'necromancy',
        'category': 'single-stat boosting'
    },
    'accelerated decay': {
        'boost': 0.06,
        'style': 'necromancy',
        'category': 'single-stat boosting'
    },
    'sanctity': {
        'boost': 0.08,
        'style': 'necromancy',
        'category': 'multi-stat boosting'
    },
    'leech necromancy strength 2': {
        'boost': 0.02,
        'style': 'necromancy',
        'category': 'leech curse'
    },
    'leech necromancy strength 4': {
        'boost': 0.04,
        'style': 'necromancy',
        'category': 'leech curse'
    },
    'leech necromancy strength 6': {
        'boost': 0.06,
        'style': 'necromancy',
        'category': 'leech curse'
    },
    'leech necromancy strength 8': {
        'boost': 0.08,
        'style': 'necromancy',
        'category': 'leech curse'
    },
    'sorrow': {
        'boost': 0.1,
        'style': 'necromancy',
        'category': 'multi-stat boosting'
    },
    'ruination': {
        'boost': 0.12,
        'style': 'necromancy',
        'category': 'multi-stat boosting'
    },

    'none necro': {
        'boost': 0,
        'style': 'necromancy',
        'category': 'none'
    },
    'none magic': {
        'boost': 0,
        'style': 'magic',
        'category': 'none'
    },
    'none ranged': {
        'boost': 0,
        'style': 'ranged',
        'category': 'none'
    },
    'none melee': {
        'boost': 0,
        'style': 'melee',
        'category': 'none'
    },
};

export { ABILITIES, abils, armour, gear, prayers, weapons };

