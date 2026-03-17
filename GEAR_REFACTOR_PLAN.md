# Gear System Refactor: Data-Driven Dropdowns

## Context

The rotation builder had hardcoded dropdown option lists for every gear slot in `settingsConfig`. Adding a new item required editing both `const.ts` (stats) and `settings_rb.js` (dropdown options). We also had the deathspore/ammo sync bug where per-style ammo keys weren't mapped to the generic key.

**Goal:** Data-driven gear dropdowns powered by `const.ts` armour data, filtered by active combat style. Per-style loadouts preserved for multi-style rotations.

## What was done

### Phase 0: Data Completeness — DONE
- [x] Added missing `const.ts` entries: dragon rider necklace, max cape, zorgoths soul ring, scrimshaws of cruelty
- [x] Fixed naming mismatches: hydrix bolts (e), tokhaar-kal-mor
- [x] Added ammo entries to `armour` object with `slot: 'ammo'`, `style: 'ranged'`
- [x] Note: `'xxx strength'` fields are deprecated — only `tier` matters going forward

### Phase 1: Gear Registry Module — DONE
- [x] Created `src/lib/calc/rotation_builder/gear-registry.ts`
- [x] Indexes `armour` by (slot, style) at import time
- [x] `getItemsForSlot(slot, style)` returns style-specific + hybrid items
- [x] `countSetPieces()` / `hasFullSet()` helpers for set effects
- [x] `getItemForValue()` for icon folder resolution

### Phase 2: Data-Driven Dropdowns — DONE
- [x] Added `gearSlot` property to all slot definitions in `armourSlotsByStyle` and `sharedArmourSlots`
- [x] `getSlotOptions(slot)` uses gear registry when `gearSlot` is set, falls back to static options
- [x] `getIconFolder()` resolves icon folder from item's style (hybrid → `shared/`)
- [x] Necklace, ring, cape also use data-driven dropdowns
- [x] Aura removed from equipment section (no const.ts data)

### Design Decision: Per-Style Storage Preserved
Per-style keys (`RANGED_HELMET`, `MELEE_BODY`, etc.) remain the source of truth for storage. This preserves separate loadouts per combat style, which is needed for multi-style rotations (bridding). `style_specific_unification()` continues to copy from per-style → generic at calc time.

The gear registry only controls **what appears in the dropdown** — the UI still writes to per-style keys. Adding a new gear item only requires adding it to `const.ts` with the right `slot` and `style`.

### Bug Fixes (done alongside refactor)
- [x] Ammo slot sync: `RANGED_AMMO_SLOT` → `SETTINGS.AMMO` mapping in rotation-damage-calculator.ts
- [x] Am-zi, Am-hej, Dragon rider necklace: added to settings + calc effects
- [x] Necklace effects: Am-hej boost, Am-zi min hit, Dragon rider Dragon Breath boost

## What remains (armour)

- [ ] Manual validation: test gear selection in each style tab, verify damage numbers
- [ ] Test presets still apply correctly
- [ ] Test gear swaps mid-rotation

---

## Weapon Slot Refactor

### Goal

Remove the DW/TH toggle and separate TH slot. Instead, the MH slot holds ALL weapons (main-hand + two-hand). The system infers dual-wield vs two-hand from the weapon's `'weapon type'` field in `const.ts` weapons data.

### Current state

- 3 per-style weapon slots: `RANGED_MH`, `RANGED_OH`, `RANGED_TH` (×4 styles)
- User selects DW or TH via `WEAPON_TYPE_*` settings, which toggles which slots are visible
- `style_specific_unification()` copies per-style → generic `MH`/`OH`/`TH`/`WEAPON`
- `SETTINGS.WEAPON` = `'main-hand'` (DW) or `'two-hand'` (TH), set from `WEAPON_TYPE_*`

### Desired state

- **MH slot** — contains ALL weapons (main-hand + two-hand) for the active style
- **OH slot** — off-hand weapons + shields, only active when MH weapon type is `'main-hand'`
- **TH slot removed** — two-hand weapons appear in MH dropdown
- **`SETTINGS.WEAPON`** — derived automatically from equipped MH item's `weapons[item]['weapon type']`
- **`WEAPON_TYPE_MAGE`/`WEAPON_TYPE_MELEE`/`WEAPON_TYPE_RANGED`/`WEAPON_TYPE_NECRO` removed**
- Per-style storage preserved (`RANGED_MH`, `MELEE_MH`, etc.)

### Implementation plan

#### Phase W0: Understand weapon data — DONE
- [x] Audit complete: 4 weapon types (main-hand, off-hand, two-hand, shield), 54 entries
- [x] Unified `Equipment` interface created in types.ts (replaces ArmourPiece)
- [x] `tier` renamed to `offensiveTier` for armour, weapons keep flat `tier`

#### Phase W1+W2+W3: Unified MH slot with auto-derived weapon type — DONE
- [x] UI: all weapon selections (MH + TH) write to `ws.mh` via `onWeaponSelected()`
- [x] `isWeaponTwoHand()` looks up `weapons[value]['weapon type']` from const.ts
- [x] `is2h` derived from weapon data, not from `WEAPON_TYPE_*` toggle
- [x] OH slot auto-hides when MH is two-hand (unchanged UI behavior)
- [x] `style_specific_unification()` now derives `SETTINGS.WEAPON` from MH weapon data
- [x] If two-hand: sets `SETTINGS.TH = SETTINGS.MH` for backwards compat
- [x] `WEAPON_TYPE_*` settings still set by UI for transition safety, can be removed later

#### Phase W4: Update presets & gear swaps
- [ ] Update `ARMOUR_PRESETS` weapon entries
- [ ] Update `buildGearData` weapon slot definitions
- [ ] Test gear swap mid-rotation with weapon changes

#### Phase W5: Cleanup
- [ ] Remove `*_TH` settings keys (or keep as derived/internal)
- [ ] Remove DW/TH toggle UI
- [ ] Remove `WEAPON_TYPE_*` settings

## Key Files Modified

| File | Change |
|------|--------|
| `src/lib/calc/rotation_builder/gear-registry.ts` | **NEW** — gear dropdown option generator |
| `src/lib/calc/const/const.ts` | Added missing gear entries, ammo entries in armour object |
| `src/lib/calc/settings_rb.js` | Added necklace values (am-zi, am-hej, dragon rider), generic slot configs |
| `src/components/Settings/RotationSettings.svelte` | Data-driven dropdowns via `gearSlot`, icon folder resolution |
| `src/lib/calc/rotation_builder/rotation-damage-calculator.ts` | Ammo/pocket adapter mapping |
| `src/lib/calc/rotation_builder/effects/additive_effects.ts` | Am-hej, dragon rider necklace effects |
| `src/lib/calc/rotation_builder/effects/melee_effects.ts` | Am-zi min hit effect |
| `src/lib/special/abilities.ts` | Shared gear comment cleanup |
