import { next_cast, next_hit, next_tick } from './ability_helper';
import { ABILITIES, abils, armour, gear, prayers, weapons } from './const';
import { create_object } from './object_helper';
import { SETTINGS } from './settings';

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
                    0.5 * (Math.floor(2.5 * settings[SETTINGS.MAGIC_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        ))
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
                    0.5 * (Math.floor(2.5 * settings[SETTINGS.STRENGTH_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        ))
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
                    0.5 * (Math.floor(2.5 * settings[SETTINGS.RANGED_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        ))
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
        if (settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW) {
            let AD_mh =
                Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
                Math.floor(
                    9.6 * calc_weapon_tier(settings, 'main-hand weapon') + calc_bonus(settings)
                );

            let AD_oh = 0;
            if (weapons[settings[SETTINGS.OH]]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor(
                    0.5 * (Math.floor(2.5 * settings[SETTINGS.NECROMANCY_LEVEL]) +
                        Math.floor(
                            9.6 * calc_weapon_tier(settings, 'off-hand weapon') +
                                calc_bonus(settings)
                        ))
                );
            }

            base_AD = AD_mh + AD_oh;
        }
    }

	// base damage buffs (eruptive / equilibrium)
	let buff = 1 + settings[SETTINGS.ERUPTIVE] * 0.005;
	if (settings[SETTINGS.AURA] === 'equilibrium') {
        buff += 0.12;
    }
    base_AD = Math.floor(base_AD * buff);

    return base_AD;
}

function calc_weapon_tier(settings, hand) {
    let ammo_tier = 999;
    if (abils[settings['ability']]['main style'] === 'ranged') {
        if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.CUSTOM) {
            ammo_tier = settings[SETTINGS.AMMO_TIER];
        }
        else {
            ammo_tier = weapons[settings[SETTINGS.AMMO]]['tier'];
        }
    }

    let weapon_tier = 0;
    // custom weapon tier
    if (
        settings[hand] === 'custom' ||
        settings[hand] === 'custom oh' ||
        settings[hand] === 'custom th'
    ) {
        weapon_tier = settings[hand + ' custom tier'];
    }
    // standard weapon
    else {
        weapon_tier = weapons[settings[hand]]['tier'];
    }
    let tier = Math.min(weapon_tier, ammo_tier);

    // innate mastery (shard of genesis essence)
    if (weapon_tier === 95 && settings[SETTINGS.INNATE_MASTERY] === true) {
        tier += 5;
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
    let hit_chance = 1;
    if (abils[settings['ability']]['damage potential effects'] === true) {
        hit_chance = Math.min(settings[SETTINGS.HIT_CHANCE] / 100, 1);
    }
    return Math.floor(dmgObject['base AD'] * hit_chance);
}

// calculate boosted AD
function calc_boosted_ad(settings, dmgObject) {
    let base_ad_boost = calc_damage_potential(settings, dmgObject);

    if (abils[settings['ability']]['main style'] === 'magic') {
        // inq staff
        if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'inquisitor staff'
        ) {
            //boosted_AD = Math.floor(boosted_AD * 1.125);
            base_ad_boost = Math.floor(1.125 * base_ad_boost);
        }

        // inq staff upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'inquisitor staff+'
        ) {
            //boosted_AD = Math.floor(boosted_AD * 1.175);
            base_ad_boost = Math.floor(1.175 * base_ad_boost);
        }

        // crumble undead
        if (settings[SETTINGS.AUTO_CAST] === SETTINGS.AUTO_CAST_VALUES.CRUMBLE_UNDEAD) {
            base_ad_boost = Math.floor(1.3 * base_ad_boost);
        }

        // flow stacks
        if (abils[settings['ability']]['main style'] === 'magic') {
            base_ad_boost = Math.floor((1 + 0.01 * settings[SETTINGS.FLOW_STACKS]) * base_ad_boost);
        }

        let tumekens_resplendence = 0;
        if (settings[SETTINGS.MAGIC_HELMET] === SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE) {
            tumekens_resplendence += 1;
        }
        if (settings[SETTINGS.MAGIC_BODY] === SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE) {
            tumekens_resplendence += 1;
        }
        if (settings[SETTINGS.MAGIC_LEGS] === SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE) {
            tumekens_resplendence += 1;
        }
        if (settings[SETTINGS.MAGIC_BOOTS] === SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE) {
            tumekens_resplendence += 1;
        }
        if (settings[SETTINGS.MAGIC_GLOVES] === SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE) {
            tumekens_resplendence += 1;
        }
        if (settings[SETTINGS.SUNSHINE] === true && tumekens_resplendence >= 3) {
            base_ad_boost = Math.floor(1.5 * base_ad_boost);
        }
    }

    if (abils[settings['ability']]['main style'] === 'melee') {
        // terrasaur maul
        if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'terrasaur maul'
        ) {
            base_ad_boost = Math.floor(1.125 * base_ad_boost);
        }

        // terrasaur maul upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'terrasaur maul+'
        ) {
            base_ad_boost = Math.floor(1.175 * base_ad_boost);
        }

        // keris
        if (settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW) {
            if ([SETTINGS.MELEE_MH_VALUES.KERIS, SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS, SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS].includes(settings[SETTINGS.MH])) {
                base_ad_boost = Math.floor(1.333 * base_ad_boost);
            }
            else if ([SETTINGS.MELEE_MH_VALUES.KERIS_PROC, SETTINGS.MELEE_MH_VALUES.PRIMED_KERIS_PROC, SETTINGS.MELEE_MH_VALUES.CONSECRATED_KERIS_PROC].includes(settings[SETTINGS.MH])) {
                base_ad_boost = 2 * base_ad_boost;
            }
        }

        // chaos roar
        if (settings['chaos roar'] === true) {
            base_ad_boost = 2 * base_ad_boost;
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // hex bow
        if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'hexhunter bow'
        ) {
            base_ad_boost = Math.floor(1.125 * base_ad_boost);
        }

        // hex bow upgraded
        else if (
            settings[SETTINGS.WEAPON] === 'two-hand' &&
            settings['two-hand weapon'] === 'hexhunter bow+'
        ) {
            base_ad_boost = Math.floor(1.175 * base_ad_boost);
        }

        // icy precision (wen arrows)
        const wen_arrow_abil_types_buffed = ['threshold', 'ultimate', 'special attack'];
        if (
            wen_arrow_abil_types_buffed.includes(abils[settings['ability']]['ability type']) &&
            settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS
        ) {
            base_ad_boost = Math.floor((1 +0.02 * settings[SETTINGS.ICY_PRECISION]) * base_ad_boost);
        }
    }

    // necromancy has no (known) buffs of this type

    // Scripture of Amascut
    if (settings[SETTINGS.POCKET] === 'scripture of amascut') {
        base_ad_boost = Math.floor(1.1 * base_ad_boost);
    }

    return base_ad_boost;
}

