import {ARMOUR} from '$lib/data/armour';
import {describe, it, expect} from 'vitest';
import {equipment, equipmentMechanicId} from '$lib/data/equipment';
import {WEAPONS} from '$lib/data/weapons';
import {ABILITIES} from '$lib/data/abilities';
import {SETTINGS} from '../../settings_rb';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';
import {showTimelineStack, usesBolg} from '../../rotation_builder/stackDisplay';

function simulate(weapon: number, balance = false) {
    const stacks: Record<number, number> = {};
    const rotation = createRotationFromAbilities(Array.from({length: 24}, (_, tick) => tick % 3 === 0 ? ABILITIES.RANGED_AUTO : null));
    const result = calculateRotationDamageCore(createRangedSettings({
        [SETTINGS.RANGED_TH]: weapon,
        [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 0,
        [SETTINGS.BALANCE_BY_FORCE]: balance,
    }), rotation, 30, (tick, settings) => {
        stacks[tick] = settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS];
    });
    return {stacks, procs: result.distributionStats.filter(hit => hit.ability === ABILITIES.BOLG_PROC)};
}

describe('BOLG variant stack tracking', () => {
    it('displays unchanged and zero BOLG stacks, including at row boundaries', () => {
        const values = Array(60).fill(3);
        expect(showTimelineStack(SETTINGS.PERFECT_EQUILIBRIUM_STACKS, 27, values)).toBe(true);
        expect(showTimelineStack(SETTINGS.PERFECT_EQUILIBRIUM_STACKS, 4, Array(10).fill(0))).toBe(true);
        expect(showTimelineStack(SETTINGS.PERFECT_EQUILIBRIUM_STACKS, 60, values)).toBe(false);
    });
    it('keeps the zero-stack lane available for starting bows and later bow swaps', () => {
        expect(usesBolg({[SETTINGS.RANGED_TH]: {value: 53426}})).toBe(true);
        expect(usesBolg({}, [null, [{type: 'gear', value: 53426}]] as any)).toBe(true);
        expect(usesBolg({})).toBe(false);
    });
    const variants = Object.values(equipment).filter(item => equipmentMechanicId(item.id) === WEAPONS.BOW_OF_THE_LAST_GUARDIAN);
    it.each(variants.map(item => [item.title, item.id] as const))('%s builds stacks and procs like the base bow', (_, id) => {
        const baseline = simulate(WEAPONS.BOW_OF_THE_LAST_GUARDIAN);
        expect(Math.max(...Object.values(baseline.stacks))).toBeGreaterThan(0);
        expect(baseline.procs.length).toBeGreaterThan(0);
        expect(simulate(id)).toEqual(baseline);
    });
    it('keeps Balance by Force stack resets consistent for augmented bows', () => {
        expect(simulate(53426, true)).toEqual(simulate(WEAPONS.BOW_OF_THE_LAST_GUARDIAN, true));
    });
});

describe.each([ABILITIES.SNIPE, ABILITIES.SNIPE_FLANK])('%s hit order and BOLG stacks', (snipe) => {
    it.each([
        [true, 3, 1, 1],
        [true, 2, 0, 1],
        [true, 0, 2, 0],
        [false, 7, 1, 1],
        [false, 6, 0, 1],
    ])('balance=%s starting=%s ends at %s with %s procs', (balance, start, end, procCount) => {
        let finalStacks = -1;
        const result = calculateRotationDamageCore(createRangedSettings({
            [SETTINGS.RANGED_TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
            [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.RANGED_GLOVES]: ARMOUR.NIGHTMARE_GAUNTLETS_E,
            [SETTINGS.ENCHANTMENT_OF_DREAD]: true,
            [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: start,
            [SETTINGS.BALANCE_BY_FORCE]: balance,
        }), createRotationFromAbilities([snipe], 15), 15,
            (_, settings) => finalStacks = settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]);
        const hits = result.distributionStats.filter(hit => [ABILITIES.SNIPE_HIT, ABILITIES.SNIPE_HIT_2, ABILITIES.BOLG_PROC].includes(hit.ability as ABILITIES));
        expect(hits.filter(hit => hit.ability === ABILITIES.BOLG_PROC)).toHaveLength(procCount);
        expect(finalStacks).toBe(end);
        const expected = procCount === 0 ? [ABILITIES.SNIPE_HIT, ABILITIES.SNIPE_HIT_2]
            : end === 1 ? [ABILITIES.SNIPE_HIT, ABILITIES.BOLG_PROC, ABILITIES.SNIPE_HIT_2]
            : [ABILITIES.SNIPE_HIT, ABILITIES.SNIPE_HIT_2, ABILITIES.BOLG_PROC];
        expect(hits.map(hit => hit.ability)).toEqual(expected);
    });
});
