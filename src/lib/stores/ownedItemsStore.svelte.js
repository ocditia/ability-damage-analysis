import { weapons } from '$lib/data/weapons';
import { armour } from '$lib/data/armour';
import { abils } from '$lib/data/abilities';

const STORAGE_KEY = 'owned_items';

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

export const ownedItemsStore = $state({
    /** Set of item value strings that the user owns */
    items: new Set()
});

export const ownedItemsActions = {
    loadOwned() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                ownedItemsStore.items = new Set(JSON.parse(stored));
            } else {
                // First visit: seed with popular items and common abilities
                ownedItemsStore.items = buildPopularDefaults();
                this.saveOwned();
            }
        } catch (e) {
            console.error('Failed to load owned items:', e);
            ownedItemsStore.items = new Set();
        }
    },

    saveOwned() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedItemsStore.items]));
        } catch (e) {
            console.error('Failed to save owned items:', e);
        }
    },

    toggleOwned(itemKey) {
        if (ownedItemsStore.items.has(itemKey)) {
            ownedItemsStore.items.delete(itemKey);
        } else {
            ownedItemsStore.items.add(itemKey);
        }
        // Trigger reactivity by reassigning
        ownedItemsStore.items = new Set(ownedItemsStore.items);
        this.saveOwned();
    },

    isOwned(itemKey) {
        return ownedItemsStore.items.has(itemKey);
    },

    clearAll() {
        ownedItemsStore.items = new Set();
        this.saveOwned();
    }
};

// Load on module init
ownedItemsActions.loadOwned();
