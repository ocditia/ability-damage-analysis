/**
 * Ranged-specific damage calculation effects
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings';
import { DamageDistribution } from '../../types';
import { EffectContext, BoostedADResult, StyleEffects } from './types';
import { handle_wen_buff } from '../rotation_damage_helper';

/**
 * Check if Icy Precision should be Activated and handle it
 * Called during on_cast phase for ranged abilities
 */
export function handleWenBuffActivation(
    settings: Record<string, any>,
    timers: Record<string, number>,
    abilityKey: ABILITIES
): void {
    if (abils[abilityKey]?.['main style'] !== 'ranged') {
        return;
    }

    const isEligibleAbilityType = ['threshold', 'special attack', 'ultimate'].includes(
        abils[abilityKey]?.['ability type']
    );

    const hasWenArrows = settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS;
    const isTwoHand = settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH;
    const notOnIcyPrecision = !timers[SETTINGS.ICY_PRECISION] || timers[SETTINGS.ICY_PRECISION] < 0;

    // Abilities that don't consume Wen buff
    const excludedAbilities: ABILITIES[] = [
        ABILITIES.GREATER_DEATHS_SWIFTNESS,
        ABILITIES.SPLIT_SOUL_ECB,
        ABILITIES.DEATHS_SWIFTNESS_DOT,
        ABILITIES.DEATHS_SWIFTNESS
    ];

    if (
        hasWenArrows &&
        isEligibleAbilityType &&
        isTwoHand &&
        notOnIcyPrecision &&
        !excludedAbilities.includes(abilityKey)
    ) {
        handle_wen_buff(settings, timers);
    }
}

/**
 * Apply ranged weapon effects that modify boosted AD
 */
function applyBoostedADEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): BoostedADResult {
    const { settings, abilityKey } = ctx;
    let applied = false;

    // Hexhunter bow
    if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.HEX
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.125);
        applied = true;
    }
    // Hexhunter bow upgraded
    else if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === SETTINGS.RANGED_TH_VALUES.HEX_E
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.175);
        applied = true;
    }

    // Icy precision (Wen arrows)
    if (
        ['threshold', 'ultimate', 'special attack'].includes(abils[abilityKey]?.['ability type']) &&
        settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS &&
        settings[SETTINGS.ICY_PRECISION] > 0
    ) {
        distribution['boosted AD'] = Math.floor(
            distribution['boosted AD'] * (1 + 0.02 * settings[SETTINGS.ICY_PRECISION])
        );
        applied = true;
    }

    // Balance by Force activation (BoLG spec)
    if (abilityKey === ABILITIES.BALANCE_BY_FORCE) {
        settings[SETTINGS.BALANCE_BY_FORCE] = true;
    }

    return { applied };
}

/**
 * Apply ranged ability-specific effects
 */
function applyAbilitySpecificEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Piercing shot bound/stunned bonus
    if (
        abilityKey === ABILITIES.PIERCING_SHOT_HIT &&
        (settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.STUNNED ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND ||
            settings[SETTINGS.TARGET_DISABILITY] === SETTINGS.TARGET_DISABILITY_VALUES.BOUND_STUNNED)
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.3);
    }

    // Frag shot walk bonus
    if (
        (abilityKey === ABILITIES.FRAGMENTATION_SHOT_HIT || abilityKey === ABILITIES.FRAGMENTATION_SHOT) &&
        settings[SETTINGS.WALKED_TARGET] === true
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 2);
    }
}

/**
 * Apply ranged ability percent modifiers (before conversion to damage values)
 */
function applyAbilityPercentModifiers(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // Salt the Wound stack bonus
    if (abilityKey === ABILITIES.SALT_THE_WOUND) {
        distribution['min hit'] = distribution['min hit'] + 0.1 * settings[SETTINGS.PUNCTURE_STACKS];
        distribution['var hit'] = distribution['var hit'] + 0.05 * settings[SETTINGS.PUNCTURE_STACKS];
    }

    // Flanking - Binding Shot (basic stun)
    if (settings[SETTINGS.FLANKING] > 0) {
        if (abilityKey === ABILITIES.BINDING_SHOT) {
            distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
            distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
        }
        // Flanking - Tight Bindings (threshold stun)
        else if (abilityKey === ABILITIES.TIGHT_BINDINGS) {
            distribution['min hit'] += distribution['min hit'] * 0.15 * settings[SETTINGS.FLANKING];
            distribution['var hit'] += distribution['var hit'] * 0.15 * settings[SETTINGS.FLANKING];
        }
    }
}

