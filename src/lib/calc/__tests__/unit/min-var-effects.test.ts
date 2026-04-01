/**
 * Min/Var Hit Effects Tests
 *
 * Tests the two stages that modify ability damage percentages (min hit / var hit):
 *
 * 1. applyStyleAbilityPercentModifiers — modifies the raw % before boosted AD multiplication
 *    (Flanking, Anima Charged Dragon Breath, Death Grasp necrosis scaling, etc.)
 *
 * 2. applyStyleMinVarEffects — modifies min/var after boosted AD multiplication
 *    (Precise perk, Channeller's Ring)
 */

import { describe, it, expect } from 'vitest';
import { applyStyleAbilityPercentModifiers, applyStyleMinVarEffects } from '../../rotation_builder/effects';
import { SETTINGS } from '../../settings_rb';
import { ARMOUR } from '$lib/data/armour';
import { ABILITIES } from '$lib/data/abilities';
import { DamageDistribution } from '../../types';
import { createBlankSettings } from '../test-helpers';
import { style_specific_unification } from '../../damage_calc_rb';

/** Create a distribution with ability percent values (pre-boosted AD multiply) */
function makePercentDistribution(minPct: number, varPct: number): DamageDistribution {
    return {
        minHit: minPct,
        varHit: varPct,
        'crit': false,
        'probability': 1,
        'damage list': [],
        'boosted AD': 0,
    };
}

/** Create a distribution with actual damage values (post-boosted AD multiply) */
function makeDamageDistribution(min: number, varHit: number): DamageDistribution {
    return {
        minHit: min,
        varHit: varHit,
        'crit': false,
        'probability': 1,
        'damage list': [],
        'boosted AD': 1000,
    };
}

/** Create settings with style unification applied */
function effectSettings(ability: string, overrides: Record<string, any> = {}) {
    const settings = createBlankSettings(99, 75, overrides);
    settings['ability'] = ability;
    style_specific_unification(settings, undefined);
    return settings;
}

// ─── Precise Perk ────────────────────────────────────────────

describe('Precise perk (applyStyleMinVarEffects)', () => {
    it('Precise 0 does not modify min/var', () => {
        const settings = effectSettings(ABILITIES.REND, { [SETTINGS.PRECISE]: 0 });
        const dist = makeDamageDistribution(500, 200);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.REND }, dist);
        expect(dist.minHit).toBe(500);
        expect(dist.varHit).toBe(200);
    });

    it('Precise 6 raises min and lowers var by 9% of max hit', () => {
        const settings = effectSettings(ABILITIES.REND, { [SETTINGS.PRECISE]: 6 });
        const dist = makeDamageDistribution(500, 200);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.REND }, dist);
        // max = 500 + 200 = 700
        // boost = floor(0.015 * 6 * 700) = floor(63) = 63
        expect(dist.minHit).toBe(500 + 63);
        expect(dist.varHit).toBe(200 - 63);
    });

    it('Precise 1 raises min by 1.5% of max', () => {
        const settings = effectSettings(ABILITIES.REND, { [SETTINGS.PRECISE]: 1 });
        const dist = makeDamageDistribution(1000, 400);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.REND }, dist);
        // max = 1400, boost = floor(0.015 * 1 * 1400) = floor(21) = 21
        expect(dist.minHit).toBe(1000 + 21);
        expect(dist.varHit).toBe(400 - 21);
    });

    it('Precise does not make var hit negative', () => {
        const settings = effectSettings(ABILITIES.REND, { [SETTINGS.PRECISE]: 6 });
        // var is very small relative to max
        const dist = makeDamageDistribution(950, 50);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.REND }, dist);
        // max = 1000, boost = floor(0.015 * 6 * 1000) = 90
        // var would be 50 - 90 = -40, but clamped to 0
        expect(dist.varHit).toBe(0);
        expect(dist.minHit).toBe(950 + 90);
    });

    it('applies to all combat styles equally', () => {
        const boost = (ability: string) => {
            const settings = effectSettings(ability, { [SETTINGS.PRECISE]: 6 });
            const dist = makeDamageDistribution(500, 200);
            applyStyleMinVarEffects({ settings, abilityKey: ability }, dist);
            return dist.minHit;
        };
        const melee = boost(ABILITIES.REND);
        const magic = boost(ABILITIES.IMPACT);
        const ranged = boost(ABILITIES.RANGED_AUTO);
        expect(melee).toBe(magic);
        expect(magic).toBe(ranged);
    });
});

