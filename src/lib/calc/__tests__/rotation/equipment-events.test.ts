import {describe, it, expect} from 'vitest';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {WEAPONS} from '$lib/data/weapons';
import {isAugmentable, equipmentMechanicId, equipment} from '$lib/data/equipment';
import {resolveEquipmentPerks} from '$lib/data/perks';
import {rotationStore, rotationActions} from '$lib/stores/rotationStore.svelte.js';
import {normalizeTickEvent} from '../../rotation_builder/tickEvents';
const bow = WEAPONS.BOW_OF_THE_LAST_GUARDIAN;
const perk = (rank: number) => [{perkKey:SETTINGS.PRECISE,rank}];
function simulate(rotation: any, overrides = {}) {
    const settings = createRangedSettings({[SETTINGS.RANGED_TH]:bow,[SETTINGS.RANGED_MH]:bow,[SETTINGS.INVIGORATING]:0,[SETTINGS.PRECISE]:4,...overrides});
    const ticks: Record<number, any> = {};
    const result = calculateRotationDamageCore(settings,rotation,40,(tick,current)=>ticks[tick]={...current});
    return {result,ticks};
}
describe('equipment copies and defaults',()=>{
    it('loads low-tier and dyed equipment with augmentation metadata and canonical passives',()=>{
        expect(equipment[1277].name).toBe('Bronze sword');
        expect(isAugmentable(1277)).toBe(false);
        expect(isAugmentable(bow)).toBe(true);
        expect(isAugmentable(53426)).toBe(true);
        expect(equipmentMechanicId(53426)).toBe(bow);
    });
    it('uses per-copy perks on the exact swap tick without overwriting another copy',()=>{
        const rotation=createRotationFromAbilities([ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]);
        const swap=(rank:number)=>[{type:'gear',value:bow,slot:SETTINGS.RANGED_MH,title:'Bow copy',icon:'',perks:perk(rank)}];
        rotation.extraActionBar[3]=swap(6);rotation.extraActionBar[6]=swap(1);
        const {ticks}=simulate(rotation,{_gearInstances:{[SETTINGS.RANGED_MH]:{itemKey:bow,perks:perk(2)}}});
        expect(ticks[0][SETTINGS.PRECISE]).toBe(2);
        expect(ticks[3][SETTINGS.PRECISE]).toBe(6);
        expect(ticks[6][SETTINGS.PRECISE]).toBe(1);
    });
    it('restores global defaults when switching to an unconfigured augmentable copy',()=>{
        const rotation=createRotationFromAbilities([ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]);
        rotation.extraActionBar[3]=[{type:'gear',value:bow,slot:SETTINGS.RANGED_MH,title:'Blank copy',icon:'',perks:[]}];
        const {ticks}=simulate(rotation,{_gearInstances:{[SETTINGS.RANGED_MH]:{itemKey:bow,perks:perk(2)}}});
        expect(ticks[3][SETTINGS.PRECISE]).toBe(4);
    });
    it('does not apply explicit or global perks to non-augmentable items',()=>{
        const settings:any={[SETTINGS.PRECISE]:6,_gearPerks:{1305:perk(6)}};
        resolveEquipmentPerks(settings,[{item:1305,key:'weapon',slot:'mainhand'}],{});
        expect(settings[SETTINGS.PRECISE]).toBe(0);
    });
    it('ignores off-hand perks while a two-handed weapon is equipped',()=>{
        const rotation=createRotationFromAbilities([ABILITIES.RANGED_AUTO]);
        const {ticks}=simulate(rotation,{_gearInstances:{[SETTINGS.RANGED_MH]:{itemKey:bow,perks:perk(2)},[SETTINGS.RANGED_OH]:{itemKey:bow,perks:perk(6)}}});
        expect(ticks[0][SETTINGS.PRECISE]).toBe(2);
    });
    it('inherits compatible defaults without turning missing weapon perks into armour perks',()=>{
        const settings:any={[SETTINGS.PRECISE]:4,[SETTINGS.BITING]:3,_gearPerks:{}};
        resolveEquipmentPerks(settings,[{item:bow,key:'weapon',slot:'mainhand'}],{});
        expect(settings[SETTINGS.PRECISE]).toBe(4);
        expect(settings[SETTINGS.BITING]).toBe(0);
    });
});
describe('tick conditions',()=>{
    it('applies damage potential on the selected tick and persists it',()=>{
        const rotation={...createRotationFromAbilities([ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]),tickEvents:[null,null,null,{accuracy:50}]};
        const {ticks,result}=simulate(rotation);
        expect(ticks[0][SETTINGS.HIT_CHANCE]).toBe(100);
        expect(ticks[3][SETTINGS.HIT_CHANCE]).toBe(50);
        expect(ticks[6][SETTINGS.HIT_CHANCE]).toBe(50);
        expect(result.regularDamage).toBeLessThan(simulate({...rotation,tickEvents:[]}).result.regularDamage);
    });
    it('applies a damage-potential change during a channel',()=>{
        const r={...createRotationFromAbilities([ABILITIES.RAPID_FIRE]),tickEvents:[null,null,null,{accuracy:0}]};
        expect(simulate(r).result.regularDamage).toBeLessThan(simulate({...r,tickEvents:[]}).result.regularDamage);
    });
    it('records named phases and discards damage during their downtime',()=>{
        const r={...createRotationFromAbilities([null,null,null,ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]),tickEvents:[null,null,null,{phase:'Core exposed',downtime:3}]};
        const {result}=simulate(r);
        expect(result.phaseTransitions).toContainEqual({tick:3,phaseIdx:0,label:'Core exposed',hp:0,pause:3});
        expect(result.regularDamage).toBeLessThan(simulate({...r,tickEvents:[]}).result.regularDamage);
    });
    it('saves condition overrides and shifts them with tick insertion/removal',()=>{
        rotationActions.clearRotation();rotationStore.tickEvents[4]={accuracy:75,phase:'Phase 2',downtime:3};
        const saved=rotationActions.getCurrentRotationData();expect(saved.v[4].accuracy).toBe(75);
        rotationActions.insertTicks(4,2);expect(rotationStore.tickEvents[6].phase).toBe('Phase 2');
        rotationActions.removeTicks(4,2);expect(rotationStore.tickEvents[4].phase).toBe('Phase 2');
        rotationActions.clearRotation();expect(rotationStore.tickEvents.every(v=>v==null)).toBe(true);
    });
    it('normalizes imported condition values',()=>{
        expect(normalizeTickEvent({accuracy:200,phase:'  Phase 2  ',downtime:-1})).toEqual({accuracy:100,phase:'Phase 2',downtime:0});
        expect(normalizeTickEvent({accuracy:NaN})).toBe(null);
    });
});
