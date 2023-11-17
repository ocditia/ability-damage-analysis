
const asphyx = require('./abils/asphyx')
const chain = require('./abils/chain')
const combust = require('./abils/combust')
const conc = require('./abils/conc')
const conc3Hit = require('./abils/conc3Hit')
const corrupt_blast = require('./abils/corrupt_blast')
const deep_impact = require('./abils/deep_impact')
const detonate = require('./abils/detonate')
const dragon_breath = require('./abils/dragon_breath')
const frost_surge = require('./abils/frost_surge')
const gconc = require('./abils/gconc')
const gsonic = require('./abils/gsonic')
const gstaff = require('./abils/gstaff')
const igneous_omni = require('./abils/igneous_omni')
const impact = require('./abils/impact')
const magma = require('./abils/magma')
const mh_auto = require('./abils/mh_auto')
const nami = require('./abils/nami')
const oh_auto = require('./abils/oh_auto')
const omni = require('./abils/omni')
const smoke_tend = require('./abils/smoke_tend')
const sonic = require('./abils/sonic')
const th_auto = require('./abils/th_auto')
const timestrike = require('./abils/timestrike')
const tuska = require('./abils/tuska')
const wild = require('./abils/wild')
const wrack_bound = require('./abils/wrack_bound')
const wrack_ruin_bound = require('./abils/wrack_ruin_bound')
const wrack_ruin = require('./abils/wrack_ruin')
const wrack = require('./abils/wrack')
const { performance } = require('perf_hooks');

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

    'ring': 'Channelers',

    'aura': {
        'name':'Maniacal',
        'boost': 0.10
    },

    'bonus': 0,

    'biting': 0.088,
    'grimoire': 1,
    'reavers': 0,
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
    'fsoa': true,
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
    'revenge': 0,
    'flowStacks': 1
};

const test = wrack('Two-hand', settings);

console.log(test);

var startTime = performance.now()
for (var i = 0; i < 100; i++) {
    const test1 = wrack('Two-hand', settings);
}
var endTime = performance.now()

console.log('calcing 4 hit asphyx with instability 10,000 times took')
console.log(endTime - startTime)
console.log('miliseconds')