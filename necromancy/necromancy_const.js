const thWeapons = {
    "Inquisitor staff":{
        "tier": 80,
        "weaponDmg": 0
    },
    "Fractured staff of Armadyl":{
        "tier": 95,
        "weaponDmg": 0
    },
    "Staff of Sliske":{
        "tier": 92,
        "weaponDmg": 0
    },
    "Noxious staff":{
        "tier": 90,
        "weaponDmg": 0
    },
    "Superior Zuriel":{
        "tier": 88,
        "weaponDmg": 0
    },
    "Obliteration":{
        "tier": 87,
        "weaponDmg": 0
    },
    "Attuned crystal":{
        "tier": 80,
        "weaponDmg": 0
    },
    "Sunspear":{
        "tier": 78,
        "weaponDmg": 0
    },
}
const mhWeapons = {
    "Wand of the praesul":{
        "tier": 92,
        "weaponDmg": 0
    },
    "Seismic wand":{
        "tier": 90,
        "weaponDmg": 0
    },
    "Elite seasinger":{
        "tier": 88,
        "weaponDmg": 0
    },
    "Cywir":{
        "tier": 85,
        "weaponDmg": 0
    },
    "Virtus":{
        "tier": 80,
        "weaponDmg": 0
    }
}

const ohWeapons = {
    "lantern":{
        "tier": 92,
        "weaponDmg": 0
    }
}

const shWeapons = {
}

const helms = {
    "Deathguard":{
        "bonus": 24
    }
}

const bodies = {
    "Deathguard":{
        "bonus": 36
    }
}

const legs = {
    "Deathguard":{
        "bonus": 31
    }
}

const boots = {
    "Enhanced blast diffusion":{
        "bonus": 14.5
    },
    "Hailfire":{
        "bonus": 14
    },
    "Blast diffusion":{
        "bonus": 12
    },
    "Virtus":{
        "bonus": 12
    },
    "Subjugation":{
        "bonus": 11
    },
    "Silverhawk":{
        "bonus": 0.2
    }
}

const gloves = {
    "Deathguard":{
        "bonus": 14.5
    }
}

const necks = {
    "EOF (or)":{
        "bonus": 59
    },
    "EOF":{
        "bonus": 56
    },
    "AOS (or)":{
        "bonus": 48
    },
    "AOS":{
        "bonus": 46.3
    },
    "Reaper (or)":{
        "bonus": 38.4
    },
    "Reaper":{
        "bonus": 36.8
    },
    "Salve (e)":{
        "bonus": 4.2
    },
    "Salve":{
        "bonus": 0
    },
    "Dragon rider":{
        "bonus": 30.2
    }
}

const rings = {
    "Reavers":{
        "bonus": 27.7
    },
    "Channelers":{
        "bonus": 30.4
    },
    "Ring of death (i)":{
        "bonus": 27.7
    },
    "Ring of death":{
        "bonus": 25.2
    },
    "ASR (i)":{
        "bonus": 23.4
    },
    "ASR":{
        "bonus": 21
    }
}

const capes = {
    "Igneous":{
        "bonus": 43
    },
    "Completionist":{
        "bonus": 31.5
    },
    "Tokhaar":{
        "bonus": 33
    },
    "God cape":{
        "bonus": 31.5
    },
    "Max cape":{
        "bonus": 31.5
    },
    "Skillcape":{
        "bonus": 21.6
    }
}

const pockets = {
    "Grimoire":{
        "bonus": 7
    },
    "Scripture":{
        "bonus": 8
    },
    "Superior scrimshaw of elements":{
        "bonus": 0
    },
    "Scrimshaw of elements":{
        "bonus": 0
    },
    "Illuminated god book":{
        "bonus": 7
    },
    "God book":{
        "bonus": 5
    }
}

const auras = {
    "Mahjarrat":{
        "levels": 0.0,
        "boost": 0.05
    },
    "Equilibrium":{
        "levels": 0.0,
        "boost": 0.0
    }
}

const prayers = {
    "Affliction":{
        "boost": 0.12
    },
    "Anguish":{
        "boost": 0.08
    }
}

const potions = {
    "Elder overload":{
        "levels": 5,
        "percent": 0.17
    }
}

const abils = {
    "basic attack":{
        "fixed percent": 0.9,
        "variable percent": 0.2
    },
    "skeleton auto":{
        "fixed percent": 0.22,
        "variable percent": 0.06
    },
    "finger of death":{
        "fixed percent": 2.7,
        "variable percent": 0.6
    },
    "touch of death":{
        "fixed percent": 0.9,
        "variable percent": 0.2
    },
    "death skulls":{
        "fixed percent": 2.25,
        "variable percent": 0.5
    },
    "blood siphon - siphon":{
        "fixed percent": 0.22,
        "variable percent": 0.06
    },
    "blood siphon - hit":{
        "fixed percent": 1.17,
        "variable percent": 0.26
    },
    "zombie auto":{
        "fixed percent": 0.18,
        "variable percent": 0.04
    },
    "zombie poison":{
        "fixed percent": 0.08,
        "variable percent": 0.04
    },
    "ghost auto":{
        "fixed percent": 0.18,
        "variable percent": 0.04
    },
    "bloat - initial hit":{
        "fixed percent": 1.35,
        "variable percent": 0.3
    },
    "bloat - bleed hit":{
        "number of hits": 10
    },
    "soul sap":{
        "fixed percent": 0.9,
        "variable percent": 0.2
    },
    "soul strike - main":{
        "fixed percent": 1.35,
        "variable percent": 0.3
    },
    "soul strike - aoe":{
        "fixed percent": 0.9,
        "variable percent": 0.2
    },
    "spectral scythe - 1":{
        "fixed percent": 0.72,
        "variable percent": 0.16
    },
    "spectral scythe - 2":{
        "fixed percent": 1.8,
        "variable percent": 0.4
    },
    "spectral scythe - 3":{
        "fixed percent": 2.25,
        "variable percent": 0.5
    },
    "volley of souls":{
        "fixed percent": 1.35,
        "variable percent": 0.3
    },
    "death grasp":{
        "fixed percent": 4.05,
        "variable percent": 4.95
    },
    "death essence":{
        "fixed percent": 3.6,
        "variable percent": 0.8
    }
}

module.exports = abils;