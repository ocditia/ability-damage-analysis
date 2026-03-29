/**
 * Damage Trace — captures step-by-step breakdown from the real damage pipeline.
 *
 * Uses the Logger's trace capture mode to record structured entries
 * as the actual calculation runs. The trace is always accurate because
 * it IS the real calculation.
 */

import { Logger, type TraceEntry, type TraceHit } from '$lib/utils/Logger';
import { calculateSingleAbilityDamage } from './unified-damage-calculator';

export type { TraceEntry, TraceHit };

export function traceDamageCalculation(
    settings: Record<string, any>,
    abilityKey: string
): { steps: TraceEntry[], hits: TraceHit[], result: number } {
    const logger = Logger.getInstance();
    logger.startTrace();

    const calcResult = calculateSingleAbilityDamage(settings, { ability: abilityKey });

    const { entries, hits } = logger.endTrace();
    return { steps: entries, hits, result: calcResult.expected };
}
