<script>
    import { onMount } from 'svelte';
    import AbilityChoice from './AbilityChoice.svelte';
    import GearChoice from './GearChoice.svelte';
    import { offGcdAbilities, rangedGear } from '$lib/special/abilities';
    import { settingsStore, initializeSettings } from '$lib/stores/settingsStore.svelte.js';
    import { rotationStore } from '$lib/stores/rotationStore.svelte.js';

    // Initialize settings on component mount
    onMount(async () => {
        await initializeSettings();
    });

    export let uiState;
    export let gameState;
    export let allAbils;
    export let handleAbilityClickExtra;
    export let handleDragStart;
    export let handleBarRightClick;
    export let handleDragStartBar;
    export let extraActions;
    
    // Mutation functions to avoid prop mutation warnings
    export let closeExtraActions = () => {};
    export let setExtraActionsTab = (tab) => {};

    const EXTRA_BAR_SIZE = 12;
    $: tick = uiState.extraActions.tick;

    $: currentAbility = tick !== undefined && tick >= 0 && rotationStore.abilityBar && rotationStore.abilityBar[tick] ? allAbils[rotationStore.abilityBar[tick]] : null;
    $: currentStalledAbility = tick !== undefined && tick >= 0 && gameState.stalledAbilities && gameState.stalledAbilities[tick] ? allAbils[gameState.stalledAbilities[tick]] : null;

    function calculateCumulativeDamage() {
        if (!rotationStore.distributionStats || rotationStore.distributionStats.length === 0 || tick === undefined || tick < 0) {
            return { total: 0, mean: 0, min: 0, max: 0 };
        }

        let totalDamage = 0;
        let totalLikelihood = 0;
        let minDamage = 0;
        let maxDamage = 0;

        // Calculate cumulative damage from all stats up to the current tick
        rotationStore.distributionStats.forEach(stat => {
            if (stat.tick <= tick) {
                // For combined distributions, use the weighted average
                if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
                    const critDamage = stat.critProbability * stat.critMean;
                    const nonCritDamage = (1 - stat.critProbability) * stat.nonCritMean;
                    const expectedDamage = critDamage + nonCritDamage;
                    
                    totalDamage += expectedDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                } else {
                    // For single distributions, use the mean
                    const meanDamage = (stat.minDamage + stat.maxDamage) / 2;
                    totalDamage += meanDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                }
            }
        });

        // Normalize by total likelihood
        if (totalLikelihood > 0) {
            return {
                total: Math.round(totalDamage / totalLikelihood),
                mean: Math.round(totalDamage / totalLikelihood),
                min: Math.round(minDamage / totalLikelihood),
                max: Math.round(maxDamage / totalLikelihood)
            };
        }

        return { total: 0, mean: 0, min: 0, max: 0 };
    }

    function formatDamage(damage) {
        if (damage >= 1000000) {
            return (damage / 1000000).toFixed(1) + 'M';
        } else if (damage >= 1000) {
            return (damage / 1000).toFixed(1) + 'K';
        }
        return damage.toString();
    }
</script>

    <div class="extra-action-section">
        <div class="flex justify-between items-center w-full">
            <p class="flex-grow text-center">Tick {tick}</p>
        <button 
            class="text-[#C2BA9E] font-bold text-xl hover:text-[#968A5C]"
            on:click={closeExtraActions}
        >
            ✕
        </button>
    </div>
    <div class="flex gap-2">
        {#if currentAbility}
            <img src={currentAbility.icon}
                alt={currentAbility.title}
                style="width: 30px; height: 30px;"
                title="{currentAbility.title}"
            />
        {/if}
        {#if currentStalledAbility}
            <img src={currentStalledAbility.icon}
                alt={currentStalledAbility.title}
                style="width: 30px; height: 30px;"
                title="Stalled: {currentStalledAbility.title}"
            />
        {/if}
    </div>
    <p>Cast {currentAbility ? currentAbility.title : 'nothing'}</p>
    {#if currentStalledAbility}
        <p>Released stalled {currentStalledAbility.title}</p>
    {/if}

    <!-- Damage Information -->
    {#if rotationStore.distributionStats && rotationStore.distributionStats.length > 0 && tick !== undefined && tick >= 0}
        {@const damageInfo = calculateCumulativeDamage()}
        <div class="damage-info">
            <p class="damage-title">Expected Damage (up to tick {tick}):</p>
            <p class="damage-value">{formatDamage(damageInfo.total)}</p>
            {#if damageInfo.min !== damageInfo.max}
                <p class="damage-range">Range: {formatDamage(damageInfo.min)} - {formatDamage(damageInfo.max)}</p>
            {/if}
        </div>
    {/if}

    
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <li class="flex-grow me-2">
            <button
                on:click={() => setExtraActionsTab('abilities')}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                class:text-[#968A5C]={uiState.extraActions.tab === 'abilities'}
            >Abilities</button>
        </li>
        <li class="flex-grow me-2">
            <button
                on:click={() => setExtraActionsTab('gear')}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                class:text-[#968A5C]={uiState.extraActions.tab === 'gear'}
            >Gear</button>
        </li>
    </ul>

    {#if uiState.extraActions.tab === 'gear'}
        <GearChoice 
            gearItems={rangedGear} 
            handleAbilityClick={handleAbilityClickExtra} 
            {handleDragStart}
            style={uiState.activeTab}
            settings={settingsStore.settings}
        />
    {:else if uiState.extraActions.tab === 'abilities'}
        <AbilityChoice 
            abilities={offGcdAbilities} 
            handleAbilityClick={handleAbilityClickExtra} 
            {handleDragStart}
            style={uiState.extraActions.tab}
        />
    {/if}

    <div class="extra-actions-bar">
        {#each gameState.extraActionBar[tick] || Array(EXTRA_BAR_SIZE).fill(null) as action, subIndex}
            <button
                class="ability-slot"
                style="background-color: #9da777;"
                tabindex="0"
                aria-label="Action slot"
                on:contextmenu={(e) => handleBarRightClick(e, tick, subIndex)}
            >
                {#if action}
                    <img src={offGcdAbilities[action] ? offGcdAbilities[action].icon : action.icon}
                        alt={offGcdAbilities[action] ? offGcdAbilities[action].title : action.title}
                        style="width: 100%; height: 100%; object-fit: contain;"
                        title="{offGcdAbilities[action] ? offGcdAbilities[action].title : action.title}"
                        draggable="true"
                        on:dragstart={(e) => handleDragStartBar(e, action, tick)}
                    />
                {/if}
            </button>
        {/each}
    </div>
</div>

<style>
    .extra-action-section {
        border: 2px solid #ffff00df;
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }

    .extra-actions-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 3%;
        gap: 2px;
    }

    .ability-slot {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #878787;
        box-sizing: border-box;
    }

    .damage-info {
        margin: 1rem 0;
        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        text-align: center;
    }

    .damage-title {
        font-size: 0.9rem;
        color: #C2BA9E;
        margin: 0 0 0.5rem 0;
    }

    .damage-value {
        font-size: 1.2rem;
        font-weight: bold;
        color: #4CAF50;
        margin: 0.25rem 0;
    }

    .damage-range {
        font-size: 0.8rem;
        color: #ffffff;
        margin: 0.25rem 0;
    }
</style> 