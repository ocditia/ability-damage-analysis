import { ABILITIES, abils, weapons } from '../const/const';
import { prayers } from '../const/prayers';
import { SETTINGS } from '../settings_rb';
import { DamageObject, DamageKind, DamageDistribution } from '../types';
import { Logger, LogCategory } from '../../utils/Logger';

const logger = Logger.getInstance();

function create_damage_object(settings: Record<string, any>, ability: ABILITIES): DamageObject {
    let crit_chance = 0
    if (abils[ability]['crit effects'] === true) {
        crit_chance = calc_crit_chance(settings, ability);
        logger.log(LogCategory.ABILITY_DAMAGE, `Crit chance for ${ability}`, crit_chance);
    }
    
    const nonCritDistribution: DamageDistribution = {
        'min hit': 0,
        'var hit': 0,
        'crit': false,
        'probability': 1 - crit_chance,
        'damage list': []
    };
    
    const critDistribution: DamageDistribution = {
        'min hit': 0,
        'var hit': 0,
        'crit': true,
        'probability': crit_chance,
        'damage list': []
    };
    
    const distributions: Record<DamageKind, DamageDistribution | undefined> = {
        'non_crit': nonCritDistribution,
        'crit': critDistribution
    };
    
    const result = {
        distributions,
        ability: ability,
        likelihood: 1.0
    };
    
    logger.log(LogCategory.ABILITY_DAMAGE, `create_damage_object result for ${ability}`, result);
    return result;   
}

