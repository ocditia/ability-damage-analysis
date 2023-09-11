const OnCast = require('../magic_on_cast')
const AbilityDmg = require('../magic_ad')
const OnNPC = require('../magic_on_npc')
const OnHit = require('../magic_on_hit')
const Crit = require('../magic_crit')
const timeStrike = require('./timestrike')

function wrack(type, settings) {
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const CAST_INS = new OnCast();
    
    if (type === 'Two-hand' && settings['th']['name'] === 'Inquisitor staff') {
        settings['AD'] = CAST_INS.calcOnCast(AD, settings['enchAff']);
    }

    let fixed = Math.floor(AD * 0.4);
    let variable = Math.floor(AD * 1.0);

    let onHit = HIT_INS.calcOnHit(fixed, variable, settings['prayer'], settings['boostedLvls'], settings['dharok'], settings['exsang'], settings['ful'], settings['rubyAurora'], settings['salve'], settings['precise'], settings['equilibrium'], settings['aura']['name'], true);

    let DmgMin = [onHit[0][0], onHit[1][0]];
    let DmgMax = [onHit[0][0] + onHit[0][1], onHit[1][0] + onHit[1][1]];
    let DmgAvg = [onHit[0][0] + Math.floor(0.5 * onHit[0][1]), onHit[1][0] + Math.floor(0.5 * onHit[1][1])];
    let fCritRegAvg = CRIT_INS.calcFCritDmg(onHit[0][0], onHit[0][1], 0, settings['enchMeta']);
    let fCritSunAvg = CRIT_INS.calcFCritDmg(onHit[1][0], onHit[1][1], 0, settings['enchMeta']);
    const fCritChance = CRIT_INS.calcFCritChance(0, settings['gconc'], settings['kalg'], settings['kalgSpec'], settings['reavers'], settings['grimoire'], settings['biting']);
    let nCritRegAvg = CRIT_INS.calcNCritDmg(onHit[0][0], onHit[0][1], 0, settings['enchMeta']);
    let nCritSunAvg = CRIT_INS.calcNCritDmg(onHit[1][0], onHit[1][1], 0, settings['enchMeta']);
    const nCritChance = CRIT_INS.calcNCritChance(onHit[0][0], onHit[0][1], fCritChance);

    DmgMin = NPC_INS.calcOnNpc(DmgMin[0], DmgMin[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    DmgAvg = NPC_INS.calcOnNpc(DmgAvg[0], DmgAvg[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    DmgMax = NPC_INS.calcOnNpcCrit(DmgMax[0], DmgMax[1], settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    fCritDmg = NPC_INS.calcOnNpcCrit(fCritRegAvg, fCritSunAvg, settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);
    nCritDmg = NPC_INS.calcOnNpcCrit(nCritRegAvg, nCritSunAvg, settings['kww'], settings['enchFlame'], settings['vuln'], settings['cryptbloom'], settings['slayerPerk'], settings['slayerSigil'], settings['aura']['boost'], settings['scrimshaw'], settings['scrimshaw']['type']);

    DmgAvg = [Math.floor(DmgAvg[0] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[0] * fCritChance) + Math.floor(nCritDmg[0] * nCritChance), Math.floor(DmgAvg[1] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[1] * fCritChance) + Math.floor(nCritDmg[1] * nCritChance), Math.floor(DmgAvg[2] * (1 - fCritChance - nCritChance)) + Math.floor(fCritDmg[2] * fCritChance) + Math.floor(nCritDmg[2] * nCritChance)];

    if (settings['fsoa'] === true) {
        fsoa = timeStrike(type, settings)
        DmgAvg = [DmgAvg[0] + Math.floor(fsoa[1][0] * (fCritChance + nCritChance)), DmgAvg[1] + Math.floor(fsoa[1][1] * (fCritChance + nCritChance)), DmgAvg[2] + Math.floor(fsoa[1][2] * (fCritChance + nCritChance))]
    }

    return  [DmgMin, DmgAvg, DmgMax];
}

module.exports = wrack;

