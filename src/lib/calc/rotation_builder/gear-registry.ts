/**
 * Gear Registry — single source of truth for gear dropdown options.
 * Builds indexed lookups from the armour data in const.ts so that
 * dropdown options are generated dynamically by (slot, combatStyle).
 */

import { armour, weapons } from '../const/const';
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
    /** Whether this item is commonly used */
    popular: boolean;
    /** Weapon type — only present on weapons */
    weaponType?: string;
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

function indexCollection(collection: Record<string, any>) {
    for (const [key, piece] of Object.entries(collection)) {
        if (!piece || typeof piece !== 'object') continue;
        const slot = (piece as any).slot as GearSlots;
        const style = (piece as any).style as EquipmentStyle;
        if (!slot || !style) continue;
        // Skip items whose slot isn't in the GearSlots enum
        if (!Object.values(GearSlots).includes(slot)) continue;

        const weaponType = (piece as any)['weapon type'];
        const item: GearItem = {
            value: key,
            text: toDisplayName(key),
            slot,
            style,
            popular: !!(piece as any).popular,
            ...(weaponType ? { weaponType } : {}),
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

// Build indexes on module load
indexCollection(armour);
indexCollection(weapons);

/**
 * Get all gear items available for a given slot and combat style.
 * Returns items matching the style + all hybrid items for that slot.
 * Always includes a 'None' option first.
 */
export function getItemsForSlot(slot: GearSlots | string, combatStyle: GearCombatStyle): GearItem[] {
    const styleMap = slotStyleIndex.get(slot);
    if (!styleMap) return [{ value: 'none', text: 'None', slot: slot as GearSlots, style: 'hybrid', popular: false }];

    const styleItems = styleMap.get(combatStyle) ?? [];
    const hybridItems = styleMap.get('hybrid') ?? [];

    // Deduplicate by value, style-specific first. Popular items sorted before non-popular.
    const seen = new Set<string>();
    const popular: GearItem[] = [];
    const rest: GearItem[] = [];

    for (const item of [...styleItems, ...hybridItems]) {
        if (!seen.has(item.value)) {
            seen.add(item.value);
            if (item.popular) {
                popular.push(item);
            } else {
                rest.push(item);
            }
        }
    }

    return [{ value: 'none', text: 'None', slot: slot as GearSlots, style: 'hybrid', popular: false }, ...popular, ...rest];
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
