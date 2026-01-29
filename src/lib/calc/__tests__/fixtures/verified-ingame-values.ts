/**
 * Verified In-Game Damage Values
 *
 * This file contains damage values that have been verified in-game.
 * Add new entries here when you verify values - tests will automatically include them.
 *
 * Verification process:
 * 1. Set up blank settings in-game (no armour, no perks, no buffs, no prayers)
 * 2. Use the specified weapon tier and level
 * 3. Record min and max damage from ability tooltip or combat
 * 4. Add entry to the appropriate section below
 */

import { ABILITIES } from '../../const/const';

/**
 * Single-hit ability damage
 */
export interface SingleHitDamage {
    ability: string;
    min: number;
    max?: number;  // Optional - add when verified
}

/**
 * Multi-hit ability damage (different damage per hit, like Snap Shot)
 */
export interface MultiHitDamage {
    ability: string;
    hits: Array<{ min: number; max?: number }>;
}

/**
 * Repeated-hit ability damage (same damage per hit, like Fragmentation Shot)
 */
export interface RepeatedHitDamage {
    ability: string;
    hitCount: number;
    perHitMin: number;
    perHitMax?: number;
}

export type VerifiedDamage = SingleHitDamage | MultiHitDamage | RepeatedHitDamage;

// Type guards
export function isMultiHit(v: VerifiedDamage): v is MultiHitDamage {
    return 'hits' in v;
}

export function isRepeatedHit(v: VerifiedDamage): v is RepeatedHitDamage {
    return 'hitCount' in v;
}

export function isSingleHit(v: VerifiedDamage): v is SingleHitDamage {
    return 'min' in v && !('hits' in v) && !('hitCount' in v);
}

/**
 * Settings profile for a group of tests
 */
export interface SettingsProfile {
    name: string;
    level: number;
    tier: number;
    expectedAD: number;  // For documentation/debugging
    buffs?: Record<string, boolean>;
    perks?: {
        precise?: number;      // 0-6
        eruptive?: number;     // 0-4, +0.5% AD per rank
        biting?: number;       // 0-4
        // Add more perks as needed
    };
    damages: VerifiedDamage[];
}

// =============================================================================
// VERIFIED VALUES - Add new entries here
// =============================================================================

/**
 * Blank settings, Level 99, Tier 5 weapon (2H Ranged)
 * AD = 247 + 123 + 48 + 24 = 442
 */
export const BLANK_T5_L99_RANGED: SettingsProfile = {
    name: 'Blank T5 L99 Ranged',
    level: 99,
    tier: 5,
    expectedAD: 442,
    damages: [
        // Single hit abilities
        { ability: ABILITIES.DAZING_SHOT, min: 419, max: 507 },
        { ability: ABILITIES.INCENDIARY_SHOT, min: 1193, max: 1458 },
        

        // Multi-hit abilities

        { ability: ABILITIES.PIERCING_SHOT, hits: [{ min: 198, max: 242 }, { min: 198, max: 242 }] },
        { ability: ABILITIES.SNAP_SHOT, hits: [{ min: 486, max: 574 }, { min: 663, max: 795 }] },

        // Bleed/DoT abilities
        { ability: ABILITIES.FRAGMENTATION_SHOT, hitCount: 5, perHitMin: 110, perHitMax: 136 },
        { ability: ABILITIES.RAPID_FIRE, hitCount: 8, perHitMin: 287, perHitMax: 331 }
    ],
};

/**
 * Blank settings, Level 99, Tier 1 weapon (2H Ranged)
 * AD = 247 + 123 + 9 + 4 = 383
 */
export const BLANK_T1_L99_RANGED: SettingsProfile = {
    name: 'Blank T1 L99 Ranged',
    level: 99,
    tier: 1,
    expectedAD: 383,
    damages: [
        // Add verified values here
        // { ability: ABILITIES.DAZING_SHOT, min: 363 },
    ],
};

/**
 * Blank settings, Level 99, Tier 5 weapon (2H Melee)
 * TODO: Calculate AD and verify values
 */
