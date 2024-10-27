import { SETTINGS } from './settings';
import { weapons, abils } from './const';

function create_object(settings) {
    if (abils[settings['ability']]['crit effects'] === true) {
        const crit_chance = calc_crit_chance(settings);
        return {
            non_crit: {
                'min hit': 0,
                'var hit': 0,
                crit: false,

                probability: 1 - crit_chance,
                'damage list': []
            },
            crit: {
                'min hit': 0,
                'var hit': 0,
                crit: true,

                probability: crit_chance,
                'damage list': []
            }
        };
    } else {
        return {
            non_crit: {
                'min hit': 0,
                'var hit': 0,
                crit: false,

                probability: 1,
                'damage list': []
            }
        };
    }
}

function calc_crit_chance(settings) {
    // base crit chance
    let crit_chance = 0.1;

    // eclipsed soul
    if (settings['eclipsed soul'] === true) {
        crit_chance += 0.04;
    }

    // biting
    crit_chance += 0.02 * settings[SETTINGS.BITING];

    // level 20 armour
    if (settings[SETTINGS.LVL20ARMOUR] === true) {
        crit_chance += 0.002 * settings[SETTINGS.BITING];
    }

    // warpriest of tuska
    if (settings['helmet'] === 'warpriest of tuska helm') {
        crit_chance += 0.01;
    }
    if (settings['body'] === 'warpriest of tuska cuirass') {
        crit_chance += 0.01;
    }
    if (settings['legs'] === 'warpriest of tuska robe legs') {
        crit_chance += 0.01;
    }
    if (settings['gloves'] === 'warpriest of tuska gauntlets') {
        crit_chance += 0.01;
    }
    if (settings['boots'] === 'warpriest of tuska boots') {
        crit_chance += 0.01;
    }
    if (settings['cape'] === 'warpriest of tuska cape') {
        crit_chance += 0.01;
    }

    // sliske tuska
    if (
        settings['helmet'] === 'sliske tuska helmet' &&
        settings['body'] === 'sliske tuska body' &&
        settings['legs'] === 'sliske tuska legs'
    ) {
        crit_chance += 0.06;
    }

    // erethdor's grimoire
    if (settings[SETTINGS.POCKET] === SETTINGS.POCKET_VALUES.GRIM) {
        crit_chance = +0.12;
    }

    // reaver's ring
    if (settings['ring'] === 'reavers ring') {
        crit_chance += 0.05;
    }

    // kalg base
    if (settings['familiar'] === 'kalgerion demon') {
        crit_chance += 0.01;
    }

    // kalg scroll
    if (settings['crit-i-kal'] === true) {
        crit_chance += 0.05;
    }

    if (settings['main_style'] === 'magic') {
        // channeller's ring
        if (
            settings['ring'] === 'channellers ring' &&
            abils[settings['ability']]['ability classification'] === 'channel'
        ) {
            crit_chance += 0.04;
            crit_chance += 0.04 * settings['channelers ring stacks'];
        }

        // (g)conc
        crit_chance += 0.05 * settings['conc stacks'];

        // (g)conc self boost
        if (
            settings['ability'] === 'concentrated blast 2' ||
            settings['ability'] === 'greater concentrated blast 2'
        ) {
            crit_chance += 0.05;
        } else if (
            settings['ability'] === 'concentrated blast 3' ||
            settings['ability'] === 'greater concentrated blast 3'
        ) {
            crit_chance += 0.1;
        }

        // smoke tendrils
        if (settings['ability'] === 'smoke tendrils') {
            crit_chance = 1;
        }
    }

    if (settings['main_style'] === 'melee') {
        // champion's ring
        if (settings['ring'] === 'champions ring active') {
            crit_chance += 0.03;
        }

        // (g)fury
        if (settings['fury'] === 'regular') {
            crit_chance += 0.25;
        } else if (settings['fury'] === 'greater') {
            crit_chance = 1;
        }

        // no fear (pof meteor strike)
        if (settings['ability'] === 'meteor strike') {
            crit_chance += 0.2 * settings['no fear'];
        }
    }

    if (settings['main_style'] === 'ranged') {
        // stalker's ring
        if (
            settings['ring'] === 'stalkers ring' &&
            weapons[settings['weapon']]['category'] === 'bow'
        ) {
            crit_chance += 0.03;
        }

        // shadow tendril
        if (settings['ability'] === 'shadow tendril') {
            crit_chance = 1;
        }

        // dracolich
        if (settings['dracolich infusion'] === 'regular') {
            crit_chance += 0.2;
        } else if (settings['dracolich infusion'] === 'elite') {
            crit_chance += 0.4;
        }

        // deathspore arrows
        if (
            weapons[settings['two-hand weapon']]['category'] === 'bow' &&
            settings['weapon type'] === 'two-hand' &&
            settings['ammo'] === 'deathspore arrows'
        ) {
            crit_chance += 0.03;
        }
    }

    // equilibrium aura
    if (settings['aura'] === 'equilibrium aura') {
        crit_chance = 0;
    }

    return Math.min(1, crit_chance);
}

export { create_object, calc_crit_chance };
