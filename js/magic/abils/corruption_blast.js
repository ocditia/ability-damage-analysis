import AbilityDmg from '../magic_ad';
import OnNPC from '../magic_on_npc';
import OnHit from '../magic_on_hit';
import Crit from '../magic_crit';
import MagicHelper from '../magic_helper';
import Avg from '../average_damage';
import construction from '../magic_const';
import { channel } from 'diagnostics_channel';

function corruption_blast(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new MagicHelper(); 
    let abil_val = 'corruption blast'
    const fixedPercent = construction['abilities'][abil_val]['fixed percent'];
    const variablePercent = construction['abilities'][abil_val]['variable percent'];
    settings['category'] = construction['abilities'][abil_val]['category'];

    let concStacks = 0;
    let channellerStacks = 0;

    if (type === 'Dw') {
        concStacks = settings['conc stacks'];
    }
    
    const hits = []

    numberOfHits = 5;
   
    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
        let hitCount=1;
        const damageObject = Helper.damageObjectCreator(settings);

        //calculates ability damage
        let AD = AD_INS.calcAd(type,settings);
        
        //sets fixed and variable damage
        let fixed = Math.floor(AD * fixedPercent * hitCount);
        let variable = Math.floor(AD * variablePercent * hitCount);
        
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
        
        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings,abil_val, concStacks, channellerStacks));
        hitCount+=1;
    }
    
    //calc total damage
    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

export default corruption_blast;

