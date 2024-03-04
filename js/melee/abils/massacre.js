
import massacre_initial from './massacre_initial.js';
import massacre_bleed from './massacre_bleed.js';

function massacre(type, settings, numberOfHits) {
    let bleedHits = 5;
    if (type === '2h' && settings['two-handed weapon'] === 'masterwork spear of annihilation') {
        bleedHits += 2;
    }
    const hitOne = massacre_initial(type,settings,1);
    const hitTwo = massacre_bleed(type,settings,bleedHits);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default massacre;