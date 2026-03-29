/**
 * Melee-specific damage calculation effects
 */

import { ABILITIES, abils } from '$lib/data/abilities';
import { ARMOUR } from '$lib/data/armour';
import { WEAPONS } from '$lib/data/weapons';
import { SETTINGS } from '../../settings_rb';
import { DamageDistribution } from '../../types';
import { EffectContext, BoostedADResult, StyleEffects } from './types';

/**
 * Apply melee weapon effects that modify boosted AD
 */
function applyBoostedADEffects(
    ctx: EffectContext,
    distribution: DamageDistribution,
    baseDamage: number
): BoostedADResult {
    const { settings, abilityKey } = ctx;
    let applied = false;
    let cleanup: (() => void) | undefined;

    // Terrasaur maul
    if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === WEAPONS.TERRASAUR_MAUL
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.125);
        applied = true;
    }
    // Terrasaur maul upgraded
    else if (
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH &&
        settings[SETTINGS.TH] === WEAPONS.TERRASAUR_MAUL_PLUS
    ) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * 1.175);
        applied = true;
    }

    // keris
    if (settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW) {
        if ([WEAPONS.KERIS, WEAPONS.PRIMED_KERIS, WEAPONS.CONSECRATED_KERIS].includes(settings[SETTINGS.MH])) {
            distribution['boosted AD'] = Math.floor(1.333 * distribution['boosted AD']);
        }
        else if ([WEAPONS.KERIS_PROC, WEAPONS.PRIMED_KERIS_PROC, WEAPONS.CONSECRATED_KERIS_PROC].includes(settings[SETTINGS.MH])) {
            distribution['boosted AD'] = 2 * distribution['boosted AD'];
        }
    }

    // Chaos roar (1.75x boosted AD for next ability)
    if (
        settings[SETTINGS.CHAOS_ROAR] === true &&
        abilityKey !== ABILITIES.CHAOS_ROAR &&
        abils[abilityKey]?.damagePotentialEffects === true
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

    // Dismember lunging - (10 + 3 per rank)% more damage
    if (abilityKey === ABILITIES.DISMEMBER_HIT && settings[SETTINGS.LUNGING] > 0) {
        distribution['boosted AD'] = Math.floor(distribution['boosted AD'] * (1 + (0.10 + 0.03 * settings[SETTINGS.LUNGING])));
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
        distribution.minHit = distribution.minHit + Math.min(0.05 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.5);
        distribution.varHit = distribution.varHit + Math.min(0.07 * settings[SETTINGS.TIME_SINCE_ATTACK], 0.7);
    }

    // Icy Tempest
    if (
        abilityKey === ABILITIES.ICY_TEMPEST_1 ||
        abilityKey === ABILITIES.ICY_TEMPEST_2
    ) {
        distribution.minHit += 0.18 * settings[SETTINGS.PRIMORDIAL_ICE];
        distribution.varHit += 0.04 * settings[SETTINGS.PRIMORDIAL_ICE];
    }

    // Bloodlust: Assault damage from 130-150% to 170-190% (add 0.40 to min)
    if (
        abilityKey === ABILITIES.ASSAULT_HIT &&
        settings['_bloodlust_consumed'] === ABILITIES.ASSAULT
    ) {
        distribution.minHit += 0.40;
    }

    // Bloodlust: Flurry/Greater Flurry +1% per 1% HP missing, max 65%
    if (
        (abilityKey === ABILITIES.FLURRY_HIT || abilityKey === ABILITIES.GREATER_FLURRY_HIT) &&
        (settings['_bloodlust_consumed'] === ABILITIES.FLURRY || settings['_bloodlust_consumed'] === ABILITIES.GREATER_FLURRY)
    ) {
        const hpMissing = 100 - (settings[SETTINGS.TARGET_HP_PERCENT] || 100);
        const bonusMult = Math.min(hpMissing, 65) / 100;
        distribution.minHit *= (1 + bonusMult);
        distribution.varHit *= (1 + bonusMult);
    }

    // Flanking - Backhand (basic stun)
    if (abilityKey === ABILITIES.BACKHAND) {
        distribution.minHit += distribution.minHit * 0.4 * settings[SETTINGS.FLANKING];
        distribution.varHit += distribution.varHit * 0.4 * settings[SETTINGS.FLANKING];
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
        boost = Math.floor(boost * 1.75);
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

    if (abils[abilityKey]?.mainStyle !== 'melee') return;
    if (abils[abilityKey]?.onHitEffects !== true) return;

    // Gflurry berserk extension
    const isBerserk = settings[SETTINGS.BERSERK] === true;
    if (
        (abilityKey === ABILITIES.GREATER_FLURRY_HIT) &&
        (settings['_bloodlust_consumed'] === ABILITIES.GREATER_FLURRY) &&
        isBerserk && ctx.timers
    ) {
        ctx.timers[SETTINGS.BERSERK] += 1;
    }

    // Deduplicate: multihit sub-hits share the same key
    const castId = settings['ability'] + ':' + abilityKey;
    if (settings['_last_stack_ability_melee'] === castId) return;
    settings['_last_stack_ability_melee'] = castId;

    
    const cap = isBerserk ? 8 : 4;
    let stacks = settings[SETTINGS.BLOODLUST_STACKS] || 0;

    // Rend grants 2 stacks (4 during Berserk)
    if (abilityKey === ABILITIES.REND) {
        const gain = isBerserk ? 4 : 2;
        stacks = Math.min(stacks + gain, cap);
    }
    // Basic melee abilities grant 1 stack (2 during Berserk)
    else if (abils[abilityKey]?.abilityType === 'basic') {
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
        (settings[SETTINGS.OH] === WEAPONS.DARK_SLIVER_OF_LENG ||
            settings[SETTINGS.OH] === WEAPONS.DARK_SLIVER_OF_LENG_IM ||
            settings[SETTINGS.OH] === WEAPONS.DARK_ICE_SLIVER) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW &&
        settings[SETTINGS.FROSTBLADES] === true
    ) {
        distribution.minHit += Math.floor(0.24 * settings[SETTINGS.ABILITY_DAMAGE]);
    }

    // Am-zi necklace (melee only: +floor(1.35 * Attack level) to min hit)
    if (settings[SETTINGS.NECKLACE] === ARMOUR.AM_ZI) {
        distribution.minHit += Math.floor(1.35 * settings[SETTINGS.ATTACK_LEVEL]);
    }
}

/**
 * Consume stacks after damage has been calculated.
 */
function consumeStacks(ctx: EffectContext): void {
    const { settings, abilityKey } = ctx;

    // Icy Tempest — consumes all Primordial Ice stacks
    if (abilityKey === ABILITIES.ICY_TEMPEST) {
        settings[SETTINGS.PRIMORDIAL_ICE] = 0;
    }
}

export const meleeEffects: StyleEffects = {
    applyBoostedADEffects,
    applyAbilitySpecificEffects,
    applyAbilityPercentModifiers,
    applyMinVarEffects,
    applyMultiplicativeEffects,
    applyStackEffects,
    applyBonusDamageEffects,
    consumeStacks
};
