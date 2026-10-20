<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { base } from '$app/paths';
    import { rotationActions } from '$lib/stores/rotationStore.svelte.js';
    import { uiStore } from '$lib/stores/uiStore.svelte.js';
    import {
        importCatalogue,
        normalizeName,
        resolveImportName,
        parseRotationText,
        validateImport,
        buildImportedRotation,
        type ImportAction
    } from '$lib/utils/rotationImport';
    let { onclose, refreshUI } = $props();
    let text = $state(''),
        actions = $state<ImportAction[]>([]),
        busy = $state(false),
        error = $state(''),
        preview = $state('');
    let dialog: HTMLDivElement;
    onMount(() => {
        dialog?.querySelector<HTMLTextAreaElement>('textarea')?.focus();
    });
    function keydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.stopPropagation();
            onclose();
        }
        if (event.key !== 'Tab') return;
        const focusable = Array.from(
            dialog.querySelectorAll<HTMLElement>(
                'button:not(:disabled),input:not(:disabled),select,textarea,[tabindex="0"]'
            )
        );
        const first = focusable[0],
            last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    }
    let aliases: Record<string, string> = {},
        emojiNames: Record<string, string> = {};
    let worker: Worker | null = null;
    const urls: string[] = [];
    const choices = Object.entries(importCatalogue).sort((a, b) =>
        a[1].title.localeCompare(b[1].title)
    );
    const errors = $derived(validateImport(actions));
    async function loadAliases() {
        if (Object.keys(emojiNames).length) return;
        const response = await fetch(`${base}/rotation-import/pvme.json`);
        if (!response.ok) throw new Error('Could not load PVME definitions.');
        for (const e of await response.json()) {
            const key = resolveImportName(e.id) || resolveImportName(e.name);
            emojiNames[e.emoji] = e.id;
            if (key)
                for (const name of [e.id, e.name, ...e.aliases]) aliases[normalizeName(name)] = key;
        }
    }
    async function parseText() {
        busy = true;
        error = '';
        try {
            await loadAliases();
            actions = parseRotationText(text, aliases);
        } catch (e) {
            error = String(e);
        } finally {
            busy = false;
        }
    }
    function htmlText(html: string) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        for (const img of doc.querySelectorAll('img')) {
            const id = img.getAttribute('src')?.match(/(?:emojis\/|\/)(\d{10,})/)?.[1];
            const name =
                (id && emojiNames[id]) ||
                img.getAttribute('alt') ||
                img.getAttribute('title') ||
                '[unknown image]';
            img.replaceWith(doc.createTextNode(' ' + name + ' '));
        }
        for (const e of doc.querySelectorAll('br')) e.replaceWith(doc.createTextNode('\n'));
        for (const e of doc.querySelectorAll('p,div,h1,h2,h3,li'))
            e.append(doc.createTextNode('\n'));
        for (const e of doc.querySelectorAll('sup')) {
            e.prepend(doc.createTextNode(' '));
            e.append(doc.createTextNode(' '));
        }
        return doc.body.textContent || '';
    }
    async function paste(event: ClipboardEvent) {
        const image = Array.from(event.clipboardData?.files || []).find((f) =>
            f.type.startsWith('image/')
        );
        if (image) {
            event.preventDefault();
            await readImage(image);
            return;
        }
        const html = event.clipboardData?.getData('text/html');
        if (html?.includes('<img')) {
            event.preventDefault();
            busy = true;
            try {
                await loadAliases();
                text = htmlText(html);
                actions = parseRotationText(text, aliases);
            } catch (e) {
                error = String(e);
            } finally {
                busy = false;
            }
        }
    }
    async function readImage(file: File) {
        busy = true;
        error = '';
        actions = [];
        worker?.terminate();
        urls.splice(0).forEach((url) => URL.revokeObjectURL(url));
        preview = '';
        try {
            if (file.size > 20 * 1024 * 1024) throw new Error('Use an image smaller than 20 MB.');
            await loadAliases();
            const bitmap = await createImageBitmap(file);
            if (bitmap.width * bitmap.height > 9000000) {
                bitmap.close();
                throw new Error('Crop the image to the rotation first (maximum 9 million pixels).');
            }
            preview = URL.createObjectURL(file);
            urls.push(preview);
            const response = await fetch(`${base}/rotation-import/templates.json`);
            if (!response.ok) throw new Error('Could not load image matching templates.');
            const iconKeys = new Map(choices.map(([k, v]) => [v.icon, k]));
            const templates = (await response.json())
                .map((t) => ({
                    ...t,
                    key:
                        iconKeys.get(t.icon) ||
                        resolveImportName(t.id || '', aliases) ||
                        resolveImportName(t.name || '', aliases)
                }))
                .filter((t) => t.key);
            worker = new Worker(
                new URL('../../lib/utils/rotationImage.worker.ts', import.meta.url),
                { type: 'module' }
            );
            const matches: any[] = await new Promise((resolve, reject) => {
                worker!.onmessage = ({ data }) =>
                    data.error ? reject(new Error(data.error)) : resolve(data.matches);
                worker!.onerror = () =>
                    reject(
                        new Error(
                            'Image matching failed. Try a smaller crop or paste the PVME text.'
                        )
                    );
                worker!.postMessage({ bitmap, templates }, [bitmap]);
            });
            let tick = 0,
                previousTick = 0;
            actions = matches.map((m) => {
                const crop = URL.createObjectURL(m.crop);
                urls.push(crop);
                const mode =
                    m.prefix === 's'
                        ? 'stall'
                        : m.prefix === 'r'
                          ? 'release'
                          : importCatalogue[m.key]?.kind === 'ability'
                            ? 'cast'
                            : 'extra';
                const at = m.prefix === '+' ? previousTick : tick;
                previousTick = at;
                if (mode !== 'extra')
                    tick = Math.max(
                        tick,
                        at +
                            (mode === 'release' ? 1 : Number(importCatalogue[m.key]?.duration) || 3)
                    );
                return {
                    key: m.key,
                    mode,
                    tick: at,
                    source: `Image at ${m.x}, ${m.y}`,
                    crop,
                    confirmed: false
                };
            });
            if (!actions.length)
                error =
                    'No icons recognised. Try cropping to a row, or paste the PVME text. You can also add actions manually below.';
        } catch (e) {
            error = String(e);
        } finally {
            worker?.terminate();
            worker = null;
            busy = false;
        }
    }
    function changeKey(a: ImportAction, value: string) {
        a.key = resolveImportName(value, aliases);
        a.confirmed = !!a.key;
        if (a.key && importCatalogue[a.key].kind !== 'ability') a.mode = 'extra';
    }
    async function apply() {
        error = '';
        try {
            const data = buildImportedRotation(actions, uiStore.activeTab);
            await rotationActions.importRotation(
                data,
                () => onclose(),
                (m) => (error = m),
                refreshUI
            );
        } catch (e) {
            error = String(e);
        }
    }
    onDestroy(() => {
        worker?.terminate();
        urls.forEach((url) => URL.revokeObjectURL(url));
    });
