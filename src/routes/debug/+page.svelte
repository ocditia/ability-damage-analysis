<script>
    import { traceDamageCalculation } from '$lib/calc/damage-trace';
    import { ABILITIES, abils } from '$lib/data/abilities';

    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import RotationSettings from '$components/Settings/RotationSettings.svelte';
    import GearManager from '$components/Settings/GearManager.svelte';

    import { rotationStore } from '$lib/stores/rotationStore.svelte.js';
    import { initializeSettings, settingsStore } from '$lib/stores/settingsStore.svelte.js';

    initializeSettings();

    // All abilities with titles, sorted by style then name
    const allAbilities = Object.entries(abils)
        .filter(([key, a]) => a.title && a.abilityClassification !== 'self cast')
        .sort((a, b) => {
            const styleCmp = (a[1].mainStyle ?? '').localeCompare(b[1].mainStyle ?? '');
            if (styleCmp !== 0) return styleCmp;
            return a[1].title.localeCompare(b[1].title);
        });

    // Group abilities by style for the dropdown
    const styleGroups = {};
    for (const [key, a] of allAbilities) {
        const style = a.mainStyle ?? 'other';
        if (!styleGroups[style]) styleGroups[style] = [];
        styleGroups[style].push({ key, title: a.title });
    }

    let selectedAbility = $state(ABILITIES.REND);
    let traceSteps = $state([]);
    let traceHits = $state([]);
    let calcResult = $state(0);
    let settingsTab = $state('general');
    let showGearManager = $state(false);

    function adaptSettings() {
        if (!settingsStore.settings) return {};
        return Object.fromEntries(
            Object.entries(settingsStore.settings).map(([key, value]) => [key, value.value])
        );
    }

    function updateTrace() {
        const adapted = adaptSettings();
        if (!adapted || Object.keys(adapted).length === 0) return;
        const { steps, hits, result } = traceDamageCalculation(adapted, selectedAbility);
        traceSteps = steps;
        traceHits = hits;
        calcResult = result;
    }

    updateTrace();

    // Compute totals for the hits table
    let hitTotals = $derived.by(() => {
        if (traceHits.length === 0) return null;
        return {
            min: traceHits.reduce((sum, h) => sum + h.min, 0),
            max: traceHits.reduce((sum, h) => sum + h.max, 0),
            critMin: traceHits.reduce((sum, h) => sum + h.critMin, 0),
            critMax: traceHits.reduce((sum, h) => sum + h.critMax, 0),
        };
    });
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
                            class="bg-gray-700 text-white rounded px-3 py-2 text-sm grow"
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
                            <div class="text-xs">{abils[selectedAbility]?.mainStyle} — {abils[selectedAbility]?.abilityClassification} — {abils[selectedAbility]?.abilityType}</div>
                        </div>
                    </div>
                </div>

                <!-- Hits Table -->
                {#if traceHits.length > 0}
                    <div class="card">
                        <h4 class="text-gray-400 text-xs uppercase font-semibold mb-2">
                            Hits ({traceHits.length})
                        </h4>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-600">
                                        <th class="py-2 px-2 text-left text-gray-400 text-xs uppercase">Hit</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">AD</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Min</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Max</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Crit %</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Crit Dmg</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Crit Min</th>
                                        <th class="py-2 px-2 text-right text-gray-400 text-xs uppercase">Crit Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each traceHits as hit, i}
                                        <tr class="border-b border-gray-700/50 hover:bg-gray-800/50">
                                            <td class="py-1.5 px-2 text-gray-300 text-xs">{abils[hit.ability]?.title ?? hit.ability}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hit.boostedAD}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hit.min}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hit.max}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{(hit.critChance * 100).toFixed(1)}%</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">+{(hit.critDamageBonus * 100).toFixed(1)}%</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hit.critMin}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hit.critMax}</td>
                                        </tr>
                                    {/each}
                                    {#if traceHits.length > 1 && hitTotals}
                                        <tr class="border-t-2 border-gray-500 font-semibold">
                                            <td class="py-1.5 px-2 text-gray-200 text-xs">Total</td>
                                            <td class="py-1.5 px-2"></td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hitTotals.min}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hitTotals.max}</td>
                                            <td class="py-1.5 px-2"></td>
                                            <td class="py-1.5 px-2"></td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hitTotals.critMin}</td>
                                            <td class="py-1.5 px-2 text-white font-mono text-sm text-right">{hitTotals.critMax}</td>
                                        </tr>
                                    {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                {/if}

                <!-- Pipeline Steps -->
                {#if traceSteps.length > 0}
                    <div class="card">
                        <h4 class="text-gray-400 text-xs uppercase font-semibold mb-2">Pipeline</h4>
                        <table class="w-full">
                            <tbody>
                                {#each traceSteps as step}
                                    <tr class="border-b border-gray-700/50 hover:bg-gray-800/50">
                                        <td class="py-1.5 px-3 text-gray-300 text-sm w-1/4">{step.label}</td>
                                        <td class="py-1.5 px-3 text-white font-mono text-sm text-right w-1/6">{step.value}</td>
                                        <td class="py-1.5 px-3 text-gray-500 text-xs">{step.explanation}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                {/if}
            </div>

            <!-- Settings Panel -->
            <div class="xl:col-span-5 xl:row-start-1">
                <div class="card mb-4">
                    <button
                        class="w-full text-sm text-[#b2dbee] hover:text-white border border-[#b2dbee]/30 hover:border-[#b2dbee] rounded px-3 py-2 transition-colors"
                        onclick={() => showGearManager = true}
                    >
                        Manage Gear
                    </button>
                </div>
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

<GearManager bind:show={showGearManager} />