/**
 * Apply ranged effects that modify min/var hit
 */
function applyMinVarEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    const { settings, abilityKey } = ctx;

    // OG bane ammo (bane bolts/arrows)
    if (settings[SETTINGS.AMMO] === 'bane bolts' || settings[SETTINGS.AMMO] === 'bane arrows') {
        if (abilityKey === ABILITIES.RANGED_AUTO) {
            distribution['min hit'] = Math.floor(distribution['min hit'] * 1.4);
            distribution['var hit'] = Math.floor(distribution['var hit'] * 1.4);
        } else {
            distribution['min hit'] = Math.floor(distribution['min hit'] * 1.25);
            distribution['var hit'] = Math.floor(distribution['var hit'] * 1.25);
        }
    }

    // Sirenic armour set effect (with Bik arrows)
    if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.BIK_ARROWS) {
        // Sirenic 3-piece
        if (
            settings[SETTINGS.HELMET] === SETTINGS.RANGED_HELMET_VALUES.SIRENIC &&
            settings[SETTINGS.BODY] === SETTINGS.RANGED_BODY_VALUES.SIRENIC &&
            settings[SETTINGS.LEGS] === SETTINGS.RANGED_LEGS_VALUES.SIRENIC
        ) {
            distribution['min hit'] = Math.floor(distribution['min hit'] * 1.04);
            distribution['var hit'] = Math.floor(distribution['var hit'] * 1.04);
        }
    }

    // Jas arrows bane effect
    if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.JAS_ARROWS) {
        distribution['min hit'] = Math.floor(distribution['min hit'] * 1.3);
        distribution['var hit'] = Math.floor(distribution['var hit'] * 1.3);
    }

    // Ful arrows effect
    if (settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.FUL_ARROWS) {
        distribution['min hit'] = Math.floor(distribution['min hit'] * 1.15);
        distribution['var hit'] = Math.floor(distribution['var hit'] * 1.15);
    }

    // Pernix quiver (low HP bonus)
    if (
        settings['ammo slot'] === 'pernix quiver' &&
        settings[SETTINGS.TARGET_HP_PERCENT] <= 25
    ) {
        distribution['var hit'] = Math.floor(
            distribution['var hit'] + 0.04 * (distribution['min hit'] + distribution['var hit'])
        );
    }
}

/**
 * Apply ranged multiplicative effects
 */
function applyMultiplicativeEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    boost: number
): number {
    const { settings, abilityKey } = ctx;

    // Death's Swiftness
    if (settings[SETTINGS.DEATH_SWIFTNESS] === true) {
        boost = Math.floor(boost * 1.5);
    }

    return boost;
}

/**
 * Handle ranged stack effects
 */
function applyStackEffects(ctx: EffectContext): void {
    const { settings, abilityKey } = ctx;

    // Icy chill stacks (Wen arrows) - only on basic abilities
    if (
        settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.WEN_ARROWS &&
        abils[abilityKey]?.['ability type'] === 'basic' &&
        abils[abilityKey]?.['main style'] === 'ranged' &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        settings[SETTINGS.ICY_CHILL_STACKS] = Math.min(
            (settings[SETTINGS.ICY_CHILL_STACKS] || 0) + 1,
            15
        );
    }
    // Bik stacks (Bik arrows)
    else if (
        settings[SETTINGS.AMMO] === SETTINGS.AMMO_VALUES.BIK_ARROWS &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH
    ) {
        settings[SETTINGS.BIK_STACKS] = Math.min(
            (settings[SETTINGS.BIK_STACKS] || 0) + 1,
            200
        );
    }
}

/**
 * Apply ranged bonus damage effects
 */
function applyBonusDamageEffects(
    ctx: EffectContext,
    distribution: DamageDistribution
): void {
    // Ranged currently has no flat bonus damage effects
    // (enchanted bolts are proc-based)
}

export const rangedEffects: StyleEffects = {
    applyBoostedADEffects,
    applyAbilitySpecificEffects,
    applyAbilityPercentModifiers,
    applyMinVarEffects,
    applyMultiplicativeEffects,
    applyStackEffects,
    applyBonusDamageEffects
};
