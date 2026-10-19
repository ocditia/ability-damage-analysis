import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { abils, ABILITIES } from './abilities';
import { paletteAbilities } from './abilityPalette';
import { abilityReference } from './abilityReference';
import { groupAbilitiesByType } from '$lib/utils/abilityClassifier';

describe('current four-style ability book', () => {
    it('exposes every named ability in the current Wiki ability tables', () => {
        const entries = Object.values(paletteAbilities).filter(a => a.title && a.icon && !a.parent && !['proc', 'perk'].includes(a.abilityType));
        const names = new Set(entries.map(a => a.referenceName || a.title.toLowerCase()));
        expect(Object.keys(abilityReference).filter(name => !names.has(name))).toEqual([]);
    });
    it('exposes only the castable Deadshot and keeps its hit internal', () => {
        for (const catalogue of [abils, paletteAbilities]) {
            const deadshots = Object.entries(catalogue).filter(([, a]) => a.title === 'Deadshot' && !a.parent);
            expect(deadshots.map(([key]) => key)).toEqual([ABILITIES.DEADSHOT]);
        }
        expect(abils[ABILITIES.DEADSHOT_HIT].parent).toBe(ABILITIES.DEADSHOT);
        expect(abils[ABILITIES.CRYSTAL_RAIN].icon).toBe('/rs-rot/ability_icons/ranged/30x30/sgb.png');
        expect(abils[ABILITIES.AFTERSHOCK_RANGED].icon).toBe('/rs-rot/effect_icons/perks/Aftershock.png');
    });
    it('has files for all local ability sprites', () => {
        for (const ability of Object.values(paletteAbilities).filter(a => a.title && a.icon)) {
            expect(ability.icon.startsWith('/rs-rot/'), ability.title + ': must use a local sprite').toBe(true);
            expect(existsSync('static/' + ability.icon.replace('/rs-rot/', '')), ability.title).toBe(true);
        }
    });
    it('uses the current Meteor Strike artwork', () => {
        expect(paletteAbilities['meteor strike'].icon).toBe('/rs-rot/ability_icons/current/meteor_strike.png');
        expect(readFileSync('static/ability_icons/current/meteor_strike.png').subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    });
    it('groups utility and necromancy abilities with readable headings', () => {
        const groups = groupAbilitiesByType(paletteAbilities);
        expect(groups.some(group => group.type === 'utility' && group.abilities.length === 8)).toBe(true);
        expect(groups.find(group => group.type === 'threshold')?.title).toBe('Enhanced Abilities');
    });
});
