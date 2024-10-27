import { SETTINGS } from './settings';
import { weapons, gear, armour, abils, prayers, ABILITIES } from './const';
import { create_object, calc_crit_chance } from './object_helper';
import { next_tick, next_hit, next_cast } from './ability_helper';

function calc_base_ad(settings) {
    // see wiki page /ability_damage for more info
    let base_AD = 0;

    if (abils[settings['ability']]['main style'] === 'magic') {
        if (settings[SETTINGS.WEAPON] === 'main-hand') {
            let AD_mh =
                Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings)
                );

            let AD_oh = 0;
            if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor(
                    0.5 * Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        )
                );
            }

            base_AD = AD_mh + AD_oh;
        } else if (settings[SETTINGS.WEAPON] === 'two-hand') {
            base_AD =
                Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
                Math.floor(1.25 * settings[SETTINGS.MAGIC_LEVEL]) +
                Math.floor(
                    14.4 * calc_weapon_tier(settings, 'two-hand weapon') +
                        1.5 * calc_bonus(settings)
                );
        }
    } else if (abils[settings['ability']]['main style'] === 'melee') {
        if (settings[SETTINGS.WEAPON] === 'main-hand') {
            let AD_mh =
                Math.floor(2.5 * settings[SETTINGS.STRENGTH_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings)
                );

            let AD_oh = 0;
            if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor(
                    0.5 * Math.floor(2.5 * settings[SETTINGS.STRENGTH_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        )
                );
            }

            base_AD = AD_mh + AD_oh;
        } else if (settings[SETTINGS.WEAPON] === 'two-hand') {
            base_AD =
                Math.floor(2.5 * settings[SETTINGS.STRENGTH_LEVEL]) +
                Math.floor(1.25 * settings[SETTINGS.STRENGTH_LEVEL]) +
                Math.floor(9.6 * calc_weapon_tier(settings, 'two-hand weapon')) +
                calc_bonus(settings) +
                Math.floor(
                    4.8 * calc_weapon_tier(settings, 'two-hand weapon') + 0.5 * calc_bonus(settings)
                );
        }
    } else if (abils[settings['ability']]['main style'] === 'ranged') {
        if (settings[SETTINGS.WEAPON] === 'main-hand') {
            let AD_mh =
                Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings)
                );

            let AD_oh = 0;
            if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor(
                    0.5 * Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        )
                );
            }

            base_AD = AD_mh + AD_oh;
        } else if (settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
            base_AD =
                Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
                Math.floor(1.25 * settings[SETTINGS.RANGED_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'two-hand weapon') + calc_bonus(settings)
                ) +
                Math.floor(
                    4.8 * calc_weapon_tier(settings, 'two-hand weapon') + 0.5 * calc_bonus(settings)
                );
        }
    } else if (abils[settings['ability']]['main style'] === 'necromancy') {
        if (settings[SETTINGS.WEAPON] === 'main-hand') {
            let AD_mh =
                Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings)
                );

            let AD_oh = 0;
            if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor(
                    0.5 * Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        )
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
    if (
        settings[hand] === 'custom' ||
        settings[hand] === 'custom oh' ||
        settings[hand] === 'custom th'
    ) {
        tier = Math.min(settings[hand + ' custom tier'], spell_tier);
    }
    // standard weapon
    else {
        tier = Math.min(weapons[settings[hand]]['tier'], spell_tier);

        // innate mastery (shard of genesis essence)
        if (weapons[settings[hand]]['tier'] === 95 && settings['innate mastery'] === true) {
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
    let hit_chance = Math.min(settings[SETTINGS.HIT_CHANCE] / 100, 1);
    return Math.floor(dmgObject['base AD'] * hit_chance);
}

// calculate boosted AD
function calc_boosted_ad(settings, dmgObject) {
    let boosted_AD = calc_damage_potential(settings, dmgObject);

    if (abils[settings['ability']]['main style'] === 'magic') {
        // inq staff
        if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'inquisitor staff'
        ) {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // inq staff upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'inquisitor staff+'
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
            settings['two-hand weapon'] === 'terrasaur maul'
        ) {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // terrasaur maul upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'terrasaur maul+'
        ) {
            boosted_AD = Math.floor(boosted_AD * 1.175);
        }

        // chaos roar
        if (settings['chaos roar'] === true) {
            boosted_AD = 2 * boosted_AD;
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // hex bow
        if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'hexhunter bow'
        ) {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // hex bow upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'hexhunter bow+'
        ) {
            boosted_AD = Math.floor(boosted_AD * 1.175);
        }

        // icy precision (wen arrows)
        const wen_arrow_abil_types_buffed = ['threshold', 'ultimate', 'special attack'];
        if (
            wen_arrow_abil_types_buffed.includes(abils[settings['ability']]['ability type']) &&
            settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS
        ) {
            boosted_AD = Math.floor(boosted_AD * (1 + 0.03 * settings['icy precision']));
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
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.4);
        }

        // song of destruction 2 item set effect
        if (
            ['bleed', 'burn', 'dot'].includes(abils[settings['ability']]['ability classification'])
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }

        // kerapac's wristwraps
        if (
            settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.25);
        } else if (
            settings[SETTINGS.KERAPACS_WRIST_WRAPS] ===
            SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.4);
        }

        // wrack bound
        if (
            settings['ability'] === 'wrack' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] ===
                    SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }

        // wrack and ruin bound
        if (
            settings['ability'] === 'wrack and ruin' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] ===
                    SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.6);
        }

        // greater chain half damage
        /*const gchain_not_halved = ['bleed', 'burn', 'dot'];
		if (
			gchain_not_halved.includes(abils[settings['ability']][['ability classification']] === false)
		) {
			dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 0.5);
		}*/
    }

    if (abils[settings['ability']]['main style'] === 'melee') {
        // slice bound
        if (
            settings['ability'] === 'slice' &&
            (settings['target disability'] === 'stunned' ||
                settings['target disability'] === 'bound' ||
                settings['target disability'] === 'stunned and bound')
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.4);
        }

        // slaughter walk
        if (settings['ability'] === 'slaughter' && settings['walked'] === true) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 3);
        }

        // punish low
        if (settings['ability'] === 'punish' && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2.5);
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // piercing shot bound
        if (
            settings['ability'] === 'piercing shot' &&
            (settings['target disability'] === 'stunned' ||
                settings['target disability'] === 'bound' ||
                settings['target disability'] === 'stunned and bound')
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }
    }

    if (abils[settings['ability']]['main style'] === 'necromancy') {
        // death spark (omni guard passive)
        if (settings['death spark'] === true && settings['ability'] === 'necromancy auto') {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.5);
        }

        // living dead - finger of death
        if (
            settings[SETTINGS.LIVING_DEATH] === true &&
            settings['ability'] === ABILITIES.FINGER_OF_DEATH
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2);
        }

        // skeleton warrior stacks
        if (settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO) {
            dmgObject['boosted AD'] = Math.floor(
                dmgObject['boosted AD'] *
                    (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS])
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
        if (settings['ability'] === ABILITIES.DETONATE) {
            min_percent = min_percent + 0.45 * settings[SETTINGS.DETONATE]; // TODO: fix missing reference for SETTINGS.DETONATE
            var_percent = var_percent + 0.1 * settings[SETTINGS.DETONATE];
        }
    }

    if (abils[settings['ability']]['main style'] === 'melee') {
        // greater barge tick bonus
        if (settings['ability'] === 'greater barge') {
            min_percent = min_percent + Math.min(0.05 * settings['time since last attack'], 0.5);
            var_percent = var_percent + Math.min(0.02 * settings['time since last attack'], 0.7);
        }

        // icy tempest
        if (
            settings['ability'] === ABILITIES.ICY_TEMPEST_1 ||
            settings['ability'] === ABILITIES.ICY_TEMPEST_2
        ) {
            min_percent += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
            var_percent += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // salt the wound stack bonus
        if (settings['ability'] === 'salt the wound') {
            min_percent = min_percent + 0.1 * settings['puncture stacks'];
            var_percent = var_percent + 0.05 * settings['puncture stacks'];
        }
    }

    if (abils[settings['ability']]['main style'] === 'necromancy') {
        // death grasp (death guard spec)
        if (settings['ability'] === 'death grasp') {
            min_percent = min_percent + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
        }
    }

    dmgObject['min hit'] = Math.max(Math.floor(min_percent * dmgObject['boosted AD']), 0);
    dmgObject['var hit'] = Math.max(Math.floor(var_percent * dmgObject['boosted AD']), 0);
    return dmgObject;
}

