import { channel } from 'diagnostics_channel';
import massacre_initial from './massacre_initial';
import massacre_bleed from './massacre_bleed';

function massacre(type, settings, numberOfHits) {
    const hitOne = massacre_initial(type,settings,1);
    const hitTwo = massacre_bleed(type,settings,5);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default massacre;