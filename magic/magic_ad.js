const Settings = require('./magic_settings.js');

class AbilityDmg {
    constructor(settings) {
      this.settings = Settings(settings);
      this.armour = {
        'helm': this.settings.helm,
        'body': this.settings.body,
        'legs': this.settings.legs,
        'boots': this.settings.boots,
        'gloves': this.settings.gloves,
        'neck': this.settings.neck,
        'cape': this.settings.cape,
        'ring': this.settings.ring,
        'pocket': this.settings.pocket
      };
  
      this.magicLvl = this.calculateLevels();
  
      this.magicBonus = this.computeBonus();
  
      this.ad = this.computeAd();
    }
  
    auraLevelBoost() {
      const boost = this.settings.utils.boosts.find((b) => b['name'] === this.settings.aura);
      if (!boost) {
        return [0, 0, 0, 0];
      } 
  
      const magicBoostPercent = this.settings.level * boost['magic_level_percent'];
  
      return magicBoostPercent;
    }
  
    potionLevelBoost() {
      const boost = this.settings.utils.boosts.find((b) => b['name'] === this.settings.potion);
      if (!boost) {
        return [0, 0, 0, 0];
      }
  
      const boostValues = {
        'magic_level_percent': this.settings.level * boost['magic_level_percent'],
        'magic_level_boost': boost['magic_level_boost'],
      };
  
      const netBoost = boostValues['magic_level_percent'] + boostValues['magic_level_boost'];
  
      return netBoost;
    }
  
    calculateLevels() {
      const auraBoost = this.auraLevelBoost();
      const potionBoost = this.potionLevelBoost();
  
      let level = this.settings.level + potionBoost + auraBoost;
      if (this.settings.zerkEss === 1 && (this.settings.potion === null || this.settings.potion.indexOf('verload') === -1)) {
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
  
      for (const item of this.settings.utils.gear) {
        const slot = item['slot'];
        if (item['name'] === this.armour[gearSlots[slot]]) {
          bonus += item['magic_bonus'];
        }
      }
  
      if (this.settings.reaperCrew === 1) {
        bonus += 12;
      }
  
      return bonus;
    }
  
    computeAd() {
      const thAbilityDmg = (2.5 * this.magicLvl) + (1.25 * this.magicLvl) + (14.4 * this.settings.thTier + 1.5 * this.magicBonus);
      const mhAbilityDmg = (2.5 * this.magicLvl) + (9.6 * this.settings.mhTier + this.magicBonus);
      const ohAbilityDmg = 0.5 * ((2.5 * this.magicLvl) + (9.6 * this.settings.ohTier + this.magicBonus));
  
      let shAbilityDmg = 0;
      if (this.settings.sh['type'] === 'defender') {
        shAbilityDmg = 0.5 * ((2.5 * this.magicLvl) + (9.6 * (0.5 * this.settings.shTier) + this.magicBonus));
      }
  
      const dwAbilityDmg = mhAbilityDmg + ohAbilityDmg;
      const msAbilityDmg = mhAbilityDmg + shAbilityDmg;
  
      return [thAbilityDmg, dwAbilityDmg, msAbilityDmg];
    }
  }
  
  const AD_INS = new AbilityDmg();
  

module.exports = AD_INS;