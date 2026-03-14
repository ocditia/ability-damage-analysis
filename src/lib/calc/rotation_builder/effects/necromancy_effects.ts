/**
 * Necromancy-specific damage calculation effects
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings_rb';
import { DamageDistribution } from '../../types';
import { EffectContext, BoostedADResult, StyleEffects } from './types';

/**
 * Apply necromancy weapon effects that modify boosted AD
 * Note: Necromancy currently has no known weapon-based boosted AD modifiers
 */
function applyBoostedADEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): BoostedADResult {
    // Necromancy has no (known) weapon buffs that modify boosted AD
    return { applied: false };
}

/**
 * Apply necromancy ability-specific effects
 */
function applyAbilitySpecificEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Death Spark empowered auto (Omni Guard) - at 5 stacks the auto does 2x damage
    if (abilityKey === ABILITIES.NECRO_AUTO &&
        settings[SETTINGS.NECRO_MH] === SETTINGS.NECRO_MH_VALUES.OMNI_GUARD &&
        (settings[SETTINGS.DEATH_SPARK_STACKS] || 0) >= 5) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 2);
    }

    // Living Death - Finger of Death 1.5x damage
    if (settings[SETTINGS.LIVING_DEATH] === true && abilityKey === ABILITIES.FINGER_OF_DEATH) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.5);
    }

    // Skeleton Warrior rage stacks
    if (abilityKey === ABILITIES.SKELETON_WARRIOR_AUTO) {
        distribution['boosted AD'] = Math.floor(
            distribution['boosted AD'] * (1 + 0.03 * settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS])
        );
    }
}

/**
 * Apply necromancy ability percent modifiers (before conversion to damage values)
 */
function applyAbilityPercentModifiers(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Death Grasp (Death Guard spec)
    if (abilityKey === ABILITIES.DEATH_GRASP) {
        distribution['min hit'] = distribution['min hit'] + 0.4 * settings[SETTINGS.NECROSIS_STACKS];
    }

    // Flanking - Soul Strike (basic stun)
    if (abilityKey === ABILITIES.SOUL_STRIKE) {
        distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    }
}

/**
 * Apply necromancy effects that modify min/var hit
 */
function applyMinVarEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // First Necromancer's equipment set effect
    // (Add when set bonus is confirmed)
}

/**
 * Apply necromancy multiplicative effects
 */
function applyMultiplicativeEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    boost: number
): number {
    // Necromancy has no style-specific multiplicative effects in the shared section
    // (Living Death effects are handled in ability-specific effects)
    return boost;
}

/**
 * Handle necromancy stack effects
 * This includes necrosis stacks, residual souls, and essence corruption
 */
function applyStackEffects(ctx: EffectContext): void {
    const { settings, abilityKey } = ctx;

    // Residual Souls - Soul Sap generates 1 soul
    if (abilityKey === ABILITIES.SOUL_SAP) {
        settings[SETTINGS.RESIDUAL_SOULS] = Math.min(
            (settings[SETTINGS.RESIDUAL_SOULS] || 0) + 1,
            7  // TODO: set soul limit dynamically based on gear
        );
    }

    // Necrosis Stacks
    // Touch of Death generates 4 stacks
    if (abilityKey === ABILITIES.TOUCH_OF_DEATH) {
        settings[SETTINGS.NECROSIS_STACKS] = Math.min(
            (settings[SETTINGS.NECROSIS_STACKS] || 0) + 4,
            12
        );
    }

    // Necro Auto generates 2 necrosis stacks ONLY during Living Death
    if (abilityKey === ABILITIES.NECRO_AUTO && settings[SETTINGS.LIVING_DEATH] === true) {
        settings[SETTINGS.NECROSIS_STACKS] = Math.min(
            (settings[SETTINGS.NECROSIS_STACKS] || 0) + 2,
            12
        );
    }

    // Omni Guard - Death Spark: each auto generates 1 stack (max 5).
    // Empowered auto at 5 stacks resets to 0 (damage applied in applyAbilitySpecificEffects).
    if (abilityKey === ABILITIES.NECRO_AUTO &&
        settings[SETTINGS.NECRO_MH] === SETTINGS.NECRO_MH_VALUES.OMNI_GUARD) {
        const currentStacks = settings[SETTINGS.DEATH_SPARK_STACKS] || 0;
        if (currentStacks >= 5) {
            // Empowered auto was fired — reset stacks
            settings[SETTINGS.DEATH_SPARK_STACKS] = 0;
        } else {
            settings[SETTINGS.DEATH_SPARK_STACKS] = currentStacks + 1;
        }
    }

    // Devourer's Guard - Soul Reave: each auto generates 1 stack, at 4 generates 1 Residual Soul (resets)
    if (abilityKey === ABILITIES.NECRO_AUTO &&
        settings[SETTINGS.NECRO_MH] === SETTINGS.NECRO_MH_VALUES.DEVOURERS_GUARD) {
        const stacks = (settings[SETTINGS.SOUL_REAVE_STACKS] || 0) + 1;
        if (stacks >= 4) {
            settings[SETTINGS.SOUL_REAVE_STACKS] = 0;
            settings[SETTINGS.RESIDUAL_SOULS] = Math.min(
                (settings[SETTINGS.RESIDUAL_SOULS] || 0) + 1,
                7
            );
        } else {
            settings[SETTINGS.SOUL_REAVE_STACKS] = stacks;
        }
    }

    // Essence Corruption
    // (Add generation logic when abilities are confirmed)
}

/**
 * Apply necromancy bonus damage effects
 */
function applyBonusDamageEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    // Necromancy currently has no flat bonus damage effects
}

/**
 * Consume residual souls for Volley of Souls
 * Called from on_cast after hit sequence is determined
 */
export function consumeResidualSouls(settings: Record<string, any>): void {
    if (settings[SETTINGS.RESIDUAL_SOULS] >= 2) {
        settings[SETTINGS.RESIDUAL_SOULS] = 0;
    }
}

/**
 * Check if Volley of Souls can be cast
 */
export function canCastVolleyOfSouls(settings: Record<string, any>): boolean {
    return (settings[SETTINGS.RESIDUAL_SOULS] || 0) >= 2;
}

/**
 * Get the number of hits for Volley of Souls based on residual souls
 */
export function getVolleyOfSoulsHitCount(settings: Record<string, any>): number {
    const souls = settings[SETTINGS.RESIDUAL_SOULS] || 0;
    return souls >= 2 ? souls : 0;
}

export const necromancyEffects: StyleEffects = {
    applyBoostedADEffects,
    applyAbilitySpecificEffects,
    applyAbilityPercentModifiers,
    applyMinVarEffects,
    applyMultiplicativeEffects,
    applyStackEffects,
    applyBonusDamageEffects
};
