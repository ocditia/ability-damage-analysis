const fs = require('fs');

class Settings {
  constructor() {
    this.level = 99;
    this.potion = 'Elder overload';
    this.prayer = 'Affliction';

    this.mh = {
      name: 'Wand of the praesul',
      aftershock: 0,
      precise: 0,
      equilibrium: 0,
      ruthless: 0,
      spendthrift: 0,
    };

    this.oh = {
      name: 'Imperium core',
      aftershock: 0,
      precise: 0,
      equilibrium: 0,
      ruthless: 0,
      spendthrift: 0,
    };

    this.th = {
      name: 'Inquisitor staff',
      aftershock: 0,
      precise: 0,
      equilibrium: 0,
      ruthless: 0,
      spendthrift: 0,
    };

    this.sh = {
      tier: 90,
      type: 'defender',
      aftershock: 0,
      precise: 0,
      equilibrium: 0,
      ruthless: 0,
      spendthrift: 0,
    };

    this.preciseRank = 0;
    this.equilibriumRank = 0;
    this.flankRank = 0;

    this.helm = 'Elite tectonic';
    this.neck = 'EOF (or)';
    this.body = 'Elite tectonic';
    this.legs = 'Elite tectonic';
    this.boots = 'Enhanced blast diffusion';
    this.gloves = 'Enhanced Kerapac';
    this.ring = 'Reavers';
    this.cape = 'Igneous';
    this.pocket = 'Grimoire';
    this.aura = 'Maniacal';

    if (this.ring === 'Reavers') {
      this.reavers = 1;
    } else {
      this.reavers = 0;
    }

    if (this.pocket === 'Grimoire') {
      this.grim = 1;
    } else {
      this.grim = 0;
    }

    this.biting = 0.088;
    this.armourLvl = 20;
    this.vuln = 1;
    this.sc = 1;
    this.fsoa = 0;
    this.kalg = 1;
    this.kalgSpec = 1;
    this.ful = 0;
    this.zerkEss = 0;
    this.reaperCrew = 1;
    this.gconc = 0;
    this.enchMeta = 1;
    this.enchAff = 1;
    this.enchFlame = 1;
    this.hex = 1;
    this.ripper = 0;
    this.dharok = 0;
    this.exsang = 0;
    this.rubyAurora = 0;
    this.slayerSigil = 0;
    this.cryptbloom = 0;
    this.slayerPerk = 0;
    this.kww = 0;

    this.utils = new Utils();

    this.thTier = this.getTier(this.th.name);
    this.mhTier = this.getTier(this.mh.name);
    this.ohTier = this.getTier(this.oh.name);
    this.shTier = this.sh.tier;
  }

  getTier(weapon) {
    for (const w of this.utils.weapons) {
      if (w.name === weapon) {
        return w.dmg_tier;
      }
    }
  }

  setInput(name, value) {
    this[name] = value;
  }
}

class Utils {
  constructor() {
    this.gear = require('../utils/gear.json');
    this.weapons = require('../utils/weapons.json');
    this.boosts = require('../utils/boosts.json');
  }
}

const SET_INS = new Settings();

module.exports = SET_INS;