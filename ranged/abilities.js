import bombardment from "./abils/bombardment";
import rapid_fire from "./abils/rapid_fire";

const dazing_shot = require("./abils/dazing_shot");
const greater_dazing_shot = require("./abils/greater_dazing_shot");
const needle_strike = require("./abils/needle_strike");
const piercing_shot = require("./abils/piercing_shot");
const piercing_shot_bound = require("./abils/piercing_shot_bound");
const corruption_shot = require("./abils/corruption_shot");
const fragmentation_shot = require("./abils/fragmentation_shot");
const snipe = require("./abils/snipe");
const binding_shot = require("./abils/binding_shot");
const tight_bindings = require("./abils/tight_bindings");
const bombardment = require("./abils/bombardment");
const snapshot = require("./abils/snapshot");
const rapid_fire = require("./abils/rapid_fire");
const ricochet = require("./abils/ricochet");
const greater_ricochet = require("./abils/greater_ricochet");

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
    title: 'Binding shot',
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
}

export {abilities}