const SETTINGS = {
  MODE: 'mode',
  MODE_VALUES: {
    MEAN: 'avg',
    MIN_NO_CRIT: 'min no crit',
    MIN_CRIT: 'min crit',
    MAX_NO_CRIT: 'max no crit',
    MAX_CRIT: 'max crit',
  },
  ABILITY_DAMAGE: 'ability damage',
  LEVEL: 'level',
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
  PRAYER_VALUES: {
    NONE: 'none',
    RUINATION: 'ruination',
    SORROW: 'sorrow',
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
    LVL1: 'level 1',
    LVL1_UNDEAD: 'level 1 - undead',
    LVL3: 'level 3',
    LVL3_UNDEAD: 'level 3 - undead'
  },
  GENOCIDAL: 'genocidal',
  RIPPER: 'ripper passive',
  AURA: 'aura',
  AURA_VALUES: {
    NONE: 'none',
    MAHJARRAT: 'mahjarrat',
    EQUILIBRIUM: 'equilibrium',
  },
  VULN: 'vulnerability',
  SMOKE_CLOUD: 'smoke cloud',
  CRYPTBLOOM: 'cryptbloom',
  SLAYER_PERK: 'slayer perk',
  SLAYER_SIGIL: 'slayer sigil',
  HAUNTED: 'haunted',
  RAGE_STACKS: 'skeleton rage stacks',
  NOPE: 'nopenopenope',
  KALG_PASSIVE: 'kalg',
  KALG_SPEC: 'kalg spec',
  CUSTOM_ON_AD: 'custom on ad',
  CUSTOM_ON_HIT: 'custom on hit',
  CUSTOM_ON_NPC: 'custom on npc',
  CUSTOM_CRIT: 'custom crit',
  WEIRD_SETTING: 'weird setting'
}

