const AbilityDmg = require('../ranged_ad')
const OnNPC = require('../ranged_on_npc')
const OnHit = require('../ranged_on_hit')
const Crit = require('../ranged_crit')
const NecroHelper = require('../ranged_helper')
const Avg = require('../average_damage')
const split_soul = require('./split_soul')
const construction = require('../ranged_const')
const { channel } = require('diagnostics_channel')

function piercing_shot(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new NecroHelper(); 
    let abil_val = 'piercing_shot'
    const fixedPercent = construction['abilities'][abil_val]['fixed percent'];
    const variablePercent = construction['abilities'][abil_val]['variable percent'];

    const hits = []
   
    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
        const damageObject = Helper.damageObjectCreator(settings);

        //calculates ability damage
        let AD = AD_INS.calcAd(type,settings);
        
        //sets fixed and variable damage
        let fixed = Math.floor(AD * fixedPercent);
        let variable = Math.floor(AD * variablePercent);
        
        //applies on-hit effects
        let onHit = HIT_INS.calcOnHit(fixed, variable, type, construction['abilities'][abil_val]['on hit effects'],settings);

        //sets up for further calculations
        damageObject['non-crit']['list'] = Helper.baseDamageListCreator(onHit[0],onHit[1]);

        //apply crit dmg
        damageObject['nat crit']['list'] = Helper.naturalCritDamageListCreator(onHit[0],onHit[1]);

        damageObject['forced crit']['list'] = Helper.forcedCritDamageListCreator(onHit[0],onHit[1]);

        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings);
        damageObject['nat crit']['list'] = NPC_INS.onNpcDamageList(damageObject['nat crit']['list'],settings);
        damageObject['forced crit']['list'] = NPC_INS.onNpcDamageList(damageObject['forced crit']['list'],settings);        

        //split soul
        splitSoul = split_soul(damageObject['non-crit']['list'],settings);
        splitSoulNatCrit =  split_soul(damageObject['nat crit']['list'],settings);
        splitSoulForcedCrit =  split_soul(damageObject['forced crit']['list'],settings);

        //apply hit caps
        damageObject['non-crit']['list'] = Helper.baseHitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['nat crit']['list'] = Helper.critHitCapDmgList(damageObject['nat crit']['list'],settings);
        damageObject['forced crit']['list'] = Helper.critHitCapDmgList(damageObject['forced crit']['list'],settings);

        //add up damages
        damageObject['non-crit']['list'] = Helper.listAdder(damageObject['non-crit']['list'],splitSoul);
        damageObject['nat crit']['list'] = Helper.listAdder(damageObject['nat crit']['list'],splitSoulNatCrit);
        damageObject['forced crit']['list'] = Helper.listAdder(damageObject['forced crit']['list'],splitSoulForcedCrit);

        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings));
    }
    
    //calc total damage
    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

module.exports = piercing_shot;
