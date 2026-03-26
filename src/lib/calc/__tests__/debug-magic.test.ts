import { describe, it, expect } from 'vitest';
import { calculateSingleAbilityDamage } from '../unified-damage-calculator';
import { calc_base_ad, style_specific_unification } from '../damage_calc_rb';
import { SETTINGS } from '../settings_rb.js';
import { ABILITIES } from '$lib/data/abilities';
import { createBlankSettings } from './test-helpers';

describe('debug magic', () => {
    it('magic pipeline', () => {
        const settings = createBlankSettings(115, 60, {
            [SETTINGS.MAGIC_LEVEL]: 115,
            [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.WEAPON_TYPE_MAGE]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
        });
        settings['ability'] = ABILITIES.IMPACT;

        const result = calculateSingleAbilityDamage(settings, { ability: ABILITIES.IMPACT });
        console.log('Impact pipeline result:', result.expected);
    });

    it('melee base AD for comparison', () => {
        const settings = createBlankSettings(101, 75, {
            [SETTINGS.STRENGTH_LEVEL]: 101,
            [SETTINGS.ATTACK_LEVEL]: 101,
            [SETTINGS.WEAPON]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.WEAPON_TYPE_MELEE]: SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.MODE]: SETTINGS.MODE_VALUES.MIN_NO_CRIT,
        });
        settings['ability'] = ABILITIES.REND;
        const ad = calc_base_ad(settings);
        console.log('melee base AD:', ad);
    });
});
