const OnCast = require('../magic_on_cast')
const AbilityDmg = require('../magic_ad')
const OnNPC = require('../magic_on_npc')
const OnHit = require('../magic_on_hit')
const Crit = require('../magic_crit')

function timeStrike(type, settings) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const CAST_INS = new OnCast();

    let AD = AD_INS.calcAd(type, settings['level'], settings['bonus'], settings['th']['tier'], settings['mh']['tier'], settings['oh']['tier'], settings['sh']['tier'], settings['sh']['type']);
    
    if (type === 'Two-hand' && settings['th']['name'] === 'Inquisitor staff') {
        AD = CAST_INS.calcOnCast(AD, settings['enchAff']);
    }

    let fixed = Math.floor(AD * 0.6);
    let variable = Math.floor(AD * 0.6);

    let onHit = HIT_INS.calcOnHit(fixed, variable, settings['prayer'], settings['boostedLvls'], settings['dharok'], settings['exsang'], settings['ful'], settings['rubyAurora'], settings['salve'], settings['precise'], settings['equilibrium'], settings['aura']['name'], true);

    let DmgMin = [onHit[0][0], onHit[1][0]];
    let DmgMax = [onHit[0][0] + onHit[0][1], onHit[1][0] + onHit[1][1]];
    let DmgAvg = [onHit[0][0] + Math.floor(0.5 * onHit[0][1]), onHit[1][0] + Math.floor(0.5 * onHit[1][1])];
    let fCritRegAvg = CRIT_INS.calcFCritDmg(onHit[0][0], onHit[0][1], 0, settings['enchMeta']);
    let fCritSunAvg = CRIT_INS.calcFCritDmg(onHit[1][0], onHit[1][1], 0, settings['enchMeta']);
    const fCritChance = CRIT_INS.calcFCritChance(0, 0, settings['kalg'], settings['kalgSpec'], settings['reavers'], settings['grimoire'], settings['biting']);
    let nCritRegAvg = CRIT_INS.calcNCritDmg(onHit[0][0], onHit[0][1], 0, settings['enchMeta']);
    let nCritSunAvg = CRIT_INS.calcNCritDmg(onHit[1][0], onHit[1][1], 0, settings['enchMeta']);
    const nCritChance = CRIT_INS.calcNCritChance(onHit[0][0], onHit[0][1], fCritChance);

    DmgMin = NPC_INS.calcOnNpc(DmgMin[0], DmgMin[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    DmgAvg = NPC_INS.calcOnNpc(DmgAvg[0], DmgAvg[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    DmgMax = NPC_INS.calcOnNpcCrit(DmgMax[0], DmgMax[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    fCritDmg = NPC_INS.calcOnNpcCrit(fCritRegAvg, fCritSunAvg, settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    nCritDmg = NPC_INS.calcOnNpcCrit(nCritRegAvg, nCritSunAvg, settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);

    DmgAvg = [Math.floor(DmgAvg[0] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[0] * fCritChance) + Math.floor(nCritDmg[0] * nCritChance), Math.floor(DmgAvg[1] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[1] * fCritChance) + Math.floor(nCritDmg[1] * nCritChance), Math.floor(DmgAvg[2] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[2] * fCritChance) + Math.floor(nCritDmg[2] * nCritChance)];

    return  [DmgMin, DmgAvg, DmgMax];
}

module.exports = timeStrike;