<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { familiars } from '$lib/data/familiars';
    import { DAMAGE_SOURCE_COLORS } from '$lib/utils/colors';
    import ToggleButton from '../UI/ToggleButton.svelte';

    let { settings, updateDamages, openDropdown = $bindable(null), onFamiliarChange = null } = $props();
    const familiarColor = DAMAGE_SOURCE_COLORS.familiar;

    function onFamiliarChanged() {
        if (onFamiliarChange) onFamiliarChange();
        updateDamages();
    }

    const spiritWeedCycle = [
        SETTINGS.SPIRIT_WEED_INCENSE_VALUES.NONE,
        SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL1,
        SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL2,
        SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL3,
        SETTINGS.SPIRIT_WEED_INCENSE_VALUES.LVL4,
    ];

    const showScrollOptions = $derived(familiars[settings[SETTINGS.FAMILIAR]?.value]?.has_dps_spec === true);
    function scrollIcon() {
        return familiars[settings[SETTINGS.FAMILIAR]?.value]?.scroll_icon ?? '/rs-rot/effect_icons/familiar.png';
    }

</script>

<h5 class="uppercase font-bold text-lg text-center mb-4">Familiars</h5>
<div class="flex flex-wrap gap-2 justify-center mb-3">
    <ToggleButton
        bind:setting={settings[SETTINGS.FAMILIAR]}
        img={(v) => familiars[v]?.icon ?? '/rs-rot/effect_icons/familiar.png'}
        title="Familiar"
        options={settings[SETTINGS.FAMILIAR]?.options ?? []}
        bind:openId={openDropdown}
        id={SETTINGS.FAMILIAR}
        borderColor={familiarColor}
        onchange={onFamiliarChanged}
    />
    <ToggleButton
        bind:setting={settings[SETTINGS.KALG_SPEC]}
        img="/rs-rot/effect_icons/crit_i_kal.png"
        title="Kal'gerion Spec"
        toggle={true}
        borderColor={familiarColor}
        onchange={updateDamages}
    />
    {#if showScrollOptions}
        <ToggleButton
            bind:setting={settings[SETTINGS.USE_FAMILIAR_SCROLLS]}
            img={scrollIcon}
            title="Use Familiar Scrolls"
            toggle={true}
            borderColor={familiarColor}
            onchange={updateDamages}
        />
        <ToggleButton
            bind:setting={settings[SETTINGS.SPIRIT_CAPE]}
            img="/rs-rot/effect_icons/Spirit_cape.png"
            title="Spirit Cape"
            toggle={true}
            borderColor={familiarColor}
            onchange={updateDamages}
        />
        <ToggleButton
            bind:setting={settings[SETTINGS.SUMMONING_RENEWAL]}
            img="/rs-rot/effect_icons/Summoning_renewal_(4).png"
            title="Summoning Renewal"
            toggle={true}
            borderColor={familiarColor}
            onchange={updateDamages}
        />
        <ToggleButton
            bind:setting={settings[SETTINGS.SPIRIT_WEED_INCENSE]}
            img="/rs-rot/effect_icons/Spirit_weed_incense_sticks.png"
            title="Spirit Weed Incense (click to cycle)"
            cycle={spiritWeedCycle}
            borderColor={familiarColor}
            onchange={updateDamages}
        />
        <ToggleButton
            bind:setting={settings[SETTINGS.PRISM_OF_RESTORATION]}
            img="/rs-rot/effect_icons/Prism_of_Restoration_icon.png"
            title="Prism of Restoration"
            toggle={true}
            borderColor={familiarColor}
            onchange={updateDamages}
        />
    {/if}
</div>
{#if familiars[settings[SETTINGS.FAMILIAR]?.value]?.description}<p class="familiar-help">{familiars[settings[SETTINGS.FAMILIAR].value].description}</p>{/if}
<style>.familiar-help {font-size:.75rem; color:#a7b8c3; line-height:1.5; margin:.5rem 0;}</style>
