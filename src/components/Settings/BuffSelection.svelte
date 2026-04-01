<script>
    import { buffs } from '$lib/calc/rotation_builder/rotation_consts';
    import { createBuffTimings } from '$lib/calc/rotation_builder/rotation_consts';
    import { SettingsCombatStyles } from '$lib/calc/rotation_builder/types/SettingsCombatStyles';

    let { settings, updateDamages, styleFilter = undefined } = $props();

    const buffInfo = createBuffTimings(1);
    const allBuffs = buffs.filter(key => buffInfo[key]?.title);

    // Map style tab names to SettingsCombatStyles
    const styleMap = {
        'melee': SettingsCombatStyles.MELEE,
        'ranged': SettingsCombatStyles.RANGED,
        'magic': SettingsCombatStyles.MAGIC,
        'necro': SettingsCombatStyles.NECROMANCY,
    };

    let filteredBuffs = $derived(
        styleFilter
            ? allBuffs.filter(key => {
                const cs = buffInfo[key]?.combatStyle;
                return cs === SettingsCombatStyles.ALL || cs === styleMap[styleFilter];
            })
            : allBuffs
    );

    function onToggle(key) {
        if (!settings[key]) return;
        settings[key].value = !settings[key].value;
        updateDamages();
    }
</script>

<h5 class="uppercase font-bold text-lg text-center mb-4">Buffs</h5>
<div class="buff-grid">
    {#each filteredBuffs as key}
        {@const info = buffInfo[key]}
        {@const isActive = settings[key]?.value === true}
        <button
            type="button"
            class="buff-tag"
            class:active={isActive}
            style={isActive ? `color: ${info.colour}; border-color: ${info.colour}` : ''}
            onclick={() => onToggle(key)}
        >
            {#if info.icon}
                <img src={info.icon} alt="" class="buff-icon" />
            {/if}
            {info.title}
        </button>
    {/each}
</div>

<style>
    .buff-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        max-height: 400px;
        overflow-y: auto;
        padding-right: 2px;
    }

    .buff-tag {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid transparent;
        font-size: 0.75rem;
        color: #555;
        background: none;
        cursor: pointer;
        transition: all 0.12s ease;
    }

    .buff-icon {
        width: 16px;
        height: 16px;
        opacity: 0.5;
        transition: opacity 0.12s ease;
    }

    .buff-tag.active .buff-icon {
        opacity: 1;
    }

    .buff-tag:hover {
        color: #aaa;
        border-color: #444;
    }

    .buff-tag.active {
        font-weight: 500;
        border-color: currentColor;
        background: rgba(255, 255, 255, 0.04);
    }
</style>
