import { paletteAbilities } from '$lib/data/abilityPalette';
import { abils } from '$lib/data/abilities';
import { allExtraActions } from '$lib/special/abilities';
import { equipment } from '$lib/data/equipment';
import { getSettingsKeyForItem } from '$lib/calc/rotation_builder/gear-registry';
import { fromPvmeName } from './pvmeExport';
export type ImportAction = {
    key: string;
    mode: string;
    tick: number;
    source: string;
    confirmed?: boolean;
    crop?: string;
};
export const importCatalogue: Record<string, any> = {
    ...Object.fromEntries(
        Object.entries(equipment)
            .filter(([, v]) => v.slot)
            .map(([id, v]) => [
                'item:' + id,
                { title: v.name, icon: v.icon, itemId: Number(id), kind: 'gear' }
            ])
    ),
    ...Object.fromEntries(
        Object.entries(allExtraActions).map(([k, v]) => [k, { ...v, kind: 'extra' }])
    ),
    ...Object.fromEntries(
        Object.entries(paletteAbilities)
            .filter(
                ([, v]) =>
                    v.title && !v.parent && !['proc', 'perk'].includes(v.abilityClassification)
            )
            .map(([k, v]) => [k, { ...v, kind: v.offGcd ? 'extra' : 'ability' }])
    )
};
for (const [key, item] of Object.entries(importCatalogue)) item.title ||= key;
export const normalizeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const names = new Map<string, string>();
for (const [key, v] of Object.entries(importCatalogue)) {
    names.set(normalizeName(v.title), key);
    names.set(normalizeName(key), key);
}
export function resolveImportName(name: string, aliases: Record<string, string> = {}) {
    const n = normalizeName(name);
    const pvme = fromPvmeName(name) || fromPvmeName(n);
    return (pvme && importCatalogue[pvme] ? pvme : null) || names.get(n) || aliases[n] || '';
}
export function canStall(key: string) {
    return (
        !!abils[key] &&
        !['channel', 'self cast', 'proc', 'perk'].includes(abils[key].abilityClassification)
    );
}
export function parseRotationText(
    text: string,
    aliases: Record<string, string> = {}
): ImportAction[] {
    const actions: ImportAction[] = [];
    let tick = 0;
    // Preserve separators and Discord emoji names; longest-name matching also accepts plain PVME input.
    text = text.replace(/<a?:([^:]+):\d+>/g, ' $1 ').replace(/:([a-z0-9_]+):/gi, ' $1 ');
    for (const line of text.split(/\r?\n/)) {
        if (!line.trim()) continue;
        if (/^\s*(?:#{1,6}\s|War['\u2019]s Retreat|Phase\s|Heart\s*$)/i.test(line)) {
            actions.push({
                key: '',
                mode: 'phase',
                tick,
                source: line.replace(/^#+\s*/, ''),
                confirmed: true
            });
            continue;
        }
        let sameTick = false;
        let previousTick = tick;
        for (const part of line.split(/(\u2192|->|\+)/).filter((x) => x.trim())) {
            if (part.trim() === '+') {
                sameTick = true;
                continue;
            }
            if (['\u2192', '->'].includes(part.trim())) {
                sameTick = false;
                continue;
            }
            const words = part.trim().split(/\s+/);
            let i = 0;
            while (i < words.length) {
                let mode = 'cast';
                if (['s', 'r', 'stall', 'release'].includes(words[i].toLowerCase())) {
                    mode = /^(s|stall)$/i.test(words[i]) ? 'stall' : 'release';
                    i++;
                }
                let key = '',
                    end = i + 1;
                for (let j = words.length; j > i; j--) {
                    key = resolveImportName(words.slice(i, j).join(' '), aliases);
                    if (key) {
                        end = j;
                        break;
                    }
                }
                if (!key && i < words.length && /^[sr]/i.test(words[i])) {
                    key = resolveImportName(words[i].slice(1), aliases);
                    if (key) mode = words[i][0].toLowerCase() === 's' ? 'stall' : 'release';
                }
                const source = words.slice(i, end).join(' ') || mode;
                if (key && importCatalogue[key].kind !== 'ability' && mode === 'cast')
                    mode = 'extra';
                const at = sameTick ? previousTick : tick;
                actions.push({ key, mode, tick: at, source, confirmed: !!key });
                previousTick = at;
                if (mode !== 'extra')
                    tick = Math.max(
                        tick,
                        at + (mode === 'release' ? 1 : Number(abils[key]?.duration) || 3)
                    );
                i = end;
                sameTick = false;
            }
        }
    }
    return actions;
}
export function validateImport(actions: ImportAction[], size = 300) {
    const errors: string[] = [];
    let pending: string | null = null;
    const occupied = new Set<string>();
    const extras = new Map<number, number>();
    const order = { phase: 0, extra: 1, stall: 2, release: 3, cast: 4, skip: 5 };
    for (const a of [...actions].sort((a, b) => a.tick - b.tick || order[a.mode] - order[b.mode])) {
        if (a.mode === 'skip') continue;
        if (!Number.isInteger(a.tick) || a.tick < 0 || a.tick >= size) {
            errors.push(`Tick ${a.tick} is outside the rotation.`);
            continue;
        }
        if (a.mode === 'phase') continue;
        if (!importCatalogue[a.key]) {
            errors.push(`Choose an action for "${a.source}" or skip it.`);
            continue;
        }
        if (!a.confirmed)
            errors.push(`Review the image match for ${importCatalogue[a.key].title}.`);
        if (a.mode === 'cast' && importCatalogue[a.key].kind !== 'ability')
            errors.push(`${importCatalogue[a.key].title} belongs in extra actions.`);
        if (a.mode === 'extra' && importCatalogue[a.key].kind === 'ability')
            errors.push(`${importCatalogue[a.key].title} needs a Cast, Stall or Release action.`);
        if (['stall', 'release'].includes(a.mode) && !canStall(a.key))
            errors.push(`${importCatalogue[a.key].title} cannot be stalled.`);
        const slot = a.mode + ':' + a.tick;
        if (a.mode !== 'extra' && occupied.has(slot))
            errors.push(`Two ${a.mode} actions occupy tick ${a.tick}.`);
        occupied.add(slot);
        if (a.mode === 'stall') pending = a.key;
        if (a.mode === 'release') {
            if (pending !== a.key)
                errors.push(`No matching held ability to release at tick ${a.tick}.`);
            pending = null;
        }
        if (a.mode === 'cast') pending = null;
        if (a.mode === 'extra') {
            const count = (extras.get(a.tick) || 0) + 1;
            extras.set(a.tick, count);
            if (count > 12) errors.push(`Tick ${a.tick} has more than 12 extra actions.`);
        }
    }
    for (const a of actions)
        if (a.mode === 'stall' && occupied.has('cast:' + a.tick))
            errors.push(`A stall and a new cast cannot share tick ${a.tick}.`);
    return [...new Set(errors)];
}
export function buildImportedRotation(actions: ImportAction[], style = 'ranged', size = 300) {
    const errors = validateImport(actions, size);
    if (errors.length) throw new Error(errors.join(' '));
    const data = {
        a: Array(size).fill(''),
        t: Array(size).fill(''),
        r: Array(size).fill(''),
        e: Array.from({ length: size }, () => [] as any[]),
        n: Array(size).fill(false),
        v: Array(size).fill(null)
    };
    for (const a of actions) {
        if (a.mode === 'skip') continue;
        const item = importCatalogue[a.key];
        if (a.mode === 'phase') {
            data.v[a.tick] = { phase: a.source };
            continue;
        }
        if (a.mode === 'extra') {
            const value = item.itemId ?? a.key;
            const slot = item.kind === 'gear' ? getSettingsKeyForItem(value, style) : undefined;
            if (item.kind === 'gear' && !slot)
                throw new Error(`Choose a compatible equipment slot for ${item.title}.`);
            data.e[a.tick].push({
                type: item.kind === 'gear' ? 'gear' : 'ability',
                value,
                title: item.title,
                icon: item.icon,
                ...(slot ? { slot } : {})
            });
        } else
            data[a.mode === 'stall' ? 't' : a.mode === 'release' ? 'r' : 'a'][a.tick] =
                item.actionKey || a.key;
    }
    return data;
}
