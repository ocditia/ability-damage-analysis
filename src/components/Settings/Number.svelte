<script>
    import { createEventDispatcher } from 'svelte';
    import SettingWrapper from '$components/Settings/SettingWrapper.svelte';
    import LabelWrapper from '$components/Settings/LabelWrapper.svelte';

    export let setting;
    export let img;
    export let step = "1";
    export let min = "0";
    export let max = "9999";

    const dispatch = createEventDispatcher();

    function settingUpdated() {
        dispatch('settingsUpdated');
    }
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
            on:change={settingUpdated}
            step={step}
            min={min}
            max={max}
        />
    </label>
</SettingWrapper>
