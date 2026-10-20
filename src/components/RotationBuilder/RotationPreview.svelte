<script>
    import {rotationStore} from '$lib/stores/rotationStore.svelte.js';
    import {settingsStore} from '$lib/stores/settingsStore.svelte.js';
    import {rotationPreview, rotationPreviewText} from '$lib/utils/rotationPreview';
    import {exportRotationImage} from '$lib/utils/rotationPreviewImage';
    import {phaseDamageRows} from '$lib/calc/rotation_builder/phaseDamage';
    let {show = $bindable(false), showSpecials = $bindable(true)} = $props();
    let status = $state('');
    let showNames = $state(false);
    let showPhaseDamage = $state(false);
    let exportingImage = $state(false);
    let phases = $derived(phaseDamageRows(rotationStore.phaseDamagePerTick, rotationStore.tickEvents, rotationStore.phaseTransitions));
    let rows = $derived(show ? rotationPreview(rotationStore,
        Object.fromEntries(Object.entries(settingsStore.settings).map(([key, entry]) => [key, entry.value]))) : []);
    let discordText = $derived(rotationPreviewText(rows, true, showSpecials));
    let missing = $derived([...new Set(rows.flatMap(row => row.actions.flatMap(item => item.ammo ? [item.ammo, item] : [item]).filter(item => item.discord.startsWith('[')).map(item => item.title)))]);
    function focusDialog(node) {
        const previous = document.activeElement;
        node.focus();
        return {destroy() {previous?.focus?.();}};
    }
    function handleKey(event) {
        if (event.key === 'Escape') show = false;
        if (event.key !== 'Tab') return;
        const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), input, summary, textarea, a[href]')]
            .filter(node => node.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
            event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first?.focus();
        }
    }
    async function copy() {
        try {
            await navigator.clipboard.writeText(discordText);
            status = 'Copied for Discord.';
        } catch {
            status = 'Could not copy automatically. Select and copy the text below.';
        }
    }
    function download() {
        const url = URL.createObjectURL(new Blob([discordText], {type: 'text/plain;charset=utf-8'}));
        const link = document.createElement('a');
        link.href = url; link.download = 'rotation-discord.txt'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    async function downloadImage() {
        exportingImage = true;
        status = 'Preparing image...';
        try {
            // Detach a consistent snapshot before waiting for remote emoji images.
            const snapshot = JSON.parse(JSON.stringify(rows));
            const options = JSON.parse(JSON.stringify({showNames, showSpecials, showPhaseDamage, phases}));
            const blob = await exportRotationImage(snapshot, options);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = 'rotation.png'; link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            status = 'Rotation image exported.';
        } catch (error) {
            status = `Could not export image: ${error.message || 'please try again'}`;
        } finally {
            exportingImage = false;
        }
    }
    function fallback(event, item) {
        const img = event.currentTarget;
        if (item.fallbackIcon && !img.dataset.fallback) {
            img.dataset.fallback = 'true';
            img.src = item.fallbackIcon;
        } else {
            img.hidden = true;
            img.nextElementSibling?.classList.remove('icon-only-label');
        }
    }
</script>

{#snippet icon(item)}
    {#if item.icon}<img src={item.icon} alt={item.title} title={item.title} onerror={event => fallback(event,item)} />{/if}
    <span class:icon-only-label={!!item.icon && !showNames}>{item.title}</span>
{/snippet}

{#if show}
<div class="preview-backdrop">
    <section class="rotation-preview" role="dialog" aria-modal="true" aria-labelledby="rotation-preview-title" tabindex="-1"
        use:focusDialog onkeydown={handleKey}>
        <header><h2 id="rotation-preview-title">Rotation preview</h2><button type="button" onclick={() => show = false}>Close</button></header>
        <p class="hint">s = stall · r = release · + = same tick · → = next action tick. Hover an icon for its name and tick.</p>
        <div class="options">
            <label class="names"><input type="checkbox" bind:checked={showNames} /> Show names</label>
            <label class="names"><input type="checkbox" bind:checked={showSpecials} /> Show spec / eofspec</label>
            <label class="names"><input type="checkbox" bind:checked={showPhaseDamage} /> Include phase damage</label>
        </div>
        <div class="sequence">
            {#each rows as row, rowIndex}
                {#if row.phase}<h3>{row.phase}{#if showPhaseDamage && phases.find(phase => phase.start === row.tick)}<span class="phase-damage"> — {Math.round(phases.find(phase => phase.start === row.tick).damage).toLocaleString()} damage</span>{/if}</h3>
                {:else if rowIndex > 0 && row.actions.length && rows[rowIndex-1].actions.length}<span class="arrow" aria-hidden="true">→</span>{/if}
                {#if row.actions.length}
                <span class="tick-group" class:nulled={row.nulled} title={`Tick ${row.tick}${row.nulled ? ' · nulled' : ''}`}>
                    {#each row.actions as item, actionIndex}
                        {#if actionIndex > 0}<span class="plus">+</span>{/if}
                        <span class="action" title={`${item.title} · Tick ${row.tick}${item.label ? ' · '+item.label : ''}`}>
                            {#if item.prefix}<b class="prefix">{item.prefix}</b>{/if}
                            {#if item.ammo}{@render icon(item.ammo)}{/if}
                            {@render icon(item)}
                            {#if showSpecials && item.specialMarker}{@render icon(item.specialMarker)}{/if}
                        </span>
                    {/each}
                    {#if row.nulled}<small>(null)</small>{/if}
                </span>
                {/if}
            {:else}<p>Add abilities or swaps to your rotation to preview them here.</p>{/each}
        </div>
        <div class="buttons"><button type="button" disabled={!rows.length || exportingImage} onclick={downloadImage}>{exportingImage ? 'Exporting...' : 'Export image (PNG)'}</button><button type="button" disabled={!rows.length} onclick={copy}>Copy for Discord</button><button type="button" disabled={!rows.length} onclick={download}>Export .txt</button></div>
        <p role="status">{status}</p>
        <details><summary>Discord text</summary><textarea aria-label="Rotation Discord text" readonly value={discordText}></textarea></details>
        {#if missing.length}<p class="hint">No PvME emoji is available for: {missing.join(', ')}. These use game icons in the preview and names in copied text.</p>{/if}
        <p class="hint">Emoji mappings: <a href="https://github.com/pvme/pvme-settings/blob/master/emojis/emojis_v2.json" target="_blank" rel="noreferrer">PvME</a>.</p>
    </section>
</div>
{/if}

<style>
.preview-backdrop{position:fixed;inset:0;z-index:1000;background:#000b;display:flex;align-items:center;justify-content:center;padding:12px}.rotation-preview{width:min(1300px,100%);max-height:95vh;overflow:auto;background:#192126;border:1px solid #495960;border-radius:10px;padding:14px;color:#e4e9ec;box-shadow:0 20px 80px #0008}header{display:flex;justify-content:space-between;align-items:center;gap:16px}h2{font-size:19px;margin:0}h3{flex-basis:100%;font-size:13px;color:#d9c88d;margin:5px 0 0;padding:0;line-height:1.2}.hint{font-size:12px;color:#a9bac5;line-height:1.3;margin:7px 0}.names{font-size:13px;display:flex;gap:7px;align-items:center}.sequence{display:flex;flex-wrap:wrap;align-items:center;align-content:flex-start;gap:4px 5px;padding:10px;margin:8px 0;background:#10171b;border:1px solid #36464f;border-radius:6px;min-height:0;line-height:1.15}.tick-group{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px;max-width:100%}.action{display:inline-flex;align-items:center;gap:3px}.action img{width:26px;height:26px;object-fit:contain}.icon-only-label{display:none}.prefix{font-size:16px;color:#dfcd98}.plus,.arrow{color:#aebac1}.nulled{opacity:.6}.buttons{display:flex;gap:10px;flex-wrap:wrap}button{background:#314e68;border:1px solid #57738b;border-radius:5px;padding:8px 13px;color:#fff;cursor:pointer}button:hover{background:#426682}button:disabled{opacity:.5;cursor:default}textarea{width:100%;height:130px;margin-top:12px;background:#10171b;color:#cddce6;border:1px solid #485963;padding:10px;font:12px monospace;box-sizing:border-box}summary{cursor:pointer;font-size:13px}a{color:#99caff}@media(max-width:600px){.preview-backdrop{padding:8px}.rotation-preview{padding:14px}.sequence{padding:12px}}
.options{display:flex;flex-wrap:wrap;gap:8px 18px;margin:6px 0}.spec-label{font-size:11px;color:#d6c79f;white-space:nowrap}
</style>
