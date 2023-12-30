const AbilityDmg = require('../ranged_ad')
const OnNPC = require('../ranged_on_npc')
const OnHit = require('../ranged_on_hit')
const Crit = require('../ranged_crit')
const RangedHelper = require('../ranged_helper')
const Avg = require('../average_damage')
const split_soul = require('./split_soul')
const construction = require('../ranged_const')
const { channel } = require('diagnostics_channel')

function sgb_spec(type, settings, numberOfHits) {
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

    let AD = AD_INS.calcAd(type,settings);
    let hits = []
    let fixed = Math.floor(AD * fixedPercent);
    let variable = Math.floor(AD * variablePercent);
    hitcount = 1;
    numberOfHits = 5;

    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
        hitcount = 1;
        const damageObject = Helper.damageObjectCreator(settings);
        
        //applies on-hit effects
        let onHit = HIT_INS.calcOnHit(fixed, variable, type, construction['abilities'][abil_val]['on hit effects'],settings);

        //sets up for further calculations
        damageObject['non-crit']['list'] = Helper.baseDamageListCreator(onHit[0],onHit[1]);

        //apply crit dmg
        damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings);

        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings,AD);
        damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings,AD);        

        //split soul
        splitSoul = split_soul(damageObject['non-crit']['list'],settings);
        splitSoulCrit =  split_soul(damageObject['crit']['list'],settings);

        //apply hit caps
        damageObject['non-crit']['list'] = Helper.hitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = Helper.hitCapDmgList(damageObject['crit']['list'],settings);

        //add up damages
        damageObject['non-crit']['list'] = Helper.listAdder(damageObject['non-crit']['list'],splitSoul);
        damageObject['crit']['list'] = Helper.listAdder(damageObject['crit']['list'],splitSoulCrit);

        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings,abil_val));

        if (hitcount == 1) {
            fixed += Math.floor(fixed * 0.15);
            variable += Math.floor(variable * 0.15);
        }

        hitcount += 1;
    }
    
    const nonBlockedArrowProbs = [
        [0.84, 0.16, 0, 0, 0],
        [0.473, 0.42, 0.10, 0.07, 0],
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
        [0.473, 0.42, 0.10, 0.07, 0],
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

    let summedHits = [hits[0], hits[1] + hits[0], hits[1] + hits[0] + hits[2], hits[1] + hits[0] + hits[2] + hits[3], hits[1] + hits[0] + hits[2] + hits[3] + hits[4]];

    if (settings['minavgmax'] === 'avg') {
        for (var i = 0; i < summedHits.length; i++) {
            hits[i] = summedHits[i] * landProbs[i];
        }
    }

    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

module.exports = sgb_spec;

