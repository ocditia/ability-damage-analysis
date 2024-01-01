import { channel } from 'diagnostics_channel.js';
import omnipower_normal from './omnipower_normal.js';
import omnipower_igneous from './omnipower_igneous.js';

function omnipower(type, settings, numberOfHits) {
    const normal = omnipower_normal(type,settings,1);
    const igneous = omnipower_igneous(type,settings,4);
    if (settings['cape'] === 'igneous kal-mej') {
        return igneous;
    }
    else {
        return normal;
    }
}

export default omnipower;