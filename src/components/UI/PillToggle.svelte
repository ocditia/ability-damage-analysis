<script>
    let {
        value = $bindable('popular'),
        options = ['popular', 'owned', 'all'],
        labels = { popular: 'Popular', owned: 'Owned', all: 'All' },
        onchange = () => {},
    } = $props();

    function cycle() {
        const idx = options.indexOf(value);
        value = options[(idx + 1) % options.length];
        onchange();
    }

    let label = $derived(labels[value] ?? value);
    let isActive = $derived(value !== options[0]);
</script>

<button
    type="button"
    class="pill-toggle"
    class:pill-active={isActive}
    onclick={cycle}
    title="Showing {label.toLowerCase()} — click to cycle"
>
    {label}
</button>

<style>
    .pill-toggle {
        font-size: 0.75rem;
        padding: 1px 8px;
        border-radius: 4px;
        border: 1px solid #555;
        color: #888;
        background: transparent;
        cursor: pointer;
        transition: all 0.15s ease;
        white-space: nowrap;
    }
    .pill-toggle:hover {
        color: #ccc;
        border-color: #777;
    }
    .pill-active {
        border-color: #888;
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
    }
</style>
