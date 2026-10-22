/** Display time relative to the fight start; pre-fight setup uses negative time. */
export function fightTime(tick: number, startTick = -1): string {
    return `${((tick - Math.max(0, startTick)) * 0.6).toFixed(1)}s`;
}
