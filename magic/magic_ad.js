const SET_INS = require('./magic_settings')

class AbilityDmg {
    constructor() {
      this.armour = {
        'helm': SET_INS.helm,
        'body': SET_INS.body,
        'legs': SET_INS.legs,
        'boots': SET_INS.boots,
        'gloves': SET_INS.gloves,
        'neck': SET_INS.neck,
        'cape': SET_INS.cape,
        'ring': SET_INS.ring,
        'pocket': SET_INS.pocket
      };
  
      this.magicLvl = this.calculateLevels();
  
      this.magicBonus = this.computeBonus();
  
      this.ad = this.computeAd();
    }
  
    auraLevelBoost() {
      const boost = SET_INS.utils.boosts.find((b) => b['name'] === SET_INS.aura);
      if (!boost) {
        return [0, 0, 0, 0];
      }
  
      const magicBoostPercent = SET_INS.level * boost['magic_level_percent'];
  
      return magicBoostPercent;
    }
  
    potionLevelBoost() {
      const boost = SET_INS.utils.boosts.find((b) => b['name'] === SET_INS.potion);
      if (!boost) {
        return [0, 0, 0, 0];
      }
  
      const boostValues = {
        'magic_level_percent': SET_INS.level * boost['magic_level_percent'],
        'magic_level_boost': boost['magic_level_boost'],
      };
  
      const netBoost = boostValues['magic_level_percent'] + boostValues['magic_level_boost'];
  
      return netBoost;
    }
  
    calculateLevels() {
      const auraBoost = this.auraLevelBoost();
      const potionBoost = this.potionLevelBoost();
  
      let level = SET_INS.level + potionBoost + auraBoost;
      if (SET_INS.zerkEss === 1 && (SET_INS.potion === null || SET_INS.potion.indexOf('verload') === -1)) {
        level = (1.14 * level) + 2;
      }
  
      return Math.floor(level);
    }
  
    computeBonus() {
      let bonus = 0;
      const gearSlots = {
        'helm': 'helm',
        'body': 'body',
        'legs': 'legs',
        'boots': 'boots',
        'gloves': 'gloves',
        'neck': 'neck',
        'cape': 'cape',
        'ring': 'ring',
        'pocket': 'pocket'
      };
  
      for (const item of SET_INS.utils.gear) {
        const slot = item['slot'];
        if (item['name'] === this.armour[gearSlots[slot]]) {
          bonus += item['magic_bonus'];
        }
      }
  
      if (SET_INS.reaperCrew === 1) {
        bonus += 12;
      }
  
      return bonus;
    }
  
    computeAd() {
      const thAbilityDmg = (2.5 * this.magicLvl) + (1.25 * this.magicLvl) + (14.4 * SET_INS.thTier + 1.5 * this.magicBonus);
      const mhAbilityDmg = (2.5 * this.magicLvl) + (9.6 * SET_INS.mhTier + this.magicBonus);
      const ohAbilityDmg = 0.5 * ((2.5 * this.magicLvl) + (9.6 * SET_INS.ohTier + this.magicBonus));
  
      let shAbilityDmg = 0;
      if (SET_INS.sh['type'] === 'defender') {
        shAbilityDmg = 0.5 * ((2.5 * this.magicLvl) + (9.6 * (0.5 * SET_INS.shTier) + this.magicBonus));
      }
  
      const dwAbilityDmg = mhAbilityDmg + ohAbilityDmg;
      const msAbilityDmg = mhAbilityDmg + shAbilityDmg;
  
      return [thAbilityDmg, dwAbilityDmg, msAbilityDmg];
    }
  }
  
  const AD_INS = new AbilityDmg();
  

module.exports = AD_INS;