<script>
    import { onMount } from 'svelte';
    import AbilityChoice from './AbilityChoice.svelte';
    import GearChoice from './GearChoice.svelte';
    import { offGcdAbilities, consumables, allExtraActions, rangedGear, meleeGear, magicGear, necroGear, sharedGear } from '$lib/special/abilities';
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

    // Quick action callbacks
    export let onRemoveAbility = () => {};
    export let onToggleNull = () => {};

    export let onRefreshUI = () => {};

    // Mutation functions to avoid prop mutation warnings
    export let closeExtraActions = () => {};
    export let setExtraActionsTab = (tab) => {};

    const EXTRA_BAR_SIZE = 12;
    const gearByStyle = {
        ranged: { ...rangedGear, ...sharedGear },
        melee: { ...meleeGear, ...sharedGear },
        magic: { ...magicGear, ...sharedGear },
        necro: { ...necroGear, ...sharedGear },
    };
    $: activeGear = gearByStyle[uiState.activeTab] || rangedGear;
    $: tick = uiState.extraActions.tick;

    $: currentAbility = tick !== undefined && tick >= 0 && rotationStore.abilityBar && rotationStore.abilityBar[tick] ? allAbils[rotationStore.abilityBar[tick]] : null;
    $: currentAbilityKey = tick !== undefined && tick >= 0 && rotationStore.abilityBar ? rotationStore.abilityBar[tick] : null;
    $: currentStalledAbility = tick !== undefined && tick >= 0 && gameState.stalledAbilities && gameState.stalledAbilities[tick] ? allAbils[gameState.stalledAbilities[tick]] : null;
    $: isNulled = tick !== undefined && tick >= 0 && rotationStore.nulledTicks && rotationStore.nulledTicks[tick];

    // Per-tick damage breakdown
    function getTickDamage(tick) {
        if (!rotationStore.distributionStats || rotationStore.distributionStats.length === 0 || tick === undefined || tick < 0) {
            return [];
        }
        return rotationStore.distributionStats
            .filter(stat => stat.tick === tick)
            .map(stat => {
                let expected;
                if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
                    expected = stat.critProbability * stat.critMean + (1 - stat.critProbability) * stat.nonCritMean;
                } else {
                    expected = (stat.minDamage + stat.maxDamage) / 2;
                }
                return {
                    ability: stat.ability,
                    expected: Math.round(expected * stat.likelihood),
                    min: Math.round(stat.minDamage * stat.likelihood),
                    max: Math.round(stat.maxDamage * stat.likelihood),
                    likelihood: stat.likelihood
                };
            });
    }

    // Active buffs at this tick
    function getTickBuffs(tick) {
        if (!rotationStore.buffs || tick === undefined || tick < 0) return [];
        return Object.entries(rotationStore.buffs)
            .filter(([_, buff]) => buff.buffTicks && buff.buffTicks[tick])
            .map(([key, buff]) => ({ key, title: buff.title, colour: buff.colour }));
    }

    // Stack values at this tick
    function getTickStacks(tick) {
        if (!rotationStore.stacks || tick === undefined || tick < 0) return [];
        return Object.entries(rotationStore.stacks)
            .filter(([_, stack]) => stack.idx >= 0 && stack.stackTicks && stack.stackTicks[tick] !== 0)
            .map(([key, stack]) => ({
                key, title: stack.title,
                value: stack.stackTicks[tick],
                colour: stack.colour,
                image: stack.image
            }));
    }

    function calculateCumulativeDamage() {
        if (!rotationStore.distributionStats || rotationStore.distributionStats.length === 0 || tick === undefined || tick < 0) {
            return { total: 0, mean: 0, min: 0, max: 0 };
        }

        let totalDamage = 0;
        let totalLikelihood = 0;
        let minDamage = 0;
        let maxDamage = 0;

        rotationStore.distributionStats.forEach(stat => {
            if (stat.tick <= tick) {
                if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
                    const critDamage = stat.critProbability * stat.critMean;
                    const nonCritDamage = (1 - stat.critProbability) * stat.nonCritMean;
                    const expectedDamage = critDamage + nonCritDamage;

                    totalDamage += expectedDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                } else {
                    const meanDamage = (stat.minDamage + stat.maxDamage) / 2;
                    totalDamage += meanDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                }
            }
        });

        if (totalLikelihood > 0) {
            return {
                total: Math.round(totalDamage),
                mean: Math.round(totalDamage),
                min: Math.round(minDamage),
                max: Math.round(maxDamage)
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

    function handleRemoveAbility() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.abilityBar[tick] = null;
            onRemoveAbility();
        }
    }

    function handleToggleNull() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.nulledTicks[tick] = !rotationStore.nulledTicks[tick];
            onRefreshUI();
        }
    }

    function handleRemoveStall() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.stalledAbilities[tick] = null;
            onRefreshUI();
        }
    }
