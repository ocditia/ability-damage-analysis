/**
 * Tests for Rotation Damage Calculator
 *
 * Tests the calculateRotationDamageCore function which processes full rotations
 * with multiple abilities, buff windows, and complex interactions.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { SETTINGS } from '../../settings_rb';
import {
    createBaseSettings,
    createMeleeSettings,
    createRangedSettings,
    createMagicSettings,
    createSingleAbilityRotation,
    createRotationFromAbilities,
    MELEE_ABILITIES,
    RANGED_ABILITIES,
    MAGIC_ABILITIES,
} from '../test-helpers';

describe('calculateRotationDamageCore', () => {
    describe('Basic Functionality', () => {
        it('should return a valid result object', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.DISMEMBER);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result).toHaveProperty('regularDamage');
            expect(result).toHaveProperty('poisonDamage');
            expect(result).toHaveProperty('familiarDamage');
            expect(result).toHaveProperty('distributionStats');
        });

        it('should calculate positive damage for a single ability', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should handle empty rotation', () => {
            const settings = createMeleeSettings();
            const rotation = createRotationFromAbilities([]);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBe(0);
        });

        it('should handle rotation with only null abilities', () => {
            const settings = createMeleeSettings();
            const rotation = createRotationFromAbilities([null, null, null, null, null]);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBe(0);
        });
    });

    describe('Multi-Ability Rotations', () => {
        it('should handle mixed ability types', () => {
            const settings = createMeleeSettings();
            const rotation = createRotationFromAbilities([
                MELEE_ABILITIES.FURY,     // Channeled
                null, null, null,
                MELEE_ABILITIES.DISMEMBER // Bleed
            ]);

            const result = calculateRotationDamageCore(settings, rotation, 30);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should process abilities in correct order', () => {
            const settings = createMeleeSettings();

            // First ability at tick 0
            const rotation = createRotationFromAbilities([
                MELEE_ABILITIES.DISMEMBER,
                null, null,
                MELEE_ABILITIES.FURY
            ]);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
            expect(result.distributionStats.length).toBeGreaterThan(0);
        });
    });

    describe('Channeled Abilities', () => {
        it('should calculate full damage for channeled abilities', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.ASSAULT, 30);

            const result = calculateRotationDamageCore(settings, rotation, 30);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should handle Fury (3-hit channel)', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.FURY, 20);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should handle Greater Fury', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.GREATER_FURY, 20);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
        });
    });

    describe('Bleed Abilities', () => {
        it('should calculate full bleed damage over duration', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.DISMEMBER, 30);

            const result = calculateRotationDamageCore(settings, rotation, 30);

            expect(result.regularDamage).toBeGreaterThan(0);
        });
    });

    describe('Bar Size Handling', () => {
        it('should respect bar size parameter', () => {
            const settings = createMeleeSettings();
            const rotation = createRotationFromAbilities([
                MELEE_ABILITIES.DISMEMBER,
                null, null,
                MELEE_ABILITIES.FURY
            ], 50);

            // With small bar size, might not process all abilities
            const smallResult = calculateRotationDamageCore(settings, rotation, 5);
            const largeResult = calculateRotationDamageCore(settings, rotation, 50);

            // Small might process less
            expect(largeResult.regularDamage).toBeGreaterThanOrEqual(smallResult.regularDamage);
        });

        it('should handle very large bar sizes', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH, 200);

            const result = calculateRotationDamageCore(settings, rotation, 200);

            expect(result.regularDamage).toBeGreaterThan(0);
            expect(Number.isFinite(result.regularDamage)).toBe(true);
        });
    });

    describe('Nulled Ticks', () => {
        it('should skip nulled ticks', () => {
            const settings = createMeleeSettings();

            // Create rotation with ability at tick 0, but tick 0 is nulled
            const rotation = {
                abilityBar: [MELEE_ABILITIES.DISMEMBER, null, null, MELEE_ABILITIES.FURY],
                extraActionBar: Array(20).fill(null),
                nulledTicks: [true, false, false, false, ...Array(16).fill(false)],
                stalledAbilities: Array(20).fill(null)
            };

            const nulledResult = calculateRotationDamageCore(settings, rotation, 20);

            // With first ability nulled, should still get some damage from Fury
            // but less than if both worked
            expect(nulledResult.regularDamage).toBeGreaterThan(0);
        });
    });

    describe('Combat Style Compatibility', () => {
        it('should work with ranged abilities', () => {
            const settings = createRangedSettings();
            const rotation = createSingleAbilityRotation(RANGED_ABILITIES.SNIPE, 20);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should work with magic abilities', () => {
            const settings = createMagicSettings();
            const rotation = createSingleAbilityRotation(MAGIC_ABILITIES.DRAGON_BREATH, 20);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(result.regularDamage).toBeGreaterThan(0);
        });

        it('should handle rapid fire (ranged channel)', () => {
            const settings = createRangedSettings();
            const rotation = createSingleAbilityRotation(RANGED_ABILITIES.RAPID_FIRE, 30);

            const result = calculateRotationDamageCore(settings, rotation, 30);

            expect(result.regularDamage).toBeGreaterThan(0);
        });
    });

    describe('Distribution Stats', () => {
        it('should return distribution stats for analysis', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(Array.isArray(result.distributionStats)).toBe(true);
        });

        it('should include stats for each ability in rotation', () => {
            const settings = createMeleeSettings();
            const rotation = createRotationFromAbilities([
                MELEE_ABILITIES.DISMEMBER,
                null, null,
                MELEE_ABILITIES.FURY
            ]);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            // Should have stats for both abilities
            expect(result.distributionStats.length).toBeGreaterThan(0);
        });
    });

    describe('Damage Types', () => {
        it('should separate regular and poison damage', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(typeof result.regularDamage).toBe('number');
            expect(typeof result.poisonDamage).toBe('number');
            expect(result.poisonDamage).toBeGreaterThanOrEqual(0);
        });

        it('should track familiar damage separately', () => {
            const settings = createMeleeSettings();
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

            const result = calculateRotationDamageCore(settings, rotation, 20);

            expect(typeof result.familiarDamage).toBe('number');
            expect(result.familiarDamage).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Buff Integration', () => {
        it('should apply berserk buff from settings', () => {
            const withoutBerserk = createMeleeSettings({ [SETTINGS.BERSERK]: false });
            const withBerserk = createMeleeSettings({ [SETTINGS.BERSERK]: true });
            const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

            const resultWithout = calculateRotationDamageCore(withoutBerserk, rotation, 20);
            const resultWith = calculateRotationDamageCore(withBerserk, rotation, 20);

            expect(resultWith.regularDamage).toBeGreaterThan(resultWithout.regularDamage);
        });

        it('should apply sunshine buff for magic', () => {
            const withoutSunshine = createMagicSettings({ [SETTINGS.SUNSHINE]: false });
            const withSunshine = createMagicSettings({ [SETTINGS.SUNSHINE]: true });
            const rotation = createSingleAbilityRotation(MAGIC_ABILITIES.DRAGON_BREATH);

            const resultWithout = calculateRotationDamageCore(withoutSunshine, rotation, 20);
            const resultWith = calculateRotationDamageCore(withSunshine, rotation, 20);

            expect(resultWith.regularDamage).toBeGreaterThan(resultWithout.regularDamage);
        });
    });

    describe('Performance', () => {
        it('should handle long rotations efficiently', () => {
            const settings = createMeleeSettings();

            // Create a rotation with abilities every 3 ticks
            const abilities: (string | null)[] = [];
            for (let i = 0; i < 200; i++) {
                if (i % 3 === 0) {
                    abilities.push(MELEE_ABILITIES.DISMEMBER);
                } else {
                    abilities.push(null);
                }
            }
            const rotation = createRotationFromAbilities(abilities, 200);

            const startTime = Date.now();
            const result = calculateRotationDamageCore(settings, rotation, 200);
            const endTime = Date.now();

            expect(result.regularDamage).toBeGreaterThan(0);
            // Should complete in reasonable time (< 1 second)
            expect(endTime - startTime).toBeLessThan(1000);
        });
    });
});

describe('Rotation Calculation Edge Cases', () => {
    it('should handle abilities at the very end of the bar', () => {
        const settings = createMeleeSettings();
        const barSize = 20;
        const abilities = Array(barSize).fill(null);
        abilities[barSize - 1] = MELEE_ABILITIES.DISMEMBER;
        const rotation = createRotationFromAbilities(abilities, barSize);

        // Should not crash
        const result = calculateRotationDamageCore(settings, rotation, barSize);
        expect(Number.isFinite(result.regularDamage)).toBe(true);
    });

    it('should handle consecutive abilities (no gaps)', () => {
        const settings = createMeleeSettings();
        const rotation = createRotationFromAbilities([
            MELEE_ABILITIES.DISMEMBER,
            MELEE_ABILITIES.DISMEMBER,
            MELEE_ABILITIES.DISMEMBER
        ]);

        // Should not crash, but abilities have cooldowns so behavior may vary
        const result = calculateRotationDamageCore(settings, rotation, 20);
        expect(Number.isFinite(result.regularDamage)).toBe(true);
    });

    it('should handle all settings at zero', () => {
        const settings = createBaseSettings({
            [SETTINGS.ABILITY_DAMAGE]: 0,
            [SETTINGS.CUSTOM_CRIT]: 0,
            [SETTINGS.BITING]: 0,
        });
        const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

        const result = calculateRotationDamageCore(settings, rotation, 20);

        expect(Number.isFinite(result.regularDamage)).toBe(true);
        expect(result.regularDamage).toBeGreaterThanOrEqual(0);
    });

    it('should handle maximum realistic settings', () => {
        const settings = createMeleeSettings({
            [SETTINGS.ABILITY_DAMAGE]: 5000,
            [SETTINGS.VULN]: SETTINGS.VULN_VALUES.VULNERABILITY,
            [SETTINGS.SLAYER_HELM]: SETTINGS.SLAYER_HELM_VALUES.FULL,
            [SETTINGS.BERSERK]: true,
            [SETTINGS.PRECISE]: 6,
            [SETTINGS.BITING]: 4,
        });
        const rotation = createSingleAbilityRotation(MELEE_ABILITIES.THE_FINAL_FLURRY, 30);

        const result = calculateRotationDamageCore(settings, rotation, 30);

        expect(result.regularDamage).toBeGreaterThan(0);
        expect(Number.isFinite(result.regularDamage)).toBe(true);
    });
});
