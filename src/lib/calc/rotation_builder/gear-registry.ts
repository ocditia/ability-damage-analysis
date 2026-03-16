/**
 * Gear Registry — single source of truth for gear dropdown options.
 * Builds indexed lookups from the armour data in const.ts so that
 * dropdown options are generated dynamically by (slot, combatStyle).
 */

import { armour } from '../const/const';
import { GearSlots } from './gear';
import type { EquipmentStyle } from '../types';

export type GearCombatStyle = 'melee' | 'ranged' | 'magic' | 'necromancy';

export interface GearItem {
    /** The string key used in settings (e.g. 'elite dracolich coif') */
    value: string;
    /** Display label for the dropdown */
    text: string;
    /** Which slot this item belongs to */
    slot: GearSlots;
    /** Item's native style */
    style: EquipmentStyle;
}

// Index: slot -> style -> GearItem[]
const slotStyleIndex: Map<string, Map<string, GearItem[]>> = new Map();

// Value -> GearItem lookup
const itemByValue: Map<string, GearItem> = new Map();

/** Convert a gear value string to a display label (title case) */
function toDisplayName(value: string): string {
    return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Build the indexes on module load
function buildIndex() {
    for (const [key, piece] of Object.entries(armour)) {
        if (!piece || typeof piece !== 'object') continue;
        const slot = (piece as any).slot as GearSlots;
        const style = (piece as any).style as EquipmentStyle;
        if (!slot || !style) continue;
        // Skip items whose slot isn't in the GearSlots enum
        if (!Object.values(GearSlots).includes(slot)) continue;

        const item: GearItem = {
            value: key,
            text: toDisplayName(key),
            slot,
            style,
        };

        // Slot -> style index
        if (!slotStyleIndex.has(slot)) {
            slotStyleIndex.set(slot, new Map());
        }
        const styleMap = slotStyleIndex.get(slot)!;
        if (!styleMap.has(style)) {
            styleMap.set(style, []);
        }
        styleMap.get(style)!.push(item);

        // Value lookup
        itemByValue.set(key, item);
    }
}

buildIndex();

/**
 * Get all gear items available for a given slot and combat style.
 * Returns items matching the style + all hybrid items for that slot.
 * Always includes a 'None' option first.
 */
export function getItemsForSlot(slot: GearSlots | string, combatStyle: GearCombatStyle): GearItem[] {
    const styleMap = slotStyleIndex.get(slot);
    if (!styleMap) return [{ value: 'none', text: 'None', slot: slot as GearSlots, style: 'hybrid' }];

    const styleItems = styleMap.get(combatStyle) ?? [];
    const hybridItems = styleMap.get('hybrid') ?? [];

    // Deduplicate by value, style-specific first
    const seen = new Set<string>();
    const result: GearItem[] = [{ value: 'none', text: 'None', slot: slot as GearSlots, style: 'hybrid' }];

    for (const item of [...styleItems, ...hybridItems]) {
        if (!seen.has(item.value)) {
            seen.add(item.value);
            result.push(item);
        }
    }

    return result;
}

/**
 * Look up a GearItem by its value string.
 */
export function getItemForValue(value: string): GearItem | undefined {
    return itemByValue.get(value);
}

/**
 * Count how many set pieces are currently equipped.
 * @param settings - flattened settings object
 * @param setValues - map of generic slot key -> expected value string
 *   e.g. { 'helmet': 'vestments of havoc hood', 'body': 'vestments of havoc top', ... }
 */
export function countSetPieces(
    settings: Record<string, any>,
    setValues: Record<string, string>
): number {
    let count = 0;
    for (const [slotKey, expectedValue] of Object.entries(setValues)) {
        if (settings[slotKey] === expectedValue) count++;
    }
    return count;
}

/**
 * Check if a full set is equipped.
 */
export function hasFullSet(
    settings: Record<string, any>,
    setValues: Record<string, string>
): boolean {
    return countSetPieces(settings, setValues) === Object.keys(setValues).length;
}
