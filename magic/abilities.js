const wrack = require("./abils/wrack");
const wrack_bound = require("./abils/wrack_bound");
const wrack_and_ruin = require("./abils/wrack_ruin");
const wrack_and_ruin_bound = require("./abils/wrack_ruin_bound");
const magma_tempest = require("./abils/magma_tempest");
const impact = require("./abils/impact");
const chain = require("./abils/chain");
const sonic_wave = require("./abils/sonic_wave");
const greater_sonic_wave = require("./abils/greater_sonic_wave");
const concentrated_blast = require("./abils/concentrated_blast");
const greater_concentrated_blast = require("./abils/greater_concentrated_blast");
const dragon_breath = require("./abils/dragon_breath");
const combust = require("./abils/combust");
const corruption_blast = require("./abils/corruption_blast");
const deep_impact = require("./abils/deep_impact");
const detonate = require("./abils/detonate");
const smoke_tendrils = require("./abils/smoke_tendrils");
const asphyxiate = require("./abils/asphyxiate");
const wild_magic = require("./abils/wild_magic");
const tsunami = require("./abils/tsunami");
const omnipower = require("./abils/omnipower");
const guthix_staff = require("./abils/guthix_staff");

const abilities = {
  'Wrack': {
    title: 'Wrack',
    calc: wrack,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack bound': {
    title: 'Wrack bound',
    calc: wrack_bound,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin': {
    title: 'Wrack and ruin',
    calc: wrack_and_ruin,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wrack and ruin bound': {
    title: 'Wrack and ruin bound',
    calc: wrack_and_ruin_bound,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Magma tempest': {
    title: 'Magma tempest',
    calc: magma_tempest,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Impact': {
    title: 'impact',
    calc: impact,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Chain': {
    title: 'chain',
    calc: chain,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Sonic wave': {
    title: 'Sonic wave',
    calc: wrack_and_ruin,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater sonic wave': {
    title: 'Greater sonic wave',
    calc: greater_sonic_wave,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Concentrated blast': {
    title: 'Concentrated blast',
    calc: concentrated_blast,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Greater concentrated blast': {
    title: 'Greater concentrated blast',
    calc: greater_concentrated_blast,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Dragon breath': {
    title: 'Dragon breath',
    calc: dragon_breath,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Combust': {
    title: 'Combust',
    calc: combust,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Corruption blast': {
    title: 'Corruption blast',
    calc: corruption_blast,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Deep impact': {
    title: 'Deep impact',
    calc: deep_impact,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Detonate': {
    title: 'Detonate',
    calc: detonate,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Smoke tendrils': {
    title: 'Smoke tendrils',
    calc: smoke_tendrils,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Asphyxiate': {
    title: 'Asphyxiate',
    calc: asphyxiate,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Wild magic': {
    title: 'Wild magic',
    calc: wild_magic,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Tsunami': {
    title: 'Tsunami',
    calc: tsunami,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Omnipower': {
    title: 'Omnipower',
    calc: omnipower,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
  'Guthix staff': {
    title: 'Guthix staff',
    calc: guthix_staff,
    icon: 'https://imgur.com/MVogErK.png',
    weapons: ['2h','Dw','Md','Ms'],
  },
}

export {abilities}