<script>
    import { renderComponent } from '@tanstack/svelte-table';

    import { SETTINGS, settingsConfig } from '$lib/calc/settings_rb';
    import { abils } from '$lib/calc/const/const';
    import { calculateSingleAbilityDamage } from '$lib/calc/unified-damage-calculator';

    const abilities = Object.fromEntries(
        Object.entries(abils).filter(([, a]) =>
            a.title && a['main style'] === 'magic' &&
            a['ability classification'] !== 'conjure' &&
            a['ability classification'] !== 'self cast'
        )
    );

    import { SettingsCombatStyles } from '$lib/calc/rotation_builder/types/SettingsCombatStyles.ts';

    import AbilityDamageTable from '$components/AbilityDamageTable/AbilityDamageTable.svelte';
    import AbilityInfo from '$components/AbilityInfo/AbilityInfo.svelte';
    import GearSelection from '$components/Settings/GearSelection.svelte';
    import PerkSelection from '$components/Settings/PerkSelection.svelte';
    import FamiliarSelection from '$components/Settings/FamiliarSelection.svelte';
    import Checkbox from '$components/Settings/Checkbox.svelte';
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import Number from '$components/Settings/Number.svelte';
    import Select from '$components/Settings/Select.svelte';

    let openDropdown = $state(null);

    let tab = $state('general');

    let damages = $state(Object.entries(abilities).map(([key, value]) => ({
        key,
        ...value,
        abilityInfo: {
            title: value.title,
            src: value.icon
        },
        regular: 0,
        sunshine: 0,
    })));

    let storedSettings = {};
    if (typeof localStorage !== 'undefined') {
        storedSettings = JSON.parse(localStorage.getItem('settings_magic_rb')) || {};
    }

    let settings = $state(
        Object.fromEntries(
            Object.entries(settingsConfig).map(([key, value]) => [
                key,
                {
                    ...value,
                    key,
                    value: storedSettings[key]?.value ?? value.default?.magic ?? value.default
                }
            ])
        )
    );

    function saveSettings() {
        if (typeof localStorage !== 'undefined') {
            const settingsToSave = Object.fromEntries(
                Object.entries(settings).map(([key, value]) => [key, { value: value.value }])
            );
            localStorage.setItem('settings_magic_rb', JSON.stringify(settingsToSave));
        }
    }

    $effect(() => {
        if (settings) saveSettings();
    });

    const updateDamages = () => {
        const adaptedSettings = Object.fromEntries(
            Object.entries(settings).map(([key, value]) => [key, value.value])
        );

        damages = damages.map(ability => {
            adaptedSettings['ability'] = ability.key;

            const regular = calculateSingleAbilityDamage(adaptedSettings, {
                ability: ability.key
            });
            const sunshine = calculateSingleAbilityDamage(adaptedSettings, {
                ability: ability.key,
                buffs: { sunshine: true }
            });

            ability.regular = Math.round(regular.expected);
            ability.sunshine = Math.round(sunshine.expected);

            return ability;
        })
    }

    updateDamages()

    const sortAbilities = (rowA, rowB) => {
        const nameA = rowA.original.abilityInfo.title;
        const nameB = rowB.original.abilityInfo.title;
        return nameA.localeCompare(nameB);
    }

    const columns = [
        {
            accessorKey: 'abilityInfo',
            header: 'Ability',
            cell: ({ cell }) => renderComponent(AbilityInfo, { abilityInfo: cell.getValue() }),
            sortingFn: sortAbilities,
            sortDescFirst: false,
        },
        {
            accessorKey: 'regular',
            header: 'Regular',
            sortDescFirst: true,
            meta: {
                class: "text-center"
            }
        },
        {
            accessorKey: 'sunshine',
            header: 'Sunshine',
            sortDescFirst: true,
            meta: {
                class: "text-center"
            }
        },
    ];
</script>

<Navbar />
<Header img="/magic_background.png" text="Magic Calculator" icon="/style_icons/magic-white.svg" />

