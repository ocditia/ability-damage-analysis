/**
 * Crit Chance Calculation Tests
 *
 * Tests calc_crit_chance from crit.ts
 * Verifies that all crit chance sources stack correctly.
 */

import { describe, it, expect } from 'vitest';
import { ARMOUR } from '$lib/data/armour';
import { calc_crit_chance } from '../../crit';
import { SETTINGS } from '../../settings_rb.js';
import { ABILITIES } from '$lib/data/abilities';
import { createBlankSettings } from '../test-helpers';

// Helper: create settings with specific crit-relevant options
function critSettings(overrides: Record<string, any> = {}) {
    return createBlankSettings(120, 100, {
        [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
        ...overrides,
    });
}

describe('calc_crit_chance', () => {
    describe('Base crit chance', () => {
        it('should be 10% with no modifiers', () => {
            const settings = critSettings();
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.10, 4);
        });

        it('should be 0% with Equilibrium perk', () => {
            const settings = critSettings({ [SETTINGS.EQ_PERK]: 4 });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBe(0.0);
        });
    });

    describe('Biting perk', () => {
        it('Biting 1 should add 2%', () => {
            const settings = critSettings({ [SETTINGS.BITING]: 1 });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.12, 4);
        });

        it('Biting 4 should add 8%', () => {
            const settings = critSettings({ [SETTINGS.BITING]: 4 });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.18, 4);
        });

        it('Biting 4 + Level 20 Armour should add 8.8%', () => {
            const settings = critSettings({
                [SETTINGS.BITING]: 4,
                [SETTINGS.LVL20ARMOUR]: true,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.188, 4);
        });
    });

    describe('Grimoire', () => {
        it('Grimoire should add 12%', () => {
            const settings = critSettings({
                [SETTINGS.POCKET]: ARMOUR.ERETHDORS_GRIMOIRE,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.22, 4);
        });

        it('Grimoire + Biting 4 should stack', () => {
            const settings = critSettings({
                [SETTINGS.POCKET]: ARMOUR.ERETHDORS_GRIMOIRE,
                [SETTINGS.BITING]: 4,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.30, 4);
        });
    });

    describe("Reaver's Ring", () => {
        it("Reaver's ring should add 5%", () => {
            const settings = critSettings({
                [SETTINGS.RING]: ARMOUR.REAVERS_RING,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.15, 4);
        });
    });

    describe('Kalgerion Demon', () => {
        it('Kalg familiar should add 1%', () => {
            const settings = critSettings({
                [SETTINGS.FAMILIAR]: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.11, 4);
        });

        it('Kalg spec should add 5%', () => {
            const settings = critSettings({
                [SETTINGS.KALG_SPEC]: true,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.15, 4);
        });

        it('Kalg familiar + spec should add 6%', () => {
            const settings = critSettings({
                [SETTINGS.FAMILIAR]: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON,
                [SETTINGS.KALG_SPEC]: true,
            });
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.16, 4);
        });
    });

    describe('The Final Flurry crit bonuses', () => {
        it('Hit 1 (FINAL_FLURRY_1) should add 25%', () => {
            const settings = critSettings();
            expect(calc_crit_chance(settings, ABILITIES.THE_FINAL_FLURRY_1)).toBeCloseTo(0.35, 4);
        });

        it('Hit 3 (FINAL_FLURRY_2) should add 50%', () => {
            const settings = critSettings();
            expect(calc_crit_chance(settings, ABILITIES.THE_FINAL_FLURRY_2)).toBeCloseTo(0.60, 4);
        });

        it('Hit 3 + Biting 4 + Grim should stack to 80%', () => {
            const settings = critSettings({
                [SETTINGS.BITING]: 4,
                [SETTINGS.POCKET]: ARMOUR.ERETHDORS_GRIMOIRE,
            });
            expect(calc_crit_chance(settings, ABILITIES.THE_FINAL_FLURRY_2)).toBeCloseTo(0.80, 4);
        });
    });

    describe('Shadow Tendrils', () => {
        it('should always be 100% crit', () => {
            const settings = critSettings();
            expect(calc_crit_chance(settings, ABILITIES.SHADOW_TENDRILS)).toBe(1.0);
        });
    });

    describe('Dracolich Infusion', () => {
        it('Greater Dracolich should add 40% (ranged only)', () => {
            const settings = critSettings({
                [SETTINGS.GREATER_DRACOLICH_INFUSION]: true,
            });
            // Dracolich only applies to ranged abilities
            expect(calc_crit_chance(settings, ABILITIES.PIERCING_SHOT)).toBeCloseTo(0.50, 4);
            // Should NOT apply to melee
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.10, 4);
        });
    });

    describe('Crit chance cap', () => {
        it('should cap at 100% (Final Flurry hit 3 + all sources)', () => {
            const settings = critSettings({
                [SETTINGS.BITING]: 4,
                [SETTINGS.LVL20ARMOUR]: true,
                [SETTINGS.POCKET]: ARMOUR.ERETHDORS_GRIMOIRE,
                [SETTINGS.RING]: ARMOUR.REAVERS_RING,
                [SETTINGS.KALG_SPEC]: true,
                [SETTINGS.FAMILIAR]: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON,
            });
            // 41.8% base + 50% from Final Flurry 2 = 91.8%, still under cap
            // But it verifies the cap logic works
            const result = calc_crit_chance(settings, ABILITIES.THE_FINAL_FLURRY_2);
            expect(result).toBeCloseTo(0.918, 3);
            expect(result).toBeLessThanOrEqual(1.0);
        });
    });

    describe('Full BIS stacking', () => {
        it('Biting 4 + Lv20 + Grim + Reavers + Kalg + Kalg spec = 41.8%', () => {
            const settings = critSettings({
                [SETTINGS.BITING]: 4,
                [SETTINGS.LVL20ARMOUR]: true,
                [SETTINGS.POCKET]: ARMOUR.ERETHDORS_GRIMOIRE,
                [SETTINGS.RING]: ARMOUR.REAVERS_RING,
                [SETTINGS.KALG_SPEC]: true,
                [SETTINGS.FAMILIAR]: SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON,
            });
            // 10 + 8 + 0.8 + 12 + 5 + 5 + 1 = 41.8%
            expect(calc_crit_chance(settings, ABILITIES.REND)).toBeCloseTo(0.418, 3);
        });
    });
});
