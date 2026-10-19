import { calculateSingleAbilityDamage } from './unified-damage-calculator';
let latest = 0;
const cache = new Map<string, unknown>();
self.onmessage = async ({data}) => {
    const {id, settings, abilities, variants} = data;
    latest = id;
    const key = JSON.stringify([settings, abilities, variants]);
    if (cache.has(key)) { self.postMessage({id, rows:cache.get(key)}); return; }
    try {
        const rows = [];
        for (const ability of abilities) {
            if (id !== latest) return;
            const row: Record<string, any> = {key:ability};
            for (const [column, buffs] of Object.entries(variants)) {
                row[column] = Math.round(calculateSingleAbilityDamage(settings, {ability, buffs:buffs as any}).expected);
            }
            rows.push(row);
            self.postMessage({id, rows:[row], pending:true});
            // Allow a newer request to cancel this batch between abilities.
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        if (id !== latest) return;
        if (cache.size >= 8) cache.delete(cache.keys().next().value!);
        cache.set(key, rows);
        self.postMessage({id, rows});
    } catch (error) { self.postMessage({id, error:String(error)}); }
};
