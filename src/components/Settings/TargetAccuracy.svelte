<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { bossPresets } from '$lib/data/bosses/boss_presets';
    import { calculateAccuracy, isGhrazi } from '$lib/calc/accuracy';
    import { style_specific_unification } from '$lib/calc/damage_calc_rb';
    import { ABILITIES } from '$lib/data/abilities';
    let {settings, onchange = () => {}, style = 'ranged'} = $props();
    let search = $state('');
    const keys = Object.keys(bossPresets).sort();
    const options = $derived(keys.filter(key => key.toLowerCase().includes(search.toLowerCase()) || key === settings[SETTINGS.BOSS_PRESET]?.value));
    let automatic = $derived(settings[SETTINGS.AUTO_ACCURACY]?.value === true && !!bossPresets[settings[SETTINGS.BOSS_PRESET]?.value]);
    let preview = $derived.by(() => {
        const flat = JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(settings).map(([key, value]) => [key, value?.value]))));
        const combatStyle = style === 'necro' ? 'necromancy' : style;
        style_specific_unification(flat, combatStyle);
        return calculateAccuracy(flat, {ranged: ABILITIES.RANGED_AUTO, melee: ABILITIES.MELEE_AUTO, magic: ABILITIES.MAGIC_AUTO, necromancy: ABILITIES.NECRO_AUTO}[combatStyle]);
    });
    function change(key, value) { settings[key].value = value; onchange(); }
</script>

<div class="target-accuracy">
    <label class="field"><span>Fighting</span><input aria-label="Find a target" placeholder="Find a target…" bind:value={search} /></label>
    <select aria-label="Accuracy target" value={settings[SETTINGS.BOSS_PRESET]?.value ?? 'none'} onchange={e => {change(SETTINGS.BOSS_PRESET, e.currentTarget.value); change(SETTINGS.AUTO_ACCURACY, true);}}>
        <option value="none">No target — enter damage potential</option>
        {#each options as key}<option value={key}>{bossPresets[key].name}</option>{/each}
    </select>
    {#if bossPresets[settings[SETTINGS.BOSS_PRESET]?.value]}
        <label class="toggle"><input type="checkbox" checked={settings[SETTINGS.AUTO_ACCURACY]?.value === true} onchange={e => change(SETTINGS.AUTO_ACCURACY, e.currentTarget.checked)} /> Calculate damage potential from target</label>
    {/if}
    {#if automatic}
        <div class="field"><span>Damage potential</span><strong>{preview.potential.toFixed(1)}%</strong></div>
        <p>Recalculates for each attack using its style, equipped weapon, combat level and prayer. Wen and Ful use the uncapped accuracy.</p>
        <details><summary>Accuracy modifiers</summary>
            <p>Combat levels include potions, before prayer. Enter additional accuracy boosts (for example 1.05 for a matching nihil). Target weakness, affinity debuffs and defence drains are not inferred.</p>
            <label class="field"><span>Additional accuracy ×</span><input type="number" min="0" max="10" step="0.01" value={settings[SETTINGS.ACCURACY_MULTIPLIER]?.value ?? 1} onchange={e => change(SETTINGS.ACCURACY_MULTIPLIER, Number(e.currentTarget.value))} /></label>
            <label class="field"><span>Affinity bonus</span><input type="number" min="0" max="10" value={settings[SETTINGS.AFFINITY_BONUS]?.value ?? 0} onchange={e => change(SETTINGS.AFFINITY_BONUS, Number(e.currentTarget.value))} /></label>
            <label class="field"><span>Defence levels drained</span><input type="number" min="0" max="200" value={settings[SETTINGS.TARGET_DEFENCE_DRAIN]?.value ?? 0} onchange={e => change(SETTINGS.TARGET_DEFENCE_DRAIN, Number(e.currentTarget.value))} /></label>
        </details>
    {:else}
        <label class="field"><span>Damage potential</span><span class="percent"><input aria-label="Damage potential" type="number" min="0" max="100" step="0.1" value={settings[SETTINGS.HIT_CHANCE]?.value ?? 100} onchange={e => change(SETTINGS.HIT_CHANCE, Number(e.currentTarget.value))} /><span>%</span></span></label>
    {/if}
    {#if isGhrazi(settings[SETTINGS.BOSS_PRESET]?.value)}
        <label class="field"><span>Distance between knights</span><select value={String(Math.min(3, settings[SETTINGS.GHRAZI_DISTANCE]?.value ?? 3))} onchange={e => change(SETTINGS.GHRAZI_DISTANCE, Number(e.currentTarget.value))}><option value="3">3+ clear tiles</option><option value="2">2 clear tiles (+30)</option><option value="1">1 clear tile (+120)</option><option value="0">Overlapping (+160)</option></select></label>
        <p>Approximate proximity scaling, calibrated from observed melee damage potential: 99% apart, 60% at 2 tiles, 34% at 1 tile, 18% overlapping. Other setups are estimates. Use manual damage potential to match an in-game reading.</p>
    {/if}
</div>

<style>
    .target-accuracy {border-top: 1px solid #354851; padding: .75rem 0; display: grid; gap: .6rem; font-size: .8rem;}
    .field {display: flex; align-items: center; justify-content: space-between; gap: .75rem;}
    input, select {background: #101e27; color: #b8dff7; border: 1px solid #4d6470; border-radius: 4px; padding: .4rem; min-width: 0; max-width: 100%;}
    .field > input {width: 7rem;} .field > select {max-width: 55%;}
    .toggle {display: flex; align-items: center; gap: .5rem;}
    p {font-size: .75rem; line-height: 1.5; margin: 0; color: #a7b8c3;}
    details > * + * {margin-top: .6rem;} summary {color: #d6bf83; cursor: pointer;}
    .percent {display: flex; align-items: center; background: #101e27; border: 1px solid #4d6470; border-radius: 4px; padding-right: .5rem;}
    .percent input {border: 0; width: 4.5rem; background: transparent;}
</style>
