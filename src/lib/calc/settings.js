const SETTINGS = {
	MODE: 'user value',
	MODE_VALUES: {
		MEAN: 'mean',
		MEAN_NO_CRIT: 'mean no crit',
		MEAN_CRIT: 'mean crit',
		MIN_NO_CRIT: 'min no crit',
		MIN_CRIT: 'min crit',
		MAX_NO_CRIT: 'max no crit',
		MAX_CRIT: 'max crit'
	},
	ABILITY_DAMAGE: 'ability damage',
	NECROMANCY_LEVEL: 'necromancy level',
	MAGIC_LEVEL: 'magic level',
	STRENGTH_LEVEL: 'strength level',
	RANGED_LEVEL: 'ranged level',
	POTION: 'potion',
	POTION_VALUES: {
		NONE: 'none',
		ELDER: 'elder overload',
		SUPREME: 'supreme overload',
		OVERLOAD: 'overload',
		EXTREME: 'extreme necromancy',
		SUPER: 'super necromancy',
		REGULAR: 'necromancy potion'
	},
	HIT_CHANCE: 'hit chance',
	NECROSIS_STACKS: 'necrosis stacks',
	REAPER_CREW: 'reaper crew',
	NECROMANCY_PRAYER: 'prayer',
	NECROMANCY_PRAYER_VALUES: {
		NONE: 'none',
		RUINATION: 'ruination',
		SORROW: 'sorrow',
		LEECH_NECRO_STRENGTH_2: 'leech necromancy strength 2',
		LEECH_NECRO_STRENGTH_4: 'leech necromancy strength 4',
		LEECH_NECRO_STRENGTH_6: 'leech necromancy strength 6',
		LEECH_NECRO_STRENGTH_8: 'leech necromancy strength 8',
		SANCTITY: 'sanctity',
		ACCELERATED_DECAY: 'accelerated decay',
		HASTENED_DECAY: 'hastened decay',
		DECAY: 'decay'
	},
	RUBY_AURORA: 'ruby aurora',
	REVENGE: 'revenge',
	BERSERKERS_FURY: 'berserkers fury',
	RUTHLESS_STACKS: 'ruthless stacks',
	SLAYER_HELM: 'slayer helm',
	SLAYER_HELM_VALUES: {
		NONE: 'none',
		REGULAR: 'slayer helmet',
		FULL: 'full slayer helmet',
		REINFORCED: 'reinforced slayer helmet',
		STRONG: 'strong slayer helmet',
		MIGHTY: 'mighty slayer helmet',
		CORRUPTED: 'corrupted slayer helmet'
	},
	GUARDHOUSE: 'guardhouse',
	GUARDHOUSE_VALUES: {
		NONE: 'none',
		LVL1: 'tier 1',
		LVL1_UNDEAD: 'tier 1 undead',
		LVL3: 'tier 3',
		LVL3_UNDEAD: 'tier 3 undead'
	},
	TARGET_HP_PERCENT: 'target hp percent',
	GENOCIDAL: 'genocidal',
	FAMILIAR: 'familiar',
	FAMILIAR_VALUES: {
		NONE: 'none',
		RIPPER_DEMON: 'ripper demon',
		KALGERION_DEMON: 'kalgerion demon'
	},
	AURA: 'aura',
	AURA_VALUES: {
		NONE: 'none',
		MAHJARRAT: 'mahjarrat',
		EQUILIBRIUM: 'equilibrium'
	},
	VULN: 'vulnerability',
	VULN_VALUES: {
		NONE: 'none',
		CURSE: 'curse',
		VULNERABILITY: 'vuln'
	},
	SMOKE_CLOUD: 'smoke cloud',
	CRYPTBLOOM: 'cryptbloom',
	SLAYER_PERK_UNDEAD: 'undead slayer perk',
	SLAYER_PERK_DRAGON: 'dragon slayer perk',
	SLAYER_PERK_DEMON: 'demon slayer perk',
	SLAYER_SIGIL_UNDEAD: 'undead slayer sigil',
	SLAYER_SIGIL_DRAGON: 'dragon slayer sigil',
	SLAYER_SIGIL_DEMON: 'demon slayer sigil',
	HAUNTED: 'haunted',
	HAUNTED_AD: 'haunted AD',
	SKELETON_WARRIOR_RAGE_STACKS: 'skeleton rage stacks',
	NOPE: 'nopenopenope',
	KALG_SPEC: 'kalg spec',
	CUSTOM_ON_AD: 'custom on ad',
	CUSTOM_ON_HIT: 'custom on hit',
	CUSTOM_ON_NPC: 'custom on npc',
	CUSTOM_CRIT: 'custom crit',
	HELMET: 'helmet',
	HELMET_VALUES: {
		NONE: 'none',
		TFN: 'crown of the first necromancer',
		T90DD: 'deathdealer hood (tier 90)',
	},
	BODY: 'body',
	BODY_VALUES: {
		NONE: 'none',
		TFN: 'robe top of the first necromancer',
		T90DD: 'deathdealer robe top (tier 90)',
	},
	LEGS: 'legs',
	LEGS_VALUES: {
		NONE: 'none',
		TFN: 'robe bottom of the first necromancer',
		T90DD: 'deathdealer robe bottom (tier 90)',
	},
	GLOVES: 'gloves',
	GLOVES_VALUES: {
		NONE: 'none',
		TFN: 'hand wrap of the first necromancer',
		T90DD: 'deathdealer gloves (tier 90)',
	},
	BOOTS: 'boots',
	BOOTS_VALUES: {
		NONE: 'none',
		TFN: 'foot wraps of the first necromancer',
		T90DD: 'deathdealer boots (tier 90)',
	},
	NECKLACE: 'necklace',
	NECKLACE_VALUES: {
		NONE: 'none',
		EOFOR: 'eof (or)',
		EOF: 'eof',
		MOONSTONE: 'conjurers raising amulet',
		AOSOR: 'amulet of souls (or)',
		AOS: 'amulet of souls',
		REAPEROR: 'reaper (or)',
		REAPER: 'reaper',
		SALVEE: 'salve amulet (e)',
		SALVE: 'salve amulet'
	},
	CAPE: 'cape',
	CAPE_VALUES: {
		NONE: 'none',
		ZUK: 'igneous kal-mor',
		KILN: 'tokhaar-kal-mor',
		COMP: 'completionist',
		GOD: 'god cape',
		MAX: 'max cape',
		SKILL: 'skill cape'
	},
	RING: 'ring',
	RING_VALUES: {
		NONE: 'none',
		REAVERS: 'reavers ring',
		ZORGOTH: 'zorgoths soul ring',
		RODI: 'ring of death (i)',
		ROD: 'ring of death',
		ASRI: 'asylum surgeon ring (i)',
		ASR: 'asylum surgeon ring'
	},
	POCKET: 'pocket',
	POCKET_VALUES: {
		NONE: 'none',
		GRIM: 'erethdors grimoire',
		FUL: 'scripture of ful',
		GWD3: 'gwd3 scripture',
		IGOD: 'illuminated god book',
		GOD: 'god book'
	},
	WEAPON: 'weapon type',
	WEAPON_VALUES: {
		DW: 'main-hand',
		TH: 'two-hand'
	},
	MH: 'main-hand weapon',
	MH_VALUES: {
		NONE: 'none',
		OMNI: 'omniguard',
		DG90: 'death guard (tier 90)',
	},
	OH: 'off-hand weapon',
	OH_VALUES: {
		NONE: 'none',
		SOULBOUND: 'soulbound lantern',
		SL90: 'skull lantern (tier 90)',
		SPECTRAL: 'spectral shield'
	},
	LVL20ARMOUR: 'level 20 armour',
	BITING: 'biting',
	PRECISE: 'precise',
	ERUPTIVE: 'eruptive',
	FLANKING: 'flanking',
	RUTHLESS_RANK: 'ruthless rank',
	TELOS_RED_BEAM: 'Telos red beam',
	TELOS_BLACK_BEAM: 'Telos black beam',
	TOKKUL_ZO: 'Tokkul-zo',
	KBD_ARTEFACT: 'King black dragon wilderness portal',
	INNER_CHAOS: 'Zamorak inner chaos',
	SWORD_OF_EDICTS: 'Zamorak sword of edicts',
	GUARDIANS_TRIUMPH: 'Zamorak guardians triumph',
	BALANCE_OF_POWER: 'Zamorak balance of power',
	ZAMORAK_CHOKE_STACKS: 'zamorak choke stacks',
	RAKSHA_INNER_POWER: 'Raksha inner power',
	STONE_OF_JAS: 'stone of jas',
	INFERNAL_PUZZLE_BOX: 'Infernal puzzle box',
	ICY_PRECISION: 'icy precision',
	PUNCTURE_STACKS: 'puncture stacks',
	FLOW_STACKS: 'flow stacks',
	CONFLAGRATE: 'conflagrate',
	KERAPACS_WRIST_WRAPS: 'kerapacs wrist wraps',
	KERAPACS_WRIST_WRAPS_VALUES: {
		NONE: 'none',
		REGULAR: 'regular',
		ENCHANTED: 'enchanted'
	},
	TARGET_DISABILITY: 'target disability',
	TARGET_DISABILITY_VALUES: {
		NONE: 'none',
		BOUND: 'bound',
		STUNNED: 'stunned',
		BOUND_STUNNED: 'bound and stunned'
	},
	DRACONIC_FRUIT: 'draconic fruit',
	ENDURING_RUIN_HIT: 'enduring ruin hit',
	ENDURING_RUIN_HIT_VALUES: {
		NONE: 'none',
		REGULAR: 'regular',
		ENCHANTED: 'enchanted'
	},
	ENDURING_RUIN_BLEED: 'enduring ruin bleed',
	ENDURING_RUIN_BLEED_VALUES: {
		NONE: 'none',
		REGULAR: 'regular',
		ENCHANTED: 'enchanted'
	},
	NEEDLE_STRIKE: 'needle strike',
	GRAVITATE: 'gravitate',
	BLOOD_TITHE: 'blood tithe',
	DEATH_SPARK: 'death spark',
	LIVING_DEATH: 'living death',
	SWIFTNESS_OF_THE_AVIANSIE: 'swiftness of the avianse',
	ESSENCE_CORRUPTION: 'essence corruption',
	CONFLAGRATE: 'conflagrate',
	WALKED_TARGET: 'walked target',
	CONCENTRATED_BLAST_STACKS: 'concentrated blast stacks',
};

