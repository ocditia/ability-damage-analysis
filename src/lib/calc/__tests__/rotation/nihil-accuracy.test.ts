import {describe, it, expect} from 'vitest';
import {existsSync} from 'node:fs';
import {calculateAccuracy} from '../../accuracy';
import {familiars, calculateFamiliarHitChance} from '$lib/data/familiars';
import {ABILITIES} from '$lib/data/abilities';
import {SETTINGS} from '../../settings_rb';
import {WEAPONS} from '$lib/data/weapons';
import {createRangedSettings} from '../test-helpers';

const abilities = {melee: ABILITIES.MELEE_AUTO, ranged: ABILITIES.RANGED_AUTO, magic: ABILITIES.MAGIC_AUTO, necromancy: ABILITIES.NECRO_AUTO};
describe.each([['blood nihil','melee'],['shadow nihil','ranged'],['smoke nihil','magic'],['ice nihil','necromancy']])('%s accuracy', (familiar, matching) => {
    it('boosts only the matching player style before the cap', () => {
        const base = createRangedSettings({[SETTINGS.BOSS_PRESET]:'Nakatra, Devourer Eternal (Hard mode)', [SETTINGS.AUTO_ACCURACY]:true,
            [SETTINGS.TH]:WEAPONS.BOW_OF_THE_LAST_GUARDIAN, [SETTINGS.WEAPON]:SETTINGS.WEAPON_VALUES.TH,
            [SETTINGS.FAMILIAR]:'none'});
        for(const [style, ability] of Object.entries(abilities)) {
            const before = calculateAccuracy(base, ability);
            const after = calculateAccuracy({...base,[SETTINGS.FAMILIAR]:familiar}, ability);
            expect(after.uncapped).toBeCloseTo(before.uncapped * (style === matching ? 1.05 : 1));
            expect(after.potential).toBeCloseTo(Math.min(100, after.uncapped));
        }
    });
    it('has a working local sprite', () => {
        expect(existsSync('static/'+familiars[familiar].icon.replace('/rs-rot/',''))).toBe(true);
    });
});
it('uses Necromancy affinity for Ice nihil auto-attacks', () => {
    expect(calculateFamiliarHitChance(familiars['ice nihil'], 10000, {melee:.1,ranged:.1,magic:.1,necromancy:1}))
        .toBeCloseTo(.27);
    expect(calculateFamiliarHitChance(familiars['ice nihil'], 10000, {melee:.1,ranged:.1,magic:.1})).toBeCloseTo(.027);
});
