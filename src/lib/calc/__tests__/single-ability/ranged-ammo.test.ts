/**
 * Ranged Ammo Tests — verified in-game values
 *
 * Tests arrow effects across different weapons and abilities.
 */

import { describe, it, expect } from 'vitest';
import { ARMOUR } from '$lib/data/armour';
import { WEAPONS } from '$lib/data/weapons';
import { calculateSingleAbilityDamage } from '../../unified-damage-calculator';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES } from '$lib/data/abilities';
import { createBlankSettings } from '../test-helpers';

function rangedAmmoSettings(ammo: string, mode: string, overrides: Record<string, any> = {}) {
    return createBlankSettings(113, 50, {
        [SETTINGS.RANGED_LEVEL]: 113,
        [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
        [SETTINGS.RANGED_AMMO_SLOT]: ammo,
        [SETTINGS.MODE]: mode,
        ...overrides,
    });
}

// ─── Custom t50 2h, no perks ────────────────────────────────

describe('Ranged Ammo: Custom t50 2h, no perks', () => {
    describe('Ful Arrows', () => {
        it('Ranged Auto: min non-crit = 1204', () => {
            const settings = rangedAmmoSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RANGED_AUTO });
            expect(result.expected).toBe(1204);
        });

        it('Shadow Tendrils: min crit = 4015', () => {
            const settings = rangedAmmoSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SHADOW_TENDRILS });
            expect(result.expected).toBe(4015);
        });
    });

    describe('Wen Arrows', () => {
        it('Ranged Auto: min non-crit = 1047', () => {
            const settings = rangedAmmoSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RANGED_AUTO });
            expect(result.expected).toBe(1047);
        });

        it('Shadow Tendrils: min crit = 4539 (icy precision active)', () => {
            const settings = rangedAmmoSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_CRIT);
            settings[SETTINGS.ICY_PRECISION] = 1;
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SHADOW_TENDRILS });
            expect(result.expected).toBe(4539);
        });
    });
});

// ─── BoLG IM, Precise 6 Eruptive 2 ─────────────────────────

function bolgSettings(ammo: string, mode: string) {
    return rangedAmmoSettings(ammo, mode, {
        [SETTINGS.RANGED_MH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN_IM,
        [SETTINGS.PRECISE]: 6,
        [SETTINGS.ERUPTIVE]: 2,
        [SETTINGS.ICY_PRECISION]: 1,
    });
}

describe('Ranged Ammo: BoLG IM, P6E2', () => {
    describe('Ful Arrows', () => {
        it('Ranged Auto: min non-crit = 2183', () => {
            const settings = bolgSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RANGED_AUTO });
            expect(result.expected).toBe(2183);
        });

        it('Shadow Tendrils: min crit = 7269', () => {
            const settings = bolgSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SHADOW_TENDRILS });
            expect(result.expected).toBe(7269);
        });

        it('Balance by Force: min non-crit = 5575', () => {
            const settings = bolgSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.BALANCE_BY_FORCE });
            expect(result.expected).toBe(5575);
        });

        it('Snipe: min non-crit = 7269', () => {
            const settings = bolgSettings(ARMOUR.FUL_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SNIPE });
            expect(result.expected).toBe(7269);
        });
    });

    describe('Wen Arrows', () => {
        it('Ranged Auto: min non-crit = 1899', () => {
            const settings = bolgSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RANGED_AUTO });
            expect(result.expected).toBe(1899);
        });

        it('Shadow Tendrils: min crit = 8215', () => {
            const settings = bolgSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SHADOW_TENDRILS });
            expect(result.expected).toBe(8215);
        });

        it('Balance by Force: min non-crit = 6302', () => {
            const settings = bolgSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.BALANCE_BY_FORCE });
            expect(result.expected).toBe(6302);
        });

        it('Snipe: min non-crit = 8216', () => {
            const settings = bolgSettings(ARMOUR.WEN_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SNIPE });
            expect(result.expected).toBe(8216);
        });
    });

    describe('Jas Arrows', () => {
        it('Ranged Auto: min non-crit = 2468', () => {
            const settings = bolgSettings(ARMOUR.JAS_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RANGED_AUTO });
            expect(result.expected).toBe(2468);
        });

        it('Shadow Tendrils: min crit = 8217', () => {
            const settings = bolgSettings(ARMOUR.JAS_ARROWS, SETTINGS.MODE_VALUES.MIN_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SHADOW_TENDRILS });
            expect(result.expected).toBe(8217);
        });

        it('Balance by Force: min non-crit = 6302', () => {
            const settings = bolgSettings(ARMOUR.JAS_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.BALANCE_BY_FORCE });
            expect(result.expected).toBe(6302);
        });

        it('Snipe: min non-crit = 8218', () => {
            const settings = bolgSettings(ARMOUR.JAS_ARROWS, SETTINGS.MODE_VALUES.MIN_NO_CRIT);
            const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.SNIPE });
            expect(result.expected).toBe(8218);
        });
    });
});
