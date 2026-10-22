import {resolveBolgImpact} from '../../rotation_builder/damage_calc_new';
import {describe,it,expect} from 'vitest';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {createRangedSettings,createMeleeSettings,createMagicSettings,createRotationFromAbilities} from '../test-helpers';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {ARMOUR} from '$lib/data/armour';
import {WEAPONS} from '$lib/data/weapons';
function run(ability: string, castTick: number, swapFul=false, wen=false) {
 const rotation:any=createRotationFromAbilities([],80);
 rotation.abilityBar[0]=ABILITIES.DEATHS_SWIFTNESS;
 rotation.abilityBar[castTick]=ability;
 if(swapFul) rotation.extraActionBar[castTick+1]=[{type:'gear',slot:SETTINGS.RANGED_AMMO_SLOT,value:ARMOUR.FUL_ARROWS}];
 return calculateRotationDamageCore(createRangedSettings({
  [SETTINGS.RANGED_TH]:WEAPONS.BOW_OF_THE_LAST_GUARDIAN,
  [SETTINGS.WEAPON_TYPE_RANGED]:SETTINGS.WEAPON_VALUES.TH,
  [SETTINGS.RANGED_AMMO_SLOT]:wen?ARMOUR.WEN_ARROWS:'none',
  [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]:3,
  [SETTINGS.BALANCE_BY_FORCE]:true,
  [SETTINGS.ICY_PRECISION]:wen?2:0,
 }),rotation,80);
}
const damage = (result:any,key:string) => result.distributionStats.filter(h=>h.ability===key).map(h=>[h.nonCritMin,h.nonCritMax,h.critMin,h.critMax]);
describe('cast buffs at Deaths Swiftness expiry',()=>{
 it.each([48,49])('keeps Snipe and its BOLG proc boosted when cast at tick %s', tick=>{
  const early=run(ABILITIES.SNIPE,3);
  const late=run(ABILITIES.SNIPE,tick);
  expect(damage(late,ABILITIES.SNIPE_HIT)).toEqual(damage(early,ABILITIES.SNIPE_HIT));
  expect(damage(late,ABILITIES.BOLG_PROC)).toEqual(damage(early,ABILITIES.BOLG_PROC));
  expect(damage(late,ABILITIES.BOLG_PROC)).toHaveLength(1);
 });
 it('keeps Balance by Force and PE boosted on the last tick',()=>{
  const early=run(ABILITIES.BALANCE_BY_FORCE,3);
  const late=run(ABILITIES.BALANCE_BY_FORCE,49);
  expect(damage(late,ABILITIES.BALANCE_BY_FORCE)).toEqual(damage(early,ABILITIES.BALANCE_BY_FORCE));
  expect(damage(late,ABILITIES.BOLG_PROC)).toEqual(damage(early,ABILITIES.BOLG_PROC));
 });
 it('does not grant Swiftness to a cast after it expires',()=>{
  expect(damage(run(ABILITIES.SNIPE,50),ABILITIES.SNIPE_HIT)[0][0]).toBeLessThan(damage(run(ABILITIES.SNIPE,49),ABILITIES.SNIPE_HIT)[0][0]);
 });
});

it.each([
 [ABILITIES.SUNSHINE,ABILITIES.ASPHYXIATE,ABILITIES.ASPHYXIATE_HIT,50,createMagicSettings],
 [ABILITIES.GREATER_SUNSHINE,ABILITIES.ASPHYXIATE,ABILITIES.ASPHYXIATE_HIT,63,createMagicSettings],
 [ABILITIES.BERSERK,ABILITIES.ASSAULT,ABILITIES.ASSAULT_HIT,33,createMeleeSettings],
 [ABILITIES.BLACKHOLE,ABILITIES.ASSAULT,ABILITIES.ASSAULT_HIT,35,createMeleeSettings],
 [ABILITIES.GREATER_DEATHS_SWIFTNESS,ABILITIES.RAPID_FIRE,ABILITIES.RAPID_FIRE_HIT,63,createRangedSettings],
])('%s retains its multiplier for a channel cast on its last tick', (ultimate,channel,hit,expires,makeSettings)=>{
 function simulate(castTick:number) {
  const rotation:any=createRotationFromAbilities([],90);
  rotation.abilityBar[0]=ultimate;rotation.abilityBar[castTick]=channel;
  return calculateRotationDamageCore(makeSettings(),rotation,90);
 }
 const early=damage(simulate(3),hit);
 expect(early.length).toBeGreaterThan(0);
 expect(damage(simulate(Number(expires)-1),hit)).toEqual(early);
 expect(damage(simulate(Number(expires)),hit)[0][0]).toBeLessThan(early[0][0]);
});
it('keeps normal damage fixed but lets an arrow swap boost the delayed BOLG proc',()=>{
 const base=run(ABILITIES.BALANCE_BY_FORCE,49);
 const swapped=run(ABILITIES.BALANCE_BY_FORCE,49,true);
 expect(damage(swapped,ABILITIES.BALANCE_BY_FORCE)).toEqual(damage(base,ABILITIES.BALANCE_BY_FORCE));
 expect(damage(swapped,ABILITIES.BOLG_PROC)[0][0]).toBeGreaterThan(damage(base,ABILITIES.BOLG_PROC)[0][0]);
});
it('excludes Wen from BOLG even with a channel snapshot, but uses Ful at impact',()=>{
 function proc(ammo:any) {
  const settings=createRangedSettings({[SETTINGS.AMMO]:ammo,[SETTINGS.ICY_PRECISION]:2,
   [SETTINGS.DEATH_SWIFTNESS]:false,_castBuffSnapshot:{wenDamage:true,wenAccuracy:true}});
  const previous=settings._castBuffSnapshot;
  const pending:any={ability:ABILITIES.BOLG_PROC,likelihood:1,_bolgImpact:{min:330,max:370,damageBuffs:{[SETTINGS.DEATH_SWIFTNESS]:true}}};
  const hit=resolveBolgImpact(settings,pending,{})[0];
  expect(settings._castBuffSnapshot).toBe(previous);
  return hit.distributions.non_crit['damage list'][0];
 }
 expect(proc(ARMOUR.WEN_ARROWS)).toBe(proc('none'));
 expect(proc(ARMOUR.FUL_ARROWS)).toBeGreaterThan(proc(ARMOUR.WEN_ARROWS));
});
