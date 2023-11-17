class OnNPC {
    kww(dmg, kww, ench) {
      if (ench === true) {
        return Math.floor(dmg + (dmg * 0.4 * kww));
      } else {
        return Math.floor(dmg + (dmg * 0.25 * kww));
      }
    }
  
    vuln(dmg, flag) {
      return Math.floor(dmg + (dmg * 0.1 * flag));
    }
  
    sc(dmg, flag) {
      return Math.floor(dmg + (dmg * 0.15 * flag));
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
  
    calcOnNpc(dmg, kww, ench, vuln, cryptbloom, slayerperk, slayersigil, aura, scrimshaw, meta) {
      dmg = this.kww(dmg,kww,ench);
      dmg = this.vuln(dmg,vuln);
      dmg = this.cryptbloom(dmg,cryptbloom);
      dmg = this.slayerperk(dmg,slayerperk);
      dmg = this.slayersigil(dmg,slayersigil);
      dmg = this.aura(dmg,aura);
      if (meta === true) {
      dmg = this.meta(dmg);
      }
      dmg = this.scrimshaw(dmg,scrimshaw);
  
      return dmg;
    }
  }
  
module.exports = OnNPC;