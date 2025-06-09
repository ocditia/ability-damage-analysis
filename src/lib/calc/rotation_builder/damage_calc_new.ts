import { next_cast, next_hit, next_tick } from '../ability_helper';
import { ABILITIES, abils, armour, gear, prayers, weapons } from '../const';
import { create_damage_object } from './rota_object_helper';
import { SETTINGS } from '../settings';
import { calc_crit_damage, get_hit_sequence, add_split_soul } from '../damage_calc';
import { handle_wen_buff } from './rotation_damage_helper';
import { aB } from 'vitest/dist/chunks/reporters.D7Jzd9GS';
import { DamageObject } from '../types';

//TODO move this AND make edraco adren use it
function add_adrenaline(settings, amount: number) {
    if (settings[SETTINGS.NATURAL_INSTINCT] && amount > 0) {
        amount *= 2;
    }
    let new_adren = settings[SETTINGS.ADRENALINE] + amount;
    const max_adren = settings[SETTINGS.HEIGHTENED_SENSES] ? 110 : 100; //TODO vestements
    settings[SETTINGS.ADRENALINE] = (amount > 0) ? Math.min(max_adren, new_adren) : new_adren;
}
// These are the things that happen before an ability is released - 
// adrenaline and cooldowns before on_cast is called.
// This is at the same time, except when an ability is stalled.
function on_stall(settings, abilityKey: string) {
    const type = abils[abilityKey]['ability type'];
    if (type == 'basic') {
        add_adrenaline(settings, settings[SETTINGS.FURY_OF_THE_SMALL] ? 9 : 8); // Normal 8/9%
        if (settings[SETTINGS.EXPECTED_ADRENALINE]) {
            add_adrenaline(settings, settings[SETTINGS.IMPATIENT] * 0.09 * 3); // Impatient
        }
    }
    else if (type == 'threshold') {
        add_adrenaline(settings, -15);
    }
    else if (type == 'ultimate') { 
        let cost = 100;
        cost -= settings[SETTINGS.VIGOUR] ? 10 : 0;
        cost -= settings[SETTINGS.CONSERVATION_OF_ENERGY] ? 10 : 0;
        add_adrenaline(settings, -cost);
        //TODO zuk capes
    }
    else if (type == 'special attack') {
        let cost = abils[abilityKey]['adren cost'];
        const multi = settings[SETTINGS.VIGOUR] ? 0.9 : 1;
        cost *= multi;
        add_adrenaline(settings, -cost)
    }
}

