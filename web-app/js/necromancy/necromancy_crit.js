class Crit {
  calcFCritChance (channeler_stacks, gconc, kalg, kalgSpec, reavers, grim, biting) {
    const fcrit =
            (0.05 * kalgSpec) +
            (0.01 * kalg) +
            (0.05 * reavers) +
            (0.12 * grim) +
            biting +
            (0.05 * gconc) +
            (0.04 * channeler_stacks) +
            0.1
        ;

    return fcrit;
  }

  critDmgBuff (dmg) {
    return 1.75 * dmg;
  }
}

module.exports = Crit;
