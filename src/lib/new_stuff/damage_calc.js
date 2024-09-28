import { weapons, gear, armour, abils, prayers } from './const';
import { create_object, calc_crit_chance } from './object_helper';
import { settingsConfig, SETTINGS } from '$lib/necromancy/settings';

function calc_base_ad(settings) {
	// see wiki page /ability_damage for more info
	let base_AD = 0;

	if (abils[settings['ability']]['main style'] === 'magic') {
		if (settings[SETTINGS.WEAPON] === 'main-hand') {
			let AD_mh =
				Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
				Math.floor(9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings));

			let AD_oh = 0;
			if (weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] === 'off-hand') {
				AD_oh = Math.floor(
					0.5 * Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
						Math.floor(9.6 * calc_weapon_tier(settings, 'off-hand weapon') + calc_bonus(settings))
				);
			}

			base_AD = AD_mh + AD_oh;
		} else if (settings[SETTINGS.WEAPON] === 'two-hand') {
			base_AD =
				Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
				Math.floor(1.25 * settings[SETTINGS.MAGIC_LEVEL]) +
				Math.floor(
					14.4 * calc_weapon_tier(settings, 'two-hand weapon') + 1.5 * calc_bonus(settings)
				);
		}
	} else if (abils[settings['ability']]['main style'] === 'melee') {
		if (settings[SETTINGS.WEAPON] === 'main-hand') {
			let AD_mh =
				Math.floor(2.5 * settings[SETTINGS.MELEE_LEVEL]) +
				Math.floor(9.6 * weapons[settings[SETTINGS.MH]]['tier'] + calc_bonus(settings));

			let AD_oh = 0;
			if (weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] === 'off-hand') {
				AD_oh = Math.floor(
					0.5 * Math.floor(2.5 * settings[SETTINGS.MELEE_LEVEL]) +
						Math.floor(9.6 * weapons[settings[SETTINGS.OH]]['tier'] + calc_bonus(settings))
				);
			}

			base_AD = AD_mh + AD_oh;
		} else if (settings[SETTINGS.WEAPON] === 'two-hand') {
			base_AD =
				Math.floor(2.5 * settings[SETTINGS.MELEE_LEVEL]) +
				Math.floor(1.25 * settings[SETTINGS.MELEE_LEVEL]) +
				Math.floor(9.6 * weapons[settings[SETTINGS.TH]]['tier']) +
				calc_bonus(settings) +
				Math.floor(4.8 * weapons[settings[SETTINGS.TH]]['tier'] + 0.5 * calc_bonus(settings));
		}
	} else if (abils[settings['ability']]['main style'] === 'ranged') {
		if (settings[SETTINGS.WEAPON] === 'main-hand') {
			let AD_mh =
				Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
				Math.floor(9.6 * weapons[settings[SETTINGS.MH]]['tier'] + calc_bonus(settings));

			let AD_oh = 0;
			if (weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] === 'off-hand') {
				AD_oh = Math.floor(
					0.5 * Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
						Math.floor(9.6 * weapons[settings[SETTINGS.OH]]['tier'] + calc_bonus(settings))
				);
			}

			base_AD = AD_mh + AD_oh;
		} else if (settings[SETTINGS.WEAPON] === 'two-hand') {
			base_AD =
				Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
				Math.floor(1.25 * settings[SETTINGS.RANGED_LEVEL]) +
				Math.floor(9.6 * weapons[settings[SETTINGS.TH]]['tier']) +
				calc_bonus(settings) +
				Math.floor(4.8 * weapons[settings[SETTINGS.TH]]['tier'] + 0.5 * calc_bonus(settings));
		}
	} else if (abils[settings['ability']]['main style'] === 'necromancy') {
		if (settings[SETTINGS.WEAPON] === 'main-hand') {
			let AD_mh =
				Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
				Math.floor(9.6 * weapons[settings[SETTINGS.MH]]['tier'] + calc_bonus(settings));

			let AD_oh = 0;
			if (weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] === 'off-hand') {
				AD_oh = Math.floor(
					0.5 * Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
						Math.floor(9.6 * weapons[settings[SETTINGS.OH]]['tier'] + calc_bonus(settings))
				);
			}

			base_AD = AD_mh + AD_oh;
		}
	}

	// eruptive perk
	base_AD = Math.floor(base_AD * (1 + settings[SETTINGS.ERUPTIVE] * 0.05));

	// equilibrium aura
	if (settings[SETTINGS.AURA] === 'equilibrium') {
		base_AD = Math.floor(base_AD * 1.12);
	}

	return base_AD;
}

function calc_weapon_tier(settings, hand) {
	const spell_tier = 999;
	let tier = 0;
	// custom weapon tier
	if (settings[hand] === 'custom ' + hand) {
		tier = settings['custom weapon tier ' + hand];
	}
	// standard weapon
	else {
		let tier = Math.min(weapons[settings[hand]]['tier'], spell_tier);

		// innate mastery (shard of genesis essence)
		if (weapons[settings[hand]]['tier'] && settings[SETTINGS.INNATE_MASTERY] === true) {
			tier += 5;
		}
	}
	return tier;
}

