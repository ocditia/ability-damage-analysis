<script>
    import { rangedGear } from '$lib/special/abilities';
    import { SETTINGS } from '$lib/calc/settings';
    import { GearSlots } from '$lib/calc/rotation_builder/gear';

    export let gearItems = {}; // Default to an empty object if no data is provided
    export let handleAbilityClick;
    export let handleDragStart;
    export let style = 'ranged';
    export let settings;

    const iconPath = '/gear_icons/';
    const png = '.png';

    console.log(rangedGear);
    console.log('Gear Choice');
    console.log(settings);

    let rangedBody = settings[SETTINGS.RANGED_BODY].value;
    let rangedLegs = settings[SETTINGS.RANGED_LEGS].value;
    
    console.log(rangedBody);
    console.log(rangedLegs);

    function getImage(slot) {
        const sharedSlots = [GearSlots.NECKLACE, GearSlots.POCKET, 
            GearSlots.RING, GearSlots.CAPE, GearSlots.AMMO];
        let baseString = '';
        if (!sharedSlots.includes(slot)) {
            baseString = style + ' ';
        }
        const slotKey =  baseString + slot;
        console.log('Slot key!!!! = ' + slotKey);
        const item = settings[slotKey].value;
        return iconPath + item + png; 
    }

    function getBorderColour() {
        if (style === 'ranged') return '#00bf63';
        else if (style === 'necro') return '#d694ff';
        else if (style === 'magic') return '#94a3ff';
        else if (style === 'melee') return '#fe5c5c';
        else return '#fff';
    }
</script>

<div class="flex-container">
    <!-- Equipped gear interface -->
     {#if false} 
        <div class="box img-box">
            <img
                src='/armour_icons/Worn%20equipment%20interface.png'
                alt='Equipment display'
                title='Equipment display'
                class="main-image"
            />
            <!-- <img
                src='/gear_icons/completionist%20cape.png'
                alt='Aura slot'
                class="overlay-image"
                style="top: 4.25em; left: 3.05em;"
            /> -->
            <img
                src={getImage(GearSlots.HELMET)}
                alt='Helmet slot'
                class="overlay-image"
                style="top: 5.2em; left: 6.45em;"
            />
            <img
                src={getImage(GearSlots.NECKLACE)}
                alt='Amulet slot'
                class="overlay-image"
                style="top: 7.7em; left: 6.45em;"
            />
            <img
                src={getImage(GearSlots.BODY)}
                alt='Body slot'
                class="overlay-image"
                style="top: 10.1em; left: 6.45em;"
            />
            <img
                src={getImage(GearSlots.LEGS)}
                alt='Legs slot'
                class="overlay-image"
                style="top: 12.5em; left: 6.45em;"
            />
            <img
                src={getImage(GearSlots.BOOTS)}
                alt='Boots slot'
                class="overlay-image"
                style="top: 15.0em; left: 6.45em;"
            />
            <img
                src={getImage(GearSlots.CAPE)}
                alt='Cape slot'
                class="overlay-image"
                style="top: 6.8em; left: 3.1em;"
            />
            <img
                src={getImage(GearSlots.AMMO)}
                alt='Ammo slot'
                class="overlay-image"
                style="top: 7.7em; left: 9.0em;"
            />
            <img
                src={getImage(GearSlots.GLOVES)}
                alt='Gloves slot'
                class="overlay-image"
                style="top: 15.25em; left: 2.8em;"
            />
            <img
                src={getImage(GearSlots.RING)}
                alt='Ring slot'
                class="overlay-image"
                style="top: 15.0em; left: 10.1em;"
            />
            <!-- <img
                src='/gear_icons/completionist%20cape.png'
                alt='Mainhand slot'
                class="overlay-image"
                style="top: 9.3em; left: 1.8em;"
            />
            <img
                src='/gear_icons/completionist%20cape.png'
                alt='Offhand slot'
                class="overlay-image"
                style="top: 9.3em; left: 9.3em;"
            /> -->

            <img
                src={getImage(GearSlots.POCKET)}
                alt='Pocket slot'
                class="overlay-image"
                style="top: 5.25em; left: 8.9em;"
            />
        </div> 
    {/if}
    <!-- Gear Selection interface-->
    <div class="box">
        <div class="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-9 gap-x-0.5 gap-y-2 abilities">
            {#each Object.entries(rangedGear) as [slot, items]}
                <div class="col-span-1">
                    {#each Object.entries(items) as [key, item]}
                        <div
                            role="button"
                            tabindex="0"
                            aria-label={item.title}
                            on:click={(e) => handleAbilityClick(e, item)}
                            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAbilityClick(e, item); }}
                            style="display: inline-block; overflow: hidden; width: 30px; height: 30px; "
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                draggable="true"
                                on:dragstart={(e) => handleDragStart(e, item)}
                                title={item.title}
                                style="width: 30px; height: 30px; object-fit: contain; border: 1px solid {getBorderColour()};"
                            />
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>
<style>
    .flex-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .box {
        margin: 5px;
        text-align: center;  /* Center text */
    }

    .img-box {
        width:auto;
        min-width: 207px;
        border: solid 1px #878787;
        position: relative; 
        display: inline-block;
    }

    .main-image {
        width: 100%; 
        object-fit: contain; /* Keep aspect ratio */
        border: 1px solid #0f1316;
    }

    .overlay-image {
        position: absolute;
        width: auto;
        height: auto;
        z-index: 100;
        pointer-events: none;
        transform: translate(-50%, -50%);
    }
</style>