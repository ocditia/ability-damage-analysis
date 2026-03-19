/**
 * Pure utility functions for damage calculation
 * These have no dependencies on on_cast/on_hit to avoid circular imports
 */

import { SETTINGS } from '../settings_rb';
import { ABILITIES, abils, weapons } from '../const/const';
import { DamageObject } from '../types';

// =============================================================================
// Crit Damage Calculation
// =============================================================================

/**
 * Calculate the crit damage multiplier based on equipped gear and buffs
 * @param settings - game settings object
 * @returns crit damage multiplier (0.5 base + bonuses)
 */
export function calc_crit_damage(settings: Record<string, any>, dmgObj: DamageObject): number {
    let crit_buff = 0.5; // base crit damage

    // Smoke cloud (+15% magic, +6% other)
    if (settings[SETTINGS.SMOKE_CLOUD] === true) {
        if (abils[settings['ability']]?.['main style'] === 'magic') {
            crit_buff += 0.15;
        } else {
            crit_buff += 0.06;
        }
    }

    // Channeler's ring (magic channels only)
    if (
        settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELLER_E &&
        abils[settings['ability']]?.['ability classification'] === 'channel' &&
        abils[settings['ability']]?.['main style'] === 'magic'
    ) {
        crit_buff += 0.025 * (1 + settings[SETTINGS.CHANNELLER_RING_STACKS]);
    }

    // Champion's ring (melee, based on bleeds)
    if (
        settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHAMPION_E &&
        abils[settings['ability']]?.['main style'] === 'melee'
    ) {
        crit_buff += 0.015 * settings[SETTINGS.NUMBER_OF_BLEEDS];
    }

    // Stalker's ring (ranged with bow)
    if (
        abils[settings['ability']]?.['main style'] === 'ranged' &&
        settings[SETTINGS.RING] === SETTINGS.RING_VALUES.STALKER_E &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        (weapons[settings[SETTINGS.TH]]?.['type'] === 'bow' ||
            settings[SETTINGS.TH_TYPE_CUSTOM] === SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW)
    ) {
        crit_buff += 0.03;
    }

    // FSOA crit bonus (15-25%, avg 20%)
    if (
        (settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.FSOA || settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.FSOA_IM) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MAX_CRIT) {
            crit_buff += 0.25;
        } else if (settings[SETTINGS.MODE] === SETTINGS.MODE_VALUES.MIN_CRIT) {
            crit_buff += 0.15;
        } else {
            crit_buff += 0.2;
        }
    }

    // tumeken's resplendence pc
    if (abils[settings['ability']]['main style'] === 'magic' && 
        settings[SETTINGS.TUMEKENS_RESPLENDENCE_ASPHYX] === true
    ) {
        crit_buff += 0.35;
    }

	// magic leagues relic
	if (abils[settings['ability']]['main style'] === 'magic' && 
		settings[SETTINGS.MAGIC_LEAGUES_RELIC] === true) {
		crit_buff += 0.5;
		}
        
    if (dmgObj.ability === ABILITIES.THE_FINAL_FLURRY_1) {
        crit_buff += 0.25;
    }

    if (dmgObj.ability === ABILITIES.THE_FINAL_FLURRY_2) {
        crit_buff += 0.5;
    }

    return crit_buff;
}

// =============================================================================
// Soul Split / Split Soul Calculations
// =============================================================================

/**
 * Calculate soul split heal amount for a single hit
 * @param hit - damage dealt
 * @param settings - game settings object
 * @returns heal amount
 */