// bonus from gear and reaper crew
function calc_bonus(settings) {
	let bonus = 0;
	const style_str = abils[settings['ability']]['main style'] + ' strength';
	if (settings[SETTINGS.REAPER_CREW] === true) {
		bonus += 12;
	}

	bonus += armour[settings[SETTINGS.HELMET]][style_str];
	bonus += armour[settings[SETTINGS.BODY]][style_str];
	bonus += armour[settings[SETTINGS.LEGS]][style_str];
	bonus += armour[settings[SETTINGS.GLOVES]][style_str];
	bonus += armour[settings[SETTINGS.BOOTS]][style_str];
	bonus += armour[settings[SETTINGS.NECKLACE]][style_str];
	bonus += armour[settings[SETTINGS.RING]][style_str];
	bonus += armour[settings[SETTINGS.CAPE]][style_str];
	bonus += armour[settings[SETTINGS.POCKET]][style_str];
	return bonus;
}

// modify boosted AD by damage potential (hit chance)
function calc_damage_potential(settings, dmgObject) {
	let hit_chance = Math.max(settings[SETTINGS.HIT_CHANCE] / 100, 1);
	return Math.floor(dmgObject['base AD'] * hit_chance);
}

// calculate boosted AD
function calc_boosted_ad(settings, dmgObject) {
	let boosted_AD = calc_damage_potential(settings, dmgObject);

	if (abils[settings['ability']]['main style'] === 'magic') {
		// inq staff
		if (
			settings[SETTINGS.WEAPON] === 'two-hand' &&
			settings[SETTINGS.TH] === 'inquisitor staff'
		) {
			boosted_AD = Math.floor(boosted_AD * 1.125);
		}

		// inq staff upgraded
		else if (
			settings[SETTINGS.WEAPON] === 'two-hand' &&
			settings[SETTINGS.TH] === 'inquisitor staff+'
		) {
			boosted_AD = Math.floor(boosted_AD * 1.175);
		}

		// flow stacks
		boosted_AD = Math.floor(boosted_AD * (1 + 0.01 * settings[SETTINGS.FLOW_STACKS]));
	}

	if (abils[settings['ability']]['main style'] === 'melee') {
		// terrasaur maul
		if (
			settings[SETTINGS.WEAPON] === 'two-hand' &&
			settings[SETTINGS.TH] === 'terrasaur maul'
		) {
			boosted_AD = Math.floor(boosted_AD * 1.125);
		}

		// terrasaur maul upgraded
		else if (
			settings[SETTINGS.WEAPON] === 'two-hand' &&
			settings[SETTINGS.TH] === 'terrasaur maul+'
		) {
			boosted_AD = Math.floor(boosted_AD * 1.175);
		}

		// chaos roar
		if (settings[SETTINGS.CHAOS_ROAR] === true) {
			boosted_AD = 2 * boosted_AD;
		}
	}

	if (abils[settings['ability']]['main style'] === 'ranged') {
		// hex bow
		if (settings[SETTINGS.WEAPON] === 'two-hand' && settings[SETTINGS.TH] === 'hexhunter bow') {
			boosted_AD = Math.floor(boosted_AD * 1.125);
		}

		// hex bow upgraded
		else if (
			settings[SETTINGS.WEAPON] === 'two-hand' &&
			settings[SETTINGS.TH] === 'hexhunter bow+'
		) {
			boosted_AD = Math.floor(boosted_AD * 1.175);
		}

		// icy precision (wen arrows)
		const wen_arrow_abil_types_buffed = ['threshold', 'ultimate', 'special attack'];
		if (wen_arrow_abil_types_buffed.includes(abils[settings['ability']]['ability type'])) {
			boosted_AD = Math.floor(boosted_AD * (1 + 0.03 * settings[SETTINGS.ICY_PRECISION]));
		}
	}

	// necromancy has no (known) buffs of this type

	// Scripture of Amascut
	if (settings[SETTINGS.POCKET] === 'scripture of amascut') {
		boosted_AD = Math.floor(boosted_AD * 1.1);
	}

	return boosted_AD;
}

function ability_specific_effects(settings, dmgObject) {
	// order of these effects in unknown and should be researched properly still.
	if (abils[settings['ability']]['main style'] === 'magic') {
		// conflagrate
		if (settings['ability'] === 'combust' && settings[SETTINGS.CONFLAGRATE] === true) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.4);
		}

		// song of destruction 2 item set effect
		song_of_destruction_effects = ['bleed', 'burn', 'dot'];
		if (
			song_of_destruction_effects.contains(abils[settings['ability']]['ability classification'])
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.3);
		}

		// essence corruption 1 stack effect
		// proc based effect to be added later

		// kerapac's wristwraps
		if (settings[SETTINGS.KERAPACS_WRISTWRAPS] === 'regular') {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.25);
		} else if (settings[SETTINGS.KERAPACS_WRISTWRAPS] === 'enchanted') {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.4);
		}

		// wrack bound
		if (
			settings['ability'] === 'wrack' &&
			(settings[SETTINGS.TARGET_DISABILITY] === 'stunned' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'bound' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'stunned and bound')
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.3);
		}

		// wrack and ruin bound
		if (
			settings['ability'] === 'wrack and ruin' &&
			(settings[SETTINGS.TARGET_DISABILITY] === 'stunned' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'bound' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'stunned and bound')
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.6);
		}

		// greater chain half damage
		gchain_not_halved = ['bleed', 'burn', 'dot'];
		if (
			gchain_not_halved.contains(abils[settings['ability']][['ability classification']] === false)
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 0.5);
		}
	}

	if (abils[settings['ability']]['main style'] === 'melee') {
		// slice bound
		if (
			settings['ability'] === 'slice' &&
			(settings[SETTINGS.TARGET_DISABILITY] === 'stunned' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'bound' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'stunned and bound')
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.4);
		}

		// slaughter walk
		if (settings['ability'] === 'slaughter' && settings[SETTINGS.WALKED] === true) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 3);
		}

		// punish low
		if (settings['ability'] === 'punish' && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 2.5);
		}
	}

	if (abils[settings['ability']]['main style'] === 'ranged') {
		// piercing shot bound
		if (
			settings['ability'] === 'piercing shot' &&
			(settings[SETTINGS.TARGET_DISABILITY] === 'stunned' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'bound' ||
				settings[SETTINGS.TARGET_DISABILITY] === 'stunned and bound')
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 1.3);
		}
	}

	if (abils[settings['ability']]['main style'] === 'necromancy') {
		// death spark (omni guard passive)
		if (settings[SETTINGS.DEATH_SPARK] === true && settings['ability'] === 'necromancy auto') {
			dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.5);
		}

		// living death - finger of death
		if (settings[SETTINGS.LIVING_DEATH] === true && settings['ability'] === 'finger of death') {
			dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2);
		}

		// skeleton warrior stacks
		if (settings['ability'] === 'skeleton warrior auto') {
			dmgObject['boosted AD'] = Math.floor(
				dmgObject['boosted AD'] * (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_STACKS])
			);
		}
	}
	return dmgObject;
}

