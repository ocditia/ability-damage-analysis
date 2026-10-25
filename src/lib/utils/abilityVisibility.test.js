import { describe, it, expect } from 'vitest';
import { HIDDEN_ABILITIES_KEY, readHiddenAbilities, writeHiddenAbilities } from './abilityVisibility';

describe('ability visibility preferences', () => {
    it('round-trips hidden keys without changing rotation data', () => {
        const data = new Map([['rotation_configs', '[{"name":"Keep me"}]']]);
        const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) };
        expect(writeHiddenAbilities(storage, ['ricochet', 'bloat', 'ricochet'])).toBe(true);
        expect(readHiddenAbilities(storage)).toEqual(['ricochet', 'bloat']);
        writeHiddenAbilities(storage, ['bloat']);
        expect(readHiddenAbilities(storage)).toEqual(['bloat']);
        expect(data.get('rotation_configs')).toBe('[{"name":"Keep me"}]');
    });
    it('recovers from invalid or unavailable browser storage', () => {
        for (const value of ['null', '{}', 'broken']) expect(readHiddenAbilities({ getItem: () => value })).toEqual([]);
        expect(readHiddenAbilities({ getItem: () => '["bloat",4,"bloat"]' })).toEqual(['bloat']);
        expect(writeHiddenAbilities({ setItem: () => { throw Error('denied'); } }, [])).toBe(false);
    });
});
