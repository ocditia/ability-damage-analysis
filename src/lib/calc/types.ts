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
    'non_crit': DamageDistribution;
    'crit'?: DamageDistribution;  // Optional as not all abilities have critical effects
}

export type { DamageDistribution, DamageObject }; 