function ability_specific_effects(settings, dmgObject) {
    // order of these effects in unknown and should be researched properly still.
    if (abils[settings['ability']]['main style'] === 'magic') {
        // auto attack
        if (settings['ability'] === ABILITIES.MAGIC_AUTO) {
            let hand_modifier = 1;
            if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.MH) {
                hand_modifier = 1;
            } else if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.OH) {
                hand_modifier = 0.5;
            } else {
                hand_modifier = 1.5;
            }
            dmgObject['boosted AD'] = Math.floor(Math.floor(dmgObject['boosted AD'] * hand_modifier));
        }

        // conflagrate
        if (settings['ability'] === ABILITIES.COMBUST_HIT && settings[SETTINGS.CONFLAGRATE] === true) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.4);
        }

        // song of destruction 2 item set effect
        if (
            ['bleed', 'burn', 'dot'].includes(abils[settings['ability']]['ability classification']) && 
                settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING && 
                settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT && 
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }

        // kerapac's wristwraps
        if (settings['ability'] === ABILITIES.COMBUST_HIT) {
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
        }

        // combust lunging
        if (settings['ability'] === ABILITIES.COMBUST_HIT) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * (1+0.06*settings[SETTINGS.LUNGING]));
        }

        // combust walk
        if (settings['ability'] === ABILITIES.COMBUST_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
            if (settings[SETTINGS.LUNGING]>0) {
                dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.5);
            }
            else {
                dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2);
            }
        }

        // wrack bound
        if (
            settings['ability'] === 'wrack' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }

        // wrack and ruin bound
        if (
            settings['ability'] === 'wrack and ruin' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.6);
        }

        // wrack energising
        if (settings['ability'] === ABILITIES.WRACK && settings[SETTINGS.ENERGISING] > 0) {
            dmgObject['boosted AD'] = Math.floor(0.8 * dmgObject['boosted AD']);
        }

        // wrack and ruin energising
        if (settings['ability'] === ABILITIES.WRACK_AND_RUIN && settings[SETTINGS.ENERGISING] > 0) {
            dmgObject['boosted AD'] = Math.floor(0.8 * dmgObject['boosted AD']);
        }

        // greater chain half damage
        const gchain_not_halved = ['bleed', 'burn', 'dot'];
        if (
            gchain_not_halved.includes(abils[settings['ability']][['ability classification']] === false)
        ) {
            dmgObject[boosted_AD] = Math.floor(dmgObject[boosted_AD] * 0.5);
        }
    }

    if (abils[settings['ability']]['main style'] === 'melee') {
        // auto attack
        if (settings['ability'] === ABILITIES.MELEE_AUTO) {
            let hand_modifier = 1;
            if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.MH) {
                hand_modifier = 1;
            } else if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.OH) {
                hand_modifier = 0.5;
            } else {
                hand_modifier = 1.5;
            }
            dmgObject['boosted AD'] = Math.floor(Math.floor(dmgObject['boosted AD'] * hand_modifier));
        }

        // slice bound
        if (
            settings['ability'] === 'slice' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.4);
        }

        // slice energising
        if (settings['ability'] === ABILITIES.SLICE && settings[SETTINGS.ENERGISING] > 0) {
            dmgObject['boosted AD'] = Math.floor(0.8 * dmgObject['boosted AD'])
        }

        // dismember lunging
        if (settings['ability'] === ABILITIES.DISMEMBER_HIT) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * (1 + 0.06 * settings[SETTINGS.LUNGING]));
        }

        // slaughter walk
        if (settings['ability'] === ABILITIES.SLAUGHTER_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 3);
        }

        // punish low
        if (settings['ability'] === ABILITIES.PUNISH && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2.5);
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // auto attack
        if (settings['ability'] === ABILITIES.RANGED_AUTO) {
            let hand_modifier = 1;
            if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.MH) {
                hand_modifier = 1;
            } else if (settings[SETTINGS.AUTO_HAND] === SETTINGS.AUTO_HAND_VALUES.OH) {
                hand_modifier = 0.5;
            } else {
                hand_modifier = 1.5;
            }
            dmgObject['boosted AD'] = Math.floor(Math.floor(dmgObject['boosted AD'] * hand_modifier));
        }

        // piercing shot bound
        if (
            settings['ability'] === 'piercing shot' &&
            (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.3);
        }

        // piercing energising
        if (settings['ability'] === ABILITIES.PIERCING_SHOT_HIT && settings[SETTINGS.ENERGISING] > 0) {
            dmgObject['boosted AD'] = Math.floor(0.8 * dmgObject['boosted AD']);
        }

        // frag lunging
        if (settings['ability'] === ABILITIES.FRAGMENTATION_SHOT_HIT) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * (1+0.06*settings[SETTINGS.LUNGING]));
        }

        // frag walk
        if (settings['ability'] === ABILITIES.FRAGMENTATION_SHOT_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
            if (settings[SETTINGS.LUNGING]>0) {
                dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.5);
            }
            else {
                dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2);
            }
        }
    }

    if (abils[settings['ability']]['main style'] === 'necromancy') {
        // death spark (omni guard passive)
        if (settings['death spark'] === true && settings['ability'] === 'necromancy auto') {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 2);
        }

        // living death - finger of death
        if (
            settings[SETTINGS.LIVING_DEATH] === true &&
            settings['ability'] === ABILITIES.FINGER_OF_DEATH
        ) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * 1.5);
        }

        // skeleton warrior stacks
        if (settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO) {
            dmgObject['boosted AD'] = Math.floor(
                dmgObject['boosted AD'] *
                    (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS])
            );
        }

        // valour / phantom guardian stacks
        if (settings['ability'] === ABILITIES.COMMAND_PHANTOM_GUARDIAN) {
            dmgObject['boosted AD'] = Math.floor(
                dmgObject['boosted AD'] *
                    (1 + 0.2 * settings[SETTINGS.VALOUR_STACKS])
            );
        }

        // scythe 3
        if (settings['ability'] === ABILITIES.SPECTRAL_SCYTHE_3) {
            dmgObject['boosted AD'] = Math.floor(dmgObject['boosted AD'] * (1 + (1-settings[SETTINGS.TARGET_HP_PERCENT]/100)));
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
            min_percent = min_percent + 0.45 * (settings[SETTINGS.DETONATE]/20); // TODO: fix missing reference for SETTINGS.DETONATE
            var_percent = var_percent + 0.1 * (settings[SETTINGS.DETONATE]/20);
        }

        // flank
        if (settings['ability'] === ABILITIES.IMPACT) {
            min_percent += min_percent * 0.4 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.4 * settings[SETTINGS.FLANKING];
        }

        if (settings['ability'] === ABILITIES.DEEP_IMPACT) {
            min_percent += min_percent * 0.15 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.15 * settings[SETTINGS.FLANKING];
        }

        // asphyxiate
        if (settings['ability'] === ABILITIES.ASPHYXIATE_HIT) {
            let tumekens_resplendence = 0;
            if (settings[SETTINGS.MAGIC_HELMET] === SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_BODY] === SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_LEGS] === SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_BOOTS] === SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_GLOVES] === SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (tumekens_resplendence >= 3) {
                min_percent = 0.825;
                var_percent = 0.15;
            }
        }
    }

    if (abils[settings['ability']]['main style'] === 'melee') {
        // greater barge tick bonus
        if (settings['ability'] === ABILITIES.GREATER_BARGE) {
            min_percent = min_percent + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
            var_percent = var_percent + Math.min(0.07 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
        }

        // icy tempest
        if (
            settings['ability'] === ABILITIES.ICY_TEMPEST_1 ||
            settings['ability'] === ABILITIES.ICY_TEMPEST_2
        ) {
            min_percent += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
            var_percent += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
        }

        // flank
        if (settings['ability'] === ABILITIES.BACKHAND) {
            min_percent += min_percent * 0.4 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.4 * settings[SETTINGS.FLANKING];
        }

        if (settings['ability'] === ABILITIES.FORCEFUL_BACKHAND) {
            min_percent += min_percent * 0.15 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.15 * settings[SETTINGS.FLANKING];
        }

        // bolstered smash
        if (settings['ability'] === ABILITIES.SMASH && settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.EZK) {
            min_percent = 1.6;
            var_percent = 0.2;
        }
    }

    if (abils[settings['ability']]['main style'] === 'ranged') {
        // salt the wound stack bonus
        if (settings['ability'] === 'salt the wound') {
            min_percent = min_percent + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
            var_percent = var_percent + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
        }

        // flank
        if (settings['ability'] === ABILITIES.BINDING_SHOT) {
            min_percent += min_percent * 0.4 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.4 * settings[SETTINGS.FLANKING];
        }

        if (settings['ability'] === ABILITIES.TIGHT_BINDINGS) {
            min_percent += min_percent * 0.15 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.15 * settings[SETTINGS.FLANKING];
        }
    }

    if (abils[settings['ability']]['main style'] === 'necromancy') {
        // death grasp (death guard spec)
        if (settings['ability'] === ABILITIES.DEATH_GRASP) {
            min_percent = min_percent + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
        }

        // soul crush
        if (settings['ability'] === ABILITIES.SOUL_CRUSH) {
            min_percent += 1.35 * settings[SETTINGS.RESIDUAL_SOULS];
            var_percent += 0.3 * settings[SETTINGS.RESIDUAL_SOULS];
        }

        // flank
        if (settings['ability'] === ABILITIES.SOUL_STRIKE) {
            min_percent += min_percent * 0.4 * settings[SETTINGS.FLANKING];
            var_percent += var_percent * 0.4 * settings[SETTINGS.FLANKING];
        }
    }

    
    dmgObject['min hit'] = Math.max(Math.floor(min_percent * dmgObject['boosted AD']), 0);
    dmgObject['var hit'] = Math.max(Math.floor(var_percent * dmgObject['boosted AD']), 0);
    return dmgObject;
}

