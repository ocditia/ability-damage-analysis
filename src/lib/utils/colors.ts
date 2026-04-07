/**
 * Central colour registry — single source of truth for all colours in the app.
 *
 * Usage:
 *   TS/JS/Svelte:  import { COLORS } from '$lib/utils/colors';
 *   CSS:           var(--color-melee), var(--color-poison), etc.
 *
 * colors.css is kept in sync manually — if you add a colour here that needs
 * a CSS custom property, add the matching --color-* variable there too.
 */

// ─── Combat styles ──────────────────────────────────────────────────────────
export const STYLE_COLORS = {
    melee:      '#fe5c5c',
    ranged:     '#00bf63',
    magic:      '#94a3ff',
    necromancy: '#d694ff',
    necrotic:   '#d694ff', // alias — same as necromancy
    hybrid:     '#888888',
    unknown:    '#888888',

    // UI element categories
    abilities:  '#FF4DB8',
    gear:       '#949494',
    perks:      '#73D4DB',
    default:    '#ffffff',
} as const;

// ─── Damage source colours (poison, familiar, etc.) ─────────────────────────
export const DAMAGE_SOURCE_COLORS = {
    poison:   '#01df01',
    familiar: '#00eeee',
    conjure:  '#d694ff',
    dreadnip: '#ff8c00',
} as const;

// ─── Per-ability colour overrides (takes priority over style colour) ────────
export const ABILITY_COLORS = {
    'split soul ecb':   '#5b1db6',
    'split soul necro': '#7C3AED',
} as const;

// ─── Buff colours (rotation bar underlays) ──────────────────────────────────
export const BUFF_COLORS = {
    crit_buff:                '#FFD700',
    death_swiftness:          '#00bf63',
    sunshine:                 '#86F6FE',
    berserk:                  '#E28329',
    natural_instinct:         '#B3B3B4',
    split_soul:               '#5b1db6',
    greater_dracolich:        '#0D1EB1',
    icy_precision:            '#5AC8E1',
    balance_by_force:         '#266d63',
    instability:              '#76ffbc',
    chaos_roar:               '#ef353a',
    blackhole:                '#efbdf7',
    searing_winds:            '#ff8c00',
    shadow_imbued:            '#6a0dad',
    deathspore_buff:          '#4a7c59',
    essence_corruption_adren: '#9932CC',
    living_death:             '#4B0082',
    haunted:                  '#6B21A8',
    threads_of_fate:          '#9333EA',
    invoke_death:             '#DC2626',
    split_soul_necro:         '#7C3AED',
    meteor_strike_buff:       '#FF4500',
    vestments_regen:          '#521c18',
    rampage:                  '#410c00',
    barricade:                '#C0C0C0',
    tumekens_asphyx:          '#FFB347',
    conc_crit:                '#4682B4',
    gconc_crit:               '#2E5A88',
    conc_crit_ac:             '#6A9FD4',
    gconc_crit_ac:            '#3B7CC0',
} as const;

// ─── Stack colours (rotation bar indicators) ────────────────────────────────
export const STACK_COLORS = {
    adrenaline:           '#f5e942',
    bloodlust:            '#cc0000',
    perfect_equilibrium:  '#4cfc42',
    icy_chill:            '#03f4fc',
    bik:                  '#8CFA3A',
    deathspore:           '#4a7c59',
    necrosis:             '#8B008B',
    residual_souls:       '#00CED1',
    essence_corruption:   '#9932CC',
    death_spark:          '#FFD700',
    soul_reave:           '#7B68EE',
    blood_tithe:          '#cc0000',
    glacial_embrace:      '#5AC8E1',
    familiar_spec_points: '#ff9900',
    primordial_ice:       '#7ADAF8',
} as const;

// ─── Convenience: unified lookup for chart colours ──────────────────────────

/**
 * Get the colour for a damage breakdown entry.
 * Checks ability overrides first, then style colours.
 */
export function getDamageColour(key: string, style: string): string {
    return ABILITY_COLORS[key] ?? STYLE_COLORS[style] ?? STYLE_COLORS.unknown;
}

/**
 * Get the colour for a combat style.
 */
export function getStyleColor(style: string): string {
    return STYLE_COLORS[style] ?? STYLE_COLORS.default;
}

/**
 * Get a background colour with opacity from a style.
 */
export function getBackgroundColor(style: string, opacity: number = 0.2): string {
    const hex = getStyleColor(style);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