// TODO some changes might have to be made.
// TODO e.g. currently conflagrate is true/false, but this should be a timer so it should check conflagrate >=1.
// Detonate, Flanking GBarge, Icy Tempest, Salt the Wound, deathguard spec
// 
function on_cast(settings, dmgObject: DamageObject, timers: Record<string, number>, abilityKey: string): DamageObject[] {
    // This function happens as an ability is cast
    // scale to hit chance / damage potential
    const dmgObjects = [];
    for (let key in dmgObject) {
        dmgObject[key]['boosted AD'] = Math.floor(settings[SETTINGS.ABILITY_DAMAGE] * 
            Math.min(settings[SETTINGS.HIT_CHANCE] / 100, 1));
        dmgObject[key]['ability'] = abilityKey;
    }
    
    //TODO fix - there's gotta be a better way to handle abilities which don't consume wen buff...
    if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS &&
        ['threshold', 'special attack', 'ultimate'].includes(abils[abilityKey]['ability type']) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        (!timers[SETTINGS.ICY_PRECISION] || timers[SETTINGS.ICY_PRECISION] < 0) &&
        ![ABILITIES.GREATER_DEATHS_SWIFTNESS, ABILITIES.SPLIT_SOUL_ECB, 
            ABILITIES.DEATHS_SWIFTNESS_DOT, ABILITIES.DEATHS_SWIFTNESS].includes(abilityKey)
    ) {
            handle_wen_buff(settings, timers);
    }
    // Marco - turn off hit chance stuff here (idt anything exists)
    // TODO - ingenuity of the humans, and check if accuracy penalty from wrong style gear is implemented
    // calculate boosted AD / invisible AD
    for (let key in dmgObject) {
        
        if (abils[abilityKey]['main style'] === 'magic') {
            // inq staff
            if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.INQ_STAFF
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.125);
            }
            // inq staff upgraded
            else if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.INQ_STAFF_E
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.175);
            }

            // flow stacks
            dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD']* (1 + 0.01 * settings[SETTINGS.FLOW_STACKS]));
        }
    
        else if (abils[abilityKey]['main style'] === 'melee') {
            // terrasaur maul
            if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.T_MAUL
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.125);
            }
            // terrasaur maul upgraded
            else if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.T_MAUL_E
            ) {
                dmgObject[key]['boosted AD']= Math.floor(dmgObject[key]['boosted AD'] * 1.175);
            }
            
            // chaos roar
            if (settings[SETTINGS.CHAOS_ROAR] === true) {
                dmgObject[key]['boosted AD'] = 2 * dmgObject[key]['boosted AD'];
            }
        }

        if (abils[abilityKey]['main style'] === 'ranged') {
            // hex bow
            if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.HEX
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.125);
            }
            // hex bow upgraded
            else if (
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.HEX_E
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.175);
            }

            // icy precision (wen arrows)
            if (
                ['threshold', 'ultimate', 'special attack'].includes(abils[abilityKey]['ability type']) &&
                settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * (1 + 0.02 * settings[SETTINGS.ICY_PRECISION]));
            }

            // balance by force (bolg spec)
            if (abilityKey == ABILITIES.BALANCE_BY_FORCE) {
                settings[SETTINGS.BALANCE_BY_FORCE] = true;
            }
            //TODO test
        }

        // necromancy has no (known) buffs of this type
        else if (abils[abilityKey]['main style'] === 'necromancy') {

        }

        // scripture of Amascut
        if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.AMASCUT) {
            dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.1);
        }
    }
    // TODO - turn off boosted AD stuff here
    // e.g. turn off chaos roar after it's been used

    // apply ability specific effects
    for (let key in dmgObject) {
        if (abils[abilityKey]['main style'] === 'magic') {
            // conflagrate
            if (abilityKey === ABILITIES.COMBUST_HIT && settings[SETTINGS.CONFLAGRATE] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.4);
            }

            // song of destruction 2 item set effect
            if (
                ['bleed', 'burn', 'dot'].includes(abils[abilityKey]['ability classification']) && 
                    settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING && 
                    settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT && 
                    settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // kerapac's wristwraps
            if (abilityKey === ABILITIES.COMBUST_HIT) {
                if (
                    settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR
                ) {
                    dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.25);
                } else if (
                    settings[SETTINGS.KERAPACS_WRIST_WRAPS] ===
                    SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED
                ) {
                    dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.4);
                }
            }

            // combust walk
            if (abilityKey === ABILITIES.COMBUST_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }

            // wrack bound
            if (
                abilityKey === ABILITIES.WRACK &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] ===
                        SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // wrack and ruin bound
            if (
                abilityKey === ABILITIES.WRACK_AND_RUIN &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] ===
                        SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.6);
            }
        }

        if (abils[abilityKey]['main style'] === 'melee') {
            // slice bound
            if (
                abilityKey === ABILITIES.SLICE &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.4);
            }

            // slaughter walk
            if (abilityKey === ABILITIES.SLAUGHTER_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 3);
            }

            // punish low
            if (abilityKey === ABILITIES.PUNISH && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2.5);
            }
        }

            if (abils[abilityKey]['main style'] === 'ranged') {
            // piercing shot bound
            if (
                abilityKey === ABILITIES.PIERCING_SHOT_HIT &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // frag walk
            if ((abilityKey === ABILITIES.FRAGMENTATION_SHOT_HIT || abilityKey === ABILITIES.FRAGMENTATION_SHOT)
                && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }
        }

        if (abils[abilityKey]['main style'] === 'necromancy') {
            // death spark (omni guard passive)
            if (settings[SETTINGS.DEATH_SPARK] === true && abilityKey === ABILITIES.NECRO_AUTO) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.5);
            }

            // living dead - finger of death
            if (
                settings[SETTINGS.LIVING_DEATH] === true &&
                abilityKey === ABILITIES.FINGER_OF_DEATH
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }

            // skeleton warrior stacks
            if (abilityKey === ABILITIES.SKELETON_WARRIOR_AUTO) {
                dmgObject[key]['boosted AD'] = Math.floor(
                    dmgObject[key]['boosted AD'] *
                        (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS])
                );
            }

            // The first necromancer armour + conjurer's amulet
        }
    }
    
    // Marco - turn off ability specific stuff here
    // e.g. turn off conflagrate after it's been used
    

    // Split single cast up into the different effects
    // e.g. if you cast dclaws, it should then be split up into 4 hits
    // or for wild magic, it should be split into the two wild magic hits
    if (abils[abilityKey]['ability classification'] == 'multihit') {
        let hits = get_hit_sequence(settings);

        for (let tick in hits) {
            for (let hit in hits[tick]) {
                if (abils[hits[tick][hit]]) { //filter 'next tick'/'next hit' entries 
                    let clone = create_damage_object(settings, hits[tick][hit]);
                    for (let key in clone){
                        clone[key]['probability'] = dmgObject[key]['probability'];
                        clone[key]['boosted AD'] = dmgObject[key]['boosted AD'];
                        clone[key]['ability'] = hits[tick][hit];
                    }
                    dmgObjects.push(clone);
                }
            }
        }
        
    }
    else {
        dmgObjects.push(dmgObject);
    }
    dmgObjects.forEach(dmgObject => {
        set_min_var(settings, dmgObject);
    });
    return dmgObjects;
}

