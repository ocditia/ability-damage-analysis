weapons = {
    'wand of the praesul': {
        'style': 'magic',
        'weapon type': 'main-hand',
        'tier': 92
    },

    'imperium core': {
        'style': 'magic',
        'weapon type': 'off-hand',
        'tier': 92
    },

    'inquisitor staff': {   
        'style': 'magic',
        'weapon type': 'two-hand',
        'tier': 80
    },

    'inquisitor staff+': {
        'style': 'magic',
        'weapon type': 'two-hand',
        'tier': 80
    },
}

gear = {
    'corrupted slayer helmet': {
        'boost': 0.095
    },
    'none': {
        'boost': 0
    }
}

abils = { 
    'wrack': { // ability name
    'min hit': 0.95, // min % of abil expressed as a decimal
    'var hit': 0.2,
    'on-hit effects': true, // does the ability get on-hit effects
    'crit effects': true, // can the ability crit
    'damage potential effects': true, // is the ability affected by damage potential
    'ability classification': 'regular' // bleed, dot, burn, etc
    },
}

prayers = {
    'affliction': {
        'boost': 0.12,
        'style': 'magic'
    }
}

export {weapons, gear, abils, prayers};