function set_min_var(settings, dmgObject) {
	// set initial min and var values
	let min_percent = abils[settings['ability']]['min hit'];
	let var_percent = abils[settings['ability']]['var hit'];

	if (abils[settings['ability']]['main style'] === 'magic') {
		// detonate
		if (settings['ability'] === 'detonate') {
			min_percent = min_percent + 0.45 * settings[SETTINGS.DETONATE_CHARGE_TICKS];
			var_percent = var_percent + 0.1 * settings[SETTINGS.DETONATE_CHARGE_TICKS];
		}
	}

	if (abils[settings['ability']]['main style'] === 'melee') {
		// greater barge tick bonus
		if (settings['ability'] === 'greater barge') {
			min_percent = min_percent + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_LAST_ATTACK], 0.5);
			var_percent = var_percent + Math.min(0.02 * settings[SETTINGS.TIME_SINCE_LAST_ATTACK], 0.7);
		}
	}

	if (abils[settings['ability']]['main style'] === 'ranged') {
		// salt the wound stack bonus
		if (settings['ability'] === 'salt the wound') {
			min_percent = min_percent + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
			var_percent = var_percent + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
		}
	}

	if (abils[settings['ability']]['main style'] === 'necromancy') {
		// death grasp (death guard spec)
		if (settings['ability'] === 'death grasp') {
			min_percent = min_percent + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
		}
	}

	let min_hit = Math.max(Math.floor(min_percent * dmgObject['boosted AD']), 0);
	let var_hit = Math.max(Math.floor(var_percent * dmgObject['boosted AD']), 0);
	return [min_hit, var_hit];
}

function calc_style_specific(settings, dmgObject) {
	if (abils[settings['ability']]['main style'] === 'ranged') {
		// og bane ammo
		if (settings[SETTINGS.AMMUNITION] === 'bane bolts' || settings[SETTINGS.AMMUNITION] === 'bane arrows') {
			if (
				settings['ability'] === 'ranged main-hand auto' ||
				settings['ability'] === 'ranged two-hand auto' ||
				settings['ability'] === 'ranged off-hand auto'
			) {
				dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.4);
				dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.4);
			} else {
				dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.25);
				dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.25);
			}
		}

		// jas bane ammo
		if (
			settings[SETTINGS.AMMUNITION] === 'jas dragon bane arrow' ||
			settings[SETTINGS.AMMUNITION] === 'jas demon bane arrow'
		) {
			dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.3);
			dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.3);
		}

		// ful arrows
		if (settings[SETTINGS.AMMUNITION] === 'ful arrows') {
			dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.15);
			dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.15);
		}

		// enchanted bolts (proc based, will come later)
		// sirenic set effect (proc based, will come later)
		// gemstone armour effect (proc based, will come later)

		// pernix quiver
		if (settings[SETTINGS.AMMO_SLOT] === 'pernix quiver' && settings[SETTINGS.TARGET_HP_PERCENT] <= 25) {
			dmgObject['var hit'] = Math.floor(
				dmgObject['var hit'] + 0.04 * (dmgObject['min hit'] + dmgObject['var hit'])
			);
		}
	}
	return dmgObject;
}

function calc_precise(settings, dmgObject) {
	// calculate precise
	let max_hit = dmgObject['min hit'] + dmgObject['var hit'];
	let min_hit = dmgObject['min hit'] + Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit);

	return min_hit;
}

