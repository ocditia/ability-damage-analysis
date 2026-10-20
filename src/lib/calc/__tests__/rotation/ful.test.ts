import { describe, expect, it } from 'vitest';
import { ARMOUR } from '$lib/data/armour';
import { ABILITIES } from '$lib/data/abilities';
import { SETTINGS } from '../../settings_rb';
import { recalcFulProbability, rollFulHit } from '../../rotation_builder/ful';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';

function simulate(entries: Record<number, string>, targets = 1, stalls: Record<number, string> = {}) {
    const settings = createRangedSettings({
        [SETTINGS.POCKET]: ARMOUR.FUL_BOOK,
        [SETTINGS.RANGED_POCKET]: ARMOUR.FUL_BOOK,
        [SETTINGS.CALC_TYPE]: SETTINGS.CALC_TYPE_VALUES.ROTATION,
    });
    const rotation = { ...createRotationFromAbilities([], 40), targetCounts: [targets],
        stalledAbilities: Object.assign(Array(40).fill(null), stalls) };
    Object.assign(rotation.abilityBar, entries);
    const frames: Record<number, any> = {};
    const result = calculateRotationDamageCore(settings, rotation, 40, (tick, s) => frames[tick] = {...s});
    return {result, frames};
}

describe('Scripture of Ful', () => {
    it('rolls for every Decimation target, without rolling for Locate itself', () => {
        const one = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO});
        const two = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, 2);
        expect(one.frames[2][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBe(0);
        expect(one.frames[4][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBeCloseTo(.066, 10);
        expect(two.frames[4][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBeCloseTo(1 - .934 ** 2, 10);
    });

    it('does not roll for stalled attacks or bleed hits', () => {
        const stall = simulate({}, 1, {0: ABILITIES.RANGED_AUTO});
        expect(stall.frames[4][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBe(0);
        const state = {tick: 0, fulProcHistory: []};
        const settings = {[SETTINGS.POCKET]: ARMOUR.FUL_BOOK};
        rollFulHit(state, settings, ABILITIES.CORRUPTION_SHOT);
        expect(recalcFulProbability(state, settings)).toBe(0);
    });

    it('rolls for each channel hit and does not boost the triggering hit', () => {
        const {frames} = simulate({0: ABILITIES.RAPID_FIRE});
        expect(frames[9][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBeGreaterThan(.3);
        const boosted = simulate({0: ABILITIES.RANGED_AUTO, 3: ABILITIES.RANGED_AUTO}).result.distributionStats;
        const first = boosted.find(x => x.tick === 1)!;
        const second = boosted.find(x => x.tick === 4)!;
        expect(second.nonCritMax).toBeGreaterThan(first.nonCritMax);
    });

    it('prevents reactivation during the buff and permits it at tick 25', () => {
        const state = {tick: 0, fulProcHistory: [1]};
        const settings = {[SETTINGS.POCKET]: ARMOUR.FUL_BOOK};
        for (state.tick = 0; state.tick < 25; state.tick++) {
            rollFulHit(state, settings, ABILITIES.RANGED_AUTO);
            expect(recalcFulProbability(state, settings)).toBe(1);
        }
        expect(recalcFulProbability(state, settings)).toBe(0);
        rollFulHit(state, settings, ABILITIES.RANGED_AUTO);
        expect(recalcFulProbability(state, settings)).toBeCloseTo(.066, 10);
    });

    it('bounds dense-hit uptime and discards the buff on unequip', () => {
        const state = {tick: 0, fulProcHistory: []};
        const settings = {[SETTINGS.POCKET]: ARMOUR.FUL_BOOK};
        for (state.tick = 0; state.tick < 100; state.tick++) {
            for (let hit = 0; hit < 20; hit++) rollFulHit(state, settings, ABILITIES.RANGED_AUTO);
            expect(recalcFulProbability(state, settings)).toBeLessThanOrEqual(1);
        }
        settings[SETTINGS.POCKET] = 'none';
        expect(recalcFulProbability(state, settings)).toBe(0);
        settings[SETTINGS.POCKET] = ARMOUR.FUL_BOOK;
        expect(recalcFulProbability(state, settings)).toBe(0);
    });
});
