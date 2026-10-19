import {describe,it,expect} from 'vitest';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {prepareChainCast} from '../../rotation_builder/castTargets';
import {createMagicSettings,createRotationFromAbilities} from '../test-helpers';
import {ABILITIES} from '$lib/data/abilities';
import {SETTINGS} from '../../settings_rb';

function run(entries:Record<number,string>,targets=2,rank=0) {
    const rotation={...createRotationFromAbilities([],35),targetCounts:[targets]};
    for(const [tick,key] of Object.entries(entries)) rotation.abilityBar[+tick]=key;
    const settings=createMagicSettings({[SETTINGS.CALC_TYPE]:SETTINGS.CALC_TYPE_VALUES.ROTATION,
        [SETTINGS.CAROMING]:rank,_combatStyle:'magic'});
    return calculateRotationDamageCore(settings,rotation,35);
}
describe('Chain cast targets',()=>{
    it.each([[ABILITIES.CHAIN,.3,3],[ABILITIES.GREATER_CHAIN,.5,7]])('copies the next single-target cast after %s, without reducing main-target damage', (chain,factor,cap)=>{
        const base=run({0:chain},9);
        const result=run({0:chain,3:ABILITIES.MAGIC_AUTO},9);
        const single=run({0:chain,3:ABILITIES.MAGIC_AUTO},1);
        expect(result.regularDamage).toBe(single.regularDamage);
        expect(Object.keys(result.secondaryDamage)).toHaveLength(cap-1);
        const copied=result.secondaryDamage[1]-base.secondaryDamage[1];
        const primary=result.regularDamage-base.regularDamage;
        expect(copied/primary).toBeCloseTo(factor,2);
    });
    it('keeps all multihit and channel hits after the last-tick follow-up cast',()=>{
        for(const follow of [ABILITIES.WILD_MAGIC,ABILITIES.ASPHYXIATE]) {
            const early=run({0:ABILITIES.GREATER_CHAIN,3:follow});
            const last=run({0:ABILITIES.GREATER_CHAIN,10:follow});
            expect(last.secondaryDamage).toEqual(early.secondaryDamage);
            const expired=run({0:ABILITIES.GREATER_CHAIN,11:follow});
            expect(expired.secondaryDamage[1]).toBeLessThan(last.secondaryDamage[1]);
        }
    });
    it('neither copies nor consumes the effect for existing area attacks',()=>{
        for(const area of [ABILITIES.DRAGON_BREATH,ABILITIES.CORRUPTION_BLAST,ABILITIES.MAGMA_TEMPEST,ABILITIES.TSUNAMI]) {
            const base=run({0:ABILITIES.GREATER_CHAIN});
            const areaOnly=run({0:ABILITIES.GREATER_CHAIN,3:area});
            expect(areaOnly.secondaryDamage).toEqual(base.secondaryDamage);
            expect(run({0:ABILITIES.GREATER_CHAIN,3:area,6:ABILITIES.MAGIC_AUTO}).secondaryDamage[1]).toBeGreaterThan(base.secondaryDamage[1]);
        }
    });
    it('snapshots Caroming and marked targets, then consumes only one follow-up',()=>{
        const s:any={[SETTINGS.CAROMING]:4};
        prepareChainCast(s,ABILITIES.GREATER_CHAIN,0,7);
        s[SETTINGS.CAROMING]=0;
        prepareChainCast(s,ABILITIES.MAGIC_AUTO,10,1);
        expect(s._chainCast).toMatchObject({targets:7,factor:.75});
        prepareChainCast(s,ABILITIES.MAGIC_AUTO,13,7);
        expect(s._chainCast).toBeUndefined();
    });
    it('preserves full damage for a chained damage-over-time ability',()=>{
        const s:any={};prepareChainCast(s,ABILITIES.GREATER_CHAIN,0,2);
        prepareChainCast(s,ABILITIES.COMBUST,3,2);
        expect(s._chainCast.factor).toBe(1);
    });
});
