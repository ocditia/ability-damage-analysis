from magic_settings import SET_INS
from magic_ad import AD_INS

class OnHit:
    def prayer(self, fixed, variable):
        for b in SET_INS.utils.boosts: 
            if b['name'] == SET_INS.prayer:
                boost = b['magic_dmg_percent']
        
        return [int(fixed + (fixed * boost)), int(variable + (variable * boost))]
        
    def dpl(self, fixed, variable):
        boostedLvls = AD_INS.magicLvl - SET_INS.level
        
        return [int(fixed + boostedLvls * 4), int(variable + boostedLvls * 4)]
    
    def dharok(self, fixed, variable):
        return [int(fixed + fixed * SET_INS.dharok), int(variable + variable * SET_INS.dharok)]
    
    def sun(self, fixed, variable):
        return [int(fixed * 1.5), int(variable * 1.5)]
    
    def exsang(self, fixed, variable):
        return [int(fixed + fixed * 0.01 * SET_INS.exsang), int(variable + variable * 0.01 * SET_INS.exsang)]
    
    def ful(self, fixed, variable):
        return [int(fixed * 1.2), int(variable * 1.2)]
    
    def rubyAurora(self, fixed, variable):
        return [int(fixed + fixed * 0.01 * SET_INS.rubyAurora), int(variable + variable * 0.01 * SET_INS.rubyAurora)]
    
    def salve(self, fixed, variable):
        if SET_INS.neck == 'Salve (e)':
            return [int(fixed * 1.2), int(variable * 1.2)]
        else:
            return [int(fixed * 1.15), int(variable * 1.15)]
    
    def precise(self, fixed, variable, rank):
        maxHit = fixed + variable
        return [(fixed + int(maxHit * 0.015 * rank)), variable - int(maxHit * 0.015 * rank)]
        
    def equilibrium(self, fixed, variable, rank):
        if SET_INS.aura == 'Equilibrium':
            return [int(fixed + variable * 0.25), int(variable - variable * 0.5)]
        else:
            return [int(fixed + variable * rank * 0.03), int(variable - variable * rank * 0.04)]
    
    def computeOnHit(self, fixed, variable, precise_rank, equilibrium_rank, basic):
        dmg = self.prayer(fixed, variable)
        dmg = self.dpl(dmg[0], dmg[1])
        dmg = self.dharok(dmg[0], dmg[1])
        dmg_sun = self.sun(dmg[0], dmg[1])
        if basic == True:
            dmg = self.exsang(dmg[0], dmg[1])
            dmg_sun = self.exsang(dmg_sun[0], dmg_sun[1])
        else:
            pass
        
        if SET_INS.ful == 1:
            dmg = self.ful(dmg[0], dmg[1])
            dmg_sun = self.ful(dmg_sun[0], dmg_sun[1])
        else:
            pass
        
        dmg = self.rubyAurora(dmg[0], dmg[1])
        dmg_sun = self.rubyAurora(dmg_sun[0], dmg_sun[1])
        
        if SET_INS.neck == 'Salve' or SET_INS.neck == 'Salve (e)':
            dmg = self.salve(dmg[0], dmg[1])
            dmg_sun = self.salve(dmg_sun[0], dmg_sun[1])
        else:
            pass
        
        dmg = self.precise(dmg[0], dmg[1], precise_rank)
        dmg_sun = self.precise(dmg_sun[0], dmg_sun[1], precise_rank)
        dmg = self.equilibrium(dmg[0], dmg[1], equilibrium_rank)
        dmg_sun = self.equilibrium(dmg_sun[0], dmg_sun[1], equilibrium_rank)
        
        return [dmg, dmg_sun]
        