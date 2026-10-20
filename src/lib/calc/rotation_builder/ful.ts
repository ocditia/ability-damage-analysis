import { ARMOUR } from '$lib/data/armour';
import { abils } from '$lib/data/abilities';
import { SETTINGS } from '../settings_rb';

type FulState = { tick: number; fulProcHistory: number[] };
const DURATION = 25;
const CHANCE = 0.066;

/** Mutually exclusive probability mass for each possible activation tick.
 * The 15-second cooldown runs alongside the buff, not after it.
 */
export function recalcFulProbability(state: FulState, settings: Record<string, any>): number {
    if (settings[SETTINGS.POCKET] !== ARMOUR.FUL_BOOK) {
        // Unequipping ends the effect; re-equipping cannot recover it.
        state.fulProcHistory.length = 0;
        settings[SETTINGS.SCRIPTURE_OF_FUL_PROB] = 0;
        return 0;
    }
    let active = 0;
    for (let tick = Math.max(0, state.tick - DURATION + 1); tick <= state.tick; tick++) {
        active += state.fulProcHistory[tick] ?? 0;
    }
    active = Math.min(1, Math.max(0, active));
    settings[SETTINGS.SCRIPTURE_OF_FUL_PROB] = active;
    return active;
}

/** One roll per released damaging hit/target. Derived damage and bleeds do not roll. */
export function rollFulHit(state: FulState, settings: Record<string, any>, key: string, likelihood = 1) {
    const ability = abils[key];
    if (settings[SETTINGS.POCKET] !== ARMOUR.FUL_BOOK || settings.isNulledTick || !ability
        || ability.onHitEffects === false || (ability.minHit ?? 0) + (ability.varHit ?? 0) <= 0
        || ['self cast', 'bleed', 'burn', 'perk'].includes(ability.abilityClassification)
        || ['bleed', 'burn', 'split soul'].includes(ability.damageType)) return;
    const active = recalcFulProbability(state, settings);
    const mass = (1 - active) * CHANCE * Math.min(1, Math.max(0, likelihood));
    state.fulProcHistory[state.tick] = (state.fulProcHistory[state.tick] ?? 0) + mass;
    settings[SETTINGS.SCRIPTURE_OF_FUL_PROB] = Math.min(1, active + mass);
}
