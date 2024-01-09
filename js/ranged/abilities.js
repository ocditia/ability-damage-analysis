import dazing_shot from "./abils/dazing_shot.js";
import greater_dazing_shot from "./abils/greater_dazing_shot.js";
import needle_strike from "./abils/needle_strike.js";
import piercing_shot from "./abils/piercing_shot.js";
import piercing_shot_bound from "./abils/piercing_shot_bound.js";
import corruption_shot from "./abils/corruption_shot.js";
import fragmentation_shot from "./abils/fragmentation_shot.js";
import snipe from "./abils/snipe.js";
import binding_shot from "./abils/binding_shot.js";
import tight_bindings from "./abils/tight_bindings.js";
import bombardment from "./abils/bombardment.js";
import snapshot from "./abils/snapshot.js";
import rapid_fire from "./abils/rapid_fire.js";
import ricochet from "./abils/ricochet.js";
import greater_ricochet from "./abils/greater_ricochet.js";
import incendiary_shot from "./abils/incendiary_shot.js";
import unload from "./abils/unload.js";
import dark_bow_spec from "./abils/dark_bow_spec.js";
import bolg_spec from "./abils/bolg_spec.js";
import magic_short_bow_spec from "./abils/magic_short_bow_spec.js";
import deadshot from "./abils/deadshot.js";
import shadow_tendrils from "./abils/shadow_tendrils.js";
import sgb_spec from "./abils/sgb_spec.js";