function calc_additive_boosts(settings, dmgObject) {
	// compute the bonus gained from additive boosts
	let boost = 0;

	// add stone of jas boost
	boost += settings[SETTINGS.STONE_OF_JAS] / 100;

	// void armour
	// count the number of non-helmet void pieces
	let void_pieces = 0;
	const void_chest_pieces = [
		'void knight top',
		'superior void knight top',
		'elite void knight top',
		'superior elite void knight top'
	];
	if (void_chest_pieces.includes(settings[SETTINGS.BODY])) {
		void_pieces += 1;
	}
	const void_legs_pieces = [
		'void knight robe',
		'superior void knight robe',
		'elite void knight robe',
		'superior elite void knight robe'
	];
	if (void_legs_pieces.includes(settings[SETTINGS.LEGS])) {
		void_pieces += 1;
	}
	const void_hands_pieces = ['void knight gloves', 'superior void knight gloves'];
	if (void_hands_pieces.includes(settings[SETTINGS.GLOVES])) {
		void_pieces += 1;
	}
	const void_shield_pieces = ['void knight deflector', 'superior void knight deflector'];
	if (void_shield_pieces.includes(settings[SETTINGS.OH] && SETTINGS.WEAPON === 'main-hand')) {
		void_pieces += 1;
	}

	// add damage bonus
	if (abils[settings['ability']]['main style'] === 'magic') {
		if (settings[SETTINGS.HELMET] === 'void knight magic helm') {
			boost += 0.05;
		} else if (settings[SETTINGS.HELMET] === 'superior void knight magic helm') {
			boost += 0.07;
		}
	} else if (abils[settings['ability']]['main style'] === 'melee') {
		if (settings[SETTINGS.HELMET] === 'void knight melee helm') {
			boost += 0.05;
		} else if (settings[SETTINGS.HELMET] === 'superior void knight melee helm') {
			boost += 0.07;
		}
	} else if (abils[settings['ability']]['main style'] === 'ranged') {
		if (settings[SETTINGS.HELMET] === 'void knight ranged helm') {
			boost += 0.05;
		} else if (settings[SETTINGS.HELMET] === 'superior void knight ranged helm') {
			boost += 0.07;
		}
	}

	// draconic fruit
	if (settings[SETTINGS.DRACONIC_FRUIT] === true) {
		boost += 0.02;
	}

	// zerk necklace
	if ((weapons[settings[SETTINGS.MH]]['classification'] === 'obsidian' && settings[SETTINGS.WEAPON] === 'main-hand') || (weapons[settings[SETTINGS.TH]]['category'] === 'obsidian' && settings[SETTINGS.WEAPON] === 'two-hand')) {
	    boost += 0.05;
	}

	// dominion marker (wtf does this do lol?)

	// regular gloves of passive next abil boost if style is melee
	if (
		settings[SETTINGS.ENDUIRING_RUIN_HIT] === 'regular' &&
		abils[settings['ability']]['main style'] === 'melee'
	) {
		boost += 0.1;
	} else if (
		settings[SETTINGS.ENDUIRING_RUIN_HIT] === 'enhanced' &&
		abils[settings['ability']]['main style'] === 'melee'
	) {
		boost += 0.16;
	}

	// needle strike next abil boost if style is ranged
	if (
		(settings[SETTINGS.NEEDLE_STRIKE] === true || settings[SETTINGS.NEEDLE_STRIKE] === 'fleeting') &&
		abils[settings['ability']]['main style'] === 'ranged'
	) {
		boost += 0.07;
	}

	// ruby aurora
	boost += settings[SETTINGS.RUBY_AURORA] * 0.01;

	// gorajan trailblazer
	//if (settings[SETTINGS.GORAJAN_TRAILBLAZER] === true) {
	//	boost += 0.07;
	//}

	// gravitate (annihilation spec)
	if (abils[settings['ability']]['main style'] === 'melee') {
		boost += settings[SETTINGS.GRAVITATE] / 100;
	}

	// scripture of ful
	if (settings[SETTINGS.POCKET] === 'scripture of ful') {
		boost += 0.2;
	}

	// desperado (ring of kinship ranged boost)
	if (settings[SETTINGS.DESPERADO] > 0 && abils[settings['ability']]['main style'] === 'ranged') {
		boost += 0.1;
		boost = boost + 0.01 * settings[SETTINGS.DESPERADO];
	}

	let min_hit = Math.floor(dmgObject['min hit'] * (1 + boost));
	let var_hit = Math.floor(dmgObject['var hit'] * (1 + boost));

	return [min_hit, var_hit];
}

function calc_prayer(settings) {
	let boost = 0;
	if (abils[settings['ability']]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
		boost += prayers[settings[SETTINGS.PRAYER]]['boost'];

		if (
			settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
			prayers[settings[SETTINGS.PRAYER]]['category'] in ['single-stat boosting', 'leech curse']
		) {
			boost += 0.1;
		}
	}
	if (settings[SETTINGS.DIVINE_RAGE] === true) {
		boost += 0.05;
	}
	return boost;
}

function calc_multiplicative_shared_buffs(settings, dmgObject) {
	let boost = 10000;

	// apply magic unique boosts
	if (abils[settings['ability']]['main style'] === 'magic') {
		// prayer boost
		boost = Math.floor(boost * (1 + calc_prayer(settings)));

		// sunshine
		if (settings[SETTINGS.SUNSHINE] === true) {
			boost = Math.floor(boost * 1.5);
		}

		// blood tithe (exsanguinate)
		boost = Math.floor(boost * (1 + settings[SETTINGS.BLOOD_TITHE] / 100));
	}

	// apply melee unique boosts
	if (abils[settings['ability']]['main style'] === 'melee') {
		// prayer boost
		boost = Math.floor(boost * (1 + calc_prayer(settings)));

		// berserk
		if (settings[SETTINGS.BERSERK] === true) {
			boost = Math.floor(boost * 2);
		}

		// zaros godsword
		if (settings[SETTINGS.ZGS] === true) {
			boost = Math.floor(boost * 1.25);
		}

		// dragon battleaxe
		if (settings[SETTINGS.DBA] === true) {
			boost = Math.floor(boost * 1.2);
		}
	}

	// apply ranged unique boosts
	if (abils[settings['ability']]['main style'] === 'ranged') {
		// prayer boost
		boost = Math.floor(boost * (1 + calc_prayer(settings)));

		// death swiftness
		if (settings[SETTINGS.DEATH_SWIFTNESS] === true) {
			boost = Math.floor(boost * 1.5);
		}
	}

	// apply necro unique boosts
	if (abils[settings['ability']]['main style'] === 'necromancy') {
		// prayer boost
		boost = Math.floor(boost * (1 + calc_prayer(settings)));
	}

	// apply revenge
	if (
		abils[settings['ability']]['main style'] === 'main-hand' &&
		weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] in ['shield', 'defender']
	) {
		let revenge = 0.025 * settings[SETTINGS.REVENGE];

		// boost is twice as big if done with a shield
		if (weapons[settings[SETTINGS.OH]][SETTINGS.WEAPON] === 'shield') {
			revenge = revenge * 2;
		}

		boost = Math.floor(boost * (1 + revenge));

		// crystal weapons (proc based, so added later)

		// spendthrift (proc based, so added later)

		// ruthless
		boost = Math.floor(boost * settings[SETTINGS.RUTHLESS_STACKS] * settings[SETTINGS.RUTHLESS] * 0.005);
	}

	let min_hit = Math.floor((dmgObject['min hit'] * boost) / 10000);
	let var_hit = Math.floor((dmgObject['var hit'] * boost) / 10000);

	return [min_hit, var_hit];
}

