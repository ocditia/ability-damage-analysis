<script>
	import Navbar from '$components/Layout/Navbar.svelte';
	import Header from '$components/Layout/Header.svelte';
	import { abilities  as r_dmg_abilities } from '$lib/ranged/abilities';
	import { ranged_buff_abilities } from '$lib/ranged/buff_abilities';
    import { abilities as magic_dmg_abilities } from '$lib/magic/abilities';
    import { abilities as melee_dmg_abilities } from '$lib/melee/abilities';
    import { abilities as necro_dmg_abilities } from '$lib/necromancy/abilities';
	import { settingsConfig, SETTINGS } from '$lib/calc/settings';
	import Checkbox from '../../components/Settings/Checkbox.svelte';
	import Number from '../../components/Settings/Number.svelte';
	import Select from '../../components/Settings/Select.svelte';
	import { ABILITIES, abils } from '$lib/calc/const.js';
	import { hit_damage_calculation, ability_damage_calculation, get_rotation } from '$lib/calc/damage_calc.js';
	import { 
        calc_on_cast, rotation_on_npc, rotation_ability_damage, handle_ranged_buffs, 
        handle_edraco, handle_sgb, calc_channelled_hit 
    } from '$lib/calc/rotation_damage_helper.js';
    import RangedSettings from '../../components/Settings/RangedSettings.svelte';
    import AbilityChoice from '../../components/RotationBuilder/AbilityChoice.svelte';


    let necroAbils = {...necro_dmg_abilities};
    let meleeAbils = {...melee_dmg_abilities};
    let magicAbils = {...magic_dmg_abilities};
	let rangedAbils = {...r_dmg_abilities, ...ranged_buff_abilities};
    let allAbils = {...magicAbils, ...rangedAbils, ...necroAbils, ...meleeAbils};
    let abilityTab = 'ranged';
	let settings = Object.fromEntries(
		Object.entries(settingsConfig).map(([key, value]) => [
			key,
			{ ...value, key: key, value: value.default }
		])
	);
    const adaptedSettings = Object.fromEntries(
        Object.entries(settings).map(([key, value]) => [key, value.value])
    );
    let totalDamage = 0;	
	function calculateTotalDamage2() {
		let dmgs = [];
		totalDamage = 0;
		
        const adaptedSettings = Object.fromEntries(
            			Object.entries(settings).map(([key, value]) => [key, value.value])
            		);
		const settingsCopy = structuredClone(adaptedSettings);
		
		let tick = 0;  // TODO implement ticks properly
		let damageTracker = {};
		let timers = {}; 
		let hit_delay = 1; //TODO actually implement this
		let gcd = 0;
		let start_tick = tick;
		let end_tick = 1000; // random large number
		// Cast the ability - calculate up to core, then assign the damage 
		//object(s) to the tick(s) it(they) will land
		let finished = false;
		//TODO allow non ability actions
		//TODO change to ticks
        abilityBar.forEach(abilityKey => {
            if (abilityKey == null) return;
			//console.log('Ability: {'+abilityKey+'} - Dracolich infusion: {' + settingsCopy['dracolich infusion'] +
			//	'} - Split Soul: {' + settingsCopy['split soul'] + '} - Swiftness: {' + settingsCopy['death swiftness'] + '}');
            settingsCopy['ability'] = abilityKey;
            let channel_hits = [];
            start_tick = tick;
            let hit_tick = tick + hit_delay;
            damageTracker[hit_tick] ??= [];
            if (abilityKey in rangedAbils) {
                //Handle single-hit abilities
                if (rangedAbils[abilityKey].calc == hit_damage_calculation) {
                    let castDmgObject = calc_on_cast(settingsCopy);
                    castDmgObject['non_crit']['ability'] = abilityKey;
                    damageTracker[hit_tick].push(castDmgObject);
                    //Handle bolg here maybe?
                    if (abilityKey == 'crystal rain') {
                        handle_sgb(settingsCopy, castDmgObject, damageTracker, hit_tick);
                    }
                }
                //Handle multi-hit and channelled abilities
                else if (abils[abilityKey]['ability classification'] == 'channel') {
                        channel_hits = { ...abils[abilityKey]['hits']};
                    }
                    //Bleeds, multi-hits and dots
                else {
                    let castDmgObjects = rotation_ability_damage(settingsCopy);
                        let i = 0;
                        castDmgObjects.forEach(hitsplat_dist => {
                            hitsplat_dist['non_crit']['ability'] = abilityKey;
                            let hit_tick_n = hit_tick + abils[abilityKey].hit_timings[i];
                            damageTracker[hit_tick_n] ??= [];
                            damageTracker[hit_tick_n].push(hitsplat_dist);
                            i++;
                        });
                }
            }
            if (abilityKey in ranged_buff_abilities) {
                handle_ranged_buffs(settingsCopy, timers, abilityKey);
            }
            let abil_duration = 3; //assume ability is 3t unless duration is explicitly specified
            if (abils[abilityKey]['duration']) {
                abil_duration = abils[abilityKey]['duration'] ;
            }
            //Process hitsplats and decrement timers 
            let rota;
            if (isChannelled(settingsCopy, abilityKey)) {
                rota = get_rotation(settingsCopy);
            }
            for (let i = start_tick; i < start_tick + abil_duration; i++) {
                //Perform any necessary hits from chanelled abilities on this tick
                if (isChannelled(settingsCopy, abilityKey)) {
                    let dmgObject = calc_channelled_hit(settingsCopy, 1 + i - start_tick, rota, timers); //i+1 because hits are 1 indexed
                    dmgObject['non_crit']['ability'] = abilityKey;
                    let hit_tick = i + hit_delay;
                    (damageTracker[hit_tick] ??= []).push(dmgObject);;
                }

                if (Object.keys(timers).length > 0) {
                    for (let key in timers) {
                        timers[key] -= 1;
                        if (timers[key] < 0) {
                            settingsCopy[key] = false;
                        }
                    }
                }
                //Apply on npc modifiers to already queued damage for this to tick
                if (damageTracker[i]) {
                    damageTracker[i].forEach(namedDmgObject => {
                        settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
                        dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject));
                    });
                    console.log('Tick: (' + i + ')');
                    console.log(damageTracker[i]);
                    //console.log('Tick: (' + i + ') --- Total Damage: ' + dmgs.reduce((acc, current) => acc + current, 0));
                }
                tick += 1;
            }
            end_tick = tick;
        });
		//TODO remove this dogshit code and handle better 
		for (let i = end_tick; i < end_tick + 10; i++) {
					if (Object.keys(timers).length > 0) {
						for (let key in timers) {
							timers[key] -= 1;
							if (timers[key] < 0) {
								settingsCopy[key] = false;
							}
						}
					}
					if (damageTracker[i]) {
						damageTracker[i].forEach(namedDmgObject => {
							settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
							dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject));
						});
						console.log('Tick: (' + i + ') --- Total Damage: ' + dmgs.reduce((acc, current) => acc + current, 0));
					}
					tick += 1;
				}
		
		
		totalDamage = dmgs.reduce((acc, current) => acc + current, 0);
		console.log(totalDamage);
	}

    function isChannelled(settingsCopy, key) {
        return abils[key]['ability classification'] == 'channel';
    }

    let abilityBar = Array(500).fill(null); // Empty slots on the bar
	let tab = 'general'; // settings tab
    let selectedTab = 'general';

	// abilityBar[0] = "greater death\'s swiftness";
	// abilityBar[1] = "split soul ecb";
	// abilityBar[2] = "rapid fire";
	// abilityBar[3] = "crystal rain";
	// abilityBar[4] = "snap shot";
	// abilityBar[5] = "greater ricochet";
	// abilityBar[6] = "descent of darkness";
	// abilityBar[7] = "shadow tendrils";
	
    abilityBar[0] = "rapid fire";
	//abilityBar[1] = "crystal rain";
	let abilityBarIndex = 0;
	let buffTimings = {'swiftness': [], 'sunshine': [], 'berserk': [], 'split soul ecb': [], 'crit buff': []}; //tracks when buffs are active for drawing visual indicator
    //UI functions
    function handleAbilityClick(event, abilityKey) {

		abilityBar[abilityBarIndex] = abilityKey;
		
		// console.log('Key = ' + abilityKey);
		// console.log('Key = ' + ABILITIES['GREATER_DEATHS_SWIFTNESS']);
		// console.log(abilityKey == ABILITIES['GREATER_DEATHS_SWIFTNESS']);
		//TODO implement sunshine and other buffs
		if (abilityKey == ABILITIES['GREATER_DEATHS_SWIFTNESS']) {
			buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex+63]);
		}
		else if (abilityKey == ABILITIES['DEATHS_SWIFTNESS']) {
			buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex+52]);
		}
		else if (abilityKey == ABILITIES['SPLIT_SOUL_ECB']) {
			buffTimings['split soul ecb'].push([abilityBarIndex, abilityBarIndex+25]);
		}
		buffTimings = {...buffTimings};
		if (abils[abilityKey]['duration']) {
			abilityBarIndex += abils[abilityKey]['duration'];
		}
		else {
			abilityBarIndex += 3;
		}
    }

	function buffActive(key, index) {
		let active = false; 
		//Find which tick(s) this buff is used on, and if the current tick
		//is within the buff duration for any of the uses
		buffTimings[key].forEach(element => {
			if (index >= element[0] && index < element[1]) {
				active = true; // todo return early if possible
			}
		});
		let x = abilityBar[0] == null; //THIS IS REQUIRED TO FORCE THE ROTATION TO RERENDER
		//TODO rewrite this 
		return active
	}

    function handleDragStart(event, ability) {
        event.dataTransfer.setData('text/plain', ability);
		//TODO rethink drag - it kinda sucks compared to clicking to add
    }

    function handleDrop(event, index) {
        event.preventDefault();
        const abilityKey = event.dataTransfer.getData("text/plain");
		if (rangedAbils[abilityKey]) {
			abilityBar[index] = abilityKey;
		}
		//TODO rethink drag - it kinda sucks compared to clicking to add
    }

    function allowDrop(event) {
        event.preventDefault();
    }

	function clearRotation() {
		for (let i = 0; i < abilityBar.length; i++) {
			abilityBar[i] = null;
		}
		totalDamage = 0;
		abilityBarIndex = 0;
		//Reset the visual indicators for buffs
		for (let key in buffTimings) {
			if (buffTimings.hasOwnProperty(key)) {
				buffTimings[key] = []; // Reset each key to an empty array
			}
		}
	}
