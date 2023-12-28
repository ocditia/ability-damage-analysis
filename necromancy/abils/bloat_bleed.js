const AbilityDmg = require('../necromancy_ad')
const OnNPC = require('../necromancy_on_npc')
const OnHit = require('../necromancy_on_hit')
const Crit = require('../necromancy_crit')
const NecroHelper = require('../necromancy_helper')
const Avg = require('../average_damage')
const split_soul = require('./split_soul')
const construction = require('../necromancy_const')
const { channel } = require('diagnostics_channel')

function bloat_bleed(dmgList, settings,AD) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new NecroHelper(); 
    let abil_val = 'bloat - bleed hit'
    settings['category'] = construction['abilities'][abil_val]['category'];

    const hits = []
   
        let bleedList = [];
        for (var i=0; i<dmgList.length;i++) {
            bleedList.push(Math.floor(dmgList[i]/4));
        }

        //apply on-npc effects and hitcaps
        let dmg = NPC_INS.onNpcDamageList(bleedList,settings,AD); 

        //split soul
        splitSoul = split_soul(dmg,settings);

        //apply hit caps
        dmg = Helper.hitCapDmgList(dmg,settings);

        //add up damages
        dmg = Helper.listAdder(dmg,splitSoul);

        for (var i=0; i<dmgList.length;i++) {
            dmg[i] = 10*dmg[i];
        }

        dmg = Helper.listAdder(dmg,dmgList);

        //calc total damage
        return dmg;
    }

    

module.exports = bloat_bleed;
