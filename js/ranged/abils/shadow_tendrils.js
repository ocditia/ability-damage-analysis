const { channel } = require('diagnostics_channel')
const shadow_tendrils_hit = require('./shadow_tendrils_hit')

function shadow_tendrils(type, settings, numberOfHits) {
    const twoHit = shadow_tendrils_hit(type,settings,2);
    console.log(twoHit)
    const threeHit = shadow_tendrils_hit(type,settings,3);
    const fourHit = shadow_tendrils_hit(type,settings,4);
    const fiveHit = shadow_tendrils_hit(type,settings,5);
    return  [Math.floor(0.1 * twoHit[twoHit.length-1] + 0.18 * threeHit[threeHit.length-1] + 0.216 * fourHit[fourHit.length-1] + 0.504 * fiveHit[twoHit.length-1])];
}

module.exports = shadow_tendrils;