
import hurricane_1 from './hurricane_1.js';
import hurricane_2 from './hurricane_2.js';

function hurricane(type, settings, numberOfHits) {
    const hitOne = hurricane_1(type,settings,1);
    const hitTwo = hurricane_2(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default hurricane;