import auto from './skeleton_auto.js';
import NecroHelper from '../necromancy_helper.js';

function command_skeleton(type, settings, numberOfHits) {
	return auto(type, settings, 10);
}

export default command_skeleton;
