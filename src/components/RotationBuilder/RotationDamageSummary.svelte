<script>
import { rotationStore as rotation } from '$lib/stores/rotationStore.svelte.js';
let main = $derived(rotation.totalDamage + rotation.poisonDamage + rotation.familiarDamage + rotation.dreadnipDamage + rotation.conjureDamage);
let targets = $derived(Object.entries(rotation.secondaryDamage).sort(([a],[b]) => Number(a)-Number(b)));
let additional = $derived(targets.reduce((sum,[,damage]) => sum + Number(damage),0));
const number = value => Math.round(value).toLocaleString();
</script>
<details class="damage-overview" open>
<summary>Damage totals</summary>
<div class="totals">
<div><span>All targets</span><strong>{number(main + additional)}</strong></div>
<div><span>Main target</span><strong>{number(main)}</strong></div>
<div><span>Other targets</span><strong>{number(additional)}</strong></div>
</div>
<details class="breakdown"><summary>Per-target breakdown</summary>
<table><thead><tr><th>Target</th><th>Damage</th><th>Share</th></tr></thead><tbody>
{#each [[0,main], ...targets] as [target,damage]}
<tr><td>{Number(target) === 0 ? 'Main target' : `Target ${Number(target)+1}`}</td><td>{number(damage)}</td><td>{main + additional ? (100*Number(damage)/(main+additional)).toFixed(1) : '0.0'}%</td></tr>
{/each}
</tbody></table>
<p>Main-target total includes ability, poison, familiar, dreadnip and conjure damage. Additional targets use modeled area hits (including Locate and Meteor Strike), with the main target's defence settings. Secondary poison and independent debuffs are not simulated.</p>
</details>
</details>
<style>
.damage-overview{border:1px solid #34434c;border-radius:5px;padding:12px;margin:0 0 16px;background:#121c22;font-size:12px}summary{cursor:pointer;color:#d6ccb0;font-weight:600}.totals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:12px 0}.totals div{display:flex;flex-direction:column;gap:4px}.totals span{color:#99afbc}.totals strong{font-size:18px;color:#e0e9ed;font-variant-numeric:tabular-nums}.breakdown{border-top:1px solid #34434c;padding-top:10px}table{width:100%;border-collapse:collapse;margin-top:10px}th,td{padding:6px;text-align:right;border-bottom:1px solid #293841}th:first-child,td:first-child{text-align:left}p{font-size:11px;line-height:1.5;color:#99afbc;margin-top:10px}
</style>
