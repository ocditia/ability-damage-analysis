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
	'bow of the last guardian': {
		style: 'ranged',
		'weapon type': 'two-hand',
		tier: 95,
		type: 'bow',
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
	}
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
	'deathtouch braclet': {
		'necromancy strength': 14.5,
		'magic strength': 14.5,
		'melee strength': 14.5,
		'ranged strength': 14.5,
		slot: 'helmet',
		style: 'hybrid'
	},
	'none/tank': {
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
		slot: 'body',
		style: 'hybrid'
	},
	'none/tank': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'legs',
		style: 'hybrid'
	},
	'none/tank': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'boots',
		style: 'hybrid'
	},
	'none/tank': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'gloves',
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
	eof: {
		'necromancy strength': 56,
		'magic strength': 56,
		'melee strength': 56,
		'ranged strength': 56,
		slot: 'necklace',
		style: 'hybrid'
	},
	'eof (or)': {
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
	'channlers ring': {
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
	'champions ring': {
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
	'amulet of zealots': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'necklace',
		style: 'hybrid'
	},
	none: {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'necklace',
		style: 'hybrid'
	},
	'tank/none': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'ring',
		style: 'hybrid'
	},
	'tank/none': {
		'necromancy strength': 0,
		'magic strength': 0,
		'melee strength': 0,
		'ranged strength': 0,
		slot: 'cape',
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
	}
};

const ABILITIES = {
	NECRO_AUTO: 'necromancy auto',
	TOUCH_OF_DEATH: 'touch of death'
};

