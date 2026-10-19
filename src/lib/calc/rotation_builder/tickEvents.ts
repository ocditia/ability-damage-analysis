export interface TickEvent { accuracy?: number; malachiReset?: boolean; phase?: string; downtime?: number }
export function normalizeTickEvent(value: any): TickEvent | null {
    if (!value || typeof value !== 'object') return null;
    const result: TickEvent = {};
    if (typeof value.malachiReset === 'boolean') result.malachiReset = value.malachiReset;
    if (value.accuracy != null && Number.isFinite(Number(value.accuracy))) result.accuracy = Math.min(100, Math.max(0, Number(value.accuracy)));
    if (typeof value.phase === 'string' && value.phase.trim()) {
        result.phase = value.phase.trim().slice(0, 80);
        result.downtime = Math.min(300, Math.max(0, Math.floor(Number(value.downtime) || 0)));
    }
    return Object.keys(result).length ? result : null;
}
export function accuracyAt(events: (TickEvent | null)[], tick: number, initial: number): number {
    for (let i = Math.min(tick, events.length - 1); i >= 0; i--) if (events[i]?.accuracy != null) return events[i]!.accuracy!;
    return initial;
}
