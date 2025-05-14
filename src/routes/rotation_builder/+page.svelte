<script>
	import Navbar from '$components/Layout/Navbar.svelte';
	import Header from '$components/Layout/Header.svelte';
	import { abilities  as r_dmg_abilities } from '$lib/ranged/abilities';
	import { ranged_buff_abilities } from '$lib/ranged/buff_abilities';
    import { abilities as magic_dmg_abilities } from '$lib/magic/abilities';
    import { abilities as melee_dmg_abilities } from '$lib/melee/abilities';
    import { abilities as necro_dmg_abilities } from '$lib/necromancy/abilities';
    import { abilities as def_abilities } from '$lib/defence/abilities';
	import { offGcdAbilities } from '$lib/special/abilities';
	import { settingsConfig, SETTINGS } from '$lib/calc/settings';
	import Checkbox from '../../components/Settings/Checkbox.svelte';
	import Number from '../../components/Settings/Number.svelte';
	import Select from '../../components/Settings/Select.svelte';
	import { abils } from '$lib/calc/const';
    import RotationSettings from '../../components/Settings/RotationSettings.svelte';
    import AbilityChoice from '../../components/RotationBuilder/AbilityChoice.svelte';
	import {buffs, createBuffTimings, createStackTimings} from '$lib/calc/rotation_builder/rotation_consts.ts';
	import {ToolMode} from '$lib/calc/rotation_builder/ui_material/toolModes.ts';
    import ExtraActionsPanel from '../../components/RotationBuilder/ExtraActionsPanel.svelte';
    import { calculateTotalDamage } from '$lib/calc/rotation-damage-calculator';

    let necroAbils = {...necro_dmg_abilities}; //TODO add other styles buff abils eventually
    let meleeAbils = {...melee_dmg_abilities};
    let magicAbils = {...magic_dmg_abilities};
	let rangedAbils = {...r_dmg_abilities, ...ranged_buff_abilities};
	let defAbils = {...def_abilities};
    let allAbils = {...magicAbils, ...rangedAbils, ...necroAbils, ...meleeAbils, ...def_abilities};

	let specialAbils = {...offGcdAbilities};
	let extraActions = {...specialAbils};

	// Constants
	const BASE_BAR_ROW_GAP = 30;
	const BAR_SIZE = 200;
	const EXTRA_BAR_SIZE = 12;
	const stackFontSize = 10;//12
	const baseStackOffset = 32;
	const stackPadding = 2;
	const buffLineWidth = 32;
	const buffLineHeight = 6;

	let uiState = $state({
		activeTab: 'ranged',
		activeTool: ToolMode.Regular,
		settingsPanelCollapsed: false,
		
		extraActions: {
			show: false,
			tick: -1,
			tab: 'abilities',
			infoAbility: null,
			barIndex: 0
		},
		
		bar: {
			size: BAR_SIZE,
			index: 0,
			lastIndex: 0,
			rowGap: BASE_BAR_ROW_GAP,
			lineGap: 0
		},
		
		dragDrop: {
			hoveredSlot: null,
			validSlot: true
		},

		stallingAbility: null // Track which ability is being stalled
	});

	let gameState = $state({
		totalDamage: 0,
		poisonDamage: 0,
		settings: Object.fromEntries(
		Object.entries(settingsConfig).map(([key, value]) => [
			key,
			{ ...value, key: key, value: value.default }
		])
		),
		abilityBar: Array(BAR_SIZE).fill(null),
		extraActionBar: Array(BAR_SIZE).fill(null),
		buffs: createBuffTimings(BAR_SIZE),
		stacks: createStackTimings(BAR_SIZE),
		nulledTicks: Array(BAR_SIZE).fill(false),
		stalledAbilities: Array(BAR_SIZE).fill(null)
	});

	const tabs = [
		{ id: 'melee', label: 'Melee', abilities: meleeAbils },
		{ id: 'ranged', label: 'Ranged', abilities: rangedAbils },
		{ id: 'magic', label: 'Magic', abilities: magicAbils },
		{ id: 'defence', label: 'Defence', abilities: defAbils },
		{ id: 'necro', label: 'Necro', abilities: necroAbils }
	];

	function calculateTotalDamageNew() {
		const dmgResult = calculateTotalDamage(gameState, BAR_SIZE);
		gameState.totalDamage = dmgResult[0];
		gameState.poisonDamage = dmgResult[1];
		console.log('New Impl Total Damage = ' + gameState.totalDamage + ' (Poison Damage = ' + gameState.poisonDamage + ')');
	}
		
	//UI functions
	//TODO handle this differently
    function handleAbilityClick(event, abilityKey, mainBar = true) {
        if (uiState.activeTool === ToolMode.Stall) {
            // Check if ability is channeled
            if (abils[abilityKey]['ability classification'] === 'channel') {
                alert("Channeled abilities cannot be stalled currently.");
                return;
            }
            uiState.stallingAbility = abilityKey;
            return;
        }

        let size = mainBar ? BAR_SIZE : EXTRA_BAR_SIZE;
        let idx = mainBar ? uiState.bar.index : uiState.extraActions.barIndex;

		if (idx >= size) {
			alert("You're trying to add an ability after the end of the rotation.");
			return;
		}

		if (mainBar) {
            gameState.abilityBar[idx] = abilityKey;
        } else {
            gameState.extraActionBar[uiState.extraActions.tick][idx] = abilityKey;
		}
		calculateTotalDamageNew();
        refreshUI(false);
    }

	function handleAbilityClickExtra(event, abilityKey) {
		handleAbilityClick(event, abilityKey, false);
    }

	function buffActive(key, index) {
		let active = false;
		//TODO make separate ranged and necro split souls
		if (key === 'split soul ecb') {
			active = gameState.buffs['split soul'].buffTicks[index];
		} else {
			active = gameState.buffs[key].buffTicks[index];
		}
		return active;
	}

    function handleDragStart(event, ability) {
        event.dataTransfer.setData('text/plain', ability);
    }

    function handleDrop(event, index) {
        event.preventDefault();
		const abilityKey = event.dataTransfer.getData('text/plain');
		if (allAbils[abilityKey]) {
			gameState.abilityBar[index] = abilityKey;
		} else {
			try {
			const dragObj = JSON.parse(event.dataTransfer.getData('text/plain'));
				const swapAbil = gameState.abilityBar[index];
				gameState.abilityBar[index] = dragObj.ability;
				gameState.abilityBar[dragObj.startIndex] = swapAbil;
			} catch (e) {
				console.error('Error parsing drag data:', e);
			}
		}
		uiState.dragDrop.hoveredSlot = null;
		refreshUI();
			calculateTotalDamageNew();
    }

	function handleDragStartBar(event, ability, startIndex) {
        const dragData = JSON.stringify({ ability, startIndex });
    	event.dataTransfer.setData('text/plain', dragData);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

	function handleDragEnter(event, index) {
		uiState.dragDrop.hoveredSlot = index;
		uiState.dragDrop.validSlot = true;
		
		let data = event.dataTransfer.getData('text/plain');
		if (!allAbils[data]) {
			try {
			data = JSON.parse(event.dataTransfer.getData('text/plain'));
			if ((index - data.startIndex) <= 2 && index >= data.startIndex) {
					uiState.dragDrop.validSlot = true;
				return;
			}
			} catch (e) {
				console.error('Error parsing drag data:', e);
		}
		}
		
		for (let i = index-1; i >= (index - 2); i--) {
			if (i < 0) return;
			if (gameState.abilityBar[i] != null) {
        		uiState.dragDrop.validSlot = false;
			}
		}
    }

    function handleDragLeave(event, index) {
        if (uiState.dragDrop.hoveredSlot === index) {
            uiState.dragDrop.hoveredSlot = null;
        }
    }

	function handleBarLeftClick(event, ability, index) {
        event.currentTarget.focus();

		if (uiState.activeTool === ToolMode.Null) {
			gameState.nulledTicks[index] = !gameState.nulledTicks[index];
			refreshUI();
			return;
		}

		if (uiState.activeTool === ToolMode.Stall) {
			if (gameState.stalledAbilities[index]) {
				gameState.stalledAbilities[index] = null;
			} else if (uiState.stallingAbility) {
				gameState.stalledAbilities[index] = uiState.stallingAbility;
				uiState.stallingAbility = null;
			} else {
				// Find the last non-null ability before this tick
				let stalledAbility = null;
				for (let i = index - 1; i >= 0; i--) {
					if (gameState.abilityBar[i]) {
						stalledAbility = gameState.abilityBar[i];
						break;
					}
				}
				if (stalledAbility) {
					gameState.stalledAbilities[index] = stalledAbility;
				}
			}
			refreshUI();
			return;
		}

		if (!gameState.extraActionBar[index]){
			gameState.extraActionBar[index] = Array(EXTRA_BAR_SIZE).fill(null);
		}

		if (uiState.extraActions.show) {
			if (index == uiState.extraActions.tick) {
				uiState.extraActions.show = false;
			}
			else {
				uiState.extraActions.tick = index;
			}
		}
		else {
			uiState.extraActions.show = true;
			uiState.extraActions.tick = index;
		}
		uiState.extraActions.infoAbility = ability;
    }

    function handleBarRightClick(event, index, innerIdx = null) {
        event.preventDefault();
		if (innerIdx != null) {
			gameState.extraActionBar[index][innerIdx] = null;
		}
		else {
        	gameState.abilityBar[index] = null;
		}
        refreshUI();
        calculateTotalDamageNew();
    }

    function clearRotation() {
        gameState.abilityBar = Array(BAR_SIZE).fill(null);
        gameState.extraActionBar = Array(BAR_SIZE).fill(null);
		gameState.nulledTicks = Array(BAR_SIZE).fill(false);
		gameState.stalledAbilities = Array(BAR_SIZE).fill(null);
        gameState.totalDamage = 0;
        
        // Reset stacks
        for (let i = 0; i < BAR_SIZE; i++) {
            gameState.stacks[SETTINGS.ICY_CHILL_STACKS].stackTicks[i] = 0;
            gameState.stacks[SETTINGS.PERFECT_EQUILIBRIUM_STACKS].stackTicks[i] = 0;
        }

        // Reset buffs
        for (let key in gameState.buffs) {
            if (Object.hasOwnProperty.call(gameState.buffs, key)) {
                gameState.buffs[key].buffTicks = Array(BAR_SIZE).fill(0);
            }
        }

        refreshUI();
        calculateTotalDamageNew();
    }

	/**
	 * Updates ability bar pointers, recalculates stacks, recalculates buff bars
	 * @param calcDmg - Whether to recalculate damage
	 */
	function refreshUI(calcDmg = true) {
		//Update ability bar pointer
		uiState.bar.lastIndex = 0;
		for (let i = 0; i < BAR_SIZE; i++) {
			if (gameState.abilityBar[i] != null) {
				uiState.bar.lastIndex = i;
			}
		}
		uiState.bar.index = uiState.bar.lastIndex;
		let abilToAdd = abils[gameState.abilityBar[uiState.bar.lastIndex]];
		if (abilToAdd) {
			uiState.bar.index += abilToAdd['duration'] || 3;
		}

		//Update extra action bar pointer
		uiState.extraActions.barIndex = 0;
		if (uiState.extraActions.show) {
			for (let i = 0; i < EXTRA_BAR_SIZE; i++) {
				if (gameState.extraActionBar[uiState.extraActions.tick][i] === null) {
					uiState.extraActions.barIndex = i;
					break;
				}
			}
		}

		//Handle stacks
		let i = 0;
		uiState.bar.rowGap = BASE_BAR_ROW_GAP;
		for (let key in gameState.stacks) {
			let displaySetting = gameState.stacks[key]['displaySetting'];
			let disp = gameState.settings[displaySetting];
			if (disp['value']) {
				gameState.stacks[key]['idx'] = i;
				uiState.bar.rowGap += (stackFontSize + stackPadding);
				i++;
			} else {
				gameState.stacks[key]['idx'] = -1;
			}
		}

		//handle buff indicator bars
		i = 0;
		uiState.bar.lineGap = 0;
		for (let key in gameState.buffs) {
			if (gameState.buffs[key].buffTicks.some(value => value !== 0 && value !== false)) {
				gameState.buffs[key].idx = i;
				uiState.bar.rowGap += buffLineHeight;
				uiState.bar.lineGap += buffLineHeight;
				i++;
			} else {
				gameState.buffs[key].idx = -1;
			}
		}

		if (calcDmg) {
			calculateTotalDamageNew();
		}
	}

	function showStack(idx, arr) {
		if (idx == 0) {
			return true;
		}
		else {
			return !(arr[idx] == arr[idx-1]);
		}
	}
	// Initial UI setup without damage calculation
	refreshUI(false);

	let activeTool = $state(ToolMode.Regular);

    function handleKeypress(event) {
		if (event.key === "r") {
			uiState.activeTool = ToolMode.Regular;
			uiState.stallingAbility = null;
        }
        if (event.key === "s") {
			uiState.activeTool = ToolMode.Stall;
			uiState.stallingAbility = null;
        }
		if (event.key === "n") {
			uiState.activeTool = ToolMode.Null;
			uiState.stallingAbility = null;
        }
		console.log('Tool mode: ' + uiState.activeTool);
    }

    function exportToString() {
        try {
            const exportData = {
                a: gameState.abilityBar.map(a => a || ''),
                e: gameState.extraActionBar.map(row => row ? row.map(a => a || '') : []),
                n: gameState.nulledTicks,
                t: gameState.stalledAbilities.map(a => a || '')
            };
            const jsonStr = JSON.stringify(exportData);
            const rotationString = btoa(jsonStr);
            
            // Copy to clipboard
            navigator.clipboard.writeText(rotationString);
            alert('Rotation copied to clipboard!');
        } catch (e) {
            console.error('Export failed:', e);
            alert('Failed to export rotation');
        }
    }

    function importFromString() {
        try {
            const importStr = prompt('Paste rotation string:');
            if (!importStr) return;
            
            const jsonStr = atob(importStr);
            const importData = JSON.parse(jsonStr);
            
            gameState.abilityBar = importData.a.map(a => a || null);
            gameState.extraActionBar = importData.e.map(row => row.map(a => a || null));
            gameState.nulledTicks = importData.n;
            gameState.stalledAbilities = importData.t.map(a => a || null);
            
            
            calculateTotalDamageNew();refreshUI();
        } catch (e) {
            console.error('Import failed:', e);
            alert('Invalid rotation string');
        }
    }
</script>

<style>
	.ability-bar {
		display: grid;
		grid-template-columns: repeat(auto-fill, 30px);
		column-gap: 0;
		position: relative;
		padding-top: 25px;
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
		cursor: inherit !important; /* Force inherit cursor from parent */
		transition: all 0.1s ease;
	}

	.ability-slot:hover {
		cursor: inherit !important; /* Force inherit cursor even on hover */
		border: 1px solid #c5c5c5;
		box-shadow: 0 0 3px rgba(255, 255, 255, 0.572);
		z-index: 3; /* Ensure the hover effect appears above other elements */
	}

	.ability-slot.nulled::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: repeating-linear-gradient(
			45deg,
			rgba(255, 0, 0, 0.55),
			rgba(255, 0, 0, 0.55) 2px,
			transparent 3px,
			transparent 6px
		);
		pointer-events: none;
		z-index: 1;
	}

	.ability-slot.has-extra-actions::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 6px;
		background-color: #ffff00;
		border-radius: 50%;
		z-index: 2;
	}

	.cell-number {
		position: absolute;
		top: -18px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 12px; 
		color: #bababa;
	}

	.extra-action-section {
		border: 2px solid #ffff00df;
		margin-top: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bolg-stacks {
		position: absolute;
		top: +38px;
		left: auto;
		transform: translateX(+50%);
	}

	.pe-icon {
		position: absolute;
		width: 12px;
		height: 12px;
		transform: translateX(-70%) translateY(32px);
	}

	.highlight-red {
		border: 1px solid rgba(255, 51, 0, 0.789);
	}

	.highlight-green {
		border: 1px solid rgba(0, 231, 54, 0.789);
	}

	.regular-cursor {
		cursor: default; /* Cursor for regular tool */
	}

	.regular-cursor .ability-slot {
		cursor: pointer !important; /* Only show pointer in regular mode */
	}

	.regular-cursor .ability-slot:hover {
		cursor: pointer !important;
	}

	.stall-cursor {
		cursor: wait; /* Default stall cursor */
	}

	.stall-cursor.stalling {
		cursor: wait; /* Will be overridden if there's an ability being stalled */
	}

	.null-cursor {
		cursor: url('/cursor_icons/abort-icon.svg') 16 16, not-allowed; 
	}

	.stalled-ability {
		position: absolute;
		top: 0;
		right: 0;
		width: 55%;
		height: 55%;
		opacity: 0.8;
		border: 1px solid #ffff72;
		box-sizing: border-box;
		z-index: 2;
	}

	.settings-panel {
		transition: all 0.3s ease;
		overflow: hidden;
		min-width: 0; /* Allow panel to shrink below content size */
		position: relative; /* Ensure proper positioning context for the button */
	}

	.settings-panel.collapsed {
		flex-basis: 0;
		width: 0;
		padding: 0;
		margin: 0;
		visibility: hidden;
		height: 0;
		opacity: 0;
	}

	.settings-content {
		padding-top: 50px; /* Add space for the button */
		height: 100%;
	}

	.card-rotation {
		height: fit-content;
	}

	.collapse-button, .expand-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: 2px solid #C2BA9E;
		color: #C2BA9E;
		cursor: pointer;
		padding: 8px 12px;
		z-index: 10;
		font-size: 18px;
		border-radius: 4px;
	}

	.collapse-button:hover, .expand-button:hover {
		color: #968A5C;
		border-color: #968A5C;
	}