function calc_multiplicative_pve_buffs(settings, dmgObject) {
	let boost = 10000;

	// apply magic unique buffs
	if (abils[settings['ability']]['main style'] === 'magic') {
		// spellcaster gloves (proc based, so added later)
		boost = boost;
	}

	// apply melee unique buffs
	if (abils[settings['ability']]['main style'] === 'melee') {
		// spellcaster gloves (proc based, so added later)

		//bane gear
		if (weapons[settings[SETTINGS.MH]]['category'] === 'bane') {
			boost = Math.floor(boost * 1.25);
		}
	}

	// slayer helm
	boost = Math.floor(boost * (1 + gear[settings[SETTINGS.SLAYER_HELM]]['boost']));

	// fort forinthry guard house task
	if (settings[SETTINGS.GUARDHOUSE] === 'tier 1' || settings[SETTINGS.GUARDHOUSE] === 'tier 3') {
		boost = Math.floor(boost * 1.01);
	} else if (
		settings[SETTINGS.GUARDHOUSE] === 'tier 1 undead' ||
		settings[SETTINGS.GUARDHOUSE] === 'tier 3 undead'
	) {
		boost = Math.floor(boost * 1.02);
	}

	// fort forinthry guard house low hp
	if (settings[SETTINGS.GUARDHOUSE] in ['tier 3', 'tier 3 undead'] && settings[SETTINGS.TARGET_HP_PERCENT] < 25) {
		boost = Math.floor(boost * 1.1);
	}

	// genocidal
	boost = Math.floor(boost * (1 + settings[SETTINGS.GENOCIDAL] / 100));

	// salve amulet
	if (settings[SETTINGS.NECKLACE] === 'salve amulet') {
		boost = Math.floor(boost * 1.15);
	} else if (settings[SETTINGS.NECKLACE] === 'salve amulet (e)') {
		boost = Math.floor(boost * 1.2);
	}

	// swiftness of the aviansie (egwd kree'arra buff)
	if (settings[SETTINGS.GWD3_KREE] === true) {
		boost = Math.floor(boost * 1.1);
	}

	// perfect dung potion buff
	if (settings[SETTINGS.PERFECT_DUNG] === true) {
		boost = Math.floor(boost * 1.05);
	}

	// ripper claws buff (quantity of buff unknown)

	// ripper demon familiar buff
	if (settings[SETTINGS.FAMILIAR] === 'ripper demon') {
		boost = Math.floor(boost + 0.05 * (1 - settings[SETTINGS.TARGET_HP_PERCENT]));
	}

	let min_hit = Math.floor((dmgObject['min hit'] * boost) / 10000);
	let var_hit = Math.floor((dmgObject['var hit'] * boost) / 10000);

	return [min_hit, var_hit];
}

function calc_bonus_damage(settings, dmgObject) {
	let min_hit = dmgObject['min hit'];
	let var_hit = dmgObject['var hit'];

	if (abils[settings['ability']]['main style'] === 'melee') {
		// frostblades (leng off-hand effects)
		if (
			(settings[SETTINGS.OH] === 'dark sliver of leng' ||
				settings[SETTINGS.OH] === 'dark ice sliver') &&
			settings[SETTINGS.WEAPON] === 'main-hand' &&
			settings[SETTINGS.FROSTBLADES] === true
		) {
			min_hit += Math.floor(0.24 * dmgObject['boosted_AD']);
		}
	}

	return [min_hit, var_hit];
}

function calc_core(settings, dmgObject, key) {
	for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
		// berserker's fury
		dmgObject[key]['damage list'][i] = Math.floor(
			dmgObject[key]['damage list'][i] * (1 + settings[SETTINGS.BERSERKERS_FURY] / 100)
		);

		// dharock's gear (proc based, so added later)

		// store damage into bolg
		if (settings[SETTINGS.TH] === 'bow of the last guardian') {
			settings['bolg damage'] = dmgObject;
		}

		// crits
		if (dmgObject['crit'] === true && abils[settings['ability']]['crit effects'] === true) {
			dmgObject[key]['damage list'][i] = Math.floor(
				dmgObject[key]['damage list'][i] * (1 + calc_crit_damage(settings))
			);
		}

		// store bloat damages
		if (settings['ability'] === 'bloat - full damage') {
			settings['bloat damage'][key]['damage list'].push(dmgObject[key]['damage list'][i]);
		}
	}
	return dmgObject[key];
}

