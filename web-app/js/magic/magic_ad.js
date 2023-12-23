const { WieldType } = require("../types/types");

class AbilityDmg {
  calcAd(
    type,
    level,
    bonus,
    thTier,
    mhTier,
    ohTier,
    shTier,
    shType,
    flowStacks,
  ) {
    let AD;

    if (type === WieldType.TWO_HAND) {
      AD =
        Math.floor(2.5 * level) +
        Math.floor(1.25 * level) +
        Math.floor(14.4 * thTier + 1.5 * bonus);
    } else if (type === WieldType.DUAL_WIELD) {
      const mhAbilityDmg =
        Math.floor(2.5 * level) + Math.floor(9.6 * mhTier + bonus);
      const ohAbilityDmg = Math.floor(
        0.5 * (Math.floor(2.5 * level) + Math.floor(9.6 * ohTier + bonus)),
      );
      AD = mhAbilityDmg + ohAbilityDmg;
    } else if (type === WieldType.MH_AND_SHIELD) {
      const mhAbilityDmg =
        Math.floor(2.5 * level) + Math.floor(9.6 * mhTier + bonus);
      let shAbilityDmg = 0;
      if (shType === "defender") {
        shAbilityDmg = Math.floor(
          0.5 *
            (Math.floor(2.5 * level) +
              Math.floor(9.6 * Math.floor(0.5 * shTier) + bonus)),
        );
      }
      AD = mhAbilityDmg + shAbilityDmg;
    }

    if (
      type === WieldType.TWO_HAND &&
      settings.th.name === "Inquisitor staff"
    ) {
      AD = CAST_INS.calcOnCast(AD, settings.enchAff);
    }

    AD = AD * (1 + flowStacks / 100);

    return AD;
  }

  calcBonus(
    helm,
    neck,
    body,
    legs,
    boost,
    gloves,
    cape,
    pocket,
    ring,
    reaperCrew,
  ) {
    return (
      helm +
      neck +
      body +
      legs +
      boost +
      gloves +
      cape +
      pocket +
      ring +
      reaperCrew
    );
  }
}

module.exports = AbilityDmg;
