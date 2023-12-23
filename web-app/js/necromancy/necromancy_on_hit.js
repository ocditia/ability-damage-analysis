class OnHit {
  calcScriptureOfFul(fixed, variable) {
    return [
      Math.floor(fixed + fixed * 1.2),
      Math.floor(variable + variable * 1.2),
    ];
  }

  calcPrayer(fixed, variable, prayer) {
    return [
      Math.floor(fixed + fixed * prayer),
      Math.floor(variable + variable * prayer),
    ];
  }

  calcRevenge(fixed, variable, revenge) {
    return [
      Math.floor(fixed + fixed * revenge * 0.05),
      Math.floor(variable + variable * revenge * 0.05),
    ];
  } // fix that defender get half effect

  calcSpendthrift(fixed, variable, spendthrift) {
    return [
      Math.floor(fixed + fixed * spendthrift * 0.01),
      Math.floor(variable + variable * spendthrift * 0.01),
    ];
  }

  calcRuthless(fixed, variable, ruthlessStacks, ruthlessRank) {
    return [
      Math.floor(fixed + fixed * ruthlessRank * ruthlessStacks * 0.005),
      Math.floor(variable + variable * ruthlessRank * ruthlessStacks * 0.005),
    ];
  }

  calcRubyAurora(fixed, variable, rubyAurora) {
    return [
      Math.floor(fixed + fixed * 0.01 * rubyAurora),
      Math.floor(variable + variable * 0.01 * rubyAurora),
    ];
  }

  calcSlayerHelm(fixed, variable, slayerhelm) {
    return [
      Math.floor(fixed + fixed * slayerhelm),
      Math.floor(variable + variable * slayerhelm),
    ];
  }

  calcFortGuardHouse(fixed, variable, guardhouse) {
    return [
      Math.floor(fixed + fixed * guardhouse),
      Math.floor(variable + variable * guardhouse),
    ];
  }

  calcGenocidal(fixed, variable, genocidal) {
    return [
      Math.floor(fixed + fixed * genocidal),
      Math.floor(variable + variable * genocidal),
    ];
  }

  calcSalve(fixed, variable, salve) {
    if (salve === "enchanted") {
      return [Math.floor(fixed * 1.2), Math.floor(variable * 1.2)];
    } else if (salve === "basic") {
      return [Math.floor(fixed * 1.15), Math.floor(variable * 1.15)];
    } else {
      return [Math.floor(fixed), Math.floor(variable)];
    }
  }

  calcRipper(fixed, variable, ripper) {
    return [
      Math.floor(fixed + fixed * ripper),
      Math.floor(variable + variable * ripper),
    ];
  }

  calcDharok(fixed, variable, dharok) {
    return [
      Math.floor(fixed + fixed * dharok),
      Math.floor(variable + variable * dharok),
    ];
  }

  calcPrecise(fixed, variable, rank) {
    const maxHit = fixed + variable;
    return [
      fixed + Math.floor(maxHit * 0.015 * rank),
      variable - Math.floor(maxHit * 0.015 * rank),
    ];
  }

  calcEquilibrium(fixed, variable, rank, aura) {
    if (aura === "equilibrium") {
      return [
        fixed + Math.floor(variable * 0.25),
        variable - Math.floor(variable * 0.5),
      ];
    } else {
      return [
        fixed + Math.floor(variable * rank * 0.03),
        variable - Math.floor(variable * rank * 0.04),
      ];
    }
  }

  calcOnHit(
    fixed,
    variable,
    prayer,
    dharok,
    ful,
    rubyAurora,
    salve,
    precise_rank,
    equilibrium_rank,
    aura,
  ) {
    let dmg = this.calcPrayer(fixed, variable, prayer);

    if (ful === true) {
      dmg = this.calcFul(dmg[0], dmg[1]);
    }

    dmg = this.calcRubyAurora(dmg[0], dmg[1], rubyAurora);

    dmg = this.calcSalve(dmg[0], dmg[1], salve);

    dmg = this.calcPrecise(dmg[0], dmg[1], precise_rank);

    dmg = this.calcEquilibrium(dmg[0], dmg[1], equilibrium_rank, aura);

    return dmg;
  }
}

module.exports = OnHit;
