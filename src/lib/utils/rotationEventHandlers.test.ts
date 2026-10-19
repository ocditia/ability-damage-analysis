import { describe, it, expect, vi } from 'vitest';
import { handleDrop, handleAbilityClick, appendRelease, refreshUI } from './rotationEventHandlers';
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

import { ToolMode } from '$lib/calc/rotation_builder/ui_material/toolModes';
function editingStores() {
    const rotationStore = {abilityBar: Array(300).fill(null), stalledAbilities: Array(300).fill(null), releasedAbilities: Array(300).fill(null), extraActionBar: Array.from({length:300},()=>[]), stacks:{}, buffs:{}};
    const uiStore = {activeTool:ToolMode.Stall, stallingAbility:null, bar:{index:0,lastIndex:0,rowGap:0,lineGap:0},extraActions:{show:false,barIndex:0}};
    const uiActions = {setActiveTool(tool){uiStore.activeTool=tool;uiStore.stallingAbility=null;},clearDragDrop:vi.fn(),updateBarIndex(i){uiStore.bar.index=i;},updateBarLastIndex(i){uiStore.bar.lastIndex=i;},updateBarRowGap(i){uiStore.bar.rowGap=i;},updateBarLineGap(i){uiStore.bar.lineGap=i;}};
    const stores={rotationStore,uiStore,uiActions,notifActions:{showNotification:vi.fn()},settingsStore:{settings:{}}};
    const calculate=vi.fn();const refresh=()=>refreshUI(false,stores,calculate);
    return {stores,calculate,refresh};
}
describe('stall and release placement',()=>{
    it('appends a stall, exits placement mode, and pairs the release with the next cast',()=>{
        const {stores,calculate,refresh}=editingStores();
        handleAbilityClick({},'piercing shot',true,stores,calculate,refresh);
        expect(stores.rotationStore.stalledAbilities[0]).toBe('piercing shot');
        expect(stores.uiStore.activeTool).toBe(ToolMode.Regular);
        expect(stores.uiStore.stallingAbility).toBeNull();
        expect(stores.uiStore.bar.index).toBe(3);
        appendRelease(stores,calculate,refresh);
        expect(stores.rotationStore.releasedAbilities[3]).toBe('piercing shot');
        expect(stores.uiStore.bar.index).toBe(3);
        handleAbilityClick({},ABILITIES.RANGED_AUTO,true,stores,calculate,refresh);
        expect(stores.rotationStore.abilityBar[3]).toBe(ABILITIES.RANGED_AUTO);
        expect(stores.rotationStore.releasedAbilities[3]).toBe('piercing shot');
        expect(stores.uiStore.bar.index).toBeGreaterThan(3);
    });
    it('does not invent a release without a pending stall',()=>{
        const {stores,calculate,refresh}=editingStores();
        appendRelease(stores,calculate,refresh);
        expect(calculate).not.toHaveBeenCalled();
        expect(stores.notifActions.showNotification).toHaveBeenCalledOnce();
    });
    it('places a dragged stall explicitly and moves its release',()=>{
        const {stores,calculate,refresh}=editingStores();
        const drag=(data,index)=>handleDrop({preventDefault(){},dataTransfer:{getData:()=>JSON.stringify(data)}},index,stores,refresh,calculate,paletteAbilities);
        drag({kind:'stall',ability:'piercing shot'},6);
        expect(stores.rotationStore.stalledAbilities[6]).toBe('piercing shot');
        expect(stores.uiStore.bar.index).toBe(9);
        appendRelease(stores,calculate,refresh);
        drag({kind:'release',ability:'piercing shot',startIndex:9},12);
        expect(stores.rotationStore.releasedAbilities[9]).toBeNull();
        expect(stores.rotationStore.releasedAbilities[12]).toBe('piercing shot');
        expect(stores.uiStore.bar.index).toBe(12);
    });
});


it('refreshes resource visibility after recalculating zero-to-positive adrenaline',()=>{
    const {stores}=editingStores();
    stores.rotationStore.stacks.adrenaline={displaySetting:'show adrenaline',stackTicks:[0],idx:-1};
    stores.settingsStore.settings['show adrenaline']={value:true};
    refreshUI(true,stores,()=>{stores.rotationStore.stacks.adrenaline.stackTicks[0]=100;});
    expect(stores.rotationStore.stacks.adrenaline.idx).toBe(0);
});
