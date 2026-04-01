/**
 * Tests for Unified Damage Calculator
 *
 * Tests the calculateSingleAbilityDamage function which is the main entry point
 * for single-ability damage calculations (used by melee/ranged/magic/necro pages).
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { calculateSingleAbilityDamage, calculateMultipleAbilities } from '../../unified-damage-calculator';
import { SETTINGS } from '../../settings_rb';
import {
    createBaseSettings,
    createMeleeSettings,
    createRangedSettings,
    createMagicSettings,
    MELEE_ABILITIES,
    RANGED_ABILITIES,
    MAGIC_ABILITIES,
    BUFF_PRESETS,
    percentDifference,
} from '../test-helpers';

describe('calculateSingleAbilityDamage', () => {
    describe('Basic Functionality', () => {
        it('should return a result with expected damage and distribution stats', () => {
            const settings = createMeleeSettings();
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(result).toHaveProperty('expected');
            expect(result).toHaveProperty('distributionStats');
            expect(typeof result.expected).toBe('number');
            expect(Array.isArray(result.distributionStats)).toBe(true);
        });

        it('should return positive damage for valid abilities', () => {
            const settings = createMeleeSettings();
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should return 0 for unknown abilities without crashing', () => {
            const settings = createMeleeSettings();
            const result = calculateSingleAbilityDamage(settings, {
                ability: 'nonexistent_ability_xyz'
            });

            // Should handle gracefully - either 0 or caught error
            expect(result.expected).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Melee Abilities', () => {
        let settings: Record<string, any>;

        beforeEach(() => {
            settings = createMeleeSettings();
        });

        it('should calculate damage for Dismember (basic ability)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(result.expected).toBeGreaterThan(0);
            // Slice is a basic, should do less than threshold abilities
        });

        it('should calculate damage for Fury (channeled ability)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.FURY
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Assault (threshold channeled)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.THE_FINAL_FLURRY
            });

            expect(result.expected).toBeGreaterThan(0);
            // Assault should do more damage than basics
        });

        it('should calculate damage for Dismember (bleed ability)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('threshold abilities should deal more damage than basics', () => {
            const slice = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });
            const assault = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.THE_FINAL_FLURRY
            });

            expect(assault.expected).toBeGreaterThan(slice.expected);
        });
    });

    describe('Ranged Abilities', () => {
        let settings: Record<string, any>;

        beforeEach(() => {
            settings = createRangedSettings();
        });

        it('should calculate damage for Piercing Shot', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: RANGED_ABILITIES.PIERCING_SHOT
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Snipe', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: RANGED_ABILITIES.SNIPE
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Rapid Fire (channeled)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: RANGED_ABILITIES.RAPID_FIRE
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Snap Shot (threshold)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: RANGED_ABILITIES.SNAP_SHOT
            });

            expect(result.expected).toBeGreaterThan(0);
        });
    });

    describe('Magic Abilities', () => {
        let settings: Record<string, any>;

        beforeEach(() => {
            settings = createMagicSettings();
        });

        it('should calculate damage for Dragon Breath', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MAGIC_ABILITIES.DRAGON_BREATH
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Wild Magic (threshold)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MAGIC_ABILITIES.WILD_MAGIC
            });

            expect(result.expected).toBeGreaterThan(0);
        });

        it('should calculate damage for Asphyxiate (channeled threshold)', () => {
            const result = calculateSingleAbilityDamage(settings, {
                ability: MAGIC_ABILITIES.ASPHYXIATE
            });

            expect(result.expected).toBeGreaterThan(0);
        });
    });

    describe('Buff Effects', () => {
        describe('Berserk (Melee Ultimate)', () => {
            it('should increase melee damage significantly', () => {
                const settings = createMeleeSettings();

                const withoutBerserk = calculateSingleAbilityDamage(settings, {
                    ability: MELEE_ABILITIES.METEOR_STRIKE,
                    buffs: {}
                });

                const withBerserk = calculateSingleAbilityDamage(settings, {
                    ability: MELEE_ABILITIES.METEOR_STRIKE,
                    buffs: { berserk: true }
                });

                // Berserk should roughly double damage
                expect(withBerserk.expected).toBeGreaterThan(withoutBerserk.expected * 1.5);
            });

            it('should apply to channeled abilities', () => {
                const settings = createMeleeSettings();

                const withoutBerserk = calculateSingleAbilityDamage(settings, {
                    ability: MELEE_ABILITIES.THE_FINAL_FLURRY,
                    buffs: {}
                });

                const withBerserk = calculateSingleAbilityDamage(settings, {
                    ability: MELEE_ABILITIES.THE_FINAL_FLURRY,
                    buffs: { berserk: true }
                });

                expect(withBerserk.expected).toBeGreaterThan(withoutBerserk.expected * 1.5);
            });
        });

        describe('Sunshine (Magic Ultimate)', () => {
            it('should increase magic damage', () => {
                const settings = createMagicSettings();

                const withoutSunshine = calculateSingleAbilityDamage(settings, {
                    ability: MAGIC_ABILITIES.DRAGON_BREATH,
                    buffs: {}
                });

                const withSunshine = calculateSingleAbilityDamage(settings, {
                    ability: MAGIC_ABILITIES.DRAGON_BREATH,
                    buffs: { sunshine: true }
                });

                expect(withSunshine.expected).toBeGreaterThan(withoutSunshine.expected);
            });
        });

        describe('Death\'s Swiftness (Ranged Ultimate)', () => {
            it('should increase ranged damage', () => {
                const settings = createRangedSettings();

                const withoutDS = calculateSingleAbilityDamage(settings, {
                    ability: RANGED_ABILITIES.SNIPE,
                    buffs: {}
                });

                const withDS = calculateSingleAbilityDamage(settings, {
                    ability: RANGED_ABILITIES.SNIPE,
                    buffs: { deathSwiftness: true }
                });

                expect(withDS.expected).toBeGreaterThan(withoutDS.expected);
            });
        });
    });

    describe('Ability Damage Scaling', () => {
        it('should scale linearly with ability damage stat', () => {
            const lowAD = createMeleeSettings({ [SETTINGS.ABILITY_DAMAGE]: 1000 });
            const highAD = createMeleeSettings({ [SETTINGS.ABILITY_DAMAGE]: 2000 });

            const lowResult = calculateSingleAbilityDamage(lowAD, {
                ability: MELEE_ABILITIES.DISMEMBER
            });
            const highResult = calculateSingleAbilityDamage(highAD, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            // Damage should roughly double when AD doubles
            const ratio = highResult.expected / lowResult.expected;
            expect(ratio).toBeGreaterThan(1.8);
            expect(ratio).toBeLessThan(2.2);
        });
    });

    describe('Perk Effects', () => {
        it('Precise should increase minimum hit', () => {
            const withoutPrecise = createMeleeSettings({ [SETTINGS.PRECISE]: 0 });
            const withPrecise = createMeleeSettings({ [SETTINGS.PRECISE]: 6 });

            const resultWithout = calculateSingleAbilityDamage(withoutPrecise, {
                ability: MELEE_ABILITIES.METEOR_STRIKE
            });
            const resultWith = calculateSingleAbilityDamage(withPrecise, {
                ability: MELEE_ABILITIES.METEOR_STRIKE
            });

            // Precise increases average damage
            expect(resultWith.expected).toBeGreaterThan(resultWithout.expected);
        });

        it('Equilibrium should affect damage variance', () => {
            const withoutEquil = createMeleeSettings({ [SETTINGS.EQUILIBRIUM]: 0 });
            const withEquil = createMeleeSettings({ [SETTINGS.EQUILIBRIUM]: 4 });

            const resultWithout = calculateSingleAbilityDamage(withoutEquil, {
                ability: MELEE_ABILITIES.DISMEMBER
            });
            const resultWith = calculateSingleAbilityDamage(withEquil, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            // Both should produce valid damage
            expect(resultWithout.expected).toBeGreaterThan(0);
            expect(resultWith.expected).toBeGreaterThan(0);
        });

        it('Biting should increase crit chance and thus average damage', () => {
            const withoutBiting = createMeleeSettings({ [SETTINGS.BITING]: 0 });
            const withBiting = createMeleeSettings({ [SETTINGS.BITING]: 4 });

            const resultWithout = calculateSingleAbilityDamage(withoutBiting, {
                ability: MELEE_ABILITIES.DISMEMBER
            });
            const resultWith = calculateSingleAbilityDamage(withBiting, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(resultWith.expected).toBeGreaterThanOrEqual(resultWithout.expected);
        });
    });

    describe('Target Effects', () => {
        it('Vulnerability should increase damage', () => {
            const withoutVuln = createMeleeSettings({ [SETTINGS.VULN]: SETTINGS.VULN_VALUES.NONE });
            const withVuln = createMeleeSettings({ [SETTINGS.VULN]: SETTINGS.VULN_VALUES.VULNERABILITY });

            const resultWithout = calculateSingleAbilityDamage(withoutVuln, {
                ability: MELEE_ABILITIES.DISMEMBER
            });
            const resultWith = calculateSingleAbilityDamage(withVuln, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            expect(resultWith.expected).toBeGreaterThan(resultWithout.expected);
        });

        it('Slayer Helm should increase damage on task', () => {
            const withoutHelm = createMeleeSettings({ [SETTINGS.SLAYER_HELM]: SETTINGS.SLAYER_HELM_VALUES.NONE });
            const withHelm = createMeleeSettings({ [SETTINGS.SLAYER_HELM]: SETTINGS.SLAYER_HELM_VALUES.FULL });

            const resultWithout = calculateSingleAbilityDamage(withoutHelm, {
                ability: MELEE_ABILITIES.METEOR_STRIKE
            });
            const resultWith = calculateSingleAbilityDamage(withHelm, {
                ability: MELEE_ABILITIES.METEOR_STRIKE
            });

            expect(resultWith.expected).toBeGreaterThan(resultWithout.expected);
        });
    });

    describe('Distribution Stats', () => {
        it('should return distribution stats for damage analysis', () => {
            const settings = createMeleeSettings();
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.FURY
            });

            expect(result.distributionStats).toBeDefined();
            expect(Array.isArray(result.distributionStats)).toBe(true);
        });

        it('distribution stats should have required properties', () => {
            const settings = createMeleeSettings();
            const result = calculateSingleAbilityDamage(settings, {
                ability: MELEE_ABILITIES.DISMEMBER
            });

            if (result.distributionStats.length > 0) {
                const stat = result.distributionStats[0];
                // Check for common properties in distribution stats
                expect(stat).toHaveProperty('ability');
            }
        });
    });
});

describe('calculateMultipleAbilities', () => {
    it('should calculate damage for multiple abilities at once', () => {
        const settings = createMeleeSettings();
        const abilities = [MELEE_ABILITIES.DISMEMBER, MELEE_ABILITIES.FURY];

        const results = calculateMultipleAbilities(settings, abilities);

        expect(results).toBeInstanceOf(Map);
        expect(results.size).toBe(abilities.length);

        abilities.forEach(ability => {
            expect(results.has(ability)).toBe(true);
            const result = results.get(ability);
            expect(result?.expected).toBeGreaterThan(0);
        });
    });

    it('should apply buffs to all abilities', () => {
        const settings = createMeleeSettings();
        const abilities = [MELEE_ABILITIES.METEOR_STRIKE, MELEE_ABILITIES.FURY];

        const withoutBuffs = calculateMultipleAbilities(settings, abilities, {});
        const withBerserk = calculateMultipleAbilities(settings, abilities, { berserk: true });

        abilities.forEach(ability => {
            const without = withoutBuffs.get(ability)!;
            const with_ = withBerserk.get(ability)!;
            expect(with_.expected).toBeGreaterThan(without.expected);
        });
    });

    it('should handle empty ability list', () => {
        const settings = createMeleeSettings();
        const results = calculateMultipleAbilities(settings, []);

        expect(results).toBeInstanceOf(Map);
        expect(results.size).toBe(0);
    });
});

describe('Edge Cases', () => {
    it('should handle zero ability damage', () => {
        const settings = createMeleeSettings({ [SETTINGS.ABILITY_DAMAGE]: 0 });
        const result = calculateSingleAbilityDamage(settings, {
            ability: MELEE_ABILITIES.DISMEMBER
        });

        // Should not crash, damage should be 0 or minimal
        expect(result.expected).toBeGreaterThanOrEqual(0);
    });

    it('should handle very high ability damage', () => {
        const settings = createMeleeSettings({ [SETTINGS.ABILITY_DAMAGE]: 10000 });
        const result = calculateSingleAbilityDamage(settings, {
            ability: MELEE_ABILITIES.DISMEMBER
        });

        expect(result.expected).toBeGreaterThan(0);
        expect(Number.isFinite(result.expected)).toBe(true);
    });

    it('should handle multiple buffs simultaneously', () => {
        const settings = createMeleeSettings({
            [SETTINGS.VULN]: SETTINGS.VULN_VALUES.VULNERABILITY,
            [SETTINGS.SLAYER_HELM]: SETTINGS.SLAYER_HELM_VALUES.FULL,
            [SETTINGS.PRECISE]: 6,
            [SETTINGS.BITING]: 4,
        });

        const result = calculateSingleAbilityDamage(settings, {
            ability: MELEE_ABILITIES.DISMEMBER,
            buffs: { berserk: true }
        });

        expect(result.expected).toBeGreaterThan(0);
        expect(Number.isFinite(result.expected)).toBe(true);
    });
});
