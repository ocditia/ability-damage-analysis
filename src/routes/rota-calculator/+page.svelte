<script>
	import Navbar from '$components/Layout/Navbar.svelte';
	import Header from '$components/Layout/Header.svelte';
	import { abilities } from '$lib/ranged/abilities';
	import { ranged_buff_abilities } from '$lib/ranged/buff_abilities';
	import { settingsConfig, SETTINGS } from '$lib/calc/settings';
	import Checkbox from '../../components/Settings/Checkbox.svelte';
	import Number from '../../components/Settings/Number.svelte';
	import Select from '../../components/Settings/Select.svelte';
	import { ABILITIES } from '$lib/calc/const.js';
	import { hit_damage_calculation, ability_damage_calculation } from '$lib/calc/damage_calc.js';

	let allAbilities = {...abilities, ...ranged_buff_abilities};

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

	function updateExpectedDamage() {
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

    // Calculate and sum damage for each ability
    let totalDamage = 0;
    function calculateTotalDamage() {
        totalDamage = 0;

        const adaptedSettings = Object.fromEntries(
            			Object.entries(settings).map(([key, value]) => [key, value.value])
            		);
		// TODO handle buffs that aren't present in ability damage calculator
        abilityBar.forEach(abilityKey => {
            if (abilityKey != null) {
				adaptedSettings['ability'] = abilityKey
                const damage = abilities[abilityKey].calc({ ...adaptedSettings })
                totalDamage += damage;
            }
        });
    }

    let abilityBar = Array(500).fill(null); // Empty slots on the bar

    //abilityBar[0] = "crystal rain"
    function handleDragStart(event, ability) {
        event.dataTransfer.setData('text/plain', ability);
    }

    function handleDrop(event, index) {
        event.preventDefault();
        const abilityKey = event.dataTransfer.getData("text/plain");

        // Find the first empty slot
        const emptyIndex = abilityBar.indexOf(null); // Assuming empty slots are represented by null
        if (emptyIndex !== -1 && allAbilities[abilityKey]) {
            abilityBar[emptyIndex] = abilityKey; // Place the dropped ability in the first empty slot
        }
    }

    function allowDrop(event) {
        event.preventDefault();
    }
</script>

<Navbar />
<Header img="/range_background.png" text="Ranged Rotation Calculator" icon="/style_icons/ranged-white.svg" />

<div class="space-y-14 mt-10 z-20">
	<div class="responsive-container">
		<section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
			<div class="xl:col-span-6 xl:row-start-1 xl:row-span-4">
				<div class="card card-ranged">
					<h1 class="main-header mb-6 ml-3">Rotation</h1>
					<div class="table-container">
                        <button on:click={calculateTotalDamage}>Calculate Damage</button>
                        <p>Total Damage: {totalDamage}</p>
					</div>
					<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-0 abilities">
                        {#each Object.entries(allAbilities) as [key, ability]}
                            <img
                                src={ability.icon}
                                alt={ability.title}
                                draggable="true"
                                on:dragstart={(e) => handleDragStart(e, key)}
                                title={ability.title}
                                class="ability-icon"
                            />
                        {/each}
                    </div>
                    <p> - </p>
                    <div class="ability-bar" style="display: grid; grid-template-columns: repeat(auto-fill, 30px); gap: 10px;">
                        {#if abilityBar.length === 0}
                            <p>No abilities added yet</p>
                            {#each Array(5) as _, index}
                                <div class="ability-slot empty-slot" style="width: 30px; height: 30px; border: 1px solid #ccc; background-color: #f0f0f0;"></div>
                            {/each}
                        {:else}
                            {#each abilityBar as ability, index}
                                <div
                                    class="ability-slot"
                                    on:drop={(e) => handleDrop(e, index)}
                                    on:dragover={allowDrop}
                                    style="width: 30px; height: 30px; border: 1px solid #ccc; display: flex; justify-content: center; align-items: center;"
                                >
                                    {#if ability}
                                        <img src={allAbilities[ability].icon} alt={allAbilities[ability].title} style="width: 100%; height: 100%;" />
                                    {/if}
                                </div>
                            {/each}
                        {/if}
                    </div>
				</div>
			</div>
		</section>
	</div>
</div>
