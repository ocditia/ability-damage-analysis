import {it, expect} from 'vitest';
import {ABILITIES} from '$lib/data/abilities';
import {paletteAbilities} from '$lib/data/abilityPalette';
import {SETTINGS} from '../../settings_rb';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';

it('offers a flanking Snipe with the flank icon and one bonus hit', () => {
    const ability = paletteAbilities[ABILITIES.SNIPE_FLANK];
    expect(ability.icon).toBe('/rs-rot/ability_icons/current/snipe_flank.svg');
    expect(ability.mainStyle).toBe('ranged');
    const rotation = createRotationFromAbilities([ABILITIES.SNIPE_FLANK, null, null, null, null, null, ABILITIES.SNIPE]);
    const result = calculateRotationDamageCore(createRangedSettings({
        [SETTINGS.ENCHANTMENT_OF_DREAD]: false,
    }), rotation, 30);
    const bonus = result.distributionStats.filter(hit => hit.ability === ABILITIES.SNIPE_HIT_2);
    expect(bonus).toHaveLength(1);
    expect(bonus[0].tick).toBe(3);
    expect(result.distributionStats.filter(hit => hit.ability === ABILITIES.SNIPE_HIT)).toHaveLength(2);
    expect(result.tickMetadata[0].resolvedAbility).toBe(ABILITIES.SNIPE);
    expect(result.tickMetadata[6].cooldownRemaining).toBeGreaterThan(0);
});
