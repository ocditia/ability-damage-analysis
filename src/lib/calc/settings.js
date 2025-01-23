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
    PRAYER: 'prayer',
    MAGIC_PRAYER: 'magic prayer',
    MAGIC_PRAYER_VALUES: {
        NONE: 'none magic',
        AFFLICTION: 'affliction',
        TORMENT: 'torment',
        LEECH_MAGIC_STRENGTH_2: 'leech magic strength 2',
        LEECH_MAGIC_STRENGTH_4: 'leech magic strength 4',
        LEECH_MAGIC_STRENGTH_6: 'leech magic strength 6',
        LEECH_MAGIC_STRENGTH_8: 'leech magic strength 8',
        AUGURY: 'augury',
        OVERCHARGE: 'overcharge',
        SUPER_CHARGE: 'super charge',
        CHARGE: 'charge'
    },
    RANGED_PRAYER: 'ranged prayer',
    RANGED_PRAYER_VALUES: {
        NONE: 'none ranged',
        DESOLATION: 'desolation',
        ANGUISH: 'anguish',
        LEECH_RANGED_STRENGTH_2: 'leech ranged strength 2',
        LEECH_RANGED_STRENGTH_4: 'leech ranged strength 4',
        LEECH_RANGED_STRENGTH_6: 'leech ranged strength 6',
        LEECH_RANGED_STRENGTH_8: 'leech ranged strength 8',
        RIGOUR: 'rigour',
        OVERPOWERING_FORCE: 'overpowering force',
        UNRELENTING_FORCE: 'unrelenting force',
        UNSTOPPABLE_FORCE: 'unstoppable force'
    },
    MELEE_PRAYER: 'melee prayer',
    MELEE_PRAYER_VALUES: {
        NONE: 'none melee',
        MALEVOLENCE: 'malevolence',
        TURMOIL: 'turmoil',
        LEECH_MELEE_STRENGTH_2: 'leech melee strength 2',
        LEECH_MELEE_STRENGTH_4: 'leech melee strength 4',
        LEECH_MELEE_STRENGTH_6: 'leech melee strength 6',
        LEECH_MELEE_STRENGTH_8: 'leech melee strength 8',
        PIETY: 'piety',
        CHIVALRY: 'chivalry',
        ULTIMATE_STRENGTH: 'ultimate strength',
        SUPERHUMAN_STRENGTH: 'superhuman strength',
        BURST_OF_STRENGTH: 'burst of strength'
    },
    NECRO_PRAYER: 'necromancy prayer',
    NECRO_PRAYER_VALUES: {
        NONE: 'none necro',
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
        EQUILIBRIUM: 'equilibrium',
        RECKLESS: 'reckless',
        BERSERKER: 'berserker',
        MANIACAL: 'maniacal',
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
    MAGIC_HELMET: 'magic helmet',
    MAGIC_HELMET_VALUES: {
        NONE: 'none',
        TECTONIC: 'tectonic mask',
        ELITE_TECTONIC: 'elite tectonic mask',
        SLISKE: 'anima core helm of sliske',
        GHOST_HUNTER: 'ghost hunter goggles',
    },
    RANGED_HELMET: 'ranged helmet',
    RANGED_HELMET_VALUES: {
        NONE: 'none',
        SIRENIC: 'sirenic mask',
        ELITE_SIRENIC: 'elite sirenic mask',
        DRACOLICH: 'dracolich coif',
        ELITE_DRACOLICH: 'elite dracolich coif',
        GHOST_HUNTER: 'ghost hunter goggles',
    },
    MELEE_HELMET: 'melee helmet',
    MELEE_HELMET_VALUES: {
        NONE: 'none',
        MASTERWORK: 'masterwork helm',
        TMW: 'trimmed masterwork helm',
        VESTMENTS: 'vestments of havoc hood',
        JAWS: 'jaws of the abyss',
        GHOST_HUNTER: 'ghost hunter goggles',
    },
    NECRO_HELMET: 'necro helmet',
    NECRO_HELMET_VALUES: {
        NONE: 'none',
        TFN: 'crown of the first necromancer',
        T90DD: 'deathdealer hood (tier 90)',
        GHOST_HUNTER: 'ghost hunter goggles',
    },
    BODY: 'body',
    MAGIC_BODY: 'magic body',
    MAGIC_BODY_VALUES: {
        NONE: 'none',
        TECTONIC: 'tectonic robe top',
        ELITE_TECTONIC: 'elite tectonic robe top',
        SLISKE: 'anima core body of sliske',
        GHOST_HUNTER: 'ghost hunter body',
    },
    RANGED_BODY: 'ranged body',
    RANGED_BODY_VALUES: {
        NONE: 'none',
        SIRENIC: 'sirenic hauberk',
        ELITE_SIRENIC: 'elite sirenic hauberk',
        DRACOLICH: 'dracolich hauberk',
        ELITE_DRACOLICH: 'elite dracolich hauberk',
        GHOST_HUNTER: 'ghost hunter body',
    },
    MELEE_BODY: 'melee body',
    MELEE_BODY_VALUES: {
        NONE: 'none',
        MASTERWORK: 'masterwork platebody',
        TMW: 'trimmed masterwork platebody',
        VESTMENTS: 'vestments of havoc robe top',
        GHOST_HUNTER: 'ghost hunter body',
    },
    NECRO_BODY: 'necro body',
    NECRO_BODY_VALUES: {
        NONE: 'none',
        TFN: 'robe top of the first necromancer',
        T90DD: 'deathdealer robe top (tier 90)',
        GHOST_HUNTER: 'ghost hunter body',
    },
    LEGS: 'legs',
    MAGIC_LEGS: 'magic legs',
    MAGIC_LEGS_VALUES: {
        NONE: 'none',
        TECTONIC: 'tectonic robe bottom',
        ELITE_TECTONIC: 'elite tectonic robe bottom',
        SLISKE: 'anima core legs of sliske',
        GHOST_HUNTER: 'ghost hunter legs',
    },
    RANGED_LEGS: 'ranged legs',
    RANGED_LEGS_VALUES: {
        NONE: 'none',
        SIRENIC: 'sirenic chaps',
        ELITE_SIRENIC: 'elite sirenic chaps',
        DRACOLICH: 'dracolich chaps',
        ELITE_DRACOLICH: 'elite dracolich chaps',
        GHOST_HUNTER: 'ghost hunter legs',
    },
    MELEE_LEGS: 'melee legs',
    MELEE_LEGS_VALUES: {
        NONE: 'none',
        MASTERWORK: 'masterwork platelegs',
        TMW: 'trimmed masterwork platelegs',
        VESTMENTS: 'vestments of havoc robe bottom',
        GHOST_HUNTER: 'ghost hunter legs',
    },
    NECRO_LEGS: 'necro legs',
    NECRO_LEGS_VALUES: {
        NONE: 'none',
        TFN: 'robe bottom of the first necromancer',
        T90DD: 'deathdealer robe bottom (tier 90)',
        GHOST_HUNTER: 'ghost hunter legs',
    },
    GLOVES: 'gloves',
    MAGIC_GLOVES: 'magic gloves',
    MAGIC_GLOVES_VALUES: {
        NONE: 'none',
        DTB: 'deathtouch bracelet',
        CINDERS: 'cinderbane gloves',
        KWW: 'kerapacs wristwraps',
        KWW_E: 'enhanced kerapacs wristwraps'
    },
    RANGED_GLOVES: 'ranged gloves',
    RANGED_GLOVES_VALUES: {
        NONE: 'none',
        DRACOLICH: 'dracolich vambraces',
        ELITE_DRACOLICH: 'elite dracolich vambraces',
        DTB: 'deathtouch bracelet',
        CINDERS: 'cinderbane gloves',
        NIGHTMARES: 'nightmare gauntlets',
        NIGHTMARES_E: 'enhanced nightmare gauntlets'
    },
    MELEE_GLOVES: 'melee gloves',
    MELEE_GLOVES_VALUES: {
        NONE: 'none',
        DTB: 'deathtouch bracelet',
        CINDERS: 'cinderbane gloves',
        MASTERWORK: 'masterwork gloves',
        TMW: 'trimmed masterwork gloves',
        GOP: 'gloves of passage',
        GOP_E: 'enhanced gloves of passage'
    },
    NECRO_GLOVES: 'necro gloves',
    NECRO_GLOVES_VALUES: {
        NONE: 'none',
        TFN: 'hand wrap of the first necromancer',
        T90DD: 'deathdealer gloves (tier 90)',
        DTB: 'deathtouch bracelet',
        CINDERS: 'cinderbane gloves'
    },
    BOOTS: 'boots',
    MAGIC_BOOTS: 'magic boots',
    MAGIC_BOOTS_VALUES: {
        NONE: 'none',
        BLAST: 'blast diffusion boots',
        BLAST_E: 'enhanced blast diffusion boots',
        SH: 'silverhawk boots'
    },
    RANGED_BOOTS: 'ranged boots',
    RANGED_BOOTS_VALUES: {
        NONE: 'none',
        DRACOLICH: 'dracolich boots',
        ELITE_DRACOLICH: 'elite dracolich boots',
        FLEETING: 'fleeting boots',
        ENHANCED_FLEETING: 'enhanced fleeting boots',
        SH: 'silverhawk boots'
    },
    MELEE_BOOTS: 'melee boots',
    MELEE_BOOTS_VALUES: {
        NONE: 'none',
        LACERATION: 'laceration boots',
        ENHANCED_LACERATION: 'enhanced laceration boots',
        SH: 'silverhawk boots',
        MASTERWORK: 'masterwork boots',
        TMW: 'trimmed masterwork boots',
        VESTMENTS: 'vestments of havoc boots'
    },
    NECRO_BOOTS: 'necro boots',
    NECRO_BOOTS_VALUES: {
        NONE: 'none',
        TFN: 'foot wraps of the first necromancer',
        T90DD: 'deathdealer boots (tier 90)',
        SH: 'silverhawk boots'
    },
    NECKLACE: 'necklace',
    NECKLACE_VALUES: {
        NONE: 'none',
        EOFOR: 'essence of finality amulet (or)',
        EOF: 'essence of finality amulet',
        MOONSTONE: 'conjurers raising amulet',
        AOSOR: 'amulet of souls (or)',
        AOS: 'amulet of souls',
        SALVEE: 'salve amulet (e)',
        SALVE: 'salve amulet',
        ZEALOTS: 'amulet of zealots'
    },
    CAPE: 'cape',
    CAPE_VALUES: {
        NONE: 'none',
        ZUK: 'igneous kal-zuk',
        KILN: 'tokhaar-kal-mor',
        COMP: 'comp/max cape',
        GOD: 'god cape',
        MAX: 'max cape',
        SKILL: 'skill cape',
        GHOST_HUNTER: 'ghost hunter backpack'
    },
    RING: 'ring',
    RING_VALUES: {
        NONE: 'none',
        REAVERS: 'reavers ring',
        ZORGOTH: 'zorgoths soul ring',
        RODI: 'ring of death (i)',
        ROD: 'ring of death',
        ASRI: 'asylum surgeons ring (i)',
        ASR: 'asylum surgeons ring',
        CHANNELER: 'channelers ring',
        CHANNELER_E: 'channelers ring+',
        STALKER: 'stalkers ring',
        STALKER_E: 'stalkers ring+',
        CHAMPION: 'champions ring',
        CHAMPION_E: 'champions ring+',
    },
    /*
    MAGIC_RING: 'magic ring',
    MAGIC_RING_VALUES: {
        NONE: 'none',
        REAVERS: 'reavers ring',
        RODI: 'ring of death (i)',
        ROD: 'ring of death',
        ASRI: 'asylum surgeons ring (i)',
        ASR: 'asylum surgeons ring',
        CHANNELER: 'channelers ring',
        CHANNELER_E: 'channelers ring+'
    },
    RANGED_RING: 'range ring',
    RANGED_RING_VALUES: {
        NONE: 'none',
        REAVERS: 'reavers ring',
        RODI: 'ring of death (i)',
        ROD: 'ring of death',
        ASRI: 'asylum surgeons ring (i)',
        ASR: 'asylum surgeons ring',
        STALKER: 'stalkers ring',
        STALKER_E: 'stalkers ring+'
    },
    MELEE_RING: 'melee ring',
    MELEE_RING_VALUES: {
        NONE: 'none',
        REAVERS: 'reavers ring',
        RODI: 'ring of death (i)',
        ROD: 'ring of death',
        ASRI: 'asylum surgeons ring (i)',
        ASR: 'asylum surgeons ring',
        CHAMPION: 'champions ring',
        CHAMPION_E: 'champions ring+'
    },
    NECRO_RING: 'necro ring',
    NECRO_RING_VALUES: {
        NONE: 'none',
        REAVERS: 'reavers ring',
        ZORGOTH: 'zorgoths soul ring',
        RODI: 'ring of death (i)',
        ROD: 'ring of death',
        ASRI: 'asylum surgeons ring (i)',
        ASR: 'asylum surgeons ring'
    },
    MAGIC_POCKET: 'mage pocket',
    MAGIC_POCKET_VALUES: {
        NONE: 'none',
        GRIM: 'erethdors grimoire',
        FUL: 'scripture of ful',
        JAS: 'scripture of jas',
        AMASCUT: 'scripture of amascut',
        GWD3: 'gwd3 scripture',
        IGOD: 'illuminated god book',
        UNDERWORLD_GRIM: 'underworld grimoire 4',
        ELEMENTS: 'scrimshaw of elements',
        SUPERIOR_ELEMENTS: 'superior scrimshaw of elements'
    },
    RANGED_POCKET: 'range pocket',
    RANGED_POCKET_VALUES: {
        NONE: 'none',
        GRIM: 'erethdors grimoire',
        FUL: 'scripture of ful',
        JAS: 'scripture of jas',
        AMASCUT: 'scripture of amascut',
        GWD3: 'gwd3 scripture',
        IGOD: 'illuminated god book',
        UNDERWORLD_GRIM: 'underworld grimoire 4',
        CRUELTY: 'scrimshaw of cruelty',
        SUPERIOR_CRUELTY: 'superior scrimshaw of cruelty'
    },
    MELEE_POCKET: 'melee pocket',
    MELEE_POCKET_VALUES: {
        NONE: 'none',
        GRIM: 'erethdors grimoire',
        FUL: 'scripture of ful',
        JAS: 'scripture of jas',
        AMASCUT: 'scripture of amascut',
        GWD3: 'gwd3 scripture',
        IGOD: 'illuminated god book',
        UNDERWORLD_GRIM: 'underworld grimoire 4'
    },
    NECRO_POCKET: 'necro pocket',
    NECRO_POCKET_VALUES: {
        NONE: 'none',
        GRIM: 'erethdors grimoire',
        FUL: 'scripture of ful',
        JAS: 'scripture of jas',
        AMASCUT: 'scripture of amascut',
        GWD3: 'gwd3 scripture',
        IGOD: 'illuminated god book',
        UNDERWORLD_GRIM: 'underworld grimoire 4'
    },
    */
    POCKET: 'pocket',
    POCKET_VALUES: {
        NONE: 'none',
        GRIM: 'erethdors grimoire',
        FUL: 'scripture of ful',
        JAS: 'scripture of jas',
        AMASCUT: 'scripture of amascut',
        GWD3: 'gwd3 scripture',
        IGOD: 'illuminated god book',
        UNDERWORLD_GRIM: 'underworld grimoire 4',
        ELEMENTS: 'scrimshaw of elements',
        SUPERIOR_ELEMENTS: 'superior scrimshaw of elements',
        CRUELTY: 'scrimshaw of cruelty',
        SUPERIOR_CRUELTY: 'superior scrimshaw of elements',
    },
    WEAPON: 'weapon type',
    WEAPON_VALUES: {
        DW: 'main-hand',
        TH: 'two-hand'
    },
    MH: 'main-hand weapon',
    MH_TIER_CUSTOM: 'main-hand weapon custom tier',
    MAGIC_MH: 'magic main-hand weapon',
    MAGIC_MH_VALUES: {
        CUSTOM: 'custom',
        ROAR_OF_AWAKENING: 'roar of awakening'
    },
    RANGED_MH: 'ranged main-hand weapon',
    RANGED_MH_VALUES: {
        CUSTOM: 'custom'
    },
    MELEE_MH: 'melee main-hand weapon',
    MELEE_MH_VALUES: {
        CUSTOM: 'custom',
        DARK_ICE_SHARD: 'dark ice shard',
        LENG: 'dark shard of leng',
        KERIS: 'keris',
        KERIS_PROC: 'keris proc',
        PRIMED_KERIS: 'primed keris',
        PRIMED_KERIS_PROC: 'primed keris proc',
        CONSECRATED_KERIS: 'consecrated keris',
        CONSECRATED_KERIS_PROC: 'consecrated keris proc'
    },
    NECRO_MH: 'necro main-hand weapon',
    NECRO_MH_VALUES: {
        CUSTOM: 'custom'
    },
    OH: 'off-hand weapon',
    OH_TIER_CUSTOM: 'off-hand weapon custom tier',
    MAGIC_OH: 'magic off-hand weapon',
    MAGIC_OH_VALUES: {
        CUSTOM: 'custom oh',
        ODE_TO_DECEIT: 'ode to deceit',
        CUSTOM_SHIELD: 'custom shield'
    },
    RANGED_OH: 'ranged off-hand weapon',
    RANGED_OH_VALUES: {
        CUSTOM: 'custom oh',
        CUSTOM_SHIELD: 'custom shield'
    },
    MELEE_OH: 'melee off-hand weapon',
    MELEE_OH_VALUES: {
        CUSTOM: 'custom oh',
        CUSTOM_SHIELD: 'custom shield',
        DARK_ICE_SLIVER: 'dark ice sliver',
        LENG: 'dark sliver of leng'
    },
    NECRO_OH: 'necro off-hand weapon',
    NECRO_OH_VALUES: {
        CUSTOM: 'custom oh',
        CUSTOM_SHIELD: 'custom shield',
        SPECTRAL: 'spectral shield'
    },
    TH: 'two-hand weapon',
    TH_TIER_CUSTOM: 'two-hand weapon custom tier',
    TH_TYPE_CUSTOM: 'two-hand weapon custom type',
    TH_TYPE_CUSTOM_VALUES: {
        NONE: 'none',
        BOW: 'bow',
    },
    MAGIC_TH: 'magic two-hand weapon',
    MAGIC_TH_VALUES: {
        CUSTOM: 'custom th',
        INQ_STAFF: 'inquisitor staff',
        INQ_STAFF_E: 'inquisitor staff+'
    },
    RANGED_TH: 'ranged two-hand weapon',
    RANGED_TH_VALUES: {
        CUSTOM: 'custom th',
        BOLG: 'bow of the last guardian',
        HEX: 'hexhunter bow',
        HEX_E: 'hexhunter bow+'
    },
    MELEE_TH: 'melee two-hand weapon',
    MELEE_TH_VALUES: {
        CUSTOM: 'custom th',
        T_MAUL: 'terrasaur maul',
        T_MAUL_E: 'terrasaur maul+',
        MW_SPEAR: 'masterwork spear of annihilation',
    },
    NECRO_TH: 'necro two-hand weapon',
    NECRO_TH_VALUES: {
        NONE: 'none'
    },
    AMMO: 'ammo',
    AMMO_VALUES: {
        NONE: 'none',
        FUL_ARROWS: 'ful arrows',
        WEN_ARROWS: 'wen arrows',
        DEATHSPORE_ARROWS: 'deathspore arrows',
        JAS_ARROWS: 'jas arrows',
    },
    LVL20ARMOUR: 'level 20 armour',
    BITING: 'biting',
    PRECISE: 'precise',
    ERUPTIVE: 'eruptive',
    FLANKING: 'flanking',
    CAROMING: 'caroming',
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
    ICY_CHILL_STACKS: 'icy chill stacks',
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
    WALKED_TARGET: 'walked target',
    CONCENTRATED_BLAST_STACKS: 'concentrated blast stacks',
    CHAOS_ROAR: 'chaos roar',
    FURY_BUFF: 'fury buff',
    FURY_BUFF_VALUES: {
        NONE: 'none',
        REGULAR: 'regular',
        GREATER: 'greater'
    },
    RAMPAGE: 'rampage',
    BIK_STACKS: 'bik stacks',
    PERFECT_EQUILIBRIUM_STACKS: 'perfect equilibrium stacks',
    BALANCE_BY_FORCE: 'balance by force',
    TARGET_SIZE: 'target size',
    PRIMORDIAL_ICE: 'primordial ice',
    FROSTBLADES: 'frostblades',
    IGNEOUS_EXTENSIOS: 'igneous extensions',
    DRACOLICH_INFUSION: 'dracolich infusion',
    DRACOLICH_INFUSION_VALUES: {
        NONE: 'none',
        REGULAR: 'regular',
        GREATER: 'greater',
    },
    INSTABILITY: 'instability',
    TIME_SINCE_ATTACK: 'time since attack',
    INNATE_MASTERY: 'innate mastery',
    CHANNELER_RING_STACKS: 'channelers ring stacks',
    NUMBER_OF_BLEEDS: 'number of bleeds',
    STRENGTH_CAPE: 'strength cape',
    SUNSHINE: 'sunshine',
    META: 'meta',
    DEATH_SWIFTNESS: 'death swiftness',
    SWIFTNESS_ACTIVE: 'swiftness',
    SPLIT_SOUL: 'split soul',
    //SPLIT_SOUL_ECB: 'split soul ecb',
    ZGS: 'zgs',
    BERSERK: 'berserk',
    DETONATE: 'detonate charge timer',
    DIVINE_RAGE: 'divine rage',

    SHOW_BOLG_STACKS: 'show bolg stacks',
    SHOW_ICY_CHILL_STACKS: 'show icy chill stacks',
    ADRENALINE: 'adrenaline',
    VIGOUR: 'vigour',
    FURY_OF_THE_SMALL: 'fots',
    HEIGHTENED_SENSES: 'heightened senses',
    CONSERVATION_OF_ENERGY: 'coe',
    POF_DINOS: 'pof dinos',
    POF_DINOS_VALUES: {
        NONE: 'none',
        CORBICULA_1: '1 corbicula',
        CORBICULA_2: '2 corbicula',
    },
    LUNGING: 'lunging',
    RUIN: 'ruin',
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
        default: 120,
        style: 'magic'
    },
    [SETTINGS.STRENGTH_LEVEL]: {
        label: 'Strength Level',
        default: 120
    },
    [SETTINGS.RANGED_LEVEL]: {
        label: 'Ranged Level',
        default: 120
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
    [SETTINGS.MAGIC_PRAYER]: {
        label: 'Prayer',
        default: SETTINGS.MAGIC_PRAYER_VALUES.AFFLICTION,
        options: [
            { text: 'None', value: SETTINGS.MAGIC_PRAYER_VALUES.NONE },
            { text: 'Affliction', value: SETTINGS.MAGIC_PRAYER_VALUES.AFFLICTION },
            { text: 'Torment', value: SETTINGS.MAGIC_PRAYER_VALUES.TORMENT },
            {
                text: 'Leech magic strength 2',
                value: SETTINGS.MAGIC_PRAYER_VALUES.LEECH_MAGIC_STRENGTH_2
            },
            {
                text: 'Leech magic strength 4',
                value: SETTINGS.MAGIC_PRAYER_VALUES.LEECH_MAGIC_STRENGTH_4
            },
            {
                text: 'Leech magic strength 6',
                value: SETTINGS.MAGIC_PRAYER_VALUES.LEECH_MAGIC_STRENGTH_6
            },
            {
                text: 'Leech magic strength 8',
                value: SETTINGS.MAGIC_PRAYER_VALUES.LEECH_MAGIC_STRENGTH_8
            },
            { text: 'Augury', value: SETTINGS.MAGIC_PRAYER_VALUES.AUGURY },
            { text: 'Overcharge', value: SETTINGS.MAGIC_PRAYER_VALUES.OVERCHARGE },
            { text: 'Super charge', value: SETTINGS.MAGIC_PRAYER_VALUES.SUPER_CHARGE },
            { text: 'Charge', value: SETTINGS.MAGIC_PRAYER_VALUES.CHARGE }
        ]
    },
    [SETTINGS.RANGED_PRAYER]: {
        label: 'Prayer',
        default: SETTINGS.RANGED_PRAYER_VALUES.DESOLATION,
        options: [
            { text: 'None', value: SETTINGS.RANGED_PRAYER_VALUES.NONE },
            { text: 'Desolation', value: SETTINGS.RANGED_PRAYER_VALUES.DESOLATION },
            { text: 'Anguish', value: SETTINGS.RANGED_PRAYER_VALUES.ANGUISH},
            {
                text: 'Leech ranged strength 2',
                value: SETTINGS.RANGED_PRAYER_VALUES.LEECH_RANGED_STRENGTH_2
            },
            {
                text: 'Leech ranged strength 4',
                value: SETTINGS.RANGED_PRAYER_VALUES.LEECH_RANGED_STRENGTH_4
            },
            {
                text: 'Leech ranged strength 6',
                value: SETTINGS.RANGED_PRAYER_VALUES.LEECH_RANGED_STRENGTH_6
            },
            {
                text: 'Leech ranged strength 8',
                value: SETTINGS.RANGED_PRAYER_VALUES.LEECH_RANGED_STRENGTH_8
            },
            { text: 'Rigour', value: SETTINGS.RANGED_PRAYER_VALUES.RIGOUR },
            { text: 'Overpowering force', value: SETTINGS.RANGED_PRAYER_VALUES.OVERPOWERING_FORCE },
            { text: 'Unrelenting force', value: SETTINGS.RANGED_PRAYER_VALUES.UNRELENTING_FORCE },
            { text: 'Unstoppable force', value: SETTINGS.RANGED_PRAYER_VALUES.UNSTOPPABLE_FORCE }
        ]
    },
    [SETTINGS.MELEE_PRAYER]: {
        label: 'Prayer',
        default: SETTINGS.MELEE_PRAYER_VALUES.MALEVOLENCE,
        options: [
            { text: 'None', value: SETTINGS.MELEE_PRAYER_VALUES.NONE },
            { text: 'Malevolence', value: SETTINGS.MELEE_PRAYER_VALUES.MALEVOLENCE },
            { text: 'Turmoil', value: SETTINGS.MELEE_PRAYER_VALUES.TURMOIL },
            {
                text: 'Leech melee strength 2',
                value: SETTINGS.MELEE_PRAYER_VALUES.LEECH_MELEE_STRENGTH_2
            },
            {
                text: 'Leech melee strength 4',
                value: SETTINGS.MELEE_PRAYER_VALUES.LEECH_MELEE_STRENGTH_4
            },
            {
                text: 'Leech melee strength 6',
                value: SETTINGS.MELEE_PRAYER_VALUES.LEECH_MELEE_STRENGTH_6
            },
            {
                text: 'Leech melee strength 8',
                value: SETTINGS.MELEE_PRAYER_VALUES.LEECH_MELEE_STRENGTH_8
            },
            { text: 'Piety', value: SETTINGS.MELEE_PRAYER_VALUES.PIETY },
            { text: 'Chivalry', value: SETTINGS.MELEE_PRAYER_VALUES.CHIVALRY },
            { text: 'Ultimate strength', value: SETTINGS.MELEE_PRAYER_VALUES.ULTIMATE_STRENGTH },
            { text: 'Superhuman strength', value: SETTINGS.MELEE_PRAYER_VALUES.SUPERHUMAN_STRENGTH },
            { text: 'Burst of strength', value: SETTINGS.MELEE_PRAYER_VALUES.BURST_OF_STRENGTH }
        ]
    },
    [SETTINGS.NECRO_PRAYER]: {
        label: 'Prayer',
        default: SETTINGS.NECRO_PRAYER_VALUES.RUINATION,
        options: [
            { text: 'None', value: SETTINGS.NECRO_PRAYER_VALUES.NONE },
            { text: 'Ruination', value: SETTINGS.NECRO_PRAYER_VALUES.RUINATION },
            { text: 'Sorrow', value: SETTINGS.NECRO_PRAYER_VALUES.SORROW },
            {
                text: 'Leech necromancy strength 2',
                value: SETTINGS.NECRO_PRAYER_VALUES.LEECH_NECRO_STRENGTH_2
            },
            {
                text: 'Leech necromancy strength 4',
                value: SETTINGS.NECRO_PRAYER_VALUES.LEECH_NECRO_STRENGTH_4
            },
            {
                text: 'Leech necromancy strength 6',
                value: SETTINGS.NECRO_PRAYER_VALUES.LEECH_NECRO_STRENGTH_6
            },
            {
                text: 'Leech necromancy strength 8',
                value: SETTINGS.NECRO_PRAYER_VALUES.LEECH_NECRO_STRENGTH_8
            },
            { text: 'Sanctity', value: SETTINGS.NECRO_PRAYER_VALUES.SANCTITY },
            { text: 'Accelerated Decay', value: SETTINGS.NECRO_PRAYER_VALUES.ACCELERATED_DECAY },
            { text: 'Hastened Decay', value: SETTINGS.NECRO_PRAYER_VALUES.HASTENED_DECAY },
            { text: 'Decay', value: SETTINGS.NECRO_PRAYER_VALUES.DECAY }
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
        label: "Berserkers fury",
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
        label: 'Familiar',
        default: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON,
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
            { text: 'Equilibrium', value: SETTINGS.AURA_VALUES.EQUILIBRIUM },
            { text: 'Reckless', value: SETTINGS.AURA_VALUES.RECKLESS },
            { text: 'Berserker', value: SETTINGS.AURA_VALUES.BERSERKER },
            { text: 'Maniacal', value: SETTINGS.AURA_VALUES.MANIACAL },
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
    [SETTINGS.SLAYER_SIGIL_UNDEAD]: {
        label: 'Undead slayer Sigil',
        default: false
    },
    [SETTINGS.SLAYER_SIGIL_DRAGON]: {
        label: 'Dragon slayer Sigil',
        default: false
    },
    [SETTINGS.SLAYER_SIGIL_DEMON]: {
        label: 'Demon slayer Sigil',
        default: false
    },
    [SETTINGS.HAUNTED]: {
        label: 'Haunted',
        default: false
    },
    [SETTINGS.HAUNTED_AD]: {
        label: 'Haunted AD',
        default: 2345
    },
    [SETTINGS.SKELETON_WARRIOR_RAGE_STACKS]: {
        label: 'Skeleton rage stacks',
        default: 25
    },
    [SETTINGS.NOPE]: {
        label: 'Nope Nope Nope',
        default: 0
    },
    [SETTINGS.KALG_SPEC]: {
        label: 'Crit-i-Kal Spec',
        default: true
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
    [SETTINGS.MAGIC_HELMET]: {
        label: 'Helmet',
        default: SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_HELMET_VALUES.NONE },
            { text: 'Tectonic', value: SETTINGS.MAGIC_HELMET_VALUES.TECTONIC },
            { text: 'Elite tectonic', value: SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC },
            { text: 'Sliske', value: SETTINGS.MAGIC_HELMET_VALUES.SLISKE },
            { text: 'Ghost hunter', value: SETTINGS.MAGIC_HELMET_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.RANGED_HELMET]: {
        label: 'Helmet',
        default: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH,
        options: [
            { text: 'None/Tank', value: SETTINGS.RANGED_HELMET_VALUES.NONE },
            { text: 'Sirenic', value: SETTINGS.RANGED_HELMET_VALUES.SIRENIC },
            { text: 'Elite sirenic', value: SETTINGS.RANGED_HELMET_VALUES.ELITE_SIRENIC },
            { text: 'Dracolich', value: SETTINGS.RANGED_HELMET_VALUES.DRACOLICH },
            { text: 'Elite dracolich', value: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH },
            { text: 'Ghost hunter', value: SETTINGS.RANGED_HELMET_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MELEE_HELMET]: {
        label: 'Helmet',
        default: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MELEE_HELMET_VALUES.NONE },
            { text: 'Masterwork', value: SETTINGS.MELEE_HELMET_VALUES.MASTERWORK },
            { text: 'TMW', value: SETTINGS.MELEE_HELMET_VALUES.TMW },
            { text: 'Vestments', value: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS },
            { text: 'Jaws', value: SETTINGS.MELEE_HELMET_VALUES.JAWS },
            { text: 'Ghost hunter', value: SETTINGS.MELEE_HELMET_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.NECRO_HELMET]: {
        label: 'Helmet',
        default: SETTINGS.NECRO_HELMET_VALUES.TFN,
        options: [
            { text: 'None/Tank', value: SETTINGS.NECRO_HELMET_VALUES.NONE },
            { text: 'TFN', value: SETTINGS.NECRO_HELMET_VALUES.TFN },
            { text: 't90 deathdealer', value: SETTINGS.NECRO_HELMET_VALUES.T90DD },
            { text: 'Ghost hunter', value: SETTINGS.NECRO_HELMET_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MAGIC_BODY]: {
        label: 'Body',
        default: SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_BODY_VALUES.NONE },
            { text: 'Tectonic', value: SETTINGS.MAGIC_BODY_VALUES.TECTONIC },
            { text: 'Elite tectonic', value: SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC },
            { text: 'Sliske', value: SETTINGS.MAGIC_BODY_VALUES.SLISKE },
            { text: 'Ghost hunter', value: SETTINGS.MAGIC_BODY_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.RANGED_BODY]: {
        label: 'Body',
        default: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH,
        options: [
            { text: 'None/Tank', value: SETTINGS.RANGED_BODY_VALUES.NONE },
            { text: 'Sirenic', value: SETTINGS.RANGED_BODY_VALUES.SIRENIC },
            { text: 'Elite sirenic', value: SETTINGS.RANGED_BODY_VALUES.ELITE_SIRENIC },
            { text: 'Dracolich', value: SETTINGS.RANGED_BODY_VALUES.DRACOLICH },
            { text: 'Elite dracolich', value: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH },
            { text: 'Ghost hunter', value: SETTINGS.RANGED_BODY_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MELEE_BODY]: {
        label: 'Body',
        default: SETTINGS.MELEE_BODY_VALUES.VESTMENTS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MELEE_BODY_VALUES.NONE },
            { text: 'Masterwork', value: SETTINGS.MELEE_BODY_VALUES.MASTERWORK },
            { text: 'TMW', value: SETTINGS.MELEE_BODY_VALUES.TMW },
            { text: 'Vestments', value: SETTINGS.MELEE_BODY_VALUES.VESTMENTS },
            { text: 'Ghost hunter', value: SETTINGS.MELEE_BODY_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.NECRO_BODY]: {
        label: 'Body',
        default: SETTINGS.NECRO_BODY_VALUES.TFN,
        options: [
            { text: 'None/Tank', value: SETTINGS.NECRO_BODY_VALUES.NONE },
            { text: 'TFN', value: SETTINGS.NECRO_BODY_VALUES.TFN },
            { text: 't90 deathdealer', value: SETTINGS.NECRO_BODY_VALUES.T90DD },
            { text: 'Ghost hunter', value: SETTINGS.NECRO_BODY_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MAGIC_LEGS]: {
        label: 'Legs',
        default: SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_LEGS_VALUES.NONE },
            { text: 'Tectonic', value: SETTINGS.MAGIC_LEGS_VALUES.TECTONIC },
            { text: 'Elite tectonic', value: SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC },
            { text: 'Sliske', value: SETTINGS.MAGIC_LEGS_VALUES.SLISKE },
            { text: 'Ghost hunter', value: SETTINGS.MAGIC_LEGS_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.RANGED_LEGS]: {
        label: 'Legs',
        default: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH,
        options: [
            { text: 'None/Tank', value: SETTINGS.RANGED_LEGS_VALUES.NONE },
            { text: 'Sirenic', value: SETTINGS.RANGED_LEGS_VALUES.SIRENIC },
            { text: 'Elite sirenic', value: SETTINGS.RANGED_LEGS_VALUES.ELITE_SIRENIC },
            { text: 'Dracolich', value: SETTINGS.RANGED_LEGS_VALUES.DRACOLICH },
            { text: 'Elite dracolich', value: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH },
            { text: 'Ghost hunter', value: SETTINGS.RANGED_LEGS_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MELEE_LEGS]: {
        label: 'Legs',
        default: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MELEE_LEGS_VALUES.NONE },
            { text: 'Masterwork', value: SETTINGS.MELEE_LEGS_VALUES.MASTERWORK },
            { text: 'TMW', value: SETTINGS.MELEE_LEGS_VALUES.TMW },
            { text: 'Vestments', value: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS },
            { text: 'Ghost hunter', value: SETTINGS.MELEE_LEGS_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.NECRO_LEGS]: {
        label: 'Legs',
        default: SETTINGS.NECRO_LEGS_VALUES.TFN,
        options: [
            { text: 'None/Tank', value: SETTINGS.NECRO_LEGS_VALUES.NONE },
            { text: 'TFN', value: SETTINGS.NECRO_LEGS_VALUES.TFN },
            { text: 't90 deathdealer', value: SETTINGS.NECRO_LEGS_VALUES.T90DD },
            { text: 'Ghost hunter', value: SETTINGS.NECRO_LEGS_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.MAGIC_GLOVES]: {
        label: 'Gloves',
        default: SETTINGS.MAGIC_GLOVES_VALUES.CINDERS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_GLOVES_VALUES.NONE },
            { text: 'DTB', value: SETTINGS.MAGIC_GLOVES_VALUES.DTB },
            { text: 'Cinderbanes', value: SETTINGS.MAGIC_GLOVES_VALUES.CINDERS },
            { text: 'Kerrywaps', value: SETTINGS.MAGIC_GLOVES_VALUES.KWW },
            { text: 'Kerrywaps+', value: SETTINGS.MAGIC_GLOVES_VALUES.KWW_E }
        ]
    },
    [SETTINGS.RANGED_GLOVES]: {
        label: 'Gloves',
        default: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH,
        options: [
            { text: 'None/Tank', value: SETTINGS.RANGED_GLOVES_VALUES.NONE },
            { text: 'Dracolich', value: SETTINGS.RANGED_GLOVES_VALUES.DRACOLICH },
            { text: 'Elite dracolich', value: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH },
            { text: 'DTB', value: SETTINGS.RANGED_GLOVES_VALUES.DTB },
            { text: 'Cinderbanes', value: SETTINGS.RANGED_GLOVES_VALUES.CINDERS },
            { text: 'Nightmares', value: SETTINGS.RANGED_GLOVES_VALUES.NIGHTMARES },
            { text: 'Nightmares+', value: SETTINGS.RANGED_GLOVES_VALUES.NIGHTMARES_E }
        ]
    },
    [SETTINGS.MELEE_GLOVES]: {
        label: 'Gloves',
        default: SETTINGS.MELEE_GLOVES_VALUES.CINDERS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MELEE_GLOVES_VALUES.NONE },
            { text: 'DTB', value: SETTINGS.MELEE_GLOVES_VALUES.DTB },
            { text: 'Cinderbanes', value: SETTINGS.MELEE_GLOVES_VALUES.CINDERS },
            { text: 'Masterwork', value: SETTINGS.MELEE_GLOVES_VALUES.MASTERWORK },
            { text: 'TMW', value: SETTINGS.MELEE_GLOVES_VALUES.TMW },
            { text: 'GoP', value: SETTINGS.MELEE_GLOVES_VALUES.GOP },
            { text: 'GoP+', value: SETTINGS.MELEE_GLOVES_VALUES.GOP_E }
        ]
    },
    [SETTINGS.NECRO_GLOVES]: {
        label: 'Gloves',
        default: SETTINGS.NECRO_GLOVES_VALUES.TFN,
        options: [
            { text: 'None/Tank', value: SETTINGS.NECRO_GLOVES_VALUES.NONE },
            { text: 'TFN', value: SETTINGS.NECRO_GLOVES_VALUES.TFN },
            { text: 't90 deathdealer', value: SETTINGS.NECRO_GLOVES_VALUES.T90DD },
            { text: 'None/Tank', value: SETTINGS.NECRO_GLOVES_VALUES.DTB },
            { text: 'None/Tank', value: SETTINGS.NECRO_GLOVES_VALUES.CINDERS }
        ]
    },
    [SETTINGS.MAGIC_BOOTS]: {
        label: 'Boots',
        default: SETTINGS.MAGIC_BOOTS_VALUES.BLAST_E,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_BOOTS_VALUES.NONE },
            { text: 'Blast diff', value: SETTINGS.MAGIC_BOOTS_VALUES.BLAST },
            { text: 'Blast diff+', value: SETTINGS.MAGIC_BOOTS_VALUES.BLAST_E },
            { text: 'Silverhawks', value: SETTINGS.MAGIC_BOOTS_VALUES.SH }
        ]
    },
    [SETTINGS.RANGED_BOOTS]: {
        label: 'Boots',
        default: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH,
        options: [
            { text: 'None/Tank', value: SETTINGS.RANGED_BOOTS_VALUES.NONE },
            { text: 'Dracolich', value: SETTINGS.RANGED_BOOTS_VALUES.DRACOLICH },
            { text: 'Elite dracolich', value: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH },
            { text: 'Fleeting', value: SETTINGS.RANGED_BOOTS_VALUES.FLEETING },
            { text: 'Enhanced fleeting', value: SETTINGS.RANGED_BOOTS_VALUES.ENHANCED_FLEETING },
            { text: 'Silverhawks', value: SETTINGS.RANGED_BOOTS_VALUES.SH }
        ]
    },
    [SETTINGS.MELEE_BOOTS]: {
        label: 'Boots',
        default: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS,
        options: [
            { text: 'None/Tank', value: SETTINGS.MAGIC_BOOTS_VALUES.NONE },
            { text: 'Laceration', value: SETTINGS.MAGIC_BOOTS_VALUES.LACERATION },
            { text: 'Enhanced lac', value: SETTINGS.MAGIC_BOOTS_VALUES.ENHANCED_LACERATION },
            { text: 'Silverhawks', value: SETTINGS.MELEE_BOOTS_VALUES.SH },
            { text: 'Masterwork', value: SETTINGS.MELEE_BOOTS_VALUES.MASTERWORK },
            { text: 'TMW', value: SETTINGS.MELEE_BOOTS_VALUES.TMW },
            { text: 'Vestments', value: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS }
        ]
    },
    [SETTINGS.NECRO_BOOTS]: {
        label: 'Boots',
        default: SETTINGS.NECRO_BOOTS_VALUES.TFN,
        options: [
            { text: 'None/Tank', value: SETTINGS.NECRO_BOOTS_VALUES.NONE },
            { text: 'TFN', value: SETTINGS.NECRO_BOOTS_VALUES.TFN },
            { text: 't90 deathdealer', value: SETTINGS.NECRO_BOOTS_VALUES.T90DD },
            { text: 'Silverhawks', value: SETTINGS.NECRO_BOOTS_VALUES.SH }
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
            { text: 'Reaper(or)', value: SETTINGS.NECKLACE_VALUES.REAPEROR }, // TODO: fix missing reference for SETTINGS.REAPEROR and SETTINGS.REAPER
            { text: 'Reaper', value: SETTINGS.NECKLACE_VALUES.REAPER },
            { text: 'Salve (e)', value: SETTINGS.NECKLACE_VALUES.SALVEE },
            { text: 'Salve', value: SETTINGS.NECKLACE_VALUES.SALVE },
            { text: 'Zealots', value: SETTINGS.NECKLACE_VALUES.ZEALOTS }
        ]
    },
    [SETTINGS.CAPE]: {
        label: 'Cape',
        default: SETTINGS.CAPE_VALUES.ZUK,
        options: [
            { text: 'None', value: SETTINGS.CAPE_VALUES.NONE },
            { text: 'Zuk', value: SETTINGS.CAPE_VALUES.ZUK },
            { text: 'Comp cape', value: SETTINGS.CAPE_VALUES.COMP },
            { text: 'Ghost hunter', value: SETTINGS.CAPE_VALUES.GHOST_HUNTER},
        ]
    },
    [SETTINGS.RING]: {
        label: 'Ring',
        default: SETTINGS.RING_VALUES.REAVERS,
        options: [
            { text: 'None', value: SETTINGS.RING_VALUES.NONE },
            { text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
            { text: "Zorg/Occ", value: SETTINGS.RING_VALUES.ZORGOTH },
            { text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
            { text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
            { text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
            { text: 'ASR', value: SETTINGS.RING_VALUES.ASR },
            { text: 'Channeler', value: SETTINGS.RING_VALUES.CHANNELER },
            { text: 'Channeler+', value: SETTINGS.RING_VALUES.CHANNELER_E },
            { text: 'Stalker', value: SETTINGS.RING_VALUES.STALKER },
            { text: 'Stalker+', value: SETTINGS.RING_VALUES.STALKER_E },
            { text: 'Champion', value: SETTINGS.RING_VALUES.CHAMPION },
            { text: 'Champion+', value: SETTINGS.RING_VALUES.CHAMPION_E },
        ]
    },
    /*
    [SETTINGS.MAGIC_RING]: {
        label: 'Ring',
        default: SETTINGS.MAGIC_RING_VALUES.REAVERS,
        options: [
            { text: 'None', value: SETTINGS.RING_VALUES.NONE },
            { text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
            { text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
            { text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
            { text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
            { text: 'ASR', value: SETTINGS.RING_VALUES.ASR },
            { text: 'Channeler', value: SETTINGS.RING_VALUES.CHANNELER },
            { text: 'Channeler+', value: SETTINGS.RING_VALUES.CHANNELER_E }
        ]
    },
    [SETTINGS.RANGED_RING]: {
        label: 'Ring',
        default: SETTINGS.RANGED_RING_VALUES.REAVERS,
        options: [
            { text: 'None', value: SETTINGS.RING_VALUES.NONE },
            { text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
            { text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
            { text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
            { text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
            { text: 'ASR', value: SETTINGS.RING_VALUES.ASR },
            { text: 'Stalker', value: SETTINGS.RING_VALUES.STALKER },
            { text: 'Stalker+', value: SETTINGS.RING_VALUES.STALKER_E }
        ]
    },
    [SETTINGS.MELEE_RING]: {
        label: 'Ring',
        default: SETTINGS.MELEE_RING_VALUES.REAVERS,
        options: [
            { text: 'None', value: SETTINGS.RING_VALUES.NONE },
            { text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
            { text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
            { text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
            { text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
            { text: 'ASR', value: SETTINGS.RING_VALUES.ASR },
            { text: 'Champion', value: SETTINGS.RING_VALUES.CHAMPION },
            { text: 'Champion+', value: SETTINGS.RING_VALUES.CHAMPION_E }
        ]
    },
    [SETTINGS.NECRO_RING]: {
        label: 'Ring',
        default: SETTINGS.NECRO_RING_VALUES.REAVERS,
        options: [
            { text: 'None', value: SETTINGS.RING_VALUES.NONE },
            { text: "Reaver's", value: SETTINGS.RING_VALUES.REAVERS },
            { text: "Zorg/Occ", value: SETTINGS.RING_VALUES.ZORGOTH },
            { text: 'ROD (i)', value: SETTINGS.RING_VALUES.RODI },
            { text: 'ROD', value: SETTINGS.RING_VALUES.ROD },
            { text: 'ASR (i)', value: SETTINGS.RING_VALUES.ASRI },
            { text: 'ASR', value: SETTINGS.RING_VALUES.ASR }
        ]
    },
    [SETTINGS.MAGIC_POCKET]: {
        label: 'Pocket',
        default: SETTINGS.POCKET_VALUES.GRIM,
        options: [
            { text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
            { text: 'Grimoire (active)', value: SETTINGS.POCKET_VALUES.GRIM },
            { text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
            { text: 'Jas (active)', value: SETTINGS.POCKET_VALUES.JAS },
            { text: 'Amascut (active)', value: SETTINGS.POCKET_VALUES.AMASCUT },
            { text: 'New god book (inactive)', value: SETTINGS.POCKET_VALUES.GWD3 },
            { text: 'OG god book', value: SETTINGS.POCKET_VALUES.IGOD },
            { text: 'Underworld grim', value: SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM },
            { text: 'Elements', value: SETTINGS.POCKET_VALUES.ELEMENTS },
            { text: 'Superior elements', value: SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS }
        ]
    },
    [SETTINGS.RANGED_POCKET]: {
        label: 'Pocket',
        default: SETTINGS.POCKET_VALUES.GRIM,
        options: [
            { text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
            { text: 'Grimoire (active)', value: SETTINGS.POCKET_VALUES.GRIM },
            { text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
            { text: 'Jas (active)', value: SETTINGS.POCKET_VALUES.JAS },
            { text: 'Amascut (active)', value: SETTINGS.POCKET_VALUES.AMASCUT },
            { text: 'New god book (inactive)', value: SETTINGS.POCKET_VALUES.GWD3 },
            { text: 'OG god book', value: SETTINGS.POCKET_VALUES.IGOD },
            { text: 'Underworld grim', value: SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM },
            { text: 'Cruelty', value: SETTINGS.POCKET_VALUES.CRUELTY },
            { text: 'Superior cruelty', value: SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY }
        ]
    },
    [SETTINGS.MELEE_POCKET]: {
        label: 'Pocket',
        default: SETTINGS.POCKET_VALUES.GRIM,
        options: [
            { text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
            { text: 'Grimoire (active)', value: SETTINGS.POCKET_VALUES.GRIM },
            { text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
            { text: 'Jas (active)', value: SETTINGS.POCKET_VALUES.JAS },
            { text: 'Amascut (active)', value: SETTINGS.POCKET_VALUES.AMASCUT },
            { text: 'New god book (inactive)', value: SETTINGS.POCKET_VALUES.GWD3 },
            { text: 'OG god book', value: SETTINGS.POCKET_VALUES.IGOD },
            { text: 'Underworld grim', value: SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM }
        ]
    },
    [SETTINGS.NECRO_POCKET]: {
        label: 'Pocket',
        default: SETTINGS.POCKET_VALUES.GRIM,
        options: [
            { text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
            { text: 'Grimoire (active)', value: SETTINGS.POCKET_VALUES.GRIM },
            { text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
            { text: 'Jas (active)', value: SETTINGS.POCKET_VALUES.JAS },
            { text: 'Amascut (active)', value: SETTINGS.POCKET_VALUES.AMASCUT },
            { text: 'New god book (inactive)', value: SETTINGS.POCKET_VALUES.GWD3 },
            { text: 'OG god book', value: SETTINGS.POCKET_VALUES.IGOD },
            { text: 'Underworld grim', value: SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM }
        ]
    },
    */
    [SETTINGS.POCKET]: {
        label: 'Pocket',
        default: SETTINGS.POCKET_VALUES.GRIM,
        options: [
            { text: 'None', value: SETTINGS.POCKET_VALUES.NONE },
            { text: 'Grimoire (active)', value: SETTINGS.POCKET_VALUES.GRIM },
            { text: 'Ful (active)', value: SETTINGS.POCKET_VALUES.FUL },
            { text: 'Jas (active)', value: SETTINGS.POCKET_VALUES.JAS },
            { text: 'Amascut (active)', value: SETTINGS.POCKET_VALUES.AMASCUT },
            { text: 'New god book (inactive)', value: SETTINGS.POCKET_VALUES.GWD3 },
            { text: 'OG god book', value: SETTINGS.POCKET_VALUES.IGOD },
            { text: 'Underworld grim', value: SETTINGS.POCKET_VALUES.UNDERWORLD_GRIM },
            { text: 'Elements', value: SETTINGS.POCKET_VALUES.ELEMENTS },
            { text: 'Superior elements', value: SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS },
            { text: 'Cruelty', value: SETTINGS.POCKET_VALUES.CRUELTY },
            { text: 'Superior cruelty', value: SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY },
        ]
    },
    [SETTINGS.WEAPON]: {
        label: 'Weapon type',
        default: {
            melee: SETTINGS.WEAPON_VALUES.TH,
            ranged: SETTINGS.WEAPON_VALUES.TH,
            magic: SETTINGS.WEAPON_VALUES.TH,
            necromancy: SETTINGS.WEAPON_VALUES.DW
        },
        options: [
            { text: 'Dual wield', value: SETTINGS.WEAPON_VALUES.DW },
            { text: 'Two handed', value: SETTINGS.WEAPON_VALUES.TH }
        ]
    },
    [SETTINGS.MAGIC_MH]: {
        label: 'Mh',
        default: SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING,
        options: [
            { text: 'Custom', value: SETTINGS.MAGIC_MH_VALUES.CUSTOM },
            { text: 'Roar of Awakening', value: SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING }
        ]
    },
    [SETTINGS.RANGED_MH]: {
        label: 'Mh',
        default: SETTINGS.RANGED_MH_VALUES.CUSTOM,
        options: [{ text: 'Custom', value: SETTINGS.RANGED_MH_VALUES.CUSTOM }]
    },
    [SETTINGS.MELEE_MH]: {
        label: 'Mh',
        default: SETTINGS.MELEE_MH_VALUES.LENG,
        options: [
            { text: 'Custom', value: SETTINGS.MELEE_MH_VALUES.CUSTOM },
            { text: 'Leng', value: SETTINGS.MELEE_MH_VALUES.LENG },
            { text: 'Leng t85', value: SETTINGS.MELEE_MH_VALUES.DARK_ICE_SHARD },
            { text: 'Consecrated Keris', value: SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS },
            { text: 'Consecrated Keris proc', value: SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS_PROC },
            { text: 'Primed Keris', value: SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS },
            { text: 'Primed Keris proc', value: SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS_PROC },
            { text: 'Keris', value: SETTINGS.MELEE_MH_VALUES.KERIS },
            { text: 'Keris proc', value: SETTINGS.MELEE_MH_VALUES.KERIS_PROC },
        ]
    },
    [SETTINGS.NECRO_MH]: {
        label: 'Mh',
        default: SETTINGS.NECRO_MH_VALUES.CUSTOM,
        options: [{ text: 'Custom', value: SETTINGS.NECRO_MH_VALUES.CUSTOM }]
    },
    [SETTINGS.MAGIC_OH]: {
        label: 'Oh',
        default: SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT,
        options: [
            { text: 'Custom', value: SETTINGS.MAGIC_OH_VALUES.CUSTOM },
            { text: 'Ode to Deceit', value: SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT },
            { text: 'Custom shield', value: SETTINGS.MAGIC_OH_VALUES.CUSTOM_SHIELD }
        ]
    },
    [SETTINGS.RANGED_OH]: {
        label: 'Oh',
        default: SETTINGS.RANGED_OH_VALUES.CUSTOM,
        options: [
            { text: 'Custom', value: SETTINGS.RANGED_OH_VALUES.CUSTOM },
            { text: 'Custom shield', value: SETTINGS.RANGED_OH_VALUES.CUSTOM_SHIELD }
        ]
    },
    [SETTINGS.MELEE_OH]: {
        label: 'Oh',
        default: SETTINGS.MELEE_OH_VALUES.LENG,
        options: [
            { text: 'Custom', value: SETTINGS.MELEE_OH_VALUES.CUSTOM },
            { text: 'Custom shield', value: SETTINGS.MELEE_OH_VALUES.CUSTOM_SHIELD },
            { text: 'Leng', value: SETTINGS.MELEE_OH_VALUES.LENG },
            { text: 'Leng t85', value: SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER }
        ]
    },
    [SETTINGS.NECRO_OH]: {
        label: 'Oh',
        default: SETTINGS.NECRO_OH_VALUES.CUSTOM,
        options: [
            { text: 'Custom', value: SETTINGS.NECRO_OH_VALUES.CUSTOM },
            { text: 'Custom shield', vaule: SETTINGS.NECRO_OH_VALUES.CUSTOM_SHIELD },
            { text: 'Spectral shield', value: SETTINGS.NECRO_OH_VALUES.SPECTRAL }
        ]
    },
    [SETTINGS.MAGIC_TH]: {
        label: '2h',
        default: SETTINGS.MAGIC_TH_VALUES.CUSTOM,
        options: [
            { text: 'Custom', value: SETTINGS.MAGIC_TH_VALUES.CUSTOM },
            { text: 'Inq', value: SETTINGS.MAGIC_TH_VALUES.INQ_STAFF },
            { text: 'Inq+', value: SETTINGS.MAGIC_TH_VALUES.INQ_STAFF_E }
        ]
    },
    [SETTINGS.RANGED_TH]: {
        label: '2h',
        default: SETTINGS.RANGED_TH_VALUES.BOLG,
        options: [
            { text: 'Custom', value: SETTINGS.RANGED_TH_VALUES.CUSTOM },
            { text: 'Bow of the Last Guardian', value: SETTINGS.RANGED_TH_VALUES.BOLG },
            { text: 'Hex', value: SETTINGS.RANGED_TH_VALUES.HEX },
            { text: 'Hex+', value: SETTINGS.RANGED_TH_VALUES.HEX_E }
        ]
    },
    [SETTINGS.MELEE_TH]: {
        label: '2h',
        default: SETTINGS.MELEE_TH_VALUES.MW_SPEAR,
        options: [
            { text: 'Custom', value: SETTINGS.MELEE_TH_VALUES.CUSTOM },
            { text: 'Terrasaur maul', value: SETTINGS.MELEE_TH_VALUES.T_MAUL },
            { text: 'Terrasaur maul+', value: SETTINGS.MELEE_TH_VALUES.T_MAUL_E },
            { text: 'MW Spear', value: SETTINGS.MELEE_TH_VALUES.MW_SPEAR}
        ]
    },
    [SETTINGS.NECRO_TH]: {
        label: '2h',
        default: SETTINGS.NECRO_TH_VALUES.NONE,
        options: [{ text: 'None', value: SETTINGS.NECRO_TH_VALUES.NONE }]
    },
    [SETTINGS.AMMO]: {
        label: 'Ammo',
        default: SETTINGS.AMMO_VALUES.WEN_ARROWS,
        options: [
            { text: 'None', value: SETTINGS.AMMO_VALUES.NONE },
            { text: 'Ful', value: SETTINGS.AMMO_VALUES.FUL_ARROWS },
            { text: 'Wen', value: SETTINGS.AMMO_VALUES.WEN_ARROWS },
            { text: 'Jas', value: SETTINGS.AMMO_VALUES.JAS_ARROWS },
            { text: 'Deathspore arrows', value: SETTINGS.AMMO_VALUES.DEATHSPORE_ARROWS }
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
        default: 15
    },
    [SETTINGS.ICY_CHILL_STACKS]: {
        label: 'Icy Chill stacks',
        default: 2
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
        label: "Kerapac's wristwraps",
        default: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.NONE },
            { text: 'Regular', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR },
            { text: 'Enchanted', value: SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED }
        ]
    },
    [SETTINGS.TARGET_DISABILITY]: {
        label: 'Stun/bound state',
        default: SETTINGS.TARGET_DISABILITY_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.TARGET_DISABILITY_VALUES.NONE },
            { text: 'Bound', value: SETTINGS.TARGET_DISABILITY_VALUES.BOUND },
            { text: 'Stunned', value: SETTINGS.TARGET_DISABILITY_VALUES.STUNNED },
            { text: 'Bound and stunned', value: SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED }
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
            { text: 'Enchanted', value: SETTINGS.ENDURING_RUIN_HIT_VALUES.ENCHANTED }
        ]
    },
    [SETTINGS.ENDURING_RUIN_BLEED]: {
        label: 'Enduring ruin bleed',
        default: SETTINGS.ENDURING_RUIN_BLEED_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.NONE },
            { text: 'Regular', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.REGULAR },
            { text: 'Enchanted', value: SETTINGS.ENDURING_RUIN_BLEED_VALUES.ENCHANTED }
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
        label: 'Conc stacks',
        default: 0
    },
    [SETTINGS.CHAOS_ROAR]: {
        label: 'Chaos roar',
        default: false
    },
    [SETTINGS.FURY_BUFF]: {
        label: 'Fury buff',
        default: SETTINGS.FURY_BUFF_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.POTION_VALUES.NONE },
            { text: 'Regular', value: SETTINGS.FURY_BUFF_VALUES.REGULAR },
            { text: 'Greater', value: SETTINGS.FURY_BUFF_VALUES.GREATER }
        ]
    },
    [SETTINGS.RAMPAGE]: {
        label: 'Rampage',
        default: false
    },
    [SETTINGS.BALANCE_BY_FORCE]: {
        label: 'Balance by force',
        default: true
    },
    [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: {
        label: 'Bolg stacks',
        default: 0
    },
    [SETTINGS.BIK_STACKS]: {
        label: 'Bik stacks',
        default: 0
    },
    [SETTINGS.CAROMING]: {
        label: 'Caroming',
        default: 4
    },
    [SETTINGS.MH_TIER_CUSTOM]: {
        label: 'MH custom tier',
        default: 95
    },
    [SETTINGS.OH_TIER_CUSTOM]: {
        label: 'OH custom tier',
        default: 95
    },
    [SETTINGS.TH_TYPE_CUSTOM]: {
        label: '2H cust wep type',
        default: SETTINGS.TH_TYPE_CUSTOM_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.TH_TYPE_CUSTOM_VALUES.NONE },
            { text: 'Bow', value: SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW },
        ]
    },
    [SETTINGS.TH_TIER_CUSTOM]: {
        label: '2H custom tier',
        default: 95
    },
    [SETTINGS.TARGET_SIZE]: {
        label: 'Target size',
        default: 5
    },
    [SETTINGS.PRIMORDIAL_ICE]: {
        label: 'Primordial ice',
        default: 0
    },
    [SETTINGS.FROSTBLADES]: {
        label: 'Frostblades',
        default: false
    },
    [SETTINGS.IGNEOUS_EXTENSIOS]: {
        label: 'Igneous extensions',
        default: 5
    },
    [SETTINGS.DRACOLICH_INFUSION]: {
        label: 'Dracolich infusion',
        default: SETTINGS.DRACOLICH_INFUSION_VALUES.NONE,
        options: [
            { text: 'None', value: SETTINGS.DRACOLICH_INFUSION_VALUES.NONE },
            { text: 'Regular', value: SETTINGS.DRACOLICH_INFUSION_VALUES.REGULAR },
            { text: 'Greater', value: SETTINGS.DRACOLICH_INFUSION_VALUES.GREATER }
        ]
    },
    [SETTINGS.INSTABILITY]: {
        label: 'Instability',
        default: true
    },
    [SETTINGS.TIME_SINCE_ATTACK]: {
        label: 'Time since last attack',
        default: 9
    },
    [SETTINGS.INNATE_MASTERY]: {
        label: 'Innate mastery (works on custom t95)',
        default: true
    },
    [SETTINGS.CHANNELER_RING_STACKS]: {
        label: 'Channelers ring stacks',
        default: 0
    },
    [SETTINGS.NUMBER_OF_BLEEDS]: {
        label: 'Bleeds on boss',
        default: 1
    },
    [SETTINGS.STRENGTH_CAPE]: {
        label: 'Str cape',
        default: true
    },
    [SETTINGS.SUNSHINE]: {
        label: 'Sunshine',
        default: false
    },
    [SETTINGS.META]: {
        label: 'Meta',
        default: false
    },
    [SETTINGS.DEATH_SWIFTNESS]: {
        label: 'Swift',
        default: false
    },
    [SETTINGS.SPLIT_SOUL]: {
        label: 'Split soul',
        default: false
    },
    [SETTINGS.ZGS]: {
        label: 'ZGS',
        default: false
    },
    [SETTINGS.BERSERK]: {
        label: 'Berserk',
        default: false
    },
    [SETTINGS.DETONATE]: {
        label: 'Deto charge time',
        default: 5
    },
    [SETTINGS.DIVINE_RAGE]: {
        label: 'Divine rage',
        default: false
    },
    [SETTINGS.SHOW_BOLG_STACKS]: {
        label: 'Show bolg stacks',
        default: true
    },
    [SETTINGS.SHOW_ICY_CHILL_STACKS]: {
        label: 'Show Icy Chill Stacks',
        default: true
    },
    [SETTINGS.ADRENALINE]: {
        label: 'Starting Adrenaline',
        default: 100
    },
    [SETTINGS.VIGOUR]: {
        label: 'Vigour Passive',
        default: true
    },
    [SETTINGS.FURY_OF_THE_SMALL]: {
        label: 'Fury of the Small',
        default: true
    },
    [SETTINGS.HEIGHTENED_SENSES]: {
        label: 'Heightened Senses',
        default: true
    },
    [SETTINGS.CONSERVATION_OF_ENERGY]: {
        label: 'Conservation of Energy',
        default: false
    },
    [SETTINGS.POF_DINOS]: {
        label: 'Dino perks',
        default: SETTINGS.POF_DINOS_VALUES.CORBICULA_2,
        options: [
            { text: 'None', value: SETTINGS.POF_DINOS_VALUES.NONE },
            { text: '1 corbicula', value: SETTINGS.POF_DINOS_VALUES.CORBICULA_1 },
            { text: '2 corbiculas', value: SETTINGS.POF_DINOS_VALUES.CORBICULA_2 }
        ]
    },
    [SETTINGS.LUNGING]: {
        label: 'Lunging',
        default: 0
    },
    [SETTINGS.RUIN]: {
        label: 'Ruin stacks',
        default: 0
    },
};

export { SETTINGS, settingsConfig };
