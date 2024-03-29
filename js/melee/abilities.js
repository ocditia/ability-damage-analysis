import chaos_roar from "./abils/chaos_roar.js";
import punish from "./abils/punish.js";
import kick from "./abils/kick.js";
import backhand from "./abils/backhand.js";
import havoc from "./abils/havoc.js";
import smash from "./abils/smash.js";
import bladed_dive from "./abils/bladed_dive.js";
import greater_barge_9t from "./abils/greater_barge_9t.js";
import fury from "./abils/fury.js";
import greater_fury from "./abils/greater_fury.js";
import slice from "./abils/slice.js";
import decimate from "./abils/decimate.js";
import cleave from "./abils/cleave.js";
import sever from "./abils/sever.js";
import dismember from "./abils/dismember.js";
import flurry from "./abils/flurry.js";
import greater_flurry from "./abils/greater_flurry.js";
import stomp from "./abils/stomp.js";
import forceful_backhand from "./abils/forceful_backhand.js";
import quake from "./abils/quake.js";
import slaughter from "./abils/slaughter.js";
import slaughter_walked from "./abils/slaughter_walked.js";
import destroy from "./abils/destroy.js";
import assault from "./abils/assault.js";
import hurricane from "./abils/hurricane.js";
import blood_tendrils from "./abils/blood_tendrils.js";
import overpower from "./abils/overpower.js";
import meteor_strike from "./abils/meteor_strike.js";
import pulverise from "./abils/pulverise.js";
import frenzy from "./abils/frenzy.js";
import massacre from "./abils/massacre.js";
import dragon_claw from "./abils/dragon_claw.js";
import ezk from "./abils/ezk.js";
import dragon_long from "./abils/dragon_long.js";
import granite_maul from "./abils/granite_maul.js";
import icy_tempest from "./abils/icy_tempest.js";
import armadyl_godsword_spec from "./abils/armadyl_godsword_spec.js";
import vestas_longsword_spec from "./abils/vestas_longsword_spec.js";
import dragon_mace_spec from "./abils/dragon_mace_spec.js";
import dragon_dagger_spec from "./abils/dragon_dagger_spec.js";
import vine_whip_spec from "./abils/vine_whip_spec.js";
import dragon_halberd from "./abils/dragon_halberd.js";

