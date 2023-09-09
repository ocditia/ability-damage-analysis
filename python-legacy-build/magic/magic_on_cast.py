from magic_ad import AD_INS
from magic_ad import SET_INS

class OnCast:
    def __init__(self):
        self.ad = self.computeOnCast()
    
    def computeOnCast(self):
        th = AD_INS.ad[0]
        
        if SET_INS.th['name'] == 'Inquisitor staff' and SET_INS.hex == 1:
            if SET_INS.enchAff == 1:
                th = int(th * 1.175)
            else:
                th = int(th * 1.125)
        else:
            pass
        
        return [th, AD_INS.ad[1], AD_INS.ad[2]]

CAST_INS = OnCast()
        
        