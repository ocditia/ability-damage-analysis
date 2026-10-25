import {describe, it, expect} from 'vitest';
import {phaseDamageRows} from '../../rotation_builder/phaseDamage';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {createRangedSettings, createMeleeSettings, createRotationFromAbilities} from '../test-helpers';
import {ABILITIES} from '$lib/data/abilities';
import {SETTINGS} from '../../settings_rb';

describe('phase damage', () => {
    it('assigns split-tick hits to the new manual phase without duplicating damage', () => {
        const rows = phaseDamageRows([0, 10, 20, 30], [null, null, {phase: 'P2'}], []);
        expect(rows.map(row => row.damage)).toEqual([10, 50]);
        expect(rows.map(row => [row.start, row.end])).toEqual([[0, 1], [2, 3]]);
    });
    it('includes an automatic transition hit in the phase it finishes', () => {
        const rows = phaseDamageRows([0, 10, 20, 30], [], [{tick: 2, label: 'P2'}]);
        expect(rows.map(row => row.damage)).toEqual([30, 30]);
    });
    it('matches the actual total and respects Start Tick', () => {
        const settings = createRangedSettings({[SETTINGS.BOSS_PATTERN_START]: 3, [SETTINGS.FAMILIAR]: 'ripper demon'});
        const rotation = createRotationFromAbilities([ABILITIES.RANGED_AUTO, null, null, ABILITIES.RANGED_AUTO]);
        const result = calculateRotationDamageCore(settings, rotation, 30);
        const rows = phaseDamageRows(result.phaseDamagePerTick!, [null, null, null, {phase: 'Fight'}], []);
        const total = result.regularDamage + result.poisonDamage + result.familiarDamage + result.dreadnipDamage
            + result.conjureDamage + Object.values(result.secondaryDamage ?? {}).reduce((a, b) => a + b, 0);
        expect(total).toBeGreaterThan(0);
        expect(rows[0].damage).toBe(0);
        expect(rows.reduce((sum, row) => sum + row.damage, 0)).toBeCloseTo(total);
    });
});

it('credits a released Grico to its cast phase even when its hits land in the next phase', () => {
    const settings = createRangedSettings();
    const rotation: any = createRotationFromAbilities([], 15);
    rotation.stalledAbilities[0] = ABILITIES.GREATER_RICOCHET;
    rotation.releasedAbilities = Array(15).fill(null);
    rotation.releasedAbilities[3] = ABILITIES.GREATER_RICOCHET;
    rotation.tickEvents = [];
    rotation.tickEvents[3] = {phase:'Pillar 1', targetId:'Pillar 1'};
    rotation.tickEvents[6] = {phase:'Pillar 2', targetId:'Pillar 2'};
    const result = calculateRotationDamageCore(settings, rotation, 15);
    const rows = phaseDamageRows(result.phaseDamagePerTick!, rotation.tickEvents, []);
    expect(rows[1].damage).toBeGreaterThan(0);
    expect(rows[2].damage).toBe(0);
    expect(rows.reduce((sum, row) => sum + row.damage, 0)).toBeCloseTo(result.regularDamage + result.poisonDamage);
    expect(result.distributionStats.some(hit=>hit.tick>=6)).toBe(true);
});
it('keeps lingering hits on the original target and resumes ECB when returning after multiple targets', () => {
    const settings = createRangedSettings({[SETTINGS.SPLIT_SOUL]:true});
    const rotation: any = createRotationFromAbilities([ABILITIES.CORRUPTION_SHOT], 30);
    rotation.tickEvents = [];
    rotation.tickEvents[0] = {phase:'Start',targetId:'Boss'};
    rotation.tickEvents[1] = {phase:'Add 1',targetId:'First add'};
    rotation.tickEvents[2] = {phase:'Add 2',targetId:'Second add'};
    const away = calculateRotationDamageCore(settings, rotation, 30);
    rotation.tickEvents[3] = {phase:'Return',targetId:'Boss'};
    const returned = calculateRotationDamageCore(settings, rotation, 30);
    const split = result => result.distributionStats.filter(hit=>hit.ability===ABILITIES.SPLIT_SOUL_ECB);
    expect(split(away)).toHaveLength(0);
    expect(split(returned).length).toBeGreaterThan(0);
    const direct = result => result.distributionStats.filter(hit=>hit.ability!==ABILITIES.SPLIT_SOUL_ECB);
    expect(direct(returned)).toEqual(direct(away));
    expect(returned.phaseDamagePerTick[0]).toBe(away.phaseDamagePerTick[0]);
});

it('remembers EZK Flamebound Rival separately when leaving and returning to a target', () => {
    const settings = createMeleeSettings({[SETTINGS.ADRENALINE]:100});
    const rotation: any = createRotationFromAbilities([ABILITIES.IGNEOUS_SHOWDOWN], 20);
    rotation.tickEvents = [];
    rotation.tickEvents[0] = {phase:'Boss',targetId:'Boss'};
    rotation.tickEvents[3] = {phase:'Add 1',targetId:'Add 1'};
    rotation.tickEvents[4] = {phase:'Add 2',targetId:'Add 2'};
    rotation.tickEvents[5] = {phase:'Boss again',targetId:'Boss'};
    const seen = {};
    calculateRotationDamageCore(settings, rotation, 20, (tick, values) => seen[tick] = values[SETTINGS.FLAMEBOUND_RIVAL]);
    expect(seen[2]).toBe(true);
    expect(seen[3]).toBe(false);
    expect(seen[4]).toBe(false);
    expect(seen[5]).toBe(true);
});