</style>

<Navbar />
<Header img="/range_background.png" text="Rotation Calculator Beta" icon="/style_icons/rota_icon.svg" />

<div class="space-y-14 mt-10 z-20">
	<div class="responsive-container {uiState.activeTool.toLowerCase()}-cursor {uiState.stallingAbility ? 'stalling' : ''}" 
		tabindex="-1" 
		role="button" 
		onkeydown={handleKeypress}
		style={uiState.stallingAbility ? `cursor: url('${allAbils[uiState.stallingAbility].icon}') 15 15, wait;` : ''}>
		<section class="grid grid-cols-12 gap-6 auto-rows-min">
			<div class="col-span-{uiState.settingsPanelCollapsed ? '12' : '6'} relative">
				<div class="card card-rotation">
					{#if uiState.settingsPanelCollapsed}
						<button 
							class="expand-button"
							onclick={() => uiState.settingsPanelCollapsed = false}
						>
							Settings ←
						</button>
					{/if}
					<h1 class="main-header mb-6 ml-3">Rotation</h1>
                    <div class="table-container">
						<p>Press R to toggle regular mode, S to toggle stall mode, and N to toggle null mode.
						</p><!-- TODO make guide, add link to guide-->
						<br>
						<button onclick={() => clearRotation()}>Reset</button>
						<br>
                        <button onclick={() => calculateTotalDamageNew()}>Calculate Damage</button>
                        <p>Total Damage: {gameState.totalDamage} 
                            {#if gameState.poisonDamage > 0}
                                <span style="color: #4CAF50" 
								title="Expected poison damage (approximate - assumes poison+++)">(+{gameState.poisonDamage} )
								</span>
                            {/if}
                        </p>
					</div>
                    <div class="space-y-4 mt-4">
						<button onclick={() => importFromString()}>Import Rotation</button>
                        <button onclick={() => exportToString()} alt="Copy Rotation to Clipboard">Export Rotation</button>
					</div>
                    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
                        {#each tabs as tab}
                        <li class="flex-grow me-2">
                            <button
                                    onclick={() => (uiState.activeTab = tab.id)}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                                    class:text-[#968A5C]={uiState.activeTab === tab.id}
                                >{tab.label}</button>
                        </li>
                        {/each}
                    </ul>
					<br>
                    {#each tabs as tab}
                        {#if uiState.activeTab === tab.id}
                            <AbilityChoice 
                                abilities={tab.abilities}
                                handleAbilityClick={handleAbilityClick}
									handleDragStart={handleDragStart} 
                                style={tab.id}
											/>
										{/if}
								{/each}
					{#if uiState.extraActions.show}
						<ExtraActionsPanel
							{uiState}
							{gameState}
							{allAbils}
							{handleAbilityClickExtra}
							{handleDragStart}
							{handleBarRightClick}
							{handleDragStartBar}
							{extraActions}
						/>
					{/if}
                    <div style="row-gap:{uiState.bar.rowGap}px;" class="ability-bar">
						{#each gameState.abilityBar as ability, index}
							<button
									class="ability-slot"
									class:highlight-red={uiState.dragDrop.hoveredSlot === index && !uiState.dragDrop.validSlot}
									class:highlight-green={uiState.dragDrop.hoveredSlot === index && uiState.dragDrop.validSlot}
									class:nulled={gameState.nulledTicks[index]}
									class:has-extra-actions={gameState.extraActionBar[index]?.some(action => action !== null)}
									tabindex="0"
									aria-label="Ability slot"
									onclick={(e) => handleBarLeftClick(e, ability, index)}
									oncontextmenu={(e) => handleBarRightClick(e, index)}
									ondrop={(e) => handleDrop(e, index)}
									ondragover={(e) => allowDrop(e)}
									ondragenter={(e) => handleDragEnter(e, index)}
           							ondragleave={(e) => handleDragLeave(e, index)}
							>
								<span class="cell-number">{index}</span>
								{#if ability}
									<img src={allAbils[ability].icon}
										alt={allAbils[ability].title}
										style="width: 100%; height: 100%;"
										title="{allAbils[ability].title}"
										draggable="true"
            							ondragstart={(e) => handleDragStartBar(e, ability, index)}
									/>
									
								{/if}
								{#if gameState.stalledAbilities[index]}
									<img 
										class="stalled-ability"
										src={allAbils[gameState.stalledAbilities[index]].icon}
										alt="Stalled ability"
										title="Stalled: {allAbils[gameState.stalledAbilities[index]].title}"
									/>
								{/if}
								{#each Object.keys(gameState.buffs) as key}
									{#if buffActive(key, index)}
										<div title="{gameState.buffs[key].title}" 
											style="
											position: absolute;
											bottom: {-(buffLineHeight * 1.5) - (buffLineHeight * gameState.buffs[key].idx)}px;
											left: -1px;
											width: {buffLineWidth}px;
											height: {buffLineHeight}px;
											background-color: {gameState.buffs[key].colour};
											box-sizing: border-box; ">
										</div>
									{/if}
								{/each}
								{#each Object.keys(gameState.stacks) as key}
									{#if showStack(index, gameState.stacks[key].stackTicks) && gameState.stacks[key].idx >= 0}
										<span
											title="{gameState.stacks[key].title}"
											style="
												transform: translateX(0px);
												top: {baseStackOffset + uiState.bar.lineGap + 3 + (stackFontSize+stackPadding) * gameState.stacks[key].idx}px;
												left: {stackFontSize+stackPadding*2}px;
												font-size: {stackFontSize}px;
												color: {gameState.stacks[key].colour};
												"
											class="bolg-stacks"
										>
											{+gameState.stacks[key].stackTicks[index].toFixed(0)}
										</span>
										<img src={gameState.stacks[key].image}
											style=
												"transform:translateX({2-(30-stackFontSize)/2}px);
												top: {baseStackOffset + uiState.bar.lineGap + 6 + (stackFontSize+stackPadding) * gameState.stacks[key].idx}px;
												height: {stackFontSize}px;
												width: {stackFontSize}px;
												"
											class="pe-icon"
											title={gameState.stacks[key].title}
											alt={gameState.stacks[key].title}
										/>
									{/if}
								{/each}

							</button>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="settings-panel col-span-{uiState.settingsPanelCollapsed ? '0' : '6'} {uiState.settingsPanelCollapsed ? 'collapsed' : ''}"
				style={uiState.settingsPanelCollapsed ? 'visibility: hidden; height: 0; margin: 0;' : ''}>
                <button 
                    class="collapse-button"
                    onclick={() => uiState.settingsPanelCollapsed = true}
                    style="visibility: visible;"
                >
                    → Hide
                </button>
                <div class="settings-content">
                    <RotationSettings bind:settings={gameState.settings} updateDamages={calculateTotalDamageNew} stacks={gameState.stacks} />
                </div>
            </div>
            <div class="col-span-12 mt-8">
                <div class="grid grid-cols-2 gap-6">
					<div class="card card-rotation col-span-2">
					<h2 class="card-title pb-5">User Guide</h2>
					<div class="pb-5">
						<p>
							This is a beta of the rotation builder. Currently, only ranged is supported.
							<br>
							To add abilities, left clicking will add a new ability to the end of your 
							bar. You can also drag abilities for more control. Right clicking an ability
							on the bar will remove it. 
							<br><br>
							There are 3 tools - regular, stall, and null.
							<br>
							<strong>Regular</strong> is the default mode (keyboard <strong>R</strong>) - left click to add abilities, right click to remove, drag to move.
							<br>
							<strong>Stall</strong> mode (keyboard <strong>S</strong>) will allows you to stall the ability you left click on, and release
							it on any tick on the bar. Stalled abilities can be removed by clicking them in stall mode.
							<br>
							<strong>Null</strong> mode (keyboard <strong>N</strong>) will null the ability you left click on, which is equivalent to casting that ability
							on a dummy.
							
						</p>
					</div>
					<div class="pb-5">
						<p>
							You can configure how much information you are shown, as well as how much 
							adrenaline and how many stacks you start with in settings.
						</p>
					</div>
					<div class="pb-5">
						<p>
							Please report any bugs or errors you find in the RSA discord.
						</p>
					</div>
					</div>
				</div>
            </div>
		</section>
	</div>
</div>

