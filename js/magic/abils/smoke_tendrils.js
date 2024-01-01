
import smoke_tendrils_1 from './smoke_tendrils_1.js';
import smoke_tendrils_2 from './smoke_tendrils_2.js';
import smoke_tendrils_3 from './smoke_tendrils_3.js';
import smoke_tendrils_4 from './smoke_tendrils_4.js';

function shadow_tendrils(type, settings, numberOfHits) {
    const hitOne = smoke_tendrils_1(type,settings,1);
    const hitTwo = smoke_tendrils_2(type,settings,1);
    const hitThree = smoke_tendrils_3(type,settings,1);
    const hitFour = smoke_tendrils_4(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1] + hitThree[hitThree.length-1] + hitFour[hitFour.length-1]];
}

export default shadow_tendrils;