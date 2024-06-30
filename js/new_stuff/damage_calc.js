import {weapons, gear, abils, prayers} from "./const";

function calc_base_ad(settings) {
    // see wiki page /ability_damage for more info
    let spell_tier = 999;
    let base_AD = 0;

    if (settings['main_style'] === 'magic') {
        if (settings['weapon type'] === 'main-hand') {
            let AD_mh = Math.floor(2.5 * settings['magic level'])
            + Math.floor(9.6 * Math.min(weapons[settings['main-hand weapon']]['tier'], spell_tier) + calc_bonus(settings));
            
            let AD_oh = 0
            if (weapons[settings['off-hand weapon']]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor( 0.5 * Math.floor(2.5 * settings['magic level']) 
                + Math.floor(9.6 * Math.min(weapons[settings['off-hand weapon']]['tier'], spell_tier) + calc_bonus(settings)));
            }
            
            base_AD = AD_mh + AD_oh;
        }

        else if (settings['weapon type'] === 'two-hand') {
            base_AD = Math.floor(2.5 * settings['magic level']) 
            + Math.floor(1.25 * settings['magic level']) 
            + Math.floor(14.4 * Math.min(weapons[settings['two-hand weapon']]['tier'], spell_tier) + 1.5 * calc_bonus(settings));
        }
    }

    else if (settings['main_style'] === 'melee') {
        if (settings['weapon type'] === 'main-hand') {
            let AD_mh = Math.floor(2.5 * settings['strength level']) 
            + Math.floor(9.6 * weapons[settings['main-hand weapon']]['tier'] + calc_bonus(settings));
            
            let AD_oh = 0
            if (weapons[settings['off-hand weapon']]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor( 0.5 * Math.floor(2.5 * settings['strength level']) 
                + Math.floor(9.6 * weapons[settings['off-hand weapon']]['tier'] + calc_bonus(settings)));
            }
            
            base_AD = AD_mh + AD_oh;
        }

        else if (settings['weapon type'] === 'two-hand') {
            base_AD = Math.floor(2.5 * settings['strength level']) 
            + Math.floor(1.25 * settings['strength level']) 
            + Math.floor(9.6 * weapons[settings['two-hand weapon']]['tier'])
            + calc_bonus(settings) 
            + Math.floor(4.8 * weapons[settings['two-hand weapon']]['tier'] + 0.5 * calc_bonus(settings));
        }
    }

    else if (settings['main_style'] === 'ranged') {
        if (settings['weapon type'] === 'main-hand') {
            let AD_mh = Math.floor(2.5 * settings['ranged level']) 
            + Math.floor(9.6 * weapons[settings['main-hand weapon']]['tier'] + calc_bonus(settings));
            
            let AD_oh = 0
            if (weapons[settings['off-hand weapon']]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor( 0.5 * Math.floor(2.5 * settings['ranged level']) 
                + Math.floor(9.6 * weapons[settings['off-hand weapon']]['tier'] + calc_bonus(settings)));
            }
            
            base_AD = AD_mh + AD_oh;
        }

        else if (settings['weapon type'] === 'two-hand') {
            base_AD = Math.floor(2.5 * settings['ranged level']) 
            + Math.floor(1.25 * settings['ranged level']) 
            + Math.floor(9.6 * weapons[settings['two-hand weapon']]['tier'])
            + calc_bonus(settings) 
            + Math.floor(4.8 * weapons[settings['two-hand weapon']]['tier'] + 0.5 * calc_bonus(settings));
        }
    }

    else if (settings['main_style'] === 'necromancy') {
        if (settings['weapon type'] === 'main-hand') {
            let AD_mh = Math.floor(2.5 * settings['necromancy level']) 
            + Math.floor(9.6 * weapons[settings['main-hand weapon']]['tier'] + calc_bonus(settings));
            
            let AD_oh = 0
            if (weapons[settings['off-hand weapon']]['weapon type'] === 'off-hand') {
                AD_oh = Math.floor( 0.5 * Math.floor(2.5 * settings['necromancy level']) 
                + Math.floor(9.6 * weapons[settings['off-hand weapon']]['tier'] + calc_bonus(settings)));
            }
            
            base_AD = AD_mh + AD_oh;
        }
    }

    // eruptive perk
    base_AD = Math.floor(base_AD * (1 + settings['eruptive'] * 0.05));

    // equilibrium aura
    if (settings['aura'] === 'equilibrium') {
        base_AD = Math.floor(base_AD * 1.12);
    }

    return base_AD;
}   

