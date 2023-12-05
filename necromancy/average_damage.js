const Crit = require('./necromancy_crit')
const Abil = require('./necromancy_const')

class avgDmg {
    averageDamage(abil_val,dmg_list,critDmg_list,settings) {
        const CRIT_INS = new Crit();

        //calc average damage
        var regTotal = 0;
        for(var i = 0; i < dmg_list.length; i++) {
            regTotal += dmg_list[i];
        }
        var avgReg = regTotal / dmg_list.length;

        var critTotal = 0;
        for(var i = 0; i < critDmg_list.length; i++) {
            critTotal += critDmg_list[i];
        }
        var avgCrit = critTotal / critDmg_list.length;

        let fCritChance = 0
        if (Abil[abil_val]['crit effects'] === true) {
            fCritChance = CRIT_INS.calcFCritChance(0, settings['gconc'], settings['kalg'], settings['kalgSpec'], settings['reavers'], 0, settings['biting']);
        } 

        let dmgAvg = fCritChance * avgCrit + (1 - fCritChance) * avgReg;

        return dmgAvg
    }

    addUpDamages(hits) {
        let dmgMin = 0;
        let dmgAvg = 0;
        let dmgMax = 0;
    
        for (var i = 0; i < hits.length; i++) {
            dmgMin += hits[i][0];
            dmgAvg += hits[i][1];
            dmgMax += hits[i][2];
        }

        return [dmgMin,dmgAvg,dmgMax]
    }
}

module.exports = avgDmg;