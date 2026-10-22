import {describe, it, expect} from 'vitest';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';

const rotation = () => createRotationFromAbilities([
    ABILITIES.RANGED_AUTO, null, null, ABILITIES.RANGED_AUTO,
    null, null, ABILITIES.RANGED_AUTO
]);
const calculate = (start: number) => calculateRotationDamageCore(
    createRangedSettings({[SETTINGS.BOSS_PATTERN_START]: start}), rotation(), 30
);

describe('rotation Start Tick damage boundary', () => {
    it('keeps an unset or zero start identical', () => {
        expect(calculate(0)).toEqual(calculate(-1));
    });

    it('discards earlier hits and includes a hit landing exactly on Start Tick', () => {
        const baseline = calculate(-1);
        expect(baseline.regularDamage).toBeGreaterThan(0);
        const boundary = baseline.distributionStats.at(-1)!.tick;
        const result = calculate(boundary);
        expect(result.distributionStats.length).toBeGreaterThan(0);
        expect(result.distributionStats.every(hit => hit.tick >= boundary)).toBe(true);
        expect(result.distributionStats.some(hit => hit.tick === boundary)).toBe(true);
        expect(result.regularDamage).toBeLessThan(baseline.regularDamage);
    });

    it('keeps pre-start damage and boss phase progress at zero while processing setup', () => {
        let sawPreparedTick = false;
        const result = calculateRotationDamageCore(createRangedSettings({
            [SETTINGS.BOSS_PATTERN_START]: 100,
            [SETTINGS.BOSS_HP]: 1,
            [SETTINGS.CRACKLING]: 4,
            [SETTINGS.FAMILIAR]: 'ripper demon',
        }), rotation(), 30, (tick, settings) => {
            if (tick === 3 && settings._rotationTick === 3) sawPreparedTick = true;
        });
        expect(sawPreparedTick).toBe(true);
        for (const field of ['regularDamage', 'poisonDamage', 'familiarDamage', 'dreadnipDamage', 'conjureDamage']) {
            expect(result[field]).toBe(0);
        }
        expect(result.distributionStats).toEqual([]);
        expect(result.phaseTransitions).toEqual([]);
    });
});
