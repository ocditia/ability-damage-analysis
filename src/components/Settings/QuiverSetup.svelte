<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { equipment, getEquipment, coerceEquipmentValue } from '$lib/data/equipment';
    import { isPernixQuiver, quiverProfile, quiverProfileKey, resolveQuiverAmmo } from '$lib/calc/rotation_builder/quiver';
    let {settings, onchange=()=>{}} = $props();
    const quivers=Object.values(equipment).filter(item=>isPernixQuiver(item.id)).sort((a,b)=>a.id-b.id);
    const ammunition=Object.values(equipment).filter(item=>item.slot==='ammo' && (/arrow|bolt/i.test(item.bonuses?.style ?? '') || /arrows|bolts/i.test(item.name))).sort((a,b)=>a.title.localeCompare(b.title));
    let queries=$state(['','']);
    let flat=$derived(Object.fromEntries(Object.entries(settings).map(([key,value])=>[key,value?.value])));
    let selected=$derived(isPernixQuiver(flat[SETTINGS.RANGED_AMMO_SLOT]) ? getEquipment(flat[SETTINGS.RANGED_AMMO_SLOT]) : null);
    let profile=$derived(quiverProfile(flat));
    let activeAmmo=$derived(selected ? getEquipment(resolveQuiverAmmo({...flat})) : null);
    function updateProfile(patch) {
        settings[SETTINGS.PERNIX_QUIVERS] ??= {value:{}};
        settings[SETTINGS.PERNIX_QUIVERS].value={...settings[SETTINGS.PERNIX_QUIVERS].value,[quiverProfileKey(flat)]:{...profile,...patch}};
        onchange();
    }
    function chooseAmmo(slot, value) {
        const ammo=[...(profile.ammo ?? ['none','none'])];
        ammo[slot]=coerceEquipmentValue(value);
        updateProfile({ammo});
        queries[slot]='';
    }
    function searchAmmo(query) {
        const words=query.trim().toLowerCase().split(/\s+/);
        return ammunition.filter(item=>words.every(word=>item.title.toLowerCase().includes(word)));
    }
    function equip(value) {
        const previous=flat[SETTINGS.RANGED_AMMO_SLOT];
        settings[SETTINGS.RANGED_AMMO_SLOT].value=coerceEquipmentValue(value);
        if (settings._gearInstances?.value) settings._gearInstances.value={...settings._gearInstances.value,[SETTINGS.RANGED_AMMO_SLOT]:undefined};
        settings[SETTINGS.PERNIX_QUIVERS] ??= {value:{}};
        if (value !== 'none' && !settings[SETTINGS.PERNIX_QUIVERS].value[value]) {
            settings[SETTINGS.PERNIX_QUIVERS].value={...settings[SETTINGS.PERNIX_QUIVERS].value,[value]:{ammo:[!isPernixQuiver(previous) && ammunition.some(a=>a.id===getEquipment(previous)?.id) ? previous : 'none','none'],active:0}};
        }
        settings[SETTINGS.QUIVER].value=value !== 'none';
        queries=['',''];onchange();
    }
</script>
<details class="quiver-setup" open={!!selected}>
    <summary>Quiver setup</summary>
    <label>Pernix quiver<select value={selected?.id ?? 'none'} onchange={e=>equip(e.currentTarget.value)}><option value="none">None / loose ammunition</option>{#each quivers as quiver}<option value={quiver.id}>{quiver.title}</option>{/each}</select></label>
    {#if selected}
        <div class="quiver-title"><img src={selected.icon} alt=""/><span>{selected.title}{flat._gearInstances?.[SETTINGS.RANGED_AMMO_SLOT]?.label ? ` - ${flat._gearInstances[SETTINGS.RANGED_AMMO_SLOT].label}` : ''}</span></div>
        {#each [0,1] as slot}
            <fieldset><legend>Ammo slot {slot+1}</legend>
                <input type="search" aria-label={`Search ammo slot ${slot+1}`} placeholder="Search arrows or bolts..." bind:value={queries[slot]} />
                {#if queries[slot].trim()}
                    <div class="ammo-results" role="group" aria-label={`Ammo slot ${slot+1} search results`}>
                        {#each searchAmmo(queries[slot]) as item (item.id)}
                            <button type="button" class="ammo-result" aria-label={`Set ammo slot ${slot+1} to ${item.title}`} onclick={()=>chooseAmmo(slot,item.id)}>
                                <img src={item.icon} alt="" loading="lazy" /><span>{item.title}</span>
                            </button>
                        {:else}<p role="status">No matching arrows or bolts.</p>{/each}
                    </div>
                {/if}
                <select aria-label={`Ammo in quiver slot ${slot+1}`} value={profile.ammo?.[slot] ?? 'none'} onchange={e=>chooseAmmo(slot,e.currentTarget.value)}>
                    <option value="none">Empty</option>
                    {#each ammunition.filter(item=>item.id===getEquipment(profile.ammo?.[slot])?.id || queries[slot].toLowerCase().split(/\s+/).every(word=>item.title.toLowerCase().includes(word))) as item}<option value={item.id}>{item.title}</option>{/each}
                </select>
            </fieldset>
        {/each}
        <label>Starting slot<select value={profile.active ?? 0} onchange={e=>updateProfile({active:Number(e.currentTarget.value)})}><option value={0}>Ammo slot 1</option><option value={1}>Ammo slot 2</option></select></label>
        <p><strong>Current ammo: {activeAmmo?.title ?? 'Empty'}</strong></p>
        <p>Use the two quiver utility actions to switch ammo at a tick. Arrow/bolt combinations also switch automatically to match your weapon. Each colour and named copy keeps its own loadout.</p>
    {:else}<p>Choose a quiver to store two ammunition types, or equip one through the Ammo equipment slot.</p>{/if}
</details>
<style>
.ammo-results{display:grid;gap:4px;max-height:220px;overflow-y:auto;margin-bottom:8px}.ammo-result{display:flex;align-items:center;gap:8px;width:100%;padding:7px;text-align:left;background:#152027;border:1px solid #46565f;border-radius:4px;color:inherit;cursor:pointer}.ammo-result:hover,.ammo-result:focus-visible{background:#243743;border-color:#9bc6df}.ammo-result img{width:28px;height:28px;object-fit:contain;flex-shrink:0}
.quiver-setup{border-top:1px solid #39454e;padding:12px 0;min-width:0;font-size:12px;color:#bed0dc}summary{cursor:pointer;color:#e1d6b9;font-weight:600}label{display:grid;gap:6px;margin:12px 0}select,input{width:100%;min-width:0;background:#152027;border:1px solid #46565f;border-radius:4px;padding:7px;color:inherit;box-sizing:border-box}.quiver-title{display:flex;align-items:center;gap:9px}.quiver-title img{width:30px;height:30px;object-fit:contain}fieldset{border:1px solid #34454f;border-radius:4px;margin-top:10px;padding:9px;min-width:0}fieldset input{margin-bottom:6px}legend{padding:0 5px;color:#d5c79c}p{font-size:11px;line-height:1.5;color:#9fb3c0;margin:10px 0}
</style>
