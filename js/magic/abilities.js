import wrack from "../new_stuff/wrack.js";
import rapid_fire from "../new_stuff/rapid_fire.js";

const abilities = {
  'Wrack': {
    title: 'Wrack',
    calc: wrack,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Rapid Fire': {
    title: 'Rapid Fire',
    calc: rapid_fire,
    icon: 'assets/ability_icons/ranged/30x30/rapid_fire.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}