function calc_crit_damage(settings) {
	let crit_buff = 0.5;

	if (abils[settings['ability']]['main style'] + ' level' >= 90) {
		crit_buff += 0.5;
	}

	return crit_buff;
}

function calc_on_npc(settings, dmgObject) {
	for (let i = 0; i < dmgObject['damage list'].length; i++) {
		// set haunted
		let haunted = Math.min(
			Math.floor(dmgObject['damage list'][i] * 0.1),
			Math.floor(0.2 * settings[SETTINGS.HAUNTED_AD])
		);

		// vulnerability / curse
		if (settings[SETTINGS.VULN] === 'vulnerability') {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		} else if (settings[SETTINGS.VULN] === 'curse') {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
		}

		// enduring ruin bleed (gop)
		if (
			settings[SETTINGS.ENDUIRING_RUIN_BLEED] === 'regular' &&
			abils[settings['ability']]['ability classification'] === 'bleed'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
		} else if (
			settings[SETTINGS.ENDUIRING_RUIN_BLEED] === 'enhanced' &&
			abils[settings['ability']]['ability classification'] === 'bleed'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.25);
		}

		// wilderness puzzlebox
		if (settings[SETTINGS.PUZZLEBOX] > 1) {
			dmgObject['damage list'][i] = Math.floor(
				dmgObject['damage list'][i] * (1 + 0.03 + settings[SETTINGS.PUZZLEBOX])
			);
		}

		// croesus deathspores (crypt flanking)
		if (settings[SETTINGS.CRYPTBLOOM] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		}

		// zamorak's guardian triumph
		if (
			settings[SETTINGS.GUARDIAN_TRIUMPH] === true &&
			abils[settings['ability']]['ability type'] === 'basic'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
		}

		// undead slayer perk
		if (settings[SETTINGS.UNDEAD_SLAYER_PERK] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
		}

		// undead slayer sigil
		if (settings[SETTINGS.UNDEAD_SLAYER_SIGIL] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
		}

		// dragon slayer perk
		if (settings[SETTINGS.DRAGON_SLAYER_PERK] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
		}

		// dragon slayer sigil
		if (settings[SETTINGS.DRAGON_SLAYER_SIGIL] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
		}

		// demon slayer perk
		if (settings[SETTINGS.DEMON_SLAYER_PERK] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
		}

		// demon slayer sigil
		if (settings[SETTINGS.DEMON_SLAYER_SIGIL] === true) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
		}

		// nopenopenope (pof spider buff)
		dmgObject['damage list'][i] = Math.floor(
			dmgObject['damage list'][i] * (1 + settings[SETTINGS.NOPENOPENOPE])
		);

		// ghost hunter outfit
		// count number of pieces
		let ghost_hunter_pieces = 0;
		if (settings[SETTINGS.HELMET] === 'ghost hunter goggles') {
			ghost_hunter_pieces += 1;
		}
		if (settings[SETTINGS.CAPE] === 'ghost hunter backpack') {
			ghost_hunter_pieces += 1;
		}
		if (settings[SETTINGS.CHEST] === 'ghost hunter body') {
			ghost_hunter_pieces += 1;
		}
		if (settings[SETTINGS.LEGS] === 'ghost hunter legs') {
			ghost_hunter_pieces += 1;
		}

		// apply buff
		if (ghost_hunter_pieces === 1) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.03);
		} else if (ghost_hunter_pieces === 2) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.06);
		} else if (ghost_hunter_pieces === 3 || ghost_hunter_pieces === 4) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		}

		// vanquish (quest point weapon)
		if (settings[SETTINGS.TH] === 'vanquish') {
			dmgObject['damage list'][i] = Math.floor(
				dmgObject['damage list'][i] * (1 + 0.05 * settings[SETTINGS.QUEST_DEATHS])
			);
		}

		// zerk auras
		if (settings[SETTINGS.AURA] === 'maniacal' && abils[settings['ability']]['main style'] === 'magic') {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		} else if (
			settings[SETTINGS.AURA] === 'berserk' &&
			abils[settings['ability']]['main style'] === 'melee'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		} else if (
			settings[SETTINGS.AURA] === 'reckless' &&
			abils[settings['ability']]['main style'] === 'ranged'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		}

		// mahjarrat aura
		if (settings[SETTINGS.AURA] === 'mahjarrat' && abils[settings['ability']]['damage type'] != 'spirit') {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
		}

		// scrimshaw of elements
		if (
			settings[SETTINGS.POCKET] === 'scrimshaw of elements' &&
			abils[settings['ability']]['main style'] === 'magic'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
		} else if (
			settings[SETTINGS.POCKET] === 'superior scrimshaw of elements' &&
			abils[settings['ability']]['main style'] === 'magic'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.0666);
		}

		// scrimshaw of cruelty
		if (
			settings[SETTINGS.POCKET] === 'scrimshaw of cruelty' &&
			abils[settings['ability']]['main style'] === 'ranged'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
		} else if (
			settings[SETTINGS.POCKET] === 'superior scrimshaw of cruelty' &&
			abils[settings['ability']]['main style'] === 'ranged'
		) {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.0666);
		}

		// apply haunted
		dmgObject['damage list'][i] = dmgObject['damage list'][i] + haunted;

		// essence corruption 25 stack bonus
		if (
			abils[settings['ability']]['main style'] === 'magic' &&
			settings[SETTINGS.ESSENCE_CORRUPTION] >= 25
		) {
			dmgObject['damage list'][i] =
				dmgObject['damage list'][i] + settings[SETTINGS.MAGIC_LEVEL] + settings[SETTINGS.ESSENCE_CORRUPTION];
		}

		// necklace of salamancy
		if (settings[SETTINGS.NECKLACE] === 'necklace of salamancy') {
			dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
		}

		// anachronia slayer lodge buff
		dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * (1 + settings[SETTINGS.ANACHRONIA_SLAYER_LODGE]));

		// store damage into soul split
		settings['soul split'] = dmgObject;

		// hit cap
		dmgObject['damage list'][i] = Math.min(dmgObject['damage list'][i], 30000);
	}
	return dmgObject;
}

