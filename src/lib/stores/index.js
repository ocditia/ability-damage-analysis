// Export all stores
export { rotationStore, rotationActions } from './rotationStore.js';
export { uiStore, uiActions } from './uiStore.js';
export { notificationStore, notifActions as notificationActions } from './notificationStore.js';
export { settingsStore, settingsActions } from './settingsStore.js';

// Re-export commonly used actions with shorter names
export const { 
    showNotification, 
    showConfirmation, 
    showInputPrompt,
    showSuccess,
    showError,
    showWarning,
    showInfo
} = notificationActions;

export const {
    setActiveTab,
    setActiveTool,
    toggleSettingsPanel,
    handleKeypress
} = uiActions;

export const {
    saveRotation,
    loadRotation,
    deleteRotation,
    clearRotation,
    importRotation,
    updateDamageCalculations
} = rotationActions; 