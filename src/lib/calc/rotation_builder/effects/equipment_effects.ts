/**
 * Shared equipment effects that apply across combat styles
 */

import { ABILITIES, abils } from '../../const/const';
import { SETTINGS } from '../../settings';

type CombatStyle = 'magic' | 'melee' | 'ranged' | 'necromancy';

// Void armour piece definitions
const VOID_CHEST_PIECES = [
    'void knight top',
    'superior void knight top',
    'elite void knight top',
    'superior elite void knight top'
];

const VOID_LEGS_PIECES = [
    'void knight robe',
    'superior void knight robe',
    'elite void knight robe',
    'superior elite void knight robe'
];

const VOID_HANDS_PIECES = ['void knight gloves', 'superior void knight gloves'];

const VOID_SHIELD_PIECES = ['void knight deflector', 'superior void knight deflector'];

// Void helm definitions by style
const VOID_HELMS: Record<CombatStyle, { regular: string; superior: string }> = {
    magic: {
        regular: 'void knight magic helm',
        superior: 'superior void knight magic helm'
    },
    melee: {
        regular: 'void knight melee helm',
        superior: 'superior void knight melee helm'
    },
    ranged: {
        regular: 'void knight ranged helm',
        superior: 'superior void knight ranged helm'
    },
    necromancy: {
        regular: '', // Necromancy doesn't have void helm
        superior: ''
    }
};

/**
 * Count the number of void armour pieces equipped (excluding helmet)
 */
export function countVoidPieces(settings: Record<string, any>): number {
    let voidPieces = 0;

    if (VOID_CHEST_PIECES.includes(settings[SETTINGS.BODY])) {
        voidPieces += 1;
    }

    if (VOID_LEGS_PIECES.includes(settings[SETTINGS.LEGS])) {
        voidPieces += 1;
    }

    if (VOID_HANDS_PIECES.includes(settings[SETTINGS.GLOVES])) {
        voidPieces += 1;
    }

    if (
        VOID_SHIELD_PIECES.includes(settings[SETTINGS.OH]) &&
        settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.DW
    ) {
        voidPieces += 1;
    }

    return voidPieces;
}

/**
 * Get the void helm damage boost for an ability based on its combat style
 * Returns 0 if no matching void helm is equipped
 */
export function getVoidHelmBoost(settings: Record<string, any>, abilityKey: ABILITIES): number {
    const style = abils[abilityKey]?.['main style'] as CombatStyle | undefined;

    if (!style || !VOID_HELMS[style]) {
        return 0;
    }

    const helmet = settings[SETTINGS.HELMET];
    const helmConfig = VOID_HELMS[style];

    if (helmet === helmConfig.regular) {
        return 0.05;
    } else if (helmet === helmConfig.superior) {
        return 0.07;
    }

    return 0;
}

/**
 * Calculate the total void equipment damage boost
 * This includes the helm bonus (style-specific) but not the set bonus
 * TODO: Implement full void set bonus when void piece count is used
 */
export function calculateVoidBoost(settings: Record<string, any>, abilityKey: ABILITIES): number {
    // Count pieces for potential future use (set bonus)
    const _voidPieces = countVoidPieces(settings);

    // Currently only the helm provides a damage boost
    return getVoidHelmBoost(settings, abilityKey);
}
