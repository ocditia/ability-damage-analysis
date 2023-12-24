class rangedHelper{
    damageObjectCreator(settings) {
        let obj = {
            'non-crit': {
                'list': [],
                'probability': 0,
            },
            'crit': {
                'list': [],
                'probability': 0,
            }
        }
        return obj;
    }

    baseDamageListCreator(fixed,variable) {
        const dmg = []
        for (var i = fixed; i <= math.floor(0.95 * (fixed + variable)); i++) {
            dmg.push(i);
        }
        return dmg;
    }

    naturalCritDamageListCreator(fixed,variable) {
        const dmg = []
        for (var i = math.floor(0.95 * (fixed + variable)); i <= (fixed + variable); i++) {
            dmg.push(i);
        }
    }

    forcedCritDamageListCreator(fixed,variable) {
        const dmg = []
        for (var i = fixed + math.floor(0.95 * variable); i <= (fixed + variable); i++) {
            dmg.push(i);
        }
    }

    hitCapApplier(dmg,hitcap) {
        if (dmg > hitcap) {
            dmg = hitcap;
        }
        return dmg
    }

    baseHitCapDmgList(dmgList,settings) {
        const hitCapDmg = [];
        for (const i of dmgList) {
            hitCapDmg.push(this.hitCapApplier(i,settings['hitcap']));
        }
        return hitCapDmg;
    }

    critHitCapDmgList(dmgList,settings) {
        const hitCapDmg = [];
        for (const i of dmgList) {
            hitCapDmg.push(this.hitCapApplier(i,settings['critcap']));
        }
        return hitCapDmg;
    }

    totalDamageCalc(dmgList) {
        let total = 0;
        for (const i of dmgList) {
            total = total + i;
        }
        return total;
    }

    flooredList(dmgList) {
        for (var i = 0; i< dmgList.length; i++) {
            dmgList[i] = Math.floor(dmgList[i]);
        }
        return dmgList;
    }

    listAdder(list1,list2) {
        const returnList = []
        for (var i = 0; i<list1.length; i++) {
            returnList.push(list1[i] + list2[i]);
        }
        return returnList;
    }
}

module.exports = necromancyHelper;