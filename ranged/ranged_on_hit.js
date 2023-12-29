const construction = require('./ranged_const')

class OnHit {
  calcAdditives(buff,pocket,needle) {
    if (pocket === 'scripture of ful' && needle === true) {
      buff = buff * (1.27);
    }
    else if (pocket === 'scripture of ful' && needle === false) {
      buff = buff * (1.2);
    }
    else if (needle === true) {
      buff = buff * (1.07);
    }
    else{
      buff = buff;
    }
    return buff;
  }

  calcStoneOfJas(buff,jas) {
    return buff * (1 + jas);
  }

  calcPrayer(buff,prayer) {
    return buff * (1 + construction['prayers'][prayer]['boost']);
  }

  calcRevenge(buff,type,revengeStacks) {
    if (type === 'shield') {
      buff = buff * (1 + 0.05*revengeStacks);
    } 
    else if (type === 'defender') { 
      buff = buff * (1 + 0.025*revengeStacks);
    }
    return buff;
  }

  calcSpendthrift(buff,spendthriftRank) {
    return buff * (1 + (spendthriftRank * spendthriftRank)/100);
  }

  calcRuthless(buff,ruthlessRank, ruthlessStacks) {
    return buff * (1 + 0.005 * ruthlessRank * ruthlessStacks);
  }

  calcSlayerHelmet(buff,slayerHelmet) {
    return buff * (1 + construction['slayerHelmets'][slayerHelmet]['boost']);
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
    return buff;
  }

  calcGenocidal(buff,genocidal) {
    return buff * (1 + genocidal);
  }

  calcSalveAmulet(buff,necklace) {
    if (necklace === 'Salve amulet') {
      buff = buff * 1.15;
    } 
    else if (necklace === 'Salve amulet (e)') {
      buff = buff * 1.2;
    }
    return buff;
  }

  calcRipperPassive(buff,ripperPassive) {
    return buff * (1 + ripperPassive);
  }

  calcBerserkersFury(buff,fury) {
    return buff * (1 + fury);
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
        buff = this.calcAdditives(buff,settings['pocket slot'], settings['needle']); //assumed on
        buff = this.calcStoneOfJas(buff,settings['stone of jas']);
        buff = this.calcPrayer(buff,settings['prayer']);
        buff = this.calcRevenge(buff,type,settings['revenge stacks']);
        buff = this.calcSpendthrift(buff,settings['perks']['spendthrift']); //causes a rounding-error
        buff = this.calcRuthless(buff,settings['perks']['ruthless rank'],settings['perks']['ruthless stacks']);
        buff = this.calcSlayerHelmet(buff,settings['slayer helmet']);
        buff = this.calcGuardHouse(buff,settings['fort forinthry guardhouse']);
        buff = this.calcGenocidal(buff, settings['perks']['genocidal']);
        buff = this.calcSalveAmulet(buff,settings['necklace']);
        buff = this.calcRipperPassive(buff,settings['ripper demon passive']);

        //unknown order
        buff = this.calcBerserkersFury(buff,settings['berserkers fury']);

        //apply scaling to damage
        fixed = Math.floor((fixed * buff)/10000);
        variable = Math.floor((variable * buff)/10000);

        //calculate precise and equilibrium
        let dmg = this.calcPrecise(fixed,variable,settings['perks']['precise']);
        dmg = this.calcEquilibrium(dmg[0],dmg[1],settings['aura'],settings['perks']['equilibrium']);
      
        return [fixed,variable];
      }
  }
}

module.exports = OnHit;