const necro_auto = require("./abils/necro_auto");
const soul_sap = require("./abils/soul_sap");
const touch_of_death = require("./abils/touch_of_death");
const skeleton_auto = require("./abils/skeleton_auto");

const abilities = {
  'Skeleton Auto': {
    title: 'Skeleton auto',
    calc: skeleton_auto,
    icon: 'https://i.imgur.com/9vRoWeK.png',
    weapons: ['Dw'],
  },
  'Necro auto': {
    title: 'Necro auto',
    calc: necro_auto,
    icon: 'https://i.imgur.com/0BtCKqe.png',
    weapons: ['Dw'],
  },
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
  }
}

export {abilities}