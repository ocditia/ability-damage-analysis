<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { getStyleColor } from '$lib/utils/colors';

    export let gearItems = {};
    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';
    export let settings;

    let showAll = false;

    $: styleColor = getStyleColor(style);

    // Define row categories: label, slot set
    const rowDefs = [
        { label: 'W', slots: new Set([
            SETTINGS.RANGED_MH, SETTINGS.MAGIC_MH, SETTINGS.MELEE_MH, SETTINGS.NECRO_MH,
            SETTINGS.RANGED_OH, SETTINGS.MAGIC_OH, SETTINGS.MELEE_OH, SETTINGS.NECRO_OH,
            SETTINGS.RANGED_TH, SETTINGS.MAGIC_TH, SETTINGS.MELEE_TH, SETTINGS.NECRO_TH,
        ])},
        { label: 'A', slots: new Set([SETTINGS.AMMO, SETTINGS.POCKET]) },
        { label: 'J', slots: new Set([SETTINGS.RING, SETTINGS.NECKLACE, SETTINGS.CAPE, 'Essence of Finality']) },
        { label: 'E', slots: new Set([
            SETTINGS.RANGED_HELMET, SETTINGS.MAGIC_HELMET, SETTINGS.MELEE_HELMET, SETTINGS.NECRO_HELMET,
            SETTINGS.RANGED_BODY, SETTINGS.MAGIC_BODY, SETTINGS.MELEE_BODY, SETTINGS.NECRO_BODY,
            SETTINGS.RANGED_LEGS, SETTINGS.MAGIC_LEGS, SETTINGS.MELEE_LEGS, SETTINGS.NECRO_LEGS,
            SETTINGS.RANGED_GLOVES, SETTINGS.MAGIC_GLOVES, SETTINGS.MELEE_GLOVES, SETTINGS.NECRO_GLOVES,
            SETTINGS.RANGED_BOOTS, SETTINGS.MAGIC_BOOTS, SETTINGS.MELEE_BOOTS, SETTINGS.NECRO_BOOTS,
        ])},
    ];

    const commonKeys = new Set([
        'BOLG', 'BOLG_IM', 'HEX_E', 'FSOA', 'FSOA_IM', 'INQ_STAFF', 'INQ_STAFF_E',
        'LENG', 'LENG_IM', 'EZK', 'EZK_IM', 'MW_SPEAR',
        'OMNI_GUARD', 'OMNI_GUARD_IM', 'DEVOURERS_GUARD', 'DEVOURERS_GUARD_IM',
        'ROAR_OF_AWAKENING', 'ROAR_OF_AWAKENING_IM', 'ODE_TO_DECEIT', 'ODE_TO_DECEIT_IM',
        'CUSTOM_SHIELD',
        'ELITE_DRACOLICH', 'ELITE_SIRENIC', 'ELITE_TECTONIC', 'TUMEKENS_RESPLENDENCE',
        'TMW', 'VESTMENTS', 'TFN',
        'CINDERS', 'DTB', 'KWW_E', 'NIGHTMARES_E',
        'EOF', 'EOF_BLACK', 'EOF_BLUE', 'EOF_GREEN', 'EOF_PINK', 'EOF_PURPLE', 'EOF_RED', 'EOF_YELLOW',
        'FUL_ARROWS', 'WEN_ARROWS', 'DEATHSPORE_ARROWS', 'JAS_ARROWS', 'BIK_ARROWS', 'HYDRIX_BOLTS',
        'EOFOR', 'AOSOR', 'AOS', 'REAPEROR', 'REAPER',
        'REAVERS', 'STALKER_E', 'CHAMPION_E', 'CHANNELER_E', 'RODI',
        'ZUK',
        'GRIM', 'FUL', 'JAS',
    ]);

    function getRowItems(slotSet) {
        const result = [];
        for (const [slot, items] of Object.entries(gearItems)) {
            if (!slotSet.has(slot)) continue;
            const entries = showAll ? Object.entries(items) : Object.entries(items).filter(([key]) => commonKeys.has(key));
            for (const [key, item] of entries) {
                result.push(item);
            }
        }
        return result;
    }

    $: rows = rowDefs.map(r => ({ label: r.label, items: getRowItems(r.slots) })).filter(r => r.items.length > 0);
</script>

<div class="ability-groups">
    <div style="display: flex; justify-content: flex-end; margin-bottom: 2px;">
        <button class="filter-btn" class:active={!showAll} onclick={() => showAll = !showAll}>
            {showAll ? 'All' : 'Common'}
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
                                onerror={(e) => { if (item.iconFallback && !e.target.dataset.tried) { e.target.dataset.tried = '1'; e.target.src = item.iconFallback; } }}
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
