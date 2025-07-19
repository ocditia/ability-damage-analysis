import { createBuffTimings, createStackTimings } from '$lib/calc/rotation_builder/rotation_consts.ts';

// Configuration constants
const STORAGE_KEY = 'rotation_configs';
const MAX_SAVED_CONFIGS = 20;
const BAR_SIZE = 200;
const EXTRA_BAR_SIZE = 12;

// Rotation store
export const rotationStore = $state({
    // Saved rotations
    savedRotations: [],
    
    // Current rotation data
    abilityBar: Array(BAR_SIZE).fill(null),
    extraActionBar: Array(BAR_SIZE).fill(null),
    nulledTicks: Array(BAR_SIZE).fill(false),
    stalledAbilities: Array(BAR_SIZE).fill(null),
    
    // Buffs and stacks
    buffs: createBuffTimings(BAR_SIZE),
    stacks: createStackTimings(BAR_SIZE),
    
    // Damage calculations
    totalDamage: 0,
    poisonDamage: 0,
    familiarDamage: 0,
    distributionStats: []
});

// Rotation operations
export const rotationActions = {
    // Load saved rotations from localStorage
    loadSavedRotations() {
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
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(rotationStore.savedRotations));
            return { success: true };
        } catch (e) {
            console.error('Failed to save rotations to storage:', e);
            return { success: false, error: 'Failed to save rotation. Storage might be full.' };
        }
    },

    // Get current rotation data for export
    getCurrentRotationData() {
        return {
            a: rotationStore.abilityBar.map(a => a || ''),
            e: rotationStore.extraActionBar.map(row => row ? row.map(a => a || '') : []),
            n: rotationStore.nulledTicks,
            t: rotationStore.stalledAbilities.map(a => a || '')
        };
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
            onSuccess(`Rotation "${config.name}" saved successfully!`);
        } else {
            onError(saveResult.error);
        }
    },

    // Load a rotation
    loadRotation(configId, onSuccess, onError) {
        const config = rotationStore.savedRotations.find(c => c.id === configId);
        if (!config) {
            onError('Rotation not found.');
            return;
        }

        try {
            rotationStore.abilityBar = config.data.a.map(a => a || null);
            rotationStore.extraActionBar = config.data.e.map(row => row.map(a => a || null));
            rotationStore.nulledTicks = config.data.n;
            rotationStore.stalledAbilities = config.data.t.map(a => a || null);
            
            onSuccess(`Rotation "${config.name}" has been loaded!`);
        } catch (e) {
            onError('Failed to load rotation. The file might be corrupted.');
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
        rotationStore.totalDamage = 0;
        
        // Reset stacks
        for (let i = 0; i < BAR_SIZE; i++) {
            rotationStore.stacks['icy chill stacks'].stackTicks[i] = 0;
            rotationStore.stacks['perfect equilibrium stacks'].stackTicks[i] = 0;
        }

        // Reset buffs
        for (let key in rotationStore.buffs) {
            if (Object.hasOwnProperty.call(rotationStore.buffs, key)) {
                rotationStore.buffs[key].buffTicks = Array(BAR_SIZE).fill(0);
            }
        }
    },

    // Import rotation from data
    importRotation(data, onSuccess, onError) {
        try {
            // Handle both old format (just data) and new format (with metadata)
            const rotationData = data.data || data;
            
            rotationStore.abilityBar = rotationData.a.map(a => a || null);
            rotationStore.extraActionBar = rotationData.e.map(row => row.map(a => a || null));
            rotationStore.nulledTicks = rotationData.n;
            rotationStore.stalledAbilities = rotationData.t.map(a => a || null);
            
            onSuccess('Rotation imported successfully!');
        } catch (e) {
            onError('Failed to import rotation. The file might be corrupted or in an invalid format.');
        }
    },

    // Update damage calculations
    updateDamageCalculations(calculateTotalDamage, calculateGaussianParameters) {
        const dmgResult = calculateTotalDamage(rotationStore, BAR_SIZE);
        rotationStore.totalDamage = dmgResult[0];
        rotationStore.poisonDamage = dmgResult[1];
        rotationStore.familiarDamage = dmgResult[2];
        rotationStore.distributionStats = dmgResult[3];
        
        // Calculate Gaussian parameters for more accurate damage modeling
        const gaussianParams = calculateGaussianParameters(rotationStore.distributionStats);
        console.log(
            'Total Damage = ' + rotationStore.totalDamage + 
            ' (Poison Damage = ' + rotationStore.poisonDamage + '; ' + 
            'Familiar Damage = ' + rotationStore.familiarDamage + ')' +
            ' | Gaussian Model: Mean = ' + Math.round(gaussianParams.mean) + 
            ', StdDev = ' + Math.round(gaussianParams.stdDev)
        );
    }
};

// Initialize saved rotations on module load
rotationActions.loadSavedRotations(); 