<script>
    import { onMount } from 'svelte';
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import TabButton from '../UI/TabButton.svelte';
    import GradientSeparator from '../UI/GradientSeparator.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings_rb';
    import { SettingsCombatStyles } from '$lib/calc/rotation_builder/types/SettingsCombatStyles.ts';
    import { settingsStore, initializeSettings } from '$lib/stores/settingsStore.svelte.js';
    import { bossPresets, getBossPresetWithEnrage } from '$lib/familiars/boss_presets';
    import { familiars, calculateFamiliarHitChance } from '$lib/familiars/familiars';
    import '../../css/style.css';
    let { tab = 'general', styleTab = SettingsCombatStyles.RANGED, stacks, updateDamages, refreshUI, uiState } = $props();

    // Local reference to settings store
    let settings = $derived(settingsStore.settings);

    let editingStack = $state(null);
    let openDropdown = $state(null);
    function focusOnMount(node) { node.focus(); node.select(); }

    let maxAdrenaline = $derived.by(() => {
        let max = 100;
        const hasFullVestments =
            settings[SETTINGS.MELEE_HELMET]?.value === SETTINGS.MELEE_HELMET_VALUES.VESTMENTS &&
            settings[SETTINGS.MELEE_BODY]?.value === SETTINGS.MELEE_BODY_VALUES.VESTMENTS &&
            settings[SETTINGS.MELEE_LEGS]?.value === SETTINGS.MELEE_LEGS_VALUES.VESTMENTS &&
            settings[SETTINGS.MELEE_BOOTS]?.value === SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS;
        if (hasFullVestments) max += 20;
        if (settings[SETTINGS.HEIGHTENED_SENSES]?.value) max += 10;
        return max;
    });

    let stackLimits = $derived({
        [SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: 7,
        [SETTINGS.ICY_CHILL_STACKS]: 10,
        [SETTINGS.BLOOD_TITHE]: 12,
        [SETTINGS.GLACIAL_EMBRACE]: 5,
        [SETTINGS.ESSENCE_CORRUPTION]: 100,
        [SETTINGS.PRIMORDIAL_ICE]: 10,
        [SETTINGS.NECROSIS_STACKS]: 12,
        [SETTINGS.ADRENALINE]: maxAdrenaline,
        [SETTINGS.FAMILIAR_SPEC_POINTS]: 60,
    });
    const buffLimits = {
        [SETTINGS.STONE_OF_JAS]: 6,
        [SETTINGS.BERSERKERS_FURY]: 5.5,
        [SETTINGS.INFERNAL_PUZZLE_BOX]: 6,
    };

    function clampStack(key, val) {
        const v = parseInt(val) || 0;
        const max = stackLimits[key] ?? 999;
        return Math.max(0, Math.min(v, max));
    }

    const styleFolder = {
        [SettingsCombatStyles.MELEE]: 'melee',
        [SettingsCombatStyles.RANGED]: 'ranged',
        [SettingsCombatStyles.MAGIC]: 'magic',
        [SettingsCombatStyles.NECROMANCY]: 'necro',
    };

    function gearIcon(settingKey, fallback, folder = 'shared') {
        const val = settings[settingKey]?.value;
        if (!val || val === 'none') return fallback;
        const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        if (base !== val) return `/gear_icons/${folder}/${base}.png`;
        return `/gear_icons/${folder}/${val}.png`;
    }

    function gearBadge(settingKey) {
        const val = settings[settingKey]?.value;
        if (!val) return null;
        if (val.endsWith(' [IM]')) return { img: '/effect_icons/shard_of_genesis.png' };
        if (val.endsWith(' (i)')) return { text: 'i' };
        if (val.endsWith('+')) return { text: '+' };
        if (val.endsWith(' (or)')) return { text: 'or' };
        if (val.endsWith(' (e)')) return { text: 'e' };
        return null;
    }

    function gearIconWithFallback(settingKey, fallback, folder = 'shared') {
        const val = settings[settingKey]?.value;
        if (!val || val === 'none') return fallback;
        const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        return { primary: `/gear_icons/${folder}/${val}.png`, fallbackIcon: `/gear_icons/${folder}/${base}.png`, slotFallback: fallback };
    }

    const armourSlotsByStyle = {
        [SettingsCombatStyles.RANGED]: [
            { key: SETTINGS.RANGED_HELMET, fallback: '/armour_icons/Head_slot.webp' },
            { key: SETTINGS.RANGED_BODY, fallback: '/armour_icons/Torso_slot.png' },
            { key: SETTINGS.RANGED_LEGS, fallback: '/armour_icons/Legs_slot.png' },
            { key: SETTINGS.RANGED_GLOVES, fallback: '/armour_icons/Hands_slot.webp' },
            { key: SETTINGS.RANGED_BOOTS, fallback: '/armour_icons/Feet_slot.png' },
            { key: SETTINGS.RANGED_POCKET, fallback: '/armour_icons/Pocket_slot.webp' },
            { key: SETTINGS.RANGED_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png' },
        ],
        [SettingsCombatStyles.MAGIC]: [
            { key: SETTINGS.MAGIC_HELMET, fallback: '/armour_icons/Head_slot.webp' },
            { key: SETTINGS.MAGIC_BODY, fallback: '/armour_icons/Torso_slot.png' },
            { key: SETTINGS.MAGIC_LEGS, fallback: '/armour_icons/Legs_slot.png' },
            { key: SETTINGS.MAGIC_GLOVES, fallback: '/armour_icons/Hands_slot.webp' },
            { key: SETTINGS.MAGIC_BOOTS, fallback: '/armour_icons/Feet_slot.png' },
            { key: SETTINGS.MAGIC_POCKET, fallback: '/armour_icons/Pocket_slot.webp' },
            { key: SETTINGS.MAGIC_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png' },
        ],
        [SettingsCombatStyles.MELEE]: [
            { key: SETTINGS.MELEE_HELMET, fallback: '/armour_icons/Head_slot.webp' },
            { key: SETTINGS.MELEE_BODY, fallback: '/armour_icons/Torso_slot.png' },
            { key: SETTINGS.MELEE_LEGS, fallback: '/armour_icons/Legs_slot.png' },
            { key: SETTINGS.MELEE_GLOVES, fallback: '/armour_icons/Hands_slot.webp' },
            { key: SETTINGS.MELEE_BOOTS, fallback: '/armour_icons/Feet_slot.png' },
            { key: SETTINGS.MELEE_POCKET, fallback: '/armour_icons/Pocket_slot.webp' },
            { key: SETTINGS.MELEE_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png' },
        ],
        [SettingsCombatStyles.NECROMANCY]: [
            { key: SETTINGS.NECRO_HELMET, fallback: '/armour_icons/Head_slot.webp' },
            { key: SETTINGS.NECRO_BODY, fallback: '/armour_icons/Torso_slot.png' },
            { key: SETTINGS.NECRO_LEGS, fallback: '/armour_icons/Legs_slot.png' },
            { key: SETTINGS.NECRO_GLOVES, fallback: '/armour_icons/Hands_slot.webp' },
            { key: SETTINGS.NECRO_BOOTS, fallback: '/armour_icons/Feet_slot.png' },
            { key: SETTINGS.NECRO_POCKET, fallback: '/armour_icons/Pocket_slot.webp' },
            { key: SETTINGS.NECRO_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png' },
        ],
    };
    const sharedArmourSlots = [
        { key: SETTINGS.NECKLACE, fallback: '/armour_icons/Neck_slot.png' },
        { key: SETTINGS.CAPE, fallback: '/armour_icons/Back_slot.png' },
        { key: SETTINGS.RING, fallback: '/armour_icons/Ring_slot.png' },
        { key: SETTINGS.AURA, fallback: '/armour_icons/Aura_slot.webp' },
    ];

    const weaponSlotsByStyle = {
        [SettingsCombatStyles.RANGED]: {
            weaponType: SETTINGS.WEAPON_TYPE_RANGED,
            mh: SETTINGS.RANGED_MH,
            oh: SETTINGS.RANGED_OH,
            th: SETTINGS.RANGED_TH,
        },
        [SettingsCombatStyles.MAGIC]: {
            weaponType: SETTINGS.WEAPON_TYPE_MAGE,
            mh: SETTINGS.MAGIC_MH,
            oh: SETTINGS.MAGIC_OH,
            th: SETTINGS.MAGIC_TH,
        },
        [SettingsCombatStyles.MELEE]: {
            weaponType: SETTINGS.WEAPON_TYPE_MELEE,
            mh: SETTINGS.MELEE_MH,
            oh: SETTINGS.MELEE_OH,
            th: SETTINGS.MELEE_TH,
        },
        [SettingsCombatStyles.NECROMANCY]: {
            mh: SETTINGS.NECRO_MH,
            oh: SETTINGS.NECRO_OH,
        },
    };

    const prayerSettingByStyle = {
        [SettingsCombatStyles.RANGED]: SETTINGS.RANGED_PRAYER,
        [SettingsCombatStyles.MAGIC]: SETTINGS.MAGIC_PRAYER,
        [SettingsCombatStyles.MELEE]: SETTINGS.MELEE_PRAYER,
        [SettingsCombatStyles.NECROMANCY]: SETTINGS.NECRO_PRAYER,
    };
    const prayerIconByStyle = {
        [SettingsCombatStyles.RANGED]: '/effect_icons/ranged_prayer.webp',
        [SettingsCombatStyles.MAGIC]: '/effect_icons/magic_prayer.webp',
        [SettingsCombatStyles.MELEE]: '/effect_icons/melee_prayer.webp',
        [SettingsCombatStyles.NECROMANCY]: '/effect_icons/necro_prayer.webp',
    };

    const familiarIcons = {
        [SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON]: '/familiars/Ripper_Demon_chathead.png',
        [SETTINGS.FAMILIAR_VALUES.KALGERION_DEMON]: '/familiars/Kal\'gerion_demon_(familiar)_chathead.png',
        [SETTINGS.FAMILIAR_VALUES.STEEL_TITAN]: '/familiars/Steel_titan_chathead.png',
    };

    const BOLT_AMMO = [SETTINGS.AMMO_VALUES.HYDRIX_BOLTS];
    const ARROW_AMMO = [
        SETTINGS.AMMO_VALUES.FUL_ARROWS, SETTINGS.AMMO_VALUES.WEN_ARROWS,
        SETTINGS.AMMO_VALUES.JAS_ARROWS, SETTINGS.AMMO_VALUES.DEATHSPORE_ARROWS,
        SETTINGS.AMMO_VALUES.BIK_ARROWS
    ];

    // Sorted boss names for dropdown
    const bossNames = Object.keys(bossPresets).sort((a, b) => a.localeCompare(b));

    // Enrage tracking
    let enrageValue = $state(0);

    /** Get the effective boss preset, accounting for enrage if applicable */
    function getEffectiveBoss(bossKey) {
        if (!bossKey || bossKey === 'none') return null;
        const base = bossPresets[bossKey];
        if (!base) return null;
        if (base.enrage) return getBossPresetWithEnrage(bossKey, enrageValue);
        return base;
    }

    // Convert NPC armour tier to actual armour stat
    // Formula from PVME Familiar Damage sheet: round(0.002 * tier^3 + 10 * tier + 100)
    function armourFromTier(tier) {
        if (tier === 0) return 0;
        if (tier < 100) return Math.round(0.002 * tier * tier * tier + 10 * tier + 100);
        return tier; // tier >= 100 means raw armour value
    }

    // Recalculate familiar accuracy from boss preset + familiar selection
    function recalcFamiliarAccuracy() {
        const bossKey = settings[SETTINGS.BOSS_PRESET]?.value;
        const familiarKey = settings[SETTINGS.FAMILIAR]?.value;
        if (!bossKey || bossKey === 'none' || !familiarKey || familiarKey === 'none') return;

        const boss = getEffectiveBoss(bossKey);
        const familiar = familiars[familiarKey];
        if (!boss || !familiar) return;

        const finalArmour = armourFromTier(boss.armour);

        const hitChance = calculateFamiliarHitChance(
            familiar,
            finalArmour,
            { melee: boss.affinities.melee, ranged: boss.affinities.ranged, magic: boss.affinities.magic }
        );

        settings[SETTINGS.FAMILIAR_ACCURACY].value = Math.round(hitChance * 100);
        updateDamages();
    }

    // Handle boss selection change — reset enrage to default
    function onBossChange() {
        const bossKey = settings[SETTINGS.BOSS_PRESET]?.value;
        const base = bossKey && bossKey !== 'none' ? bossPresets[bossKey] : null;
        enrageValue = base?.enrage?.default ?? 0;
        settings[SETTINGS.BOSS_ENRAGE].value = enrageValue;
        recalcFamiliarAccuracy();
    }

    // Handle enrage slider change
    function onEnrageChange() {
        settings[SETTINGS.BOSS_ENRAGE].value = enrageValue;
        recalcFamiliarAccuracy();
    }

    function getAmmoWarning(settings) {
        if (!settings?.[SETTINGS.AMMO]) return null;
        const ammo = settings[SETTINGS.AMMO].value;
        const weaponType = settings[SETTINGS.WEAPON]?.value;
        const thType = settings[SETTINGS.TH_TYPE_CUSTOM]?.value;
        const isBow = thType === SETTINGS.TH_TYPE_CUSTOM_VALUES.BOW;

        if (weaponType === SETTINGS.WEAPON_VALUES.TH) {
            if (BOLT_AMMO.includes(ammo) && isBow) return 'Bolts require a crossbow, not a bow.';
            if (ARROW_AMMO.includes(ammo) && !isBow) return 'Arrows require a bow, not a crossbow.';
        }
        if (weaponType === SETTINGS.WEAPON_VALUES.DW && ARROW_AMMO.includes(ammo)) {
            return 'Arrows require a bow — dual wield cannot use arrows.';
        }
        return null;
    }

    // Initialize settings on component mount
    onMount(async () => {
        await initializeSettings();

        // Populate boss preset options from boss_presets data
        settings[SETTINGS.BOSS_PRESET].options = [
            { value: 'none', text: 'None' },
            ...bossNames.map(key => ({ value: key, text: bossPresets[key].name }))
        ];

        // debugPreset2();
        settings[SETTINGS.UNDEAD_SLAYER_ABILITY]['value'] = false;
        settings[SETTINGS.BLACKHOLE]['value'] = false;
    });
        

    function debugPreset() {
        const armour = [
            SETTINGS.RANGED_HELMET,
            SETTINGS.RANGED_BODY,
            SETTINGS.RANGED_LEGS,
            SETTINGS.RANGED_GLOVES,
            SETTINGS.RANGED_BOOTS,
            SETTINGS.MAGIC_HELMET,
            SETTINGS.MAGIC_BODY,
            SETTINGS.MAGIC_LEGS,
            SETTINGS.MAGIC_GLOVES,
            SETTINGS.MAGIC_BOOTS,
            SETTINGS.MELEE_HELMET,
            SETTINGS.MELEE_BODY,
            SETTINGS.MELEE_LEGS,
            SETTINGS.MELEE_GLOVES,
            SETTINGS.MELEE_BOOTS,
            SETTINGS.NECKLACE,
            SETTINGS.CAPE,
            SETTINGS.RING,
            SETTINGS.POCKET,
            SETTINGS.AURA,
            SETTINGS.FAMILIAR,
        ]
        armour.forEach(armour => {
            settings[armour]['value'] = 'none';
        });
        settings[SETTINGS.MAGIC_TH]['value'] = SETTINGS.MAGIC_TH_VALUES.CUSTOM;
        settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 90;
        settings[SETTINGS.MAGIC_PRAYER]['value'] = SETTINGS.MAGIC_PRAYER_VALUES.NONE;
        settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.DW;

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 0;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;
        settings[SETTINGS.PRECISE]['value'] = 0;
        settings[SETTINGS.AFTERSHOCK]['value'] = 0;
        settings[SETTINGS.CAROMING]['value'] = 0;
        
        
        settings[SETTINGS.VULN]['value'] = SETTINGS.VULN_VALUES.NONE;

        settings[SETTINGS.MAGIC_LEVEL]['value'] = 99;
        settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.STRENGTH_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = SETTINGS.RANGED_PRAYER_VALUES.NONE;
        settings[SETTINGS.MELEE_PRAYER]['value'] = SETTINGS.MELEE_PRAYER_VALUES.NONE;
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;

        settings[SETTINGS.INNATE_MASTERY]['value'] = true;
        settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MIN_NO_CRIT;
        settings[SETTINGS.KALG_SPEC]['value'] = false;
        settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.CUSTOM;

        settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
        settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 80;
        settings[SETTINGS.WEAPON_TYPE_MELEE]['value'] = SETTINGS.WEAPON_VALUES.TH;
    }

    function debugPreset2() {
        const armour = [
            SETTINGS.RANGED_HELMET,
            SETTINGS.RANGED_BODY,
            SETTINGS.RANGED_LEGS,
            SETTINGS.RANGED_GLOVES,
            SETTINGS.RANGED_BOOTS,
            SETTINGS.MAGIC_HELMET,
            SETTINGS.MAGIC_BODY,
            SETTINGS.MAGIC_LEGS,
            SETTINGS.MAGIC_GLOVES,
            SETTINGS.MAGIC_BOOTS,
            SETTINGS.MELEE_HELMET,
            SETTINGS.MELEE_BODY,
            SETTINGS.MELEE_LEGS,
            SETTINGS.MELEE_GLOVES,
            SETTINGS.MELEE_BOOTS,
            SETTINGS.NECKLACE,
            SETTINGS.CAPE,
            SETTINGS.RING,
            SETTINGS.POCKET,
            SETTINGS.AURA,
            SETTINGS.FAMILIAR,
        ]
        armour.forEach(armour => {
            settings[armour]['value'] = 'none';
        });
        settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
        settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 85;
        settings[SETTINGS.MELEE_PRAYER]['value'] = SETTINGS.MELEE_PRAYER_VALUES.NONE;
        settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH;

        settings[SETTINGS.LVL20ARMOUR]['value'] = true;
        settings[SETTINGS.BITING]['value'] = 4;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;
        settings[SETTINGS.PRECISE]['value'] = 0;
        settings[SETTINGS.AFTERSHOCK]['value'] = 0;
        settings[SETTINGS.CAROMING]['value'] = 0;
        
        
        settings[SETTINGS.VULN]['value'] = SETTINGS.VULN_VALUES.NONE;

        settings[SETTINGS.MAGIC_LEVEL]['value'] = 99;
        settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.STRENGTH_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;

        settings[SETTINGS.INNATE_MASTERY]['value'] = false;
        settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MEAN;
        settings[SETTINGS.KALG_SPEC]['value'] = false;

        settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
        settings[SETTINGS.WEAPON_TYPE_MELEE]['value'] = SETTINGS.WEAPON_VALUES.TH;
        settings[SETTINGS.NATURAL_INSTINCT]['value'] = true;

        // settings[SETTINGS.CHAOS_ROAR]['value'] = true;
    }

    function testPreset() {
        settings[SETTINGS.RANGED_GLOVES]['value'] = SETTINGS.RANGED_GLOVES_VALUES.CINDERS;
        settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;
        settings[SETTINGS.POCKET]['value'] = SETTINGS.POCKET_VALUES.JAS;

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 3;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;

        //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = SETTINGS.RANGED_PRAYER_VALUES.ANGUISH;
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    }

    function testPresetR() {
        settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;

        //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RING]['value'] = SETTINGS.RING_VALUES.STALKER_E;
        settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    }
    function testPreset2() {
        settings[SETTINGS.MAGIC_HELMET]['value'] = SETTINGS.MAGIC_HELMET_VALUES.TECTONIC;
        settings[SETTINGS.MAGIC_BODY]['value'] = SETTINGS.MAGIC_BODY_VALUES.TECTONIC;
        settings[SETTINGS.MAGIC_LEGS]['value'] = SETTINGS.MAGIC_LEGS_VALUES.TECTONIC;
        settings[SETTINGS.MAGIC_GLOVES]['value'] = SETTINGS.MAGIC_GLOVES_VALUES.KWW;
        settings[SETTINGS.MAGIC_BOOTS]['value'] = SETTINGS.MAGIC_BOOTS_VALUES.BLAST;

        settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    }
    // Armour presets per combat style
    const ARMOUR_PRESETS = {
        [SettingsCombatStyles.RANGED]: {
            'BIS': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.STALKER_E,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.FUL,
            },
            'Elite Dracolich': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH,
            },
            'Dracolich': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.DRACOLICH,
            },
            'Elite Sirenic': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_SIRENIC,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_SIRENIC,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_SIRENIC,
            },
            'Sirenic': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.SIRENIC,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.SIRENIC,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.SIRENIC,
            },
        },
        [SettingsCombatStyles.MAGIC]: {
            'BIS': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_GLOVES]: SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_BOOTS]: SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
            },
            'Elite Tectonic': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC,
            },
            'Tectonic': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.TECTONIC,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.TECTONIC,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.TECTONIC,
            },
            'Virtus': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.VIRTUS,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.VIRTUS,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.VIRTUS,
            },
        },
        [SettingsCombatStyles.MELEE]: {
            'BIS': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.VESTMENTS,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.TMW,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHAMPION_E,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
            },
            'Trimmed Masterwork': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.TMW,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.TMW,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.TMW,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.TMW,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.TMW,
            },
            'Masterwork': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.MASTERWORK,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.MASTERWORK,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.MASTERWORK,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.MASTERWORK,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.MASTERWORK,
            },
            'Vestments of Havoc': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.VESTMENTS,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS,
            },
        },
        [SettingsCombatStyles.NECROMANCY]: {
            'BIS': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.TFN,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.TFN,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.TFN,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.TFN,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.TFN,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
            },
            'First Necromancer (t110)': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.TFN,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.TFN,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.TFN,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.TFN,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.TFN,
            },
            'Deathdealer (t90)': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.T90DD,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.T90DD,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.T90DD,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.T90DD,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.T90DD,
            },
        },
    };

    let selectedPreset = $state('');

    function applyArmourPreset(presetName) {
        const presets = ARMOUR_PRESETS[styleTab];
        if (!presets || !presets[presetName]) return;
        const preset = presets[presetName];
        for (const [settingKey, value] of Object.entries(preset)) {
            settings[settingKey]['value'] = value;
        }
        selectedPreset = '';
        updateDamages();
    }

    //makeNaked();
    //testPresetR();
    //settings[SETTINGS.ICY_CHILL_STACKS].value = 10;
    updateDamages();


