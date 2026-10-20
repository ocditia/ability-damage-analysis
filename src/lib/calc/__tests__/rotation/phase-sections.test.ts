import { expect, it } from 'vitest';
import { timelineRows } from '../../rotation_builder/timelineRows';
import { normalizeTickEvent } from '../../rotation_builder/tickEvents';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { SETTINGS } from '../../settings_rb';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';
import { ABILITIES } from '$lib/data/abilities';

it('breaks rows at named phases without inserting or losing ticks at any width', () => {
    const events = Array(110).fill(null);
    events[0] = {phase: "War's"}; events[17] = {phase: 'Phase 1–3'}; events[84] = {phase: 'Heart'};
    for (const width of [1, 20, 27, 40]) {
        const rows = timelineRows(events, 110, width);
        expect(rows.flatMap(row => Array.from({length: row.endIndex - row.startIndex}, (_, i) => row.startIndex + i)))
            .toEqual(Array.from({length: 110}, (_, i) => i));
        expect(rows.filter(row => row.sectionTitle).map(row => [row.startIndex, row.sectionEnd, row.sectionTitle]))
            .toEqual([[0,16,"War's"],[17,83,'Phase 1–3'],[84,109,'Heart']]);
        expect(new Set(rows.map(row => row.gridRow)).size).toBe(rows.length);
    }
});

it('keeps the old row layout when there are no phases', () => {
    expect(timelineRows([], 60, 27).map(row => [row.startIndex, row.endIndex, row.gridRow]))
        .toEqual([[0,27,1],[27,54,2],[54,60,3]]);
});

it('persists only supported stack resets on named phases', () => {
    const event = {phase:'Heart', clearStacks:[SETTINGS.BIK_STACKS, SETTINGS.ADRENALINE, 'unknown']};
    expect(normalizeTickEvent(JSON.parse(JSON.stringify(event)))?.clearStacks).toEqual([SETTINGS.BIK_STACKS]);
    expect(normalizeTickEvent({...event, phase:undefined})).toBeNull();
});

function simulate(event: any) {
    const rotation = {...createRotationFromAbilities([], 12), tickEvents: Array(12).fill(null)};
    rotation.abilityBar[0] = ABILITIES.DEATH_SWIFTNESS;
    rotation.tickEvents[3] = event;
    const frames: Record<number, any> = {};
    const settings = createRangedSettings({[SETTINGS.ADRENALINE]:100,
        [SETTINGS.ICY_CHILL_STACKS]:7, [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]:2});
    const result = calculateRotationDamageCore(settings, rotation, 12, (tick, value) => frames[tick] = {...value});
    return {result, frames};
}

it('keeps simulation state when a phase only adds a heading', () => {
    const plain = simulate(null), named = simulate({phase:'Phase 1–3'});
    expect(named.result.regularDamage).toBe(plain.result.regularDamage);
    for (const key of [SETTINGS.ADRENALINE, SETTINGS.ICY_CHILL_STACKS, SETTINGS.PERFECT_EQUILIBRIUM_STACKS, SETTINGS.DEATH_SWIFTNESS]) {
        expect(named.frames[4][key]).toEqual(plain.frames[4][key]);
    }
});

it('clears only selected stacks at the phase boundary, retaining buffs and adrenaline', () => {
    const plain = simulate(null), cleared = simulate({phase:'Heart', clearStacks:[SETTINGS.ICY_CHILL_STACKS]});
    expect(cleared.frames[2][SETTINGS.ICY_CHILL_STACKS]).toBe(7);
    expect(cleared.frames[3][SETTINGS.ICY_CHILL_STACKS]).toBe(0);
    expect(cleared.frames[4][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(2);
    expect(cleared.frames[4][SETTINGS.DEATH_SWIFTNESS]).toBe(plain.frames[4][SETTINGS.DEATH_SWIFTNESS]);
    expect(cleared.frames[4][SETTINGS.ADRENALINE]).toBe(plain.frames[4][SETTINGS.ADRENALINE]);
});
