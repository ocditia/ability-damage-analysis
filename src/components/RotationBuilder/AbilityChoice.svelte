<script>
    export let abilities = {}; // Default to an empty object if no data is provided
    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';

    function getBorderColour() {
        if (style == 'ranged') return '#00bf63'
        else if (style == 'necro') return '#d694ff'
        else if (style == 'magic') return '#94a3ff'
        else return '#fe5c5c'
    }
</script>

<div class="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-x-0 gap-y-2 abilities">
    {#each Object.entries(abilities) as [key, ability]}
        <div
            role="button"
            tabindex="0"
            aria-label={ability.title}
            on:click={(e) => handleAbilityClick(e, key)}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAbilityClick(e, key); }}
            style="display: inline-block;"
        >
        <img
            src={ability.icon}
            alt={ability.title}
            draggable="true"
            on:dragstart={(e) => handleDragStart(e, key)}
            title={ability.title}
            class="ability-icon"
            width="30"
            height="30"
            style="border: 1px solid {getBorderColour()};"
        />
    </div>
    {/each}
</div>
