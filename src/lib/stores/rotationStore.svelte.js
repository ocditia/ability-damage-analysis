import { normalizeTickEvent } from '$lib/calc/rotation_builder/tickEvents';
import { createBuffTimings, createStackTimings } from '$lib/calc/rotation_builder/rotation_consts.ts';
import { settingsStore } from '$lib/stores/settingsStore.svelte.js';
import { normalizeLegacy } from '$lib/calc/rotation_builder/extra-action';
import { gearSwaps, allExtraActions } from '$lib/special/abilities';
import { migrateEquipmentSettings } from '$lib/data/equipment';

// Configuration constants
const STORAGE_KEY = 'rotation_configs';
export const DRAFT_STORAGE_KEY = 'rotation_draft_v1';
const MAX_SAVED_CONFIGS = 20;
const BAR_SIZE = 300;
const EXTRA_BAR_SIZE = 12;

// Rotation store
export const rotationStore = $state({
    // Saved rotations
    savedRotations: [],
    draftStatus: 'Your changes are saved automatically in this browser.',
    activeRotationId: null, // ID of the currently loaded rotation

    // Current rotation data
    targetCounts: Array(BAR_SIZE).fill(null),
    tickEvents: Array(BAR_SIZE).fill(null),
    secondaryDamage: {},
    secondaryHits: [],
    abilityBar: Array(BAR_SIZE).fill(null),
    extraActionBar: Array(BAR_SIZE).fill(null),
    nulledTicks: Array(BAR_SIZE).fill(false),
    stalledAbilities: Array(BAR_SIZE).fill(null),
    releasedAbilities: Array(BAR_SIZE).fill(null),

    // Buffs and stacks
    buffs: createBuffTimings(BAR_SIZE),
    stacks: createStackTimings(BAR_SIZE),

    // Cooldown tracking - array of (string[] | null) per tick
    cooldownReady: Array(BAR_SIZE).fill(null),

    // Damage calculations
    totalDamage: 0,
    poisonDamage: 0,
    familiarDamage: 0,
    dreadnipDamage: 0,
    conjureDamage: 0,
    distributionStats: [],
    poisonPerTick: [],
    familiarPerTick: [],
    familiarVariancePerTick: [],
    dreadnipPerTick: [],
    dreadnipVariancePerTick: [],
    conjurePerTick: [],
    conjureVariancePerTick: [],
    phaseTransitions: [],
    tickMetadata: {}
});

// Helper: snapshot current settings values as a plain object
function getSettingsSnapshot() {
    if (!settingsStore.initialized) return {};
    return Object.fromEntries(
        Object.entries(settingsStore.settings).map(([key, setting]) => [key, setting.value])
    );
}

// Helper: restore settings values from a snapshot
function restoreSettings(snapshot) {
    if (!snapshot || !settingsStore.initialized) return;
    migrateEquipmentSettings(snapshot);
    for (const [key, value] of Object.entries(snapshot)) {
        if (key === '_gearInstances' && !settingsStore.settings[key]) settingsStore.settings[key] = {value: {}};
        if (settingsStore.settings[key]) {
            settingsStore.settings[key].value = value;
        }
    }
}

