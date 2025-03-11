import { ABILITIES } from '../calc/const.js';
import { SETTINGS } from '../calc/settings.js';

export const offGcdAbilities = {
    ["Adrenaline renewal potion"]: {
        title: 'Adrenaline renewal potion',
        icon: '/ability_icons/special/Adrenaline_renewal_potion.png'
    },
    [ABILITIES.INGENUITY_OF_THE_HUMANS]: {
        title: 'Ingenuity of the Humans',
        icon: '/ability_icons/special/Ingenuity_of_the_Humans.png'
    },
    [ABILITIES.LIMITLESS]: {
        title: 'Limitless',
        icon: '/ability_icons/special/Limitless.png'
    },
    [ABILITIES.DRAGON_SLAYER_ABILITY]: {
        title: 'Dragon Slayer',
        icon: '/ability_icons/special/Dragon_Slayer_(ability).png'
    },
    [ABILITIES.DEMON_SLAYER_ABILITY]: {
        title: 'Demon Slayer',
        icon: '/ability_icons/special/Demon_Slayer_(ability).png'
    },
    [ABILITIES.UNDEAD_SLAYER_ABILITY]: {
        title: 'Undead Slayer',
        icon: '/ability_icons/special/Undead_Slayer_(ability).png'
    },
    [ABILITIES.SURGE]: {
        title: 'Surge',
        icon: '/ability_icons/special/Surge.png'
    },
    [ABILITIES.ESCAPE]: {
        title: 'Escape',
        icon: '/ability_icons/special/Escape.png'
    },
    [ABILITIES.DIVE]: {
        title: 'Dive',
        icon: '/ability_icons/special/Dive.png'
    }
}

export const gearSwaps = {
    [SETTINGS.AMMO_VALUES.WEN_ARROWS]: {
        title: 'Wen Arrows',
        icon: '/gear_icons/Wen_arrow_5.png'
    },
    [SETTINGS.AMMO_VALUES.FUL_ARROWS]: {
        title: 'Ful Arrows',
        icon: '/gear_icons/Ful_arrow_5.png'
    },
    [SETTINGS.AMMO_VALUES.JAS_ARROWS]: {
        title: 'Jas Arrows',
        icon: '/gear_icons/Jas_dragonbane_arrow_5.png'
    }
}

export const rangedGearOrig = [
    ...Object.values(SETTINGS.RANGED_MH_VALUES),
    ...Object.values(SETTINGS.RANGED_OH_VALUES),
    ...Object.values(SETTINGS.RANGED_TH_VALUES),
    ...Object.values(SETTINGS.RANGED_HELMET_VALUES),
    ...Object.values(SETTINGS.RANGED_BODY_VALUES),
    ...Object.values(SETTINGS.RANGED_LEGS_VALUES),
    ...Object.values(SETTINGS.RANGED_GLOVES_VALUES),
    ...Object.values(SETTINGS.RANGED_BOOTS_VALUES)
];

export const rangedGearKeys = [
    ...Object.keys(SETTINGS.RANGED_MH_VALUES),
    ...Object.keys(SETTINGS.RANGED_OH_VALUES),
    ...Object.keys(SETTINGS.RANGED_TH_VALUES),
    ...Object.keys(SETTINGS.RANGED_HELMET_VALUES),
    ...Object.keys(SETTINGS.RANGED_BODY_VALUES),
    ...Object.keys(SETTINGS.RANGED_LEGS_VALUES),
    ...Object.keys(SETTINGS.RANGED_GLOVES_VALUES),
    ...Object.keys(SETTINGS.RANGED_BOOTS_VALUES)
];

let rGear = {
    [SETTINGS.RANGED_MH]: {...SETTINGS.RANGED_MH_VALUES},
    [SETTINGS.RANGED_OH]: {...SETTINGS.RANGED_OH_VALUES},
    [SETTINGS.RANGED_TH]: {...(SETTINGS.RANGED_TH_VALUES)},
    [SETTINGS.RANGED_HELMET]: {...(SETTINGS.RANGED_HELMET_VALUES)},
    [SETTINGS.RANGED_BODY]: {...(SETTINGS.RANGED_BODY_VALUES)},
    [SETTINGS.RANGED_LEGS]: {...(SETTINGS.RANGED_LEGS_VALUES)},
    [SETTINGS.RANGED_GLOVES]: {...(SETTINGS.RANGED_GLOVES_VALUES)},
    [SETTINGS.RANGED_BOOTS]: {...(SETTINGS.RANGED_BOOTS_VALUES)}
}

let rGearFinal = structuredClone(rGear);

const toDelete = ['NONE', 'CUSTOM'];
for (let slot in rGear) {
    for (let item in rGear[slot]) {
        //Delete none/custom options
        toDelete.forEach((key) => {
            if (key in rGear[slot]) {
                // @ts-ignore: assuming key always exists in rGear[slot]
                delete rGearFinal[slot][key];
            }
        });

        rGearFinal[slot][item] = {
            title: rGear[slot][item],
            icon: '/gear_icons/' + rGear[slot][item] + '.png'
//            icon: '/gear_icons/ranged/' + 'elite dracolich coif' + '.png'
        };
    }
}
export const rangedGear = rGearFinal;