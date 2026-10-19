import { getEquipment, equipmentMechanicId } from '$lib/data/equipment';
import { abils, ABILITIES } from '$lib/data/abilities';
import { SETTINGS } from '../../settings_rb';
import type { DamageObject } from '../../types';
import { addAdrenaline } from '../calculation_utils';

// Current Wiki bolt-effect and Bolt trigger chance tables, checked 2026-10-19.
export const boltEffects = {
    opal: { chance: .05, description: '10% extra damage' },
    pearl: { chance: .05, description: '+15% damage against water weakness; -15% against fire weakness' },
    jade: { chance: .05, description: 'Stuns for 8 ticks; no extra direct damage' },
    topaz: { chance: .05, description: 'Reduces enemy Magic and damage; no extra direct damage' },
    sapphire: { chance: .05, description: 'Drains prayer; no extra direct damage' },
    emerald: { chance: .55, description: 'Poison; requires a poisonable target' },
    ruby: { chance: .05, description: 'Adds 25% + target HP% ability damage; no cooldown' },
    diamond: { chance: .05, description: 'Perfect accuracy and up to 15% extra damage' },
    dragonstone: { chance: .05, description: '25% extra dragonfire damage unless the target is immune' },
    onyx: { chance: .10, description: '25% extra damage and healing' },
    hydrix: { chance: .10, description: '10% adrenaline and 25 ticks of Deathmark' },
};
export type Bolt = keyof typeof boltEffects;
export function equippedName(value: any): string { return getEquipment(value)?.name.toLowerCase().replace(/^augmented /, '') ?? ''; }
export function isCrossbow(settings: Record<string, any>): boolean {
    const item = getEquipment(settings[settings[SETTINGS.WEAPON] === 'two-hand' ? SETTINGS.TH : SETTINGS.MH]);
    return item?.type === 'crossbow' || /bolts?$/i.test(item?.bonuses?.style ?? '');
}
export function boltType(value: any): Bolt | undefined {
    const name = equippedName(value);
    if (!name.includes('bolts (e)')) return;
    if (name.startsWith('ascendri')) return 'hydrix';
    if (name.startsWith('dragon')) return 'dragonstone';
    return (Object.keys(boltEffects) as Bolt[]).find(key => name.includes(key));
}
export function boltChance(base: number, settings: Record<string, any>): number {
    const cape = settings[SETTINGS.RANGED_CAPE_PERK] || /^ranged (cape|master cape)/.test(equippedName(settings[SETTINGS.CAPE]));
    const night = equipmentMechanicId(settings[SETTINGS.RING]) === 63876;
    return Math.min(1, (base + (settings[SETTINGS.SEERS_ELITE] ? .02 : 0)) * (1 + (cape ? .2 : 0) + (night ? .5 : 0)));
}
export function malachiPieces(settings: Record<string, any>): number {
    if (settings[SETTINGS.WEAPON] === 'two-hand') return 0;
    return Number(equippedName(settings[SETTINGS.MH]).startsWith("malachi's tooth")) + Number(equippedName(settings[SETTINGS.OH]).startsWith("malachi's claw"));
}
export function eligibleBoltHit(settings: Record<string, any>, key: ABILITIES): boolean {
    const a = abils[key];
    return a?.mainStyle === 'ranged' && a.onHitEffects === true &&
        !['proc', 'perk', 'self cast', 'bleed', 'burn', 'dot'].includes(a.abilityClassification) && !String(key).startsWith('corruption shot') && isCrossbow(settings);
}
export function boltOutcomes(settings: Record<string, any>): {bolt: Bolt, probability: number}[] {
    const bolt = boltType(settings[SETTINGS.AMMO]);
    const chance = bolt && !(bolt === 'emerald' && settings[SETTINGS.POISON_IMMUNE]) ? boltChance(boltEffects[bolt].chance, settings) : 0;
    const result = bolt ? [{bolt, probability: chance}] : [];
    const names = [SETTINGS.HELMET, SETTINGS.BODY, SETTINGS.LEGS].map(key => equippedName(settings[key]));
    const elite = names.filter(n => n.startsWith('elite sirenic')).length;
    const normal = names.filter(n => n.startsWith('sirenic')).length;
    const count = elite >= 2 ? elite : normal;
    if (count >= 2) {
        const probability = (1 - chance) * boltChance(elite >= 2 ? .12 : .06, settings);
        const effects: Bolt[] = count >= 3 ? ['dragonstone','onyx','hydrix'] : ['dragonstone'];
        for (const effect of effects) result.push({bolt:effect, probability:probability/effects.length});
    }
    return result;
}

