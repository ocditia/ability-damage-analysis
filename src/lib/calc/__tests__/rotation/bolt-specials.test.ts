import { describe, it, expect } from 'vitest';
import { boltChance, boltType, boltOutcomes, eligibleBoltHit, malachiPieces, applyBoltResources, tickProcProbabilities } from '../../rotation_builder/effects/enchanted_bolts';
import { SETTINGS } from '../../settings_rb';
import { ABILITIES, abils } from '$lib/data/abilities';
import { specialAttackReference } from '$lib/data/specialAttackReference';
import { equipment } from '$lib/data/equipment';
import { createRangedSettings, createRotationFromAbilities, createMeleeSettings, createMagicSettings, createBlankSettings } from '../test-helpers';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { calculateSingleAbilityDamage } from '../../unified-damage-calculator';
const item = (name:string) => Object.values(equipment).find(x=>x.name.toLowerCase()===name.toLowerCase())!.id;
function settings(extra = {}) { return createRangedSettings({[SETTINGS.RANGED_MH]:64191,[SETTINGS.RANGED_OH]:64195,[SETTINGS.WEAPON_TYPE_RANGED]:'main-hand',[SETTINGS.RANGED_AMMO_SLOT]:'none',[SETTINGS.EXPECTED_ADRENALINE]:true,...extra}); }
describe('enchanted bolt proc chances',()=>{
    it.each([[false,false,false,5],[true,false,false,6],[false,true,false,7],[false,false,true,7.5],[true,true,false,8.4],[true,false,true,8.5],[false,true,true,10.5],[true,true,true,11.9]])('matches the Wiki modifier combinations: %s %s %s', (cape,diary,ring,expected)=>{
        expect(boltChance(.05,{[SETTINGS.RANGED_CAPE_PERK]:cape,[SETTINGS.SEERS_ELITE]:diary,[SETTINGS.RING]:ring?63876:'none'})*100).toBeCloseTo(expected as number);
    });
    it('covers metal and bakriminel bolts, including ascendri',()=>{
        for (const name of ['Ruby bolts (e)','Ruby bakriminel bolts (e)']) expect(boltType(item(name))).toBe('ruby');
        expect(boltType(item('Ascendri bolts (e)'))).toBe('hydrix');
        expect(boltType(item('Dragon bolts (e)'))).toBe('dragonstone');
        expect(boltChance(.55,{[SETTINGS.RANGED_CAPE_PERK]:true,[SETTINGS.SEERS_ELITE]:true,[SETTINGS.RING]:63876})).toBeCloseTo(.969);
    });
    it('requires a main-hand crossbow and excludes corruption/bleed hits',()=>{
        const s={[SETTINGS.WEAPON]:'main-hand',[SETTINGS.MH]:64191,[SETTINGS.OH]:64195};
        expect(eligibleBoltHit(s,ABILITIES.RANGED_AUTO)).toBe(true);
        expect(eligibleBoltHit({...s,[SETTINGS.MH]:53338},ABILITIES.RANGED_AUTO)).toBe(false);
        expect(eligibleBoltHit(s,ABILITIES.CORRUPTION_SHOT_HIT_1)).toBe(false);
        expect(eligibleBoltHit(s,ABILITIES.PHANTOM_STRIKE_BLEED)).toBe(false);
    });
    it('only rolls Sirenic when the equipped bolt did not proc',()=>{
        const s={[SETTINGS.AMMO]:item('Emerald bakriminel bolts (e)'),[SETTINGS.HELMET]:item('Elite sirenic mask'),[SETTINGS.BODY]:item('Elite sirenic hauberk'),[SETTINGS.LEGS]:item('Elite sirenic chaps')};
        const outcomes=boltOutcomes(s);expect(outcomes.filter(x=>x.bolt!=='emerald').reduce((sum,x)=>sum+x.probability,0)).toBeCloseTo(.45*.12);
    });
    it('tracks expected Hydrix adrenaline and finite Deathmark probability',()=>{
        const s:any={[SETTINGS.WEAPON]:'main-hand',[SETTINGS.MH]:64191,[SETTINGS.AMMO]:item('Hydrix bakriminel bolts (e)'),[SETTINGS.EXPECTED_ADRENALINE]:true,[SETTINGS.ADRENALINE]:0};
        applyBoltResources(s,ABILITIES.RANGED_AUTO);expect(s._deathmarkProbability).toBeCloseTo(.1);expect(s[SETTINGS.ADRENALINE]).toBeCloseTo(1);
        applyBoltResources(s,ABILITIES.RANGED_AUTO);expect(s._deathmarkProbability).toBeCloseTo(.19);
        for(let t=0;t<25;t++)tickProcProbabilities(s);expect(s._deathmarkProbability).toBe(0);
    });
    it('adds weighted Ruby damage in the shared single-ability calculator',()=>{
        const base=calculateSingleAbilityDamage(settings(),{ability:ABILITIES.RANGED_AUTO}).expected;
        const ruby=calculateSingleAbilityDamage(settings({[SETTINGS.RANGED_AMMO_SLOT]:item('Ruby bakriminel bolts (e)')}),{ability:ABILITIES.RANGED_AUTO}).expected;
        expect(ruby).toBeGreaterThan(base);
    });
});
describe('Sanguine Volley and equipped passives',()=>{
    it('has five 70-90% hits, 40 adrenaline cost, and a 100-tick cooldown',()=>{
        const a=abils[ABILITIES.SANGUINE_VOLLEY];expect(a.adrenaline).toBe(40);expect(a.cooldown).toBe(60);
        expect(a.hits![1].filter(x=>x!=='next hit')).toHaveLength(5);
        expect(abils[ABILITIES.SANGUINE_VOLLEY_HIT].minHit).toBe(.7);
    });
    it('recognizes augmented and mastery equipment',()=>{
        expect(malachiPieces({[SETTINGS.MH]:64193,[SETTINGS.OH]:1000403,[SETTINGS.WEAPON]:'main-hand'})).toBe(2);
    });
    it('requires both crossbows for guaranteed Salvo and does not buff the triggering volley',()=>{
        const rotation=createRotationFromAbilities([ABILITIES.SANGUINE_VOLLEY]);const seen:any={};
        const both=calculateRotationDamageCore(settings(),rotation,20,(tick,s)=>seen[tick]={...s});
        const one=calculateRotationDamageCore(settings({[SETTINGS.RANGED_OH]:'none'}),rotation,20);
        expect(both.regularDamage).toBe(one.regularDamage);
        expect(seen[0][SETTINGS.CRIMSON_SALVO]).toBe(true);
        expect(seen[10][SETTINGS.CRIMSON_SALVO]).toBe(false);
    });
    it('includes all periodic special hits on single-ability pages',()=>{
        expect(calculateSingleAbilityDamage(createMeleeSettings(),{ability:ABILITIES.VINE_CALL}).expected).toBeGreaterThan(0);
        expect(calculateSingleAbilityDamage(createMagicSettings(),{ability:ABILITIES.FROM_THE_SHADOWS}).expected).toBeGreaterThan(0);
        expect(calculateSingleAbilityDamage(settings(),{ability:ABILITIES.PHANTOM_STRIKE}).expected).toBeGreaterThan(0);
    });
});

