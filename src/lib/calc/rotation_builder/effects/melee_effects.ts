/**
 * Melee-specific damage calculation effects
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings';
import { DamageDistribution } from '../../types';
import { EffectContext, BoostedADResult, StyleEffects } from './types';

/**
 * Apply melee weapon effects that modify boosted AD
 */
function applyBoostedADEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): BoostedADResult {
    const { settings, abilityKey } = ctx;
    let applied = false;
    let cleanup: (() => void) | undefined;

    // Terrasaur maul
    if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.T_MAUL
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.125);
        applied = true;
    }
    // Terrasaur maul upgraded
    else if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.MELEE_TH_VALUES.T_MAUL_E
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.175);
        applied = true;
    }

    // Chaos roar (doubles boosted AD for next ability)
    if (
        settings[SETTINGS.CHAOS_ROAR] === true &&
        abilityKey !== ABILITIES.CHAOS_ROAR &&
        abils[abilityKey]?.['damage potential effects'] === true
    ) {
        distribution['boosted AD'] = 2 * distribution['boosted AD'];
        applied = true;
        cleanup = () => {
            settings[SETTINGS.CHAOS_ROAR] = false;
        };
    }

    return { applied, cleanup };
}

/**
 * Apply melee ability-specific effects
 */
function applyAbilitySpecificEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Slice bound/stunned bonus
    if (
        abilityKey === ABILITIES.SLICE &&
        (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.4);
    }

    // Slaughter walk bonus
    if (abilityKey === ABILITIES.SLAUGHTER && settings[SETTINGS.WALKED_TARGET] === true) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 3);
    }

    // Punish low HP bonus
    if (abilityKey === ABILITIES.PUNISH && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 2.5);
    }
}

/**
 * Apply melee ability percent modifiers (before conversion to damage values)
 */
function applyAbilityPercentModifiers(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Greater Barge tick bonus
    if (abilityKey === ABILITIES.GREATER_BARGE) {
        distribution['min hit'] = distribution['min hit'] + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
        distribution['var hit'] = distribution['var hit'] + Math.min(0.02 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
    }

    // Icy Tempest
    if (
        abilityKey === ABILITIES.ICY_TEMPEST_1 ||
        abilityKey === ABILITIES.ICY_TEMPEST_2
    ) {
        distribution['min hit'] += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
        distribution['var hit'] += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
    }

    // Flanking - Backhand (basic stun)
    if (abilityKey === ABILITIES.BACKHAND) {
        distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
    }
    // Flanking - Forceful Backhand (threshold stun)
    else if (abilityKey === ABILITIES.FORCEFUL_BACKHAND) {
        distribution['min hit'] += distribution['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
    }
}

/**
 * Apply melee effects that modify min/var hit
 */
function applyMinVarEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Vestments of havoc set effect
    if (
        settings[SETTINGS.HELMET] === SETTINGS.MELEE_HELMET_VALUES.HAVOC &&
        settings[SETTINGS.BODY] === SETTINGS.MELEE_BODY_VALUES.HAVOC &&
        settings[SETTINGS.LEGS] === SETTINGS.MELEE_LEGS_VALUES.HAVOC
    ) {
        distribution['min hit'] = Math.floor(distribution['min hit'] * 1.06);
        distribution['var hit'] = Math.floor(distribution['var hit'] * 1.06);
    }
}

/**
 * Apply melee multiplicative effects
 */
function applyMultiplicativeEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    boost: number
): number {
    const { settings, abilityKey } = ctx;

    // Berserk
    if (settings[SETTINGS.BERSERK] === true) {
        boost = Math.floor(boost * 2);
    }

    // ZGS Blackhole
    if (settings[SETTINGS.BLACKHOLE] === true) {
        boost = Math.floor(boost * 1.25);
    }

    // Rampage (dragon battleaxe spec)
    if (settings[SETTINGS.RAMPAGE] === true) {
        boost = Math.floor(boost * 1.2);
    }

    return boost;
}

/**
 * Handle melee stack effects
 */
function applyStackEffects(ctx: EffectContext): void {
    // Melee doesn't have stack mechanics like necromancy
}

/**
 * Apply melee bonus damage effects
 */
function applyBonusDamageEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Frostblades (Leng off-hand effects)
    if (
        (settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.LENG ||
            settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
        settings[SETTINGS.FROSTBLADES] === true
    ) {
        distribution['min hit'] += Math.floor(0.24 * distribution['boosted AD']);
    }
}

export const meleeEffects: StyleEffects = {
    applyBoostedADEffects,
    applyAbilitySpecificEffects,
    applyAbilityPercentModifiers,
    applyMinVarEffects,
    applyMultiplicativeEffects,
    applyStackEffects,
    applyBonusDamageEffects
};
