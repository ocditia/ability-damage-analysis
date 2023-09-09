from magic_settings import SET_INS

class AbilityDmg:
    def __init__(self):
        self.armour = {
            'helm': SET_INS.helm,
            'body': SET_INS.body,
            'legs': SET_INS.legs,
            'boots': SET_INS.boots,
            'gloves': SET_INS.gloves,
            'neck': SET_INS.neck,
            'cape': SET_INS.cape,
            'ring': SET_INS.ring,
            'pocket': SET_INS.pocket        
        }
        
        self.magicLvl = self.calculate_levels()
        
        self.magicBonus = self.compute_bonus()
        
        self.ad = self.compute_ad()
    
    def aura_level_boost(self):
        boost = next((b for b in SET_INS.utils.boosts if b['name'] == SET_INS.aura), None)
        if boost is None:
            return [0, 0, 0, 0]

        magicBoostPercent = SET_INS.level * boost.get('magic_level_percent', 0)

        return magicBoostPercent
    
    def potion_level_boost(self):
        boost = next((b for b in SET_INS.utils.boosts if b['name'] == SET_INS.potion), None)
        if boost is None:
            return [0, 0, 0, 0]

        boostValues = {
            'magic_level_percent': SET_INS.level * boost.get('magic_level_percent', 0),
            'magic_level_boost': boost.get('magic_level_boost', 0),
        }

        netBoost = boostValues['magic_level_percent'] + boostValues['magic_level_boost']

        return netBoost
    
    def calculate_levels(self):
        auraBoost = self.aura_level_boost()
        potionBoost = self.potion_level_boost()

        level = int(SET_INS.level + potionBoost + auraBoost)
        if (SET_INS.zerkEss == 1) and (SET_INS.potion == None or 'verload' not in SET_INS.potion):
            magicLvl = int((1.14 * level) + 2)
        else:
            magicLvl = level
        
        return magicLvl
            
    def compute_bonus(self):
        bonus = 0
        gearSlots = {
            'helm': 'helm',
            'body': 'body',
            'legs': 'legs',
            'boots': 'boots',
            'gloves': 'gloves',
            'neck': 'neck',
            'cape': 'cape',
            'ring': 'ring',
            'pocket': 'pocket'        
        }

        for item in SET_INS.utils.gear:
            slot = item['slot']
            if item['name'] == self.armour.get(gearSlots.get(slot)):
                bonus += item['magic_bonus']
           
        if SET_INS.reaperCrew == 1:
            bonus += 12
        
        return bonus
    
    def compute_ad(self):
        thAbilityDmg = int(round(2.5 * self.magicLvl,4)) + int(round(1.25 * self.magicLvl,4)) + int(round(14.4 * SET_INS.thTier + 1.5 * self.magicBonus, 4))
        mhAbilityDmg = int(round(2.5 * self.magicLvl,4)) + int(round(9.6 * SET_INS.mhTier + self.magicBonus, 4))
        ohAbilityDmg = int(round(0.5 * (int(round(2.5 * self.magicLvl,4)) + int(round(9.6 * SET_INS.ohTier + self.magicBonus, 4))),4))
        
        if SET_INS.sh['type'] == 'defender':
            shAbilityDmg = int(round(0.5 * (int(round(2.5 * self.magicLvl,4)) + int(round(9.6 * (0.5 * SET_INS.shTier) + self.magicBonus, 4))),4))
        else:
            shAbilityDmg = 0
            
        dwAbilityDmg = mhAbilityDmg + ohAbilityDmg
        msAbilityDmg = mhAbilityDmg + shAbilityDmg

        return [thAbilityDmg, dwAbilityDmg, msAbilityDmg]

AD_INS = AbilityDmg()