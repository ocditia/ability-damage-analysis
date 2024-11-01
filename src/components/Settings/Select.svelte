<script>
    import { createEventDispatcher } from 'svelte';
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    export let setting;
    export let img;

    const dispatch = createEventDispatcher();

    function settingUpdated() {
        dispatch('settingsUpdated');
    }
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
        on:change={settingUpdated}
        {...$$restProps}
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