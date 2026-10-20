import { expect, it } from 'vitest';
import { SETTINGS } from '../../settings_rb';
import { ARMOUR } from '$lib/data/armour';
import { WEAPONS } from '$lib/data/weapons';
import { ABILITIES } from '$lib/data/abilities';
import { maxAdrenaline } from '../../rotation_builder/calculation_utils';
import { calculateRotationDamageCore } from '../../rotation_builder/rotation-damage-calculator';
import { createRangedSettings, createRotationFromAbilities } from '../test-helpers';

const vestments = {
    [SETTINGS.HELMET]:ARMOUR.VESTMENTS_OF_HAVOC_HOOD,
    [SETTINGS.BODY]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_TOP,
    [SETTINGS.LEGS]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_BOTTOM,
    [SETTINGS.BOOTS]:ARMOUR.VESTMENTS_OF_HAVOC_BOOTS,
    [SETTINGS.RANGED_HELMET]:ARMOUR.VESTMENTS_OF_HAVOC_HOOD,
    [SETTINGS.RANGED_BODY]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_TOP,
    [SETTINGS.RANGED_LEGS]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_BOTTOM,
    [SETTINGS.RANGED_BOOTS]:ARMOUR.VESTMENTS_OF_HAVOC_BOOTS,
    [SETTINGS.MELEE_HELMET]:ARMOUR.VESTMENTS_OF_HAVOC_HOOD,
    [SETTINGS.MELEE_BODY]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_TOP,
    [SETTINGS.MELEE_LEGS]:ARMOUR.VESTMENTS_OF_HAVOC_ROBE_BOTTOM,
    [SETTINGS.MELEE_BOOTS]:ARMOUR.VESTMENTS_OF_HAVOC_BOOTS,
};
it.each(['ranged','magic','necromancy',null])('does not give the Vestments cap with %s weapons', style => {
    const s = {...vestments, _hasMeleeAbilities:true, _equippedWeaponStyle:style};
    expect(maxAdrenaline(s)).toBe(100);
    expect(maxAdrenaline({...s,[SETTINGS.HEIGHTENED_SENSES]:true})).toBe(110);
});
it('requires four Vestments pieces and a melee weapon for 120/130', () => {
    const s = {...vestments, _equippedWeaponStyle:'melee'};
    expect(maxAdrenaline(s)).toBe(120);
    expect(maxAdrenaline({...s,[SETTINGS.HEIGHTENED_SENSES]:true})).toBe(130);
    expect(maxAdrenaline({...s,[SETTINGS.BOOTS]:'none'})).toBe(100);
});
it('lowers the cap on a weapon swap before the next attack', () => {
    const rotation = {...createRotationFromAbilities([],12),tickEvents:Array(12).fill(null)};
    rotation.tickEvents[1] = {adrenaline:130};
    rotation.extraActionBar[0] = [{type:'gear',slot:SETTINGS.MELEE_MH,value:WEAPONS.DARK_SHARD_OF_LENG}];
    rotation.extraActionBar[3] = [{type:'gear',slot:SETTINGS.RANGED_TH,value:WEAPONS.BOW_OF_THE_LAST_GUARDIAN}];
    const s = createRangedSettings({...vestments,[SETTINGS.ADRENALINE]:100,[SETTINGS.CAP_ADRENALINE]:true,[SETTINGS.HEIGHTENED_SENSES]:true});
    const frames:Record<number,any>={};
    calculateRotationDamageCore(s,rotation,12,(tick,v)=>frames[tick]={...v});
    expect(frames[2][SETTINGS.ADRENALINE]).toBe(130);
    expect(frames[3][SETTINGS.ADRENALINE]).toBe(110);
});
it('a melee ability later in the rotation does not raise the earlier ranged cap', () => {
    const rotation = createRotationFromAbilities([],12);
    rotation.abilityBar[0]=ABILITIES.RANGED_AUTO;
    rotation.abilityBar[9]=ABILITIES.BERSERK;
    const s=createRangedSettings({...vestments,[SETTINGS.ADRENALINE]:130,[SETTINGS.CAP_ADRENALINE]:true,[SETTINGS.HEIGHTENED_SENSES]:true});
    const frames:Record<number,any>={};
    calculateRotationDamageCore(s,rotation,12,(tick,v)=>frames[tick]={...v});
    expect(frames[0][SETTINGS.ADRENALINE]).toBe(110);
    expect(frames[6][SETTINGS.ADRENALINE]).toBe(110);
});
