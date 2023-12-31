const { channel } = require('diagnostics_channel')
const ezk_initial = require('./ezk_initial')
const ezk_bleed = require('./ezk_bleed')

function ezk(type, settings, numberOfHits) {
    let bleedCount = Math.floor(settings['ezk bleed'])

    const hitOne = ezk_initial(type,settings,1);
    const hitTwo = ezk_bleed(type,settings, bleedCount);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

module.exports = ezk;