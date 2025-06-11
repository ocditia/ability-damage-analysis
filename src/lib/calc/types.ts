type DamageKind = 'non_crit' | 'crit';
/**
 * Represents a uniform distribution of possible damage rolls (either critical or non-critical)
 
 */
interface DamageDistribution {
    'min hit': number;
    'var hit': number;
    'crit': boolean;
    'probability': number;
    'damage list': any[];
    'ability'?: string;
}

/**
 * Represents a complete damage object that can contain both critical and non-critical damage distributions
 */
interface DamageObject {
    distributions: Record<DamageKind, DamageDistribution | undefined>; // A map from 'crit' to the crit distribution and 'non_crit' to the non-crit distribution
    ability: string;
    likelihood: number; // The probability of this event occuring - for probabilistic hits (fsoa, sgb <5x5, etc.)
}

export type { DamageDistribution, DamageObject, DamageKind }; 