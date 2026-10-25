import { describe, it, expect } from 'vitest';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createMeleeSettings, createRotationFromAbilities } from '../test-helpers';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES, abils } from '$lib/data/abilities';
import { WEAPONS } from '$lib/data/weapons';

function simulate(entries: Record<number, string> = {0: ABILITIES.METEOR_STRIKE}, overrides = {}, extras: Record<number, any[]> = {}) {
    const settings = createMeleeSettings({[SETTINGS.ADRENALINE]: 100, [SETTINGS.CAP_ADRENALINE]: false,
        [SETTINGS.INVIGORATING]: 0, ...overrides});
    const rotation = createRotationFromAbilities([], 80);
    for (const [tick, key] of Object.entries(entries)) rotation.abilityBar[Number(tick)] = key;
    for (const [tick, actions] of Object.entries(extras)) rotation.extraActionBar[Number(tick)] = actions;
    const ticks: Record<number, any> = {};
    calculateRotationDamageCore(settings, rotation, 80, (tick, current) => { ticks[tick] = {...current}; });
    return ticks;
}
const adren = (ticks: Record<number, any>, tick: number) => ticks[tick][SETTINGS.ADRENALINE];
describe('current Meteor Strike', () => {
    it('uses the modern damage range, cost and cooldown', () => {
        expect(abils[ABILITIES.METEOR_STRIKE]).toMatchObject({minHit: 2.2, varHit: 0.3, adrenaline: 60, cooldown: 60});
    });
    it('generates 225 adrenaline over 50 ticks, then stops', () => {
        const ticks = simulate();
        expect(adren(ticks, 0)).toBe(40);
        expect(adren(ticks, 1)).toBe(44.5);
        expect(adren(ticks, 50)).toBe(265);
        expect(adren(ticks, 55)).toBe(265);
    });
    it('does not double passive regeneration with Natural Instinct', () => {
        expect(adren(simulate(undefined, {[SETTINGS.NATURAL_INSTINCT]: true}), 50)).toBe(265);
    });
    it('keeps the fractional 13.5 adrenaline from a 9-adrenaline melee basic', () => {
        const basic = simulate({0: ABILITIES.METEOR_STRIKE, 3: ABILITIES.MELEE_AUTO});
        const idle = simulate();
        expect(adren(basic, 4) - adren(idle, 4)).toBe(13.5);
    });
    it('pauses regeneration while another combat style is equipped and resumes in melee', () => {
        const ticks = simulate({0: ABILITIES.METEOR_STRIKE, 3: ABILITIES.RANGED_AUTO, 9: ABILITIES.MELEE_AUTO});
        expect(adren(ticks, 8)).toBe(adren(ticks, 4));
        expect(adren(ticks, 11) - adren(ticks, 10)).toBe(4.5);
        expect(ticks[8][SETTINGS.METEOR_STRIKE_BUFF]).toBe(true);
    });
    it('reacts to weapon swaps on empty ticks, without restarting the timer', () => {
        const gear = (slot: string, value: any) => [{type: 'gear', slot, value, title: 'Test weapon', icon: ''}];
        const ticks = simulate(undefined, {}, {
            3: gear(SETTINGS.RANGED_TH, WEAPONS.BOW_OF_THE_LAST_GUARDIAN),
            8: gear(SETTINGS.MELEE_TH, 'custom two-hand weapon'),
        });
        expect(adren(ticks, 7)).toBe(adren(ticks, 4));
        expect(adren(ticks, 10) - adren(ticks, 9)).toBe(4.5);
        expect(adren(ticks, 50)).toBe(265 - 5 * 4.5);
    });
    it('hits up to nine targets while charging the adrenaline cost only once', () => {
        const rotation = {...createRotationFromAbilities([ABILITIES.METEOR_STRIKE], 60), targetCounts: [9]};
        const settings = createMeleeSettings({[SETTINGS.ADRENALINE]: 100, [SETTINGS.CAP_ADRENALINE]: false});
        let finalAdrenaline = 0;
        const result = calculateRotationDamageCore(settings, rotation, 60, (_, current) => {finalAdrenaline = current[SETTINGS.ADRENALINE];});
        expect(Object.values(result.secondaryDamage ?? {})).toHaveLength(8);
        for (const damage of Object.values(result.secondaryDamage ?? {})) expect(damage).toBe(result.regularDamage);
        expect(finalAdrenaline).toBe(265);
    });
    it('refreshes its duration instead of stacking regeneration when recast', () => {
        const ticks = simulate({0: ABILITIES.METEOR_STRIKE, 20: ABILITIES.METEOR_STRIKE});
        expect(adren(ticks, 70)).toBe(100 - 120 + 70 * 4.5);
        expect(adren(ticks, 75)).toBe(adren(ticks, 70));
    });
});
