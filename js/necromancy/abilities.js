import necro_auto from "./abils/necro_auto.js";
import soul_sap from "./abils/soul_sap.js";
import touch_of_death from "./abils/touch_of_death.js";
import skeleton_auto from "./abils/skeleton_auto.js";
import command_skeleton from "./abils/command_skeleton.js";
import ghost_auto from "./abils/ghost_auto.js";
import zombie_auto from "./abils/zombie_auto.js";
import command_zombie from "./abils/command_zombie.js";
import finger_of_death from "./abils/finger_of_death.js";
import death_skulls from "./abils/death_skulls.js";
import soul_strike from "./abils/soul_strike.js";
import volley_of_souls from "./abils/volley_of_souls.js";
import volley_of_souls_3 from "./abils/volley_of_souls_3.js";
import volley_of_souls_4 from "./abils/volley_of_souls_4.js";
import volley_of_souls_5 from "./abils/volley_of_souls_5.js";
import spectral_scythe_1 from "./abils/spectral_scythe_1.js";
import spectral_scythe_2 from "./abils/spectral_scythe_2.js";
import spectral_scythe_3 from "./abils/spectral_scythe_3.js";
import blood_siphon from "./abils/blood_siphon.js";
import bloat from "./abils/bloat.js";
import death_essence from "./abils/death_essence.js";
import death_grasp from "./abils/death_grasp.js";

const abilities = {
  'Necro auto': {
    title: 'Necro auto',
    calc: necro_auto,
    icon: 'assets/ability_icons/necro/30x30/auto.png',
    weapons: ['Dw'],
  },
  //double damage auto
  'Soul Sap': {
    title: 'Soul Sap',
    calc: soul_sap,
    icon: 'assets/ability_icons/necro/30x30/soul-sap.png',
    weapons: ['Dw'],
  },
  'Touch of Death': {
    title: 'Touch of Death',
    calc: touch_of_death,
    icon: 'assets/ability_icons/necro/30x30/tod.png',
    weapons: ['Dw'],
  },
  'Skeleton Auto': {
    title: 'Skeleton auto',
    calc: skeleton_auto,
    icon: 'assets/ability_icons/necro/30x30/conj-skele.png',
    weapons: ['Dw'],
  },
  'Command skeleton': {
    title: 'Command skeleton',
    calc: command_skeleton,
    icon: 'assets/ability_icons/necro/30x30/comm-skele.png',
    weapons: ['Dw'],
  },
  'Ghost Auto': {
    title: 'Ghost auto',
    calc: ghost_auto,
    icon: 'assets/ability_icons/necro/30x30/conj-ghost.png',
    weapons: ['Dw'],
  },
  'Zombie Auto': {
    title: 'Zombie auto',
    calc: zombie_auto,
    icon: 'assets/ability_icons/necro/30x30/conj-zom.png',
    weapons: ['Dw'],
  },
  'Command zombie': {
    title: 'Command zombie',
    calc: command_zombie,
    icon: 'assets/ability_icons/necro/30x30/comm-zom.png',
    weapons: ['Dw'],
  },
  'Finger of Death': {
    title: 'Finger of death',
    calc: finger_of_death,
    icon: 'assets/ability_icons/necro/30x30/FOD.png',
    weapons: ['Dw'],
  },
  //1.5x damage finger
  'Death Skulls': { // 3 or 4
    title: 'Death Skulls',
    calc: death_skulls,
    icon: 'assets/ability_icons/necro/30x30/skulls.png',
    weapons: ['Dw'],
  },
  //death skulls 5 or 7
  'Soul strike': { //main
    title: 'Soul strike',
    calc: soul_strike,
    icon: 'assets/ability_icons/necro/30x30/soul_strike.png',
    weapons: ['Dw'],
  },
  //soul strike flank
  'Volley of Souls': { 
    title: 'Volley of Souls (2 hit)',
    calc: volley_of_souls,
    icon: 'assets/ability_icons/necro/30x30/volley-2.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 3': { 
    title: 'Volley of Souls (3 hit)',
    calc: volley_of_souls_3,
    icon: 'assets/ability_icons/necro/30x30/volley-3.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 4': { 
    title: 'Volley of Souls (4 hit)',
    calc: volley_of_souls_4,
    icon: 'assets/ability_icons/necro/30x30/volley-4.png',
    weapons: ['Dw'],
  },
  'Volley of Souls 5': { 
    title: 'Volley of Souls (5 hit)',
    calc: volley_of_souls_5,
    icon: 'assets/ability_icons/necro/30x30/volley-5.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 1': {
    title: 'Spectral scythe 1',
    calc: spectral_scythe_1,
    icon: 'assets/ability_icons/necro/30x30/scyth-1.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 2': {
    title: 'Spectral scythe 2',
    calc: spectral_scythe_2,
    icon: 'assets/ability_icons/necro/30x30/scyth-2.png',
    weapons: ['Dw'],
  },
  'Spectral scythe 3': {
    title: 'Spectral scythe 3',
    calc: spectral_scythe_3,
    icon: 'assets/ability_icons/necro/30x30/scyth-3.png',
    weapons: ['Dw'],
  },
  //scythe 2
  //scythe 3
  'Blood siphon': {
    title: 'Blood siphon',
    calc: blood_siphon,
    icon: 'assets/ability_icons/necro/30x30/blood-siphon.png',
    weapons: ['Dw'],
  },
  //blood siphon aoe
  'Bloat': {
    title: 'Bloat',
    calc: bloat,
    icon: 'assets/ability_icons/necro/30x30/bloat.png',
    weapons: ['Dw'],
  },
  'Death Grasp': {
    title: 'Death Grasp',
    calc: death_grasp,
    icon: 'assets/ability_icons/necro/30x30/deathguard-bg.png',
    weapons: ['Dw'],
  },
  'Death Essence': {
    title: 'Death Essence',
    calc: death_essence,
    icon: 'assets/ability_icons/necro/30x30/omniguard-bg.png',
    weapons: ['Dw'],
  },
}

export {abilities}