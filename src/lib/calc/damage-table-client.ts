import { attachGearPerks } from '$lib/data/perks';
import { ownedItemsStore } from '$lib/stores/ownedItemsStore.svelte.js';

/** Keep the expensive distribution calculations off the browser's UI thread. */
export function createDamageTableClient(onResult, onStatus) {
    let worker: Worker | undefined;
    let timer: ReturnType<typeof setTimeout>;
    let request = 0;
    let previous = '';
    return {
        update(settings, abilities, variants) {
            if (typeof window === 'undefined') return;
            const snapshot = JSON.parse(JSON.stringify(settings));
            if (!snapshot._gearPerks && ownedItemsStore.ownedGear.size) attachGearPerks(snapshot, ownedItemsStore.ownedGear);
            const payload = JSON.parse(JSON.stringify({settings:snapshot, abilities, variants}));
            const signature = JSON.stringify(payload);
            if (signature === previous) return;
            previous = signature;
            const id = ++request;
            clearTimeout(timer);
            onStatus(true, '');
            timer = setTimeout(() => {
                worker ??= new Worker(new URL('./damage-table.worker.ts', import.meta.url), {type:'module'});
                worker.onmessage = ({data}) => {
                    if (data.id !== request) return;
                    if (data.error) previous = '';
                    else onResult(data.rows);
                    onStatus(!!data.pending, data.error ? 'Could not calculate damage. Change a setting to retry.' : '');
                };
                worker.onerror = () => { previous = ''; worker?.terminate(); worker = undefined; onStatus(false, 'Could not start damage calculation. Change a setting to retry.'); };
                worker.postMessage({id, ...payload});
            }, 60);
        },
        dispose() { ++request; clearTimeout(timer); worker?.terminate(); }
    };
}
