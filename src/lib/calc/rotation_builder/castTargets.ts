import {ABILITIES, abils} from '$lib/data/abilities';
import {SETTINGS} from '../settings_rb';

// Multiple hits on one target are eligible. Existing area attacks are not.
export function isAreaAttack(key: string): boolean {
    const parent = abils[key]?.parent ?? key;
    return /ricochet|bombardment|corruption shot|crystal rain|dragon breath|corruption blast|magma tempest|tsunami|detonate|miasmic barrage/.test(parent)
        || [ABILITIES.CHAIN, ABILITIES.GREATER_CHAIN].includes(parent as ABILITIES);
}

/** Capture marked targets and Caroming when Chain is cast, then consume once. */
export function prepareChainCast(settings: Record<string,any>, key: string, tick: number, targets: number): void {
    delete settings._chainCast;
    if ([ABILITIES.CHAIN, ABILITIES.GREATER_CHAIN].includes(key as ABILITIES)) {
        const greater = key === ABILITIES.GREATER_CHAIN;
        const count = Math.min(greater ? 7 : 3, targets);
        const rank = Math.max(0, Math.min(4, Number(settings[SETTINGS.CAROMING] ?? 0)));
        const factor = (greater ? .5 : .3) + (rank > 0 ? .05 * (rank + 1) : 0);
        settings._chainManaged = true;
        settings._chainPending = count > 1 ? {targets:count, factor, expires:tick+11} : null;
        settings[SETTINGS.GREATER_CHAIN] = count > 1;
        settings._chainCast = {targets:count, factor:1};
        return;
    }
    const pending = settings._chainPending;
    if (!pending) return;
    if (tick >= pending.expires) {
        settings._chainPending = null;
        settings[SETTINGS.GREATER_CHAIN] = false;
        return;
    }
    const ability = abils[key];
    if (ability?.mainStyle !== 'magic' || isAreaAttack(key)
        || ['self cast','proc','perk'].includes(ability.abilityClassification)
        || ability.abilityType === 'proc') return;
    settings._chainCast = {...pending,
        factor:['bleed','burn','dot'].includes(ability.abilityClassification) ? 1 : pending.factor};
    settings._chainPending = null;
    settings[SETTINGS.GREATER_CHAIN] = false;
}
