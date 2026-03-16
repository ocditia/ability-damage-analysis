/**
 * Debug test to verify settings are working correctly
 */

import { describe, it, expect } from 'vitest';
import { SETTINGS } from '../settings_rb.js';
import { createBaseSettings, createMeleeSettings, createSingleAbilityRotation, MELEE_ABILITIES } from './test-helpers';
import { calculateRotationDamageCore } from '../rotation_builder/rotation-damage-calculator';

describe('Settings Debug', () => {
    it('should have correct SETTINGS keys', () => {
        console.log('SETTINGS.ABILITY_DAMAGE:', SETTINGS.ABILITY_DAMAGE);
        console.log('SETTINGS.HIT_CHANCE:', SETTINGS.HIT_CHANCE);

        expect(SETTINGS.ABILITY_DAMAGE).toBe('ability damage');
        expect(SETTINGS.HIT_CHANCE).toBe('hit chance');
    });

    it('should create base settings correctly', () => {
        const settings = createBaseSettings();

        console.log('Full settings object:', JSON.stringify(settings, null, 2));
        console.log('ABILITY_DAMAGE value:', settings[SETTINGS.ABILITY_DAMAGE]);
        console.log('HIT_CHANCE value:', settings[SETTINGS.HIT_CHANCE]);

        expect(settings[SETTINGS.ABILITY_DAMAGE]).toBe(1500);
        expect(settings[SETTINGS.HIT_CHANCE]).toBe(100);
    });

    it('should create melee settings with correct values', () => {
        const settings = createMeleeSettings();

        console.log('Melee settings[ability damage]:', settings['ability damage']);
        console.log('Melee settings[hit chance]:', settings['hit chance']);

        expect(settings['ability damage']).toBe(1800);
        expect(settings['hit chance']).toBe(100);
    });

    it('should preserve settings through spread', () => {
        const settings = createMeleeSettings();
        const copied = { ...settings };

        console.log('Copied settings[ability damage]:', copied['ability damage']);

        expect(copied['ability damage']).toBe(1800);
    });

    it('should pass settings correctly through calculateRotationDamageCore', () => {
        const settings = createMeleeSettings();
        const rotation = createSingleAbilityRotation(MELEE_ABILITIES.QUICK_SMASH);

        console.log('Before calling calculateRotationDamageCore:');
        console.log('  settings[ability damage]:', settings['ability damage']);
        console.log('  settings[hit chance]:', settings['hit chance']);

        const result = calculateRotationDamageCore(settings, rotation, 20);

        console.log('Result:', result);
        console.log('Regular damage:', result.regularDamage);

        // The test will show us what's happening
        expect(result).toBeDefined();
    });
});
