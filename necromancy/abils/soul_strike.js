const AbilityDmg = require('../necromancy_ad')
const OnNPC = require('../necromancy_on_npc')
const OnHit = require('../necromancy_on_hit')
const Crit = require('../necromancy_crit')
const Abil = require('../necromancy_const')
const Avg = require('../average_damage')
const { channel } = require('diagnostics_channel')

function soul_strike(type, settings, numberOfHits) {
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    let abil_val = "soul strike - main"
    const fixedPercent = Abil[abil_val]['fixed percent'];
    const variablePercent = Abil[abil_val]['variable percent'];

    const hits = []
   
    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {

        //calculates ability damage
        let AD = settings['AD'];
        
        //sets fixed and variable damage
        let fixed = Math.floor(AD * fixedPercent);
        let variable = Math.floor(AD * variablePercent);

        //applies on-hit effects
        let onHit = HIT_INS.calcOnHit(fixed, variable, Abil[abil_val]["on hit effects"],settings['prayer'], settings['dharok'], settings['ful'], settings['rubyAurora'], settings['salve'], settings['precise'], settings['equilibrium'], settings['aura']['name']);
    
        //sets up for further calculations
        fixed = onHit[0];
        variable = onHit[1];

        //apply crit dmg
        const dmg = [];
        const critDmg = [];
        for (var i = fixed; i <= (fixed + variable); i++) {
            let non_crit = i;
            crit = CRIT_INS.critDmgBuff(non_crit);

            dmg.push(non_crit)
            critDmg.push(crit)
        }

        //apply special calculations

        //apply on-npc effects and hitcaps
        for (var i = 0; i < (dmg.length); i++) {
            dmg[i] = NPC_INS.calcOnNpc(dmg[i], settings);
            critDmg[i] = NPC_INS.calcOnNpc(critDmg[i], settings);
            
            if (dmg[i] > settings['cap']) {
                dmg[i] = settings['cap'];
            }

            if (critDmg[i] > settings['cap']) {
                critDmg[i] = settings['cap'];
            }
        }
       
        //add damage together where needed

        //set min, avg, and max damage
        dmgMin = dmg[0]
        dmgMax = critDmg[critDmg.length-1]
        let dmgAvg = AVG_INS.averageDamage(abil_val,dmg,critDmg,settings)
        hits.push([dmgMin,dmgAvg,dmgMax])
    }    

    //compute total min, avg, and max of all hits combined
    hits.push(AVG_INS.addUpDamages(hits))
    return hits;
}

module.exports = soul_strike;

