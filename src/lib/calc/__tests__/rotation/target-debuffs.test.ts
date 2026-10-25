import {it, expect} from 'vitest';
import {teamDebuffsAt, teamAffinity, teamDefenceMultiplier} from '../../rotation_builder/targetDebuffs';
import {normalizeTickEvent} from '../../rotation_builder/tickEvents';
import {calculateRotationDamageCore} from '../../rotation_builder/rotation-damage-calculator';
import {calculateAccuracy} from '../../accuracy';
import {createRangedSettings, createRotationFromAbilities} from '../test-helpers';
import {SETTINGS} from '../../settings_rb';
import {ABILITIES} from '$lib/data/abilities';
import {WEAPONS} from '$lib/data/weapons';

it('validates debuffs and remembers independent selections across named targets', () => {
 const events = [normalizeTickEvent({phase:'Boss',targetId:'Boss',teamDebuffs:{warhammer:true,invalid:true}}),
 {phase:'Add',targetId:'Add',teamDebuffs:{guthix:true}},
 {phase:'Return',targetId:'Boss'}, {teamDebuffs:{warhammer:false}}];
 expect(events[0]?.teamDebuffs).toEqual({warhammer:true});
 expect(teamDebuffsAt(events,1)).toEqual({guthix:true});
 expect(teamDebuffsAt(events,2)).toEqual({warhammer:true});
 expect(teamDebuffsAt(events,3)).toEqual({warhammer:false});
});
it('combines supported affinity bonuses and defence drains in automatic accuracy', () => {
 const settings = createRangedSettings({[SETTINGS.AUTO_ACCURACY]:true,[SETTINGS.BOSS_PRESET]:'Lady Karmina Ghrazi',
 [SETTINGS.TH]:WEAPONS.BOW_OF_THE_LAST_GUARDIAN,[SETTINGS.WEAPON]:SETTINGS.WEAPON_VALUES.TH});
 const base=calculateAccuracy(settings,ABILITIES.PIERCING_SHOT);
 settings._teamDebuffs={warhammer:true,guthix:true,quake:true};
 const debuffed=calculateAccuracy(settings,ABILITIES.PIERCING_SHOT);
 expect(teamAffinity(settings._teamDebuffs)).toBe(9);
 expect(teamDefenceMultiplier(settings._teamDebuffs)).toBeCloseTo(.665);
 expect(debuffed.armour).toBeLessThan(base.armour);
 expect(debuffed.uncapped).toBeGreaterThan(base.uncapped);
});
it('team damage debuffs add damage without adding a cast or spending adrenaline', () => {
 const settings=createRangedSettings({[SETTINGS.VULN]:SETTINGS.VULN_VALUES.NONE,[SETTINGS.SMOKE_CLOUD]:false});
 const rotation:any=createRotationFromAbilities([ABILITIES.PIERCING_SHOT],15);
 const baseline=calculateRotationDamageCore(settings,rotation,15);
 rotation.tickEvents=[{teamDebuffs:{vulnerability:true,smokeCloud:true}}];
 const seen={};
 const boosted=calculateRotationDamageCore(settings,rotation,15,(tick,s)=>seen[tick]=s[SETTINGS.ADRENALINE]);
 expect(boosted.regularDamage).toBeGreaterThan(baseline.regularDamage*1.09);
 const baselineAdren={}; calculateRotationDamageCore(settings,{...rotation,tickEvents:[]},15,(tick,s)=>baselineAdren[tick]=s[SETTINGS.ADRENALINE]);
 expect(seen).toEqual(baselineAdren);
 expect(rotation.abilityBar.filter(Boolean)).toEqual([ABILITIES.PIERCING_SHOT]);
});
it('uses the original target vulnerability for delayed hits after switching target', () => {
 const settings=createRangedSettings({[SETTINGS.VULN]:SETTINGS.VULN_VALUES.NONE});
 const rotation:any=createRotationFromAbilities([ABILITIES.CORRUPTION_SHOT],25);
 rotation.tickEvents=[{phase:'Boss',targetId:'Boss',teamDebuffs:{vulnerability:true}}];
 const same=calculateRotationDamageCore(settings,rotation,25);
 rotation.tickEvents[1]={phase:'Add',targetId:'Add'};
 const switched=calculateRotationDamageCore(settings,rotation,25);
 expect(switched.regularDamage).toBe(same.regularDamage);
});
