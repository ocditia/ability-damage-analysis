const construction = require('./melee_const')

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
  
    calcAura(dmg, settings) {
      if (settings['aura'] === 'berserk' && (settings['berserk'] || settings['zaros god sword spec'] === true)) {
        dmg = dmg
      }
      else {
        dmg = Math.floor(dmg * (1 + construction['auras'][settings['aura']]['boost']));
      }
      return dmg;
    }

    calcCryptbloom(dmg,flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.1));
      }
      return dmg;
    }

    calcHaunted(dmg,haunted,AD) {
      if (haunted === true) {
        let increase = Math.floor(dmg*0.1);
        if (increase < Math.floor(0.2 * AD)) {
          return dmg + increase;
        }
        else {
          return dmg + Math.floor(0.2 * AD);
        }
      }
      return dmg
    }

    calcRedbeam(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.3);
      }
      return dmg;
    }

    calcBlackbeam(dmg,flag) {
      if (flag === true) {
        dmg -= Math.floor(dmg * 0.3);
      }
      return dmg;
    }

    calcInfernalPuzzleBox(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.01 * stacks);
    }

    calcTokkulZo(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.1);
      }
      return dmg;
    }

    calcKBD(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.1);
      }
      return dmg;
    }

    calcInnerChaos(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.05);
      }
      return dmg;
    }

    calcGuardiansTriumph(dmg,stacks,category) {
      if (category === 'basic') {
        return dmg += Math.floor(dmg * 0.2 * stacks);
      }
      return dmg;  
    }

    calcSwordofEdicts(dmg,flag) {
      if (flag === true) {
        dmg -= Math.floor(dmg * 0.05);
      }
      return dmg;
    }

    calcBalanceofPower(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.06 * stacks);
    }

    calcInnerPower(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.1 * stacks);
    }
  
    calcOnNpc(dmg, settings, AD, category) {
      //buffs applied in order of operations
      dmg = this.calcVuln(dmg,settings['vulnerability']);
      dmg = this.calcSlayerPerk(dmg,settings['slayer perk']);
      dmg = this.calcSlayerSigil(dmg,settings['slayer sigil']);
      dmg = this.calcAura(dmg, settings);

      //unknown order of buffs
      dmg = this.calcCryptbloom(dmg,settings['death spores']);
      dmg = this.calcHaunted(dmg,settings['haunted'],AD);
      dmg = this.calcRedbeam(dmg,settings['Telos red beam']);
      dmg = this.calcBlackbeam(dmg,settings['Telos black beam']);
      dmg = this.calcInfernalPuzzleBox(dmg,settings['Infernal puzzle box']);
      dmg = this.calcTokkulZo(dmg,settings['Tokkul-zo']);
      dmg = this.calcKBD(dmg,settings['King black dragon wilderness portal']);
      dmg = this.calcInnerChaos(dmg,settings['Zamorak inner chaos']);
      dmg = this.calcGuardiansTriumph(dmg,settings['Zamorak guardians triumph'],settings['category']);
      dmg = this.calcSwordofEdicts(dmg,settings['Zamorak sword of edicts']);
      dmg = this.calcBalanceofPower(dmg,settings['Zamorak balance of power']);
      dmg = this.calcInnerPower(dmg,settings['Raksha inner power']);


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

    onNpcDamageList(dmgList,settings,AD) {
      const onNpcDmg = [];
      for (const i of dmgList) {
        onNpcDmg.push(this.calcOnNpc(i,settings,AD));
      }
      return onNpcDmg;
  }
  }
  
module.exports = OnNPC;