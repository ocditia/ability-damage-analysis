<script>
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    let { setting = $bindable(), onchange, img, warning = null, ...rest } = $props();
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
            border rounded-md h-6 max-w-100
            bg-transparent text-center w-[100px] text-ellipsis
            ${warning ? 'border-red-500' : 'border-slate-600'}
        `}
        id={setting.key}
        bind:value={setting.value}
        title={warning || ''}
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