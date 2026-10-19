<script>
    import QuiverSetup from './QuiverSetup.svelte';
    import { resolveQuiverAmmo, isPernixQuiver } from '$lib/calc/rotation_builder/quiver';
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { boltType, boltEffects, boltChance, equippedName } from '$lib/calc/rotation_builder/effects/enchanted_bolts';
    let { settings, onchange = () => {} } = $props();
    let flat = $derived(Object.fromEntries(Object.entries(settings).map(([k,v])=>[k,v.value])));
    let context = $derived({...flat, [SETTINGS.RING]:flat[SETTINGS.RANGED_RING], [SETTINGS.CAPE]:flat[SETTINGS.RANGED_CAPE]});
    let resolvedAmmo = $derived(resolveQuiverAmmo({...flat}));
    let bolt = $derived(boltType(resolvedAmmo));
    function change(key, value) { settings[key].value=value; onchange(); }
</script>
<QuiverSetup {settings} {onchange} />
<details class="ammo-effects">
    <summary>Ammunition &amp; achievement effects</summary>
    <p>Bolt effects require a main-hand crossbow. Damage uses weighted proc chances; adrenaline uses the expected-adrenaline setting.</p>
    {#each [SETTINGS.RANGED_CAPE_PERK, SETTINGS.SEERS_ELITE, SETTINGS.QUIVER, SETTINGS.DRAGONFIRE_IMMUNE, SETTINGS.POISON_IMMUNE] as key}
        {#if key !== SETTINGS.QUIVER || !isPernixQuiver(flat[SETTINGS.RANGED_AMMO_SLOT]) && !Object.keys(flat[SETTINGS.PERNIX_QUIVERS] ?? {}).length}<label class="check"><input type="checkbox" checked={settings[key]?.value} onchange={e=>change(key,e.currentTarget.checked)} />{settings[key]?.label}</label>{/if}
    {/each}
    <p>The cape perk can be worn, stored in a cape, or on the cape stand. Seers' achievements do not require wearing the headband. Nightblood activates automatically while its ring is equipped.</p>
    <label>Target elemental weakness<select value={settings[SETTINGS.BOLT_TARGET_WEAKNESS]?.value} onchange={e=>change(SETTINGS.BOLT_TARGET_WEAKNESS,e.currentTarget.value)}><option value="none">Neither</option><option value="water">Water</option><option value="fire">Fire</option></select></label>
    {#if bolt}<p class="chance"><strong>{equippedName(resolvedAmmo)}: {(boltChance(boltEffects[bolt].chance,context)*100).toFixed(1)}% per eligible hit</strong><br />{boltEffects[bolt].description}</p>{/if}
    <details><summary>All bolt activation chances</summary><div class="chances">{#each Object.entries(boltEffects) as [name,effect]}<span>{name}</span><span>{(boltChance(effect.chance,context)*100).toFixed(1)}%</span>{/each}</div></details>
    <label>Tirannwn achievement tier<select value={settings[SETTINGS.TIRANNWN_DIARY_TIER]?.value ?? 0} onchange={e=>change(SETTINGS.TIRANNWN_DIARY_TIER,Number(e.currentTarget.value))}>{#each [0,1,2,3,4] as tier}<option value={tier}>{tier === 0 ? 'None' : tier}</option>{/each}</select></label>
    <label>Achievement target<select value={settings[SETTINGS.DIARY_TARGET]?.value} onchange={e=>change(SETTINGS.DIARY_TARGET,e.currentTarget.value)}>{#each settings[SETTINGS.DIARY_TARGET]?.options ?? [] as option}<option value={option.value}>{option.text}</option>{/each}</select></label>
    <p>Tirannwn's 5% target-specific bonuses are unlocks, not a general quiver damage boost. Pernix adds 4% to the maximum hit only below 25% target health.</p>
    {#each [SETTINGS.KWUARM, SETTINGS.DARK_BURN, SETTINGS.TARGET_MAGIC_LEVEL] as key}
        <label>{settings[key]?.label}<input type="number" min="0" max={key === SETTINGS.KWUARM ? 4 : undefined} value={settings[key]?.value ?? 0} onchange={e=>change(key,Math.max(0,Number(e.currentTarget.value)))} /></label>
    {/each}
    <p>Dark Burn stores 50% of incoming damage while wearing Strykebow. Enter the stored total; Deep Burn consumes it. Incoming boss attacks are not automatically simulated.</p>
    <p>Healing, prayer drain, enemy offensive stats and stun immunity are not simulated by this damage calculator.</p>
</details>
<style>
    .ammo-effects{border-top:1px solid #39454e;padding:12px 0;color:#bed0dc;font-size:12px;min-width:0}summary{cursor:pointer;color:#e1d6b9;font-weight:600}p{font-size:11px;line-height:1.5;color:#9fb3c0;margin:10px 0}label{display:grid;gap:5px;margin:10px 0}.check{display:flex;align-items:center;gap:8px}select,input[type="number"]{max-width:100%;min-width:0;background:#152027;border:1px solid #46565f;border-radius:4px;padding:6px;color:inherit}.chances{display:grid;grid-template-columns:1fr auto;gap:5px;padding:10px 0;text-transform:capitalize}.chance{padding:8px;background:#202b32;border-radius:4px}
</style>
