<script>
    import { SETTINGS } from '$lib/calc/settings_rb';
    import { SettingsCombatStyles } from '$lib/calc/rotation_builder/types/SettingsCombatStyles.ts';
    import { getItemsForSlot, getItemForValue } from '$lib/calc/rotation_builder/gear-registry';
    import { weapons } from '$lib/calc/const/const';

    let { settings, styleTab, updateDamages, openDropdown = $bindable(null) } = $props();

    let showAllGear = $state(false);

    const styleFolder = {
        [SettingsCombatStyles.MELEE]: 'melee',
        [SettingsCombatStyles.RANGED]: 'ranged',
        [SettingsCombatStyles.MAGIC]: 'magic',
        [SettingsCombatStyles.NECROMANCY]: 'necro',
    };

    const gearStyle = {
        [SettingsCombatStyles.MELEE]: 'melee',
        [SettingsCombatStyles.RANGED]: 'ranged',
        [SettingsCombatStyles.MAGIC]: 'magic',
        [SettingsCombatStyles.NECROMANCY]: 'necromancy',
    };

    function getSlotOptions(slot) {
        if (slot.gearSlot) {
            const items = getItemsForSlot(slot.gearSlot, gearStyle[styleTab]);
            if (showAllGear) return items;
            return items.filter(i => i.popular || i.value === 'none' || i.value === settings[slot.key]?.value);
        }
        return settings[slot.key]?.options ?? [];
    }

    /** Get weapon options from gear registry, optionally filtered by weapon type */
    function getWeaponOptions(slot, weaponTypeFilter = null) {
        const items = getItemsForSlot(slot, gearStyle[styleTab]);
        let filtered = weaponTypeFilter
            ? items.filter(i => i.weaponType === weaponTypeFilter || i.value === 'none')
            : items;
        if (!showAllGear) {
            const currentMh = settings[weaponSlotsByStyle[styleTab]?.mh]?.value;
            const currentOh = settings[weaponSlotsByStyle[styleTab]?.oh]?.value;
            filtered = filtered.filter(i => i.popular || i.value === 'none' || i.value === currentMh || i.value === currentOh);
        }
        return filtered;
    }

    function isWeaponTwoHand(value) {
        if (!value || value === 'custom' || value === 'none') return false;
        const weapon = weapons[value];
        return weapon?.['weapon type'] === 'two-hand';
    }

    function onWeaponSelected(ws, value) {
        settings[ws.mh].value = value;
        openDropdown = null;
        updateDamages();
    }

    function getIconFolder(value, fallbackFolder) {
        if (!value || value === 'none') return fallbackFolder;
        const item = getItemForValue(value);
        if (!item) return fallbackFolder;
        if (item.style === 'hybrid') return 'shared';
        const styleFolderMap = { melee: 'melee', ranged: 'ranged', magic: 'magic', necromancy: 'necro' };
        return styleFolderMap[item.style] ?? fallbackFolder;
    }

    function gearIcon(settingKey, fallback, folder = 'shared') {
        const val = settings[settingKey]?.value;
        if (!val || val === 'none') return fallback;
        const base = val.replace(/ \[IM\]$/, '').replace(/ \(i\)$/, '').replace(/\+$/, '').replace(/ \(or\)$/, '').replace(/ \(e\)$/, '');
        if (base !== val) return `/gear_icons/${folder}/${base}.png`;
        return `/gear_icons/${folder}/${val}.png`;
    }

    function gearBadge(settingKey) {
        const val = settings[settingKey]?.value;
        if (!val) return null;
        if (val.endsWith(' [IM]')) return { img: '/effect_icons/shard_of_genesis.png' };
        if (val.endsWith(' (i)')) return { text: 'i' };
        if (val.endsWith('+')) return { text: '+' };
        if (val.endsWith(' (or)')) return { text: 'or' };
        if (val.endsWith(' (e)')) return { text: 'e' };
        return null;
    }



    const armourSlotsByStyle = {
        [SettingsCombatStyles.RANGED]: [
            { key: SETTINGS.RANGED_HELMET, fallback: '/armour_icons/Head_slot.webp', gearSlot: 'helmet' },
            { key: SETTINGS.RANGED_BODY, fallback: '/armour_icons/Torso_slot.png', gearSlot: 'body' },
            { key: SETTINGS.RANGED_LEGS, fallback: '/armour_icons/Legs_slot.png', gearSlot: 'legs' },
            { key: SETTINGS.RANGED_GLOVES, fallback: '/armour_icons/Hands_slot.webp', gearSlot: 'gloves' },
            { key: SETTINGS.RANGED_BOOTS, fallback: '/armour_icons/Feet_slot.png', gearSlot: 'boots' },
            { key: SETTINGS.RANGED_POCKET, fallback: '/armour_icons/Pocket_slot.webp', gearSlot: 'pocket' },
            { key: SETTINGS.RANGED_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png', gearSlot: 'ammo' },
        ],
        [SettingsCombatStyles.MAGIC]: [
            { key: SETTINGS.MAGIC_HELMET, fallback: '/armour_icons/Head_slot.webp', gearSlot: 'helmet' },
            { key: SETTINGS.MAGIC_BODY, fallback: '/armour_icons/Torso_slot.png', gearSlot: 'body' },
            { key: SETTINGS.MAGIC_LEGS, fallback: '/armour_icons/Legs_slot.png', gearSlot: 'legs' },
            { key: SETTINGS.MAGIC_GLOVES, fallback: '/armour_icons/Hands_slot.webp', gearSlot: 'gloves' },
            { key: SETTINGS.MAGIC_BOOTS, fallback: '/armour_icons/Feet_slot.png', gearSlot: 'boots' },
            { key: SETTINGS.MAGIC_POCKET, fallback: '/armour_icons/Pocket_slot.webp', gearSlot: 'pocket' },
            { key: SETTINGS.MAGIC_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png', gearSlot: 'ammo' },
        ],
        [SettingsCombatStyles.MELEE]: [
            { key: SETTINGS.MELEE_HELMET, fallback: '/armour_icons/Head_slot.webp', gearSlot: 'helmet' },
            { key: SETTINGS.MELEE_BODY, fallback: '/armour_icons/Torso_slot.png', gearSlot: 'body' },
            { key: SETTINGS.MELEE_LEGS, fallback: '/armour_icons/Legs_slot.png', gearSlot: 'legs' },
            { key: SETTINGS.MELEE_GLOVES, fallback: '/armour_icons/Hands_slot.webp', gearSlot: 'gloves' },
            { key: SETTINGS.MELEE_BOOTS, fallback: '/armour_icons/Feet_slot.png', gearSlot: 'boots' },
            { key: SETTINGS.MELEE_POCKET, fallback: '/armour_icons/Pocket_slot.webp', gearSlot: 'pocket' },
            { key: SETTINGS.MELEE_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png', gearSlot: 'ammo' },
        ],
        [SettingsCombatStyles.NECROMANCY]: [
            { key: SETTINGS.NECRO_HELMET, fallback: '/armour_icons/Head_slot.webp', gearSlot: 'helmet' },
            { key: SETTINGS.NECRO_BODY, fallback: '/armour_icons/Torso_slot.png', gearSlot: 'body' },
            { key: SETTINGS.NECRO_LEGS, fallback: '/armour_icons/Legs_slot.png', gearSlot: 'legs' },
            { key: SETTINGS.NECRO_GLOVES, fallback: '/armour_icons/Hands_slot.webp', gearSlot: 'gloves' },
            { key: SETTINGS.NECRO_BOOTS, fallback: '/armour_icons/Feet_slot.png', gearSlot: 'boots' },
            { key: SETTINGS.NECRO_POCKET, fallback: '/armour_icons/Pocket_slot.webp', gearSlot: 'pocket' },
            { key: SETTINGS.NECRO_AMMO_SLOT, fallback: '/armour_icons/Ammo_slot.png', gearSlot: 'ammo' },
        ],
    };
    const sharedArmourSlots = [
        { key: SETTINGS.NECKLACE, fallback: '/armour_icons/Neck_slot.png', gearSlot: 'necklace' },
        { key: SETTINGS.CAPE, fallback: '/armour_icons/Back_slot.png', gearSlot: 'cape' },
        { key: SETTINGS.RING, fallback: '/armour_icons/Ring_slot.png', gearSlot: 'ring' },
    ];

    const weaponSlotsByStyle = {
        [SettingsCombatStyles.RANGED]: {
            mh: SETTINGS.RANGED_MH,
            oh: SETTINGS.RANGED_OH,
        },
        [SettingsCombatStyles.MAGIC]: {
            mh: SETTINGS.MAGIC_MH,
            oh: SETTINGS.MAGIC_OH,
        },
        [SettingsCombatStyles.MELEE]: {
            mh: SETTINGS.MELEE_MH,
            oh: SETTINGS.MELEE_OH,
        },
        [SettingsCombatStyles.NECROMANCY]: {
            mh: SETTINGS.NECRO_MH,
            oh: SETTINGS.NECRO_OH,
        },
    };

    const ARMOUR_PRESETS = {
        [SettingsCombatStyles.RANGED]: {
            'BIS': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.STALKER_E,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.FUL,
            },
            'Elite Dracolich': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.ELITE_DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.ELITE_DRACOLICH,
            },
            'Dracolich': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.DRACOLICH,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.DRACOLICH,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.DRACOLICH,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.DRACOLICH,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.DRACOLICH,
            },
            'Elite Sirenic': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.ELITE_SIRENIC,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.ELITE_SIRENIC,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.ELITE_SIRENIC,
            },
            'Sirenic': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.SIRENIC,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.SIRENIC,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.SIRENIC,
            },
            'None': {
                [SETTINGS.RANGED_HELMET]: SETTINGS.RANGED_HELMET_VALUES.NONE,
                [SETTINGS.RANGED_BODY]: SETTINGS.RANGED_BODY_VALUES.NONE,
                [SETTINGS.RANGED_LEGS]: SETTINGS.RANGED_LEGS_VALUES.NONE,
                [SETTINGS.RANGED_GLOVES]: SETTINGS.RANGED_GLOVES_VALUES.NONE,
                [SETTINGS.RANGED_BOOTS]: SETTINGS.RANGED_BOOTS_VALUES.NONE,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.NONE,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.NONE,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.NONE,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.NONE,
            },
        },
        [SettingsCombatStyles.MAGIC]: {
            'BIS': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_GLOVES]: SETTINGS.MAGIC_GLOVES_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.MAGIC_BOOTS]: SETTINGS.MAGIC_BOOTS_VALUES.TUMEKENS_RESPLENDENCE,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
            },
            'Elite Tectonic': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.ELITE_TECTONIC,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.ELITE_TECTONIC,
            },
            'Tectonic': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.TECTONIC,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.TECTONIC,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.TECTONIC,
            },
            'Virtus': {
                [SETTINGS.MAGIC_HELMET]: SETTINGS.MAGIC_HELMET_VALUES.VIRTUS,
                [SETTINGS.MAGIC_BODY]: SETTINGS.MAGIC_BODY_VALUES.VIRTUS,
                [SETTINGS.MAGIC_LEGS]: SETTINGS.MAGIC_LEGS_VALUES.VIRTUS,
            },
        },
        [SettingsCombatStyles.MELEE]: {
            'BIS': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.VESTMENTS,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.GOP_E,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.AM_HEJ,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.FUL,
            },
            'Trimmed Masterwork': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.TMW,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.TMW,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.TMW,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.TMW,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.TMW,
            },
            'Masterwork': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.MASTERWORK,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.MASTERWORK,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.MASTERWORK,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.MASTERWORK,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.MASTERWORK,
            },
            'Vestments of Havoc': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.VESTMENTS,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.VESTMENTS,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.VESTMENTS,
            },
            'None': {
                [SETTINGS.MELEE_HELMET]: SETTINGS.MELEE_HELMET_VALUES.NONE,
                [SETTINGS.MELEE_BODY]: SETTINGS.MELEE_BODY_VALUES.NONE,
                [SETTINGS.MELEE_LEGS]: SETTINGS.MELEE_LEGS_VALUES.NONE,
                [SETTINGS.MELEE_GLOVES]: SETTINGS.MELEE_GLOVES_VALUES.NONE,
                [SETTINGS.MELEE_BOOTS]: SETTINGS.MELEE_BOOTS_VALUES.NONE,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.NONE,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.NONE,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.NONE,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.NONE,
            },
        },
        [SettingsCombatStyles.NECROMANCY]: {
            'BIS': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.TFN,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.TFN,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.TFN,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.TFN,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.TFN,
                [SETTINGS.NECKLACE]: SETTINGS.NECKLACE_VALUES.EOFOR,
                [SETTINGS.CAPE]: SETTINGS.CAPE_VALUES.ZUK,
                [SETTINGS.RING]: SETTINGS.RING_VALUES.REAVERS,
                [SETTINGS.POCKET]: SETTINGS.POCKET_VALUES.GRIM,
            },
            'First Necromancer (t110)': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.TFN,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.TFN,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.TFN,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.TFN,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.TFN,
            },
            'Deathdealer (t90)': {
                [SETTINGS.NECRO_HELMET]: SETTINGS.NECRO_HELMET_VALUES.T90DD,
                [SETTINGS.NECRO_BODY]: SETTINGS.NECRO_BODY_VALUES.T90DD,
                [SETTINGS.NECRO_LEGS]: SETTINGS.NECRO_LEGS_VALUES.T90DD,
                [SETTINGS.NECRO_GLOVES]: SETTINGS.NECRO_GLOVES_VALUES.T90DD,
                [SETTINGS.NECRO_BOOTS]: SETTINGS.NECRO_BOOTS_VALUES.T90DD,
            },
        },
    };

    let selectedPreset = $state('');

    function applyArmourPreset(presetName) {
        const presets = ARMOUR_PRESETS[styleTab];
        if (!presets || !presets[presetName]) return;
        const preset = presets[presetName];
        for (const [settingKey, value] of Object.entries(preset)) {
            settings[settingKey]['value'] = value;
        }
        selectedPreset = '';
        updateDamages();
    }
