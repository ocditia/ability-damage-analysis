import { ABILITIES } from '../calc/const/const';
import { SETTINGS } from '../calc/settings_rb.js';

export enum CONSUMABLES {
    ADRENALINE_RENEWAL = 'Adrenaline renewal potion',
    ADD_1_ADRENALINE = 'Add 1 Adrenaline',
    ADD_5_ADRENALINE = 'Add 5 Adrenaline',
    ADD_10_ADRENALINE = 'Add 10 Adrenaline',
    ADD_20_ADRENALINE = 'Add 20 Adrenaline',
    ADD_50_ADRENALINE = 'Add 50 Adrenaline',
    SPIRITUAL_PRAYER = 'Spiritual Prayer Potion',
    VULNERABILITY_BOMB = 'Vulnerability bomb',
}

export const consumables: Record<string, { title: string; icon: string; group?: string }> = {
    [CONSUMABLES.ADRENALINE_RENEWAL]: {
        title: 'Adrenaline renewal potion',
        icon: '/ability_icons/special/Adrenaline_renewal_potion.png'
    },
    [CONSUMABLES.ADD_1_ADRENALINE]: {
        title: 'Add 1 Adrenaline',
        icon: '/ability_icons/special/Adrenaline_1.png'
    },
    [CONSUMABLES.ADD_5_ADRENALINE]: {
        title: 'Add 5 Adrenaline',
        icon: '/ability_icons/special/Adrenaline_5.png'
    },
    [CONSUMABLES.ADD_10_ADRENALINE]: {
        title: 'Add 10 Adrenaline',
        icon: '/ability_icons/special/Adrenaline_10.png'
    },
    [CONSUMABLES.ADD_20_ADRENALINE]: {
        title: 'Add 20 Adrenaline',
        icon: '/ability_icons/special/Adrenaline_20.png'
    },
    [CONSUMABLES.ADD_50_ADRENALINE]: {
        title: 'Add 50 Adrenaline',
        icon: '/ability_icons/special/Adrenaline_50.png'
    },
    [CONSUMABLES.SPIRITUAL_PRAYER]: {
        title: 'Spiritual Prayer Potion',
        icon: '/effect_icons/Spiritual_prayer_potion.png'
    },
    [CONSUMABLES.VULNERABILITY_BOMB]: {
        title: 'Vulnerability bomb',
        icon: '/ability_icons/special/Vulnerability_bomb.png'
    },
    [ABILITIES.DREADNIP]: {
        title: 'Dreadnip',
        icon: '/ability_icons/special/Dreadnip.png'
    }
};

// Off-GCD abilities (sigils, slayer, mobility, etc.)
export const offGcdAbilities: Record<string, { title: string; icon: string }> = {
    [ABILITIES.RUNIC_CHARGE]: {
        title: 'Runic Charge',
        icon: '/ability_icons/magic/Runic_Charge.png'
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
    },
};

// Prayers
export const prayers: Record<string, { title: string; icon: string }> = {
    [ABILITIES.DEFLECT_MAGIC]: {
        title: 'Deflect Magic',
        icon: '/ability_icons/special/Deflect_Magic.png'
    },
    [ABILITIES.DEFLECT_RANGED]: {
        title: 'Deflect Ranged',
        icon: '/ability_icons/special/Deflect_Ranged.png'
    },
    [ABILITIES.DEFLECT_MELEE]: {
        title: 'Deflect Melee',
        icon: '/ability_icons/special/Deflect_Melee.png'
    },
    [ABILITIES.SOUL_SPLIT]: {
        title: 'Soul Split',
        icon: '/ability_icons/special/Soul_Split.png'
    },
};

// Spells
export const spells: Record<string, { title: string; icon: string }> = {
    [ABILITIES.EXSANGUINATE]: {
        title: 'Exsanguinate',
        icon: '/effect_icons/Exsanguinate_icon.webp'
    },
    [ABILITIES.INCITE_FEAR]: {
        title: 'Incite Fear',
        icon: '/ability_icons/magic/Incite_Fear_icon.webp'
    },
    [ABILITIES.VENGEANCE]: {
        title: 'Vengeance',
        icon: '/ability_icons/special/Vengeance.png'
    },
    [ABILITIES.SPELLBOOK_SWAP]: {
        title: 'Spellbook Swap',
        icon: '/ability_icons/special/Spellbook_Swap.png'
    },
    [ABILITIES.DISRUPTION_SHIELD]: {
        title: 'Disruption Shield',
        icon: '/ability_icons/special/Disruption_Shield.png'
    },
    [ABILITIES.PRISM_OF_RESTORATION]: {
        title: 'Prism of Restoration',
        icon: '/effect_icons/Prism_of_Restoration_icon.png'
    },
};

