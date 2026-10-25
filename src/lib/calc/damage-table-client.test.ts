import {beforeEach, afterEach, describe, it, expect, vi} from 'vitest';
vi.mock('$lib/data/perks', () => ({attachGearPerks:vi.fn()}));
vi.mock('$lib/stores/ownedItemsStore.svelte.js', () => ({ownedItemsStore:{ownedGear:new Map()}}));
import {createDamageTableClient} from './damage-table-client';
class FakeWorker {
    static instances: FakeWorker[] = [];
    onmessage: any;
    postMessage = vi.fn();
    terminate = vi.fn();
    constructor() { FakeWorker.instances.push(this); }
}
beforeEach(() => { vi.useFakeTimers(); vi.stubGlobal('window',{}); vi.stubGlobal('Worker',FakeWorker); FakeWorker.instances=[]; });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe('damage table background requests', () => {
    it('coalesces rapid changes and skips unchanged settings', () => {
        const client=createDamageTableClient(vi.fn(),vi.fn());
        client.update({level:99},['ranged'],{regular:{}});
        client.update({level:100},['ranged'],{regular:{}});
        vi.advanceTimersByTime(60);
        const worker=FakeWorker.instances[0];
        expect(worker.postMessage).toHaveBeenCalledTimes(1);
        expect(worker.postMessage.mock.calls[0][0].settings.level).toBe(100);
        client.update({level:100},['ranged'],{regular:{}});
        vi.advanceTimersByTime(60);
        expect(worker.postMessage).toHaveBeenCalledTimes(1);
        client.dispose();
    });
    it('ignores stale replies while a newer setting is pending', () => {
        const result=vi.fn(); const client=createDamageTableClient(result,vi.fn());
        client.update({level:99},['ranged'],{regular:{}});vi.advanceTimersByTime(60);
        const worker=FakeWorker.instances[0]; const first=worker.postMessage.mock.calls[0][0].id;
        client.update({level:100},['ranged'],{regular:{}});
        worker.onmessage({data:{id:first,rows:[{key:'ranged',regular:1}]}});
        expect(result).not.toHaveBeenCalled();
        vi.advanceTimersByTime(60);
        worker.onmessage({data:{id:worker.postMessage.mock.calls[1][0].id,rows:[{key:'ranged',regular:2}]}});
        expect(result).toHaveBeenCalledWith([{key:'ranged',regular:2}]);
        client.dispose();expect(worker.terminate).toHaveBeenCalledTimes(1);
    });
    it('cancels a pending request when leaving the page', () => {
        const client=createDamageTableClient(vi.fn(),vi.fn());
        client.update({},['ranged'],{regular:{}});client.dispose();vi.advanceTimersByTime(60);
        expect(FakeWorker.instances).toHaveLength(0);
    });
});
