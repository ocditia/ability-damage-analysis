<script>
    import Navbar from '$components/Layout/Navbar.svelte';
    import Header from '$components/Layout/Header.svelte';
    import { abilities as r_dmg_abilities } from '$lib/ranged/abilities';
    import { ranged_buff_abilities } from '$lib/ranged/buff_abilities';
    import { abilities as magic_dmg_abilities } from '$lib/magic/abilities';
    import { abilities as melee_dmg_abilities } from '$lib/melee/abilities';
    import { abilities as necro_dmg_abilities } from '$lib/necromancy/abilities';
    import { settingsConfig, SETTINGS } from '$lib/calc/settings';
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import { ABILITIES, abils } from '$lib/calc/const.js';
    import {
        hit_damage_calculation, get_rotation,
        style_specific_unification, calc_base_ad, get_user_value, apply_additional
    } from '$lib/calc/damage_calc.js';
    import {
        handle_ranged_buffs,
        calc_channelled_hit
    } from '$lib/calc/rotation_damage_helper.js';
    import RangedSettings from '../../components/Settings/RangedSettings.svelte';
    import AbilityChoice from '../../components/RotationBuilder/AbilityChoice.svelte';
    import { on_stall, on_cast, on_hit, on_damage } from '$lib/calc/damage_calc_new.js';
    import { create_object } from '$lib/calc/object_helper.js';

    let necroAbils = { ...necro_dmg_abilities };
    let meleeAbils = { ...melee_dmg_abilities };
    let magicAbils = { ...magic_dmg_abilities };
    let rangedAbils = { ...r_dmg_abilities, ...ranged_buff_abilities };
    let allAbils = { ...magicAbils, ...rangedAbils, ...necroAbils, ...meleeAbils };
    let settings = $state(Object.fromEntries(
        Object.entries(settingsConfig).map(([key, value]) => [
            key,
            { ...value, key: key, value: value.default }
        ])
    ));
    const adaptedSettings = Object.fromEntries(
        Object.entries(settings).map(([key, value]) => [key, value.value])
    );

    let totalDamage = $state(0);
    let experimental_data = [];

    function calculateTotalDamageNew() {
        console.log('Running calc total damage new');
        let dmgs = [];
        totalDamage = 0;
        const adaptedSettings = Object.fromEntries(
            Object.entries(settings).map(([key, value]) => [key, value.value])
        );
        const settingsCopy = structuredClone(adaptedSettings);

        let tick = 0;
        let damageTracker = {};
        let timers = {};
        let hit_delay = 1; //TODO actually implement this
        let start_tick = tick;

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

        function copyStacks(settings) {
            stacks[SETTINGS.ADRENALINE].stackTicks[tick] = settings[SETTINGS.ADRENALINE];
            stacks['perfect equilibrium stacks'].stackTicks[tick] = settings['perfect equilibrium stacks'];
            stacks[SETTINGS.ICY_CHILL_STACKS].stackTicks[tick] = settings[SETTINGS.ICY_CHILL_STACKS];
        }

        //TODO implement non ability actions
        while (tick < barSize + 20) {
            let abilityKey = abilityBar[tick];
            if (abilityKey == null) {
                //Todo make a function which combines all these 3 (i.e. handle buff timers,
                //process damage queue, copy buff info for this tick to ui)
                handleTimers(timers, settingsCopy);
                processQueuedDamage(tick);
                copyStacks(settingsCopy);
                tick += 1;
                continue;
            }

            let abil_duration = 3; //assume ability is 3t unless duration is explicitly specified
            if (abils[abilityKey]['duration'])
                abil_duration = abils[abilityKey]['duration'];
            settingsCopy['ability'] = abilityKey;
            on_stall(settingsCopy);
            style_specific_unification(settingsCopy, 'ranged');
            settingsCopy[SETTINGS.ABILITY_DAMAGE] = calc_base_ad(settingsCopy);
            start_tick = tick;
            let hit_tick = tick + hit_delay;
            damageTracker[hit_tick] ??= [];

            if (abilityKey in ranged_buff_abilities) {
                handle_ranged_buffs(settingsCopy, timers, abilityKey);
            } else if (abilityKey in rangedAbils) {
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
                else if (isChannelled(settingsCopy, abilityKey)) {
                }
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
                    for (let i = 0; i < n_hits; i++) {
                        let clone = structuredClone(dmgObject);
                        clone['non_crit']['ability'] = abils[abilityKey]['hits'][1][i];
                        let htick = hit_tick + abils[abilityKey]['hit_timings'][i];
                        damageTracker[htick] ??= [];
                        damageTracker[htick].push(clone);
                    }
                }
            }
//s            if (abilityKey in ranged_buff_abilities) handle_ranged_buffs(settingsCopy, timers, abilityKey);
            //Process hitsplats and decrement timers
            let rota;
            if (isChannelled(settingsCopy, abilityKey)) {
                rota = get_rotation(settingsCopy);
            }
            let end_tick = start_tick + abil_duration;
            for (let i = start_tick; i < end_tick; i++) {
                //Perform any necessary hits from channelled abilities on this tick
                if (isChannelled(settingsCopy, abilityKey)) {
                    //If there's a new ability cast on this tick, cancel the channel and exit early
                    if (i > start_tick && abilityBar[tick]) {
                        break;
                    } else {
                        let dmgObject = calc_channelled_hit(settingsCopy, 1 + i - start_tick, rota, timers); //i+1 because hits are 1 indexed
                        dmgObject['non_crit']['ability'] = abilityKey;
                        let hit_tick = i + hit_delay;
                        (damageTracker[hit_tick] ??= []).push(dmgObject);
                    }
                }
                handleTimers(timers, settingsCopy);
                //Apply on npc modifiers to already queued damage for this to tick
                processQueuedDamage(i);
                //TODO make a function
                copyStacks(settingsCopy);
                tick += 1;
            }
            end_tick = tick;
        }
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

    function isChannelled(settingsCopy, key) {
        return abils[key]['ability classification'] == 'channel';
    }

    //UI
    const barSize = 250;
    let abilityBar = $state(Array(barSize).fill(null)); // Empty slots on the bar
    let tab = $state('general'); // settings tab
    let abilityTab = $state('ranged');
    let selectedTab = 'general';
    const baseBarRowGap = 30;
    let barRowGap = $state(baseBarRowGap);

    const stackFontSize = 12;
    const baseStackOffset = 32;
    const stackPadding = 2;

    const stacks = $state({
        [SETTINGS.ADRENALINE]: {
            title: 'Adrenaline',
            displaySetting: SETTINGS.ADRENALINE,
            idx: -1,
            image: '/effect_icons/Crit_buff.png',
            stackTicks: Array(barSize).fill(0),
            colour: '#f5e942',
            number: 'true'
        },
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
    });
    let abilityBarIndex = 0;
    let lastAbilityIndex = 0;
    let buffTimings = $state(
        {
            'swiftness': [], 'sunshine': [], 'berserk': [],
            'split soul ecb': [], 'crit buff': []
        });
    //tracks when buffs are active for drawing visual indicator
    //UI functions
    function handleAbilityClick(event, abilityKey) {
        abilityBar[abilityBarIndex] = abilityKey;

        //TODO implement other buffs
        if (abilityKey == ABILITIES['GREATER_DEATHS_SWIFTNESS']) {
            buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex + 63]);
        } else if (abilityKey == ABILITIES['DEATHS_SWIFTNESS']) {
            buffTimings['swiftness'].push([abilityBarIndex, abilityBarIndex + 52]);
        } else if (abilityKey == ABILITIES['SPLIT_SOUL_ECB']) {
            buffTimings['split soul ecb'].push([abilityBarIndex, abilityBarIndex + 25]);
        } else if (abilityKey == ABILITIES['SUNSHINE']) {
            buffTimings['sunshine'].push([abilityBarIndex, abilityBarIndex + 25]);
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
        return active;
    }

    function handleDragStart(event, ability) {
        event.dataTransfer.setData('text/plain', ability);
        //TODO rethink drag - it kinda sucks compared to clicking to add
    }

    function handleDrop(event, index) {
        event.preventDefault();
        const abilityKey = event.dataTransfer.getData('text/plain');
        if (rangedAbils[abilityKey]) {
            abilityBar[index] = abilityKey;
        } else {
            const dragObj = JSON.parse(event.dataTransfer.getData('application/json'));
            const swapAbil = abilityBar[index];
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
        calculateTotalDamageNew();
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
            if (Object.hasOwnProperty.call(buffTimings, key)) {
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
                barRowGap += (stackFontSize + stackPadding);
                i++;
            } else {
                stacks[key]['idx'] = -1;
            }
        }

        console.log('refresh ui is called');

        if (calcDmg) {
            calculateTotalDamageNew();
        }
    }

    //TODO delete
    function showStack(idx, arr) {
        if (idx == 0) {
            return true;
        } else {
            return !(arr[idx] == arr[idx - 1]);
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
                        <button onclick={() => clearRotation()}>Reset</button>
                        <br>
                        <button onclick={() => calculateTotalDamageNew()}>Calculate Damage</button>
                        <p>Total Damage: {totalDamage}</p>
                    </div>
                    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
                        <li class="flex-grow me-2">
                            <button
                                onclick={() => (abilityTab = 'magic')}
                                class:text-[#968A5C]={abilityTab === 'magic'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                            >Magic
                            </button
                            >
                        </li>
                        <li class="flex-grow me-2">
                            <button
                                onclick={() => (abilityTab = 'melee')}
                                class:text-[#968A5C]={abilityTab === 'melee'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                            >Melee
                            </button
                            >
                        </li>

                        <li class="flex-grow me-2">
                            <button
                                onclick={() => (abilityTab = 'ranged')}
                                class:text-[#968A5C]={abilityTab === 'ranged'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                            >Ranged
                            </button
                            >
                        </li>
                        <li class="flex-grow me-2">
                            <button
                                onclick={() => (abilityTab = 'necro')}
                                class:text-[#968A5C]={abilityTab === 'necro'}
                                class="text-[#C2BA9E] font-bold text-2xl text-link uppercase inline-block hover:text-[#968A5C]"
                            >Necro
                            </button
                            >
                        </li>
                    </ul>
                    <br>
                    {#if abilityTab === 'ranged'}
                        <AbilityChoice abilities={rangedAbils} handleAbilityClick={handleAbilityClick}
                                       handleDragStart={handleDragStart} style={abilityTab} />
                    {:else if abilityTab === 'magic'}
                        <AbilityChoice abilities={magicAbils} handleAbilityClick={handleAbilityClick}
                                       handleDragStart={handleDragStart} style={abilityTab} />
                    {:else if abilityTab === 'melee'}
                        <AbilityChoice abilities={meleeAbils} handleAbilityClick={handleAbilityClick}
                                       handleDragStart={handleDragStart} style={abilityTab} />
                    {:else if abilityTab === 'necro'}
                        <AbilityChoice abilities={necroAbils} handleAbilityClick={handleAbilityClick}
                                       handleDragStart={handleDragStart} style={abilityTab} />
                    {/if}
                    <div style="row-gap:{barRowGap}px;" class="ability-bar">
                        {#each abilityBar as ability, index}
                            <div class="ability-slot"
                                 role="button"
                                 tabindex="0"
                                 aria-label="Ability slot"
                                 oncontextmenu={(e) => handleBarRightClick(e, index)}
                                 ondrop={(e) => handleDrop(e, index)}
                                 ondragover={() => allowDrop()}
                            >
                                <span class="cell-number">{index}</span>
                                {#if ability}
                                    <img src={allAbils[ability].icon}
                                         alt={allAbils[ability].title}
                                         style="width: 100%; height: 100%;"
                                         draggable="true"
                                         ondragstart={(e) => handleDragStartBar(e, ability, index)}
                                    />
                                {/if}
                                {#if buffActive('swiftness', index)}
                                    <div class="line-swiftness" title="Death's Swiftness"></div>
                                {/if}
                                {#if buffActive('split soul ecb', index)}
                                    <div class="line-ecb" title="Split Soul (ECB)"></div>
                                {/if}
                                {#each Object.keys(stacks) as key}
                                    {#if showStack(index, stacks[key].stackTicks) && stacks[key].idx >= 0}
                                        <span
                                            title="{stacks[key].title}"
                                            style="
                                                transform: translateX(0px);
                                                top: {baseStackOffset+3+(stackFontSize+stackPadding) * stacks[key].idx}px;
                                                left: {stackFontSize+stackPadding*2}px;
                                                font-size: {stackFontSize}px;
                                                color: {stacks[key].colour};
                                                "
                                            class="bolg-stacks"
                                        >
                                            {stacks[key].stackTicks[index]}
                                        </span>
                                        <img src={stacks[key].image}
                                             style=
                                                 "transform:translateX({2-(30-stackFontSize)/2}px);
                                                top: {baseStackOffset+6+(stackFontSize+stackPadding) * stacks[key].idx}px;
                                                height: {stackFontSize}px;
                                                width: {stackFontSize}px;
                                                "
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
            <RangedSettings bind:settings={settings} updateDamages={calculateTotalDamageNew} />
            {#each Object.keys(stacks) as key}
                <div>
                    {#if stacks[key].number}
                        <Number
                            bind:setting={settings[stacks[key].displaySetting]}
                            on:settingsUpdated={refreshUI}
                            step="1"
                            max="200"
                            min="0"
                        />
                    {:else}
                        <Checkbox
                            bind:setting={settings[stacks[key].displaySetting]}
                            on:settingsUpdated={refreshUI}
                        />
                    {/if}
                </div>
                <br>
            {/each}
            <br>
            <div>
                <Checkbox
                    bind:setting={settings[SETTINGS.VIGOUR]}
                    on:settingsUpdated={refreshUI}
                />
                <br>
                <Checkbox
                    bind:setting={settings[SETTINGS.FURY_OF_THE_SMALL]}
                    on:settingsUpdated={refreshUI}
                />
                <br>
                <Checkbox
                    bind:setting={settings[SETTINGS.CONSERVATION_OF_ENERGY]}
                    on:settingsUpdated={refreshUI}
                />
                <br>
                <Checkbox
                    bind:setting={settings[SETTINGS.HEIGHTENED_SENSES]}
                    on:settingsUpdated={refreshUI}
                />
                <br>
                <Number
                    bind:setting={settings[SETTINGS.ICY_CHILL_STACKS]}
                    on:settingsUpdated={refreshUI}
                    step="1"
                    max="10"
                    min="0"
                />
            </div>
            <div class="xl:col-span-6 xl:row-start-2 xl:col-start-0">
                <div class="flex flex-col">
                    <div class="card card-ranged">
                        <div class="card-title pb-5">User Guide</div>
                        <div class="pb-5">
                            <p>
                                To add abilities, left clicking will add a new ability to the end of your
                                bar. You can also drag abilities for more control. Right clicking an ability
                                on the bar will remove it.
                            </p>
                        </div>
                        <div class="pb-5">
                            <p>
                                You can configure the additional settings to decide how much information
                                you are shown, as well as how much adrenaline and how many stacks you start
                                with.
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

<style>
    /* TODO - move these into their own css file */
    .ability-bar {
        display: grid;
        grid-template-columns: repeat(auto-fill, 30px);
        column-gap: 0;
        position: relative;
    }

    .ability-slot {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
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
    }

    .pe-icon {
        position: absolute;
        width: 12px;
        height: 12px;
        transform: translateX(-70%) translateY(32px);
    }
</style>
