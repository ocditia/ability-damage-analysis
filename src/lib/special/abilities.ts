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

const gearSwapsOrig = {}

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
    [SETTINGS.RANGED_BOOTS]: {...(SETTINGS.RANGED_BOOTS_VALUES)},
    [SETTINGS.AMMO]: {...(SETTINGS.AMMO_VALUES)}
}

let rGearFinal = structuredClone(rGear);

const toDelete = ['NONE', 'CUSTOM'];
let i = 0;
for (let slot in rGear) {
    for (let item in rGear[slot]) {
        //Delete none/custom options
        toDelete.forEach((key) => {
            if (key in rGear[slot]) {
                // @ts-ignore: assuming key always exists in rGear[slot]
                delete rGearFinal[slot][key];
            }
        });
        let obj = {
            title: rGear[slot][item],
            icon: '/gear_icons/' + rGear[slot][item] + '.png',
        };
        rGearFinal[slot][item] = obj;
        gearSwapsOrig[obj.title] = slot;
    
        i++;
    }
}
console.log('Gear swaps orig');
console.log(gearSwapsOrig);
console.log('Gear swaps final');
console.log(rGearFinal);
export const rangedGear = rGearFinal;
export const gearSwaps = gearSwapsOrig;