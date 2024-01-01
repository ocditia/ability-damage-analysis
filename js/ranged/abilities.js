import dazing_shot from "./abils/dazing_shot";
import greater_dazing_shot from "./abils/greater_dazing_shot";
import needle_strike from "./abils/needle_strike";
import piercing_shot from "./abils/piercing_shot";
import piercing_shot_bound from "./abils/piercing_shot_bound";
import corruption_shot from "./abils/corruption_shot";
import fragmentation_shot from "./abils/fragmentation_shot";
import snipe from "./abils/snipe";
import binding_shot from "./abils/binding_shot";
import tight_bindings from "./abils/tight_bindings";
import bombardment from "./abils/bombardment";
import snapshot from "./abils/snapshot";
import rapid_fire from "./abils/rapid_fire";
import ricochet from "./abils/ricochet";
import greater_ricochet from "./abils/greater_ricochet";
import incendiary_shot from "./abils/incendiary_shot";
import unload from "./abils/unload";
import dark_bow_spec from "./abils/dark_bow_spec";
import bolg_spec from "./abils/bolg_spec";
import magic_short_bow_spec from "./abils/magic_short_bow_spec";
import deadshot from "./abils/deadshot";
import shadow_tendrils from "./abils/shadow_tendrils";
import sgb_spec from "./abils/sgb_spec";

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
  'Snipe': {
    title: 'Snipe',
    calc: snipe,
    icon: 'https://i.imgur.com/oEOkyfc.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
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
  'Snapshot': {
    title: 'Snapshot',
    calc: snapshot,
    icon: 'https://imgur.com/H8Ci5w6.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
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
}

export {abilities}