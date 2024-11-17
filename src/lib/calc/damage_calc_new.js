import { next_cast, next_hit, next_tick } from './ability_helper';
import { ABILITIES, abils, armour, gear, prayers, weapons } from './const';
import { create_object } from './object_helper';
import { SETTINGS } from './settings';

// Marco - some changes might have to be made.
// e.g. currently conflagrate is true/false, but this should be a timer so it should check conflagrate >=1.

function on_cast(settings, dmgObject) {
    // This function happens as an ability is cast

    // scale to hit chance / damage potential
    for (let key in dmgObject) {
        dmgObject[key]['boosted AD'] = Math.floor(settings[SETTINGS.ABILITY_DAMAGE] * 
            Math.min(settings[SETTINGS.HIT_CHANCE] / 100, 1));
    }

    // Marco - turn off hit chance stuff here (idt anything exists)

    // calculate boosted AD / invisible AD
    for (let key in dmgObject) {
        
        if (abils[settings['ability']]['main style'] === 'magic') {
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
    
        else if (abils[settings['ability']]['main style'] === 'melee') {
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

        if (abils[settings['ability']]['main style'] === 'ranged') {
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
                ['threshold', 'ultimate', 'special attack'].includes(abils[settings['ability']]['ability type']) &&
                settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * (1 + 0.03 * settings[SETTINGS.ICY_PRECISION]));
            }
        }

        // necromancy has no (known) buffs of this type
        else if (abils[settings['ability']]['main style'] === 'necromancy') {

        }

        // scripture of Amascut
        if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.AMASCUT) {
            dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.1);
        }
    }

    // Marco - turn off boosted AD stuff here
    // e.g. turn off chaos roar after it's been used

    // apply ability specific effects
    for (let key in dmgObject) {
        if (abils[settings['ability']]['main style'] === 'magic') {
            // conflagrate
            if (settings['ability'] === ABILITIES.COMBUST_HIT && settings[SETTINGS.CONFLAGRATE] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.4);
            }

            // song of destruction 2 item set effect
            if (
                ['bleed', 'burn', 'dot'].includes(abils[settings['ability']]['ability classification']) && 
                    settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING && 
                    settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT && 
                    settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // kerapac's wristwraps
            if (settings['ability'] === ABILITIES.COMBUST_HIT) {
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
            if (settings['ability'] === ABILITIES.COMBUST_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }

            // wrack bound
            if (
                settings['ability'] === ABILITIES.WRACK &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] ===
                        SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // wrack and ruin bound
            if (
                settings['ability'] === ABILITIES.WRACK_AND_RUIN &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] ===
                        SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.6);
            }
        }

        if (abils[settings['ability']]['main style'] === 'melee') {
            // slice bound
            if (
                settings['ability'] === ABILITIES.SLICE &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.4);
            }

            // slaughter walk
            if (settings['ability'] === ABILITIES.SLAUGHTER_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 3);
            }

            // punish low
            if (settings['ability'] === ABILITIES.PUNISH && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2.5);
            }
        }

        if (abils[settings['ability']]['main style'] === 'ranged') {
            // piercing shot bound
            if (
                settings['ability'] === ABILITIES.PIERCING_SHOT_HIT &&
                (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
                    settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.3);
            }

            // frag walk
            if (settings['ability'] === ABILITIES.FRAGMENTATION_SHOT_HIT && settings[SETTINGS.WALKED_TARGET] === true) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }
        }

        if (abils[settings['ability']]['main style'] === 'necromancy') {
            // death spark (omni guard passive)
            if (settings[SETTINGS.DEATH_SPARK] === true && settings['ability'] === ABILITIES.NECRO_AUTO) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 1.5);
            }

            // living dead - finger of death
            if (
                settings[SETTINGS.LIVING_DEATH] === true &&
                settings['ability'] === ABILITIES.FINGER_OF_DEATH
            ) {
                dmgObject[key]['boosted AD'] = Math.floor(dmgObject[key]['boosted AD'] * 2);
            }

            // skeleton warrior stacks
            if (settings['ability'] === ABILITIES.SKELETON_WARRIOR_AUTO) {
                dmgObject[key]['boosted AD'] = Math.floor(
                    dmgObject['boosted AD'] *
                        (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS])
                );
            }

            // The first necromancer armour + conjurer's amulet
        }
    }

    // Marco - turn off ability specific stuff here
    // e.g. turn off conflagrate after it's been used
    return 1;

    // Marco - here the single cast should be split up into the different effects
    // e.g. if you cast dclaws, it should then be split up into 4 hits
    // or for wild magic, it should be split into the two wild magic hits
}

