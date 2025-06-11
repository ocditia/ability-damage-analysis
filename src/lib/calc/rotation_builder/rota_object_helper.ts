import { ABILITIES, abils, weapons, prayers } from '../const';
import { on_cast, on_hit } from './damage_calc_new';
import { SETTINGS } from '../settings';
import { DamageObject, DamageKind, DamageDistribution } from '../types';

function create_damage_object(settings: Record<string, any>, ability: string): DamageObject {
    let crit_chance = 0
    if (abils[ability]['crit effects'] === true) {
        crit_chance = calc_crit_chance(settings, ability);
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
    
    return {
        distributions,
        ability: ability,
        likelihood: 1.0
    };   
}

function calc_crit_chance(settings: Record<string, any>, abilityKey: string): number {
    // base crit chance
    let crit_chance = 0.1;

    // eclipsed soul
    if (settings[SETTINGS.ECLIPSED_SOUL] === true && 
        (prayers[settings[SETTINGS.PRAYER]]['book'] === "normal" || prayers[settings[SETTINGS.PRAYER]]['style'] === "none")) {
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
        // channeller's ring
        if (
            (settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER || settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELER_E) &&
            abils[abilityKey]['ability classification'] === 'channel'
        ) {
            crit_chance += 0.04;
            crit_chance += 0.04 * (1 + settings[SETTINGS.CHANNELER_RING_STACKS]);
        }

        // (g)conc
        crit_chance += 0.05 * settings[SETTINGS.CONCENTRATED_BLAST_STACKS];

        // (g)conc self boost
        if (
            abilityKey === ABILITIES.CONCENTRATED_BLAST_2 ||
            abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_2
        ) {
            crit_chance += 0.05;
        } else if (
            abilityKey === ABILITIES.CONCENTRATED_BLAST_3 ||
            abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_3
        ) {
            crit_chance += 0.1;
        }

        // smoke tendrils
        if ([ABILITIES.SMOKE_TENDRILS_1, ABILITIES.SMOKE_TENDRILS_2, ABILITIES.SMOKE_TENDRILS_3, ABILITIES.SMOKE_TENDRILS_4].includes(abilityKey)) {
            crit_chance = 1;
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
        if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.REGULAR) {
            crit_chance += 0.25;
        } else if (settings[SETTINGS.FURY_BUFF] === SETTINGS.FURY_BUFF_VALUES.GREATER) {
            crit_chance = 1;
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

        // dracolich
        if (settings[SETTINGS.DRACOLICH_INFUSION] === SETTINGS.DRACOLICH_INFUSION_VALUES.REGULAR) {
            crit_chance += 0.2;
        } else if (settings[SETTINGS.DRACOLICH_INFUSION] === SETTINGS.DRACOLICH_INFUSION_VALUES.GREATER) {
            crit_chance += 0.4;
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

    // equilibrium aura
    if (settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.EQUILIBRIUM) {
        crit_chance = 0;
    }

    return Math.min(1, crit_chance);
}

export { calc_crit_chance, create_damage_object }; 