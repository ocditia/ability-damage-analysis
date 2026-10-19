import {describe,it,expect} from 'vitest';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {CONSUMABLES} from '$lib/special/abilities';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {normalizeTickEvent} from '../../rotation_builder/tickEvents';
import {rangedEffects} from '../../rotation_builder/effects/ranged_effects';
import {createRangedSettings,createRotationFromAbilities} from '../test-helpers';
const settings=(extra={})=>createRangedSettings({[SETTINGS.ADRENALINE]:0,[SETTINGS.CAP_ADRENALINE]:true,[SETTINGS.EXPECTED_ADRENALINE]:false,[SETTINGS.FURY_OF_THE_SMALL]:false,[SETTINGS.HEIGHTENED_SENSES]:false,...extra});
function run(s,r){const seen={};calculateRotationDamageCore(s,r,18,(t,v)=>seen[t]={...v});return seen;}
const empty=()=>({...createRotationFromAbilities([],18),tickEvents:Array(18).fill(null)});
describe('adrenaline controls',()=>{
 it('caps a saved starting value when Heightened Senses is disabled',()=>{
  expect(run(settings({[SETTINGS.ADRENALINE]:110}),empty())[0][SETTINGS.ADRENALINE]).toBe(100);
 });
 it('applies Fury of the Small and Conservation of Energy independently',()=>{
  const basic=empty();basic.abilityBar[0]=ABILITIES.RANGED_AUTO;
  expect(run(settings(),basic)[3][SETTINGS.ADRENALINE]).toBe(9);
  expect(run(settings({[SETTINGS.FURY_OF_THE_SMALL]:true}),basic)[3][SETTINGS.ADRENALINE]).toBe(10);
  const ultimate=empty();ultimate.abilityBar[0]=ABILITIES.DEATHS_SWIFTNESS;
  const base=settings({[SETTINGS.ADRENALINE]:100,[SETTINGS.VIGOUR]:false,[SETTINGS.CONSERVATION_OF_ENERGY]:false});
  expect(run(base,ultimate)[3][SETTINGS.ADRENALINE]).toBe(0);
  expect(run({...base,[SETTINGS.CONSERVATION_OF_ENERGY]:true},ultimate)[3][SETTINGS.ADRENALINE]).toBe(10);
 });
 it('sets adrenaline before a cast and carries its resulting balance forward',()=>{
  const r=empty();r.tickEvents[3]={adrenaline:70};r.abilityBar[3]=ABILITIES.IMBUE_SHADOWS;
  const seen=run(settings(),r);expect(seen[3][SETTINGS.ADRENALINE]).toBe(30);expect(seen[8][SETTINGS.ADRENALINE]).toBe(30);
 });
 it('clamps explicit overrides to the equipment/relic maximum',()=>{
  const r=empty();r.tickEvents[0]={adrenaline:130};
  expect(run(settings(),r)[0][SETTINGS.ADRENALINE]).toBe(100);
  expect(run(settings({[SETTINGS.HEIGHTENED_SENSES]:true}),r)[0][SETTINGS.ADRENALINE]).toBe(110);
 });
 it('channels crystal pulses every 3 ticks, unaffected by Natural Instinct',()=>{
  const r=empty();r.extraActionBar[0]=[{type:'ability',value:CONSUMABLES.ADRENALINE_CRYSTAL}];
  const seen=run(settings({[SETTINGS.NATURAL_INSTINCT]:true}),r);
  expect(seen[2][SETTINGS.ADRENALINE]).toBe(0);expect(seen[3][SETTINGS.ADRENALINE]).toBe(25);
  expect(seen[6][SETTINGS.ADRENALINE]).toBe(50);expect(seen[12][SETTINGS.ADRENALINE]).toBe(100);
 });
 it('uses upgraded crystal pulses and stops at the relic maximum',()=>{
  const r=empty();r.extraActionBar[0]=[{type:'ability',value:CONSUMABLES.ADRENALINE_CRYSTAL}];
  const seen=run(settings({[SETTINGS.WAR_BLESSING_4]:true,[SETTINGS.HEIGHTENED_SENSES]:true}),r);
  expect(seen[3][SETTINGS.ADRENALINE]).toBe(100);expect(seen[6][SETTINGS.ADRENALINE]).toBe(110);
 });
 it('interrupts the crystal when a self-cast buff is used',()=>{
  const r=empty();r.extraActionBar[0]=[{type:'ability',value:CONSUMABLES.ADRENALINE_CRYSTAL}];r.abilityBar[4]=ABILITIES.IMBUE_SHADOWS;
  const seen=run(settings({[SETTINGS.ADRENALINE]:50}),r);
  expect(seen[4][SETTINGS.ADRENALINE]).toBe(35);expect(seen[12][SETTINGS.ADRENALINE]).toBe(35);
 });
 it('Persistent Rage only regenerates outside combat and is not doubled by Natural Instinct',()=>{
  const r=empty();r.tickEvents[0]={outOfCombat:true};r.tickEvents[5]={outOfCombat:false};
  const seen=run(settings({[SETTINGS.PERSISTENT_RAGE]:true,[SETTINGS.NATURAL_INSTINCT]:true}),r);
  expect(seen[1][SETTINGS.ADRENALINE]).toBe(0);expect(seen[2][SETTINGS.ADRENALINE]).toBe(5);expect(seen[4][SETTINGS.ADRENALINE]).toBe(10);expect(seen[8][SETTINGS.ADRENALINE]).toBe(10);
 });
 it('preserves zero and false resource events during normalization',()=>{
  expect(normalizeTickEvent({adrenaline:0,outOfCombat:false})).toEqual({adrenaline:0,outOfCombat:false});
  expect(normalizeTickEvent({adrenaline:NaN})).toBeNull();
 });
 it.each([ABILITIES.AFTERSHOCK_RANGED,ABILITIES.CRACKLING_RANGED,ABILITIES.CORRUPTION_SHOT_HIT_1,ABILITIES.CORRUPTION_SHOT_HIT_5])('does not gain Imbue adrenaline from %s',abilityKey=>{
  const s=settings({[SETTINGS.SHADOW_IMBUED]:true});rangedEffects.applyStackEffects({settings:s,abilityKey,timers:{}});
  expect(s[SETTINGS.ADRENALINE]).toBe(0);
 });
 it.each([ABILITIES.RANGED_AUTO,ABILITIES.BOLG_PROC])('gains Imbue adrenaline from %s',abilityKey=>{
  const s=settings({[SETTINGS.SHADOW_IMBUED]:true});rangedEffects.applyStackEffects({settings:s,abilityKey,timers:{}});
  expect(s[SETTINGS.ADRENALINE]).toBe(5);
 });
});
