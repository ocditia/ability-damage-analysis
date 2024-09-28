function create_object(crit) {
	let damage_object = 1;
	if (crit === true) {
		damage_object = {
			'non crit': {
				crit: false,
				probability: 0.9,

				'min hit': 0,
				'var hit': 0,
				'base AD': 0,
				'boosted AD': 0
			},
			crit: {
				crit: true,
				probability: 0.1,

				'min hit': 0,
				'var hit': 0,
				'base AD': 0,
				'boosted AD': 0
			}
		};
	} else {
		damage_object = {
			'non crit': {
				crit: false,
				probability: 1,

				'min hit': 0,
				'var hit': 0,
				'base AD': 0,
				'boosted AD': 0
			}
		};
	}

	return damage_object;
}

function calc_crit_chance(settings) {
	// base crit chance
	let crit_chance = 0.1;
	// (g)conc
	crit_chance = crit_chance + 0.05 * settings['conc hits'];
}

export default create_object;