</script>

<Navbar />
<Header img="/range_background.png" text="Rotation Calculator" icon="/style_icons/ranged-white.svg" />

<div class="space-y-14 mt-10 z-20">
	<div class="responsive-container">
		<section class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
			<div class="xl:col-span-6 xl:row-start-1 xl:row-span-4">
				<div class="card card-ranged">
					<h1 class="main-header mb-6 ml-3">Rotation</h1>
                    <div class="table-container">
						<button on:click={clearRotation}>Reset</button>
						<br>
                        <button on:click={calculateTotalDamage2}>Calculate Damage</button>
                        <p>Total Damage: {totalDamage}</p>
					</div>
                    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
                        <li class="flex-grow me-2">
                            <button
                                on:click={() => (abilityTab = 'magic')}
                                class:text-[#968A5C]={abilityTab === 'magic'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                                >Magic</button
                            >
                        </li>
                        <li class="flex-grow me-2">
                            <button
                                on:click={() => (abilityTab = 'melee')}
                                class:text-[#968A5C]={abilityTab === 'melee'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                                >Melee</button
                            >
                        </li>
                        
                        <li class="flex-grow me-2">
                            <button
                                on:click={() => (abilityTab = 'ranged')}
                                class:text-[#968A5C]={abilityTab === 'ranged'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                                >Ranged</button
                            >
                        </li>
                        <li class="flex-grow me-2">
                            <button
                                on:click={() => (abilityTab = 'necro')}
                                class:text-[#968A5C]={abilityTab === 'necro'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                                >Necro</button
                            >
                        </li>
                    </ul>
					
                    {#if abilityTab === 'ranged'}
                        <AbilityChoice abilities={rangedAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'magic'}
                        <AbilityChoice abilities={magicAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'melee'}
                        <AbilityChoice abilities={meleeAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'necro'}
                        <AbilityChoice abilities={necroAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {/if}
                    <div class="ability-bar">		
						{#each abilityBar as ability, index}
							<div class="ability-slot"
									role="option"
									tabindex="0"
									aria-label="Ability slot"
									aria-selected={ability ? 'true' : 'false'}
									on:drop={(e) => handleDrop(e, index)}
									on:dragover={allowDrop}
							>
								<span class="cell-number">{index}</span>
								{#if ability}
									<img src={allAbils[ability].icon} alt={allAbils[ability].title} style="width: 100%; height: 100%;" />
								{/if}
								{#if buffActive('swiftness', index)}
									<div class="line-swiftness"></div>
								{/if}
								{#if buffActive('split soul ecb', index)}
									<div class="line-ecb"></div>
								{/if}
								
							</div>
						{/each}
					</div>
				</div>
			</div>
            <RangedSettings settings={settings}/>
		</section>
	</div>
</div>

<style>
	/* TODO - move these into their own css file */
	.ability-bar {
		display: grid; 
		grid-template-columns: repeat(auto-fill, 30px); 
		row-gap: 30px; 
		column-gap: 0px; 
		position: relative;
	}

	.ability-slot {
        position: relative;
		width: 30px; 
		height: 30px; 
		display: flex; 
		justify-content: center; 
		align-items: center; 
		position: relative; 
		border: 1px solid #878787; 
		box-sizing: border-box;
    }

	.line-swiftness {
		position: absolute;
		bottom: -6px;
		left: -1px;
		width: 32px;
		height: 4px;
		background-color: #00bf63; /* Dashed line color */
		box-sizing: border-box;
	}

	.line-ecb {
		position: absolute;
		bottom: -11px;
		left: -1px;
		width: 32px;
		height: 4px;
		background-color: #9303ec; /* Dashed line color */
	}

	.ability-bar {
		padding-top: 25px;
	}

    .cell-number {
        position: absolute;
        top: -18px; /* Adjust to move the number above the cell */
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px; /* Adjust size of the number */
        color: #a8a8a8; /* Adjust color of the number */
	}
</style>
