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
import destroy from "./abils/destroy.js";
import assault from "./abils/assault.js";
import hurricane from "./abils/hurricane.js";
import blood_tendrils from "./abils/blood_tendrils.js";
import overpower from "./abils/overpower.js";
import pulverise from "./abils/pulverise.js";
import frenzy from "./abils/frenzy.js";
import massacre from "./abils/massacre.js";
import dragon_claw from "./abils/dragon_claw.js";
import ezk from "./abils/ezk.js";
import dragon_long from "./abils/dragon_long.js";
import granite_maul from "./abils/granite_maul.js";

const abilities = {
  'Slice': {
    title: 'Slice',
    calc: slice,
    icon: 'https://i.imgur.com/6WFgj22.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Chaos roar': {
    title: 'Chaos roar',
    calc: chaos_roar,
    icon: 'https://i.imgur.com/y7hSu7B.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Punish': {
    title: 'Punish',
    calc: punish,
    icon: 'https://i.imgur.com/fTfILfz.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Kick': {
    title: 'Kick',
    calc: kick,
    icon: 'https://i.imgur.com/Cya3BGt.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Backhand': {
    title: 'Backhand',
    calc: backhand,
    icon: 'https://i.imgur.com/BBg4gTg.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Haovc': {
    title: 'Havoc',
    calc: havoc,
    icon: 'https://i.imgur.com/VSITfMt.png',
    weapons: ['Dw','Md'],
  },
  'Smash': {
    title: 'Smash',
    calc: smash,
    icon: 'https://i.imgur.com/OsPT7VD.png',
    weapons: ['2h'],
  },
  'Bladed dive': {
    title: 'Bladed dive',
    calc: bladed_dive,
    icon: 'https://i.imgur.com/8mtMBwp.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Greater barge': {
    title: 'Greater barge (9t)',
    calc: greater_barge_9t,
    icon: 'https://i.imgur.com/FqidY8x.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Fury': {
    title: 'Fury',
    calc: fury,
    icon: 'https://i.imgur.com/CcNJ0n9.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Greater fury': {
    title: 'Greatery fury',
    calc: greater_fury,
    icon: 'https://i.imgur.com/7wGyyol.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Decimate': {
    title: 'Decimate',
    calc: decimate,
    icon: 'https://i.imgur.com/Yy6d92a.png',
    weapons: ['Dw','Md'],
  },
  'Cleave': {
    title: 'Cleave',
    calc: cleave,
    icon: 'https://i.imgur.com/92RTdk3.png',
    weapons: ['2h'],
  },
  'Sever': {
    title: 'Sever',
    calc: sever,
    icon: 'https://i.imgur.com/KnhZj1G.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dismember': {
    title: 'Dismember',
    calc: dismember,
    icon: 'https://i.imgur.com/edEuTFj.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Stomp': {
    title: 'Stomp',
    calc: stomp,
    icon: 'https://i.imgur.com/BJ2w8Jr.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Flurry': {
    title: 'Flurry',
    calc: flurry,
    icon: 'https://i.imgur.com/EOdgNnR.png',
    weapons: ['Dw','Md'],
  },
  'Greater flurry': {
    title: 'Greater flurry',
    calc: greater_flurry,
    icon: 'https://i.imgur.com/sGtFHwR.png',
    weapons: ['Dw','Md'],
  },
  'Forceful backhand': {
    title: 'Forceful backhand',
    calc: forceful_backhand,
    icon: 'https://i.imgur.com/Xp8aazI.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Quake': {
    title: 'Quake',
    calc: quake,
    icon: 'https://i.imgur.com/9H3gcD5.png',
    weapons: ['2h'],
  },
  'Slaughter': {
    title: 'Slaughter',
    calc: slaughter,
    icon: 'https://i.imgur.com/ungyWll.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Destroy': {
    title: 'Destroy',
    calc: destroy,
    icon: 'https://i.imgur.com/FCL0msU.png',
    weapons: ['Dw','Md'],
  },
  'Assault': {
    title: 'Assault',
    calc: assault,
    icon: 'https://i.imgur.com/kbhPFCm.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Hurricane': {
    title: 'Hurricane',
    calc: hurricane,
    icon: 'https://i.imgur.com/zurrG1S.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Blood tendrils': {
    title: 'Blood tendrils',
    calc: blood_tendrils,
    icon: 'https://i.imgur.com/d1Yojp1.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Overpower': {
    title: 'Overpower',
    calc: overpower,
    icon: 'https://i.imgur.com/99xE1pT.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Pulverise': {
    title: 'Pulverise',
    calc: pulverise,
    icon: 'https://i.imgur.com/E6UxTqQ.png',
    weapons: ['2h'],
  },
  'Frenzy': {
    title: 'Frenzy',
    calc: frenzy,
    icon: 'https://i.imgur.com/zxZmTjz.png',
    weapons: ['Dw','Md'],
  },
  'Massacre': {
    title: 'Massacre',
    calc: massacre,
    icon: 'https://i.imgur.com/PQ0l2te.png',
    weapons: ['Dw','Md'],
  },
  'Ek-ZekKil Spec': {
    title: 'Ek-ZekKil Spec',
    calc: ezk,
    icon: 'https://i.imgur.com/IbC2PCj.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Dragon Claw': {
    title: 'Dragon Claw',
    calc: dragon_claw,
    icon: 'https://i.imgur.com/ikIIMnK.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Dragon Longsword': {
    title: 'Dragon Longsword',
    calc: dragon_long,
    icon: 'https://i.imgur.com/CnA1HKN.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
  'Granite Maul': {
    title: 'Granite Maul',
    calc: granite_maul,
    icon: 'https://i.imgur.com/vt0e9lV.png',
    weapons: ['Dw','2h','Md','Ms'],
  },
}

export {abilities}