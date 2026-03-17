const STORAGE_KEY = 'owned_items';

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
