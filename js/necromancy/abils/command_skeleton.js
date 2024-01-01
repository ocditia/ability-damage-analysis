import auto from './skeleton_auto';
import NecroHelper from '../necromancy_helper';

function command_skeleton(type, settings, numberOfHits) {
    /* const Helper = new NecroHelper(); 
    hits = []
    for (var i=0; i <10; i++) {
        hits.push(auto(type,settings,numberOfHits)[0]);
    }
    hits.push(Helper.totalDamageCalc(hits));
    return hits */

    return auto(type,settings,10);
}

export default command_skeleton;