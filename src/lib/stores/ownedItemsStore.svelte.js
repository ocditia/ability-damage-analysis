import { weapons } from '$lib/data/weapons';
import { armour } from '$lib/data/armour';
import { abils } from '$lib/data/abilities';

const STORAGE_KEY = 'owned_items';
const GEAR_STORAGE_KEY = 'owned_gear';

/**
 * @typedef {Object} PerkInstance
 * @property {string} perkKey - Reference to perk definition key (e.g. 'precise')
 * @property {number} rank - Rank of this perk (1 to maxRank)
 */

/**
 * @typedef {Object} OwnedGearItem
 * @property {string} itemKey - Item key (e.g. 'bow of the last guardian [IM]')
 * @property {PerkInstance[]} perks - Perks applied to this gear instance
 * @property {string} [label] - Optional user label to distinguish copies
 */

/** Build default owned set from popular gear + common abilities */
function buildPopularDefaults() {
    const defaults = new Set();
    for (const [key, item] of Object.entries(weapons)) {
        if (item.popular) defaults.add(key);
    }
    for (const [key, item] of Object.entries(armour)) {
        if (item.popular) defaults.add(key);
    }
    for (const [key, item] of Object.entries(abils)) {
        if (item.title && item.common !== false) defaults.add(key);
    }
    return defaults;
}

/** Build default owned gear from popular weapons and armour (no perks) */
function buildPopularGearDefaults() {
    /** @type {Map<string, OwnedGearItem[]>} */
    const defaults = new Map();
    for (const [key, item] of Object.entries(weapons)) {
        if (item.popular) {
            defaults.set(key, [{ itemKey: key, perks: [] }]);
        }
    }
    for (const [key, item] of Object.entries(armour)) {
        if (item.popular) {
            defaults.set(key, [{ itemKey: key, perks: [] }]);
        }
    }
    return defaults;
}

/**
 * Serialize gear map for localStorage.
 * @param {Map<string, OwnedGearItem[]>} gearMap
 * @returns {string}
 */
function serializeGear(gearMap) {
    const obj = {};
    for (const [key, instances] of gearMap) {
        obj[key] = instances;
    }
    return JSON.stringify(obj);
}

/**
 * Deserialize gear map from localStorage.
 * @param {string} json
 * @returns {Map<string, OwnedGearItem[]>}
 */
function deserializeGear(json) {
    const obj = JSON.parse(json);
    const map = new Map();
    for (const [key, instances] of Object.entries(obj)) {
        map.set(key, instances);
    }
    return map;
}

export const ownedItemsStore = $state({
    /** @type {Set<string>} Set of item/ability keys (legacy, used for abilities) */
    items: new Set(),
    /** @type {Map<string, OwnedGearItem[]>} Gear items with perks, keyed by item name */
    ownedGear: new Map()
});

