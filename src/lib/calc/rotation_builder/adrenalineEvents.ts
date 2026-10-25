import { SETTINGS } from '../settings_rb';
import { maxAdrenaline } from './calculation_utils';
import type { TickEvent } from './tickEvents';

// Tick overrides are one-time assignments, before extra actions and the cast.
// Subsequent gains and costs continue from the assigned resource value.
export function prepareAdrenalineTick(settings: Record<string, any>, tick: number, event?: TickEvent | null) {
    if (event?.adrenaline != null) settings[SETTINGS.ADRENALINE] = Math.min(maxAdrenaline(settings), Math.max(0, event.adrenaline));
    if (event?.outOfCombat != null) {
        settings[SETTINGS.OUT_OF_COMBAT] = event.outOfCombat;
        delete settings._rageNextPulse;
    }
    if (settings[SETTINGS.PERSISTENT_RAGE] && settings[SETTINGS.OUT_OF_COMBAT]) {
        settings._rageNextPulse ??= tick + 2;
        if (tick >= settings._rageNextPulse) {
            settings[SETTINGS.ADRENALINE] = Math.min(maxAdrenaline(settings), settings[SETTINGS.ADRENALINE] + 5);
            settings._rageNextPulse = tick + 2;
        }
    } else delete settings._rageNextPulse;
    if (settings._crystalNextPulse != null && tick >= settings._crystalNextPulse) {
        settings[SETTINGS.ADRENALINE] = Math.min(maxAdrenaline(settings), settings[SETTINGS.ADRENALINE] + (settings[SETTINGS.WAR_BLESSING_4] ? 100 : 25));
        if (settings[SETTINGS.ADRENALINE] >= maxAdrenaline(settings)) interruptCrystalChannel(settings);
        else settings._crystalNextPulse = tick + 3;
    }

}

export function enterCombat(settings: Record<string, any>) {
    interruptCrystalChannel(settings);
    settings[SETTINGS.OUT_OF_COMBAT] = false;
    delete settings._rageNextPulse;
}

export function startCrystalChannel(settings: Record<string, any>, tick: number) {
    settings._crystalStartedTick = tick;
    settings._crystalNextPulse = tick + 1;
}

export function interruptCrystalChannel(settings: Record<string, any>) {
    delete settings._crystalStartedTick;
    delete settings._crystalNextPulse;
}
