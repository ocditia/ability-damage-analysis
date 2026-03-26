<script>
    import { keybindStore, keybindActions } from '$lib/stores/keybindStore.svelte.js';
    import { ownedItemsStore, ownedItemsActions } from '$lib/stores/ownedItemsStore.svelte.js';
    import { notifActions } from '$lib/stores/notificationStore.svelte.js';
    import { allExtraActions } from '$lib/special/abilities';

    export let show = false;
    export let abilityTabs = []; // [{ id, label, abilities: { key: { title, icon } } }]
    export let gearTabs = [];   // [{ id, label, gear: { [slot]: { [KEY]: { title, icon } } } }]

    let filter = '';
    let activeTab = 'all';

    // Flatten gear data from nested slot structure into entries
    function flattenGear(gearBySlot) {
        const entries = [];
        const seen = new Set();
        for (const slot of Object.values(gearBySlot)) {
            for (const item of Object.values(slot)) {
                if (!seen.has(item.title)) {
                    seen.add(item.title);
                    entries.push({ key: item.title, title: item.title, icon: item.icon });
                }
            }
        }
        return entries;
    }

    // Build sections: style tabs + gear + extras
    $: sections = [
        { id: 'all', label: 'All' },
        ...abilityTabs.map(t => ({ id: t.id, label: t.label })),
        { id: 'gear', label: 'Gear' },
        { id: 'extra', label: 'Off-GCD / Items' }
    ];

    // Get abilities for current tab
    $: visibleAbilities = getVisibleAbilities(activeTab, filter);

    function getVisibleAbilities(tab, filterText) {
        let entries = [];
        const f = filterText.toLowerCase();
        const seenGear = new Set();

        function addGearItems(gearTab, groupSuffix = '') {
            for (const item of flattenGear(gearTab.gear)) {
                if (seenGear.has(item.key)) continue;
                seenGear.add(item.key);
                entries.push({ ...item, group: gearTab.label + groupSuffix });
            }
        }

        if (tab === 'all') {
            for (const t of abilityTabs) {
                for (const [key, abil] of Object.entries(t.abilities)) {
                    if (abil.icon) entries.push({ key, ...abil, group: t.label });
                }
            }
            for (const gt of gearTabs) {
                addGearItems(gt, ' Gear');
            }
            for (const [key, abil] of Object.entries(allExtraActions)) {
                entries.push({ key, ...abil, group: 'Off-GCD / Items' });
            }
        } else if (tab === 'gear') {
            for (const gt of gearTabs) {
                addGearItems(gt);
            }
        } else if (tab === 'extra') {
            for (const [key, abil] of Object.entries(allExtraActions)) {
                entries.push({ key, ...abil, group: 'Off-GCD / Items' });
            }
        } else {
            const tabData = abilityTabs.find(t => t.id === tab);
            if (tabData) {
                for (const [key, abil] of Object.entries(tabData.abilities)) {
                    if (abil.icon) entries.push({ key, ...abil, group: tabData.label });
                }
            }
        }

        if (f) {
            entries = entries.filter(e =>
                e.title?.toLowerCase().includes(f) ||
                e.key?.toLowerCase().includes(f) ||
                (keybindStore.bindings[e.key] || '').toLowerCase().includes(f)
            );
        }

        return entries;
    }

    function handleInput(abilityKey, event) {
        keybindActions.setBinding(abilityKey, event.target.value);
    }

    function selectAllVisible() {
        for (const abil of visibleAbilities) {
            if (!ownedItemsStore.items.has(abil.key)) {
                ownedItemsStore.items.add(abil.key);
            }
        }
        ownedItemsStore.items = new Set(ownedItemsStore.items);
        ownedItemsActions.saveOwned();
    }

    function deselectAllVisible() {
        for (const abil of visibleAbilities) {
            ownedItemsStore.items.delete(abil.key);
        }
        ownedItemsStore.items = new Set(ownedItemsStore.items);
        ownedItemsActions.saveOwned();
    }

    function close() {
        show = false;
    }

    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) close();
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') close();
    }
</script>

