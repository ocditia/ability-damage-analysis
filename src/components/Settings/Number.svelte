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
	<div class="md:w-2/3">
		<label class="block md:text-right mb-1 md:mb-0 pr-4" for={setting.key}>
			{#if img}
				<img class="inline w-auto h-6 leading-6" src={img} />
			{/if}
			{setting.label}
		</label>
	</div>
	<div class="md:w-1/3">
		<input
			class="bg-[#171d21] appearance-none border-2 border-slate-600 rounded w-full py-2 px-4 leading-tight focus:outline-none"
			id={setting.key}
            type="number"
            bind:value={setting.value}
            on:change={settingUpdated}
			{...$$restProps}
		/>
	</div>
</div>
