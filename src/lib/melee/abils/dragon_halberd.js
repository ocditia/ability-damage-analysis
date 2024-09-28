import dragon_halberd_hit from './dragon_halberd_hit.js';

function dragon_halberd(type, settings, numberOfHits) {
	const hit = dragon_halberd_hit(type, settings, 2);
	return [hit[hit.length - 1]];
}

export default dragon_halberd;
