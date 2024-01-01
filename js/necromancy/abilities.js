import necro_auto from "./abils/necro_auto";
import soul_sap from "./abils/soul_sap";
import touch_of_death from "./abils/touch_of_death";
import skeleton_auto from "./abils/skeleton_auto";
import command_skeleton from "./abils/command_skeleton";
import ghost_auto from "./abils/ghost_auto";
import zombie_auto from "./abils/zombie_auto";
import command_zombie from "./abils/command_zombie";
import finger_of_death from "./abils/finger_of_death";
import death_skulls from "./abils/death_skulls";
import soul_strike from "./abils/soul_strike";
import volley_of_souls from "./abils/volley_of_souls";
import volley_of_souls_3 from "./abils/volley_of_souls_3";
import volley_of_souls_4 from "./abils/volley_of_souls_4";
import volley_of_souls_5 from "./abils/volley_of_souls_5";
import spectral_scythe_1 from "./abils/spectral_scythe_1";
import spectral_scythe_2 from "./abils/spectral_scythe_2";
import spectral_scythe_3 from "./abils/spectral_scythe_3";
import blood_siphon from "./abils/blood_siphon";
import bloat from "./abils/bloat";

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