import soulfire_initial from './soulfire_initial.js';
import soulfire_dot from './soulfire_dot.js';

function soulfire(type, settings, numberOfHits) {
    const hitOne = soulfire_initial(type,settings,1);
    const hitTwo = soulfire_dot(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default soulfire;
