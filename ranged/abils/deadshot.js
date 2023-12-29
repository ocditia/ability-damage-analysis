const { channel } = require('diagnostics_channel')
const deadshot_initial_hit = require('./deadshot_initial_hit')
const deadshot_bleed_hit = require('./deadshot_bleed_hit')

function deadshot(type, settings, numberOfHits) {
    const initial = deadshot_initial_hit(type,settings,1);
    let bleedHits = 6;
    if (settings['cape'] === 'igneous kal-xil') {
        bleedHits = 8;
    }
    const bleed = deadshot_bleed_hit(type,settings,2);
    return  [initial[initial.length-1] + bleed[bleed.length-1]];
}

module.exports = deadshot;