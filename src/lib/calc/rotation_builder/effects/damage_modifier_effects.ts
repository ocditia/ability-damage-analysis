/**
 * Damage modifier effects that apply during the on_damage phase
 * These effects modify the final damage values in the damage list
 */

import { ABILITIES, abils, gear } from '../../const/const';
import { SETTINGS } from '../../settings';
import { DamageDistribution } from '../../types';

export interface DamageModifierContext {
    settings: Record<string, any>;
    abilityKey: ABILITIES;
}

// =============================================================================
// Vulnerability & Debuff Effects
// =============================================================================

/**
 * Apply vulnerability/curse damage multiplier
 */
export function applyVulnerabilityEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.VULNERABILITY) {
        return Math.floor(damage * 1.1);
    } else if (settings[SETTINGS.VULN] === SETTINGS.VULN_VALUES.CURSE) {
        return Math.floor(damage * 1.05);
    }

    return damage;
}

// =============================================================================
// Slayer Effects (Perks & Sigils)
// =============================================================================

/**
 * Apply undead slayer effects (perk + sigil)
 */
export function applyUndeadSlayerEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.SLAYER_PERK_UNDEAD] === true) {
        damage = Math.floor(damage * 1.07);
    }

    if (settings[SETTINGS.UNDEAD_SLAYER_ABILITY] === true) {
        damage = Math.floor(damage * 1.15);
    }

    return damage;
}

/**
 * Apply dragon slayer effects (perk + sigil)
 */
export function applyDragonSlayerEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.SLAYER_PERK_DRAGON] === true) {
        damage = Math.floor(damage * 1.07);
    }

    if (settings[SETTINGS.DRAGON_SLAYER_ABILITY] === true) {
        damage = Math.floor(damage * 1.15);
    }

    return damage;
}

/**
 * Apply demon slayer effects (perk + sigil)
 */
export function applyDemonSlayerEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.SLAYER_PERK_DEMON] === true) {
        damage = Math.floor(damage * 1.07);
    }

    if (settings[SETTINGS.DEMON_SLAYER_ABILITY] === true) {
        damage = Math.floor(damage * 1.15);
    }

    return damage;
}

/**
 * Apply all slayer effects
 */
export function applyAllSlayerEffects(
    ctx: DamageModifierContext,
    damage: number
): number {
    damage = applyUndeadSlayerEffect(ctx, damage);
    damage = applyDragonSlayerEffect(ctx, damage);
    damage = applyDemonSlayerEffect(ctx, damage);
    return damage;
}

// =============================================================================
// Aura Effects
// =============================================================================

/**
 * Apply berserker-type aura effects (maniacal, berserker, reckless)
 * Note: These only apply when NOT under an ultimate buff
 */
export function applyZerkAuraEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const damageType = abils[abilityKey]?.['damage type'];

    // Zerk auras don't stack with ultimate buffs
    if (
        settings[SETTINGS.SUNSHINE] === true ||
        settings[SETTINGS.META] === true ||
        settings[SETTINGS.DEATH_SWIFTNESS] === true ||
        settings[SETTINGS.BERSERK] === true
    ) {
        return damage;
    }

    if (
        settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.MANIACAL &&
        damageType === 'magic'
    ) {
        return Math.floor(damage * 1.1);
    } else if (
        settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.BERSERKER &&
        damageType === 'melee'
    ) {
        return Math.floor(damage * 1.1);
    } else if (
        settings[SETTINGS.AURA] === SETTINGS.AURA_VALUES.RECKLESS &&
        damageType === 'ranged'
    ) {
        return Math.floor(damage * 1.1);
    }

    return damage;
}

/**
 * Apply mahjarrat aura effect
 */
export function applyMahjarratAuraEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const damageType = abils[abilityKey]?.['damage type'];

    if (
        settings[SETTINGS.AURA] === 'mahjarrat' &&
        damageType !== 'spirit'
    ) {
        return Math.floor(damage * 1.05);
    }

    return damage;
}

// =============================================================================
// Pocket Slot Effects (Scrimshaws)
// =============================================================================

/**
 * Apply scrimshaw of elements effect (magic)
 */
export function applyElementsScrimshawEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const style = abils[abilityKey]?.['main style'];

    if (style !== 'magic') {
        return damage;
    }

    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.ELEMENTS) {
        return Math.floor(damage * 1.05);
    } else if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_ELEMENTS) {
        return Math.floor(damage * 1.0666);
    }

    return damage;
}

/**
 * Apply scrimshaw of cruelty effect (ranged)
 */
export function applyCrueltyScrimshawEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const style = abils[abilityKey]?.['main style'];

    if (style !== 'ranged') {
        return damage;
    }

    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.CRUELTY) {
        return Math.floor(damage * 1.05);
    } else if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.SUPERIOR_CRUELTY) {
        return Math.floor(damage * 1.0666);
    }

    return damage;
}

// =============================================================================
// Outfit & Equipment Effects
// =============================================================================

/**
 * Count ghost hunter pieces equipped
 */
export function countGhostHunterPieces(settings: Record<string, any>): number {
    let pieces = 0;

    if (settings[SETTINGS.HELMET] === 'ghost hunter goggles') {
        pieces += 1;
    }
    if (settings[SETTINGS.CAPE] === 'ghost hunter backpack') {
        pieces += 1;
    }
    if (settings[SETTINGS.BODY] === 'ghost hunter body') {
        pieces += 1;
    }
    if (settings[SETTINGS.LEGS] === 'ghost hunter legs') {
        pieces += 1;
    }

    return pieces;
}

