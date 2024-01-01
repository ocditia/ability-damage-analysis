const AbilityDmg = require('../necromancy_ad')
const OnNPC = require('../necromancy_on_npc')
const OnHit = require('../necromancy_on_hit')
const Crit = require('../necromancy_crit')
const NecroHelper = require('../necromancy_helper')
const Avg = require('../average_damage')
const construction = require('../necromancy_const')
const { channel } = require('diagnostics_channel')

function test_auto(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new NecroHelper(); 
    let abil_val = 'basic attack'
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
        damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings);

        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings);        

        //apply hit caps
        damageObject['non-crit']['list'] = Helper.hitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = Helper.hitCapDmgList(damageObject['crit']['list'],settings);

        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings));
    }
    
    //calc total damage
    return Helper.totalDamageCalc(hits);
}

module.exports = test_auto;

