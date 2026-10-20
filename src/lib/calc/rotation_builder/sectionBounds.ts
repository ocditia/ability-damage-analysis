import { normalizeTickEvent, type TickEvent } from './tickEvents';

export function sectionBounds(events: (TickEvent | null)[], start: number) {
    const next = events.findIndex((event, tick) => tick > start && !!event?.phase);
    const following = next < 0 ? -1 : events.findIndex((event, tick) => tick > next && !!event?.phase);
    return {next, end: next < 0 ? null : next - 1,
        maxEnd: following < 0 ? events.length - 2 : following - 2};
}

/** Move only the next phase marker and its phase-specific settings. */
export function setSectionEnd(events: (TickEvent | null)[], start: number, end: number) {
    const {next, maxEnd} = sectionBounds(events, start);
    if (!events[start]?.phase) throw new Error('Choose a section start first.');
    if (!Number.isInteger(end) || end < start || end > maxEnd)
        throw new Error(`Choose an end tick from ${start} to ${maxEnd}. Sections cannot overlap.`);
    const destination = end + 1;
    if (destination === next) return events;
    const updated = events.slice();
    const phase = next < 0 ? {phase: 'Next section', downtime: 0} : {
        phase: events[next]!.phase, downtime: events[next]!.downtime,
        clearStacks: events[next]!.clearStacks
    };
    if (next >= 0) updated[next] = normalizeTickEvent({...events[next],
        phase: undefined, downtime: undefined, clearStacks: undefined});
    updated[destination] = normalizeTickEvent({...updated[destination], ...phase});
    return updated;
}
