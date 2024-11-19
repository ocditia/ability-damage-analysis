<script>
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    let { setting = $bindable(), onchange, img, ...rest } = $props();
</script>

<SettingWrapper>
    <LabelWrapper
        label={setting.label}
        img={img}
    />
    <label
        class={`
            relative cursor-pointer select-none
            focus-within:border focus-within:border-white focus-within:rounded-md
        `}
        for={setting.key}
    >
        <input
            class="absolute opacity-0 w-0 h-0"
            type="checkbox"
            id={setting.key}
            bind:checked={setting.value}
            {onchange}
            {...rest}
        />
        <span class={`
            hover:border hover:border-white
            border border-slate-600 rounded-md w-6 h-6 flex
            ${setting.value ? 'bg-transparent' : ''}
            after:absolute after:left-[8px] after:top-[4px]
            after:w-[6px] after:h-[12px] after:rotate-45
            after:border-white after:border-r-2 after:border-b-2
            ${setting.value ? 'after:block' : 'after:hidden'}
        `}></span>
    </label>
</SettingWrapper>