</script>

<div class="import-backdrop" role="presentation">
    <div
        class="import-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rotation-import-title"
        tabindex="-1"
        bind:this={dialog}
        onkeydown={keydown}
        onpaste={paste}
    >
        <header>
            <h2 id="rotation-import-title">Import a rotation</h2>
            <button onclick={onclose} aria-label="Close import">Close</button>
        </header>
        <p>
            Paste PVME text, copy a formatted rotation, or paste an image here. <strong>s</strong>
            before an ability means stall; <strong>r</strong> means release. Nothing changes until you
            import.
        </p>
        <textarea
            aria-label="PVME rotation text or paste an image"
            bind:value={text}
            placeholder="s rangedbasic -> r rangedbasic -> snapshot"
            rows="3"
        ></textarea>
        <div class="import-tools">
            <button disabled={busy || !text.trim()} onclick={parseText}>Read text</button><label
                class="file-button"
                >Open image<input
                    type="file"
                    accept="image/*"
                    disabled={busy}
                    onchange={(e) => {
                        const f = e.currentTarget.files?.[0];
                        if (f) readImage(f);
                    }}
                /></label
            ><button
                disabled={busy}
                onclick={() =>
                    actions.push({
                        key: '',
                        mode: 'cast',
                        tick: actions.at(-1)?.tick + 3 || 0,
                        source: 'Added action',
                        confirmed: false
                    })}>Add action</button
            ><button
                disabled={busy}
                onclick={() =>
                    actions.push({
                        key: '',
                        mode: 'phase',
                        tick: actions.at(-1)?.tick + 3 || 0,
                        source: 'Phase transition',
                        confirmed: true
                    })}>Add phase</button
            >
        </div>
        {#if busy}<p role="status">Reading rotation locally...</p>{/if}
        {#if error}<p class="error" role="alert">{error}</p>{/if}
        {#if preview}<details open>
                <summary>Source image: check for missing icons and section boundaries</summary><img
                    class="source-image"
                    src={preview}
                    alt="Pasted rotation reference"
                />
            </details>{/if}
        {#if actions.length}
            <p>
                Review every action and tick. Image matches can be wrong or missing. Timing is
                suggested from ability durations; arrows do not specify exact ticks. Extra actions
                run before the ability at their tick. Use Skip for unsupported actions.
            </p>
            <div class="review-list">
                {#each actions as a, i}
                    <div class="review-row">
                        <span class="row-number">{i + 1}</span>
                        {#if a.crop}<img
                                src={a.crop}
                                alt="Source icon"
                            />{:else if importCatalogue[a.key]?.icon}<img
                                src={importCatalogue[a.key].icon}
                                alt=""
                            />{:else}<span class="unknown">?</span>{/if}
                        <label
                            >Tick<input
                                type="number"
                                min="0"
                                max="299"
                                bind:value={a.tick}
                            /></label
                        >
                        <label
                            >Action{#if a.mode === 'phase'}<input
                                    bind:value={a.source}
                                />{:else}<input
                                    list="import-action-options"
                                    value={importCatalogue[a.key]?.title || a.source}
                                    onchange={(e) => changeKey(a, e.currentTarget.value)}
                                    aria-label="Choose action"
                                />{/if}</label
                        >
                        <label
                            >Use<select bind:value={a.mode}
                                ><option value="cast">Cast</option><option value="stall"
                                    >Stall (s)</option
                                ><option value="release">Release (r)</option><option value="extra"
                                    >Extra action</option
                                ><option value="phase">Phase</option><option value="skip"
                                    >Skip</option
                                ></select
                            ></label
                        >
                        <label class="reviewed"
                            ><input type="checkbox" bind:checked={a.confirmed} />Reviewed</label
                        >
                        <button onclick={() => actions.splice(i, 1)} aria-label="Remove action"
                            >x</button
                        >
                    </div>
                {/each}
            </div>
            <datalist id="import-action-options"
                >{#each choices as [key, item]}<option value={item.title}>{item.kind}</option
                    >{/each}</datalist
            >
            {#if errors.length}<p class="error">
                    {errors.slice(0, 3).join(' ')}{errors.length > 3
                        ? ` (${errors.length - 3} more)`
                        : ''}
                </p>{/if}
            <footer>
                <span
                    >Replaces the current timeline. Save it first if you want to keep it. Your
                    starting settings are retained.</span
                ><button disabled={busy || errors.length > 0} onclick={apply}
                    >Import reviewed rotation</button
                >
            </footer>
        {/if}
    </div>
</div>

<style>
    .import-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: #000b;
        display: grid;
        place-items: center;
        padding: 20px;
    }
    .import-dialog {
        width: min(100%, 1050px);
        max-height: 90vh;
        overflow: auto;
        background: #171f23;
        border: 1px solid #52656e;
        border-radius: 6px;
        padding: 20px;
        color: #c9d9df;
    }
    header,
    footer,
    .import-tools {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: space-between;
    }
    h2 {
        font-size: 20px;
        color: #e0d2aa;
        margin: 0;
    }
    p,
    footer {
        font-size: 13px;
        line-height: 1.6;
        margin: 12px 0;
    }
    textarea,
    input,
    select {
        background: #101c23;
        color: #d5e8f2;
        border: 1px solid #52656e;
        border-radius: 3px;
        padding: 7px;
        min-width: 0;
    }
    textarea {
        width: 100%;
        box-sizing: border-box;
    }
    button,
    .file-button {
        border: 1px solid #827b64;
        color: #e0d2aa;
        background: #202a2f;
        padding: 7px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 13px;
    }
    button:disabled {
        opacity: 0.45;
        cursor: default;
    }
    .file-button input {
        display: none;
    }
    .import-tools {
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .source-image {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
    }
    .review-list {
        display: grid;
        gap: 6px;
    }
    .review-row {
        display: grid;
        grid-template-columns: 24px 32px 65px minmax(150px, 1fr) 125px 95px 30px;
        gap: 8px;
        align-items: center;
        background: #1d2a30;
        padding: 8px;
        border-radius: 3px;
    }
    .review-row img {
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
    .review-row label {
        font-size: 11px;
        display: grid;
        gap: 3px;
    }
    .review-row input,
    .review-row select {
        width: 100%;
        box-sizing: border-box;
    }
    .review-row .reviewed {
        display: flex;
        align-items: center;
    }
    .reviewed input {
        width: auto;
    }
    .row-number,
    .unknown {
        color: #a99e80;
    }
    .error {
        color: #f6b58d;
    }
    footer button {
        flex-shrink: 0;
    }
    @media (max-width: 750px) {
        .review-row {
            grid-template-columns: 20px 30px 55px 1fr;
        }
        .review-row label:nth-of-type(2) {
            grid-column: 4;
        }
        .review-row label:nth-of-type(3) {
            grid-column: 3/5;
        }
        footer {
            flex-wrap: wrap;
        }
    }
</style>
