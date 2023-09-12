

const timeStrike = require('./abils/timestrike')
const wrack = require('./abils/wrack')
const wrackBound = require('./abils/wrack_bound')
const wild = require('./abils/wild')
const omni = require('./abils/omni')
const asphyx = require('./abils/asphyx')
const gconc = require('./abils/gconc')
const igneousOmni = require('./abils/igneous_omni')

const settings = {
    'level': 120,
    'boostedLvls': 21,
    'prayer': 0.12,
    'AD': 1756,

    'mh':{
        'name': 'Wand of the praesul',
        'tier': 92
    },

    'oh':{
        'name': 'Seismic singularity',
        'tier': 92
    },

    'th':{
        'name': 'Inquisitor staff',
        'tier': 80
    },

    'sh':{
        'name': 'Kalphite rebounder',
        'tier': 90,
        'type': 'defender'
    },

    'boots': 'Enhanced blast diffusion',

    'gloves': 'Enhanced Kerapac',

    'ring': 'Reavers',

    'aura': {
        'name':'Maniacal',
        'boost': 0.10
    },

    'bonus': 0,

    'biting': 0.088,
    'grimoire': 1,
    'reavers': 1,
    'cap': 10000,
    'critCap': 15000,

    'salve': false,
    'scrimshaw': false,
    'precise': 0,
    'equilibrium': 0,
    'ruthless': 0,
    'flanking': 0,
    'lunging': 0,

    'nope': 0,
    'vuln': 1,
    'sc': 1,
    'fsoa': false,
    'kalg': 1,
    'kalgSpec': 1,
    'ful': 0,
    'zerkEss': 0,
    'reaperCrew': 1,
    'gconc': 0,
    'enchMeta': true,
    'enchAff': true,
    'enchFlame': true,
    'hexHunter': 1,
    'ripperPassive': 0,
    'dharok': 0,
    'exsang': 0,
    'rubyAurora': 0,
    'slayerSigil': 0,
    'cryptbloom': 0,
    'slayerPerk': 0,
    'kww': 0,
    'revenge': 0
};

const test = igneousOmni('Two-hand', settings);

console.log(test);