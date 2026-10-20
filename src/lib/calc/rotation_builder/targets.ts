/** Includes the primary target. Each ability applies its own target cap. */
export function normalizeTargetCount(value: unknown): number {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(1, Math.min(25, Math.floor(n))) : 1;
}
export function targetCountAt(changes: (number | null)[] | undefined, tick: number): number {
    for (let i = Math.min(tick, (changes?.length ?? 0) - 1); i >= 0; i--) {
        if (changes![i] != null) return normalizeTargetCount(changes![i]);
    }
    return 1;
}