function calc_style_specific(settings, dmgObject) {
    if (abils[settings['ability']]['on-hit effects'] === true) {
        if (abils[settings['ability']]['main style'] === 'ranged') {
            // add bolg damage (rot builder)
            if (settings['ability'] === 'bolg proc' && Array.isArray(settings['bolg damage'])) {
                dmgObject['min hit'] += Math.floor(settings['bolg damage'][0]['crit']['damage list'][0] * 0.33);
                dmgObject['var hit'] += Math.floor(settings['bolg damage'][0]['crit']['damage list'][settings['bolg damage'][0]['crit']['damage list'].length-1] * 0.37 -
                    settings['bolg damage'][0]['crit']['damage list'][0] * 0.33
                );
            }

            // add bolg damage (damage sheets)
            else if (settings['ability'] === 'bolg proc') {
                dmgObject['min hit'] += Math.floor(settings['bolg damage']['crit']['damage list'][0] * 0.33);
                dmgObject['var hit'] += Math.floor(settings['bolg damage']['crit']['damage list'][settings['bolg damage']['crit']['damage list'].length-1] * 0.37 -
                    settings['bolg damage']['crit']['damage list'][0] * 0.33
                );
            }

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
                settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.JAS_ARROWS
            ) {
                dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.3);
                dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.3);
            }

            // ful arrows
            //TODO check you're actually using a bow
            if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.FUL_ARROWS) {
                dmgObject['min hit'] = Math.floor(dmgObject['min hit'] * 1.15);
                dmgObject['var hit'] = Math.floor(dmgObject['var hit'] * 1.15);
            }

            // enchanted bolts (proc based, will come later)
            // sirenic set effect (proc based, will come later)
            // gemstone armour effect (proc based, will come later)

            // pernix quiver
            if (
                settings[SETTINGS.QUIVER] === true &&
                settings[SETTINGS.TARGET_HP_PERCENT] <= 25
            ) {
                dmgObject['var hit'] = Math.floor(
                    (dmgObject['var hit'] += 0.04 * (dmgObject['min hit'] + dmgObject['var hit']))
                );
            }
        }
    }
    return dmgObject;
}

