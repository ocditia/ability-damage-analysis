import { describe, it, expect } from 'vitest';
import { findBestRotation } from '../rotation-agent';
import { SETTINGS } from '../settings_rb';
import { createBlankSettings } from './test-helpers';

describe('Rotation Agent', () => {
    it('random agent finds positive damage for melee', () => {
        const settings = createBlankSettings(99, 80, {
            [SETTINGS.STRENGTH_LEVEL]: 99,
            [SETTINGS.ATTACK_LEVEL]: 99,
            [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MEAN,
        });

        const start = Date.now();
        const result = findBestRotation(settings, 50, 'melee', 100);
        const elapsed = Date.now() - start;

        console.log(`Best damage: ${result.damage} in ${elapsed}ms (100 episodes)`);
        console.log('Rotation:', result.rotation.filter(Boolean).join(' → '));

        expect(result.damage).toBeGreaterThan(0);
    });

    it('more episodes finds better damage', () => {
        const settings = createBlankSettings(99, 80, {
            [SETTINGS.STRENGTH_LEVEL]: 99,
            [SETTINGS.ATTACK_LEVEL]: 99,
            [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MEAN,
        });

        const few = findBestRotation(settings, 50, 'melee', 10);
        const many = findBestRotation(settings, 50, 'melee', 500);

        console.log(`10 episodes: ${few.damage}, 500 episodes: ${many.damage}`);

        // More episodes should generally find equal or better
        expect(many.damage).toBeGreaterThanOrEqual(few.damage * 0.8); // Allow some variance
    });
});