// Flat lookup of all EoF items by key (for extra action bar rendering)
const eofItems: Record<string, { title: string; icon: string }> = {
    'EoF': { title: 'EoF', icon: '/gear_icons/essence of finality amulet.png' },
    'EoF (black)': { title: 'EoF (black)', icon: '/gear_icons/essence of finality amulet (black).png' },
    'EoF (blue)': { title: 'EoF (blue)', icon: '/gear_icons/essence of finality amulet (blue).png' },
    'EoF (green)': { title: 'EoF (green)', icon: '/gear_icons/essence of finality amulet (green).png' },
    'EoF (pink)': { title: 'EoF (pink)', icon: '/gear_icons/essence of finality amulet (pink).png' },
    'EoF (purple)': { title: 'EoF (purple)', icon: '/gear_icons/essence of finality amulet (purple).png' },
    'EoF (red)': { title: 'EoF (red)', icon: '/gear_icons/essence of finality amulet (red).png' },
    'EoF (yellow)': { title: 'EoF (yellow)', icon: '/gear_icons/essence of finality amulet (yellow).png' },
};

// Combined lookup for extra action bar rendering (needs to find both abilities, consumables, and gear)
export const allExtraActions: Record<string, { title: string; icon: string }> = {
    ...offGcdAbilities,
    ...prayers,
    ...spells,
    ...consumables,
    ...eofItems,
};

// Shared gear swap lookup (item title -> slot key) built from all styles
const gearSwapsOrig: Record<string, string> = {};

/**
 * Builds a processed gear object from raw slot definitions.
 * Removes NONE/CUSTOM entries, creates { title, icon } objects, and populates gearSwaps.
 */
function buildGearData(slotDefinitions: Record<string, Record<string, string>>, style: string): Record<string, Record<string, { title: string; icon: string }>> {
    const toDelete = ['NONE', 'CUSTOM'];
    const raw = structuredClone(slotDefinitions);
    const result = structuredClone(slotDefinitions) as any;

    for (const slot in raw) {
        // Remove NONE/CUSTOM entries
        toDelete.forEach(key => {
            if (key in raw[slot]) {
                delete result[slot][key];
            }
        });
        for (const item in raw[slot]) {
            const val = raw[slot][item];
            // Strip variant suffixes for icon lookup
            const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
            const obj = {
                title: val,
                icon: `/gear_icons/${style}/${base}.png`,
                iconFallback: `/gear_icons/shared/${base}.png`,
            };
            result[slot][item] = obj;
            gearSwapsOrig[obj.title] = slot;
        }
    }
    return result;
}

// ---- Ranged Gear ----
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

export const rangedGear = buildGearData({
    [SETTINGS.RANGED_MH]: {...SETTINGS.RANGED_MH_VALUES},
    [SETTINGS.RANGED_OH]: {...SETTINGS.RANGED_OH_VALUES},
    [SETTINGS.RANGED_TH]: {...SETTINGS.RANGED_TH_VALUES},
    [SETTINGS.RANGED_HELMET]: {...SETTINGS.RANGED_HELMET_VALUES},
    [SETTINGS.RANGED_BODY]: {...SETTINGS.RANGED_BODY_VALUES},
    [SETTINGS.RANGED_LEGS]: {...SETTINGS.RANGED_LEGS_VALUES},
    [SETTINGS.RANGED_GLOVES]: {...SETTINGS.RANGED_GLOVES_VALUES},
    [SETTINGS.RANGED_BOOTS]: {...SETTINGS.RANGED_BOOTS_VALUES},
    [SETTINGS.AMMO]: {...SETTINGS.AMMO_VALUES},
}, 'ranged');

