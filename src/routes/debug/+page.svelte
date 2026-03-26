<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { ABILITIES, abils } from '$lib/data/abilities';
    import { traceDamageCalculation } from '$lib/calc/damage-trace';

    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import RotationSettings from '$components/Settings/RotationSettings.svelte';

    import { settingsStore, initializeSettings } from '$lib/stores/settingsStore.svelte.js';
    import { rotationStore } from '$lib/stores/rotationStore.svelte.js';

    initializeSettings();

    // All abilities with titles, sorted by style then name
    const allAbilities = Object.entries(abils)
        .filter(([key, a]) => a.title && a['ability classification'] !== 'self cast')
        .sort((a, b) => {
            const styleCmp = (a[1]['main style'] ?? '').localeCompare(b[1]['main style'] ?? '');
            if (styleCmp !== 0) return styleCmp;
            return a[1].title.localeCompare(b[1].title);
        });

    // Group abilities by style for the dropdown
    const styleGroups = {};
    for (const [key, a] of allAbilities) {
        const style = a['main style'] ?? 'other';
        if (!styleGroups[style]) styleGroups[style] = [];
        styleGroups[style].push({ key, title: a.title });
    }

    let selectedAbility = $state(ABILITIES.REND);
    let traceSteps = $state([]);
    let calcResult = $state(0);
    let settingsTab = $state('general');

    function adaptSettings() {
        if (!settingsStore.settings) return {};
        return Object.fromEntries(
            Object.entries(settingsStore.settings).map(([key, value]) => [key, value.value])
        );
    }

    function updateTrace() {
        const adapted = adaptSettings();
        if (!adapted || Object.keys(adapted).length === 0) return;
        const { steps, result } = traceDamageCalculation(adapted, selectedAbility);
        traceSteps = steps;
        calcResult = result;
    }

    updateTrace();
</script>

<svelte:head>
    <title>Debug: Damage Trace</title>
</svelte:head>

<Navbar />
<Header title="Debug: Damage Trace" />

<div class="space-y-6 mt-6">
    <div class="responsive-container">
        <section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
            <!-- Trace Output -->
            <div class="xl:col-span-7 xl:row-start-1">
                <!-- Ability Selector -->
                <div class="card mb-4">
                    <div class="flex items-center gap-4 flex-wrap">
                        <label class="text-gray-300 text-sm font-semibold">Ability</label>
                        <select
                            class="bg-gray-700 text-white rounded px-3 py-2 text-sm flex-grow"
                            bind:value={selectedAbility}
                            onchange={updateTrace}
                        >
                            {#each Object.entries(styleGroups) as [style, abilities]}
                                <optgroup label={style.charAt(0).toUpperCase() + style.slice(1)}>
                                    {#each abilities as a}
                                        <option value={a.key}>{a.title}</option>
                                    {/each}
                                </optgroup>
                            {/each}
                        </select>
                        {#if abils[selectedAbility]?.icon}
                            <img src={abils[selectedAbility].icon} alt="" class="w-8 h-8" />
                        {/if}
                    </div>
                </div>

                <!-- Comparison Banner -->
                <div class="card mb-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="text-gray-400 text-sm">Calculator Result:</span>
                            <span class="text-white text-2xl font-bold ml-2">{calcResult}</span>
                        </div>
                        <div class="text-gray-400 text-sm text-right">
                            <div>{abils[selectedAbility]?.title ?? selectedAbility}</div>
                            <div class="text-xs">{abils[selectedAbility]?.['main style']} — {abils[selectedAbility]?.['ability classification']} — {abils[selectedAbility]?.['ability type']}</div>
                        </div>
                    </div>
                </div>

                <!-- Trace Table -->
                <div class="card">
                    {#if traceSteps.length === 0}
                        <p class="text-gray-400 text-sm">No trace data. Select an ability and adjust settings.</p>
                    {:else}
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-gray-600">
                                    <th class="py-2 px-3 text-left text-gray-400 text-xs uppercase w-1/4">Step</th>
                                    <th class="py-2 px-3 text-right text-gray-400 text-xs uppercase w-1/6">Value</th>
                                    <th class="py-2 px-3 text-left text-gray-400 text-xs uppercase">Explanation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each traceSteps as step}
                                    <tr class="border-b border-gray-700/50 hover:bg-gray-800/50">
                                        <td class="py-1.5 px-3 text-gray-300 text-sm">{step.label}</td>
                                        <td class="py-1.5 px-3 text-white font-mono text-sm text-right">{step.value}</td>
                                        <td class="py-1.5 px-3 text-gray-500 text-xs">{step.explanation}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {/if}
                </div>
            </div>

            <!-- Settings Panel -->
            <div class="xl:col-span-5 xl:row-start-1">
                <div class="card">
                    <RotationSettings
                        bind:tab={settingsTab}
                        updateDamages={updateTrace}
                        stacks={rotationStore.stacks}
                    />
                </div>
            </div>
        </section>
    </div>
</div>