export const BLANK_T5_L99_MELEE: SettingsProfile = {
    name: 'Blank T5 L99 Melee',
    level: 99,
    tier: 5,
    expectedAD: 442,  // Same formula as ranged 2H
    damages: [
        // Single-hit abilities
        { ability: ABILITIES.SLICE, min: 419, max: 507 },
        { ability: ABILITIES.CLEAVE, min: 486, max: 574 },
        { ability: ABILITIES.METEOR_STRIKE, min: 1193, max: 1458 },
        { ability: ABILITIES.QUAKE, min: 574, max: 706 },

        // Multi-hit abilities
        { ability: ABILITIES.DISMEMBER, hitCount: 5, perHitMin: 110, perHitMax: 136 },
        { ability: ABILITIES.HURRICANE, hits: [{ min: 530, max: 662 }, { min: 596, max: 728 }] },

    ],
};

/**
 * Blank settings, Level 99, Tier 5 weapon (2H Magic)
 */
export const BLANK_T5_L99_MAGIC: SettingsProfile = {
    name: 'Blank T5 L99 Magic',
    level: 99,
    tier: 5,
    expectedAD: 442,
    damages: [
        // Add verified values here
        { ability: 'wrack', min: 397, max: 485 },
    ],
};

/**
 * Blank settings, Level 99, Tier 5 weapon (Necromancy)
 * Note: Necromancy may use different AD formula
 */
export const BLANK_T5_L99_NECRO: SettingsProfile = {
    name: 'Blank T5 L99 Necromancy',
    level: 99,
    tier: 5,
    expectedAD: 442,  // TODO: verify necro AD formula
    damages: [
        // Add verified values here
        // { ability: ABILITIES.TOUCH_OF_DEATH, min: ??? },
        // { ability: ABILITIES.SOUL_SAP, min: ??? },
    ],
};

/**
 * T100 Ranged with Precise 6 + Eruptive 2
 * Level 99, Tier 100 weapon (2H Ranged)
 * Base AD = 247 + 123 + 960 + 480 = 1810
 * With Eruptive 2 (+1%): AD = floor(1810 * 1.01) = 1828
 *
 * Precise 6: Increases minimum hit by 1.5% per rank (9% total)
 * Eruptive 2: Increases ability damage by 0.5% per rank (+1% total)
 */
export const T100_P6E2_RANGED: SettingsProfile = {
    name: 'T100 Precise6 Equil2 Ranged',
    level: 99,
    tier: 100,
    expectedAD: 1810,
    perks: {
        precise: 6,
        eruptive: 2,
    },
    damages: [
        // Single hit abilities
        { ability: ABILITIES.DAZING_SHOT, min: 1925, max: 2101 },
        { ability: ABILITIES.INCENDIARY_SHOT, min: 5477, max: 6031 },
        

        // Multi-hit abilities

        { ability: ABILITIES.PIERCING_SHOT, hits: [{ min: 912, max: 1004 }, { min: 912, max: 1004 }] },
        { ability: ABILITIES.SNAP_SHOT, hits: [{ min: 2223, max: 2375 }, { min: 3038, max: 3290 }] },

        // Bleed/DoT abilities
        { ability: ABILITIES.FRAGMENTATION_SHOT, hitCount: 5, perHitMin: 457, perHitMax: 566 },
        { ability: ABILITIES.RAPID_FIRE, hitCount: 8, perHitMin: 1311, perHitMax: 1370 }
    ],
};

// =============================================================================
// Export all profiles for testing
// =============================================================================

export const ALL_PROFILES: SettingsProfile[] = [
    BLANK_T5_L99_RANGED,
    BLANK_T5_L99_MELEE,
    BLANK_T5_L99_MAGIC,
    T100_P6E2_RANGED,
    // BLANK_T1_L99_RANGED,  // Uncomment when values are added
    // BLANK_T5_L99_NECRO,
];

/**
 * Get profiles that have verified damages
 */
export function getActiveProfiles(): SettingsProfile[] {
    return ALL_PROFILES.filter(p => p.damages.length > 0);
}
