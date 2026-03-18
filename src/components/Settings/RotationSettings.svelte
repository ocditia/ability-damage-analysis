<script>
    import { onMount } from 'svelte';
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import GearSelection from '../../components/Settings/GearSelection.svelte';
    import PerkSelection from '../../components/Settings/PerkSelection.svelte';
    import FamiliarSelection from '../../components/Settings/FamiliarSelection.svelte';
    import TabButton from '../UI/TabButton.svelte';
    import GradientSeparator from '../UI/GradientSeparator.svelte';
    import { SETTINGS } from '$lib/calc/settings_rb';
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
        

    // function debugPreset() {
    //     const armour = [
    //         SETTINGS.RANGED_HELMET,
    //         SETTINGS.RANGED_BODY,
    //         SETTINGS.RANGED_LEGS,
    //         SETTINGS.RANGED_GLOVES,
    //         SETTINGS.RANGED_BOOTS,
    //         SETTINGS.MAGIC_HELMET,
    //         SETTINGS.MAGIC_BODY,
    //         SETTINGS.MAGIC_LEGS,
    //         SETTINGS.MAGIC_GLOVES,
    //         SETTINGS.MAGIC_BOOTS,
    //         SETTINGS.MELEE_HELMET,
    //         SETTINGS.MELEE_BODY,
    //         SETTINGS.MELEE_LEGS,
    //         SETTINGS.MELEE_GLOVES,
    //         SETTINGS.MELEE_BOOTS,
    //         SETTINGS.NECKLACE,
    //         SETTINGS.CAPE,
    //         SETTINGS.RING,
    //         SETTINGS.POCKET,
    //         SETTINGS.AURA,
    //         SETTINGS.FAMILIAR,
    //     ]
    //     armour.forEach(armour => {
    //         settings[armour]['value'] = 'none';
    //     });
    //     settings[SETTINGS.MAGIC_TH]['value'] = SETTINGS.MAGIC_TH_VALUES.CUSTOM;
    //     settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 90;
    //     settings[SETTINGS.MAGIC_PRAYER]['value'] = SETTINGS.MAGIC_PRAYER_VALUES.NONE;
    //     settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.DW;

    //     settings[SETTINGS.LVL20ARMOUR]['value'] = false;
    //     settings[SETTINGS.BITING]['value'] = 0;
    //     settings[SETTINGS.ERUPTIVE]['value'] = 0;
    //     settings[SETTINGS.PRECISE]['value'] = 0;
    //     settings[SETTINGS.AFTERSHOCK]['value'] = 0;
    //     settings[SETTINGS.CAROMING]['value'] = 0;
        
        
    //     settings[SETTINGS.VULN]['value'] = SETTINGS.VULN_VALUES.NONE;

    //     settings[SETTINGS.MAGIC_LEVEL]['value'] = 99;
    //     settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
    //     settings[SETTINGS.STRENGTH_LEVEL]['value'] = 99;
    //     settings[SETTINGS.REAPER_CREW]['value'] = false;
    //     settings[SETTINGS.RANGED_PRAYER]['value'] = SETTINGS.RANGED_PRAYER_VALUES.NONE;
    //     settings[SETTINGS.MELEE_PRAYER]['value'] = SETTINGS.MELEE_PRAYER_VALUES.NONE;
    //     settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
    //     settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;

    //     settings[SETTINGS.INNATE_MASTERY]['value'] = true;
    //     settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MIN_NO_CRIT;
    //     settings[SETTINGS.KALG_SPEC]['value'] = false;
    //     settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.CUSTOM;

    //     settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
    //     settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 80;
    //     settings[SETTINGS.WEAPON_TYPE_MELEE]['value'] = SETTINGS.WEAPON_VALUES.TH;
    // }

    // function debugPreset2() {
    //     const armour = [
    //         SETTINGS.RANGED_HELMET,
    //         SETTINGS.RANGED_BODY,
    //         SETTINGS.RANGED_LEGS,
    //         SETTINGS.RANGED_GLOVES,
    //         SETTINGS.RANGED_BOOTS,
    //         SETTINGS.MAGIC_HELMET,
    //         SETTINGS.MAGIC_BODY,
    //         SETTINGS.MAGIC_LEGS,
    //         SETTINGS.MAGIC_GLOVES,
    //         SETTINGS.MAGIC_BOOTS,
    //         SETTINGS.MELEE_HELMET,
    //         SETTINGS.MELEE_BODY,
    //         SETTINGS.MELEE_LEGS,
    //         SETTINGS.MELEE_GLOVES,
    //         SETTINGS.MELEE_BOOTS,
    //         SETTINGS.NECKLACE,
    //         SETTINGS.CAPE,
    //         SETTINGS.RING,
    //         SETTINGS.POCKET,
    //         SETTINGS.AURA,
    //         SETTINGS.FAMILIAR,
    //     ]
    //     armour.forEach(armour => {
    //         settings[armour]['value'] = 'none';
    //     });
    //     settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
    //     settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 85;
    //     settings[SETTINGS.MELEE_PRAYER]['value'] = SETTINGS.MELEE_PRAYER_VALUES.NONE;
    //     settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH;

    //     settings[SETTINGS.LVL20ARMOUR]['value'] = true;
    //     settings[SETTINGS.BITING]['value'] = 4;
    //     settings[SETTINGS.ERUPTIVE]['value'] = 0;
    //     settings[SETTINGS.PRECISE]['value'] = 0;
    //     settings[SETTINGS.AFTERSHOCK]['value'] = 0;
    //     settings[SETTINGS.CAROMING]['value'] = 0;
        
        
    //     settings[SETTINGS.VULN]['value'] = SETTINGS.VULN_VALUES.NONE;

    //     settings[SETTINGS.MAGIC_LEVEL]['value'] = 99;
    //     settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
    //     settings[SETTINGS.STRENGTH_LEVEL]['value'] = 99;
    //     settings[SETTINGS.REAPER_CREW]['value'] = false;
    //     settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
    //     settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;

    //     settings[SETTINGS.INNATE_MASTERY]['value'] = false;
    //     settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MEAN;
    //     settings[SETTINGS.KALG_SPEC]['value'] = false;

    //     settings[SETTINGS.MELEE_TH]['value'] = SETTINGS.MELEE_TH_VALUES.CUSTOM;
    //     settings[SETTINGS.WEAPON_TYPE_MELEE]['value'] = SETTINGS.WEAPON_VALUES.TH;
    //     settings[SETTINGS.NATURAL_INSTINCT]['value'] = true;

    //     // settings[SETTINGS.CHAOS_ROAR]['value'] = true;
    // }

    // function testPreset() {
    //     settings[SETTINGS.RANGED_GLOVES]['value'] = SETTINGS.RANGED_GLOVES_VALUES.CINDERS;
    //     settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;
    //     settings[SETTINGS.POCKET]['value'] = SETTINGS.POCKET_VALUES.JAS;

    //     settings[SETTINGS.LVL20ARMOUR]['value'] = false;
    //     settings[SETTINGS.BITING]['value'] = 3;
    //     settings[SETTINGS.ERUPTIVE]['value'] = 0;

    //     //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
    //     settings[SETTINGS.REAPER_CREW]['value'] = false;
    //     settings[SETTINGS.RANGED_PRAYER]['value'] = SETTINGS.RANGED_PRAYER_VALUES.ANGUISH;
    //     settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
    //     settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    // }

    // function testPresetR() {
    //     settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;

    //     //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
    //     settings[SETTINGS.REAPER_CREW]['value'] = false;
    //     settings[SETTINGS.RING]['value'] = SETTINGS.RING_VALUES.STALKER_E;
    //     settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    // }
    // function testPreset2() {
    //     settings[SETTINGS.MAGIC_HELMET]['value'] = SETTINGS.MAGIC_HELMET_VALUES.TECTONIC;
    //     settings[SETTINGS.MAGIC_BODY]['value'] = SETTINGS.MAGIC_BODY_VALUES.TECTONIC;
    //     settings[SETTINGS.MAGIC_LEGS]['value'] = SETTINGS.MAGIC_LEGS_VALUES.TECTONIC;
    //     settings[SETTINGS.MAGIC_GLOVES]['value'] = SETTINGS.MAGIC_GLOVES_VALUES.KWW;
    //     settings[SETTINGS.MAGIC_BOOTS]['value'] = SETTINGS.MAGIC_BOOTS_VALUES.BLAST;

    //     settings[SETTINGS.NECKLACE]['value'] = SETTINGS.NECKLACE_VALUES.EOF;
    //     settings[SETTINGS.REAPER_CREW]['value'] = false;
    //     settings[SETTINGS.AMMO]['value'] = SETTINGS.AMMO_VALUES.WEN_ARROWS;
    // }
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
                    <GearSelection {settings} {styleTab} {updateDamages} bind:openDropdown />
                </div>
                <div class="md:col-span-1">
                    <PerkSelection {settings} {updateDamages} />
                </div>
                <div class="md:col-span-1">
                    <FamiliarSelection {settings} {updateDamages} bind:openDropdown onFamiliarChange={recalcFamiliarAccuracy} />
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
                                    {#if baseBoss?.phases?.some(p => p.attackPattern)}
                                        <div class="flex items-center gap-2 mt-2">
                                            <label class="text-xs text-gray-400 whitespace-nowrap">Pattern start tick:</label>
                                            <input type="number"
                                                min="0"
                                                step="1"
                                                bind:value={settings[SETTINGS.BOSS_PATTERN_START].value}
                                                class="w-16 text-xs text-center bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-white"
                                            />
                                        </div>
                                        {#each baseBoss.phases as phase, i}
                                            {#if phase.attackPattern}
                                                <p class="text-purple-400 text-xs">P{i + 1}: {phase.attackPattern.cycle.map(a => a.label ?? a.name).join(' → ')}</p>
                                            {/if}
                                        {/each}
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