import bolg_base_dirty from './bolg_base_dirty.js';

function bolg_proc_dirty(type, settings, numberOfHits) {
	let proccing_damage = settings['bolg damage dirty'];
	if (settings['swift'] === true) {
		proccing_damage = Math.floor(1.5 * proccing_damage);
	}
	const base = bolg_base_dirty(proccing_damage, type, settings, numberOfHits);
	return [base[base.length - 1]];
}

export default bolg_proc_dirty;
