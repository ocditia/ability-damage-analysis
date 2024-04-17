class Crit {
    calcFCritChance(settings, concStacks, channellerStacks) {
        if (settings['aura'] === 'equilibrium') {
            return 0;
          }

        let fcrit = 0.1 +
            (0.05 * settings['crit-i-kal']) +
            (0.01 * settings['kalgerion demon familiar']) +
            (0.04 * channellerStacks) +
            (0.05 * concStacks); 

        if (settings['ring'] === 'reavers') {
            fcrit += 0.05;
        }
        if (settings['pocket slot'] === 'grimoire') {
            fcrit += 0.12;
        }      
        if (settings['tuska might'] === true) {
            if (settings['helmet'] === 'sliske helm' && settings['body'] === 'sliske body' && settings['leg'] === 'sliske legs'){
                fcrit += 0.06;
            }
        }    
        if (settings['level 20 armour'] === true) {
            fcrit += 0.022 * settings['biting'];
        }  
        else if (settings['level 20 armour'] === false) {
            fcrit += 0.02 * settings['biting'];
        }

        fcrit += settings['custom crit chance']/100;
        return Math.min(fcrit,1);
    }

    critDmgBuff(dmg,settings, channellerStacks) {
        let modifier = 0.0;
        let level_mod = 0.05 * (1 + Math.floor(settings['level']/10));
        modifier = modifier + Math.min(level_mod,0.5);

        if (settings['enchantment metaphysics'] === true) {
            modifier += 0.025 * channellerStacks;
        }
        if (settings['smoke cloud'] === true) {
            modifier += 0.15;
        }

        return Math.floor(dmg * (1 + modifier));
    }

    critDamageList(dmgList,settings, channellerStacks) {
        const critDamage = [];
        for (const i of dmgList) {
            critDamage.push(this.critDmgBuff(i,settings, channellerStacks));
        }
        return critDamage;
    }
}

export default Crit;
