# RS Analysis - RuneScape 3 Damage Calculator

A web-based damage analysis and rotation planning tool for RuneScape 3, deployed at rs-analysis.xyz.

## Tech Stack

- **SvelteKit 2.8** with **Svelte 5** (using Runes for reactivity)
- **Vite 5.4** build tool
- **TypeScript & JavaScript** (mixed codebase, migrating towards TS)
- **Chart.js 4.5** for damage distribution charts
- **Tailwind CSS** via CDN
- **Static Adapter** - deploys as static HTML/JS to GitHub Pages

## Commands

```bash
npm start        # Dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
npm test         # Run vitest tests
npm run lint     # Check formatting & linting
npm run format   # Auto-format code
```

## Directory Structure

```
src/
├── routes/                    # SvelteKit pages
│   ├── +page.svelte          # Homepage
│   ├── melee/                # Melee calculator (single-ability)
│   ├── ranged/               # Ranged calculator (single-ability)
│   ├── magic/                # Magic calculator (single-ability)
│   ├── necromancy/           # Necromancy calculator (single-ability)
│   └── rotation_builder/     # Main rotation builder tool
│
├── components/
│   ├── RotationBuilder/      # Rotation builder UI components
│   │   ├── RotationConfigManager.svelte  # Save/load rotations
│   │   ├── ExtraActionsPanel.svelte      # Extra actions UI
│   │   └── DamageDistributionChart.svelte
│   ├── AbilityDamageTable/   # Ability data tables
│   ├── Settings/             # Configuration panels
│   └── UI/                   # Shared UI components (Button, Popup, etc.)
│
├── lib/
│   ├── calc/                 # Core calculation engine
│   │   ├── unified-damage-calculator.ts  # Clean API for single-ability calcs
│   │   ├── damage_calc.js    # Legacy damage formulas (~74KB)
│   │   ├── settings.js       # Settings constants & SETTINGS enum (~89KB)
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── const/const.ts    # Game data - abilities, weapons, gear (~258KB)
│   │   └── rotation_builder/ # Rotation-specific calculations
│   │       ├── rotation-damage-calculator.ts  # Main rotation calc
│   │       ├── rotation_consts.ts             # Buff/stack definitions
│   │       └── rotation_damage_helper.ts      # Helper functions
│   │
│   ├── melee/abilities.js    # Melee ability definitions
│   ├── ranged/abilities.js   # Ranged ability definitions
│   ├── magic/abilities.js    # Magic ability definitions
│   ├── necromancy/abilities.js
│   ├── defence/abilities.ts
│   ├── special/abilities.ts
│   ├── */buff_abilities.js   # Buff abilities per style
│   │
│   ├── stores/               # Svelte 5 rune-based stores
│   │   ├── uiStore.svelte.js
│   │   ├── rotationStore.svelte.js
│   │   ├── settingsStore.svelte.js
│   │   └── notificationStore.svelte.js
│   │
│   ├── types/                # TypeScript type definitions
│   └── utils/
│       ├── rotationEventHandlers.js  # Centralized event handlers
│       └── update-cooldowns.js
│
└── css/                      # Global styles

static/
├── ability_icons/            # Combat ability icons by style
├── gear_icons/               # Equipment icons
└── effect_icons/             # Buff/effect icons
```

## Architecture

### Damage Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    UNIFIED DAMAGE CALCULATOR                     │
│                 (unified-damage-calculator.ts)                   │
│                                                                  │
│  calculateSingleAbilityDamage(settings, input)                  │
│    - Creates synthetic rotation of length 1                      │
│    - Applies buff flags to settings                              │
│    - Calls calculateRotationDamageCore()                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 ROTATION DAMAGE CALCULATOR                       │
│              (rotation-damage-calculator.ts)                     │
│                                                                  │
│  calculateRotationDamageCore(settings, rotation, barSize)       │
│    - Store-independent, can run "headless"                       │
│    - Processes each tick, handles channeled abilities            │
│    - Tracks buffs, stacks, and hit timings                       │
│    - Returns { regularDamage, poisonDamage, distributionStats }  │
│                                                                  │
│  calculateTotalDamage(barSize)                                   │
│    - Store-dependent wrapper for rotation builder UI             │
│    - Reads from rotationStore, writes to UI                      │
└─────────────────────────────────────────────────────────────────┘
```

### Key Data Types (src/lib/calc/types.ts)

```typescript
interface RotationInput {
  abilityBar: (string | null)[];      // Ability keys per tick
  extraActionBar: (any[] | null)[];   // Extra actions per tick
  nulledTicks: boolean[];             // Nulled/skipped ticks
  stalledAbilities: (string | null)[]; // Stalled abilities
}

