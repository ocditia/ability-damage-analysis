<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { buffs } from '$lib/calc/rotation_builder/rotation_consts';
    import { createBuffTimings } from '$lib/calc/rotation_builder/rotation_consts';

    let { settings, updateDamages } = $props();

    // Build display info from createBuffTimings (reuse its titles/colours)
    const buffInfo = createBuffTimings(1);

    // Buffs that make sense to toggle for single-ability debugging
    const debugBuffs = buffs.filter(key => buffInfo[key]?.title);

    function onToggle(key) {
        if (!settings[key]) return;
        settings[key].value = !settings[key].value;
        updateDamages();
    }
</script>

<h5 class="uppercase font-bold text-lg text-center mb-4">Buffs</h5>
<div class="grid grid-cols-2 gap-1 max-h-[400px] overflow-y-auto pr-1">
    {#each debugBuffs as key}
        {@const info = buffInfo[key]}
        {@const isActive = settings[key]?.value === true}
        <label
            class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-700/50 transition-colors text-sm {isActive ? 'bg-gray-700/30' : ''}"
        >
            <input
                type="checkbox"
                checked={isActive}
                onchange={() => onToggle(key)}
                class="accent-current"
                style="accent-color: {info.colour}"
            />
            <span
                class="w-2 h-2 rounded-full shrink-0"
                style="background-color: {info.colour}"
            ></span>
            <span class="text-gray-300 truncate" class:text-white={isActive}>
                {info.title}
            </span>
        </label>
    {/each}
</div>
