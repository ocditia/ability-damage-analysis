import AbilityDmg from '../melee_ad.js';
import OnNPC from '../melee_on_npc.js';
import OnHit from '../melee_on_hit.js';
import Crit from '../melee_crit.js';
import MeleeHelper from '../melee_helper.js';
import Avg from '../average_damage.js';
import construction from '../melee_const.js';
import vine_whip_initial from './vine_whip_initial.js';
import vine_whip_dot from './vine_whip_dot.js';

function vine_whip_spec(type, settings, numberOfHits) {
	let initial = vine_whip_initial(type, settings, 1);
	let dot = vine_whip_dot(type, settings, 10);

	return [initial[initial.length - 1] + dot[dot.length - 1]];
}

export default vine_whip_spec;
