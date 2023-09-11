

const timeStrike = require('./abils/timestrike')
const wrack = require('./abils/wrack')
const wrackBound = require('./abils/wrack_bound')

const settings = {
    'level': 120,
    'potion': 'Elder overload',
    'prayer': 0.12,

    'mh':{
        'name': 'Wand of the praesul',
        'tier': 92,
        'precise': 0,
        'equilibrium': 0,
        'aftershock': 0,
        'flanking': 0,
        'spendthrift': 0,
        'lunging': 0,
        'ruthless': 0,
    },

    'oh':{
        'name': 'Seismic singularity',
        'tier': 92,
        'precise': 0,
        'equilibrium': 0,
        'aftershock': 0,
        'flanking': 0,
        'spendthrift': 0,
        'lunging': 0,
        'ruthless': 0,
    },

    'th':{
        'name': 'Noxious staff',
        'tier': 90,
        'precise': 0,
        'equilibrium': 0,
        'aftershock': 0,
        'flanking': 0,
        'spendthrift': 0,
        'lunging': 0,
        'ruthless': 0,
    },

    'sh':{
        'name': 'Kalphite rebounder',
        'tier': 90,
        'type': 'defender',
        'precise': 0,
        'equilibrium': 0,
        'aftershock': 0,
        'flanking': 0,
        'spendthrift': 0,
        'lunging': 0,
        'ruthless': 0,
    },

    'helm': {
        'name': 'Tectonic',
        'bonus': 24
    },
    'neck': {
        'name': 'EOF (or)',
        'bonus': 14
    },
    'body': {
        'name': 'Tectonic',
        'bonus': 36
    },
    'legs': {
        'name': 'Tectonic',
        'bonus': 30
    },
    'boots': {
        'name': 'Enhnanced blast diffusion',
        'bonus': 12
    },
    'gloves': {
        'name': 'Enhanced Kerapac',
        'bonus': 12
    },
    'ring': {
        'name': 'Reavers',
        'bonus': 32
    },
    'cape': {
        'name': 'Igneous',
        'bonus': 28
    },
    'pocket': {
        'name': 'Grimoire',
        'bonus': 8
    },
    'aura': {
        'name': 'Maniacal',
        'boost': 0.10
    },

    'bitingRank': 4,
    'armour20': true,
    'biting': 0.022,

    'nope': 0,
    'vuln': 0,
    'sc': 0,
    'fsoa': true,
    'kalg': 1,
    'kalgSpec': 1,
    'ful': 0,
    'zerkEss': 0,
    'reaperCrew': 1,
    'gconc': 0,
    'enchMeta': 1,
    'enchAff': 1,
    'enchFlame': 1,
    'hexHunter': 0,
    'ripperPassive': 0,
    'dharok': 0,
    'exsang': 0,
    'rubyAurora': 0,
    'slayerSigil': 0,
    'cryptbloom': 0,
    'slayerPerk': 0,
    'kww': 0,
    'boostedLvls': 21,
    'revenge': 0
};

const test = wrackBound('Two-hand', settings);

console.log(test);