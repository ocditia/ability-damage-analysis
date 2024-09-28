import deadshot_initial_hit from './deadshot_initial_hit.js';
import deadshot_bleed_hit from './deadshot_bleed_hit.js';

function deadshot(type, settings, numberOfHits) {
	const initial = deadshot_initial_hit(type, settings, 1);
	let bleedHits = 5;
	if (settings['cape'] === 'igneous kal-xil') {
		bleedHits = 7;
	}
	const bleed = deadshot_bleed_hit(type, settings, bleedHits);
	return [initial[initial.length - 1] + bleed[bleed.length - 1]];
}

export default deadshot;
