import AbilityDmg from '../ranged_ad.js';
import OnNPC from '../ranged_on_npc.js';
import OnHit from '../ranged_on_hit.js';
import Crit from '../ranged_crit.js';
import RangedHelper from '../ranged_helper.js';
import Avg from '../average_damage.js';
import split_soul from './split_soul.js';
import construction from '../ranged_const.js';
import morrigans_javelin_initial from './morrigans_javelin_initial.js';
import morrigans_javelin_bleed from './morrigans_javelin_bleed.js';

function morrigans_javelin(type, settings, numberOfHits) {
    let initial = morrigans_javelin_initial(type,settings,1);
    let bleed = morrigans_javelin_bleed(type,settings,5);

    return [initial[initial.length-1] + bleed[bleed.length-1]];
}

export default morrigans_javelin;