function calc_style_specific(settings, dmgObject) {
    if (abils[settings['ability']]['main style'] === 'ranged') {
        // og bane ammo
        if (settings['ammunition'] === 'bane bolts' || settings['ammunition'] === 'bane arrows') {
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
            settings['ammunition'] === 'jas dragon bane arrow' ||
            settings['ammunition'] === 'jas demon bane arrow'
        ) {
            dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.3);
            dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.3);
        }

        // ful arrows
        if (settings['ammunition'] === 'ful arrows') {
            dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.15);
            dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.15);
        }

        // enchanted bolts (proc based, will come later)
        // sirenic set effect (proc based, will come later)
        // gemstone armour effect (proc based, will come later)

        // pernix quiver
        if (
            settings['ammo slot'] === 'pernix quiver' &&
            settings[SETTINGS.TARGET_HP_PERCENT] <= 25
        ) {
            dmgObject['var hit'] = Math.floor(
                (dmgObject['var hit'] += 0.04 * (dmgObject['min hit'] + dmgObject['var hit']))
            );
        }
    }
    return dmgObject;
}

function calc_precise(settings, dmgObject) {
    // calculate precise
    let max_hit = dmgObject['min hit'] + dmgObject['var hit'];
    dmgObject['min hit'] =
        dmgObject['min hit'] + Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit);

    return dmgObject;
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
    if (
        void_shield_pieces.includes(
            settings[SETTINGS.OH] && settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
        )
    ) {
        void_pieces += 1; // TODO: use number of void pieces somewhere
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

    // dominion marker (wtf does this do lol?)

    // regular gloves of passive next abil boost if style is melee
    if (
        settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.REGULAR &&
        abils[settings['ability']]['main style'] === 'melee'
    ) {
        boost += 0.1;
    } else if (
        settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.ENCHANTED &&
        abils[settings['ability']]['main style'] === 'melee'
    ) {
        boost += 0.16;
    }

    // needle strike next abil boost if style is ranged
    if (
        (settings[SETTINGS.NEEDLE_STRIKE] === true ||
            settings[SETTINGS.NEEDLE_STRIKE] === 'fleeting') &&
        abils[settings['ability']]['main style'] === 'ranged'
    ) {
        boost += 0.07;
    }

    // ruby aurora
    boost += settings[SETTINGS.RUBY_AURORA] * 0.01;

    // gorajan trailblazer
    /*if (settings['gorajan trailblazer effect'] === true) {
		boost += 0.07;
	}*/

    // gravitate (annihilation spec)
    if (abils[settings['ability']]['main style'] === 'melee') {
        boost += settings[SETTINGS.GRAVITATE] / 100;
    }

    // scripture of ful
    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.FUL) {
        boost += 0.2;
    }

    // desperado (ring of kinship ranged boost)
    /*if (settings['desperado'] > 0 && abils[settings['ability']]['main style'] === 'ranged') {
		boost += 0.1;
		boost = boost + 0.01 * settings['desperado'];
	}*/

    dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * (1 + boost));
    dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * (1 + boost));

    return dmgObject;
}