/**
 * Apply ghost hunter outfit effect
 */
export function applyGhostHunterEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;
    const pieces = countGhostHunterPieces(settings);

    if (pieces === 1) {
        return Math.floor(damage * 1.03);
    } else if (pieces === 2) {
        return Math.floor(damage * 1.06);
    } else if (pieces >= 3) {
        return Math.floor(damage * 1.1);
    }

    return damage;
}

/**
 * Apply cryptbloom/croesus deathspores effect
 */
export function applyCryptbloomEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.CRYPTBLOOM] === true) {
        return Math.floor(damage * 1.1);
    }

    return damage;
}

// =============================================================================
// Necklace Effects
// =============================================================================

/**
 * Apply necklace of salamancy effect
 */
export function applySalamancyEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.NECKLACE] === 'necklace of salamancy') {
        return Math.floor(damage * 1.1);
    }

    return damage;
}

// =============================================================================
// Miscellaneous Effects
// =============================================================================

/**
 * Calculate haunted damage bonus (must be calculated before vuln is applied)
 */
export function calculateHauntedBonus(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    return Math.min(
        Math.floor(damage * 0.1),
        Math.floor(0.2 * settings[SETTINGS.HAUNTED_AD])
    );
}

/**
 * Apply haunted effect (flat damage addition)
 */
export function applyHauntedEffect(
    ctx: DamageModifierContext,
    damage: number,
    hauntedBonus: number
): number {
    const { settings } = ctx;

    if (settings[SETTINGS.HAUNTED] === true) {
        return damage + hauntedBonus;
    }

    return damage;
}

/**
 * Apply wilderness puzzlebox effect
 */
export function applyWildernessPuzzleboxEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings['wilderness puzzlebox'] > 1) {
        return Math.floor(damage * (1 + 0.03 + settings['wilderness puzzlebox']));
    }

    return damage;
}

/**
 * Apply nopenopenope (PoF spider buff) effect
 */
export function applyNopeEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    return Math.floor(damage * (1 + settings[SETTINGS.NOPE]));
}

/**
 * Apply vanquish (quest point weapon) effect
 */
export function applyVanquishEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings } = ctx;

    if (settings['two-hand weapon'] === 'vanquish') {
        return Math.floor(damage * (1 + 0.05 * settings['quest deaths']));
    }

    return damage;
}

/**
 * Apply metamorphosis effect
 */
export function applyMetamorphosisEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const damageType = abils[abilityKey]?.['damage type'];

    if (settings['meta'] === true && damageType === 'magic') {
        return Math.floor(1.66 * damage);
    }

    return damage;
}

/**
 * Apply essence corruption 25 stack bonus (flat damage)
 */
export function applyEssenceCorruptionEffect(
    ctx: DamageModifierContext,
    damage: number
): number {
    const { settings, abilityKey } = ctx;
    const damageType = abils[abilityKey]?.['damage type'];

    if (
        damageType === 'magic' &&
        settings[SETTINGS.ESSENCE_CORRUPTION] >= 25
    ) {
        return damage + settings[SETTINGS.MAGIC_LEVEL] + settings[SETTINGS.ESSENCE_CORRUPTION];
    }

    return damage;
}

/**
 * Apply hit cap (30000 max damage)
 */
export function applyHitCap(damage: number): number {
    return Math.min(damage, 30000);
}

// =============================================================================
// Combined Application Functions
// =============================================================================

/**
 * Apply all damage modifiers in the correct order
 * Returns the modified damage value
 */
export function applyAllDamageModifiers(
    ctx: DamageModifierContext,
    damage: number
): number {
    // Calculate haunted bonus before other modifiers (based on pre-modified damage)
    const hauntedBonus = calculateHauntedBonus(ctx, damage);

    // Vulnerability/curse
    damage = applyVulnerabilityEffect(ctx, damage);

    // Wilderness puzzlebox
    damage = applyWildernessPuzzleboxEffect(ctx, damage);

    // Cryptbloom
    damage = applyCryptbloomEffect(ctx, damage);

    // Slayer effects
    damage = applyAllSlayerEffects(ctx, damage);

    // Nope (spider buff)
    damage = applyNopeEffect(ctx, damage);

    // Ghost hunter
    damage = applyGhostHunterEffect(ctx, damage);

    // Vanquish
    damage = applyVanquishEffect(ctx, damage);

    // Metamorphosis
    damage = applyMetamorphosisEffect(ctx, damage);

    // Zerk auras
    damage = applyZerkAuraEffect(ctx, damage);

    // Mahjarrat aura
    damage = applyMahjarratAuraEffect(ctx, damage);

    // Scrimshaws
    damage = applyElementsScrimshawEffect(ctx, damage);
    damage = applyCrueltyScrimshawEffect(ctx, damage);

    // Haunted (flat addition)
    damage = applyHauntedEffect(ctx, damage, hauntedBonus);

    // Essence corruption (flat addition)
    damage = applyEssenceCorruptionEffect(ctx, damage);

    // Necklace of salamancy
    damage = applySalamancyEffect(ctx, damage);

    // Hit cap (must be last)
    damage = applyHitCap(damage);

    return damage;
}
