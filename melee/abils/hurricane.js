const { channel } = require('diagnostics_channel')
const hurricane_1 = require('./hurricane_1')
const hurricane_2 = require('./hurricane_2')

function hurricane(type, settings, numberOfHits) {
    const hitOne = hurricane_1(type,settings,1);
    const hitTwo = hurricane_2(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1]];
}

module.exports = hurricane;