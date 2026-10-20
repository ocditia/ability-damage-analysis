import { beforeEach, expect, it } from 'vitest';
import { rotationActions, rotationStore } from '$lib/stores/rotationStore.svelte.js';

beforeEach(() => rotationActions.clearRotation());

it('moves the suffix five ticks earlier with all associated events', () => {
    rotationStore.abilityBar[3] = 'earlier ability';
    rotationStore.abilityBar[17] = 'greater ricochet';
    rotationStore.releasedAbilities[17] = 'balance by force';
    rotationStore.stalledAbilities[20] = 'snipe';
    rotationStore.extraActionBar[17] = [{type: 'gear', value: 'weapon'}];
    rotationStore.targetCounts[17] = 2;
    rotationStore.tickEvents[17] = {adrenaline: 75, ghraziDistance: 2, phase: 'Phase 2'};
    rotationStore.nulledTicks[20] = true;
    expect(rotationActions.shiftTicks(17, -5)).toEqual({success: true});
    expect(rotationStore.abilityBar[3]).toBe('earlier ability');
    expect(rotationStore.abilityBar[12]).toBe('greater ricochet');
    expect(rotationStore.releasedAbilities[12]).toBe('balance by force');
    expect(rotationStore.stalledAbilities[15]).toBe('snipe');
    expect(rotationStore.extraActionBar[12][0].value).toBe('weapon');
    expect(rotationStore.targetCounts[12]).toBe(2);
    expect(rotationStore.tickEvents[12].adrenaline).toBe(75);
    expect(rotationStore.nulledTicks[15]).toBe(true);
    expect(rotationStore.abilityBar[17]).toBeNull();
    expect(rotationStore.abilityBar).toHaveLength(300);
});

it('moves the entire rotation later and round-trips back', () => {
    rotationStore.abilityBar[0] = 'snipe';
    rotationStore.tickEvents[299 - 5] = {damagePotential: 0};
    const before = JSON.stringify(rotationActions.getCurrentRotationData());
    expect(rotationActions.shiftTicks(0, 5).success).toBe(true);
    expect(rotationStore.abilityBar[5]).toBe('snipe');
    expect(rotationStore.tickEvents[299]).toEqual({damagePotential: 0});
    expect(rotationActions.shiftTicks(5, -5).success).toBe(true);
    expect(JSON.stringify(rotationActions.getCurrentRotationData())).toBe(before);
});

it('rejects a collision with a condition before the start, without mutation', () => {
    rotationStore.abilityBar[17] = 'snipe';
    rotationStore.targetCounts[14] = 2;
    const before = JSON.stringify(rotationActions.getCurrentRotationData());
    expect(rotationActions.shiftTicks(17, -5).success).toBe(false);
    expect(JSON.stringify(rotationActions.getCurrentRotationData())).toBe(before);
});

it('rejects moves that would lose events beyond either end', () => {
    rotationStore.abilityBar[0] = 'snipe';
    rotationStore.extraActionBar[299] = [{type: 'ability', value: 'surge'}];
    expect(rotationActions.shiftTicks(0, -1).success).toBe(false);
    expect(rotationActions.shiftTicks(0, 1).success).toBe(false);
    expect(rotationStore.extraActionBar[299][0].value).toBe('surge');
});

it('rejects empty ranges and fractional tick input', () => {
    expect(rotationActions.shiftTicks(17, 5).success).toBe(false);
    rotationStore.abilityBar[17] = 'snipe';
    expect(rotationActions.shiftTicks(17, 1.5).success).toBe(false);
    expect(rotationActions.shiftTicks(17.5, 1).success).toBe(false);
});
