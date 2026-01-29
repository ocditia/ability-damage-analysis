import { ABILITIES } from "./const/const";

type DamageKind = 'non_crit' | 'crit';
export type CombatStyle = 'melee' | 'ranged' | 'magic' | 'necro' | 'poison';

/**
 * Input for rotation damage calculation - decoupled from stores
 */
export interface RotationInput {
    abilityBar: (string | null)[];
    extraActionBar: (any[] | null)[];
    nulledTicks: boolean[];
    stalledAbilities: (string | null)[];
}

/**
 * Optional callbacks for UI updates during calculation
 * When not provided, calculation runs in "headless" mode (no UI side effects)
 */
export interface UICallbacks {
    updateStacks?: (tick: number, key: string, value: number) => void;
    updateBuffs?: (tick: number, key: string, value: any) => void;
    updateBarLastIndex?: (index: number) => void;
    getBarSize?: () => number;
}

/**
 * Input for single ability damage calculation
 */
export interface SingleAbilityInput {
    ability: string;
    buffs?: {
        berserk?: boolean;
        sunshine?: boolean;
        blackhole?: boolean;
        deathSwiftness?: boolean;
    };
}
/**
 * Represents a uniform distribution of possible damage rolls (either critical or non-critical)
 
 */
interface DamageDistribution {
    'min hit': number;
    'var hit': number;
    'crit': boolean;
    'probability': number;
    'damage list': any[];
    'ability'?: ABILITIES;
}

/**
 * Represents a complete damage object that can contain both critical and non-critical damage distributions
 */
interface DamageObject {
    distributions: Record<DamageKind, DamageDistribution | undefined>; // A map from 'crit' to the crit distribution and 'non_crit' to the non-crit distribution
    ability: ABILITIES;
    likelihood: number; // The probability of this event occuring - for probabilistic hits (fsoa, sgb <5x5, etc.)
}

export type { DamageDistribution, DamageObject, DamageKind }; 