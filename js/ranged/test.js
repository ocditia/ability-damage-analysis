const AbilityDmg = require('./ranged_ad')
const OnNPC = require('./ranged_on_npc')
const OnHit = require('./ranged_on_hit')
const Crit = require('./ranged_crit')
const RangedHelper = require('./ranged_helper')
const Avg = require('./average_damage')
const construction = require('./ranged_const')
const { channel } = require('diagnostics_channel')

const settings = {
    'minavgmax': 'avg',
    'category': 'none',

    'ability damage': 2000, //for manual override only
    'level': 99,
    'potion': 'elder overload',
    
    'two-handed weapon': 'bow of the last guardian',
    'main-hand weapon': 'blightbound',
    'off-hand weapon': 'off-hand blightbound',
    'shield': 1,
    'defender': 1,
    'helmet': 'elite dracolich helmet',
    'body': 'elite dracolich top',
    'leg': 'elite dracolich bottom',
    'gloves': 'elite dracolich gloves',
    'boots': 'elite dracolich boots',
    'necklace': 'essence of finality amulet (or)',
    'ring': 'reavers',
    'cape':'igneous kal-mor',
    'pocket slot': 'grimoire',
    'reaper crew': true,
    'level 20 armour': true,

    //perks
    'precise': 6,
    'equilibrium': 2,
    'genocidal percent': 0,
    'spendthrift': 0,
    'ruthless rank': 0,
    'ruthless stacks': 0,
    'slayer perk': false,
    'biting': 4,
    'flanking': 0,
    'flanking position': false,
    'caroming rank': 0,
    
    'aura': 'reckless',
    'split soul': true,
    'bonus': 0,
    'cap': 30000,
    'npc size': 1,
    'blocking': false,

    //on-cast effects
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,

    //on-hit effects
    //pre-shared effects
    'stone of jas': 0,

    //shared
    'revenge stacks': 0,
    'prayer': "ruination",
    'swift': false,

    //pvn only
    'slayer helmet': 'none',
    'fort forinthry guardhouse': false,
    'Salve amulet': false,
    'ripper demon passive': 0,
    
    //unknown order
    'berserkers fury': 0,
    'living death':false,    

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

const AD_INS = new AbilityDmg();
const NPC_INS = new OnNPC();
const HIT_INS = new OnHit();
const CRIT_INS = new Crit();
const AVG_INS = new Avg();
const Helper = new RangedHelper(); 
let abil_val = 'sgb spec'
const fixedPercent = construction['abilities'][abil_val]['fixed percent'];
const variablePercent = construction['abilities'][abil_val]['variable percent'];
settings['category'] = construction['abilities'][abil_val]['category'];

AD = 2000

let hits = []
numberOfHits = 5;
let fixed = Math.floor(AD * fixedPercent);
let variable = Math.floor(AD * variablePercent);

hitcount = 1;

for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
    const damageObject = Helper.damageObjectCreator(settings);

    let onHit = HIT_INS.calcOnHit(fixed, variable, 'Dw', construction['abilities'][abil_val]['on hit effects'],settings);

    damageObject['non-crit']['list'] = Helper.baseDamageListCreator(onHit[0],onHit[1]);

    //apply crit dmg
    damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings);

    //apply on-npc effects and hitcaps
    damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings,AD);
    damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings,AD);  

    hits.push(AVG_INS.returnDecider(damageObject,settings));

    if (hitcount == 1) {
        fixed += Math.floor(fixed * 0.15);
        variable += Math.floor(variable * 0.15);
    }

    hitcount += 1;
}

const nonBlockedArrowProbs = [
    [0.84, 0.16, 0, 0, 0],
    [0.473, 0.42, 0.10, 0.7, 0],
    [0.144, 0.398, 0.342, 0.106, 0.01],
    [0.141, 0.327, 0.324, 0.17, 0.038],
    [0.045, 0.193, 0.324, 0.282, 0.155],
    [0.083, 0.222, 0.281, 0.231, 0.182],
    [0.026, 0.124, 0.25, 0.277, 0.323],
    [0.057, 0.168, 0.24, 0.227, 0.308],
    [0.017, 0.091, 0.203, 0.247, 0.441],
    [0.043, 0.135, 0.208, 0.210, 0.404],
    [0.013, 0.071, 0.171, 0.219, 0.526]
];
const BlockedArrowProbs = [
    [0.84, 0.16, 0, 0, 0],
    [0.473, 0.42, 0.10, 0.7, 0],
    [0.144, 0.398, 0.342, 0.106, 0.01],
    [0.01, 0.106, 0.342, 0.398, 0.144],
    [0,0,0,0,1]
];

let landProbs = null;
let npcSize = settings['npc size'];

if (settings['blocking'] === false) {
    landProbs = nonBlockedArrowProbs[npcSize - 1];
}
else if (settings['blocking'] === true) {
    landProbs = BlockedArrowProbs[npcSize - 1];
}

summedHits = [hits[0], hits[1] + hits[0], hits[1] + hits[0] + hits[2], hits[1] + hits[0] + hits[2] + hits[3], hits[1] + hits[0] + hits[2] + hits[3] + hits[4]];

if (settings['minavgmax'] === 'avg') {
    for (var i = 0; i < summedHits.length; i++) {
        hits[i] = summedHits[i] * landProbs[i];
    }
}
/*
else if (settings['minavgmax'] === 'min') {
    hits = [hits[0]]
}
else if (settings['minavgmax'] === 'max') {
    hits = [summedHits[npcSize - 1]]
}
*/
hits.push(Helper.totalDamageCalc(hits));
test = Helper.flooredList(hits);

console.log(hits);