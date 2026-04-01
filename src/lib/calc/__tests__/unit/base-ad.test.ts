/**
 * Base Ability Damage (AD) Tests
 *
 * Tests calc_base_ad which computes ability damage from:
 *   Level Damage (from combat level)
 * + 9.6 × Weapon Tier
 * + Strength Bonus (from gear)
 * = Raw AD per hand → combined MH + OH or TH + 0.5×TH
 * × Eruptive / Equilibrium buff
 *
 * Uses createBlankSettings with USE_RAW_ABILITY_DAMAGE=false
 * so calc_base_ad derives AD from level + weapon tier.
 */

import { describe, it, expect } from 'vitest';
import { calc_base_ad, style_specific_unification } from '../../damage_calc_rb';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES } from '$lib/data/abilities';
import { createBlankSettings } from '../test-helpers';

/** Helper: create settings for calc_base_ad with style unification applied */
function adSettings(
    ability: string,
    level: number,
    weaponTier: number,
    overrides: Record<string, any> = {}
) {
    const settings = createBlankSettings(level, weaponTier, overrides);
    settings['ability'] = ability;
    style_specific_unification(settings, undefined);
    return settings;
}

describe('calc_base_ad', () => {
    describe('Two-Hand weapons', () => {
        it('Lv99 Str, t75 melee 2h', () => {
            const settings = adSettings(ABILITIES.REND, 99, 75);
            expect(calc_base_ad(settings)).toBe(1477);
        });

        it('Lv101 Str, t75 melee 2h', () => {
            const settings = adSettings(ABILITIES.REND, 101, 75);
            expect(calc_base_ad(settings)).toBe(1483);
        });

        it('Lv120 Str, t100 melee 2h', () => {
            const settings = adSettings(ABILITIES.REND, 120, 100);
            expect(calc_base_ad(settings)).toBe(1906);
        });

        it('Lv115 Magic, t60 magic 2h', () => {
            const settings = adSettings(ABILITIES.IMPACT, 115, 60);
            expect(calc_base_ad(settings)).toBe(1314);
        });

        it('Lv113 Ranged, t50 ranged 2h', () => {
            const settings = adSettings(ABILITIES.RANGED_AUTO, 113, 50);
            expect(calc_base_ad(settings)).toBe(1164);
        });
    });

    describe('Dual-Wield weapons', () => {
        it('Lv106 Necro, t80 DW (same tier MH+OH)', () => {
            const settings = adSettings(ABILITIES.TOUCH_OF_DEATH, 106, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.WEAPON_TYPE_NECRO]: SETTINGS.WEAPON_VALUES.DW,
            });
            expect(calc_base_ad(settings)).toBeGreaterThan(0);
            // DW: MH full + OH half, so total should be 1.5× a single hand
        });
    });

    describe('Level scaling', () => {
        it('higher level = higher AD (same weapon)', () => {
            const low = adSettings(ABILITIES.REND, 80, 75);
            const high = adSettings(ABILITIES.REND, 120, 75);
            expect(calc_base_ad(high)).toBeGreaterThan(calc_base_ad(low));
        });

        it('level 1 still produces positive AD', () => {
            const settings = adSettings(ABILITIES.REND, 1, 75);
            expect(calc_base_ad(settings)).toBeGreaterThan(0);
        });
    });

    describe('Weapon tier scaling', () => {
        it('higher tier = higher AD (same level)', () => {
            const low = adSettings(ABILITIES.REND, 99, 50);
            const high = adSettings(ABILITIES.REND, 99, 100);
            expect(calc_base_ad(high)).toBeGreaterThan(calc_base_ad(low));
        });

        it('tier 0 still produces positive AD (from level damage)', () => {
            const settings = adSettings(ABILITIES.REND, 99, 0);
            expect(calc_base_ad(settings)).toBeGreaterThan(0);
        });
    });

    describe('Eruptive perk', () => {
        it('Eruptive 4 increases AD', () => {
            const without = adSettings(ABILITIES.REND, 99, 75);
            const with4 = adSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.ERUPTIVE]: 4,
            });
            expect(calc_base_ad(with4)).toBeGreaterThan(calc_base_ad(without));
        });

        it('Eruptive 4 adds 2% (×1.02)', () => {
            const without = adSettings(ABILITIES.REND, 99, 75);
            const with4 = adSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.ERUPTIVE]: 4,
            });
            const base = calc_base_ad(without);
            const buffed = calc_base_ad(with4);
            expect(buffed).toBe(Math.floor(base * 1.02));
        });
    });

    describe('Equilibrium perk', () => {
        it('EQ 4 increases AD', () => {
            const without = adSettings(ABILITIES.REND, 99, 75);
            const withEQ = adSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.EQ_PERK]: 4,
            });
            expect(calc_base_ad(withEQ)).toBeGreaterThan(calc_base_ad(without));
        });

        it('EQ 4 adds 14% (×1.14)', () => {
            const without = adSettings(ABILITIES.REND, 99, 75);
            const withEQ = adSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.EQ_PERK]: 4,
            });
            const base = calc_base_ad(without);
            const buffed = calc_base_ad(withEQ);
            // EQ buff = 1 + 0.1 + 0.04 = 1.14
            expect(buffed).toBe(Math.floor(base * 1.14));
        });
    });

    describe('Reaper Crew', () => {
        it('Reaper Crew adds +12 strength bonus', () => {
            const without = adSettings(ABILITIES.REND, 99, 75);
            const with_ = adSettings(ABILITIES.REND, 99, 75, {
                [SETTINGS.REAPER_CREW]: true,
            });
            expect(calc_base_ad(with_)).toBeGreaterThan(calc_base_ad(without));
        });
    });

    describe('Cross-style consistency', () => {
        it('same level and tier gives same AD regardless of style', () => {
            const melee = adSettings(ABILITIES.REND, 99, 80);
            const magic = adSettings(ABILITIES.IMPACT, 99, 80);
            const ranged = adSettings(ABILITIES.RANGED_AUTO, 99, 80);
            // All should be equal — AD formula is style-independent (level damage formula is identical)
            expect(calc_base_ad(melee)).toBe(calc_base_ad(magic));
            expect(calc_base_ad(magic)).toBe(calc_base_ad(ranged));
        });
    });
});
