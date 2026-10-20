import {describe, it, expect} from 'vitest';
import {SETTINGS} from '../../settings_rb';
import {ARMOUR} from '$lib/data/armour';
import {ABILITIES} from '$lib/data/abilities';
import {WEAPONS} from '$lib/data/weapons';
import {equipment, getEquipment} from '$lib/data/equipment';
import {applyActionAmmo, resolveQuiverAmmo, selectQuiverSlot, pernixBonusActive, isPernixQuiver} from '../../rotation_builder/quiver';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {calculateSingleAbilityDamage} from '../../unified-damage-calculator';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';
import {calc_crit_chance} from '../../crit';
import {calculatePrayerBoost} from '../../rotation_builder/effects/prayer_effects';
import {calculateHauntedBonus} from '../../rotation_builder/effects/damage_modifier_effects';
const ids=[52495,52580,52581,52582,52583,52584,52585,52586];
const profile={ammo:[ARMOUR.WEN_ARROWS,ARMOUR.FUL_ARROWS],active:0};
const settings=(extra={})=>createRangedSettings({[SETTINGS.RANGED_AMMO_SLOT]:52495,[SETTINGS.WEAPON_TYPE_RANGED]:'two-hand',[SETTINGS.RANGED_TH]:WEAPONS.BOW_OF_THE_LAST_GUARDIAN,[SETTINGS.PERNIX_QUIVERS]:{52495:profile},...extra});
describe('Pernix quiver contents',()=>{
    it.each(ids)('resolves both slots in quiver %s and retains the equipped item',id=>{
        const s=settings({[SETTINGS.RANGED_AMMO_SLOT]:id,[SETTINGS.PERNIX_QUIVERS]:{[id]:profile}});
        expect(isPernixQuiver(id)).toBe(true);expect(getEquipment(id)?.icon).toContain('/equipment_icons/quivers/');
        expect(resolveQuiverAmmo(s)).toBe(ARMOUR.WEN_ARROWS);
        selectQuiverSlot(s,1);expect(resolveQuiverAmmo(s)).toBe(ARMOUR.FUL_ARROWS);
        expect(s[SETTINGS.RANGED_AMMO_SLOT]).toBe(id);
    });
    it('switches before the ability and applies the same arrow damage as loose ammo',()=>{
        const r=createRotationFromAbilities([ABILITIES.PIERCING_SHOT]);
        r.extraActionBar[0]=[{type:'ability',value:'quiver ammo slot 2',title:'Slot 2',icon:''}];
        const result=calculateRotationDamageCore(settings(),r,15);
        const loose=calculateRotationDamageCore(settings({[SETTINGS.RANGED_AMMO_SLOT]:ARMOUR.FUL_ARROWS}),createRotationFromAbilities([ABILITIES.PIERCING_SHOT]),15);
        expect(result.regularDamage).toBe(loose.regularDamage);
        const active=settings({[SETTINGS.PERNIX_QUIVERS]:{52495:{...profile,active:1}}});
        expect(calculateSingleAbilityDamage(active,{ability:ABILITIES.PIERCING_SHOT}).expected).toBe(calculateSingleAbilityDamage({...active,[SETTINGS.RANGED_AMMO_SLOT]:ARMOUR.FUL_ARROWS},{ability:ABILITIES.PIERCING_SHOT}).expected);
    });
    it('automatically selects bolts for a crossbow and arrows when returning to a bow',()=>{
        const bolts=Number(Object.keys(equipment).find(id=>equipment[id].name==='Ruby bakriminel bolts (e)'));
        const crossbow=Number(Object.keys(equipment).find(id=>equipment[id].name==='Ascension crossbow'));
        const s=settings({[SETTINGS.PERNIX_QUIVERS]:{52495:{ammo:[ARMOUR.WEN_ARROWS,bolts],active:0}}});
        expect(resolveQuiverAmmo(s)).toBe(ARMOUR.WEN_ARROWS);
        s[SETTINGS.WEAPON_TYPE_RANGED]='main-hand';s[SETTINGS.RANGED_MH]=crossbow;
        expect(resolveQuiverAmmo(s)).toBe(bolts);
        s[SETTINGS.WEAPON_TYPE_RANGED]='two-hand';expect(resolveQuiverAmmo(s)).toBe(ARMOUR.WEN_ARROWS);
    });
    it('retains independent loadouts for named copies of the same colour',()=>{
        const s=settings({_gearInstances:{[SETTINGS.RANGED_AMMO_SLOT]:{itemKey:52495,instanceId:'a'}},[SETTINGS.PERNIX_QUIVERS]:{'52495:a':profile,'52495:b':{ammo:[ARMOUR.JAS_ARROWS,ARMOUR.FUL_ARROWS],active:0}}});
        selectQuiverSlot(s,1);s._gearInstances[SETTINGS.RANGED_AMMO_SLOT].instanceId='b';
        expect(resolveQuiverAmmo(s)).toBe(ARMOUR.JAS_ARROWS);
        s._gearInstances[SETTINGS.RANGED_AMMO_SLOT].instanceId='a';expect(resolveQuiverAmmo(s)).toBe(ARMOUR.FUL_ARROWS);
    });
    it('does not grant a configured quiver bonus or swap loose ammo after unequipping',()=>{
        const s=settings();expect(pernixBonusActive(s)).toBe(true);
        s[SETTINGS.RANGED_AMMO_SLOT]=ARMOUR.WEN_ARROWS;
        expect(selectQuiverSlot(s,1)).toBe(false);expect(resolveQuiverAmmo(s)).toBe(ARMOUR.WEN_ARROWS);expect(pernixBonusActive(s)).toBe(false);
    });
    it('treats an empty slot as no ammunition',()=>{
        const s=settings({[SETTINGS.PERNIX_QUIVERS]:{52495:{ammo:['none','none'],active:0}}});expect(resolveQuiverAmmo(s)).toBe('none');
    });
});
describe('additional buff controls',()=>{
    it('can enable and disable Divine Rage and Eclipsed Soul at specific ticks',()=>{
        const r=createRotationFromAbilities([ABILITIES.PIERCING_SHOT,null,null,ABILITIES.PIERCING_SHOT]);
        r.extraActionBar[0]=['divine rage on','eclipsed soul on'];r.extraActionBar[3]=['divine rage off','eclipsed soul off'];
        const seen:any={};calculateRotationDamageCore(settings(),r,15,(t,s)=>seen[t]={...s});
        expect(seen[0][SETTINGS.DIVINE_RAGE]).toBe(true);expect(seen[0][SETTINGS.ECLIPSED_SOUL]).toBe(true);
        expect(seen[3][SETTINGS.DIVINE_RAGE]).toBe(false);expect(seen[3][SETTINGS.ECLIPSED_SOUL]).toBe(false);
    });
    it('Eclipsed Soul grants 4% crit with no other prayer, and is excluded with curses',()=>{
        const s=settings({[SETTINGS.PRAYER]:'none ranged',[SETTINGS.ECLIPSED_SOUL]:false});
        const base=calc_crit_chance(s,ABILITIES.PIERCING_SHOT);s[SETTINGS.ECLIPSED_SOUL]=true;
        expect(calc_crit_chance(s,ABILITIES.PIERCING_SHOT)).toBeCloseTo(base+.04);
        s[SETTINGS.PRAYER]='desolation';expect(calc_crit_chance(s,ABILITIES.PIERCING_SHOT)).toBeCloseTo(base);
    });
    it('Divine Rage grants its damage bonus with no stat prayer but not with curses',()=>{
        const s=settings({[SETTINGS.PRAYER]:'none ranged',[SETTINGS.DIVINE_RAGE]:true});
        expect(calculatePrayerBoost(s,ABILITIES.PIERCING_SHOT)).toBeCloseTo(1.05);
        s[SETTINGS.PRAYER]='desolation';
        const boosted=calculatePrayerBoost(s,ABILITIES.PIERCING_SHOT);
        s[SETTINGS.DIVINE_RAGE]=false;expect(calculatePrayerBoost(s,ABILITIES.PIERCING_SHOT)).toBe(boosted);
    });
    it('Devourer Nexus boosts Haunted damage and its cap',()=>{
        const s=settings({[SETTINGS.HAUNTED_AD]:1000});
        expect(calculateHauntedBonus({settings:s} as any,1000)).toBe(100);
        s[SETTINGS.DEVOURER_NEXUS]=true;
        expect(calculateHauntedBonus({settings:s} as any,1000)).toBe(150);
        expect(calculateHauntedBonus({settings:s} as any,10000)).toBe(300);
    });
});

it('switches action ammo within the equipped quiver and preserves its identity', () => {
    const s = settings();
    applyActionAmmo(s, ARMOUR.WEN_ARROWS);
    expect(resolveQuiverAmmo(s)).toBe(ARMOUR.WEN_ARROWS);
    applyActionAmmo(s, ARMOUR.FUL_ARROWS);
    expect(resolveQuiverAmmo(s)).toBe(ARMOUR.FUL_ARROWS);
    expect(s[SETTINGS.RANGED_AMMO_SLOT]).toBe(52495);
    expect(pernixBonusActive(s)).toBe(true);
});
