const construction = require('./necromancy_const')

class AbilityDmg {
    calcAd(type, settings) {
      //if manually overwritten use that
      if (settings['ability damage'] != 0) {
        return settings['ability damage'];
      } 

      let AD = 0
      //two-handed AD
      if (type === '2h') {
        AD = Math.floor(2.5 * this.calcLevel(settings)) + Math.floor(1.25 * this.calcLevel(settings)) + Math.floor(14.4 * this.getTier('two-hand',settings) + 1.5 * this.calcBonus(settings));
      } 
      
      //dual-wield AD
      else { 
        const mhAbilityDmg = Math.floor(2.5 * this.calcLevel(settings)) + Math.floor(9.6 * this.getTier('main-hand',settings) + this.calcBonus(settings));
        let ohAbilityDmg = 0
        if (type === 'Ms') {
          ohAbilityDmg = 0
        } 
        else if (type === 'Md') {
          ohAbilityDmg = Math.floor(0.5 * (Math.floor(2.5 * this.calcLevel(settings)) + Math.floor(9.6 * Math.floor(0.5 * this.getTier('defender',settings)) + this.calcBonus(settings))));
        } 
        else if (type === 'Dw') {
          ohAbilityDmg = Math.floor(0.5 * (Math.floor(2.5 * this.calcLevel(settings)) + Math.floor(9.6 * this.getTier('off-hand',settings) + this.calcBonus(settings))));        
        }

        AD = mhAbilityDmg + ohAbilityDmg;
      }
  
      return AD
    }
    
    calcBonus(settings) {
      let reaperCrew = 0
      if (settings['Reaper crew'] === true) {
        reaperCrew = 12;
      }
      
      return (construction['helmets'][settings['helmet']]['bonus'] + 
              construction['bodies'][settings['body']]['bonus'] +
              construction['legs'][settings['leg']]['bonus'] + 
              construction['boots'][settings['boots']]['bonus'] + 
              construction['gloves'][settings['gloves']]['bonus'] +
              construction['necklaces'][settings['necklace']]['bonus'] +
              construction['rings'][settings['ring']]['bonus'] +
              construction['capes'][settings['cape']]['bonus'] +
              construction['pockets'][settings['pocket slot']]['bonus'] +
              reaperCrew);
    }
    
    calcLevel(settings) {
      let level = settings['level'];
      let percentBoost = construction['potions'][settings['potion']]['percent'];
      let flatBoost = construction['potions'][settings['potion']]['levels'];

      return Math.floor(level * (1 + percentBoost)) + flatBoost;
    }

    getTier(type,settings) {
      if (type === 'two-hand') {
        return construction['two-handed weapons'][settings['two-handed weapon']]['tier']
      }
      else if (type === 'main-hand') {
        return construction['main-hand weapons'][settings['main-hand weapon']]['tier']
      }
      else if (type === 'shield') {
        return construction['shields'][settings['shield']]['tier']
      }
      else if (type === 'defender') {
        return construction['defenders'][settings['defender']]['tier']
      }
      else if (type === 'off-hand') {
        return construction['off-hand weapons'][settings['off-hand weapon']]['tier']
      }
    }
  }
    
    module.exports = AbilityDmg;