</script>

<div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-rotation">
    <button 
        class="collapse-button-settings"
        onclick={() => uiState.settingsPanelCollapsed = true}
    >
        → Hide
    </button>
    <h1 class="rotation-header">Settings</h1>
    <GradientSeparator marginTop="0.0rem" marginBottom="1.0rem" />
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <TabButton 
            id="ranged"
            label="Ranged"
            isActive={styleTab === SettingsCombatStyles.RANGED}
            onClick={() => (styleTab = SettingsCombatStyles.RANGED)}
        />
        <TabButton 
            id="magic"
            label="Magic"
            isActive={styleTab === SettingsCombatStyles.MAGIC}
            onClick={() => (styleTab = SettingsCombatStyles.MAGIC)}
        />
        <TabButton 
            id="melee"
            label="Melee"
            isActive={styleTab === SettingsCombatStyles.MELEE}
            onClick={() => (styleTab = SettingsCombatStyles.MELEE)}
        />
        <TabButton 
            id="necro"
            label="Necro"
            isActive={styleTab === SettingsCombatStyles.NECROMANCY}
            onClick={() => (styleTab = SettingsCombatStyles.NECROMANCY)}
        />
    </ul>
    <GradientSeparator marginTop="0.0rem" marginBottom="0.25rem" />
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <TabButton 
            id="general"
            label="General"
            isActive={tab === 'general'}
            onClick={() => (tab = 'general')}
        />
        <TabButton 
            id="equipment"
            label="Equipment"
            isActive={tab === 'equipment'}
            onClick={() => (tab = 'equipment')}
        />
        <TabButton 
            id="bosses"
            label="Bosses"
            isActive={tab === 'bosses'}
            onClick={() => (tab = 'bosses')}
        />
    </ul>
    <GradientSeparator marginTop="0.0rem" marginBottom="0.25rem" />
    {#if !settingsStore.initialized}
    <div class="w-full text-center py-8">
        <p>Loading settings...</p>
    </div>
    {:else}
    <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {#if tab === 'general'}
                <div class="md:col-span-1 space-y-2">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">General</h5>
                    <Select
                        bind:setting={settings[SETTINGS.MODE]}
                        img="/settings_icons/Skills_icon.png"
                        onchange={() => updateDamages()}
                    />
                    {#if styleTab == SettingsCombatStyles.RANGED}
                        <Number
                            bind:setting={settings[SETTINGS.RANGED_LEVEL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/ranged_level.png"step="1"
                            max="150"
                            min="1"
                        />
                    {:else if styleTab == SettingsCombatStyles.MAGIC}
                        <Number
                            bind:setting={settings[SETTINGS.MAGIC_LEVEL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/magic.png"
                            step="1"
                            max="150"
                            min="1"
                        />
                    {:else if styleTab == SettingsCombatStyles.MELEE}
                        <Number
                            bind:setting={settings[SETTINGS.STRENGTH_LEVEL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/strength.png"
                            step="1"
                            max="150"
                            min="1"
                        />
                    {:else if styleTab == SettingsCombatStyles.NECROMANCY}
                        <Number
                            bind:setting={settings[SETTINGS.NECROMANCY_LEVEL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/necromancy.png"
                            step="1"
                            max="150"
                            min="1"
                        />
                    {/if}
                    
                    <Number
                        bind:setting={settings[SETTINGS.HIT_CHANCE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_SIZE]}
                        onchange={() => updateDamages()}
                        img="/settings_icons/target_size.webp"
                        step="1"
                        max="5"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/target_hp.png"
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1 space-y-2">
                    <h5 class="uppercase font-bold text-lg text-center">Damage Buffs</h5>
                    {#if prayerSettingByStyle[styleTab]}
                    {@const prayerKey = prayerSettingByStyle[styleTab]}
                    <div class="relative inline-block w-full">
                        <button
                            type="button"
                            class="stack-toggle w-full flex items-center gap-2 px-2 py-1"
                            class:stack-active={settings[prayerKey]?.value && settings[prayerKey]?.value !== 'none'}
                            title="Prayer (click to change)"
                            onclick={() => { openDropdown = openDropdown === prayerKey ? null : prayerKey; }}
                        >
                            <img src={prayerIconByStyle[styleTab]} alt="Prayer" class="w-7 h-7" />
                            <span class="text-sm truncate">{settings[prayerKey]?.options?.find(o => o.value === settings[prayerKey]?.value)?.text ?? settings[prayerKey]?.value ?? 'None'}</span>
                        </button>
                        {#if openDropdown === prayerKey}
                            <div class="icon-dropdown">
                                {#each settings[prayerKey]?.options ?? [] as option}
                                    <button
                                        type="button"
                                        class="icon-dropdown-item"
                                        class:active={settings[prayerKey]?.value === option.value}
                                        onclick={() => { settings[prayerKey].value = option.value; openDropdown = null; updateDamages(); }}
                                    >
                                        {option.text}
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                    {/if}
                    <div class="relative inline-block w-full">
                        <button
                            type="button"
                            class="stack-toggle w-full flex items-center gap-2 px-2 py-1"
                            class:stack-active={settings[SETTINGS.SLAYER_HELM]?.value && settings[SETTINGS.SLAYER_HELM]?.value !== 'none'}
                            title="Slayer Helmet (click to change)"
                            onclick={() => { openDropdown = openDropdown === SETTINGS.SLAYER_HELM ? null : SETTINGS.SLAYER_HELM; }}
                        >
                            <img src="/effect_icons/slayer_helmet.png" alt="Slayer Helmet" class="w-7 h-7" />
                            <span class="text-sm truncate">{settings[SETTINGS.SLAYER_HELM]?.options?.find(o => o.value === settings[SETTINGS.SLAYER_HELM]?.value)?.text ?? 'None'}</span>
                        </button>
                        {#if openDropdown === SETTINGS.SLAYER_HELM}
                            <div class="icon-dropdown">
                                {#each settings[SETTINGS.SLAYER_HELM]?.options ?? [] as option}
                                    <button
                                        type="button"
                                        class="icon-dropdown-item"
                                        class:active={settings[SETTINGS.SLAYER_HELM]?.value === option.value}
                                        onclick={() => { settings[SETTINGS.SLAYER_HELM].value = option.value; openDropdown = null; updateDamages(); }}
                                    >
                                        {option.text}
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-wrap gap-2 justify-center my-2">
                        {#each [
                            { key: SETTINGS.REAPER_CREW, img: '/effect_icons/death.png', title: 'Reaper Crew', toggle: true },
                            { key: SETTINGS.SWIFTNESS_OF_THE_AVIANSIE, img: '/effect_icons/swiftness_of_the_avianse.png', title: 'Swiftness of the Aviansie', toggle: true },
                            { key: SETTINGS.SMOKE_CLOUD, img: '/effect_icons/smoke_cloud.png', title: 'Smoke Cloud', toggle: true },
                            { key: SETTINGS.STONE_OF_JAS, img: '/effect_icons/stone_of_jas.png', title: 'Stone of Jas', step: 1 },
                            { key: SETTINGS.BERSERKERS_FURY, img: '/effect_icons/berserkers_fury.png', title: "Berserker's Fury", step: 0.5 },
                            { key: SETTINGS.INFERNAL_PUZZLE_BOX, img: '/effect_icons/infernal_puzzlebox.png', title: 'Infernal Puzzle Box', step: 1 },
                        ] as buff}
                            <button
                                type="button"
                                class="stack-toggle"
                                class:stack-active={buff.toggle ? settings[buff.key]?.value : settings[buff.key]?.value > 0}
                                title="{buff.title}{buff.toggle ? '' : ' (right-click to set, scroll to adjust)'}"
                                onclick={() => { if (buff.toggle) { settings[buff.key].value = !settings[buff.key].value; } else { settings[buff.key].value = settings[buff.key].value > 0 ? 0 : (buff.step ?? 1); } updateDamages(); }}
                                oncontextmenu={(e) => { if (!buff.toggle) { e.preventDefault(); editingStack = editingStack === buff.key ? null : buff.key; } }}
                                onwheel={(e) => { if (!buff.toggle) { e.preventDefault(); const curr = settings[buff.key]?.value ?? 0; const step = buff.step ?? 1; const next = curr + (e.deltaY < 0 ? step : -step); const max = buffLimits[buff.key] ?? 999; settings[buff.key].value = Math.max(0, Math.min(max, Math.round(next * 10) / 10)); updateDamages(); } }}
                            >
                                <img src={buff.img} alt={buff.title} class="w-7 h-7" />
                                {#if !buff.toggle && settings[buff.key] != null}
                                    <span class="stack-count">{settings[buff.key].value ?? 0}</span>
                                {/if}
                                {#if !buff.toggle && editingStack === buff.key}
                                    <input
                                        type="number"
                                        class="stack-edit"
                                        value={settings[buff.key]?.value ?? 0}
                                        min="0"
                                        step={buff.step ?? 1}
                                        oninput={(e) => { const max = buffLimits[buff.key] ?? 999; settings[buff.key].value = Math.max(0, Math.min(max, parseFloat(e.target.value) || 0)); updateDamages(); }}
                                        onblur={() => { editingStack = null; }}
                                        onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                                        onclick={(e) => e.stopPropagation()}
                                        use:focusOnMount
                                    />
                                {/if}
                            </button>
                        {/each}
                    </div>
                    <div class="flex flex-wrap gap-2 justify-center my-2">
                        <button
                            type="button"
                            class="stack-toggle"
                            class:stack-active={settings[SETTINGS.VULN]?.value && settings[SETTINGS.VULN]?.value !== SETTINGS.VULN_VALUES.NONE}
                            title="Vulnerability: {settings[SETTINGS.VULN]?.value ?? 'none'} (click to cycle)"
                            onclick={() => { const order = [SETTINGS.VULN_VALUES.NONE, SETTINGS.VULN_VALUES.CURSE, SETTINGS.VULN_VALUES.VULNERABILITY]; const idx = order.indexOf(settings[SETTINGS.VULN].value); settings[SETTINGS.VULN].value = order[(idx + 1) % order.length]; updateDamages(); }}
                        >
                            <img src={settings[SETTINGS.VULN]?.value === SETTINGS.VULN_VALUES.CURSE ? '/effect_icons/magic/Curse_icon.png' : '/effect_icons/magic/Vulnerability_icon.webp'} alt="Vulnerability" class="w-7 h-7" />
                            {#if settings[SETTINGS.VULN]?.value && settings[SETTINGS.VULN]?.value !== SETTINGS.VULN_VALUES.NONE}
                                <span class="stack-count">{settings[SETTINGS.VULN].value === SETTINGS.VULN_VALUES.CURSE ? 'C' : 'V'}</span>
                            {/if}
                        </button>
                        <button
                            type="button"
                            class="stack-toggle"
                            class:stack-active={settings[SETTINGS.POISON]?.value && settings[SETTINGS.POISON]?.value !== SETTINGS.POISON_VALUES.NONE}
                            title="Poison: {settings[SETTINGS.POISON]?.value ?? 'none'} (click to cycle)"
                            onclick={() => { const order = [SETTINGS.POISON_VALUES.NONE, SETTINGS.POISON_VALUES.WEAPON_POISON0, SETTINGS.POISON_VALUES.WEAPON_POISON1, SETTINGS.POISON_VALUES.WEAPON_POISON2, SETTINGS.POISON_VALUES.WEAPON_POISON3]; const idx = order.indexOf(settings[SETTINGS.POISON].value); settings[SETTINGS.POISON].value = order[(idx + 1) % order.length]; updateDamages(); }}
                        >
                            <img src="/effect_icons/poison.png" alt="Poison" class="w-7 h-7" />
                            {#if settings[SETTINGS.POISON]?.value && settings[SETTINGS.POISON]?.value !== SETTINGS.POISON_VALUES.NONE}
                                <span class="stack-count">{'+'.repeat([SETTINGS.POISON_VALUES.WEAPON_POISON1, SETTINGS.POISON_VALUES.WEAPON_POISON2, SETTINGS.POISON_VALUES.WEAPON_POISON3].indexOf(settings[SETTINGS.POISON].value) + 1) || '0'}</span>
                            {/if}
                        </button>
                        <button
                            type="button"
                            class="stack-toggle"
                            class:stack-active={settings[SETTINGS.NOPE]?.value > 0}
                            title="Nope nope nope (right-click to set, scroll to adjust)"
                            onclick={() => { settings[SETTINGS.NOPE].value = settings[SETTINGS.NOPE].value > 0 ? 0 : 1; updateDamages(); }}
                            oncontextmenu={(e) => { e.preventDefault(); editingStack = editingStack === SETTINGS.NOPE ? null : SETTINGS.NOPE; }}
                            onwheel={(e) => { e.preventDefault(); const curr = settings[SETTINGS.NOPE]?.value ?? 0; settings[SETTINGS.NOPE].value = Math.max(0, Math.min(3, curr + (e.deltaY < 0 ? 1 : -1))); updateDamages(); }}
                        >
                            <img src="/effect_icons/nopenopenope.png" alt="Nope nope nope" class="w-7 h-7" />
                            {#if settings[SETTINGS.NOPE] != null}
                                <span class="stack-count">{settings[SETTINGS.NOPE].value ?? 0}</span>
                            {/if}
                            {#if editingStack === SETTINGS.NOPE}
                                <input
                                    type="number"
                                    class="stack-edit"
                                    value={settings[SETTINGS.NOPE]?.value ?? 0}
                                    min="0"
                                    max="3"
                                    oninput={(e) => { settings[SETTINGS.NOPE].value = Math.max(0, Math.min(3, parseInt(e.target.value) || 0)); updateDamages(); }}
                                    onblur={() => { editingStack = null; }}
                                    onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                                    onclick={(e) => e.stopPropagation()}
                                    use:focusOnMount
                                />
                            {/if}
                        </button>
                    </div>
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Stacks</h5>
                    <div class="flex flex-wrap gap-2 justify-center mb-3">
                    {#each Object.keys(stacks) as key}
                        {#if stacks[key].combatStyle === styleTab || stacks[key].combatStyle === SettingsCombatStyles.ALL}
                        <button
                            type="button"
                            class="stack-toggle"
                            class:stack-active={settings[stacks[key].displaySetting]?.value}
                            title="{stacks[key].title} (right-click to set starting value, scroll to adjust)"
                            onclick={() => { settings[stacks[key].displaySetting].value = !settings[stacks[key].displaySetting].value; updateDamages(); }}
                            oncontextmenu={(e) => { e.preventDefault(); editingStack = editingStack === key ? null : key; }}
                            onwheel={(e) => { e.preventDefault(); const curr = settings[key]?.value ?? 0; const next = clampStack(key, curr + (e.deltaY < 0 ? 1 : -1)); if (settings[key]) { settings[key].value = next; updateDamages(); } }}
                        >
                            <img src={stacks[key].image} alt={stacks[key].title} class="w-7 h-7" />
                            {#if settings[key] != null}
                                <span class="stack-count">{settings[key].value ?? 0}</span>
                            {/if}
                            {#if editingStack === key}
                                <input
                                    type="number"
                                    class="stack-edit"
                                    value={settings[key]?.value ?? 0}
                                    min="0"
                                    oninput={(e) => { settings[key].value = clampStack(key, e.target.value); updateDamages(); }}
                                    onblur={() => { editingStack = null; }}
                                    onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                                    onclick={(e) => e.stopPropagation()}
                                    use:focusOnMount
                                />
                            {/if}
                        </button>
                        {/if}
                    {/each}
                    </div>
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Adrenaline</h5>
                    <div class="flex flex-wrap gap-2 justify-center">
                        {#each [
                            { key: SETTINGS.VIGOUR, img: '/gear_icons/shared/ring of vigour.png', title: 'Ring of Vigour' },
                            { key: SETTINGS.FURY_OF_THE_SMALL, img: '/effect_icons/Fury of the Small.png', title: 'Fury of the Small' },
                            { key: SETTINGS.CONSERVATION_OF_ENERGY, img: '/effect_icons/Conservation of Energy.png', title: 'Conservation of Energy' },
                            { key: SETTINGS.HEIGHTENED_SENSES, img: '/effect_icons/Heightened Senses.png', title: 'Heightened Senses' },
                            { key: SETTINGS.EXPECTED_ADRENALINE, img: 'settings_icons/Animal_trait_re-roller.png', title: 'Expected Adrenaline' },
                        ] as toggle}
                            <button
                                type="button"
                                class="stack-toggle"
                                class:stack-active={settings[toggle.key]?.value}
                                title={toggle.title}
                                onclick={() => { settings[toggle.key].value = !settings[toggle.key].value; updateDamages(); }}
                            >
                                <img src={toggle.img} alt={toggle.title} class="w-7 h-7" />
                            </button>
                        {/each}
                    </div>
                </div>
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Armour</h5>
                    <div class="flex flex-wrap gap-2 justify-center mb-3">
                        {#each (armourSlotsByStyle[styleTab] ?? []) as slot}
                            <div class="relative">
                                <button
                                    type="button"
                                    class="stack-toggle"
                                    class:stack-active={settings[slot.key]?.value && settings[slot.key]?.value !== 'none'}
                                    title="{settings[slot.key]?.label ?? slot.key}: {settings[slot.key]?.options?.find(o => o.value === settings[slot.key]?.value)?.text ?? 'None'}"
                                    onclick={() => { openDropdown = openDropdown === slot.key ? null : slot.key; }}
                                >
                                    <img
                                        src={gearIcon(slot.key, slot.fallback, styleFolder[styleTab])}
                                        alt={settings[slot.key]?.label ?? ''}
                                        class="w-7 h-7"
                                        onerror={(e) => { e.target.onerror = () => { e.target.onerror = null; e.target.src = slot.fallback; }; const icons = gearIconWithFallback(slot.key, slot.fallback, styleFolder[styleTab]); e.target.src = icons.fallbackIcon; }}
                                    />
                                    {#if gearBadge(slot.key)}
                                        {#if gearBadge(slot.key).img}
                                            <img src={gearBadge(slot.key).img} alt="" class="gear-badge-img" />
                                        {:else}
                                            <span class="stack-count">{gearBadge(slot.key).text}</span>
                                        {/if}
                                    {/if}
                                </button>
                                {#if openDropdown === slot.key}
                                    <div class="icon-dropdown" style="min-width: 160px;">
                                        {#each settings[slot.key]?.options ?? [] as option}
                                            <button
                                                type="button"
                                                class="icon-dropdown-item"
                                                class:active={settings[slot.key]?.value === option.value}
                                                onclick={() => { settings[slot.key].value = option.value; openDropdown = null; updateDamages(); }}
                                            >
                                                {option.text}
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                        {#each sharedArmourSlots as slot}
                            <div class="relative">
                                <button
                                    type="button"
                                    class="stack-toggle"
                                    class:stack-active={settings[slot.key]?.value && settings[slot.key]?.value !== 'none'}
                                    title="{settings[slot.key]?.label ?? slot.key}: {settings[slot.key]?.options?.find(o => o.value === settings[slot.key]?.value)?.text ?? 'None'}"
                                    onclick={() => { openDropdown = openDropdown === slot.key ? null : slot.key; }}
                                >
                                    <img
                                        src={gearIcon(slot.key, slot.fallback)}
                                        alt={settings[slot.key]?.label ?? ''}
                                        class="w-7 h-7"
                                        onerror={(e) => { e.target.onerror = () => { e.target.onerror = null; e.target.src = slot.fallback; }; const icons = gearIconWithFallback(slot.key, slot.fallback); e.target.src = icons.fallbackIcon; }}
                                    />
                                    {#if gearBadge(slot.key)}
                                        {#if gearBadge(slot.key).img}
                                            <img src={gearBadge(slot.key).img} alt="" class="gear-badge-img" />
                                        {:else}
                                            <span class="stack-count">{gearBadge(slot.key).text}</span>
                                        {/if}
                                    {/if}
                                </button>
                                {#if openDropdown === slot.key}
                                    <div class="icon-dropdown" style="min-width: 160px;">
                                        {#each settings[slot.key]?.options ?? [] as option}
                                            <button
                                                type="button"
                                                class="icon-dropdown-item"
                                                class:active={settings[slot.key]?.value === option.value}
                                                onclick={() => { settings[slot.key].value = option.value; openDropdown = null; updateDamages(); }}
                                            >
                                                {option.text}
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                        {#if styleTab === SettingsCombatStyles.MAGIC && settings[SETTINGS.AUTO_CAST]}
                            <div class="relative">
                                <button
                                    type="button"
                                    class="stack-toggle"
                                    class:stack-active={settings[SETTINGS.AUTO_CAST]?.value && settings[SETTINGS.AUTO_CAST]?.value !== 'none'}
                                    title="Auto Cast: {settings[SETTINGS.AUTO_CAST]?.options?.find(o => o.value === settings[SETTINGS.AUTO_CAST]?.value)?.text ?? 'None'}"
                                    onclick={() => { openDropdown = openDropdown === SETTINGS.AUTO_CAST ? null : SETTINGS.AUTO_CAST; }}
                                >
                                    <img
                                        src={settings[SETTINGS.AUTO_CAST]?.value === 'exsanguinate' ? '/effect_icons/Exsanguinate_icon.webp' : settings[SETTINGS.AUTO_CAST]?.value === 'incite fear' ? '/ability_icons/magic/Incite_Fear_icon.webp' : '/effect_icons/magic/Curse_icon.png'}
                                        alt="Auto Cast"
                                        class="w-7 h-7"
                                    />
                                </button>
                                {#if openDropdown === SETTINGS.AUTO_CAST}
                                    <div class="icon-dropdown" style="min-width: 140px;">
                                        {#each settings[SETTINGS.AUTO_CAST]?.options ?? [] as option}
                                            <button
                                                type="button"
                                                class="icon-dropdown-item"
                                                class:active={settings[SETTINGS.AUTO_CAST]?.value === option.value}
                                                onclick={() => { settings[SETTINGS.AUTO_CAST].value = option.value; openDropdown = null; updateDamages(); }}
                                            >
                                                {option.text}
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/if}
                        <!-- Weapon: combined MH + 2H dropdown, OH, Ammo -->
                        {#each [weaponSlotsByStyle[styleTab]].filter(Boolean) as ws}
                            {@const is2h = ws.weaponType && settings[ws.weaponType]?.value === SETTINGS.WEAPON_VALUES.TH}
                            {@const activeWeaponKey = is2h ? ws.th : ws.mh}
                            {@const activeWeaponText = settings[activeWeaponKey]?.options?.find(o => o.value === settings[activeWeaponKey]?.value)?.text ?? 'Custom'}
                            <div class="relative">
                                <button type="button" class="stack-toggle"
                                    class:stack-active={activeWeaponKey && settings[activeWeaponKey]?.value}
                                    title="Weapon: {activeWeaponText}{is2h ? ' (2H)' : ''}"
                                    onclick={() => { openDropdown = openDropdown === 'weapon_combined' ? null : 'weapon_combined'; }}
                                >
                                    <img src={gearIcon(activeWeaponKey, '/armour_icons/Main_hand_slot.webp', styleFolder[styleTab])} alt="Weapon" class="w-7 h-7"
                                        onerror={(e) => { e.target.onerror = null; e.target.src = '/armour_icons/Main_hand_slot.webp'; }}
                                    />
                                </button>
                                {#if openDropdown === 'weapon_combined'}
                                    <div class="icon-dropdown" style="min-width: 180px;">
                                        {#if ws.mh && settings[ws.mh]}
                                            <div style="padding: 0.2rem 0.5rem; font-size: 0.65rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Main-hand</div>
                                            {#each settings[ws.mh]?.options ?? [] as option}
                                                <button type="button" class="icon-dropdown-item"
                                                    class:active={!is2h && settings[ws.mh]?.value === option.value}
                                                    onclick={() => {
                                                        settings[ws.mh].value = option.value;
                                                        if (ws.weaponType) settings[ws.weaponType].value = SETTINGS.WEAPON_VALUES.DW;
                                                        openDropdown = null;
                                                        updateDamages();
                                                    }}
                                                >{option.text}</button>
                                            {/each}
                                        {/if}
                                        {#if ws.th && settings[ws.th]}
                                            <div style="padding: 0.2rem 0.5rem; font-size: 0.65rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0.2rem;">Two-handed</div>
                                            {#each settings[ws.th]?.options ?? [] as option}
                                                <button type="button" class="icon-dropdown-item"
                                                    class:active={is2h && settings[ws.th]?.value === option.value}
                                                    onclick={() => {
                                                        settings[ws.th].value = option.value;
                                                        if (ws.weaponType) settings[ws.weaponType].value = SETTINGS.WEAPON_VALUES.TH;
                                                        openDropdown = null;
                                                        updateDamages();
                                                    }}
                                                >{option.text}</button>
                                            {/each}
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                            <!-- OH: only show when dual-wield -->
                            {#if !is2h && ws.oh && settings[ws.oh]}
                                <div class="relative">
                                    <button type="button" class="stack-toggle"
                                        class:stack-active={settings[ws.oh]?.value && settings[ws.oh]?.value !== 'none'}
                                        title="Off-hand: {settings[ws.oh]?.options?.find(o => o.value === settings[ws.oh]?.value)?.text ?? 'None'}"
                                        onclick={() => { openDropdown = openDropdown === ws.oh ? null : ws.oh; }}
                                    >
                                        <img src={gearIcon(ws.oh, '/armour_icons/Off-hand_slot.webp', styleFolder[styleTab])} alt="Off-hand" class="w-7 h-7"
                                            onerror={(e) => { e.target.onerror = null; e.target.src = '/armour_icons/Off-hand_slot.webp'; }}
                                        />
                                    </button>
                                    {#if openDropdown === ws.oh}
                                        <div class="icon-dropdown" style="min-width: 160px;">
                                            {#each settings[ws.oh]?.options ?? [] as option}
                                                <button type="button" class="icon-dropdown-item"
                                                    class:active={settings[ws.oh]?.value === option.value}
                                                    onclick={() => { settings[ws.oh].value = option.value; openDropdown = null; updateDamages(); }}
                                                >{option.text}</button>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        {/each}
                    </div>
                    {#if ARMOUR_PRESETS[styleTab]}
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; padding: 0.4rem 0.5rem; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
                            <span style="font-size: 0.75rem; color: #aaa; white-space: nowrap;">Preset</span>
                            <select
                                style="flex: 1; background: rgba(0,0,0,0.3); color: #ddd; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.25rem 0.4rem; font-size: 0.8rem; cursor: pointer;"
                                bind:value={selectedPreset}
                                onchange={() => { if (selectedPreset) applyArmourPreset(selectedPreset); }}
                            >
                                <option value="">-- Select preset --</option>
                                {#each Object.keys(ARMOUR_PRESETS[styleTab]) as name}
                                    <option value={name}>{name}</option>
                                {/each}
                            </select>
                        </div>
                    {/if}
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Perks</h5>
                    <div class="flex flex-wrap gap-2 justify-center mb-3">
                        {#each [
                            { key: SETTINGS.PRECISE, img: '/effect_icons/perks/Precise.webp', title: 'Precise', step: 1, max: 6 },
                            { key: SETTINGS.ERUPTIVE, img: '/effect_icons/perks/Eruptive.webp', title: 'Eruptive', step: 1, max: 4 },
                            { key: SETTINGS.EQ_PERK, img: '/effect_icons/perks/Equilibrium.png', title: 'Equilbrium', step: 1, max: 4 },
                            { key: SETTINGS.CAROMING, img: '/effect_icons/perks/caroming.png', title: 'Caroming', step: 1, max: 4 },
                            { key: SETTINGS.BITING, img: '/effect_icons/perks/Biting.webp', title: 'Biting', step: 1, max: 4 },
                            { key: SETTINGS.AFTERSHOCK, img: '/effect_icons/perks/Aftershock.png', title: 'Aftershock', step: 1, max: 4 },
                            { key: SETTINGS.GENOCIDAL, img: '/effect_icons/perks/genocidal.png', title: 'Genocidal %', step: 0.1, max: 4.9 },
                            { key: SETTINGS.FLANKING, img: '/effect_icons/perks/Flanking.webp', title: 'Flanking', step: 1, max: 4 },
                            { key: SETTINGS.LVL20ARMOUR, img: '/effect_icons/perks/level-20.png', title: 'Level 20 Armour', toggle: true },
                            { key: SETTINGS.IMPATIENT, img: '/effect_icons/perks/Impatient.png', title: 'Impatient', step: 1, max: 4 },
                            { key: SETTINGS.SLAYER_PERK_UNDEAD, img: '/effect_icons/perks/25px-Undead_Slayer.webp', title: 'Undead Slayer', toggle: true },
                            { key: SETTINGS.SLAYER_PERK_DRAGON, img: '/effect_icons/perks/dragon_slayer_perk.png', title: 'Dragon Slayer', toggle: true },
                            { key: SETTINGS.SLAYER_PERK_DEMON, img: '/effect_icons/perks/demon_slayer_perk.webp', title: 'Demon Slayer', toggle: true },
                        ] as perk}
                            <button
                                type="button"
                                class="stack-toggle"
                                class:stack-active={perk.toggle ? settings[perk.key]?.value : settings[perk.key]?.value > 0}
                                title="{perk.title}{perk.toggle ? '' : ' (right-click to set, scroll to adjust)'}"
                                onclick={() => { if (perk.toggle) { settings[perk.key].value = !settings[perk.key].value; } else { settings[perk.key].value = settings[perk.key].value > 0 ? 0 : (perk.step ?? 1); } updateDamages(); }}
                                oncontextmenu={(e) => { if (!perk.toggle) { e.preventDefault(); editingStack = editingStack === perk.key ? null : perk.key; } }}
                                onwheel={(e) => { if (!perk.toggle) { e.preventDefault(); const curr = settings[perk.key]?.value ?? 0; const step = perk.step ?? 1; const max = perk.max ?? 999; settings[perk.key].value = Math.max(0, Math.min(max, Math.round((curr + (e.deltaY < 0 ? step : -step)) * 10) / 10)); updateDamages(); } }}
                            >
                                <img src={perk.img} alt={perk.title} class="w-7 h-7" />
                                {#if !perk.toggle && settings[perk.key] != null}
                                    <span class="stack-count">{settings[perk.key].value ?? 0}</span>
                                {/if}
                                {#if !perk.toggle && editingStack === perk.key}
                                    <input
                                        type="number"
                                        class="stack-edit"
                                        value={settings[perk.key]?.value ?? 0}
                                        min="0"
                                        max={perk.max ?? 999}
                                        step={perk.step ?? 1}
                                        oninput={(e) => { const max = perk.max ?? 999; settings[perk.key].value = Math.max(0, Math.min(max, parseFloat(e.target.value) || 0)); updateDamages(); }}
                                        onblur={() => { editingStack = null; }}
                                        onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                                        onclick={(e) => e.stopPropagation()}
                                        use:focusOnMount
                                    />
                                {/if}
                            </button>
                        {/each}
                        {#each [
                            { key: SETTINGS.RUTHLESS_RANK, img: '/effect_icons/perks/Ruthless.webp', title: 'Ruthless Rank', label: 'Rank', step: 1, max: 3 },
                            { key: SETTINGS.RUTHLESS_STACKS, img: '/effect_icons/perks/Ruthless.webp', title: 'Ruthless Stacks', label: 'Stacks', step: 1, max: 5 },
                        ] as perk}
                            <button
                                type="button"
                                class="stack-toggle"
                                class:stack-active={settings[perk.key]?.value > 0}
                                title="{perk.title} (right-click to set, scroll to adjust)"
                                onclick={() => { settings[perk.key].value = settings[perk.key].value > 0 ? 0 : 1; updateDamages(); }}
                                oncontextmenu={(e) => { e.preventDefault(); editingStack = editingStack === perk.key ? null : perk.key; }}
                                onwheel={(e) => { e.preventDefault(); const curr = settings[perk.key]?.value ?? 0; settings[perk.key].value = Math.max(0, Math.min(perk.max, curr + (e.deltaY < 0 ? 1 : -1))); updateDamages(); }}
                            >
                                <span class="stack-label">{perk.label}</span>
                                <img src={perk.img} alt={perk.title} class="w-7 h-7" />
                                <span class="stack-count">{settings[perk.key]?.value ?? 0}</span>
                                {#if editingStack === perk.key}
                                    <input
                                        type="number"
                                        class="stack-edit"
                                        value={settings[perk.key]?.value ?? 0}
                                        min="0"
                                        max={perk.max}
                                        oninput={(e) => { settings[perk.key].value = Math.max(0, Math.min(perk.max, parseInt(e.target.value) || 0)); updateDamages(); }}
                                        onblur={() => { editingStack = null; }}
                                        onkeydown={(e) => { if (e.key === 'Enter') editingStack = null; }}
                                        onclick={(e) => e.stopPropagation()}
                                        use:focusOnMount
                                    />
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>   
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Familiars</h5>
                    <div class="flex flex-wrap gap-2 justify-center mb-3">
                        <!-- Familiar selector (dropdown) -->
                        <div class="relative">
                            <button
                                type="button"
                                class="stack-toggle"
                                class:stack-active={settings[SETTINGS.FAMILIAR]?.value && settings[SETTINGS.FAMILIAR]?.value !== SETTINGS.FAMILIAR_VALUES.NONE}
                                title="Familiar: {settings[SETTINGS.FAMILIAR]?.options?.find(o => o.value === settings[SETTINGS.FAMILIAR]?.value)?.text ?? 'None'}"
                                onclick={() => { openDropdown = openDropdown === SETTINGS.FAMILIAR ? null : SETTINGS.FAMILIAR; }}
                            >
                                <img src={familiarIcons[settings[SETTINGS.FAMILIAR]?.value] ?? '/effect_icons/familiar.png'} alt="Familiar" class="w-7 h-7" />
                            </button>
                            {#if openDropdown === SETTINGS.FAMILIAR}
                                <div class="icon-dropdown" style="min-width: 140px;">
                                    {#each settings[SETTINGS.FAMILIAR]?.options ?? [] as option}
                                        <button type="button" class="icon-dropdown-item"
                                            class:active={settings[SETTINGS.FAMILIAR]?.value === option.value}
                                            onclick={() => { settings[SETTINGS.FAMILIAR].value = option.value; openDropdown = null; recalcFamiliarAccuracy(); updateDamages(); }}
                                        >{option.text}</button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                        <!-- Kalg spec (always visible) -->
                        <button type="button" class="stack-toggle"
                            class:stack-active={settings[SETTINGS.KALG_SPEC]?.value}
                            title="Kal'gerion Spec"
                            onclick={() => { settings[SETTINGS.KALG_SPEC].value = !settings[SETTINGS.KALG_SPEC].value; updateDamages(); }}
                        >
                            <img src="/effect_icons/crit_i_kal.png" alt="Kalg spec" class="w-7 h-7" />
                        </button>
                        <!-- Scroll-related options (ripper/steel titan only) -->
                        {#if settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON || settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.STEEL_TITAN}
                            <button type="button" class="stack-toggle"
                                class:stack-active={settings[SETTINGS.USE_FAMILIAR_SCROLLS]?.value}
                                title="Use Familiar Scrolls"
                                onclick={() => { settings[SETTINGS.USE_FAMILIAR_SCROLLS].value = !settings[SETTINGS.USE_FAMILIAR_SCROLLS].value; updateDamages(); }}
                            >
                                <img src={settings[SETTINGS.FAMILIAR]?.value === SETTINGS.FAMILIAR_VALUES.RIPPER_DEMON
                                    ? '/familiars/scrolls/Ripper_Demon_scroll_(Death_From_Above).png'
                                    : '/familiars/scrolls/Steel_Titan_scroll_(Steel_of_Legends).png'} alt="Scrolls" class="w-7 h-7" />
                            </button>
                            <button type="button" class="stack-toggle"
                                class:stack-active={settings[SETTINGS.SPIRIT_CAPE]?.value}
                                title="Spirit Cape"
                                onclick={() => { settings[SETTINGS.SPIRIT_CAPE].value = !settings[SETTINGS.SPIRIT_CAPE].value; updateDamages(); }}
                            >
                                <img src="/effect_icons/Spirit_cape.png" alt="Spirit Cape" class="w-7 h-7" />
                            </button>
                            <button type="button" class="stack-toggle"
                                class:stack-active={settings[SETTINGS.SUMMONING_RENEWAL]?.value}
                                title="Summoning Renewal"
                                onclick={() => { settings[SETTINGS.SUMMONING_RENEWAL].value = !settings[SETTINGS.SUMMONING_RENEWAL].value; updateDamages(); }}
                            >
                                <img src="/effect_icons/Summoning_renewal_(4).png" alt="Summoning Renewal" class="w-7 h-7" />
                            </button>
                            <button type="button" class="stack-toggle"
                                class:stack-active={settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value && settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value !== SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE}
                                title="Spirit Weed Incense: {settings[SETTINGS.SPIRIT_WEED_INCENSE]?.options?.find(o => o.value === settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value)?.text ?? 'None'} (click to cycle)"
                                onclick={() => { const order = [SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL1, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL2, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL3, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL4]; const idx = order.indexOf(settings[SETTINGS.SPIRIT_WEED_INCENSE].value); settings[SETTINGS.SPIRIT_WEED_INCENSE].value = order[(idx + 1) % order.length]; updateDamages(); }}
                            >
                                <img src="/effect_icons/Spirit_weed_incense_sticks.png" alt="Spirit Weed Incense" class="w-7 h-7" />
                                {#if settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value && settings[SETTINGS.SPIRIT_WEED_INCENSE]?.value !== SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE}
                                    <span class="stack-count">{[SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL1, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL2, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL3, SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL4].indexOf(settings[SETTINGS.SPIRIT_WEED_INCENSE].value) + 1}</span>
                                {/if}
                            </button>
                            <button type="button" class="stack-toggle"
                                class:stack-active={settings[SETTINGS.PRISM_OF_RESTORATION]?.value}
                                title="Prism of Restoration"
                                onclick={() => { settings[SETTINGS.PRISM_OF_RESTORATION].value = !settings[SETTINGS.PRISM_OF_RESTORATION].value; updateDamages(); }}
                            >
                                <img src="/effect_icons/Prism_of_Restoration_icon.png" alt="Prism of Restoration" class="w-7 h-7" />
                            </button>
                        {/if}
                    </div>
                </div>
                
            {:else if tab === 'bosses'}
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Boss Preset</h5>
                    <div class="space-y-4">
                        <Select
                            bind:setting={settings[SETTINGS.BOSS_PRESET]}
                            onchange={() => onBossChange()}
                        />
                        {#if settings[SETTINGS.BOSS_PRESET]?.value && settings[SETTINGS.BOSS_PRESET].value !== 'none'}
                            {@const baseBoss = bossPresets[settings[SETTINGS.BOSS_PRESET].value]}
                            {@const boss = getEffectiveBoss(settings[SETTINGS.BOSS_PRESET].value)}
                            {#if boss}
                                {#if baseBoss?.enrage}
                                    <div class="flex items-center gap-2 pl-2">
                                        <label class="text-xs text-gray-400 whitespace-nowrap">{baseBoss.enrage.label}:</label>
                                        <input type="range"
                                            min={baseBoss.enrage.min}
                                            max={baseBoss.enrage.max}
                                            step={baseBoss.enrage.step ?? 1}
                                            bind:value={enrageValue}
                                            oninput={() => onEnrageChange()}
                                            class="flex-1 h-1 accent-red-500"
                                        />
                                        <input type="number"
                                            min={baseBoss.enrage.min}
                                            max={baseBoss.enrage.max}
                                            step={baseBoss.enrage.step ?? 1}
                                            bind:value={enrageValue}
                                            oninput={() => onEnrageChange()}
                                            class="w-16 text-xs text-center bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-white"
                                        />
                                    </div>
                                {/if}
                                <div class="text-xs text-gray-400 space-y-1 pl-2">
                                    <p>Defence: {boss.defenceLevel} | Armour tier: {boss.armour} ({armourFromTier(boss.armour)})</p>
                                    <p>Affinities — Melee: {Math.round(boss.affinities.melee * 100)}% | Ranged: {Math.round(boss.affinities.ranged * 100)}% | Magic: {Math.round(boss.affinities.magic * 100)}%</p>
                                    {#if boss.weakness !== 'None'}
                                        <p>Weakness: {boss.weakness} ({Math.round(boss.affinities.weakness * 100)}%)</p>
                                    {/if}
                                    {#if boss.health}
                                        {@const totalHeal = (boss.phases ?? []).reduce((sum, p) => sum + (p.heal || 0), 0)}
                                        <p>Health: {boss.health.toLocaleString()}{#if totalHeal > 0} (+ {totalHeal.toLocaleString()} heal = {(boss.health + totalHeal).toLocaleString()} total dmg){/if}</p>
                                    {/if}
                                    {#if settings[SETTINGS.FAMILIAR]?.value && settings[SETTINGS.FAMILIAR].value !== 'none'}
                                        <p class="text-amber-400">Familiar hit chance: {settings[SETTINGS.FAMILIAR_ACCURACY]?.value ?? '?'}%</p>
                                    {/if}
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Boss Settings</h5>
                    <div class="space-y-4">
                        <Number
                            bind:setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
                            step="1"
                            min="0"
                        />
                    </div>
                </div>
            {/if}
        </div>
    </form>
    {/if}
</div>

<style>
    .stack-toggle {
        position: relative;
        padding: 4px;
        border: 2px solid transparent;
        border-radius: 6px;
        opacity: 0.4;
        cursor: pointer;
        transition: all 0.15s ease;
        background: none;
    }
    .stack-count {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 0.6rem;
        font-weight: bold;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 3px;
        line-height: 1.2;
    }
    .stack-edit {
        position: absolute;
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        font-size: 0.7rem;
        text-align: center;
        background: #1e293b;
        color: white;
        border: 1px solid #4ade80;
        border-radius: 4px;
        z-index: 10;
        -moz-appearance: textfield;
    }
    .stack-edit::-webkit-inner-spin-button {
        display: none;
    }
    .stack-toggle:hover {
        opacity: 0.7;
    }
    .stack-active {
        opacity: 1;
        border-color: #4ade80;
    }
    .icon-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 20;
        background: #1e293b;
        border: 1px solid #4ade80;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        margin-top: 2px;
    }
    .gear-badge-img {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 14px;
        height: 14px;
        border-radius: 3px;
    }
    .stack-label {
        position: absolute;
        top: -2px;
        left: -2px;
        font-size: 0.5rem;
        font-weight: bold;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 3px;
        line-height: 1.2;
    }
    .icon-dropdown-item {
        display: block;
        width: 100%;
        padding: 4px 8px;
        text-align: left;
        font-size: 0.75rem;
        color: #ccc;
        background: none;
        border: none;
        cursor: pointer;
    }
    .icon-dropdown-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    .icon-dropdown-item.active {
        color: #4ade80;
        font-weight: bold;
    }
</style>