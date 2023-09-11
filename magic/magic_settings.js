const fs = require('fs');

class Settings {
  constructor(settings) {
    this.level = settings['level'];
    this.potion = settings['potion'];
    this.prayer = settings['prayer'];

    this.mh = settings['mh']

    this.oh = settings['oh']

    this.th = settings['th']

    this.sh = settings['sh']

    this.helm = settings['helm'];
    this.neck = settings['neck'];
    this.body = settings['body'];
    this.legs = settings['legs'];
    this.boots = settings['boots'];
    this.gloves = settings['gloves'];
    this.ring = settings['ring'];
    this.cape = settings['cape'];
    this.pocket = settings['pocket'];
    this.aura = settings['aura'];

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

    this.bitingRank = settings['biting-rank'];
    this.armourLvl = True;
    if (this.armourLvl === True){
      this.biting = this.bitingRank * 0.022;
    } else{
      this.biting = this.bitingRank * 0.02;
    }

    this.nope = settings['nope'];
    this.vuln = settings['vuln'];
    this.sc = settings['sc'];
    this.fsoa = settings['fsoa'];
    this.kalg = settings['kalg'];
    this.kalgSpec = settings['kalg-spec'];
    this.ful = settings['ful'];
    this.zerkEss = settings['zerk-ess'];
    this.reaperCrew = settings['reaper-crew'];
    this.gconc = settings['gconc'];
    this.enchMeta = settings['ench-meta'];
    this.enchAff = settings['ench-aff'];
    this.enchFlame = settings['ench-flame'];
    this.hex = settings['hex-hunter'];
    this.ripper = settings['ripper-passive'];
    this.dharok = settings['dharok'];
    this.exsang = settings['exsang'];
    this.rubyAurora = settings['ruby-aurora'];
    this.slayerSigil = settings['sigil'];
    this.cryptbloom = settings['cryptbloom'];
    this.slayerPerk = settings['slayer-perk'];
    this.kww = settings['kww'];

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
}

class Utils {
  constructor() {
    this.gear = require('../utils/gear.json');
    this.weapons = require('../utils/weapons.json');
    this.boosts = require('../utils/boosts.json');
  }
}

module.exports = Settings;