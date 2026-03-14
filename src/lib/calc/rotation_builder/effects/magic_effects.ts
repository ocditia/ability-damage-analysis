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
    distribution: DamageDistribution
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

    // Flow stacks
    if (settings[SETTINGS.FLOW_STACKS] > 0) {
        distribution['boosted AD'] = Math.floor(
            distribution['boosted AD'] * (1 + 0.01 * settings[SETTINGS.FLOW_STACKS])
        );
        applied = true;
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

    // Conflagrate (boosted Combust)
    if (abilityKey === ABILITIES.COMBUST_HIT && settings[SETTINGS.CONFLAGRATE] === true) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.4);
    }

    // Song of Destruction 2-piece set effect (RoA + OtD)
    if (
        ['bleed', 'burn', 'dot'].includes(abils[abilityKey]?.['ability classification']) &&
        settings[SETTINGS.MH] === SETTINGS.MAGIC_MH_VALUES.ROAR_OF_AWAKENING &&
        settings[SETTINGS.OH] === SETTINGS.MAGIC_OH_VALUES.ODE_TO_DECEIT &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.3);
    }

    // Kerapac's wristwraps (Combust)
    if (abilityKey === ABILITIES.COMBUST_HIT) {
        if (settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.REGULAR) {
            distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.25);
        } else if (settings[SETTINGS.KERAPACS_WRIST_WRAPS] === SETTINGS.KERAPACS_WRIST_WRAPS_VALUES.ENCHANTED) {
            distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.4);
        }
    }

    // Combust lunging - (10 + 3 per rank)% more damage
    if (abilityKey === ABILITIES.COMBUST_HIT && settings[SETTINGS.LUNGING] > 0) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * (1 + (0.10 + 0.03 * settings[SETTINGS.LUNGING])));
    }

    // Wrack bound/stunned bonus
    if (
        abilityKey === ABILITIES.WRACK &&
        (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.3);
    }

    // Wrack and Ruin bound/stunned bonus
    if (
        abilityKey === ABILITIES.WRACK_AND_RUIN &&
        (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.6);
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

    // Detonate (variable charge time)
    if (abilityKey === ABILITIES.DETONATE) {
        distribution['min hit'] = distribution['min hit'] + 0.45 * settings[SETTINGS.DETONATE];
        distribution['var hit'] = distribution['var hit'] + 0.1 * settings[SETTINGS.DETONATE];
    }

    // Flanking - Impact (basic stun)
    if (abilityKey === ABILITIES.IMPACT) {
        distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    }
    // Flanking - Deep Impact (threshold stun)
    else if (abilityKey === ABILITIES.DEEP_IMPACT) {
        distribution['min hit'] += distribution['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
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
    boost: number
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

    // Blood tithe (exsanguinate) - basics only
    if (abils[abilityKey]?.['ability type'] === 'basic') {
        boost = Math.floor(boost * (1 + settings[SETTINGS.BLOOD_TITHE] / 100));
    }

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
