/**
 * Magic-specific damage calculation effects
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings_rb';
import { DamageDistribution } from '../../types';
import { EffectContext, BoostedADResult, StyleEffects } from './types';

/**
 * Apply magic weapon effects that modify boosted AD
 */
function applyBoostedADEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    baseDamage: number
): BoostedADResult {
    const { settings, abilityKey } = ctx;
    let applied = false;

    // Inquisitor staff
    if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.INQ_STAFF
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.125);
        applied = true;
    }
    // Inquisitor staff upgraded
    else if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.MAGIC_TH_VALUES.INQ_STAFF_E
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.175);
        applied = true;
    }

    // crumble undead
    if (settings[SETTINGS.AUTO_CAST] === SETTINGS.AUTO_CAST_VALUES.CRUMBLE_UNDEAD) {
        distribution['boosted AD'] = Math.floor(1.3 * distribution['boosted AD']);
    }

    // blast infused — magic basics get +8% of base AD added to boosted AD
    if (abils[abilityKey]?.['main style'] === 'magic' &&
        abils[abilityKey]?.['ability type'] === 'basic' &&
        settings[SETTINGS.BLAST_INFUSED] === true
    ) {
        distribution['boosted AD'] += Math.floor(baseDamage * 80 / 1000);
    }

    // blood tithe (exsanguinate) — basics get +1% of base AD per stack
    if (abils[abilityKey]?.['ability type'] === 'basic' && settings[SETTINGS.BLOOD_TITHE] > 0) {
        distribution['boosted AD'] += Math.floor(baseDamage / 1000 * settings[SETTINGS.BLOOD_TITHE] * 10);
    }

    // caroming chain — reduces bounced hit damage to a percentage
    if (settings[SETTINGS.CHAIN_MODIFIER] !== SETTINGS.CHAIN_MODIFIER_VALUES.NONE) {
        let chainModifier = 25;
        if (settings[SETTINGS.CHAIN_MODIFIER] === SETTINGS.CHAIN_MODIFIER_VALUES.GREATER) {
            chainModifier = 50;
        }
        if (settings[SETTINGS.CAROMING] >= 1) {
            chainModifier += 5 * (1 + settings[SETTINGS.CAROMING]);
        }
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] / 100 * chainModifier);
    }

    return { applied };
}

/**
 * Apply magic ability-specific effects
 */
function applyAbilitySpecificEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    if (abilityKey === ABILITIES.THE_LAST_COMMAND) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * (1 + 0.01 * (100 - Math.max(settings[SETTINGS.TARGET_HP_PERCENT],25))));
    }

    // Dragon Breath — 25% more damage if target is combusted
    if (abilityKey === ABILITIES.DRAGON_BREATH && settings[SETTINGS.COMBUSTED] === true) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.25);
    }

    // Conflagrate (boosted Combust)
    if (abilityKey === ABILITIES.COMBUST && settings[SETTINGS.CONFLAGRATE] === true) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.4);
    }

    // Song of Destruction 2-piece set effect (RoA + OtD)
    if (
        ['bleed', 'burn', 'dot'].includes(abils[abilityKey]?.['ability classification']) &&
        (settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING || settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING_IM) &&
        (settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT || settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT_IM) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.3);
    }

    // Kerapac's wristwraps (Combust)
    if (abilityKey === ABILITIES.COMBUST) {
        if (settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR) {
            distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.25);
        } else if (settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED) {
            distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.4);
        }
    }

    // Combust lunging - (10 + 3 per rank)% more damage
    if (abilityKey === ABILITIES.COMBUST && settings[SETTINGS.LUNGING] > 0) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * (1 + (0.10 + 0.03 * settings[SETTINGS.LUNGING])));
    }

    // Greater chain — non-bleed/burn/dot abilities deal half damage
    if (
        settings[SETTINGS.GREATER_CHAIN] === true &&
        !['bleed', 'burn', 'dot'].includes(abils[abilityKey]?.['ability classification'])
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 0.5);
    }
}

/**
 * Apply magic ability percent modifiers (before conversion to damage values)
 * These modify the base min/var percentages from ability data
 */
function applyAbilityPercentModifiers(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Anima Charged Dragon Breath: 260-310% instead of 110-130%
    if (abilityKey === ABILITIES.DRAGON_BREATH && settings['anima charged cast'] === true) {
        distribution['min hit'] = 2.6;
        distribution['var hit'] = 0.5;
    }

    // Flanking - Impact
    if (abilityKey === ABILITIES.IMPACT) {
        distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    }

    if (abilityKey === ABILITIES.ASPHYXIATE_HIT) {
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
        if (tumekens_resplendence >= 4) {
            distribution['min hit'] = 0.71;
            distribution['var hit'] = 0.13;
        }
    }
}

/**
 * Apply magic effects that modify min/var hit (on-hit phase)
 */
function applyMinVarEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Channeler's ring
    if (
        settings[SETTINGS.RING] === SETTINGS.RING_VALUES.CHANNELLERS_RING &&
        abils[abilityKey]?.['ability classification'] === 'channel'
    ) {
        distribution['min hit'] = Math.floor(distribution['min hit'] * 1.04);
        distribution['var hit'] = Math.floor(distribution['var hit'] * 1.04);
    }
}

/**
 * Apply magic multiplicative effects
 */
function applyMultiplicativeEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    boost: number = 10000
): number {
    const { settings, abilityKey } = ctx;

    // Divine rage (note: += 0.05 to a base of 10000 is effectively no change after flooring)
    if (settings[SETTINGS.DIVINE_RAGE] === true) {
        boost += 0.05;
    }

    // Sunshine
    if (settings[SETTINGS.SUNSHINE] === true) {
        boost = Math.floor(boost * 1.5);
    }

    // blast infused — moved to applyBoostedADEffects
    // blood tithe — moved to applyBoostedADEffects

    return boost;
}

/**
 * Handle magic stack effects
 * Increments blood tithe (exsanguinate) and glacial embrace (incite fear) stacks.
 *
 * Stacks are gained once per ability activation (not per hit), so multihit abilities
 * like Wild Magic only grant 1 stack. Channeled abilities grant 1 per channel tick
 * since each tick enters on_hit separately with its own sub-ability key.
 *
 * We use a flag ('_last_stack_ability') to deduplicate: if the same parent ability
 * key already incremented stacks, skip subsequent hits from the same cast.
 */
function applyStackEffects(ctx: EffectContext): void {
    const { settings, abilityKey } = ctx;

    // Only increment on magic damage abilities with on-hit effects
    if (abils[abilityKey]?.['main style'] !== 'magic') return;
    if (abils[abilityKey]?.['on-hit effects'] !== true) return;

    // Deduplicate: multihit sub-hits share the same key (e.g. 'wild magic hit')
    // and fire multiple on_hit calls in the same cast. Use settings['ability']
    // (set to parent key in on_cast) plus this hit key to detect repeats.
    const castId = settings['ability'] + ':' + abilityKey;
    if (settings['_last_stack_ability'] === castId) return;
    settings['_last_stack_ability'] = castId;

    // Blood tithe stacks (exsanguinate) - 1 per cast, cap 12, decay after 20.4s (34 ticks)
    if (settings[SETTINGS.AUTO_CAST] === SETTINGS.AUTO_CAST_VALUES.EXSANGUINATE) {
        settings[SETTINGS.BLOOD_TITHE] = Math.min(
            (settings[SETTINGS.BLOOD_TITHE] || 0) + 1,
            12
        );
        if (ctx.timers) {
            ctx.timers['_blood_tithe_decay'] = 34;
        }
    }

    // Glacial embrace stacks (incite fear) - 1 per cast, cap 5, decay after 20.4s (34 ticks)
    if (settings[SETTINGS.AUTO_CAST] === SETTINGS.AUTO_CAST_VALUES.INCITE_FEAR) {
        settings[SETTINGS.GLACIAL_EMBRACE] = Math.min(
            (settings[SETTINGS.GLACIAL_EMBRACE] || 0) + 1,
            5
        );
        // Refresh decay timer - stacks fall off 34 ticks after last magic ability with incite fear
        if (ctx.timers) {
            ctx.timers['_glacial_embrace_decay'] = 34;
        }
    }
    // Concentrated blast / Greater concentrated blast stacks
    // Each sub-hit sets stacks to its hit number. The next non-conc ability
    // gets +5% crit per stack (applied in rota_object_helper calc_crit_chance).
    // Stacks are cleared when consumed (see below).
    const concAbilities = new Set([
        ABILITIES.CONCENTRATED_BLAST_1, ABILITIES.CONCENTRATED_BLAST_2, ABILITIES.CONCENTRATED_BLAST_3,
        ABILITIES.GREATER_CONCENTRATED_BLAST_1, ABILITIES.GREATER_CONCENTRATED_BLAST_2, ABILITIES.GREATER_CONCENTRATED_BLAST_3,
    ]);

    if (concAbilities.has(abilityKey as ABILITIES)) {
        const isGreater = [ABILITIES.GREATER_CONCENTRATED_BLAST_1, ABILITIES.GREATER_CONCENTRATED_BLAST_2, ABILITIES.GREATER_CONCENTRATED_BLAST_3].includes(abilityKey as ABILITIES);
        settings['_conc_is_greater'] = isGreater;
        // Track whether anima charged was active when this gconc was cast
        // (AC gets consumed on cast, but the stacks should carry the enhanced rate)
        if (abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_1 || abilityKey === ABILITIES.CONCENTRATED_BLAST_1) {
            settings['_conc_anima_charged'] = settings['anima charged cast'] === true;
        }

        // Determine which hit number this is (1, 2, or 3)
        if (abilityKey === ABILITIES.CONCENTRATED_BLAST_1 || abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_1) {
            settings[SETTINGS.CONCENTRATED_BLAST_STACKS] = 1;
        } else if (abilityKey === ABILITIES.CONCENTRATED_BLAST_2 || abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_2) {
            settings[SETTINGS.CONCENTRATED_BLAST_STACKS] = 2;
        } else if (abilityKey === ABILITIES.CONCENTRATED_BLAST_3 || abilityKey === ABILITIES.GREATER_CONCENTRATED_BLAST_3) {
            settings[SETTINGS.CONCENTRATED_BLAST_STACKS] = 3;
        }
    }
}

/**
 * Apply magic bonus damage effects
 */
function applyBonusDamageEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    // Magic currently has no flat bonus damage effects
}

export const magicEffects: StyleEffects = {
    applyBoostedADEffects,
    applyAbilitySpecificEffects,
    applyAbilityPercentModifiers,
    applyMinVarEffects,
    applyMultiplicativeEffects,
    applyStackEffects,
    applyBonusDamageEffects
};
