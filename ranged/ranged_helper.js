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
        for (var i = fixed; i <= (fixed + variable); i++) {
            dmg.push(i);
        }
        return dmg;
    }

    hitCapApplier(dmg,hitcap) {
        if (dmg > hitcap) {
            dmg = hitcap;
        }
        return dmg
    }

    hitCapDmgList(dmgList,settings) {
        const hitCapDmg = [];
        for (const i of dmgList) {
            hitCapDmg.push(this.hitCapApplier(i,settings['hitcap']));
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

module.exports = rangedHelper;