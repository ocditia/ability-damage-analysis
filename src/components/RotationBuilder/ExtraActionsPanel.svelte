<script>
    import { onMount } from 'svelte';
    import AbilityChoice from './AbilityChoice.svelte';
    import GearChoice from './GearChoice.svelte';
    import { offGcdAbilities, prayers, spells, consumables, allExtraActions, gearSwaps } from '$lib/special/abilities';
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { settingsStore, initializeSettings } from '$lib/stores/settingsStore.svelte.js';
    import { rotationStore } from '$lib/stores/rotationStore.svelte.js';

    // Initialize settings on component mount
    onMount(async () => {
        await initializeSettings();
    });

    export let uiState;
    export let gameState;
    export let allAbils;
    export let handleAbilityClickExtra;
    export let handleDragStart;
    export let handleBarRightClick;
    export let handleDragStartBar;
    export let extraActions;

    // Quick action callbacks
    export let onRemoveAbility = () => {};
    export let onToggleNull = () => {};

    export let onRefreshUI = () => {};

    // Mutation functions to avoid prop mutation warnings
    export let closeExtraActions = () => {};
    export let setExtraActionsTab = (tab) => {};

    const EXTRA_BAR_SIZE = 12;
    $: tick = uiState.extraActions.tick;

    // Build gear state at the selected tick by applying gear swaps from tick 0 to tick
    function buildGearState(currentTick) {
        const state = {};
        const settings = settingsStore.settings;
        for (const key of Object.keys(settings)) {
            if (settings[key]?.value !== undefined) {
                state[key] = settings[key].value;
            }
        }
        if (currentTick >= 0 && rotationStore.extraActionBar) {
            for (let t = 0; t <= currentTick; t++) {
                const actions = rotationStore.extraActionBar[t];
                if (!actions) continue;
                for (const action of actions) {
                    if (!action) continue;
                    // New ExtraAction format — has .type and .slot
                    if (action.type === 'gear' && action.slot) {
                        state[action.slot] = action.value;
                        if (action.slot === SETTINGS.AMMO) {
                            const styleAmmo = ammoKeys[uiState.activeTab];
                            if (styleAmmo) state[styleAmmo] = action.value;
                        }
                        continue;
                    }
                    // Legacy format fallback
                    const key = typeof action === 'string' ? action : action.title;
                    if (!key) continue;
                    const slot = gearSwaps[key];
                    if (slot) {
                        state[slot] = key;
                        if (slot === SETTINGS.AMMO) {
                            const styleAmmo = ammoKeys[uiState.activeTab];
                            if (styleAmmo) state[styleAmmo] = key;
                        }
                    }
                }
            }
        }
        return state;
    }

    function getGearState() {
        return buildGearState(tick);
    }

    const slotFallbacks = {
        helmet: '/armour_icons/Head_slot.webp',
        body: '/armour_icons/Torso_slot.png',
        legs: '/armour_icons/Legs_slot.png',
        gloves: '/armour_icons/Hands_slot.webp',
        boots: '/armour_icons/Feet_slot.png',
        necklace: '/armour_icons/Neck_slot.png',
        cape: '/armour_icons/Back_slot.png',
        ring: '/armour_icons/Ring_slot.png',
        pocket: '/armour_icons/Pocket_slot.webp',
        ammo: '/armour_icons/Ammo_slot.png',
    };

    const stylePrefix = { ranged: 'ranged', magic: 'magic', melee: 'melee', necro: 'necro' };
    const sharedSlots = ['necklace', 'ring', 'cape', 'pocket'];

    const ammoKeys = {
        ranged: SETTINGS.RANGED_AMMO_SLOT,
        magic: SETTINGS.MAGIC_AMMO_SLOT,
        melee: SETTINGS.MELEE_AMMO_SLOT,
        necro: SETTINGS.NECRO_AMMO_SLOT,
    };

    function getAmmoIcon() {
        const gs = getGearState();
        // Check per-style ammo slot first, then fall back to old shared 'ammo' key
        const key = ammoKeys[uiState.activeTab];
        const val = (key && gs[key]) || gs[SETTINGS.AMMO];
        if (!val || val === 'none' || val === 'custom') return slotFallbacks.ammo;
        const base = val.replace(/ \(e\)$/, '');
        return `/gear_icons/ranged/${base}.png`;
    }

    function getEquipIcon(slot) {
        const prefix = sharedSlots.includes(slot) ? '' : (stylePrefix[uiState.activeTab] ?? 'ranged') + ' ';
        const key = prefix + slot;
        const val = getGearState()[key];
        if (!val || val === 'none' || val === 'custom' || val === 'custom oh' || val === 'custom th') return slotFallbacks[slot];
        const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        const folder = sharedSlots.includes(slot) ? 'shared' : (stylePrefix[uiState.activeTab] ?? 'shared');
        return `/gear_icons/${folder}/${base}.png`;
    }

    const weaponTypeKeys = {
        ranged: SETTINGS.WEAPON_TYPE_RANGED,
        magic: SETTINGS.WEAPON_TYPE_MAGE,
        melee: SETTINGS.WEAPON_TYPE_MELEE,
    };
    const weaponKeys = {
        ranged: { mh: SETTINGS.RANGED_MH, oh: SETTINGS.RANGED_OH, th: SETTINGS.RANGED_TH },
        magic: { mh: SETTINGS.MAGIC_MH, oh: SETTINGS.MAGIC_OH, th: SETTINGS.MAGIC_TH },
        melee: { mh: SETTINGS.MELEE_MH, oh: SETTINGS.MELEE_OH, th: SETTINGS.MELEE_TH },
        necro: { mh: SETTINGS.NECRO_MH, oh: SETTINGS.NECRO_OH },
    };

    // Can't use $: here as it doesn't track rune state - computed in template via {#key tick}

    function getWeaponIcon(hand) {
        const st = uiState.activeTab;
        const wk = weaponKeys[st];
        if (!wk) return '/armour_icons/Main_hand_slot.webp';

        const key = hand === 'th' ? wk.th : hand === 'oh' ? wk.oh : wk.mh;
        if (!key) return getWeaponFallback(hand);
        const val = getGearState()[key];
        if (!val || val === 'none' || val === 'custom' || val === 'custom oh' || val === 'custom th') {
            return getWeaponFallback(hand);
        }
        const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        return `/gear_icons/${st}/${base}.png`;
    }

    function getWeaponBadge(hand) {
        const wk = weaponKeys[uiState.activeTab];
        if (!wk) return null;
        const key = hand === 'th' ? wk.th : hand === 'oh' ? wk.oh : wk.mh;
        if (!key) return null;
        const val = getGearState()[key];
        if (!val) return null;
        if (val.endsWith(' [IM]')) return '/effect_icons/shard_of_genesis.png';
        return null;
    }

    function getWeaponFallback(hand) {
        return hand === 'mh' ? '/armour_icons/Main_hand_slot.webp'
            : hand === 'th' ? '/armour_icons/2h_slot.png'
            : '/armour_icons/Off-hand_slot.webp';
    }

    $: currentAbility = tick !== undefined && tick >= 0 && rotationStore.abilityBar && rotationStore.abilityBar[tick] ? allAbils[rotationStore.abilityBar[tick]] : null;
    $: currentAbilityKey = tick !== undefined && tick >= 0 && rotationStore.abilityBar ? rotationStore.abilityBar[tick] : null;
    $: currentStalledAbility = tick !== undefined && tick >= 0 && gameState.stalledAbilities && gameState.stalledAbilities[tick] ? allAbils[gameState.stalledAbilities[tick]] : null;
    $: isNulled = tick !== undefined && tick >= 0 && rotationStore.nulledTicks && rotationStore.nulledTicks[tick];

    // Per-tick damage breakdown
    function getTickDamage(tick) {
        if (!rotationStore.distributionStats || rotationStore.distributionStats.length === 0 || tick === undefined || tick < 0) {
            return [];
        }
        return rotationStore.distributionStats
            .filter(stat => stat.tick === tick)
            .map(stat => {
                let expected;
                if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
                    expected = stat.critProbability * stat.critMean + (1 - stat.critProbability) * stat.nonCritMean;
                } else {
                    expected = (stat.minDamage + stat.maxDamage) / 2;
                }
                return {
                    ability: stat.ability,
                    expected: Math.round(expected * stat.likelihood),
                    min: Math.round(stat.minDamage * stat.likelihood),
                    max: Math.round(stat.maxDamage * stat.likelihood),
                    likelihood: stat.likelihood
                };
            });
    }

    // Active buffs at this tick
    function getTickBuffs(tick) {
        if (!rotationStore.buffs || tick === undefined || tick < 0) return [];
        return Object.entries(rotationStore.buffs)
            .filter(([_, buff]) => buff.buffTicks && buff.buffTicks[tick])
            .map(([key, buff]) => ({ key, title: buff.title, colour: buff.colour }));
    }

    // Stack values at this tick
    function getTickStacks(tick) {
        if (!rotationStore.stacks || tick === undefined || tick < 0) return [];
        return Object.entries(rotationStore.stacks)
            .filter(([_, stack]) => stack.idx >= 0 && stack.stackTicks && stack.stackTicks[tick] !== 0)
            .map(([key, stack]) => ({
                key, title: stack.title,
                value: stack.stackTicks[tick],
                colour: stack.colour,
                image: stack.image
            }));
    }

    function calculateCumulativeDamage() {
        if (!rotationStore.distributionStats || rotationStore.distributionStats.length === 0 || tick === undefined || tick < 0) {
            return { total: 0, mean: 0, min: 0, max: 0 };
        }

        let totalDamage = 0;
        let totalLikelihood = 0;
        let minDamage = 0;
        let maxDamage = 0;

        rotationStore.distributionStats.forEach(stat => {
            if (stat.tick <= tick) {
                if (stat.distributionType === 'combined' && stat.critProbability !== undefined) {
                    const critDamage = stat.critProbability * stat.critMean;
                    const nonCritDamage = (1 - stat.critProbability) * stat.nonCritMean;
                    const expectedDamage = critDamage + nonCritDamage;

                    totalDamage += expectedDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                } else {
                    const meanDamage = (stat.minDamage + stat.maxDamage) / 2;
                    totalDamage += meanDamage * stat.likelihood;
                    totalLikelihood += stat.likelihood;
                    minDamage += stat.minDamage * stat.likelihood;
                    maxDamage += stat.maxDamage * stat.likelihood;
                }
            }
        });

        if (totalLikelihood > 0) {
            return {
                total: Math.round(totalDamage),
                mean: Math.round(totalDamage),
                min: Math.round(minDamage),
                max: Math.round(maxDamage)
            };
        }

        return { total: 0, mean: 0, min: 0, max: 0 };
    }

    function formatDamage(damage) {
        if (damage >= 1000000) {
            return (damage / 1000000).toFixed(1) + 'M';
        } else if (damage >= 1000) {
            return (damage / 1000).toFixed(1) + 'K';
        }
        return damage.toString();
    }

    function handleRemoveAbility() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.abilityBar[tick] = null;
            onRemoveAbility();
        }
    }

    function handleToggleNull() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.nulledTicks[tick] = !rotationStore.nulledTicks[tick];
            onRefreshUI();
        }
    }

    function handleRemoveStall() {
        if (tick !== undefined && tick >= 0) {
            rotationStore.stalledAbilities[tick] = null;
            onRefreshUI();
        }
    }
