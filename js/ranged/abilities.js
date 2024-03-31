import dazing_shot from "./abils/dazing_shot.js";
import greater_dazing_shot from "./abils/greater_dazing_shot.js";
import needle_strike from "./abils/needle_strike.js";
import piercing_shot from "./abils/piercing_shot.js";
import piercing_shot_bound from "./abils/piercing_shot_bound.js";
import corruption_shot from "./abils/corruption_shot.js";
import fragmentation_shot from "./abils/fragmentation_shot.js";
import fragmentation_shot_walked from "./abils/fragmentation_shot_walked.js";
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
import zamorak_bow_spec from "./abils/zamorak_bow_spec.js";
import morrigans_javelin from "./abils/morrigans_javelin.js";

const abilities = {
  'Dazing Shot': {
    title: 'Dazing Shot',
    calc: dazing_shot,
    icon: 'assets/ability_icons/ranged/30x30/dazing.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater Dazing Shot': {
    title: 'Greater Dazing Shot',
    calc: greater_dazing_shot,
    icon: 'assets/ability_icons/ranged/30x30/MDS.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Needle Strike': {
    title: 'Needle Strike',
    calc: needle_strike,
    icon: 'assets/ability_icons/ranged/30x30/needle.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Piercing Shot': {
    title: 'Piercing Shot',
    calc: piercing_shot,
    icon: 'assets/ability_icons/ranged/30x30/piercing.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Piercing Shot Bound': {
    title: 'Piercing Shot Bound',
    calc: piercing_shot_bound,
    icon: 'assets/ability_icons/ranged/30x30/piercing-bound.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Ricochet': {
    title: 'Ricochet',
    calc: ricochet,
    icon: 'assets/ability_icons/ranged/30x30/rico.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater ricochet': {
    title: 'Greater ricochet',
    calc: greater_ricochet,
    icon: 'assets/ability_icons/ranged/30x30/grico.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Corruption Shot': {
    title: 'Corruption Shot',
    calc: corruption_shot,
    icon: 'assets/ability_icons/ranged/30x30/corrupt.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Fragmentation Shot': {
    title: 'Fragmentation Shot',
    calc: fragmentation_shot,
    icon: 'assets/ability_icons/ranged/30x30/frag.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Fragmentation Shot (Walked)': {
    title: 'Fragmentation Shot (Walked)',
    calc: fragmentation_shot_walked,
    icon: 'assets/ability_icons/ranged/30x30/frag.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Snipe': {
    title: 'Snipe',
    calc: snipe,
    icon: 'assets/ability_icons/ranged/30x30/snipe.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Binding shot': {
    title: 'Binding shot',
    calc: binding_shot,
    icon: 'assets/ability_icons/ranged/30x30/binding.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Tight bindings': {
    title: 'Tight bindings',
    calc: tight_bindings,
    icon: 'assets/ability_icons/ranged/30x30/tight-bind.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bombardment': {
    title: 'Bombardment',
    calc: bombardment,
    icon: 'assets/ability_icons/ranged/30x30/bombard.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Shadow tendrils': {
    title: 'Shadow tendrils',
    calc: shadow_tendrils,
    icon: 'assets/ability_icons/ranged/30x30/shadow-tend.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Snapshot': {
    title: 'Snapshot',
    calc: snapshot,
    icon: 'assets/ability_icons/ranged/30x30/snapshot.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Rapid fire': {
    title: 'Rapid fire',
    calc: rapid_fire,
    icon: 'assets/ability_icons/ranged/30x30/rapid.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deadshot': {
    title: 'Deadshot',
    calc: deadshot,
    icon: 'assets/ability_icons/ranged/30x30/deadshot.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Incendiary shot': {
    title: 'Incendiary shot',
    calc: incendiary_shot,
    icon: 'assets/ability_icons/ranged/30x30/incend.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Unload': {
    title: 'Unload',
    calc: unload,
    icon: 'assets/ability_icons/ranged/30x30/unload.png',
    weapons: ['Dw','Md','Ms'],
  },
  'Darkbow': {
    title: 'Darkbow (65%)',
    calc: dark_bow_spec,
    icon: 'assets/ability_icons/ranged/30x30/dbow-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bolg': {
    title: 'Bolg (30%)',
    calc: bolg_spec,
    icon: 'assets/ability_icons/ranged/30x30/botlg-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Magic shortbow': {
    title: 'Magic shortbow (50%)',
    calc: magic_short_bow_spec,
    icon: 'assets/ability_icons/ranged/30x30/magic-shortbow-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Seren Godbow': {
    title: 'Seren Godbow (30%)',
    calc: sgb_spec,
    icon: 'assets/ability_icons/ranged/30x30/sgb-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Zamorak godbow': {
    title: 'Zamorak godbow spec (40%)',
    calc: zamorak_bow_spec,
    icon: 'assets/ability_icons/ranged/zbow.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Morrigans javelin': {
    title: 'Morrigans javelin (50%)',
    calc: morrigans_javelin,
    icon: 'assets/ability_icons/ranged/30x30/morrigan_jav.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}