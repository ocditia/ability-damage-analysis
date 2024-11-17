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
                    />
                    <Checkbox
                        setting={settings[SETTINGS.BALANCE_BY_FORCE]}
                    />
                    <Number
                        setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                        step="1"
                        max="7"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.TARGET_SIZE]}
                        step="1"
                        max="5"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.DRACOLICH_INFUSION]}
                    />
                    <Number
                        setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                        step="1"
                        max="100"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Base damage</h5>
                    <Number
                        setting={settings[SETTINGS.ABILITY_DAMAGE]}
                        step="1"
                        max="9999"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RANGED_LEVEL]}
                        step="1"
                        max="150"
                        min="1"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.REAPER_CREW]}
                        img="/effect_icons/death.png"
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">
                        Invisible base damage
                    </h5>
                    <Number
                        setting={settings[SETTINGS.HIT_CHANCE]}
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.ICY_PRECISION]}
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
                    />
                    <Checkbox
                        setting={settings[SETTINGS.NEEDLE_STRIKE]}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Additive</h5>
                    <Number
                        setting={settings[SETTINGS.STONE_OF_JAS]}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.DRACONIC_FRUIT]}
                    />
                    <Number
                        setting={settings[SETTINGS.RUBY_AURORA]}
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
                        img="/effect_icons/Prayer.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.REVENGE]}
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
                    />
                    <Select
                        setting={settings[SETTINGS.GUARDHOUSE]}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Core</h5>
                    <Number
                        setting={settings[SETTINGS.BERSERKERS_FURY]}
                        step="0.5"
                        max="5.5"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SMOKE_CLOUD]}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
                    <Select
                        setting={settings[SETTINGS.VULN]}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.ENDURING_RUIN_BLEED]}
                    />
                    <Number
                        setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.CRYPTBLOOM]}
                        img="/effect_icons/Cryptbloom_helm.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                        img="/effect_icons/25px-Undead_Slayer.webp"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_UNDEAD]}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_DRAGON]}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.SLAYER_SIGIL_DEMON]}
                        img="/effect_icons/Undead_slayer_sigil_detail.png"
                    />
                    <Number
                        setting={settings[SETTINGS.NOPE]}
                        step="1"
                        max="3"
                        min="0"
                    />
                    <Checkbox
                        setting={settings[SETTINGS.HAUNTED]}
                        img="https://imgur.com/9U5ghz2.png"
                    />
                    <Number
                        setting={settings[SETTINGS.HAUNTED_AD]}
                    />
                </div>
            {:else if tab === 'equipment'}
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Armour</h5>
                    <Select
                        setting={settings[SETTINGS.RANGED_HELMET]}
                        img="/armour_icons/Head_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_BODY]}
                        img="/armour_icons/Torso_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_LEGS]}
                        img="/armour_icons/Legs_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_GLOVES]}
                        img="/armour_icons/Hands_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_BOOTS]}
                        img="/armour_icons/Feet_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.NECKLACE]}
                        img="/armour_icons/Neck_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.CAPE]}
                        img="/armour_icons/Back_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.RING]}
                        img="/armour_icons/Ring_slot.png"
                    />
                    <Select
                        setting={settings[SETTINGS.POCKET]}
                        img="/armour_icons/Pocket_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.AURA]}
                    />
                    <Select
                        setting={settings[SETTINGS.FAMILIAR]}
                    />
                </div>
                <div class="md:col-span-1">
                    <h5 class="uppercase font-bold text-lg text-center">Perks</h5>
                    <Checkbox
                        setting={settings[SETTINGS.LVL20ARMOUR]}
                        img="/effect_icons/level-20.png"
                    />
                    <Number
                        setting={settings[SETTINGS.BITING]}
                        img="/effect_icons/Biting.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.PRECISE]}
                        img="/effect_icons/Precise.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.ERUPTIVE]}
                        img="/effect_icons/Eruptive.webp"
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.CAROMING]}
                        max="4"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.FLANKING]}
                        img="/effect_icons/Flanking.webp"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.GENOCIDAL]}
                        max="4.9"
                        step="0.1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RUTHLESS_RANK]}
                        img="/effect_icons/Ruthless.webp"
                        max="3"
                        step="1"
                        min="0"
                    />
                    <Number
                        setting={settings[SETTINGS.RUTHLESS_STACKS]}
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
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_MH]}
                        img="/armour_icons/Main_hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_OH]}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.RANGED_TH]}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Number
                        setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                        max="100"
                        step="1"
                        min="0"
                    />
                    <Select
                        setting={settings[SETTINGS.TH_TYPE_CUSTOM]}
                        img="/armour_icons/Off-hand_slot.webp"
                    />
                    <Select
                        setting={settings[SETTINGS.AMMO]}
                    />
                    <Checkbox
                        setting={settings[SETTINGS.INNATE_MASTERY]}
                    />
                </div>
            {:else if tab === 'bosses'}
            <div class="md:col-span-1">
                <Number
                    setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                    img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
                    step="1"
                    min="0"
                />
            </div>
            {/if}
        </div>
    </form>
</div>