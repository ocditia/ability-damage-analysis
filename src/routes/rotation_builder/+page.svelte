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
	import { hit_damage_calculation, ability_damage_calculation, get_rotation, 
		style_specific_unification, calc_base_ad, get_user_value, apply_additional
	} from '$lib/calc/damage_calc.js';
	import { 
        calc_on_cast, rotation_on_npc, rotation_on_npc_test, rotation_ability_damage, handle_ranged_buffs, 
        handle_edraco, handle_sgb, calc_channelled_hit
    } from '$lib/calc/rotation_damage_helper.js';
    import RangedSettings from '../../components/Settings/RangedSettings.svelte';
    import AbilityChoice from '../../components/RotationBuilder/AbilityChoice.svelte';
	import { on_cast, on_hit, on_damage} from '$lib/calc/damage_calc_new.js';
	import { create_object } from '$lib/calc/object_helper.js';

	

	
    let necroAbils = {...necro_dmg_abilities};
    let meleeAbils = {...melee_dmg_abilities};
    let magicAbils = {...magic_dmg_abilities};
	let rangedAbils = {...r_dmg_abilities, ...ranged_buff_abilities};
    let allAbils = {...magicAbils, ...rangedAbils, ...necroAbils, ...meleeAbils};
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
	let damageByTick = [];
	let experimental_data = [];

	/**
	 * Deprecated - original implementation
	*/
	// function calculateTotalDamage() {
	// 	let dmgs = [];
	// 	totalDamage = 0;
    //     const adaptedSettings = Object.fromEntries(
    //         			Object.entries(settings).map(([key, value]) => [key, value.value])
    //         		);
	// 	const settingsCopy = structuredClone(adaptedSettings);
		
	// 	let tick = 0;  // TODO implement ticks properly
	// 	let damageTracker = {};
	// 	let timers = {}; 
	// 	let hit_delay = 1; //TODO actually implement this
	// 	let gcd = 0;
	// 	let start_tick = tick;
	// 	let end_tick = 1000; // random large number
	// 	let finished = false;
	// 	//TODO allow non ability actions
	// 	//TODO change to ticks
    //     abilityBar.forEach(abilityKey => {
    //         if (abilityKey == null) return;
	// 		//console.log('Ability: {'+abilityKey+'} - Dracolich infusion: {' + settingsCopy['dracolich infusion'] +
	// 		//	'} - Split Soul: {' + settingsCopy['split soul'] + '} - Swiftness: {' + settingsCopy['death swiftness'] + '}');
    //         settingsCopy['ability'] = abilityKey;
    //         let channel_hits = [];
    //         start_tick = tick;
    //         let hit_tick = tick + hit_delay;
    //         damageTracker[hit_tick] ??= [];
    //         if (abilityKey in rangedAbils) {
    //             //Handle single-hit abilities
    //             if (rangedAbils[abilityKey].calc == hit_damage_calculation) {
    //                 let castDmgObject = calc_on_cast(settingsCopy);
    //                 castDmgObject['non_crit']['ability'] = abilityKey;
    //                 damageTracker[hit_tick].push(castDmgObject);
    //                 if (abilityKey == 'crystal rain') {
    //                     handle_sgb(settingsCopy, castDmgObject, damageTracker, hit_tick);
    //                 }
    //             }
    //             //Handle multi-hit and channelled abilities
    //             else if (abils[abilityKey]['ability classification'] == 'channel') {
    //                     channel_hits = { ...abils[abilityKey]['hits']};
    //                 }
    //                 //Bleeds, multi-hits and dots
    //             else {
    //                 let castDmgObjects = rotation_ability_damage(settingsCopy);
    //                     let i = 0;
    //                     castDmgObjects.forEach(hitsplat_dist => {
    //                         hitsplat_dist['non_crit']['ability'] = abilityKey;
    //                         let hit_tick_n = hit_tick + abils[abilityKey].hit_timings[i];
    //                         damageTracker[hit_tick_n] ??= [];
    //                         damageTracker[hit_tick_n].push(hitsplat_dist);
    //                         i++;
    //                     });
    //             }
    //         }
    //         if (abilityKey in ranged_buff_abilities) {
    //             handle_ranged_buffs(settingsCopy, timers, abilityKey);
    //         }
    //         let abil_duration = 3; //assume ability is 3t unless duration is explicitly specified
    //         if (abils[abilityKey]['duration']) {
    //             abil_duration = abils[abilityKey]['duration'] ;
    //         }
            
    //         let rota;
    //         if (isChannelled(settingsCopy, abilityKey)) {
    //             rota = get_rotation(settingsCopy);
    //         }
    //         for (let i = start_tick; i < start_tick + abil_duration; i++) {
    //             //Perform any necessary hits from chanelled abilities on this tick
    //             if (isChannelled(settingsCopy, abilityKey)) {
    //                 let dmgObject = calc_channelled_hit(settingsCopy, 1 + i - start_tick, rota, timers); //i+1 because hits are 1 indexed
    //                 dmgObject['non_crit']['ability'] = abilityKey; //TODO should this be the hit instead of the parent ability
    //                 let hit_tick = i + hit_delay;
    //                 (damageTracker[hit_tick] ??= []).push(dmgObject);;
    //             }
    //             if (Object.keys(timers).length > 0) {
    //                 for (let key in timers) {
    //                     timers[key] -= 1;
    //                     if (timers[key] < 0) {
    //                         settingsCopy[key] = false;
    //                     }
    //                 }
    //             }
    //             //Apply on npc modifiers to already queued damage for this to tick
    //             if (damageTracker[i]) {
    //                 damageTracker[i].forEach(namedDmgObject => {
    //                     settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
    //                     dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject, experimental_data));
						
	// 					//experimental_data.push(rotation_on_npc(settingsCopy, namedDmgObject, experimental_data));
    //                 });
    //             }
    //             tick += 1;
    //         }
    //         end_tick = tick;
	// 		//console.log(experimental_data);
    //     });
	// 	//TODO remove this dogshit code and handle better 
	// 	for (let i = end_tick; i < end_tick + 10; i++) {
	// 				if (Object.keys(timers).length > 0) {
	// 					for (let key in timers) {
	// 						timers[key] -= 1;
	// 						if (timers[key] < 0) {
	// 							settingsCopy[key] = false;
	// 						}
	// 					}
	// 				}
	// 				if (damageTracker[i]) {
	// 					damageTracker[i].forEach(namedDmgObject => {
	// 						settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
							
	// 						dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject, experimental_data));
	// 						//experimental_data.push(rotation_on_npc_test(settingsCopy, namedDmgObject));
	// 					});
	// 					//console.log('Tick: (' + i + ') --- Total Damage: ' + dmgs.reduce((acc, current) => acc + current, 0));
	// 				}
	// 				tick += 1;
	// 			}
	// 	experimental_data.forEach(element => {
	// 		//console.log('Crit:');
	// 		//console.log(element['crit']['damage list']);
	// 		// console.log('Non Crit:');
	// 		// console.log(element['non_crit']['damage list']);
	// 	});
		
	// 	experimental_data = [];
	// 	totalDamage = dmgs.reduce((acc, current) => acc + current, 0);
	// 	console.log('Old Impl Total Damage = ' + totalDamage);
	// }

	function isChannelled(settingsCopy, key) {
        return abils[key]['ability classification'] == 'channel';
    }
	
	function calculateTotalDamageNew() {
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
		let start_tick = tick;
		let end_tick = 1000; // random large number
		function processQueuedDamage(tick) {
			if (damageTracker[tick]) {
				damageTracker[tick].forEach(namedDmgObject => {
					settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
					let dmg = get_user_value(settingsCopy, on_damage(settingsCopy, namedDmgObject));
					dmg = apply_additional(settingsCopy, dmg, true);
					dmgs.push(dmg);
				});
			}
		}
		//const lastAbilTick = findLastAbilityIndex();

		//TODO implement non ability actions
		while (tick < barSize + 20) {
			let abilityKey = abilityBar[tick];
			if (abilityKey == null) {
				handleTimers(timers, settingsCopy);
				processQueuedDamage(tick);
				tick += 1;
				continue;
			}
			let abil_duration = 3; //assume ability is 3t unless duration is explicitly specified
            if (abils[abilityKey]['duration']) abil_duration = abils[abilityKey]['duration'];
			settingsCopy['ability'] = abilityKey;
			style_specific_unification(settingsCopy, 'ranged');
			settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
            start_tick = tick;
            let hit_tick = tick + hit_delay;
            damageTracker[hit_tick] ??= [];
			

            if (abilityKey in rangedAbils) {
                //Handle single-hit abilities (one cast, one hit, one hitsplat)
                if (rangedAbils[abilityKey].calc == hit_damage_calculation) {
					let dmgObject = create_object(settingsCopy);
					style_specific_unification(settingsCopy);
					dmgObject = on_cast(settingsCopy, dmgObject);
					on_hit(settingsCopy, dmgObject);
					dmgObject['non_crit']['ability'] = abilityKey;
                    damageTracker[hit_tick].push(dmgObject);
                }
				//Handles channelled abilities (many casts, many hits, many hitsplats)
				//(do nothing, handle at the end)
				else if  (isChannelled(settingsCopy, abilityKey)){}
				//Multi-hits (one cast, multiple hits, many hitsplats)
                else if (abils[abilityKey]['ability classification'] == 'multihit') {
					let dmgObject = create_object(settingsCopy);
					let dmgObjects = on_cast(settingsCopy, dmgObject);
					dmgObjects.forEach(element => {
						settingsCopy['ability'] = element['crit']['ability'];
						let namedDmgObject = on_hit(settingsCopy, element);
						damageTracker[hit_tick].push(namedDmgObject);
					});
					settingsCopy['ability'] = abilityKey;
				}
				//Bleeds, dots, burns (one cast, one hit, many hitsplats)
				else {
					let dmgObject = create_object(settingsCopy);
					settingsCopy['ability'] = abils[abilityKey]['hits'][1][0];
					dmgObject = on_cast(settingsCopy, dmgObject);
					dmgObject = on_hit(settingsCopy, dmgObject);
					let n_hits = abils[abilityKey]['hits'][1].length;
					//TODO deadshot and other bleeds which aren't uniform
					for (let i = 0; i < n_hits; i++) {
						let clone = structuredClone(dmgObject);
						clone['non_crit']['ability'] = abils[abilityKey]['hits'][1][i];
						let htick = hit_tick + abils[abilityKey]['hit_timings'][i];
						damageTracker[htick] ??= [];
						damageTracker[htick].push(clone);
					}
                }
            }
            if (abilityKey in ranged_buff_abilities) handle_ranged_buffs(settingsCopy, timers, abilityKey);
            //Process hitsplats and decrement timers 
            let rota;
            if (isChannelled(settingsCopy, abilityKey)) {
                rota = get_rotation(settingsCopy);
            }
            // for (let i = start_tick; i < start_tick + abil_duration; i++) {
			let end_tick = start_tick + abil_duration;
			for (let i = start_tick; i < end_tick; i++) {
                //Perform any necessary hits from chanelled abilities on this tick
                if (isChannelled(settingsCopy, abilityKey)) {
					//If there's a new ability cast on this tick, cancel the channel and exit early
					if (i > start_tick && abilityBar[tick]) {
						break;
					}
					else {
						let dmgObject = calc_channelled_hit(settingsCopy, 1 + i - start_tick, rota, timers); //i+1 because hits are 1 indexed
						dmgObject['non_crit']['ability'] = abilityKey;
						let hit_tick = i + hit_delay;
						(damageTracker[hit_tick] ??= []).push(dmgObject);
					}
                }
				handleTimers(timers, settingsCopy);
                //Apply on npc modifiers to already queued damage for this to tick
				//damage tracker, i 
				processQueuedDamage(i);
				//TODO make a function
				stacks['perfect equilibrium stacks'].stackTicks[tick] = settingsCopy['perfect equilibrium stacks'];
				stacks[SETTINGS.ICY_CHILL_STACKS].stackTicks[tick] = settingsCopy[SETTINGS.ICY_CHILL_STACKS];
                tick += 1;
            }
            end_tick = tick;
			//console.log(experimental_data);
		}
        // abilityBar.forEach(abilityKey => {
        //     if (abilityKey == null) {
		// 		//console.log('Tick ' + tick);
		// 		handleTimers(timers, settingsCopy);
		// 		tick += 1;
		// 		return;
		// 	}
		// 	let abil_duration = 3; //assume ability is 3t unless duration is explicitly specified
        //     if (abils[abilityKey]['duration']) abil_duration = abils[abilityKey]['duration'];
		// 	settingsCopy['ability'] = abilityKey;
		// 	style_specific_unification(settingsCopy, 'ranged');
		// 	settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
        //     start_tick = tick;
        //     let hit_tick = tick + hit_delay;
        //     damageTracker[hit_tick] ??= [];

        //     if (abilityKey in rangedAbils) {
        //         //Handle single-hit abilities (one cast, one hit, one hitsplat)
        //         if (rangedAbils[abilityKey].calc == hit_damage_calculation) {
		// 			let dmgObject = create_object(settingsCopy);
		// 			style_specific_unification(settingsCopy);
		// 			dmgObject = on_cast(settingsCopy, dmgObject);
		// 			on_hit(settingsCopy, dmgObject);
		// 			dmgObject['non_crit']['ability'] = abilityKey;
        //             damageTracker[hit_tick].push(dmgObject);
        //         }
		// 		//Handles channelled abilities (many casts, many hits, many hitsplats)
		// 		//(do nothing, handle at the end)
		// 		else if  (isChannelled(settingsCopy, abilityKey)){}
		// 		//Multi-hits (one cast, multiple hits, many hitsplats)
        //         else if (abils[abilityKey]['ability classification'] == 'multihit') {
		// 			let dmgObject = create_object(settingsCopy);
		// 			let dmgObjects = on_cast(settingsCopy, dmgObject);
		// 			dmgObjects.forEach(element => {
		// 				settingsCopy['ability'] = element['crit']['ability'];
		// 				let namedDmgObject = on_hit(settingsCopy, element);
		// 				damageTracker[hit_tick].push(namedDmgObject);
		// 			});
		// 			settingsCopy['ability'] = abilityKey;
		// 		}
		// 		//Bleeds, dots, burns (one cast, one hit, many hitsplats)
		// 		else {
		// 			let dmgObject = create_object(settingsCopy);
		// 			settingsCopy['ability'] = abils[abilityKey]['hits'][1][0];
		// 			dmgObject = on_cast(settingsCopy, dmgObject);
		// 			dmgObject = on_hit(settingsCopy, dmgObject);
		// 			let n_hits = abils[abilityKey]['hits'][1].length;
		// 			//TODO deadshot and other bleeds which aren't uniform
		// 			for (let i = 0; i < n_hits; i++) {
		// 				let clone = structuredClone(dmgObject);
		// 				clone['non_crit']['ability'] = abils[abilityKey]['hits'][1][i];
		// 				let htick = hit_tick + abils[abilityKey]['hit_timings'][i];
		// 				damageTracker[htick] ??= [];
		// 				damageTracker[htick].push(clone);
		// 			}
        //         }
        //     }
        //     if (abilityKey in ranged_buff_abilities) handle_ranged_buffs(settingsCopy, timers, abilityKey);
        //     //Process hitsplats and decrement timers 
        //     let rota;
        //     if (isChannelled(settingsCopy, abilityKey)) {
        //         rota = get_rotation(settingsCopy);
        //     }
        //     // for (let i = start_tick; i < start_tick + abil_duration; i++) {
		// 	for (let i = start_tick; i < start_tick + abil_duration; i++) {
        //         //Perform any necessary hits from chanelled abilities on this tick
        //         if (isChannelled(settingsCopy, abilityKey)) {
		// 			//TODO allow early cancel - 
		// 			// if the bar at this tick contains an ability
		// 			// just stop this function from running
		// 			// and make i > than the last loop?
        //             let dmgObject = calc_channelled_hit(settingsCopy, 1 + i - start_tick, rota, timers); //i+1 because hits are 1 indexed
        //             dmgObject['non_crit']['ability'] = abilityKey;
        //             let hit_tick = i + hit_delay;
        //             (damageTracker[hit_tick] ??= []).push(dmgObject);
		// 			console.log('We have calced ' + (i + 1)+ ' chanelled hits');
        //         }
		// 		handleTimers(timers, settingsCopy);
        //         //Apply on npc modifiers to already queued damage for this to tick
        //         if (damageTracker[i]) {
		// 			damageTracker[i].forEach(namedDmgObject => {
        //                 settingsCopy['ability'] = namedDmgObject['non_crit']['ability'];
		// 				let dmg = get_user_value(settingsCopy, on_damage(settingsCopy, namedDmgObject));
		// 				//let dmg1 = dmg;
		// 				dmg = apply_additional(settingsCopy, dmg, true);
		// 				dmgs.push(dmg);
		// 				console.log('Damages');
		// 				console.log(dmgs);
		// 				//dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject, experimental_data));
        //             });
        //         }
		// 		//TODO make a function
		// 		stacks['perfect equilibrium stacks'].stackTicks[tick] = settingsCopy['perfect equilibrium stacks'];
		// 		stacks[SETTINGS.ICY_CHILL_STACKS].stackTicks[tick] = settingsCopy[SETTINGS.ICY_CHILL_STACKS];
        //         tick += 1;
        //     }
        //     end_tick = tick;
		// 	//console.log(experimental_data);
        // });
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
					dmgs.push(rotation_on_npc(settingsCopy, namedDmgObject, experimental_data));
					//experimental_data.push(rotation_on_npc_test(settingsCopy, namedDmgObject));
				});
				//console.log('Tick: (' + i + ') --- Total Damage: ' + dmgs.reduce((acc, current) => acc + current, 0));
			}
			tick += 1;
		}
		// console.log(experimental_data);
		// experimental_data = [];
		totalDamage = dmgs.reduce((acc, current) => acc + current, 0);
		console.log('New Impl Total Damage = ' + totalDamage);
	}

	function handleTimers(timers, settings) {
		if (Object.keys(timers).length > 0) {
			for (let key in timers) {
				// console.log('Key = ' + key);
				// console.log('Time = ' + timers[key]);
				// console.log(settings[key]);
				timers[key] -= 1;
				if (timers[key] < 0) {
					settings[key] = false;
				}
			}
		}
	}

	const barSize = 250;
    let abilityBar = Array(barSize).fill(null); // Empty slots on the bar
	let tab = 'general'; // settings tab
	let abilityTab = 'ranged';
    let selectedTab = 'general';
	const baseBarRowGap = 30;
	let barRowGap = baseBarRowGap;

	const stackFontSize = 12;
	const baseStackOffset = 32;
	const stackPadding = 2;

	const stacks = {
		[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]: {
			title: 'Perfect Equilibrium stacks',
			displaySetting: SETTINGS.SHOW_BOLG_STACKS,
			idx: -1,
			image: '/effect_icons/Perfect Equilibrium (self status).png',
			stackTicks: Array(barSize).fill(0),
			colour: '#4cfc42'
		},
		[SETTINGS.ICY_CHILL_STACKS]: { 
			title: 'Icy Chill stacks',
			displaySetting: SETTINGS.SHOW_ICY_CHILL_STACKS, 
			idx: -1,
			image: '/effect_icons/Icy_Chill.png',
			stackTicks: Array(barSize).fill(0),
			colour: '#03f4fc'
		}
	}
	let abilityBarIndex = 0;
	let lastAbilityIndex = 0;
	let buffTimings = {'swiftness': [], 'sunshine': [], 'berserk': [], 'split soul ecb': [], 'crit buff': []}; //tracks when buffs are active for drawing visual indicator
	//UI functions
    function handleAbilityClick(event, abilityKey) {
		abilityBar[abilityBarIndex] = abilityKey;
		
		//TODO implement other buffs
		if (abilityKey == ABILITIES['GREATER_DEATHS_SWIFTNESS']) {
			buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex+63]);
		}
		else if (abilityKey == ABILITIES['DEATHS_SWIFTNESS']) {
			buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex+52]);
		}
		else if (abilityKey == ABILITIES['SPLIT_SOUL_ECB']) {
			buffTimings['split soul ecb'].push([abilityBarIndex, abilityBarIndex+25]);
		}
		else if (abilityKey == ABILITIES['SUNSHINE']) {
			buffTimings['sunshine'].push([abilityBarIndex, abilityBarIndex+25]);
		}
		refreshUI(false);
		calculateTotalDamageNew();
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
		else {
			const dragObj = JSON.parse(event.dataTransfer.getData('application/json'));
			const swapAbil = abilityBar[index]
			abilityBar[index] = dragObj['ability'];
			abilityBar[dragObj['startIndex']] = swapAbil;
		}
		refreshUI();
		calculateTotalDamageNew();
    }

	function handleDragStartBar(event, ability, startIndex) {
        const dragData = JSON.stringify({ ability, startIndex });
    	event.dataTransfer.setData('application/json', dragData);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

	function handleBarRightClick(event, index) {
		event.preventDefault();
		abilityBar[index] = null;
		refreshUI();
		calculateTotalDamageNew()
	}
	function clearRotation() {
		for (let i = 0; i < barSize; i++) {
			abilityBar[i] = null;
			stacks[SETTINGS.ICY_CHILL_STACKS].stackTicks[i] = 0;
			stacks[SETTINGS.PERFECT_EQUILIBRIUM_STACKS].stackTicks[i] = 0;
		}
		totalDamage = 0;
		refreshUI();
		calculateTotalDamageNew();
		//Reset the visual indicators for buffs
		for (let key in buffTimings) {
			if (buffTimings.hasOwnProperty(key)) {
				buffTimings[key] = []; // Reset each key to an empty array
			}
		}
		experimental_data = [];
	}

	function refreshUI(calcDmg = true) {
		lastAbilityIndex = 0;
		for (let i = 0; i < barSize; i++) {
			if (abilityBar[i] != null) {
				lastAbilityIndex = i;
			}
		}
		abilityBarIndex = lastAbilityIndex;
		let abilToAdd = abils[abilityBar[lastAbilityIndex]];
		if (abilToAdd) {
			if (abilToAdd['duration']) {
				abilityBarIndex += abilToAdd['duration'];
			}
			//else if (lastAbilityIndex == 0) abilityBarIndex = 0;
			else abilityBarIndex += 3;
		}
		
		

		//Handle stacks
		let i = 0;
		barRowGap = baseBarRowGap;
		for (let key in stacks) {
			let displaySetting = stacks[key]['displaySetting'];
			let disp = settings[displaySetting];
			if (disp['value']) {
				stacks[key]['idx'] = i;
				barRowGap += (stackFontSize + 2)
				i++;
			}
			else {
				stacks[key]['idx'] = -1;
			}
		}
		
		if (calcDmg) {
			calculateTotalDamageNew();
		}
	}

	//TODO delete
	function showStack(idx, arr) {
		if (idx == 0) {
			return true;
		}
		else {
			return !(arr[idx] == arr[idx-1]);
		}
	}
	//abilityBar[0] = "greater ricochet";
	refreshUI();
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
                        <button on:click={calculateTotalDamageNew}>Calculate Damage</button>
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
					<br>		
                    {#if abilityTab === 'ranged'}
                        <AbilityChoice abilities={rangedAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'magic'}
                        <AbilityChoice abilities={magicAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'melee'}
                        <AbilityChoice abilities={meleeAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {:else if abilityTab === 'necro'}
                        <AbilityChoice abilities={necroAbils} handleAbilityClick={handleAbilityClick} handleDragStart={handleDragStart} style={abilityTab}/>
                    {/if}
                    <div style="row-gap:{barRowGap}px;" class="ability-bar">		
						{#each abilityBar as ability, index}
							<div class="ability-slot"
									role="button"
									tabindex="0"
									aria-label="Ability slot"
									on:contextmenu={(e) => handleBarRightClick(e, index)}
									on:drop={(e) => handleDrop(e, index)}
									on:dragover={allowDrop}
							>
								<span class="cell-number">{index}</span>
								{#if ability}
									<img src={allAbils[ability].icon} 
										alt={allAbils[ability].title} 
										style="width: 100%; height: 100%;"
										draggable="true"
            							on:dragstart={(e) => handleDragStartBar(e, ability, index)}
									/>
								{/if}
								{#if buffActive('swiftness', index)}
									<div class="line-swiftness" title="Death's Swiftness"></div>
								{/if}
								{#if buffActive('split soul ecb', index)}
									<div class="line-ecb" title="Split Soul (ECB)"></div>
								{/if}
								{#each Object.keys(stacks) as key}
									{#if showStack(index,  stacks[key].stackTicks) && stacks[key].idx >= 0}
										<span
											title="{stacks[key].title}"
											style="transform: translateX(50%); top: {baseStackOffset+6+(stackFontSize+stackPadding) * stacks[key].idx}px"
											class="bolg-stacks" 
										>
											{stacks[key].stackTicks[index]}
										</span>
										<img src={stacks[key].image} 
											style="transform:translateY({baseStackOffset+(stackFontSize+stackPadding) * stacks[key].idx}px) 
												translateX(-70%)"
											class="pe-icon"
											title={stacks[key].title}
											alt={stacks[key].title}
										/>
									{/if}
								{/each}
								
							</div>
						{/each}
					</div>
				</div>
			</div>
            <RangedSettings settings={settings} updateDamages={calculateTotalDamageNew}/>
			{#each Object.keys(stacks) as key}
				<div>
					<Checkbox
						setting={settings[stacks[key].displaySetting]}
						on:settingsUpdated={refreshUI}
					/>
				</div>
			{/each}
		</section>
	</div>
</div>

<style>
	/* TODO - move these into their own css file */
	.ability-bar {
		display: grid; 
		grid-template-columns: repeat(auto-fill, 30px); 
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
        color: #bababa; /* Adjust color of the number */
	}

	.bolg-stacks {
        position: absolute;
        top: +38px; /* Adjust to move the number under the cell */
        left: auto;
        transform: translateX(+50%);
        font-size: 12px; /* Adjust size of the number */
	}

	.wen-stacks {
        position: absolute;
        top: +52px; /* Adjust to move the number under the cell */
        left: auto;
        transform: translateX(+50%);
        font-size: 12px; /* Adjust size of the number */
	}

	.pe-icon {
		position: absolute;
		width: 12px; 
		height: 12px; 
		transform: translateX(-70%) translateY(32px);
	}
	.icy-chill-icon {
		position: absolute;
		width: 12px; 
		height: 12px; 
		transform: translateX(-70%) translateY(47px);
	}
</style>
