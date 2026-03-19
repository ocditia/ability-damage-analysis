/**
 * Types for style-specific effect handlers
 */

import { ABILITIES } from '../../const/const';
import { DamageDistribution, DamageObject } from '../../types';

/**
 * Context passed to effect handlers
 */
export interface EffectContext {
    settings: Record<string, any>;
    abilityKey: ABILITIES;
    timers?: Record<string, number>;
}

/**
 * Result from boosted AD effect application
 */
export interface BoostedADResult {
    /** Whether any effect was applied */
    applied: boolean;
    /** Any state that needs to be cleaned up after (e.g., chaos roar consumed) */
    cleanup?: () => void;
}

/**
 * Callback type for iterating over damage distributions
 */
export type DistributionCallback = (distribution: DamageDistribution) => void;

/**
 * Interface for style-specific effect handlers
 */
export interface StyleEffects {
    /**
     * Apply effects that modify boosted AD (weapon bonuses, etc.)
     * Called during on_cast phase
     */
    applyBoostedADEffects: (
        ctx: EffectContext,
        distribution: DamageDistribution,
        baseDamage: number
    ) => BoostedADResult;

    /**
     * Apply ability-specific effects (conflagrate, etc.)
     * Called after boosted AD is set
     */
    applyAbilitySpecificEffects: (
        ctx: EffectContext,
        distribution: DamageDistribution
    ) => void;

    /**
     * Apply ability percent modifiers (flanking, detonate charge, etc.)
     * Called in set_min_var before conversion to damage values
     */
    applyAbilityPercentModifiers: (
        ctx: EffectContext,
        distribution: DamageDistribution
    ) => void;

    /**
     * Apply effects that modify min/var hit
     * Called during on_hit phase
     */
    applyMinVarEffects: (
        ctx: EffectContext,
        distribution: DamageDistribution
    ) => void;

    /**
     * Apply multiplicative buff effects
     * Called during on_hit phase
     */
    applyMultiplicativeEffects: (
        ctx: EffectContext,
        distribution: DamageDistribution,
        boost: number
    ) => number;

    /**
     * Handle stack generation/consumption
     * Called at end of on_hit
     */
    applyStackEffects: (ctx: EffectContext) => void;

    /**
     * Apply bonus damage effects (flat damage additions)
     * Called after multiplicative buffs
     */
    applyBonusDamageEffects: (
        ctx: EffectContext,
        distribution: DamageDistribution
    ) => void;

    /**
     * Consume stacks after damage has been calculated.
     * Called after on_hit, so stacks were available for damage calculation
     * but are now spent. Handles residual souls, necrosis, conc stacks, etc.
     * Optional — styles without stack consumption can omit this.
     */
    consumeStacks?: (ctx: EffectContext) => void;
}