function roll_damage(settings, dmgObject) {
	let min_hit = dmgObject['min hit'];
	let var_hit = dmgObject['var hit'];
	let dmg_list = [];
	for (let i = 0; i <= var_hit; i++) {
		dmg_list.push(min_hit + i);
	}
	return dmg_list;
}

function calc_on_hit(settings, dmgObject) {
	[dmgObject['min hit'], dmgObject['var hit']] = calc_additive_boosts(settings, dmgObject);
	[dmgObject['min hit'], dmgObject['var hit']] = calc_multiplicative_shared_buffs(
		settings,
		dmgObject
	);
	[dmgObject['min hit'], dmgObject['var hit']] = calc_multiplicative_pve_buffs(settings, dmgObject);
	[dmgObject['min hit'], dmgObject['var hit']] = calc_bonus_damage(settings, dmgObject);

	return [dmgObject['min hit'], dmgObject['var hit']];
}

function calc_damage_object(settings) {
	const dmgObject = create_object(settings);
	for (let key in dmgObject) {
		// calc base AD
		dmgObject[key]['base AD'] = calc_base_ad(settings);
		// calc buffed AD
		dmgObject[key]['boosted AD'] = calc_boosted_ad(settings, dmgObject[key]);
		// ability specific
		dmgObject[key] = ability_specific_effects(settings, dmgObject[key]);
		// style specific
		dmgObject[key] = calc_style_specific(settings, dmgObject[key]);
		// set min var
		[dmgObject[key]['min hit'], dmgObject[key]['var hit']] = set_min_var(settings, dmgObject[key]);
		// precise
		dmgObject[key]['min hit'] = calc_precise(settings, dmgObject[key])
		// calc on hit effects
		if (abils[settings['ability']]['on-hit effects']) {
			[dmgObject[key]['min hit'], dmgObject[key]['var hit']] = calc_on_hit(
				settings,
				dmgObject[key]
			);
		}
		// roll damage
		dmgObject[key]['damage list'] = roll_damage(settings, dmgObject[key]);
		// calc core
		if (abils[settings['ability']]['on-hit effects']) {
			dmgObject[key] = calc_core(settings, dmgObject, key);
		}
		// calc on npc
		dmgObject[key] = calc_on_npc(settings, dmgObject[key]);

		// add split soul damage
		if (settings[SETTINGS.SPLIT_SOUL] === true) {
			dmgObject[key] = add_split_soul(settings, dmgObject[key]);
		}
	}
	// get user value
	return get_user_value(settings, dmgObject);
}

function calc_bolg(settings) {
	settings['ability'] = 'bolg proc';

	// calc base bolg damage
	bolg_base = calc_damage_object(settings);

	settings['ability'] = 'bolg proc percentages';
	bolg_damage_based = create_object(settings);

	// calc the damage based proc
	for (let key in bolg_damage_based) {
		bolg_damage_based[key]['base AD'] = calc_base_ad(settings);
		bolg_damage_based[key]['boosted AD'] = calc_boosted_ad(settings, bolg_damage_based[key]);
		dmg_list = [];
		// take every single element of dmgobject and add the relevant percentage ranges as individual hits to bolg_damage_based with the same key
		for (let element in settings['bolg damage']) {
			bolg_damage_based[key]['min hit'] = abils[settings['ability']]['min hit'] * element;
			bolg_damage_based[key]['var hit'] = abils[settings['ability']]['var hit'] * element;
			[bolg_damage_based[key]['min hit'], bolg_damage_based[key]['var hit']] = calc_on_hit(
				settings,
				bolg_damage_based[key]
			);
			bolg_damage_based[key]['damage list'] = roll_damage(settings, bolg_damage_based[key]);

			for (let dmg in bolg_damage_based[key]['damage list']) {
				dmg_list.push(dmg);
			}

			bolg_damage_based[key]['damage list'] = dmg_list;
		}
		bolg_damage_based[key] = calc_core(settings, bolg_damage_based[key]);
		bolg_damage_based[key] = calc_on_npc(settings, bolg_damage_based[key]);
		bolg_damage_based[key] = add_split_soul(settings, bolg_damage_based[key]);
	}

	bolg_perc_damage = get_user_value(settings, bolg_damage_based);

	return bolg_perc_damage + bolg_base;
}

function calc_bloat(settings) {
	let bloat_dot = create_object(settings);
	for (let key in settings['bloat damage']) {
		for (let dmg in settings['bloat damage'][key]['damage list']) {
			bloat_dot[key]['damage list'].push(
				Math.floor(settings['bloat damage'][key]['damage list'][dmg])
			);
		}
		bloat_dot[key] = calc_on_npc(settings, bloat_dot[key]);
	}
	dmg = get_user_value(settings, bloat_dot);
	return 10 * dmg;
}

