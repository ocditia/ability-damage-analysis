import AbilityDmg from '../ranged_ad.js';
import OnNPC from '../ranged_on_npc.js';
import OnHit from '../ranged_on_hit.js';
import Crit from '../ranged_crit.js';
import RangedHelper from '../ranged_helper.js';
import Avg from '../average_damage.js';
import split_soul from './split_soul.js';
import construction from '../ranged_const.js';


function bolg_proc(type, settings, fixed, variable) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new RangedHelper(); 
    let abil_val = 'bolg proc'

    const hits = []
    
    for(var proccingHit = fixed; proccingHit <= fixed + variable; proccingHit++) {
        const damageObject = Helper.damageObjectCreator(settings);

        //calculates ability damage
        let AD = AD_INS.calcAd(type,settings); //AD_INS.calcAd(type,settings);

        let minHit = Math.floor(construction['abilities'][abil_val]['fixed percent'] * proccingHit);
        let varHit = Math.floor(construction['abilities'][abil_val]['variable percent'] * proccingHit);

        //sets up for further calculations
        damageObject['non-crit']['list'] = Helper.baseDamageListCreator(minHit,varHit);

        //apply crit dmg
        damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings);

        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings,AD);
        damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings,AD);        

        //split soul
        const splitSoul = split_soul(damageObject['non-crit']['list'],settings);
        const splitSoulCrit =  split_soul(damageObject['crit']['list'],settings);

        //apply hit caps
        damageObject['non-crit']['list'] = Helper.hitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = Helper.hitCapDmgList(damageObject['crit']['list'],settings);

        //add up damages
        damageObject['non-crit']['list'] = Helper.listAdder(damageObject['non-crit']['list'],splitSoul);
        damageObject['crit']['list'] = Helper.listAdder(damageObject['crit']['list'],splitSoulCrit);

        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings,abil_val));
    }
    
    //calc total damage
    hits.push(AVG_INS.averageDamageList(hits));
    return Helper.flooredList(hits);
}

export default bolg_proc;