const abilities = {
  'Dazing Shot': {
    title: 'Dazing Shot',
    calc: dazing_shot,
    icon: 'https://i.imgur.com/RgGEGKO.png',
    weapons: ['2h'],
  },
  'Greater Dazing Shot': {
    title: 'Greater Dazing Shot',
    calc: greater_dazing_shot,
    icon: 'https://i.imgur.com/gYyw3Xz.png',
    weapons: ['2h'],
  },
  'Needle Strike': {
    title: 'Needle Strike',
    calc: needle_strike,
    icon: 'https://i.imgur.com/guilxE7.png',
    weapons: ['Dw'],
  },
  'Piercing Shot': {
    title: 'Piercing Shot',
    calc: piercing_shot,
    icon: 'https://i.imgur.com/RQcz4di.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Piercing Shot Bound': {
    title: 'Piercing Shot Bound',
    calc: piercing_shot_bound,
    icon: 'https://imgur.com/W1bzoPX.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Ricochet': {
    title: 'Ricochet',
    calc: ricochet,
    icon: 'https://imgur.com/Ym89Yhq.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater ricochet': {
    title: 'Greater ricochet',
    calc: greater_ricochet,
    icon: 'https://imgur.com/CT7UsaA.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------ TODO: replace calc with individual grico calc -------
  'Grico 1': {
    title: 'Grico 1',
    calc: greater_ricochet,
    icon: 'https://imgur.com/CT7UsaA.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Grico 2': {
    title: 'Grico 2',
    calc: greater_ricochet,
    icon: 'https://imgur.com/CT7UsaA.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Grico 3': {
    title: 'Grico 3',
    calc: greater_ricochet,
    icon: 'https://imgur.com/CT7UsaA.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
  'Corruption Shot': {
    title: 'Corruption Shot',
    calc: corruption_shot,
    icon: 'https://i.imgur.com/YRLh5SZ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Fragmentation Shot': {
    title: 'Fragmentation Shot',
    calc: fragmentation_shot,
    icon: 'https://i.imgur.com/n2Yyfn1.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Gen Snipe': {
    title: 'Snipe',
    calc: snipe,
    icon: 'https://i.imgur.com/oEOkyfc.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------ TODO: replace calc with snipe and gaunt calc -------
  'Snipe': {
    title: 'Snipee',
    calc: snipe,
    icon: 'https://i.imgur.com/oEOkyfc.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Nightmare Snipe': {
    title: 'Nightmare Snipe',
    calc: snipe,
    icon: 'https://i.imgur.com/oEOkyfc.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
  'Binding shot': {
    title: 'Binding shot',
    calc: binding_shot,
    icon: 'https://imgur.com/dQu8Pha.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Tight bindings': {
    title: 'tight bindings',
    calc: tight_bindings,
    icon: 'https://imgur.com/YSnjnQm.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bombardment': {
    title: 'Bombardment',
    calc: bombardment,
    icon: 'https://imgur.com/ZkNfBkx.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Shadow tendrils': {
    title: 'Shadow tendrils',
    calc: shadow_tendrils,
    icon: 'https://imgur.com/J8GLo1s.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // -------- TODO: replace tendril calc with respective calc -------
  'Shadow tendrils 2': {
    title: 'Shadow tendrils 2-hit',
    calc: shadow_tendrils,
    icon: 'https://imgur.com/J8GLo1s.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Shadow tendrils 3': {
    title: 'Shadow tendrils 3-hit',
    calc: shadow_tendrils,
    icon: 'https://imgur.com/J8GLo1s.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Shadow tendrils 4': {
    title: 'Shadow tendrils 4-hit',
    calc: shadow_tendrils,
    icon: 'https://imgur.com/J8GLo1s.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Shadow tendrils 5': {
    title: 'Shadow tendrils 5-hit',
    calc: shadow_tendrils,
    icon: 'https://imgur.com/J8GLo1s.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
  'Snapshot': {
    title: 'Snapshot',
    calc: snapshot,
    icon: 'https://imgur.com/H8Ci5w6.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // -- TODO: replace snap calc with snap 1st and 2nd hit calc --
  'Snap 1': {
    title: 'Snap 1',
    calc: snapshot,
    icon: 'https://imgur.com/H8Ci5w6.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Snap 2': {
    title: 'Snap 2',
    calc: snapshot,
    icon: 'https://imgur.com/H8Ci5w6.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
  'Rapid fire': {
    title: 'Rapid fire',
    calc: rapid_fire,
    icon: 'https://imgur.com/hCqaksE.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deadshot': {
    title: 'Deadshot',
    calc: deadshot,
    icon: 'https://imgur.com/5jLviCQ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ---TODO: replace with deadshot bleed and hit calcs --------
  'Deadshot hit': {
    title: 'Deadshot hit',
    calc: deadshot,
    icon: 'https://imgur.com/5jLviCQ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deadshot bleed': {
    title: 'Deadshot bleed',
    calc: deadshot,
    icon: 'https://imgur.com/5jLviCQ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
  'Incendiary shot': {
    title: 'Incendiary shot',
    calc: incendiary_shot,
    icon: 'https://imgur.com/2VFw7f9.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Unload': {
    title: 'Unload',
    calc: unload,
    icon: 'https://imgur.com/mr7nfle.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Darkbow': {
    title: 'Darkbow',
    calc: dark_bow_spec,
    icon: 'https://imgur.com/LCEvnr6.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bolg': {
    title: 'Bolg',
    calc: bolg_spec,
    icon: 'https://imgur.com/0BGZGpv.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Magic shortbow': {
    title: 'Magic shortbow',
    calc: magic_short_bow_spec,
    icon: 'https://imgur.com/wvfhltQ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Seren Godbow': {
    title: 'Seren Godbow',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // - TODO: replace SGB calcs with specific hits, hide 6-8 -----
  // if necessary
  'SGB 1': {
    title: 'SGB 1',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 2': {
    title: 'SGB 2',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 3': {
    title: 'SGB 3',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 4': {
    title: 'SGB 4',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 5': {
    title: 'SGB 5',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 6': {
    title: 'SGB 6',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 7': {
    title: 'SGB 7',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'SGB 8': {
    title: 'SGB 8',
    calc: sgb_spec,
    icon: 'https://imgur.com/DUqERq0.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  // ------------------------------------------------------------
}

export {abilities}