import AbilityDmg from '../ranged_ad.js';
import OnNPC from '../ranged_on_npc.js';
import OnHit from '../ranged_on_hit.js';
import Crit from '../ranged_crit.js';
import RangedHelper from '../ranged_helper.js';
import Avg from '../average_damage.js';
import split_soul from './split_soul.js';
import bolg_proc from './bolg_proc.js';
import snapshot_1 from './snapshot_1.js';
import snapshot_2 from './snapshot_2.js';
import construction from '../ranged_const.js';

function snapshot(type, settings, numberOfHits) {
	let first = snapshot_1(type, settings, numberOfHits);
	let second = snapshot_2(type, settings, numberOfHits);

	return [first[first.length - 1] + second[second.length - 1]];
}

export default snapshot;
