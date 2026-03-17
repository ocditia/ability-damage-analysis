/**
 * Unified Damage Calculator
 *
 * Provides a clean, store-independent API for damage calculation.
 * Single-ability pages can use this to calculate damage as a "rotation of 1".
 */

import { abils, ABILITIES } from './const/const';
import { SETTINGS } from './settings_rb';
import { calculateRotationDamageCore } from './rotation_builder/rotation-damage-calculator';
import type { RotationInput, SingleAbilityInput } from './types';

interface SingleAbilityResult {
    expected: number;
    distributionStats: any[];
}

/**
 * Calculates damage for a single ability by treating it as a rotation of length 1.
 * This unifies the calculation logic between single-ability pages and the rotation builder.
 *
 * @param settings - Flat settings object (key -> value), same format as used by damage_calc.js
 * @param input - The ability to calculate and optional buff states
 * @returns Object containing expected damage and distribution statistics
 */
export function calculateSingleAbilityDamage(
    settings: Record<string, any>,
    input: SingleAbilityInput
): SingleAbilityResult {
    const ability = input.ability as ABILITIES;

    // Get ability duration (default to 3 ticks for instant abilities)
    const abilityData = abils[ability];
    const duration = typeof abilityData?.duration === 'number' ? abilityData.duration : 3;

    // Create a synthetic rotation long enough for the ability + extra ticks for hit delays
    const barSize = Math.max(duration + 10, 15);

    const rotation: RotationInput = {
        abilityBar: Array(barSize).fill(null),
        extraActionBar: Array(barSize).fill(null),
        nulledTicks: Array(barSize).fill(false),
        stalledAbilities: Array(barSize).fill(null)
    };

    // Place the ability at tick 0
    rotation.abilityBar[0] = ability;

    // Apply buff flags to settings
    const settingsWithBuffs = { ...settings };

    if (input.buffs?.berserk) {
        settingsWithBuffs[SETTINGS.BERSERK] = true;
    }
    if (input.buffs?.sunshine) {
        settingsWithBuffs[SETTINGS.SUNSHINE] = true;
    }
    if (input.buffs?.blackhole) {
        settingsWithBuffs[SETTINGS.BLACKHOLE] = true;
    }
    if (input.buffs?.deathSwiftness) {
        settingsWithBuffs[SETTINGS.DEATH_SWIFTNESS] = true;
    }
    if (input.buffs?.splitSoul) {
        settingsWithBuffs[SETTINGS.SPLIT_SOUL] = true;
    }
    if (input.buffs?.splitSoulNecro) {
        settingsWithBuffs[SETTINGS.SPLIT_SOUL_NECRO] = true;
    }

    // Calculate damage without UI callbacks (headless mode)
    try {
        const result = calculateRotationDamageCore(settingsWithBuffs, rotation, barSize);
        return {
            expected: result.regularDamage,
            distributionStats: result.distributionStats
        };
    } catch (error) {
        console.error('calculateSingleAbilityDamage error for ability:', ability, error);
        return {
            expected: 0,
            distributionStats: []
        };
    }
}

/**
 * Calculates damage for multiple abilities in sequence.
 * Useful for comparing abilities under the same conditions.
 *
 * @param settings - Flat settings object
 * @param abilities - Array of ability keys to calculate
 * @param buffs - Optional buff states to apply to all calculations
 * @returns Map of ability key to damage result
 */
export function calculateMultipleAbilities(
    settings: Record<string, any>,
    abilities: string[],
    buffs?: SingleAbilityInput['buffs']
): Map<string, SingleAbilityResult> {
    const results = new Map<string, SingleAbilityResult>();

    for (const ability of abilities) {
        const result = calculateSingleAbilityDamage(settings, { ability, buffs });
        results.set(ability, result);
    }

    return results;
}
