import { rotationStore } from '$lib/stores/rotationStore.svelte.js';
import { settingsStore } from '$lib/stores/settingsStore.svelte.js';
import { ownedItemsStore } from '$lib/stores/ownedItemsStore.svelte.js';
import { uiStore } from '$lib/stores/uiStore.svelte.js';
import { abils } from '$lib/data/abilities';
import { calculateTotalDamage, suggestNextAbility } from './rotation-damage-calculator';

const inputKeys = ['abilityBar', 'extraActionBar', 'nulledTicks', 'stalledAbilities',
    'releasedAbilities', 'targetCounts', 'tickEvents'];

export function snapshotEditorCalculation() {
    // Detach Svelte proxies before crossing the worker boundary.
    return JSON.parse(JSON.stringify({
        rotation: Object.fromEntries(inputKeys.map(key => [key, rotationStore[key]])),
        settings: Object.fromEntries(Object.entries(settingsStore.settings).map(([key, entry]: any) => [key, entry.value])),
        ownedGear: [...ownedItemsStore.ownedGear],
        style: uiStore.activeTab, captureTick: uiStore.bar.index,
        showSuggestions: uiStore.showSuggestions.value
    }));
}

/** Runs against isolated worker stores, never the live editor's stores. */
export function runEditorCalculation(input: ReturnType<typeof snapshotEditorCalculation>) {
    for (const key of inputKeys) rotationStore[key] = input.rotation[key];
    for (const [key, value] of Object.entries(input.settings)) settingsStore.settings[key] = {value};
    ownedItemsStore.ownedGear = new Map(input.ownedGear);
    uiStore.activeTab = input.style;
    uiStore.bar.index = input.captureTick;
    uiStore.showSuggestions.value = input.showSuggestions;
    const result = calculateTotalDamage(300);
    const styleMap = { ranged: 'ranged', magic: 'magic', melee: 'melee', necro: 'necromancy' };
    const candidates = input.showSuggestions ? Object.entries(abils)
        .filter(([, a]) => a.title && !a.parent && a.mainStyle === styleMap[input.style])
        .map(([key]) => key) : [];
    const suggestions = input.showSuggestions && result._finalState && result._finalSettings
        ? suggestNextAbility(result._finalState, result._finalSettings, candidates) : [];
    // These large internal snapshots are only used for suggestions inside the worker.
    delete result._finalState;
    delete result._finalSettings;
    return JSON.parse(JSON.stringify({result, suggestions,
        buffs: Object.fromEntries(Object.entries(rotationStore.buffs).map(([key, buff]: any) =>
            [key, {buffTicks: buff.buffTicks, activeRows: buff.activeRows, idx: buff.idx}])),
        stacks: Object.fromEntries(Object.entries(rotationStore.stacks).map(([key, stack]: any) =>
            [key, stack.stackTicks])), cooldownReady: rotationStore.cooldownReady}));
}
