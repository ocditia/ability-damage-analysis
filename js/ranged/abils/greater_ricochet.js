import { channel } from 'diagnostics_channel';
import greater_ricochet_1 from './greater_ricochet_1';
import greater_ricochet_2 from './greater_ricochet_2';
import greater_ricochet_3 from './greater_ricochet_3';

function greater_ricochet(type, settings, numberOfHits) {
    const primary = greater_ricochet_1(type,settings,numberOfHits);
    const secondary = greater_ricochet_2(type,settings,2);
    const tertiary = greater_ricochet_3(type,settings,settings['caroming rank']);
    return  [primary[primary.length-1] + secondary[secondary.length-1] + tertiary[tertiary.length-1]];
}

export default greater_ricochet;