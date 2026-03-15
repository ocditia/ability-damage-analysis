import { settingsConfig } from '$lib/calc/settings_rb';
import { SETTINGS } from '$lib/calc/settings_rb';

// Settings store
export const settingsStore = $state({
    initialized: false,
    settings: {}
});

// Initialize settings
export async function initializeSettings() {
    if (settingsStore.initialized) return;

    let storedSettings = {};
    if (typeof localStorage !== 'undefined') {
        storedSettings = JSON.parse(localStorage.getItem('rotation_settings')) || {};
    }

    
    settingsStore.settings = 
        Object.fromEntries(
            Object.entries(settingsConfig).map(([key, value]) => [
                key,
                {
                    ...value,
                    key,
                    value: value.default?.rotation ?? value.default//storedSettings[key]?.value ?? value.default?.rotation ?? value.default
                }
            ])
        );
    settingsStore.settings[SETTINGS.INSTABILITY].value = false;
    settingsStore.settings[SETTINGS.BALANCE_BY_FORCE].value = false;
    settingsStore.settings[SETTINGS.DRACOLICH_INFUSION].value = false;
    settingsStore.settings[SETTINGS.GREATER_DRACOLICH_INFUSION].value = false;
    settingsStore.settings[SETTINGS.ICY_PRECISION].value = 0;
    settingsStore.settings[SETTINGS.NATURAL_INSTINCT].value = false;

    settingsStore.initialized = true;
}

await initializeSettings();
// Settings actions
export const settingsActions = {
    // Update a setting value
    updateSetting(key, value) {
        if (!settingsStore.initialized) return;
        if (settingsStore.settings[key]) {
            settingsStore.settings[key].value = value;
        }
    },

    // Get a setting value
    getSetting(key) {
        if (!settingsStore.initialized) return null;
        return settingsStore.settings[key]?.value;
    },

    // Get all settings
    getAllSettings() {
        if (!settingsStore.initialized) return {};
        return settingsStore.settings;
    },

    // Reset all settings to defaults
    resetToDefaults() {
        if (!settingsStore.initialized) return;
        settingsStore.settings = Object.fromEntries(
            Object.entries(settingsConfig).map(([key, value]) => [
                key,
                { ...value, key: key, value: value.default }
            ])
        );
    }
}; 