<script>
    export let abilities = {}; // Default to an empty object if no data is provided
    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';

    function getBorderColour() {
        if (style == 'ranged') return '#00bf63';
        else if (style == 'necro') return '#d694ff';
        else if (style == 'magic') return '#94a3ff';
        else if (style == 'melee') return '#fe5c5c';
        else if (style == 'abilities') return '#FF4DB8';
        else if (style == 'gear') return '#949494'
        else return '#fff';
    }
    
    // Get a default icon path based on ability key and style
    function getDefaultIconPath(key) {
        // Convert ability name to icon filename (simplified version)
        const iconName = key.replace(/\s+/g, '').toLowerCase();
        return `/ability_icons/${style}/30x30/${iconName}.png`;
    }

    // Special case for piercing shot which we know works
    const specialCaseIcons = {
        'piercing shot': '/ability_icons/ranged/30x30/piercing.png'
    };
</script>

<div class="grid grid-cols-7 md:grid-cols-12 lg:grid-cols-14 gap-x-0 gap-y-2 abilities">
    {#each Object.entries(abilities) as [key, ability]}
        <div
            role="button"
            tabindex="0"
            aria-label={ability.title}
            on:click={(e) => handleAbilityClick(e, key)}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAbilityClick(e, key); }}
            style="display: inline-block; overflow: hidden; width: 30px; height: 30px; "
        >
        {#if key === 'piercing shot'}
            <!-- Special case for piercing shot -->
            <img
                src="/ability_icons/ranged/30x30/piercing.png"
                alt={ability.title || key}
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, key)}
                title={ability.title || key}
                style="width: 30px; height: 30px; object-fit: contain; border: 1px solid {getBorderColour()};"
            />
        {:else if specialCaseIcons[key]}
            <!-- Other special cases -->
            <img
                src={specialCaseIcons[key]}
                alt={ability.title || key}
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, key)}
                title={ability.title || key}
                style="width: 30px; height: 30px; object-fit: contain; border: 1px solid {getBorderColour()};"
            />
        {:else if ability.icon}
            <!-- Normal case with icon -->
            <img
                src={ability.icon}
                alt={ability.title || key}
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, key)}
                title={ability.title || key}
                style="width: 30px; height: 30px; object-fit: contain; border: 1px solid {getBorderColour()};"
            />
        {:else}
            <!-- Fallback for missing icon -->
            <div
                style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; background-color: #444; color: white; font-size: 10px; border: 1px solid {getBorderColour()};"
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, key)}
                title={ability.title || key}
            >
                {key.substring(0, 3)}
            </div>
        {/if}
    </div>
    {/each}
</div>
