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


    settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH; 
    settings[SETTINGS.AMMO]['value'] = 'wen arrows';
    settings[SETTINGS.ICY_PRECISION]['value'] = 0;
    settings[SETTINGS.BALANCE_BY_FORCE]['value'] = false;


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
    //makeNaked();
    // testPreset();
    //settings[SETTINGS.ICY_CHILL_STACKS].value = 10;
    updateDamages();

    
</script>

<div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-rotation">
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
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">General</h5>
                    <div class="space-y-4">
                        <Select
                            bind:setting={settings[SETTINGS.MODE]}
                            onchange={() => updateDamages()}
                        />
                        <Number
                            bind:setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/bolg_stacks.png"
                            step="1"
                            max="7"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.TARGET_SIZE]}
                            onchange={() => updateDamages()}
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
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Base damage</h5>
                    <div class="space-y-4">
                        <Number
                            bind:setting={settings[SETTINGS.ABILITY_DAMAGE]}
                            onchange={() => updateDamages()}
                            step="1"
                            max="9999"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RANGED_LEVEL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/ranged_level.png"step="1"
                            max="150"
                            min="1"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.REAPER_CREW]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/death.png"
                        />
                    </div>
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">
                        Invisible base damage
                    </h5>
                    <div class="space-y-4">
                        <Number
                            bind:setting={settings[SETTINGS.HIT_CHANCE]}
                            onchange={() => updateDamages()}
                            step="1"
                            max="100"
                            min="0"
                        />
                    </div>
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">
                        Ability specific
                    </h5>
                    <div class="space-y-4">
                        <Checkbox
                            bind:setting={settings[SETTINGS.WALKED_TARGET]}
                            onchange={() => updateDamages()}
                        />
                    </div>
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Additive</h5>
                    <div class="space-y-4">
                        <Number
                            bind:setting={settings[SETTINGS.STONE_OF_JAS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/stone_of_jas.png"step="1"
                            max="6"
                            min="0"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.DRACONIC_FRUIT]}
                            onchange={() => updateDamages()}img="/effect_icons/draconic_fruit.png"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RUBY_AURORA]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Ruby_Aurora_icon.webp"
                            step="1"
                            max="3"
                            min="0"
                        />
                    </div>
                </div>
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">
                        Multiplicative (shared)
                    </h5>
                    <div class="space-y-4">
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_PRAYER]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Prayer.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.REVENGE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/revenge.png"
                            step="1"
                            max="10"
                            min="0"
                        />
                    </div>
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Multiplicative (PvE)
                    </h5>
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
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Core</h5>
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
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
                    <Select
                        bind:setting={settings[SETTINGS.VULN]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.ENDURING_RUIN_BLEED]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/enduring_ruin.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/infernal_puzzlebox.png"
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.CRYPTBLOOM]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Cryptbloom_helm.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_UNDEAD]}
                        onchange={() => updateDamages()}
                        img="/ability_icons/special/Undead_Slayer_(ability).png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_DRAGON]}
                        onchange={() => updateDamages()}
                        img="/ability_icons/special/Dragon_Slayer_(ability).png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SLAYER_SIGIL_DEMON]}
                        onchange={() => updateDamages()}
                        img="/ability_icons/special/Demon_Slayer_(ability).png"
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
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Armour</h5>
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
                    <Select
                        bind:setting={settings[SETTINGS.FAMILIAR]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/familiar.png"
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
                        bind:setting={settings[SETTINGS.IMPATIENT]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Impatient.png"
                        max="4"
                        step="1"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Weapons</h5>
                    <Select
                        bind:setting={settings[SETTINGS.WEAPON]}
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
                        img="/effect_icons/ammo.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/shard_of_genesis.png"
                    />
                </div>
            {:else if tab === 'bosses'}
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
</div>