function calc_fsoa(settings) {
	settings['ability'] = 'time strike';
	// call double next tick

	return Math.floor(calc_crit_chance(settings) * calc_damage_object(settings));
}

function add_split_soul(settings, dmgObject) {
	for (let i = 0; i < dmgObject['damage list'].length; i++) {
		dmgObject['damage list'][i] += calc_split_soul_hit(
			settings['soul split']['damage list'][i],
			settings
		);
	}
	return dmgObject;
}

function calc_split_soul_hit(hit, settings) {
	return 4 * calc_soul_split_hit(hit, settings);
}

function calc_soul_split_hit(hit, settings) {
	let heal = 0;

	// heal 10% of first 2k
	heal += Math.min(0.1 * hit, 200);
	hit -= 2000;

	// heal 5% of the next 2000
	if (hit > 0) {
		heal += Math.min(0.05 * hit, 100);
		hit -= 2000;
	}

	// heal 1.25% over the rest
	if (hit > 0) {
		heal += 0.125 * hit;
	}

	// amulet of souls bonus healing
	const aos_amulets = [
		'amulet of souls',
		'amulet of souls (or)',
		'essence of finality',
		'essence of finality (or)'
	];
	if (aos_amulets.includes(settings[SETTINGS.NECKLACE])) {
		heal = heal * 1.1875;
	}

	return Math.floor(heal);
}

function get_user_value(settings, dmgObject) {
	if (settings[SETTINGS.MODE] === 'mean') {
		return get_mean_damage(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'mean no crit') {
		return get_mean_no_crit(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'mean crit') {
		return get_mean_crit(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'min no crit') {
		return get_min_no_crit(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'min crit') {
		return get_min_crit(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'max no crit') {
		return get_max_no_crit(dmgObject);
	} else if (settings[SETTINGS.MODE] === 'max crit') {
		return get_max_crit(dmgObject);
	}
}

function get_mean_damage(dmgObject) {
	let mean = 0;
	for (let key in dmgObject) {
		let total = 0;
		let prob = dmgObject[key]['probability'];
		for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
			total += dmgObject[key]['damage list'][i];
		}
		total = total / dmgObject[key]['damage list'].length;
		mean += total * prob;
	}
	return Math.round(mean);
}

function get_mean_no_crit(dmgObject) {
	let mean = 0;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === false) {
			let total = 0;
			let prob = dmgObject[key]['probability'];
			for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
				total += dmgObject[key]['damage list'][i];
			}
			total = total / dmgObject[key]['damage list'].length;
			mean += total;
		}
	}
	return Math.round(mean);
}

function get_mean_crit(dmgObject) {
	let mean = 0;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === true) {
			let total = 0;
			let prob = dmgObject[key]['probability'];
			for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
				total += dmgObject[key]['damage list'][i];
			}
			total = total / dmgObject[key]['damage list'].length;
			mean += total;
		}
	}
	return Math.round(mean);
}

function get_min_no_crit(dmgObject) {
	let min_hit = 100000000;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === false) {
			let lowest_hit = dmgObject[key]['damage list'][0];
			if (lowest_hit < min_hit) {
				min_hit = lowest_hit;
			}
		}
	}
	return min_hit;
}

function get_min_crit(dmgObject) {
	let min_hit = 100000000;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === true) {
			let lowest_hit = dmgObject[key]['damage list'][0];
			if (lowest_hit < min_hit) {
				min_hit = lowest_hit;
			}
		}
	}
	return min_hit;
}

function get_max_no_crit(dmgObject) {
	let max_hit = 0;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === false) {
			let highest_hit = dmgObject[key]['damage list'][dmgObject[key]['damage list'].length - 1];
			if (highest_hit > max_hit) {
				max_hit = highest_hit;
			}
		}
	}
	return max_hit;
}

function get_max_crit(dmgObject) {
	let max_hit = 0;
	for (let key in dmgObject) {
		if (dmgObject[key]['crit'] === true) {
			let highest_hit = dmgObject[key]['damage list'][dmgObject[key]['damage list'].length - 1];
			if (highest_hit > max_hit) {
				max_hit = highest_hit;
			}
		}
	}
	return max_hit;
}

function hit_damage_calculation(settings) {
	// initialise bloat
	if (settings['ability'] === 'bloat - full damage') {
		settings['bloat damage'] = create_object(settings);
	}

	let total_damage = calc_damage_object(settings); // calculate the ability

	// handle bolg logic
	if (
		abils[settings['ability']]['main style'] === 'ranged' &&
		settings[SETTINGS.TH] === 'bow of the last guardian' &&
		settings[SETTINGS.WEAPON] === 'two-hand'
	) {
		// bolg proc conditions
		if (
			settings[SETTINGS.BOLG_STACKS] === 7 ||
			(settings[SETTINGS.BOLG_STACKS] === 3 && settings[SETTINGS.PRECISE_EQUILIBRIUM] === true)
		) {
			total_damage += calc_bolg(settings);
		}
	}

	// handle bloat logic
	if (settings['ability'] === 'bloat - full damage') {
		total_damage += calc_bloat(settings);
	}

	// handle instability (fsoa)
	if (settings[SETTINGS.INSTABILITY] === true && abils[settings['ability']]['damage type'] === 'magic') {
		total_damage += calc_fsoa(settings);
	}

	return total_damage;
}

export default hit_damage_calculation;
