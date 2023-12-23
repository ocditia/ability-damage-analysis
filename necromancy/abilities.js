const necro_auto = require("./abils/necro_auto");
const soul_sap = require("./abils/soul_sap");
const touch_of_death = require("./abils/touch_of_death");
const skeleton_auto = require("./abils/skeleton_auto");
const ghost_auto = require("./abils/ghost_auto");
const zombie_auto = require("./abils/zombie_auto");
const command_zombie = require("./abils/command_zombie");
const finger_of_death = require("./abils/finger_of_death");
const death_skulls = require("./abils/death_skulls");
const soul_strike = require("./abils/soul_strike");
const volley_of_souls = require("./abils/volley_of_souls");

const abilities = {
  'Necro auto': {
    title: 'Necro auto',
    calc: necro_auto,
    icon: 'https://i.imgur.com/0BtCKqe.png',
    weapons: ['Dw'],
  },
  //double damage auto
  'Soul Sap': {
    title: 'Soul Sap',
    calc: soul_sap,
    icon: 'https://i.imgur.com/iEEQbfY.png',
    weapons: ['Dw'],
  },
  'Touch of Death': {
    title: 'Touch of Death',
    calc: touch_of_death,
    icon: 'https://i.imgur.com/IedSQbM.png',
    weapons: ['Dw'],
  },
  'Skeleton Auto': {
    title: 'Skeleton auto',
    calc: skeleton_auto,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  //command skeleton
  'Ghost Auto': {
    title: 'Ghost auto',
    calc: ghost_auto,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  'Zombie Auto': {
    title: 'Zombie auto',
    calc: zombie_auto,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  'Command zombie': {
    title: 'Command zombie',
    calc: command_zombie,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  'Finger of Death': {
    title: 'Finger of death',
    calc: finger_of_death,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  //1.5x damage finger
  'Death Skulls': { // 3 or 4
    title: 'Death Skulls',
    calc: death_skulls,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  //death skulls 5 or 7
  'Soul strike': { //main
    title: 'Soul strike',
    calc: soul_strike,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  //soul strike flank
  'Volley of Souls': { //3 hits
    title: 'Volley of Souls',
    calc: volley_of_souls,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  }
  //volley of souls 4 hit
  //volley of souls 5 hit
  //scythe 1
  //scythe 2
  //scythe 3
  //blood siphon
  //blood siphon aoe
  //bloat
}

export {abilities}