</script>

    <div class="extra-action-section">
        <!-- Header -->
        <div class="flex justify-between items-center w-full">
            <p class="flex-grow text-center font-bold">Tick {tick}</p>
            <button
                class="text-[#C2BA9E] font-bold text-xl hover:text-[#968A5C]"
                onclick={closeExtraActions}
            >
                x
            </button>
        </div>

        <!-- Ability summary + quick actions -->
        <div class="tick-summary">
            <div class="flex items-center gap-2">
                {#if currentAbility}
                    <img src={currentAbility.icon}
                        alt={currentAbility.title}
                        style="width: 36px; height: 36px; background-color: #333; border: 1px solid #666;"
                        title="{currentAbility.title}"
                    />
                    <div>
                        <p class="text-sm font-bold">{currentAbility.title}</p>
                    </div>
                {:else}
                    <div style="width: 36px; height: 36px; background-color: #333; border: 1px solid #666; display: flex; align-items: center; justify-content: center;">
                        <span class="text-xs text-gray-500">-</span>
                    </div>
                    <p class="text-sm text-gray-400">Empty tick</p>
                {/if}
                {#if isNulled}
                    <span class="nulled-badge">Nulled</span>
                {/if}
            </div>
            {#if currentStalledAbility}
                <div class="flex items-center gap-2 mt-1">
                    <img src={currentStalledAbility.icon}
                        alt={currentStalledAbility.title}
                        style="width: 24px; height: 24px; background-color: #333; border: 1px solid #555;"
                        title="Stalled: {currentStalledAbility.title}"
                    />
                    <p class="text-xs text-gray-300">Stalled: {currentStalledAbility.title}</p>
                </div>
            {/if}
            <!-- Quick actions -->
            <div class="quick-actions">
                {#if currentAbility}
                    <button class="quick-btn" title="Remove ability" onclick={handleRemoveAbility}>Remove</button>
                {/if}
                <button class="quick-btn" class:active={isNulled} title="Toggle null" onclick={handleToggleNull}>
                    {isNulled ? 'Un-null' : 'Null'}
                </button>
                {#if currentStalledAbility}
                    <button class="quick-btn" title="Remove stall" onclick={handleRemoveStall}>Un-stall</button>
                {/if}
            </div>
        </div>

        <!-- Tabs -->
        <ul class="flex flex-wrap flex-row text-sm font-medium text-center mt-2">
            <li class="flex-grow">
                <button
                    onclick={() => setExtraActionsTab('info')}
                    class="tab-btn"
                    class:tab-active={uiState.extraActions.tab === 'info'}
                >Info</button>
            </li>
            <li class="flex-grow">
                <button
                    onclick={() => setExtraActionsTab('abilities')}
                    class="tab-btn"
                    class:tab-active={uiState.extraActions.tab === 'abilities'}
                >Abilities</button>
            </li>
            <li class="flex-grow">
                <button
                    onclick={() => setExtraActionsTab('gear')}
                    class="tab-btn"
                    class:tab-active={uiState.extraActions.tab === 'gear'}
                >Gear</button>
            </li>
        </ul>

        <!-- Tab content -->
        {#if uiState.extraActions.tab === 'info'}
            <div class="info-tab">
                <!-- Per-tick damage -->
                {#if rotationStore.distributionStats && rotationStore.distributionStats.length > 0}
                    {@const tickDmg = getTickDamage(tick)}
                    {@const cumDmg = calculateCumulativeDamage()}

                    {#if tickDmg.length > 0}
                        <div class="info-section">
                            <p class="info-label">Damage on this tick</p>
                            {#each tickDmg as hit}
                                <div class="damage-row">
                                    <span class="text-xs text-gray-300">
                                        {#if allAbils[hit.ability]?.title} <!-- Capitalise -->
                                            {allAbils[hit.ability].title.replace(/\b\w/g, l => l.toUpperCase())}
                                        {:else}
                                            {hit.ability.replace(/\b\w/g, l => l.toUpperCase())}
                                        {/if}
                                    </span>
                                    <span class="damage-val">{formatDamage(hit.expected)}</span>
                                    <span class="text-xs text-gray-500">({formatDamage(hit.min)}-{formatDamage(hit.max)})</span>
                                </div>
                            {/each}
                        </div>
                    {/if}

                    <div class="info-section">
                        <p class="info-label">Cumulative (ticks 0-{tick})</p>
                        <div class="damage-row">
                            <span class="damage-val-lg">{formatDamage(cumDmg.total)}</span>
                            {#if cumDmg.min !== cumDmg.max}
                                <span class="text-xs text-gray-500">({formatDamage(cumDmg.min)}-{formatDamage(cumDmg.max)})</span>
                            {/if}
                        </div>
                    </div>
                {/if}

                <!-- Active buffs -->
                {#if getTickBuffs(tick).length > 0}
                    <div class="info-section">
                        <p class="info-label">Active buffs</p>
                        <div class="buff-list">
                            {#each getTickBuffs(tick) as buff}
                                <div class="buff-item">
                                    <span class="buff-dot" style="background-color: {buff.colour};"></span>
                                    <span class="text-xs">{buff.title}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Stack values -->
                {#if getTickStacks(tick).length > 0}
                    <div class="info-section">
                        <p class="info-label">Stacks</p>
                        <div class="stack-list">
                            {#each getTickStacks(tick) as stack}
                                <div class="stack-item">
                                    <img src={stack.image} alt={stack.title} style="width: 16px; height: 16px;" />
                                    <span class="text-xs">{stack.title}</span>
                                    <span class="stack-val" style="color: {stack.colour};">{stack.value?.toFixed ? stack.value.toFixed(1) : stack.value}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {:else if uiState.extraActions.tab === 'gear'}
            <GearChoice
                gearItems={activeGear}
                handleAbilityClick={handleAbilityClickExtra}
                {handleDragStart}
                style={uiState.activeTab}
                settings={settingsStore.settings}
            />
        {:else if uiState.extraActions.tab === 'abilities'}
            <p class="section-label">Abilities</p>
            <AbilityChoice
                abilities={offGcdAbilities}
                handleAbilityClick={handleAbilityClickExtra}
                {handleDragStart}
                style={uiState.extraActions.tab}
            />
            <p class="section-label" style="margin-top: 8px;">Consumables</p>
            <AbilityChoice
                abilities={consumables}
                handleAbilityClick={handleAbilityClickExtra}
                {handleDragStart}
                style={uiState.extraActions.tab}
            />
        {/if}

        <!-- Extra actions bar (always visible) -->
        <div class="extra-actions-bar">
            {#each gameState.extraActionBar[tick] || Array(EXTRA_BAR_SIZE).fill(null) as action, subIndex}
                <button
                    class="action-slot"
                    style="background-color: #9da777;"
                    tabindex="0"
                    aria-label="Action slot"
                    oncontextmenu={(e) => handleBarRightClick(e, tick, subIndex)}
                >
                    {#if action}
                        <img src={allExtraActions[action] ? allExtraActions[action].icon : action.icon}
                            alt={allExtraActions[action] ? allExtraActions[action].title : action.title}
                            style="width: 100%; height: 100%; object-fit: contain;"
                            title="{allExtraActions[action] ? allExtraActions[action].title : action.title}"
                            draggable="true"
                            ondragstart={(e) => handleDragStartBar(e, action, tick)}
                        />
                    {/if}
                </button>
            {/each}
        </div>
    </div>

<style>
    .extra-action-section {
        border: 2px solid #ffd700;
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: rgba(20, 20, 15, 0.6);
        max-width: 100%;
    }

    .tick-summary {
        width: 100%;
        padding: 0.5rem;
        border-bottom: 1px solid #444;
        margin-bottom: 0.5rem;
    }

    .nulled-badge {
        font-size: 0.65rem;
        padding: 1px 6px;
        background-color: rgba(255, 0, 0, 0.3);
        border: 1px solid rgba(255, 0, 0, 0.6);
        border-radius: 3px;
        color: #ff6666;
        text-transform: uppercase;
    }

    .quick-actions {
        display: flex;
        gap: 4px;
        margin-top: 6px;
    }

    .quick-btn {
        font-size: 0.7rem;
        padding: 2px 8px;
        background-color: rgba(255, 255, 255, 0.08);
        border: 1px solid #555;
        border-radius: 3px;
        color: #C2BA9E;
        cursor: pointer;
    }

    .quick-btn:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: #888;
    }

    .quick-btn.active {
        background-color: rgba(255, 0, 0, 0.15);
        border-color: rgba(255, 0, 0, 0.5);
    }

    .tab-btn {
        color: #C2BA9E;
        font-weight: bold;
        font-size: 0.85rem;
        text-transform: uppercase;
        padding: 4px 12px;
        border-bottom: 2px solid transparent;
    }

    .tab-btn:hover {
        color: #968A5C;
    }

    .tab-active {
        color: #ffd700;
        border-bottom-color: #ffd700;
    }

    .info-tab {
        width: 100%;
        padding: 0.5rem 0;
    }

    .info-section {
        padding: 0.4rem 0.5rem;
        border-bottom: 1px solid #333;
    }

    .info-section:last-child {
        border-bottom: none;
    }

    .info-label {
        font-size: 0.7rem;
        color: #888;
        text-transform: uppercase;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
    }

    .damage-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 2px 0;
    }

    .damage-val {
        font-size: 0.85rem;
        font-weight: bold;
        color: #4CAF50;
    }

    .damage-val-lg {
        font-size: 1.1rem;
        font-weight: bold;
        color: #4CAF50;
    }

    .buff-list, .stack-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .buff-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .buff-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .stack-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .stack-val {
        font-weight: bold;
        font-size: 0.85rem;
        margin-left: auto;
    }

    .section-label {
        font-size: 0.7rem;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: 100%;
        padding: 0 0.5rem;
    }

    .extra-actions-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0.5rem 0;
        gap: 2px;
    }

    .action-slot {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #878787;
        box-sizing: border-box;
    }
</style>
