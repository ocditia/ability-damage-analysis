import { describe, it, expect } from 'vitest';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import {
    createRangedSettings,
    createMeleeSettings,
    createRotationFromAbilities
} from '../test-helpers';
import { ABILITIES } from '$lib/data/abilities';
import { SETTINGS } from '../../settings_rb';
import { ARMOUR } from '$lib/data/armour';
import { WEAPONS } from '$lib/data/weapons';
function rotation(stall: string, release?: string) {
    const r: any = createRotationFromAbilities([], 15);
    r.stalledAbilities[0] = stall;
    r.releasedAbilities = Array(15).fill(null);
    if (release) r.releasedAbilities[3] = release;
    return r;
}
const ranged = () =>
    createRangedSettings({
        [SETTINGS.ADRENALINE]: 20,
        [SETTINGS.RANGED_AMMO_SLOT]: ARMOUR.WEN_ARROWS,
        [SETTINGS.RANGED_TH]: WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
        [SETTINGS.SHADOW_IMBUED]: true,
        [SETTINGS.ICY_CHILL_STACKS]: 0,
        [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 0,
        [SETTINGS.EXPECTED_ADRENALINE]: false,
        [SETTINGS.FURY_OF_THE_SMALL]: false
    });
function run(s: any, r: any) {
    const seen: any = {};
    const result = calculateRotationDamageCore(s, r, 15, (t, v) => (seen[t] = { ...v }));
    return { result, seen };
}
describe('stall and release', () => {
    it('an unreleased ranged basic gives base adrenaline but no damage, shadow adrenaline or stacks', () => {
        const { result, seen } = run(ranged(), rotation(ABILITIES.RANGED_AUTO));
        expect(result.regularDamage).toBe(0);
        expect(seen[3][SETTINGS.ADRENALINE]).toBe(29);
        expect(seen[3][SETTINGS.ICY_CHILL_STACKS]).toBe(0);
        expect(seen[3][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(0);
    });
    it('release produces one hit and hit effects without paying/gaining base adrenaline twice', () => {
        const { result, seen } = run(
            ranged(),
            rotation(ABILITIES.RANGED_AUTO, ABILITIES.RANGED_AUTO)
        );
        expect(result.regularDamage).toBeGreaterThan(0);
        expect(seen[8][SETTINGS.ADRENALINE]).toBe(34);
        expect(seen[8][SETTINGS.ICY_CHILL_STACKS]).toBe(1);
        expect(seen[8][SETTINGS.PERFECT_EQUILIBRIUM_STACKS]).toBe(1);
    });
    it('Meteor still multiplies melee basic adrenaline while stalled', () => {
        const { seen, result } = run(
            createMeleeSettings({
                [SETTINGS.ADRENALINE]: 20,
                [SETTINGS.METEOR_STRIKE_BUFF]: true,
                [SETTINGS.FURY_OF_THE_SMALL]: false,
                [SETTINGS.EXPECTED_ADRENALINE]: false
            }),
            rotation(ABILITIES.MELEE_AUTO)
        );
        expect(result.regularDamage).toBe(0);
        expect(seen[0][SETTINGS.ADRENALINE]).toBe(33.5);
    });
    it('charges a special at stall time, not release time', () => {
        const s = createRangedSettings({
            [SETTINGS.ADRENALINE]: 100,
            [SETTINGS.CONSERVATION_OF_ENERGY]: false,
            [SETTINGS.VIGOUR]: false
        });
        const a = run(s, rotation(ABILITIES.CRYSTAL_RAIN));
        const b = run(s, rotation(ABILITIES.CRYSTAL_RAIN, ABILITIES.CRYSTAL_RAIN));
        expect(a.result.regularDamage).toBe(0);
        expect(b.result.regularDamage).toBeGreaterThan(0);
        expect(b.seen[8][SETTINGS.ADRENALINE]).toBe(a.seen[8][SETTINGS.ADRENALINE]);
    });
    it('cannot release twice or release an unmatched ability', () => {
        const r = rotation(ABILITIES.RANGED_AUTO, ABILITIES.RANGED_AUTO);
        r.releasedAbilities[6] = ABILITIES.RANGED_AUTO;
        expect(run(ranged(), r).result.regularDamage).toBe(
            run(ranged(), rotation(ABILITIES.RANGED_AUTO, ABILITIES.RANGED_AUTO)).result
                .regularDamage
        );
        expect(
            run(ranged(), rotation(ABILITIES.RANGED_AUTO, ABILITIES.SNAP_SHOT)).result.regularDamage
        ).toBe(0);
    });
    it('a newer stall replaces the old one', () => {
        const r = rotation(ABILITIES.RANGED_AUTO, ABILITIES.RANGED_AUTO);
        r.stalledAbilities[1] = ABILITIES.PIERCING_SHOT;
        expect(run(ranged(), r).result.regularDamage).toBe(0);
    });
    it('processes a stall inside the previous ability duration', () => {
        const r: any = createRotationFromAbilities([ABILITIES.PIERCING_SHOT], 15);
        r.stalledAbilities[1] = ABILITIES.RANGED_AUTO;
        const { seen } = run(ranged(), r);
        expect(seen[2]._pendingStall).toBe(ABILITIES.RANGED_AUTO);
    });
});

it('a normal cast cancels a held ability', () => {
    const r = rotation(ABILITIES.RANGED_AUTO, ABILITIES.RANGED_AUTO);
    r.abilityBar[1] = ABILITIES.PIERCING_SHOT;
    const baseline = structuredClone(r);
    baseline.releasedAbilities[3] = null;
    expect(run(ranged(), r).result.regularDamage).toBe(
        run(ranged(), baseline).result.regularDamage
    );
});

it('releases Grico with Wen then casts Tendrils with Ful on the same tick', () => {
    const r = rotation(ABILITIES.GREATER_RICOCHET, ABILITIES.GREATER_RICOCHET);
    r.abilityBar[3] = ABILITIES.SHADOW_TENDRILS;
    r.tickEvents = [];
    r.tickEvents[3] = {releaseAmmo: ARMOUR.WEN_ARROWS, castAmmo: ARMOUR.FUL_ARROWS};
    const settings = {...ranged(), [SETTINGS.ADRENALINE]: 100};
    const mixed = run(settings, r);
    const wenOnly = structuredClone(r);
    wenOnly.tickEvents[3].castAmmo = ARMOUR.WEN_ARROWS;
    const baseline = run(settings, wenOnly);
    expect(mixed.seen[3][SETTINGS.ICY_CHILL_STACKS]).toBeGreaterThan(0);
    expect(mixed.seen[4][SETTINGS.RANGED_AMMO_SLOT]).toBe(ARMOUR.FUL_ARROWS);
    expect(mixed.seen[4][SETTINGS.ICY_CHILL_STACKS]).toBe(baseline.seen[4][SETTINGS.ICY_CHILL_STACKS]);
    expect(mixed.result.regularDamage).toBeGreaterThan(baseline.result.regularDamage);
    expect(r.tickEvents[3].releaseAmmo).toBe(ARMOUR.WEN_ARROWS);
});