</script>

    <div class="extra-action-section">
        <!-- Header -->
        <div class="flex justify-between items-center w-full">
            <p class="flex-grow text-center font-bold">Tick {tick}</p>
            <button
                class="text-[#C2BA9E] font-bold text-xl hover:text-[#968A5C]"
                onclick={closeExtraActions}
            >
                x
            </button>
        </div>

         <!-- Ability summary + quick actions -->
         <div class="tick-summary">
            <div class="flex items-center gap-2">
                {#if currentAbility}
                    <img src={currentAbility.icon}
                        alt={currentAbility.title}
                        style="width: 36px; height: 36px; background-color: #333; border: 1px solid #666;"
                        title="{currentAbility.title}"
                    />
                    <div>
                        <p class="text-sm font-bold">{currentAbility.title}</p>
                    </div>
                {:else}
                    <div style="width: 36px; height: 36px; background-color: #333; border: 1px solid #666; display: flex; align-items: center; justify-content: center;">
                        <span class="text-xs text-gray-500">-</span>
                    </div>
                    <p class="text-sm text-gray-400">Empty tick</p>
                {/if}
                {#if isNulled}
                    <span class="nulled-badge">Nulled</span>
                {/if}
            </div>
            {#if currentStalledAbility}
                <div class="flex items-center gap-2 mt-1">
                    <img src={currentStalledAbility.icon}
                        alt={currentStalledAbility.title}
                        style="width: 24px; height: 24px; background-color: #333; border: 1px solid #555;"
                        title="Stalled: {currentStalledAbility.title}"
                    />
                    <p class="text-xs text-gray-300">Stalled: {currentStalledAbility.title}</p>
                </div>
            {/if}
            <!-- Quick actions -->
            <div class="quick-actions">
                {#if currentAbility}
                    <button class="quick-btn" title="Remove ability" onclick={handleRemoveAbility}>Remove</button>
                {/if}
                <button class="quick-btn" class:active={isNulled} title="Toggle null" onclick={handleToggleNull}>
                    {isNulled ? 'Un-null' : 'Null'}
                </button>
                {#if currentStalledAbility}
                    <button class="quick-btn" title="Remove stall" onclick={handleRemoveStall}>Un-stall</button>
                {/if}
            </div>
        </div>
        <!-- Extra actions bar -->
        <div class="extra-actions-bar">
            {#each gameState.extraActionBar[tick] || Array(EXTRA_BAR_SIZE).fill(null) as action, subIndex}
                <button
                    class="action-slot"
                    style="background-color: #9da777;"
                    tabindex="0"
                    aria-label="Action slot"
                    oncontextmenu={(e) => handleBarRightClick(e, tick, subIndex)}
                >
                    {#if action}
                        {@const actionIcon = action.icon || allExtraActions[action]?.icon || ''}
                        {@const actionTitle = action.title || allExtraActions[action]?.title || ''}
                        <img src={actionIcon}
                            alt={actionTitle}
                            style="width: 100%; height: 100%; object-fit: contain;"
                            title={actionTitle}
                            draggable="true"
                            ondragstart={(e) => handleDragStartBar(e, action, tick)}
                        />
                    {/if}
                </button>
            {/each}
        </div>

       

        <!-- Info section -->
            <div class="info-tab">
                <!-- Per-tick damage -->
                {#if rotationStore.distributionStats && rotationStore.distributionStats.length > 0}
                    {@const tickDmg = getTickDamage(tick)}
                    {@const cumDmg = calculateCumulativeDamage()}

                    {#if tickDmg.length > 0}
                        <div class="info-section">
                            <p class="info-label">Damage on this tick</p>
                            {#each tickDmg as hit}
                                <div class="damage-row">
                                    <span class="text-xs text-gray-300">
                                        {#if allAbils[hit.ability]?.title}
                                            {allAbils[hit.ability].title.replace(/\b\w/g, l => l.toUpperCase())}
                                        {:else}
                                            {hit.ability.replace(/\b\w/g, l => l.toUpperCase())}
                                        {/if}
                                    </span>
                                    <span class="damage-val">{formatDamage(hit.expected)}</span>
                                    <span class="text-xs text-gray-500">({formatDamage(hit.min)}-{formatDamage(hit.max)})</span>
                                </div>
                            {/each}
                        </div>
                    {/if}

                    <div class="info-section">
                        <p class="info-label">Cumulative (ticks 0-{tick})</p>
                        <div class="damage-row">
                            <span class="damage-val-lg">{formatDamage(cumDmg.total)}</span>
                            {#if cumDmg.min !== cumDmg.max}
                                <span class="text-xs text-gray-500">({formatDamage(cumDmg.min)}-{formatDamage(cumDmg.max)})</span>
                            {/if}
                        </div>
                    </div>
                {/if}

                <!-- Buffs & Stacks side by side -->
                {#if getTickBuffs(tick).length > 0 || getTickStacks(tick).length > 0}
                    <div class="buffs-stacks-row">
                        {#if getTickBuffs(tick).length > 0}
                            <div class="info-section" style="flex: 1; min-width: 0;">
                                <p class="info-label">Active buffs</p>
                                <div class="buff-list">
                                    {#each getTickBuffs(tick) as buff}
                                        <div class="buff-item">
                                            <span class="buff-dot" style="background-color: {buff.colour};"></span>
                                            <span class="text-xs">{buff.title}</span>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                        {#if getTickStacks(tick).length > 0}
                            <div class="info-section" style="flex: 1; min-width: 0;">
                                <p class="info-label">Stacks</p>
                                <div class="stack-list">
                                    {#each getTickStacks(tick) as stack}
                                        <div class="stack-item">
                                            <img src={stack.image} alt={stack.title} style="width: 16px; height: 16px;" />
                                            <span class="text-xs">{stack.title}</span>
                                            <span class="stack-val" style="color: {stack.colour};">{stack.value?.toFixed ? stack.value.toFixed(1) : stack.value}</span>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- Equipped gear visual + actions -->
            <div class="actions-layout">
                <!-- Left: equipped gear grid -->
                <div class="equipped-panel">
                    {#key uiState.extraActions.tick}
                    {@const gs = buildGearState(uiState.extraActions.tick)}
                    {@const isTwoHanded = weaponTypeKeys[uiState.activeTab] && gs[weaponTypeKeys[uiState.activeTab]] === SETTINGS.WEAPON_VALUES.TH}
                    <div class="equip-grid">
                        <!--        Col1    Col2    Col3    -->
                        <!-- Row1:          Head    Pocket  -->
                        <div></div>
                        <div class="equip-cell"><img src={getEquipIcon('helmet')} alt='Head' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.helmet; }} /></div>
                        <div class="equip-cell"><img src={getEquipIcon('pocket')} alt='Pocket' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.pocket; }} /></div>
                        <!-- Row2:  Cape    Neck    Ammo    -->
                        <div class="equip-cell"><img src={getEquipIcon('cape')} alt='Cape' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.cape; }} /></div>
                        <div class="equip-cell"><img src={getEquipIcon('necklace')} alt='Neck' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.necklace; }} /></div>
                        <div class="equip-cell"><img src={getAmmoIcon()} alt='Ammo' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.ammo; }} /></div>
                        <!-- Row3:  MH/2H   Body    OH/empty -->
                        {#if isTwoHanded}
                            <div class="equip-cell equip-badgeable">
                                <img src={getWeaponIcon('th')} alt='2H' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = getWeaponFallback('th'); }} />
                                {#if getWeaponBadge('th')}<img src={getWeaponBadge('th')} alt="" class="equip-badge" />{/if}
                            </div>
                            <div class="equip-cell"><img src={getEquipIcon('body')} alt='Body' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.body; }} /></div>
                            <div></div>
                        {:else}
                            <div class="equip-cell equip-badgeable">
                                <img src={getWeaponIcon('mh')} alt='MH' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = getWeaponFallback('mh'); }} />
                                {#if getWeaponBadge('mh')}<img src={getWeaponBadge('mh')} alt="" class="equip-badge" />{/if}
                            </div>
                            <div class="equip-cell"><img src={getEquipIcon('body')} alt='Body' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.body; }} /></div>
                            <div class="equip-cell equip-badgeable">
                                <img src={getWeaponIcon('oh')} alt='OH' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = getWeaponFallback('oh'); }} />
                                {#if getWeaponBadge('oh')}<img src={getWeaponBadge('oh')} alt="" class="equip-badge" />{/if}
                            </div>
                        {/if}
                        <!-- Row4:          Legs            -->
                        <div></div>
                        <div class="equip-cell"><img src={getEquipIcon('legs')} alt='Legs' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.legs; }} /></div>
                        <div></div>
                        <!-- Row5:  Gloves  Boots   Ring    -->
                        <div class="equip-cell"><img src={getEquipIcon('gloves')} alt='Gloves' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.gloves; }} /></div>
                        <div class="equip-cell"><img src={getEquipIcon('boots')} alt='Boots' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.boots; }} /></div>
                        <div class="equip-cell"><img src={getEquipIcon('ring')} alt='Ring' class="equip-icon" onerror={(e) => { e.target.onerror = null; e.target.src = slotFallbacks.ring; }} /></div>
                    </div>
                    {/key}
                </div>
                <!-- Right: actions -->
                <div class="actions-panel">
                    <GearChoice
                            handleAbilityClick={handleAbilityClickExtra}
                            {handleDragStart}
                            style={uiState.activeTab}
                        />
                    <AbilityChoice
                            abilities={offGcdAbilities}
                            handleAbilityClick={handleAbilityClickExtra}
                            {handleDragStart}
                            style="abilities"
                        />
                    <AbilityChoice
                            abilities={prayers}
                            handleAbilityClick={handleAbilityClickExtra}
                            {handleDragStart}
                            style="abilities"
                        />
                    <AbilityChoice
                            abilities={spells}
                            handleAbilityClick={handleAbilityClickExtra}
                            {handleDragStart}
                            style="abilities"
                        />
                    <AbilityChoice
                            abilities={consumables}
                            handleAbilityClick={handleAbilityClickExtra}
                            {handleDragStart}
                            style="abilities"
                        />
                </div>
            </div>

    </div>

