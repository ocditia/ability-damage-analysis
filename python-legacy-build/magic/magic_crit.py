from magic_settings import SET_INS

class Crit:
    def computeFCritChance(self, channeler_stacks, gconc):
        fcrit = round((0.05 * SET_INS.kalgSpec) + (0.01 * SET_INS.kalg) + (0.05 * SET_INS.reavers) + (0.12 * SET_INS.grim) + SET_INS.biting + (0.05 * gconc) + (0.04 * channeler_stacks),4)
        
        return fcrit
    
    def computeFCritDmg(self, fixed, variable, channeler_stacks):
        fcritAvg = (fixed + int(0.5 * (int(variable * 0.95) + variable)))
        
        if SET_INS.enchMeta == 1 and SET_INS.ring == 'Channelers':
            fcritAvg = fcritAvg + int(fcritAvg * 0.025 * channeler_stacks)
        else:
            pass
        
        return fcritAvg
    
    def computeNCritChance(self, fixed, variable, fcrit):
        #this is not technically accurate but making it accurate would require a pretty significant refator of the code which I don't want to do for something that is being replaced in a few weeks. It is close enough for now.
        maxHit = fixed + variable
        minCrit = int(maxHit * 0.95)
        ncrit = (1 - fcrit) * ((maxHit - minCrit) / variable)
        
        return ncrit
    
    def computeNCritDmg(self, fixed, variable, channeler_stacks):
        maxHit = fixed + variable
        minCrit = int(0.95 * maxHit)
        ncritAvg = int((maxHit + minCrit) / 2)
        
        if SET_INS.enchMeta == 1 and SET_INS.ring == 'Channelers':
            ncritAvg = ncritAvg + int(ncritAvg * 0.025 * channeler_stacks)
        else:
            pass
        
        return ncritAvg
    
    