<script>
    import { SETTINGS } from '$lib/calc/settings_rb';

    let { settings, updateDamages, openDropdown = $bindable(null), onFamiliarChange = null } = $props();

    const familiarIcons = {
        [SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON]: '/familiars/Ripper_Demon_chathead.png',
        [SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON]: '/familiars/Kal\'gerion_demon_(familiar)_chathead.png',
        [SETTINGS.FAMILIAR_VALUES.STEEL_TITAN]: '/familiars/Steel_titan_chathead.png',
    };

    function handleFamiliarChange(value) {
        settings[SETTINGS.FAMILIAR].value = value;
        openDropdown = null;
        if (onFamiliarChange) onFamiliarChange();
        updateDamages();
    }
</script>

<h5 class="uppercase font-bold text-lg text-center mb-4">Familiars</h5>
<div class="flex flex-wrap gap-2 justify-center mb-3">
    <!-- Familiar selector (dropdown) -->
    <div class="relative">
        <button
            type="button"
            class="stack-toggle"
            class:stack-active={settings[SETTINGS.FAMILIAR]?.value && settings[SETTINGS.FAMILIAR]?.value !== SETTINGS.FAMILIAR_VALUES.NONE}
            title="Familiar: {settings[SETTINGS.FAMILIAR]?.options?.find(o => o.value === settings[SETTINGS.FAMILIAR]?.value)?.text ?? 'None'}"
            onclick={() => { openDropdown = openDropdown === SETTINGS.FAMILIAR ? null : SETTINGS.FAMILIAR; }}
        >
            <img src={familiarIcons[settings[SETTINGS.FAMILIAR]?.value] ?? '/effect_icons/familiar.png'} alt="Familiar" class="w-7 h-7" />
        </button>
        {#if openDropdown === SETTINGS.FAMILIAR}
            <div class="icon-dropdown" style="min-width: 140px;">
                {#each settings[SETTINGS.FAMILIAR]?.options ?? [] as option}
                    <button type="button" class="icon-dropdown-item"
                        class:active={settings[SETTINGS.FAMILIAR]?.value === option.value}
                        onclick={() => handleFamiliarChange(option.value)}
                    >{option.text}</button>
                {/each}
            </div>
        {/if}
    </div>
    <!-- Kalg spec (always visible) -->
    <button type="button" class="stack-toggle"
        class:stack-active={settings[SETTINGS.KALG_SPEC]?.value}
        title="Kal'gerion Spec"
        onclick={() => { settings[SETTINGS.KALG_SPEC].value = !settings[SETTINGS.KALG_SPEC].value; updateDamages(); }}
    >
        <img src="/effect_icons/crit_i_kal.png" alt="Kalg spec" class="w-7 h-7" />
    </button>
    <!-- Scroll-related options (ripper/steel titan only) -->
    {#if settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON || settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.STEEL_TITAN}
        <button type="button" class="stack-toggle"
            class:stack-active={settings[SETTINGS.USE_FAMILIAR_SCROLLS]?.value}
            title="Use Familiar Scrolls"
            onclick={() => { settings[SETTINGS.USE_FAMILIAR_SCROLLS].value = !settings[SETTINGS.USE_FAMILIAR_SCROLLS].value; updateDamages(); }}
        >
            <img src={settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON
                ? '/familiars/scrolls/Ripper_Demon_scroll_(Death_From_Above).png'
                : '/familiars/scrolls/Steel_Titan_scroll_(Steel_of_Legends).png'} alt="Scrolls" class="w-7 h-7" />
        </button>
        <button type="button" class="stack-toggle"
            class:stack-active={settings[SETTINGS.SPIRIT_CAPE]?.value}
            title="Spirit Cape"
            onclick={() => { settings[SETTINGS.SPIRIT_CAPE].value = !settings[SETTINGS.SPIRIT_CAPE].value; updateDamages(); }}
        >
            <img src="/effect_icons/Spirit_cape.png" alt="Spirit Cape" class="w-7 h-7" />
        </button>
        <button type="button" class="stack-toggle"
            class:stack-active={settings[SETTINGS.SUMMONING_RENEWAL]?.value}
            title="Summoning Renewal"
            onclick={() => { settings[SETTINGS.SUMMONING_RENEWAL].value = !settings[SETTINGS.SUMMONING_RENEWAL].value; updateDamages(); }}
        >
            <img src="/effect_icons/Summoning_renewal_(4).png" alt="Summoning Renewal" class="w-7 h-7" />
        </button>
        <button type="button" class="stack-toggle"
            class:stack-active={settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value && settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value !== SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE}
            title="Spirit Weed Incense: {settings[SETTINGS.SPIRIT_WEED_INCENSE]?.options?.find(o => o.value === settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value)?.text ?? 'None'} (click to cycle)"
            onclick={() => { const order = [SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL1, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL2, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL3, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL4]; const idx = order.indexOf(settings[SETTINGS.SPIRIT_WEED_INCENSE].value); settings[SETTINGS.SPIRIT_WEED_INCENSE].value = order[(idx + 1) % order.length]; updateDamages(); }}
        >
            <img src="/effect_icons/Spirit_weed_incense_sticks.png" alt="Spirit Weed Incense" class="w-7 h-7" />
            {#if settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value && settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value !== SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE}
                <span class="stack-count">{[SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL1, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL2, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL3, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL4].indexOf(settings[SETTINGS.SPIRIT_WEED_INCENSE].value) + 1}</span>
            {/if}
        </button>
        <button type="button" class="stack-toggle"
            class:stack-active={settings[SETTINGS.PRISM_OF_RESTORATION]?.value}
            title="Prism of Restoration"
            onclick={() => { settings[SETTINGS.PRISM_OF_RESTORATION].value = !settings[SETTINGS.PRISM_OF_RESTORATION].value; updateDamages(); }}
        >
            <img src="/effect_icons/Prism_of_Restoration_icon.png" alt="Prism of Restoration" class="w-7 h-7" />
        </button>
    {/if}
</div>

<style>
    .stack-toggle {
        position: relative;
        padding: 4px;
        border: 2px solid transparent;
        border-radius: 6px;
        opacity: 0.4;
        cursor: pointer;
        transition: all 0.15s ease;
        background: none;
    }
    .stack-toggle:hover { opacity: 0.7; }
    .stack-active { opacity: 1; border-color: #4ade80; }
    .stack-count {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 0.6rem;
        font-weight: bold;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 3px;
        line-height: 1.2;
    }
    .icon-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 20;
        background: #1e293b;
        border: 1px solid #4ade80;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        margin-top: 2px;
    }
    .icon-dropdown-item {
        display: block;
        width: 100%;
        padding: 4px 8px;
        text-align: left;
        font-size: 0.75rem;
        color: #ccc;
        background: none;
        border: none;
        cursor: pointer;
    }
    .icon-dropdown-item:hover { background: rgba(255, 255, 255, 0.1); }
    .icon-dropdown-item.active { color: #4ade80; font-weight: bold; }
</style>
