import { channel } from 'diagnostics_channel.js';
import dclaw_1 from './dclaw_1.js';
import dclaw_2 from './dclaw_2.js';
import dclaw_3 from './dclaw_3.js';
import dclaw_4 from './dclaw_4.js';

function dragon_claw(type, settings, numberOfHits) {
    const hitOne = dclaw_1(type,settings,1);
    const hitTwo = dclaw_2(type,settings,1);
    const hitThree = dclaw_3(type,settings,1);
    const hitFour = dclaw_4(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1] + hitThree[hitThree.length-1] + hitFour[hitFour.length-1]];
}

export default dragon_claw;