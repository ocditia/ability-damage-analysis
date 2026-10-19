<script>
    import { equipment, getEquipment, getEquipmentIcon, getEquipmentTitle, isAugmentable } from '$lib/data/equipment';
    import { equipmentSlots, equipmentSlotKey } from '$lib/data/equipmentSlots';
    import { ownedItemsStore, ownedItemsActions } from '$lib/stores/ownedItemsStore.svelte.js';
    import { perks, formatPerkAbbrev } from '$lib/data/perks';
    let { values = {}, instances = {}, style = 'ranged', onselect, actionLabel = 'Equip copy' } = $props();
    let slot = $state(null);
    let query = $state('');
    let candidate = $state(null);
    let copyIndex = $state(0);
    let perkKey = $state('');
    let perkRank = $state(1);
    let allStyles = $state(false);
    let currentStyle = $derived(style === 'necro' ? 'necromancy' : style);
    let matches = $derived.by(() => {
        const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
        return Object.values(equipment).filter(item => item.slot === slot && (allStyles || !item.style || item.style === 'hybrid' || item.style === currentStyle)
            && terms.every(term => item.title.toLowerCase().includes(term)))
            .sort((a,b) => Number(b.popular) - Number(a.popular) || a.title.localeCompare(b.title));
    });
    let copies = $derived(candidate ? ownedItemsStore.ownedGear.get(candidate.id) ?? [] : []);
    let copy = $derived(copies[copyIndex]);
    let validPerks = $derived(Object.entries(perks).filter(([key,p]) => p.slotType === 'any' || p.slotType === (slot === 'body' || slot === 'legs' ? 'armour' : 'weapon')));
    function openSlot(next) { slot = next; query = ''; candidate = null; perkKey = ''; }
    function choose(item) {
        candidate = item; copyIndex = 0; perkKey = '';
        if (!ownedItemsStore.ownedGear.has(item.id)) ownedItemsActions.addGearInstance(item.id, [], 'Copy 1');
    }
    function updateCopy(nextPerks = copy?.perks ?? [], label = copy?.label) {
        ownedItemsActions.updateGearInstance(candidate.id, copyIndex, nextPerks, label);
    }
    function addPerk() {
        if (!perkKey || !copy) return;
        const rank = Math.max(1, Math.min(perks[perkKey].maxRank, Number(perkRank) || 1));
        updateCopy([...copy.perks.filter(p => p.perkKey !== perkKey), {perkKey, rank}]); perkKey = ''; perkRank = 1;
    }
    function commit() {
        const key = equipmentSlotKey(style, slot);
        onselect({type: 'gear', slot: key, value: candidate.id, icon: candidate.icon,
            title: `${candidate.title} (${copy?.label || `Copy ${copyIndex + 1}`})`,
            label: copy?.label || `Copy ${copyIndex + 1}`, instanceId: copy?.instanceId,
            instanceIndex: copyIndex, perks: isAugmentable(candidate.id) ? (copy?.perks ?? []).map(p => ({...p})) : []});
        slot = null; candidate = null;
    }
