<script>
    import Button from '../UI/Button.svelte';
    import { rotationStore, rotationActions } from '$lib/stores/rotationStore.svelte.js';
    import { notificationStore, notifActions } from '$lib/stores/notificationStore.svelte.js';
    import { uiStore, uiActions } from '$lib/stores/uiStore.svelte.js';

    export let clearRotation;
    export let refreshUI;

    function handleSaveRotation() {
        notifActions.showInputPrompt(
            'Save Rotation',
            'Enter a name for your rotation:',
            'Rotation name...',
            (rotationName) => {
                const result = rotationActions.saveRotation(
                    rotationName,
                    (message) => notifActions.showNotification('Success!', message, 'success'),
                    (message) => notifActions.showNotification('Failed', message, 'warning')
                );
                
                if (result && result.needsConfirmation) {
                    notifActions.showConfirmation(
                        'Overwrite Rotation?',
                        `A rotation named "${rotationName.trim()}" already exists. Do you want to overwrite it?`,
                        () => {
                            rotationActions.overwriteRotation(
                                result.config,
                                result.existingIndex,
                                (message) => notifActions.showNotification('Success!', message, 'success'),
                                (message) => notifActions.showNotification('Failed', message, 'error')
                            );
                        }
                    );
                }
            }
        );
    }

    function handleLoadRotation(configId) {
        rotationActions.loadRotation(
            configId,
            (message) => notifActions.showNotification('Success!', message, 'success'),
            (message) => notifActions.showNotification('Failed', message, 'error'),
            refreshUI
        );
    }

    function handleDeleteRotation(configId, configName) {
        notifActions.showConfirmation(
            'Delete Rotation?',
            `Are you sure you want to delete "${configName}"? This action cannot be undone.`,
            () => {
                rotationActions.deleteRotation(
                    configId,
                    (message) => notifActions.showNotification('Success!', message, 'success'),
                    (message) => notifActions.showNotification('Failed', message, 'error')
                );
            }
        );
    }

    function handleShowMoreRotations() {
        const configOptions = rotationStore.savedRotations.slice(5).map(config => ({
            value: config.id,
            label: `${config.name} (${new Date(config.timestamp).toLocaleDateString()})`
        }));
        
        notifActions.showInputPrompt(
            'Load Rotation',
            'Select a rotation to load:',
            'Choose rotation...',
            (configId) => {
                handleLoadRotation(configId);
            }
        );
    }

    function exportToFile() {
        notifActions.showInputPrompt(
            'Export Rotation', 'Enter a name for your rotation file:', 'Rotation name...',
            (rotationName) => {
                rotationActions.exportToFile(
                    rotationName,
                    (message) => notifActions.showNotification('Success!', message, 'success'),
                    (message) => notifActions.showNotification('Failed', message, 'error')
                );
            }
        );
    }

    function importFromFile() {
        rotationActions.importFromFile(
            (message) => notifActions.showNotification('Success!', message, 'success'),
            (message) => notifActions.showNotification('Failed', message, 'error')
        );
    }

    function exportToString() {
        rotationActions.exportToString(
            (message) => notifActions.showNotification('Success!', message, 'success'),
            (message) => notifActions.showNotification('Failed', message, 'error')
        );
    }

    function importFromString() {
        notifActions.showInputPrompt(
            'Import Rotation String',
            'Paste your rotation string:',
            'Paste rotation string here...',
            (importStr) => {
                rotationActions.importFromString(
                    importStr,
                    (message) => notifActions.showNotification('Success!', message, 'success'),
                    (message) => notifActions.showNotification('Failed', message, 'error')
                );
            }
        );
    }
</script>

<div class="space-y-4 mt-4">
    <Button onClick={clearRotation} variant="reset">
        Reset
    </Button>
    
    <!-- IO Management -->
    <div>
        <div class="config-section">
            <div class="config-header" 
                onclick={() => uiActions.toggleConfigSection()}
                onkeydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        uiActions.toggleConfigSection();
                    }
                }}
                role="button"
                tabindex="0"
            >
                <h3 class="config-title">Save & Load Rotations</h3>
                <button class="config-toggle">
                    {uiStore.configSectionCollapsed ? '▼' : '▲'}
                </button>
            </div>
            
            {#if !uiStore.configSectionCollapsed}
                <div class="config-content">
                    <div class="config-buttons">
                        <Button onClick={handleSaveRotation} variant="primary">
                            💾 Save Rotation
                        </Button>
                        <Button onClick={exportToFile} variant="secondary">
                            📄 Export to File
                        </Button>
                        <Button onClick={importFromFile} variant="secondary">
                            📄 Import from File
                        </Button>
                    </div>
                    
                    <!-- Quick Access to Saved Configs -->
                    {#if rotationStore.savedRotations.length > 0}
                        <div class="saved-configs">
                            <h4>Quick Load:</h4>
                            <div class="config-list">
                                {#each rotationStore.savedRotations.slice(0, 5) as config}
                                    <div class="config-item">
                                        <Button 
                                            onClick={() => handleLoadRotation(config.id)}
                                            variant="secondary"
                                            title="Load {config.name}"
                                        >
                                            {config.name}
                                        </Button>
                                        <Button 
                                            onClick={() => handleDeleteRotation(config.id, config.name)}
                                            variant="reset" 
                                            title="Delete {config.name}"
                                        >
                                            🗑️
                                        </Button>
                                    </div>
                                {/each}
                            </div>
                            {#if rotationStore.savedRotations.length > 5}
                                <Button onClick={handleShowMoreRotations} variant="secondary">
                                    Show {rotationStore.savedRotations.length - 5} more...
                                </Button>
                            {/if}
                        </div>
                    {/if}

                    <div class="config-buttons">
                        <Button onClick={importFromString} variant="secondary">
                            Import String
                        </Button>
                        <Button onClick={exportToString} variant="secondary" title="Copy Rotation to Clipboard">
                            Export String
                        </Button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Configuration Management Styles */
    .config-section {
        margin-top: 0rem;
        margin-bottom: 1.0rem;
        padding: 0.0rem 0.0rem 0.5rem 0.0rem;
        border: 1px solid #444;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.2);
    }

    .config-title {
        margin: 0 0 1rem 0;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        font-size: 1.1rem;
        color: #fff;
        font-weight: 600;
    }

    .config-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.0rem;
        margin-bottom: 0rem;
    }

    .saved-configs {
        margin-top: 1rem;
    }

    .saved-configs h4 {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        color: #ccc;
    }

    .config-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
    }

    .config-item {
        display: flex;
        gap: 0.25rem;
        align-items: center;
    }

    .config-load-btn {
        flex: 1;
        text-align: left;
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
    }

    .config-delete-btn {
        padding: 0.25rem 0.5rem;
        min-width: auto;
    }

    .show-more-btn {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
    }
</style> 