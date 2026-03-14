<script>
    import { onMount } from 'svelte';
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import TabButton from '../UI/TabButton.svelte';
    import GradientSeparator from '../UI/GradientSeparator.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings';
    import { SettingsCombatStyles } from '$lib/calc/rotation_builder/types/SettingsCombatStyles.ts';
    import { settingsStore, initializeSettings } from '$lib/stores/settingsStore.svelte.js';
    import { bossPresets, getBossPresetWithEnrage } from '$lib/familiars/boss_presets';
    import { familiars, calculateFamiliarHitChance } from '$lib/familiars/familiars';
    import '../../css/style.css';
    let { tab = 'general', styleTab = SettingsCombatStyles.RANGED, stacks, updateDamages, refreshUI, uiState } = $props();

    // Local reference to settings store
    let settings = $derived(settingsStore.settings);

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
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOF,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
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
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_GLOVES]: SETTINGS.MAGIC_GLOVES_VALUES.KWW_E,
                [SETTINGS.MAGIC_BOOTS]: SETTINGS.MAGIC_BOOTS_VALUES.BLAST_E,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOF,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.CHANNELER_E,
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
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.TMW,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.TMW,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.TMW,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.TMW,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.TMW,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOF,
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
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOF,
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
                        bind:setting={settings[SETTINGS.ABILITY_DAMAGE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="9999"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.REAPER_CREW]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/death.png"
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
                    <Checkbox
                        bind:setting={settings[SETTINGS.WALKED_TARGET]}
                        onchange={() => updateDamages()}
                    />
                </div>
                <div class="md:col-span-1 space-y-2">
                    <h5 class="uppercase font-bold text-lg text-center">Damage Buffs</h5>
                    {#if styleTab === SettingsCombatStyles.RANGED}
                        <Select
                                bind:setting={settings[SETTINGS.RANGED_PRAYER]}
                                onchange={() => updateDamages()}
                                img="/effect_icons/ranged_prayer.webp"
                        />
                    {:else if styleTab === SettingsCombatStyles.MAGIC}
                        <Select
                                bind:setting={settings[SETTINGS.MAGIC_PRAYER]}
                                onchange={() => updateDamages()}
                                img="/effect_icons/magic_prayer.webp"
                        />
                    {:else if styleTab === SettingsCombatStyles.MELEE}
                    <Select
                            bind:setting={settings[SETTINGS.MELEE_PRAYER]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/melee_prayer.webp"
                    />
                    {:else if styleTab === SettingsCombatStyles.NECROMANCY} 
                        <Select
                                bind:setting={settings[SETTINGS.NECRO_PRAYER]}
                                onchange={() => updateDamages()}
                                img="/effect_icons/necro_prayer.webp"
                        />
                    {/if}
                    <Select
                        bind:setting={settings[SETTINGS.SLAYER_HELM]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/slayer_helmet.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.GUARDHOUSE]}
                        onchange={() => updateDamages()}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/swiftness_of_the_avianse.png"
                    />
                    <Number
                            bind:setting={settings[SETTINGS.STONE_OF_JAS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/stone_of_jas.png"step="1"
                            max="6"
                            min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.BERSERKERS_FURY]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/berserkers_fury.png"
                        step="0.5"
                        max="5.5"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SMOKE_CLOUD]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/smoke_cloud.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.VULN]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.POISON]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/poison.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/infernal_puzzlebox.png"
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.NOPE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/nopenopenope.png"
                        step="1"
                        max="3"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Stacks</h5>
                    {#each Object.keys(stacks) as key}
                        {#if stacks[key].combatStyle === styleTab || stacks[key].combatStyle === SettingsCombatStyles.ALL}
                        <Checkbox
                            bind:setting={settings[stacks[key].displaySetting]}
                            img={stacks[key].image}
                            onchange={() => updateDamages()}
                        />
                        {/if}
                    {/each}
                    <Checkbox
                        bind:setting={settings[SETTINGS.CAP_ADRENALINE]}
                        onchange={() => refreshUI(false)}
                    />
                    {#if styleTab === SettingsCombatStyles.RANGED}
                    <Number
                        bind:setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/bolg_stacks.png"
                        step="1"
                        max="7"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ICY_CHILL_STACKS]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="10"
                        min="0"
                        img="/effect_icons/Icy_Chill.png"
                    />
                    {:else if styleTab === SettingsCombatStyles.MAGIC}
                        <Number
                            bind:setting={settings[SETTINGS.BLOOD_TITHE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/blood_tithe.png"
                            step="1"
                            max="12"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.ESSENCE_CORRUPTION]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/essence_corruption.png"
                            step="1"
                            max="100"
                            min="0"
                        />
                    {:else if styleTab === SettingsCombatStyles.MELEE}
                        <Number
                            bind:setting={settings[SETTINGS.PRIMORDIAL_ICE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/primordial_ice.png"
                            step="1"
                            max="10"
                            min="0"
                        />
                    {:else if styleTab === SettingsCombatStyles.NECROMANCY}
                        <Number
                            bind:setting={settings[SETTINGS.NECROSIS_STACKS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/necrosis.png"
                            step="1"
                            max="12"
                            min="0"
                        />
                    {/if}
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Adrenaline</h5>
                    <Checkbox
                        bind:setting={settings[SETTINGS.VIGOUR]}
                        onchange={() => updateDamages()}
                        img="/gear_icons/ring of vigour.png"

                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.FURY_OF_THE_SMALL]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Fury of the Small.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.CONSERVATION_OF_ENERGY]}
                        onchange={() => updateDamages()}

                        img="/effect_icons/Conservation of Energy.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.HEIGHTENED_SENSES]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Heightened Senses.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ADRENALINE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="150"
                        min="0"
                        img='/effect_icons/Crit_buff.png'
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.EXPECTED_ADRENALINE]}
                        onchange={() => updateDamages()}
                        img='settings_icons/Animal_trait_re-roller.png'
                    />
                </div>
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Armour</h5>
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
                        {#if styleTab === SettingsCombatStyles.RANGED}
                            <Select
                                bind:setting={settings[SETTINGS.RANGED_HELMET]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Head_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RANGED_BODY]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Torso_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RANGED_LEGS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Legs_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RANGED_GLOVES]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Hands_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RANGED_BOOTS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Feet_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECKLACE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Neck_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.CAPE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Back_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RING]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Ring_slot.png"
                            />
                        {:else if styleTab === SettingsCombatStyles.MAGIC}
                            <Select
                            bind:setting={settings[SETTINGS.MAGIC_HELMET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Head_slot.webp"
                              />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_BODY]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Torso_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_LEGS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Legs_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_GLOVES]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Hands_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_BOOTS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Feet_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECKLACE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Neck_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.CAPE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Back_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RING]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Ring_slot.png"
                            />
                            
                            <Select
                                bind:setting={settings[SETTINGS.AUTO_CAST]}
                                onchange={() => updateDamages()}
                            />
                        {:else if styleTab === SettingsCombatStyles.MELEE}
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_HELMET]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Head_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_BODY]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Torso_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_LEGS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Legs_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_GLOVES]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Hands_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_BOOTS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Feet_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECKLACE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Neck_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.CAPE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Back_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RING]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Ring_slot.png"
                            />

                            <Select
                                bind:setting={settings[SETTINGS.AUTO_CAST]}
                                onchange={() => updateDamages()}
                            />
                        {:else if styleTab === SettingsCombatStyles.NECROMANCY}
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_HELMET]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Head_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_BODY]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Torso_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_LEGS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Legs_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_GLOVES]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Hands_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_BOOTS]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Feet_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECKLACE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Neck_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.CAPE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Back_slot.png"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.RING]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Ring_slot.png"
                            />
                        {/if}
                        <Select
                            bind:setting={settings[SETTINGS.POCKET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Pocket_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AURA]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/aura.png"
                        />
                    </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Perks</h5>
                    <Checkbox
                        bind:setting={settings[SETTINGS.LVL20ARMOUR]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/level-20.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.BITING]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Biting.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.PRECISE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Precise.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ERUPTIVE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Eruptive.webp"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.CAROMING]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/caroming.png"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.FLANKING]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Flanking.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.GENOCIDAL]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/genocidal.png"
                        max="4.9"
                        step="0.1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RUTHLESS_RANK]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Ruthless.webp"
                        max="3"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RUTHLESS_STACKS]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Ruthless.webp"
                        max="5"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.AFTERSHOCK]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Aftershock.png"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.IMPATIENT]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Impatient.png"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/dragon_slayer_perk.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/demon_slayer_perk.webp"
                    />
                </div>   
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Weapons</h5>
                    {#if styleTab === SettingsCombatStyles.RANGED}
                        <Select
                            bind:setting={settings[SETTINGS.WEAPON_TYPE_RANGED]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_MH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_OH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_TH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.TH_TYPE_CUSTOM]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AMMO]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/ammo_type.png"
                            warning={getAmmoWarning(settings)}
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/shard_of_genesis.png"
                        />
                    {:else if styleTab === SettingsCombatStyles.MAGIC}
                        <div class="md:col-span-1">
                            <Select
                                bind:setting={settings[SETTINGS.WEAPON_TYPE_MAGE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Main_hand_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_MH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Main_hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_OH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Off-hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MAGIC_TH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Off-hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Checkbox
                                bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                                onchange={() => updateDamages()}
                                img="/effect_icons/shard_of_genesis.png"
                            />
                        </div>
                    {:else if styleTab === SettingsCombatStyles.MELEE}
                    <Select
                                bind:setting={settings[SETTINGS.WEAPON_TYPE_MELEE]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Main_hand_slot.webp"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_MH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Main_hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_OH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Off-hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.MELEE_TH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Off-hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                    {:else if styleTab === SettingsCombatStyles.NECROMANCY}
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_MH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Main_hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                            <Select
                                bind:setting={settings[SETTINGS.NECRO_OH]}
                                onchange={() => updateDamages()}
                                img="/armour_icons/Off-hand_slot.webp"
                            />
                            <Number
                                bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                                onchange={() => updateDamages()}
                                max="100"
                                step="1"
                                min="0"
                            />
                    {/if}
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Familiars</h5>
                    <Select
                            bind:setting={settings[SETTINGS.FAMILIAR]}
                            onchange={() => { recalcFamiliarAccuracy(); updateDamages(); }}
                            img="/effect_icons/familiar.png"
                        />
                        <Number
                                bind:setting={settings[SETTINGS.FAMILIAR_ACCURACY]}
                                onchange={() => updateDamages()}
                                img="/effect_icons/familiar.png"
                            />
                        <Checkbox
                            bind:setting={settings[SETTINGS.KALG_SPEC]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/crit_i_kal.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.USE_FAMILIAR_SCROLLS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/familiar_icons/Steel_Titan_scroll_(Steel_of_Legends).png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.SPIRIT_CAPE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Spirit_cape.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.SUMMONING_RENEWAL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Summoning_renewal_(4).png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.SPIRIT_WEED_INCENSE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Spirit_weed_incense_sticks.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.PRISM_OF_RESTORATION]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Prism_of_Restoration_icon.png"
                        />
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