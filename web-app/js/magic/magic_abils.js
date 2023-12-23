const { WieldType } = require('../types/types');
const OnNPC = require('./magic_on_npc');
const OnHit = require('./magic_on_hit');
const Crit = require('./magic_crit');

class MagicAbils {
  constructor (output, settings) {
    this.hit = new OnHit(settings);
    this.fcrit = new Crit(settings);
    this.npc = new OnNPC(settings);
    this.output = output;
  }

  timeStrike (type) {
    let ad;

    if (type === WieldType.TWO_HAND) {
      ad = CAST_INS.ad[0];
    } else if (type === WieldType.DUAL_WIELD) {
      ad = CAST_INS.ad[1];
    } else if (type === WieldType.MH_AND_SHIELD) {
      ad = CAST_INS.ad[2];
    } else {
      ad = 0;
    }

    const fixed = Math.floor(ad * 0.6);
    const variable = Math.floor(ad * 0.6);
    const channelers = 0;

    const dmg = this.hit.computeOnHit(fixed, variable, SET_INS.preciseRank, SET_INS.equilibriumRank, true);

    const onHitMin = [dmg[0][0], dmg[1][0]];
    const onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]];
    const onHitAvg = [dmg[0][0] + Math.floor(0.5 * dmg[0][1]), dmg[1][0] + Math.floor(0.5 * dmg[1][1])];
    const fcritChance = this.fcrit.computeFCritChance(channelers, SET_INS.gconc);
    const fcritAvg = [this.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1], channelers), this.fcrit.computeFCritDmg(dmg[1][0], dmg[1][1], channelers)];

    let onNpc;

    if (this.output === 'Min') {
      onNpc = onHitMin;
    } else if (this.output === 'Average') {
      onNpc = onHitAvg;
    } else if (this.output === 'Max') {
      onNpc = onHitMax;
    }

    onNpc = this.npc.computeOnNpc(onNpc[0], onNpc[1]);
    const onNpcFCrit = this.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1]);

    let regular, sun, meta;

    if (this.output === 'Average') {
      regular = Math.floor(onNpc[0] * (1 - fcritChance)) + Math.floor(onNpcFCrit[0] * fcritChance);
      sun = Math.floor(onNpc[1] * (1 - fcritChance)) + Math.floor(onNpcFCrit[1] * fcritChance);
      meta = Math.floor(onNpc[2] * (1 - fcritChance)) + Math.floor(onNpcFCrit[2] * fcritChance);
    } else {
      regular = onNpc[0];
      sun = onNpc[1];
      meta = onNpc[2];
    }

    return [regular, sun, meta];
  }
}

// TODO Move into type
const settings = {
  level: 99,
  potion: 'Elder overload',
  prayer: 'Affliction',
  mh: {
    name: 'Wand of the praesul',
    tier: 92,
    precise: 0,
    equilibrium: 0,
    aftershock: 0,
    flanking: 0,
    spendthrift: 0,
    lunging: 0,
    ruthless: 0
  },

  oh: {
    name: 'Seismic singularity',
    tier: 92,
    precise: 0,
    equilibrium: 0,
    aftershock: 0,
    flanking: 0,
    spendthrift: 0,
    lunging: 0,
    ruthless: 0
  },

  th: {
    name: 'Noxious staff',
    tier: 90,
    precise: 0,
    equilibrium: 0,
    aftershock: 0,
    flanking: 0,
    spendthrift: 0,
    lunging: 0,
    ruthless: 0
  },

  sh: {
    name: 'Kalphite rebounder',
    tier: 90,
    type: 'defender',
    precise: 0,
    equilibrium: 0,
    aftershock: 0,
    flanking: 0,
    spendthrift: 0,
    lunging: 0,
    ruthless: 0
  },

  helm: 'Tectonic mask',
  neck: 'Reaper necklace',
  body: 'Tectonic robe top',
  legs: 'Tectonic robe bottom',
  boots: 'Enhnanced blast diffusion boots',
  gloves: 'Enhanced kerapac',
  ring: 'Reavers',
  cape: 'Igneous',
  pocket: 'Grimoire',
  aura: 'Maniacal',
  'biting-rank': 4,
  'armour-20': true,
  nope: 0,
  vuln: 0,
  sc: 0,
  fsoa: 0,
  kalg: 0,
  'kalg-spec': 0,
  ful: 0,
  'zerk-ess': 0,
  'reaper-crew': 1,
  gconc: 0,
  'ench-meta': 1,
  'ench-aff': 1,
  'ench-flame': 1,
  'hex-hunter': 0,
  'ripper-passive': 0,
  dharok: 0,
  exsang: 0,
  'ruby-aurora': 0,
  sigil: 0,
  cryptbloom: 0,
  'slayer-perk': 0,
  kww: 0,
  flowStacks: 0
};

const magic = new MagicAbils('Average');
const test = magic.timeStrike('Two-hand', settings);

console.log(test);
