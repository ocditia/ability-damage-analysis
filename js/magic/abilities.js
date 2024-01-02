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

const abilities = {
  'Wrack': {
    title: 'Wrack',
    calc: wrack,
    icon: 'https://i.imgur.com/1SokTxR.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack bound': {
    title: 'Wrack bound',
    calc: wrack_bound,
    icon: 'https://i.imgur.com/1SokTxR.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin': {
    title: 'Wrack and ruin',
    calc: wrack_and_ruin,
    icon: 'https://i.imgur.com/ARdyBBp.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin bound': {
    title: 'Wrack and ruin bound',
    calc: wrack_and_ruin_bound,
    icon: 'https://i.imgur.com/ARdyBBp.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Magma tempest': {
    title: 'Magma tempest',
    calc: magma_tempest,
    icon: 'https://i.imgur.com/NCmGpc2.png',
    weapons: ['2h'],
  },
  'Impact': {
    title: 'impact',
    calc: impact,
    icon: 'https://i.imgur.com/etm6PDI.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Chain': {
    title: 'chain',
    calc: chain,
    icon: 'https://i.imgur.com/C45quRI.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Sonic wave': {
    title: 'Sonic wave',
    calc: sonic_wave,
    icon: 'https://i.imgur.com/m66Ac4V.png',
    weapons: ['2h'],
  },
  'Greater sonic wave': {
    title: 'Greater sonic wave',
    calc: greater_sonic_wave,
    icon: 'https://i.imgur.com/wJ7qEjx.png',
    weapons: ['2h'],
  },
  'Concentrated blast': {
    title: 'Concentrated blast',
    calc: concentrated_blast,
    icon: 'https://i.imgur.com/UJYcqg0.png',
    weapons: ['Dw', 'Md'],
  },
  'Greater concentrated blast': {
    title: 'Greater concentrated blast',
    calc: greater_concentrated_blast,
    icon: 'https://i.imgur.com/3Xhdk2t.png',
    weapons: ['Dw', 'Md'],
  },
  'Dragon breath': {
    title: 'Dragon breath',
    calc: dragon_breath,
    icon: 'https://i.imgur.com/oNghEbN.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Combust': {
    title: 'Combust',
    calc: combust,
    icon: 'https://i.imgur.com/nEpQ5hu.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Corruption blast': {
    title: 'Corruption blast',
    calc: corruption_blast,
    icon: 'https://i.imgur.com/4Art6Hf.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deep impact': {
    title: 'Deep impact',
    calc: deep_impact,
    icon: 'https://i.imgur.com/5AHnrTj.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Detonate': {
    title: 'Detonate',
    calc: detonate,
    icon: 'https://i.imgur.com/Pmmg5uQ.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Smoke tendrils': {
    title: 'Smoke tendrils',
    calc: smoke_tendrils,
    icon: 'https://i.imgur.com/i87uOaX.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Asphyxiate': {
    title: 'Asphyxiate',
    calc: asphyxiate,
    icon: 'https://i.imgur.com/ji1SENd.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wild magic': {
    title: 'Wild magic',
    calc: wild_magic,
    icon: 'https://i.imgur.com/4Jb6sAB.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Tsunami': {
    title: 'Tsunami',
    calc: tsunami,
    icon: 'https://i.imgur.com/nS7EqoG.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Omnipower': {
    title: 'Omnipower',
    calc: omnipower,
    icon: 'https://i.imgur.com/rIaeB6U.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Guthix staff': {
    title: 'Guthix staff',
    calc: guthix_staff,
    icon: 'https://i.imgur.com/sOXLRLp.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Frost Surge': {
    title: 'Frost Surge',
    calc: frost_surge,
    icon: 'https://i.imgur.com/w8RvYQh.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Time Strike': {
    title: 'Time Strike',
    calc: time_strike,
    icon: 'https://i.imgur.com/vhktD3Y.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Armadyl Battlestaff': {
    title: 'Armadyl Battlestaff',
    calc: armadyl_battlestaff,
    icon: 'https://i.imgur.com/KG47SN8.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}