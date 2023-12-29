class Crit {
    calcFCritChance(settings) {
        let fcrit =
            (0.05 * settings['crit-i-kal']) +
            (0.01 * settings['kalgerion demon familiar']) +
            (0.02 * settings['biting']);

        if (settings['ring'] === 'reavers') {
            fcrit = fcrit + 0.05;
        }
        if (settings['pocket slot'] === 'grimoire') {
            fcrit = fcrit + 0.12;
        }
        if (settings['ring'] === 'stalkers') {
            if (settings['enchantment of shadows'] === true) {
                fcrit = fcrit + 0.04;
            }
            else {
                fcrit = fcrit + 0.03;
            }
        }      
        return fcrit;
    }

    critDmgBuff(dmg,settings) {
        let modifier = 0;
        if (settings['smoke cloud'] === true) {
            modifier = modifier + 0.06;
        }
        if (settings['ring'] === 'stalkers') {
            if (settings['enchantment of shadows'] === true) {
                modifier = modifier + 0.03;
            }
            else {
                modifier = modifier;
            }
        }
        return dmg * (1 + modifier);
    }

    critDamageList(dmgList,settings) {
        const critDamage = [];
        for (const i of dmgList) {
            critDamage.push(this.critDmgBuff(i,settings));
        }
        return critDamage;
    }
}

module.exports = Crit;
