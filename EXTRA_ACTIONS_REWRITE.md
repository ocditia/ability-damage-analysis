# Extra Actions System Rewrite

## Goal

Unify gear swaps, off-GCD abilities, prayers, consumables, and spells into a single extra actions system with a common data interface, powered by the gear registry.

## Current Problems

- Gear items stored as `{ title, icon }` objects, abilities stored differently — inconsistent
- `gearSwaps` map built as a side effect of `buildGearData()` — fragile
- Two duplicated calc handlers (`handleExtraActions` + `handleExtraActionsCore`)
- Hardcoded item lists in GearChoice — doesn't use gear registry
- No popular filter on gear swap items
- Icon resolution via regex string manipulation instead of registry lookup

## Proposed Architecture

### Unified ExtraAction interface
```typescript
interface ExtraAction {
    type: 'gear' | 'ability' | 'prayer' | 'consumable' | 'spell';
    value: string;          // item/ability key
    text: string;           // display name
    icon: string;           // icon path
    slot?: string;          // settings key to update (gear only)
    popular?: boolean;      // for filtering
}
```

### Data sources
- **Gear**: gear registry (`getItemsForSlot`) — already built
- **Abilities**: off-GCD ability definitions (Ingenuity, Limitless, etc.)
- **Prayers**: prayer definitions (Soul Split, Deflects, etc.)
- **Consumables**: adrenaline pots, vulnerability bombs, etc.
- **Spells**: auto-cast spells (Exsanguinate, Incite Fear, etc.)

### Storage
`extraActionBar[tick][idx] = ExtraAction` — uniform across all types

### Calc handler
Single `processExtraActions(settings, timers, tick, extraActionBar)` function:
- `type === 'gear'` → `settings[action.slot] = action.value`
- `type === 'ability'` → apply ability effect
- `type === 'prayer'` → update prayer setting
- `type === 'consumable'` → apply consumable effect
- `type === 'spell'` → update auto-cast

### UI Components
- **ExtraActionsPanel**: shows 12 action slots per tick + equipped gear state
- **ActionChoice**: replaces GearChoice — tabbed panel (Gear | Abilities | Prayers | Consumables)
  - Gear tab: uses gear registry with popular filter, grouped by slot
  - Other tabs: use existing ability/prayer/consumable data

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/special/abilities.ts` | Remove `buildGearData`, `gearSwaps`. Export unified action builders |
| `src/components/RotationBuilder/GearChoice.svelte` | Replace with new `ActionChoice.svelte` |
| `src/components/RotationBuilder/ExtraActionsPanel.svelte` | Refactor to use ExtraAction interface |
| `src/lib/calc/rotation_builder/rotation-damage-calculator.ts` | Consolidate two handleExtraActions into one |
| `src/lib/utils/rotationEventHandlers.js` | Update event handlers for new data format |
| `src/lib/stores/rotationStore.svelte.js` | extraActionBar stores ExtraAction objects |

## Migration

- Old saved rotations with `{ title, icon }` objects need a migration path
- Or: detect old format and convert on load
