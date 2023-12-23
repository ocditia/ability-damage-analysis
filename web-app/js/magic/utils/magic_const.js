const thWeapons = {
  'Inquisitor staff': {
    tier: 80,
    weaponDmg: 0
  },
  'Fractured staff of Armadyl': {
    tier: 95,
    weaponDmg: 0
  },
  'Staff of Sliske': {
    tier: 92,
    weaponDmg: 0
  },
  'Noxious staff': {
    tier: 90,
    weaponDmg: 0
  },
  'Superior Zuriel': {
    tier: 88,
    weaponDmg: 0
  },
  Obliteration: {
    tier: 87,
    weaponDmg: 0
  },
  'Attuned crystal': {
    tier: 80,
    weaponDmg: 0
  },
  Sunspear: {
    tier: 78,
    weaponDmg: 0
  }
};
const mhWeapons = {
  'Wand of the praesul': {
    tier: 92,
    weaponDmg: 0
  },
  'Seismic wand': {
    tier: 90,
    weaponDmg: 0
  },
  'Elite seasinger': {
    tier: 88,
    weaponDmg: 0
  },
  Cywir: {
    tier: 85,
    weaponDmg: 0
  },
  Virtus: {
    tier: 80,
    weaponDmg: 0
  }
};

const ohWeapons = {
  'Imperium core': {
    tier: 92,
    weaponDmg: 0
  },
  'Seismic sing': {
    tier: 90,
    weaponDmg: 0
  },
  'Elite seasinger': {
    tier: 88,
    weaponDmg: 0
  },
  Cywir: {
    tier: 85,
    weaponDmg: 0
  },
  Virtus: {
    tier: 80,
    weaponDmg: 0
  }
};

const shWeapons = {
};

const helms = {
  'Elite tectonic': {
    bonus: 24
  },
  Tectonic: {
    bonus: 23
  },
  'Superior Zuriel': {
    bonus: 22
  },
  'Refined Seren': {
    bonus: 21
  },
  Virtus: {
    bonus: 20
  },
  Seren: {
    bonus: 20
  },
  Zuriel: {
    bonus: 20
  },
  Subjugation: {
    bonus: 17
  }
};

const bodies = {
  'Elite tectonic': {
    bonus: 36
  },
  Tectonic: {
    bonus: 34
  },
  'Superior Zuriel': {
    bonus: 33
  },
  'Refined Seren': {
    bonus: 32
  },
  Virtus: {
    bonus: 30
  },
  Seren: {
    bonus: 30
  },
  Zuriel: {
    bonus: 30
  },
  Subjugation: {
    bonus: 26
  }
};

const legs = {
  'Elite tectonic': {
    bonus: 31
  },
  Tectonic: {
    bonus: 29
  },
  'Superior Zuriel': {
    bonus: 28
  },
  'Refined Seren': {
    bonus: 27
  },
  Virtus: {
    bonus: 25
  },
  Seren: {
    bonus: 25
  },
  Zuriel: {
    bonus: 25
  },
  Subjugation: {
    bonus: 22
  }
};

const boots = {
  'Enhanced blast diffusion': {
    bonus: 14.5
  },
  Hailfire: {
    bonus: 14
  },
  'Blast diffusion': {
    bonus: 12
  },
  Virtus: {
    bonus: 12
  },
  Subjugation: {
    bonus: 11
  },
  Silverhawk: {
    bonus: 0.2
  }
};

const gloves = {
  'Enhanced Kerapac': {
    bonus: 14.5
  },
  Deathtouch: {
    bonus: 14.5
  },
  Celestial: {
    bonus: 14.5
  },
  Kerapac: {
    bonus: 13.5
  },
  Cinderbane: {
    bonus: 11
  },
  Virtus: {
    bonus: 12
  },
  Spellcaster: {
    bonus: 0
  },
  Subjugation: {
    bonus: 11
  }
};

const necks = {
  'EOF (or)': {
    bonus: 59
  },
  EOF: {
    bonus: 56
  },
  'AOS (or)': {
    bonus: 48
  },
  AOS: {
    bonus: 46.3
  },
  'Reaper (or)': {
    bonus: 38.4
  },
  Reaper: {
    bonus: 36.8
  },
  'Salve (e)': {
    bonus: 4.2
  },
  Salve: {
    bonus: 0
  },
  'Dragon rider': {
    bonus: 30.2
  }
};

const rings = {
  Reavers: {
    bonus: 27.7
  },
  Channelers: {
    bonus: 30.4
  },
  'Ring of death (i)': {
    bonus: 27.7
  },
  'Ring of death': {
    bonus: 25.2
  },
  'ASR (i)': {
    bonus: 23.4
  },
  ASR: {
    bonus: 21
  }
};

const capes = {
  Igneous: {
    bonus: 43
  },
  Completionist: {
    bonus: 31.5
  },
  Tokhaar: {
    bonus: 33
  },
  'God cape': {
    bonus: 31.5
  },
  'Max cape': {
    bonus: 31.5
  },
  Skillcape: {
    bonus: 21.6
  }
};

const pockets = {
  Grimoire: {
    bonus: 7
  },
  Scripture: {
    bonus: 8
  },
  'Superior scrimshaw of elements': {
    bonus: 0
  },
  'Scrimshaw of elements': {
    bonus: 0
  },
  'Illuminated god book': {
    bonus: 7
  },
  'God book': {
    bonus: 5
  }
};

const auras = {
  Maniacal: {
    levels: 0.10,
    boost: 0.10
  },
  Mahjarrat: {
    levels: 0.0,
    boost: 0.05
  },
  Equilibrium: {
    levels: 0.0,
    boost: 0.0
  }
};

const prayers = {
  Affliction: {
    boost: 0.12
  },
  Anguish: {
    boost: 0.08
  }
};

const potions = {
  'Elder overload': {
    levels: 5,
    percent: 0.17
  },
  'Supreme overload': {
    levels: 4,
    percent: 0.16
  },
  Overload: {
    levels: 3,
    percent: 0.15
  },
  'Supreme magic': {
    levels: 4,
    percent: 0.16
  },
  'Extreme magic': {
    levels: 3,
    percent: 0.15
  },
  'Super magic': {
    levels: 2,
    percent: 0.12
  }
};
