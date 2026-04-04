/**
 * Gear Registry — single source of truth for gear dropdown options.
 * Builds indexed lookups from the armour data in const.ts so that
 * dropdown options are generated dynamically by (slot, combatStyle).
 */

import { armour } from '$lib/data/armour'
import { weapons } from '$lib/data/weapons'
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
    /** Icon path from the data file */
    icon?: string;
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
        const icon = (piece as any).icon as string | undefined;
        const item: GearItem = {
            value: key,
            text: (piece as any).title || toDisplayName(key),
            slot,
            style,
            popular: !!(piece as any).popular,
            ...(icon ? { icon } : {}),
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
 * Count how many pieces from an armour set are currently equipped.
 * Scans all settings values for matches against the set pieces.
 */
export function countSetPieces(
    settings: Record<string, any>,
    setPieces: string[]
): number {
    const pieceSet = new Set(setPieces);
    let count = 0;
    for (const value of Object.values(settings)) {
        if (typeof value === 'string' && pieceSet.has(value)) count++;
    }
    return count;
}

/**
 * Check if a full set is equipped.
 */
export function hasFullSet(
    settings: Record<string, any>,
    setPieces: string[]
): boolean {
    return countSetPieces(settings, setPieces) === setPieces.length;
}

// ---- Settings key resolution ----
// Maps (style, genericSlot) → per-style settings key string

const STYLE_SLOT_TO_SETTINGS_KEY: Record<string, Record<string, string>> = {
    melee: {
        helmet: 'melee helmet', body: 'melee body', legs: 'melee legs',
        gloves: 'melee gloves', boots: 'melee boots', pocket: 'melee pocket',
        ring: 'melee ring', necklace: 'melee necklace', cape: 'melee cape',
        mainhand: 'melee main-hand weapon', offhand: 'melee off-hand weapon',
        ammo: 'melee ammo slot',
    },
    ranged: {
        helmet: 'ranged helmet', body: 'ranged body', legs: 'ranged legs',
        gloves: 'ranged gloves', boots: 'ranged boots', pocket: 'range pocket',
        ring: 'range ring', necklace: 'range necklace', cape: 'range cape',
        mainhand: 'ranged main-hand weapon', offhand: 'ranged off-hand weapon',
        ammo: 'ranged ammo slot',
    },
    magic: {
        helmet: 'magic helmet', body: 'magic body', legs: 'magic legs',
        gloves: 'magic gloves', boots: 'magic boots', pocket: 'mage pocket',
        ring: 'magic ring', necklace: 'magic necklace', cape: 'magic cape',
        mainhand: 'magic main-hand weapon', offhand: 'magic off-hand weapon',
        ammo: 'magic ammo slot',
    },
    necromancy: {
        helmet: 'necro helmet', body: 'necro body', legs: 'necro legs',
        gloves: 'necro gloves', boots: 'necro boots', pocket: 'necro pocket',
        ring: 'necro ring', necklace: 'necro necklace', cape: 'necro cape',
        mainhand: 'necro main-hand weapon', offhand: 'necro off-hand weapon',
        ammo: 'necro ammo slot',
    },
};

const SHARED_SLOT_KEYS: Record<string, string> = {
    necklace: 'necklace', ring: 'ring', cape: 'cape',
    pocket: 'pocket', ammo: 'ammo',
};

/**
 * Get the settings key for a gear item — the key that gets written to settings
 * when this item is equipped (e.g., 'ranged helmet', 'necklace', 'melee main-hand weapon').
 * @param value - The item key
 * @param combatStyle - Optional combat style for hybrid items (e.g. 'ranged', 'melee')
 */
export function getSettingsKeyForItem(value: string, combatStyle?: string): string | undefined {
    const item = itemByValue.get(value);
    if (!item) return undefined;

    // Hybrid items: use style-specific key if combat style is provided
    if (item.style === 'hybrid' && combatStyle) {
        const styleMap = STYLE_SLOT_TO_SETTINGS_KEY[combatStyle];
        if (styleMap?.[item.slot]) return styleMap[item.slot];
    }

    // Shared/hybrid slots without combat style context use the shared key
    if (item.style === 'hybrid' && SHARED_SLOT_KEYS[item.slot]) {
        return SHARED_SLOT_KEYS[item.slot];
    }

    // Style-specific: look up by item's style + slot
    const styleMap = STYLE_SLOT_TO_SETTINGS_KEY[item.style];
    if (styleMap?.[item.slot]) return styleMap[item.slot];

    // Fallback for hybrid items in style-specific slots (e.g., hybrid pocket)
    // Use the shared key if available
    if (SHARED_SLOT_KEYS[item.slot]) return SHARED_SLOT_KEYS[item.slot];

    return undefined;
}
