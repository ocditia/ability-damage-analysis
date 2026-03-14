/**
 * Expected Damage Values for Regression Testing
 *
 * This file contains verified damage values for various ability/settings combinations.
 * Each entry should include:
 * - min: minimum possible damage
 * - max: maximum possible damage (non-crit)
 * - comment: how/when the value was verified
 *
 * Verification methods:
 * - IN_GAME: Tested in-game with matching settings
 * - CALCULATED: Manually calculated from ability % and AD
 * - CALCULATOR: Values produced by the calculator (for regression)
 *
 * Note on damage formula:
 * - min damage = AD * min_hit%
 * - var damage = AD * var_hit%
 * - max damage = min + var
 */

import { ABILITIES } from '../../const/const';
import { SETTINGS } from '../../settings_rb';

export interface ExpectedDamage {
    min: number;
    max: number;
    comment?: string;
}

export interface AbilityTestCase {
    ability: string;
    settings: Record<string, any>;
    expected: ExpectedDamage;
    description: string;
}

/**
 * Base test cases - simple ability damage with fixed AD
 * These use USE_RAW_ABILITY_DAMAGE: true to skip gear calculations
 *
 * Values derived from actual calculator output to serve as regression baseline
 */
export const BASE_DAMAGE_CASES: AbilityTestCase[] = [
    // Melee Basics
    // Slice: min_hit = 0.95, var_hit = 0.20 → 95-115% of AD
    {
        ability: 'slice',
        description: 'Slice with 1800 AD - 95-115%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1800,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 1710,  // 1800 * 0.95
            max: 2070,  // 1800 * 0.95 + 1800 * 0.20
            comment: 'CALCULATOR: 95% min + 20% var',
        },
    },
    // Cleave: min_hit = 1.10, var_hit = 0.20 → 110-130% of AD
    {
        ability: 'cleave',
        description: 'Cleave with 1800 AD - 110-130%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1800,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 1980,  // 1800 * 1.10
            max: 2340,  // 1800 * 1.10 + 1800 * 0.20
            comment: 'CALCULATOR: 110% min + 20% var',
        },
    },

    // Magic Basics
    // Wrack: min_hit = 0.95, var_hit = 0.20 → 95-115% of AD
    {
        ability: 'wrack',
        description: 'Wrack with 1700 AD - 95-115%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1700,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 1615,  // 1700 * 0.95
            max: 1955,  // 1700 * 0.95 + 1700 * 0.20
            comment: 'CALCULATOR: 95% min + 20% var',
        },
    },
    // Dragon Breath: min_hit = 1.88, var_hit = 0.38 → 188-226% of AD
    {
        ability: 'dragon breath',
        description: 'Dragon Breath with 1700 AD - 188-226%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1700,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 3196,  // 1700 * 1.88
            max: 3842,  // 1700 * 1.88 + 1700 * 0.38
            comment: 'CALCULATOR: 188% min + 38% var',
        },
    },

    // Necromancy Basics
    // Touch of Death: min_hit = 1.80, var_hit = 0.36 → 180-216% of AD
    {
        ability: ABILITIES.TOUCH_OF_DEATH,
        description: 'Touch of Death with 1600 AD - 180-216%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1600,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 2880,  // 1600 * 1.80
            max: 3456,  // 1600 * 1.80 + 1600 * 0.36
            comment: 'CALCULATOR: 180% min + 36% var',
        },
    },
    // Soul Sap: min_hit = 0.95, var_hit = 0.20 → 95-115% of AD
    {
        ability: ABILITIES.SOUL_SAP,
        description: 'Soul Sap with 1600 AD - 95-115%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1600,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 1520,  // 1600 * 0.95
            max: 1840,  // 1600 * 0.95 + 1600 * 0.20
            comment: 'CALCULATOR: 95% min + 20% var',
        },
    },
    // Finger of Death: min_hit = 4.95, var_hit = 0.99 → 495-594% of AD
    {
        ability: ABILITIES.FINGER_OF_DEATH,
        description: 'Finger of Death with 1600 AD - 495-594%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1600,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 7920,  // 1600 * 4.95
            max: 9504,  // 1600 * 4.95 + 1600 * 0.99
            comment: 'CALCULATOR: 495% min + 99% var',
        },
    },

    // Ranged Basics
    // Piercing Shot: min_hit = 0.45, var_hit = 0.30 → 45-75% of AD
    {
        ability: 'piercing shot',
        description: 'Piercing Shot with 1750 AD - 45-75%',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1750,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
        },
        expected: {
            min: 787,   // floor(1750 * 0.45)
            max: 1312,  // floor(1750 * 0.45 + 1750 * 0.30)
            comment: 'CALCULATOR: 45% min + 30% var',
        },
    },
];

/**
 * Buff interaction test cases
 * Tests that buffs correctly modify damage
 */
export const BUFF_INTERACTION_CASES: AbilityTestCase[] = [
    // Slice with Berserk: base * 2
    {
        ability: 'slice',
        description: 'Slice with Berserk (2x damage)',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1800,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
            [SETTINGS.BERSERK]: true,
        },
        expected: {
            min: 3420, // 1710 * 2
            max: 4140, // 2070 * 2
            comment: 'CALCULATOR: Base * 2 (Berserk)',
        },
    },
    // Wrack with Sunshine: base * 1.5
    {
        ability: 'wrack',
        description: 'Wrack with Sunshine (1.5x damage)',
        settings: {
            [SETTINGS.ABILITY_DAMAGE]: 1700,
            [SETTINGS.USE_RAW_ABILITY_DAMAGE]: true,
            [SETTINGS.SUNSHINE]: true,
        },
        expected: {
            min: 2422, // floor(1615 * 1.5)
            max: 2932, // floor(1955 * 1.5)
            comment: 'CALCULATOR: Base * 1.5 (Sunshine)',
        },
    },
];

/**
 * Helper to get test case by ability name
 */
export function getTestCase(ability: string): AbilityTestCase | undefined {
    return [...BASE_DAMAGE_CASES, ...BUFF_INTERACTION_CASES].find(
        tc => tc.ability === ability
    );
}

/**
 * Helper to get all test cases for a combat style
 */
export function getTestCasesForStyle(style: 'melee' | 'ranged' | 'magic' | 'necromancy'): AbilityTestCase[] {
    const styleAbilities: Record<string, string[]> = {
        melee: ['slice', 'cleave', 'fury', 'assault', 'dismember'],
        ranged: ['piercing shot', 'snap shot', 'rapid fire'],
        magic: ['wrack', 'dragon breath', 'wild magic'],
        necromancy: [ABILITIES.TOUCH_OF_DEATH, ABILITIES.SOUL_SAP, ABILITIES.FINGER_OF_DEATH],
    };

    return [...BASE_DAMAGE_CASES, ...BUFF_INTERACTION_CASES].filter(tc =>
        styleAbilities[style].includes(tc.ability)
    );
}
