<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { getStyleColor } from '$lib/utils/colors';
    import { getItemsForSlot, getItemForValue } from '$lib/calc/rotation_builder/gear-registry';
    import { GearSlots } from '$lib/calc/rotation_builder/gear';

    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';

    let showAll = false;

    $: styleColor = getStyleColor(style);

    // Map UI style tabs to gear registry combat style
    const gearStyleMap = {
        ranged: 'ranged',
        magic: 'magic',
        melee: 'melee',
        necro: 'necromancy',
    };

    // Map UI style to icon folder
    const iconFolderMap = {
        ranged: 'ranged',
        magic: 'magic',
        melee: 'melee',
        necro: 'necro',
    };

    // Row definitions: label + which GearSlots to include
    const rowDefs = [
        { label: 'W', slots: [GearSlots.MAINHAND, GearSlots.OFFHAND] },
        { label: 'A', slots: [GearSlots.AMMO, GearSlots.POCKET] },
        { label: 'J', slots: [GearSlots.RING, GearSlots.NECKLACE, GearSlots.CAPE] },
        { label: 'E', slots: [GearSlots.HELMET, GearSlots.BODY, GearSlots.LEGS, GearSlots.GLOVES, GearSlots.BOOTS] },
    ];

    function getIconFolder(item) {
        if (item.style === 'hybrid') return 'shared';
        const map = { melee: 'melee', ranged: 'ranged', magic: 'magic', necromancy: 'necro' };
        return map[item.style] ?? iconFolderMap[style] ?? 'shared';
    }

    function resolveIcon(item) {
        const folder = getIconFolder(item);
        const base = item.value
            .replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '')
            .replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        return `/gear_icons/${folder}/${base}.png`;
    }

    function getRowItems(slots) {
        const gearStyle = gearStyleMap[style] ?? 'ranged';
        const result = [];
        for (const slot of slots) {
            const items = getItemsForSlot(slot, gearStyle);
            for (const item of items) {
                if (item.value === 'none') continue;
                if (!showAll && !item.popular) continue;
                result.push({
                    title: item.text,
                    value: item.value,
                    icon: resolveIcon(item),
                    slot: item.slot,
                    style: item.style,
                    weaponType: item.weaponType,
                });
            }
        }
        return result;
    }

    $: rows = rowDefs.map(r => ({ label: r.label, items: getRowItems(r.slots) })).filter(r => r.items.length > 0);
</script>

<div class="ability-groups">
    <div style="display: flex; justify-content: flex-end; margin-bottom: 2px;">
        <button class="filter-btn" class:active={!showAll} onclick={() => showAll = !showAll}>
            {showAll ? 'All' : 'Popular'}
        </button>
    </div>
    {#each rows as row}
        <div class="ability-group" style="border-left: 2px solid {styleColor};">
            <span class="group-label">{row.label}</span>
            <div class="grid grid-cols-7 md:grid-cols-12 lg:grid-cols-14 gap-x-0 gap-y-1 abilities">
                {#each row.items as item}
                    <div
                        role="button"
                        tabindex="0"
                        aria-label={item.title}
                        onclick={(e) => handleAbilityClick(e, item)}
                        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAbilityClick(e, item); }}
                        style="display: inline-block; overflow: hidden; width: 30px; height: 30px;"
                    >
                        {#if item.icon}
                            <img
                                src={item.icon}
                                alt={item.title}
                                draggable="true"
                                ondragstart={(e) => handleDragStart(e, item)}
                                title={item.title}
                                style="width: 30px; height: 30px; object-fit: contain; background-color: #333; border: 1px solid {styleColor};"
                            />
                        {:else}
                            <div
                                style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; background-color: #444; color: white; font-size: 10px; border: 1px solid {styleColor};"
                                draggable="true"
                                ondragstart={(e) => handleDragStart(e, item)}
                                title={item.title}
                            >
                                {item.title?.substring(0, 3) ?? '?'}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .ability-groups {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .ability-group {
        padding-left: 5px;
        display: flex;
        align-items: flex-start;
        gap: 6px;
    }
    .group-label {
        font-size: 0.6rem;
        color: rgba(255, 255, 255, 0.35);
        line-height: 30px;
        user-select: none;
        flex-shrink: 0;
        width: 8px;
        text-align: center;
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
</style>
