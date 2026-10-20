import { getEquipment, coerceEquipmentValue } from '$lib/data/equipment';
import { SETTINGS } from '../settings_rb';
export const QUIVER_SLOT_1 = 'quiver ammo slot 1';
export const QUIVER_SLOT_2 = 'quiver ammo slot 2';
export function isPernixQuiver(value: unknown): boolean {
    return !!getEquipment(value)?.name.toLowerCase().startsWith("pernix's quiver");
}
export function quiverProfileKey(settings: Record<string, any>): string {
    const item = getEquipment(settings[SETTINGS.RANGED_AMMO_SLOT]);
    const copy = settings._gearInstances?.[SETTINGS.RANGED_AMMO_SLOT];
    return String(item?.id ?? 'none') + (copy?.instanceId && getEquipment(copy.itemKey)?.id === item?.id ? ':' + copy.instanceId : '');
}
export function quiverProfile(settings: Record<string, any>) {
    const profiles = settings[SETTINGS.PERNIX_QUIVERS] ?? {};
    const id = getEquipment(settings[SETTINGS.RANGED_AMMO_SLOT])?.id;
    return profiles[quiverProfileKey(settings)] ?? profiles[id] ?? {ammo:['none','none'], active:0};
}
function ammoKind(value: unknown) {
    const item = getEquipment(value);
    const style = item?.bonuses?.style ?? '';
    if (/bolt/i.test(style) || /bolts/i.test(item?.name ?? '')) return 'bolt';
    if (/arrow/i.test(style) || /arrows/i.test(item?.name ?? '')) return 'arrow';
    return '';
}
/** Resolve contents without replacing the equipped quiver or its copy identity. */
export function resolveQuiverAmmo(settings: Record<string, any>) {
    const equipped = settings[SETTINGS.RANGED_AMMO_SLOT];
    if (!isPernixQuiver(equipped)) return coerceEquipmentValue(equipped);
    const profile = quiverProfile(settings);
    const key = quiverProfileKey(settings);
    let active = settings._quiverSlots?.[key] ?? (profile.active === 1 ? 1 : 0);
    const twoHand = settings[SETTINGS.WEAPON_TYPE_RANGED] === 'two-hand';
    const weapon = getEquipment(settings[twoHand ? SETTINGS.RANGED_TH : SETTINGS.RANGED_MH]);
    const kind = weapon?.type === 'crossbow' || /bolt/i.test(weapon?.bonuses?.style ?? '') ? 'bolt'
        : weapon?.type === 'bow' || /arrow/i.test(weapon?.bonuses?.style ?? '') ? 'arrow' : '';
    const ammo = profile.ammo ?? [];
    if (kind && ammoKind(ammo[active]) !== kind && ammoKind(ammo[1-active]) === kind) active = 1-active;
    (settings._quiverSlots ??= {})[key] = active;
    return coerceEquipmentValue(ammo[active] ?? 'none');
}
export function selectQuiverSlot(settings: Record<string, any>, slot: number): boolean {
    if (!isPernixQuiver(settings[SETTINGS.RANGED_AMMO_SLOT])) return false;
    (settings._quiverSlots ??= {})[quiverProfileKey(settings)] = slot === 1 ? 1 : 0;
    settings[SETTINGS.AMMO] = resolveQuiverAmmo(settings);
    return true;
}
export function pernixBonusActive(settings: Record<string, any>): boolean {
    if (isPernixQuiver(settings[SETTINGS.RANGED_AMMO_SLOT])) return true;
    // Preserve older rotations which represented a quiver with a checkbox.
    return !Object.keys(settings[SETTINGS.PERNIX_QUIVERS] ?? {}).length && settings[SETTINGS.QUIVER] === true;
}
