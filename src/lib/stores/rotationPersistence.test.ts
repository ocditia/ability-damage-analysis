import {describe,it,expect,beforeEach,afterEach,vi} from 'vitest';
import {rotationStore,rotationActions,DRAFT_STORAGE_KEY} from './rotationStore.svelte.js';
import {settingsStore} from './settingsStore.svelte.js';
import {ARMOUR} from '$lib/data/armour';
import {SETTINGS} from '$lib/calc/settings_rb';

let storage: Map<string,string>;
beforeEach(()=>{storage=new Map();vi.stubGlobal('localStorage',{getItem:(k)=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)});rotationActions.clearRotation();});
afterEach(()=>vi.unstubAllGlobals());
describe('rotation persistence',()=>{
 it('restores the complete draft and starting setup',()=>{
  rotationStore.abilityBar[3]='piercing shot';
  rotationStore.extraActionBar[3]=[{type:'ability',value:'undead slayer ability',title:'Undead Slayer',icon:''}];
  rotationStore.stalledAbilities[6]='snipe';rotationStore.releasedAbilities[9]='snipe';
  rotationStore.tickEvents[9]={releaseAmmo:ARMOUR.WEN_ARROWS,castAmmo:ARMOUR.FUL_ARROWS};
  rotationStore.targetCounts[12]=3;rotationStore.tickEvents[12]={accuracy:65,automaticAccuracy:false,phase:'Phase 2',targetId:'Boss',teamDebuffs:{warhammer:true,smokeCloud:true},downtime:0};
  rotationStore.nulledTicks[15]=true;settingsStore.settings[SETTINGS.HIT_CHANCE].value=77;
  const expected=rotationActions.getCurrentRotationData();
  expect(rotationActions.saveDraft('ranged')).toBe(true);
  rotationActions.clearRotation();settingsStore.settings[SETTINGS.HIT_CHANCE].value=100;
  expect(rotationActions.restoreDraft()?.style).toBe('ranged');
  expect(rotationActions.getCurrentRotationData()).toEqual(expected);
 });
 it('keeps named snapshots independent of later edits',()=>{
  rotationStore.nulledTicks[2]=true;const saved=rotationActions.getCurrentRotationData();
  rotationStore.nulledTicks[2]=false;settingsStore.settings[SETTINGS.HIT_CHANCE].value=33;
  expect(saved.n[2]).toBe(true);expect(saved.s[SETTINGS.HIT_CHANCE]).not.toBe(33);
 });
 it('persists an intentional reset instead of reviving the old rotation',()=>{
  rotationStore.abilityBar[0]='snipe';rotationActions.saveDraft('ranged');
  rotationActions.clearRotation();rotationActions.saveDraft('ranged');
  rotationStore.abilityBar[0]='snipe';rotationActions.restoreDraft();expect(rotationStore.abilityBar[0]).toBeNull();
 });
 it('does not partially replace a rotation when an import is malformed',()=>{
  rotationStore.abilityBar[0]='snipe';expect(()=>rotationActions.applyRotationData({a:['piercing shot'],e:'invalid'})).toThrow();
  expect(rotationStore.abilityBar[0]).toBe('snipe');
 });
 it('handles corrupt or unavailable browser storage without crashing',()=>{
  storage.set(DRAFT_STORAGE_KEY,'broken');expect(rotationActions.restoreDraft()).toBeNull();
  expect(rotationStore.draftStatus).toContain('Could not restore');
  vi.stubGlobal('localStorage',{setItem(){throw Error('quota')}});
  expect(rotationActions.saveDraft('ranged')).toBe(false);expect(rotationStore.draftStatus).toContain('Export');
 });
 it('exports Unicode phase names in clipboard codes and reports clipboard failures',async()=>{
  rotationStore.tickEvents[0]={phase:'Phase ?',downtime:0};let code='';
  vi.stubGlobal('navigator',{clipboard:{writeText:vi.fn(async value=>{code=value})}});
  const success=vi.fn(),error=vi.fn();await rotationActions.exportToString(success,error);
  const decoded=new TextDecoder().decode(Uint8Array.from(atob(code),c=>c.charCodeAt(0)));
  expect(JSON.parse(decoded).data.v[0].phase).toBe('Phase ?');expect(success).toHaveBeenCalledOnce();
  vi.stubGlobal('navigator',{clipboard:{writeText:vi.fn(async()=>{throw Error('denied')})}});
  await rotationActions.exportToString(success,error);expect(error).toHaveBeenCalledOnce();
 });
 it('pads older short rotations for continued editing',()=>{
  rotationActions.applyRotationData({a:['snipe']});expect(rotationStore.abilityBar).toHaveLength(300);expect(rotationStore.releasedAbilities).toHaveLength(300);
 });
});
