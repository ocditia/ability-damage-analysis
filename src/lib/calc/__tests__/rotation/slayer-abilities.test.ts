import { describe, it, expect } from 'vitest';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES } from '$lib/data/abilities';
import { slayerAbilities, paletteAbilities } from '$lib/data/abilityPalette';

function simulate(key?: string, casts = [0], attack = -1) {
    const rotation = createRotationFromAbilities([], 105);
    if (key) for (const tick of casts) rotation.extraActionBar[tick] = [key];
    if (attack >= 0) rotation.abilityBar[attack] = ABILITIES.RANGED_AUTO;
    const snapshots: Record<number, any> = {};
    const result = calculateRotationDamageCore(createRangedSettings({
        [SETTINGS.ADRENALINE]: 50, [SETTINGS.SLAYER_SIGIL]: 'none',
    }), rotation, 105, (tick, settings) => { snapshots[tick] = {...settings}; });
    return {result, snapshots};
}

describe.each(slayerAbilities)('%s', key => {
    it('appears as a shared off-GCD utility', () => {
        expect(paletteAbilities[key]).toMatchObject({shared: true, offGcd: true, abilityType: 'utility', cooldown: 60});
    });
    it('expires after 17 ticks, rejects early recasts and allows a cast after 60 seconds', () => {
        const {snapshots, result} = simulate(key, [0, 10, 100]);
        expect(snapshots[1][key]).toBe(true);
        expect(snapshots[16][key]).toBe(true);
        expect(snapshots[18][key]).toBe(false);
        expect(snapshots[99][key]).toBe(false);
        expect(snapshots[101][key]).toBe(true);
        expect(snapshots[1][SETTINGS.ADRENALINE]).toBe(50);
        expect(result.regularDamage).toBe(0);
    });
    it('increases damage while active and stops increasing it after expiry', () => {
        const baseline = simulate(undefined, [], 3).result.regularDamage;
        expect(simulate(key, [0], 3).result.regularDamage / baseline).toBeCloseTo(1.15, 2);
        expect(simulate(key, [0], 20).result.regularDamage).toBe(simulate(undefined, [], 20).result.regularDamage);
    });
});