// bonus from gear and reaper crew
function calc_bonus(settings) {
    return 0;
}

// modify boosted AD by damage potential (hit chance)
// need to double check how this actually works
function calc_damage_potential(settings) {
    let hit_chance = Math.max(settings['hit chance']/100, 1);
    return Math.floor(settings['base_AD'] * hit_chance);
}

// calculate boosted AD
function calc_boosted_ad(settings) {
    let boosted_AD = calc_damage_potential(settings);

    if (settings['main_style'] === 'magic') {
        // inq staff
        if (settings['two-hand weapon'] === 'inquisitor staff') {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // inq staff upgraded
        else if (settings['two-hand weapon'] === 'inquisitor staff+') {
            boosted_AD = Math.floor(boosted_AD * 1.175);
        }

        // flow stacks
        boosted_AD = Math.floor(boosted_AD * (1 + 0.01 * settings['flow stacks']));
    }

    if (settings['main_style'] === 'melee') {
        // terrasaur maul
        if (settings['two-hand weapon'] === 'terrasaur maul') {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // terrasaur maul upgraded
        else if (settings['two-hand weapon'] === 'terrasaur maul+') {
            boosted_AD = Math.floor(boosted_AD * 1.175);
        }

        // chaos roar
        if (settings['chaos roar'] === true) {
            boosted_AD = 2*boosted_AD;
        }
    }

    if (settings['main_style'] === 'ranged') {
        // hex bow
        if (settings['two-hand weapon'] === 'hexhunter bow') {
            boosted_AD = Math.floor(boosted_AD * 1.125);
        }

        // hex bow upgraded
        else if (settings['two-hand weapon'] === 'hexhunter bow+') {
            boosted_AD = Math.floor(boosted_AD * 1.175);
        }

        // icy precision (wen arrows)
        const wen_arrow_abil_types_buffed = ['threshold', 'ultimate', 'special attack'];
        if (wen_arrow_abil_types_buffed.includes(abils[settings['ability']]['ability type'])) {
            boosted_AD = Math.floor(boosted_AD * (1 + 0.03 * settings['icy precision']))
        }
    }

    // necromancy has no (known) buffs of this type

    return boosted_AD
}

function set_min_var(settings) {
    // set initial min and var values
    min_percent = abils[settings['ability']]['min hit'];
    var_percent = abils[settings['ability']]['var hit'];

    min_hit = Math.max(Math.floor(min_percent * settings['boosted_AD']),0);
    var_hit = Math.max(Math.floor(var_percent * settings['boosted_AD']),0);

    return [min_hit, var_hit];
}

function calc_precise(settings) {
    // calculate precise
    let max_hit = settings['min hit'] + setting['max hit'];
    let min_hit = settings['min hit'] + Math.floor(0.015 * settings['precise'] * max_hit)

    return min_hit
}

function calc_additive_boosts(settings) {
    // compute the bonus gained from additive boosts
    let boost = 0;

    // add stone of jas boost
    boost += settings['stone of jas']/100;

    // void armour
    // still need to add check for gear worn instead of checkbox style
    if (settings['void gear'] === 'regular') {
        boost += 0.05;
    }

    // superior void armour
    else if (settings['void gear'] === 'superior') {
        boost += 0.07;
    }

    // zerk necklace
    // need to add check for obby weapon
    // need to update dps gain to 0.05
    if (settings['necklace'] === 'berserker necklace') {
        boost += 0;
    }

    // regular gloves of passive next abil boost if style is melee
    if (settings['enduring ruin - hit'] === 'regular' && settings['main_style'] === 'melee') {
        boost += 0.1;
    }

    // upgraded gloves of passage
    else if (settings['enduring ruin - hit'] === 'enhanced' && settings['main_style'] === 'melee') {
        boost += 0.16;
    }

    if (settings['needle strike'] === true && settings['main_style'] === 'ranged') {
        boost += 0.07;
    }

    // add ruby aurora
    boost += settings['ruby aurora'] * 0.01;

    // add gravitate (annihilation spec)
    if (settings['main_style'] === 'melee'){
        boost += settings['gravitate']/100;
    }

    if (settings['pocket'] === 'ful (proc active') {
        boost += 0.2;
    }

    min_hit = Math.floor(settings['min hit'] * (1 + boost));
    var_hit = Math.floor(settings['var hit'] * (1 + boost));

    return [min_hit, var_hit];
}

function calc_multiplicative_shared_buffs(settings) {
    let boost = 10000;

    // apply magic unique boosts
    if (settings['main_style'] === 'magic') {
        // prayer boost
        boost = Math.floor(boost * (1 + prayers[settings['prayer']]['boost']));

        // sunshine
        if (settings['sunshine'] === true) { 
            boost = Math.floor(boost * 1.5);
        }

        // blood tithe (exsanguinate)
        boost = Math.floor(boost * (1 + settings['blood tithe']/100))
    }

    // apply melee unique boosts
    if (settings['main_style'] === 'melee') {
        // prayer boost
        boost = Math.floor(boost * (1 + prayers[settings['prayer']]['boost']));

        // berserk
        if (settings['berserk'] === true) { 
            boost = Math.floor(boost * 2);
        }

        // zaros godsword
        if (settings['zaros godsword'] === true) { 
            boost = Math.floor(boost * 1.25);
        }

        // dragon battleaxe
        if (settings['dragon battleaxe'] === true) { 
            boost = Math.floor(boost * 1.2);
        }
    }

    // apply ranged unique boosts
    if (settings['main_style'] === 'ranged') {
        // prayer boost
        boost = Math.floor(boost * (1 + prayers[settings['prayer']]['boost']));

        // death swiftness
        if (settings['death swiftness'] === true) { 
            boost = Math.floor(boost * 1.5);
        }
    }

    // apply necro unique boosts
    if (settings['main_style'] === 'necromancy') {
        // prayer boost
        boost = Math.floor(boost * (1 + prayers[settings['prayer']]['boost']));
    }

    // apply revenge
    if (settings['main_style'] === 'main-hand' && weapons[settings['off-hand weapon']]['weapon type'] in ['shield', 'defender']) {
        revenge = 0.025 * settings['revenge stacks'];
        
        // boost is twice as big if done with a shield
        if (weapons[settings['off-hand weapon']]['weapon type'] === 'shield') {
            revenge = revenge * 2;
        }

        boost = Math.floor(boost * (1 + revenge));

        // crystal weapons

        // spendthrift

        // ruthless
        boost = Math.floor(boost * settings['ruthless stacks'] * settings['ruthless rank'] * 0.005);
    }

    min_hit = Math.floor(settings['min hit'] * boost / 10000);
    var_hit = Math.floor(settings['var hit'] * boost / 10000);

    return [min_hit, var_hit];
}

function calc_multiplicative_pve_buffs(settings) {
    let boost = 10000;

    // apply magic unique buffs
    if (settings['main_style'] === 'magic') {
        // spellcaster gloves
        boost = boost;
    }

    // apply melee unique buffs
    if (settings['main_style'] === 'melee') {
        // spellcaster gloves

        //bane gear
        boost = boost;
    }

    // slayer helm
    boost = Math.floor(boost * (1 + gear[settings['slayer helm']]['boost']));

    // fort forinthry guard house task
    boost = Math.floor(boost * (1 + settings['guardhouse task']/100));

    // fort forinthry guard house low hp
    boost = Math.floor(boost * (1 + 0.1*settings['guardhouse low hp']));

    // genocidal
    boost = Math.floor(boost * (1 + settings['genocidal']/100));

    // salve amulet
    if (settings['necklace'] === 'salve amulet') {
        boost = Math.floor(boost * 1.15);
    }

    // salve amulet (e)
    else if (settings['necklace'] === 'salve amulet (e)') {
        boost = Math.floor(boost * 1.2);
    }

    min_hit = Math.floor(settings['min hit'] * boost / 10000);
    var_hit = Math.floor(settings['var hit'] * boost / 10000);

    return [min_hit, var_hit];
}

function calc_bonus_damage(settings) {
    let min_hit = settings['min hit'];
    let var_hit = settings['var hit'];

    // melee specific
    if (settings['main_style'] === 'melee') {
        // frostblades (leng off-hand effects)
        if ((settings['main-hand weapon'] === 'dark shard of leng' || settings['main-hand weapon'] === 'dark ice shard') 
            && settings['weapon type'] === 'main-hand' && settings['frostblades'] === true) {
            min_hit += Math.floor(0.24 * settings['boosted_AD']);
        }
    }

    return [min_hit, var_hit];
}

function calc_core(settings) {
    let min_hit = settings['min hit'];
    let var_hit = settings['var hit'];
    // roll damage
    // note we don't roll damage if calcing averages

    // berserker's fury
    min_hit = Math.floor(min_hit * (1 + settings['berserkers fury']/100));
    var_hit = Math.floor(var_hit * (1 + settings['berserkers fury']/100));

    // dharock's gear

    // store damage into bolg

    // crits
    min_hit = Math.floor(min_hit * (1 + calc_crit_damage(settings)));
    var_hit = Math.floor(var_hit * (1 + calc_crit_damage(settings)));

    // store bloat damage
    
    return [min_hit, var_hit];
}

function calc_crit_damage(settings) {
    let crit_buff = 0;

    if (settings[settings['main_style'] + ' level'] >= 90) {
        crit_buff += 0.5;
    }

    return crit_buff
}

function calc_on_npc(settings) {
    let min_hit = settings['min hit'];
    let var_hit = settings['var hit'];

    // set haunted
    let haunted_min = Math.min(Math.floor(min_hit * 0.1), Math.floor(0.2 * settings['haunted AD']));
    let haunted_var = Math.min(Math.floor(var_hit * 0.1), Math.floor(0.2 * settings['haunted AD']));

    // vulnerability
    if (settings['vulnerability'] === 'vulnerability') {
        min_hit = Math.floor(min_hit * 1.1);
        var_hit = Math.floor(var_hit * 1.1);
    }

    // curse
    else if (settings['vulnerability'] === 'curse') {
        min_hit = Math.floor(min_hit * 1.05);
        var_hit = Math.floor(var_hit * 1.05);
    }

    // enduring ruin bleed (gop)
    if (settings['enduring ruin - bleed'] === 'regular' && abils[settings['ability']]['ability classification'] === 'bleed') {
        min_hit = Math.floor(min_hit * 1.2);
        var_hit = Math.floor(var_hit * 1.2);
    }

    // enhanced gop
    else if (settings['enduring ruin - bleed'] === 'enhanced' && abils[settings['ability']]['ability classification'] === 'bleed') {
        min_hit = Math.floor(min_hit * 1.25);
        var_hit = Math.floor(var_hit * 1.25);
    }

    // apply haunted
    min_hit += haunted_min;
    var_hit += haunted_var

    return [min_hit, var_hit]
}

function calc_on_hit(settings) {
    [settings['min hit'], settings['var hit']] = set_min_var(settings);
    [settings['min hit'], settings['var hit']] = calc_additive_boosts(settings);
    [settings['min hit'], settings['var hit']] = calc_multiplicative_shared_buffs(settings);
    [settings['min hit'], settings['var hit']] = calc_multiplicative_pve_buffs(settings);
    [settings['min hit'], settings['var hit']] = calc_bonus_damage(settings);
    

    return [settings['min hit'], settings['var hit']]
}

function calc_damage(settings) {
    // calc base AD
    settings['base_AD'] = calc_base_ad(settings);

    // calc buffed AD
    settings['boosted_AD'] = calc_boosted_ad(settings);

    // calc on hit effects
    if (abils[settings['ability']]['on-hit effects']) {
        [settings['min hit'], settings['var hit']] = calc_on_hit(settings);
        
    }
    // roll damage

    // calc core
    if (abils[settings['ability']]['on-hit effects']) {
        [settings['min hit'], settings['var hit']] = calc_core(settings);
    }
    
    [settings['min hit'], settings['var hit']] = calc_on_npc(settings);

    return settings
}

export default calc_damage;