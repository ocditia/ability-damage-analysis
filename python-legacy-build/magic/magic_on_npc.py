from magic_settings import SET_INS

class OnNPC:
    def kww(self, dmg):
        if SET_INS.gloves == 'Enhanced Kerapac':
            return int(dmg + (dmg * 0.4 * SET_INS.kww))
        else:
            return int(dmg + (dmg * 0.25 * SET_INS.kww))
        
    def vuln(self, dmg):
        return int(dmg + (dmg * 0.1 * SET_INS.vuln))
    
    def sc(self,dmg):
        return int(dmg + (dmg * 0.15 * SET_INS.sc))
    
    def cryptbloom(self, dmg):
        return int(dmg + (dmg * 0.1 * SET_INS.cryptbloom))
    
    def slayerperk(self, dmg):
        return int(dmg + (dmg * 0.07 * SET_INS.slayerPerk))
    
    def slayersigil(self, dmg):
        return int(dmg + (dmg * 0.15 * SET_INS.slayerSigil))
    
    def aura(self, dmg):
        boost = 0
        for b in SET_INS.utils.boosts:
            if b['name'] == SET_INS.aura:
                boost = b['magic_dmg_percent']
        
        return int(dmg + int(dmg * boost))
    
    def meta(self, dmg):
        return int(dmg * 1.625)
    
    def scrimshaw(self, dmg):
        if SET_INS.pocket == 'Superior scrimshaw of elements':
            return int(dmg * 1.0666)
        elif SET_INS.pocket == 'Scrimshaw of elements':
            return int(dmg * 1.05)
        else:
            return dmg
        
    def computeOnNpc(self, reg, sun):
        reg = self.kww(reg)
        sun = self.kww(sun)
        reg = self.vuln(reg)
        sun = self.vuln(sun)
        reg = self.cryptbloom(reg)
        sun = self.cryptbloom(sun)
        reg = self.slayerperk(reg)
        sun = self.slayerperk(sun)
        reg = self.slayersigil(reg)
        sun = self.slayersigil(sun)
        reg = self.aura(reg)
        meta = self.meta(reg)
        reg = self.scrimshaw(reg)
        meta = self.scrimshaw(meta)
        sun = self.scrimshaw(sun)
        
        return [reg, sun, meta]
        
    def computeOnNpcCrit(self, reg, sun):
        reg = self.kww(reg)
        sun = self.kww(sun)
        reg = self.vuln(reg)
        sun = self.vuln(sun)
        reg = self.sc(reg)
        sun = self.sc(sun)
        reg = self.cryptbloom(reg)
        sun = self.cryptbloom(sun)
        reg = self.slayerperk(reg)
        sun = self.slayerperk(sun)
        reg = self.slayersigil(reg)
        sun = self.slayersigil(sun)
        reg = self.aura(reg)
        meta = self.meta(reg)
        reg = self.scrimshaw(reg)
        meta = self.scrimshaw(meta)
        sun = self.scrimshaw(sun)
        
        return [reg, sun, meta]
        
    
    