const abils = {
	slice: {
		// ability name
		'min hit': 0.95, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee'
	},
	backhand: {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee'
	},
	havoc: {
		// ability name
		'min hit': 1.0, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	smash: {
		// ability name
		'min hit': 1.0, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	barge: {
		// ability name
		'min hit': 0.75, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater barge': {
		// ability name
		'min hit': 0.75, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	sever: {
		// ability name
		'min hit': 1.1, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'bladed dive': {
		// ability name
		'min hit': 0.75, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	slaughter: {
		// ability name
		'min hit': 0.3, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'bleed', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'forceful backhand': {
		// ability name
		'min hit': 1.2, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	flurry: {
		// ability name
		'min hit': 0.6, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater flurry': {
		// ability name
		'min hit': 1.0, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'hurricane main': {
		// ability name
		'min hit': 1.2, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'hurricane aoe': {
		// ability name
		'min hit': 1.35, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'blood tendrils 1': {
		// ability name
		'min hit': 1.0, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'bleed', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'blood tendrils 2': {
		// ability name
		'min hit': 0.5, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'bleed', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	overpower: {
		// ability name
		'min hit': 2.7, // min % of abil expressed as a decimal
		'var hit': 0.6,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'massacre initial': {
		// ability name
		'min hit': 1.0, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'massacre bleed': {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.0,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'bleed', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'meteor strike': {
		// ability name
		'min hit': 2.7, // min % of abil expressed as a decimal
		'var hit': 0.6,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'massacre bleed': {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.0,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'bleed', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'balanced strike': {
		// ability name
		'min hit': 0.0, // min % of abil expressed as a decimal
		'var hit': 0.0,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'idfk what this is', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'melee',
		'damage type': 'melee' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},

	wrack: {
		// ability name
		'min hit': 0.95, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'wrack and ruin': {
		// ability name
		'min hit': 1.8, // min % of abil expressed as a decimal
		'var hit': 0.4,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	impact: {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'dragon breath': {
		// ability name
		'min hit': 1.1, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'sonic wave': {
		// ability name
		'min hit': 0.95, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	shock: {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'concentrated blast 1': {
		// ability name
		'min hit': 0.45, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'concentrated blast 2': {
		// ability name
		'min hit': 0.5, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'concentrated blast 3': {
		// ability name
		'min hit': 0.55, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater concentrated blast 1': {
		// ability name
		'min hit': 0.45, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater concentrated blast 2': {
		// ability name
		'min hit': 0.51, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater concentrated blast 3': {
		// ability name
		'min hit': 0.57, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	combust: {
		// ability name
		'min hit': 0.25, // min % of abil expressed as a decimal
		'var hit': 0.06,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'burn', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	chain: {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater chain': {
		// ability name
		'min hit': 0.65, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'magma tempest': {
		// ability name
		'min hit': 0.25, // min % of abil expressed as a decimal
		'var hit': 0.05,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'corruption blast': {
		// ability name
		'min hit': 0.6, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'dot', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'greater sonic wave': {
		// ability name
		'min hit': 1.15, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	asphyxiate: {
		// ability name
		'min hit': 1.1, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'hit ticks': [1, 3, 5, 7]
	},
	'deep impact': {
		// ability name
		'min hit': 1.2, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	horror: {
		// ability name
		'min hit': 1.2, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'wild magic': {
		// ability name
		'min hit': 1.25, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'smoke tendrils 1': {
		// ability name
		'min hit': 0.6, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'smoke tendrils 2': {
		// ability name
		'min hit': 0.7, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'smoke tendrils 3': {
		// ability name
		'min hit': 0.8, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'smoke tendrils 4': {
		// ability name
		'min hit': 0.9, // min % of abil expressed as a decimal
		'var hit': 0.4,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'channel', // bleed, dot, burn, etc
		'ability type': 'threshold', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	omnipower: {
		// ability name
		'min hit': 2.7, // min % of abil expressed as a decimal
		'var hit': 0.6,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'omnipower igenous': {
		// ability name
		'min hit': 1.2, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	tsunami: {
		// ability name
		'min hit': 2.25, // min % of abil expressed as a decimal
		'var hit': 0.5,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'sunshine dot': {
		// ability name
		'min hit': 0.1, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'dot', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},

	[ABILITIES.NECRO_AUTO]: {
		// ability name
		'min hit': 0.9, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic attack', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'necrotic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	[ABILITIES.TOUCH_OF_DEATH]: {
		// ability name
		'min hit': 0.9, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic attack', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'necrotic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'soul sap': {
		// ability name
		'min hit': 0.9, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'basic attack', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'necrotic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'skeleton warrior auto': {
		// ability name
		'min hit': 0.22, // min % of abil expressed as a decimal
		'var hit': 0.06,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'conjure', // bleed, dot, burn, etc
		'ability type': 'conjure', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'spirit' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'vengeful ghost auto': {
		// ability name
		'min hit': 0.18, // min % of abil expressed as a decimal
		'var hit': 0.04,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'conjure', // bleed, dot, burn, etc
		'ability type': 'conjure', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'spirit' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'putrid zombie auto': {
		// ability name
		'min hit': 0.18, // min % of abil expressed as a decimal
		'var hit': 0.04,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'conjure', // bleed, dot, burn, etc
		'ability type': 'conjure', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'spirit' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'command vengeful ghost auto': {
		// ability name
		'min hit': 3.6, // min % of abil expressed as a decimal
		'var hit': 0.8,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'conjure', // bleed, dot, burn, etc
		'ability type': 'conjure', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'spirit' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'command phantom guardian': {
		// ability name
		'min hit': 0.45, // min % of abil expressed as a decimal
		'var hit': 0.1,
		'on-hit effects': false, // does the ability get on-hit effects
		'crit effects': false, // can the ability crit
		'damage potential effects': false, // is the ability affected by damage potential
		'ability classification': 'conjure', // bleed, dot, burn, etc
		'ability type': 'conjure', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'spirit' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'bloat - full damage': {
		// ability name
		'min hit': 1.35, // min % of abil expressed as a decimal
		'var hit': 0.3,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ability', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'necrotic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'death skulls': {
		// ability name
		'min hit': 2.25, // min % of abil expressed as a decimal
		'var hit': 0.5,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ultimate', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'necromancy',
		'damage type': 'necrotic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},

	'time strike': {
		// ability name
		'min hit': 0.9, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'proc', // bleed, dot, burn, etc
		'ability type': 'basic', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'magic',
		'damage type': 'magic' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'rapid fire necro': {
		// ability name
		'min hit': 0.33, // min % of abil expressed as a decimal
		'var hit': 0.04,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'ability', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'ranged',
		'damage type': 'ranged' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'bolg proc': {
		// ability name
		'min hit': 0.95, // min % of abil expressed as a decimal
		'var hit': 0.2,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'proc', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'ranged',
		'damage type': 'ranged' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	},
	'bolg proc percentages': {
		// ability name
		'min hit': 0.33, // min % of abil expressed as a decimal
		'var hit': 0.04,
		'on-hit effects': true, // does the ability get on-hit effects
		'crit effects': true, // can the ability crit
		'damage potential effects': true, // is the ability affected by damage potential
		'ability classification': 'regular', // bleed, dot, burn, etc
		'ability type': 'proc', // basic, threshold, special attack, abilility (necromancy classification), ultimate
		'main style': 'ranged',
		'damage type': 'ranged' // basic, threshold, special attack, abilility (necromancy classification), ultimate
	}
};

// armour = {
//     /* example armour piece
//     'name lower case': {
//         'necromancy strength': 23.2, strength value with decimal
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet', options are helmet, body, legs, gloves, boots, pocket, necklace, ring, cape
//         'style': 'necromancy', options are necromancy, ranged, melee, magic, hybrid
//     },*/
//     'deathdealer hood (tier 90)': {
//         'necromancy strength': 23.2,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'necromancy',
//     },
//     'deathdealer robe top (tier 90)': {
//         'necromancy strength': 34.8,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'necromancy',
//     },
//     'deathdealer robe bottom (tier 90)': {
//         'necromancy strength': 29,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'necromancy',
//     },
//     'deathdealer gloves (tier 90)': {
//         'necromancy strength': 14.5,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'gloves',
//         'style': 'necromancy',
//     },
//     'deathdealer boots (tier 90)': {
//         'necromancy strength': 14.5,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'boots',
//         'style': 'necromancy',
//     },
//     'crown of the first necromancer': {
//         'necromancy strength': 25,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'necromancy',
//     },
//     'robe top of the first necromancer': {
//         'necromancy strength': 37,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'necromancy',
//     },
//     'robe bottom of the first necromancer': {
//         'necromancy strength': 32,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'necromancy',
//     },
//     'hand wrap of the first necromancer': {
//         'necromancy strength': 16,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'gloves',
//         'style': 'necromancy',
//     },
//     'foot wraps of the first necromancer': {
//         'necromancy strength': 16,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'boots',
//         'style': 'necromancy',
//     },
//     'none helmet': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'hybrid',
//     },
//     'none body': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'hybrid',
//     },
//     'none legs': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'hybrid',
//     },
//     'none gloves': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'gloves',
//         'style': 'hybrid',
//     },
//     'none boots': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'boots',
//         'style': 'hybrid',
//     },
//     'none necklace': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'necklace',
//         'style': 'hybrid',
//     },
//     'none ring': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'ring',
//         'style': 'hybrid',
//     },
//     'none pocket': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'pocket',
//         'style': 'hybrid',
//     },
//     'none cape': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'cape',
//         'style': 'hybrid',
//     },
//     'sirenic mask': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 23.2,
//         'slot': 'helmet',
//         'style': 'ranged',
//     },
//     'sirenic hauberk': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 34.8,
//         'slot': 'body',
//         'style': 'ranged',
//     },
//     'sirenic chaps': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 29,
//         'slot': 'legs',
//         'style': 'ranged',
//     },
//     'elite sirenic mask': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 24,
//         'slot': 'helmet',
//         'style': 'ranged',
//     },
//     'elite sirenic hauberk': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 36,
//         'slot': 'body',
//         'style': 'ranged',
//     },
//     'elite sirenic chaps': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 31,
//         'slot': 'legs',
//         'style': 'ranged',
//     },
//     'tectonic mask': {
//         'necromancy strength': 0,
//         'magic strength': 23.2,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'magic',
//     },
//     'tectonic robe top': {
//         'necromancy strength': 0,
//         'magic strength': 34.8,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'magic',
//     },
//     'tectonic robe bottom': {
//         'necromancy strength': 0,
//         'magic strength': 29,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'magic',
//     },
//     'elite tectonic mask': {
//         'necromancy strength': 0,
//         'magic strength': 24,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'magic',
//     },
//     'elite tectonic robe top': {
//         'necromancy strength': 0,
//         'magic strength': 36,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'magic',
//     },
//     'elite tectonic robe bottom': {
//         'necromancy strength': 0,
//         'magic strength': 31,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'magic',
//     },
//     'dracolich coif': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 23.2,
//         'slot': 'helmet',
//         'style': 'ranged',
//     },
//     'cracolich hauberk': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 34.8,
//         'slot': 'body',
//         'style': 'ranged',
//     },
//     'dracolich chaps': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 29,
//         'slot': 'legs',
//         'style': 'ranged',
//     },
//     'dracolich vambraces': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 14.5,
//         'slot': 'gloves',
//         'style': 'ranged',
//     },
//     'dracolich boots': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 14.5,
//         'slot': 'boots',
//         'style': 'ranged',
//     },
//     'elite dracolich coif': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 24,
//         'slot': 'helmet',
//         'style': 'ranged',
//     },
//     'elite dracolich hauberk': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 36,
//         'slot': 'body',
//         'style': 'ranged',
//     },
//     'elite dracolich chaps': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 31,
//         'slot': 'legs',
//         'style': 'ranged',
//     },
//     'elite dracolich vambraces': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 15,
//         'slot': 'gloves',
//         'style': 'ranged',
//     },
//     'elite dracolich boots': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 15,
//         'slot': 'boots',
//         'style': 'ranged',
//     },
//     'refined anima core helm of sliske tuskas might': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'helmet',
//         'style': 'hybrid',
//     },
//     'refined anima core body of sliske tuskas might': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'body',
//         'style': 'hybrid',
//     },
//     'refined anima core legs of sliske tuskas might': {
//         'necromancy strength': 0,
//         'magic strength': 0,
//         'melee strength': 0,
//         'ranged strength': 0,
//         'slot': 'legs',
//         'style': 'hybrid',
//     },
//     'deathtouch bracelet': {
//         'necromancy strength': 14.5,
//         'magic strength': 14.5,
//         'melee strength': 14.5,
//         'ranged strength': 14.5,
//         'slot': 'gloves',
//         'style': 'hybrid',
//     },
// }

const prayers = {
	charge: {
		boost: 0.02,
		style: 'magic',
		category: 'single-stat boosting'
	},
	'super charge': {
		boost: 0.04,
		style: 'magic',
		category: 'single-stat boosting'
	},
	overcharge: {
		boost: 0.06,
		style: 'magic',
		category: 'single-stat boosting'
	},
	augury: {
		boost: 0.08,
		style: 'magic',
		category: 'multi-stat boosting'
	},
	'leech magic strength 2': {
		boost: 0.02,
		style: 'magic',
		category: 'leech curse'
	},
	'leech magic strength 4': {
		boost: 0.04,
		style: 'magic',
		category: 'leech curse'
	},
	'leech magic strength 6': {
		boost: 0.06,
		style: 'magic',
		category: 'leech curse'
	},
	'leech magic strength 8': {
		boost: 0.08,
		style: 'magic',
		category: 'leech curse'
	},
	torment: {
		boost: 0.1,
		style: 'magic',
		category: 'multi-stat boosting'
	},
	affliction: {
		boost: 0.12,
		style: 'magic',
		category: 'multi-stat boosting'
	},

	'burst of strength': {
		boost: 0.02,
		style: 'melee',
		category: 'single-stat boosting'
	},
	'superhuman strength': {
		boost: 0.04,
		style: 'melee',
		category: 'single-stat boosting'
	},
	'ultimate strength': {
		boost: 0.06,
		style: 'melee',
		category: 'single-stat boosting'
	},
	chivlary: {
		boost: 0.07,
		style: 'melee',
		category: 'multi-stat boosting'
	},
	piety: {
		boost: 0.08,
		style: 'melee',
		category: 'multi-stat boosting'
	},
	'leech melee strength 2': {
		boost: 0.02,
		style: 'melee',
		category: 'leech curse'
	},
	'leech melee strength 4': {
		boost: 0.04,
		style: 'melee',
		category: 'leech curse'
	},
	'leech melee strength 6': {
		boost: 0.06,
		style: 'melee',
		category: 'leech curse'
	},
	'leech melee strength 8': {
		boost: 0.08,
		style: 'melee',
		category: 'leech curse'
	},
	turmoil: {
		boost: 0.1,
		style: 'melee',
		category: 'multi-stat boosting'
	},
	malevolence: {
		boost: 0.12,
		style: 'melee',
		category: 'multi-stat boosting'
	},

	'unstoppable force': {
		boost: 0.02,
		style: 'ranged',
		category: 'single-stat boosting'
	},
	'unrelenting force': {
		boost: 0.04,
		style: 'ranged',
		category: 'single-stat boosting'
	},
	'overpowering force': {
		boost: 0.06,
		style: 'ranged',
		category: 'single-stat boosting'
	},
	rigour: {
		boost: 0.08,
		style: 'ranged',
		category: 'multi-stat boosting'
	},
	'leech ranged strength 2': {
		boost: 0.02,
		style: 'ranged',
		category: 'leech curse'
	},
	'leech ranged strength 4': {
		boost: 0.04,
		style: 'ranged',
		category: 'leech curse'
	},
	'leech ranged strength 6': {
		boost: 0.06,
		style: 'ranged',
		category: 'leech curse'
	},
	'leech ranged strength 8': {
		boost: 0.08,
		style: 'ranged',
		category: 'leech curse'
	},
	anguish: {
		boost: 0.1,
		style: 'ranged',
		category: 'multi-stat boosting'
	},
	desolation: {
		boost: 0.12,
		style: 'ranged',
		category: 'multi-stat boosting'
	},

	decay: {
		boost: 0.02,
		style: 'necromancy',
		category: 'single-stat boosting'
	},
	'hastened decay': {
		boost: 0.04,
		style: 'necromancy',
		category: 'single-stat boosting'
	},
	'accelerated decay': {
		boost: 0.06,
		style: 'necromancy',
		category: 'single-stat boosting'
	},
	sanctity: {
		boost: 0.08,
		style: 'necromancy',
		category: 'multi-stat boosting'
	},
	'leech necromancy strength 2': {
		boost: 0.02,
		style: 'necromancy',
		category: 'leech curse'
	},
	'leech necromancy strength 4': {
		boost: 0.04,
		style: 'necromancy',
		category: 'leech curse'
	},
	'leech necromancy strength 6': {
		boost: 0.06,
		style: 'necromancy',
		category: 'leech curse'
	},
	'leech necromancy strength 8': {
		boost: 0.08,
		style: 'necromancy',
		category: 'leech curse'
	},
	sorrow: {
		boost: 0.1,
		style: 'necromancy',
		category: 'multi-stat boosting'
	},
	ruination: {
		boost: 0.12,
		style: 'necromancy',
		category: 'multi-stat boosting'
	}
};

export { ABILITIES, weapons, gear, abils, armour, prayers };
