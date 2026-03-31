import { ABILITIES, abils } from './abilities';
import { SETTINGS } from '$lib/calc/settings_rb';

/**
 * AOE ability data — defines how abilities interact with multiple targets.
 * Kept separate from ability definitions to avoid cluttering the main data file.
 */

export interface AOEData {
    /** Max number of targets this ability can hit */
    maxTargets: number;
    /** Whether the ability spreads to nearby targets over time (Corruption spells) */
    spreads?: boolean;
    /** Notes about the AOE behaviour */
    notes?: string;
}

export interface AOEResult {
    /** Total AOE damage (all targets combined) */
    totalDamage: number;
    /** Per-ability breakdown: ability key → { singleTarget, aoeDamage, targets } */
    breakdown: Map<string, { singleTarget: number; aoeDamage: number; targets: number }>;
}

/**
 * Post-process rotation distributionStats to compute AOE damage.
 * Takes the single-target output and multiplies each hit by its AOE factor.
 *
 * @param distributionStats - From calculateRotationDamageCore result
 * @param targetCount - Average number of targets available
 * @param mobHp - HP per mob (0 = no cap)
 * @param buffTicks - Optional buff tick data for per-tick buff checks (e.g. Threads of Fate)
 * @returns AOE damage totals
 */
export function calculateAOEDamage(
    distributionStats: any[],
    targetCount: number,
    mobHp: number = 0,
    buffTicks?: Record<string, any[]>
): AOEResult {
    let totalDamage = 0;
    const breakdown = new Map<string, { singleTarget: number; aoeDamage: number; targets: number }>();

    // Chain/Greater Chain carry-over buff tracking
    // When chain is cast, the next non-proc/perk ability gets bonus AOE hits on secondaries
    // Chain buff: tracks secondary targets, multiplier, the tick it was cast, and which ability consumed it
    let chainBuff: { secondaryTargets: number; multiplier: number; chainTick: number; consumedBy: string | null } | null = null;
    // Once consumed, remember the bonus so late DOT ticks still get it even after buff clears
    let chainConsumedBonus: { parentKey: string; secondaryTargets: number; multiplier: number } | null = null;
    // Abilities that get 100% effectiveness from chain buff instead of the normal multiplier
    const chainFullEffectAbilities = new Set([ABILITIES.COMBUST, ABILITIES.SOULFIRE]);

    // Corruption hit keys that secondary targets DON'T receive (hit 1 only hits primary)
    const corruptionFirstHits = new Set([
        ABILITIES.CORRUPTION_BLAST, ABILITIES.CORRUPTION_SHOT,
    ]);
    // Corruption DOT hits that secondary targets DO receive (hits 2-5)
    const corruptionDotHits = new Set([
        ABILITIES.CORRUPTION_BLAST_HIT_1, ABILITIES.CORRUPTION_BLAST_HIT_2,
        ABILITIES.CORRUPTION_BLAST_HIT_3, ABILITIES.CORRUPTION_BLAST_HIT_4,
        ABILITIES.CORRUPTION_BLAST_HIT_5,
        ABILITIES.CORRUPTION_SHOT_HIT_1, ABILITIES.CORRUPTION_SHOT_HIT_2,
        ABILITIES.CORRUPTION_SHOT_HIT_3, ABILITIES.CORRUPTION_SHOT_HIT_4,
        ABILITIES.CORRUPTION_SHOT_HIT_5,
    ]);

    for (const stat of distributionStats) {
        // Calculate single-target expected damage for this hit
        let expected: number;
        if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
            expected = stat.critProbability * stat.critMean + (1 - stat.critProbability) * stat.nonCritMean;
        } else {
            expected = (stat.minDamage + stat.maxDamage) / 2;
        }
        const singleHit = Math.round(expected * stat.likelihood);

        // Cap at mob HP per target if set
        const cappedHit = mobHp > 0 ? Math.min(singleHit, mobHp) : singleHit;

        // Look up AOE data — check ability key first, then parent if it has one
        const aoeData = aoeAbilities[stat.ability]
            || (abils[stat.ability]?.parent && aoeAbilities[abils[stat.ability].parent])
            || null;

        let targets: number;
        let chainBonusDmg = 0;
        const abilKey = stat.ability as string;
        const abilData = abils[abilKey];
        const abilType = abilData?.abilityType;
        const parentKey = abilData?.parent || abilKey;
        const isProc = abilType === 'proc' || abilType === 'perk';
        const hitTick = stat.tick;

        // --- Chain buff logic ---
        // Chain buff applies to the FIRST non-proc ability cast AFTER the chain tick.
        // All hits from that ability get the bonus (even DOT ticks landing later).
        // Once a second non-proc ability is cast after chain, the buff clears.

        if (chainBuff && !isProc) {
            const isChainAbility = abilKey === ABILITIES.CHAIN || abilKey === ABILITIES.GREATER_CHAIN;

            if (!isChainAbility && hitTick > chainBuff.chainTick) {
                if (chainBuff.consumedBy === null) {
                    // First non-chain ability after chain — it consumes the buff
                    chainBuff.consumedBy = parentKey;
                    const isFullEffect = chainFullEffectAbilities.has(parentKey as ABILITIES);
                    chainConsumedBonus = {
                        parentKey,
                        secondaryTargets: chainBuff.secondaryTargets,
                        multiplier: isFullEffect ? 1.0 : chainBuff.multiplier
                    };
                } else if (chainBuff.consumedBy !== parentKey) {
                    const isConsumingAbilDot = abilData?.abilityClassification === 'bleed'
                        || abilData?.abilityClassification === 'burn'
                        || abilData?.abilityClassification === 'dot';
                    if (!isConsumingAbilDot) {
                        chainBuff = null;
                    }
                }
            }
        }

        // Apply chain bonus: either from active chainBuff or from saved bonus for late DOT ticks
        if (!isProc) {
            if (chainBuff && chainBuff.consumedBy === parentKey) {
                const isFullEffect = chainFullEffectAbilities.has(parentKey as ABILITIES);
                const mult = isFullEffect ? 1.0 : chainBuff.multiplier;
                chainBonusDmg = Math.round(cappedHit * mult * chainBuff.secondaryTargets);
            } else if (chainConsumedBonus && chainConsumedBonus.parentKey === parentKey) {
                // Late DOT/burn ticks from the ability that consumed the chain buff
                chainBonusDmg = Math.round(cappedHit * chainConsumedBonus.multiplier * chainConsumedBonus.secondaryTargets);
            }
        }

        // Activate chain buff when chain/gchain is cast (also clears previous consumed bonus)
        if (abilKey === ABILITIES.CHAIN) {
            const secondaries = Math.min(targetCount, aoeAbilities[ABILITIES.CHAIN]?.maxTargets ?? 3) - 1;
            chainBuff = secondaries > 0 ? { secondaryTargets: secondaries, multiplier: 0.3, chainTick: hitTick, consumedBy: null } : null;
            chainConsumedBonus = null;
        } else if (abilKey === ABILITIES.GREATER_CHAIN) {
            const secondaries = Math.min(targetCount, aoeAbilities[ABILITIES.GREATER_CHAIN]?.maxTargets ?? 7) - 1;
            chainBuff = secondaries > 0 ? { secondaryTargets: secondaries, multiplier: 0.5, chainTick: hitTick, consumedBy: null } : null;
            chainConsumedBonus = null;
        }

        // --- Special cases ---

        // Hurricane: hit 1 is primary only, hit 2 is AOE
        // Bloodlust hurricane hit is also AOE
        if (abilKey === ABILITIES.HURRICANE_1) {
            targets = 1; // first hit only hits primary
        } else if (abilKey === ABILITIES.HURRICANE_2 || abilKey === ABILITIES.BLOODLUST_HURRICANE_HIT) {
            targets = aoeData ? Math.min(targetCount, aoeData.maxTargets) : 1;
        }
        // Corruption: initial hit is primary only, DOT hits spread to secondaries
        else if (corruptionFirstHits.has(abilKey as ABILITIES)) {
            targets = 1; // initial hit only hits primary
        } else if (corruptionDotHits.has(abilKey as ABILITIES)) {
            const corrParentKey = abilData?.parent;
            const parentAoe = corrParentKey ? aoeAbilities[corrParentKey] : null;
            targets = parentAoe ? Math.min(targetCount, parentAoe.maxTargets) : 1;
        }
        // Blood Siphon: bleed hits are AOE (not main target), final hit gets +70% of AOE bleed damage
        else if (abilKey === ABILITIES.BLOOD_SIPHON_BLEED_HIT) {
            // Bleed hits only hit secondary targets (not main)
            targets = Math.min(targetCount - 1, (aoeData?.maxTargets ?? 25) - 1);
            targets = Math.max(0, targets);
        } else if (abilKey === ABILITIES.BLOOD_SIPHON_LAST_HIT) {
            targets = 1; // final hit only hits main target (bonus added below)
        }
        // Default: simple multiplier
        else {
            targets = aoeData ? Math.min(targetCount, aoeData.maxTargets) : 1;
        }

        // Threads of Fate: if active on this tick, all abilities hit up to 5 targets
        if (buffTicks) {
            const tofActive = buffTicks[SETTINGS.THREADS_OF_FATE]?.[hitTick];
            if (tofActive && targets < Math.min(targetCount, 5)) {
                targets = Math.min(targetCount, 5);
            }
        }

        let aoeDmg = cappedHit * targets + chainBonusDmg;

        // Blood Siphon final hit bonus: +70% of total bleed AOE damage dealt
        if (abilKey === ABILITIES.BLOOD_SIPHON_LAST_HIT) {
            const bleedEntry = breakdown.get(ABILITIES.BLOOD_SIPHON_BLEED_HIT);
            if (bleedEntry) {
                aoeDmg += Math.round(bleedEntry.aoeDamage * 0.7);
            }
        }
        totalDamage += aoeDmg;

        // Accumulate per-ability breakdown (group by parent for readability)
        const breakdownKey = abils[abilKey]?.parent || abilKey;
        const existing = breakdown.get(breakdownKey);
        if (existing) {
            existing.singleTarget += singleHit;
            existing.aoeDamage += aoeDmg;
        } else {
            breakdown.set(breakdownKey, { singleTarget: singleHit, aoeDamage: aoeDmg, targets });
        }
    }

    return { totalDamage, breakdown };
}

