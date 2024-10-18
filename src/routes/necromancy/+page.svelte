<script>
	import Navbar from '$components/Layout/Navbar.svelte';
	import Header from '$components/Layout/Header.svelte';
	import { abilities } from '$lib/necromancy/abilities';
	import { settingsConfig, SETTINGS } from '$lib/calc/settings';
	import Checkbox from '../../components/Settings/Checkbox.svelte';
	import Number from '../../components/Settings/Number.svelte';
	import Select from '../../components/Settings/Select.svelte';

	let damages = Object.fromEntries(
		Object.entries(abilities).map(([key, value]) => [key, { ...value, regular: 0, ss: 0 }])
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
			damages[abilityKey].regular = ability.calc({ ...adaptedSettings });

			adaptedSettings['split soul'] = true;
			damages[abilityKey].ss = ability.calc({ ...adaptedSettings });
		});
	}
</script>

<Navbar />
<Header
	img="/necro_background.png"
	text="Necromancy Calculator"
	icon="/style_icons/necro-white.svg"
/>

<div class="space-y-14 mt-10 z-20">
	<div class="responsive-container">
		<section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
			<div class="xl:col-span-6 xl:row-start-1 xl:row-span-4">
				<div class="card card-necro">
					<h1 class="main-header mb-6 ml-3">Damage Values</h1>
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
										<td class="p-0"><img src={damage.icon} alt="" /></td>
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
							<Select setting={settings[SETTINGS.MODE]} on:settingsUpdated={updateDamages} />
						</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Base damage</h5>
								<Number
									setting={settings[SETTINGS.ABILITY_DAMAGE]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="9999"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.NECROMANCY_LEVEL]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="150"
									min="1"
								/>
								<Checkbox
									setting={settings[SETTINGS.REAPER_CREW]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/death.png"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Invisible base damage</h5>
								<Number
									setting={settings[SETTINGS.HIT_CHANCE]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="100"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Ability specific</h5>
								<Checkbox
									setting={settings[SETTINGS.DEATH_SPARK]}
									on:settingsUpdated={updateDamages}
								/>
								<Checkbox
									setting={settings[SETTINGS.LIVING_DEATH]}
									on:settingsUpdated={updateDamages}
								/>
								<Number
									setting={settings[SETTINGS.SKELETON_WARRIOR_RAGE_STACKS]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="25"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Style specific</h5>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Additive</h5>
								<Number
									setting={settings[SETTINGS.STONE_OF_JAS]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="6"
									min="0"
								/>
								<Checkbox
									setting={settings[SETTINGS.DRACONIC_FRUIT]}
									on:settingsUpdated={updateDamages}
								/>
								<Select
									setting={settings[SETTINGS.ENDURING_RUIN_HIT]}
									on:settingsUpdated={updateDamages}
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
									setting={settings[SETTINGS.GRAVITATE]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="20"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Multiplicative (shared)</h5>
								<Select
									setting={settings[SETTINGS.NECROMANCY_PRAYER]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Prayer.webp"
								/>
								<Number
									setting={settings[SETTINGS.REVENGE]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="10"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Multiplicative (PvE)</h5>
								<Select
									setting={settings[SETTINGS.SLAYER_HELM]}
									on:settingsUpdated={updateDamages}
								/>
								<Select
									setting={settings[SETTINGS.GUARDHOUSE]}
									on:settingsUpdated={updateDamages}
								/>
								<Checkbox
									setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
									on:settingsUpdated={updateDamages}
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Core</h5>
								<Checkbox
									setting={settings[SETTINGS.BERSERKERS_FURY]}
									on:settingsUpdated={updateDamages}
								/>
								<Checkbox
									setting={settings[SETTINGS.SMOKE_CLOUD]}
									on:settingsUpdated={updateDamages}
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">On-NPC</h5>
								<Select
									setting={settings[SETTINGS.VULN]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Vulnerability_icon.webp"
								/>
								<Select
									setting={settings[SETTINGS.ENDURING_RUIN_BLEED]}
									on:settingsUpdated={updateDamages}
								/>
								<Number
									setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="6"
									min="0"
								/>
								<Checkbox
									setting={settings[SETTINGS.CRYPTBLOOM]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Cryptbloom_helm.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/25px-Undead_Slayer.webp"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/25px-Undead_Slayer.webp"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/25px-Undead_Slayer.webp"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_SIGIL]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Undead_slayer_sigil_detail.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_DRAGON]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Undead_slayer_sigil_detail.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.SLAYER_DEMON]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Undead_slayer_sigil_detail.png"
								/>
								<Number
									setting={settings[SETTINGS.NOPE]}
									on:settingsUpdated={updateDamages}
									step="1"
									max="3"
									min="0"
								/>
								<Checkbox
									setting={settings[SETTINGS.HAUNTED]}
									on:settingsUpdated={updateDamages}
									img="https://imgur.com/9U5ghz2.png"
								/>
								<Number
									setting={settings[SETTINGS.HAUNTED_AD]}
									on:settingsUpdated={updateDamages}
								/>
							</div>
						{:else if tab === 'equipment'}
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Armour</h5>
								<Select
									setting={settings[SETTINGS.HELMET]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Head_slot.webp"
								/>
								<Select
									setting={settings[SETTINGS.BODY]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Torso_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.LEGS]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Legs_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.GLOVES]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Hands_slot.webp"
								/>
								<Select
									setting={settings[SETTINGS.BOOTS]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Feet_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.NECKLACE]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Neck_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.CAPE]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Back_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.RING]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Ring_slot.png"
								/>
								<Select
									setting={settings[SETTINGS.POCKET]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Pocket_slot.webp"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Perks</h5>
								<Checkbox
									setting={settings[SETTINGS.LVL20ARMOUR]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/level-20.png"
								/>
								<Number
									setting={settings[SETTINGS.BITING]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Biting.webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.PRECISE]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Precise.webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.ERUPTIVE]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Eruptive.webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.FLANKING]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Flanking.webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.GENOCIDAL]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Ruthless.webp"
									max="4.9"
									step="0.1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.RUTHLESS_RANK]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Ruthless.webp"
									max="3"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.RUTHLESS_STACKS]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Ruthless.webp"
									max ="5"
									step="1"
									min="0"
								/>
							</div>
							<div class="md:col-span-1">
								<h5 class="uppercase font-bold text-lg text-center">Weapons</h5>
								<Select
									setting={settings[SETTINGS.WEAPON]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Main_hand_slot.webp"
								/>
								<Select
									setting={settings[SETTINGS.MH]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Main_hand_slot.webp"
								/>
								<Select
									setting={settings[SETTINGS.OH]}
									on:settingsUpdated={updateDamages}
									img="/armour_icons/Off-hand_slot.webp"
								/>
							</div>
						{:else if tab === 'bosses'}
							<div class="md:col-span-1">
								<Checkbox
									setting={settings[SETTINGS.TELOS_RED_BEAM]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Red_virus.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.TELOS_BLACK_BEAM]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Black_virus.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.TOKKUL_ZO]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/TokKul-Zo_(Charged).png"
								/>
								<Checkbox
									setting={settings[SETTINGS.KBD_ARTEFACT]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/kbd.png"
								/>
								<Checkbox
									setting={settings[SETTINGS.INNER_CHAOS]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Inner_Chaos_(self_status).png"
								/>
								<Checkbox
									setting={settings[SETTINGS.SWORD_OF_EDICTS]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Sword_of_Edicts_(self_status).png"
								/>
								<Number
									setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.BALANCE_OF_POWER]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Balance_of_Power_Edict_(self_status).webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.ZAMORAK_CHOKE_STACKS]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Choking_(self_status).png"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.RAKSHA_INNER_POWER]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Inner_Power_(self_status).webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.STONE_OF_JAS]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Stone_of_Jas_(status).webp"
									step="1"
									min="0"
								/>
								<Number
									setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
									on:settingsUpdated={updateDamages}
									img="/effect_icons/Infernal_Puzzle_Box.png"
									step="1"
									min="0"
								/>
							</div>
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
		</section>
	</div>
</div>
