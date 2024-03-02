import AbilityDmg from '../melee_ad.js';
import OnNPC from '../melee_on_npc.js';
import OnHit from '../melee_on_hit.js';
import Crit from '../melee_crit.js';
import MeleeHelper from '../melee_helper.js';
import Avg from '../average_damage.js';
import construction from '../melee_const.js';
import icy_tempest_main from './icy_tempest_main.js';
import icy_tempest_aoe from './icy_tempest_aoe.js';

function icy_tempest(type, settings, numberOfHits) {
    let main = icy_tempest_main(type, settings, numberOfHits);
    let aoe = icy_tempest_aoe(type, settings, numberOfHits);
    return [icy_tempest_main(type, settings, numberOfHits)[main.length-1] + icy_tempest_aoe(type, settings, numberOfHits)[aoe.length-1]];
}

export default icy_tempest;