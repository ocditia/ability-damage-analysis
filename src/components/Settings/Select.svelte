<script>
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    let { setting = $bindable(), onchange, img, ...rest } = $props();
</script>

<SettingWrapper>
    <LabelWrapper
        key={setting.key}
        label={setting.label}
        img={img}
    />
    <select
        class={`
            hover:border hover:border-white
            border border-slate-600 rounded-md h-6 max-w-100
            bg-transparent text-center w-[100px] text-ellipsis
        `}
        id={setting.key}
        bind:value={setting.value}
        {onchange}
        {...rest}
    >
        {#each setting.options as option}
            <option
                class="bg-gray-700 text-center"
                value={option.value}
            >
                {option.text}
            </option>
        {/each}
    </select>
</SettingWrapper>