<script>
	import Navbar from '$components/Layout/Navbar.svelte';
	import { abilities } from '$lib/necromancy/abilities';
	import { settingsConfig, SETTINGS } from '$lib/necromancy/settings';
	import Checkbox from '../../components/Settings/Checkbox.svelte';
	import Number from '../../components/Settings/Number.svelte';
	import Select from '../../components/Settings/Select.svelte';

	let damages = Object.fromEntries(
		Object.entries(abilities).map(([key, value]) => [key, { ...value, regular: 0, ss: 0 }])
	);

	let tab = 'general';

    let settings = Object.fromEntries(
		Object.entries(settingsConfig).map(([key, value]) => [key, { ...value, key: key, value: value.default }])
	);

    function updateDamages(event) {
        console.log('update damages', settings);
        Object.values(damages).forEach(ability => {
            // ability.regular = ability.calc('dw', settings, 1);
            console.log(`Calcing damage for : ${ability}`);
        });
    }
</script>

<Navbar />

<div id="content" class="z-20">
	<div class="h-36 xl:h-80">
		<div class="responsive-container z-10 relative flex items-center h-full text-white">
			<div class="flex items-center md:items-center flex-row w-full mt-0 md:mb-12 lg:mb-0 lg:mt-0">
				<div class="w-1/12 xl:w-32 md:h-20 xl:h-32">
					<img class="icon-header mr-2 xl:mr-8" src="/style_icons/necro-white.svg" />
				</div>
				<h1 class="text-3xl md:text-4xl xl:text-6xl font-semibold ml-8 mb-0">
					Necromancy Calculator
				</h1>
			</div>
		</div>
		<div
			class="bg-gray-600 absolute top-0 left-0 w-full -z-1 h-96 md:h-72 xl:h-112 xl:mt-16 bg-bottom md:bg-top bg-cover"
			style="background-image:url(/necro_background.png)"
		></div>
	</div>
</div>