{#if show}
    <div
        class="modal-overlay"
        onclick={handleOverlayClick}
        onkeydown={handleKeydown}
        tabindex="-1"
        role="dialog"
        aria-modal="true"
    >
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Configure Keybinds</h2>
                <button class="close-btn" onclick={close}>x</button>
            </div>

            <!-- Tab bar -->
            <div class="tab-bar">
                {#each sections as section}
                    <button
                        class="tab-btn"
                        class:active={activeTab === section.id}
                        onclick={() => activeTab = section.id}
                    >
                        {section.label}
                    </button>
                {/each}
            </div>

            <!-- Search + actions -->
            <div class="search-row">
                <input
                    type="text"
                    class="search-input"
                    placeholder="Filter abilities..."
                    bind:value={filter}
                />
                <button class="owned-action-btn select-btn" onclick={selectAllVisible} title="Mark all visible items as owned">
                    Own All
                </button>
                <button class="owned-action-btn deselect-btn" onclick={deselectAllVisible} title="Unmark all visible items as owned">
                    Unown All
                </button>
                <button class="clear-all-btn" onclick={() => notifActions.showConfirmation(
                    'Clear All Keybinds',
                    'Are you sure you want to remove all keybinds?',
                    () => { keybindActions.clearAllBindings(); notifActions.hideConfirmation(); }
                )}>
                    Clear Keybinds
                </button>
            </div>

            <!-- Ability list -->
            <div class="ability-list">
                {#each visibleAbilities as abil, idx (abil.key + '_' + idx)}
                    <div class="ability-row">
                        <img
                            src={abil.icon}
                            alt={abil.title}
                            class="ability-icon"
                            width="24"
                            height="24"
                        />
                        <span class="ability-name" title={abil.key}>{abil.title}</span>
                        <input
                            type="checkbox"
                            class="owned-checkbox"
                            checked={ownedItemsStore.items.has(abil.key)}
                            onchange={() => ownedItemsActions.toggleOwned(abil.key)}
                            title="Owned"
                        />
                        <input
                            type="text"
                            class="keybind-input"
                            placeholder="key"
                            value={keybindStore.bindings[abil.key] || ''}
                            oninput={(e) => handleInput(abil.key, e)}
                        />
                    </div>
                {/each}
                {#if visibleAbilities.length === 0}
                    <div class="empty-msg">No abilities match your filter.</div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(2px);
    }

    .modal-content {
        background: #171d21;
        border-left: 4px solid #c2ba9e;
        border-radius: 8px;
        padding: 1.25rem;
        width: 480px;
        max-width: 95vw;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.2s ease-out;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
    }

    .modal-title {
        font-family: Kumbh Sans, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #b2dbee;
        margin: 0;
    }

    .close-btn {
        background: none;
        border: none;
        color: #c2ba9e;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }
    .close-btn:hover {
        background: rgba(194, 186, 158, 0.1);
        color: #fff;
    }

    .tab-bar {
        display: flex;
        gap: 2px;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
    }

    .tab-btn {
        padding: 4px 10px;
        font-size: 0.7rem;
        font-weight: 500;
        color: #888;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #333;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
    }
    .tab-btn:hover { color: #ccc; border-color: #555; }
    .tab-btn.active {
        color: #c2ba9e;
        border-color: #c2ba9e;
        background: rgba(194, 186, 158, 0.1);
    }

    .search-row {
        display: flex;
        gap: 6px;
        margin-bottom: 0.5rem;
    }

    .search-input {
        flex: 1;
        padding: 5px 8px;
        font-size: 0.8rem;
        color: #ccc;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #444;
        border-radius: 4px;
        outline: none;
    }
    .search-input:focus { border-color: #c2ba9e; }

    .owned-action-btn {
        padding: 5px 10px;
        font-size: 0.7rem;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
    }
    .select-btn {
        color: #4ade80;
        background: rgba(74, 222, 128, 0.08);
        border: 1px solid rgba(74, 222, 128, 0.3);
    }
    .select-btn:hover { background: rgba(74, 222, 128, 0.15); }
    .deselect-btn {
        color: #f59e0b;
        background: rgba(245, 158, 11, 0.08);
        border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .deselect-btn:hover { background: rgba(245, 158, 11, 0.15); }
    .clear-all-btn {
        padding: 5px 10px;
        font-size: 0.7rem;
        color: #ff6b6b;
        background: rgba(255, 0, 0, 0.08);
        border: 1px solid rgba(255, 0, 0, 0.3);
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
    }
    .clear-all-btn:hover {
        background: rgba(255, 0, 0, 0.15);
    }

    .ability-list {
        overflow-y: auto;
        flex: 1;
        min-height: 0;
    }

    .ability-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 3px 4px;
        border-radius: 3px;
    }
    .ability-row:hover {
        background: rgba(255, 255, 255, 0.03);
    }

    .owned-checkbox {
        flex-shrink: 0;
        width: 14px;
        height: 14px;
        cursor: pointer;
        accent-color: #4ade80;
    }

    .ability-icon {
        flex-shrink: 0;
        border-radius: 3px;
    }

    .ability-name {
        flex: 1;
        font-size: 0.8rem;
        color: #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .keybind-input {
        width: 70px;
        padding: 3px 6px;
        font-size: 0.8rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #444;
        border-radius: 4px;
        text-align: center;
        outline: none;
        flex-shrink: 0;
    }
    .keybind-input:focus { border-color: #c2ba9e; }

    .empty-msg {
        padding: 1rem;
        text-align: center;
        color: #666;
        font-size: 0.85rem;
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
</style>
