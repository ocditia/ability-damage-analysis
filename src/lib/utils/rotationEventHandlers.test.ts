import { describe, it, expect, vi } from 'vitest';
import { handleDrop } from './rotationEventHandlers';
import { ABILITIES } from '$lib/data/abilities';
import { paletteAbilities } from '$lib/data/abilityPalette';

function drop(key, actions = []) {
    const rotationStore = {abilityBar: [ABILITIES.RANGED_AUTO], extraActionBar: [actions]};
    const uiActions = {clearDragDrop: vi.fn()};
    const refresh = vi.fn(), calculate = vi.fn();
    handleDrop({preventDefault() {}, dataTransfer: {getData: () => key}}, 0,
        {rotationStore, uiActions}, refresh, calculate, paletteAbilities);
    return {rotationStore, refresh, calculate};
}
describe('utility timeline drops', () => {
    it('adds the buff beside an existing attack and recalculates', () => {
        const {rotationStore, calculate} = drop(ABILITIES.VAMPYRE_SLAYER_ABILITY);
        expect(rotationStore.abilityBar[0]).toBe(ABILITIES.RANGED_AUTO);
        expect(rotationStore.extraActionBar[0][0]).toMatchObject({type: 'ability', value: ABILITIES.VAMPYRE_SLAYER_ABILITY});
        expect(calculate).toHaveBeenCalledOnce();
    });
    it('preserves existing extra actions and fills the first empty slot', () => {
        const existing = {type: 'ability', value: ABILITIES.SURGE};
        const {rotationStore} = drop(ABILITIES.UNDEAD_SLAYER_ABILITY, [existing, null]);
        expect(rotationStore.extraActionBar[0][0]).toBe(existing);
        expect(rotationStore.extraActionBar[0][1].value).toBe(ABILITIES.UNDEAD_SLAYER_ABILITY);
    });
    it('does not overwrite a full tick', () => {
        const actions = Array(12).fill({type: 'ability', value: ABILITIES.SURGE});
        const {rotationStore, calculate} = drop(ABILITIES.DRAGON_SLAYER_ABILITY, actions);
        expect(rotationStore.extraActionBar[0]).toEqual(actions);
        expect(rotationStore.abilityBar[0]).toBe(ABILITIES.RANGED_AUTO);
        expect(calculate).not.toHaveBeenCalled();
    });
});
