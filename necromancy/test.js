const necro_auto = require('./abils/necro_auto')
const bloat = require('./abils/bloat')
const skeleton_auto = require('./abils/skeleton_auto')
const blood_siphon = require('./abils/blood_siphon')
const { performance } = require('perf_hooks');

const settings = {
    'AD': 1500, //for manual override only
    'level': 120,
    'potion': "Elder overload",
    'Reaper crew': true,

    'mh':{
        'name': 'Wand of the praesul',
        'perks': [['Precise',6], ['aftershock',1]]
    },

    'oh':{
        'name': 'Seismic singularity',
        'perks': [['equilibrium',2], ['aftershock',4]]
    },

    'top':{
        'name': 'Elite tectonic',
        'perks': [['biting',4]]
    },

    'bottom':{
        'name': 'Elite tectonic',
        'perks': [['biting',4]]
    },

    'boots': 'Enhanced blast diffusion',

    'gloves': 'Enhanced Kerapac',

    'ring': 'Channelers',

    'aura': 'Mahjarrat',

    'bonus': 0,

    'cap': 10000,
    'critCap': 15000,

    //on-cast effects
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,

    //on-hit effects
    //shared
    'Revenge': 0,
    'Spendthrift': 0,
    'Ruthless': 0,

    //pvn only
    'Slayer helm': 0,
    'Fort forinthry guardhouse': false,
    'Salve amulet': false,
    'Ripper demon passive': 0,
    
    //unknown order
    'Berserkers fury': 0,    

    //on-crit effects
    'Animate dead': false,
    'Kalgerion demon familiar': false,
    'Crit-i-kal': false,

    //on-npc effects
    'Vulnerability': false,
    'Corrupted wounds': false, //gop bleed buff
    'Slayer sigil': false,

    //apply somewhere idk
    'nopenopenope': 0, //poh spider buff
    'Ruby aurora': 0,
    'cryptbloom': false,
    'Skeleton rage stacks': 2,
    'Zamorak inner chaos': 0,
    'Zamorak guardians triumph': 0,
    'Zamorak sword of edicts': 0,
    'Telos red beam': false,
    'Telos black beam': false,
    'Infernal puzzle box': false,
    'King black dragon wilderness portal': false,
    'Tokkul-zo': false,
};

const test = skeleton_auto('Two-hand', settings,10);

console.log(test);

/* var startTime = performance.now()
for (var i = 0; i < 1000; i++) {
    const test1 = bloat('Two-hand', settings,1);
}
var endTime = performance.now()

console.log('calcing necro auto 100,000 times took')
console.log(endTime - startTime)
console.log('miliseconds') */