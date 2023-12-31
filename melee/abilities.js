const chaos_roar = require("./abils/chaos_roar");
const punish = require("./abils/punish");
const kick = require("./abils/kick");
const backhand = require("./abils/backhand");
const havoc = require("./abils/havoc");
const smash = require("./abils/smash");
const bladed_dive = require("./abils/bladed_dive");
const greater_barge_9t = require("./abils/greater_barge_9t");
const fury = require("./abils/fury");
const greater_fury = require("./abils/greater_fury");
const slice = require("./abils/slice");
const decimate = require("./abils/decimate");
const cleave = require("./abils/cleave");
const sever = require("./abils/sever");
const dismember = require("./abils/dismember");
const flurry = require("./abils/flurry");
const greater_flurry = require("./abils/greater_flurry");
const stomp = require("./abils/stomp");
const forceful_backhand = require("./abils/forceful_backhand");
const quake = require("./abils/quake");
const slaughter = require("./abils/slaughter");
const destroy = require("./abils/destroy");
const assault = require("./abils/assault");
const hurricane = require("./abils/hurricane");
const blood_tendrils = require("./abils/blood_tendrils");
const overpower = require("./abils/overpower");
const pulverise = require("./abils/pulverise");
const frenzy = require("./abils/frenzy");
const massacre = require("./abils/massacre");
const dragon_claw = require("./abils/dragon_claw");
const ezk = require("./abils/ezk");
const dragon_long = require("./abils/dragon_long");
const granite_maul = require("./abils/granite_maul");

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