// Rotation operations
export const rotationActions = {
    // Load saved rotations from localStorage
    loadSavedRotations() {
        if (typeof localStorage === 'undefined') {
            rotationStore.savedRotations = [];
            return;
        }
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                rotationStore.savedRotations = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load saved rotations:', e);
            rotationStore.savedRotations = [];
        }
    },

    // Save rotations to localStorage
    saveRotationsToStorage() {
        if (typeof localStorage === 'undefined') {
            return { success: true };
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(rotationStore.savedRotations));
            return { success: true };
        } catch (e) {
            console.error('Failed to save rotations to storage:', e);
            return { success: false, error: 'Failed to save rotation. Storage might be full.' };
        }
    },

    // Get current rotation data for export (includes settings)
    getCurrentRotationData() {
        return JSON.parse(JSON.stringify({
            a: rotationStore.abilityBar.map(a => a || ''),
            e: rotationStore.extraActionBar.map(row => row ? row.map(a => a || '') : []),
            n: rotationStore.nulledTicks,
            c: [...rotationStore.targetCounts],
            v: rotationStore.tickEvents.map(event => event ? {...event} : null),
            t: rotationStore.stalledAbilities.map(a => a || ''),
            r: rotationStore.releasedAbilities.map(a => a || ''),
            s: getSettingsSnapshot()
        }));
    },

    // One validated, atomic path for draft, file and named-save restoration.
    applyRotationData(data) {
        if (!data || !Array.isArray(data.a) || data.a.length > BAR_SIZE)
            throw new Error('Invalid rotation data');
        for (const key of ['e', 'n', 't', 'r', 'c', 'v']) {
            if (data[key] != null && (!Array.isArray(data[key]) || data[key].length > BAR_SIZE))
                throw new Error('Invalid rotation field');
        }
        for (const key of ['a', 't', 'r']) {
            if (data[key]?.some(value => value != null && typeof value !== 'string'))
                throw new Error('Invalid ability');
        }
        if (data.e?.some(row => row != null && (!Array.isArray(row) || row.length > EXTRA_BAR_SIZE)))
            throw new Error('Invalid extra actions');
        const pad = (key, transform) => Array.from({length: BAR_SIZE}, (_, i) => transform(data[key]?.[i]));
        const next = {
            abilityBar: pad('a', value => value || null),
            extraActionBar: pad('e', row => row ? row.map(a => a ? (normalizeLegacy(a, gearSwaps, allExtraActions) || a) : null) : null),
            nulledTicks: pad('n', value => value === true),
            stalledAbilities: pad('t', value => value || null),
            releasedAbilities: pad('r', value => value || null),
            targetCounts: pad('c', value => value ?? null),
            tickEvents: pad('v', normalizeTickEvent),
        };
        if (data.s != null && (typeof data.s !== 'object' || Array.isArray(data.s))) throw new Error('Invalid settings');
        restoreSettings(data.s);
        Object.assign(rotationStore, next);
    },

    saveDraft(style) {
        try {
            const draft = {version: 1, data: this.getCurrentRotationData(), style,
                activeRotationId: rotationStore.activeRotationId};
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
            rotationStore.draftStatus = 'Autosaved in this browser';
            return true;
        } catch {
            rotationStore.draftStatus = 'Autosave unavailable. Export a file to keep your rotation.';
            return false;
        }
    },

    restoreDraft() {
        try {
            const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
            if (!raw) return null;
            const draft = JSON.parse(raw);
            if (draft.version !== 1) throw new Error('Unsupported draft');
            this.applyRotationData(draft.data);
            rotationStore.activeRotationId = draft.activeRotationId ?? null;
            rotationStore.draftStatus = 'Previous session restored ? Autosave on';
            return draft;
        } catch {
            rotationStore.draftStatus = 'Could not restore the previous session. Saved rotations and file imports are still available.';
            return null;
        }
    },

    // Save a new rotation
    saveRotation(name, onSuccess, onError) {
        if (!name.trim()) {
            onError('Please enter a name for your rotation.');
            return;
        }

        const existingIndex = rotationStore.savedRotations.findIndex(config => config.name === name.trim());

        const newConfig = {
            id: existingIndex >= 0 ? rotationStore.savedRotations[existingIndex].id : crypto.randomUUID(),
            name: name.trim(),
            timestamp: Date.now(),
            data: this.getCurrentRotationData()
        };

        if (existingIndex >= 0) {
            // Return overwrite confirmation needed
            return { needsConfirmation: true, config: newConfig, existingIndex };
        } else {
            // Add new config
            if (rotationStore.savedRotations.length >= MAX_SAVED_CONFIGS) {
                rotationStore.savedRotations = rotationStore.savedRotations.slice(1);
            }
            rotationStore.savedRotations = [...rotationStore.savedRotations, newConfig];

            const saveResult = this.saveRotationsToStorage();
            if (saveResult.success) {
                rotationStore.activeRotationId = newConfig.id;
                onSuccess(`Rotation "${newConfig.name}" saved successfully!`);
            } else {
                onError(saveResult.error);
            }
            return { success: true };
        }
    },

    // Overwrite existing rotation
    overwriteRotation(config, existingIndex, onSuccess, onError) {
        rotationStore.savedRotations[existingIndex] = config;

        const saveResult = this.saveRotationsToStorage();
        if (saveResult.success) {
            rotationStore.activeRotationId = config.id;
            onSuccess(`Rotation "${config.name}" saved successfully!`);
        } else {
            onError(saveResult.error);
        }
    },

    // Build a config object from the current rotation state (for updating existing saves)
    buildCurrentConfig(name, existingId) {
        return {
            id: existingId || crypto.randomUUID(),
            name: name,
            timestamp: Date.now(),
            data: this.getCurrentRotationData()
        };
    },

    // Load a rotation
    async loadRotation(configId, onSuccess, onError, refreshUICallback) {
        const config = rotationStore.savedRotations.find(c => c.id === configId);
        if (!config) {
            onError('Rotation not found.');
            return;
        }

        try {
            this.applyRotationData(config.data);

            // Import and call the damage calculation function
            const { calculateTotalDamageNew } = await import('$lib/utils/rotationEventHandlers.js');
            calculateTotalDamageNew();

            // Refresh UI if callback provided (updates row gap, etc.)
            if (refreshUICallback) {
                refreshUICallback();
            }

            rotationStore.activeRotationId = configId;
            onSuccess(`Rotation "${config.name}" has been loaded!`);

        } catch (e) {
            onError('Failed to load rotation. The file might be corrupted. Sorry if update killed your rotation =(');
        }
    },

    // Delete a rotation
    deleteRotation(configId, onSuccess, onError) {
        const config = rotationStore.savedRotations.find(c => c.id === configId);
        if (!config) {
            onError('Rotation not found.');
            return;
        }

        rotationStore.savedRotations = rotationStore.savedRotations.filter(c => c.id !== configId);

        const saveResult = this.saveRotationsToStorage();
        if (saveResult.success) {
            onSuccess(`Rotation "${config.name}" has been deleted.`);
        } else {
            onError(saveResult.error);
        }
    },

    // Clear all saved configurations
    clearAllSavedConfigs(onSuccess, onError) {
        rotationStore.savedRotations = [];

        const saveResult = this.saveRotationsToStorage();
        if (saveResult.success) {
            onSuccess('All saved configurations have been deleted.');
        } else {
            onError(saveResult.error);
        }
    },

    // Clear current rotation
    clearRotation() {
        rotationStore.abilityBar = Array(BAR_SIZE).fill(null);
        rotationStore.extraActionBar = Array(BAR_SIZE).fill(null);
        rotationStore.nulledTicks = Array(BAR_SIZE).fill(false);
        rotationStore.stalledAbilities = Array(BAR_SIZE).fill(null);
        rotationStore.releasedAbilities = Array(BAR_SIZE).fill(null);
        rotationStore.targetCounts = Array(BAR_SIZE).fill(null);
        rotationStore.tickEvents = Array(BAR_SIZE).fill(null);
        rotationStore.secondaryDamage = {};
        rotationStore.secondaryHits = [];
        rotationStore.totalDamage = 0;
        rotationStore.cooldownReady = Array(BAR_SIZE).fill(null);

        // Reset stacks
        for (let i = 0; i < BAR_SIZE; i++) {
            rotationStore.stacks['icy chill stacks'].stackTicks[i] = 0;
            rotationStore.stacks['perfect equilibrium stacks'].stackTicks[i] = 0;
        }

        // Reset buffs
        for (let key in rotationStore.buffs) {
            if (Object.hasOwnProperty.call(rotationStore.buffs, key)) {
                rotationStore.buffs[key].buffTicks = Array(BAR_SIZE).fill(0);
                rotationStore.buffs[key].activeRows = [];
                rotationStore.buffs[key].idx = -1;
            }
        }
    },

    // Move the complete suffix without dropping events or overwriting the prefix.
    shiftTicks(start, offset) {
        if (!Number.isInteger(start) || start < 0 || start >= BAR_SIZE || !Number.isInteger(offset) || offset === 0) {
            return { success: false, error: 'Enter a valid starting tick and a whole number of ticks to move.' };
        }
        const fills = { tickEvents: null, targetCounts: null, abilityBar: null, extraActionBar: null, nulledTicks: false, stalledAbilities: null, releasedAbilities: null };
        const occupied = i => Object.keys(fills).some(key => {
            const value = rotationStore[key][i];
            return Array.isArray(value) ? value.some(Boolean) : value !== null && value !== undefined && value !== false && value !== '';
        });
        let last = BAR_SIZE - 1;
        while (last >= start && !occupied(last)) last--;
        if (last < start) return { success: false, error: 'There is nothing to move from this tick onward.' };
        if (start + offset < 0 || last + offset >= BAR_SIZE) {
            return { success: false, error: `The shifted rotation must fit between ticks 0 and ${BAR_SIZE - 1}.` };
        }
        for (let i = start + offset; i < start; i++) {
            if (occupied(i)) return { success: false, error: `Tick ${i} already contains an action or condition. Choose a smaller move or an earlier starting tick.` };
        }
        for (const [key, fill] of Object.entries(fills)) {
            const source = rotationStore[key];
            const shifted = Array(BAR_SIZE).fill(fill);
            for (let i = 0; i < start; i++) shifted[i] = source[i];
            for (let i = start; i <= last; i++) shifted[i + offset] = source[i];
            rotationStore[key] = shifted;
        }
        return { success: true };
    },

    insertTicks(pos, count) {
        const fills = { tickEvents: null, targetCounts: null, abilityBar: null, extraActionBar: null, nulledTicks: false, stalledAbilities: null, releasedAbilities: null };
        for (const [key, fill] of Object.entries(fills)) {
            const arr = rotationStore[key];
            rotationStore[key] = [...arr.slice(0, pos), ...Array(count).fill(fill), ...arr.slice(pos)].slice(0, BAR_SIZE);
        }
    },

    removeTicks(pos, count) {
        const fills = { tickEvents: null, targetCounts: null, abilityBar: null, extraActionBar: null, nulledTicks: false, stalledAbilities: null, releasedAbilities: null };
        for (const [key, fill] of Object.entries(fills)) {
            const arr = rotationStore[key];
            const removed = [...arr.slice(0, pos), ...arr.slice(pos + count)];
            rotationStore[key] = [...removed, ...Array(BAR_SIZE - removed.length).fill(fill)];
        }
    },

    // Import rotation from data
    async importRotation(data, onSuccess, onError, refreshUICallback) {
        try {
            // Handle both old format (just data) and new format (with metadata)
            const rotationData = data.data || data;

            this.applyRotationData(rotationData);
            rotationStore.activeRotationId = null;

            // Import and call the damage calculation function
            const { calculateTotalDamageNew } = await import('$lib/utils/rotationEventHandlers.js');
            calculateTotalDamageNew();

            // Refresh UI if callback provided (updates row gap, etc.)
            if (refreshUICallback) {
                refreshUICallback();
            }

            onSuccess('Rotation imported successfully!');
        } catch (e) {
            onError('Failed to import rotation. The file might be corrupted or in an invalid format.');
        }
    },

    // Export rotation to a JSON file download
    exportToFile(name, onSuccess, onError) {
        try {
            const exportData = {
                name: name.trim(),
                timestamp: Date.now(),
                data: this.getCurrentRotationData()
            };
            const blob = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name.trim().replace(/\s+/g, '_')}.json`;
            a.click();
            URL.revokeObjectURL(url);
            onSuccess(`Rotation "${name.trim()}" exported to file!`);
        } catch (e) {
            onError('Failed to export rotation.');
        }
    },

    // Import rotation from a JSON file
    importFromFile(onSuccess, onError, refreshUICallback) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                await this.importRotation(data, onSuccess, onError, refreshUICallback);
            } catch (err) {
                onError('Failed to read file. Make sure it is a valid rotation JSON.');
            }
        };
        input.click();
    },

    // Export rotation as a base64 string to clipboard
    async exportToString(onSuccess, onError) {
        try {
            const exportData = {
                data: this.getCurrentRotationData()
            };
            const bytes = new TextEncoder().encode(JSON.stringify(exportData));
            const str = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''));
            await navigator.clipboard.writeText(str);
            onSuccess('Rotation copied to clipboard!');
        } catch (e) {
            onError('Failed to copy rotation to clipboard.');
        }
    },

    // Import rotation from a base64 string
    async importFromString(importStr, onSuccess, onError, refreshUICallback) {
        try {
            const raw = atob(importStr.trim());
            let data;
            try { data = JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(Uint8Array.from(raw, char => char.charCodeAt(0)))); }
            catch { data = JSON.parse(raw); } // Older codes encoded Latin-1 directly.
            await this.importRotation(data, onSuccess, onError, refreshUICallback);
        } catch (e) {
            onError('Invalid rotation string. Make sure you pasted the full string.');
        }
    },

    // Update damage calculations
    updateDamageCalculations(calculateTotalDamage, calculateGaussianParameters) {
        const dmgResult = calculateTotalDamage(BAR_SIZE);
        rotationStore.totalDamage = dmgResult.regularDamage;
        rotationStore.secondaryDamage = dmgResult.secondaryDamage ?? {};
    rotationStore.secondaryHits = dmgResult.secondaryHits ?? [];
        rotationStore.poisonDamage = dmgResult.poisonDamage;
        rotationStore.familiarDamage = dmgResult.familiarDamage;
        rotationStore.dreadnipDamage = dmgResult.dreadnipDamage || 0;
        rotationStore.conjureDamage = dmgResult.conjureDamage || 0;
        rotationStore.distributionStats = dmgResult.distributionStats;
        rotationStore.poisonPerTick = dmgResult.poisonPerTick || [];
        rotationStore.familiarPerTick = dmgResult.familiarPerTick || [];
        rotationStore.familiarVariancePerTick = dmgResult.familiarVariancePerTick || [];
        rotationStore.dreadnipPerTick = dmgResult.dreadnipPerTick || [];
        rotationStore.dreadnipVariancePerTick = dmgResult.dreadnipVariancePerTick || [];
        rotationStore.conjurePerTick = dmgResult.conjurePerTick || [];
        rotationStore.conjureVariancePerTick = dmgResult.conjureVariancePerTick || [];
        rotationStore.phaseTransitions = dmgResult.phaseTransitions || [];

        // Calculate Gaussian parameters for more accurate damage modeling
        const gaussianParams = calculateGaussianParameters(rotationStore.distributionStats);
    }
};

// Initialize saved rotations on module load
rotationActions.loadSavedRotations();
