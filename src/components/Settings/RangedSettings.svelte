<script>
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings';
    export let tab = 'general'; // Options as props
    export let settings = Object.fromEntries(
        Object.entries(settingsConfig).map(([key, value]) => [
            key,
            { ...value, key: key, value: value.default }
        ])
    );
    export let updateDamages; 
    function tryUpdateDamages() {
        if (updateDamages) {
            updateDamages();
        }
    }

    settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH; 
    settings[SETTINGS.RANGED_TH]['value'] = SETTINGS.RANGED_TH_VALUES.HEX_E;
    //settings[SETTINGS.BALANCE_BY_FORCE]['value'] = false;
    tryUpdateDamages();

    
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
                        setting={settings[SETTINGS.MODE]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.BALANCE_BY_FORCE]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Number
                        setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="7"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.TARGET_SIZE]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="5"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.DRACOLICH_INFUSION]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Number
                        setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Base damage</h5>
                    <Number
                        setting={settings[SETTINGS.ABILITY_DAMAGE]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="9999"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RANGED_LEVEL]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="150"
                        min="1"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.REAPER_CREW]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/death.png"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Invisible base damage
                    </h5>
                    <Number
                        setting={settings[SETTINGS.HIT_CHANCE]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.ICY_PRECISION]}
                        on:settingsUpdated={tryUpdateDamages}
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
                        setting={settings[SETTINGS.WALKED_TARGET]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.NEEDLE_STRIKE]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Additive</h5>
                    <Number
                        setting={settings[SETTINGS.STONE_OF_JAS]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.DRACONIC_FRUIT]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Number
                        setting={settings[SETTINGS.RUBY_AURORA]}
                        on:settingsUpdated={tryUpdateDamages}
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
                        setting={settings[SETTINGS.RANGED_PRAYER]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Prayer.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.REVENGE]}
                        on:settingsUpdated={tryUpdateDamages}
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
                        setting={settings[SETTINGS.SLAYER_HELM]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Select
                        setting={settings[SETTINGS.GUARDHOUSE]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Core</h5>
                    <Number
                        setting={settings[SETTINGS.BERSERKERS_FURY]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="0.5"
                        max="5.5"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SMOKE_CLOUD]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
                    <Select
                        setting={settings[SETTINGS.VULN]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.ENDURING_RUIN_BLEED]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Number
                        setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.CRYPTBLOOM]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Cryptbloom_helm.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_UNDEAD]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_DRAGON]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_DEMON]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Number
                        setting={settings[SETTINGS.NOPE]}
                        on:settingsUpdated={tryUpdateDamages}
                        step="1"
                        max="3"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.HAUNTED]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="https://imgur.com/9U5ghz2.png"
                    />
                    <Number
                        setting={settings[SETTINGS.HAUNTED_AD]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Armour</h5>
                    <Select
                        setting={settings[SETTINGS.RANGED_HELMET]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Head_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_BODY]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Torso_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_LEGS]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Legs_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_GLOVES]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Hands_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_BOOTS]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Feet_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.NECKLACE]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Neck_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.CAPE]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Back_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RING]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Ring_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.POCKET]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Pocket_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.AURA]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Select
                        setting={settings[SETTINGS.FAMILIAR]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Perks</h5>
                    <Checkbox
                        setting={settings[SETTINGS.LVL20ARMOUR]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/level-20.png"
                    />
                    <Number
                        setting={settings[SETTINGS.BITING]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Biting.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.PRECISE]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Precise.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.ERUPTIVE]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Eruptive.webp"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.CAROMING]}
                        on:settingsUpdated={tryUpdateDamages}
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.FLANKING]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Flanking.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.GENOCIDAL]}
                        on:settingsUpdated={tryUpdateDamages}
                        max="4.9"
                        step="0.1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RUTHLESS_RANK]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Ruthless.webp"
                        max="3"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RUTHLESS_STACKS]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/effect_icons/Ruthless.webp"
                        max="5"
                        step="1"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Weapons</h5>
                    <Select
                        setting={settings[SETTINGS.WEAPON]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_MH]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                        on:settingsUpdated={tryUpdateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_OH]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                        on:settingsUpdated={tryUpdateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_TH]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                        on:settingsUpdated={tryUpdateDamages}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.TH_TYPE_CUSTOM]}
                        on:settingsUpdated={tryUpdateDamages}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.AMMO]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.INNATE_MASTERY]}
                        on:settingsUpdated={tryUpdateDamages}
                    />
                </div>
            {:else if tab === 'bosses'}
            <div class="md:col-span-1">
                <Number
                    setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                    on:settingsUpdated={tryUpdateDamages}
                    img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
                    step="1"
                    min="0"
                />
            </div>
            {/if}
        </div>
    </form>
</div>