/**
 * Boosted AD Effects Tests
 *
 * Tests applyStyleBoostedADEffects which modifies boosted AD based on:
 * - Weapon passives (Inq Staff, Terrasaur Maul, Hexhunter, Keris)
 * - Chaos Roar (melee, 1.75× next ability)
 * - Blood Tithe / Exsanguinate stacks (magic basics)
 * - Icy Precision / Wen Arrows (ranged thresholds+)
 * - Scripture of Amascut (shared, +10%)
 * - Ultimatums perk (ultimates only)
 * - Chain modifier (magic bounced hits)
 * - TFN set bonus (necro conjures)
 */

import { describe, it, expect } from 'vitest';
import { ARMOUR } from '$lib/data/armour';
import { WEAPONS } from '$lib/data/weapons';
import { applyStyleBoostedADEffects } from '../../rotation_builder/effects';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES } from '$lib/data/abilities';
import { DamageDistribution } from '../../types';
import { createBlankSettings } from '../test-helpers';
import { style_specific_unification } from '../../damage_calc_rb';

/** Create a test distribution with a given boosted AD */
function makeDistribution(boostedAD: number): DamageDistribution {
    return {
        minHit: 0,
        varHit: 0,
        'crit': false,
        'probability': 1,
        'damage list': [],
        'boosted AD': boostedAD,
    };
}

/** Create settings with style unification applied */
function effectSettings(ability: string, level: number, tier: number, overrides: Record<string, any> = {}) {
    const settings = createBlankSettings(level, tier, overrides);
    settings['ability'] = ability;
    style_specific_unification(settings, undefined);
    return settings;
}

describe('applyStyleBoostedADEffects', () => {
    const BASE_AD = 1000;
    const BOOSTED_AD = 1000;

    describe('No effects', () => {
        it('should not modify boosted AD with no gear/buffs', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75);
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(BOOSTED_AD);
        });
    });

    describe('Shared effects', () => {
        it('Scripture of Amascut adds +10%', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.MELEE_POCKET]: ARMOUR.AMASCUT_BOOK,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.1));
        });

        it('Ultimatums 4 increases ultimate boosted AD', () => {
            const settings = effectSettings(ABILITIES.METEOR_STRIKE, 99, 75, {
                [SETTINGS.ULTIMATUMS]: 4,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.METEOR_STRIKE }, dist, BASE_AD);
            // (3 + 4)% = 7% boost
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD / 100 * 107));
        });

        it('Ultimatums does not affect basics', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.ULTIMATUMS]: 4,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(BOOSTED_AD);
        });
    });

    describe('Melee effects', () => {
        it('Terrasaur Maul adds +12.5%', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.MELEE_MH]: WEAPONS.TERRASAUR_MAUL,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.125));
        });

        it('Terrasaur Maul+ adds +17.5%', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.MELEE_MH]: WEAPONS.TERRASAUR_MAUL_PLUS,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.175));
        });

        it('Chaos Roar multiplies by 1.75', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.CHAOS_ROAR]: true,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD / 100 * 175));
        });

        it('Chaos Roar does not apply to itself', () => {
            const settings = effectSettings(ABILITIES.CHAOS_ROAR, 99, 75, {
                [SETTINGS.CHAOS_ROAR]: true,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.CHAOS_ROAR }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(BOOSTED_AD);
        });
    });

    describe('Magic effects', () => {
        it('Inquisitor Staff adds +12.5%', () => {
            const settings = effectSettings(ABILITIES.IMPACT, 99, 75, {
                [SETTINGS.MAGIC_MH]: WEAPONS.INQUISITOR_STAFF,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.125));
        });

        it('Inquisitor Staff+ adds +17.5%', () => {
            const settings = effectSettings(ABILITIES.IMPACT, 99, 75, {
                [SETTINGS.MAGIC_MH]: WEAPONS.INQUISITOR_STAFF_PLUS,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.175));
        });

        it('Blood Tithe stacks add +1% per stack for basics', () => {
            const settings = effectSettings(ABILITIES.IMPACT, 99, 75, {
                [SETTINGS.BLOOD_TITHE]: 5,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist, BASE_AD);
            // +5% of base AD
            expect(dist['boosted AD']).toBe(BOOSTED_AD + Math.floor(BASE_AD / 1000 * 5 * 10));
        });

        it('Chain modifier reduces bounced hit to 25%', () => {
            const settings = effectSettings(ABILITIES.IMPACT, 99, 75, {
                [SETTINGS.CHAIN_MODIFIER]: SETTINGS.CHAIN_MODIFIER_VALUES.REGULAR,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD / 100 * 25));
        });

        it('Greater Chain modifier reduces to 50%', () => {
            const settings = effectSettings(ABILITIES.IMPACT, 99, 75, {
                [SETTINGS.CHAIN_MODIFIER]: SETTINGS.CHAIN_MODIFIER_VALUES.GREATER,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.IMPACT }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD / 100 * 50));
        });
    });

    describe('Ranged effects', () => {
        it('Hexhunter Bow adds +12.5%', () => {
            const settings = effectSettings(ABILITIES.RANGED_AUTO, 99, 75, {
                [SETTINGS.RANGED_MH]: WEAPONS.HEXHUNTER_BOW,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.RANGED_AUTO }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.125));
        });

        it('Hexhunter Bow+ adds +17.5%', () => {
            const settings = effectSettings(ABILITIES.RANGED_AUTO, 99, 75, {
                [SETTINGS.RANGED_MH]: WEAPONS.HEXHUNTER_BOW_PLUS,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.RANGED_AUTO }, dist, BASE_AD);
            expect(dist['boosted AD']).toBe(Math.floor(BOOSTED_AD * 1.175));
        });
    });

    describe('Stacking', () => {
        it('Amascut + Chaos Roar stack multiplicatively', () => {
            const settings = effectSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.MELEE_POCKET]: ARMOUR.AMASCUT_BOOK,
                [SETTINGS.CHAOS_ROAR]: true,
            });
            const dist = makeDistribution(BOOSTED_AD);
            applyStyleBoostedADEffects({ settings, abilityKey: ABILITIES.REND }, dist, BASE_AD);
            // Chaos Roar first: floor(1000 * 1.75) = 1750, then Amascut: floor(1750 * 1.1) = 1925
            const afterChaos = Math.floor(BOOSTED_AD / 100 * 175);
            const afterAmascut = Math.floor(afterChaos * 1.1);
            expect(dist['boosted AD']).toBe(afterAmascut);
        });
    });
});
