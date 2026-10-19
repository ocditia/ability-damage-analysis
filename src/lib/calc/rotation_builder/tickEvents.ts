export interface TickEvent { accuracy?: number; automaticAccuracy?: boolean; target?: string; ghraziDistance?: number; armourMultiplier?: number; malachiReset?: boolean; phase?: string; downtime?: number }
export function normalizeTickEvent(value: any): TickEvent | null {
    if (!value || typeof value !== 'object') return null;
    const result: TickEvent = {};
    if (typeof value.automaticAccuracy === 'boolean') result.automaticAccuracy = value.automaticAccuracy;
    if (typeof value.target === 'string') result.target = value.target.slice(0, 100);
    if (value.ghraziDistance != null && Number.isFinite(Number(value.ghraziDistance))) result.ghraziDistance = Math.max(0, Math.min(100, Number(value.ghraziDistance)));
    if (value.armourMultiplier != null && Number.isFinite(Number(value.armourMultiplier))) result.armourMultiplier = Math.max(.01, Math.min(100, Number(value.armourMultiplier)));

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

export function applyAccuracyEvent(settings: Record<string, any>, event: TickEvent | null | undefined) {
    if (!event) return;
    if (event.target != null) { settings['boss preset'] = event.target; delete settings._targetPhaseStats; }
    if (event.automaticAccuracy != null) settings['automatic accuracy'] = event.automaticAccuracy;
    if (event.accuracy != null) { settings['hit chance'] = event.accuracy; if (event.automaticAccuracy == null) settings['automatic accuracy'] = false; }
    if (event.ghraziDistance != null) settings['ghrazi distance'] = event.ghraziDistance;
    if (event.armourMultiplier != null) settings['target armour multiplier'] = event.armourMultiplier;
}

export function tickConditionLabel(event?: TickEvent | null): string | undefined {
    if (!event) return undefined;
    return [event.phase, event.target != null ? `Target: ${event.target}` : '',
        event.automaticAccuracy === true ? 'Automatic damage potential' : event.accuracy != null ? `Damage potential: ${event.accuracy}%` : '',
        event.ghraziDistance != null ? `Knights: ${event.ghraziDistance === 0 ? 'overlapping' : event.ghraziDistance + ' clear tiles'}` : '']
        .filter(Boolean).join(' | ') || undefined;
}
