import {describe, it, expect} from 'vitest';
import {readFileSync} from 'node:fs';
import additional from '$lib/data/bosses/additional_targets.json';
import {bossPresets} from '$lib/data/bosses/boss_presets';
import {getEquipment} from '$lib/data/equipment';
import {calculateAccuracy} from '../../accuracy';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {WEAPONS} from '$lib/data/weapons';
import {createRangedSettings} from '../test-helpers';

const settings = (target: string) => createRangedSettings({
    [SETTINGS.BOSS_PRESET]: target, [SETTINGS.AUTO_ACCURACY]: true,
    [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH, [SETTINGS.TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
});
describe('expanded boss targets', () => {
    it('publishes every verified entry with valid stats and a source', () => {
        for (const [key, entry] of Object.entries(additional)) {
            expect(bossPresets[key], key).toEqual(entry);
            expect(entry.armour).toBeGreaterThan(0);
            expect(entry.defenceLevel).toBeGreaterThan(0);
            for (const affinity of Object.values(entry.affinities)) {
                expect(affinity).toBeGreaterThan(0); expect(affinity).toBeLessThanOrEqual(1);
            }
            expect(entry.source).toMatch(/^https:\/\/runescape.wiki\/w\//);
        }
    });
    it('uses the boss Zemouregal stats and distinguishes Vorkath modes', () => {
        expect(bossPresets['Zemouregal (Normal mode)']).toMatchObject({defenceLevel:70, armour:2765, health:250000});
        expect(bossPresets['Vorkath (Normal mode)']).toMatchObject({defenceLevel:65, armour:1299, health:750000});
        expect(bossPresets['Vorkath (Hard mode)'].health).toBe(1500000);
        expect(calculateAccuracy(settings('Vorkath (Normal mode)'), ABILITIES.RANGED_AUTO).uncapped)
            .toBeGreaterThan(calculateAccuracy(settings('Zemouregal (Normal mode)'), ABILITIES.RANGED_AUTO).uncapped);
    });
    it('uses the higher hard-mode Nakatra defence', () => {
        expect(calculateAccuracy(settings('Nakatra, Devourer Eternal (Hard mode)'), ABILITIES.RANGED_AUTO).potential)
            .toBeLessThan(calculateAccuracy(settings('Nakatra, Devourer Eternal (Normal mode)'), ABILITIES.RANGED_AUTO).potential);
    });
    it('respects Necromancy-only targets and explicit Necromancy affinity', () => {
        expect(calculateAccuracy(settings('Rasial, the First Necromancer (Normal)'), ABILITIES.RANGED_AUTO).potential).toBe(0);
        expect(calculateAccuracy(settings('Hermod, the Spirit of War (Normal)'), ABILITIES.NECRO_AUTO).potential).toBeGreaterThan(0);
        const s = settings('Osseous');
        s[SETTINGS.NECROMANCY_LEVEL] = s[SETTINGS.RANGED_LEVEL];
        expect(calculateAccuracy(s, ABILITIES.NECRO_AUTO).uncapped)
            .toBeCloseTo(calculateAccuracy(s, ABILITIES.RANGED_AUTO).uncapped * 10);
    });
    it('serves local, valid Jas arrow sprites for legacy and real items', () => {
        for (const id of [1000304,53043,53050]) {
            const icon = getEquipment(id)!.icon;
            expect(icon).toMatch(/^\/rs-rot\/armour_icons\/Jas_/);
            expect(readFileSync('static/'+icon.replace('/rs-rot/','')).subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
        }
    });
});