<div class="space-y-14 mt-10 z-20">
    <div class="responsive-container">
        <section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
            <div class="xl:col-span-6 xl:row-start-1 xl:row-span-4">
                <div class="card card-magic">
                    <h1 class="main-header mb-6 ml-3">Damage Values</h1>
                    <div class="table-container">
                        <AbilityDamageTable data={damages} columns={columns} />
                    </div>
                </div>
            </div>

            <div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-magic">
                <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
                    <li class="flex-grow me-2">
                        <button
                            onclick={() => (tab = 'general')}
                            class:text-[#968A5C]={tab === 'general'}
                            class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                        >
                            General
                        </button>
                    </li>
                    <li class="flex-grow me-2">
                        <button
                            onclick={() => (tab = 'equipment')}
                            class:text-[#968A5C]={tab === 'equipment'}
                            class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                        >
                            Equipment
                        </button>
                    </li>
                    <li class="flex-grow me-2">
                        <button
                            onclick={() => (tab = 'bosses')}
                            class:text-[#968A5C]={tab === 'bosses'}
                            class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                        >
                            Bosses
                        </button>
                    </li>
                </ul>
                <form class="w-full">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                        {#if tab === 'general'}
                            <div class="md:col-span-1 space-y-2">
                                <h5 class="uppercase font-bold text-lg text-center">General</h5>
                                <Select
                                    bind:setting={settings[SETTINGS.MODE]}
                                    onchange={() => updateDamages()}
                                />
                                <Select
                                    bind:setting={settings[SETTINGS.DAMAGE_PER_UNIT]}
                                    onchange={() => updateDamages()}
                                />
                                <Select
                                    bind:setting={settings[SETTINGS.DAMAGE_UNITS]}
                                    onchange={() => updateDamages()}
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.HIT_COUNTER_START]}
                                    onchange={() => updateDamages()}
                                    step="1"
                                    max="100"
                                    min="0"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.HIT_COUNTER_END]}
                                    onchange={() => updateDamages()}
                                    step="1"
                                    max="100"
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
                                <Checkbox
                                    bind:setting={settings[SETTINGS.INSTABILITY]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/instability.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/target_hp.png"
                                    step="1"
                                    max="100"
                                    min="0"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.MAGIC_LEVEL]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/magic.png"
                                    step="1"
                                    max="150"
                                    min="1"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.REAPER_CREW]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/death.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.HIT_CHANCE]}
                                    onchange={() => updateDamages()}
                                    step="1"
                                    max="100"
                                    min="0"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.HITCAP]}
                                    onchange={() => updateDamages()}
                                />
                            </div>
                            <div class="md:col-span-1 space-y-2">
                                <h5 class="uppercase font-bold text-lg text-center">
                                    Applies to dots
                                </h5>
                                <Select
                                    bind:setting={settings[SETTINGS.VULN]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/magic/Vulnerability_icon.webp"
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
                                <Select
                                    bind:setting={settings[SETTINGS.SLAYER_SIGIL]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/Undead_slayer_sigil_detail.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.NOPE]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/nopenopenope.png"
                                    step="1"
                                    max="3"
                                    min="0"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.HAUNTED]}
                                    onchange={() => updateDamages()}
                                    img="https://imgur.com/9U5ghz2.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.HAUNTED_AD]}
                                    onchange={() => updateDamages()}
                                    step="1"
                                    max="9999"
                                    min="0"
                                />
                                <Select
                                    bind:setting={settings[SETTINGS.CHAIN_MODIFIER]}
                                    onchange={() => updateDamages()}
                                /> 
                            </div>
                            <div class="md:col-span-1 space-y-2">
                                <h5 class="uppercase font-bold text-lg text-center">
                                    Applies to regular abilities only
                                </h5>
                                <Checkbox
                                    bind:setting={settings[SETTINGS.CONFLAGRATE]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/conflagrate.png"
                                />
                                <Select
                                    bind:setting={settings[SETTINGS.KERAPACS_WRIST_WRAPS]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/kerapac_wristwraps.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.CONCENTRATED_BLAST_STACKS]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/gconc.png"
                                    step="1"
                                    max="3"
                                    min="0"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.GCONC_UNLOCK]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/gconc.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.STONE_OF_JAS]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/stone_of_jas.png"
                                    step="1"
                                    max="6"
                                    min="0"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.DRACONIC_FRUIT]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/draconic_fruit.png"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.RUBY_AURORA]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/Ruby_Aurora_icon.webp"
                                    step="1"
                                    max="3"
                                    min="0"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.GRAVITATE]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/gravitate.png"
                                    step="1"
                                    max="20"
                                    min="0"
                                />
                                <Select
                                    bind:setting={settings[SETTINGS.MAGIC_PRAYER]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/Prayer.webp"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.DIVINE_RAGE]}
                                    onchange={() => updateDamages()}
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.ECLIPSED_SOUL]}
                                    onchange={() => updateDamages()}
                                />
                            </div>
                            <div class="md:col-span-1 space-y-2">
                                <h5 class="uppercase font-bold text-lg text-center">Part 2</h5>
                                <Number
                                    bind:setting={settings[SETTINGS.BLOOD_TITHE]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/blood_tithe.png"
                                    step="1"
                                    max="12"
                                    min="0"
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.REVENGE]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/revenge.png"
                                    step="1"
                                    max="10"
                                    min="0"
                                />
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
                                <Checkbox
                                    bind:setting={settings[SETTINGS.TUMEKENS_RESPLENDENCE_ASPHYX]}
                                    onchange={() => updateDamages()}
                                    img="/ability_icons/magic/30x30/asphyxiate.png"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.ANIMA_CHARGED]}
                                    onchange={() => updateDamages()}
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.BLAST_INFUSED]}
                                    onchange={() => updateDamages()}
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.COMBUSTED]}
                                    onchange={() => updateDamages()}
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.TELOS_RED_BEAM]}
                                    onchange={() => updateDamages()}
                                    img="effect_icons/Red_virus.png"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.TELOS_BLACK_BEAM]}
                                    onchange={() => updateDamages()}
                                    img="effect_icons/Black_virus.png"
                                />
                            </div>
                        {:else if tab === 'equipment'}
                            <div class="md:col-span-1">
                                <GearSelection {settings} styleTab={SettingsCombatStyles.MAGIC} {updateDamages} bind:openDropdown />
                            </div>
                            <div class="md:col-span-1">
                                <PerkSelection {settings} {updateDamages} />
                            </div>
                            <div class="md:col-span-1">
                                <FamiliarSelection {settings} {updateDamages} bind:openDropdown />
                            </div>
                        {:else if tab === 'bosses'}
                            <div class="md:col-span-1 space-y-2">
                                <Checkbox
                                    bind:setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                                    onchange={() => updateDamages()}
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.BALANCE_OF_POWER]}
                                    onchange={() => updateDamages()}
                                    img="/effect_icons/Balance_of_Power_Edict_(self_status).png"
                                    step="1"
                                    min="0"
                                    max="6"
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.SWORD_OF_EDICTS]}
                                    onchange={() => updateDamages()}
                                />
                                <Checkbox
                                    bind:setting={settings[SETTINGS.INNER_CHAOS]}
                                    onchange={() => updateDamages()}
                                />
                                <Number
                                    bind:setting={settings[SETTINGS.ZAMORAK_CHOKE_STACKS]}
                                    onchange={() => updateDamages()}
                                    step="1"
                                    min="0"
                                    max="20"
                                />
                            </div>
                        {/if}
                    </div>
                </form>
            </div>

            <div class="xl:col-span-6 xl:row-start-2 xl:col-start-7">
                <div class="flex flex-col">
                    <div class="card card-magic">
                        <div class="card-title pb-5">User Guide</div>
                        <div class="pb-5">
                            <p>
                                Ability damage is automatically calculated based on the settings you
                                have selected, however, you can manually override it by entering a
                                value other than zero in the setting field.
                            </p>
                        </div>
                        <div class="pb-5">
                            <p>
                                This page uses the unified rotation builder calculation pipeline.
                                Compare results with the original magic page to verify accuracy.
                            </p>
                        </div>
                        <div>
                            <p>
                                Certain value or stack based effects have higher bounds than what
                                exists in the live game which we have done to allow for more freedom
                                with testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
