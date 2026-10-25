/** Run one job at a time; retain only the newest pending edit. */
export class LatestWorker {
    private version = 0;
    private busy = false;
    private pending: any;
    private closed = false;
    constructor(private worker: Worker, private accept: (data: any) => void,
        private fail: (error: string) => void) {
        worker.onmessage = ({data}) => {
            if (this.closed) return;
            this.busy = false;
            if (data.id === this.version) {
                if (data.error) this.fail(data.error);
                else this.accept(data);
            }
            this.sendPending();
        };
        worker.onerror = event => {
            if (this.closed) return;
            this.close();
            this.fail(event.message || 'Background calculation failed');
        };
    }
    request(payload: any) {
        if (this.closed) return;
        this.pending = {id: ++this.version, ...payload};
        this.sendPending();
    }
    private sendPending() {
        if (this.closed || this.busy || !this.pending) return;
        const next = this.pending;
        this.pending = undefined;
        this.busy = true;
        this.worker.postMessage(next);
    }
    close() {
        this.closed = true;
        this.pending = undefined;
        this.worker.terminate();
    }
}
