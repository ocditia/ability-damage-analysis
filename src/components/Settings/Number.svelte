<script>
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    let {
        setting = $bindable(),
        onchange,
        img,
        step = "1",
        min = "0",
        max = "9999"
    } = $props();
</script>

<SettingWrapper>
    <LabelWrapper
        label={setting.label}
        img={img}
    />
    <label for={setting.key}>
        <input
            class={`
                number-input border border-slate-600 rounded-md bg-transparent
                w-[60px] hover:border hover:border-white
            `}
            type="number"
            id={setting.key}
            bind:value={setting.value}
            {onchange}
            step={step}
            min={min}
            max={max}
        />
    </label>
</SettingWrapper>

<style>
    .number-input {
        text-indent: -8px;
        text-align: center;
    }
</style>
