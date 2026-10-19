import { describe, it, expect } from 'vitest';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { targetCountAt, normalizeTargetCount } from '../../rotation_builder/targets';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES } from '$lib/data/abilities';
import { ARMOUR } from '$lib/data/armour';
import { rotationStore, rotationActions } from '$lib/stores/rotationStore.svelte.js';
import { WEAPONS } from '$lib/data/weapons';

function simulate(entries: Record<number, string>, changes: (number | null)[] = [2], overrides = {}, extras: Record<number, any[]> = {}) {
    const settings = createRangedSettings({
        [SETTINGS.RANGED_TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
        [SETTINGS.TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
        [SETTINGS.RANGED_AMMO_SLOT]: ARMOUR.WEN_ARROWS,
        [SETTINGS.AMMO]: ARMOUR.WEN_ARROWS,
        [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 0,
        [SETTINGS.ICY_CHILL_STACKS]: 0,
        [SETTINGS.INVIGORATING]: 0,
        ...overrides,
    });
    const rotation = { ...createRotationFromAbilities([], 40), targetCounts: changes };
    for (const [tick, key] of Object.entries(entries)) rotation.abilityBar[Number(tick)] = key;
    for (const [tick, actions] of Object.entries(extras)) rotation.extraActionBar[Number(tick)] = actions;
    const snapshots: Record<number, any> = {};
    const result = calculateRotationDamageCore(settings, rotation, 40, (tick, current) => { snapshots[tick] = {...current}; });
    return { result, snapshots };
}
describe('Locate target hits', () => {
    it('counts two basic hits for BoLG and Wen and keeps secondary damage separate', () => {
        const { result, snapshots } = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO});
        expect(snapshots[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(2);
        expect(snapshots[4][SETTINGS.ICY_CHILL_STACKS]).toBe(2);
        expect(result.secondaryDamage?.[1]).toBeGreaterThan(0);
        const single = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, [1]);
        expect(result.regularDamage).toBe(single.result.regularDamage);
    });
    it('does not duplicate hits without Locate', () => {
        const { result, snapshots } = simulate({3: ABILITIES.RANGED_AUTO});
        expect(snapshots[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(1);
        expect(result.secondaryDamage).toEqual({});
    });
    it('persists target changes during the buff', () => {
        const counts = Array(12).fill(null); counts[0] = 2; counts[6] = 3; counts[9] = 1;
        const { snapshots } = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO, 6: ABILITIES.RANGED_AUTO, 9: ABILITIES.RANGED_AUTO}, counts);
        expect(snapshots[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(2);
        expect(snapshots[7][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(5);
        expect(snapshots[10][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(6);
    });
    it('caps Locate at six targets even when nine are in range', () => {
        const {result, snapshots} = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, [9]);
        expect(snapshots[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(6);
        expect(Object.keys(result.secondaryDamage ?? {})).toHaveLength(5);
    });
    it('expires at tick 18', () => {
        expect(simulate({0: ABILITIES.LOCATE, 17: ABILITIES.RANGED_AUTO}).snapshots[19][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(2);
        expect(simulate({0: ABILITIES.LOCATE, 18: ABILITIES.RANGED_AUTO}).snapshots[19][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(1);
    });
    it('refreshes the buff when recast', () => {
        expect(simulate({0: ABILITIES.LOCATE, 15: ABILITIES.LOCATE, 20: ABILITIES.RANGED_AUTO}).snapshots[22][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(2);
    });
    it('grants Imbue Shadows adrenaline for each hit, without duplicating cast adrenaline', () => {
        const overrides = {[SETTINGS.SHADOW_IMBUED]: true, [SETTINGS.ADRENALINE]: 50};
        const two = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, [2], overrides);
        const one = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, [1], overrides);
        expect(two.snapshots[4][SETTINGS.ADRENALINE] - one.snapshots[4][SETTINGS.ADRENALINE]).toBe(5);
    });
    it('assigns a BoLG proc to the secondary target that reaches the threshold', () => {
        const { result, snapshots } = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RANGED_AUTO}, [2], {[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 6});
        expect(snapshots[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(0);
        expect(result.secondaryDamage?.[1]).toBeGreaterThan(result.regularDamage);
    });
    it('ends Locate on a weapon swap even if the original bow is re-equipped before attacking', () => {
        const gear = (value: string) => [{type: 'gear', slot: SETTINGS.RANGED_TH, value, title: value, icon: ''}];
        const { snapshots } = simulate({0: ABILITIES.LOCATE, 6: ABILITIES.RANGED_AUTO}, [2], {}, {3: gear('custom two-hand weapon'), 4: gear(WEAPONS.BOW_OF_THE_LAST_GUARDIAN)});
        expect(snapshots[7][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(1);
        expect(snapshots[4][SETTINGS.LOCATE]).toBe(false);
    });
    it('does not expand Ricochet or Bombardment with Locate', () => {
        for (const key of [ABILITIES.RICOCHET, ABILITIES.BOMBARDMENT]) {
            expect(simulate({0: ABILITIES.LOCATE, 3: key}).result.secondaryDamage).toEqual({});
        }
    });
    it('uses a changed count for later channel hits', () => {
        const counts = Array(15).fill(null); counts[0] = 1; counts[7] = 2;
        const one = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RAPID_FIRE}, [1]);
        const changed = simulate({0: ABILITIES.LOCATE, 3: ABILITIES.RAPID_FIRE}, counts);
        expect(changed.result.secondaryDamage?.[1]).toBeGreaterThan(0);
        expect(changed.snapshots[6][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(one.snapshots[6][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]);
    });
    it('validates target counts and inherits earlier changes', () => {
        expect(normalizeTargetCount(Infinity)).toBe(1);
        expect(normalizeTargetCount(-1)).toBe(1);
        expect(normalizeTargetCount(100)).toBe(9);
        expect(targetCountAt([2, null, 3, null], 3)).toBe(3);
        expect(targetCountAt(undefined, 50)).toBe(1);
    });
});

describe('target changes in rotation data', () => {
    it('exports an independent copy and shifts changes with inserted/removed ticks', () => {
        rotationActions.clearRotation();
        rotationStore.targetCounts[3] = 2;
        rotationStore.targetCounts[9] = 1;
        const saved = rotationActions.getCurrentRotationData();
        expect(saved.c[3]).toBe(2);
        rotationActions.insertTicks(3, 2);
        expect(rotationStore.targetCounts[5]).toBe(2);
        expect(rotationStore.targetCounts[11]).toBe(1);
        expect(saved.c[3]).toBe(2);
        rotationActions.removeTicks(3, 2);
        expect(rotationStore.targetCounts[3]).toBe(2);
        rotationActions.clearRotation();
        expect(rotationStore.targetCounts.every(v => v == null)).toBe(true);
    });
});
