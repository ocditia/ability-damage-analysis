import AbilityDmg from '../necromancy_ad';
import OnNPC from '../necromancy_on_npc';
import OnHit from '../necromancy_on_hit';
import Crit from '../necromancy_crit';
import NecroHelper from '../necromancy_helper';
import Avg from '../average_damage';
import split_soul from './split_soul';
import construction from '../necromancy_const';
import { channel } from 'diagnostics_channel';

function bloat_bleed(dmgList, settings,AD) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new NecroHelper(); 
    let abil_val = 'bloat - bleed hit'
    settings['category'] = construction['abilities'][abil_val]['category'];

    const hits = []
   
        let bleedList = [];
        for (var i=0; i<dmgList.length;i++) {
            bleedList.push(Math.floor(dmgList[i]/4));
        }

        //apply on-npc effects and hitcaps
        let dmg = NPC_INS.onNpcDamageList(bleedList,settings,AD); 

        //split soul
        splitSoul = split_soul(dmg,settings);

        //apply hit caps
        dmg = Helper.hitCapDmgList(dmg,settings);

        //add up damages
        dmg = Helper.listAdder(dmg,splitSoul);

        for (var i=0; i<dmgList.length;i++) {
            dmg[i] = 10*dmg[i];
        }

        dmg = Helper.listAdder(dmg,dmgList);

        //calc total damage
        return dmg;
    }



export default bloat_bleed;
