<script>
    import Checkbox from '../../components/Settings/Checkbox.svelte';
    import Number from '../../components/Settings/Number.svelte';
    import Select from '../../components/Settings/Select.svelte';
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import TabButton from '../UI/TabButton.svelte';
    import GradientSeparator from '../UI/GradientSeparator.svelte';
    import { SETTINGS, settingsConfig } from '$lib/calc/settings';
    export let tab = 'general'; // Options as props
    export let styleTab = 'magic';
    export let settings;
    export let stacks;
    export let updateDamages;
    export let refreshUI;
    export let uiState;


    //raksha
    //eyJhIjpbIm5hdHVyYWwgaW5zdGluY3QiLCIiLCIiLCJncmVhdGVyIGNvbmNlbnRyYXRlZCBibGFzdCIsIiIsIiIsImdyZWF0ZXIgcmljb2NoZXQiLCIiLCIiLCJkYXppbmcgc2hvdCIsIiIsIiIsIiIsIiIsImdyZWF0ZXIgZGVhdGgncyBzd2lmdG5lc3MiLCIiLCIiLCJyZXNvbmFuY2UiLCIiLCIiLCJzcGxpdCBzb3VsIGVjYiIsIiIsIiIsImdyZWF0ZXIgcmljb2NoZXQiLCIiLCIiLCJyYXBpZCBmaXJlIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiYmFsYW5jZSBieSBmb3JjZSIsIiIsIiIsImRlc2NlbnQgb2YgZGFya25lc3MiLCIiLCIiLCJkZXNjZW50IG9mIGRhcmtuZXNzIiwiIiwiIiwiZ3JlYXRlciByaWNvY2hldCIsIiIsIiIsInNoYWRvdyB0ZW5kcmlscyIsIiIsIiIsImRhemluZyBzaG90IiwiIiwiIiwiaW5jZW5kaWFyeSBzaG90IiwiIiwiIiwic3BsaXQgc291bCBlY2IiLCIiLCIiLCJkZXNjZW50IG9mIGRhcmtuZXNzIiwiIiwiIiwiZ3JlYXRlciByaWNvY2hldCIsIiIsIiIsInJhcGlkIGZpcmUiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCJkZXNjZW50IG9mIGRhcmtuZXNzIiwiIiwiIiwiY3J5c3RhbCByYWluIiwiIiwiIiwiZGVzY2VudCBvZiBkYXJrbmVzcyIsIiIsIiIsImdyZWF0ZXIgcmljb2NoZXQiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiXSwiZSI6W1tdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFtdLFt7InRpdGxlIjoiZnVsIGFycm93cyIsImljb24iOiIvZ2Vhcl9pY29ucy9mdWwgYXJyb3dzLnBuZyJ9LCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiXSxbXSxbXSxbIiIseyJ0aXRsZSI6IndlbiBhcnJvd3MiLCJpY29uIjoiL2dlYXJfaWNvbnMvd2VuIGFycm93cy5wbmcifSwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIl0sW10sW10sW3sidGl0bGUiOiJkZWF0aHNwb3JlIGFycm93cyIsImljb24iOiIvZ2Vhcl9pY29ucy9kZWF0aHNwb3JlIGFycm93cy5wbmcifSwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIiwiIl0sW10sWyJBZGQgMTAwIEFkcmVuYWxpbmUiLHsidGl0bGUiOiJmdWwgYXJyb3dzIiwiaWNvbiI6Ii9nZWFyX2ljb25zL2Z1bCBhcnJvd3MucG5nIn0sIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiJdLFtdLFtdLFtdLFtdLFtdLFtdLFt7InRpdGxlIjoid2VuIGFycm93cyIsImljb24iOiIvZ2Vhcl9pY29ucy93ZW4gYXJyb3dzLnBuZyJ9LCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiLCIiXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXV0sIm4iOltmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sInQiOlsidHN1bmFtaSIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiIsIiJdfQ==
    settings[SETTINGS.WEAPON]['value'] = SETTINGS.WEAPON_VALUES.TH;
    settings[SETTINGS.ICY_PRECISION]['value'] = 0;
    settings[SETTINGS.BALANCE_BY_FORCE]['value'] = false;
        

    function makeNaked() {
        settings[SETTINGS.RANGED_HELMET]['value'] = 'none';
        settings[SETTINGS.RANGED_BODY]['value'] = 'none';
        settings[SETTINGS.RANGED_LEGS]['value'] = 'none';
        settings[SETTINGS.RANGED_GLOVES]['value'] = 'none';
        settings[SETTINGS.RANGED_BOOTS]['value'] = 'none';
        settings[SETTINGS.NECKLACE]['value'] = 'none';
        settings[SETTINGS.CAPE]['value'] = 'none';
        settings[SETTINGS.RING]['value'] = 'none';
        settings[SETTINGS.POCKET]['value'] = 'none';
        settings[SETTINGS.AURA]['value'] = 'none';
        settings[SETTINGS.FAMILIAR]['value'] = 'none';

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 0;
        settings[SETTINGS.ERUPTIVE]['value'] = 2;
        settings[SETTINGS.VULN]['value'] = 'none';

        settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = 'none ranged';
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = 'wen arrows';//'none';
        
        settings[SETTINGS.SHARD_OF_GENESIS]['value'] = false;

        settings[SETTINGS.INNATE_MASTERY]['value'] = false;
        settings[SETTINGS.MODE]['value'] = SETTINGS.MODE_VALUES.MIN_NO_CRIT;
        
    }

    function testPreset() {
        settings[SETTINGS.RANGED_GLOVES]['value'] = 'cinderbane gloves';
        settings[SETTINGS.NECKLACE]['value'] = 'essence of finality amulet';
        settings[SETTINGS.POCKET]['value'] = 'scripture of jas';
        settings[SETTINGS.AURA]['value'] = 'reckless';

        settings[SETTINGS.LVL20ARMOUR]['value'] = false;
        settings[SETTINGS.BITING]['value'] = 3;
        settings[SETTINGS.ERUPTIVE]['value'] = 0;

        //settings[SETTINGS.RANGED_LEVEL]['value'] = 99;
        settings[SETTINGS.REAPER_CREW]['value'] = false;
        settings[SETTINGS.RANGED_PRAYER]['value'] = 'anguish';
        settings[SETTINGS.SMOKE_CLOUD]['value'] = false;
        settings[SETTINGS.AMMO]['value'] = 'wen arrows';//'none';
        
        
    }
    //makeNaked();
    // testPreset();
    //settings[SETTINGS.ICY_CHILL_STACKS].value = 10;
    updateDamages();

    