</script>

<div class="flex items-center justify-center gap-2 mb-4">
    <h5 class="uppercase font-bold text-lg text-center">Armour</h5>
    <button
        type="button"
        class="text-xs px-2 py-0.5 rounded border"
        style="border-color: {showAllGear ? '#888' : '#555'}; color: {showAllGear ? '#fff' : '#888'}; background: {showAllGear ? 'rgba(255,255,255,0.1)' : 'transparent'};"
        onclick={() => { showAllGear = !showAllGear; }}
        title={showAllGear ? 'Showing all gear — click to show popular only' : 'Showing popular gear — click to show all'}
    >
        {showAllGear ? 'All' : 'Popular'}
    </button>
</div>
<div class="flex flex-wrap gap-2 justify-center mb-3">
    {#each (armourSlotsByStyle[styleTab] ?? []) as slot}
        {@const slotOptions = getSlotOptions(slot)}
        {@const iconFolder = slot.gearSlot ? getIconFolder(settings[slot.key]?.value, styleFolder[styleTab]) : styleFolder[styleTab]}
        <div class="relative">
            <button
                type="button"
                class="stack-toggle"
                class:stack-active={settings[slot.key]?.value && settings[slot.key]?.value !== 'none'}
                title="{settings[slot.key]?.label ?? slot.key}: {slotOptions.find(o => o.value === settings[slot.key]?.value)?.text ?? 'None'}"
                onclick={() => { openDropdown = openDropdown === slot.key ? null : slot.key; }}
            >
                <img
                    src={gearIcon(slot.key, slot.fallback, iconFolder)}
                    alt={settings[slot.key]?.label ?? ''}
                    class="w-7 h-7 object-contain"
                    onerror={(e) => { e.target.onerror = () => { e.target.onerror = null; e.target.src = slot.fallback; }; const icons = gearIconWithFallback(slot.key, slot.fallback, iconFolder); e.target.src = icons.fallbackIcon; }}
                />
                {#if gearBadge(slot.key)}
                    {#if gearBadge(slot.key).img}
                        <img src={gearBadge(slot.key).img} alt="" class="gear-badge-img" />
                    {:else}
                        <span class="stack-count">{gearBadge(slot.key).text}</span>
                    {/if}
                {/if}
            </button>
            {#if openDropdown === slot.key}
                <div class="icon-dropdown" style="min-width: 160px;">
                    {#each slotOptions as option}
                        <button
                            type="button"
                            class="icon-dropdown-item"
                            class:active={settings[slot.key]?.value === option.value}
                            onclick={() => { settings[slot.key].value = option.value; openDropdown = null; updateDamages(); }}
                        >
                            {option.text}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
    {#each sharedArmourSlots as slot}
        {@const slotOptions = getSlotOptions(slot)}
        {@const iconFolder = slot.gearSlot ? getIconFolder(settings[slot.key]?.value, 'shared') : 'shared'}
        <div class="relative">
            <button
                type="button"
                class="stack-toggle"
                class:stack-active={settings[slot.key]?.value && settings[slot.key]?.value !== 'none'}
                title="{settings[slot.key]?.label ?? slot.key}: {slotOptions.find(o => o.value === settings[slot.key]?.value)?.text ?? 'None'}"
                onclick={() => { openDropdown = openDropdown === slot.key ? null : slot.key; }}
            >
                <img
                    src={gearIcon(slot.key, slot.fallback, iconFolder)}
                    alt={settings[slot.key]?.label ?? ''}
                    class="w-7 h-7 object-contain"
                    onerror={(e) => { e.target.onerror = () => { e.target.onerror = null; e.target.src = slot.fallback; }; const icons = gearIconWithFallback(slot.key, slot.fallback, iconFolder); e.target.src = icons.fallbackIcon; }}
                />
                {#if gearBadge(slot.key)}
                    {#if gearBadge(slot.key).img}
                        <img src={gearBadge(slot.key).img} alt="" class="gear-badge-img" />
                    {:else}
                        <span class="stack-count">{gearBadge(slot.key).text}</span>
                    {/if}
                {/if}
            </button>
            {#if openDropdown === slot.key}
                <div class="icon-dropdown" style="min-width: 160px;">
                    {#each slotOptions as option}
                        <button
                            type="button"
                            class="icon-dropdown-item"
                            class:active={settings[slot.key]?.value === option.value}
                            onclick={() => { settings[slot.key].value = option.value; openDropdown = null; updateDamages(); }}
                        >
                            {option.text}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
    {#if styleTab === SettingsCombatStyles.MAGIC && settings[SETTINGS.AUTO_CAST]}
        <div class="relative">
            <button
                type="button"
                class="stack-toggle"
                class:stack-active={settings[SETTINGS.AUTO_CAST]?.value && settings[SETTINGS.AUTO_CAST]?.value !== 'none'}
                title="Auto Cast: {settings[SETTINGS.AUTO_CAST]?.options?.find(o => o.value === settings[SETTINGS.AUTO_CAST]?.value)?.text ?? 'None'}"
                onclick={() => { openDropdown = openDropdown === SETTINGS.AUTO_CAST ? null : SETTINGS.AUTO_CAST; }}
            >
                <img
                    src={
                        settings[SETTINGS.AUTO_CAST]?.value === 'exsanguinate' ? '/effect_icons/Exsanguinate_icon.webp' : 
                        settings[SETTINGS.AUTO_CAST]?.value === 'incite fear' ? '/ability_icons/magic/Incite_Fear_icon.webp' :
                        settings[SETTINGS.AUTO_CAST]?.value === 'crumble undead' ? '/ability_icons/magic/Crumble_Undead_icon.png' 
                        : '/ability_icons/magic/Vanilla_fudge_log.png'}
                    alt="Auto Cast"
                    class="w-7 h-7 object-contain"
                />
            </button>
            {#if openDropdown === SETTINGS.AUTO_CAST}
                <div class="icon-dropdown" style="min-width: 140px;">
                    {#each settings[SETTINGS.AUTO_CAST]?.options ?? [] as option}
                        <button
                            type="button"
                            class="icon-dropdown-item"
                            class:active={settings[SETTINGS.AUTO_CAST]?.value === option.value}
                            onclick={() => { settings[SETTINGS.AUTO_CAST].value = option.value; openDropdown = null; updateDamages(); }}
                        >
                            {option.text}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
    <!-- Weapon: combined MH + 2H dropdown, OH -->
    {#each [weaponSlotsByStyle[styleTab]].filter(Boolean) as ws}
        {@const is2h = isWeaponTwoHand(settings[ws.mh]?.value)}
        {@const mhItems = getWeaponOptions('mainhand', 'main-hand')}
        {@const thItems = getWeaponOptions('mainhand', 'two-hand')}
        {@const ohItems = getWeaponOptions('offhand')}
        {@const currentValue = settings[ws.mh]?.value}
        {@const weaponText = [...mhItems, ...thItems].find(o => o.value === currentValue)?.text ?? 'Custom'}
        <div class="relative">
            <button type="button" class="stack-toggle"
                class:stack-active={currentValue}
                title="Weapon: {weaponText}{is2h ? ' (2H)' : ''}"
                onclick={() => { openDropdown = openDropdown === 'weapon_combined' ? null : 'weapon_combined'; }}
            >
                <img src={gearIcon(ws.mh, '/armour_icons/Main_hand_slot.webp', styleFolder[styleTab])} alt="Weapon" class="w-7 h-7 object-contain"
                    onerror={(e) => { e.target.onerror = null; e.target.src = '/armour_icons/Main_hand_slot.webp'; }}
                />
                {#if gearBadge(ws.mh)}
                    {#if gearBadge(ws.mh).img}
                        <img src={gearBadge(ws.mh).img} alt="" class="gear-badge-img" />
                    {:else}
                        <span class="stack-count">{gearBadge(ws.mh).text}</span>
                    {/if}
                {/if}
            </button>
            {#if openDropdown === 'weapon_combined'}
                <div class="icon-dropdown" style="min-width: 180px;">
                    {#if mhItems.length > 0}
                        <div style="padding: 0.2rem 0.5rem; font-size: 0.65rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Main-hand</div>
                        {#each mhItems as option}
                            <button type="button" class="icon-dropdown-item"
                                class:active={currentValue === option.value && !is2h}
                                onclick={() => onWeaponSelected(ws, option.value)}
                            >{option.text}</button>
                        {/each}
                    {/if}
                    {#if thItems.length > 0}
                        <div style="padding: 0.2rem 0.5rem; font-size: 0.65rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0.2rem;">Two-handed</div>
                        {#each thItems as option}
                            <button type="button" class="icon-dropdown-item"
                                class:active={currentValue === option.value && is2h}
                                onclick={() => onWeaponSelected(ws, option.value)}
                            >{option.text}</button>
                        {/each}
                    {/if}
                </div>
            {/if}
        </div>
        <!-- OH: only show when dual-wield -->
        {#if !is2h && ws.oh && settings[ws.oh]}
            <div class="relative">
                <button type="button" class="stack-toggle"
                    class:stack-active={settings[ws.oh]?.value && settings[ws.oh]?.value !== 'none'}
                    title="Off-hand: {ohItems.find(o => o.value === settings[ws.oh]?.value)?.text ?? 'None'}"
                    onclick={() => { openDropdown = openDropdown === ws.oh ? null : ws.oh; }}
                >
                    <img src={gearIcon(ws.oh, '/armour_icons/Off-hand_slot.webp', styleFolder[styleTab])} alt="Off-hand" class="w-7 h-7 object-contain"
                        onerror={(e) => { e.target.onerror = null; e.target.src = '/armour_icons/Off-hand_slot.webp'; }}
                    />
                    {#if gearBadge(ws.oh)}
                        {#if gearBadge(ws.oh).img}
                            <img src={gearBadge(ws.oh).img} alt="" class="gear-badge-img" />
                        {:else}
                            <span class="stack-count">{gearBadge(ws.oh).text}</span>
                        {/if}
                    {/if}
                </button>
                {#if openDropdown === ws.oh}
                    <div class="icon-dropdown" style="min-width: 160px;">
                        {#each ohItems as option}
                            <button type="button" class="icon-dropdown-item"
                                class:active={settings[ws.oh]?.value === option.value}
                                onclick={() => { settings[ws.oh].value = option.value; openDropdown = null; updateDamages(); }}
                            >{option.text}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>
{#if ARMOUR_PRESETS[styleTab]}
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; padding: 0.4rem 0.5rem; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-size: 0.75rem; color: #aaa; white-space: nowrap;">Preset</span>
        <select
            style="flex: 1; background: rgba(0,0,0,0.3); color: #ddd; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.25rem 0.4rem; font-size: 0.8rem; cursor: pointer;"
            bind:value={selectedPreset}
            onchange={() => { if (selectedPreset) applyArmourPreset(selectedPreset); }}
        >
            <option value="">-- Select preset --</option>
            {#each Object.keys(ARMOUR_PRESETS[styleTab]) as name}
                <option value={name}>{name}</option>
            {/each}
        </select>
    </div>
{/if}

<style>
    .stack-toggle {
        position: relative;
        padding: 4px;
        border: 2px solid transparent;
        border-radius: 6px;
        opacity: 0.4;
        cursor: pointer;
        transition: all 0.15s ease;
        background: none;
    }
    .stack-toggle:hover { opacity: 0.7; }
    .stack-active { opacity: 1; border-color: #4ade80; }
    .stack-count {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 0.6rem;
        font-weight: bold;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 3px;
        padding: 0 3px;
        line-height: 1.2;
    }
    .gear-badge-img {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 14px;
        height: 14px;
        border-radius: 3px;
    }
    .icon-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 20;
        background: #1e293b;
        border: 1px solid #4ade80;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        margin-top: 2px;
    }
    .icon-dropdown-item {
        display: block;
        width: 100%;
        padding: 4px 8px;
        text-align: left;
        font-size: 0.75rem;
        color: #ccc;
        background: none;
        border: none;
        cursor: pointer;
    }
    .icon-dropdown-item:hover { background: rgba(255, 255, 255, 0.1); }
    .icon-dropdown-item.active { color: #4ade80; font-weight: bold; }
</style>
