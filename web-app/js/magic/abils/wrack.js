const AbilityDmg = require('../magic_ad');
const OnNPC = require('../magic_on_npc');
const OnHit = require('../magic_on_hit');
const Crit = require('../magic_crit');
const timeStrike = require('./timestrike');
const { channel } = require('diagnostics_channel');

function wrack (type, settings) {
  const numberOfHits = 4;
  const fixedPercent = 0.4;
  const variablePercent = 1.0;
  const basic = true;
  let channeler = 0;
  const isChannel = true;
  const NPC_INS = new OnNPC();
  const HIT_INS = new OnHit();
  const CRIT_INS = new Crit();
  const hits = [];

  for (let hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
    if (isChannel === true) {
      channeler += 1;
    }

    // calculates ability damage
    const AD = settings.AD;

    // sets fixed and variable damage
    let fixed = Math.floor(AD * fixedPercent);
    let variable = Math.floor(AD * variablePercent);

    // applies on-hit effects
    const onHit = HIT_INS.calcOnHit(fixed, variable, settings.prayer, settings.boostedLvls, settings.dharok, settings.exsang, settings.ful, settings.rubyAurora, settings.salve, settings.precise, settings.equilibrium, settings.aura.name, basic);

    // sets up for further calculations
    fixed = onHit[0];
    variable = onHit[1];

    // normal roll calcs
    const dmg = [];
    minCrit = CRIT_INS.minNCritRoll(fixed, variable);
    for (var i = fixed; i < (fixed + variable); i++) {
      let j = i;
      if (j > minCrit) {
        j = CRIT_INS.critDmgBuff(i, channeler, true);
      }

      j = NPC_INS.calcOnNpc(j, settings.kww, settings.enchFlame, settings.vuln, settings.cryptbloom, settings.slayerPerk, settings.slayerSigil, settings.aura.boost, settings.scrimshaw, false);

      if (j > settings.cap) {
        j = settings.cap;
      }

      dmg.push(j);
    }

    // forced crit calcs
    const fcritDmg = [];
    minFCrit = CRIT_INS.calcFCritDmg(fixed, variable);
    for (var i = minFCrit; i < (fixed + variable); i++) {
      i = CRIT_INS.critDmgBuff(i, channeler, true);
      i = NPC_INS.calcOnNpc(i, settings.kww, settings.enchFlame, settings.vuln, settings.cryptbloom, settings.slayerPerk, settings.slayerSigil, settings.aura.boost, settings.scrimshaw, false);

      if (i > settings.cap) {
        i = settings.cap;
      }

      fcritDmg.push(i);
    }

    // set min and max damage
    let dmgMin = dmg[0];
    let dmgMax = dmg[dmg.length - 1];

    // calc average damage
    let regTotal = 0;
    for (var i = 0; i < dmg.length; i++) {
      regTotal += dmg[i];
    }
    const avgReg = regTotal / dmg.length;

    let critTotal = 0;
    for (var i = 0; i < fcritDmg.length; i++) {
      critTotal += fcritDmg[i];
    }
    const avgFCrit = critTotal / fcritDmg.length;

    const fCritChance = CRIT_INS.calcFCritChance(0, settings.gconc, settings.kalg, settings.kalgSpec, settings.reavers, 0, settings.biting);
    let dmgAvg = fCritChance * avgFCrit + (1 - fCritChance) * avgReg;

    // adds fsoa damage
    if (settings.fsoa === true) {
      const fsoa = timeStrike(type, settings);
      dmgMin = dmgMin + fsoa[fsoa.length - 1][0];
      dmgAvg = dmgAvg + fsoa[fsoa.length - 1][1];
      dmgMax = dmgMax + fsoa[fsoa.length - 1][2];

      hits.push([dmgMin, dmgAvg, dmgMax]);
    }
  }

  dmgMin = 0;
  dmgAvg = 0;
  dmgMax = 0;

  for (i in hits) {
    dmgMin += hits[i][0];
    dmgAvg += hits[i][1];
    dmgMax += hits[i][2];
  }

  hits.push([dmgMin, dmgAvg, dmgMax]);
  return hits;
}

module.exports = wrack;