function calc_soul_split_hit(hit: number, settings: Record<string, any>): number {
    let heal = 0;

    // Heal 10% of first 2k
    heal += Math.min(0.1 * hit, 200);
    hit -= 2000;

    // Heal 5% of the next 2000
    if (hit > 0) {
        heal += Math.min(0.05 * hit, 100);
        hit -= 2000;
    }

    // Heal 1.25% over the rest
    if (hit > 0) {
        heal += 0.0125 * hit;
    }

    // Amulet of souls bonus healing (+18.75%)
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

/**
 * Calculate split soul (ECB spec) damage for a hit
 * Split soul deals 4x the soul split heal as damage
 * @param hit - damage dealt
 * @param settings - game settings object
 * @returns split soul damage
 */
export function calc_split_soul_hit(hit: number, settings: Record<string, any>): number {
    return 4 * calc_soul_split_hit(hit, settings);
}

// =============================================================================
// Hit Sequence Generation
// =============================================================================

/**
 * Get the hit sequence for a multihit ability, accounting for gear/perks
 * @param settings - game settings object (must have settings['ability'] set)
 * @returns hit sequence object { tick: [abilities...] }
 */
export function get_hit_sequence(settings: Record<string, any>): Record<number, string[]> {
    const abilityKey = settings['ability'];
    let rotation = JSON.parse(JSON.stringify(abils[abilityKey]['hits'])); // Deep copy


    // Igneous Showdown with EZK and Flamebound Rival
    if (
        abilityKey === ABILITIES.IGNEOUS_SHOWDOWN &&
        settings[SETTINGS.FLAMEBOUND_RIVAL] === true
    ) {
        rotation[1].push(
            'next hit', ABILITIES.IGNEOUS_SHOWDOWN_BONUS,
            'next hit', ABILITIES.IGNEOUS_SHOWDOWN_BONUS,
            'next hit', ABILITIES.IGNEOUS_SHOWDOWN_BONUS
        );
    }

    // Masterwork Spear of Annihilation bleed extensions
    if (
        settings[SETTINGS.MELEE_TH] === SETTINGS.MELEE_TH_VALUES.MW_SPEAR &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        if (abilityKey === ABILITIES.DISMEMBER) {
            rotation[1].push(ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT);
        }
        if (abilityKey === ABILITIES.SLAUGHTER) {
            rotation[1].push(ABILITIES.SLAUGHTER_HIT, ABILITIES.SLAUGHTER_HIT, ABILITIES.SLAUGHTER_HIT);
        }
        if (abilityKey === ABILITIES.MASSACRE) {
            rotation[1].push(ABILITIES.MASSACRE_BLEED, ABILITIES.MASSACRE_BLEED, ABILITIES.MASSACRE_BLEED);
        }
    }

    // Strength cape dismember extension
    if (settings[SETTINGS.STRENGTH_CAPE] === true && abilityKey === ABILITIES.DISMEMBER) {
        rotation[1].push(ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT, ABILITIES.DISMEMBER_HIT);
    }

    // Igneous cape auto-swap: default hit sequences are igneous.
    // When not wearing an igneous cape, swap to non-igneous hit sequences.
    const hasIgneousCape = settings[SETTINGS.CAPE] === SETTINGS.CAPE_VALUES.ZUK;
    if (!hasIgneousCape) {
        if (abilityKey === ABILITIES.OVERPOWER) {
            // Non-igneous: single 550-600% hit (uses OVERPOWER's own min/var)
            rotation = { 1: [ABILITIES.OVERPOWER] };
        }
        else if (abilityKey === ABILITIES.OMNIPOWER) {
            // Non-igneous: single 420-500% hit
            rotation = { 1: [ABILITIES.OMNIPOWER_REGULAR] };
        }
        else if (abilityKey === ABILITIES.DEADSHOT) {
            // Non-igneous: 4x 105-125% hits
            rotation = { 1: [ABILITIES.DEADSHOT_INITIAL, ABILITIES.DEADSHOT_INITIAL, ABILITIES.DEADSHOT_INITIAL, ABILITIES.DEADSHOT_INITIAL] };
        }
        else if (abilityKey === ABILITIES.DEATHSKULLS_4) {
            // Non-igneous single target: 3 damaging hits (M→P→M→P→M, player bounces deal no damage)
            rotation = { 1: [ABILITIES.DEATHSKULLS, ABILITIES.DEATHSKULLS, ABILITIES.DEATHSKULLS] };
        }
    }

    // Volley of Souls - hits based on residual souls count
    if (abilityKey === ABILITIES.VOLLEY_OF_SOULS_DYNAMIC) {
        const residualSouls = settings[SETTINGS.RESIDUAL_SOULS] || 0;
        if (residualSouls >= 2) {
            rotation[1].push(ABILITIES.VOLLEY_OF_SOULS);
            for (let i = 1; i < residualSouls; i++) {
                rotation[1].push('next hit', ABILITIES.VOLLEY_OF_SOULS);
            }
        }
    }

    settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = 1;
    if (settings[SETTINGS.DAMAGE_PER_UNIT] === SETTINGS.DAMAGE_PER_UNIT_VALUES.TICK) {
        settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = 3;
        if (abils[settings['ability']]['ability classification'] === 'channel') {
            settings[SETTINGS.DAMAGE_PER_UNIT_DIVIDER] = Math.min(settings[SETTINGS.HIT_COUNTER_END], 
                Object.keys(abils[settings['ability']]["hits"]).map(item => parseInt(item, 10)).pop());
        }
    }

    // TO-DO give the option to get a start and end hit for an ability
    // to track and kill off the rest

    return rotation;
}

// =============================================================================
// Adrenaline
// =============================================================================

export function addAdrenaline(settings: Record<string, any>, amount: number) {
    if (settings[SETTINGS.NATURAL_INSTINCT] && amount > 0) {
        amount *= 2;
    }
    let new_adren = settings[SETTINGS.ADRENALINE] + amount;

    // Vestments of Havoc: full set (4 pieces) + melee abilities in rotation = +20 max adrenaline
    const hasFullVestments = settings['_hasMeleeAbilities'] &&
        settings[SETTINGS.MELEE_HELMET] === SETTINGS.MELEE_HELMET_VALUES.VESTMENTS &&
        settings[SETTINGS.MELEE_BODY] === SETTINGS.MELEE_BODY_VALUES.VESTMENTS &&
        settings[SETTINGS.MELEE_LEGS] === SETTINGS.MELEE_LEGS_VALUES.VESTMENTS &&
        settings[SETTINGS.MELEE_BOOTS] === SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS;

    let max_adren = 100 + (hasFullVestments ? 20 : 0);
    if (settings[SETTINGS.HEIGHTENED_SENSES]) max_adren += 10;

    settings[SETTINGS.ADRENALINE] = settings[SETTINGS.CAP_ADRENALINE] ? Math.min(max_adren, new_adren) : new_adren;
}
