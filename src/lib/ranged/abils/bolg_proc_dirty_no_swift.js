import bolg_base_dirty from './bolg_base_dirty.js';

function bolg_proc_dirty_no_swift(type, settings, numberOfHits) {
	let proccing_damage = settings['bolg damage dirty'];
	const base = bolg_base_dirty(proccing_damage, type, settings, numberOfHits);
	return [base[base.length - 1]];
}

export default bolg_proc_dirty_no_swift;
