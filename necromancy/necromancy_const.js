const thWeapons = {

}

const mhWeapons = {
    "Death guard (tier 80)":{
        "tier": 80,
        "weaponDmg": 0
    },
    "Death guard (tier 90)":{
        "tier": 90,
        "weaponDmg": 0
    },
    "Omni guard":{
        "tier": 95,
        "weaponDmg": 0
    }
}

const ohWeapons = {
    "Skull lantern (tier 80)":{
        "tier": 80,
        "weaponDmg": 0
    },
    "Skull lantern (tier 90)":{
        "tier": 90,
        "weaponDmg": 0
    },
    "Soulbound lantern":{
        "tier": 95,
        "weaponDmg": 0
    }
}

const shWeapons = {
}

const helms = {
    "Deathdealer hood (tier 80)":{
        "bonus": 20.3
    },
    "Deathdealer hood (tier 90)":{
        "bonus": 23.2
    },
    "Foot wraps of the first necromancer":{
        "bonus": 25
    }
}

const bodies = {
    "Deathdealer robe top (tier 80)":{
        "bonus": 30.5
    },
    "Deathdealer robe top (tier 90)":{
        "bonus": 34.8
    },
    "Foot wraps of the first necromancer":{
        "bonus": 37
    }
}

const legs = {
    "Deathdealer robe bottom (tier 80)":{
        "bonus": 25.4
    },
    "Deathdealer robe bottom (tier 90)":{
        "bonus": 29
    },
    "Foot wraps of the first necromancer":{
        "bonus": 32
    }
}

const boots = {
    "Deathdealer boots (tier 80)":{
        "bonus": 12.7
    },
    "Deathdealer boots (tier 90)":{
        "bonus": 14.5
    },
    "Foot wraps of the first necromancer":{
        "bonus": 16
    },
    "Silverhawk boots (tier 60)":{
        "bonus": 6.9
    }
}

const gloves = {
    "Deathdealer gloves (tier 80)":{
        "bonus": 12.7
    },
    "Deathdealer gloves (tier 90)":{
        "bonus": 14.5
    },
    "Hand wrap of the first necromancer":{
        "bonus": 16
    }
}

const necks = {
    "Essence of finality amulet (or)":{
        "bonus": 59
    },
    "Essence of finality amulet":{
        "bonus": 56
    },
    "Amulet of souls (or)":{
        "bonus": 48
    },
    "Amulet of souls":{
        "bonus": 46.3
    },
    "Reaper (or)":{
        "bonus": 38.4
    },
    "Reaper necklace":{
        "bonus": 36.8
    },
    "Salve (e)":{
        "bonus": 4.2
    },
    "Salve":{
        "bonus": 0
    },
    "Dragon rider necklace":{
        "bonus": 30.2
    }
}

const rings = {
    "Reavers":{
        "bonus": 27.7
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
    "Igneous kal-mor":{
        "bonus": 43
    },
    "Completionist":{
        "bonus": 31.5
    },
    "Tokhaar-kal-mor":{
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
    "Scripture of jas":{
        "bonus": 8
    },
    "Scripture of ful":{
        "bonus": 8
    },
    "Scripture of wen":{
        "bonus": 8
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
    "Ruination":{
        "boost": 0.12
    },
    "Sorrow":{
        "boost": 0.10
    },
    "Sanctity":{
        "boost": 0.08
    },
    "Accelerated decay":{
        "boost": 0.06
    },
    "Hastened decay":{
        "boost": 0.06
    },
    "Decay":{
        "boost": 0.02
    }
}

const potions = {
    "Elder overload":{
        "levels": 5,
        "percent": 0.17
    },
    "Overload":{
        "levels": 3,
        "percent": 0.15
    },
    "Extreme necromancy":
    {
        "levels": 3,
        "percent": 0.15
    },
    "Super necromancy":
    {
        "levels": 2,
        "percent": 0.12
    },
    "Necromancy potion":
    {
        "levels": 1
        "percent": 0.08
    }
}

const abils = {
    "basic attack":{
        "fixed percent": 0.9,
        "variable percent": 0.2,
        "on hit effects": true,
        "crit effects": true
    },
    "skeleton auto":{
        "fixed percent": 0.22,
        "variable percent": 0.06,
        "on hit effects": false,
        "crit effects": false
        
    },
    "finger of death":{
        "fixed percent": 2.7,
        "variable percent": 0.6,
        "on hit effects": true,
        "crit effects": true
    },
    "touch of death":{
        "fixed percent": 0.9,
        "variable percent": 0.2,
        "on hit effects": true,
        "crit effects": true
    },
    "death skulls":{
        "fixed percent": 2.25,
        "variable percent": 0.5,
        "on hit effects": true,
        "crit effects": true
    },
    "blood siphon - siphon":{
        "fixed percent": 0.22,
        "variable percent": 0.06
    },
    "blood siphon - hit":{
        "fixed percent": 1.17,
        "variable percent": 0.26,
        "on hit effects": true,
        "crit effects": true
    },
    "zombie auto":{
        "fixed percent": 0.18,
        "variable percent": 0.04,
        "on hit effects": false,
        "crit effects": false        
    },
    "zombie poison":{
        "fixed percent": 0.08,
        "variable percent": 0.04
    },
    "command zombie":{
        "fixed percent": 0.08,
        "variable percent": 0.04,
        "on hit effects": false,
        "crit effects": false
    },
    "ghost auto":{
        "fixed percent": 0.18,
        "variable percent": 0.04,
        "on hit effects": false,
        "crit effects": false
    },
    "bloat - initial hit":{
        "fixed percent": 1.35,
        "variable percent": 0.3,
        "on hit effects": true,
        "crit effects": true
    },
    "bloat - bleed hit":{
        "number of hits": 10
    },
    "soul sap":{
        "fixed percent": 0.9,
        "variable percent": 0.2,
        "on hit effects": true,
        "crit effects": true
    },
    "soul strike - main":{
        "fixed percent": 1.35,
        "variable percent": 0.3,
        "on hit effects": true,
        "crit effects": true
    },
    "soul strike - aoe":{
        "fixed percent": 0.9,
        "variable percent": 0.2,
        "on hit effects": true,
        "crit effects": true
    },
    "spectral scythe - 1":{
        "fixed percent": 0.72,
        "variable percent": 0.16,
        "on hit effects": true,
        "crit effects": true
    },
    "spectral scythe - 2":{
        "fixed percent": 1.8,
        "variable percent": 0.4,
        "on hit effects": true,
        "crit effects": true
    },
    "spectral scythe - 3":{
        "fixed percent": 2.25,
        "variable percent": 0.5,
        "on hit effects": true,
        "crit effects": true
    },
    "volley of souls":{
        "fixed percent": 1.35,
        "variable percent": 0.3,
        "on hit effects": true,
        "crit effects": true
    },
    "death grasp":{
        "fixed percent": 4.05,
        "variable percent": 4.95,
        "on hit effects": true,
        "crit effects": true
    },
    "death essence":{
        "fixed percent": 3.6,
        "variable percent": 0.8,
        "on hit effects": true,
        "crit effects": true
    }
}

module.exports = abils;