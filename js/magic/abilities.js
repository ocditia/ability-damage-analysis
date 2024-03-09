import wrack from "./abils/wrack.js";
import wrack_bound from "./abils/wrack_bound.js";
import wrack_and_ruin from "./abils/wrack_ruin.js";
import wrack_and_ruin_bound from "./abils/wrack_ruin_bound.js";
import magma_tempest from "./abils/magma_tempest.js";
import impact from "./abils/impact.js";
import chain from "./abils/chain.js";
import sonic_wave from "./abils/sonic_wave.js";
import greater_sonic_wave from "./abils/greater_sonic_wave.js";
import concentrated_blast from "./abils/concentrated_blast.js";
import greater_concentrated_blast from "./abils/greater_concentrated_blast.js";
import dragon_breath from "./abils/dragon_breath.js";
import combust from "./abils/combust.js";
import combust_walked from "./abils/combust_walked.js";
import corruption_blast from "./abils/corruption_blast.js";
import deep_impact from "./abils/deep_impact.js";
import detonate from "./abils/detonate.js";
import smoke_tendrils from "./abils/smoke_tendrils.js";
import asphyxiate from "./abils/asphyxiate.js";
import wild_magic from "./abils/wild_magic.js";
import tsunami from "./abils/tsunami.js";
import omnipower from "./abils/omnipower.js";
import guthix_staff from "./abils/guthix_staff.js";
import frost_surge from "./abils/frost_surge.js";
import time_strike from "./abils/time_strike.js";
import armadyl_battlestaff from "./abils/armadyl_battlestaff.js";
import ibans_staff_spec from "./abils/ibans_staff_spec.js";
import penance_trident_spec from "./abils/penance_trident_spec.js";

const abilities = {
  'Wrack': {
    title: 'Wrack',
    calc: wrack,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack bound': {
    title: 'Wrack bound',
    calc: wrack_bound,
    icon: 'assets/ability_icons/magic/30x30/wrack.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin': {
    title: 'Wrack and ruin',
    calc: wrack_and_ruin,
    icon: 'assets/ability_icons/magic/30x30/wrack_and_ruin.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin bound': {
    title: 'Wrack and ruin bound',
    calc: wrack_and_ruin_bound,
    icon: 'assets/ability_icons/magic/30x30/wrack_and_ruin.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Magma tempest': {
    title: 'Magma tempest',
    calc: magma_tempest,
    icon: 'assets/ability_icons/magic/30x30/magma_tempest.png',
    weapons: ['2h'],
  },
  'Impact': {
    title: 'Impact',
    calc: impact,
    icon: 'assets/ability_icons/magic/30x30/impact.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Chain': {
    title: 'Chain',
    calc: chain,
    icon: 'assets/ability_icons/magic/30x30/chain.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Sonic wave': {
    title: 'Sonic wave',
    calc: sonic_wave,
    icon: 'assets/ability_icons/magic/30x30/sonic_wave.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater sonic wave': {
    title: 'Greater sonic wave',
    calc: greater_sonic_wave,
    icon: 'assets/ability_icons/magic/30x30/greater_sonic_wave.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Concentrated blast': {
    title: 'Concentrated blast',
    calc: concentrated_blast,
    icon: 'assets/ability_icons/magic/30x30/concentrated_blast.png',
    weapons: ['Dw', 'Md','Ms'],
  },
  'Greater concentrated blast': {
    title: 'Greater concentrated blast',
    calc: greater_concentrated_blast,
    icon: 'assets/ability_icons/magic/30x30/greater_concentrated_blast.png',
    weapons: ['Dw', 'Md','Ms'],
  },
  'Dragon breath': {
    title: 'Dragon breath',
    calc: dragon_breath,
    icon: 'assets/ability_icons/magic/30x30/dragon_breath.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Combust': {
    title: 'Combust',
    calc: combust,
    icon: 'assets/ability_icons/magic/30x30/combust.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Combust (Walked)': {
    title: 'Combust (Walked)',
    calc: combust_walked,
    icon: 'assets/ability_icons/magic/30x30/combust.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Corruption blast': {
    title: 'Corruption blast',
    calc: corruption_blast,
    icon: 'assets/ability_icons/magic/30x30/corruption_blast.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deep impact': {
    title: 'Deep impact',
    calc: deep_impact,
    icon: 'assets/ability_icons/magic/30x30/deep_impact.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Detonate': {
    title: 'Detonate',
    calc: detonate,
    icon: 'assets/ability_icons/magic/30x30/detonate.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Smoke tendrils': {
    title: 'Smoke tendrils',
    calc: smoke_tendrils,
    icon: 'assets/ability_icons/magic/30x30/smoke_tendrils.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Asphyxiate': {
    title: 'Asphyxiate',
    calc: asphyxiate,
    icon: 'assets/ability_icons/magic/30x30/asphyxiate.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wild magic': {
    title: 'Wild magic',
    calc: wild_magic,
    icon: 'assets/ability_icons/magic/30x30/wild_magic.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Tsunami': {
    title: 'Tsunami',
    calc: tsunami,
    icon: 'assets/ability_icons/magic/30x30/tsunami.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Omnipower': {
    title: 'Omnipower',
    calc: omnipower,
    icon: 'assets/ability_icons/magic/30x30/omnipower.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Guthix staff': {
    title: 'Guthix staff',
    calc: guthix_staff,
    icon: 'assets/ability_icons/magic/30x30/guthix_staff-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Frost Surge': {
    title: 'Frost Surge',
    calc: frost_surge,
    icon: 'assets/ability_icons/magic/30x30/frost_surge-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Time Strike': {
    title: 'Time Strike',
    calc: time_strike,
    icon: 'assets/ability_icons/magic/30x30/time_strike-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Armadyl Battlestaff': {
    title: 'Armadyl Battlestaff',
    calc: armadyl_battlestaff,
    icon: 'assets/ability_icons/magic/30x30/armadyl_battlestaff-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Ibans staff spec': {
    title: 'Ibans staff spec',
    calc: ibans_staff_spec,
    icon: 'assets/ability_icons/magic/30x30/armadyl_battlestaff-bg.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Penance Trident spec': {
    title: 'Penance Trident spec',
    calc: penance_trident_spec,
    icon: 'assets/ability_icons/magic/trident.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}