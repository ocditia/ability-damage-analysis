import { channel } from 'diagnostics_channel';
import ezk_initial from './ezk_initial';
import ezk_bleed from './ezk_bleed';

function ezk(type, settings, numberOfHits) {
    let bleedCount = Math.floor(settings['ezk bleed'])

    const hitOne = ezk_initial(type,settings,1);
    const hitTwo = ezk_bleed(type,settings, bleedCount);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

export default ezk;