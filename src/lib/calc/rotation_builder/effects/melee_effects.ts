/**
 * Melee-specific damage calculation effects
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings_rb';
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

    // Chaos roar (1.75x boosted AD for next ability)
    if (
        settings[SETTINGS.CHAOS_ROAR] === true &&
        abilityKey !== ABILITIES.CHAOS_ROAR &&
        abils[abilityKey]?.['damage potential effects'] === true
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] / 100 * 175);
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

    // Punish low HP bonus
    if (abilityKey === ABILITIES.PUNISH && settings[SETTINGS.TARGET_HP_PERCENT] <= 50) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 2.5);
    }

    // Dismember lunging - (10 + 3 per rank)% more damage
    if (abilityKey === ABILITIES.DISMEMBER_HIT && settings[SETTINGS.LUNGING] > 0) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * (1 + (0.10 + 0.03 * settings[SETTINGS.LUNGING])));
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

    // Bloodlust: Assault damage from 130-150% to 170-190% (add 0.40 to min)
    if (
        abilityKey === ABILITIES.ASSAULT_HIT &&
        settings['_bloodlust_consumed'] === ABILITIES.ASSAULT
    ) {
        distribution['min hit'] += 0.40;
    }

    // Bloodlust: Flurry/Greater Flurry +1% per 1% HP missing, max 65%
    if (
        (abilityKey === ABILITIES.FLURRY_HIT || abilityKey === ABILITIES.GREATER_FLURRY_HIT) &&
        (settings['_bloodlust_consumed'] === ABILITIES.FLURRY || settings['_bloodlust_consumed'] === ABILITIES.GREATER_FLURRY)
    ) {
        const hpMissing = 100 - (settings[SETTINGS.TARGET_HP_PERCENT] || 100);
        const bonusMult = Math.min(hpMissing, 65) / 100;
        distribution['min hit'] *= (1 + bonusMult);
        distribution['var hit'] *= (1 + bonusMult);
    }

    // Flanking - Backhand (basic stun)
    if (abilityKey === ABILITIES.BACKHAND) {
        distribution['min hit'] += distribution['min hit'] * 0.4 * settings[SETTINGS.FLANKING];
        distribution['var hit'] += distribution['var hit'] * 0.4 * settings[SETTINGS.FLANKING];
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
 * Handle melee stack effects (bloodlust stacks)
 *
 * Stack gaining:
 * - Melee basic ability: +1 stack (+2 during Berserk)
 * - Rend: +2 stacks (+4 during Berserk)
 * - Berserk activation: +4 stacks (handled in on_stall)
 * Cap: 4 normally, 8 during Berserk
 */
function applyStackEffects(ctx: EffectContext): void {
    const { settings, abilityKey } = ctx;

    if (abils[abilityKey]?.['main style'] !== 'melee') return;
    if (abils[abilityKey]?.['on-hit effects'] !== true) return;

    // Deduplicate: multihit sub-hits share the same key
    const castId = settings['ability'] + ':' + abilityKey;
    if (settings['_last_stack_ability_melee'] === castId) return;
    settings['_last_stack_ability_melee'] = castId;

    const isBerserk = settings[SETTINGS.BERSERK] === true;
    const cap = isBerserk ? 8 : 4;
    let stacks = settings[SETTINGS.BLOODLUST_STACKS] || 0;

    // Rend grants 2 stacks (4 during Berserk)
    if (abilityKey === ABILITIES.REND) {
        const gain = isBerserk ? 4 : 2;
        stacks = Math.min(stacks + gain, cap);
    }
    // Basic melee abilities grant 1 stack (2 during Berserk)
    else if (abils[abilityKey]?.['ability type'] === 'basic') {
        const gain = isBerserk ? 2 : 1;
        stacks = Math.min(stacks + gain, cap);
    }

    settings[SETTINGS.BLOODLUST_STACKS] = stacks;
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
            settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.LENG_IM ||
            settings[SETTINGS.OH] === SETTINGS.MELEE_OH_VALUES.DARK_ICE_SLIVER) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
        settings[SETTINGS.FROSTBLADES] === true
    ) {
        distribution['min hit'] += Math.floor(0.24 * distribution['boosted AD']);
    }

    // Am-zi necklace (melee only: +floor(1.35 * Attack level) to min hit)
    if (settings[SETTINGS.NECKLACE] === SETTINGS.NECKLACE_VALUES.AM_ZI) {
        distribution['min hit'] += Math.floor(1.35 * settings[SETTINGS.ATTACK_LEVEL]);
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
