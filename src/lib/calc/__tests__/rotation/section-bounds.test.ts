import {it,expect} from 'vitest';
import {sectionBounds,setSectionEnd} from '../../rotation_builder/sectionBounds';
import {timelineRows} from '../../rotation_builder/timelineRows';
function fixture() {
 const events=Array(110).fill(null);
 events[0]={phase:'Wars'};events[17]={phase:'Phase 1-3'};
 events[84]={phase:'Heart',downtime:3,clearStacks:['bloodlust stacks'],accuracy:65};
 events[90]={adrenaline:80,ghraziDistance:3};
 return events;
}
it('moves the next heading and reset settings, retaining conditions at both ticks',()=>{
 const original=fixture();const events=setSectionEnd(original,17,89);
 expect(events[84]).toEqual({accuracy:65});
 expect(events[90]).toMatchObject({phase:'Heart',downtime:3,adrenaline:80,ghraziDistance:3});
 expect(events[90].clearStacks).toEqual(original[84].clearStacks);
 expect(original[84].phase).toBe('Heart');
 expect(timelineRows(events,110,27).filter(r=>r.sectionTitle).map(r=>[r.startIndex,r.sectionEnd]))
  .toEqual([[0,16],[17,89],[90,109]]);
});
it('supports shortening a section and preserves subsequent section boundaries',()=>{
 const events=setSectionEnd(fixture(),0,12);
 expect(events[13].phase).toBe('Phase 1-3');expect(events[17]).toBeNull();
 expect(events[84].phase).toBe('Heart');
 expect(sectionBounds(events,0).end).toBe(12);
});
it('creates a following section for an explicitly bounded final section',()=>{
 const events=setSectionEnd(fixture(),84,100);
 expect(events[101]).toEqual({phase:'Next section',downtime:0});
 expect(sectionBounds(events,84).end).toBe(100);
});
it('rejects overlapping, fractional and out-of-range boundaries without mutation',()=>{
 const events=fixture();const before=JSON.stringify(events);
 for(const end of [16,109,17.5,NaN]) expect(()=>setSectionEnd(events,17,end)).toThrow();
 expect(()=>setSectionEnd(events,84,109)).toThrow();
 expect(()=>setSectionEnd(events,0,83)).toThrow();
 expect(JSON.stringify(events)).toBe(before);
});