const settingsConfig = {
  [SETTINGS.MODE]: {
    label: 'Mode',
    default: SETTINGS.MODE_VALUES.MEAN,
    options: [
      { text: 'Mean', value: SETTINGS.MODE_VALUES.MEAN},
      { text: 'Min no crit', value: SETTINGS.MODE_VALUES.MIN_NO_CRIT},
      { text: 'Min crit', value: SETTINGS.MODE_VALUES.MIN_CRIT},
      { text: 'Max no crit', value: SETTINGS.MODE_VALUES.MAX_NO_CRIT},
      { text: 'Max crit', value: SETTINGS.MODE_VALUES.MAX_CRIT}
    ]
  },
  [SETTINGS.ABILITY_DAMAGE]: {
    label: 'Ability Damage',
    default: 0
  },
  [SETTINGS.LEVEL]: {
    label: 'Base Necromancy Level',
    default: 120
  },
  [SETTINGS.POTION]: {
    label: 'Potion',
    default: SETTINGS.POTION_VALUES.ELDER,
    options: [
      { text: 'None', value: SETTINGS.POTION_VALUES.NONE},
      { text: 'Elder overload', value: SETTINGS.POTION_VALUES.ELDER},
      { text: 'Supreme overload', value: SETTINGS.POTION_VALUES.SUPREME},
      { text: 'Overload', value: SETTINGS.POTION_VALUES.OVERLOAD},
      { text: 'Extreme', value: SETTINGS.POTION_VALUES.EXTREME},
      { text: 'Super', value: SETTINGS.POTION_VALUES.SUPER},
      { text: 'Regular', value: SETTINGS.POTION_VALUES.REGULAR}
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
  [SETTINGS.PRAYER]: {
    label: 'Prayer',
    default: SETTINGS.PRAYER_VALUES.RUINATION,
    options: [
      { text: 'None', value: SETTINGS.PRAYER_VALUES.NONE},
      { text: 'Ruination', value: SETTINGS.PRAYER_VALUES.RUINATION},
      { text: 'Sorrow', value: SETTINGS.PRAYER_VALUES.SORROW},
      { text: 'Sanctity', value: SETTINGS.PRAYER_VALUES.SANCTITY},
      { text: 'Accelerated Decay', value: SETTINGS.PRAYER_VALUES.ACCELERATED_DECAY},
      { text: 'Hastened Decay', value: SETTINGS.PRAYER_VALUES.HASTENED_DECAY},
      { text: 'Decay', value: SETTINGS.PRAYER_VALUES.DECAY}
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
    label: "Dharok's Momento %",
    default: 0
  },
  [SETTINGS.RUTHLESS_STACKS]: {
    label: "Ruthless Stacks",
    default: 0
  },
  [SETTINGS.SLAYER_HELM]: {
    label: 'Slayer Helm',
    default: SETTINGS.SLAYER_HELM_VALUES.NONE,
    options: [
      { text: 'None', value: SETTINGS.SLAYER_HELM_VALUES.NONE},
      { text: 'Regular', value: SETTINGS.SLAYER_HELM_VALUES.REGULAR},
      { text: 'Full', value: SETTINGS.SLAYER_HELM_VALUES.FULL},
      { text: 'Reinforced', value: SETTINGS.SLAYER_HELM_VALUES.REINFORCED},
      { text: 'Strong', value: SETTINGS.SLAYER_HELM_VALUES.STRONG},
      { text: 'Mighty', value: SETTINGS.SLAYER_HELM_VALUES.MIGHTY},
      { text: 'Corrupted', value: SETTINGS.SLAYER_HELM_VALUES.CORRUPTED}
    ]
  },
  [SETTINGS.GUARDHOUSE]: {
    label: 'Guardhouse',
    default: SETTINGS.GUARDHOUSE_VALUES.NONE,
    options: [
      { text: 'None', value: SETTINGS.GUARDHOUSE_VALUES.NONE},
      { text: 'Level 1', value: SETTINGS.GUARDHOUSE_VALUES.LVL1},
      { text: 'Level 1 with undead target', value: SETTINGS.GUARDHOUSE_VALUES.LVL1_UNDEAD},
      { text: 'Level 3 with target under 25%', value: SETTINGS.GUARDHOUSE_VALUES.LVL3},
      { text: 'Level 3 with undead target under 25%', value: SETTINGS.GUARDHOUSE_VALUES.LVL3_UNDEAD},
    ]
  },
  [SETTINGS.GENOCIDAL]: {
    label: 'Genocidal %',
    default: 0
  },
  [SETTINGS.RIPPER]: {
    label: 'Ripper Passive %',
    default: 0
  },
  [SETTINGS.AURA]: {
    label: 'Aura',
    default: SETTINGS.AURA_VALUES.MAHJARRAT,
    options: [
      { text: 'None', value: SETTINGS.AURA_VALUES.NONE},
      { text: 'Mahjarrat', value: SETTINGS.AURA_VALUES.MAHJARRAT},
      { text: 'Equilibrium', value: SETTINGS.AURA_VALUES.EQUILIBRIUM},
    ]
  },
  [SETTINGS.VULN]: {
    label: 'Vulnerability',
    default: true
  },
  [SETTINGS.SMOKE_CLOUD]: {
    label: 'Smoke Cloud',
    default: true
  },
  [SETTINGS.CRYPTBLOOM]: {
    label: 'Cryptbloom Vuln',
    default: false
  },
  [SETTINGS.SLAYER_PERK]: {
    label: 'Slayer Perk',
    default: false
  },
  [SETTINGS.SLAYER_SIGIL]: {
    label: 'Slayer Sigil',
    default: false
  },
  [SETTINGS.HAUNTED]: {
    label: 'Haunted',
    default: true
  },
  [SETTINGS.RAGE_STACKS]: {
    label: 'Skeleton rage stacks',
    default: 0
  },
  [SETTINGS.NOPE]: {
    label: 'Nope Nope Nope',
    default: false
  },
  [SETTINGS.KALG_PASSIVE]: {
    label: 'Kalg Passive',
    default: false
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
  [SETTINGS.WEIRD_SETTING]: {
    label: 'Wrid',
    default: 50
  },
}

export {SETTINGS, settingsConfig}