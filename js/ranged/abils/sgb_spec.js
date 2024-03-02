import AbilityDmg from '../ranged_ad.js';
import OnNPC from '../ranged_on_npc.js';
import OnHit from '../ranged_on_hit.js';
import Crit from '../ranged_crit.js';
import RangedHelper from '../ranged_helper.js';
import Avg from '../average_damage.js';
import split_soul from './split_soul.js';
import bolg_proc from './bolg_proc.js';
import sgb_spec_1 from './sgb_spec_arrow.js';
import construction from '../ranged_const.js';


function sgb_spec(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new RangedHelper(); 

    sgbArrowDamage = sgb_spec_1(type,settings,numberOfHits);
    sgbArrowDamage = sgbArrowDamage[sgbArrowDamage.length-1];
    console.log(sgbArrowDamage)

    const numberOfArrows = [
        [0.84, 0.16, 0, 0, 0],
        [0.473, 0.42, 0.10, 0.07, 0],
        [0.144, 0.398, 0.342, 0.106, 0.01],
        [0.01, 0.106, 0.342, 0.398, 0.144],
        [0,0,0,0,1]
    ];

    let npcSize = Math.min(settings['npc size'],5);
    let landProbs = numberOfArrows[npcSize - 1];

    let summedHits = [sgbArrowDamage, 2*sgbArrowDamage,3*sgbArrowDamage,4*sgbArrowDamage,5*sgbArrowDamage];

    let hits = [];
    for (var i = 0; i < summedHits.length; i++) {
        hits.push(summedHits[i] * landProbs[i]);
    }

    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

export default sgb_spec;