<style>
    .extra-action-section {
        border-left: 8px solid var(--card-border-rotation, #ffd700);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #171d21;
        max-width: 100%;
    }

    .tick-summary {
        width: 100%;
        padding: 0.3rem;
        border-bottom: 1px solid #444;
        margin-bottom: 0.3rem;
    }

    .nulled-badge {
        font-size: 0.65rem;
        padding: 1px 6px;
        background-color: rgba(255, 0, 0, 0.3);
        border: 1px solid rgba(255, 0, 0, 0.6);
        border-radius: 3px;
        color: #ff6666;
        text-transform: uppercase;
    }

    .quick-actions {
        display: flex;
        gap: 4px;
        margin-top: 6px;
    }

    .quick-btn {
        font-size: 0.7rem;
        padding: 2px 8px;
        background-color: rgba(255, 255, 255, 0.08);
        border: 1px solid #555;
        border-radius: 3px;
        color: #C2BA9E;
        cursor: pointer;
    }

    .quick-btn:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: #888;
    }

    .quick-btn.active {
        background-color: rgba(255, 0, 0, 0.15);
        border-color: rgba(255, 0, 0, 0.5);
    }

    .tab-btn {
        color: #C2BA9E;
        font-weight: bold;
        font-size: 0.85rem;
        text-transform: uppercase;
        padding: 4px 12px;
        border-bottom: 2px solid transparent;
    }

    .tab-btn:hover {
        color: #968A5C;
    }

    .tab-active {
        color: #ffd700;
        border-bottom-color: #ffd700;
    }

    .info-tab {
        width: 100%;
        padding: 0.5rem 0;
    }

    .buffs-stacks-row {
        display: flex;
        gap: 0.5rem;
        border-bottom: 1px solid #333;
    }

    .buffs-stacks-row .info-section {
        border-bottom: none;
    }

    .info-section {
        padding: 0.4rem 0.5rem;
        border-bottom: 1px solid #333;
    }

    .info-section:last-child {
        border-bottom: none;
    }

    .info-label {
        font-size: 0.7rem;
        color: #888;
        text-transform: uppercase;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
    }

    .damage-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 2px 0;
    }

    .damage-val {
        font-size: 0.85rem;
        font-weight: bold;
        color: #4CAF50;
    }

    .damage-val-lg {
        font-size: 1.1rem;
        font-weight: bold;
        color: #4CAF50;
    }

    .buff-list, .stack-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .buff-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .buff-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .stack-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .stack-val {
        font-weight: bold;
        font-size: 0.85rem;
        margin-left: auto;
    }

    .section-label {
        font-size: 0.7rem;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: 100%;
        padding: 0 0.5rem;
    }
    .action-row {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .action-row > :first-child {
        flex: 1;
        min-width: 0;
    }
    .row-label {
        font-size: 0.55rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        writing-mode: vertical-rl;
        white-space: nowrap;
        flex-shrink: 0;
    }
    .actions-layout {
        display: flex;
        gap: 8px;
        width: 100%;
    }
    .equipped-panel {
        flex: 0 0 25%;
        min-width: 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .equip-grid {
        display: inline-grid;
        grid-template-columns: repeat(3, 46px);
        grid-auto-rows: 46px;
        gap: 2px;
        justify-items: center;
        align-items: center;
    }
    .equip-cell {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .equip-icon {
        width: 44px;
        height: 44px;
        object-fit: contain;
        border: 1px solid #555;
        border-radius: 3px;
        background: rgba(0,0,0,0.3);
    }
    .equip-badgeable {
        position: relative;
    }
    .equip-badge {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 14px;
        height: 14px;
        border-radius: 2px;
    }
    .actions-panel {
        flex: 0 0 75%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .extra-actions-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0.5rem 0;
        gap: 2px;
    }

    .action-slot {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #878787;
        box-sizing: border-box;
    }
</style>
