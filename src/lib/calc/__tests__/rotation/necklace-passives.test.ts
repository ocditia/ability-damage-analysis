import {describe, it, expect} from 'vitest';
import {hasReaperPassive, hasSoulsPassive, gainReaperStack, prepareReaperStacks} from '../../necklace';
import {calculateAccuracy} from '../../accuracy';
import {calc_split_soul_hit} from '../../rotation_builder/calculation_utils';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {SETTINGS} from '../../settings_rb';
import {ARMOUR} from '$lib/data/armour';
import {ABILITIES} from '$lib/data/abilities';
import {equipment} from '$lib/data/equipment';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';

const equipped = (item = ARMOUR.EOF) => ({[SETTINGS.NECKLACE]: item, [SETTINGS.REAPER_STACKS]: 0});
describe('necklace passives', () => {
    it('recognises recoloured and ornate EOFs without giving souls healing to Reaper necklaces', () => {
        const variants = Object.values(equipment).filter(x => x.name.startsWith('Essence of Finality amulet') && !x.name.includes('broken'));
        expect(variants.length).toBeGreaterThan(2);
        for (const item of variants) {
            expect(hasReaperPassive(equipped(item.id))).toBe(true);
            expect(hasSoulsPassive(equipped(item.id))).toBe(true);
        }
        expect(hasReaperPassive(equipped(ARMOUR.REAPER_NECKLACE))).toBe(true);
        expect(hasSoulsPassive(equipped(ARMOUR.REAPER_NECKLACE))).toBe(false);
        expect(hasReaperPassive(equipped(ARMOUR.AOS))).toBe(false);
    });
    it('applies the Souls healing bonus to Split Soul using the actual necklace setting', () => {
        expect(calc_split_soul_hit(1000, equipped(ARMOUR.REAPER_NECKLACE))).toBe(400);
        expect(calc_split_soul_hit(1000, equipped())).toBe(472);
        expect(calc_split_soul_hit(6000, equipped())).toBe(1540);
    });
    it('caps at 30, refreshes expiry, survives another eligible necklace and clears when removed', () => {
        const s: any = equipped();
        for (let i=0;i<40;i++) gainReaperStack(s, i);
        expect(s[SETTINGS.REAPER_STACKS]).toBe(30);
        s[SETTINGS.NECKLACE] = ARMOUR.REAPER_NECKLACE;
        prepareReaperStacks(s, 128);
        expect(s[SETTINGS.REAPER_STACKS]).toBe(30);
        prepareReaperStacks(s, 129);
        expect(s[SETTINGS.REAPER_STACKS]).toBe(0);
        gainReaperStack(s, 130);
        s[SETTINGS.NECKLACE] = ARMOUR.AOS;
        prepareReaperStacks(s, 131);
        expect(s[SETTINGS.REAPER_STACKS]).toBe(0);
    });
    it('adds flat Reaper accuracy to BoLG, but adds Wen accuracy only to eligible attacks', () => {
        const s = createRangedSettings({...equipped(), [SETTINGS.AUTO_ACCURACY]:true,
            [SETTINGS.BOSS_PRESET]:'Lady Karmina Ghrazi', [SETTINGS.GHRAZI_DISTANCE]:2,
            [SETTINGS.AMMO]:ARMOUR.WEN_ARROWS, [SETTINGS.ICY_PRECISION]:15});
        const base = calculateAccuracy(s, ABILITIES.BOLG_PROC).uncapped;
        s[SETTINGS.REAPER_STACKS]=30;
        expect(calculateAccuracy(s, ABILITIES.BOLG_PROC).uncapped).toBeCloseTo(base+3);
        expect(calculateAccuracy(s, ABILITIES.SHADOWFALL).uncapped).toBeCloseTo(base+33);
    });
    it('gains stacks from landed attacks in a rotation and never from a stall or self buff', () => {
        const rotation = createRotationFromAbilities([ABILITIES.GREATER_DEATHS_SWIFTNESS,null,null,null,null,null,ABILITIES.RANGED_AUTO]);
        rotation.stalledAbilities = [null,null,null,ABILITIES.RANGED_AUTO];
        const frames: any = {};
        const s = createRangedSettings({[SETTINGS.RANGED_NECKLACE]:ARMOUR.EOF, [SETTINGS.REAPER_STACKS]:0});
        calculateRotationDamageCore(s, rotation, 15, (t,v)=>frames[t]=v[SETTINGS.REAPER_STACKS] ?? 0);
        expect(frames[5]).toBe(0);
        expect(frames[10]).toBeGreaterThan(0);
    });
});