function calc_crit_chance(settings: Record<string, any>, abilityKey: ABILITIES): number {
    // base crit chance
    let crit_chance = 0.1;

    if (settings[SETTINGS.EQ_PERK]) {
        return 0.0 // No crits if Equilibrium perk used
    }

    // eclipsed soul
    if (settings[SETTINGS.ECLIPSED_SOUL] === true && 
        (prayers[settings[SETTINGS.PRAYER]].book === "normal")) {
        crit_chance += 0.04;
    }

    // biting
    crit_chance += 0.02 * settings[SETTINGS.BITING];

    // level 20 armour
    if (settings[SETTINGS.LVL20ARMOUR] === true) {
        crit_chance += 0.002 * settings[SETTINGS.BITING];
    }

    // warpriest of tuska
    if (settings['helmet'] === 'warpriest of tuska helm') {
        crit_chance += 0.01;
    }
    if (settings['body'] === 'warpriest of tuska cuirass') {
        crit_chance += 0.01;
    }
    if (settings['legs'] === 'warpriest of tuska robe legs') {
        crit_chance += 0.01;
    }
    if (settings['gloves'] === 'warpriest of tuska gauntlets') {
        crit_chance += 0.01;
    }
    if (settings['boots'] === 'warpriest of tuska boots') {
        crit_chance += 0.01;
    }
    if (settings['cape'] === 'warpriest of tuska cape') {
        crit_chance += 0.01;
    }

    // sliske tuska
    if (
        settings[SETTINGS.HELMET] === SETTINGS.MAGIC_HELMET_VALUES.SLISKE &&
        settings[SETTINGS.BODY] === SETTINGS.MAGIC_BODY_VALUES.SLISKE &&
        settings[SETTINGS.LEGS] === SETTINGS.MAGIC_LEGS_VALUES.SLISKE
    ) {
        crit_chance += 0.06;
    }

    // erethdor's grimoire
    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.GRIM) {
        crit_chance += 0.12;
    }

    // leagues pocket
    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.LEAGUES_POCKET) {
        crit_chance += 0.12;
    }

    // reaver's ring
    if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.REAVERS) {
        crit_chance += 0.05;
    }

    // kalg base
    if (settings['familiar'] === 'kalgerion demon') {
        crit_chance += 0.01;
    }

    // kalg scroll
    if (settings[SETTINGS.KALG_SPEC] === true) {
        crit_chance += 0.05;
    }

    if (abils[abilityKey]['main style'] === 'magic') {
        // tectonic armour
        if (settings[SETTINGS.HELMET] === SETTINGS.MAGIC_HELMET_VALUES.TECTONIC) {
            crit_chance += 0.01;
        }
        if (settings[SETTINGS.BODY] === SETTINGS.MAGIC_BODY_VALUES.TECTONIC) {
            crit_chance += 0.01;
        }
        if (settings[SETTINGS.LEGS] === SETTINGS.MAGIC_LEGS_VALUES.TECTONIC) {
            crit_chance += 0.01
        }

        // elite tectonic armour'
        if (settings[SETTINGS.HELMET] === SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC) {
            crit_chance += 0.02;
        }
        if (settings[SETTINGS.BODY] === SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC) {
            crit_chance += 0.02;
        }
        if (settings[SETTINGS.LEGS] === SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC) {
            crit_chance += 0.02;
        }

        //tumeken armour
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
            crit_chance += 0.015 * tumekens_resplendence;
        }
        
        if (settings[SETTINGS.CAPE] === SETTINGS.CAPE_VALUES.TUSKA &&
            settings[SETTINGS.GLOVES] === SETTINGS.MAGIC_GLOVES_VALUES.TUSKA &&
            settings[SETTINGS.BOOTS] === SETTINGS.MAGIC_BOOTS_VALUES.TUSKA
        ) {
            crit_chance += 0.03;
        }

        // channeller's ring
        if (
            (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELLER || 
                settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELLER_E) 
            &&
            abils[abilityKey]['ability classification'] === 'channel'
        ) {
            crit_chance += 0.04;
            crit_chance += 0.04 * (1 + settings[SETTINGS.CHANNELLER_RING_STACKS]);
        }

        // (g)conc
        crit_chance += 0.05 * settings[SETTINGS.CONCENTRATED_BLAST_STACKS];

        // conc self boost
        if (abilityKey === ABILITIES.CONCENTRATED_BLAST_2) {
            crit_chance += 0.05;
        } else if (abilityKey === ABILITIES.CONCENTRATED_BLAST_3) {
            crit_chance += 0.1;
        }

        // gconc self boost (higher base + anima charged bonus)
        if (abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_2) {
            crit_chance += 0.07;
            if (settings[SETTINGS.ANIMA_CHARGED] === true) {
                crit_chance += 0.1;
            }
        } else if (abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_3) {
            crit_chance += 0.14;
            if (settings[SETTINGS.ANIMA_CHARGED] === true) {
                crit_chance += 0.2;
            }
        }

        // smoke tendrils
        if ([ABILITIES.SMOKE_TENDRILS_1, ABILITIES.SMOKE_TENDRILS_2, ABILITIES.SMOKE_TENDRILS_3, ABILITIES.SMOKE_TENDRILS_4].includes(abilityKey)) {
            crit_chance = 1;
        }

        // Magma tempest
        if (abilityKey === ABILITIES.MAGMA_TEMPEST) {
            crit_chance = 0;
        }
    }

    if (abils[abilityKey]['main style'] === 'melee') {
        // champion's ring
        if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHAMPION || settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHAMPION_E) {
            crit_chance += 0.03;
            if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHAMPION_E) {
                crit_chance += 0.01;
            }
        }

        // (g)fury
        if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.REGULAR && abilityKey !== ABILITIES.FURY) {
            crit_chance += 0.25;
            settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.NONE; // TODO check this is the correct place - should only work on one hitsplat
        } else if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.GREATER && abilityKey !== ABILITIES.GREATER_FURY) {
            crit_chance = 1;
            settings[SETTINGS.FURY_BUFF] = SETTINGS.FURY_BUFF_VALUES.NONE; // TODO check this is the correct place - should only work on one hitsplat
        }

        // no fear (pof meteor strike)
        if (abilityKey === 'meteor strike') {
            if (settings[SETTINGS.POF_DINOS] === SETTINGS.POF_DINOS_VALUES.CORBICULA_1) {
                crit_chance += 0.2;
            }
            else if (settings[SETTINGS.POF_DINOS] === SETTINGS.POF_DINOS_VALUES.CORBICULA_2) {
                crit_chance += 0.4;
            }   
        }

        // The Final Flurry: hits 1 & 2 get +25% crit, hit 3 gets +50% crit
        if (abilityKey === ABILITIES.THE_FINAL_FLURRY_1) {
            crit_chance += 0.25;
        }
        if (abilityKey === ABILITIES.THE_FINAL_FLURRY_2) {
            crit_chance += 0.5;
        }
    }

    if (abils[abilityKey]['main style'] === 'ranged') {
        // stalker's ring
        if (
            (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.STALKER || settings[SETTINGS.RING] === SETTINGS.RING_VALUES.STALKER_E) &&
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            (weapons[settings[SETTINGS.TH]]['type'] === 'bow' || settings[SETTINGS.TH_TYPE_CUSTOM] === SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW)
        ) {
            crit_chance += 0.03;
            if (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.STALKER_E && 
                (weapons[settings[SETTINGS.TH]]['type'] === 'bow' || settings[SETTINGS.TH_TYPE_CUSTOM] === SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW)) {
                crit_chance+= 0.01;
            }
        }

        // shadow tendril
        if (abilityKey === ABILITIES.SHADOW_TENDRILS) {
            crit_chance = 1;
        }

        // dracolich — supports both boolean (rotation builder buff) and dropdown (single-ability page)
        if (settings[SETTINGS.GREATER_DRACOLICH_INFUSION] === true) {
            crit_chance += 0.4;
        } else if (settings[SETTINGS.DRACOLICH_INFUSION] === true ||
                   settings[SETTINGS.DRACOLICH_INFUSION] === SETTINGS.DRACOLICH_INFUSION_VALUES?.GREATER) {
            crit_chance += 0.4;
        } else if (settings[SETTINGS.DRACOLICH_INFUSION] === SETTINGS.DRACOLICH_INFUSION_VALUES?.REGULAR) {
            crit_chance += 0.2;
        }

        // deathspore arrows
        if (
            settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
            settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.DEATHSPORE_ARROWS
        ) {
            crit_chance += 0.03;
        }
    }

    // max hit mode
    if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_CRIT ||
        settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_CRIT ||
        settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MEAN_CRIT
    ) {
        crit_chance = 1;
    }

    // min hit mode
    if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_NO_CRIT ||
        settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_NO_CRIT ||
        settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MEAN_NO_CRIT
    ) {
        crit_chance = 0;
    }


    const result = Math.min(1, crit_chance);
    return result;
}

/**
 * Legacy wrapper — reads ability from settings['ability'].
 * Used by damage_calc_rb.js which sets settings['ability'] before calling.
 */
function create_object(settings: Record<string, any>): DamageObject {
    const ability = settings['ability'] as ABILITIES;
    return create_damage_object(settings, ability);
}

export { calc_crit_chance, create_damage_object, create_object };