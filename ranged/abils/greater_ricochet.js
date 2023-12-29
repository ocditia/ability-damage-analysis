const { channel } = require('diagnostics_channel')
const greater_ricochet_1 = require('./greater_ricochet_1')
const greater_ricochet_2 = require('./greater_ricochet_2')
const greater_ricochet_3 = require('./greater_ricochet_3')

function greater_ricochet(type, settings, numberOfHits) {
    const primary = greater_ricochet_1(type,settings,numberOfHits);
    const secondary = greater_ricochet_2(type,settings,2);
    const tertiary = greater_ricochet_3(type,settings,settings['caroming rank']);
    return  [primary[primary.length-1] + secondary[secondary.length-1] + tertiary[tertiary.length-1]];
}

module.exports = greater_ricochet;