// ---- Melee Gear ----
export const meleeGear = buildGearData({
    [SETTINGS.MELEE_MH]: {...SETTINGS.MELEE_MH_VALUES},
    [SETTINGS.MELEE_OH]: {...SETTINGS.MELEE_OH_VALUES},
    [SETTINGS.MELEE_TH]: {...SETTINGS.MELEE_TH_VALUES},
    [SETTINGS.MELEE_HELMET]: {...SETTINGS.MELEE_HELMET_VALUES},
    [SETTINGS.MELEE_BODY]: {...SETTINGS.MELEE_BODY_VALUES},
    [SETTINGS.MELEE_LEGS]: {...SETTINGS.MELEE_LEGS_VALUES},
    [SETTINGS.MELEE_GLOVES]: {...SETTINGS.MELEE_GLOVES_VALUES},
    [SETTINGS.MELEE_BOOTS]: {...SETTINGS.MELEE_BOOTS_VALUES},
}, 'melee');

// ---- Magic Gear ----
export const magicGear = buildGearData({
    [SETTINGS.MAGIC_MH]: {...SETTINGS.MAGIC_MH_VALUES},
    [SETTINGS.MAGIC_OH]: {...SETTINGS.MAGIC_OH_VALUES},
    [SETTINGS.MAGIC_TH]: {...SETTINGS.MAGIC_TH_VALUES},
    [SETTINGS.MAGIC_HELMET]: {...SETTINGS.MAGIC_HELMET_VALUES},
    [SETTINGS.MAGIC_BODY]: {...SETTINGS.MAGIC_BODY_VALUES},
    [SETTINGS.MAGIC_LEGS]: {...SETTINGS.MAGIC_LEGS_VALUES},
    [SETTINGS.MAGIC_GLOVES]: {...SETTINGS.MAGIC_GLOVES_VALUES},
    [SETTINGS.MAGIC_BOOTS]: {...SETTINGS.MAGIC_BOOTS_VALUES},
}, 'magic');

// ---- Necromancy Gear ----
export const necroGear = buildGearData({
    [SETTINGS.NECRO_MH]: {...SETTINGS.NECRO_MH_VALUES},
    [SETTINGS.NECRO_OH]: {...SETTINGS.NECRO_OH_VALUES},
    [SETTINGS.NECRO_TH]: {...SETTINGS.NECRO_TH_VALUES},
    [SETTINGS.NECRO_HELMET]: {...SETTINGS.NECRO_HELMET_VALUES},
    [SETTINGS.NECRO_BODY]: {...SETTINGS.NECRO_BODY_VALUES},
    [SETTINGS.NECRO_LEGS]: {...SETTINGS.NECRO_LEGS_VALUES},
    [SETTINGS.NECRO_GLOVES]: {...SETTINGS.NECRO_GLOVES_VALUES},
    [SETTINGS.NECRO_BOOTS]: {...SETTINGS.NECRO_BOOTS_VALUES},
}, 'necro');

// ---- Shared Gear (appears in all styles) ----
export const sharedGear: Record<string, Record<string, { title: string; icon: string; iconFallback?: string; group?: string }>> = {
    ...buildGearData({
        [SETTINGS.RING]: {...SETTINGS.RING_VALUES},
        [SETTINGS.NECKLACE]: {...SETTINGS.NECKLACE_VALUES},
        [SETTINGS.CAPE]: {...SETTINGS.CAPE_VALUES},
        [SETTINGS.POCKET]: {...SETTINGS.POCKET_VALUES}, // Already uses generic key
    }, 'shared'),
    'Essence of Finality': {
        EOF: { title: 'EoF', icon: '/gear_icons/shared/essence of finality amulet.png', group: 'eof' },
        EOF_BLACK: { title: 'EoF (black)', icon: '/gear_icons/shared/essence of finality amulet (black).png', group: 'eof' },
        EOF_BLUE: { title: 'EoF (blue)', icon: '/gear_icons/shared/essence of finality amulet (blue).png', group: 'eof' },
        EOF_GREEN: { title: 'EoF (green)', icon: '/gear_icons/shared/essence of finality amulet (green).png', group: 'eof' },
        EOF_PINK: { title: 'EoF (pink)', icon: '/gear_icons/shared/essence of finality amulet (pink).png', group: 'eof' },
        EOF_PURPLE: { title: 'EoF (purple)', icon: '/gear_icons/shared/essence of finality amulet (purple).png', group: 'eof' },
        EOF_RED: { title: 'EoF (red)', icon: '/gear_icons/shared/essence of finality amulet (red).png', group: 'eof' },
        EOF_YELLOW: { title: 'EoF (yellow)', icon: '/gear_icons/shared/essence of finality amulet (yellow).png', group: 'eof' },
    },
};

export const gearSwaps = gearSwapsOrig;