export const ownedItemsActions = {
    loadOwned() {
        try {
            // Load legacy items (abilities + gear names)
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                ownedItemsStore.items = new Set(JSON.parse(stored));
            } else {
                ownedItemsStore.items = buildPopularDefaults();
            }

            // Load gear with perks
            const storedGear = localStorage.getItem(GEAR_STORAGE_KEY);
            if (storedGear) {
                ownedItemsStore.ownedGear = deserializeGear(storedGear);
            } else {
                // First visit or migration: build from popular defaults
                ownedItemsStore.ownedGear = buildPopularGearDefaults();
            }

            this.saveOwned();
        } catch (e) {
            console.error('Failed to load owned items:', e);
            ownedItemsStore.items = new Set();
            ownedItemsStore.ownedGear = new Map();
        }
    },

    saveOwned() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedItemsStore.items]));
            localStorage.setItem(GEAR_STORAGE_KEY, serializeGear(ownedItemsStore.ownedGear));
        } catch (e) {
            console.error('Failed to save owned items:', e);
        }
    },

    /**
     * Toggle ownership of an item (legacy behavior for abilities).
     * For gear items, also adds/removes from ownedGear.
     */
    toggleOwned(itemKey) {
        if (ownedItemsStore.items.has(itemKey)) {
            ownedItemsStore.items.delete(itemKey);
            ownedItemsStore.ownedGear.delete(itemKey);
        } else {
            ownedItemsStore.items.add(itemKey);
            // If it's a weapon or armour piece, add to ownedGear with empty perks
            if (weapons[itemKey] || armour[itemKey]) {
                if (!ownedItemsStore.ownedGear.has(itemKey)) {
                    ownedItemsStore.ownedGear.set(itemKey, [{ itemKey, perks: [] }]);
                }
            }
        }
        // Trigger reactivity by reassigning
        ownedItemsStore.items = new Set(ownedItemsStore.items);
        ownedItemsStore.ownedGear = new Map(ownedItemsStore.ownedGear);
        this.saveOwned();
    },

    /**
     * Check if an item is owned (checks both legacy set and gear map).
     */
    isOwned(itemKey) {
        return ownedItemsStore.items.has(itemKey) || ownedItemsStore.ownedGear.has(itemKey);
    },

    /**
     * Get all owned instances of a gear item (for items with multiple perk setups).
     * @param {string} itemKey
     * @returns {OwnedGearItem[]}
     */
    getGearInstances(itemKey) {
        return ownedItemsStore.ownedGear.get(itemKey) || [];
    },

    /**
     * Add a new gear instance (e.g. a second copy with different perks).
     * @param {string} itemKey
     * @param {PerkInstance[]} perks
     * @param {string} [label]
     */
    addGearInstance(itemKey, perks = [], label = undefined) {
        const existing = ownedItemsStore.ownedGear.get(itemKey) || [];
        // Create new array (don't mutate in place) so downstream deriveds see a new reference
        const updated = [...existing, { itemKey, perks: [...perks], label }];
        const newMap = new Map(ownedItemsStore.ownedGear);
        newMap.set(itemKey, updated);
        // Also ensure it's in the legacy set
        ownedItemsStore.items.add(itemKey);
        ownedItemsStore.items = new Set(ownedItemsStore.items);
        ownedItemsStore.ownedGear = newMap;
        this.saveOwned();
    },

    /**
     * Update perks on a specific gear instance.
     * @param {string} itemKey
     * @param {number} instanceIndex - Which copy to update
     * @param {PerkInstance[]} perks
     * @param {string} [label]
     */
    updateGearInstance(itemKey, instanceIndex, perks, label = undefined) {
        const instances = ownedItemsStore.ownedGear.get(itemKey);
        if (!instances || !instances[instanceIndex]) return;
        // Create new instance object and new array — never mutate in place
        const updated = instances.map((inst, i) => {
            if (i !== instanceIndex) return inst;
            return {
                ...inst,
                perks: [...perks],
                ...(label !== undefined ? { label } : {})
            };
        });
        const newMap = new Map(ownedItemsStore.ownedGear);
        newMap.set(itemKey, updated);
        ownedItemsStore.ownedGear = newMap;
        this.saveOwned();
    },

    /**
     * Remove a specific gear instance.
     * @param {string} itemKey
     * @param {number} instanceIndex
     */
    removeGearInstance(itemKey, instanceIndex) {
        const instances = ownedItemsStore.ownedGear.get(itemKey);
        if (!instances) return;
        // Create new array without the removed instance — never mutate in place
        const updated = instances.filter((_, i) => i !== instanceIndex);
        const newMap = new Map(ownedItemsStore.ownedGear);
        if (updated.length === 0) {
            newMap.delete(itemKey);
            // Also remove from legacy set if it's a gear item
            if (weapons[itemKey] || armour[itemKey]) {
                ownedItemsStore.items.delete(itemKey);
                ownedItemsStore.items = new Set(ownedItemsStore.items);
            }
        } else {
            newMap.set(itemKey, updated);
        }
        ownedItemsStore.ownedGear = newMap;
        this.saveOwned();
    },

    clearAll() {
        ownedItemsStore.items = new Set();
        ownedItemsStore.ownedGear = new Map();
        this.saveOwned();
    }
};

// Load on module init
ownedItemsActions.loadOwned();
