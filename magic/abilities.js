const necro_auto = require("./abils/necro_auto");
const soul_sap = require("./abils/soul_sap");
const touch_of_death = require("./abils/touch_of_death");
const skeleton_auto = require("./abils/skeleton_auto");
const command_skeleton = require("./abils/command_skeleton");
const ghost_auto = require("./abils/ghost_auto");
const zombie_auto = require("./abils/zombie_auto");
const command_zombie = require("./abils/command_zombie");
const finger_of_death = require("./abils/finger_of_death");
const death_skulls = require("./abils/death_skulls");
const soul_strike = require("./abils/soul_strike");
const volley_of_souls = require("./abils/volley_of_souls");
const volley_of_souls_3 = require("./abils/volley_of_souls_3");
const volley_of_souls_4 = require("./abils/volley_of_souls_4");
const volley_of_souls_5 = require("./abils/volley_of_souls_5");
const spectral_scythe_1 = require("./abils/spectral_scythe_1");
const spectral_scythe_2 = require("./abils/spectral_scythe_2");
const spectral_scythe_3 = require("./abils/spectral_scythe_3");
const blood_siphon = require("./abils/blood_siphon");
const bloat = require("./abils/bloat");

const abilities = {
  'Necro auto': {
    title: 'Necro auto',
    calc: necro_auto,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['Dw'],
  },
  //double damage auto
  'Soul Sap': {
    title: 'Soul Sap',
    calc: soul_sap,
    icon: 'https://imgur.com/w3wifVr.png',
    weapons: ['Dw'],
  },
  'Touch of Death': {
    title: 'Touch of Death',
    calc: touch_of_death,
    icon: 'https://imgur.com/w2C47Vu.png',
    weapons: ['Dw'],
  },
  'Skeleton Auto': {
    title: 'Skeleton auto',
    calc: skeleton_auto,
    icon: 'https://imgur.com/6OIgT8W.png',
    weapons: ['Dw'],
  },
  'Command skeleton': {
    title: 'Command skeleton',
    calc: command_skeleton,
    icon: 'https://imgur.com/fmnObgi.png',
    weapons: ['Dw'],
  },
  'Ghost Auto': {
    title: 'Ghost auto',
    calc: ghost_auto,
    icon: 'https://imgur.com/kRqMO2J.png',
    weapons: ['Dw'],
  },
  'Zombie Auto': {
    title: 'Zombie auto',
    calc: zombie_auto,
    icon: 'https://imgur.com/Ku5QFiN.png',
    weapons: ['Dw'],
  },
  'Command zombie': {
    title: 'Command zombie',
    calc: command_zombie,
    icon: 'https://imgur.com/dGRo6Ju.png',
    weapons: ['Dw'],
  },
  'Finger of Death': {
    title: 'Finger of death',
    calc: finger_of_death,
    icon: 'https://imgur.com/cG0MEQu.png',
    weapons: ['Dw'],
  },
  //1.5x damage finger
  'Death Skulls': { // 3 or 4
    title: 'Death Skulls',
    calc: death_skulls,
    icon: 'https://imgur.com/PkLq6GN.png',
    weapons: ['Dw'],
  },
  //death skulls 5 or 7
  'Soul strike': { //main
    title: 'Soul strike',
    calc: soul_strike,
    icon: 'https://i.imgur.com/vym9cV5.png',
    weapons: ['Dw'],
  },
  //soul strike flank
  'Volley of Souls': { 
    title: 'Volley of Souls (2 hit)',
    calc: volley_of_souls,
    icon: 'https://imgur.com/WsFgZ68.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 3': { 
    title: 'Volley of Souls (3 hit)',
    calc: volley_of_souls_3,
    icon: 'https://imgur.com/vtqBnvu.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 4': { 
    title: 'Volley of Souls (4 hit)',
    calc: volley_of_souls_4,
    icon: 'https://imgur.com/V2NNKC9.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 5': { 
    title: 'Volley of Souls (5 hit)',
    calc: volley_of_souls_5,
    icon: 'https://imgur.com/QWxXIzI.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 1': {
    title: 'Spectral scythe 1',
    calc: spectral_scythe_1,
    icon: 'https://imgur.com/XgTBlsF.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 2': {
    title: 'Spectral scythe 2',
    calc: spectral_scythe_2,
    icon: 'https://imgur.com/agSlUfr.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 3': {
    title: 'Spectral scythe 3',
    calc: spectral_scythe_3,
    icon: 'https://imgur.com/6lUsxhr.png',
    weapons: ['Dw'],
  },
  //scythe 2
  //scythe 3
  'Blood siphon': {
    title: 'Blood siphon',
    calc: blood_siphon,
    icon: 'https://imgur.com/rvscfMz.png',
    weapons: ['Dw'],
  },
  //blood siphon aoe
  'Bloat': {
    title: 'Bloat',
    calc: bloat,
    icon: 'https://imgur.com/Aiuhjud.png',
    weapons: ['Dw'],
  },
}

export {abilities}