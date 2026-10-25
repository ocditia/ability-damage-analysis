import { it, expect, vi } from 'vitest';
import { LatestWorker } from './latestWorker';
function setup() {
 const worker = {postMessage: vi.fn(),terminate: vi.fn(),onmessage: null as any,onerror: null as any};
 const accept=vi.fn(), fail=vi.fn();
 const queue = new LatestWorker(worker as any,accept,fail);
 return {worker,accept,fail,queue};
}
it('runs only the latest queued edit and ignores stale results',()=>{
 const {worker,accept,queue}=setup();
 queue.request({value:1});queue.request({value:2});queue.request({value:3});
 expect(worker.postMessage).toHaveBeenCalledTimes(1);
 worker.onmessage({data:{id:1,result:'old'}});
 expect(accept).not.toHaveBeenCalled();
 expect(worker.postMessage).toHaveBeenLastCalledWith({id:3,value:3});
 worker.onmessage({data:{id:3,result:'new'}});
 expect(accept).toHaveBeenCalledOnce();
 expect(accept).toHaveBeenCalledWith({id:3,result:'new'});
});
it('ignores old errors, reports the current error, and terminates on disposal',()=>{
 const {worker,accept,fail,queue}=setup();
 queue.request({});queue.request({});
 worker.onmessage({data:{id:1,error:'obsolete'}});
 expect(fail).not.toHaveBeenCalled();
 worker.onmessage({data:{id:2,error:'current'}});
 expect(fail).toHaveBeenCalledWith('current');
 queue.close();
 worker.onmessage({data:{id:2,result:'late'}});
 expect(accept).not.toHaveBeenCalled();
 expect(worker.terminate).toHaveBeenCalledOnce();
});
