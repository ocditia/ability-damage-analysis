const { channel } = require('diagnostics_channel')
const dclaw_1 = require('./dclaw_1')
const dclaw_2 = require('./dclaw_2')
const dclaw_3 = require('./dclaw_3')
const dclaw_4 = require('./dclaw_4')

function dragon_claw(type, settings, numberOfHits) {
    const hitOne = dclaw_1(type,settings,1);
    const hitTwo = dclaw_2(type,settings,1);
    const hitThree = dclaw_3(type,settings,1);
    const hitFour = dclaw_4(type,settings,1);
    return  [hitOne[hitOne.length-1] + hitTwo[hitTwo.length-1] + hitThree[hitThree.length-1] + hitFour[hitFour.length-1]];
}

module.exports = dragon_claw;