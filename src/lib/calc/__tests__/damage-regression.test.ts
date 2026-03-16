/**
 * Damage Regression Tests
 *
 * These tests verify that damage calculations match verified in-game values.
 *
 * HOW TO ADD NEW VERIFIED VALUES:
 * 1. Open fixtures/verified-ingame-values.ts
 * 2. Find the appropriate settings profile (e.g., BLANK_T5_L99_RANGED)
 * 3. Add your verified ability to the damages array:
 *    - Single hit: { ability: 'ability_name', min: 123, max: 456 }
 *    - Multi-hit:  { ability: 'ability_name', hits: [{ min: 100 }, { min: 200 }] }
 *    - Repeated:   { ability: 'ability_name', hitCount: 5, perHitMin: 50 }
 * 4. Tests will automatically include your new values
 */

import { describe, it, expect } from 'vitest';
import { calculateSingleAbilityDamage } from '../unified-damage-calculator';
import { SETTINGS } from '../settings.js';
import { ABILITIES } from '../const/const';
import {
    createBaseSettings,
    createBlankSettings,
    createMeleeSettings,
    createMagicSettings,
    createNecromancySettings,
} from './test-helpers';
import {
    BASE_DAMAGE_CASES,
    BUFF_INTERACTION_CASES,
    AbilityTestCase,
} from './fixtures/expected-damages';
import {
    getActiveProfiles,
    SettingsProfile,
    VerifiedDamage,
    isSingleHit,
    isMultiHit,
    isRepeatedHit,
} from './fixtures/verified-ingame-values';

// =============================================================================
// TEST RUNNER FOR VERIFIED IN-GAME VALUES
// =============================================================================

/**
 * Get non-crit min damage from distribution stats
 * Uses nonCritMin if available (combined distribution), otherwise minDamage
 */
function getNonCritMin(stats: any): number {
    return stats.nonCritMin ?? stats.minDamage;
}

/**
 * Get non-crit max damage from distribution stats
 * Uses nonCritMax if available (combined distribution), otherwise maxDamage
 */
function getNonCritMax(stats: any): number {
    return stats.nonCritMax ?? stats.maxDamage;
}

/**
 * Run verification for a single ability against in-game values
 * Note: In-game values are non-crit, so we compare against nonCritMin/nonCritMax
 */
function verifyAbilityDamage(
    profile: SettingsProfile,
    verified: VerifiedDamage
) {
    // Build settings with perks if specified
    const perkOverrides: Record<string, any> = {};
    if (profile.perks) {
        if (profile.perks.precise !== undefined) {
            perkOverrides[SETTINGS.PRECISE] = profile.perks.precise;
        }
        if (profile.perks.eruptive !== undefined) {
            perkOverrides[SETTINGS.ERUPTIVE] = profile.perks.eruptive;
        }
        if (profile.perks.biting !== undefined) {
            perkOverrides[SETTINGS.BITING] = profile.perks.biting;
        }
    }

    const settings = createBlankSettings(profile.level, profile.tier, perkOverrides);

    const result = calculateSingleAbilityDamage(settings, {
        ability: verified.ability,
    });

    expect(result.expected).toBeGreaterThan(0);

    if (isSingleHit(verified)) {
        // Single-hit ability
        if (result.distributionStats.length > 0) {
            const stats = result.distributionStats[0];
            expect(getNonCritMin(stats)).toBe(verified.min);
            if (verified.max !== undefined) {
                expect(getNonCritMax(stats)).toBe(verified.max);
            }
        }
    } else if (isMultiHit(verified)) {
        // Multi-hit ability with different damage per hit
        expect(result.distributionStats.length).toBeGreaterThanOrEqual(verified.hits.length);
        for (let i = 0; i < verified.hits.length; i++) {
            const stats = result.distributionStats[i];
            const expected = verified.hits[i];
            expect(getNonCritMin(stats)).toBe(expected.min);
            if (expected.max !== undefined) {
                expect(getNonCritMax(stats)).toBe(expected.max);
            }
        }
    } else if (isRepeatedHit(verified)) {
        // Repeated-hit ability (same damage per hit)
        expect(result.distributionStats.length).toBe(verified.hitCount);
        let totalMin = 0;
        let totalMax = 0;
        for (const stats of result.distributionStats) {
            totalMin += getNonCritMin(stats);
            totalMax += getNonCritMax(stats);
        }
        expect(totalMin).toBe(verified.perHitMin * verified.hitCount);
        if (verified.perHitMax !== undefined) {
            expect(totalMax).toBe(verified.perHitMax * verified.hitCount);
        }
    }
}

/**
 * Generate test name from verified damage entry
 */
