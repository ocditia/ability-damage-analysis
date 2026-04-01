/**
 * Damage Trace — captures step-by-step breakdown from the real damage pipeline.
 *
 * Uses the Logger's trace capture mode to record structured entries
 * as the actual calculation runs. The trace is always accurate because
 * it IS the real calculation.
 */

import { Logger, type TraceEntry, type TraceHit } from '$lib/utils/Logger';
import { calculateSingleAbilityDamage } from './unified-damage-calculator';
import { calculateRotationDamageCore } from './rotation_builder/rotation-damage-calculator';
import type { RotationInput } from './types';

export type { TraceEntry, TraceHit };

export function traceDamageCalculation(
    settings: Record<string, any>,
    abilityKey: string,
    rawBuffs: boolean = false
): { steps: TraceEntry[], hits: TraceHit[], result: number } {
    const logger = Logger.getInstance();
    logger.startTrace();

    const calcResult = calculateSingleAbilityDamage(settings, { ability: abilityKey, rawBuffs });

    const { entries, hits } = logger.endTrace();
    return { steps: entries, hits, result: calcResult.expected };
}

/**
 * Trace a mini rotation through the real pipeline.
 * @param settings - Flat adapted settings (key → value)
 * @param abilityBar - Array of ability keys (null for empty ticks)
 * @param barSize - Total bar size
 * @returns Trace entries, hits, and total damage
 */
export function traceRotationDamage(
    settings: Record<string, any>,
    abilityBar: (string | null)[],
    barSize: number
): { steps: TraceEntry[], hits: TraceHit[], result: number } {
    const logger = Logger.getInstance();
    logger.startTrace();

    const rotation: RotationInput = {
        abilityBar,
        extraActionBar: Array(barSize).fill(null),
        nulledTicks: Array(barSize).fill(false),
        stalledAbilities: Array(barSize).fill(null)
    };

    const cleanSettings = JSON.parse(JSON.stringify(settings));
    cleanSettings['_combatStyle'] = settings['_combatStyle'] || 'magic';

    const calcResult = calculateRotationDamageCore(cleanSettings, rotation, barSize);

    const { entries, hits } = logger.endTrace();
    return { steps: entries, hits, result: calcResult.regularDamage };
}