export const aoeAbilities: Partial<Record<string, AOEData>> = {
    // =========================================================================
    // Magic
    // =========================================================================

    [ABILITIES.MAGMA_TEMPEST]: {
        maxTargets: 25,

    },
    [ABILITIES.TSUNAMI]: {
        maxTargets: 9,

    },
    [ABILITIES.DRAGON_BREATH]: {
        maxTargets: 5,

        notes: 'Line AOE',
    },
    [ABILITIES.CHAIN]: {
        maxTargets: 3,
        notes: 'Bounces to 2 secondary targets at 50% damage',
    },
    [ABILITIES.GREATER_CHAIN]: {
        maxTargets: 7,

        notes: 'Bounces to 6 secondary targets at full damage; buffs next ability on chained targets',
    },
    [ABILITIES.GLACIAL_EMBRACE_HIT]: {
        maxTargets: 9,
        notes: 'Proc from Incite Fear stacks, 12s cooldown',
    },
    [ABILITIES.MIASMIC_BARRAGE]: {
        maxTargets: 9,
    },
    [ABILITIES.CORRUPTION_BLAST]: {
        maxTargets: Infinity,

        spreads: true,
        notes: 'Spreads to nearby targets one at a time; no known cap',
    },

    // =========================================================================
    // Ranged
    // =========================================================================

    [ABILITIES.BOMBARDMENT]: {
        maxTargets: 10,

    },
    [ABILITIES.GREATER_RICOCHET]: {
        maxTargets: 7,

        notes: 'Bounces to 6 secondary targets',
    },
    [ABILITIES.RICOCHET]: {
        maxTargets: 3,

        notes: 'Bounces to 2 secondary targets',
    },
    [ABILITIES.CORRUPTION_SHOT]: {
        maxTargets: 6,

        spreads: true,
    },
    // TODO: Add DECIMATION (Locate special attack) — ability not yet in abilities.ts
    // { maxTargets: 5 }

    // TODO: Add CHINCHOMPA AOE — ability not yet in abilities.ts
    // All abilities become AOE when using chinchompa ammo. maxTargets: 9 (check — might be 10)

    // =========================================================================
    // Melee
    // =========================================================================

    [ABILITIES.HURRICANE]: {
        maxTargets: 10,

    },
    [ABILITIES.FLURRY]: {
        maxTargets: 8,

    },
    [ABILITIES.GREATER_FLURRY]: {
        maxTargets: 8,

    },
    [ABILITIES.METEOR_STRIKE]: {
        maxTargets: 9,

    },
    [ABILITIES.BLADED_DIVE]: {
        maxTargets: 9,

    },
    [ABILITIES.SWEEP]: {
        maxTargets: 9,

    },
    [ABILITIES.POWERSTAB]: {
        maxTargets: 25,

    },
    // TODO: Add SPEAR_WALL — need to confirm max targets and secondary multiplier

    // =========================================================================
    // Necromancy
    // =========================================================================

    [ABILITIES.BLOOD_SIPHON]: {
        maxTargets: 25,

    },
    [ABILITIES.SOUL_STRIKE_AOE]: {
        maxTargets: 9,

    },
    [ABILITIES.SPECTRAL_SCYTHE_1]: {
        maxTargets: 10,

    },
    [ABILITIES.SPECTRAL_SCYTHE_2]: {
        maxTargets: 26,

    },
    [ABILITIES.SPECTRAL_SCYTHE_3]: {
        maxTargets: 26,

    },
    [ABILITIES.DEATHSKULLS_7]: {
        maxTargets: 7,

        notes: 'Bounces between targets',
    },
};
