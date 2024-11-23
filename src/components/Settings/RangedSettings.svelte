<script>
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings';
    export let tab = 'general'; // Options as props
    export let settings;
    export let updateDamages; 

    // let { tab, settings, updateDamages } = $props();


    settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH; 
    //settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.HEX_E;

    //settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.HEX_E;
    


    function makeNaked() {
        settings[SETTINGS.RANGED_HELMET]['value'] = 'none';
        settings[SETTINGS.RANGED_BODY]['value'] = 'none';
        settings[SETTINGS.RANGED_LEGS]['value'] = 'none';
        settings[SETTINGS.RANGED_GLOVES]['value'] = 'none';
        settings[SETTINGS.RANGED_BOOTS]['value'] = 'none';
        settings[SETTINGS.NECKLACE]['value'] = 'none';
        settings[SETTINGS.CAPE]['value'] = 'none';
        settings[SETTINGS.RING]['value'] = 'none';
        settings[SETTINGS.POCKET]['value'] = 'none';
        settings[SETTINGS.AURA]['value'] = 'none';
        settings[SETTINGS.FAMILIAR]['value'] = 'none';

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 0;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;
        settings[SETTINGS.VULN]['value'] = 'none';

        settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = 'none ranged';
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = 'wen arrows';//'none';
        
        settings[SETTINGS.TH_TIER_CUSTOM]['value'] = 92;
        settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.CUSTOM;
        settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MIN_NO_CRIT;
        
    }

    function testPreset() {
        settings[SETTINGS.RANGED_GLOVES]['value'] = 'cinderbane gloves';
        settings[SETTINGS.NECKLACE]['value'] = 'essence of finality amulet';
        settings[SETTINGS.POCKET]['value'] = 'scripture of jas';
        settings[SETTINGS.AURA]['value'] = 'reckless';

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 3;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;

        //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = 'anguish';
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = 'wen arrows';//'none';
        
        
    }
    makeNaked();
    //testPreset();
    //settings[SETTINGS.ICY_CHILL_STACKS].value = 10;
    updateDamages();

    
</script>

<div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-ranged">
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <li class="flex-grow me-2">
            <button
                on:click={() => (tab = 'general')}
                class:text-[#968A5C]={tab === 'general'}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                >General</button
            >
        </li>
        <li class="flex-grow me-2">
            <button
                on:click={() => (tab = 'equipment')}
                class:text-[#968A5C]={tab === 'equipment'}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                >Equipment</button
            >
        </li>
        <li class="flex-grow me-2">
            <button
                on:click={() => (tab = 'bosses')}
                class:text-[#968A5C]={tab === 'bosses'}
                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                >Bosses</button
            >
        </li>
    </ul>
    <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {#if tab === 'general'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">General</h5>
                    <Select
                        bind:setting={settings[SETTINGS.MODE]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.BALANCE_BY_FORCE]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Number
                        bind:setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="7"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_SIZE]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="5"
                        min="0"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.DRACOLICH_INFUSION]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Base damage</h5>
                    <Number
                        bind:setting={settings[SETTINGS.ABILITY_DAMAGE]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="9999"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RANGED_LEVEL]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="150"
                        min="1"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.REAPER_CREW]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/death.png"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Invisible base damage
                    </h5>
                    <Number
                        bind:setting={settings[SETTINGS.HIT_CHANCE]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ICY_PRECISION]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="15"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Ability specific
                    </h5>
                    <Checkbox
                        bind:setting={settings[SETTINGS.WALKED_TARGET]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.NEEDLE_STRIKE]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Additive</h5>
                    <Number
                        bind:setting={settings[SETTINGS.STONE_OF_JAS]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.DRACONIC_FRUIT]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RUBY_AURORA]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Ruby_Aurora_icon.webp"
                        step="1"
                        max="3"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Multiplicative (shared)
                    </h5>
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_PRAYER]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Prayer.webp"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.REVENGE]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="10"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Multiplicative (PvE)
                    </h5>
                    <Select
                        bind:setting={settings[SETTINGS.SLAYER_HELM]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Select
                        bind:setting={settings[SETTINGS.GUARDHOUSE]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Core</h5>
                    <Number
                        bind:setting={settings[SETTINGS.BERSERKERS_FURY]}
                        on:settingsUpdated={updateDamages}
                        step="0.5"
                        max="5.5"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SMOKE_CLOUD]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
                    <Select
                        bind:setting={settings[SETTINGS.VULN]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.ENDURING_RUIN_BLEED]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Number
                        bind:setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.CRYPTBLOOM]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Cryptbloom_helm.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_UNDEAD]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_DRAGON]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_DEMON]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.NOPE]}
                        on:settingsUpdated={updateDamages}
                        step="1"
                        max="3"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.HAUNTED]}
                        on:settingsUpdated={updateDamages}
                        img="https://imgur.com/9U5ghz2.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.HAUNTED_AD]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Armour</h5>
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_HELMET]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Head_slot.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_BODY]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Torso_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_LEGS]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Legs_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_GLOVES]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Hands_slot.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_BOOTS]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Feet_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.NECKLACE]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Neck_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.CAPE]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Back_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RING]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Ring_slot.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.POCKET]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Pocket_slot.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.AURA]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Select
                        bind:setting={settings[SETTINGS.FAMILIAR]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Perks</h5>
                    <Checkbox
                        bind:setting={settings[SETTINGS.LVL20ARMOUR]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/level-20.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.BITING]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Biting.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.PRECISE]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Precise.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ERUPTIVE]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Eruptive.webp"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.CAROMING]}
                        on:settingsUpdated={updateDamages}
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.FLANKING]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Flanking.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.GENOCIDAL]}
                        on:settingsUpdated={updateDamages}
                        max="4.9"
                        step="0.1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RUTHLESS_RANK]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Ruthless.webp"
                        max="3"
                        step="1"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RUTHLESS_STACKS]}
                        on:settingsUpdated={updateDamages}
                        img="/effect_icons/Ruthless.webp"
                        max="5"
                        step="1"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Weapons</h5>
                    <Select
                        bind:setting={settings[SETTINGS.WEAPON]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_MH]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                        on:settingsUpdated={updateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_OH]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                        on:settingsUpdated={updateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.RANGED_TH]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                        on:settingsUpdated={updateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.TH_TYPE_CUSTOM]}
                        on:settingsUpdated={updateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.AMMO]}
                        on:settingsUpdated={updateDamages}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                        on:settingsUpdated={updateDamages}
                    />
                </div>
            {:else if tab === 'bosses'}
            <div class="md:col-span-1">
                <Number
                    bind:setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                    on:settingsUpdated={updateDamages}
                    img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
                    step="1"
                    min="0"
                />
            </div>
            {/if}
        </div>
    </form>
</div>