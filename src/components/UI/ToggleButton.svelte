<script>
    /**
     * Unified settings button component.
     *
     * Mode is inferred from props:
     * - Binary    (toggle=true):     Click toggles true/false
     * - Ranked    (max set):         Click toggles 0 ↔ max. Right-click/long-press edits. Scroll adjusts.
     * - Cycling   (cycle=[...]):     Click cycles through values in order
     * - Dropdown  (options=[...]):   Click opens/closes dropdown menu
     *
     * Uses ActionIcon internally for the visual shell.
     */

    import ActionIcon from './ActionIcon.svelte';

    let {
        setting = $bindable(),          // { value, ... } — the settings store entry
        img,                            // Icon path string, or function(value) => path
        title = '',                     // Tooltip text
        toggle = false,                 // Binary on/off mode
        step = 1,                       // Ranked: increment step
        max = undefined,                // Ranked: max value (presence triggers ranked mode)
        cycle = undefined,              // Cycling: array of values
        options = undefined,            // Dropdown: array of { value, text }
        openId = $bindable(undefined),  // Dropdown: shared open-dropdown state for mutual exclusion
        id = undefined,                 // Dropdown: unique id for this button (defaults to title)
        label = undefined,              // Small text overlay (top-left, e.g. "Rank")
        badge = undefined,              // Badge override: string/number for text, { img: '...' } for image
        badgeFn = undefined,            // Badge function: (value) => string | { img } | null
        fallback = undefined,           // Fallback icon path on error
        onchange = () => {},            // Callback after value changes
        activeWhen = undefined,         // Override active state: function(value) => boolean
        borderColor = '',               // Custom active border colour (e.g. style colour)
    } = $props();

    let editing = $state(false);
    let longPressTimer = null;
    let longPressFired = false;
    let wrapperEl = $state(null);
    let dropdownStyle = $state('');

    function focusOnMount(node) { node.focus(); node.select(); }

    // Determine mode
    const isRanked = !toggle && !cycle && !options && max !== undefined;
    const isCycle = !!cycle;
    const isDropdown = !!options;
    const myId = id ?? title;

    // Resolve dynamic icon
    let resolvedImg = $derived(
        typeof img === 'function' ? img(setting?.value) : img
    );

    // Active state
    let isActive = $derived.by(() => {
        if (activeWhen) return activeWhen(setting?.value);
        if (toggle) return !!setting?.value;
        if (isDropdown) return setting?.value != null && setting?.value !== 'none';
        if (isCycle) return setting?.value != null && setting?.value !== 'none' && setting?.value !== cycle?.[0];
        if (isRanked) return (setting?.value ?? 0) > 0;
        return false;
    });

    // Dropdown open state
    let isOpen = $derived(isDropdown && openId === myId);

    // Badge
    let resolvedBadge = $derived.by(() => {
        if (badgeFn) return badgeFn(setting?.value);
        if (badge !== undefined) return badge;
        if (isRanked) return String(setting?.value ?? 0);
        if (isCycle && isActive) {
            const idx = cycle.indexOf(setting?.value);
            return idx > 0 ? String(idx) : '';
        }
        return '';
    });

    function handleClick() {
        if (longPressFired) return;
        if (isDropdown) {
            openId = isOpen ? null : myId;
            return;
        }
        if (toggle) {
            setting.value = !setting.value;
        } else if (isCycle) {
            const idx = cycle.indexOf(setting.value);
            setting.value = cycle[(idx + 1) % cycle.length];
        } else if (isRanked) {
            setting.value = setting.value > 0 ? 0 : (max ?? step ?? 1);
        }
        onchange();
    }

    function handleOptionSelect(value) {
        setting.value = value;
        openId = null;
        onchange();
    }

    // Position the dropdown using fixed positioning to escape overflow containers
    $effect(() => {
        if (isOpen && wrapperEl) {
            const rect = wrapperEl.getBoundingClientRect();
            const dropdownMaxHeight = 200;
            const spaceBelow = window.innerHeight - rect.bottom;
            if (spaceBelow < dropdownMaxHeight) {
                // Flip above
                dropdownStyle = `position:fixed; bottom:${window.innerHeight - rect.top}px; left:${rect.left}px; min-width:${Math.max(140, rect.width)}px;`;
            } else {
                dropdownStyle = `position:fixed; top:${rect.bottom + 2}px; left:${rect.left}px; min-width:${Math.max(140, rect.width)}px;`;
            }
        }
    });

    function handleContextMenu(e) {
        if (isDropdown && options?.length > 0) {
            e.preventDefault();
            setting.value = options[0].value;
            openId = null;
            onchange();
            return;
        }
        if (!isRanked) return;
        e.preventDefault();
        editing = !editing;
    }

    function handleWheel(e) {
        if (!isRanked) return;
        e.preventDefault();
        const curr = setting.value ?? 0;
        const next = curr + (e.deltaY < 0 ? step : -step);
        setting.value = Math.max(0, Math.min(max, Math.round(next * 10) / 10));
        onchange();
    }

    function handleTouchStart(e) {
        if (!isRanked) return;
        longPressFired = false;
        longPressTimer = setTimeout(() => {
            longPressFired = true;
            e.preventDefault();
            editing = !editing;
        }, 400);
    }

    function handleTouchEnd(e) {
        if (longPressFired) e.preventDefault();
        clearTimeout(longPressTimer);
    }

    function handleInput(e) {
        setting.value = Math.max(0, Math.min(max ?? 999, parseFloat(e.target.value) || 0));
        onchange();
    }
