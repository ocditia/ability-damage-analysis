import {it, expect} from 'vitest';
import fixture from '../fixtures/blood-knights-latest.json';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {attachGearPerks} from '$lib/data/perks';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';

it('includes per-hit Ful activation in the latest Blood Knights export',()=>{
    const bar=(entries: Record<string,any>,empty:any=null)=>Object.assign(Array(60).fill(empty),structuredClone(entries));
    const rotation={abilityBar:bar(fixture.abilities),extraActionBar:bar(fixture.extraActions,[]),
        nulledTicks:Array(60).fill(false),targetCounts:bar(fixture.targetCounts),tickEvents:bar(fixture.tickEvents),
        stalledAbilities:bar(fixture.stalledAbilities),releasedAbilities:bar(fixture.releasedAbilities)};
    const s:any={...fixture.settings,[SETTINGS.CALC_TYPE]:SETTINGS.CALC_TYPE_VALUES.ROTATION,_combatStyle:'ranged'};
    attachGearPerks(s,new Map());
    const frames:Record<number,any>={};
    const out=calculateRotationDamageCore(s,rotation,60,(t,v)=>frames[t]={...v});
    const total=out.regularDamage+out.familiarDamage+Object.values(out.secondaryDamage??{}).reduce((a,b)=>a+b,0);
    // Start Tick 17 excludes pre-fight damage from this saved rotation.
    expect(out.distributionStats.every(hit => hit.tick >= 17)).toBe(true);
    expect(total).toBeGreaterThan(710000);
    expect(total).toBeLessThan(730000);
    const last=out.distributionStats.find(x=>x.ability===ABILITIES.SHADOWFALL_2 && x.tick===44)!;
    expect(last.critMax).toBeGreaterThan(25000);
    expect(frames[40][SETTINGS.LOCATE]).toBe(true);
    expect(frames[40][SETTINGS.ICY_PRECISION]).toBe(1);
    expect(frames[42][SETTINGS.LOCATE]).toBe(false);
    expect(frames[42][SETTINGS.ICY_PRECISION]).toBe(0);
    expect(frames[40][SETTINGS.REAPER_STACKS]).toBe(30);
    console.info('Latest Blood Knights total',total, 'Ful probabilities', [23,26,29,32,35,38,41,44].map(t=>[t,frames[t][SETTINGS.SCRIPTURE_OF_FUL_PROB]]));
    expect(frames[35][SETTINGS.SCRIPTURE_OF_FUL_PROB]).toBeGreaterThan(.7);
    expect(Object.values(frames).every(s => s[SETTINGS.SCRIPTURE_OF_FUL_PROB] >= 0 && s[SETTINGS.SCRIPTURE_OF_FUL_PROB] <= 1)).toBe(true);
});
