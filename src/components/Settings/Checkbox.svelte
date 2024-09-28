<script>
	import { createEventDispatcher } from 'svelte';

    export let setting;
    export let img;

    const dispatch = createEventDispatcher();

    function settingUpdated() {
        dispatch('settingsUpdated');
    }
</script>

<div class="md:flex md:items-center mt-4">
	<label class="block ml-auto text-right" for={setting.key}>
		{#if img}
			<img class="inline w-auto h-6 leading-6" src={img} />
		{/if}
		{setting.label}
		<input class="mr-2 leading-tight" id={setting.key} type="checkbox" bind:checked={setting.value}
        on:change={settingUpdated} {...$$restProps} />
	</label>
</div>
