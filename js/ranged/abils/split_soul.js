import NecroHelper from '../ranged_helper.js';
import OnNPC from '../ranged_on_npc.js';

function split_soul(dmgList, settings) {
    settings['category'] = 'split soul.js';
    const Helper = new NecroHelper(); 
    if (settings['split soul'] === true) {
        let splitSoul = [];
        const NPC_INS = new OnNPC();
        for (var i = 0; i < dmgList.length; i++) {
            let hit = dmgList[i];
            let soulSplit = 0;
            
            if (hit > 2000) {
                soulSplit = soulSplit + 200;
                hit = hit - 2000;

                if (hit > 2000) {
                soulSplit = soulSplit + 100;
                hit = hit - 2000;

                soulSplit = soulSplit + Math.floor(0.0125 * hit);
                hit = 0
                }
                
                else {
                    soulSplit = soulSplit + Math.floor(0.05 * hit);
                    hit = 0;
                }
            }
            else {
                soulSplit = soulSplit + Math.floor(0.1 * hit);
                hit = 0;
            }

            if (settings['necklace'] in ["Essence of finality amulet (or)","Essence of finality amulet","Amulet of souls (or)","Amulet of souls"]) {
                soulSplit = Math.floor(soulSplit * 1.1875)
            }

            if (settings['Zamorak balance of power'] > 0)
            {
                soulSplit = Math.floor((1-settings['Zamorak balance of power']) * soulSplit)
            }

            splitSoul.push(4 * soulSplit)
        }
        splitSoul = NPC_INS.onNpcDamageList(splitSoul,settings,1000);
        
        return Helper.hitCapDmgList(splitSoul,settings)
    }

    else {
        const returnList = [];
        for (var i = 0; i < dmgList.length; i++) {
            returnList.push(0);
        }
        return returnList;
    }
}

export default split_soul;