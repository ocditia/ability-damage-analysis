const necro_auto = require('./abils/necro_auto')
const test_auto = require('./abils/zzz_test_abil')
const bloat = require('./abils/bloat')
const skeleton_auto = require('./abils/skeleton_auto')
const blood_siphon = require('./abils/blood_siphon')
const { performance } = require('perf_hooks');

const settings = {
    'minavgmax': 'avg',

    'ability damage': 0, //for manual override only
    'level': 120,
    'potion': "elder overload",
    
    'two-handed weapon': 1,
    'main-hand weapon': 'Omni guard',
    'off-hand weapon': 'Soulbound lantern',
    'shield': 1,
    'defender': 1,
    'helmet': 'Crown of the first necromancer',
    'body': 'Robe top of the first necromancer',
    'leg': 'Robe bottom of the first necromancer',
    'gloves': 'Hand wraps of the first necromancer',
    'boots': 'Foot wraps of the first necromancer',
    'necklace': 'Essence of finality amulet (or)',
    'ring': 'Reavers',
    'cape':'Igneous kal-mor',
    'pocket slot': 'Grimoire',
    'reaper crew': true,

    'perks': {
        'precise': 0,
        'equilibrium': 0,
        'genocidal': 0,
        'spendthrift': 0,
        'ruthless rank': 0,
        'ruthless stacks': 0,
        'slayer perk': false,
        'biting': 4
    },

    
    
    
    'aura': 'Mahjarrat',
    'split soul': true,
    'bonus': 0,

    'cap': 10000,
    'critCap': 15000,

    //on-cast effects
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,

    //on-hit effects
    //pre-shared effects
    'stone of jas': 0,

    //shared
    'Revenge': 0,
    'prayer': "sorrow",

    //pvn only
    'slayer helmet': 'none',
    'fort forinthry guardhouse': false,
    'Salve amulet': false,
    'ripper demon passive': 0,
    
    //unknown order
    'berserkers fury': 0,    

    //on-crit effects
    'smoke cloud': false,
    'kalgerion demon familiar': false,
    'crit-i-kal': false,

    //on-npc effects
    'vulnerability': false,
    'corrupted wounds': false, //gop bleed buff
    'slayer sigil': false,

    //apply somewhere idk
    'nopenopenope': 0, //poh spider buff
    'Ruby aurora': 0,
    'death spores': false,
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

const test = necro_auto('dual-wield', settings,1);
console.log(test);


/* function test(settings) {
    if (settings['ability damage'] != 0) {
        let AD = settings['ability damage'];
        return AD;
    }
}
let AD = test(settings);
console.log(AD) */

/* var startTime = performance.now()
for (var i = 0; i < 100000; i++) {
    const test1 = skeleton_auto('Two-hand', settings,10);
}
var endTime = performance.now()

console.log('calcing necro auto 100,000 times took')
console.log(endTime - startTime)
console.log('miliseconds') */