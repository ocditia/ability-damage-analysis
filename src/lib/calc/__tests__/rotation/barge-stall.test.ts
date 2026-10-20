import { expect, it } from 'vitest';
import { ABILITIES } from '$lib/data/abilities';
import { SETTINGS } from '../../settings_rb';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createMeleeSettings, createRotationFromAbilities } from '../test-helpers';

function simulate(bargeTick = 9, release = false) {
    const rotation = {...createRotationFromAbilities([], 25),
        stalledAbilities:Array(25).fill(null), releasedAbilities:Array(25).fill(null)};
    rotation.abilityBar[0] = ABILITIES.MELEE_AUTO;
    rotation.stalledAbilities[3] = ABILITIES.MELEE_AUTO;
    rotation.abilityBar[6] = ABILITIES.BERSERK;
    if (release) rotation.releasedAbilities[6] = ABILITIES.MELEE_AUTO;
    rotation.abilityBar[bargeTick] = ABILITIES.GREATER_BARGE;
    rotation.abilityBar[bargeTick + 3] = ABILITIES.ASSAULT;
    rotation.abilityBar[bargeTick + 6] = ABILITIES.MELEE_AUTO;
    const frames:Record<number, any> = {};
    const result = calculateRotationDamageCore(createMeleeSettings({[SETTINGS.TIME_SINCE_ATTACK]:0,
        [SETTINGS.ADRENALINE]:100}),rotation,25,(tick,s)=>frames[tick]={...s});
    return {result,frames};
}

it('stall then Berserk preserves the gap and converts Assault into a DOT', () => {
    const {result,frames}=simulate();
    expect(frames[6][SETTINGS.TIME_SINCE_ATTACK]).toBeGreaterThanOrEqual(6);
    expect(result.tickMetadata[12].resolvedAbility).toBe(ABILITIES.ASSAULT_BARGE);
    expect(result.tickMetadata[12].duration).toBe(3);
    expect(result.distributionStats.some(hit => hit.tick > 15 && hit.ability.includes('assault'))).toBe(true);
});

it('a released attack resets the gap even when Berserk shares its tick', () => {
    expect(simulate(9,true).result.tickMetadata[12].resolvedAbility).toBe(ABILITIES.ASSAULT);
});

it('requires eight ticks rather than five and allows the exact threshold', () => {
    expect(simulate(7).result.tickMetadata[10].resolvedAbility).toBe(ABILITIES.ASSAULT);
    expect(simulate(8).result.tickMetadata[11].resolvedAbility).toBe(ABILITIES.ASSAULT_BARGE);
});
