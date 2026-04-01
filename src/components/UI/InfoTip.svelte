<script>
    let { text = undefined } = $props();
    let el = $state(null);
    let tooltipStyle = $state('');
    let visible = $state(false);

    // Colour tags — sorted longest-first for unambiguous matching
    const COLOR_TAGS = [
        ['po', '#01df01'],   // poison
        ['pe', '#73D4DB'],   // perk
        ['ma', '#94a3ff'],   // magic
        ['me', '#fe5c5c'],   // melee
        ['r',  '#00bf63'],   // ranged
        ['n',  '#d694ff'],   // necro
        ['f',  '#00eeee'],   // familiar
    ];

    /**
     * Parse format tags like [br:text] into HTML spans.
     * Colour: r=ranged, ma=magic, me=melee, n=necro, f=familiar, po=poison, pe=perk
     * Style: b=bold, i=italic
     * Combinable: [br:bold ranged] [bma:bold magic] [ipo:italic poison]
     */
    function parseText(raw) {
        if (!raw) return '';
        // Escape HTML first to prevent injection
        const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return escaped.replace(/\[([a-z]+):([^\]]+)\]/g, (_, mods, content) => {
            let style = '';
            let remaining = mods;
            // Match colour (longest tag first to avoid ambiguity)
            for (const [tag, color] of COLOR_TAGS) {
                if (remaining.includes(tag)) {
                    style += `color:${color};`;
                    remaining = remaining.replace(tag, '');
                    break;
                }
            }
            if (remaining.includes('b')) style += 'font-weight:600;';
            if (remaining.includes('i')) style += 'font-style:italic;';
            return `<span style="${style}">${content}</span>`;
        });
    }

    let parsedHtml = $derived(parseText(text));

    function show() {
        if (!el || !text) return;
        visible = true;
        const rect = el.getBoundingClientRect();
        const tooltipHeight = 60;
        const spaceAbove = rect.top;
        if (spaceAbove > tooltipHeight) {
            tooltipStyle = `position:fixed; bottom:${window.innerHeight - rect.top + 6}px; left:${rect.left}px;`;
        } else {
            tooltipStyle = `position:fixed; top:${rect.bottom + 6}px; left:${rect.left}px;`;
        }
    }

    function hide() {
        visible = false;
    }
</script>

{#if text}
    <span class="infotip" bind:this={el} onmouseenter={show} onmouseleave={hide}>
        <slot />
        {#if visible}
            <span class="infotip-tooltip" style={tooltipStyle}>{@html parsedHtml}</span>
        {/if}
    </span>
{:else}
    <slot />
{/if}

<style>
    .infotip {
        position: relative;
        border-bottom: 1px dotted #555;
        cursor: help;
        transition: border-color 0.15s, color 0.15s;
    }

    .infotip:hover {
        border-bottom-color: #8bb8d0;
        color: #fff;
    }

    .infotip-tooltip {
        background: #2a2a3a;
        border: 1px solid #444;
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 16px;
        font-weight: 400;
        color: #ccc;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.5;
        white-space: normal;
        max-width: 280px;
        z-index: 200;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
</style>
