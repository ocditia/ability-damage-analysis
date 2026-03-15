/**
 * Type definitions for ability information
 */

// Ability classification types
export type AbilityClassification = 
    'bleed' | 'dot' | 'burn' | 'channel' | 'self cast' |
    'regular' | 'multihit' | 'auto' | 'grounded' | 
    'conjure' | 'proc' | 'perk';

// Ability type categories - 'ability' is used for necro abils
export type AbilityType = 'basic' | 'threshold' | 'special attack' | 'ability' | 'spell' | 'ultimate' | 'auto'| 'conjure' | 'proc' | 'perk';

// Combat styles
export type CombatStyle = 'melee' | 'ranged' | 'magic' | 'necromancy' | 'defence' | 'poison';

// Damage types
export type DamageType = 'melee' | 'ranged' | 'magic' | 'necrotic' | 'spirit' | 'defence' | 'poison';

// Hit information for channeled abilities
export interface AbilityHits {
    [tick: number]: string[]; // tick number -> array of hit ability names
}

// Core ability information structure
export interface AbilityInfo {
    // Damage calculation properties
    'min hit': number; // minimum % of ability damage expressed as decimal (e.g., 0.3 = 30%)
    'var hit': number; // variance in damage as decimal
    'on-hit effects': boolean; // whether ability gets on-hit effects
    'crit effects': boolean; // whether ability can crit
    'damage potential effects': boolean; // whether ability is affected by damage potential
    
    // Classification properties
    'ability classification': AbilityClassification; // type of ability (bleed, channel, etc.)
    'ability type': AbilityType; // category of ability (basic, threshold, etc.)
    'main style': CombatStyle; // primary combat style
    'damage type': DamageType; // type of damage dealt
    
    // Optional properties
    hits?: AbilityHits; // for channeled abilities, defines hits per tick
    hitTimings?: number[]; // for multihit/bleeds/dots/etc, defines hit timings
    duration?: number; // ability duration in ticks (if not standard 3t)
    cooldown?: number; // ability cooldown in seconds
    adrenaline?: number; // adrenaline cost/gain - +25 means the ability costs 25 adrenaline
    
    // UI properties (if applicable)
    title?: string; // display name
    icon?: string; // icon path
    description?: string; // ability description
    
    // Special properties
    isUltimate?: boolean; // whether this is an ultimate ability
    requiresTarget?: boolean; // whether ability requires a target
    canStall?: boolean; // whether ability can be stalled
    canNull?: boolean; // whether ability can be nulled
}

// Type for the entire abilities object
export type AbilitiesObject = {
    [abilityName: string]: AbilityInfo;
};

// Utility types for specific ability categories
export type ChanneledAbility = AbilityInfo & {
    'ability classification': 'channel';
    hits: AbilityHits; // Required for channeled abilities
};

export type BleedAbility = AbilityInfo & {
    'ability classification': 'bleed';
};

export type DotAbility = AbilityInfo & {
    'ability classification': 'dot';
};

export type BurnAbility = AbilityInfo & {
    'ability classification': 'burn';
};

export type RegularAbility = AbilityInfo & {
    'ability classification': 'regular';
};

export type MultihitAbility = AbilityInfo & {
    'ability classification': 'multihit';
};

// Type guards for checking ability types
export function isChanneledAbility(ability: AbilityInfo): ability is ChanneledAbility {
    return ability['ability classification'] === 'channel';
}

export function isBleedAbility(ability: AbilityInfo): ability is BleedAbility {
    return ability['ability classification'] === 'bleed';
}

export function isDotAbility(ability: AbilityInfo): ability is DotAbility {
    return ability['ability classification'] === 'dot';
}

export function isBurnAbility(ability: AbilityInfo): ability is BurnAbility {
    return ability['ability classification'] === 'burn';
}

export function isRegularAbility(ability: AbilityInfo): ability is RegularAbility {
    return ability['ability classification'] === 'regular';
}

export function isMultihitAbility(ability: AbilityInfo): ability is MultihitAbility {
    return ability['ability classification'] === 'multihit';
}

// Utility functions for working with abilities
export function canAbilityCrit(ability: AbilityInfo): boolean {
    return ability['crit effects'];
}

export function hasOnHitEffects(ability: AbilityInfo): boolean {
    return ability['on-hit effects'];
}

export function isAffectedByDamagePotential(ability: AbilityInfo): boolean {
    return ability['damage potential effects'];
}

export function getMinHit(ability: AbilityInfo): number {
    return ability['min hit'];
}

export function getVarHit(ability: AbilityInfo): number {
    return ability['var hit'];
}

export function getAbilityStyle(ability: AbilityInfo): CombatStyle {
    return ability['main style'];
}

export function getAbilityType(ability: AbilityInfo): AbilityType {
    return ability['ability type'];
}

export function getAbilityClassification(ability: AbilityInfo): AbilityClassification {
    return ability['ability classification'];
} 