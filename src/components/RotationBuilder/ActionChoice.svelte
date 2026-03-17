<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { getStyleColor } from '$lib/utils/colors';
    import { getItemsForSlot } from '$lib/calc/rotation_builder/gear-registry';
    import { GearSlots } from '$lib/calc/rotation_builder/gear';
    import { offGcdAbilities, prayers, spells, consumables } from '$lib/special/abilities';

    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';

    $: styleColor = getStyleColor(style);

    const gearStyleMap = {
        ranged: 'ranged', magic: 'magic', melee: 'melee', necro: 'necromancy',
    };
    const iconFolderMap = {
        ranged: 'ranged', magic: 'magic', melee: 'melee', necro: 'necro',
    };

    // Gear row definitions
    const gearRows = [
        { label: 'W', slots: [GearSlots.MAINHAND, GearSlots.OFFHAND] },
        { label: 'A', slots: [GearSlots.AMMO, GearSlots.POCKET] },
        { label: 'J', slots: [GearSlots.RING, GearSlots.NECKLACE, GearSlots.CAPE] },
        { label: 'E', slots: [GearSlots.HELMET, GearSlots.BODY, GearSlots.LEGS, GearSlots.GLOVES, GearSlots.BOOTS] },
    ];

    let showAllGear = false;

    function getIconFolder(item) {
        if (item.style === 'hybrid') return 'shared';
        const map = { melee: 'melee', ranged: 'ranged', magic: 'magic', necromancy: 'necro' };
        return map[item.style] ?? iconFolderMap[style] ?? 'shared';
    }

    function resolveIcon(item) {
        const folder = getIconFolder(item);
        // Try full name first — variants like (or) and (e) often have their own icons
        return `/gear_icons/${folder}/${item.value}.png`;
    }

    function resolveIconFallback(item) {
        const folder = getIconFolder(item);
        const base = item.value
            .replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '')
            .replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        return `/gear_icons/${folder}/${base}.png`;
    }

    function getGearRowItems(slots) {
        const gearStyle = gearStyleMap[style] ?? 'ranged';
        const result = [];
        for (const slot of slots) {
            const items = getItemsForSlot(slot, gearStyle);
            for (const item of items) {
                if (item.value === 'none') continue;
                if (!showAllGear && !item.popular) continue;
                result.push({
                    title: item.text,
                    value: item.value,
                    icon: resolveIcon(item),
                    iconFallback: resolveIconFallback(item),
                    slot: item.slot,
                    style: item.style,
                    weaponType: item.weaponType,
                    isGear: true,
                });
            }
        }
        return result;
    }

    // Convert ability/prayer/spell/consumable records to a flat item array
    function recordToItems(record) {
        return Object.entries(record).map(([key, val]) => ({
            key,
            title: val.title || key,
            icon: val.icon || '',
        }));
    }

    // Force reactivity on showAllGear and style by referencing them
    $: _gearDeps = [showAllGear, style];
    $: gearRowData = _gearDeps && gearRows.map(r => ({ label: r.label, items: getGearRowItems(r.slots) })).filter(r => r.items.length > 0);
    $: abilityItems = recordToItems(offGcdAbilities);
    $: prayerItems = recordToItems(prayers);
    $: spellItems = recordToItems(spells);
    $: consumableItems = recordToItems(consumables);
</script>

<div class="action-choice">
    <!-- Gear section -->
    <div class="section-header">
        <span class="section-title">Gear</span>
        <button class="filter-btn" class:active={!showAllGear} onclick={() => { showAllGear = !showAllGear; }}>
            {showAllGear ? 'All' : 'Popular'}
        </button>
    </div>
    {#each gearRowData as row}
        <div class="item-row" style="border-left: 2px solid {styleColor};">
            <span class="row-label">{row.label}</span>
            <div class="item-grid">
                {#each row.items as item}
                    <button class="item-btn" title={item.title}
                        onclick={(e) => handleAbilityClick(e, item)}
                        style="border-color: {styleColor};"
                    >
                        <img src={item.icon} alt={item.title} draggable="true"
                            ondragstart={(e) => handleDragStart(e, item)}
                            onerror={(e) => { if (!e.target.dataset.tried && item.iconFallback) { e.target.dataset.tried = '1'; e.target.src = item.iconFallback; } }} />
                    </button>
                {/each}
            </div>
        </div>
    {/each}

    <!-- Abilities -->
    {#if abilityItems.length > 0}
        <div class="section-header"><span class="section-title">Abilities</span></div>
        <div class="item-row" style="border-left: 2px solid #8888ff;">
            <span class="row-label">A</span>
            <div class="item-grid">
                {#each abilityItems as item}
                    <button class="item-btn" title={item.title}
                        onclick={(e) => handleAbilityClick(e, item.key)}
                        style="border-color: #8888ff;"
                    >
                        <img src={item.icon} alt={item.title} draggable="true"
                            ondragstart={(e) => handleDragStart(e, item.key)} />
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Prayers -->
    {#if prayerItems.length > 0}
        <div class="item-row" style="border-left: 2px solid #ffdd57;">
            <span class="row-label">P</span>
            <div class="item-grid">
                {#each prayerItems as item}
                    <button class="item-btn" title={item.title}
                        onclick={(e) => handleAbilityClick(e, item.key)}
                        style="border-color: #ffdd57;"
                    >
                        <img src={item.icon} alt={item.title} draggable="true"
                            ondragstart={(e) => handleDragStart(e, item.key)} />
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Spells -->
    {#if spellItems.length > 0}
        <div class="item-row" style="border-left: 2px solid #44ccff;">
            <span class="row-label">S</span>
            <div class="item-grid">
                {#each spellItems as item}
                    <button class="item-btn" title={item.title}
                        onclick={(e) => handleAbilityClick(e, item.key)}
                        style="border-color: #44ccff;"
                    >
                        <img src={item.icon} alt={item.title} draggable="true"
                            ondragstart={(e) => handleDragStart(e, item.key)} />
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Consumables -->
    {#if consumableItems.length > 0}
        <div class="item-row" style="border-left: 2px solid #ff8844;">
            <span class="row-label">C</span>
            <div class="item-grid">
                {#each consumableItems as item}
                    <button class="item-btn" title={item.title}
                        onclick={(e) => handleAbilityClick(e, item.key)}
                        style="border-color: #ff8844;"
                    >
                        <img src={item.icon} alt={item.title} draggable="true"
                            ondragstart={(e) => handleDragStart(e, item.key)} />
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .action-choice {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 4px;
    }

    .section-title {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .filter-btn {
        font-size: 0.6rem;
        padding: 1px 6px;
        border: 1px solid #555;
        border-radius: 3px;
        background: rgba(255,255,255,0.05);
        color: #aaa;
        cursor: pointer;
    }
    .filter-btn.active {
        border-color: #4ade80;
        color: #4ade80;
    }

    .item-row {
        padding-left: 4px;
        display: flex;
        align-items: flex-start;
        gap: 4px;
    }

    .row-label {
        font-size: 0.55rem;
        color: rgba(255, 255, 255, 0.3);
        line-height: 24px;
        user-select: none;
        flex-shrink: 0;
        width: 8px;
        text-align: center;
    }

    .item-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1px;
    }

    .item-btn {
        width: 30px;
        height: 30px;
        padding: 0;
        border: 1px solid #555;
        background: #333;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .item-btn img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .item-btn:hover {
        border-color: #fff;
    }

</style>
