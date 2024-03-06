import AbilityDmg from '../magic_ad.js';
import OnNPC from '../magic_on_npc.js';
import OnHit from '../magic_on_hit.js';
import Crit from '../magic_crit.js';
import NecroHelper from '../magic_helper.js';
import Avg from '../average_damage.js';
import time_strike from './time_strike.js';
import construction from '../magic_const.js';


function smoke_tendrils_3(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new NecroHelper(); 
    let abil_val = 'smoke tendrils 3'
    const fixedPercent = construction['abilities'][abil_val]['fixed percent'];
    const variablePercent = construction['abilities'][abil_val]['variable percent'];
    settings['category'] = construction['abilities'][abil_val]['category'];

    let concStacks = 0;
    let channellerStacks = 0;

    if (settings['ring'] === 'channelers') {
        channellerStacks += 3;
    }

    const hits = []
   
    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
        const damageObject = Helper.damageObjectCreator(settings);

        //calculates ability damage
        let AD = AD_INS.calcAd(type,settings); //AD_INS.calcAd(type,settings);
        
        //sets fixed and variable damage
        let fixed = Math.floor(AD * fixedPercent);
        let variable = Math.floor(AD * variablePercent);
        
        //applies on-hit effects
        let onHit = HIT_INS.calcOnHit(fixed, variable, type, construction['abilities'][abil_val]['on hit effects'],settings);
        
        //sets up for further calculations
        damageObject['non-crit']['list'] = Helper.baseDamageListCreator(onHit[0],onHit[1]);

        //apply crit dmg
        damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings, channellerStacks);
        
        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings,AD);
        damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings,AD);     
        
        //apply hit caps
        damageObject['non-crit']['list'] = Helper.hitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = Helper.hitCapDmgList(damageObject['crit']['list'],settings);

        //fsoa
        let proc = 0;
        if (settings['fsoa'] === true){
            proc = time_strike(type, settings, 1);
            for (var i=0;i<damageObject['crit']['list'].length-1;i++) {
                damageObject['crit']['list'][i] += proc[proc.length-1]
            }
        }
        
        //calc min, avg, or max depending on request
        hits.push(AVG_INS.averageDamageList(damageObject['crit']['list']));
    }
    
    //calc total damage
    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

export default smoke_tendrils_3;