interface DamageDistribution {
  'min hit': number;
  'var hit': number;
  'crit': boolean;
  'probability': number;
  'damage list': any[];
}

interface DamageObject {
  distributions: Record<'crit' | 'non_crit', DamageDistribution>;
  ability: ABILITIES;
  likelihood: number;  // For probabilistic hits (FSOA, SGB)
}

interface SingleAbilityInput {
  ability: string;
  buffs?: { berserk?: boolean; sunshine?: boolean; deathSwiftness?: boolean; };
}
```

### State Management (Svelte 5 Runes)

All stores use `$state()` runes:

- **uiStore** - UI state, tool modes, panel visibility, drag/drop state
- **rotationStore** - Ability bar, buffs, stacks, damage results, saved rotations
- **settingsStore** - Game settings (levels, gear, perks, auras)
- **notificationStore** - Toast notifications, confirmations, input prompts

### Rotation Builder Visual Layout

The rotation timeline uses CSS Grid with dynamic per-row heights:

```
[Tick numbers - inside each cell]
[Ability icons - 30x30px grid cells]
[Buff bars - colored bars below slots, positioned per-row]
[Stack indicators - icons/numbers below buff bars]
```

Key layout logic in `+page.svelte`:
- **ResizeObserver** tracks container width to calculate columns per row
- **Per-row buff indices** - buffs get compact local indices (0,1,2...) per row
- **Dynamic row heights** via `grid-template-rows` based on active buffs/stacks
- **ROW_GAP constant** provides consistent spacing between all rows

### Ability Definitions

Each ability in `abilities.js` files has:
```javascript
{
  title: 'Ability Name',
  key: 'ability_key',           // Used as identifier
  icon: '/path/to/icon.webp',
  style: 'melee|ranged|magic|necro',
  type: 'basic|threshold|ultimate|special',
  cooldown: number,             // In ticks
  duration: number,             // Channel duration in ticks
  hitTimings: [0, 1, 2],        // When hits land (required for rotation calc)
  hits: { ... },                // Hit sequence data for channeled abilities
  calc: (settings) => damage,   // Legacy single-ability calculator
}
```

### Settings System

Settings use a flat key-value structure:
```javascript
// Settings keys defined in SETTINGS enum (settings.js)
settings[SETTINGS.BERSERK] = true;
settings[SETTINGS.ABILITY_DAMAGE] = 1500;

// Adapted from UI config objects:
const adapted = Object.fromEntries(
  Object.entries(uiSettings).map(([k, v]) => [k, v.value])
);
```

## Large Files (avoid reading in full)

These files are very large data files - use targeted searches:
- `src/lib/calc/const/const.ts` (~258KB) - Complete game data, ability definitions
- `src/lib/calc/settings.js` (~89KB) - Settings constants and SETTINGS enum
- `src/lib/calc/damage_calc.js` (~74KB) - Core damage calculation formulas

## Common Patterns

### Adding damage calculation to a page
```typescript
import { calculateSingleAbilityDamage } from '$lib/calc/unified-damage-calculator';

const result = calculateSingleAbilityDamage(settings, {
  ability: 'assault',
  buffs: { berserk: true }
});
// result.expected = total damage, result.distributionStats = breakdown
```

### Accessing stores
```javascript
import { rotationStore } from '$lib/stores/rotationStore.svelte.js';
import { uiStore, uiActions } from '$lib/stores/uiStore.svelte.js';

// Read state directly
const ability = rotationStore.abilityBar[0];

// Modify via actions
uiActions.setActiveTab('ranged');
```

## Known Issues

- Build fails with "top-level await" error in settingsStore - needs refactoring
- Some abilities missing `hitTimings` property cause errors in rotation calculator
- Magic page has some abilities that error during calculation (caught gracefully)
