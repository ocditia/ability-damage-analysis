import { describe, it, expect } from 'vitest';
import { parseRotationText, buildImportedRotation, validateImport } from './rotationImport';
import { exportToPvme } from './pvmeExport';
describe('PVME import review', () => {
    it('accepts long names, aliases and Discord emojis with s/r prefixes', () => {
        const a = parseRotationText('s <:rangedbasic:12345> -> r rangedbasic \u2192 snap shot');
        expect(a.map((v) => [v.key, v.mode, v.tick])).toEqual([
            ['ranged auto', 'stall', 0],
            ['ranged auto', 'release', 3],
            ['snap shot', 'cast', 4]
        ]);
        expect(validateImport(a)).toEqual([]);
        const r = buildImportedRotation(a);
        expect(r.t[0]).toBe('ranged auto');
        expect(r.r[3]).toBe('ranged auto');
        expect(r.a[4]).toBe('snap shot');
    });
    it('handles attached prefixes without interpreting snipe as a prefix', () => {
        expect(
            parseRotationText('ssnapshot \u2192 rsnapshot \u2192 snipe').map((a) => a.mode)
        ).toEqual(['stall', 'release', 'cast']);
    });
    it('retains unknown actions for correction, never silently drops them', () => {
        const a = parseRotationText('grico -> mystery -> snapshot');
        expect(a).toHaveLength(3);
        expect(validateImport(a).join()).toContain('mystery');
        expect(() => buildImportedRotation(a)).toThrow();
    });
    it('preserves simultaneous release + cast', () => {
        const a = parseRotationText('s rangedbasic -> r rangedbasic + snapshot');
        expect(a[2].tick).toBe(3);
        expect(validateImport(a)).toEqual([]);
    });
    it('rejects missing and repeated releases and channel stalls', () => {
        expect(validateImport(parseRotationText('r snapshot')).join()).toContain('No matching');
        expect(
            validateImport(parseRotationText('s snapshot -> r snapshot -> r snapshot')).join()
        ).toContain('No matching');
        expect(validateImport(parseRotationText('s rapid')).join()).toContain('cannot be stalled');
    });
    it('keeps section headings as phase markers', () => {
        const a = parseRotationText('Phase 1-3\nsnapshot');
        expect(buildImportedRotation(a).v[0]).toEqual({ phase: 'Phase 1-3' });
    });
    it('exports stall/release notation', () => {
        expect(
            exportToPvme([null, null, null], {
                stalledAbilities: ['ranged auto'],
                releasedAbilities: [null, null, 'ranged auto']
            })
        ).toBe('s rangedbasic \u2192 r rangedbasic');
    });
    it('requires review of image matches', () => {
        const a = parseRotationText('snapshot');
        a[0].confirmed = false;
        expect(validateImport(a).join()).toContain('Review');
    });
});

it('orders a simultaneous cast and release as release-before-cast', () => {
    expect(validateImport(parseRotationText('s rangedbasic -> snapshot + r rangedbasic'))).toEqual(
        []
    );
});
