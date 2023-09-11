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
  
    calcOnNpc(reg, sun, kww, ench, vuln, cryptbloom, slayerperk, slayersigil, aura, scrimshaw, superior) {
      reg = this.kww(reg, kww, ench);
      sun = this.kww(sun, kww, ench);
      reg = this.vuln(reg, vuln);
      sun = this.vuln(sun, vuln);
      reg = this.cryptbloom(reg, cryptbloom);
      sun = this.cryptbloom(sun, cryptbloom);
      reg = this.slayerperk(reg, slayerperk);
      sun = this.slayerperk(sun, slayerperk);
      reg = this.slayersigil(reg, slayersigil);
      sun = this.slayersigil(sun, slayersigil);
      reg = this.aura(reg, aura);
      let meta = this.meta(reg);
      reg = this.scrimshaw(reg, scrimshaw, superior);
      meta = this.scrimshaw(meta, scrimshaw, superior);
      sun = this.scrimshaw(sun, scrimshaw, superior);
  
      return [reg, sun, meta];
    }
  
    calcOnNpcCrit(reg, sun, kww, ench, vuln, sc, cryptbloom, slayerperk, slayersigil, aura, scrimshaw, superior) {
      reg = this.kww(reg, kww, ench);
      sun = this.kww(sun, kww, ench);
      reg = this.vuln(reg, vuln);
      sun = this.vuln(sun, vuln);
      reg = this.sc(reg, sc);
      sun = this.sc(sun, sc);
      reg = this.cryptbloom(reg, cryptbloom);
      sun = this.cryptbloom(sun, cryptbloom);
      reg = this.slayerperk(reg, slayerperk);
      sun = this.slayerperk(sun, slayerperk);
      reg = this.slayersigil(reg, slayersigil);
      sun = this.slayersigil(sun, slayersigil);
      reg = this.aura(reg, aura);
      let meta = this.meta(reg);
      reg = this.scrimshaw(reg, scrimshaw, superior);
      meta = this.scrimshaw(meta, scrimshaw, superior);
      sun = this.scrimshaw(sun, scrimshaw, superior);
  
      return [reg, sun, meta];
    }
  }
  
module.exports = OnNPC;