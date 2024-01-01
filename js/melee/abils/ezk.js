import { channel } from 'diagnostics_channel.js';
import ezk_initial from './ezk_initial.js';
import ezk_bleed from './ezk_bleed.js';

function ezk(type, settings, numberOfHits) {
    let bleedCount = Math.floor(settings['ezk bleed'])

    const hitOne = ezk_initial(type,settings,1);
    const hitTwo = ezk_bleed(type,settings, bleedCount);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default ezk;