function getTestName(verified: VerifiedDamage): string {
    if (isSingleHit(verified)) {
        const maxStr = verified.max !== undefined ? `-${verified.max}` : '';
        return `${verified.ability} min=${verified.min}${maxStr}`;
    }
    if (isMultiHit(verified)) {
        const hitsStr = verified.hits.map((h, i) => `hit${i + 1}=${h.min}`).join(', ');
        return `${verified.ability} [${hitsStr}]`;
    }
    if (isRepeatedHit(verified)) {
        return `${verified.ability} ${verified.hitCount}x${verified.perHitMin}=${verified.hitCount * verified.perHitMin}`;
    }
    // Fallback - should never reach here due to discriminated union
    return (verified as any).ability ?? 'unknown';
}

// =============================================================================
// DATA-DRIVEN TESTS FROM VERIFIED IN-GAME VALUES
// =============================================================================

describe('Verified In-Game Values', () => {
    const profiles = getActiveProfiles();

    for (const profile of profiles) {
        describe(profile.name, () => {
            // Create test cases array for it.each
            const testCases = profile.damages.map(d => ({
                name: getTestName(d),
                verified: d,
            }));

            it.each(testCases)('$name', ({ verified }) => {
                verifyAbilityDamage(profile, verified);
            });
        });
    }
});

// =============================================================================
// SMOKE TESTS - Verify abilities calculate without crashing
// =============================================================================

function runTestCase(testCase: AbilityTestCase) {
    const settings = createBaseSettings(testCase.settings);
    const result = calculateSingleAbilityDamage(settings, {
        ability: testCase.ability,
    });
    return { result, settings };
}

describe('Smoke Tests', () => {
    describe('Abilities Calculate', () => {
        it.each(BASE_DAMAGE_CASES)('$description produces positive damage', (testCase) => {
            const { result } = runTestCase(testCase);

            expect(result.expected).toBeGreaterThan(0);

            if (result.distributionStats.length > 0) {
                const stats = result.distributionStats[0];
                expect(stats.minDamage).toBeGreaterThan(0);
                expect(stats.maxDamage).toBeGreaterThan(0);
                expect(stats.maxDamage).toBeGreaterThanOrEqual(stats.minDamage);
            }
        });
    });

    describe('Buff Interactions', () => {
        it.each(BUFF_INTERACTION_CASES)('$description produces positive damage', (testCase) => {
            const { result } = runTestCase(testCase);

            expect(result.expected).toBeGreaterThan(0);

            if (result.distributionStats.length > 0) {
                const stats = result.distributionStats[0];
                expect(stats.minDamage).toBeGreaterThan(0);
                expect(stats.maxDamage).toBeGreaterThan(0);
            }
        });
    });
});

// =============================================================================
// MANUAL TESTS - For complex scenarios requiring custom logic
// =============================================================================

describe('Manual Tests', () => {
    describe('Damage Scaling', () => {
        it('Touch of Death scales linearly with ability damage', () => {
            const lowAD = createNecromancySettings({ [SETTINGS.ABILITY_DAMAGE]: 1000 });
            const highAD = createNecromancySettings({ [SETTINGS.ABILITY_DAMAGE]: 2000 });

            const lowResult = calculateSingleAbilityDamage(lowAD, {
                ability: ABILITIES.TOUCH_OF_DEATH,
            });
            const highResult = calculateSingleAbilityDamage(highAD, {
                ability: ABILITIES.TOUCH_OF_DEATH,
            });

            expect(highResult.expected).toBeGreaterThan(lowResult.expected);
            const ratio = highResult.expected / lowResult.expected;
            expect(ratio).toBeCloseTo(2.0, 1);
        });
    });

    describe('Buff Multipliers', () => {
        
    });

    describe('Perk Effects', () => {
        it('Precise 6 increases minimum damage', () => {
            const baseSettings = createMeleeSettings({
                [SETTINGS.ABILITY_DAMAGE]: 1800,
                [SETTINGS.PRECISE]: 0,
            });
            const preciseSettings = createMeleeSettings({
                [SETTINGS.ABILITY_DAMAGE]: 1800,
                [SETTINGS.PRECISE]: 6,
            });

            const baseResult = calculateSingleAbilityDamage(baseSettings, {
                ability: 'slice',
            });
            const preciseResult = calculateSingleAbilityDamage(preciseSettings, {
                ability: 'slice',
            });

            expect(preciseResult.expected).toBeGreaterThan(baseResult.expected);

            if (baseResult.distributionStats.length > 0 && preciseResult.distributionStats.length > 0) {
                expect(preciseResult.distributionStats[0].minDamage)
                    .toBeGreaterThan(baseResult.distributionStats[0].minDamage);
            }
        });
    });
});