function on_hit(settings, dmgObject) {
    // this function runs for all hits (note: note hitsplats)

    // set min and var percentages
    for (let key in dmgObject) {
        dmgObject[key]['min hit'] = abils[settings['ability']]['min hit'];
        dmgObject[key]['var hit'] = abils[settings['ability']]['var hit'];

        if (abils[settings['ability']]['main style'] === 'magic') {
            // detonate
            if (settings['ability'] === ABILITIES.DETONATE) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.45 * settings[SETTINGS.DETONATE]; // TODO: fix missing reference for SETTINGS.DETONATE
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.1 * settings[SETTINGS.DETONATE];
            }

            // flank
            if (settings['ability'] === ABILITIES.IMPACT) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }
            else if (settings['ability'] === ABILITIES.DEEP_IMPACT) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
            }
        }

        if (abils[settings['ability']]['main style'] === 'melee') {
            // greater barge tick bonus
            if (settings['ability'] === ABILITIES.GREATER_BARGE) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + Math.min(0.02 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
            }

            // icy tempest
            if (
                settings['ability'] === ABILITIES.ICY_TEMPEST_1 ||
                settings['ability'] === ABILITIES.ICY_TEMPEST_2
            ) {
                dmgObject[key]['min hit'] += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
                dmgObject[key]['var hit'] += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
            }

            // flank
            if (settings['ability'] === ABILITIES.BACKHAND) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }

            if (settings['ability'] === ABILITIES.FORCEFUL_BACKHAND) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
            }
        }

        if (abils[settings['ability']]['main style'] === 'ranged') {
            // salt the wound stack bonus
            if (settings['ability'] === ABILITIES.SALT_THE_WOUND) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
                dmgObject[key]['var hit'] = dmgObject[key]['var hit'] + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
            }

            // flank
            if (settings['ability'] === ABILITIES.BINDING_SHOT) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }
            else if (settings['ability'] === ABILITIES.TIGHT_BINDINGS) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
            }
        }

        if (abils[settings['ability']]['main style'] === 'necromancy') {7
            // death grasp (death guard spec)
            if (settings['ability'] === ABILITIES.DEATH_GRASP) {
                dmgObject[key]['min hit'] = dmgObject[key]['min hit'] + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
            }

            // flank
            if (settings['ability'] === ABILITIES.SOUL_STRIKE) {
                dmgObject[key]['min hit'] += dmgObject[key]['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
                dmgObject[key]['var hit'] += dmgObject[key]['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
            }
        }
    }

    // Marco - turn off min/var percent boosts

    // set actual min var values
    for (let key in dmgObject) {
        dmgObject[key]['min hit'] = dmgObject[key]['min hit'] * dmgObject[key]['boosted AD'];
        dmgObject[key]['var hit'] = dmgObject[key]['var hit'] * dmgObject[key]['boosted AD'];
    }
    
    

    // compute on-hit effects
    if (abils[settings['ability']]['on-hit effects'] === true) {
        // Marco - turn on any style specific effects (idt there are any)

        // calc style specific effects
        for (let key in dmgObject) {
            if (abils[settings['ability']]['main style'] === 'magic') {

            }

            if (abils[settings['ability']]['main style'] === 'melee') {
                
            }

            if (abils[settings['ability']]['main style'] === 'ranged') {
                // og bane ammo
                if (settings['ammunition'] === 'bane bolts' || settings['ammunition'] === 'bane arrows') {
                    if (
                        settings['ability'] === 'ranged main-hand auto' ||
                        settings['ability'] === 'ranged two-hand auto' ||
                        settings['ability'] === 'ranged off-hand auto'
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

            if (abils[settings['ability']]['main style'] === 'necromancy') {
                
            }
        }

        // Marco - turn off any style specific effects (idt there are any)

        // apply precise
        for (let key in dmgObject) {
            dmgObject['min hit'] = dmgObject['min hit'] + 
            Math.floor(0.015 * settings[SETTINGS.PRECISE] * (dmgObject['min hit'] + dmgObject['var hit']));
            dmgObject['var hit'] = dmgObject['var hit'] - 
            Math.floor(0.015 * settings[SETTINGS.PRECISE] * (dmgObject['min hit'] + dmgObject['var hit']));
        }

        // Marco - turn additive boosts on if appropriate
        // Discrete example: needle strike
        // if we're inside the timer for needle strike to apply we turn needle strike on and set
        // the timer to 0 to turn it off
        if (settings[SETTINGS.NEEDLE_STRIKE_BUFFER] > 0 && 
            abils[settings['ability']]['main style'] === 'ranged'
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

            // turn on gop on-hit buff if appropriate
            if (settings[a] > 0 &&
                abils[settings['ability']]['main style'] === 'ranged'
            ) {
                if ([SETTINGS.NECKLACE_VALUES.AOS, SETTINGS.NECKLACE_VALUES.AOSOR, SETTINGS.NECKLACE_VALUES.EOF, SETTINGS.NECKLACE_VALUES.EOFOR].includes(settings[SETTINGS.NECKLACE])) {
                    settings[a] = 'fleeting';
                }
                else {
                    settings[a] = true;
                }
                
                settings[a] = 0;
            }
            // apply gop on-hit buff
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

            // Discrete example: needle strike
            // apply needle strike damage buff
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

            // apply boost
            dmgObject[key]['min hit'] = Math.floor(dmgObject[key]['min hit'] * (1 + boost));
            dmgObject[key]['var hit'] = Math.floor(dmgObject[key]['var hit'] * (1 + boost));
        }

        // Marco - turn off additive boosts, note that needle strike should get turned off when the tick changes, not here
    
        // Marco - turn on multiplicative shared boosts

        // apply multiplicative shared buffs
        for (let key in dmgObject) {
            boost = 0;
            if (abils[settings['ability']]['main style'] === 'magic') {
                // prayer boost
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

                // divine rage
                if (settings[SETTINGS.DIVINE_RAGE] === true) {
                    boost += 0.05;
                }

                // sunshine
                if (settings[SETTINGS.SUNSHINE] === true) {
                    boost = Math.floor(boost * 1.5);
                }

                // blood tithe (exsanguinate)
                if (abils[settings['ability']]['ability type'] === 'basic') {
                    boost = Math.floor(boost * (1 + settings[SETTINGS.BLOOD_TITHE] / 100));
                }
            }
        
            if (abils[settings['ability']]['main style'] === 'melee') {
                // prayer boost
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

            if (abils[settings['ability']]['main style'] === 'ranged') {
                // prayer boost
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

                // death swiftness
                if (settings[SETTINGS.DEATH_SWIFTNESS] === true) {
                    boost = Math.floor(boost * 1.5);
                }
            }

            if (abils[settings['ability']]['main style'] === 'necromancy') {
                // prayer boost
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

            // apply buff
            dmgObject[key]['min hit'] = Math.floor((dmgObject[key]['min hit'] * boost) / 10000);
            dmgObject[key]['var hit'] = Math.floor((dmgObject[key]['var hit'] * boost) / 10000);
        }

        // Marco - turn off multiplicative shared boosts
    
        // Marco - turn on multiplicative pve only buffs

        // apply multiplicative pve only buffs
        for (let key in dmgObject) {
            if (abils[settings['ability']]['main style'] === 'magic') {
                // spellcaster gloves (proc based, so added later)
                // boost = boost; // useless self-assignment
            }

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
            if (abils[settings['ability']]['main style'] === 'melee') {
                // frostblades (leng off-hand effects)
                if (
                    (settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.LENG ||
                        settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER) &&
                    settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
                    settings[SETTINGS.FROSTBLADES] === true
                ) {
                    dmgObject['min hit'] += Math.floor(0.24 * dmgObject['boosted AD']);
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
    if ([ABILITIES.CORRUPTION_BLAST, ABILITIES.CORRUPTION_SHOT].includes(settings['ability'])) {
        settings['corruption damage'] = structuredClone(dmgObject);
    }

    // store igneous cleave damage
    if (settings['ability'] === ABILITIES.IGNEOUS_CLEAVE_BLEED) {
        settings['igneous cleave bleed damage'][key]['damage list'] = structuredClone(dmgObject);
    }

    // calc core
    if (abils[settings['ability']]['on-hit effects'] === true) {
        // Marco - Discrete example: bolg
        // add a bolg stack
        if (settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH) {
                settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] += 1;
        }

        for (let key in dmgObject) {
            for (let i=0; i<dmgObject[key]['damage list'].length; i++) {
                // berserker's fury
                dmgObject[key]['damage list'][i] = Math.floor(
                    dmgObject[key]['damage list'][i] * (1 + settings[SETTINGS.BERSERKERS_FURY] / 100)
                );
        
                // dharock's gear (proc based, so added later)
                
                // Marco - Discrete example: bolg
                // store damage into bolg if needed
                if (
                    settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.BOLG &&
                    settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
                    (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 8 ||
                        (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4 &&
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
            }
        }

        // store fsoa damage
        if (abils[settings['ability']]['crit effects'] === true 
            && settings[SETTINGS.INSTABILITY] === true 
            && abils[settings['ability']]['damage type'] === 'magic' 
            && settings['ability'] != 'time strike') {
                settings['fsoa damage'] = structuredClone(dmgObject);
        }

        // store bloat damages
        if (settings['ability'] === ABILITIES.BLOAT) {
            settings['bloat damage'] = structuredClone(dmgObject);
        }

        // Marco - Discrete example: bolg
        // if bolg procced set bolg stacks back to 0
        if (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 8 ||
            (settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] === 4 &&
                settings[SETTINGS.BALANCE_BY_FORCE] === true)) {
                    settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS] = 0;
                }
    }
    
    return 1;

    // Marco - After this the damage object should be sent to the correct tick
    // so that the damage can be calculated on that tick
}