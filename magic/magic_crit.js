class Crit {
    calcFCritChance(channeler_stacks, gconc, kalg, kalgSpec, reavers, grim, biting) {
        let fcrit = parseFloat(
            (0.05 * kalgSpec) +
            (0.01 * kalg) +
            (0.05 * reavers) +
            (0.12 * grim) +
            biting +
            (0.05 * gconc) +
            (0.04 * channeler_stacks)
        ).toFixed(4);
        
        return fcrit;
    }
    
    calcFCritDmg(fixed, variable, channeler_stacks, ench) {
        let fcritAvg = fixed + Math.floor(0.5 * (Math.floor(variable * 0.95) + variable));
        
        if (ench === true) {
            fcritAvg = fcritAvg + Math.floor(fcritAvg * 0.025 * channeler_stacks);
        }

        return fcritAvg;
    }
    
    calcNCritChance(fixed, variable, fcrit) {
        const maxHit = fixed + variable;
        const minCrit = Math.floor(maxHit * 0.95);
        const ncrit = (1 - fcrit) * ((maxHit - minCrit) / variable);
        
        return ncrit;
    }
    
    calcNCritDmg(fixed, variable, channeler_stacks, ench) {
        const maxHit = fixed + variable;
        const minCrit = Math.floor(0.95 * maxHit);
        let ncritAvg = Math.floor((maxHit + minCrit) / 2);
        
        if (ench === true) {
            ncritAvg = ncritAvg + Math.floor(ncritAvg * 0.025 * channeler_stacks);
        }
        
        return ncritAvg;
    }
}

module.exports = Crit;