// Keep the no-proc and proc branches separate. Their likelihoods are consumed
// by the existing damage-distribution engine, rather than inflating every hit.
export function branchBoltHit(settings: Record<string, any>, original: DamageObject, fullAccuracy: (hit: DamageObject) => void): DamageObject[] {
    if (!eligibleBoltHit(settings, original.ability)) return [original];
    const outcomes = boltOutcomes(settings);
    const branches: DamageObject[] = [];
    for (const {bolt, probability} of outcomes) {
        const hit = structuredClone(original);
        hit.likelihood *= probability;
        if (bolt === 'diamond') fullAccuracy(hit);
        for (const d of Object.values(hit.distributions)) {
            if (!d) continue;
            if (bolt === 'ruby') d.minHit += Math.floor(d['boosted AD'] * (.25 + Math.max(0, Math.min(100, Number(settings[SETTINGS.TARGET_HP_PERCENT] ?? 100))) / 100));
            if (bolt === 'diamond') d.varHit += Math.floor((d.minHit + d.varHit) * .15);
            let multiplier = 1;
            if (bolt === 'opal') multiplier = 1.10;
            if (bolt === 'onyx') multiplier = 1.25;
            if (bolt === 'dragonstone' && !settings[SETTINGS.DRAGONFIRE_IMMUNE]) multiplier = 1.25;
            if (bolt === 'pearl') multiplier = settings[SETTINGS.BOLT_TARGET_WEAKNESS] === 'water' ? 1.15 : settings[SETTINGS.BOLT_TARGET_WEAKNESS] === 'fire' ? .85 : 1;
            d.minHit = Math.floor(d.minHit * multiplier); d.varHit = Math.floor(d.varHit * multiplier);
        }
        branches.push(hit);
    }
    original.likelihood *= Math.max(0, 1 - outcomes.reduce((sum, x) => sum + x.probability, 0));
    return [original, ...branches];
}

export function emeraldPoisonHit(settings: Record<string, any>, original: DamageObject): DamageObject | undefined {
    if (!eligibleBoltHit(settings,original.ability) || settings[SETTINGS.POISON_IMMUNE]) return;
    const p = boltOutcomes(settings).filter(x=>x.bolt==='emerald').reduce((sum,x)=>sum+x.probability,0);
    if (!p) return;
    // Wiki Poison calculator: 2-4% AD, Kwuarm and Evolving Toxin. Cinderbane
    // follow-up poison is calculated by the shared per-hit poison model.
    const base = Number(settings[SETTINGS.ABILITY_DAMAGE]) * (1+.025*Math.max(0,Math.min(4,settings[SETTINGS.KWUARM] ?? 0))) * (1+.03*(settings[SETTINGS.BIK_STACKS] ?? 0));
    const min = Math.floor(base*.02), max = Math.floor(base*.04);
    return {ability:ABILITIES.POISON_DAMAGE,likelihood:p,boltPoison:true,distributions:{non_crit:{minHit:min,varHit:max-min,crit:false,probability:1,'boosted AD':base,'damage list':Array.from({length:max-min+1},(_,i)=>min+i)},crit:undefined}} as DamageObject;
}

// Independent proc opportunities give an exact probability of at least one
// refresh in the last 25 ticks. Do not assume Deathmark has 100% uptime.
export function applyBoltResources(settings: Record<string, any>, key: ABILITIES): void {
    if (!eligibleBoltHit(settings,key) || !settings[SETTINGS.EXPECTED_ADRENALINE]) return;
    const p = boltOutcomes(settings).filter(x => x.bolt === 'hydrix').reduce((sum,x)=>sum+x.probability,0);
    if (p <= 0) return;
    addAdrenaline(settings, p * 10);
    (settings._deathmarkOpportunities ??= []).push({remaining:25, probability:p});
    settings._deathmarkProbability = 1 - settings._deathmarkOpportunities.reduce((miss,x)=>miss*(1-x.probability),1);
}
export function tickProcProbabilities(settings: Record<string, any>): void {
    for (const [listKey, probabilityKey] of [['_deathmarkOpportunities','_deathmarkProbability'],['_salvoOpportunities','_salvoProbability']]) {
        if (!settings[listKey]) continue;
        settings[listKey] = settings[listKey].map(x=>({...x,remaining:x.remaining-1})).filter(x=>x.remaining>0);
        settings[probabilityKey] = 1 - settings[listKey].reduce((miss,x)=>miss*(1-x.probability),1);
    }
}

// Expected cooldown resets cannot make a particular scheduled cast legal.
// Record their probability, and allow a tick override for a known reset.
export function finishMalachiCast(settings: Record<string, any>, key: ABILITIES, timers: Record<string, number>): void {
    const a = abils[key]; const pieces = malachiPieces(settings);
    if (!pieces || a?.mainStyle !== 'ranged' || ['self cast','proc','perk'].includes(a.abilityClassification)) return;
    const resetChance = settings._malachiResetOverride === true ? 1 : settings._malachiResetOverride === false ? 0 : .25;
    settings._malachiResetChance = resetChance;
    if (resetChance === 1) delete timers['cd_' + key];
    if (pieces !== 2) return;
    const probability = key === ABILITIES.SANGUINE_VOLLEY ? 1 : resetChance;
    (settings._salvoOpportunities ??= []).push({remaining:9,probability});
    settings._salvoProbability = 1 - settings._salvoOpportunities.reduce((miss,x)=>miss*(1-x.probability),1);
    if (probability === 1) { settings[SETTINGS.CRIMSON_SALVO] = true; timers[SETTINGS.CRIMSON_SALVO] = 9; }
}
