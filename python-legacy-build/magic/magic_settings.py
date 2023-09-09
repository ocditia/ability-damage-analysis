import os
import json

class Settings:
    def __init__(self):
        self.level = 99
        self.potion = 'None'
        self.prayer = 'None'
        
       #weapons
        self.mh = {
            'name': 'Wand of the praesul',
            'aftershock': 0,
            'precise': 0,
            'equilibrium': 0,
            'ruthless': 0,
            'spendthrift': 0,
            'flanking': 0
        }
        
        self.oh = {
            'name': 'Imperium core',
            'aftershock': 0,
            'precise': 0,
            'equilibrium': 0,
            'ruthless': 0,
            'spendthrift': 0,
            'flanking': 0
        }
        
        self.th = {
            'name': 'Fractured staff of Armadyl',
            'aftershock': 0,
            'precise': 6,
            'equilibrium': 2,
            'ruthless': 0,
            'spendthrift': 0,
            'flanking': 0
        }
        
        self.sh = {
            'tier': 90,
            'type': 'defender',
            'aftershock': 0,
            'precise': 0,
            'equilibrium': 0,
            'ruthless': 0,
            'spendthrift': 0,
            'flanking': 0
        }
        
        self.helm = 'None'
        self.neck = 'None'
        self.body = 'Elite tectonic'
        self.legs = 'None'
        self.boots = 'None'
        self.gloves = 'None'
        self.ring = 'Reavers'
        self.cape = 'None'
        self.pocket = 'Grimoire'
        self.aura = 'None'
        
        if self.ring == 'None':
            self.reavers = 1
        else:
            self.reavers = 0
        
        if self.pocket == 'Grimoire':
            self.grim = 1
        else:
            self.grim = 0
        
        self.bitingRank = 4
        self.armourLvl = 20  
        
        if self.armourLvl == 20:
            self.biting = self.bitingRank * 0.022
        else:
            self.biting = self.bitingRank * 0.02
         
        self.vuln = 0
        self.sc = 1
        self.fsoa = 0
        self.kalg = 1
        self.kalgSpec = 1
        self.ful = 0
        self.zerkEss = 0
        self.reaperCrew = 1
        self.gconc = 0
        self.enchMeta = 1
        self.enchAff = 1
        self.enchFlame = 1
        self.hex = 0
        self.ripper = 0
        self.dharok = 0
        self.exsang = 0
        self.rubyAurora = 0
        self.slayerSigil = 0
        self.cryptbloom = 0
        self.slayerPerk = 0
        self.nope = 0
        self.kww = 0
        self.revenge = 0
        
        self.utils = Utils()
        
        self.thTier = self.getTier(self.th['name'])
        self.mhTier = self.getTier(self.mh['name'])
        self.ohTier = self.getTier(self.oh['name'])
        self.shTier = self.sh['tier']
        
    def getTier(self, weapon):
        for w in self.utils.weapons:
            if w['name'] == weapon:
                return w['dmg_tier']
        
    def setInput(self, name, value):
        setattr(self, name, value)

class Utils:
    def __init__(self):
        self.gear = self.loadJson('utils', 'gear.json')
        self.weapons = self.loadJson('utils', 'weapons.json')
        self.boosts = self.loadJson('utils', 'boosts.json')
        
    def loadJson(self, directory, filename):
        filePath = os.path.join(directory, filename)
        with open(filePath, 'r') as file:
            return json.load(file)
        
SET_INS = Settings()