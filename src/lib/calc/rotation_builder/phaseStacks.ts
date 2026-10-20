import { SETTINGS } from '../settings_rb';

export const phaseStackOptions = [
    [SETTINGS.PERFECT_EQUILIBRIUM_STACKS, 'BoLG'], [SETTINGS.ICY_CHILL_STACKS, 'Wen'],
    [SETTINGS.BIK_STACKS, 'Bik (all targets)'], [SETTINGS.DEATHSPORE_STACKS, 'Deathspore'],
    [SETTINGS.REAPER_STACKS, 'Reaper necklace'], [SETTINGS.BLOODLUST_STACKS, 'Bloodlust'],
    [SETTINGS.PRIMORDIAL_ICE, 'Primordial Ice'], [SETTINGS.PUNCTURE_STACKS, 'Puncture'],
    [SETTINGS.NECROSIS_STACKS, 'Necrosis'], [SETTINGS.RESIDUAL_SOULS, 'Residual Souls'],
    [SETTINGS.DEATH_SPARK_STACKS, 'Death Spark'], [SETTINGS.SOUL_REAVE_STACKS, 'Soul Reave'],
    [SETTINGS.ESSENCE_CORRUPTION, 'Essence Corruption'], [SETTINGS.BLOOD_TITHE, 'Blood Tithe'],
    [SETTINGS.GLACIAL_EMBRACE, 'Glacial Embrace'],
];

export function clearPhaseStacks(settings: Record<string, any>, keys: string[] = []) {
    for (const [key] of phaseStackOptions) if (keys.includes(key)) settings[key] = 0;
    if (keys.includes(SETTINGS.REAPER_STACKS)) delete settings._reaperExpires;
}