</script>
<div class="equipment-editor">
    {#if !slot}
    <div class="slot-grid">
        {#each equipmentSlots as [id, label]}
            {@const key = equipmentSlotKey(style, id)}
            {@const item = getEquipment(values[key])}
            {@const instance = instances[key]}
            <button class:chosen={slot === id} class="slot" title={item?.title ?? `Choose ${label}`} onclick={() => openSlot(id)}>
                {#if item}<img src={item.icon} alt="" loading="lazy" />{:else}<span class="empty-slot">+</span>{/if}
                <span><strong>{label}</strong><small>{item?.title ?? 'None'}{instance?.label ? ` - ${instance.label}` : ''}</small></span>
            </button>
        {/each}
    </div>
    {/if}
    {#if slot}
        <section class="picker" aria-label="Choose equipment">
            <header><strong>{equipmentSlots.find(s => s[0] === slot)?.[1]}</strong><button onclick={() => slot = null} aria-label="Close equipment picker">Close</button></header>
            {#if !candidate}
                <input class="search" aria-label="Search equipment" placeholder="Search name, dye or variant..." bind:value={query} />
                <div class="picker-options"><label><input type="checkbox" bind:checked={allStyles} /> All combat styles</label><button onclick={() => { onselect({type:'gear', slot:equipmentSlotKey(style,slot), value:'none', title:'Unequip', icon:'', perks:[]}); slot=null; }}>Unequip</button></div>
                <p class="hint">{matches.length.toLocaleString()} items - showing up to 60. Search to narrow the list.</p>
                <div class="results">
                    {#each matches.slice(0,60) as item (item.id)}
                        <button class="result" onclick={() => choose(item)}><img src={item.icon} alt="" loading="lazy" /><span><strong>{item.title}</strong><small>Tier {item.tier || 'N/A'}{isAugmentable(item.id) ? ' - Augmentable' : ''}</small></span></button>
                    {:else}<p>No matching equipment in this slot.</p>{/each}
                </div>
            {:else}
                <button class="back" onclick={() => candidate = null}>Back to search</button>
                <div class="item-heading"><img src={candidate.icon} alt="" /><strong>{candidate.title}</strong></div>
                <p class="stats">Tier {candidate.tier || 'N/A'} - Accuracy {candidate.bonuses.accuracy || 0} - Armour {candidate.bonuses.armour || 0}<br />Strength: melee {candidate.bonuses.strength || 0} / ranged {candidate.bonuses.ranged || 0} / magic {candidate.bonuses.magic || 0} / necro {candidate.bonuses.necromancy || 0}</p>
                <label class="field">Item copy<select bind:value={copyIndex}>{#each copies as inst, i}<option value={i}>{inst.label || `Copy ${i+1}`} {formatPerkAbbrev(inst.perks)}</option>{/each}</select></label>
                <button onclick={() => { ownedItemsActions.addGearInstance(candidate.id, []); copyIndex = copies.length - 1; }}>+ New copy</button>
                <label class="field">Copy name<input value={copy?.label || `Copy ${copyIndex+1}`} onchange={e => updateCopy(undefined, e.currentTarget.value)} maxlength="60" /></label>
                {#if isAugmentable(candidate.id)}
                    <div class="perk-list">{#each copy?.perks ?? [] as perk, i}<div><span>{perks[perk.perkKey]?.name ?? perk.perkKey} {perk.rank}</span><button aria-label={`Remove ${perks[perk.perkKey]?.name}`} onclick={() => updateCopy(copy.perks.filter((_, n) => n !== i))}>Remove</button></div>{/each}</div>
                    <p class="hint">{copy?.perks.length ? 'These perks replace the general defaults for this item.' : 'No item perks: inherits the general perk defaults.'}</p>
                    <div class="perk-entry"><select aria-label="Perk" bind:value={perkKey}><option value="">Choose perk...</option>{#each validPerks as [key,p]}<option value={key}>{p.name}</option>{/each}</select><input aria-label="Perk rank" type="number" min="1" max={perks[perkKey]?.maxRank ?? 1} bind:value={perkRank} /><button disabled={!perkKey} onclick={addPerk}>Add</button></div>
                {:else}<p class="hint">This item cannot be augmented. General and item perks do not apply.</p>{/if}
                <button class="confirm" onclick={commit}>{actionLabel}</button>
            {/if}
        </section>
    {/if}
</div>
<style>
    .equipment-editor {width:100%; min-width:0; color:#c1d5df; font-size:12px}
    .slot-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
    button,input,select {font:inherit;color:inherit;border:1px solid #46565f;border-radius:4px;background:#111b21; padding:6px 8px;min-width:0}
    button {cursor:pointer} button:hover {border-color:#c6b27c} button:disabled {opacity:.5;cursor:default}
    .slot {display:flex;align-items:center;gap:7px;text-align:left;padding:7px;min-height:54px;background:#1c272e}
    .slot img,.empty-slot {width:28px;height:28px;object-fit:contain;flex-shrink:0}.empty-slot {display:grid;place-items:center;color:#b4a36f;font-size:22px}
    .slot span:last-child {min-width:0}.slot strong {font-size:11px;color:#a9bdc8}.slot small {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;font-size:11px;color:#e4dcc8;max-width:100%}
    .chosen {border-color:#c6b27c}.picker {margin-top:10px;border:1px solid #46565f;border-radius:5px;padding:10px;background:#151f26}
    header,.picker-options,.perk-list>div {display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}
    .search {width:100%;box-sizing:border-box;margin-bottom:9px}.hint,.stats {font-size:11px;color:#9eafb9;line-height:1.5;margin:8px 0}
    .results {max-height:290px;overflow-y:auto;display:grid;gap:4px}.result {display:flex;align-items:center;gap:9px;text-align:left}.result img,.item-heading img {width:32px;height:32px;object-fit:contain}.result small {display:block;color:#9eafb9;font-size:10px}.result strong {font-weight:500}
    .field {display:grid;gap:4px;margin:10px 0}.item-heading {display:flex;align-items:center;gap:9px;margin-top:10px}.back{margin-bottom:4px}.perk-entry {display:grid;grid-template-columns:minmax(0,1fr) 48px auto;gap:5px}.confirm{width:100%;margin-top:14px;background:#c6b27c;color:#182127;font-weight:600}.picker-options label {display:flex;align-items:center;gap:5px}
</style>