function on_hit(settings, dmgObject: DamageObject, timers: Record<string, number>, abilityKey: string): DamageObject[] {
    // this function runs for all hits (note: not hitsplats)
    const dmgObjects = [dmgObject];
    // set min and var percentages
    //dmgObject = set_min_var(settings, dmgObject);
    // for (let key in dmgObject) {
    //     dmgObject[key]['min hit'] = abils[abilityKey]['min hit'];
    //     dmgObject[key]['var hit'] = abils[abilityKey]['var hit'];

    //     if (abils[abilityKey]['main style'] === 'magic') {
    //         // detonate
    //         if (abilityKey === ABILITIES.DETONATE) {
    //             dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.45 * settings[SETTINGS.DETONATE]; // TODO: fix missing reference for SETTINGS.DETONATE
    //             dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.1 * settings[SETTINGS.DETONATE];
    //         }

    //         // flank
    //         if (abilityKey === ABILITIES.IMPACT) {
    //             dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //             dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //         }
    //         else if (abilityKey === ABILITIES.DEEP_IMPACT) {
    //             dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //             dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //         }
    //     }

    //     if (abils[abilityKey]['main style'] === 'melee') {
    //         // greater barge tick bonus
    //         if (abilityKey === ABILITIES.GREATER_BARGE) {
    //             dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
    //             dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + Math.min(0.02 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
    //         }
    //         // icy tempest
    //         if (
    //             abilityKey=== ABILITIES.ICY_TEMPEST_1 ||
    //             settings['ability'] === ABILITIES.ICY_TEMPEST_2
    //         ) {
    //             dmgObject[key]['min hit'] += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
    //             dmgObject[key]['var hit'] += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
    //         }
    //         // flank
    //         if (abilityKey === ABILITIES.BACKHAND) {
    //             dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //             dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //         }

    //         if (abilityKey === ABILITIES.FORCEFUL_BACKHAND) {
    //             dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //             dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //         }
    //     }

    //     if (abils[abilityKey]['main style'] === 'ranged') {
    //         // salt the wound stack bonus
    //         if (abilityKey === ABILITIES.SALT_THE_WOUND) {
    //             dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
    //             dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
    //         }
    //         // flank
    //         if (settings[SETTINGS.FLANKING] > 0) {
    //             if (abilityKey === ABILITIES.BINDING_SHOT) {
    //                 dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //                 dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //             }
    //             else if (abilityKey === ABILITIES.TIGHT_BINDINGS) {
    //                 dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //                 dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
    //             }
    //         }
    //     }

    //     if (abils[abilityKey]['main style'] === 'necromancy') {
    //         // death grasp (death guard spec)
    //         if (abilityKey === ABILITIES.DEATH_GRASP) {
    //             dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
    //         }

    //         // flank
    //         if (abilityKey === ABILITIES.SOUL_STRIKE) {
    //             dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //             dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    //         }
    //     }
    // }
    // // // set actual min var values
    // for (let key in dmgObject) {
    //     dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * dmgObject[key]['boosted AD']);
    //     dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * dmgObject[key]['boosted AD']);
    // }

    // compute on-hit effects
    if (abils[abilityKey]['on-hit effects'] === true) {
        // Marco - turn on any style specific effects (idt there are any)

        for (let key in dmgObject) {
            if (abils[abilityKey]['main style'] === 'magic') {

            }

            if (abils[abilityKey]['main style'] === 'melee') {
                
            }

            if (abils[abilityKey]['main style'] === 'ranged') {
                // og bane ammo
                if (settings[SETTINGS.AMMO] === 'bane bolts' || settings[SETTINGS.AMMO] === 'bane arrows') {
                    if (
                        abilityKey === 'ranged main-hand auto' ||
                        abilityKey === 'ranged two-hand auto' ||
                        abilityKey === 'ranged off-hand auto'
                    ) {
                        dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * 1.4);
                        dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * 1.4);
                    } else {
                        dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * 1.25);
                        dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * 1.25);
                    }
                }

                // jas bane ammo
                if (
                    settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.JAS_ARROWS
                ) {
                    dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * 1.3);
                    dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * 1.3);
                }

                // ful arrows
                if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.FUL_ARROWS) {
                    dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * 1.15);
                    dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * 1.15);
                }                

                // enchanted bolts (proc based, will come later)
                // sirenic set effect (proc based, will come later)
                // gemstone armour effect (proc based, will come later)

                // pernix quiver
                if (
                    settings['ammo slot'] === 'pernix quiver' &&
                    settings[SETTINGS.TARGET_HP_PERCENT] <= 25
                ) {
                    dmgObject[key]['var hit'] = Math.floor(
                        (dmgObject[key]['var hit'] += 0.04 * (dmgObject[key]['min hit'] + dmgObject[key]['var hit']))
                    );
                }
            }

            if (abils[abilityKey]['main style'] === 'necromancy') {
                
            }
        }
        // // Marco - turn off any style specific effects (idt there are any)
        // // apply precise
        if (settings[SETTINGS.PRECISE] > 0 ) {
            for (let key in dmgObject) {
                let max_hit = dmgObject[key]['min hit'] + dmgObject[key]['var hit'];
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit);
                dmgObject[key]['var hit'] = Math.max(0, dmgObject[key]['var hit'] - Math.floor(0.015 * settings[SETTINGS.PRECISE] * max_hit));
            }
        }

        // Marco - turn additive boosts on if appropriate
        // Discrete example: needle strike
        // if we're inside the timer for needle strike to apply we turn needle strike on and set
        // the timer to 0 to turn it off
        if (settings[SETTINGS.NEEDLE_STRIKE_BUFFER] > 0 && 
            abils[abilityKey]['main style'] === 'ranged'
        ) {
            if ([SETTINGS.NECKLACE_VALUES.AOS, SETTINGS.NECKLACE_VALUES.AOSOR, SETTINGS.NECKLACE_VALUES.EOF, SETTINGS.NECKLACE_VALUES.EOFOR].includes(settings[SETTINGS.NECKLACE])) {
                settings[SETTINGS.NEEDLE_STRIKE] = 'fleeting';
            }
            else {
                settings[SETTINGS.NEEDLE_STRIKE] = true;
            }
            settings[SETTINGS.NEEDLE_STRIKE_BUFFER] = 0;
        }
        // apply additive boosts
        for (let key in dmgObject) {
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
            if ( void_shield_pieces.includes(settings[SETTINGS.OH]) && 
                settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW) {
                void_pieces += 1; // TODO: use number of void pieces somewhere
            }

            // add damage bonus
            if (abils[abilityKey]['main style'] === 'magic') {
                if (settings[SETTINGS.HELMET] === 'void knight magic helm') {
                    boost += 0.05;
                } else if (settings[SETTINGS.HELMET] === 'superior void knight magic helm') {
                    boost += 0.07;
                }
            } else if (abils[abilityKey]['main style'] === 'melee') {
                if (settings[SETTINGS.HELMET] === 'void knight melee helm') {
                    boost += 0.05;
                } else if (settings[SETTINGS.HELMET] === 'superior void knight melee helm') {
                    boost += 0.07;
                }
            } else if (abils[abilityKey]['main style'] === 'ranged') {
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

            // // turn on gop on-hit buff if appropriate
            // if (settings[a] > 0 &&
            //     abils[settings['ability']]['main style'] === 'ranged'
            // ) {
            //     if ([SETTINGS.NECKLACE_VALUES.AOS, SETTINGS.NECKLACE_VALUES.AOSOR, SETTINGS.NECKLACE_VALUES.EOF, SETTINGS.NECKLACE_VALUES.EOFOR].includes(settings[SETTINGS.NECKLACE])) {
            //         settings[a] = 'fleeting';
            //     }
            //     else {
            //         settings[a] = true;
            //     }
                
            //     settings[a] = 0;
            // }
            // // apply gop on-hit buff
            // if (
            //     settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.REGULAR &&
            //     abils[settings['ability']]['main style'] === 'melee'
            // ) {
            //     boost += 0.1;
            // } else if (
            //     settings[SETTINGS.ENDURING_RUIN_HIT] === SETTINGS.ENDURING_RUIN_HIT_VALUES.ENCHANTED &&
            //     abils[settings['ability']]['main style'] === 'melee'
            // ) {
            //     boost += 0.16;
            // }

            // Discrete example: needle strike
            // apply needle strike damage buff
            if (
                (settings[SETTINGS.NEEDLE_STRIKE] === true ||
                    settings[SETTINGS.NEEDLE_STRIKE] === 'fleeting') &&
                abils[abilityKey]['main style'] === 'ranged'
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
            if (abils[abilityKey]['main style'] === 'melee') {
                boost += settings[SETTINGS.GRAVITATE] / 100;
            }

            // scripture of ful
            if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.FUL) {
                boost += 0.2;
            }

            // desperado (ring of kinship ranged boost)
            /*if (settings['desperado'] > 0 && abils[abilityKey]['main style'] === 'ranged') {
                boost += 0.1;
                boost = boost + 0.01 * settings['desperado'];
            }*/

            // apply boost
            dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * (1 + boost));
            dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * (1 + boost));
        }
        
        // Marco - turn off additive boosts, note that needle strike should get turned off when the tick changes, not here
    
        // Marco - turn on multiplicative shared boosts

        // apply multiplicative shared buffs
        for (let key in dmgObject) {
            let boost = 10000;
            if (abils[abilityKey]['main style'] === 'magic') {
                // prayer boost
                if (abils[abilityKey]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
                    let prayerBoost = prayers[settings[SETTINGS.PRAYER]]['boost'];
                    if (
                        settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
                        prayers[settings[SETTINGS.PRAYER]]['category'] in
                            ['single-stat boosting', 'leech curse']
                    ) {
                        prayerBoost += 0.1;
                    }
                    boost = Math.floor(boost * (1 + prayerBoost));
                }

                // divine rage
                if (settings[SETTINGS.DIVINE_RAGE] === true) {
                    boost += 0.05;
                }

                // sunshine
                if (settings[SETTINGS.SUNSHINE] === true) {
                    boost = Math.floor(boost * 1.5);
                }

                // blood tithe (exsanguinate)
                if (abils[abilityKey]['ability type'] === 'basic') {
                    boost = Math.floor(boost * (1 + settings[SETTINGS.BLOOD_TITHE] / 100));
                }
            }
        
            if (abils[abilityKey]['main style'] === 'melee') {
                // prayer boost
                if (abils[abilityKey]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
                    let prayerBoost = prayers[settings[SETTINGS.PRAYER]]['boost'];
            
                    if (
                        settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
                        prayers[settings[SETTINGS.PRAYER]]['category'] in
                            ['single-stat boosting', 'leech curse']
                    ) {
                        boost += 0.1;
                    }
                    boost = Math.floor(boost * (1 + prayerBoost));
                }

                // berserk
                if (settings[SETTINGS.BERSERK] === true) {
                    boost = Math.floor(boost * 2);
                }

                // zaros godsword
                if (settings[SETTINGS.ZGS] === true) {
                    boost = Math.floor(boost * 1.25);
                }

                // dragon battleaxe
                if (settings[SETTINGS.RAMPAGE] === true) {
                    boost = Math.floor(boost * 1.2);
                }
            }

            if (abils[abilityKey]['main style'] === 'ranged') {
                // prayer boost
                if (abils[abilityKey]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
                    let prayerBoost = prayers[settings[SETTINGS.PRAYER]]['boost'];
                    if (
                        settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
                        prayers[settings[SETTINGS.PRAYER]]['category'] in
                            ['single-stat boosting', 'leech curse']
                    ) {
                        boost += 0.1;
                    }
                    boost = Math.floor(boost * (1 + prayerBoost));
                }

                // death swiftness
                if (settings[SETTINGS.DEATH_SWIFTNESS] === true) {
                    boost = Math.floor(boost * 1.5);
                }
            }

            if (abils[abilityKey]['main style'] === 'necromancy') {
                // prayer boost
                if (abils[abilityKey]['main style'] === prayers[settings[SETTINGS.PRAYER]]['style']) {
                    let prayerBoost = prayers[settings[SETTINGS.PRAYER]]['boost'];
                    if (
                        settings[SETTINGS.NECKLACE] === 'amulet of zealots' &&
                        prayers[settings[SETTINGS.PRAYER]]['category'] in
                            ['single-stat boosting', 'leech curse']
                    ) {
                        boost += 0.1;
                    }
                    boost = Math.floor(boost * (1 + prayerBoost));
                }
            }   
    
            // apply revenge
            if (
                abils[abilityKey]['main style'] === 'main-hand' &&
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
            //TODO fix - current breaks calc if no ruthless stacks
            boost = Math.floor(
                boost * (1 + settings[SETTINGS.RUTHLESS_STACKS] * settings[SETTINGS.RUTHLESS_RANK] * 0.005)
            );

            // apply buff            
            dmgObject[key]['min hit'] = Math.floor((dmgObject[key]['min hit'] * boost) / 10000); 
            dmgObject[key]['var hit'] = Math.floor((dmgObject[key]['var hit'] * boost) / 10000);

        }
        // Marco - turn off multiplicative shared boosts
    
        // Marco - turn on multiplicative pve only buffs

        // apply multiplicative pve only buffs
        for (let key in dmgObject) {
            let boost = 10000;
            if (abils[abilityKey]['main style'] === 'magic') {
                // spellcaster gloves (proc based, so added later)
                // boost = boost; // useless self-assignment
            }

            if (abils[abilityKey]['main style'] === 'melee') {
                // spellcaster gloves (proc based, so added later)
                //bane gear
                // if (weapons[settings['main-hand']]['category'] === 'bane') {
                //     boost = Math.floor(boost * 1.25);
                // }
            }

            // slayer helm
            boost = Math.floor(boost * (1 + gear[settings[SETTINGS.SLAYER_HELM]]['boost']));
        
            // fort forinthry guard house task
            if (settings[SETTINGS.GUARDHOUSE] === SETTINGS.GUARDHOUSE_VALUES.LVL1 || 
                settings[SETTINGS.GUARDHOUSE] === SETTINGS.GUARDHOUSE_VALUES.LVL3) {
                boost = Math.floor(boost * 1.01);
            } else if (
                settings[SETTINGS.GUARDHOUSE] === SETTINGS.GUARDHOUSE_VALUES.LVL1_UNDEAD ||
                settings[SETTINGS.GUARDHOUSE] === SETTINGS.GUARDHOUSE_VALUES.LVL3_UNDEAD
            ) {
                boost = Math.floor(boost * 1.02);
            }
        
            // fort forinthry guard house low hp
            if (
                settings[SETTINGS.GUARDHOUSE] in [SETTINGS.GUARDHOUSE_VALUES.LVL3, SETTINGS.GUARDHOUSE_VALUES.LVL3_UNDEAD] &&
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
            if (settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE] === true) {
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
        
            // apply buff
            dmgObject[key]['min hit'] = Math.floor((dmgObject[key]['min hit'] * boost) / 10000);
            dmgObject[key]['var hit'] = Math.floor((dmgObject[key]['var hit'] * boost) / 10000);
        }

        // Marco - turn off multiplicative pve only buffs
    
        // add bonus damage
        for (let key in dmgObject) {
            if (abils[abilityKey]['main style'] === 'melee') {
                // frostblades (leng off-hand effects)
                if (
                    (settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.LENG ||
                        settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER) &&
                    settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
                    settings[SETTINGS.FROSTBLADES] === true
                ) {
                    dmgObject[key]['min hit'] += Math.floor(0.24 * dmgObject[key]['boosted AD']);
                }
            }   
        }
    }
    // roll damage
    for (let key in dmgObject) {
        for (let i = 0; i <= dmgObject[key]['var hit']; i++) {
            dmgObject[key]['damage list'].push(dmgObject[key]['min hit'] + i);
        }
    }
    
    // store corruption shot/blast damage
    if ([ABILITIES.CORRUPTION_BLAST, ABILITIES.CORRUPTION_SHOT].includes(abilityKey)) {
        settings['corruption damage'] = structuredClone(dmgObject);
    }

    // store igneous cleave damage
    if (abilityKey === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        settings['igneous cleave bleed damage']['damage list'] = structuredClone(dmgObject);
    }

    //Add wen, bik, bolg stacks
    if (abils[abilityKey]['on-hit effects'] === true &&
        abils[abilityKey]['ability type'] != 'proc') {
        // Marco - Discrete example: bolg
        // add a bolg stack
        if (settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
                settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] += 1;
        }
    }
    if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS &&
        abils[abilityKey]['ability type'] == 'basic' &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
            settings[SETTINGS.ICY_CHILL_STACKS] = Math.min(settings[SETTINGS.ICY_CHILL_STACKS]+1, 15);
    }
    else if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.BIK_ARROWS &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
            settings[SETTINGS.BIK_STACKS] = Math.min(settings[SETTINGS.BIK_STACKS]+1, 200);
    }
    

    // calc core
    if (abils[abilityKey]['on-hit effects'] === true) {
        for (let key in dmgObject) {
            for (let i=0; i<dmgObject[key]['damage list'].length; i++) {
                // berserker's fury
                dmgObject[key]['damage list'][i] = Math.floor(
                    dmgObject[key]['damage list'][i] * (1 + settings[SETTINGS.BERSERKERS_FURY] / 100)
                );
        
                // dharock's gear (proc based, so added later)
                //crits
                if (dmgObject[key]['crit'] === true && abils[abilityKey]['crit effects'] === true) {
                    dmgObject[key]['damage list'][i] = Math.floor(
                        dmgObject[key]['damage list'][i] * (1 + calc_crit_damage(settings))
                    );
                }
            }
        }
        if (
            settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 8 ||
                (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4 &&
                settings[SETTINGS.BALANCE_BY_FORCE] === true))
        ) {
            settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] = 0;
            let bolgDmgObject = create_damage_object(settings, 'bolg proc');
            bolgDmgObject = on_cast(settings, bolgDmgObject, timers, 'bolg proc')[0]; //TODO remove [0]
            const dmgList = dmgObject['non_crit']['damage list'];

            bolgDmgObject['crit']['min hit'] += Math.floor(dmgList[0] * 0.33);
            bolgDmgObject['crit']['var hit'] += Math.floor(dmgList[dmgList.length-1] * 0.37 - dmgList[0] * 0.33);
            bolgDmgObject['non_crit']['min hit'] += Math.floor(dmgList[0] * 0.33);
            bolgDmgObject['non_crit']['var hit'] += Math.floor(dmgList[dmgList.length-1] * 0.37 - dmgList[0] * 0.33);

            let bolgDmgObjects = on_hit(settings, bolgDmgObject, timers, 'bolg proc');
            dmgObjects.push(...bolgDmgObjects);
        }

        // store fsoa damage
        if (abils[abilityKey]['crit effects'] === true 
            && settings[SETTINGS.INSTABILITY] === true 
            && abils[abilityKey]['damage type'] === 'magic' 
            && abilityKey != 'time strike') {
                settings['fsoa damage'] = structuredClone(dmgObject);
            //TODO bolg treatment
        }

        // store bloat damages
        if (abilityKey === ABILITIES.BLOAT) {
            settings['bloat damage'] = structuredClone(dmgObject);
        }
    }    
    return dmgObjects;
}

