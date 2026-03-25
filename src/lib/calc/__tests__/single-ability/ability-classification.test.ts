/**
 * Ability Classification Tests
 *
 * One describe block per ability classification type.
 * Verifies that the rotation calculator handles each classification
 * correctly with verified in-game values.
 *
 * Classifications: auto, regular, bleed, burn, dot, channel, multihit,
 *                  conjure, perk, proc, self cast
 */

import { describe, it, expect } from 'vitest';
import { calculateSingleAbilityDamage } from '../../unified-damage-calculator';
import { SETTINGS } from '../../settings_rb.js';
import { ABILITIES } from '$lib/data/abilities';
import { createBlankSettings } from '../test-helpers';

describe('Ability Classifications', () => {
    describe('regular', () => {
        // Single-hit non-channeled abilities
        // All tests: Lv99, t80 2h, no perks/buffs

        it('Rend (melee): non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.REND });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.REND });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Impact (magic): non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MAGE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.IMPACT });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.IMPACT });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Galeshot (ranged): non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.GALESHOT });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.GALESHOT });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Touch of Death (necro): non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.WEAPON_TYPE_NECRO]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.TOUCH_OF_DEATH });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.TOUCH_OF_DEATH });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });
    });

    describe('bleed', () => {
        // Bleed abilities: multiple identical hits over time
        // All tests: Lv99, t80 2h, no perks/buffs

        it('Dismember (melee): total bleed damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.DISMEMBER });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.DISMEMBER });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value (per hit × 8)
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value (per hit × 8)
        });
    });

    describe('burn', () => {
        // Burn DoTs: damage ticks that can be walked for double damage
        // All tests: Lv99, t80 2h, no perks/buffs

        it('Combust (magic): total burn damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MAGE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.COMBUST });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.COMBUST });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });
    });

    describe('dot', () => {
        // Generic DoT abilities: multi-tick damage with decreasing hits
        // All tests: Lv99, t80 2h, no perks/buffs

        it('Corruption Shot (ranged): total dot damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.CORRUPTION_SHOT });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.CORRUPTION_SHOT });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });
    });

    describe('channel', () => {
        // Channeled abilities: multiple hits over a duration, interruptible
        // All tests: Lv99, t80 2h (DW for necro), no perks/buffs

        it('Assault (melee): total channel damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.ASSAULT });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.ASSAULT });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Rapid Fire (ranged): total channel damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RAPID_FIRE });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.RAPID_FIRE });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Asphyxiate (magic): total channel damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MAGE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.ASPHYXIATE });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.ASPHYXIATE });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });

        it('Blood Siphon (necro): non-crit min/max', () => {
            // Note: Blood Siphon is classified as 'regular' in ability data,
            // but included here as the necro representative for channel-like testing
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.WEAPON_TYPE_NECRO]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.BLOOD_SIPHON });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.BLOOD_SIPHON });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value
        });
    });

    describe('multihit', () => {
        // Multi-hit instant abilities: multiple hits landing at once
        // All tests: Lv99, t80 2h (DW for necro), no perks/buffs

        it('Hurricane (melee): total multihit damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.HURRICANE });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.HURRICANE });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value (hit1 + hit2)
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value (hit1 + hit2)
        });

        it('Wild Magic (magic): total multihit damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_MAGE]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.WILD_MAGIC });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.WILD_MAGIC });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value (2 hits)
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value (2 hits)
        });

        it('Greater Ricochet (ranged): total multihit damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.WEAPON_TYPE_RANGED]: SETTINGS.WEAPON_VALUES.TH,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.GREATER_RICOCHET });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.GREATER_RICOCHET });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value (7 hits)
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value (7 hits)
        });

        it('Volley of Souls (necro, 5 souls): total multihit damage non-crit min/max', () => {
            const settings = createBlankSettings(99, 80, {
                [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.WEAPON_TYPE_NECRO]: SETTINGS.WEAPON_VALUES.DW,
                [SETTINGS.RESIDUAL_SOULS]: 5,
                [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
            });
            const minResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.VOLLEY_OF_SOULS_DYNAMIC });

            settings[SETTINGS.MODE] = SETTINGS.MODE_VALUES.MAX_NO_CRIT;
            const maxResult = calculateSingleAbilityDamage(settings, { ability: ABILITIES.VOLLEY_OF_SOULS_DYNAMIC });

            expect(minResult.expected).toBe(0);  // TODO: replace with in-game value (5 hits)
            expect(maxResult.expected).toBe(0);  // TODO: replace with in-game value (5 hits)
        });
    });

    describe('conjure', () => {
        // Necromancy conjure summons
        it.todo('necro conjure');
    });

    describe('perk', () => {
        // Perk-triggered procs (Aftershock, etc.)
        it.todo('perk proc');
    });

    describe('proc', () => {
        // Triggered proc abilities
        it.todo('proc ability');
    });

    describe('self cast', () => {
        // Self-buff abilities that deal no damage (Sunshine, Berserk, etc.)
        it.todo('self cast produces no damage');
    });
});
