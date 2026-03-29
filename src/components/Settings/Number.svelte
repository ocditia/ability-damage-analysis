<script>
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    let {
        setting = $bindable(),
        onchange,
        img,
        step = "1",
        min = "0",
        max = "9999",
        width = "60px",
        compact = false // When true, displays as "500K" / "1.2M" when not focused
    } = $props();

    let editing = $state(false);

    function formatCompact(num) {
        if (num == null || num === 0) return '0';
        if (num >= 1000000) {
            const m = num / 1000000;
            return (m === Math.floor(m) ? m.toFixed(0) : m.toFixed(1)) + 'M';
        }
        if (num >= 1000) {
            const k = num / 1000;
            return (k === Math.floor(k) ? k.toFixed(0) : k.toFixed(1)) + 'K';
        }
        return num.toLocaleString();
    }

    function handleBlur() {
        editing = false;
        if (onchange) onchange();
    }

    function handleFocus(e) {
        editing = true;
        // Select all text on focus for easy replacement
        setTimeout(() => e.target.select(), 0);
    }
</script>

<SettingWrapper>
    <LabelWrapper
        label={setting.label}
        img={img}
    />
    <label for={setting.key}>
        {#if compact && !editing}
            <input
                class="number-input border border-slate-600 rounded-md bg-transparent hover:border hover:border-white"
                style="width: {width};"
                type="text"
                id={setting.key}
                value={formatCompact(setting.value)}
                readonly
                onfocus={handleFocus}
            />
        {:else}
            <input
                class="number-input border border-slate-600 rounded-md bg-transparent hover:border hover:border-white"
                style="width: {width};"
                type="number"
                id={setting.key}
                bind:value={setting.value}
                onblur={handleBlur}
                step={step}
                min={min}
                max={max}
            />
        {/if}
    </label>
</SettingWrapper>

<style>
    .number-input {
        text-indent: -8px;
        text-align: center;
    }
</style>