function on_damage(settings, dmgObject: DamageObject) {
    console.log('Ability: ', dmgObject['non_crit']['ability']);
    console.log('dmgObject - on_damage', dmgObject);
    for (let key in dmgObject) {
        for (let i = 0; i < dmgObject[key]['damage list'].length; i++) {
            // set haunted
            let haunted = Math.min(
                Math.floor(dmgObject[key]['damage list'][i] * 0.1),
                Math.floor(0.2 * settings['haunted AD'])
            );

            // vulnerability / curse
            if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.VULNERABILITY) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
            } else if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.CURSE) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.05);
            }

            // // enduring ruin bleed (gop)
            // if (
            //     settings['enduring ruin - bleed'] === 'regular' &&
            //     abils[settings['ability']]['ability classification'] === 'bleed'
            // ) {
            //     dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.2);
            // } else if (
            //     settings['enduring ruin - bleed'] === 'enhanced' &&
            //     abils[settings['ability']]['ability classification'] === 'bleed'
            // ) {
            //     dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.25);
            // }

            // wilderness puzzlebox
            if (settings['wilderness puzzlebox'] > 1) {
                dmgObject[key]['damage list'][i] = Math.floor(
                    dmgObject[key]['damage list'][i] * (1 + 0.03 + settings['wilderness puzzlebox'])
                );
            }

            // croesus deathspores (crypt flanking)
            if (settings[SETTINGS.CRYPTBLOOM] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
            }

            // zamorak's guardian triumph
            /*if (
                settings['guardian triump'] === true &&
                abils[settings['ability']]['ability type'] === 'basic'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.2);
            }*/

            // undead slayer perk
            if (settings[SETTINGS.SLAYER_PERK_UNDEAD] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.07);
            }

            // undead slayer sigil
            if (settings[SETTINGS.UNDEAD_SLAYER_ABILITY] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.15);
            }

            // dragon slayer perk
            if (settings[SETTINGS.SLAYER_PERK_DRAGON] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.07);
            }

            // dragon slayer sigil
            if (settings[SETTINGS.DRAGON_SLAYER_ABILITY] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.15);
            }

            // demon slayer perk
            if (settings[SETTINGS.SLAYER_PERK_DEMON] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.07);
            }

            // demon slayer sigil
            if (settings[SETTINGS.SLAYER_SIGIL_DEMON] === true) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.15);
            }

            // nopenopenope (pof spider buff)
            dmgObject[key]['damage list'][i] = Math.floor(
                dmgObject[key]['damage list'][i] * (1 + settings[SETTINGS.NOPE])
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
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.03);
            } else if (ghost_hunter_pieces === 2) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.06);
            } else if (ghost_hunter_pieces === 3 || ghost_hunter_pieces === 4) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
            }

            // vanquish (quest point weapon)
            if (settings['two-hand weapon'] === 'vanquish') {
                dmgObject[key]['damage list'][i] = Math.floor(
                    dmgObject[key]['damage list'][i] * (1 + 0.05 * settings['quest deaths'])
                );
            }

            if (settings['meta'] === true && abils[settings['ability']]['damage type'] === 'magic') {
                dmgObject[key]['damage list'][i] = Math.floor(1.66 * dmgObject[key]['damage list'][i])
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
                    dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
                } else if (
                    settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.BERSERKER &&
                    abils[settings['ability']]['damage type'] === 'melee'
                ) {
                    dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
                } else if (
                    settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.RECKLESS &&
                    abils[settings['ability']]['damage type'] === 'ranged'
                ) {
                    dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
                }
            }

            // mahjarrat aura
            if (
                settings[SETTINGS.AURA] === 'mahjarrat' &&
                abils[settings['ability']]['damage type'] !== 'spirit'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.05);
            }

            // scrimshaw of elements
            if (
                settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.ELEMENTS &&
                abils[settings['ability']]['main style'] === 'magic'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.05);
            } else if (
                settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS &&
                abils[settings['ability']]['main style'] === 'magic'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.0666);
            }

            // scrimshaw of cruelty
            if (
                settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.CRUELTY &&
                abils[settings['ability']]['main style'] === 'ranged'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.05);
            } else if (
                settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY &&
                abils[settings['ability']]['main style'] === 'ranged'
            ) {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.0666);
            }

            // apply haunted
            if (settings[SETTINGS.HAUNTED] === true) {
                dmgObject[key]['damage list'][i] = dmgObject[key]['damage list'][i] + haunted;
            }

            // essence corruption 25 stack bonus
            if (
                abils[settings['ability']]['damage type'] === 'magic' &&
                settings[SETTINGS.ESSENCE_CORRUPTION] >= 25
            ) {
                dmgObject[key]['damage list'][i] =
                    dmgObject[key]['damage list'][i] +
                    settings[SETTINGS.MAGIC_LEVEL] +
                    settings[SETTINGS.ESSENCE_CORRUPTION];
            }

            // necklace of salamancy
            if (settings[SETTINGS.NECKLACE] === 'necklace of salamancy') {
                dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * 1.1);
            }

            // anachronia slayer lodge buff
            // dmgObject[key]['damage list'][i] = Math.floor(dmgObject[key]['damage list'][i] * (1 + settings['anachronia slayer lodge buff']));

            

            // hit cap
            dmgObject[key]['damage list'][i] = Math.min(dmgObject[key]['damage list'][i], 30000);
            
        }
        // store damage into soul split
        settings['soul split'] = dmgObject[key];
        // add split soul damage
        if (settings['split soul'] === true && ['magic', 'melee', 'ranged', 'necrotic'].includes(
                abils[settings['ability']]['damage type']) && settings['soul split']['damage list'])
        {
            dmgObject[key] = add_split_soul(settings, dmgObject[key]);
        }
    }
    // Adrenaline from crit buff/inspiration
    // TODO check when this actually applies
    if (settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.INSPIRATION) {
        add_adrenaline(settings, 0.5);
    }
    if (
        (abils[settings['ability']]['crit effects'] === true) &&
        settings[SETTINGS.CRIT_BUFF] && settings[SETTINGS.EXPECTED_ADRENALINE]
    ) {
        let prob = dmgObject['crit']['probability'];
        add_adrenaline(settings, (prob * 8));
    }

    return dmgObject;

    // TODO
    // Marco - apply any effects that happen on-damage here
    // I think currently that is only rng stuff like applying poison
    // also if the hit is a crit it should proc fsoa and give crit adren here for example

}