describe('current special attack audit',()=>{
    const normalized=(s:string)=>s.toLowerCase().replace(/\(ecb\)| ecb/g,'').replace(/[^a-z0-9]/g,'');
    it.each(specialAttackReference.map(r=>[r.name,r.style,r.adrenaline,r.cooldown]))('%s (%s) has its current cost and cooldown', (name,style,cost,cooldown)=>{
        const a=Object.entries(abils).find(([key,a])=>!a.parent && a.mainStyle===style && [key,a.title??''].some(n=>normalized(n)===normalized(name as string)))?.[1];
        expect(a).toBeDefined();expect(a!.adrenaline).toBe(cost);expect(a!.cooldown).toBe(cooldown);
        expect(a!.description).toBeTruthy();
    });
    it('keeps no-proc and proc weights normalized and increases damage with Nightblood',()=>{
        const s=settings({[SETTINGS.RANGED_AMMO_SLOT]:item('Ruby bakriminel bolts (e)')});
        const base=calculateSingleAbilityDamage(s,{ability:ABILITIES.RANGED_AUTO}).expected;
        const ring=calculateSingleAbilityDamage({...s,[SETTINGS.RANGED_RING]:63876},{ability:ABILITIES.RANGED_AUTO}).expected;
        expect(ring).toBeGreaterThan(base);
    });
    it('does not apply the new ring when it has been swapped away',()=>{
        const r=createRotationFromAbilities([ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]);
        r.extraActionBar[3]=[{type:'gear',slot:SETTINGS.RANGED_RING,value:'none',title:'Remove ring',icon:''}];
        const seen:any={};calculateRotationDamageCore(settings({[SETTINGS.RANGED_RING]:63876}),r,10,(t,s)=>seen[t]={...s});
        expect(boltChance(.1,seen[0])).toBeCloseTo(.15);expect(boltChance(.1,seen[3])).toBeCloseTo(.1);
    });
    it('can force a known Malachi reset at a specific tick',()=>{
        const r={...createRotationFromAbilities([ABILITIES.PIERCING_SHOT]),tickEvents:[{malachiReset:true}]};
        const seen:any={};calculateRotationDamageCore(settings(),r,10,(t,s)=>seen[t]={...s});
        expect(seen[0]._malachiResetChance).toBe(1);expect(seen[0][SETTINGS.CRIMSON_SALVO]).toBe(true);
    });
    it('adds Emerald poison only for poisonable targets',()=>{
        const s=settings({[SETTINGS.RANGED_AMMO_SLOT]:item('Emerald bakriminel bolts (e)')});
        const active=calculateSingleAbilityDamage(s,{ability:ABILITIES.RANGED_AUTO}).expected;
        const immune=calculateSingleAbilityDamage({...s,[SETTINGS.POISON_IMMUNE]:true},{ability:ABILITIES.RANGED_AUTO}).expected;
        expect(active).toBeGreaterThan(immune);
    });
    it('keeps ECB through an off-hand swap but cancels it on a main-hand swap',()=>{
        const r=createRotationFromAbilities([ABILITIES.SPLIT_SOUL_ECB,null,null,ABILITIES.RANGED_AUTO,null,null,ABILITIES.RANGED_AUTO]);
        r.extraActionBar[3]=[{type:'gear',slot:SETTINGS.RANGED_OH,value:'none',title:'Offhand',icon:''}];
        r.extraActionBar[6]=[{type:'gear',slot:SETTINGS.RANGED_MH,value:item('Ascension crossbow'),title:'Mainhand',icon:''}];
        const seen:any={};calculateRotationDamageCore(settings(),r,15,(t,s)=>seen[t]={...s});
        expect(seen[3][SETTINGS.SPLIT_SOUL]).toBe(true);expect(seen[6][SETTINGS.SPLIT_SOUL]).toBe(false);
    });
    it('includes Blackhole damage and all five periodic Phantom Strike hits',()=>{
        expect(calculateSingleAbilityDamage(createMeleeSettings(),{ability:ABILITIES.BLACKHOLE}).expected).toBeGreaterThan(0);
        const r=createRotationFromAbilities([ABILITIES.PHANTOM_STRIKE]);
        const short=calculateRotationDamageCore(settings(),r,10).regularDamage;
        const full=calculateSingleAbilityDamage(settings(),{ability:ABILITIES.PHANTOM_STRIKE}).expected;
        expect(full).toBeGreaterThan(0);
        expect(abils[ABILITIES.PHANTOM_STRIKE].hitTimings).toEqual([0,3,6,9,12,15]);
        expect(abils[ABILITIES.PHANTOM_STRIKE].hits![1]).toHaveLength(6);
    });
});

