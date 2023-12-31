const { channel } = require('diagnostics_channel')
const massacre_initial = require('./massacre_initial')
const massacre_bleed = require('./massacre_bleed')

function massacre(type, settings, numberOfHits) {
    const hitOne = massacre_initial(type,settings,1);
    const hitTwo = massacre_bleed(type,settings,5);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

module.exports = massacre;