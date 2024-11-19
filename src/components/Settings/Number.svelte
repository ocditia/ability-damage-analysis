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
                border border-slate-600 rounded-md bg-transparent text-right
                min-w-[100px] text-center hover:border hover:border-white
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
