export interface BossAffinities {
	weakness: number;
	melee: number;
	ranged: number;
	magic: number;
}

/** Stat overrides that can change at a phase transition */
export interface PhaseStats {
	name?: string;
	defenceLevel?: number;
	armour?: number;
	weakness?: string;
	style?: string;
	affinities?: BossAffinities;
}

export interface BossPhase {
	/** Cumulative damage dealt to reach this phase transition */
	hp: number;
	/** Ticks of downtime after this phase transition (boss invulnerable) */
	pause?: number;
	/** HP the boss heals at this phase transition (increases total damage needed) */
	heal?: number;
	/** Stat overrides that apply from this phase onwards */
	stats?: PhaseStats;
}

/** Configuration for bosses with enrage scaling */
export interface EnrageConfig {
	label: string;       // e.g. "Enrage %", "Corruption stacks"
	min: number;
	max: number;
	default: number;
	step?: number;       // defaults to 1
}

export interface BossPreset {
	name: string;
	defenceLevel: number;
	armour: number;
	weakness: string;
	style: string;
	affinities: BossAffinities;
	taggable: boolean;
	curseImmune: boolean;

	health?: number;
	phases?: Array<BossPhase>;
	enrage?: EnrageConfig;
}

// --- Bosses ---

// Araxxor / Araxxi
const araxxi: BossPreset = {
	name: 'Araxxi',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.6, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: true,
	enrage: { label: 'Enrage %', min: 0, max: 300, default: 0, step: 5 },

	health: 700000,
	phases: [
		{ hp: 200000, pause: 15 },
		{ hp: 400000, pause: 15 },
		{ hp: 600000, pause: 15, stats: {
			name: 'Araxxi',
			defenceLevel: 80,
			armour: 80,
			affinities: { weakness: 0.55, melee: 0.6, ranged: 0.55, magic: 0.45 }
		}},
		{ hp: 700000 } // Kill
	]
};

const araxxorMagic: BossPreset = {
	name: 'Araxxor (Magic)',
	defenceLevel: 85,
	armour: 90,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.5, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: true,
	enrage: { label: 'Enrage %', min: 0, max: 300, default: 0, step: 5 },

	health: 700000,
	phases: [
		{ hp: 200000, pause: 15 },
		{ hp: 400000, pause: 15 },
		{ hp: 600000, pause: 15, stats: {
			name: 'Araxxi', defenceLevel: 80, armour: 80,
			affinities: { weakness: 0.55, melee: 0.6, ranged: 0.55, magic: 0.45 }
		}},
		{ hp: 700000 }
	]
};

const araxxorMelee: BossPreset = {
	name: 'Araxxor (Melee)',
	defenceLevel: 85,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.5, ranged: 0.4, magic: 0.55 },
	taggable: false,
	curseImmune: true,
	enrage: { label: 'Enrage %', min: 0, max: 300, default: 0, step: 5 },

	health: 700000,
	phases: [
		{ hp: 200000, pause: 15 },
		{ hp: 400000, pause: 15 },
		{ hp: 600000, pause: 15, stats: {
			name: 'Araxxi', defenceLevel: 80, armour: 80,
			affinities: { weakness: 0.55, melee: 0.6, ranged: 0.55, magic: 0.45 }
		}},
		{ hp: 700000 }
	]
};

const araxxorRanged: BossPreset = {
	name: 'Araxxor (Ranged)',
	defenceLevel: 85,
	armour: 90,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.6, melee: 0.6, ranged: 0.45, magic: 0.4 },
	taggable: false,
	curseImmune: true,
	enrage: { label: 'Enrage %', min: 0, max: 300, default: 0, step: 5 },

	health: 700000,
	phases: [
		{ hp: 200000, pause: 15 },
		{ hp: 400000, pause: 15 },
		{ hp: 600000, pause: 15, stats: {
			name: 'Araxxi', defenceLevel: 80, armour: 80,
			affinities: { weakness: 0.55, melee: 0.6, ranged: 0.55, magic: 0.45 }
		}},
		{ hp: 700000 }
	]
};

// Arch-Glacor
const archGlacor: BossPreset = {
	name: 'Arch-Glacor',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false,
	enrage: { label: 'Enrage %', min: 0, max: 4000, default: 0, step: 5 }
};

