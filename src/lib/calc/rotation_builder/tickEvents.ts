import {normalizeTeamDebuffs, type TeamDebuffs} from './targetDebuffs';
import { getEquipment } from '$lib/data/equipment';
import { phaseStackOptions } from './phaseStacks';
export interface TickEvent { teamDebuffs?: TeamDebuffs; targetId?: string; releaseAmmo?: number; castAmmo?: number; clearStacks?: string[]; adrenaline?: number; outOfCombat?: boolean; accuracy?: number; automaticAccuracy?: boolean; target?: string; ghraziDistance?: number; armourMultiplier?: number; malachiReset?: boolean; phase?: string; downtime?: number }
export function normalizeTickEvent(value: any): TickEvent | null {
    if (!value || typeof value !== 'object') return null;
    const result: TickEvent = {};
    const debuffs = normalizeTeamDebuffs(value.teamDebuffs);
    if (debuffs) result.teamDebuffs = debuffs;
    for (const key of ['releaseAmmo', 'castAmmo'] as const) {
        const item = getEquipment(value[key]);
        if (item?.slot === 'ammo' && /arrow|bolt/i.test(item.name + ' ' + item.bonuses?.style)) result[key] = item.id;
    }
    if (value.adrenaline != null && Number.isFinite(Number(value.adrenaline))) result.adrenaline = Math.max(0, Math.min(130, Number(value.adrenaline)));
    if (typeof value.outOfCombat === 'boolean') result.outOfCombat = value.outOfCombat;
    if (typeof value.automaticAccuracy === 'boolean') result.automaticAccuracy = value.automaticAccuracy;
    if (typeof value.target === 'string') result.target = value.target.slice(0, 100);
    if (value.ghraziDistance != null && Number.isFinite(Number(value.ghraziDistance))) result.ghraziDistance = Math.max(0, Math.min(100, Number(value.ghraziDistance)));
    if (value.armourMultiplier != null && Number.isFinite(Number(value.armourMultiplier))) result.armourMultiplier = Math.max(.01, Math.min(100, Number(value.armourMultiplier)));

    if (typeof value.malachiReset === 'boolean') result.malachiReset = value.malachiReset;
    if (value.accuracy != null && Number.isFinite(Number(value.accuracy))) result.accuracy = Math.min(100, Math.max(0, Number(value.accuracy)));
    if (typeof value.phase === 'string' && value.phase.trim()) {
        result.phase = value.phase.trim().slice(0, 80);
        if (typeof value.targetId === 'string' && value.targetId.trim()) result.targetId = value.targetId.trim().slice(0, 80);
        if (Array.isArray(value.clearStacks)) result.clearStacks = phaseStackOptions.map(([key]) => key).filter(key => value.clearStacks.includes(key));
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
    return [event.adrenaline != null ? `Set adrenaline: ${event.adrenaline}%` : '', event.outOfCombat != null ? (event.outOfCombat ? 'Outside combat' : 'In combat') : '', event.phase, event.target != null ? `Target: ${event.target}` : '',
        event.automaticAccuracy === true ? 'Automatic damage potential' : event.accuracy != null ? `Damage potential: ${event.accuracy}%` : '',
        event.ghraziDistance != null ? `Knights: ${event.ghraziDistance === 0 ? 'overlapping' : event.ghraziDistance + ' clear tiles'}` : '']
        .filter(Boolean).join(' | ') || undefined;
}
