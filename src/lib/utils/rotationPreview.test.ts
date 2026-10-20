import {describe, it, expect} from 'vitest';
import {rotationPreview, rotationPreviewText} from './rotationPreview';
import {SETTINGS} from '$lib/calc/settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {equipment} from '$lib/data/equipment';
import {WEAPONS} from '$lib/data/weapons';
import {CONSUMABLES} from '$lib/special/abilities';

const item = (name: string) => Object.values(equipment).find(entry => entry.name.toLowerCase() === name.toLowerCase())!.id;
const empty = () => ({abilityBar: Array(10).fill(null), extraActionBar: Array(10).fill(null),
    stalledAbilities: Array(10).fill(null), releasedAbilities: Array(10).fill(null), tickEvents: Array(10).fill(null), nulledTicks: Array(10).fill(false)});
const settings = () => ({
    [SETTINGS.RANGED_AMMO_SLOT]: 52495, [SETTINGS.WEAPON_TYPE_RANGED]: 'two-hand',
    [SETTINGS.RANGED_TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
    [SETTINGS.PERNIX_QUIVERS]: {52495: {ammo: [item('Wen arrow'), item('Bik arrow')], active: 0}},
});

describe('rotation icon preview and Discord export', () => {
    it('preserves stalls, release + ability, phases and swaps on otherwise empty ticks', () => {
        const rotation = empty();
        rotation.stalledAbilities[0] = ABILITIES.GREATER_RICOCHET;
        rotation.releasedAbilities[3] = ABILITIES.GREATER_RICOCHET;
        rotation.abilityBar[3] = ABILITIES.SNIPE;
        rotation.tickEvents[3] = {phase: 'P2'};
        rotation.extraActionBar[2] = [{type: 'ability', value: 'quiver ammo slot 2'}];
        const input = settings();
        const before = JSON.stringify({rotation, input});
        const rows = rotationPreview(rotation, input);
        expect(rows.map(row => row.tick)).toEqual([0, 3]);
        expect(rows[1].actions[0].ammo?.title).toMatch(/Bik arrow/);
        expect(rows[1].actions[0].ammo?.discord).toMatch(/^<:bikarrows:/);
        expect(rows[1].actions.map(action => action.prefix)).toEqual(['r', '']);
        const text = rotationPreviewText(rows);
        expect(text).toMatch(/s <:[^:]+:\d+>/);
        expect(text).toMatch(/r <:bikarrows:\d+> <:[^:]+:\d+> \+ <:[^:]+:\d+>/);
        expect(text).toContain('**P2**');
        expect(text).not.toContain('Ammo slot 2');
        expect(JSON.stringify({rotation, input})).toBe(before);
    });
    it('resolves automatic arrow-to-bolt switches after a weapon swap', () => {
        const rotation = empty();
        const input = settings();
        input[SETTINGS.PERNIX_QUIVERS][52495].ammo[1] = item('Ruby bakriminel bolts (e)');
        rotation.extraActionBar[1] = [{type: 'gear', slot: SETTINGS.RANGED_MH, value: item('Ascension crossbow')}];
        rotation.abilityBar[2] = ABILITIES.PIERCING_SHOT;
        const rows = rotationPreview(rotation, input);
        expect(rows[0].actions[0].ammo).toBeUndefined();
        expect(rows[1].actions[0].ammo?.title).toBe('Ruby bakriminel bolts (e)');
    });
    it('keeps new abilities with game icons and readable fallback text rather than dropping them', () => {
        const rotation = empty();
        rotation.abilityBar[0] = ABILITIES.SNIPE_FLANK;
        rotation.nulledTicks[0] = true;
        const row = rotationPreview(rotation, {})[0];
        expect(row.actions[0].icon).toContain('snipe_flank.svg');
        expect(rotationPreviewText([row])).toContain('[Enhanced Nightmare Gauntlets (flank)]');
        expect(rotationPreviewText([row])).toContain('(null)');
    });
    it('handles phase-only and empty rotations', () => {
        const rotation = empty();
        expect(rotationPreview(rotation, {})).toEqual([]);
        rotation.tickEvents[4] = {phase: 'Phase 2'};
        expect(rotationPreviewText(rotationPreview(rotation, {}))).toBe('**Phase 2**\n');
    });
    it('hides crystals and puts deathspores before the first ranged attack, then Wen directly before grico', () => {
        const rotation = empty();
        const input = settings();
        input[SETTINGS.PERNIX_QUIVERS][52495].ammo = [item('Deathspore arrows'), item('Wen arrow')];
        rotation.extraActionBar[0] = [{type: 'ability', value: CONSUMABLES.ADRENALINE_CRYSTAL}];
        rotation.abilityBar[1] = ABILITIES.RAMPAGE;
        rotation.abilityBar[2] = ABILITIES.DEATHS_SWIFTNESS;
        rotation.tickEvents[3] = {phase: 'Phase 3'};
        rotation.abilityBar[3] = ABILITIES.PIERCING_SHOT;
        rotation.extraActionBar[4] = [{type: 'ability', value: 'quiver ammo slot 2'}];
        rotation.abilityBar[5] = ABILITIES.GREATER_RICOCHET;
        rotation.abilityBar[8] = ABILITIES.GREATER_RICOCHET;
        const rows = rotationPreview(rotation, input);
        expect(rows.map(row => row.tick)).toEqual([1, 2, 3, 5, 8]);
        expect(rows[0].actions[0].ammo).toBeUndefined();
        expect(rows[1].actions[0].ammo).toBeUndefined();
        expect(rows[2].actions[0].ammo?.title).toBe('Deathspore arrows');
        expect(rows[3].actions[0].ammo?.title).toMatch(/Wen arrow/);
        expect(rows[4].actions[0].ammo).toBeUndefined();
        const text = rotationPreviewText(rows);
        expect(text).not.toMatch(/crystal|Ammo swap/i);
        expect(text).toMatch(/<:wenarrows:\d+> <:grico:\d+>/);
        expect(text.match(/<:wenarrows:/g)).toHaveLength(1);
    });
    it('labels physical and EOF specials at the cast tick, with DBA always spec and a text toggle', () => {
        const rotation = empty();
        rotation.abilityBar[0] = ABILITIES.RAMPAGE;
        rotation.abilityBar[1] = ABILITIES.BALANCE_BY_FORCE;
        rotation.abilityBar[2] = ABILITIES.CRYSTAL_RAIN;
        rotation.extraActionBar[3] = [{type: 'gear', slot: SETTINGS.RANGED_MH, value: item('Seren godbow')}];
        rotation.abilityBar[3] = ABILITIES.CRYSTAL_RAIN;
        rotation.extraActionBar[4] = [{type: 'gear', slot: SETTINGS.RANGED_MH, value: 53426}];
        rotation.abilityBar[4] = ABILITIES.BALANCE_BY_FORCE;
        const rows = rotationPreview(rotation, settings());
        expect(rows.flatMap(row => row.actions).filter(action => action.special).map(action => action.special))
            .toEqual(['spec', 'spec', 'eofspec', 'spec', 'spec']);
        expect(rotationPreviewText(rows)).toContain('<:eofspec:1257438999794946099>');
        expect(rotationPreviewText(rows)).toContain('<:spec:537340400273195028>');
        const specials = rows.flatMap(row => row.actions).filter(action => action.special);
        expect(specials.map(action => action.specialMarker?.icon)).toEqual([
            'weapon_special_attack', 'weapon_special_attack', 'essence_of_finality', 'weapon_special_attack', 'weapon_special_attack'
        ].map(name => `/rs-rot/ability_icons/current/${name}.png`));
        expect(rotationPreviewText(rows, true, false)).not.toMatch(/\b(?:spec|eofspec)\b/);
    });
});

it('shows Wen release followed by Ful cast and retains Ful for subsequent casts', () => {
    const r = empty();
    r.releasedAbilities[3] = ABILITIES.GREATER_RICOCHET;
    r.abilityBar[3] = ABILITIES.SHADOW_TENDRILS;
    r.abilityBar[6] = ABILITIES.PIERCING_SHOT;
    r.tickEvents[3] = {releaseAmmo: item('Wen arrow'), castAmmo: item('Ful arrow')};
    const rows = rotationPreview(r, settings());
    expect(rows[0].actions.map(action => action.ammo?.title)).toEqual(['Wen arrow', 'Ful arrow']);
    expect(rows[0].actions.map(action => action.prefix)).toEqual(['r', '']);
    expect(rows[1].actions[0].ammo).toBeUndefined();
});

it('labels delayed Snipe after Deaths Swiftness with its actual tick gap in the preview and exports', () => {
    for (const swift of [ABILITIES.DEATHS_SWIFTNESS, ABILITIES.GREATER_DEATHS_SWIFTNESS]) {
        for (const snipe of [ABILITIES.SNIPE, ABILITIES.SNIPE_FLANK]) {
            const r = empty(); r.abilityBar[0] = swift; r.abilityBar[4] = snipe;
            const rows = rotationPreview(r, settings());
            expect(rows[1].actions[0].prefix).toBe('4t');
            expect(rotationPreviewText(rows)).toContain('4t ');
            expect(rotationPreviewText(rows, false)).toContain('4t ');
            r.abilityBar[4] = null; r.abilityBar[3] = snipe;
            expect(rotationPreview(r, settings())[1].actions[0].prefix).toBe('');
        }
    }
});
