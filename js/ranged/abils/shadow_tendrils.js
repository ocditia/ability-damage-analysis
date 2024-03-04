
import shadow_tendrils_hit from './shadow_tendrils_hit.js';

function shadow_tendrils(type, settings, numberOfHits) {
    const fiveHit = shadow_tendrils_hit(type,settings,1);
    return  [fiveHit[fiveHit.length-1]];
}

export default shadow_tendrils;