<div class="space-y-14 z-20">
	<div class="responsive-container">
		<section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
			<div class="xl:col-span-6 xl:row-start-1 xl:row-span-4 md:pt-6">
				<h1 class="main-header mb-6 ml-3">Damage Values</h1>
				<div class="card card-necro">
					<div class="table-container">
						<table>
							<thead>
								<tr>
									<th class="p-0 min-w-[30px]"></th>
									<th class="p-3 text-left">Ability</th>
									<th class="p-3 text-left">Regular</th>
									<th class="p-3 text-left">Split Soul</th>
								</tr>
							</thead>
							<tbody>
								{#each Object.entries(damages) as [key, damage] (key)}
									<tr>
										<td class="p-0"><img src={damage.icon} /></td>
										<td class="p-3 text-left">{damage.title}</td>
										<td class="p-3 text-left">{damage.regular}</td>
										<td class="p-3 text-left">{damage.ss}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-necro">
				<ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
					<li class="flex-grow me-2">
						<button
							on:click={() => (tab = 'general')}
							class:active={tab === 'general'}
							class="font-bold text-2xl text-link uppercase inline-block active">General</button
						>
					</li>
					<li class="flex-grow me-2">
						<button
							on:click={() => (tab = 'equipment')}
							class:active={tab === 'equipment'}
							class="font-bold text-2xl text-link uppercase inline-block">Equipment</button
						>
					</li>
					<li class="flex-grow me-2">
						<button
							on:click={() => (tab = 'bosses')}
							class:active={tab === 'bosses'}
							class="font-bold text-2xl text-link uppercase inline-block">Bosses</button
						>
					</li>
				</ul>
				<form class="w-full">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
						{#if tab === 'general'}
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Ability Damage</h5>
								<Select
                                    setting={settings[SETTINGS.MODE]}
                                    on:settingsUpdated={updateDamages}
								/>
								<Number
                                    setting={settings[SETTINGS.ABILITY_DAMAGE]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="9999"
									min="0"
								/>
								<Number
                                    setting={settings[SETTINGS.LEVEL]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="120"
									min="1"
								/>
								<Select
                                    setting={settings[SETTINGS.POTION]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Elder_overload_salve_(6).webp"
								/>
								<Number
                                    setting={settings[SETTINGS.HIT_CHANCE]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="100"
									min="1"
								/>
								<Number
                                    setting={settings[SETTINGS.NECROSIS_STACKS]}
                                    on:settingsUpdated={updateDamages}
									img="https://imgur.com/P88Qb7z.png"
									step="1"
									max="12"
									min="0"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.REAPER_CREW]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/death.png"
								/>
                                <Number
                                    setting={settings[SETTINGS.WEIRD_SETTING]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="100"
									min="1"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">On-Hit Main</h5>
								<Select
                                    setting={settings[SETTINGS.PRAYER]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Prayer.webp"
								/>
								<Number
                                    setting={settings[SETTINGS.RUBY_AURORA]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Ruby_Aurora_icon.webp"
									step="1"
									max="3"
									min="0"
								/>
								<Number
                                    setting={settings[SETTINGS.REVENGE]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Revenge.png"
									step="1"
									max="10"
									min="0"
								/>
								<Number
                                    setting={settings[SETTINGS.BERSERKERS_FURY]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Berserker's_Fury.webp"
									step="0.5"
									max="5.5"
									min="0.0"
								/>
								<Number
                                    setting={settings[SETTINGS.RUTHLESS_STACKS]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Ruthless.webp"
									step="1"
									max="5"
									min="0.0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">On-Hit Secondary</h5>
								<Select
                                    setting={settings[SETTINGS.SLAYER_HELM]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Full_slayer_helmet_(yellow).webp"
								/>
								<Select
                                    setting={settings[SETTINGS.GUARDHOUSE]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Guardhouse_(Tier_3).webp"
								/>
								<Number
                                    setting={settings[SETTINGS.GENOCIDAL]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/25px-Undead_Slayer.webp"
									step="0.5"
									max="5"
									min="0"
								/>
								<Number
                                    setting={settings[SETTINGS.RIPPER]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Binding_contract_(ripper_demon).webp"
									step="0.5"
									max="5"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
								<Select
                                    setting={settings[SETTINGS.AURA]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/aura.png"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.VULN]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Vulnerability_icon.webp"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.SMOKE_CLOUD]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Smoke_Cloud_icon.webp"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.CRYPTBLOOM]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Cryptbloom_helm.png"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.SLAYER_PERK]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/25px-Undead_Slayer.webp"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.SLAYER_SIGIL]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Undead_slayer_sigil_detail.png"
								/>
								<Checkbox
                                    setting={settings[SETTINGS.HAUNTED]}
                                    on:settingsUpdated={updateDamages}
									img="https://imgur.com/9U5ghz2.png"
								/>
								<Number
                                    setting={settings[SETTINGS.RAGE_STACKS]}
                                    on:settingsUpdated={updateDamages}
									img="https://i.imgur.com/9vRoWeK.png"
									step="1"
									max="25"
									min="0.0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Other</h5>
                                <Checkbox
                                    setting={settings[SETTINGS.NOPE]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Araxyte_spider.webp"
								/>
                                <Checkbox
                                    setting={settings[SETTINGS.KALG_PASSIVE]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Binding_contract_(kal'gerion_demon).webp"
								/>
                                <Checkbox
                                    setting={settings[SETTINGS.KALG_SPEC]}
                                    on:settingsUpdated={updateDamages}
									img="/effect_icons/Kal'gerion_Demon_scroll_(Crit-i-Kal).webp"
								/>
							</div>
                            <div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Custom Buffs</h5>
                                <Number
                                    setting={settings[SETTINGS.CUSTOM_ON_AD]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="999"
									min="0"
								/>
                                <Number
                                    setting={settings[SETTINGS.CUSTOM_ON_HIT]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="999"
									min="0"
								/>
                                <Number
                                    setting={settings[SETTINGS.CUSTOM_ON_NPC]}
                                    on:settingsUpdated={updateDamages}
									step="1"
									max="999"
									min="0"
								/>
                                <Number
                                    setting={settings[SETTINGS.CUSTOM_CRIT]}
                                    on:settingsUpdated={updateDamages}
                                    step="1"
                                    max="100"
                                    min="0"
                                />
                            </div>
						{:else if tab === 'equipment'}
							eq
						{:else if tab === 'bosses'}
							boss
						{/if}
					</div>
				</form>
			</div>

			<div class="xl:col-span-6 xl:row-start-2 xl:col-start-7">
				<div class="flex flex-col">
					<div class="card card-necro">
						<div class="card-title pb-5">User Guide</div>
						<div class="pb-5">
							<p>
								Ability damage is automatically calculated based on the settings you have selected,
								however, you can mannualy override it by entering a value other than zero in the
								setting field.
							</p>
						</div>
						<div class="pb-5">
							<p>
								The calculator prevents irrational settings from being selected, for example,
								revenge does nothing if you do not have mainhand + shield (Ms) as your selected
								weapon. Be sure to check all settings if effects are not giving the expected
								results.
							</p>
						</div>
						<div>
							<p>
								Certain value or stack based effects have higher bounds than what exists in the live
								game which we have done to allow for more freedom with testing.
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 
            <div class="xl:col-span-6 xl:row-start-1 xl:row-span-1">
                <div class="tabbed md:pt-24">
                    <input bind:group={tab} type="radio" value="general" id="tab-general" name="css-tabs">
                    <input bind:group={tab} type="radio" value="equipment" id="tab-equipment" name="css-tabs">
                    <input bind:group={tab} type="radio" value="bosses" id="tab-bosses" name="css-tabs">
                    <ul class="tabs desktop">
                        <li class="tab desktop flex-grow">
                            <label for="tab-general">General</label>
                        </li>
                        <li class="tab desktop flex-grow">
                            <label for="tab-equipment">Equipment</label>
                        </li>
                        <li class="tab desktop flex-grow">
                            <label for="tab-bosses">Bosses</label>
                        </li>
                    </ul>
                    <ul class="tabs meta-tabs">
                        {#if tab === 'general' }
                            <li class="tab meta-tab">
                            <label for="tab-General">General</label>
                            <div class="bg-[#171d21] meta-content">
                                <div class="settings-wrapper">
                                    <div class="settings-container">
                                        <div class="card-title mb-1">Ability Damage</div>
                                        <div class="effect-container">
                                            <p class="effect-text">Mode</p>
                                            <select class="js--setting dropdown-select" data-setting-name="minavgmax" id="minavgmax">
                                                <option value="avg" selected>Mean</option>
                                                <option value="min no crit">Min no crit</option>
                                                <option value="min crit">Min crit</option>
                                                <option value="max no crit">Max no crit</option>
                                                <option value="max crit">Max crit</option>
                                            </select>
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Ability Damage:</p>
                                            <input class="js--setting" data-setting-name="ability damage" type="number" id="ability damage" name="Ability Damage" step="1" value="0" max="9999" min="0">
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Base Necromancy Level:</p>
                                            <input class="js--setting" data-setting-name="level" type="number" id="level" name="Level" step="1" value="120" max="120" min="1">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Elder_overload_salve_(6).webp">
                                            <p class="effect-text">Potion:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="potion" id="potion">
                                                <option value="none">None</option>
                                                <option value="elder overload" selected>Elder overload</option>
                                                <option value="supreme overload">Supreme overload</option>
                                                <option value="overload">Overload</option>
                                                <option value="extreme necromancy">Extreme</option>
                                                <option value="super necromancy">Super</option>
                                                <option value="necromancy potion">Regular</option>
                                            </select>
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Hit chance:</p>
                                            <input class="js--setting" data-setting-name="hit chance" type="number" step="0.1" value="100" max="100" min="1">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/death.png">
                                            <p class="effect-text">Reaper Crew:</p>
                                            <input class="js--setting" data-setting-name="Reaper crew" type="checkbox" id="reaper crew" name="reaper crew" checked>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="https://imgur.com/P88Qb7z.png">
                                            <p class="effect-text">Necrosis stacks:</p>
                                            <input class="js--setting" data-setting-name="necrosis stacks" type="number" id="Necrosis stacks" name="Necrosis stacks" step="1" value="0" max="12" min="0.0">
                                        </div>
                                    </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">On-Hit Main</div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Prayer.webp">
                                            <p class="effect-text">Prayer:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="prayer" id="prayer">
                                                <option value="none">None</option>
                                                <option value="ruination" selected>Ruination</option>
                                                <option value="sorrow">Sorrow</option>
                                                <option value="sanctity">Sanctity</option>
                                                <option value="accelerated decay">Accelerated Decay</option>
                                                <option value="hastened decay">Hastened Decay</option>
                                                <option value="decay">Decay</option>
                                            </select>
                                        </div>  
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Ruby_Aurora_icon.webp">
                                            <p class="effect-text">Ruby Aurora:</p>
                                            <input class="js--setting" data-setting-name="Ruby aurora" type="number" id="ruby aurora" name="ruby aurora" step="1" value="0" max="3" min="0">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Revenge.png">
                                            <p class="effect-text">Revenge:</p>
                                            <input class="js--setting" data-setting-name="revenge stacks" type="number" id="revenge" name="revenge" step="1" value="0" max="10" min="0">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Berserker's_Fury.webp">
                                            <p class="effect-text">Dharok's Momento:</p>
                                            <input class="js--setting" data-setting-name="berserkers fury" type="number" id="berserkers fury" name="berserkers fury" step="0.5" value="0" max="5.5" min="0.0">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Ruthless.webp">
                                            <p class="effect-text">Ruthless Stacks:</p>
                                            <input class="js--setting" data-setting-name="ruthless stacks" type="number" id="ruthless stacks" name="ruthless stacks" step="1" value="0" max="5" min="0.0">
                                        </div>
                                    </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">On-Hit Secondary</div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Full_slayer_helmet_(yellow).webp">
                                            <p class="effect-text">Slayer Helm:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="slayer helmet" id="slayer helmet">
                                                <option value="none" selected>None</option>
                                                <option value="slayer helmet">Regular</option>
                                                <option value="full slayer helmet">Full</option>
                                                <option value="reinforced slayer helmet">Reinforced</option>
                                                <option value="strong slayer helmet">Strong</option>
                                                <option value="mighty slayer helmet">Mighty</option>
                                                <option value="corrupted slayer helmet">Corrupted</option>
                                            </select>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Guardhouse_(Tier_3).webp">
                                            <p class="effect-text">Guardhouse:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="fort forinthry guardhouse" id="fort forinthry guardhouse">
                                                <option value="none" selected>None</option>
                                                <option value="level 1">Level 1</option>
                                                <option value="level 1 - undead">Level 1 with undead target</option>
                                                <option value="level 3">Level 3 with target under 25%</option>
                                                <option value="level 3 - undead">Level 3 with undead target under 25%</option>
                                            </select>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/25px-Undead_Slayer.webp">
                                            <p class="effect-text">Genocidal:</p>
                                            <input class="js--setting" data-setting-name="genocidal percent" type="number" id="genocidal" name="genocidal" step="0.5" value="0" max="5" min="0">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Binding_contract_(ripper_demon).webp">
                                            <p class="effect-text">Ripper Passive:</p>
                                            <input class="js--setting" data-setting-name="ripper demon passive" type="number" id="ripper demon passive" name="ripper demon passive" step="0.5" value="0" max="5.0" min="0.0">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Scripture_of_Ful.webp">
                                            <p class="effect-text">Ful Proc:</p>
                                            <input class="js--setting" data-setting-name="ful" type="checkbox">
                                        </div>
                                    </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">On-NPC</div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Vulnerability_icon.webp">
                                            <p class="effect-text">Vulnerability:</p>
                                            <input class="js--setting" data-setting-name="vulnerability" type="checkbox" id="vulnerability" name="vulnerability" checked>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Smoke_Cloud_icon.webp">
                                            <p class="effect-text">Smoke Cloud:</p>
                                            <input class="js--setting" data-setting-name="smoke cloud" type="checkbox" id="smoke cloud" name="smoke cloud" checked>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Cryptbloom_helm.png">
                                            <p class="effect-text">Cryptbloom Vuln:</p>
                                            <input class="js--setting" data-setting-name="death spores" type="checkbox" id="death spores" name="death spores">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/25px-Undead_Slayer.webp">
                                            <p class="effect-text">Slayer Perk:</p>
                                            <input class="js--setting" data-setting-name="slayer perk" type="checkbox" id="slayer perk" name="slayer perk">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Undead_slayer_sigil_detail.png">
                                            <p class="effect-text">Slayer Sigil:</p>
                                            <input class="js--setting" data-setting-name="slayer sigil" type="checkbox" id="slayer sigil" name="slayer sigil">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="https://i.imgur.com/9vRoWeK.png">
                                            <p class="effect-text">Skeleton rage stacks:</p>
                                            <input class="js--setting" data-setting-name="skeleton rage stacks" type="number" id="skeleton rage stack" name="skeleton rage stack" step="1" value="0" max="25" min="0.0">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="https://imgur.com/9U5ghz2.png">
                                            <p class="effect-text">Haunted:</p>
                                            <input class="js--setting" data-setting-name="haunted" type="checkbox" id="haunted" name="haunted">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/aura.png">
                                            <p class="effect-text">Aura:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="aura" id="aura">
                                                <option value="none">None</option>
                                                <option value="mahjarrat" selected>Mahjarrat</option>
                                                <option value="equilibrium">Equilibrium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">Other</div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Araxyte_spider.webp">
                                            <p class="effect-text">Nope Nope Nope:</p>
                                            <input class="js--setting" data-setting-name="nopenopenope" type="checkbox" id="nopenopenope" name="nopenopenope">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Binding_contract_(kal'gerion_demon).webp">
                                            <p class="effect-text">Kalg Passive:</p>
                                            <input class="js--setting" data-setting-name="kalgerion demon familiar" type="checkbox" id="kalgerion demon familiar" name="kalgerion demon familiar">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Kal'gerion_Demon_scroll_(Crit-i-Kal).webp">
                                            <p class="effect-text">Crit-i-Kal Spec:</p>
                                            <input class="js--setting" data-setting-name="crit-i-kal" type="checkbox" id="crit-i-kal" name="crit-i-kal" checked>
                                        </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">Custom Buffs</div>
                                        <div class="effect-container">
                                            <p class="effect-text">Additional on AD buff:</p>
                                            <input class="js--setting" data-setting-name="custom on ad" type="number" id="custom on ad" name="custom on ad" step="1" value="0" min="0" max="999">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Additional on-hit buff:</p>
                                            <input class="js--setting" data-setting-name="custom on-hit" type="number" id="custom on-hit" name="custom on-hit" step="1" value="0" min="0" max="999">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Additional on-npc buff:</p>
                                            <input class="js--setting" data-setting-name="custom on-npc" type="number" id="custom on-npc" name="custom on-npc" step="1" value="0" min="0" max="999">
                                            <p class="effect-text">%</p>
                                        </div>
                                        <div class="effect-container">
                                            <p class="effect-text">Additional crit chance::</p>
                                            <input class="js--setting" data-setting-name="custom crit chance" type="number" id="custom crit chance" name="custom crit chance" step="1" value="0" min="0" max="999">
                                            <p class="effect-text">%</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </li>
                        {:else if tab === 'equipment'}
                            <li class="tab meta-tab">
                            <label for="tab-Equipment">Equipment</label>
                            <div class="bg-[#171d21] meta-content">
                                <div class="settings-wrapper">
                                    <div class="settings-container left">
                                        <div class="card-title mb-1">Armour</div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Head_slot.webp">
                                            <p class="effect-text">Helmet:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="helmet" id="helmet">
                                                <option value="none">None/Tank</option>
                                                <option value="crown of the first necromancer" selected>TFN</option>
                                                <option value="deathdealer hood (tier 90)">t90 deathdealer</option>
                                                <option value="deathdealer hood (tier 80)">t80 deathdealer</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Torso_slot.png">
                                            <p class="effect-text">Body:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="body" id="body">
                                                <option value="none">None/Tank</option>
                                                <option value="robe top of the first necromancer" selected>TFN</option>
                                                <option value="deathdealer robe top (tier 90)">t90 deathdealer</option>
                                                <option value="deathdealer robe top (tier 80)">t80 deathdealer</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Legs_slot.png">
                                            <p class="effect-text">Legs:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="leg" id="leg">
                                                <option value="none">None/Tank</option>
                                                <option value="robe bottom of the first necromancer" selected>TFN</option>
                                                <option value="deathdealer robe bottom (tier 90)">t90 deathdealer</option>
                                                <option value="deathdealer robe bottom (tier 80)">t80 deathdealer</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Hands_slot.webp">
                                            <p class="effect-text">Gloves:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="gloves" id="gloves">
                                                <option value="none">None/Tank</option>
                                                <option value="hand wraps of the first necromancer" selected>TFN</option>
                                                <option value="deathdealer gloves (tier 90)">t90 deathdealer</option>
                                                <option value="deathdealer gloves (tier 80)">t80 deathdealer</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Feet_slot.png">
                                            <p class="effect-text">Boots:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="boots" id="boots">
                                                <option value="none">None/Tank</option>
                                                <option value="foot wraps of the first necromancer" selected>TFN</option>
                                                <option value="deathdealer boots (tier 90)">t90 deathdealer</option>
                                                <option value="deathdealer boots (tier 80)">t80 deathdealer</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Neck_slot.png">
                                            <p class="effect-text">Necklace:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="necklace" id="necklace">
                                                <option value="none">None/Tank</option>
                                                <option value="essence of finality amulet (or)" selected>EOF(or)</option>
                                                <option value="essence of finality amulet">EOF</option>
                                                <option value="conjurers raising amulet">Moonstone amulet</option>
                                                <option value="amulet of souls (or)">AOS(or)</option>
                                                <option value="amulet of souls">AOS</option>
                                                <option value="reaper (or)">Reaper(or)</option>
                                                <option value="reaper necklace">Reaper</option>
                                                <option value="salve amulet (e)">Salve (e)</option>
                                                <option value="salve amulet">salve</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Back_slot.png">
                                            <p class="effect-text">Cape:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="cape" id="cape">
                                                <option value="none">None</option>
                                                <option value="igneous kal-mor" selected>Zuk</option>
                                                <option value="tokhaar-kal-mor">Kiln</option>
                                                <option value="completionist">Comp cape</option>
                                                <option value="god cape">God cape</option>
                                                <option value="max cape">Max cape</option>
                                                <option value="skill cape">Skill cape</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Ring_slot.png">
                                            <p class="effect-text">Ring:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="ring" id="ring">
                                                <option value="none">None</option>
                                                <option value="reavers" selected>Reaver's</option>
                                                <option value="zorgoths soul ring" selected>Zorgoth's</option>
                                                <option value="ring of death (i)">ROD (i)</option>
                                                <option value="ring of death">ROD</option>
                                                <option value="asylum surgeon ring (i)">ASR (i)</option>
                                                <option value="asylum surgeon ring">ASR</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Pocket_slot.webp">
                                            <p class="effect-text">Pocket:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="pocket slot" id="pocket slot">
                                                <option value="none">None</option>
                                                <option value="grimoire" selected>Grimoire</option>
                                                <option value="scripture of ful">Ful</option>
                                                <option value="scripture of jas">Jas</option>
                                                <option value="scripture of wen">Wen</option>
                                                <option value="illuminated god book">Illuminated god book</option>
                                                <option value="god book">God book</option>
                                            </select>
                                        </div>
                                        <div class="card-title mb-1">Weapons</div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Main_hand_slot.webp">
                                            <p class="effect-text">Mh:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="main-hand weapon" id="main-hand weapon">
                                                <option value="none">None</option>
                                                <option value="omni guard" selected>Omni Guard</option>
                                                <option value="death guard (tier 90)">Death guard (t90)</option>
                                                <option value="death guard (tier 80)">Death guard (t80)</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Off-hand_slot.webp">
                                            <p class="effect-text">Oh:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="off-hand weapon" id="off-hand weapon">
                                                <option value="none">None</option>
                                                <option value="soulbound lantern" selected>Soulbound lantern</option>
                                                <option value="skull lantern (tier 90)">Skull lantern (t90)</option>
                                                <option value="skull lantern (tier 80)">Skull lantern (t80)</option>
                                            </select>
                                        </div>
                                        <div class="effect-container text-right">
                                            <img class="effect-icon" src="/armour_icons/Off-hand_slot.webp">
                                            <p class="effect-text">Shield:</p>
                                            <select class="js--setting dropdown-select" data-setting-name="shield" id="shield">
                                                <option value="none" >None</option>
                                                <option value="spectral shield" selected>Spectral</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="settings-container">
                                        <div class="card-title mb-1">Perks</div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/level-20.png">
                                            <p class="effect-text">Level 20 Armour:</p>
                                            <input class="js--setting" data-setting-name="level 20 armour" type="checkbox" id="level 20 armour" name="level 20 armour" checked>
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Biting.webp">
                                            <p class="effect-text">Biting:</p>
                                            <input class="js--setting" data-setting-name="biting" type="number" id="biting" name="biting" step="1" value="4" min="0" max="99">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Precise.webp">
                                            <p class="effect-text">Precise:</p>
                                            <input class="js--setting" data-setting-name="precise" type="number" id="precise" name="precise" step="1" value="6" min="0" max="99">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Eruptive.webp">
                                            <p class="effect-text">Eruptive:</p>
                                            <input class="js--setting" data-setting-name="eruptive" type="number" id="eruptive" name="eruptive" step="1" value="2" min="0" max="99">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Flanking.webp">
                                            <p class="effect-text">Flanking:</p>
                                            <input class="js--setting" data-setting-name="flanking" type="number" id="flanking" name="flanking" step="1" value="0" min="0" max="99">
                                            <div class="pl-1"></div>
                                            <input class="js--setting" data-setting-name="flanking position" type="checkbox" id="flanking" name="flanking">
                                        </div>
                                        <div class="effect-container">
                                            <img class="effect-icon" src="/effect_icons/Ruthless.webp">
                                            <p class="effect-text">Ruthless:</p>
                                            <input class="js--setting" data-setting-name="ruthless rank" type="number" id="ruthless rank" name="ruthless rank" step="1" value="0" min="0" max="99">
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                            </li>
                        {:else if tab === 'bosses'}
                            <li class="tab meta-tab">
                            <label for="tab-Boss">Boss</label>
                            <div class="bg-[#171d21] meta-content">
                                <div class="settings-wrapper">
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Red_virus.png">
                                        <p class="effect-text">Red Beam:</p>
                                        <input class="js--setting" data-setting-name="Telos red beam" type="checkbox" id="Telos red beam" name="Telos red beam">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Black_virus.png">
                                        <p class="effect-text">Black Beam:</p>
                                        <input class="js--setting" data-setting-name="Telos black beam" type="checkbox" id="Telos black beam" name="Telos black beam">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/TokKul-Zo_(Charged).png">
                                        <p class="effect-text">Tokkul-zo:</p>
                                        <input class="js--setting" data-setting-name="Tokkul-zo" type="checkbox" id="Tokkul-zo" name="Tokkul-zo">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/kbd.png">
                                        <p class="effect-text">KBD Artefact:</p>
                                        <input class="js--setting" data-setting-name="King black dragon wilderness portal" type="checkbox" id="King black dragon wilderness portal" name="King black dragon wilderness portal">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Inner_Chaos_(self_status).png">
                                        <p class="effect-text">Inner Chaos:</p>
                                        <input class="js--setting" data-setting-name="Zamorak inner chaos" type="checkbox" id="Zamorak inner chaos" name="Zamorak inner chaos">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Sword_of_Edicts_(self_status).png">
                                        <p class="effect-text">Sword of Edicts:</p>
                                        <input class="js--setting" data-setting-name="Zamorak sword of edicts" type="checkbox" id="Zamorak sword of edicts" name="Zamorak sword of edicts">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Guardian's_Triumph_Edict_(self_status).png">
                                        <p class="effect-text">Guardians Triumph:</p>
                                        <input class="js--setting" data-setting-name="Zamorak guardians triumph" type="number" id="Zamorak guardians triumph" name="Zamorak guardians triumph" step="1" value="0" min="0" max="6">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Balance_of_Power_Edict_(self_status).webp">
                                        <p class="effect-text">Balance of power:</p>
                                        <input class="js--setting" data-setting-name="Zamorak balance of power" type="number" id="Zamorak balance of power" name="Zamorak balance of power" step="1" value="0" min="0" max="6">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Choking_(self_status).png">
                                        <p class="effect-text">Zamorak choke stacks:</p>
                                        <input class="js--setting" data-setting-name="zamorak choke stacks" type="number" id="zamorak choke stacks" name="zamorak choke stacks" step="1" value="0" min="0" max="20">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Inner_Power_(self_status).webp">
                                        <p class="effect-text">Inner power (Raksha):</p>
                                        <input class="js--setting" data-setting-name="Raksha inner power" type="number" id="Raksha inner power" name="Raksha inner power" step="1" value="0" min="0" max="999">
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Stone_of_Jas_(status).webp">
                                        <p class="effect-text">Stone of Jas:</p>
                                        <input class="js--setting" data-setting-name="stone of jas" type="number" id="stone of jas" name="stone of jas" step="1" value="0" min="0" max="999">
                                        <p class="effect-text">%</p>
                                    </div>
                                    <div class="effect-container">
                                        <img class="effect-icon" src="/effect_icons/Infernal_Puzzle_Box.png">
                                        <p class="effect-text">Infernal Puzzle Box:</p>
                                        <input class="js--setting" data-setting-name="Infernal puzzle box" type="number" id="Infernal puzzle box" name="Infernal puzzle box" step="1" value="0" min="0" max="999">
                                        <p class="effect-text">%</p>
                                    </div>
                                </div>
                            </div>
                            </li>  
                        {/if}
                    </ul>
                </div>
            </div> -->
		</section>
	</div>
</div>

<style>
	.input {
		@apply bg-blue-500;
	}
</style>