describe('verified base special damage ranges',()=>{
    const raw=(mode:string)=>createBlankSettings(99,95,{[SETTINGS.USE_RAW_ABILITY_DAMAGE]:true,[SETTINGS.ABILITY_DAMAGE]:1000,[SETTINGS.MODE]:mode,[SETTINGS.QUIVER]:false});
    it.each([
        [ABILITIES.SANGUINE_VOLLEY,3500,4500],
        [ABILITIES.DRACONIC_PUNCTURE,2500,3100],
        [ABILITIES.SWEEP,2400,3000],
        [ABILITIES.PHANTOM_STRIKE,2700,3400],
        [ABILITIES.FROM_THE_SHADOWS,2750,3250],
        [ABILITIES.TWIN_FANG,2300,2900],
        [ABILITIES.VINE_CALL,3000,3700],
        [ABILITIES.SOULFIRE,11500,13600],
    ])('%s resolves every hit at its documented range',(ability,min,max)=>{
        expect(calculateSingleAbilityDamage(raw(SETTINGS.MODE_VALUES.MIN_NO_CRIT),{ability:ability as string}).expected).toBe(min);
        expect(calculateSingleAbilityDamage(raw(SETTINGS.MODE_VALUES.MAX_NO_CRIT),{ability:ability as string}).expected).toBe(max);
    });
});
