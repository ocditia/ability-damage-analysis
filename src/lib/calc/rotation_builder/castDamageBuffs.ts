import {SETTINGS} from '../settings_rb';
const keys = [SETTINGS.DEATH_SWIFTNESS, SETTINGS.SUNSHINE, SETTINGS.BERSERK, SETTINGS.BLACKHOLE];
export function damageBuffActive(settings: Record<string, any>, key: string): boolean {
    return settings._castBuffSnapshot?.damageBuffs?.[key] ?? (settings[key] === true);
}
export function captureDamageBuffs(settings: Record<string, any>): Record<string, boolean> {
    return Object.fromEntries(keys.map(key => [key, damageBuffActive(settings, key)]));
}
