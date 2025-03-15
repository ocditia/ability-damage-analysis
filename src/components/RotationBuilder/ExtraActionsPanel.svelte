<script>
    import AbilityChoice from './AbilityChoice.svelte';
    import GearChoice from './GearChoice.svelte';
    import { offGcdAbilities, rangedGear } from '$lib/special/abilities';

    export let uiState;
    export let gameState;
    export let allAbils;
    export let handleAbilityClickExtra;
    export let handleDragStart;
    export let handleBarRightClick;
    export let handleDragStartBar;
    export let extraActions;

    const EXTRA_BAR_SIZE = 12;

    function getAbility() {
        return allAbils[uiState.extraActions.infoAbility];
    }

    function getStalledAbility() {
        return allAbils[gameState.stalledAbilities[uiState.extraActions.tick]];
    }
</script>

<div class="extra-action-section">
    <div class="flex justify-between items-center w-full">
        <p class="flex-grow text-center">Tick {uiState.extraActions.tick}</p>
        <button 
            class="text-[#C2BA9E] font-bold text-xl hover:text-[#968A5C]"
            on:click={() => uiState.extraActions.show = false}
        >
            ✕
        </button>
    </div>
    <div class="flex gap-2">
        {#if getAbility()}
            <img src={getAbility().icon}
                alt={getAbility().title}
            style="width: 30px; height: 30px;"
            title="{getAbility().title}"
        />
        {/if}
        {#if getStalledAbility()}
            <img src={getStalledAbility().icon}
                alt={getStalledAbility().title}
                style="width: 30px; height: 30px;"
                title="Stalled: {getStalledAbility().title}"
            />
        {/if}
    </div>
    <p>Cast {getAbility() ? getAbility().title : 'nothing'}</p>
    {#if getStalledAbility()}
        <p>Released stalled {getStalledAbility().title}</p>
    {/if}

    
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <li class="flex-grow me-2">
            <button
                on:click={() => (uiState.extraActions.tab = 'abilities')}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                class:text-[#968A5C]={uiState.extraActions.tab === 'abilities'}
            >Abilities</button>
        </li>
        <li class="flex-grow me-2">
            <button
                on:click={() => (uiState.extraActions.tab = 'gear')}
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
            settings={gameState.settings}
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
        {#each gameState.extraActionBar[uiState.extraActions.tick] || Array(EXTRA_BAR_SIZE).fill(null) as action, subIndex}
            <button
                class="ability-slot"
                style="background-color: #9da777;"
                tabindex="0"
                aria-label="Action slot"
                on:contextmenu={(e) => handleBarRightClick(e, uiState.extraActions.tick, subIndex)}
            >
                {#if action}
                    <img src={offGcdAbilities[action] ? extraActions[action].icon : action.icon}
                        alt={offGcdAbilities[action] ? extraActions[action].title : action.title}
                        style="width: 100%; height: 100%; object-fit: contain;"
                        title="{offGcdAbilities[action] ? extraActions[action].title : action.title}"
                        draggable="true"
                        on:dragstart={(e) => handleDragStartBar(e, action, uiState.extraActions.tick)}
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
</style> 