const Crit = require('./necromancy_crit')
const construction = require('./necromancy_const')

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
        if (Abil[abil_val]["crit effects"] === true) {
            fCritChance = CRIT_INS.calcFCritChance(settings);
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

    dmgObjectProbabilityCalc(dmgObject, settings, abil_val) {
        const CRIT_INS = new Crit();
        let critChance = 0;
        
        if (construction['abilities'][abil_val]["crit effects"] === true) {
            critChance = CRIT_INS.calcFCritChance(settings);
        } 

        dmgObject['non-crit']['probability'] = 1 - critChance;
        dmgObject['crit']['probability'] = critChance;
        return dmgObject;
    }

    averageDamageList(dmgList) {
        let total = 0;
        for (const i of dmgList) {
            total = total + i;
        }
        return total / dmgList.length;
    }

    averageDamageObject(dmgObject) {
        let avg = 0;
        for (let key in dmgObject) {
           let dmg = this.averageDamageList(dmgObject[key]['list']);
           let prob = dmgObject[key]['probability'];
           avg = avg + dmg * prob;
        }
        return avg;
    }

    returnDecider(dmgObject,settings,abil_val) {
        dmgObject = this.dmgObjectProbabilityCalc(dmgObject,settings,abil_val)
        if (settings['minavgmax'] === 'min') {
            return 'min';
        }
        else if (settings['minavgmax'] === 'max') {
            return 'max';
        }
        else if (settings['minavgmax'] === 'avg') {
            return this.averageDamageObject(dmgObject);
        }
    }
}

module.exports = avgDmg;