const abilities = {
  'Slice': {
    title: 'Slice',
    calc: slice,
    icon: 'assets/ability_icons/melee/30x30/slice.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Chaos roar': {
    title: 'Chaos roar',
    calc: chaos_roar,
    icon: 'assets/ability_icons/melee/30x30/roar.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Punish': {
    title: 'Punish',
    calc: punish,
    icon: 'assets/ability_icons/melee/30x30/punish.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Kick': {
    title: 'Kick',
    calc: kick,
    icon: 'assets/ability_icons/melee/30x30/kick.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Backhand': {
    title: 'Backhand',
    calc: backhand,
    icon: 'assets/ability_icons/melee/30x30/backhand.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Havoc': {
    title: 'Havoc',
    calc: havoc,
    icon: 'assets/ability_icons/melee/30x30/havoc.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Smash': {
    title: 'Smash',
    calc: smash,
    icon: 'assets/ability_icons/melee/30x30/smash.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Bladed dive': {
    title: 'Bladed dive',
    calc: bladed_dive,
    icon: 'assets/ability_icons/melee/30x30/bd.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Greater barge': {
    title: 'Greater barge (9t)',
    calc: greater_barge_9t,
    icon: 'assets/ability_icons/melee/30x30/gbarge.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Fury': {
    title: 'Fury',
    calc: fury,
    icon: 'assets/ability_icons/melee/30x30/fury.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Greater fury': {
    title: 'Greater fury',
    calc: greater_fury,
    icon: 'assets/ability_icons/melee/30x30/gfury.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Decimate': {
    title: 'Decimate',
    calc: decimate,
    icon: 'assets/ability_icons/melee/30x30/deci.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Cleave': {
    title: 'Cleave',
    calc: cleave,
    icon: 'assets/ability_icons/melee/30x30/cleave.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Sever': {
    title: 'Sever',
    calc: sever,
    icon: 'assets/ability_icons/melee/30x30/sever.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dismember': {
    title: 'Dismember',
    calc: dismember,
    icon: 'assets/ability_icons/melee/30x30/dismember.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Stomp': {
    title: 'Stomp',
    calc: stomp,
    icon: 'assets/ability_icons/melee/30x30/stomp.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Flurry': {
    title: 'Flurry',
    calc: flurry,
    icon: 'assets/ability_icons/melee/30x30/flurry.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Greater flurry': {
    title: 'Greater flurry',
    calc: greater_flurry,
    icon: 'assets/ability_icons/melee/30x30/gflurry.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Forceful backhand': {
    title: 'Forceful backhand',
    calc: forceful_backhand,
    icon: 'assets/ability_icons/melee/30x30/forceful.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Quake': {
    title: 'Quake',
    calc: quake,
    icon: 'assets/ability_icons/melee/30x30/quake.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Slaughter': {
    title: 'Slaughter',
    calc: slaughter,
    icon: 'assets/ability_icons/melee/30x30/slaughter.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Slaughter (Walked)': {
    title: 'Slaughter (Walked)',
    calc: slaughter_walked,
    icon: 'assets/ability_icons/melee/30x30/slaughter.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Destroy': {
    title: 'Destroy',
    calc: destroy,
    icon: 'assets/ability_icons/melee/30x30/destroy.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Assault': {
    title: 'Assault',
    calc: assault,
    icon: 'assets/ability_icons/melee/30x30/assault.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Hurricane': {
    title: 'Hurricane',
    calc: hurricane,
    icon: 'assets/ability_icons/melee/30x30/cane.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Blood tendrils': {
    title: 'Blood tendrils',
    calc: blood_tendrils,
    icon: 'assets/ability_icons/melee/30x30/blood-tend.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Overpower': {
    title: 'Overpower',
    calc: overpower,
    icon: 'assets/ability_icons/melee/30x30/overpower.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Meteor Strike': {
    title: 'Meteor Strike',
    calc: meteor_strike,
    icon: 'assets/ability_icons/melee/Meteor_Strike.webp',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Pulverise': {
    title: 'Pulverise',
    calc: pulverise,
    icon: 'assets/ability_icons/melee/30x30/pulverise.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Frenzy': {
    title: 'Frenzy',
    calc: frenzy,
    icon: 'assets/ability_icons/melee/30x30/frenzy.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Massacre': {
    title: 'Massacre',
    calc: massacre,
    icon: 'assets/ability_icons/melee/30x30/massacre.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Ek-ZekKil Spec': {
    title: 'Ek-ZekKil Spec',
    calc: ezk,
    icon: 'assets/ability_icons/melee/30x30/ezk-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Dragon Claw': {
    title: 'Dragon Claw',
    calc: dragon_claw,
    icon: 'assets/ability_icons/melee/30x30/dclaw-bg.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dragon Longsword': {
    title: 'Dragon Longsword',
    calc: dragon_long,
    icon: 'assets/ability_icons/melee/30x30/dlong-bg.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dragon Mace': {
    title: 'Dragon Mace',
    calc: dragon_mace_spec,
    icon: 'assets/ability_icons/melee/dmace.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dragon Dagger': {
    title: 'Dragon Dagger',
    calc: dragon_dagger_spec,
    icon: 'assets/ability_icons/melee/dds.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dragon Halberd': {
    title: 'Dragon halberd',
    calc: dragon_halberd,
    icon: 'assets/ability_icons/melee/30x30/dlong-bg.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Granite Maul': {
    title: 'Granite Maul',
    calc: granite_maul,
    icon: 'assets/ability_icons/melee/30x30/gmaul-bg.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Icy Tempest': {
    title: 'Icy Tempest',
    calc: icy_tempest,
    icon: 'assets/ability_icons/melee/leng.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Armadyl Godsword': {
    title: 'Armadyl Godsword',
    calc: armadyl_godsword_spec,
    icon: 'assets/ability_icons/melee/ags.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Vestas Longsword': {
    title: 'Vestas Longsword',
    calc: vestas_longsword_spec,
    icon: 'assets/ability_icons/melee/vesta.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Vine Whip spec': {
    title: 'Vine Whip spec',
    calc: vine_whip_spec,
    icon: 'assets/ability_icons/melee/vine-whip.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
}

export {abilities}