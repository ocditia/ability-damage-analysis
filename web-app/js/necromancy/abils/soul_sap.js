const AbilityDmg = require("../necromancy_ad");
const OnNPC = require("../necromancy_on_npc");
const OnHit = require("../necromancy_on_hit");
const Crit = require("../necromancy_crit");
const { channel } = require("diagnostics_channel");

function necro_auto(type, settings) {
  const numberOfHits = 1;
  const fixedPercent = 0.9;
  const variablePercent = 0.2;
  const NPC_INS = new OnNPC();
  const HIT_INS = new OnHit();
  const CRIT_INS = new Crit();
  const hits = [];

  for (let hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
    // calculates ability damage
    const AD = settings.AD;

    // sets fixed and variable damage
    let fixed = Math.floor(AD * fixedPercent);
    let variable = Math.floor(AD * variablePercent);

    // applies on-hit effects
    const onHit = HIT_INS.calcOnHit(
      fixed,
      variable,
      settings.prayer,
      settings.dharok,
      settings.ful,
      settings.rubyAurora,
      settings.salve,
      settings.precise,
      settings.equilibrium,
      settings.aura.name,
    );

    // sets up for further calculations
    fixed = onHit[0];
    variable = onHit[1];

    // normal roll calcs
    const dmg = [];
    const critDmg = [];
    for (var i = fixed; i < fixed + variable; i++) {
      let j = i;

      crit = CRIT_INS.critDmgBuff(j);
      j = NPC_INS.calcOnNpc(
        j,
        settings.vuln,
        settings.cryptbloom,
        settings.slayerPerk,
        settings.slayerSigil,
        settings.aura.boost,
        settings.scrimshaw,
      );
      crit = NPC_INS.calcOnNpc(
        crit,
        settings.kww,
        settings.enchFlame,
        settings.vuln,
        settings.cryptbloom,
        settings.slayerPerk,
        settings.slayerSigil,
        settings.aura.boost,
        settings.scrimshaw,
        false,
      );

      if (j > settings.cap) {
        j = settings.cap;
      }

      if (crit > settings.cap) {
        crit = settings.cap;
      }

      dmg.push(j);
      critDmg.push(crit);
    }

    // set min and max damage
    const dmgMin = dmg[0];
    const dmgMax = dmg[dmg.length - 1];

    // calc average damage
    let regTotal = 0;
    for (var i = 0; i < dmg.length; i++) {
      regTotal += dmg[i];
    }
    const avgReg = regTotal / dmg.length;

    let critTotal = 0;
    for (var i = 0; i < critDmg.length; i++) {
      critTotal += critDmg[i];
    }
    const avgCrit = critTotal / critDmg.length;

    fCritChance = CRIT_INS.calcFCritChance(
      0,
      settings.gconc,
      settings.kalg,
      settings.kalgSpec,
      settings.reavers,
      0,
      settings.biting,
    );
    const dmgAvg = fCritChance * avgCrit + (1 - fCritChance) * avgReg;

    hits.push([dmgMin, dmgAvg, dmgMax]);
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

module.exports = necro_auto;