const settingsConfig = {
	[SETTINGS.MODE]: {
		label: 'Mode',
		default: SETTINGS.MODE_VALUES.MEAN,
		options: [
			{ text: 'Mean', value: SETTINGS.MODE_VALUES.MEAN },
			{ text: 'Mean no crit', value: SETTINGS.MODE_VALUES.MEAN_NO_CRIT },
			{ text: 'Mean crit', value: SETTINGS.MODE_VALUES.MEAN_CRIT },
			{ text: 'Min no crit', value: SETTINGS.MODE_VALUES.MIN_NO_CRIT },
			{ text: 'Min crit', value: SETTINGS.MODE_VALUES.MIN_CRIT },
			{ text: 'Max no crit', value: SETTINGS.MODE_VALUES.MAX_NO_CRIT },
			{ text: 'Max crit', value: SETTINGS.MODE_VALUES.MAX_CRIT }
		]
	},
	[SETTINGS.ABILITY_DAMAGE]: {
		label: 'Override base damage',
		default: 0
	},
	[SETTINGS.NECROMANCY_LEVEL]: {
		label: 'Necromancy Level',
		default: 145,
		style: 'necromancy'
	},
	[SETTINGS.MAGIC_LEVEL]: {
		label: 'Magic Level',
		default: 130,
		style: 'magic'
	},
	[SETTINGS.STRENGTH_LEVEL]: {
		label: 'Strength Level',
		default: 99
	},
	[SETTINGS.RANGED_LEVEL]: {
		label: 'Ranged Level',
		default: 99
	},
	[SETTINGS.POTION]: {
		label: 'Potion',
		default: SETTINGS.POTION_VALUES.ELDER,
		options: [
			{ text: 'None', value: SETTINGS.POTION_VALUES.NONE },
			{ text: 'Elder overload', value: SETTINGS.POTION_VALUES.ELDER },
			{ text: 'Supreme overload', value: SETTINGS.POTION_VALUES.SUPREME },
			{ text: 'Overload', value: SETTINGS.POTION_VALUES.OVERLOAD },
			{ text: 'Extreme', value: SETTINGS.POTION_VALUES.EXTREME },
			{ text: 'Super', value: SETTINGS.POTION_VALUES.SUPER },
			{ text: 'Regular', value: SETTINGS.POTION_VALUES.REGULAR }
		]
	},
	[SETTINGS.HIT_CHANCE]: {
		label: 'Hit chance',
		default: 100
	},
	[SETTINGS.NECROSIS_STACKS]: {
		label: 'Necrosis stacks',
		default: 0
	},
	[SETTINGS.REAPER_CREW]: {
		label: 'Reaper Crew',
		default: true
	},
	[SETTINGS.NECROMANCY_PRAYER]: {
		label: 'Prayer',
		default: SETTINGS.NECROMANCY_PRAYER_VALUES.RUINATION,
		options: [
			{ text: 'None', value: SETTINGS.NECROMANCY_PRAYER_VALUES.NONE },
			{ text: 'Ruination', value: SETTINGS.NECROMANCY_PRAYER_VALUES.RUINATION },
			{ text: 'Sorrow', value: SETTINGS.NECROMANCY_PRAYER_VALUES.SORROW },
			{
				text: 'Leech necromancy strength 2',
				value: SETTINGS.NECROMANCY_PRAYER_VALUES.LEECH_NECRO_STRENGTH_2
			},
			{
				text: 'Leech necromancy strength 4',
				value: SETTINGS.NECROMANCY_PRAYER_VALUES.LEECH_NECRO_STRENGTH_4
			},
			{
				text: 'Leech necromancy strength 6',
				value: SETTINGS.NECROMANCY_PRAYER_VALUES.LEECH_NECRO_STRENGTH_6
			},
			{
				text: 'Leech necromancy strength 8',
				value: SETTINGS.NECROMANCY_PRAYER_VALUES.LEECH_NECRO_STRENGTH_8
			},
			{ text: 'Sanctity', value: SETTINGS.NECROMANCY_PRAYER_VALUES.SANCTITY },
			{ text: 'Accelerated Decay', value: SETTINGS.NECROMANCY_PRAYER_VALUES.ACCELERATED_DECAY },
			{ text: 'Hastened Decay', value: SETTINGS.NECROMANCY_PRAYER_VALUES.HASTENED_DECAY },
			{ text: 'Decay', value: SETTINGS.NECROMANCY_PRAYER_VALUES.DECAY }
		]
	},
	[SETTINGS.RUBY_AURORA]: {
		label: 'Ruby Aurora',
		default: 0
	},
	[SETTINGS.REVENGE]: {
		label: 'Revenge',
		default: 0
	},
	[SETTINGS.BERSERKERS_FURY]: {
		label: "Dharok's Momento (relic)",
		default: 0
	},
	[SETTINGS.RUTHLESS_STACKS]: {
		label: 'Ruthless Stacks',
		default: 0
	},
	[SETTINGS.SLAYER_HELM]: {
		label: 'Slayer Helm',
		default: SETTINGS.SLAYER_HELM_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.SLAYER_HELM_VALUES.NONE },
			{ text: 'Regular', value: SETTINGS.SLAYER_HELM_VALUES.REGULAR },
			{ text: 'Full', value: SETTINGS.SLAYER_HELM_VALUES.FULL },
			{ text: 'Reinforced', value: SETTINGS.SLAYER_HELM_VALUES.REINFORCED },
			{ text: 'Strong', value: SETTINGS.SLAYER_HELM_VALUES.STRONG },
			{ text: 'Mighty', value: SETTINGS.SLAYER_HELM_VALUES.MIGHTY },
			{ text: 'Corrupted', value: SETTINGS.SLAYER_HELM_VALUES.CORRUPTED }
		]
	},
	[SETTINGS.GUARDHOUSE]: {
		label: 'Guardhouse',
		default: SETTINGS.GUARDHOUSE_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.GUARDHOUSE_VALUES.NONE },
			{ text: 'Tier 1', value: SETTINGS.GUARDHOUSE_VALUES.LVL1 },
			{ text: 'Tier 1 with undead target', value: SETTINGS.GUARDHOUSE_VALUES.LVL1_UNDEAD },
			{ text: 'Tier 3', value: SETTINGS.GUARDHOUSE_VALUES.LVL3 },
			{ text: 'Tier 3 with undead target', value: SETTINGS.GUARDHOUSE_VALUES.LVL3_UNDEAD }
		]
	},
	[SETTINGS.TARGET_HP_PERCENT]: {
		label: 'Target hp %',
		default: 100
	},
	[SETTINGS.GENOCIDAL]: {
		label: 'Genocidal %',
		default: 0
	},
	[SETTINGS.FAMILIAR]: {
		label: 'Ripper Passive %',
		default: SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON,
		options: [
			{ text: 'None', value: SETTINGS.FAMILIAR_VALUES.NONE },
			{ text: 'Ripper demon', value: SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON },
			{ text: 'Kalgerion demon', value: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON }
		]
	},
	[SETTINGS.AURA]: {
		label: 'Aura',
		default: SETTINGS.AURA_VALUES.MAHJARRAT,
		options: [
			{ text: 'None', value: SETTINGS.AURA_VALUES.NONE },
			{ text: 'Mahjarrat', value: SETTINGS.AURA_VALUES.MAHJARRAT },
			{ text: 'Equilibrium', value: SETTINGS.AURA_VALUES.EQUILIBRIUM }
		]
	},
	[SETTINGS.VULN]: {
		label: 'Vulnerability',
		default: SETTINGS.VULN_VALUES.VULNERABILITY,
		options: [
			{ text: 'None', value: SETTINGS.VULN_VALUES.NONE },
			{ text: 'Curse', value: SETTINGS.VULN_VALUES.CURSE },
			{ text: 'Vuln', value: SETTINGS.VULN_VALUES.VULNERABILITY }
		]
	},
	[SETTINGS.SMOKE_CLOUD]: {
		label: 'Smoke Cloud',
		default: true
	},
	[SETTINGS.CRYPTBLOOM]: {
		label: 'Cryptbloom Vuln',
		default: false
	},
	[SETTINGS.SLAYER_PERK_UNDEAD]: {
		label: 'Undead slayer Perk',
		default: false
	},
	[SETTINGS.SLAYER_PERK_DRAGON]: {
		label: 'Dragon slayer Perk',
		default: false
	},
	[SETTINGS.SLAYER_PERK_DEMON]: {
		label: 'Demon slayer Perk',
		default: false
	},
	[SETTINGS.UNDEAD_SLAYER_SIGIL]: {
		label: 'Undead slayer Sigil',
		default: false
	},
	[SETTINGS.DRAGON_SLAYER_SIGIL]: {
		label: 'Dragon slayer Sigil',
		default: false
	},
	[SETTINGS.DEMON_SLAYER_SIGIL]: {
		label: 'Demon slayer Sigil',
		default: false
	},
	[SETTINGS.HAUNTED]: {
		label: 'Haunted',
		default: true
	},
	[SETTINGS.HAUNTED_AD]: {
		label: 'Haunted AD',
		default: 2345
	},
	[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS]: {
		label: 'Skeleton rage stacks',
		default: 0
	},
	[SETTINGS.NOPE]: {
		label: 'Nope Nope Nope',
		default: 0
	},
	[SETTINGS.KALG_SPEC]: {
		label: 'Crit-i-Kal Spec',
		default: false
	},
	[SETTINGS.CUSTOM_ON_AD]: {
		label: 'Additional on AD buff %',
		default: 0
	},
	[SETTINGS.CUSTOM_ON_HIT]: {
		label: 'Additional on-hit buff %',
		default: 0
	},
	[SETTINGS.CUSTOM_ON_NPC]: {
		label: 'Additional on-npc buff %',
		default: 0
	},
	[SETTINGS.CUSTOM_CRIT]: {
		label: 'Additional crit chance %',
		default: 0
	},
	[SETTINGS.HELMET]: {
		label: 'Helmet',
		default: SETTINGS.HELMET_VALUES.TFN,
		options: [
			{ text: 'None/Tank', value: SETTINGS.HELMET_VALUES.NONE },
			{ text: 'TFN', value: SETTINGS.HELMET_VALUES.TFN },
			{ text: 't90 deathdealer', value: SETTINGS.HELMET_VALUES.T90DD },
		]
	},
	[SETTINGS.BODY]: {
		label: 'Body',
		default: SETTINGS.BODY_VALUES.TFN,
		options: [
			{ text: 'None/Tank', value: SETTINGS.BODY_VALUES.NONE },
			{ text: 'TFN', value: SETTINGS.BODY_VALUES.TFN },
			{ text: 't90 deathdealer', value: SETTINGS.BODY_VALUES.T90DD },
		]
	},
	[SETTINGS.LEGS]: {
		label: 'Legs',
		default: SETTINGS.LEGS_VALUES.TFN,
		options: [
			{ text: 'None/Tank', value: SETTINGS.LEGS_VALUES.NONE },
			{ text: 'TFN', value: SETTINGS.LEGS_VALUES.TFN },
			{ text: 't90 deathdealer', value: SETTINGS.LEGS_VALUES.T90DD },
		]
	},
	[SETTINGS.GLOVES]: {
		label: 'Gloves',
		default: SETTINGS.GLOVES_VALUES.TFN,
		options: [
			{ text: 'None/Tank', value: SETTINGS.GLOVES_VALUES.NONE },
			{ text: 'TFN', value: SETTINGS.GLOVES_VALUES.TFN },
			{ text: 't90 deathdealer', value: SETTINGS.GLOVES_VALUES.T90DD },
		]
	},
	[SETTINGS.BOOTS]: {
		label: 'Boots',
		default: SETTINGS.BOOTS_VALUES.TFN,
		options: [
			{ text: 'None/Tank', value: SETTINGS.BOOTS_VALUES.NONE },
			{ text: 'TFN', value: SETTINGS.BOOTS_VALUES.TFN },
			{ text: 't90 deathdealer', value: SETTINGS.BOOTS_VALUES.T90DD },
		]
	},
	[SETTINGS.NECKLACE]: {
		label: 'Necklace',
		default: SETTINGS.NECKLACE_VALUES.EOFOR,
		options: [
			{ text: 'None/Tank', value: SETTINGS.NECKLACE_VALUES.NONE },
			{ text: 'EOF(or)', value: SETTINGS.NECKLACE_VALUES.EOFOR },
			{ text: 'EOF', value: SETTINGS.NECKLACE_VALUES.EOF },
			{ text: 'Moonstone amulet', value: SETTINGS.NECKLACE_VALUES.MOONSTONE },
			{ text: 'AOS(or)', value: SETTINGS.NECKLACE_VALUES.AOSOR },
			{ text: 'AOS', value: SETTINGS.NECKLACE_VALUES.AOS },
			{ text: 'Reaper(or)', value: SETTINGS.NECKLACE_VALUES.REAPEROR },
			{ text: 'Reaper', value: SETTINGS.NECKLACE_VALUES.REAPER },
			{ text: 'Salve (e)', value: SETTINGS.NECKLACE_VALUES.SALVEE },
			{ text: 'Salve', value: SETTINGS.NECKLACE_VALUES.SALVE }
		]
	},
	[SETTINGS.CAPE]: {
		label: 'Cape',
		default: SETTINGS.CAPE_VALUES.ZUK,
		options: [
			{ text: 'None', value: SETTINGS.CAPE_VALUES.NONE },
			{ text: 'Zuk', value: SETTINGS.CAPE_VALUES.ZUK },
			{ text: 'Kiln', value: SETTINGS.CAPE_VALUES.KILN },
			{ text: 'Comp cape', value: SETTINGS.CAPE_VALUES.COMP },
			{ text: 'God cape', value: SETTINGS.CAPE_VALUES.GOD },
			{ text: 'Max cape', value: SETTINGS.CAPE_VALUES.MAX },
			{ text: 'Skill cape', value: SETTINGS.CAPE_VALUES.SKILL }
		]
	},
	[SETTINGS.RING]: {
		label: 'Ring',
		default: SETTINGS.RING_VALUES.REAVERS,
		options: [
			{ text: 'None', value: SETTINGS.RING_VALUES.NONE },
			{ text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
			{ text: "Zorgoth's", value: SETTINGS.RING_VALUES.ZORGOTH },
			{ text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
			{ text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
			{ text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
			{ text: 'ASR', value: SETTINGS.RING_VALUES.ASR }
		]
	},
	[SETTINGS.POCKET]: {
		label: 'Pocket',
		default: SETTINGS.POCKET_VALUES.GRIM,
		options: [
			{ text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
			{ text: 'Grimoire', value: SETTINGS.POCKET_VALUES.GRIM },
			{ text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
			{ text: 'GWD3 book', value: SETTINGS.POCKET_VALUES.GWD3 },
			{ text: 'Illuminated god book', value: SETTINGS.POCKET_VALUES.IGOD },
			{ text: 'God book', value: SETTINGS.POCKET_VALUES.GOD }
		]
	},
	[SETTINGS.WEAPON]: {
		label: 'Weapon type',
		default: SETTINGS.WEAPON_VALUES.DW,
		options: [
			{ text: 'Dual wield', value: SETTINGS.WEAPON_VALUES.DW },
			{ text: 'Two handed', value: SETTINGS.WEAPON_VALUES.TH }
		]
	},
	[SETTINGS.MH]: {
		label: 'Mh',
		default: SETTINGS.MH_VALUES.OMNI,
		options: [
			{ text: 'None', value: SETTINGS.MH_VALUES.NONE },
			{ text: 'Omni Guard', value: SETTINGS.MH_VALUES.OMNI },
			{ text: 'Death guard (t90)', value: SETTINGS.MH_VALUES.DG90 },
		]
	},
	[SETTINGS.OH]: {
		label: 'Oh',
		default: SETTINGS.OH_VALUES.SOULBOUND,
		options: [
			{ text: 'None', value: SETTINGS.OH_VALUES.NONE },
			{ text: 'Soulbound Lantern', value: SETTINGS.OH_VALUES.SOULBOUND },
			{ text: 'Skull lantern (t90)', value: SETTINGS.OH_VALUES.SL90 },
			{ text: 'Spectral shield', value: SETTINGS.OH_VALUES.SPECTRAL }
		]
	},
	[SETTINGS.LVL20ARMOUR]: {
		label: 'Level 20 Armour',
		default: true
	},
	[SETTINGS.BITING]: {
		label: 'Biting',
		default: 4
	},
	[SETTINGS.PRECISE]: {
		label: 'Precise',
		default: 6
	},
	[SETTINGS.ERUPTIVE]: {
		label: 'Eruptive',
		default: 2
	},
	[SETTINGS.FLANKING]: {
		label: 'Flanking',
		default: 0
	},
	[SETTINGS.RUTHLESS_RANK]: {
		label: 'Ruthless rank',
		default: 0
	},
	[SETTINGS.TELOS_RED_BEAM]: {
		label: 'Red Beam',
		default: false
	},
	[SETTINGS.TELOS_BLACK_BEAM]: {
		label: 'Black Beam',
		default: false
	},
	[SETTINGS.TOKKUL_ZO]: {
		label: 'Tokkul-zo',
		default: false
	},
	[SETTINGS.KBD_ARTEFACT]: {
		label: 'KBD Artefact',
		default: false
	},
	[SETTINGS.INNER_CHAOS]: {
		label: 'Inner Chaos',
		default: false
	},
	[SETTINGS.SWORD_OF_EDICTS]: {
		label: 'Sword of Edicts',
		default: false
	},
	[SETTINGS.GUARDIANS_TRIUMPH]: {
		label: 'Guardians Triumph',
		default: 0
	},
	[SETTINGS.BALANCE_OF_POWER]: {
		label: 'Balance of power',
		default: 0
	},
	[SETTINGS.ZAMORAK_CHOKE_STACKS]: {
		label: 'Zamorak choke stacks',
		default: 0
	},
	[SETTINGS.RAKSHA_INNER_POWER]: {
		label: 'Inner power (Raksha)',
		default: 0
	},
	[SETTINGS.STONE_OF_JAS]: {
		label: 'Stone of Jas %',
		default: 0
	},
	[SETTINGS.INFERNAL_PUZZLE_BOX]: {
		label: 'Infernal Puzzle Box %',
		default: 0
	},
	[SETTINGS.ICY_PRECISION]: {
		label: 'Icy Precision stacks',
		default: 0
	},
	[SETTINGS.PUNCTURE_STACKS]: {
		label: 'Puncture Stacks',
		default: 0
	},
	[SETTINGS.FLOW_STACKS]: {
		label: 'Flow stacks',
		default: 0
	},
	[SETTINGS.CONFLAGRATE]: {
		label: 'Conflagrate',
		default: false
	},
	[SETTINGS.KERAPACS_WRIST_WRAPS]: {
		label: 'Kerapacs wristwraps',
		default: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.NONE },
			{ text: 'Regular', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR },
			{ text: 'Enchanted', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED },
		]
	},
	[SETTINGS.TARGET_DISABILITY]: {
		label: 'Disability',
		default: SETTINGS.TARGET_DISABILITY_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.TARGET_DISABILITY_VALUES.NONE },
			{ text: 'Bound', value: SETTINGS.TARGET_DISABILITY_VALUES.BOUND },
			{ text: 'Stunned', value: SETTINGS.TARGET_DISABILITY_VALUES.STUNNED },
			{ text: 'Bound and stunned', value: SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED },
		]
	},
	[SETTINGS.DRACONIC_FRUIT]: {
		label: 'Draconic fruit',
		default: false
	},
	[SETTINGS.ENDURING_RUIN_HIT]: {
		label: 'Enduring ruin on-hit',
		default: SETTINGS.ENDURING_RUIN_HIT_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.ENDURING_RUIN_HIT_VALUES.NONE },
			{ text: 'Regular', value: SETTINGS.ENDURING_RUIN_HIT_VALUES.REGULAR },
			{ text: 'Enchanted', value: SETTINGS.ENDURING_RUIN_HIT_VALUES.ENCHANTED },
		]
	},
	[SETTINGS.ENDURING_RUIN_BLEED]: {
		label: 'Enduring ruin bleed',
		default: SETTINGS.ENDURING_RUIN_BLEED_VALUES.NONE,
		options: [
			{ text: 'None', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.NONE },
			{ text: 'Regular', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.REGULAR },
			{ text: 'Enchanted', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.ENCHANTED },
		]
	},
	[SETTINGS.NEEDLE_STRIKE]: {
		label: 'Needle Strike',
		default: false
	},
	[SETTINGS.GRAVITATE]: {
		label: 'Gravitate',
		default: 0
	},
	[SETTINGS.BLOOD_TITHE]: {
		label: 'Blood tithe',
		default: 0
	},
	[SETTINGS.DEATH_SPARK]: {
		label: 'Death spark',
		default: false
	},
	[SETTINGS.LIVING_DEATH]: {
		label: 'Living Death',
		default: false
	},
	[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]: {
		label: 'Swiftness of the Aviansie',
		default: false
	},
	[SETTINGS.ESSENCE_CORRUPTION]: {
		label: 'Essence corruption',
		default: 0
	},
	[SETTINGS.CONFLAGRATE]: {
		label: 'Conflagrate',
		default: false
	},
	[SETTINGS.WALKED_TARGET]: {
		label: 'Walked',
		default: true
	},
	[SETTINGS.CONCENTRATED_BLAST_STACKS]: {
		label: 'conc stacks',
		default: 0
	},
};

export { SETTINGS, settingsConfig };
