import { it, expect } from 'vitest';
import fixture from '../fixtures/blood-knights-latest.json';
import { snapshotEditorCalculation, runEditorCalculation } from '../../rotation_builder/editorCalculation';
import { calculateTotalDamage } from '../../rotation_builder/rotation-damage-calculator';
import { rotationStore } from '$lib/stores/rotationStore.svelte.js';
import { settingsStore } from '$lib/stores/settingsStore.svelte.js';
it('benchmarks the editor calculation with the Blood Knights export', () => {
 const map = {abilities:'abilityBar',extraActions:'extraActionBar',targetCounts:'targetCounts',tickEvents:'tickEvents',stalledAbilities:'stalledAbilities',releasedAbilities:'releasedAbilities'};
 for(const [source,target] of Object.entries(map)) rotationStore[target] = Object.assign(Array(300).fill(null),structuredClone(fixture[source]));
 for(const [key,value] of Object.entries(fixture.settings)) settingsStore.settings[key] = {...settingsStore.settings[key],value};
 const samples=[];
 let result;
 for(let i=0;i<6;i++) { const start=performance.now(); result=calculateTotalDamage(300);samples.push(performance.now()-start); }
 console.info('Editor calculation ms',samples.map(n=>Math.round(n)));
 expect(result.regularDamage).toBeGreaterThan(0);
 const snapshot=snapshotEditorCalculation();
 const workerResult=runEditorCalculation(snapshot);
 expect(workerResult.result.regularDamage).toBe(result.regularDamage);
 expect(workerResult.result.secondaryDamage).toEqual(result.secondaryDamage);
 expect(workerResult.result.distributionStats).toEqual(result.distributionStats);
 expect(workerResult.result.tickMetadata).toEqual(result.tickMetadata);
 expect(workerResult.buffs).toHaveProperty('locate');
 expect(workerResult.stacks.adrenaline.length).toBeGreaterThanOrEqual(300);
 // A later empty rotation must clear earlier damage and buff activity.
 for(const key of Object.keys(snapshot.rotation)) snapshot.rotation[key]=Array(300).fill(null);
 const empty=runEditorCalculation(snapshot);
 expect(empty.result.regularDamage).toBe(0);
 expect(empty.buffs.locate.activeRows).toEqual([]);
});