/**
 * Sets the min and var hit values for a given dmgObject as follows:
 * 1. Looks up and sets ability % values
 * 2. Applies style specific modifiers
 * 3. Calculates real damage ranges based on boosted AD
 * @param settings - Overall settings object
 * @param dmgObject - The dmgObject to set the min and var hit values for
 * @returns The dmgObject 
 */
function set_min_var(settings, dmgObject: DamageObject) {
    let abilityKey = dmgObject['non_crit']['ability'];
    for (let key in dmgObject) {
        dmgObject[key]['min hit'] = abils[abilityKey]['min hit'];
        dmgObject[key]['var hit'] = abils[abilityKey]['var hit'];

        if (abils[abilityKey]['main style'] === 'magic') {
            // detonate
            if (abilityKey === ABILITIES.DETONATE) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.45 * settings[SETTINGS.DETONATE]; // TODO: fix missing reference for SETTINGS.DETONATE
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.1 * settings[SETTINGS.DETONATE];
            }

            // flank
            if (abilityKey === ABILITIES.IMPACT) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }
            else if (abilityKey === ABILITIES.DEEP_IMPACT) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
            }
        }

        if (abils[abilityKey]['main style'] === 'melee') {
            // greater barge tick bonus
            if (abilityKey === ABILITIES.GREATER_BARGE) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + Math.min(0.02 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
            }
            // icy tempest
            if (
                abilityKey=== ABILITIES.ICY_TEMPEST_1 ||
                settings['ability'] === ABILITIES.ICY_TEMPEST_2
            ) {
                dmgObject[key]['min hit'] += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
                dmgObject[key]['var hit'] += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
            }
            // flank
            if (abilityKey === ABILITIES.BACKHAND) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }

            if (abilityKey === ABILITIES.FORCEFUL_BACKHAND) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
            }
        }

        if (abils[abilityKey]['main style'] === 'ranged') {
            // salt the wound stack bonus
            if (abilityKey === ABILITIES.SALT_THE_WOUND) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
            }
            // flank
            if (settings[SETTINGS.FLANKING] > 0) {
                if (abilityKey === ABILITIES.BINDING_SHOT) {
                    dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                    dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
                }
                else if (abilityKey === ABILITIES.TIGHT_BINDINGS) {
                    dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                    dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
                }
            }
        }

        if (abils[abilityKey]['main style'] === 'necromancy') {
            // death grasp (death guard spec)
            if (abilityKey === ABILITIES.DEATH_GRASP) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
            }

            // flank
            if (abilityKey === ABILITIES.SOUL_STRIKE) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }
        }
    }
    
    // // Marco - turn off min/var percent boosts
    // // set actual min var values
    for (let key in dmgObject) {
        dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * dmgObject[key]['boosted AD']);
        dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * dmgObject[key]['boosted AD']);
    }

    return dmgObject;
}

export {on_stall, on_cast, on_hit, on_damage}