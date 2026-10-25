<script>
    import { rotationActions } from '$lib/stores/rotationStore.svelte.js';
    import { uiStore } from '$lib/stores/uiStore.svelte.js';
    let { refreshUI } = $props();
    let start = $state(0);
    let count = $state(5);
    let direction = $state(-1);
    let message = $state('');
    let failed = $state(false);
    let destination = $derived(Number(start) + Number(direction) * Number(count));
    function shift() {
        const offset = Number(direction) * Number(count);
        const result = Number(count) > 0
            ? rotationActions.shiftTicks(Number(start), offset)
            : {success: false, error: 'Enter a positive whole number of ticks.'};
        failed = !result.success;
        if (!result.success) { message = result.error; return; }
        if (uiStore.extraActions.show && uiStore.extraActions.tick >= start) uiStore.extraActions.tick = Math.max(0, Math.min(299, uiStore.extraActions.tick + offset));
        if (uiStore.bar.index >= start) uiStore.bar.index = Math.max(0, Math.min(299, uiStore.bar.index + offset));
        message = `Moved tick ${start} and everything after it to tick ${destination}.`;
        start = destination;
        refreshUI();
    }
</script>

<details class="shift-rotation">
    <summary>Shift rotation</summary>
    <p>Move everything from a tick onward, including swaps, stalls, releases and conditions. Use tick 0 to move the whole rotation.</p>
    <form onsubmit={event => { event.preventDefault(); shift(); }}>
        <label>From tick <input type="number" min="0" max="299" step="1" bind:value={start} required /></label>
        {#if uiStore.extraActions.show}<button type="button" onclick={() => { start = uiStore.extraActions.tick; message = ''; }}>Use selected tick ({uiStore.extraActions.tick})</button>{/if}
        <label>Move <select bind:value={direction}><option value={-1}>Earlier</option><option value={1}>Later</option></select></label>
        <label>Ticks <input type="number" min="1" max="299" step="1" bind:value={count} required /></label>
        <button class="apply" type="submit">Shift rotation</button>
    </form>
    <p class="preview">Tick {start ?? '—'} → tick {Number.isFinite(destination) ? destination : '—'}. Earlier ticks stay in place.</p>
    {#if message}<p class:error={failed} role="status">{message}</p>{/if}
</details>

<style>
    .shift-rotation { border: 1px solid #344952; border-radius: 4px; background: #111c22; padding: 10px 12px; margin: 0 0 18px; }
    summary { color: #cbb780; cursor: pointer; font-weight: 600; }
    p { color: #9bc6df; font-size: 12px; margin: 10px 0 0; }
    form { display: flex; flex-wrap: wrap; align-items: end; gap: 10px; margin-top: 12px; }
    label { display: flex; flex-direction: column; gap: 5px; color: #9bd3f0; font-size: 12px; }
    input, select, button { border: 1px solid #4a626e; border-radius: 4px; background: #17262e; color: #bce2fa; min-height: 34px; padding: 6px 10px; }
    input { width: 85px; }
    select { color-scheme: dark; }
    option { background: #17262e; color: #bce2fa; }
    button { cursor: pointer; }
    button:hover { border-color: #cbb780; }
    .apply { background: #cbb780; color: #172126; border-color: #cbb780; }
    .error { color: #ffb5a8; }
</style>