function calc_prayer(settings) {
    let boost = 0;
    if (abils[settings['ability']]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
        boost += prayers[settings[SETTINGS.PRAYER]]['boost'];

        if (
            settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
            prayers[settings[SETTINGS.PRAYER]]['category'] in
                ['single-stat boosting', 'leech curse']
        ) {
            boost += 0.1;
        }
    }
    if (settings['divine rage'] === true) {
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
        if (settings['sunshine'] === true) {
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
        if (settings['berserk'] === true) {
            boost = Math.floor(boost * 2);
        }

        // zaros godsword
        if (settings['zaros godsword'] === true) {
            boost = Math.floor(boost * 1.25);
        }

        // dragon battleaxe
        if (settings['dragon battleaxe'] === true) {
            boost = Math.floor(boost * 1.2);
        }
    }

    // apply ranged unique boosts
    if (abils[settings['ability']]['main style'] === 'ranged') {
        // prayer boost
        boost = Math.floor(boost * (1 + calc_prayer(settings)));

        // death swiftness
        if (settings['death swiftness'] === true) {
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
        weapons[settings[SETTINGS.OH]]['weapon type'] in ['shield', 'defender']
    ) {
        let revenge = 0.025 * settings[SETTINGS.REVENGE];

        // boost is twice as big if done with a shield
        if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'shield') {
            revenge = revenge * 2;
        }

        boost = Math.floor(boost * (1 + revenge));
    }
    // crystal weapons (proc based, so added later)

    // spendthrift (proc based, so added later)

    // ruthless
    boost = Math.floor(
        boost * (1 + settings[SETTINGS.RUTHLESS_STACKS] * settings[SETTINGS.RUTHLESS_RANK] * 0.005)
    );

    dmgObject['min hit'] = Math.floor((dmgObject['min hit'] * boost) / 10000);
    dmgObject['var hit'] = Math.floor((dmgObject['var hit'] * boost) / 10000);

    return dmgObject;
}

function calc_multiplicative_pve_buffs(settings, dmgObject) {
    let boost = 10000;

    // apply magic unique buffs
    if (abils[settings['ability']]['main style'] === 'magic') {
        // spellcaster gloves (proc based, so added later)
        // boost = boost; // useless self-assignment
    }

    // apply melee unique buffs
    if (abils[settings['ability']]['main style'] === 'melee') {
        // spellcaster gloves (proc based, so added later)
        //bane gear
        // if (weapons[settings['main-hand']]['category'] === 'bane') {
        // 	boost = Math.floor(boost * 1.25);
        // }
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
    if (
        settings[SETTINGS.GUARDHOUSE] in ['tier 3', 'tier 3 undead'] &&
        settings[SETTINGS.TARGET_HP_PERCENT] < 25
    ) {
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
    if (settings['swiftness of the aviansie'] === true) {
        boost = Math.floor(boost * 1.1);
    }

    // perfect dung potion buff
    if (settings['perfect dungeoneering potion'] === true) {
        boost = Math.floor(boost * 1.05);
    }

    // ripper claws buff (quantity of buff unknown)

    // ripper demon familiar buff
    if (settings[SETTINGS.FAMILIAR] === SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON) {
        boost = Math.floor(boost + 0.05 * (1 - settings[SETTINGS.TARGET_HP_PERCENT] / 100));
    }

    dmgObject['min hit'] = Math.floor((dmgObject['min hit'] * boost) / 10000);
    dmgObject['var hit'] = Math.floor((dmgObject['var hit'] * boost) / 10000);

    return dmgObject;
}

function calc_bonus_damage(settings, dmgObject) {
    let min_hit = dmgObject['min hit'];
    let var_hit = dmgObject['var hit'];

    if (abils[settings['ability']]['main style'] === 'melee') {
        // frostblades (leng off-hand effects)
        if (
            (settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.LENG ||
                settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER) &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
            settings[SETTINGS.FROSTBLADES] === true
        ) {
            min_hit += Math.floor(0.24 * dmgObject['boosted AD']);
        }
    }

    dmgObject['min hit'] = min_hit;
    dmgObject['var hit'] = var_hit;

    return dmgObject;
}

function calc_core(settings, dmgObject, key) {
    for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
        // berserker's fury
        dmgObject[key]['damage list'][i] = Math.floor(
            dmgObject[key]['damage list'][i] * (1 + settings[SETTINGS.BERSERKERS_FURY] / 100)
        );

        // dharock's gear (proc based, so added later)

        // store damage into bolg
        if (
            settings[SETTINGS.TH] === 'bolg' &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 7 ||
                (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 3 &&
                    settings[SETTINGS.BALANCE_BY_FORCE] === true))
        ) {
            if (!('bolg damage' in settings)) {
                settings['bolg damage'] = create_object(settings);
            }
            settings['bolg damage'][key]['damage list'].push(dmgObject[key]['damage list'][i]);
        }

        // crits
        if (dmgObject['crit'] === true && abils[settings['ability']]['crit effects'] === true) {
            dmgObject[key]['damage list'][i] = Math.floor(
                dmgObject[key]['damage list'][i] * (1 + calc_crit_damage(settings))
            );
        }

        // store bloat damages
        if (settings['ability'] === ABILITIES.BLOAT) {
            if (!('bloat damage' in settings)) {
                settings['bloat damage'] = create_object(settings);
            }
            settings['bloat damage'][key]['damage list'].push(dmgObject[key]['damage list'][i]);
        }
    }
    return dmgObject[key];
}

function calc_crit_damage(settings) {
    let crit_buff = 0.5; // base

    // smoke cloud
    if (settings[SETTINGS.SMOKE_CLOUD] === true) {
        if (abils[settings['ability']]['main style'] === 'magic') {
            crit_buff += 0.15;
        } else {
            crit_buff += 0.06;
        }
    }

    return crit_buff;
}

function calc_on_npc(settings, dmgObject) {
    for (let i = 0; i < dmgObject['damage list'].length; i++) {
        // set haunted
        let haunted = Math.min(
            Math.floor(dmgObject['damage list'][i] * 0.1),
            Math.floor(0.2 * settings['haunted AD'])
        );

        // vulnerability / curse
        if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.VULNERABILITY) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
        } else if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.CURSE) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
        }

        // enduring ruin bleed (gop)
        if (
            settings['enduring ruin - bleed'] === 'regular' &&
            abils[settings['ability']]['ability classification'] === 'bleed'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
        } else if (
            settings['enduring ruin - bleed'] === 'enhanced' &&
            abils[settings['ability']]['ability classification'] === 'bleed'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.25);
        }

        // wilderness puzzlebox
        if (settings['wilderness puzzlebox'] > 1) {
            dmgObject['damage list'][i] = Math.floor(
                dmgObject['damage list'][i] * (1 + 0.03 + settings['wilderness puzzlebox'])
            );
        }

        // croesus deathspores (crypt flanking)
        if (settings[SETTINGS.CRYPTBLOOM] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
        }

        // zamorak's guardian triumph
        if (
            settings['guardian triump'] === true &&
            abils[settings['ability']]['ability type'] === 'basic'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
        }

        // undead slayer perk
        if (settings[SETTINGS.SLAYER_PERK_UNDEAD] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // undead slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL_UNDEAD] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // dragon slayer perk
        if (settings[SETTINGS.SLAYER_PERK_DRAGON] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // dragon slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL_DRAGON] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // demon slayer perk
        if (settings[SETTINGS.SLAYER_PERK_DEMON] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // demon slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL_DEMON] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // nopenopenope (pof spider buff)
        dmgObject['damage list'][i] = Math.floor(
            dmgObject['damage list'][i] * (1 + settings[SETTINGS.NOPE])
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
        if (settings[SETTINGS.BODY] === 'ghost hunter body') {
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
        if (settings['two-hand weapon'] === 'vanquish') {
            dmgObject['damage list'][i] = Math.floor(
                dmgObject['damage list'][i] * (1 + 0.05 * settings['quest deaths'])
            );
        }

        // zerk auras
        if (
            settings[SETTINGS.AURA] === 'maniacal' &&
            abils[settings['ability']]['main style'] === 'magic'
        ) {
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
        if (
            settings[SETTINGS.AURA] === 'mahjarrat' &&
            abils[settings['ability']]['damage type'] !== 'spirit'
        ) {
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
        if (settings[SETTINGS.HAUNTED] === true) {
            dmgObject['damage list'][i] = dmgObject['damage list'][i] + haunted;
        }

        // essence corruption 25 stack bonus
        if (
            abils[settings['ability']]['damage type'] === 'magic' &&
            settings[SETTINGS.ESSENCE_CORRUPTION] >= 25
        ) {
            dmgObject['damage list'][i] =
                dmgObject['damage list'][i] +
                settings[SETTINGS.MAGIC_LEVEL] +
                settings[SETTINGS.ESSENCE_CORRUPTION];
        }

        // necklace of salamancy
        if (settings[SETTINGS.NECKLACE] === 'necklace of salamancy') {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
        }

        // anachronia slayer lodge buff
        // dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * (1 + settings['anachronia slayer lodge buff']));

        // store damage into soul split
        settings['soul split'] = dmgObject;

        // hit cap
        dmgObject['damage list'][i] = Math.min(dmgObject['damage list'][i], 30000);
    }
    return dmgObject;
}

function roll_damage(settings, dmgObject, key) {
    let min_hit = dmgObject[key]['min hit'];
    let var_hit = dmgObject[key]['var hit'];
    let dmg_list = [];
    for (let i = 0; i <= var_hit; i++) {
        dmg_list.push(min_hit + i);
    }

    // store corruption shot/blast damage
    if ([ABILITIES.CORRUPTION_BLAST, ABILITIES.CORRUPTION_SHOT].includes(settings['ability'])) {
        if (!('corruption damage' in settings)) {
            settings['corruption damage'] = create_object(settings);
        }
        settings['corruption damage'][key]['damage list'] = dmg_list;
    }

    // store deadshot damage
    if ([ABILITIES.DEADSHOT_INITIAL, ABILITIES.MASSACRE_INITIAL].includes(settings['ability'])) {
        if (!('deadshot massacre damage' in settings)) {
            settings['deadshot massacre damage'] = create_object(settings);
        }
        settings['deadshot massacre damage'][key]['damage list'] = dmg_list;
    }

    // store igneous cleave damage
    if (settings['ability'] === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        if (!('igneous cleave bleed damage' in settings)) {
            settings['igneous cleave bleed damage'] = create_object(settings);
        }
        settings['igneous cleave bleed damage'][key]['damage list'] = dmg_list;
    }
    return dmg_list;
}

function calc_on_hit(settings, dmgObject) {
    dmgObject = calc_precise(settings, dmgObject);
    dmgObject = calc_additive_boosts(settings, dmgObject);
    dmgObject = calc_multiplicative_shared_buffs(settings, dmgObject);
    dmgObject = calc_multiplicative_pve_buffs(settings, dmgObject);
    dmgObject = calc_bonus_damage(settings, dmgObject);

    return dmgObject;
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
        dmgObject[key] = set_min_var(settings, dmgObject[key]);
        // calc on hit effects
        if (abils[settings['ability']]['on-hit effects']) {
            dmgObject[key] = calc_on_hit(settings, dmgObject[key]);
        }
        // roll damage
        dmgObject[key]['damage list'] = roll_damage(settings, dmgObject, key);
        // calc core
        if (abils[settings['ability']]['on-hit effects']) {
            dmgObject[key] = calc_core(settings, dmgObject, key);
        }
        // calc on npc
        dmgObject[key] = calc_on_npc(settings, dmgObject[key]);

        // add split soul damage
        if (
            settings['split soul'] === true &&
            ['magic', 'melee', 'ranged', 'necrotic'].includes(
                abils[settings['ability']]['damage type']
            )
        ) {
            dmgObject[key] = add_split_soul(settings, dmgObject[key]);
        }
    }
    // get user value
    return get_user_value(settings, dmgObject);
}

function calc_bolg(settings) {
    settings['ability'] = 'bolg proc';

    // calc base bolg damage
    let bolg_base = calc_damage_object(settings);

    settings['ability'] = 'bolg proc percentages';
    let bolg_damage_based = create_object(settings);

    // calc the damage based proc
    for (let key in bolg_damage_based) {
        bolg_damage_based[key]['base AD'] = calc_base_ad(settings);
        bolg_damage_based[key]['boosted AD'] = calc_boosted_ad(settings, bolg_damage_based[key]);
        let dmg_list = [];
        // take every single element of dmgobject and add the relevant percentage ranges as individual hits to bolg_damage_based with the same key
        for (let element in settings['bolg damage'][key]['damage list']) {
            bolg_damage_based[key]['min hit'] = Math.floor(
                element * abils[settings['ability']]['min hit']
            );
            bolg_damage_based[key]['var hit'] = Math.floor(
                element * abils[settings['ability']]['var hit']
            );
            bolg_damage_based[key] = calc_on_hit(settings, bolg_damage_based[key]);

            for (
                let i = bolg_damage_based[key]['min hit'];
                i <= bolg_damage_based[key]['var hit'];
                i++
            ) {
                dmg_list.push(i);
            }
        }
        bolg_damage_based[key]['damage list'] = dmg_list;

        bolg_damage_based[key] = calc_core(settings, bolg_damage_based, key);
        bolg_damage_based[key] = calc_on_npc(settings, bolg_damage_based[key]);
        bolg_damage_based[key] = add_split_soul(settings, bolg_damage_based[key]);
    }

    const bolg_perc_damage = get_user_value(settings, bolg_damage_based);

    return bolg_perc_damage + bolg_base;
}

function calc_bloat(settings) {
    let bloat_dot = create_object(settings);
    for (let key in settings['bloat damage']) {
        for (let dmg in settings['bloat damage'][key]['damage list']) {
            bloat_dot[key]['damage list'].push(
                Math.floor(settings['bloat damage'][key]['damage list'][dmg] / 4)
            );
        }
        bloat_dot[key] = calc_on_npc(settings, bloat_dot[key]);
    }
    const dmg = get_user_value(settings, bloat_dot);
    return 10 * dmg;
}

function calc_deadshot_massacre(settings) {
    settings['ability'] = ABILITIES.DEADSHOT_BLEED;
    let dmgObject = create_object(settings);
    for (let key in dmgObject) {
        dmgObject[key]['base AD'] = calc_base_ad(settings);
        dmgObject[key]['boosted AD'] = calc_boosted_ad(settings, dmgObject[key]);
        dmgObject[key] = set_min_var(settings, dmgObject[key]);
        dmgObject[key]['damage list'] = roll_damage(settings, dmgObject, key);
    }

    // dmgObject = get_user_value(settings, dmgObject); // TODO: remove if not needed
    return 1;
}

function calc_corruption(settings) {
    let total_dmg = 0;
    let previous_splat = { ...settings['corruption damage'] };
    for (let splat = 1; splat <= 4; splat++) {
        let corruption_splat = create_object(settings);
        let dmg_list = [];
        for (let key in corruption_splat) {
            for (let dmg_loc = 0; dmg_loc < previous_splat[key]['damage list'].length; dmg_loc++) {
                let dmg =
                    previous_splat[key]['damage list'][dmg_loc] -
                    Math.floor(0.2 * settings['corruption damage'][key]['damage list'][dmg_loc]);
                dmg_list.push(dmg);
            }
            corruption_splat[key]['damage list'] = dmg_list;
            corruption_splat[key] = calc_on_npc(settings, corruption_splat[key]);
            total_dmg += get_user_value(settings, corruption_splat);
            previous_splat = corruption_splat;
        }
    }
    return total_dmg;
}

function calc_fsoa(settings) {
    settings['ability'] = 'time strike';
    // call double next tick

    return Math.floor(calc_crit_chance(settings) * calc_damage_object(settings));
}

function calc_sgb(settings, dmg) {
    const hits = [0, 1.16, 1.64, 2.44, 3.56, 5.0];
    const size = Math.min(settings[SETTINGS.TARGET_SIZE], 5);

    return Math.floor(dmg * (hits[size] - 1));
}

function calc_igneous_bleed(settings) {
    let total_damage = 0;
    const total_hits = 6 + settings[SETTINGS.IGNEOUS_EXTENSIOS];
    let previous_splat = settings['igneous cleave bleed damage'];
    for (let hit = 2; hit <= total_hits; hit++) {
        let bleed_hit = create_object(settings);
        for (let key in previous_splat) {
            for (let dmg in previous_splat[key]['damage list']) {
                bleed_hit[key]['damage list'].push(
                    Math.floor(previous_splat[key]['damage list'][dmg] * 1.05)
                );
            }
            bleed_hit[key] = calc_on_npc(settings, bleed_hit[key]);
        }
        total_damage += get_user_value(settings, bleed_hit);
        previous_splat = { ...bleed_hit };
    }
    return total_damage;
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
    if (aos_amulets.includes(settings['amulet'])) {
        heal = heal * 1.1875;
    }

    return Math.floor(heal);
}

function get_user_value(settings, dmgObject) {
    if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MEAN) {
        return get_mean_damage(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MEAN_NO_CRIT) {
        return get_mean_no_crit(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MEAN_CRIT) {
        return get_mean_crit(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_NO_CRIT) {
        return get_min_no_crit(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_CRIT) {
        return get_min_crit(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_NO_CRIT) {
        return get_max_no_crit(dmgObject);
    } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_CRIT) {
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
            let highest_hit =
                dmgObject[key]['damage list'][dmgObject[key]['damage list'].length - 1];
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
            let highest_hit =
                dmgObject[key]['damage list'][dmgObject[key]['damage list'].length - 1];
            if (highest_hit > max_hit) {
                max_hit = highest_hit;
            }
        }
    }
    return max_hit;
}

function style_specific_unification(settings) {
    if (abils[settings['ability']]['main style'] === 'magic') {
        settings[SETTINGS.MH] = settings[SETTINGS.MAGIC_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.MAGIC_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.MAGIC_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.MAGIC_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.MAGIC_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.MAGIC_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.MAGIC_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.MAGIC_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.MAGIC_PRAYER];
    } else if (abils[settings['ability']]['main style'] === 'ranged') {
        settings[SETTINGS.MH] = settings[SETTINGS.RANGED_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.RANGED_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.RANGED_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.RANGED_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.RANGED_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.RANGED_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.RANGED_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.RANGED_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.RANGED_PRAYER];
    } else if (abils[settings['ability']]['main style'] === 'melee') {
        settings[SETTINGS.MH] = settings[SETTINGS.MELEE_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.MELEE_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.MELEE_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.MELEE_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.MELEE_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.MELEE_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.MELEE_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.MELEE_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.MELEE_PRAYER];
    } else if (abils[settings['ability']]['main style'] === 'necromancy') {
        settings[SETTINGS.MH] = settings[SETTINGS.NECRO_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.NECRO_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.NECRO_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.NECRO_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.NECRO_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.NECRO_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.NECRO_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.NECRO_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.NECRO_PRAYER];
    }
    return settings;
}

function hit_damage_calculation(settings) {
    settings = style_specific_unification(settings); // initialise some settings
    let total_damage = calc_damage_object(settings); // calculate the ability

    // handle sgb logic
    if (settings['ability'] === ABILITIES.CRYSTAL_RAIN) {
        total_damage += calc_sgb(settings, total_damage);
    }

    // handle bolg logic
    if ('bolg damage' in settings) {
        total_damage += calc_bolg(settings);
        delete settings['bolg damage'];
    }

    // handle bloat logic
    if (settings['ability'] === SETTINGS.BLOAT) { // TODO: fix missing reference for SETTINGS.BLOAT
        total_damage += calc_bloat(settings);
        delete settings['bloat damage'];
    }

    // handle corruption shot/blast
    if ('corruption damage' in settings) {
        total_damage += calc_corruption(settings);
        delete settings['corruption damage'];
    }

    // handle bloat/massacre
    if ('deadshot massacre damage' in settings) {
        total_damage += calc_deadshot_massacre(settings);
        delete settings['deadshot massacre damage'];
    }

    // handle instability (fsoa)
    if (settings['instability'] === true && abils[settings['ability']]['damage type'] === 'magic') {
        total_damage += calc_fsoa(settings);
    }

    // handle igneous cleave bleed
    if (settings['ability'] === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        total_damage += calc_igneous_bleed(settings);
    }

    return total_damage;
}

function ability_damage_calculation(settings) {
    let rotation = get_rotation(settings);
    let damage = 0;
    for (let key in rotation) {
        for (let iter = 0; iter < rotation[key].length; iter++) {
            if (rotation[key][iter] === 'next cast') {
                settings = next_cast(settings);
            } else if (rotation[key][iter] === 'next hit') {
                settings = next_hit(settings);
            } else {
                settings['ability'] = rotation[key][iter];
                damage += hit_damage_calculation(settings);
            }
        }
        settings = next_tick(settings);
    }
    return damage;
}

function get_rotation(settings) {
    let rotation = JSON.parse(JSON.stringify(abils[settings['ability']]['hits']));

    if (settings['ability'] === ABILITIES.GREATER_RICOCHET) {
        for (let i = 1; i <= settings[SETTINGS.CAROMING]; i++) {
            rotation[1].push('next hit');
            rotation[1].push(ABILITIES.GREATER_RICOCHET_3);
        }
    }
    return rotation;
}

export { ability_damage_calculation, hit_damage_calculation };
