class OnNPC {
    kww(dmg, kww, ench) {
      if (ench === true) {
        return Math.floor(dmg + (dmg * 0.4 * kww));
      } else {
        return Math.floor(dmg + (dmg * 0.25 * kww));
      }
    }
  
    vuln(dmg, flag) {
      if (flag === true) {
        dmg = math.floor(dmg + dmg * 0.1)
      }
      return dmg
    }
  
    cryptbloom(dmg, flag) {
      return Math.floor(dmg + (dmg * 0.1 * flag));
    }
  
    slayerperk(dmg, flag) {
      return Math.floor(dmg + (dmg * 0.07 * flag));
    }
  
    slayersigil(dmg, flag) {
      return Math.floor(dmg + (dmg * 0.15 * flag));
    }
  
    aura(dmg, boost) {
      return Math.floor(dmg + (dmg * boost));
    }
  
    meta(dmg) {
      return Math.floor(dmg * 1.625);
    }
  
    scrimshaw(dmg, scrimshaw) {
      if (scrimshaw === 'superior') {
        return Math.floor(dmg * 1.0666);
      } else if (scrimshaw === 'base') {
        return Math.floor(dmg * 1.05);
      } else {
        return dmg;
      }
    }
  
    calcOnNpc(dmg, settings) {
      dmg = this.vuln(dmg,settings['Vulnerability']);
      dmg = this.slayersigil(dmg,settings['Slayer sigil'])
        
      return dmg;
    }
  }
  
module.exports = OnNPC;