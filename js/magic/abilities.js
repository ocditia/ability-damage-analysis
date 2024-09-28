import wrack from "../new_stuff/abils/wrack.js";
import soul_sap from "../new_stuff/abils/soul_sap.js";
import bloat from "../new_stuff/abils/bloat.js";
import skeleton_warrior_auto from "../new_stuff/abils/skeleton_warrior_auto.js";
import rapid_fire_necro from "../new_stuff/abils/rapid_fire_necro.js";

const abilities = {
  'Soul sap': {
    title: 'Soul sap',
    calc: soul_sap,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Bloat': {
    title: 'Bloat',
    calc: bloat,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Skeleton warrior auto': {
    title: 'Skeleton warrior auto',
    calc: skeleton_warrior_auto,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Rapid fire necro': {
    title: 'rapid fire necro',
    calc: rapid_fire_necro,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}  

export {abilities}
