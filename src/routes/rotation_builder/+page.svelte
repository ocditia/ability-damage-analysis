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
	import { abils } from '$lib/calc/const';
    import RotationSettings from '../../components/Settings/RotationSettings.svelte';
    import AbilityChoice from '../../components/RotationBuilder/AbilityChoice.svelte';
	import { createBuffTimings, createStackTimings} from '$lib/calc/rotation_builder/rotation_consts.ts';
	import {ToolMode} from '$lib/calc/rotation_builder/ui_material/toolModes.ts';
        import ExtraActionsPanel from '../../components/RotationBuilder/ExtraActionsPanel.svelte';
    import DamageDistributionChart from '../../components/RotationBuilder/DamageDistributionChart.svelte';
    import { calculateTotalDamage, calculateGaussianParameters } from '$lib/calc/rotation_builder/rotation-damage-calculator';
    import { magic_buff_abilities } from '$lib/magic/buff_abilities';
    	import TabButton from '../../components/UI/TabButton.svelte';
    import Button from '../../components/UI/Button.svelte';
    import GradientSeparator from '../../components/UI/GradientSeparator.svelte';
    import Popup from '../../components/UI/Popup.svelte';
    import { uiStore, uiActions } from '$lib/stores/uiStore.js';
    import { notificationStore, notifActions } from '$lib/stores/notificationStore.js';
    import { rotationStore, rotationActions } from '$lib/stores/rotationStore.js';
	
    let necroAbils = {...necro_dmg_abilities}; //TODO add other styles buff abilities eventually
    let meleeAbils = {...melee_dmg_abilities};
    let magicAbils = {...magic_dmg_abilities, ...magic_buff_abilities};
	let rangedAbils = {...r_dmg_abilities, ...ranged_buff_abilities};
	let defAbils = {...def_abilities};
    let allAbils = {...magicAbils, ...rangedAbils, ...necroAbils, ...meleeAbils, ...def_abilities};

	let specialAbils = {...offGcdAbilities};
	let extraActions = {...specialAbils};

	// UI Constants
	const BASE_BAR_ROW_GAP = 30;
	const BAR_SIZE = 200;
	const EXTRA_BAR_SIZE = 12;
	const stackFontSize = 10;
	const baseStackOffset = 32;
	const stackPadding = 2;
	const buffLineWidth = 32;
	const buffLineHeight = 6;

	// Configuration management is now handled by rotationStore
	
	// Notification state is now managed by notificationStore

	// Rotation management is now handled by rotationStore
	
	// Notification helpers now use notificationStore

	// Game state is now managed by rotationStore

	const tabs = [
		{ id: 'ranged', label: 'Ranged', abilities: rangedAbils },
		{ id: 'magic', label: 'Magic', abilities: magicAbils },
		{ id: 'melee', label: 'Melee', abilities: meleeAbils },
		{ id: 'necro', label: 'Necro', abilities: necroAbils },
		{ id: 'defence', label: 'Defence', abilities: defAbils }
	];

	// Configuration management functions now use rotationStore

	function exportToFile() {
		notifActions.showInputPrompt(
			'Export Rotation',
			'Enter a name for your rotation file:',
			'Rotation name...',
			(rotationName) => {
				rotationActions.exportToFile(
					rotationName,
					(message) => notifActions.showNotification('Success!', message, 'success'),
					(message) => notifActions.showNotification('Failed', message, 'error')
				);
			}
		);
	}

	function importFromFile() {
		rotationActions.importFromFile(
			(message) => notifActions.showNotification('Success!', message, 'success'),
			(message) => notifActions.showNotification('Failed', message, 'error')
		);
	}

	function clearAllSavedConfigs() {
		notifActions.showConfirmation(
			'Clear All Configurations?',
			'Are you sure you want to delete ALL saved configurations? This action cannot be undone.',
			() => {
				rotationActions.clearAllSavedConfigs(
					(message) => notifActions.showNotification('Success!', message, 'success'),
					(message) => notifActions.showNotification('Failed', message, 'error')
				);
			}
		);
	}

	function calculateTotalDamageNew() {
		const dmgResult = calculateTotalDamage(gameState, BAR_SIZE);
		gameState.totalDamage = dmgResult[0];
		gameState.poisonDamage = dmgResult[1];
		gameState.familiarDamage = dmgResult[2];
		distributionStats = dmgResult[3];
		
		// Calculate Gaussian parameters for more accurate damage modeling
		const gaussianParams = calculateGaussianParameters(distributionStats);
		console.log(
			'Total Damage = ' + gameState.totalDamage + 
			' (Poison Damage = ' + gameState.poisonDamage + '; ' + 
			'Familiar Damage = ' + gameState.familiarDamage + ')' +
			' | Gaussian Model: Mean = ' + Math.round(gaussianParams.mean) + 
			', StdDev = ' + Math.round(gaussianParams.stdDev)
		);
	}
		
	//UI functions
	//TODO handle this differently
    function handleAbilityClick(event, abilityKey, mainBar = true) {
        if (uiStore.activeTool === ToolMode.Stall) {
            // Check if ability is channeled
            if (abils[abilityKey]['ability classification'] === 'channel') {
                notifActions.showNotification('Sorry!','Channeled abilities cannot be stalled currently.', 'info');
                return;
            }
            uiActions.setStallingAbility(abilityKey);
            return;
        }

        let size = mainBar ? BAR_SIZE : EXTRA_BAR_SIZE;
        let idx = mainBar ? uiStore.bar.index : uiStore.extraActions.barIndex;

		if (idx >= size) {
			notifActions.showNotification('Sorry!','You\'re trying to add an ability after the end of the rotation.', 'error');
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

	/**
	 * Checks if a buff is active at a given tick
	 * @param key - The key of the buff to check
	 * @param tick - The tick to check
	 */
	function buffActive(key, tick) {
		let active = false;
		//TODO make separate ranged and necro split souls
		if (key === 'split soul ecb') {
			active = gameState.buffs['split soul'].buffTicks[tick];
		} 
		else if (key === SETTINGS.DRACOLICH_INFUSION_VALUES.GREATER) {
			console.log(`Tick ${tick} - gameState.buffs[key].buffTicks[${tick}] = ${gameState.buffs[key].buffTicks[tick]}`);
			if (tick > 0) {
				active = gameState.buffs[key].buffTicks[tick]; 
				// Edraco is calced after the last rapid hit, so we offset by one
				active = active != false && active !== SETTINGS.DRACOLICH_INFUSION_VALUES.NONE;
			}
			else {
				active = false;
			}
		}
		else {
			active = gameState.buffs[key].buffTicks[tick];
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
		uiActions.clearDragDrop();
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
		uiActions.setDragDropHoveredSlot(index);
		uiActions.setDragDropValidSlot(true);
		
		let data = event.dataTransfer.getData('text/plain');
		if (!allAbils[data]) {
			try {
			data = JSON.parse(event.dataTransfer.getData('text/plain'));
			if ((index - data.startIndex) <= 2 && index >= data.startIndex) {
					uiActions.setDragDropValidSlot(true);
				return;
			}
			} catch (e) {
				console.error('Error parsing drag data:', e);
		}
		}
		
		for (let i = index-1; i >= (index - 2); i--) {
			if (i < 0) return;
			if (gameState.abilityBar[i] != null) {
        		uiActions.setDragDropValidSlot(false);
			}
		}
    }

    function handleDragLeave(event, index) {
        if (uiStore.dragDrop.hoveredSlot === index) {
            uiActions.setDragDropHoveredSlot(null);
        }
    }

	function handleBarLeftClick(event, ability, index) {
        event.currentTarget.focus();

		if (uiStore.activeTool === ToolMode.Null) {
			gameState.nulledTicks[index] = !gameState.nulledTicks[index];
			refreshUI();
			return;
		}

		if (uiStore.activeTool === ToolMode.Stall) {
			if (gameState.stalledAbilities[index]) {
				gameState.stalledAbilities[index] = null;
			} else if (uiStore.stallingAbility) {
				gameState.stalledAbilities[index] = uiStore.stallingAbility;
				uiActions.clearStallingAbility();
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

		if (uiStore.extraActions.show) {
			if (index == uiStore.extraActions.tick) {
				uiActions.hideExtraActions();
			}
			else {
				uiActions.showExtraActions(index, ability);
			}
		}
		else {
			uiActions.showExtraActions(index, ability);
		}
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
		uiActions.updateBarLastIndex(0);
		for (let i = 0; i < BAR_SIZE; i++) {
			if (gameState.abilityBar[i] != null) {
				uiActions.updateBarLastIndex(i);
			}
		}
		uiActions.updateBarIndex(uiStore.bar.lastIndex);
		let abilToAdd = abils[gameState.abilityBar[uiStore.bar.lastIndex]];
		if (abilToAdd) {
			uiActions.updateBarIndex(uiStore.bar.lastIndex + (abilToAdd['duration'] || 3));
		}

		//Update extra action bar pointer
		uiStore.extraActions.barIndex = 0;
		if (uiStore.extraActions.show) {
			for (let i = 0; i < EXTRA_BAR_SIZE; i++) {
				if (gameState.extraActionBar[uiStore.extraActions.tick][i] === null) {
					uiStore.extraActions.barIndex = i;
					break;
				}
			}
		}

		//Handle stacks
		let i = 0;
		uiActions.updateBarRowGap(BASE_BAR_ROW_GAP);
		for (let key in gameState.stacks) {
			let displaySetting = gameState.stacks[key]['displaySetting'];
			let disp = gameState.settings[displaySetting];
			if (disp['value']) {
				gameState.stacks[key]['idx'] = i;
				uiActions.updateBarRowGap(uiStore.bar.rowGap + (stackFontSize + stackPadding));
				i++;
			} else {
				gameState.stacks[key]['idx'] = -1;
			}
		}

		//handle buff indicator bars
		i = 0;
		uiActions.updateBarLineGap(0);
		for (let key in gameState.buffs) {
			if (gameState.buffs[key].buffTicks.some(value => value !== 0 && value !== false && value !== null && value !== 'none')) {
				gameState.buffs[key].idx = i;
				uiActions.updateBarRowGap(uiStore.bar.rowGap + buffLineHeight);
				uiActions.updateBarLineGap(uiStore.bar.lineGap + buffLineHeight);
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
        uiActions.handleKeypress(event);
    }

    function exportToString() {
        rotationActions.exportToString(
            (message) => notifActions.showNotification('Success!', message, 'success'),
            (message) => notifActions.showNotification('Failed', message, 'error')
        );
    }

    function importFromString() {
        notifActions.showInputPrompt(
            'Import Rotation String',
            'Paste your rotation string:',
            'Paste rotation string here...',
            (importStr) => {
                rotationActions.importFromString(
					importStr,
					(message) => notifActions.showNotification('Success!', message, 'success'),
					(message) => notifActions.showNotification('Failed', message, 'error')
				);
            }
        );
    }
</script>

<style>

	.responsive-container {
		margin-left: 0% !important;
		margin-right: 0% !important;
		padding-left: 3% !important;
		padding-right: 3% !important;
		max-width: 100% !important;
	}

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

	/* Configuration Management Styles */
	.config-section {
		margin-top: 0rem;
		margin-bottom: 1.0rem;
		padding: 0.0rem 0.0rem 0.5rem 0.0rem;
		border: 1px solid #444;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.2);
	}

	.config-title {
		margin: 0 0 1rem 0;
		padding: 0.5rem 0.5rem 0.5rem 0.5rem;
		font-size: 1.1rem;
		color: #fff;
		font-weight: 600;
	}

	.config-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.0rem;
		margin-bottom: 0rem;
	}

	.saved-configs {
		margin-top: 1rem;
	}

	.saved-configs h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: #ccc;
	}

	.config-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.config-item {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	.config-load-btn {
		flex: 1;
		text-align: left;
		font-size: 0.85rem;
		padding: 0.25rem 0.5rem;
	}

	.config-delete-btn {
		padding: 0.25rem 0.5rem;
		min-width: auto;
	}

	.show-more-btn {
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
	}

	/* Configuration Management Styles */
	.config-selector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.config-management {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #444;
	}

	.clear-all-btn {
		width: 100%;
		background: #8b0000;
		color: #fff;
	}

	.clear-all-btn:hover {
		background: #a00000;
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
		height: 100%;
	}

	.card-rotation {
		height: fit-content;
	}

	
</style>

<Navbar />
<Header img="/range_background.png" text="Rotation Calculator Beta" icon="/style_icons/rota_icon.svg" />

<div class="space-y-14 mt-10 z-20">
	<div class="responsive-container {uiStore.activeTool.toLowerCase()}-cursor {uiStore.stallingAbility ? 'stalling' : ''}" 
		tabindex="-1" 
		role="button" 
		onkeydown={handleKeypress}
		style={uiStore.stallingAbility ? `cursor: url('${allAbils[uiStore.stallingAbility].icon}') 15 15, wait;` : ''}>
		<section class="grid grid-cols-12 gap-6 auto-rows-min">
			<div class="col-span-{uiStore.settingsPanelCollapsed ? '12' : '6'} relative">
				<div class="card card-rotation">
					{#if uiStore.settingsPanelCollapsed}
						<button 
							class="expand-button"
							onclick={() => uiActions.toggleSettingsPanel()}
						>
							Settings ←
						</button>
					{/if}
					<h1 class="rotation-header">Rotation</h1>
					<GradientSeparator marginTop="0.0rem" marginBottom="1.5rem" />
					
					<!-- Damage Distribution Chart -->
					{#if rotationStore.distributionStats.length > 0}
						<DamageDistributionChart 
							distributionStats={rotationStore.distributionStats}
							totalDamage={rotationStore.totalDamage}
							poisonDamage={rotationStore.poisonDamage}
							familiarDamage={rotationStore.familiarDamage}
						/>
					{/if}
                    <div class="space-y-4 mt-4">
						<Button onClick={() => clearRotation()} variant="reset">
							Reset
						</Button>
						
						<!-- IO Management -->
						<div>
							<div class="config-section">
								<div class="config-header" 
									onclick={() => uiActions.toggleConfigSection()}
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											uiActions.toggleConfigSection();
										}
									}}
									role="button"
									tabindex="0"
								>
									<h3 class="config-title">Save & Load Rotations</h3>
									<button class="config-toggle">
										{uiStore.configSectionCollapsed ? '▼' : '▲'}
									</button>
								</div>
								
								{#if !uiStore.configSectionCollapsed}
									<div class="config-content">
										<div class="config-buttons">
											<Button onClick={() => notifActions.showInputPrompt(
												'Save Rotation',
												'Enter a name for your rotation:',
												'Rotation name...',
												(rotationName) => {
													const result = rotationActions.saveRotation(
														rotationName,
														(message) => notifActions.showNotification('Success!', message, 'success'),
														(message) => notifActions.showNotification('Failed', message, 'warning')
													);
													
													if (result && result.needsConfirmation) {
														notifActions.showConfirmation(
															'Overwrite Rotation?',
															`A rotation named "${rotationName.trim()}" already exists. Do you want to overwrite it?`,
															() => {
																rotationActions.overwriteRotation(
																	result.config,
																	result.existingIndex,
																	(message) => notifActions.showNotification('Success!', message, 'success'),
																	(message) => notifActions.showNotification('Failed', message, 'error')
																);
															}
														);
													}
												}
											)} variant="primary">
												💾 Save Rotation
											</Button>
											<Button onClick={() => exportToFile()} variant="secondary">
												📄 Export to File
											</Button>
											<Button onClick={() => importFromFile()} variant="secondary">
												📄 Import from File
											</Button>
										</div>
										
										<!-- Quick Access to Saved Configs -->
										{#if rotationStore.savedRotations.length > 0}
											<div class="saved-configs">
												<h4>Quick Load:</h4>
												<div class="config-list">
													{#each rotationStore.savedRotations.slice(0, 5) as config}
														<div class="config-item">
															<Button 
																onClick={() => rotationActions.loadRotation(
																	config.id,
																	(message) => notifActions.showNotification('Success!', message, 'success'),
																	(message) => notifActions.showNotification('Failed', message, 'error')
																)} 
																variant="secondary" 
																class="config-load-btn"
																title="Load {config.name}"
															>
																{config.name}
															</Button>
															<Button 
																onClick={() => notifActions.showConfirmation(
																	'Delete Rotation?',
																	`Are you sure you want to delete "${config.name}"? This action cannot be undone.`,
																	() => {
																		rotationActions.deleteRotation(
																			config.id,
																			(message) => notifActions.showNotification('Success!', message, 'success'),
																			(message) => notifActions.showNotification('Failed', message, 'error')
																		);
																	}
																)} 
																variant="reset" 
																class="config-delete-btn"
																title="Delete {config.name}"
															>
																🗑️
															</Button>
														</div>
													{/each}
												</div>
												{#if rotationStore.savedRotations.length > 5}
													<Button onClick={() => {
														const configOptions = rotationStore.savedRotations.slice(5).map(config => ({
															value: config.id,
															label: `${config.name} (${new Date(config.timestamp).toLocaleDateString()})`
														}));
														
														notifActions.showInputPrompt(
															'Load Rotation',
															'Select a rotation to load:',
															'Choose rotation...',
															(configId) => {
																rotationActions.loadRotation(
																	configId,
																	(message) => notifActions.showNotification('Success!', message, 'success'),
																	(message) => notifActions.showNotification('Failed', message, 'error')
																);
															}
														);
													}} variant="secondary" class="show-more-btn">
														Show {rotationStore.savedRotations.length - 5} more...
													</Button>
												{/if}
											</div>
										{/if}

										<div class="config-buttons">
											<Button onClick={() => importFromString()} variant="secondary">
												Import String
											</Button>
											<Button onClick={() => exportToString()} variant="secondary" title="Copy Rotation to Clipboard">
												Export String
											</Button>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
					
                    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
                        {#each tabs as tab}
                            <TabButton 
                                id={tab.id}
                                label={tab.label}
                                isActive={uiStore.activeTab === tab.id}
                                onClick={() => uiActions.setActiveTab(tab.id)}
                            />
                        {/each}
                    </ul>
					<br>
                    {#each tabs as tab}
                        {#if uiStore.activeTab === tab.id}
                            <AbilityChoice 
                                abilities={tab.abilities}
                                handleAbilityClick={handleAbilityClick}
									handleDragStart={handleDragStart} 
                                style={tab.id}
											/>
										{/if}
								{/each}
					{#if uiStore.extraActions.show}
						<ExtraActionsPanel
							uiState={uiStore}
							{gameState}
							{allAbils}
							{handleAbilityClickExtra}
							{handleDragStart}
							{handleBarRightClick}
							{handleDragStartBar}
							extraActions={uiStore.extraActions}
							closeExtraActions={() => uiActions.hideExtraActions()}
							setExtraActionsTab={(tab) => uiActions.setExtraActionsTab(tab)}
						/>
					{/if}
                    <div style="row-gap:{uiStore.bar.rowGap}px;" class="ability-bar">
						{#each rotationStore.abilityBar as ability, index}
							<button
									class="ability-slot"
									class:highlight-red={uiStore.dragDrop.hoveredSlot === index && !uiStore.dragDrop.validSlot}
									class:highlight-green={uiStore.dragDrop.hoveredSlot === index && uiStore.dragDrop.validSlot}
									class:nulled={rotationStore.nulledTicks[index]}
									class:has-extra-actions={rotationStore.extraActionBar[index]?.some(action => action !== null)}
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
												top: {baseStackOffset + uiStore.bar.lineGap + 3 + (stackFontSize+stackPadding) * gameState.stacks[key].idx}px;
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
												top: {baseStackOffset + uiStore.bar.lineGap + 6 + (stackFontSize+stackPadding) * gameState.stacks[key].idx}px;
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
            <div class="settings-panel col-span-{uiStore.settingsPanelCollapsed ? '0' : '6'} {uiStore.settingsPanelCollapsed ? 'collapsed' : ''}"
				style={uiStore.settingsPanelCollapsed ? 'visibility: hidden; height: 0; margin: 0;' : ''}>
                <div class="settings-content">
                    <RotationSettings bind:settings={gameState.settings} updateDamages={calculateTotalDamageNew} stacks={gameState.stacks} uiState={uiStore} />
                </div>
            </div>
            <div class="col-span-12 mt-8">
                <div class="grid grid-cols-2 gap-6">
					<div class="card card-rotation col-span-2">
					<h2 class="card-title pb-5">User Guide</h2>
					<div class="pb-5">
						<p>
							This is a beta of the rotation builder. Currently, only ranged is fully supported; magic is in progress.
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
							on a dummy - any buffs or self-stacks will be applied normally, but damage will be 0.
						</p>
					</div>
					<div class="pb-5">
						<p>
							Please report any bugs or errors you find in the RSA discord. For a more comprehensive guide, check out our 
							<a href="/rotation_builder_guide" class="text-blue-400 hover:underline hover:text-blue-300">
							User Guide
							</a>.
						</p>
					</div>
					</div>
				</div>
            </div>
		</section>
	</div>
</div>

<!-- Save and Load dialogs are now handled by Popup components -->

<!-- Notification Popup -->
<Popup 
    bind:show={notificationStore.notification.show}
    title={notificationStore.notification.title}
    message={notificationStore.notification.message}
    type={notificationStore.notification.type}
/>

<!-- Confirmation Dialog -->
<Popup 
    bind:show={notificationStore.confirmationDialog.show}
    title={notificationStore.confirmationDialog.title}
    message={notificationStore.confirmationDialog.message}
    type="warning"
    confirmText="Confirm"
    cancelText="Cancel"
    on:confirm={() => {
        if (notificationStore.confirmationDialog.onConfirm) notificationStore.confirmationDialog.onConfirm();
        notifActions.hideConfirmationDialog();
    }}
    on:cancel={() => {
        if (notificationStore.confirmationDialog.onCancel) notificationStore.confirmationDialog.onCancel();
        notifActions.hideConfirmationDialog();
    }}
/>

<!-- Input Prompt Dialog -->
<Popup 
    bind:show={notificationStore.inputPrompt.show}
    title={notificationStore.inputPrompt.title}
    message={notificationStore.inputPrompt.message}
    type="info"
    confirmText="Submit"
    cancelText="Cancel"
    on:confirm={() => {
        if (notificationStore.inputPrompt.onSubmit && notificationStore.inputPrompt.value.trim()) {
            notificationStore.inputPrompt.onSubmit(notificationStore.inputPrompt.value.trim());
        }
        notifActions.hideInputPrompt();
    }}
    on:cancel={() => {
        if (notificationStore.inputPrompt.onCancel) notificationStore.inputPrompt.onCancel();
        notifActions.hideInputPrompt();
    }}
>
    <input 
        type="text" 
        bind:value={notificationStore.inputPrompt.value} 
        placeholder={notificationStore.inputPrompt.placeholder}
        onkeydown={(e) => e.key === 'Enter' && notificationStore.inputPrompt.value.trim() && notificationStore.inputPrompt.onSubmit && notificationStore.inputPrompt.onSubmit(notificationStore.inputPrompt.value.trim())}
        autofocus
        style="width: 100%; padding: 0.5rem; border: 1px solid #555; border-radius: 4px; background: #1a1a1a; color: #fff; font-size: 0.9rem;"
    />
</Popup>