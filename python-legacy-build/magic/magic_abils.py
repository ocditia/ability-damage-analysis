from magic_on_cast import CAST_INS
from magic_settings import SET_INS
from magic_ad import AD_INS
from magic_on_npc import OnNPC
from magic_on_hit import OnHit
from magic_crit import Crit

class magicAbils:
    def __init__(self, output): 
        self.hit = OnHit()
        self.fcrit = Crit()
        self.npc = OnNPC()
        self.output = output
        
    def timeStrike(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.6)
        variable = int(ad * 0.6)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        ncritChance = [self.fcrit.computeNCritChance(dmg[0][0],dmg[0][1], fcritChance), self.fcrit.computeNCritChance(dmg[1][0], dmg[1][1], fcritChance)]
        ncritAvg = [self.fcrit.computeNCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeNCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
            
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        onNpcNcrit = self.npc.computeOnNpcCrit(ncritAvg[0],ncritAvg[1])
        
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance - ncritChance[0])) + int(onNpcFCrit[0] * fcritChance) + int(onNpcNcrit[0] * ncritChance[0])
            sun = int(onNpc[1] * (1 - fcritChance - ncritChance[1])) + int(onNpcFCrit[1] * fcritChance) + int(onNpcNcrit[1] * ncritChance[1])
            meta = int(onNpc[2] * (1 - fcritChance - ncritChance[0])) + int(onNpcFCrit[2] * fcritChance) + int(onNpcNcrit[0] * ncritChance[0])
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        return [regular, sun, meta]
    
    def wrack(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.4)
        variable = int(ad * 1.0)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        ncritChance = [self.fcrit.computeNCritChance(dmg[0][0],dmg[0][1], fcritChance), self.fcrit.computeNCritChance(dmg[1][0], dmg[1][1], fcritChance)]
        ncritAvg = [self.fcrit.computeNCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeNCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        onNpcNcrit = self.npc.computeOnNpcCrit(ncritAvg[0],ncritAvg[1])
        
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance - ncritChance[0])) + int(onNpcFCrit[0] * fcritChance) + int(onNpcNcrit[0] * ncritChance[0])
            sun = int(onNpc[1] * (1 - fcritChance - ncritChance[1])) + int(onNpcFCrit[1] * fcritChance) + int(onNpcNcrit[1] * ncritChance[1])
            meta = int(onNpc[2] * (1 - fcritChance - ncritChance[0])) + int(onNpcFCrit[2] * fcritChance) + int(onNpcNcrit[0] * ncritChance[0])
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]
  
    def wrackBound(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.7)
        variable = int(ad * 1.3)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]    

    def wrackRuin(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.6)
        variable = int(ad * 2.4)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def wrackRuinBound(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 1.2)
        variable = int(ad * 2.4)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def sonic(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0
            
        fixed = int(ad * 0.314)
        variable = int(ad * 1.256)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def greaterSonic(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.6)
        variable = int(ad * 1.1)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def db(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        if SET_INS.neck == 'Dragon rider':
            fixed = int(ad * 0.476)
            variable = int(ad * 1.604)
        else:
            fixed = int(ad * 0.376)
            variable = int(ad * 1.504)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def impact(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
            flanking = SET_INS.th['flanking']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
            flanking = max(SET_INS.mh['flanking'], SET_INS.oh['flanking'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
            flanking = max(SET_INS.mh['flanking'], SET_INS.sh['flanking'])
        else:
            ad = 0

        fixed = int(ad * (0.2 + (0.2 * 0.4 * flanking)) )
        variable = int(ad * (0.8 + (0.8 * 0.4 * flanking)) )
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def deepImpact(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
            flanking = SET_INS.th['flanking']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
            flanking = max(SET_INS.mh['flanking'], SET_INS.oh['flanking'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
            flanking = max(SET_INS.mh['flanking'], SET_INS.sh['flanking'])
        else:
            ad = 0

        fixed = int(ad * (0.4 + (0.4 * 0.15 * flanking)) )
        variable = int(ad * (2.0 + (2.0 * 0.15 * flanking)) )
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]
    
    def chain(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.2)
        variable = int(ad * 0.8)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, True)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        return [regular, sun, meta]

    def wildMagic(self, type):
        if type == 'Two-hand':
            ad = CAST_INS.ad[0]
            precise = SET_INS.th['precise']
            equilibrium = SET_INS.th['equilibrium']
            ruthless = SET_INS.th['ruthless']
            spendthrift = SET_INS.th['spendthrift']
        elif type == 'Dual-wield':
            ad = CAST_INS.ad[1]
            precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
        elif type == 'Mainhand + shield':
            ad = CAST_INS.ad[2]
            precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
            equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
            ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
            spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
        else:
            ad = 0

        fixed = int(ad * 0.5)
        variable = int(ad * 1.65)
        channelers = 0
        
        dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, False)
        
        onHitMin = [dmg[0][0], dmg[1][0]]
        onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
        onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
        fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
        fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
        
        if self.output == 'Min':
            onNpc = onHitMin
        elif self.output == 'Average':
            onNpc = onHitAvg
        elif self.output == 'Max':
            onNpc = onHitMax
        
        onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
        onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
        if self.output == 'Average':
            regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
            sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
            meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
        else:
            regular = onNpc[0]
            sun = onNpc[1]
            meta = onNpc[2]
        
        if SET_INS.fsoa == 1:
            if self.output == 'Average':
                fsoa = self.timeStrike(type)
                regular += int(fcritChance * fsoa[0])
                sun += int(fcritChance * fsoa[1])
                meta += int(fcritChance * fsoa[2])
        else:
            pass
        
        regular *= 2
        sun *= 2
        meta *= 2
        
        return [regular, sun, meta]

    def asphyx(self, type):
        hits = []
        hitcount = 4
        i = 0
        if SET_INS.ring == 'Channelers':
            channelers = 1
        else:
            channelers = 0
        
        while i < hitcount:
            if type == 'Two-hand':
                ad = CAST_INS.ad[0]
                precise = SET_INS.th['precise']
                equilibrium = SET_INS.th['equilibrium']
                ruthless = SET_INS.th['ruthless']
                spendthrift = SET_INS.th['spendthrift']
            elif type == 'Dual-wield':
                ad = CAST_INS.ad[1]
                precise = max(SET_INS.mh['precise'], SET_INS.oh['precise'])
                equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.oh['equilibrium'])
                ruthless = max(SET_INS.mh['ruthless'], SET_INS.oh['ruthless'])
                spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.oh['spendthrift'])
            elif type == 'Mainhand + shield':
                ad = CAST_INS.ad[2]
                precise = max(SET_INS.mh['precise'], SET_INS.sh['precise'])
                equilibrium = max(SET_INS.mh['equilibrium'], SET_INS.sh['equilibrium'])
                ruthless = max(SET_INS.mh['ruthless'], SET_INS.sh['ruthless'])
                spendthrift = max(SET_INS.mh['spendthrift'], SET_INS.sh['spendthrift'])
            else:
                ad = 0

            fixed = int(ad * 0.376)
            variable = int(ad * 1.504)
            
            dmg = self.hit.computeOnHit(fixed, variable, precise, equilibrium, False)
            
            onHitMin = [dmg[0][0], dmg[1][0]]
            onHitMax = [dmg[0][0] + dmg[0][1], dmg[1][0] + dmg[1][1]]
            onHitAvg = [dmg[0][0] + int(0.5 * dmg[0][1]), dmg[1][0] + int(0.5 * dmg[1][1])]
            fcritChance = self.fcrit.computeFCritChance(channelers, SET_INS.gconc)
            fcritAvg = [self.fcrit.computeFCritDmg(dmg[0][0], dmg[0][1],channelers), self.fcrit.computeFCritDmg(dmg[1][0],dmg[1][1],channelers)]
            
            if self.output == 'Min':
                onNpc = onHitMin
            elif self.output == 'Average':
                onNpc = onHitAvg
            elif self.output == 'Max':
                onNpc = onHitMax
            
            onNpc = self.npc.computeOnNpc(onNpc[0], onNpc[1])
            onNpcFCrit = self.npc.computeOnNpcCrit(fcritAvg[0], fcritAvg[1])
            if self.output == 'Average':
                regular = int(onNpc[0] * (1 - fcritChance)) + int(onNpcFCrit[0] * fcritChance)
                sun = int(onNpc[1] * (1 - fcritChance)) + int(onNpcFCrit[1] * fcritChance)
                meta = int(onNpc[2] * (1 - fcritChance)) + int(onNpcFCrit[2] * fcritChance)
            else:
                regular = onNpc[0]
                sun = onNpc[1]
                meta = onNpc[2]
            
            if SET_INS.fsoa == 1:
                if self.output == 'Average':
                    fsoa = self.timeStrike(type)
                    regular += int(fcritChance * fsoa[0])
                    sun += int(fcritChance * fsoa[1])
                    meta += int(fcritChance * fsoa[2])
            else:
                pass
            
            if SET_INS.ring == 'Channelers':
                channelers += 1
            else:
                pass
            
            hit = [regular, sun, meta]
            
            hits.append(hit)
            
            i += 1
        
        return hits



magic = magicAbils('Average')
test = magic.wrack('Two-hand')

print(test)
    
        
        