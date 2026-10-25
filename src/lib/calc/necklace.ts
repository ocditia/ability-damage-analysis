import { getEquipment } from '$lib/data/equipment';
import { SETTINGS } from './settings_rb';

// Includes ornate and recoloured variants; broken necklaces have no passive.
function necklaceName(settings: Record<string, any>): string {
    return getEquipment(settings[SETTINGS.NECKLACE])?.name.toLowerCase() ?? '';
}
export function hasReaperPassive(settings: Record<string, any>): boolean {
    const name = necklaceName(settings);
    return !name.includes('broken') && /^(reaper necklace|essence of finality amulet)/.test(name);
}
export function hasSoulsPassive(settings: Record<string, any>): boolean {
    const name = necklaceName(settings);
    return !name.includes('broken') && /^(amulet of souls|essence of finality amulet)/.test(name);
}
export function prepareReaperStacks(settings: Record<string, any>, tick: number): void {
    if (!hasReaperPassive(settings) || tick >= (settings._reaperExpires ?? 90)) {
        settings[SETTINGS.REAPER_STACKS] = 0;
    }
}
export function gainReaperStack(settings: Record<string, any>, tick: number, weight = 1): void {
    if (!hasReaperPassive(settings)) return;
    // https://runescape.wiki/w/Reaper_Necklace_(status)
    settings[SETTINGS.REAPER_STACKS] = Math.min(30, Math.max(0, Number(settings[SETTINGS.REAPER_STACKS] ?? 0)) + weight);
    settings._reaperExpires = tick + 90;
}
