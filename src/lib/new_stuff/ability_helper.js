function next_tick(settings, ability_used) {
	// needle strike logic
	if (settings['needle strike'] === true) {
		single_tick_gear = ['essence of finality', 'amulet of souls'];
		if (single_tick_gear.includes(settings['necklace'])) {
			settings['needle strike'] = false;
		} else {
			settings['needle strike'] = 'fleeting';
		}
	}

	if (settings['needle strike'] === 'fleeting') {
		settings['needle strike'] = false;
	}

	// enduring ruin / gloves of passage logic
	if (settings['enduring ruin - hit'] === true) {
		single_tick_gear = ['essence of finality', 'amulet of souls'];
		if (single_tick_gear.includes(settings['necklace'])) {
			settings['enduring ruin - hit'] = false;
		} else {
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
	if (settings['chaos roar'] === true) {
		settings['chaos raor'] === false;
	}
	return settings;
}

function next_hit(settings) {
	// turn off (g)fury
	if (settings['fury'] === 'regular' || settings['fury'] === 'greater') {
		settings['fury'] = 'off';
	}

	// turn off (g)conc
	settings['conc stacks'] = 0; // this does not properly handle conc buffing itself

	// bolg stack tracker
	if (
		settings['two-hand weapon'] === 'bow of the last guardian' &&
		settings['weapon type'] === 'two-hand'
	) {
		if (settings['bolg spec'] === true) {
			settings['bolg stacks'] += 1;
			if (settings['bolg stacks'] === 4) {
				settings['bolg stacks'] = 0;
			}
		} else if (settings['bolg spec'] === false) {
			settings['bolg stacks'] += 1;
			if (settings['bolg stacks'] === 8) {
				settings['bolg stacks'] = 0;
			}
		}
	}
	return settings;
}

export { next_tick, next_hit, next_cast };
