import { expect, it } from 'vitest';
import { ABILITIES } from '$lib/data/abilities';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createMeleeSettings, createRotationFromAbilities } from '../test-helpers';

function remaining(gap: number, berserk: boolean) {
    const rotation = createRotationFromAbilities([], 60);
    if (berserk) rotation.abilityBar[0] = ABILITIES.BERSERK;
    rotation.abilityBar[3] = ABILITIES.OVERPOWER;
    rotation.abilityBar[3 + gap] = ABILITIES.OVERPOWER;
    return calculateRotationDamageCore(createMeleeSettings(), rotation, 60)
        .tickMetadata[3 + gap].cooldownRemaining;
}

it('allows Overpower after 15 ticks during Berserk, including the reported 18-tick gap', () => {
    expect(remaining(14, true)).toBeGreaterThan(0);
    expect(remaining(15, true)).toBe(0);
    expect(remaining(18, true)).toBe(0);
});

it('keeps the normal 50-tick cooldown outside Berserk', () => {
    expect(remaining(18, false)).toBeGreaterThan(0);
    expect(remaining(49, false)).toBeGreaterThan(0);
    expect(remaining(50, false)).toBe(0);
});
