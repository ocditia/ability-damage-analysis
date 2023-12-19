const construction = require('./necromancy_const')

class OnNPC {
    calcVuln(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.1));
      }
      return dmg;
    } 

    calcSlayerPerk(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.07));
      }
      return dmg;
    }
  
    calcSlayerSigil(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.15));
      }
      return dmg;
    }
  
    calcAura(dmg, boost) {
      return Math.floor(dmg * (1 + boost));
    }

    calcCryptbloom(dmg,flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.1));
      }
      return dmg;
    }
  
    calcOnNpc(dmg, settings) {
      //buffs applied in order of operations
      dmg = this.calcVuln(dmg,settings['vulnerability']);
      dmg = this.calcSlayerPerk(dmg,settings['perks']['slayer perk']);
      dmg = this.calcSlayerSigil(dmg,settings['slayer sigil']);
      dmg = this.calcAura(dmg, construction['auras'][settings['aura']]['boost']);

      //unknown order of buffs
      dmg = this.calcCryptbloom(dmg,settings['death spores']);

      //zamorak inner chaos
      //zamorak guardians triumph
      //zamorak sword of edicts
      //telos red beam
      //telos black beam
      //infernal puzzle box
      //kbd wildy portal
      //tokkul-zo
        
      return dmg;
    }

    onNpcDamageList(dmgList,settings) {
      const onNpcDmg = [];
      for (const i of dmgList) {
        onNpcDmg.push(this.calcOnNpc(i,settings));
      }
      return onNpcDmg;
  }
  }
  
module.exports = OnNPC;