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


const abilities = {
  'Slice': {
    title: 'Slice',
    calc: slice,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Chaos roar': {
    title: 'Chaos roar',
    calc: chaos_roar,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Punish': {
    title: 'Punish',
    calc: punish,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Kick': {
    title: 'Kick',
    calc: kick,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Backhand': {
    title: 'Backhand',
    calc: backhand,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Haovc': {
    title: 'Havoc',
    calc: havoc,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Smash': {
    title: 'Smash',
    calc: smash,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bladed dive': {
    title: 'Bladed dive',
    calc: bladed_dive,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater barge': {
    title: 'Greater barge (9t)',
    calc: greater_barge_9t,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Fury': {
    title: 'Fury',
    calc: fury,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater fury': {
    title: 'Greatery fury',
    calc: greater_fury,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Decimate': {
    title: 'Decimate',
    calc: decimate,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Cleave': {
    title: 'Cleave',
    calc: cleave,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Sever': {
    title: 'Sever',
    calc: sever,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Dismember': {
    title: 'Dismember',
    calc: dismember,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Flurry': {
    title: 'Flurry',
    calc: flurry,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater flurry': {
    title: 'Greater flurry',
    calc: greater_flurry,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Stomp': {
    title: 'Stomp',
    calc: stomp,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Forceful backhand': {
    title: 'Forceful backhand',
    calc: forceful_backhand,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Slaughter': {
    title: 'Slaughter',
    calc: slaughter,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Destroy': {
    title: 'Destroy',
    calc: destroy,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Assault': {
    title: 'Assault',
    calc: assault,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Hurricane': {
    title: 'Hurricane',
    calc: hurricane,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Blood tendrils': {
    title: 'Blood tendrils',
    calc: blood_tendrils,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Overpower': {
    title: 'Overpower',
    calc: overpower,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Pulverise': {
    title: 'Pulverise',
    calc: pulverise,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Frenzy': {
    title: 'Frenzy',
    calc: frenzy,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Massacre': {
    title: 'Massacre',
    calc: massacre,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}