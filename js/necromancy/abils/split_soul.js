const NecroHelper = require('../necromancy_helper')

function split_soul(dmgList, settings) {
    settings['category'] = 'split soul';
    const Helper = new NecroHelper(); 
    if (settings['split soul'] === true) {
        const splitSoul = [];
        for (var i = 0; i < dmgList.length; i++) {
            let hit = dmgList[i];
            let soulSplit = 0;
            //no aos proc
            
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
                }
            }
            else {
                soulSplit = soulSplit + Math.floor(0.1 * hit);
                hit = hit - hit
            }

            if (settings['necklace'] in ["Essence of finality amulet (or)","Essence of finality amulet","Amulet of souls (or)","Amulet of souls"]) {
                soulSplit = Math.floor(soulSplit * 1.1875)
            }

            splitSoul.push(4 * soulSplit)
        }
        
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

module.exports = split_soul;