function calc_precise(settings, dmgObject) {
    // calculate precise
    let max_hit = dmgObject['min hit'] + dmgObject['var hit'];
    dmgObject['min hit'] = dmgObject['min hit'] + Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit);
    dmgObject['var hit'] = Math.max(0, dmgObject['var hit'] - Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit));

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

    // berserker necklace
    if (settings[SETTINGS.NECKLACE] === SETTINGS.NECKLACE_VALUES.BERSERKER &&
        settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.EZK && settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        boost += 0.05;
    }

    // Flamebound rival
    if ( (settings[SETTINGS.FLAMEBOUND_RIVAL] === true || settings['ability'] === ABILITIES.IGNEOUS_SHOWDOWN) && 
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH && 
        settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.EZK && 
        abils[settings['ability']]['main style'] === 'melee'
    ) {
         boost += 0.12;
    }

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

        if (['single-stat boosting', 'leech curse'].includes(prayers[settings[SETTINGS.PRAYER]]['category']) &&
            settings[SETTINGS.NECKLACE] === SETTINGS.NECKLACE_VALUES.ZEALOTS
        ) {
            boost += 0.1;
        }
    }
    if (settings[SETTINGS.DIVINE_RAGE] === true &&
        (prayers[settings[SETTINGS.PRAYER]]['book'] === "normal" || prayers[settings[SETTINGS.PRAYER]]['style'] === "none")) {
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
        let tumekens_resplendence = 0;
            if (settings[SETTINGS.MAGIC_HELMET] === SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_BODY] === SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_LEGS] === SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_BOOTS] === SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
            if (settings[SETTINGS.MAGIC_GLOVES] === SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE) {
                tumekens_resplendence += 1;
            }
        if (settings['sunshine'] === true && tumekens_resplendence <= 2) {
            boost = Math.floor(boost * 1.5);
        }

        // blood tithe (exsanguinate)
        if (abils[settings['ability']]['ability type'] === 'basic') {
            boost = Math.floor(boost * (1 + settings[SETTINGS.BLOOD_TITHE] / 100));
        }
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
        if (settings['zgs'] === true) {
            boost = Math.floor(boost * 1.25);
        }

        // dragon battleaxe
        if (settings['rampage'] === true) {
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
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
        ['shield', 'defender'].includes(weapons[settings[SETTINGS.OH]]['weapon type'])
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
        boost += Math.floor(boost * 0.05 * (1 - settings[SETTINGS.TARGET_HP_PERCENT] / 100));
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
            min_hit += Math.floor(0.24 * dmgObject['base AD']);
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
            settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 7 ||
                (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] >= 3 &&
                    settings[SETTINGS.BALANCE_BY_FORCE] === true))
        ) {
            if (!('bolg damage' in settings)) {
                settings['bolg damage'] = create_object(settings);
            }
            settings['bolg damage'][key]['damage list'].push(dmgObject[key]['damage list'][i]);
        }
        // crits
        if (dmgObject[key]['crit'] === true && abils[settings['ability']]['crit effects'] === true) {
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

        // store fsoa damage
        if (abils[settings['ability']]['crit effects'] === true 
            && settings['instability'] === true 
            && abils[settings['ability']]['damage type'] === 'magic' 
            && settings['ability'] != 'time strike') {
                if (!('fsoa damage' in settings)) {
                    settings['fsoa damage'] = create_object(settings);
                }
                settings['fsoa damage'][key]['damage list'].push(dmgObject[key]['damage list'][i]);
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

    // channelers ring
    if (
        (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER_E) &&
        abils[settings['ability']]['ability classification'] === 'channel' &&
        abils[settings['ability']]['main style'] === 'magic'
    ) {
        crit_buff += 0.025 * (1 + settings[SETTINGS.CHANNELER_RING_STACKS]);
    }

    // champions ring
    if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHAMPION_E &&
        abils[settings['ability']]['main style'] === 'melee'
    ) {
        crit_buff += 0.015 * settings[SETTINGS.NUMBER_OF_BLEEDS];
    }

    // stalkers ring
    if (abils[settings['ability']]['main style'] === 'ranged' &&
        settings[SETTINGS.RING] === SETTINGS.RING_VALUES.STALKER_E &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        (weapons[settings[SETTINGS.TH]]['type'] === 'bow' || settings[SETTINGS.TH_TYPE_CUSTOM] === SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW)) {
            crit_buff += 0.03;
        }

    // fsoa 22.5%
    if (settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.FSOA && settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
        if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_CRIT) {
            crit_buff += 0.3;
        }
        else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_CRIT) {
            crit_buff += 0.15;
        }
        else {
            crit_buff += 0.225;
        }
    }

    if (abils[settings['ability']]['main style'] === 'magic' && 
        settings[SETTINGS.TUMEKENS_RESPLENDENCE_ASPHYX] === true && 
        abils[settings['ability']]['ability classification'] != 'channel' &&
        abils[settings['ability']]['ability classification'] != 'proc' &&
        abils[settings['ability']]['ability classification'] != 'combatv2_passive_ability'
    ) {
        crit_buff += 0.5;
    }

    return crit_buff;
}

