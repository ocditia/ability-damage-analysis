import { describe, it, expect } from 'vitest';
import { calculateAccuracy, levelAccuracy, damagePotential } from '../../accuracy';
import { SETTINGS } from '../../settings_rb';
import { ARMOUR } from '$lib/data/armour';
import { ABILITIES, abils } from '$lib/data/abilities';
import { WEAPONS } from '$lib/data/weapons';
import { applyAccuracyEvent, normalizeTickEvent } from '../../rotation_builder/tickEvents';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { calculateSingleAbilityDamage } from '../../unified-damage-calculator';

const target = 'Lady Karmina Ghrazi';
function settings(overrides = {}) {
    return createRangedSettings({
        [SETTINGS.BOSS_PRESET]: target, [SETTINGS.AUTO_ACCURACY]: true,
        [SETTINGS.TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
        [SETTINGS.RANGED_TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
        [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.RANGED_AMMO_SLOT]: ARMOUR.WEN_ARROWS,
        [SETTINGS.AMMO]: ARMOUR.WEN_ARROWS,
        [SETTINGS.PRAYER]: 'none ranged', [SETTINGS.ICY_PRECISION]: 0,
        ...overrides
    });
}

describe('target damage potential', () => {
    it.each([[0,0],[1,75],[2,100],[3,125],[4,150]])('adds the current Energising rank %s accuracy bonus', (rank, bonus) => {
        const s=settings({[SETTINGS.FAMILIAR]:'none'});
        const base=calculateAccuracy(s,ABILITIES.RANGED_AUTO);
        expect(calculateAccuracy({...s,[SETTINGS.ENERGISING]:rank},ABILITIES.RANGED_AUTO).accuracy-base.accuracy).toBeCloseTo(bonus);
    });

    it.each([[3, 99], [2, 60], [1, 34], [0, 18]])('calibrates Ghrazi distance %s to observed %s%% before capping', (distance, expected) => {
        const base = settings();
        const correction = 99 / calculateAccuracy(base, ABILITIES.RANGED_AUTO).uncapped;
        const calibrated = {...base, [SETTINGS.ACCURACY_MULTIPLIER]: correction, [SETTINGS.GHRAZI_DISTANCE]: distance};
        expect(calculateAccuracy(calibrated, ABILITIES.RANGED_AUTO).potential).toBeCloseTo(expected);
    });
    it('does not apply a leftover Ghrazi distance to a different target', () => {
        const base = settings({[SETTINGS.BOSS_PRESET]: 'Nex'});
        expect(calculateAccuracy({...base, [SETTINGS.GHRAZI_DISTANCE]: 0}, ABILITIES.RANGED_AUTO))
            .toEqual(calculateAccuracy({...base, [SETTINGS.GHRAZI_DISTANCE]: 3}, ABILITIES.RANGED_AUTO));
    });
    it('keeps a distance change active on later ticks until another change', () => {
        const s = settings();
        const far = calculateAccuracy(s, ABILITIES.RANGED_AUTO).potential;
        applyAccuracyEvent(s, {ghraziDistance: 2});
        applyAccuracyEvent(s, null);
        expect(calculateAccuracy(s, ABILITIES.RANGED_AUTO).potential).toBeCloseTo(far * 60 / 99);
        applyAccuracyEvent(s, {ghraziDistance: 0});
        expect(calculateAccuracy(s, ABILITIES.RANGED_AUTO).potential).toBeCloseTo(far * 18 / 99);
        applyAccuracyEvent(s, {ghraziDistance: 3});
        expect(calculateAccuracy(s, ABILITIES.RANGED_AUTO).potential).toBeCloseTo(far);
    });

    it('applies a special attack accuracy modifier before capping', () => {
        const ability = Object.keys(abils).find(key => abils[key].mainStyle === 'melee' && abils[key].specialAccuracy === 1.2)!;
        expect(ability).toBeTruthy();
        expect(calculateAccuracy(settings(), ability).uncapped).toBeCloseTo(calculateAccuracy(settings(), ABILITIES.MELEE_AUTO).uncapped * 1.2);
    });
    it('uses the target armour plus Defence-level bonus, not armour alone', () => {
        const result = calculateAccuracy(settings(), ABILITIES.RANGED_AUTO);
        expect(result.armour).toBe(2765 + levelAccuracy(95));
        expect(result.potential).toBeCloseTo(100 * .55 * result.accuracy / result.armour);
    });
    it('uses the same base defence for both Ghrazi knights', () => {
        expect(calculateAccuracy(settings({[SETTINGS.BOSS_PRESET]: 'Lord Vasily Ghrazi'}), ABILITIES.RANGED_AUTO).potential)
            .toBe(calculateAccuracy(settings(), ABILITIES.RANGED_AUTO).potential);
    });
    it('applies Ful accuracy loss before capping', () => {
        const base = settings({[SETTINGS.ACCURACY_MULTIPLIER]: 1.6});
        const raw = calculateAccuracy(base, ABILITIES.BOLG_PROC).uncapped;
        expect(calculateAccuracy({...base, [SETTINGS.AMMO]: ARMOUR.FUL_ARROWS}, ABILITIES.BOLG_PROC).potential)
            .toBeCloseTo(Math.min(100, raw * .9));
    });
    it('never grants Wen hit chance to BoLG, but grants it to enhanced attacks', () => {
        const before = settings();
        const buffed = {...before, [SETTINGS.ICY_PRECISION]: 1};
        expect(calculateAccuracy(buffed, ABILITIES.BOLG_PROC)).toEqual(calculateAccuracy(before, ABILITIES.BOLG_PROC));
        expect(calculateAccuracy(buffed, ABILITIES.SNAP_SHOT).uncapped - calculateAccuracy(before, ABILITIES.SNAP_SHOT).uncapped).toBeCloseTo(30);
    });
    it('preserves manual final damage potential without applying Ful a second time', () => {
        expect(damagePotential(settings({[SETTINGS.AUTO_ACCURACY]: false, [SETTINGS.HIT_CHANCE]: 65, [SETTINGS.AMMO]: ARMOUR.FUL_ARROWS}), ABILITIES.BOLG_PROC)).toBe(.65);
    });
    it('persists target, distance and manual accuracy until explicitly changed', () => {
        const s = settings();
        applyAccuracyEvent(s, normalizeTickEvent({target: 'Lord Vasily Ghrazi', ghraziDistance: 2, accuracy: 65}));
        applyAccuracyEvent(s, null);
        applyAccuracyEvent(s, {phase: 'Phase 4'});
        expect(s[SETTINGS.BOSS_PRESET]).toBe('Lord Vasily Ghrazi');
        expect(s[SETTINGS.GHRAZI_DISTANCE]).toBe(2);
        expect(damagePotential(s, ABILITIES.RANGED_AUTO)).toBe(.65);
        applyAccuracyEvent(s, {automaticAccuracy: true});
        expect(calculateAccuracy(s, ABILITIES.RANGED_AUTO).automatic).toBe(true);
    });
    it('recalculates when a phase changes defence and affinity', () => {
        const base = settings();
        expect(calculateAccuracy({...base, _targetPhaseStats: {armour: 5000}}, ABILITIES.RANGED_AUTO).potential)
            .toBeLessThan(calculateAccuracy(base, ABILITIES.RANGED_AUTO).potential);
    });
    it('does not buff standalone BoLG damage with Icy Precision', () => {
        const base = settings({[SETTINGS.AUTO_ACCURACY]: false});
        expect(calculateSingleAbilityDamage({...base, [SETTINGS.ICY_PRECISION]: 1}, {ability: ABILITIES.BOLG_PROC}))
            .toEqual(calculateSingleAbilityDamage(base, {ability: ABILITIES.BOLG_PROC}));
    });
    it('uses a Ful swap before a queued BoLG proc lands', () => {
        function simulate(swap: boolean) {
            const s = settings({[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 7});
            const r = createRotationFromAbilities([ABILITIES.RANGED_AUTO], 15);
            if (swap) r.extraActionBar[1] = [{type: 'gear', slot: SETTINGS.RANGED_AMMO_SLOT, value: ARMOUR.FUL_ARROWS}];
            return calculateRotationDamageCore(s, r, 15);
        }
        const before = simulate(false);
        const after = simulate(true);
        expect(before.regularDamage).toBeGreaterThan(0);
        expect(after.regularDamage).not.toBe(before.regularDamage);
        expect(after.distributionStats.filter(hit => hit.ability === ABILITIES.RANGED_AUTO))
            .toEqual(before.distributionStats.filter(hit => hit.ability === ABILITIES.RANGED_AUTO));
        expect(after.distributionStats.filter(hit => hit.ability === ABILITIES.BOLG_PROC))
            .not.toEqual(before.distributionStats.filter(hit => hit.ability === ABILITIES.BOLG_PROC));
    });
});
