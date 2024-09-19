function next_tick(settings, ability_used) {

    // needle strike logic
    if (settings['needle strike'] === true) {
        single_tick_gear = ['essence of finality', 'amulet of souls']
        if (single_tick_gear.includes(settings['necklace'])) {
            settings['needle strike'] = false;
        }
        else {
            settings['needle strike'] = 'fleeting';
        }
    }

    if (settings['needle strike'] === 'fleeting') {
        settings['needle strike'] = false;
    }

    // enduring ruin / gloves of passage logic
    if (settings['enduring ruin - hit'] === true) {
        single_tick_gear = ['essence of finality', 'amulet of souls']
        if (single_tick_gear.includes(settings['necklace'])) {
            settings['enduring ruin - hit'] = false;
        }
        else {
            settings['enduring ruin - hit'] = 'fleeting';
        }
    }

    if (settings['enduring ruin - hit'] === 'fleeting') {
        settings['enduring ruin - hit'] = false;
    }

    return settings;
}

function next_cast(settings) {
    // turn off chaos roar
    return settings;
}

function next_hit(settings) {
    // turn off (g)fury
    // turn off (g)conc
    return settings;
}

export {next_tick, next_hit, next_cast};