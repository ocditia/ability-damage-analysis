class Crit {
  calcFCritChance(
    channeler_stacks,
    gconc,
    kalg,
    kalgSpec,
    reavers,
    grim,
    biting,
  ) {
    const fcrit =
      0.05 * kalgSpec +
      0.01 * kalg +
      0.05 * reavers +
      0.12 * grim +
      biting +
      0.05 * gconc +
      0.04 * channeler_stacks;
    return fcrit;
  }

  calcFCritDmg(fixed, variable) {
    const fcritMin = fixed + 0.95 * variable;

    return fcritMin;
  }

  //   calcNCritChance(fixed, variable, fcrit) {
  //       const maxHit = fixed + variable;
  //      const minCrit = Math.floor(maxHit * 0.95);
  //        const ncrit = (1 - fcrit) * ((maxHit - minCrit + 1) / variable);
  //
  //        return ncrit;
  //    }

  minNCritRoll(fixed, variable) {
    const maxHit = fixed + variable;
    const minCrit = Math.floor(maxHit * 0.95);

    return minCrit;
  }

  critDmgBuff(dmg, channeler_stacks, ench) {
    let critBuff = dmg;
    if (ench === true) {
      critBuff = dmg + Math.floor(dmg * 0.025 * channeler_stacks);
    }

    return critBuff;
  }
}

module.exports = Crit;
