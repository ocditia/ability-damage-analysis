<script>
    export let abilities = {}; // Default to an empty object if no data is provided
    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';
    export let showAll = true;

    import { getStyleColor } from '$lib/utils/colors';
    import { groupAbilitiesByType } from '$lib/utils/abilityClassifier';

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

    $: grouped = groupAbilitiesByType(abilities);
    $: styleColor = getStyleColor(style);
</script>

<div class="ability-groups">
    {#each grouped as group}
        {@const filteredAbilities = group.abilities.filter(([_, abil]) => showAll || abil.common !== false)}
        {#if filteredAbilities.length > 0}
            <div class="ability-group" style="border-left: 2px solid {styleColor};">
                <span class="group-label">{group.label}</span>
                <div class="grid grid-cols-7 md:grid-cols-12 lg:grid-cols-14 gap-x-0 gap-y-1 abilities">
                    {#each filteredAbilities as [key, ability]}
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
                                style="width: 30px; height: 30px; object-fit: contain; background-color: #333; border: 1px solid {styleColor};"
                            />
                        {:else if specialCaseIcons[key]}
                            <!-- Other special cases -->
                            <img
                                src={specialCaseIcons[key]}
                                alt={ability.title || key}
                                draggable="true"
                                on:dragstart={(e) => handleDragStart(e, key)}
                                title={ability.title || key}
                                style="width: 30px; height: 30px; object-fit: contain; background-color: #333; border: 1px solid {styleColor};"
                            />
                        {:else if ability.icon}
                            <!-- Normal case with icon -->
                            <img
                                src={ability.icon}
                                alt={ability.title || key}
                                draggable="true"
                                on:dragstart={(e) => handleDragStart(e, key)}
                                title={ability.title || key}
                                style="width: 30px; height: 30px; object-fit: contain; background-color: #333; border: 1px solid {styleColor};"
                            />
                        {:else}
                            <!-- Fallback for missing icon -->
                            <div
                                style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; background-color: #444; color: white; font-size: 10px; border: 1px solid {styleColor};"
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
            </div>
        {/if}
    {/each}
</div>

<style>
    .ability-groups {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .ability-group {
        padding-left: 5px;
        display: flex;
        align-items: flex-start;
        gap: 6px;
    }

    .group-label {
        font-size: 0.6rem;
        color: rgba(255, 255, 255, 0.35);
        line-height: 30px;
        user-select: none;
        flex-shrink: 0;
        width: 8px;
        text-align: center;
    }
</style>