// ─── Flanking Perk ───────────────────────────────────────────

describe('Flanking perk (applyStyleAbilityPercentModifiers)', () => {
    it('Flanking 4 increases Impact damage by 160%', () => {
        const settings = effectSettings(ABILITIES.IMPACT, { [SETTINGS.FLANKING]: 4 });
        const dist = makePercentDistribution(0.65, 0.1);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.IMPACT }, dist);
        // +40% per rank × 4 = +160%
        expect(dist.minHit).toBeCloseTo(0.65 + 0.65 * 0.4 * 4, 6);
        expect(dist.varHit).toBeCloseTo(0.1 + 0.1 * 0.4 * 4, 6);
    });

    it('Flanking 4 increases Binding Shot damage by 160%', () => {
        const settings = effectSettings(ABILITIES.BINDING_SHOT, { [SETTINGS.FLANKING]: 4 });
        const dist = makePercentDistribution(0.6, 0.1);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.BINDING_SHOT }, dist);
        expect(dist.minHit).toBeCloseTo(0.6 + 0.6 * 0.4 * 4, 6);
        expect(dist.varHit).toBeCloseTo(0.1 + 0.1 * 0.4 * 4, 6);
    });

    it('Flanking 0 does not modify damage', () => {
        const settings = effectSettings(ABILITIES.IMPACT, { [SETTINGS.FLANKING]: 0 });
        const dist = makePercentDistribution(0.65, 0.1);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.IMPACT }, dist);
        expect(dist.minHit).toBe(0.65);
        expect(dist.varHit).toBe(0.1);
    });

    it('Flanking does not affect non-stun abilities', () => {
        const settings = effectSettings(ABILITIES.REND, { [SETTINGS.FLANKING]: 4 });
        const dist = makePercentDistribution(1.35, 0.3);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.REND }, dist);
        expect(dist.minHit).toBe(1.35);
        expect(dist.varHit).toBe(0.3);
    });
});

// ─── Channeller's Ring (min/var) ─────────────────────────────

describe("Channeller's Ring (applyStyleMinVarEffects)", () => {
    it('increases magic channel min/var by 4%', () => {
        const settings = effectSettings(ABILITIES.ASPHYXIATE, {
            [SETTINGS.RING]: ARMOUR.CHANNELLERS_RING,
            [SETTINGS.MAGIC_RING]: ARMOUR.CHANNELLERS_RING,
        });
        const dist = makeDamageDistribution(1000, 200);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.ASPHYXIATE }, dist);
        expect(dist.minHit).toBe(Math.floor(1000 * 1.04));
        expect(dist.varHit).toBe(Math.floor(200 * 1.04));
    });

    it('does not affect non-channel magic abilities', () => {
        const settings = effectSettings(ABILITIES.IMPACT, {
            [SETTINGS.RING]: ARMOUR.CHANNELLERS_RING,
            [SETTINGS.MAGIC_RING]: ARMOUR.CHANNELLERS_RING,
        });
        const dist = makeDamageDistribution(1000, 200);
        applyStyleMinVarEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist);
        // Only precise (0) applied, no channeller bonus
        expect(dist.minHit).toBe(1000);
        expect(dist.varHit).toBe(200);
    });
});

// ─── Necromancy: Death Grasp necrosis scaling ────────────────

describe('Death Grasp necrosis scaling (applyStyleAbilityPercentModifiers)', () => {
    it('adds +0.4 min hit per necrosis stack', () => {
        const settings = effectSettings(ABILITIES.DEATH_GRASP, {
            [SETTINGS.NECROSIS_STACKS]: 6,
        });
        const dist = makePercentDistribution(1.0, 0.2);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.DEATH_GRASP }, dist);
        // +0.4 * 6 = +2.4
        expect(dist.minHit).toBeCloseTo(1.0 + 0.4 * 6, 6);
    });

    it('0 stacks does not modify', () => {
        const settings = effectSettings(ABILITIES.DEATH_GRASP, {
            [SETTINGS.NECROSIS_STACKS]: 0,
        });
        const dist = makePercentDistribution(1.0, 0.2);
        applyStyleAbilityPercentModifiers({ settings, abilityKey: ABILITIES.DEATH_GRASP }, dist);
        expect(dist.minHit).toBe(1.0);
    });
});
