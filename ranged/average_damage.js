const Crit = require('./ranged_crit')
const construction = require('./ranged_const')

class avgDmg {
    averageDamage(abil_val,dmg_list,nat_critDmg_list,force_critDmg_list,settings) {
        const CRIT_INS = new Crit();

        //calc average damage
        var regTotal = 0;
        for(var i = 0; i < dmg_list.length; i++) {
            regTotal += dmg_list[i];
        }
        var avgReg = regTotal / dmg_list.length;

        var natCritTotal = 0;
        for(var i = 0; i < nat_critDmg_list.length; i++) {
            natCritTotal += nat_critDmg_list[i];
        }
        var avgNatCrit = natCritTotal / nat_critDmg_list.length;

        var forceCritTotal = 0;
        for(var i = 0; i < force_critDmg_list.length; i++) {
            forceCritTotal += force_critDmg_list[i];
        }
        var avgForceCrit = forceCritTotal / force_critDmg_list.length;

        let fCritChance = 0
        if (Abil[abil_val]["crit effects"] === true) {
            fCritChance = CRIT_INS.calcFCritChance(0, settings['gconc'], settings['kalg'], settings['kalgSpec'], settings['reavers'], 0, settings['biting']);
        } 

        let natCritChance = (1-fCritChance) * ((nat_critDmg_list.length))

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

    dmgObjectProbabilityCalc(dmgObject, settings) {
        const CRIT_INS = new Crit();
        let critChance = CRIT_INS.calcFCritChance(settings);

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

    returnDecider(dmgObject,settings) {
        dmgObject = this.dmgObjectProbabilityCalc(dmgObject,settings)
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