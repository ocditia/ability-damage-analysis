import { settingsConfig } from '$lib/calc/settings';

// Settings store
export const settingsStore = $state({
    settings: Object.fromEntries(
        Object.entries(settingsConfig).map(([key, value]) => [
            key,
            { ...value, key: key, value: value.default }
        ])
    )
});

// Settings actions
export const settingsActions = {
    // Update a setting value
    updateSetting(key, value) {
        if (settingsStore.settings[key]) {
            settingsStore.settings[key].value = value;
        }
    },

    // Get a setting value
    getSetting(key) {
        return settingsStore.settings[key]?.value;
    },

    // Get all settings
    getAllSettings() {
        return settingsStore.settings;
    },

    // Reset all settings to defaults
    resetToDefaults() {
        settingsStore.settings = Object.fromEntries(
            Object.entries(settingsConfig).map(([key, value]) => [
                key,
                { ...value, key: key, value: value.default }
            ])
        );
    },

    // Export settings
    exportSettings() {
        return JSON.stringify(settingsStore.settings, null, 2);
    },

    // Import settings
    importSettings(settingsData) {
        try {
            const parsed = JSON.parse(settingsData);
            settingsStore.settings = parsed;
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Invalid settings format' };
        }
    }
}; 