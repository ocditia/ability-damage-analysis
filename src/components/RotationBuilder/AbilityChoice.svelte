<script>
    import { onMount } from 'svelte';
    import { groupAbilitiesByType } from '$lib/utils/abilityClassifier';
    import { getStyleColor } from '$lib/utils/colors';
    import { abilityVisibility, loadAbilityVisibility, setAbilityHidden } from '$lib/stores/abilityVisibility.svelte.js';
    import { abilityReference } from '$lib/data/abilityReference';
    let { abilities = {}, handleAbilityClick, handleDragStart, style = 'ranged', search = '' } = $props();
    let showHidden = $state(false);
    let hovered = $state(null);
    onMount(loadAbilityVisibility);
    let styleColor = $derived(getStyleColor(style === 'necro' ? 'necromancy' : style));
    let eligible = $derived(Object.entries(abilities).filter(([key, a]) => a.title && a.icon && !a.parent && !['proc', 'perk'].includes(a.abilityType) && !['skeleton warrior auto', 'vengeful ghost auto', 'putrid zombie auto', 'soul strike aoe'].includes(key)));
    let hidden = $derived(eligible.filter(([key]) => abilityVisibility.hidden.includes(key)));
    let grouped = $derived(groupAbilitiesByType(Object.fromEntries(eligible.filter(([key, a]) => !abilityVisibility.hidden.includes(key) && a.title.toLowerCase().includes(search.trim().toLowerCase())))));
    let info = $derived(hovered ? abilities[hovered] : null);
    let reference = $derived(info ? abilityReference[info.referenceName || info.title.toLowerCase()] : null);
    function choose(event, key, ability) {
        if (event.shiftKey) { setAbilityHidden(key, true, ability.title); hovered = null; return; }
        handleAbilityClick(event, key);
    }
</script>
<div class="picker-help">
    <span>Click to add / Drag to place / <strong>Shift-click to hide</strong></span>
    <button type="button" aria-expanded={showHidden} onclick={() => showHidden = !showHidden}>Hidden Abilities ({hidden.length})</button>
</div>
<div class="ability-clusters" style={`--ability-color: ${styleColor}`}>
    {#each grouped as group}
        <section class="ability-cluster" aria-label={group.title}>
            <span class="cluster-label">{group.title.replace(' Abilities', '').replace(' Attacks', '')}</span>
            <div class="cluster-icons">
                {#each group.abilities as [key, ability] (key)}
                    <button class="ability-slot" type="button" aria-label={ability.title}
                        title={`${ability.title} - Shift-click to hide`}
                        onclick={(event) => choose(event, key, ability)}
                        onmouseenter={() => hovered = key} onfocus={() => hovered = key}
                        draggable={!ability.offGcd} ondragstart={(event) => handleDragStart(event, key)}>
                        <img src={ability.icon} alt="" draggable="false" />
                    </button>
                {/each}
            </div>
        </section>
    {:else}<p class="no-abilities">No abilities match. Clear your search or restore hidden abilities below.</p>{/each}
</div>
<div class="ability-info" aria-live="polite">
    {#if info}
        <strong>{info.title}</strong>{#if info.offGcd}<span>Click to add an extra action at the selected tick (or next available tick).</span>{/if}
        <span>{reference ? `${reference.type} / Level ${reference.level} / ${reference.adrenaline} adrenaline / ${reference.cooldown}` : `${info.abilityType === 'threshold' ? 'Enhanced' : info.abilityType} / ${info.cooldown ?? 0}s cooldown`}</span>
        {#if reference}<span>Equipment: {reference.equipment}</span>{/if}
        {#if info.specialDamage}<span>Average ability damage: {info.specialDamage}</span>{/if}
        {#if info.description}<span>{info.description}</span>{/if}
        <a href={reference?.url ?? `https://runescape.wiki/w/${encodeURIComponent(info.title.replaceAll(' ', '_'))}`} target="_blank" rel="noreferrer">Ability details on the Wiki</a>
        <button type="button" onclick={() => { setAbilityHidden(hovered, true, info.title); hovered = null; }}>Hide ability</button>
    {:else}<span>Hover or focus an icon for its name, requirements and cooldown.</span>{/if}
</div>
{#if showHidden}
    <section class="hidden-panel" aria-label="Hidden Abilities">
        <strong>Hidden Abilities</strong><p>Hidden only from your picker. Existing rotations are unaffected. Click an ability to restore it.</p>
        <div class="hidden-list">{#each hidden as [key, ability]}
            <button type="button" onclick={() => setAbilityHidden(key, false, ability.title)}><img src={ability.icon} alt="" />{ability.title}<span>Unhide</span></button>
        {:else}<p>No hidden abilities in this combat style.</p>{/each}</div>
    </section>
{/if}
{#if abilityVisibility.message || !abilityVisibility.persistent}<p class="visibility-status" role="status">{abilityVisibility.message}{#if !abilityVisibility.persistent} Browser storage unavailable; changes last for this session only.{/if}</p>{/if}
<style>
    .picker-help { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; color: #aeb9c1; font-size: 12px; margin: 8px 0 10px; }
    .picker-help button { border: 1px solid #58636b; border-radius: 3px; padding: 5px 9px; color: #ded4b7; cursor: pointer; }
    .ability-clusters { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px; }
    .ability-cluster { border-left: 2px solid var(--ability-color); padding-left: 5px; }
    .cluster-label { display: block; font-size: 10px; color: #acb7c0; margin-bottom: 5px; }
    .cluster-icons { display: flex; flex-wrap: wrap; max-width: 224px; gap: 2px; }
    .ability-slot { width: 30px; height: 30px; padding: 0; background: #202528; border: 1px solid var(--ability-color); cursor: pointer; }
    .ability-slot img { width: 100%; height: 100%; object-fit: contain; }
    .ability-slot:hover, .ability-slot:focus-visible { outline: 2px solid #e4d7ad; outline-offset: 1px; }
    .ability-info { min-height: 32px; display: flex; align-items: center; flex-wrap: wrap; gap: 5px 12px; margin-top: 12px; font-size: 12px; color: #acb7c0; }
    .ability-info strong { color: #e9e5d9; } .ability-info a { color: #d8c593; text-decoration: underline; }
    .ability-info button { border: 1px solid #58636b; padding: 3px 7px; border-radius: 3px; cursor: pointer; color: #ded4b7; }
    .hidden-panel { border: 1px solid #465159; padding: 12px; border-radius: 4px; font-size: 12px; }
    .hidden-panel p { margin: 6px 0 12px; color: #acb7c0; }
    .hidden-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .hidden-list button { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border: 1px solid #48545e; border-radius: 3px; cursor: pointer; }
    .hidden-list img { width: 26px; height: 26px; } .hidden-list span { color: #d8c593; }
    .visibility-status { font-size: 11px; color: #aeb9c1; min-height: 16px; }
    .no-abilities { font-size: 13px; padding: 12px; }
</style>
