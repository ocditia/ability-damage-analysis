import type { TickEvent } from './tickEvents';

/** Visual section boundaries never change the simulation's absolute tick numbers. */
export function timelineRows(events: (TickEvent | null)[], total: number, columns: number) {
    const starts = [0];
    for (let tick = 1; tick < total; tick++) if (events[tick]?.phase) starts.push(tick);
    const hasSections = starts.length > 1 || !!events[0]?.phase;
    const rows: {startIndex: number; endIndex: number; gridRow: number; sectionTitle?: string; sectionEnd?: number}[] = [];
    let gridRow = 1;
    for (let section = 0; section < starts.length; section++) {
        const start = starts[section], end = starts[section + 1] ?? total;
        for (let tick = start; tick < end; tick += columns) {
            const heading = hasSections && tick === start;
            if (heading) gridRow++;
            rows.push({startIndex: tick, endIndex: Math.min(tick + columns, end), gridRow: gridRow++,
                ...(heading ? {sectionTitle: events[start]?.phase ?? 'Rotation', sectionEnd: end - 1} : {})});
        }
    }
    return rows;
}