function calc_on_npc(settings, dmgObject, split_soul_flag = true) {
    
    for (let i = 0; i < dmgObject['damage list'].length; i++) {
        // set haunted
        let haunted = 0;

        if (settings[SETTINGS.DEVOURER_NEXUS] === true) {
            haunted = Math.min(
            Math.floor(dmgObject['damage list'][i] * 0.15),
            Math.floor(0.3 * settings['haunted AD']));
        } else {
            haunted = Math.min(
                Math.floor(dmgObject['damage list'][i] * 0.1),
                Math.floor(0.2 * settings['haunted AD']));
        }

        // vulnerability / curse
        if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.VULNERABILITY) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
        } else if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.CURSE) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
        }

        // enduring ruin bleed (gop)
        if (
            settings[SETTINGS.ENDURING_RUIN_BLEED] === SETTINGS.ENDURING_RUIN_BLEED_VALUES.REGULAR &&
            abils[settings['ability']]['ability classification'] === 'bleed'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
        } else if (
            settings[SETTINGS.ENDURING_RUIN_BLEED] === SETTINGS.ENDURING_RUIN_BLEED_VALUES.ENCHANTED &&
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
        /*if (
            settings['guardian triump'] === true &&
            abils[settings['ability']]['ability type'] === 'basic'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.2);
        }*/

        // undead slayer perk
        if (settings[SETTINGS.SLAYER_PERK] === SETTINGS.SLAYER_PERK_VALUES.UNDEAD) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // undead slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL] === SETTINGS.SLAYER_SIGIL_VALUES.UNDEAD) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // dragon slayer perk
        if (settings[SETTINGS.SLAYER_PERK] === SETTINGS.SLAYER_PERK_VALUES.DRAGON) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // dragon slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL] === SETTINGS.SLAYER_SIGIL_VALUES.DRAGON) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // demon slayer perk
        if (settings[SETTINGS.SLAYER_PERK] === SETTINGS.SLAYER_PERK_VALUES.DEMON) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.07);
        }

        // demon slayer sigil
        if (settings[SETTINGS.SLAYER_SIGIL] === SETTINGS.SLAYER_SIGIL_VALUES.DEMON) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // nopenopenope (pof spider buff)
        dmgObject['damage list'][i] = Math.floor(
            dmgObject['damage list'][i] * (1 + 0.01*settings[SETTINGS.NOPE])
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

        if (settings['meta'] === true && abils[settings['ability']]['damage type'] === 'magic') {
            dmgObject['damage list'][i] = Math.floor(1.66 * dmgObject['damage list'][i])
        }

        // zerk auras
        if(settings[SETTINGS.SUNSHINE] === false &&
        settings[SETTINGS.META] === false &&
        settings[SETTINGS.DEATH_SWIFTNESS] === false &&
        settings[SETTINGS.BERSERK] === false
        ) {
            if (
                settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.MANIACAL &&
                abils[settings['ability']]['damage type'] === 'magic'
            ) {
                dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
            } else if (
                settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.BERSERKER &&
                abils[settings['ability']]['damage type'] === 'melee'
            ) {
                dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
            } else if (
                settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.RECKLESS &&
                abils[settings['ability']]['damage type'] === 'ranged'
            ) {
                dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
            }
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
            settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.ELEMENTS &&
            abils[settings['ability']]['main style'] === 'magic'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
        } else if (
            settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS &&
            abils[settings['ability']]['main style'] === 'magic'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.0666);
        }

        // scrimshaw of cruelty
        if (
            settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.CRUELTY &&
            abils[settings['ability']]['main style'] === 'ranged'
        ) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.05);
        } else if (
            settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY &&
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
            settings[SETTINGS.ESSENCE_CORRUPTION] >= 25 &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
            (settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING ||
                settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT)
        ) {
            dmgObject['damage list'][i] =
                dmgObject['damage list'][i] +
                settings[SETTINGS.MAGIC_LEVEL] +
                settings[SETTINGS.ESSENCE_CORRUPTION];
        }

        // tokkul-zo
        if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.TOKKUL) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.1);
        }

        // necklace of salamancy
        if (settings[SETTINGS.NECKLACE] === 'necklace of salamancy') {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.15);
        }

        // balance of power
        if (settings[SETTINGS.BALANCE_OF_POWER] > 0) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * (1 + 0.06 * settings[SETTINGS.BALANCE_OF_POWER]));
        }

        // telos red beam
        if (settings[SETTINGS.TELOS_RED_BEAM] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 1.3);
        }

        // telos black beam
        if (settings[SETTINGS.TELOS_BLACK_BEAM] === true) {
            dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * 0.7);
        }

        // anachronia slayer lodge buff
        // dmgObject['damage list'][i] = Math.floor(dmgObject['damage list'][i] * (1 + settings['anachronia slayer lodge buff']));
    }
    // store damage into soul split
    if (split_soul_flag) {
        settings['soul split'] = JSON.parse(JSON.stringify(dmgObject));
    }

    // hit cap
    for (let i=0; i<dmgObject['damage list'].length; i++) {
        if (settings[SETTINGS.HITCAP] === true) {
            dmgObject['damage list'][i] = Math.min(dmgObject['damage list'][i], 30000);
        }
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
        settings['corruption damage'][key]['damage list'] = [...dmg_list];
    }

    // store igneous cleave damage
    if (settings['ability'] === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        if (!('igneous cleave bleed damage' in settings)) {
            settings['igneous cleave bleed damage'] = create_object(settings);
        }
        settings['igneous cleave bleed damage'][key]['damage list'] = [...dmg_list];
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

function calc_damage_object(settings,) {
    const dmgObject = create_object(settings);
    for (let key in dmgObject) {
        // calc base AD
        dmgObject[key]['base AD'] = calc_base_ad(settings);
        // calc buffed AD
        dmgObject[key]['boosted AD'] = calc_boosted_ad(settings, dmgObject[key]);
        // ability specific
        dmgObject[key] = ability_specific_effects(settings, dmgObject[key]);
        // set min var
        dmgObject[key] = set_min_var(settings, dmgObject[key]);
        // style specific
        dmgObject[key] = calc_style_specific(settings, dmgObject[key]);
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
    return bolg_base;
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
        bloat_dot[key] = add_split_soul(settings, bloat_dot[key]);
    }
    const dmg = get_user_value(settings, bloat_dot);
    return 10 * dmg;
}

function calc_corruption(settings) {
    let total_damage = 0;
    for (let splat=2; splat <=5; splat++) {
        let hit_dmg = JSON.parse(JSON.stringify(settings['corruption damage']));
        let multiplier = 1 - ((splat-1) * 0.2)
        for (let key in hit_dmg) {
            for (let i=0; i<hit_dmg[key]['damage list'].length; i++) {
                hit_dmg[key]['damage list'][i] = Math.floor(hit_dmg[key]['damage list'][i] * multiplier);
            }
            hit_dmg[key] = calc_on_npc(settings, hit_dmg[key]);
        }
        total_damage += get_user_value(settings, hit_dmg);
    }
    return total_damage;
}

function calc_fsoa(settings) {
    settings['ability'] = 'time strike';

    return Math.floor(settings['fsoa damage']['crit']['probability'] * calc_damage_object(settings));
}

function calc_sgb(settings, dmg) {
    const hits = [0, 1, 1.5, 2.33, 3.5, 5.0];
    const size = Math.min(settings[SETTINGS.TARGET_SIZE], 5);

    return Math.floor(dmg * (hits[size] - 1));
}

function calc_igneous_bleed(settings) { 
    let total_damage = 0;

    let total_hits = 6 + settings[SETTINGS.IGNEOUS_EXTENSIOS];
    if (settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.MW_SPEAR &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        total_hits += 3;
    }

    for (let splat=2; splat <=total_hits; splat++) {
        let hit_dmg = JSON.parse(JSON.stringify(settings['igneous cleave bleed damage']));
        for (let key in hit_dmg) {
            for (let i=0; i<hit_dmg[key]['damage list'].length; i++) {
                hit_dmg[key]['damage list'][i] = Math.floor(hit_dmg[key]['damage list'][i] * 1.05**(splat-1));
            }
            hit_dmg[key] = calc_on_npc(settings, hit_dmg[key]);
        }
        total_damage += get_user_value(settings, hit_dmg);
    }
    return total_damage;
}

function add_split_soul(settings, dmgObject) {
    if (settings[SETTINGS.SPLIT_SOUL]) {
        let split_soul_damage_object = {'damage list': []}
        for (let i = 0; i < dmgObject['damage list'].length; i++) {
            split_soul_damage_object['damage list'].push(calc_split_soul_hit(settings['soul split']['damage list'][i], settings));
        }
        split_soul_damage_object = calc_on_npc(settings, split_soul_damage_object, false);
        for (let i = 0; i < dmgObject['damage list'].length; i++) {
            dmgObject['damage list'][i] += split_soul_damage_object['damage list'][i];
        }
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
        heal += 0.0125 * hit;
    }

    // amulet of souls bonus healing
    const aos_amulets = [
        SETTINGS.NECKLACE_VALUES.AOS,
        SETTINGS.NECKLACE_VALUES.AOSOR,
        SETTINGS.NECKLACE_VALUES.EOF,
        SETTINGS.NECKLACE_VALUES.EOFOR
    ];
    if (aos_amulets.includes(settings['amulet'])) {
        heal = heal * 1.1875;
    }

    return Math.floor(heal);
}

function get_user_value(settings, dmgObject) {
    let divider = 1
    if (settings[SETTINGS.DAMAGE_PER_UNIT] === SETTINGS.DAMAGE_PER_UNIT_VALUES.TICK) {
        divider = 3;
    }
    divider = Math.max(divider, settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER])

    switch (settings[SETTINGS.MODE]) {
        case SETTINGS.MODE_VALUES.MEAN:
            return Math.floor(get_mean_damage(settings, dmgObject)/divider);
        case SETTINGS.MODE_VALUES.MEAN_NO_CRIT:
            return Math.floor(get_mean_no_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        case SETTINGS.MODE_VALUES.MEAN_CRIT:
            return Math.floor(get_mean_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        case SETTINGS.MODE_VALUES.MIN_NO_CRIT:
            return Math.floor(get_min_no_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        case SETTINGS.MODE_VALUES.MIN_CRIT:
            return Math.floor(get_min_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        case SETTINGS.MODE_VALUES.MAX_NO_CRIT:
            return Math.floor(get_max_no_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        case SETTINGS.MODE_VALUES.MAX_CRIT:
            return Math.floor(get_max_crit(settings, dmgObject)/settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER]);
        default:
            return null;
    }
}

function get_mean_damage(settings, dmgObject) {
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

function get_mean_no_crit(settings, dmgObject) {
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

function get_mean_crit(settings, dmgObject) {
    if (abils[settings['ability']]['crit effects'] === false ||
        dmgObject['crit']['probability'] === 0
    ) {
        return get_mean_damage(settings, dmgObject);
    }

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

function get_min_no_crit(settings, dmgObject) {
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

function get_min_crit(settings, dmgObject) {
    if (abils[settings['ability']]['crit effects'] === false ||
        dmgObject['crit']['probability'] === 0) {
        return get_min_no_crit(settings, dmgObject);
    }

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

function get_max_no_crit(settings, dmgObject) {
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

function get_max_crit(settings, dmgObject) {
    if (abils[settings['ability']]['crit effects'] === false ||
        dmgObject['crit']['probability'] === 0) {
        return get_max_no_crit(settings, dmgObject);
    }

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

/**
 * Ensures the correct prayer and set of gear is used for calculating the damage of an ability
 * @param {*} settings 
 * @returns 
 */
function style_specific_unification(settings, style = null) {
    if (style == 'magic' || abils[settings['ability']]['main style'] === 'magic') {
        settings[SETTINGS.MH] = settings[SETTINGS.MAGIC_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.MAGIC_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.MAGIC_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.MAGIC_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.MAGIC_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.MAGIC_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.MAGIC_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.MAGIC_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.MAGIC_PRAYER];
    } else if (style == 'ranged' || abils[settings['ability']]['main style'] === 'ranged') {
        settings[SETTINGS.MH] = settings[SETTINGS.RANGED_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.RANGED_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.RANGED_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.RANGED_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.RANGED_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.RANGED_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.RANGED_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.RANGED_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.RANGED_PRAYER];
    } else if (style == 'melee' || abils[settings['ability']]['main style'] === 'melee') {
        settings[SETTINGS.MH] = settings[SETTINGS.MELEE_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.MELEE_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.MELEE_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.MELEE_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.MELEE_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.MELEE_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.MELEE_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.MELEE_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.MELEE_PRAYER];
    } else if (style == 'necromancy' || abils[settings['ability']]['main style'] === 'necromancy') {
        settings[SETTINGS.MH] = settings[SETTINGS.NECRO_MH];
        settings[SETTINGS.OH] = settings[SETTINGS.NECRO_OH];
        settings[SETTINGS.TH] = settings[SETTINGS.NECRO_TH];
        settings[SETTINGS.HELMET] = settings[SETTINGS.NECRO_HELMET];
        settings[SETTINGS.BODY] = settings[SETTINGS.NECRO_BODY];
        settings[SETTINGS.LEGS] = settings[SETTINGS.NECRO_LEGS];
        settings[SETTINGS.GLOVES] = settings[SETTINGS.NECRO_GLOVES];
        settings[SETTINGS.BOOTS] = settings[SETTINGS.NECRO_BOOTS];
        settings[SETTINGS.PRAYER] = settings[SETTINGS.NECRO_PRAYER];
        settings[SETTINGS.WEAPON] = SETTINGS.WEAPON_VALUES.DW
    }
    
    return settings;
}

function hit_damage_calculation(settings, rotationCalc = false) {
    settings = style_specific_unification(settings); // initialise some settings
    let total_damage = calc_damage_object(settings); // calculate the ability
    total_damage = apply_additional(settings, total_damage, rotationCalc);
    //TODO add next cast next hit next tick etc
    return total_damage;
}

//todo rename
function apply_additional(settings, total_damage) {

    // handle sgb logic
    if (settings['ability'] === ABILITIES.CRYSTAL_RAIN) {
        total_damage += calc_sgb(settings, total_damage);
    }

    if (settings['bolg damage']) {
            total_damage += calc_bolg(settings)
            delete settings['bolg damage'];
    }

    // handle bloat logic
    if (settings['ability'] === ABILITIES.BLOAT) { // TODO: fix missing reference for SETTINGS.BLOAT
        total_damage += calc_bloat(settings);
        delete settings['bloat damage'];
    }
    // handle corruption shot/blast
    if ('corruption damage' in settings) {
        total_damage += calc_corruption(settings);
        delete settings['corruption damage'];
    }

    // handle instability (fsoa)
    if ('fsoa damage' in settings) {
        total_damage += calc_fsoa(settings);
        delete settings['fsoa damage'];
    }

    // handle igneous cleave bleed
    if (settings['ability'] === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        total_damage += calc_igneous_bleed(settings);
    }
    return total_damage;
}

function ability_damage_calculation(settings) {
    settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = 1;
    if (settings[SETTINGS.DAMAGE_PER_UNIT] === SETTINGS.DAMAGE_PER_UNIT_VALUES.TICK) {
        settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = 3;
        if (abils[settings['ability']]['ability classification'] === 'channel') {
            settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = Math.min(settings[SETTINGS.MAX_CHANNEL_DURATION], 
                Object.keys(abils[settings['ability']]['hits']).map(item => parseInt(item, 10)).pop());
        }
    }

    let rotation = get_hit_sequence(settings);
    let damage = 0;
    for (let key in rotation) {
        if (key <= settings[SETTINGS.MAX_CHANNEL_DURATION]) {
            const abil_cast = rotation[key].length;
            for (let iter = 0; iter < rotation[key].length; iter++) {
                if (rotation[key][iter] === 'next cast') {
                    settings = next_cast(settings);
                } else if (rotation[key][iter] === 'next hit') {
                    settings = next_hit(settings);
                } else {
                    let abil = settings['ability'];
                    settings['ability'] = rotation[key][iter];
                    damage += hit_damage_calculation(settings);
                    settings['ability'] = abil;
                }
            }
            if (abil_cast >= 1) {
                settings = next_tick(settings);
            }       
        }
    }
    return damage;
}

/**
 * Handles modifiers for the number of hits of multi-hit abilities, returning
 * the modified structure as a deep copy of the original
 * @param {*} settings 
 * @returns 
 */
function get_hit_sequence(settings) {
    let rotation = JSON.parse(JSON.stringify(abils[settings['ability']]['hits'])); //Deep copy

    if (settings['ability'] === ABILITIES.GREATER_RICOCHET) {
        for (let i = 1; i <= settings[SETTINGS.CAROMING]; i++) {
            rotation[1].push('next hit');
            rotation[1].push(ABILITIES.GREATER_RICOCHET_3);
        }
    }

    let tumekens_resplendence = 0;
    if (settings[SETTINGS.MAGIC_HELMET] === SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE) {
        tumekens_resplendence += 1;
    }
    if (settings[SETTINGS.MAGIC_BODY] === SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE) {
        tumekens_resplendence += 1;
    }
    if (settings[SETTINGS.MAGIC_LEGS] === SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE) {
        tumekens_resplendence += 1;
    }
    if (settings[SETTINGS.MAGIC_BOOTS] === SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE) {
        tumekens_resplendence += 1;
    }
    if (settings[SETTINGS.MAGIC_GLOVES] === SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE) {
        tumekens_resplendence += 1;
    }
    if (settings['ability'] === ABILITIES.ASPHYXIATE && tumekens_resplendence >= 4) {
        rotation[2].push(ABILITIES.ASPHYXIATE_HIT);
        rotation[4].push(ABILITIES.ASPHYXIATE_HIT);
        rotation[6].push(ABILITIES.ASPHYXIATE_HIT);
        rotation[8] = [ABILITIES.ASPHYXIATE_HIT];
    }

    if (settings['ability'] === ABILITIES.DEADSHOT && settings[SETTINGS.CAPE] === SETTINGS.CAPE_VALUES.ZUK) {
        rotation[1].push(ABILITIES.DEADSHOT_BLEED, ABILITIES.DEADSHOT_BLEED);
    }

    if (settings['ability'] === ABILITIES.OVERPOWER && settings[SETTINGS.CAPE] === SETTINGS.CAPE_VALUES.ZUK) {
        rotation[1].push("next hit");
        rotation[1].push(ABILITIES.OVERPOWER_HIT);
    }

    if (settings['ability'] === ABILITIES.OMNIPOWER && settings[SETTINGS.CAPE] !== SETTINGS.CAPE_VALUES.ZUK) {
        rotation = {1:[ABILITIES.OMNIPOWER_REGULAR]};
    }

    if (settings['ability'] === ABILITIES.IGNEOUS_SHOWDOWN && settings[SETTINGS.FLAMEBOUND_RIVAL] === true
        && settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH && settings[SETTINGS.MELEE_TH] === SETTINGS.MELEE_TH_VALUES.EZK
    ) {
        rotation[1].push("next hit", ABILITIES.IGNEOUS_SHOWDOWN_BONUS, "next hit", ABILITIES.IGNEOUS_SHOWDOWN_BONUS, "next hit", ABILITIES.IGNEOUS_SHOWDOWN_BONUS);
    }

    // masterwork spear of annihilation
    if (settings[SETTINGS.MELEE_TH] === SETTINGS.MELEE_TH_VALUES.MW_SPEAR && 
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
        if (settings['ability'] === ABILITIES.DISMEMBER) {
            rotation[1].push(ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT);
        }

        if (settings['ability'] === ABILITIES.BLOOD_TENDRILS) {
            rotation[1].push(ABILITIES.BLOOD_TENDRILS_2, ABILITIES.BLOOD_TENDRILS_2);
        }

        if (settings['ability'] === ABILITIES.SLAUGHTER) {
            rotation[1].push(ABILITIES.SLAUGHTER_HIT, ABILITIES.SLAUGHTER_HIT);
        }

        if (settings['ability'] === ABILITIES.MASSACRE) {
            rotation[1].push(ABILITIES.MASSACRE_BLEED, ABILITIES.MASSACRE_BLEED);
        }
    }

    // strength cape
    if (settings[SETTINGS.STRENGTH_CAPE] === true &&
        settings['ability'] === ABILITIES.DISMEMBER
    ) {
        rotation[1].push(ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT);
    }

    // Ruin stacks
    if (settings['ability'] === ABILITIES.COMBUST) {
        for (let i=0; i<2*settings[SETTINGS.RUIN]; i++) {
            rotation[1].push(ABILITIES.COMBUST_HIT);
        }
    }

    return rotation;
}

function calc_aftershock(settings) {
    settings = style_specific_unification(settings);
    const dmgObject = create_object(settings);
    for (let key in dmgObject) {
        // calc base AD
        dmgObject[key]['base AD'] = calc_base_ad(settings);
        // calc buffed AD
        dmgObject[key]['boosted AD'] = calc_boosted_ad(settings, dmgObject[key]);
        dmgObject[key]['damage list'] = [];
        for (let i=0; i<39; i++) {
            dmgObject[key]['damage list'].push(Math.floor(dmgObject[key]['boosted AD'] * (0.24 + 0.04*i)));
        }
        // calc core
        if (abils[settings['ability']]['on-hit effects']) {
            dmgObject[key] = calc_core(settings, dmgObject, key, newBolg);
        }
        // calc on npc
        dmgObject[key] = calc_on_npc(settings, dmgObject[key]);
        // add split soul damage
        if (
            settings['split soul'] === true
        ) {
            dmgObject[key] = add_split_soul(settings, dmgObject[key]);
        }
    }
    // get user value
    return get_user_value(settings, dmgObject);
}

function calc_base_damage_ability_page(settings) {
        settings = style_specific_unification(settings);
        return calc_base_ad(settings);
}

export { ability_damage_calculation, hit_damage_calculation,
    calc_base_ad, calc_boosted_ad, ability_specific_effects, set_min_var,
    calc_style_specific, calc_on_hit, roll_damage, calc_core, calc_on_npc, style_specific_unification,
    get_user_value, get_hit_sequence, add_split_soul, apply_additional,
    calc_crit_damage, calc_split_soul_hit, calc_aftershock, calc_base_damage_ability_page
};
