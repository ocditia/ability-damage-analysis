import { currentAbilityIcon } from './abilityIcons';
import { abils, ABILITIES } from './abilities';
import { offGcdAbilities, consumables, CONSUMABLES } from '$lib/special/abilities';

// Utility actions belong beside their combat style, but are placed in the
// selected tick's extra-action slots rather than consuming a global cooldown.
export const slayerAbilities = [ABILITIES.UNDEAD_SLAYER_ABILITY, ABILITIES.DRAGON_SLAYER_ABILITY, ABILITIES.DEMON_SLAYER_ABILITY, ABILITIES.VAMPYRE_SLAYER_ABILITY];
const utilities = {
    [CONSUMABLES.ADRENALINE_CRYSTAL]: {...consumables[CONSUMABLES.ADRENALINE_CRYSTAL], shared: true, description: "Starts channeling: first refill next tick, then every 3 ticks. Restores 25%, or 100% with War's Blessing 4, capped at your maximum. Can share a tick with Death's Swiftness or another self-cast buff. A later cast, stall or release stops channeling. Natural Instinct does not double it.", wikiUrl: "https://runescape.wiki/w/Adrenaline_crystal_(War%27s_Retreat)"},
    ...Object.fromEntries(slayerAbilities.map(key => [key, {...abils[key], shared: true, wikiUrl: 'https://runescape.wiki/w/' + abils[key].title.replaceAll(' ', '_') + '_(ability)'}])),
    [ABILITIES.DIVE]: { ...offGcdAbilities[ABILITIES.DIVE], mainStyle: 'melee' },
    [ABILITIES.ESCAPE]: { ...offGcdAbilities[ABILITIES.ESCAPE], mainStyle: 'ranged' },
    [ABILITIES.SURGE]: { ...offGcdAbilities[ABILITIES.SURGE], mainStyle: 'magic' },
    [ABILITIES.RUNIC_CHARGE]: { ...offGcdAbilities[ABILITIES.RUNIC_CHARGE], mainStyle: 'magic' },
    'quiver ammo slot 1': { title: 'Quiver ammo slot 1', icon: '/rs-rot/ability_icons/special/Quiver_ammo_slot_1.png', mainStyle: 'ranged', description: 'Switches to this slot in the equipped Pernix quiver. Configure its two ammo choices in Quiver setup.' },
    'quiver ammo slot 2': { title: 'Quiver ammo slot 2', icon: '/rs-rot/ability_icons/special/Quiver_ammo_slot_2.png', mainStyle: 'ranged', description: 'Switches to this slot in the equipped Pernix quiver. Configure its two ammo choices in Quiver setup.' },
    'golden touch': { title: 'Golden Touch', icon: '/rs-rot/ability_icons/special/Golden_Touch.png', mainStyle: 'magic', description: 'Loot utility; recorded in the rotation but does not affect damage.' },
    'sanguine offering': { title: 'Sanguine offering', icon: '/rs-rot/ability_icons/special/Sanguine_offering.png', mainStyle: 'magic', description: 'Resets Runic Charge. Self-damage is not simulated.' },
};

export const utilityAbilities = Object.fromEntries(Object.entries(utilities).map(([key, ability]) => [key, { ...ability, abilityType: 'utility', offGcd: true }]));
export const paletteAbilities: Record<string, any> = { ...abils, ...utilityAbilities };
paletteAbilities[ABILITIES.MELEE_AUTO] = { ...abils[ABILITIES.MELEE_AUTO], title: 'Attack' };
paletteAbilities[ABILITIES.MAGIC_AUTO] = { ...abils[ABILITIES.MAGIC_AUTO], title: 'Magic' };
paletteAbilities[ABILITIES.NECRO_AUTO] = { ...abils[ABILITIES.NECRO_AUTO], title: 'Necromancy' };
paletteAbilities[ABILITIES.IMBUE_SHADOWS] = { ...abils[ABILITIES.IMBUE_SHADOWS], referenceName: 'imbue: shadows' };
paletteAbilities[ABILITIES.SOUL_STRIKE] = { ...abils[ABILITIES.SOUL_STRIKE], title: 'Soul Strike' };
for (const key of [ABILITIES.SPECTRAL_SCYTHE_1, ABILITIES.SPECTRAL_SCYTHE_2, ABILITIES.SPECTRAL_SCYTHE_3]) {
    paletteAbilities[key] = { ...abils[key], referenceName: 'spectral scythe' };
}
// Targeted and automatic Magma Tempest share damage mechanics. Keep a distinct
// icon in the book while resolving the action to the existing calculator key.
paletteAbilities['magma tempest targeted'] = { ...abils[ABILITIES.MAGMA_TEMPEST], title: 'Magma Tempest (Targeted)', actionKey: ABILITIES.MAGMA_TEMPEST };

for (const ability of Object.values(paletteAbilities)) {
    // The three scythe stages have distinct icons; the Wiki table lists only the first.
    if (ability.referenceName === 'spectral scythe') continue;
    ability.icon = currentAbilityIcon(ability.referenceName || ability.title, ability.icon);
}