</script>

<div class="xl:col-span-6 xl:row-start-1 xl:row-span-1 card card-rotation">
    <button 
        class="collapse-button"
        on:click={() => uiState.settingsPanelCollapsed = true}
    >
        → Hide
    </button>
    <h1 class="rotation-header">Settings</h1>
    <GradientSeparator marginTop="0.0rem" marginBottom="1.5rem" />
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <TabButton 
            id="ranged"
            label="Ranged"
            isActive={styleTab === 'ranged'}
            onClick={() => (styleTab = 'ranged')}
        />
        <TabButton 
            id="magic"
            label="Magic"
            isActive={styleTab === 'magic'}
            onClick={() => (styleTab = 'magic')}
        />
        <TabButton 
            id="melee"
            label="Melee"
            isActive={styleTab === 'melee'}
            onClick={() => (styleTab = 'melee')}
        />
        <TabButton 
            id="necro"
            label="Necro"
            isActive={styleTab === 'necro'}
            onClick={() => (styleTab = 'necro')}
        />
    </ul>
    <GradientSeparator marginTop="0.0rem" marginBottom="0.25rem" />
    <ul class="flex flex-wrap flex-col md:flex-row text-sm font-medium text-center">
        <TabButton 
            id="general"
            label="General"
            isActive={tab === 'general'}
            onClick={() => (tab = 'general')}
        />
        <TabButton 
            id="equipment"
            label="Equipment"
            isActive={tab === 'equipment'}
            onClick={() => (tab = 'equipment')}
        />
        <TabButton 
            id="bosses"
            label="Bosses"
            isActive={tab === 'bosses'}
            onClick={() => (tab = 'bosses')}
        />
    </ul>
    <GradientSeparator marginTop="0.0rem" marginBottom="0.25rem" />
    <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {#if tab === 'general'}
                <div class="md:col-span-1 space-y-2">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">General</h5>
                    <Select
                        bind:setting={settings[SETTINGS.MODE]}
                        onchange={() => updateDamages()}
                    />
                    <Number
                        bind:setting={settings[SETTINGS.RANGED_LEVEL]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/ranged_level.png"step="1"
                        max="150"
                        min="1"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.MAGIC_LEVEL]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/magic.png"step="1"
                        max="150"
                        min="1"
                    />
                    
                    <Number
                        bind:setting={settings[SETTINGS.HIT_CHANCE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ABILITY_DAMAGE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="9999"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.REAPER_CREW]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/death.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_SIZE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="5"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.TARGET_HP_PERCENT]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/target_hp.png"
                        step="1"
                        max="100"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.WALKED_TARGET]}
                        onchange={() => updateDamages()}
                    />
                </div>
                <div class="md:col-span-1 space-y-2">
                    <h5 class="uppercase font-bold text-lg text-center">Damage Buffs</h5>
                    <Select
                            bind:setting={settings[SETTINGS.RANGED_PRAYER]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Prayer.webp"
                    />
                    <Select
                            bind:setting={settings[SETTINGS.MAGIC_PRAYER]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Prayer.webp"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.SLAYER_HELM]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/slayer_helmet.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.GUARDHOUSE]}
                        onchange={() => updateDamages()}
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SWIFTNESS_OF_THE_AVIANSIE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/swiftness_of_the_avianse.png"
                    />
                    <Number
                            bind:setting={settings[SETTINGS.STONE_OF_JAS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/stone_of_jas.png"step="1"
                            max="6"
                            min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.BERSERKERS_FURY]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/berserkers_fury.png"
                        step="0.5"
                        max="5.5"
                        min="0"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.SMOKE_CLOUD]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/smoke_cloud.png"
                    />
                    <Select
                        bind:setting={settings[SETTINGS.VULN]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Vulnerability_icon.webp"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.INFERNAL_PUZZLE_BOX]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/infernal_puzzlebox.png"
                        step="1"
                        max="6"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.NOPE]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/nopenopenope.png"
                        step="1"
                        max="3"
                        min="0"
                    />
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Stacks</h5>
                    {#each Object.keys(stacks) as key}
                        <Checkbox
                            bind:setting={settings[stacks[key].displaySetting]}
                            img={stacks[key].image}
                            onchange={() => updateDamages()}
                        />
                    {/each}
                    <Number
                        bind:setting={settings[SETTINGS.PERFECT_EQUILIBRIUM_STACKS]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/bolg_stacks.png"
                        step="1"
                        max="7"
                        min="0"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ICY_CHILL_STACKS]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="15"
                        min="0"
                        img="/effect_icons/Icy_Chill.png"
                    />
                </div>
                <div class="md:col-span-1" space-y-2>
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Adrenaline</h5>
                    <Checkbox
                        bind:setting={settings[SETTINGS.VIGOUR]}
                        onchange={() => updateDamages()}
                        img="/gear_icons/ring of vigour.png"

                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.FURY_OF_THE_SMALL]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Fury of the Small.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.CONSERVATION_OF_ENERGY]}
                        onchange={() => updateDamages()}

                        img="/effect_icons/Conservation of Energy.png"
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.HEIGHTENED_SENSES]}
                        onchange={() => updateDamages()}
                        img="/effect_icons/Heightened Senses.png"
                    />
                    <Number
                        bind:setting={settings[SETTINGS.ADRENALINE]}
                        onchange={() => updateDamages()}
                        step="1"
                        max="150"
                        min="0"
                        img='/effect_icons/Crit_buff.png'
                    />
                    <Checkbox
                        bind:setting={settings[SETTINGS.EXPECTED_ADRENALINE]}
                        onchange={() => updateDamages()}
                    />
                </div>
            {:else if tab === 'equipment'}
                {#if styleTab === 'ranged'}
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center mb-4">Armour</h5>
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_HELMET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Head_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_BODY]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Torso_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_LEGS]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Legs_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_GLOVES]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Hands_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_BOOTS]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Feet_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.NECKLACE]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Neck_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.CAPE]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Back_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RING]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Ring_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.POCKET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Pocket_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AURA]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/aura.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.FAMILIAR]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/familiar.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.KALG_SPEC]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/crit_i_kal.png"
                        />
                    </div>
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center mb-4">Perks</h5>
                        <Checkbox
                            bind:setting={settings[SETTINGS.LVL20ARMOUR]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/level-20.png"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.BITING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Biting.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.PRECISE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Precise.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.ERUPTIVE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Eruptive.webp"
                            max="4"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.CAROMING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/caroming.png"
                            max="4"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.FLANKING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Flanking.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.GENOCIDAL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/genocidal.png"
                            max="4.9"
                            step="0.1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RUTHLESS_RANK]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Ruthless.webp"
                            max="3"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RUTHLESS_STACKS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Ruthless.webp"
                            max="5"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.IMPATIENT]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Impatient.png"
                            max="4"
                            step="1"
                            min="0"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.SLAYER_PERK_UNDEAD]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/25px-Undead_Slayer.webp"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.SLAYER_PERK_DRAGON]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/dragon_slayer_perk.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.SLAYER_PERK_DEMON]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/demon_slayer_perk.webp"
                        />
                    </div>   
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center mb-4">Weapons</h5>
                        <Select
                            bind:setting={settings[SETTINGS.WEAPON]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_MH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_OH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RANGED_TH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.TH_TYPE_CUSTOM]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AMMO]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/ammo_type.png"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/shard_of_genesis.png"
                        />
                    </div>
                    {:else if styleTab === 'magic'}
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center">Armour</h5>
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_HELMET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Head_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_BODY]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Torso_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_LEGS]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Legs_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_GLOVES]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Hands_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_BOOTS]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Feet_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.NECKLACE]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Neck_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.CAPE]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Back_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.RING]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Ring_slot.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.POCKET]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Pocket_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AURA]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/aura.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.FAMILIAR]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/familiar.png"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.AUTO_CAST]}
                            onchange={() => updateDamages()}
                        />
                    </div>
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center">Perks</h5>
                        <Checkbox
                            bind:setting={settings[SETTINGS.LVL20ARMOUR]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/level-20.png"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.BITING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Biting.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.PRECISE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Precise.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.ERUPTIVE]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Eruptive.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.FLANKING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Flanking.webp"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.LUNGING]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Lunging.webp"
                            step="1"
                            min="0"
                            max="4"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.GENOCIDAL]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/genocidal.png"
                            max="4.9"
                            step="0.1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RUTHLESS_RANK]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Ruthless.webp"
                            max="3"
                            step="1"
                            min="0"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.RUTHLESS_STACKS]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Ruthless.webp"
                            max="5"
                            step="1"
                            min="0"
                        />
                    </div>
                    <div class="md:col-span-1">
                        <h5 class="uppercase font-bold text-lg text-center">Weapons</h5>
                        <Select
                            bind:setting={settings[SETTINGS.WEAPON]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_MH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Main_hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.MH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_OH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.OH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Select
                            bind:setting={settings[SETTINGS.MAGIC_TH]}
                            onchange={() => updateDamages()}
                            img="/armour_icons/Off-hand_slot.webp"
                        />
                        <Number
                            bind:setting={settings[SETTINGS.TH_TIER_CUSTOM]}
                            onchange={() => updateDamages()}
                            max="100"
                            step="1"
                            min="0"
                        />
                        <Checkbox
                            bind:setting={settings[SETTINGS.INNATE_MASTERY]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/shard_of_genesis.png"
                        />
                    </div>
                {:else if styleTab === 'melee'}
                {/if}
            {:else if tab === 'bosses'}
                <div class="md:col-span-1 space-y-4">
                    <h5 class="uppercase font-bold text-lg text-center mb-4">Boss Settings</h5>
                    <div class="space-y-4">
                        <Number
                            bind:setting={settings[SETTINGS.GUARDIANS_TRIUMPH]}
                            onchange={() => updateDamages()}
                            img="/effect_icons/Guardian's_Triumph_Edict_(self_status).png"
                            step="1"
                            min="0"
                        />
                    </div>
                </div>
            {/if}
        </div>
    </form>
</div>