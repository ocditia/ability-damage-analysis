import bolg_base_dirty from './bolg_base_dirty.js';

function bolg_proc_dirty(type, settings, numberOfHits) {
    const base = bolg_base_dirty(settings['bolg damage dirty'], type, settings, numberOfHits);
    return  [base[base.length-1]];
}

export default bolg_proc_dirty;