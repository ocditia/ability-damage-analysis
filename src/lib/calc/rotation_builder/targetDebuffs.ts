export const teamDebuffOptions = [
    ['warhammer', "Statius's warhammer"],
    ['guthix', 'Guthix staff'],
    ['quake', 'Quake'],
    ['vulnerability', 'Vulnerability'],
    ['smokeCloud', 'Smoke Cloud'],
] as const;
export type TeamDebuffs = Partial<Record<typeof teamDebuffOptions[number][0], boolean>>;
export function normalizeTeamDebuffs(value: unknown): TeamDebuffs | undefined {
    if (!value || typeof value !== 'object') return undefined;
    const entries = teamDebuffOptions.filter(([key]) => typeof value[key] === 'boolean').map(([key]) => [key,value[key]]);
    return entries.length ? Object.fromEntries(entries) : undefined;
}
export function teamDebuffsAt(events: any[], tick: number): TeamDebuffs {
    const targets: Record<string, TeamDebuffs> = {};
    let target = 'Initial target';
    for (let i=0; i<=tick; i++) {
        target = events[i]?.targetId ?? target;
        if (events[i]?.teamDebuffs) Object.assign(targets[target] ??= {}, events[i].teamDebuffs);
    }
    return targets[target] ?? {};
}
// A maintained single application of each defence drain; affinity bonuses stack.
export function teamAffinity(debuffs: TeamDebuffs = {}) {
    return (debuffs.warhammer ? 5 : 0) + (debuffs.guthix ? 2 : 0) + (debuffs.quake ? 2 : 0);
}
export function teamDefenceMultiplier(debuffs: TeamDebuffs = {}) {
    return (debuffs.warhammer ? .7 : 1) * (debuffs.guthix ? .95 : 1);
}
