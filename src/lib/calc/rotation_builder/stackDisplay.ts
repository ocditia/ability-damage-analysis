import {SETTINGS} from '../settings_rb';
import {WEAPONS} from '$lib/data/weapons';
import {equipmentMechanicId} from '$lib/data/equipment';

export function usesBolg(settings: Record<string, any>, extraActions: any[][] = []) {
    const isBolg = (value: any) => [WEAPONS.BOW_OF_THE_LAST_GUARDIAN, WEAPONS.BOW_OF_THE_LAST_GUARDIAN_IM]
        .includes(equipmentMechanicId(value));
    return [SETTINGS.RANGED_TH, SETTINGS.RANGED_MH, SETTINGS.TH].some(key => isBolg(settings[key]?.value))
        || extraActions.some(actions => actions?.some(action => action?.type === 'gear' && isBolg(action.value)));
}

export function showTimelineStack(key: string, tick: number, values: number[]) {
    if (!Number.isFinite(values[tick])) return false;
    return key === SETTINGS.PERFECT_EQUILIBRIUM_STACKS || tick === 0 || values[tick] !== values[tick - 1];
}
