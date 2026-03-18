<script>
    import { SETTINGS } from '$lib/calc/settings_rb';

    let { settings, updateDamages } = $props();

    let editingStack = $state(null);
    function focusOnMount(node) { node.focus(); node.select(); }

    const perks = [
        { key: SETTINGS.PRECISE, img: '/effect_icons/perks/Precise.webp', title: 'Precise', step: 1, max: 6 },
        { key: SETTINGS.ERUPTIVE, img: '/effect_icons/perks/Eruptive.webp', title: 'Eruptive', step: 1, max: 4 },
        { key: SETTINGS.EQ_PERK, img: '/effect_icons/perks/Equilibrium.png', title: 'Equilibrium', step: 1, max: 4 },
        { key: SETTINGS.CAROMING, img: '/effect_icons/perks/caroming.png', title: 'Caroming', step: 1, max: 4 },
        { key: SETTINGS.BITING, img: '/effect_icons/perks/Biting.webp', title: 'Biting', step: 1, max: 4 },
        { key: SETTINGS.AFTERSHOCK, img: '/effect_icons/perks/Aftershock.png', title: 'Aftershock', step: 1, max: 4 },
        { key: SETTINGS.GENOCIDAL, img: '/effect_icons/perks/genocidal.png', title: 'Genocidal %', step: 0.1, max: 4.9 },
        { key: SETTINGS.FLANKING, img: '/effect_icons/perks/Flanking.webp', title: 'Flanking', step: 1, max: 4 },
        { key: SETTINGS.ULTIMATUMS, img: '/effect_icons/perks/ultimatums.png', title: 'Ultimatums', step: 1, max: 4 },
        { key: SETTINGS.LVL20ARMOUR, img: '/effect_icons/perks/level-20.png', title: 'Level 20 Armour', toggle: true },
        { key: SETTINGS.IMPATIENT, img: '/effect_icons/perks/Impatient.png', title: 'Impatient', step: 1, max: 4 },
        { key: SETTINGS.SLAYER_PERK_UNDEAD, img: '/effect_icons/perks/25px-Undead_Slayer.webp', title: 'Undead Slayer', toggle: true },
        { key: SETTINGS.SLAYER_PERK_DRAGON, img: '/effect_icons/perks/dragon_slayer_perk.png', title: 'Dragon Slayer', toggle: true },
        { key: SETTINGS.SLAYER_PERK_DEMON, img: '/effect_icons/perks/demon_slayer_perk.webp', title: 'Demon Slayer', toggle: true },
    ];

    const ruthlessPerks = [
        { key: SETTINGS.RUTHLESS_RANK, img: '/effect_icons/perks/Ruthless.webp', title: 'Ruthless Rank', label: 'Rank', step: 1, max: 3 },
        { key: SETTINGS.RUTHLESS_STACKS, img: '/effect_icons/perks/Ruthless.webp', title: 'Ruthless Stacks', label: 'Stacks', step: 1, max: 5 },
    ];
</script>

<h5 class="uppercase font-bold text-lg text-center mb-4">Perks</h5>
<div class="flex flex-wrap gap-2 justify-center mb-3">
    {#each perks as perk}
        {#if settings[perk.key] != null}
        <button
            type="button"
            class="stack-toggle"
            class:stack-active={perk.toggle ? settings[perk.key]?.value : settings[perk.key]?.value > 0}
            title="{perk.title}{perk.toggle ? '' : ' (right-click to set, scroll to adjust)'}"
            onclick={() => { if (perk.toggle) { settings[perk.key].value = !settings[perk.key].value; } else { settings[perk.key].value = settings[perk.key].value > 0 ? 0 : (perk.max ?? perk.step ?? 1); } updateDamages(); }}
            oncontextmenu={(e) => { if (!perk.toggle) { e.preventDefault(); editingStack = editingStack === perk.key ? null : perk.key; } }}
            onwheel={(e) => { if (!perk.toggle) { e.preventDefault(); const curr = settings[perk.key]?.value ?? 0; const step = perk.step ?? 1; const max = perk.max ?? 999; settings[perk.key].value = Math.max(0, Math.min(max, Math.round((curr + (e.deltaY < 0 ? step : -step)) * 10) / 10)); updateDamages(); } }}
        >
            <img src={perk.img} alt={perk.title} class="w-7 h-7" />
            {#if !perk.toggle && settings[perk.key] != null}
                <span class="stack-count">{settings[perk.key].value ?? 0}</span>
            {/if}
            {#if !perk.toggle && editingStack === perk.key}
                <input
                    type="number"
                    class="stack-edit"
                    value={settings[perk.key]?.value ?? 0}
                    min="0"
                    max={perk.max ?? 999}
                    step={perk.step ?? 1}
                    oninput={(e) => { const max = perk.max ?? 999; settings[perk.key].value = Math.max(0, Math.min(max, parseFloat(e.target.value) || 0)); updateDamages(); }}
                    onblur={() => { editingStack = null; }}
                    onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                    onclick={(e) => e.stopPropagation()}
                    use:focusOnMount
                />
            {/if}
        </button>
        {/if}
    {/each}
    {#each ruthlessPerks as perk}
        {#if settings[perk.key] != null}
        <button
            type="button"
            class="stack-toggle"
            class:stack-active={settings[perk.key]?.value > 0}
            title="{perk.title} (right-click to set, scroll to adjust)"
            onclick={() => { settings[perk.key].value = settings[perk.key].value > 0 ? 0 : 1; updateDamages(); }}
            oncontextmenu={(e) => { e.preventDefault(); editingStack = editingStack === perk.key ? null : perk.key; }}
            onwheel={(e) => { e.preventDefault(); const curr = settings[perk.key]?.value ?? 0; settings[perk.key].value = Math.max(0, Math.min(perk.max, curr + (e.deltaY < 0 ? 1 : -1))); updateDamages(); }}
        >
            <span class="stack-label">{perk.label}</span>
            <img src={perk.img} alt={perk.title} class="w-7 h-7" />
            <span class="stack-count">{settings[perk.key]?.value ?? 0}</span>
            {#if editingStack === perk.key}
                <input
                    type="number"
                    class="stack-edit"
                    value={settings[perk.key]?.value ?? 0}
                    min="0"
                    max={perk.max}
                    oninput={(e) => { settings[perk.key].value = Math.max(0, Math.min(perk.max, parseInt(e.target.value) || 0)); updateDamages(); }}
                    onblur={() => { editingStack = null; }}
                    onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                    onclick={(e) => e.stopPropagation()}
                    use:focusOnMount
                />
            {/if}
        </button>
        {/if}
    {/each}
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
    .stack-label {
        position: absolute;
        top: -2px;
        left: -2px;
        font-size: 0.5rem;
        font-weight: bold;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 3px;
        line-height: 1.2;
    }
    .stack-edit {
        position: absolute;
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        font-size: 0.7rem;
        text-align: center;
        background: #1e293b;
        color: white;
        border: 1px solid #4ade80;
        border-radius: 4px;
        z-index: 10;
        -moz-appearance: textfield;
    }
    .stack-edit::-webkit-inner-spin-button { display: none; }
</style>
