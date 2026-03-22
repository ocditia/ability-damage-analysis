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
    describe('auto', () => {
        // Auto-attacks (melee auto, ranged auto, magic auto)
        it.todo('melee auto');
    });

    describe('regular', () => {
        // Single-hit non-channeled abilities (Rend, Dragon Breath, etc.)
        it.todo('melee regular');
    });

    describe('bleed', () => {
        // Damage-over-time bleeds (Dismember, Combust, etc.)
        it.todo('melee bleed');
    });

    describe('burn', () => {
        // Burn DoTs (Combust walk, etc.)
        it.todo('magic burn');
    });

    describe('dot', () => {
        // Generic DoT abilities
        it.todo('dot ability');
    });

    describe('channel', () => {
        // Channeled abilities with multiple hits over duration (Fury, Asphyxiate, etc.)
        it.todo('melee channel');
    });

    describe('multihit', () => {
        // Multi-hit instant abilities (Hurricane, Snap Shot, etc.)
        it.todo('melee multihit');
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
