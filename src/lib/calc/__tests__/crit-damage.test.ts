/**
 * Crit Damage Multiplier Tests
 *
 * Tests calc_crit_damage from calculation_utils.ts
 * Base crit damage is 1.5x (0.5 multiplier added to base).
 * Various gear/buffs increase this.
 */

import { describe, it, expect } from 'vitest';
import { calc_crit_damage } from '../rotation_builder/calculation_utils';
import { SETTINGS } from '../settings_rb.js';
import { ABILITIES } from '../const/const';
import { createBlankSettings } from './test-helpers';

function critDmgSettings(overrides: Record<string, any> = {}) {
    return createBlankSettings(120, 100, {
        [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
        ...overrides,
    });
}

describe('calc_crit_damage', () => {
    describe('Base crit damage', () => {
        it('should be 0.5 (1.5x) with no modifiers', () => {
            const settings = critDmgSettings();
            settings['ability'] = ABILITIES.REND;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });
    });

    describe('Smoke Cloud', () => {
        it('should add +6% for non-magic abilities', () => {
            const settings = critDmgSettings({ [SETTINGS.SMOKE_CLOUD]: true });
            settings['ability'] = ABILITIES.REND;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.56, 4);
        });

        it('should add +15% for magic abilities', () => {
            const settings = critDmgSettings({ [SETTINGS.SMOKE_CLOUD]: true });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.65, 4);
        });
    });

    describe('FSOA', () => {
        it('should add +22.5% average crit damage', () => {
            const settings = critDmgSettings({
                [SETTINGS.TH]: SETTINGS.MAGIC_TH_VALUES.FSOA,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MEAN,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.725, 4);
        });

        it('should add +30% max crit damage', () => {
            const settings = critDmgSettings({
                [SETTINGS.TH]: SETTINGS.MAGIC_TH_VALUES.FSOA,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MAX_CRIT,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.8, 4);
        });

        it('should add +15% min crit damage', () => {
            const settings = critDmgSettings({
                [SETTINGS.TH]: SETTINGS.MAGIC_TH_VALUES.FSOA,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_CRIT,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.65, 4);
        });

        it('FSOA IM should also work', () => {
            const settings = critDmgSettings({
                [SETTINGS.TH]: SETTINGS.MAGIC_TH_VALUES.FSOA_IM,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MEAN,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.725, 4);
        });
    });

    describe("Channeler's Ring", () => {
        it('should add crit damage for magic channels (0 stacks)', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHANNELLER_E,
                [SETTINGS.CHANNELLER_RING_STACKS]: 0,
            });
            settings['ability'] = ABILITIES.ASPHYXIATE;
            // 0.025 * (1 + 0) = 0.025
            expect(calc_crit_damage(settings)).toBeCloseTo(0.525, 4);
        });

        it('should scale with stacks (4 stacks)', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHANNELLER_E,
                [SETTINGS.CHANNELLER_RING_STACKS]: 4,
            });
            settings['ability'] = ABILITIES.ASPHYXIATE;
            // 0.025 * (1 + 4) = 0.125
            expect(calc_crit_damage(settings)).toBeCloseTo(0.625, 4);
        });

        it('should NOT apply to non-channel magic abilities', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHANNELLER_E,
                [SETTINGS.CHANNELLER_RING_STACKS]: 4,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });

        it('should NOT apply to melee channels', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHANNELLER_E,
                [SETTINGS.CHANNELLER_RING_STACKS]: 4,
            });
            settings['ability'] = ABILITIES.FURY;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });
    });

    describe("Champion's Ring", () => {
        it('should add crit damage based on active bleeds (3 bleeds)', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHAMPION_E,
                [SETTINGS.NUMBER_OF_BLEEDS]: 3,
            });
            settings['ability'] = ABILITIES.REND;
            // 0.015 * 3 = 0.045
            expect(calc_crit_damage(settings)).toBeCloseTo(0.545, 4);
        });

        it('should NOT apply to non-melee abilities', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHAMPION_E,
                [SETTINGS.NUMBER_OF_BLEEDS]: 3,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });
    });

    describe("Stalker's Ring", () => {
        it('should add +3% for ranged with bow', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.STALKER_E,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.TH]: SETTINGS.RANGED_TH_VALUES.BOLG,
            });
            settings['ability'] = ABILITIES.PIERCING_SHOT;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.53, 4);
        });

        it('should NOT apply to melee', () => {
            const settings = critDmgSettings({
                [SETTINGS.RING]: SETTINGS.RING_VALUES.STALKER_E,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.TH]: SETTINGS.RANGED_TH_VALUES.BOLG,
            });
            settings['ability'] = ABILITIES.REND;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });
    });

    describe('The Final Flurry', () => {
        it('Hit 1 should add +25% crit damage', () => {
            const settings = critDmgSettings();
            settings['ability'] = ABILITIES.THE_FINAL_FLURRY_1;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.75, 4);
        });

        it('Hit 3 should add +50% crit damage', () => {
            const settings = critDmgSettings();
            settings['ability'] = ABILITIES.THE_FINAL_FLURRY_2;
            expect(calc_crit_damage(settings)).toBeCloseTo(1.0, 4);
        });
    });

    describe("Tumeken's Resplendence Asphyxiate", () => {
        it('should add +35% for magic abilities', () => {
            const settings = critDmgSettings({
                [SETTINGS.TUMEKENS_RESPLENDENCE_ASPHYX]: true,
            });
            settings['ability'] = ABILITIES.ASPHYXIATE;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.85, 4);
        });

        it('should NOT apply to melee', () => {
            const settings = critDmgSettings({
                [SETTINGS.TUMEKENS_RESPLENDENCE_ASPHYX]: true,
            });
            settings['ability'] = ABILITIES.REND;
            expect(calc_crit_damage(settings)).toBe(0.5);
        });
    });

    describe('Stacking', () => {
        it('Smoke Cloud + FSOA (mean) = 0.5 + 0.15 + 0.225 = 0.875', () => {
            const settings = critDmgSettings({
                [SETTINGS.SMOKE_CLOUD]: true,
                [SETTINGS.TH]: SETTINGS.MAGIC_TH_VALUES.FSOA,
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MEAN,
            });
            settings['ability'] = ABILITIES.DRAGON_BREATH;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.875, 4);
        });

        it('Smoke Cloud (melee) + Champion ring (3 bleeds) = 0.5 + 0.06 + 0.045 = 0.605', () => {
            const settings = critDmgSettings({
                [SETTINGS.SMOKE_CLOUD]: true,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHAMPION_E,
                [SETTINGS.NUMBER_OF_BLEEDS]: 3,
            });
            settings['ability'] = ABILITIES.REND;
            expect(calc_crit_damage(settings)).toBeCloseTo(0.605, 4);
        });
    });
});
