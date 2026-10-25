import { expect, it } from 'vitest';
import { ABILITIES } from '$lib/data/abilities';
import { SETTINGS } from '../../settings_rb';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createMeleeSettings, createRotationFromAbilities } from '../test-helpers';

function simulate(ability: string, targets: number, next?: string) {
    const rotation = {...createRotationFromAbilities([],18), targetCounts:[targets]};
    rotation.abilityBar[0] = ability;
    if (next) rotation.abilityBar[3] = next;
    return calculateRotationDamageCore(createMeleeSettings({[SETTINGS.POCKET]:'none', [SETTINGS.MELEE_POCKET]:'none'}),rotation,18);
}

it.each([ABILITIES.POWERSTAB,ABILITIES.SWEEP,ABILITIES.SUNFALL_SLAM])('%s damages both targets without doubling the main target', ability => {
    const one=simulate(ability,1), two=simulate(ability,2);
    expect(two.regularDamage).toBe(one.regularDamage);
    expect(two.secondaryDamage?.[1]).toBe(two.regularDamage);
    expect(two.secondaryHits?.every(hit=>hit.targetIndex===1)).toBe(true);
    expect(two.secondaryHits?.length).toBe(ability===ABILITIES.SWEEP ? 2 : 1);
});

it('applies each special attack target cap',()=>{
    expect(Object.keys(simulate(ABILITIES.POWERSTAB,25).secondaryDamage!)).toHaveLength(24);
    expect(Object.keys(simulate(ABILITIES.SWEEP,25).secondaryDamage!)).toHaveLength(8);
    expect(Object.keys(simulate(ABILITIES.SUNFALL_SLAM,25).secondaryDamage!)).toHaveLength(8);
});

it('Sunfall adds Lesser Purifying Light to secondary targets only, once per multihit cast',()=>{
    const out=simulate(ABILITIES.SUNFALL_SLAM,4,ABILITIES.SWEEP);
    const lights=out.secondaryHits!.filter(hit=>hit.ability===ABILITIES.LESSER_PURIFYING_LIGHT);
    expect(lights.map(hit=>hit.targetIndex)).toEqual([1,2]);
    expect(out.distributionStats.some(hit=>hit.ability===ABILITIES.LESSER_PURIFYING_LIGHT)).toBe(false);
});

it('Sunfall adds light for each channel hit, but does not create damage without extra targets',()=>{
    const out=simulate(ABILITIES.SUNFALL_SLAM,2,ABILITIES.ASSAULT);
    expect(out.secondaryHits!.filter(hit=>hit.ability===ABILITIES.LESSER_PURIFYING_LIGHT)).toHaveLength(4);
    expect(simulate(ABILITIES.SUNFALL_SLAM,1,ABILITIES.ASSAULT).secondaryDamage).toEqual({});
});