</script>

<div class="toggle-wrapper"
    bind:this={wrapperEl}
    onwheel={handleWheel}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
    ontouchcancel={handleTouchEnd}
>
    <div class="toggle-opacity" class:inactive={!isActive}>
        {#if label}
            <span class="toggle-label">{label}</span>
        {/if}
        <ActionIcon
            src={resolvedImg}
            {fallback}
            title="{title}{isRanked ? ' (right-click to set, scroll to adjust)' : ''}"
            active={isActive}
            borderColor={isActive ? borderColor : ''}
            badgeText={resolvedBadge}
            type="action"
            onclick={handleClick}
            oncontextmenu={handleContextMenu}
        />
        {#if isRanked && editing}
            <input
                type="number"
                class="toggle-edit"
                value={setting?.value ?? 0}
                min="0"
                max={max ?? 999}
                step={step}
                oninput={handleInput}
                onblur={() => { editing = false; }}
                onkeydown={(e) => { if (e.key === 'Enter') editing = false; }}
                onclick={(e) => e.stopPropagation()}
                use:focusOnMount
            />
        {/if}
    </div>
    {#if isOpen}
        <div class="toggle-dropdown" style={dropdownStyle}>
            {#each options as option}
                <button
                    type="button"
                    class="toggle-dropdown-item"
                    class:active={setting?.value === option.value}
                    onclick={() => handleOptionSelect(option.value)}
                >
                    {option.text}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .toggle-wrapper {
        position: relative;
        display: inline-block;
    }
    .toggle-opacity {
        position: relative;
        display: inline-block;
    }
    .toggle-opacity.inactive {
        opacity: 0.8;
    }
    .toggle-opacity.inactive:hover {
        opacity: 1.0;
    }
    .toggle-label {
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
        z-index: 1;
        pointer-events: none;
    }
    .toggle-edit {
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
    .toggle-edit::-webkit-inner-spin-button { display: none; }
    .toggle-dropdown {
        z-index: 100;
        background: #1e293b;
        border: 1px solid #4ade80;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        min-width: 140px;
    }
    .toggle-dropdown-item {
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
    .toggle-dropdown-item:hover { background: rgba(255, 255, 255, 0.1); }
    .toggle-dropdown-item.active { color: #4ade80; font-weight: bold; }
</style>
