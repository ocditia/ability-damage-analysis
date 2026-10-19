import { SETTINGS } from './settings_rb';
import { ABILITIES, abils } from '$lib/data/abilities';
import { ARMOUR } from '$lib/data/armour';
import { getEquipment, isCustomEquipment } from '$lib/data/equipment';
import { bossPresets, getBossPresetWithEnrage } from '$lib/data/bosses/boss_presets';
import { prayers } from '$lib/data/prayers';

// https://runescape.wiki/w/Hit_chance (PvM damage potential).
export const levelAccuracy = (level: number) => Math.floor(level ** 3 / 1250 + 4 * level + 40);
export const npcArmour = (tier: number) => tier >= 100 ? tier : tier <= 0 ? 0 : Math.round(.002 * tier ** 3 + 10 * tier + 100);
export const isGhrazi = (key: string) => ['Lady Karmina Ghrazi', 'Lord Vasily Ghrazi'].includes(key);
// Empirical calibration from Saltea's same-loadout melee observations on 2026-10-19:
// upgraded Lengs, Vestments, Malevolence, elder overload; 99% at range,
// 60% at 2 tiles (+30), 34% at 1 tile (+120), 18% overlapping (+160).
// These rounded readings estimate an effective armour multiplier, not the game's
// unverified buff formula. Apply before the cap and before flat Wen hit chance.
export function ghraziArmourMultiplier(distance: number): number {
    if (distance <= 0) return 99 / 18;
    if (distance <= 1) return 99 / 34;
    if (distance <= 2) return 99 / 60;
    return 1;
}
export function wenEligible(key: string): boolean {
    return key !== ABILITIES.BOLG_PROC && abils[key]?.mainStyle === 'ranged'
        && ['threshold', 'ultimate', 'special attack'].includes(abils[key]?.abilityType);
}

export function calculateAccuracy(settings: Record<string, any>, ability: string) {
    const manual = Math.max(0, Math.min(100, Number(settings[SETTINGS.HIT_CHANCE] ?? 100)));
    const key = settings[SETTINGS.BOSS_PRESET];
    const preset = bossPresets[key];
    if (settings[SETTINGS.AUTO_ACCURACY] !== true || !preset)
        return {potential: manual, uncapped: manual, automatic: false, accuracy: 0, armour: 0};
    const boss = {...getBossPresetWithEnrage(key, Number(settings[SETTINGS.BOSS_ENRAGE] ?? 0)), ...settings._targetPhaseStats};
    const style = abils[ability]?.mainStyle ?? 'ranged';
    const levelKey = {ranged: SETTINGS.RANGED_LEVEL, magic: SETTINGS.MAGIC_LEVEL, melee: SETTINGS.ATTACK_LEVEL, necromancy: SETTINGS.NECROMANCY_LEVEL}[style];
    const prayer = settings[SETTINGS.PRAYER] ?? settings[`${style === 'necromancy' ? 'necro' : style} prayer`];
    const prayerMatches = prayers[prayer]?.style === style;
    const prayerLevels = prayerMatches ? ({malevolence: 12, affliction: 12, desolation: 12, ruination: 12,
        turmoil: 10, torment: 10, anguish: 10, sorrow: 10,
        piety: 8, augury: 8, rigour: 8, sanctity: 8, chivalry: 6}[prayer] ?? 0) : 0;
    const twoHand = settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES.TH;
    const weapon = getEquipment(settings[twoHand ? SETTINGS.TH : SETTINGS.MH]);
    const customTier = Number(settings[twoHand ? SETTINGS.TH_TIER_CUSTOM : SETTINGS.MH_TIER_CUSTOM] ?? 0);
    const tier = isCustomEquipment(weapon?.id) ? customTier : Number(weapon?.tier ?? 0);
    const weaponAccuracy = !isCustomEquipment(weapon?.id) && weapon?.bonuses.accuracy
        ? Number(weapon.bonuses.accuracy) : tier > 0 ? Math.floor(2.5 * (tier ** 3 / 1250 + 4 * tier + 40)) : 0;
    let penalty = 0;
    for (const slot of [SETTINGS.HELMET, SETTINGS.BODY, SETTINGS.LEGS, SETTINGS.GLOVES, SETTINGS.BOOTS, ...(twoHand ? [] : [SETTINGS.OH])]) {
        const item = getEquipment(settings[slot]);
        const armourStyle = item?.style === 'necro' ? 'necromancy' : item?.style;
        if (!item || !armourStyle || armourStyle === 'hybrid' || armourStyle === style) continue;
        const strongAgainst = {melee: 'ranged', ranged: 'magic', magic: 'melee'}[style];
        penalty += Number(item.bonuses.armour ?? 0) * (style === 'necromancy' || armourStyle === strongAgainst ? 1.5 : .8);
    }
    let accuracy = Math.max(0, levelAccuracy(Number(settings[levelKey] ?? 99) + prayerLevels) + weaponAccuracy - penalty);
    accuracy *= Math.max(0, Number(settings[SETTINGS.ACCURACY_MULTIPLIER] ?? 1));
    if (style === 'ranged' && settings[SETTINGS.AMMO] === ARMOUR.FUL_ARROWS) accuracy *= .9;
    let affinity = style === 'necromancy'
        ? [boss.affinities.melee, boss.affinities.ranged, boss.affinities.magic].sort((a, b) => a - b)[1]
        : boss.affinities[style] ?? .55;
    affinity += Math.max(0, Math.min(10, Number(settings[SETTINGS.AFFINITY_BONUS] ?? 0))) / 100;
    const defence = Math.max(0, boss.defenceLevel - Number(settings[SETTINGS.TARGET_DEFENCE_DRAIN] ?? 0));
    const proximity = isGhrazi(key) ? ghraziArmourMultiplier(Number(settings[SETTINGS.GHRAZI_DISTANCE] ?? 3)) : 1;
    const armour = (npcArmour(boss.armour) + levelAccuracy(defence)) * Math.max(.01, Number(settings[SETTINGS.TARGET_ARMOUR_MULTIPLIER] ?? 1)) * proximity;
    let uncapped = 100 * affinity * accuracy / armour * (abils[ability]?.specialAccuracy ?? 1);
    // Icy Precision grants flat hit chance, only for eligible attacks; never for Perfect Equilibrium.
    if (wenEligible(ability) && settings[SETTINGS.AMMO] === ARMOUR.WEN_ARROWS && settings[SETTINGS.ICY_PRECISION] > 0) uncapped += 30;
    return {potential: Math.max(0, Math.min(100, uncapped)), uncapped, automatic: true, accuracy, armour};
}

export function damagePotential(settings: Record<string, any>, ability: string) {
    return abils[ability]?.damagePotentialEffects === false ? 1 : calculateAccuracy(settings, ability).potential / 100;
}
