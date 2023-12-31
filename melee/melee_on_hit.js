const construction = require('./melee_const')

class OnHit {
  calcScriptureOfFul(buff,pocket,flag) {
    if (pocket === 'scripture of ful' && flag === true) {
      buff = buff * (1 + 0.2);
    }
    return Math.floor(buff);
  }

  calcStoneOfJas(buff,jas) {
    return Math.floor(buff * (1 + jas/100));
  }

  calcBerserk(buff,flag){
    if (flag === true) {
      buff = Math.floor(buff * (1 + 1));
    }
    return buff;
  }
  calcZGS(buff,flag){
    if (flag === true) {
      buff = Math.floor(buff * (1.25));
    }
    return buff;
  }

  calcGOP(buff,flag, enchantment){
    if (flag === true && enchantment === true) {
      buff += Math.floor(buff * 0.16);
    }
    else if (flag === true && enchantment === false) {
      buff += Math.floor(buff * 0.1);
    }
    return buff;
  }

  calcDBA(buff,flag){
    if (flag === true) {
      buff = Math.floor(buff * (1 + 0.2));
    }
    return buff;
  }

  calcAnnihilation(buff,stacks) {
    return buff * (1 + stacks);
  }

  calcPrayer(buff,prayer) {
    return Math.floor(buff * (1 + construction['prayers'][prayer]['boost']));
  }

  calcExsanguinate(buff,stacks,category) {
    if (category === 'basic') {
      return buff += Math.floor(buff * 0.01 * stacks);
    }
    return buff;  
  }

  calcRubyAurora(buff,aurora) {
    return Math.floor(buff * (1 + 0.01 * aurora))
  }

  calcRevenge(buff,type,revengeStacks) {
    if (type === 'Ms') {
      buff = buff * (1 + 0.05*revengeStacks);
    } 
    else if (type === 'Md') { 
      buff = buff * (1 + 0.025*revengeStacks);
    }
    return Math.floor(buff);
  }

  calcSpendthrift(buff,spendthriftRank) {
    return Math.floor(buff * (1 + (spendthriftRank * spendthriftRank)/10000));
  }

  calcRuthless(buff,ruthlessRank, ruthlessStacks) {
    return Math.floor(buff * (1 + 0.005 * ruthlessRank * ruthlessStacks));
  }

  calcSlayerHelmet(buff,slayerHelmet) {
    return Math.floor(buff * (1 + construction['slayerHelmets'][slayerHelmet]['boost']));
  }

  calcGuardHouse(buff,guardhouse) {
    if (guardhouse === 'level 1') {
      buff = buff * 1.01;
    } else if (guardhouse === 'level 1 undead') {
      buff = buff * 1.02;
    } else if (guardhouse === 'level 3 - low target') {
      buff = buff * 1.11;
    } else if (guardhouse === 'level 3 undead - low target') {
      buff = buff * 1.12;
    }
    return Math.floor(buff);
  }

  calcGenocidal(buff,genocidal) {
    return Math.floor(buff * (1 + genocidal/100));
  }

  calcSalveAmulet(buff,necklace) {
    if (necklace === 'Salve amulet') {
      buff = buff * 1.15;
    } 
    else if (necklace === 'Salve amulet (e)') {
      buff = buff * 1.2;
    }
    return Math.floor(buff);
  }

  calcRipperPassive(buff,ripperPassive) {
    return Math.floor(buff * (1 + ripperPassive/100));
  }

  calcBerserkersFury(buff,fury) {
    return Math.floor(buff * (1 + fury/100));
  }

  calcPrecise(fixed, variable, rank) {
    let maxHit = fixed + variable;
    return [fixed + Math.floor(maxHit * 0.015 * rank), variable - Math.floor(maxHit * 0.015 * rank)];
  }

  calcEquilibrium(fixed, variable, rank, aura) {
    if (aura === 'equilibrium') {
      return [fixed + Math.floor(variable * 0.25), variable - Math.floor(variable * 0.5)];
    } else {
      return [Math.floor(fixed + variable * rank * 0.03), Math.floor(variable - variable * rank * 0.04)];
    }
  }

  calcOnHit(fixed, variable, type, apply, settings) {
      if (apply == false) {
        return [fixed,variable];
      }

      else {
        let buff = 10000
        //all buffs in order of application
        buff = this.calcScriptureOfFul(buff,settings['pocket slot'], settings['ful']); //assumed on
        buff = this.calcStoneOfJas(buff,settings['stone of jas']);
        buff = this.calcBerserk(buff,settings['berserk']);
        buff = this.calcZGS(buff,settings['zgs']);
        buff = this.calcDBA(buff,settings['dragon battle axe spec']);
        buff = this.calcGOP(buff,settings['gloves of passage'],settings['enchantment agony']);
        buff = this.calcAnnihilation(buff,settings['annihilation stacks']);
        buff = this.calcPrayer(buff,settings['prayer']);
        buff = this.calcExsanguinate(buff,settings['exsanguinate stacks'],settings['category']);
        buff = this.calcRubyAurora(buff,settings['Ruby aurora']);
        buff = this.calcRevenge(buff,type,settings['revenge stacks']);
        buff = this.calcSpendthrift(buff,settings['spendthrift']); //causes a rounding-error
        buff = this.calcRuthless(buff,settings['ruthless rank'],settings['ruthless stacks']);
        buff = this.calcSlayerHelmet(buff,settings['slayer helmet']);
        buff = this.calcGuardHouse(buff,settings['fort forinthry guardhouse']);
        buff = this.calcGenocidal(buff, settings['genocidal percent']);
        buff = this.calcSalveAmulet(buff,settings['necklace']);
        buff = this.calcRipperPassive(buff,settings['ripper demon passive']);

        //unknown order
        buff = this.calcBerserkersFury(buff,settings['berserkers fury']);

        //apply scaling to damage
        fixed = Math.floor((fixed * buff)/10000);
        variable = Math.floor((variable * buff)/10000);

        //calculate precise and equilibrium
        let dmg = this.calcPrecise(fixed,variable,settings['precise']);
        dmg = this.calcEquilibrium(dmg[0],dmg[1],settings['equilibrium'],settings['aura']);
      
        return [dmg[0],dmg[1]];
      }
  }
}

module.exports = OnHit;