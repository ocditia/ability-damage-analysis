<script>
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings';
    import { abilities } from '$lib/ranged/abilities';
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import RangedSettings from '../../components/Settings/RangedSettings.svelte';

    let damages = Object.fromEntries(
        Object.entries(abilities).map(([key, value]) => [
            key,
            { ...value, regular: 0, ss: 0, swift: 0, ssSwift: 0 }
        ])
    );

    let tab = 'general';

    let settings = Object.fromEntries(
        Object.entries(settingsConfig).map(([key, value]) => [
            key,
            { ...value, key: key, value: value.default }
        ])
    );

    updateDamages();

    function updateDamages() {
        const adaptedSettings = Object.fromEntries(
            Object.entries(settings).map(([key, value]) => [key, value.value])
        );

        Object.entries(damages).forEach(([abilityKey, ability]) => {
            adaptedSettings['ability'] = abilityKey;

            adaptedSettings['split soul'] = false;
            adaptedSettings['death swiftness'] = false;
            damages[abilityKey].regular = ability.calc({ ...adaptedSettings });

            adaptedSettings['split soul'] = true;
            adaptedSettings['death swiftness'] = false;
            damages[abilityKey].ss = ability.calc({ ...adaptedSettings });

            adaptedSettings['split soul'] = false;
            adaptedSettings['death swiftness'] = true;
            damages[abilityKey].swift = ability.calc({ ...adaptedSettings });

            adaptedSettings['split soul'] = true;
            adaptedSettings['death swiftness'] = true;
            damages[abilityKey].ssSwift = ability.calc({ ...adaptedSettings });
        });
    }
</script>

<Navbar />
<Header img="/range_background.png" text="Ranged Calculator" icon="/style_icons/ranged-white.svg" />

<div class="space-y-14 mt-10 z-20">
    <div class="responsive-container">
        <section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
            <div class="xl:col-span-6 xl:row-start-1 xl:row-span-4">
                <div class="card card-ranged">
                    <h1 class="main-header mb-6 ml-3">Damage Values</h1>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th class="p-0 min-w-[30px]"></th>
                                    <th class="p-3 text-left">Ability</th>
                                    <th class="p-3 text-left">Regular</th>
                                    <th class="p-3 text-left">ECB</th>
                                    <th class="p-3 text-left">Swift</th>
                                    <th class="p-3 text-left">Swift + ECB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each Object.entries(damages) as [key, damage] (key)}
                                    <tr>
                                        <td class="p-0"><img src={damage.icon} alt="" /></td>
                                        <td class="p-3 text-left">{damage.title}</td>
                                        <td class="p-3 text-left">{damage.regular}</td>
                                        <td class="p-3 text-left">{damage.ss}</td>
                                        <td class="p-3 text-left">{damage.swift}</td>
                                        <td class="p-3 text-left">{damage.ssSwift}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <RangedSettings settings={settings} updateDamages={updateDamages}/>
            <div class="xl:col-span-6 xl:row-start-2 xl:col-start-7">
                <div class="flex flex-col">
                    <div class="card card-ranged">
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
                                The calculator prevents irrational settings from being selected, for
                                example, revenge does nothing if you do not have mainhand + shield
                                (Ms) as your selected weapon. Be sure to check all settings if
                                effects are not giving the expected results.
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