// Barrows
const barrowsAhrim: BossPreset = {
	name: 'Barrows - Ahrim',
	defenceLevel: 70,
	armour: 65,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const barrowsLinza: BossPreset = {
	name: 'Barrows - Linza',
	defenceLevel: 75,
	armour: 75,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

// Raids - Beastmaster Durzag
const beastmasterDurzag: BossPreset = {
	name: 'Beastmaster Durzag',
	defenceLevel: 95,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const beastmasterCormes: BossPreset = {
	name: 'Beastmaster Durzag - Cormes',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Stab',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const beastmasterKrar: BossPreset = {
	name: 'Beastmaster Durzag - Krar',
	defenceLevel: 85,
	armour: 80,
	weakness: 'Water',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const beastmasterTuz: BossPreset = {
	name: 'Beastmaster Durzag - Tuz',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Bolt',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Misc Bosses
const chaosElemental: BossPreset = {
	name: 'Chaos elemental',
	defenceLevel: 69,
	armour: 69,
	weakness: 'Bolt',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// GWD1
const commanderZilyana: BossPreset = {
	name: 'Commander Zilyana',
	defenceLevel: 75,
	armour: 65,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const commanderZilyanaHM: BossPreset = {
	name: 'Commander Zilyana (HM)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.75, melee: 0.45, ranged: 0.4, magic: 0.5 },
	taggable: true,
	curseImmune: false
};

const corporealBeast: BossPreset = {
	name: 'Corporeal Beast',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false,

	health: 100000
};

// Dagannoth Kings
const dagannothPrime: BossPreset = {
	name: 'Dagannoth Prime',
	defenceLevel: 68,
	armour: 68,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.75, melee: 0.1, ranged: 0.6, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

const dagannothRex: BossPreset = {
	name: 'Dagannoth Rex',
	defenceLevel: 68,
	armour: 68,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.75, melee: 0.1, ranged: 0.1, magic: 0.6 },
	taggable: false,
	curseImmune: false
};

const dagannothSupreme: BossPreset = {
	name: 'Dagannoth Supreme',
	defenceLevel: 68,
	armour: 68,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.75, melee: 0.6, ranged: 0.1, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

// Demon Boss
const demonBoss: BossPreset = {
	name: 'Demon boss',
	defenceLevel: 85,
	armour: 975,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.6, melee: 0.2, ranged: 0.1, magic: 0.35 },
	taggable: false,
	curseImmune: false
};

// Elite Dungeons - ED1
const ed1SanctumGuardian: BossPreset = {
	name: 'ED1 - The Sanctum Guardian',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed1Masuta: BossPreset = {
	name: 'ED1 - Masuta the Ascended',
	defenceLevel: 85,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed1MasutaAir: BossPreset = {
	name: 'ED1 - Masuta the Ascended (air)',
	defenceLevel: 85,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const ed1Seiryu: BossPreset = {
	name: 'ED1 - Seiryu the Azure Serpent',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed1BlackCrystal: BossPreset = {
	name: 'ED1 - Black crystal',
	defenceLevel: 80,
	armour: 1,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

// Elite Dungeons - ED2
const ed2Astellarn: BossPreset = {
	name: 'ED2 - Astellarn',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2VerakLith: BossPreset = {
	name: 'ED2 - Verak Lith',
	defenceLevel: 85,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2BlackStoneDragon: BossPreset = {
	name: 'ED2 - Black Stone Dragon',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2BlackHand: BossPreset = {
	name: 'ED2 - Black Hand',
	defenceLevel: 82,
	armour: 82,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Elite Dungeons - ED3
const ed3CrassianLeviathan: BossPreset = {
	name: 'ED3 - Crassian Leviathan',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed3Taraket: BossPreset = {
	name: 'ED3 - Taraket the Necromancer',
	defenceLevel: 85,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed3Ambassador: BossPreset = {
	name: 'ED3 - Ambassador',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Kalphite
const exiledKalphiteQueen1: BossPreset = {
	name: 'Exiled Kalphite Queen (1st form)',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.1, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

const exiledKalphiteQueen2: BossPreset = {
	name: 'Exiled Kalphite Queen (2nd form)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.6, melee: 0.6, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// GWD1
const generalGraardor: BossPreset = {
	name: 'General Graardor',
	defenceLevel: 75,
	armour: 65,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.75, melee: 0.5, ranged: 0.1, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const generalGraardorHM: BossPreset = {
	name: 'General Graardor (HM)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.6, ranged: 0.7, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const giantMole: BossPreset = {
	name: 'Giant mole',
	defenceLevel: 50,
	armour: 45,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

// GWD2
const gregorovic: BossPreset = {
	name: 'Gregorovic',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const gregorovicCM: BossPreset = {
	name: 'Gregorovic (CM)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Fight Kiln / Cauldron
const harAkenHead: BossPreset = {
	name: 'Har-Aken (head)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const harAkenMagicTentacle: BossPreset = {
	name: 'Har-Aken (Magic tentacle)',
	defenceLevel: 76,
	armour: 76,
	weakness: 'Thrown',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const harAkenRangedTentacle: BossPreset = {
	name: 'Har-Aken (Ranged tentacle)',
	defenceLevel: 76,
	armour: 76,
	weakness: 'Slash',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

// GWD2
const helwyr: BossPreset = {
	name: 'Helwyr',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const helwyrCM: BossPreset = {
	name: 'Helwyr (CM)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// GWD1
const krilTsutsaroth: BossPreset = {
	name: "K'ril Tsutsaroth",
	defenceLevel: 75,
	armour: 65,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.75, melee: 0.45, ranged: 0.4, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const krilTsutsarothHM: BossPreset = {
	name: "K'ril Tsutsaroth (HM)",
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.6, ranged: 0.7, magic: 0.8 },
	taggable: false,
	curseImmune: false
};

// Kalphite King
const kalphiteKingMagic: BossPreset = {
	name: 'Kalphite King (Magic)',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.6, melee: 0.5, ranged: 0.4, magic: 0.3 },
	taggable: false,
	curseImmune: false
};

const kalphiteKingMelee: BossPreset = {
	name: 'Kalphite King (Melee)',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.65, melee: 0.4, ranged: 0.3, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const kalphiteKingRanged: BossPreset = {
	name: 'Kalphite King (Ranged)',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.6, melee: 0.3, ranged: 0.5, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const kalphiteQueen1: BossPreset = {
	name: 'Kalphite Queen (1st form)',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.1, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

const kalphiteQueen2: BossPreset = {
	name: 'Kalphite Queen (2nd form)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.6, melee: 0.6, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// Kerapac
const kerapac: BossPreset = {
	name: 'Kerapac',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false,

	health: 525000,
	phases: [{ hp: 150000 }, { hp: 300000 }, { hp: 450000 }]
};

const kerapacHM: BossPreset = {
	name: 'Kerapac HM',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false,

	health: 1700000,
	phases: [{ hp: 400000 }, { hp: 800000 }, { hp: 1200000 }]
};

const kerapacEcho: BossPreset = {
	name: 'Kerapac - Echo',
	defenceLevel: 87,
	armour: 87,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const kingBlackDragon: BossPreset = {
	name: 'King Black Dragon',
	defenceLevel: 60,
	armour: 60,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// GWD1
const kreeArra: BossPreset = {
	name: "Kree'Arra",
	defenceLevel: 75,
	armour: 65,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.1, melee: 0.1, ranged: 0.7, magic: 0.7 },
	taggable: false,
	curseImmune: false,

	health: 75000
};

const kreeArraHM: BossPreset = {
	name: "Kree'Arra (HM)",
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.6, magic: 0.7 },
	taggable: false,
	curseImmune: false,

	health: 100000
};

const legiones: BossPreset = {
	name: 'Legiones',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.7, melee: 0.07, ranged: 0.7, magic: 0.15 },
	taggable: false,
	curseImmune: false
};

const magister: BossPreset = {
	name: 'Magister',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Nex
const nex: BossPreset = {
	name: 'Nex',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: true
};

const nexAoD: BossPreset = {
	name: 'Nex: Angel of Death',
	defenceLevel: 99,
	armour: 95,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false,
	
	health: 3000000,
	phases: [{ hp: 900000 }, { hp: 300000 }, { hp: 1200000 }]
};


const nexAoDMinion: BossPreset = {
	name: 'Nex: AoD - Minion',
	defenceLevel: 99,
	armour: 90,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.8, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const nexAoDMinionWeakened: BossPreset = {
	name: 'Nex: AoD - Minion (weakened)',
	defenceLevel: 99,
	armour: 85,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.8, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const nexAoDCrystal: BossPreset = {
	name: 'Nex: AoD - Crystal',
	defenceLevel: 90,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const nomad: BossPreset = {
	name: 'Nomad',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const queenBlackDragon: BossPreset = {
	name: 'Queen Black Dragon',
	defenceLevel: 80,
	armour: 83,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};
// Raksha
const raksha: BossPreset = {
	name: 'Raksha',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false,

	health: 800000,
	phases: [
		{ hp: 200000 },
		{ hp: 400000 },
		{ hp: 600000, heal: 200000, pause: 12 }, // heals from 200k to 400k
		{ hp: 1000000 } // kill (600k + 400k total damage)
	]
};

// Rex Matriarchs
const rexOrikalka: BossPreset = {
	name: 'Rex Matriarch - Orikalka (Melee)',
	defenceLevel: 96,
	armour: 96,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.82, melee: 0.1, ranged: 0.1, magic: 0.64 },
	taggable: false,
	curseImmune: false
};

const rexPhentraken: BossPreset = {
	name: 'Rex Matriarch - Phentraken (Magic)',
	defenceLevel: 96,
	armour: 96,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.82, melee: 0.1, ranged: 0.64, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

const rexRathis: BossPreset = {
	name: 'Rex Matriarch - Rathis (Ranged)',
	defenceLevel: 96,
	armour: 96,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.82, melee: 0.64, ranged: 0.1, magic: 0.1 },
	taggable: false,
	curseImmune: false
};

// Rise of the Six
const rot6Ahrim: BossPreset = {
	name: 'Rise of the 6 - Ahrim',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const rot6Dharok: BossPreset = {
	name: 'Rise of the 6 - Dharok',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const rot6Guthan: BossPreset = {
	name: 'Rise of the 6 - Guthan',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const rot6Karil: BossPreset = {
	name: 'Rise of the 6 - Karil',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const rot6Torag: BossPreset = {
	name: 'Rise of the 6 - Torag',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const rot6Verac: BossPreset = {
	name: 'Rise of the 6 - Verac',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// Solak
const solak: BossPreset = {
	name: 'Solak',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const solakArmsLegs: BossPreset = {
	name: 'Solak - Arms/Legs',
	defenceLevel: 60,
	armour: 60,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const solakErethdor: BossPreset = {
	name: 'Solak - Erethdor',
	defenceLevel: 70,
	armour: 0,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const solakRoots: BossPreset = {
	name: 'Solak - Roots',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Telos
const telos: BossPreset = {
	name: 'Telos',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false,
	enrage: { label: 'Enrage %', min: 0, max: 4000, default: 100, step: 5 }
};

const telosAnimaGolemP3: BossPreset = {
	name: 'Telos - Anima golem (p3)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const telosAnimaGolemP45: BossPreset = {
	name: 'Telos - Anima golem (p4/5)',
	defenceLevel: 85,
	armour: 80,
	weakness: 'Water',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

// Fight Cave / Kiln
const tokHaarJad: BossPreset = {
	name: 'TokHaar-Jad',
	defenceLevel: 79,
	armour: 79,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// GWD2 - Twin Furies
const twinFuriesAvaryss: BossPreset = {
	name: 'Twin Furies - Avaryss',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const twinFuriesNymora: BossPreset = {
	name: 'Twin Furies - Nymora',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const twinFuriesCMAvaryss: BossPreset = {
	name: 'Twin Furies (CM) - Avaryss',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const twinFuriesCMNymora: BossPreset = {
	name: 'Twin Furies (CM) - Nymora',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// TzKal-Zuk / TzTok-Jad
const tzKalZuk: BossPreset = {
	name: 'TzKal-Zuk',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.65 },
	taggable: false,
	curseImmune: false,

	health: 600000,
	phases: [{ hp: 500000 }]
};

const tzKalZukHM: BossPreset = {
	name: 'TzKal-Zuk HM',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.65 },
	taggable: false,
	curseImmune: false,

	health: 1200000,
	phases: [{ hp: 1100000 }]
};

const tzTokJad: BossPreset = {
	name: 'TzTok-Jad',
	defenceLevel: 70,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// GWD2 - Vindicta
const vindictaP1: BossPreset = {
	name: 'Vindicta and Gorvek (phase 1)',
	defenceLevel: 75,
	armour: 75,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const vindictaP2: BossPreset = {
	name: 'Vindicta and Gorvek (phase 2)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const vindictaCMP1: BossPreset = {
	name: 'Vindicta and Gorvek (CM phase 1)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const vindictaCMP2: BossPreset = {
	name: 'Vindicta and Gorvek (CM phase 2)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

// Vorago
const vorago: BossPreset = {
	name: 'Vorago',
	defenceLevel: 90,
	armour: 85,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: true
};

const voragoBHD: BossPreset = {
	name: 'Vorago (bring him down)',
	defenceLevel: 90,
	armour: 70,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: true
};

const voragoVitalis: BossPreset = {
	name: 'Vorago - Vitalis',
	defenceLevel: 75,
	armour: 60,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.6, melee: 0.4, ranged: 0.4, magic: 0.6 },
	taggable: false,
	curseImmune: true
};

const voragoScopulus: BossPreset = {
	name: 'Vorago - Scopulus',
	defenceLevel: 90,
	armour: 85,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.6, melee: 0.4, ranged: 0.4, magic: 0.6 },
	taggable: false,
	curseImmune: true
};

const voragoStoneCloneMagic: BossPreset = {
	name: 'Vorago - Stone Clone (Magic)',
	defenceLevel: 99,
	armour: 85,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.4, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: true
};

const voragoStoneCloneMelee: BossPreset = {
	name: 'Vorago - Stone Clone (Melee)',
	defenceLevel: 99,
	armour: 85,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: true
};

const voragoStoneCloneRanged: BossPreset = {
	name: 'Vorago - Stone Clone (Ranged)',
	defenceLevel: 99,
	armour: 85,
	weakness: 'Slash',
	style: 'Range',
	affinities: { weakness: 0.4, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: true
};

// Raids - Yakamaru
const yakamaru: BossPreset = {
	name: 'Yakamaru',
	defenceLevel: 99,
	armour: 95,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const yakamaruJellyfish: BossPreset = {
	name: 'Yakamaru - Jellyfish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const yakamaruReflectingJellyfish: BossPreset = {
	name: 'Yakamaru - Reflecting Jellyfish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'Crush',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const yakamaruDurableJellyfish: BossPreset = {
	name: 'Yakamaru - Durable Jellyfish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'Slash',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const yakamaruMagicalJellyfish: BossPreset = {
	name: 'Yakamaru - Magical Jellyfish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const yakamaruPiercingJellyfish: BossPreset = {
	name: 'Yakamaru - Piercing Jellyfish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const yakamaruMeleefish: BossPreset = {
	name: 'Yakamaru - Meleefish',
	defenceLevel: 80,
	armour: 70,
	weakness: 'Earth',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

// Zamorak
const zamorak: BossPreset = {
	name: 'Zamorak, Lord of Chaos',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// --- Slayer Mobs ---

// Abyssal creatures
const abyssalBeast: BossPreset = {
	name: 'Abyssal beast',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Slash',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const abyssalLord: BossPreset = {
	name: 'Abyssal lord',
	defenceLevel: 95,
	armour: 95,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: true,
	curseImmune: false
};

const abyssalSavage: BossPreset = {
	name: 'Abyssal savage',
	defenceLevel: 75,
	armour: 75,
	weakness: 'Water',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: true,
	curseImmune: false
};

// Large slayer mobs
const acheronMammoth: BossPreset = {
	name: 'Acheron Mammoth',
	defenceLevel: 95,
	armour: 95,
	weakness: 'Stab',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const airutMelee: BossPreset = {
	name: 'Airut (Melee)',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const airutRanged: BossPreset = {
	name: 'Airut (Ranged)',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: true,
	curseImmune: false
};

// Nihils
const bloodNihil: BossPreset = {
	name: 'Blood nihil',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const iceNihil: BossPreset = {
	name: 'Ice nihil',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const shadowNihil: BossPreset = {
	name: 'Shadow nihil',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const smokeNihil: BossPreset = {
	name: 'Smoke nihil',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Misc slayer mobs
const chaosGiant: BossPreset = {
	name: 'Chaos giant',
	defenceLevel: 90,
	armour: 90,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

// Crystal Shapeshifters
const crystalShapeshifterMagic: BossPreset = {
	name: 'Crystal Shapeshifter (Magic)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'Thrown',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const crystalShapeshifterMelee: BossPreset = {
	name: 'Crystal Shapeshifter (Melee)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const crystalShapeshifterRanged: BossPreset = {
	name: 'Crystal Shapeshifter (Ranged)',
	defenceLevel: 80,
	armour: 80,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

// Edimmu
const edimmuOverworld: BossPreset = {
	name: 'Edimmu (Overworld)',
	defenceLevel: 85,
	armour: 85,
	weakness: 'Slash',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.3, ranged: 0.65, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const edimmuDungeoneering: BossPreset = {
	name: 'Edimmu (Dungeoneering)',
	defenceLevel: 85,
	armour: 70,
	weakness: 'Slash',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.3, ranged: 0.65, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const eliteEdimmu: BossPreset = {
	name: 'Elite Edimmu',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.3, ranged: 0.65, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

// Dragons
const eliteRuneDragon: BossPreset = {
	name: 'Elite Rune Dragon',
	defenceLevel: 92,
	armour: 92,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

const frostDragon: BossPreset = {
	name: 'Frost dragon',
	defenceLevel: 80,
	armour: 75,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const hydrixDragon: BossPreset = {
	name: 'Hydrix dragon',
	defenceLevel: 95,
	armour: 95,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.25, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// ED2 Dungeon Mobs
const ed2RedDragon: BossPreset = {
	name: 'ED2 - Red dragon',
	defenceLevel: 75,
	armour: 75,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2BlackDragon: BossPreset = {
	name: 'ED2 - Black dragon',
	defenceLevel: 75,
	armour: 80,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2CelestialDragon: BossPreset = {
	name: 'ED2 - Celestial dragon',
	defenceLevel: 75,
	armour: 82,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2DragonstoneDragon: BossPreset = {
	name: 'ED2 - Dragonstone dragon',
	defenceLevel: 75,
	armour: 82,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2OnyxDragon: BossPreset = {
	name: 'ED2 - Onyx dragon',
	defenceLevel: 75,
	armour: 84,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const ed2HydrixDragon: BossPreset = {
	name: 'ED2 - Hydrix dragon',
	defenceLevel: 75,
	armour: 85,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// Demons
const kalgerionDemon: BossPreset = {
	name: "Kal'gerion Demon",
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.4, ranged: 0.3, magic: 0.5 },
	taggable: false,
	curseImmune: false
};

// Misc slayer
const lavaStrykewyrm: BossPreset = {
	name: 'Lava strykewyrm',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.55, melee: 0.55, ranged: 0.55, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const mossGolem: BossPreset = {
	name: 'Moss Golem',
	defenceLevel: 95,
	armour: 95,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const mutatedJadinkoMale: BossPreset = {
	name: 'Mutated Jadinko Male',
	defenceLevel: 72,
	armour: 72,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: true,
	curseImmune: false
};

const siegeEngine: BossPreset = {
	name: 'Siege engine',
	defenceLevel: 95,
	armour: 90,
	weakness: 'Water',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: true,
	curseImmune: false
};

// Nodon dragonkin
const nodonEnforcer: BossPreset = {
	name: 'Nodon enforcer',
	defenceLevel: 99,
	armour: 99,
	weakness: 'Air',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const nodonEngineer: BossPreset = {
	name: 'Nodon engineer',
	defenceLevel: 95,
	armour: 97,
	weakness: 'Air',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const nodonArtificer: BossPreset = {
	name: 'Nodon artificer',
	defenceLevel: 94,
	armour: 94,
	weakness: 'Arrow',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.55, magic: 0.45 },
	taggable: true,
	curseImmune: false
};

const nodonGuard: BossPreset = {
	name: 'Nodon guard',
	defenceLevel: 94,
	armour: 94,
	weakness: 'Air',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.45, magic: 0.55 },
	taggable: true,
	curseImmune: false
};

const nodonHunter: BossPreset = {
	name: 'Nodon hunter',
	defenceLevel: 94,
	armour: 94,
	weakness: 'Stab',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.45 },
	taggable: true,
	curseImmune: false
};

// Revenants
const revenantDarkBeast: BossPreset = {
	name: 'Revenant Dark Beast',
	defenceLevel: 80,
	armour: 80,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const revenantDragon: BossPreset = {
	name: 'Revenant Dragon',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

const revenantKnight: BossPreset = {
	name: 'Revenant Knight',
	defenceLevel: 85,
	armour: 85,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.4, melee: 0.4, ranged: 0.4, magic: 0.4 },
	taggable: false,
	curseImmune: false
};

// Demons / Shadows
const ripperDemon: BossPreset = {
	name: 'Ripper Demon',
	defenceLevel: 90,
	armour: 90,
	weakness: 'Earth',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const runeDragon: BossPreset = {
	name: 'Rune Dragon',
	defenceLevel: 90,
	armour: 90,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.5, melee: 0.5, ranged: 0.5, magic: 0.5 },
	taggable: true,
	curseImmune: false
};

// Shadows (Amlodd)
const manifestShadow: BossPreset = {
	name: 'Manifest shadow',
	defenceLevel: 90,
	armour: 90,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const blissfulShadow: BossPreset = {
	name: 'Blissful shadow',
	defenceLevel: 80,
	armour: 80,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const truthfulShadow: BossPreset = {
	name: 'Truthful shadow',
	defenceLevel: 70,
	armour: 70,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: true,
	curseImmune: false
};

const wyvern: BossPreset = {
	name: 'Wyvern',
	defenceLevel: 91,
	armour: 91,
	weakness: 'Fire',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

// --- Training Dummies ---

const meleeTrainingDummyWeaker: BossPreset = {
	name: 'Melee training dummy (weaker)',
	defenceLevel: 0,
	armour: 128,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const rangedTrainingDummyWeaker: BossPreset = {
	name: 'Ranged training dummy (weaker)',
	defenceLevel: 0,
	armour: 128,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const magicTrainingDummyWeaker: BossPreset = {
	name: 'Magic training dummy (weaker)',
	defenceLevel: 0,
	armour: 128,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const meleeTrainingDummySame: BossPreset = {
	name: 'Melee training dummy (same)',
	defenceLevel: 0,
	armour: 1607,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.55, ranged: 0.45, magic: 0.65 },
	taggable: false,
	curseImmune: false
};

const rangedTrainingDummySame: BossPreset = {
	name: 'Ranged training dummy (same)',
	defenceLevel: 0,
	armour: 1607,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const magicTrainingDummySame: BossPreset = {
	name: 'Magic training dummy (same)',
	defenceLevel: 0,
	armour: 1607,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

const meleeTrainingDummyStronger: BossPreset = {
	name: 'Melee training dummy (stronger)',
	defenceLevel: 0,
	armour: 2415,
	weakness: 'None',
	style: 'Melee',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.45, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const rangedTrainingDummyStronger: BossPreset = {
	name: 'Ranged training dummy (stronger)',
	defenceLevel: 0,
	armour: 2415,
	weakness: 'None',
	style: 'Range',
	affinities: { weakness: 0.9, melee: 0.65, ranged: 0.55, magic: 0.45 },
	taggable: false,
	curseImmune: false
};

const magicTrainingDummyStronger: BossPreset = {
	name: 'Magic training dummy (stronger)',
	defenceLevel: 0,
	armour: 2415,
	weakness: 'None',
	style: 'Magic',
	affinities: { weakness: 0.9, melee: 0.45, ranged: 0.65, magic: 0.55 },
	taggable: false,
	curseImmune: false
};

// --- Enrage generators ---
// Each function takes a base preset and enrage value, returns modified preset.

type EnrageGenerator = (base: BossPreset, enrage: number) => BossPreset;

function generateAraxxorEnrage(base: BossPreset, enrage: number): BossPreset {
	// Araxxor: enrage 0-300%
	// HP scales: base 100k per phase, +1k per enrage% (p1-p3 each 100k+enrage*1k, p4 araxxi 100k+enrage*1k)
	// Defence doesn't scale, but damage taken increases (not modeled here as it's player-side)
	const hpPerPhase = 100000 + enrage * 1000;
	const totalHp = hpPerPhase * 4; // Approximate; p4 araxxi has different scaling but close enough
	const result = structuredClone(base);
	result.health = totalHp;
	if (result.phases) {
		result.phases = [
			{ hp: hpPerPhase, pause: 15 },
			{ hp: hpPerPhase * 2, pause: 15 },
			{ hp: hpPerPhase * 3, pause: 15, stats: result.phases[2]?.stats ? { ...result.phases[2].stats } : undefined },
			{ hp: totalHp }
		];
	}
	return result;
}

function generateTelosEnrage(base: BossPreset, enrage: number): BossPreset {
	// Telos: enrage 0-4000%
	// HP scales significantly with enrage
	// Base HP ~200k at 0%, scales up
	// Defence level and armour increase with enrage
	const result = structuredClone(base);

	// HP scaling: roughly 200k base, +2k per enrage% up to 600%, then slower
	if (enrage <= 600) {
		result.health = 200000 + enrage * 2000;
	} else {
		result.health = 1400000 + (enrage - 600) * 1000;
	}

	// Defence scales: base 80, +1 per 20 enrage (capped at ~99)
	result.defenceLevel = Math.min(99, 80 + Math.floor(enrage / 20));
	result.armour = Math.min(99, 80 + Math.floor(enrage / 20));

	return result;
}

function generateArchGlacorEnrage(base: BossPreset, enrage: number): BossPreset {
	// Arch-Glacor (HM): enrage 0-4000%
	// HP and defence scale with enrage
	const result = structuredClone(base);

	// HP scaling: base ~200k, increases with enrage
	result.health = 200000 + enrage * 1500;

	// Defence scales similarly to Telos
	result.defenceLevel = Math.min(99, 75 + Math.floor(enrage / 25));
	result.armour = Math.min(99, 75 + Math.floor(enrage / 25));

	return result;
}

/** Map of boss keys to their enrage generator functions */
const enrageGenerators: Record<string, EnrageGenerator> = {
	'Araxxi': generateAraxxorEnrage,
	'Araxxor (Magic)': generateAraxxorEnrage,
	'Araxxor (Melee)': generateAraxxorEnrage,
	'Araxxor (Ranged)': generateAraxxorEnrage,
	'Arch-Glacor': generateArchGlacorEnrage,
	'Telos': generateTelosEnrage,
};

/**
 * Returns the effective BossPreset for a given boss key and enrage value.
 * If the boss has no enrage mechanic or no generator, returns the base preset.
 */
export function getBossPresetWithEnrage(bossKey: string, enrage: number): BossPreset {
	const base = bossPresets[bossKey];
	if (!base) return base;
	const generator = enrageGenerators[bossKey];
	if (!generator || base.enrage == null) return base;
	return generator(base, enrage);
}

export const bossPresets: Record<string, BossPreset> = {
	// Araxxor / Araxxi
	'Araxxi': araxxi,
	'Araxxor (Magic)': araxxorMagic,
	'Araxxor (Melee)': araxxorMelee,
	'Araxxor (Ranged)': araxxorRanged,

	// Arch-Glacor
	'Arch-Glacor': archGlacor,

	// Barrows
	'Barrows - Ahrim': barrowsAhrim,
	'Barrows - Linza': barrowsLinza,

	// Raids - Beastmaster Durzag
	'Beastmaster Durzag': beastmasterDurzag,
	'Beastmaster Durzag - Cormes': beastmasterCormes,
	'Beastmaster Durzag - Krar': beastmasterKrar,
	'Beastmaster Durzag - Tuz': beastmasterTuz,

	// Misc
	'Chaos elemental': chaosElemental,

	// GWD1
	'Commander Zilyana': commanderZilyana,
	'Commander Zilyana (HM)': commanderZilyanaHM,
	'Corporeal Beast': corporealBeast,
	'General Graardor': generalGraardor,
	'General Graardor (HM)': generalGraardorHM,
	"K'ril Tsutsaroth": krilTsutsaroth,
	"K'ril Tsutsaroth (HM)": krilTsutsarothHM,
	"Kree'Arra": kreeArra,
	"Kree'Arra (HM)": kreeArraHM,

	// Dagannoth Kings
	'Dagannoth Prime': dagannothPrime,
	'Dagannoth Rex': dagannothRex,
	'Dagannoth Supreme': dagannothSupreme,

	// Demon Boss
	'Demon boss': demonBoss,

	// Elite Dungeons - ED1
	'ED1 - The Sanctum Guardian': ed1SanctumGuardian,
	'ED1 - Masuta the Ascended': ed1Masuta,
	'ED1 - Masuta the Ascended (air)': ed1MasutaAir,
	'ED1 - Seiryu the Azure Serpent': ed1Seiryu,
	'ED1 - Black crystal': ed1BlackCrystal,

	// Elite Dungeons - ED2
	'ED2 - Astellarn': ed2Astellarn,
	'ED2 - Verak Lith': ed2VerakLith,
	'ED2 - Black Stone Dragon': ed2BlackStoneDragon,
	'ED2 - Black Hand': ed2BlackHand,

	// Elite Dungeons - ED3
	'ED3 - Crassian Leviathan': ed3CrassianLeviathan,
	'ED3 - Taraket the Necromancer': ed3Taraket,
	'ED3 - Ambassador': ed3Ambassador,

	// Kalphite
	'Exiled Kalphite Queen (1st form)': exiledKalphiteQueen1,
	'Exiled Kalphite Queen (2nd form)': exiledKalphiteQueen2,
	'Kalphite Queen (1st form)': kalphiteQueen1,
	'Kalphite Queen (2nd form)': kalphiteQueen2,
	'Kalphite King (Magic)': kalphiteKingMagic,
	'Kalphite King (Melee)': kalphiteKingMelee,
	'Kalphite King (Ranged)': kalphiteKingRanged,

	// Misc Bosses
	'Giant mole': giantMole,
	'King Black Dragon': kingBlackDragon,
	'Legiones': legiones,
	'Magister': magister,
	'Nomad': nomad,
	'Queen Black Dragon': queenBlackDragon,

	// GWD2
	'Gregorovic': gregorovic,
	'Gregorovic (CM)': gregorovicCM,
	'Helwyr': helwyr,
	'Helwyr (CM)': helwyrCM,
	'Twin Furies - Avaryss': twinFuriesAvaryss,
	'Twin Furies - Nymora': twinFuriesNymora,
	'Twin Furies (CM) - Avaryss': twinFuriesCMAvaryss,
	'Twin Furies (CM) - Nymora': twinFuriesCMNymora,
	'Vindicta and Gorvek (phase 1)': vindictaP1,
	'Vindicta and Gorvek (phase 2)': vindictaP2,
	'Vindicta and Gorvek (CM phase 1)': vindictaCMP1,
	'Vindicta and Gorvek (CM phase 2)': vindictaCMP2,

	// Fight Cave / Kiln / Zuk
	'Har-Aken (head)': harAkenHead,
	'Har-Aken (Magic tentacle)': harAkenMagicTentacle,
	'Har-Aken (Ranged tentacle)': harAkenRangedTentacle,
	'TokHaar-Jad': tokHaarJad,
	'TzKal-Zuk': tzKalZuk,
	'TzKal-ZukHM': tzKalZukHM,
	'TzTok-Jad': tzTokJad,

	// Kerapac
	'Kerapac': kerapac,
	'Kerapac - Echo': kerapacEcho,

	// Nex
	'Nex': nex,
	'Nex: Angel of Death': nexAoD,
	'Nex: AoD - Minion': nexAoDMinion,
	'Nex: AoD - Minion (weakened)': nexAoDMinionWeakened,
	'Nex: AoD - Crystal': nexAoDCrystal,

	// Raksha
	'Raksha': raksha,

	// Rex Matriarchs
	'Rex Matriarch - Orikalka (Melee)': rexOrikalka,
	'Rex Matriarch - Phentraken (Magic)': rexPhentraken,
	'Rex Matriarch - Rathis (Ranged)': rexRathis,

	// Rise of the Six
	'Rise of the 6 - Ahrim': rot6Ahrim,
	'Rise of the 6 - Dharok': rot6Dharok,
	'Rise of the 6 - Guthan': rot6Guthan,
	'Rise of the 6 - Karil': rot6Karil,
	'Rise of the 6 - Torag': rot6Torag,
	'Rise of the 6 - Verac': rot6Verac,

	// Solak
	'Solak': solak,
	'Solak - Arms/Legs': solakArmsLegs,
	'Solak - Erethdor': solakErethdor,
	'Solak - Roots': solakRoots,

	// Telos
	'Telos': telos,
	'Telos - Anima golem (p3)': telosAnimaGolemP3,
	'Telos - Anima golem (p4/5)': telosAnimaGolemP45,

	// Vorago
	'Vorago': vorago,
	'Vorago (bring him down)': voragoBHD,
	'Vorago - Vitalis': voragoVitalis,
	'Vorago - Scopulus': voragoScopulus,
	'Vorago - Stone Clone (Magic)': voragoStoneCloneMagic,
	'Vorago - Stone Clone (Melee)': voragoStoneCloneMelee,
	'Vorago - Stone Clone (Ranged)': voragoStoneCloneRanged,

	// Raids - Yakamaru
	'Yakamaru': yakamaru,
	'Yakamaru - Jellyfish': yakamaruJellyfish,
	'Yakamaru - Reflecting Jellyfish': yakamaruReflectingJellyfish,
	'Yakamaru - Durable Jellyfish': yakamaruDurableJellyfish,
	'Yakamaru - Magical Jellyfish': yakamaruMagicalJellyfish,
	'Yakamaru - Piercing Jellyfish': yakamaruPiercingJellyfish,
	'Yakamaru - Meleefish': yakamaruMeleefish,

	// Zamorak
	'Zamorak, Lord of Chaos': zamorak,

	// --- Slayer Mobs ---

	// Abyssal creatures
	'Abyssal beast': abyssalBeast,
	'Abyssal lord': abyssalLord,
	'Abyssal savage': abyssalSavage,

	// Large slayer mobs
	'Acheron Mammoth': acheronMammoth,
	'Airut (Melee)': airutMelee,
	'Airut (Ranged)': airutRanged,

	// Nihils
	'Blood nihil': bloodNihil,
	'Ice nihil': iceNihil,
	'Shadow nihil': shadowNihil,
	'Smoke nihil': smokeNihil,

	// Misc slayer
	'Chaos giant': chaosGiant,

	// Crystal Shapeshifters
	'Crystal Shapeshifter (Magic)': crystalShapeshifterMagic,
	'Crystal Shapeshifter (Melee)': crystalShapeshifterMelee,
	'Crystal Shapeshifter (Ranged)': crystalShapeshifterRanged,

	// Edimmu
	'Edimmu (Overworld)': edimmuOverworld,
	'Edimmu (Dungeoneering)': edimmuDungeoneering,
	'Elite Edimmu': eliteEdimmu,

	// Dragons
	'Elite Rune Dragon': eliteRuneDragon,
	'Frost dragon': frostDragon,
	'Hydrix dragon': hydrixDragon,

	// ED2 Dungeon Mobs
	'ED2 - Red dragon': ed2RedDragon,
	'ED2 - Black dragon': ed2BlackDragon,
	'ED2 - Celestial dragon': ed2CelestialDragon,
	'ED2 - Dragonstone dragon': ed2DragonstoneDragon,
	'ED2 - Onyx dragon': ed2OnyxDragon,
	'ED2 - Hydrix dragon': ed2HydrixDragon,

	// Demons
	"Kal'gerion Demon": kalgerionDemon,

	// Misc slayer
	'Lava strykewyrm': lavaStrykewyrm,
	'Moss Golem': mossGolem,
	'Mutated Jadinko Male': mutatedJadinkoMale,
	'Siege engine': siegeEngine,

	// Nodon dragonkin
	'Nodon enforcer': nodonEnforcer,
	'Nodon engineer': nodonEngineer,
	'Nodon artificer': nodonArtificer,
	'Nodon guard': nodonGuard,
	'Nodon hunter': nodonHunter,

	// Revenants
	'Revenant Dark Beast': revenantDarkBeast,
	'Revenant Dragon': revenantDragon,
	'Revenant Knight': revenantKnight,

	// Demons / Shadows
	'Ripper Demon': ripperDemon,
	'Rune Dragon': runeDragon,
	'Manifest shadow': manifestShadow,
	'Blissful shadow': blissfulShadow,
	'Truthful shadow': truthfulShadow,

	// Misc
	'Wyvern': wyvern,

	// --- Training Dummies ---
	'Melee training dummy (weaker)': meleeTrainingDummyWeaker,
	'Ranged training dummy (weaker)': rangedTrainingDummyWeaker,
	'Magic training dummy (weaker)': magicTrainingDummyWeaker,
	'Melee training dummy (same)': meleeTrainingDummySame,
	'Ranged training dummy (same)': rangedTrainingDummySame,
	'Magic training dummy (same)': magicTrainingDummySame,
	'Melee training dummy (stronger)': meleeTrainingDummyStronger,
	'Ranged training dummy (stronger)': rangedTrainingDummyStronger,
	'Magic training dummy (stronger)': magicTrainingDummyStronger
};
