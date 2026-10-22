export function damageBetween(damage: number[], start: number, end: number) {
    return damage.slice(start, end + 1).reduce((sum, value) => sum + (value ?? 0), 0);
}

/** Manual splits begin a phase; automatic transition ticks finish a phase. */
export function phaseDamageRows(damage: number[], events: any[], transitions: any[]) {
    const starts = events.flatMap((event, tick) => event?.phase ? [{tick, label: event.phase}] : []);
    const end = Math.max(damage.length - 1, starts.at(-1)?.tick ?? 0);
    if (starts.length) {
        if (starts[0].tick > 0) starts.unshift({tick: 0, label: 'Rotation'});
        return starts.map((phase, index) => {
            const last = (starts[index + 1]?.tick ?? end + 1) - 1;
            return {label: phase.label, start: phase.tick, end: last, damage: damageBetween(damage, phase.tick, last)};
        });
    }
    if (!transitions.length) return [];
    let start = 0;
    const rows = transitions.map((phase, index) => {
        const row = {label: `Phase ${index + 1}`, start, end: phase.tick, damage: damageBetween(damage, start, phase.tick)};
        start = phase.tick + 1;
        return row;
    });
    if (start <= end && transitions.at(-1)?.label !== 'Kill') {
        rows.push({label: `Phase ${rows.length + 1}`, start, end, damage: damageBetween(damage, start, end)});
    }
    return rows;
}
