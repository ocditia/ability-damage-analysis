<script>
    import Header from '$components/Layout/Header.svelte';
    import Navbar from '$components/Layout/Navbar.svelte';
    import TabButton from '$components/UI/TabButton.svelte';
    import GradientSeparator from '$components/UI/GradientSeparator.svelte';
    import Button from '$components/UI/Button.svelte';
    
    // Define sections for the guide with subheadings
    const sections = [
        { 
            id: 'overview', 
            title: 'Overview',
            subheadings: [
                { id: 'features', title: 'Features' }
            ]
        },
        { 
            id: 'getting-started', 
            title: 'Getting Started',
            subheadings: [
                { id: 'ability-selection', title: 'Ability Selection' },
                { id: 'damage_results', title: 'Damage Results' },
                { id: 'settings', title: 'Settings' }
            ]
        },
        { 
            id: 'building-rotation', 
            title: 'Building Your Rotation',
            subheadings: [
                { id: 'adding-abilities', title: 'Adding Abilities' },
                { id: 'managing-rotation', title: 'Managing Your Rotation' }
            ]
        },
        { 
            id: 'gear-buffs', 
            title: 'Gear & Buffs',
            subheadings: [
                { id: 'equipment', title: 'Equipment Selection' },
                { id: 'buffs', title: 'Buffs & Boosts' }
            ]
        },
        { 
            id: 'analysis', 
            title: 'Damage Analysis',
            subheadings: [
                { id: 'understanding-results', title: 'Understanding Results' },
                { id: 'optimization', title: 'Optimization Tips' }
            ]
        },
        { 
            id: 'advanced', 
            title: 'Advanced Features',
            subheadings: [
                { id: 'saving-loading', title: 'Saving & Loading' },
                { id: 'custom-settings', title: 'Custom Settings' }
            ]
        },
        { 
            id: 'tips', 
            title: 'Tips & Tricks',
            subheadings: [
                { id: 'shortcuts', title: 'Shortcuts' }
            ]
        },
        { 
            id: 'faq', 
            title: 'FAQ',
            subheadings: []
        }
    ];
    
    // Track the active section and subheading
    let activeSection = sections[0].id;
    let activeSubheading = '';
    
    // Function to handle section change
    function setActiveSection(sectionId, subheadingId = '') {
        activeSection = sectionId;
        activeSubheading = subheadingId;
        
        // Scroll to the section or subheading
        const elementId = subheadingId ? subheadingId : sectionId;
        document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
    }
</script>

<Navbar />
<Header img="/rota_background.png" text="Rotation Builder Guide" textColour="#b2dbee" shadow={true} />


<div class="space-y-14 z-20">
    <div class="responsive-container">
        <section class="grid grid-cols-5 gap-6">
            <!-- Main Content - takes up 4/5 of the width -->
            <div class="col-span-4 md:pt-6">
                <div class="flex flex-col">
                    <h2 class="main-header mb-6 ml-3 main_heading">User Guide</h2>
                    
                    
                    <GradientSeparator />
                    
                    <!-- Overview Section -->
                    <div id="overview" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Overview</div>
                        <p class="mb-4">
                            The Rotation Builder is a tool that allows you to build, analyse and optimise your combat rotations in RuneScape. 
                            You can experiment with different abilities, gear setups, combat stylesand buffs to maximize your damage output.
                        </p>
                        <p>
                            This guide will walk you through all the features and help you get the most out of the Rotation Builder.
                        </p>
                        <p>
                            Currently, there is only support for the Ranged and Magic styles.
                            Support for Melee and Necromancy will be added in the future, after refining the current features.
                        </p>
                    </div>
                    
                    <!-- Getting Started Section -->
                    <div id="getting-started" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Getting Started</div>
                        
                        <h3 id="ability-selection" class="subsection-heading">Ability Selection</h3>
                        <p class="mb-4">
                            These are the main parts of the tool. At the top of the tool, you can select your combat style 
                            (keybinds 
                            <span class="keybind">1</span>
                            <span class="keybind">2</span>
                            <span class="keybind">3</span>
                            <span class="keybind">4</span>
                            <span class="keybind">5</span>
                            )
                        </p>
                        
                        <p class="mb-4">
                            There are three tools to add abilities to your rotation:
                            <br> - <span class="tool-name">Regular</span> - <span class="keybind">r</span>
                            <br> - <span class="tool-name">Stall</span> - <span class="keybind">s</span>
                            <br> - <span class="tool-name">Null</span> - <span class="keybind">n</span>
                            <br>
                        </p>
                        <p class="mb-4">
                            <span class="tool-name">Regular</span> is the default mode.
                            To add an ability to your rotation, simply click on it in the ability selection panel. 
                            To remove an ability, <b><em>right</em></b> click on it in the rotation timeline.
                            You can also drag and drop abilities either from the ability selection panel or the rotation timeline.
                        </p>
                        
                        <!-- Adding the GIF demonstration -->
                        {#if false}
                        <figure class="mb-6">
                            <img 
                                src="/guide_images/interface/regular_tool.gif" 
                                alt="Demonstration of the Regular Tool Mode" 
                                class="w-full rounded-lg shadow-lg border border-gray-700"
                            />
                            <figcaption class="text-center mt-2 text-sm text-gray-400">
                                Regular tool (<span class="keybind">r</span>)
                            </figcaption>
                        </figure>
                        {/if}
                        <p class="mb-4">
                            Next is the <span class="tool-name">Stall</span> tool. This tool is used to allow you to release
                            a stalled ability. To activate the stall tool, press <span class="keybind">s</span>. 
                            Click an ability, then click the tick you want to release it on. To remove a stalled ability,
                            right click the ability in the rotation timeline with the stall tool active.
                        </p>
                        <p class="mb-4">
                            Finally, the <span class="tool-name">Null</span> tool is used to null a tick in the rotation timeline.
                            This can be used to simulate using abilities while the boss is invulnerable, or prebuilding on dummys.
                            No damage is calculated for nulled ticks, but adrenaline, stacks and buffs to the player are calculated as normal.
                            To null a tick, activate the null tool (<span class="keybind">n</span>) and left click the tick you want to null.
                            To remove a nulled tick, click it again.
                        </p>
                        <h3 id="damage_results" class="subsection-heading">Damage Results</h3>
                        <p class="mb-4">
                            The damage results are displayed at the top of the page. If you are using <span style="color: var(--color-poison)">Cinderbane Gloves</span>,
                            the predicted poison damage is displayed in <span style="color: var(--color-poison)">green</span>. If you are using the <span style="color: var(--color-familiar)">Ripper Demon</span> or 
                            <span style="color: var(--color-familiar)">Kalgerion Demon</span> familiars, the predicted familiar damage is displayed in <span style="color: var(--color-familiar)">cyan</span>.
                        </p>
                        <p class="mb-4">
                            As you add abilities to your rotation or change settings, the damage results will update automatically.
                            Most buffs and boosts are calculated automatically, based on the actions you have added to your rotation.
                        </p>
                        <h3 id="settings" class="subsection-heading">Settings</h3>
                        <p class="mb-4">
                            You can configure how much information you are shown, as well as how much 
                            adrenaline and how many stacks you start with in settings.
                        </p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Regular Dracolich Armour</li>
                            <li>Incite Fear proc not handled</li>
                            <li>Exsanguinate/Incite Fear/Essence Corruption stacks not handled faithfully</li>
                            <li>Several magic interactions not yet impleneted (kww, conflagrate, detonate,etc.)</li>
                            <li>Familiars attack on nulled ticks</li>
                        </ul>
                
                    </div>
                    
                    <!-- Building Your Rotation Section -->
                    <div id="building-rotation" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Building Your Rotation</div>
                        
                        <h3 id="adding-abilities" class="subsection-heading">Extra Actions</h3>
                        <p class="mb-4">
                            There are, of course, many other actions you can take in the game other than casting standard abilities.
                            In order to use adrenaline renewals, non-gcd abilities or change gear, you can use the extra actions panel.
                            This is accessed by clicking a tick in the rotation timeline. Here you have a second bar for extra actions,
                            to which you can add abilities or gear swaps from the interface. Pressing <span class="keybind keybind-wide">space</span>  will close the extra actions panel.
                            As with the main rotation, add abilities by left clicking and remove them by right clicking.
                        </p>
                        
                        <h3 id="managing-rotation" class="subsection-heading">Managing Your Rotation</h3>
                        <p>
                            Drag and drop abilities to reorder them, use the context menu to remove abilities, and use the clear button to start over.
                        </p>
                    </div>
                    
                    <!-- Gear & Buffs Section -->
                    <div id="gear-buffs" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Gear & Buffs</div>
                        
                        <h3 id="equipment" class="subsection-heading">Equipment Selection</h3>
                        <p class="mb-4">
                            Select your weapon tier and type, choose armor pieces that complement your style, and consider special effects from equipment.
                        </p>
                        
                        <h3 id="buffs" class="subsection-heading">Buffs and Boosts</h3>
                        <p>
                            Add combat boosts like prayers and potions, include familiar effects, and apply aura bonuses to maximize your damage output.
                        </p>
                    </div>
                    
                    <!-- Damage Analysis Section -->
                    <div id="analysis" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Damage Analysis</div>
                        
                        <h3 id="understanding-results" class="subsection-heading">Understanding the Results</h3>
                        <p class="mb-4">
                            Learn how to interpret the damage analysis, including total damage output, damage per minute (DPM), and adrenaline generation.
                        </p>
                        
                        <h3 id="optimization" class="subsection-heading">Optimization Tips</h3>
                        <p>
                            Discover strategies for optimizing your rotation, such as looking for ability synergies, maintaining buff uptimes, and balancing adrenaline usage.
                        </p>
                    </div>
                    
                    <!-- Advanced Features Section -->
                    <div id="advanced" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Advanced Features</div>
                        
                        <h3 id="saving-loading" class="subsection-heading">Saving and Loading</h3>
                        <p class="mb-4">
                            Save your rotations for later use, import existing rotations, and share rotations with others.
                        </p>
                        
                        <h3 id="custom-settings" class="subsection-heading">Custom Settings</h3>
                        <p>
                            Adjust target armor values, set specific combat levels, and configure additional modifiers to simulate different combat scenarios.
                        </p>
                    </div>
                    
                    <!-- Tips & Tricks Section -->
                    <div id="tips" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Tips & Tricks</div>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>Start with basic abilities to build adrenaline</li>
                            <li>Use thresholds when you have sufficient adrenaline</li>
                            <li>Time your ultimate abilities for maximum effect</li>
                            <li>Consider ability bleeds and damage over time effects</li>
                            <li>Pay attention to shared cooldowns</li>
                        </ul>
                        <h3 id="shortcuts" class="subsection-heading">Shortcuts</h3>
                        <ul class="list-disc pl-5 space-y-2">
                            <li><span class="keybind">r</span>: <span class="tool-name">Regular</span></li>
                            <li><span class="keybind">s</span>: <span class="tool-name">Stall</span></li>
                            <li><span class="keybind">n</span>: <span class="tool-name">Null</span></li>
                            <li><span class="keybind">1</span>: <span class="text-style text-ranged">Ranged</span></li>
                            <li><span class="keybind">2</span>: <span class="text-style text-magic">Magic</span></li>
                            <li><span class="keybind">3</span>: <span class="text-style text-melee">Melee</span></li>
                            <li><span class="keybind">4</span>: <span class="text-style text-necro">Necromancy</span></li>
                            <li><span class="keybind">5</span>: <span class="text-style text-defence">Defence</span></li>
                            <li><span class="keybind keybind-wide">space</span>: Close extra actions panel</li>
                        </ul>
                    </div>

                    
                    
                    <!-- FAQ Section -->
                    <div id="faq" class="card card-home mt-6">
                        <div class="card-title pb-5 section-heading">Frequently Asked Questions</div>
                        
                        <div class="mb-4">
                            <h3 class="text-xl font-semibold mb-2">How accurate is the damage calculation?</h3>
                            <p>
                                Pretty accurate! A few things are impossible to reasonably calculate exactly, but for the most part we 
                                aim to be more or less 100%. If you do find anything wrong, please let us know in the Discord.
                            </p>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-2">How do I report bugs or suggest features?</h3>
                            <p>
                                Join our Discord community or submit issues through our GitHub repository.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Sidebar for navigation - takes up 1/5 of the width -->
            <div class="col-span-1">
                <div class="sticky top-8 pt-8">
                    <div class="card card-home">
                        <div class="card-title pb-5">Quick Navigation</div>
                        <ul class="space-y-4">
                            {#each sections as section}
                                <li>
                                    <button 
                                        class="text-left w-full px-3 py-2 rounded hover:bg-gray-700 {activeSection === section.id ? 'bg-gray-700 font-semibold' : ''}"
                                        on:click={() => setActiveSection(section.id)}
                                    >
                                        {section.title}
                                    </button>
                                    
                                    <!-- Subheadings -->
                                    {#if section.subheadings && section.subheadings.length > 0}
                                        <ul class="ml-4 mt-1 space-y-1">
                                            {#each section.subheadings as subheading}
                                                <li>
                                                    <button 
                                                        class="text-left w-full px-3 py-1 text-sm rounded hover:bg-gray-700 {activeSubheading === subheading.id ? 'bg-gray-700 font-semibold' : ''}"
                                                        on:click={() => setActiveSection(section.id, subheading.id)}
                                                    >
                                                        {subheading.title}
                                                    </button>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    /* Add any custom styles here */
    h3 {
        color: #e2c08d;
    }

    p {
        font-size: 1.2rem;
    }

    .main_heading {
        color: #b2dbee;
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        padding-top: 1rem;
    }
    
    .section-heading {
        font-size: 3rem;
        font-weight: 600;
        color: #ffb2f2;
        margin-bottom: 0.5rem;
        padding-top: 1rem;
    }

    .subsection-heading {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .card-home {
        transition: all 0.3s ease;
        padding: 1.0rem; 
        /* override inherited padding from .card{} */
    }
 
    /* TODO make header user this  */
    /* Add text shadow to the header for better readability */
    .banner-text {
        text-shadow: 0 4px 20px rgba(94, 0, 63, 0.95), 0 0 8px rgb(0, 0, 0, 0.95);
        font-weight: 700;
        animation: pulse 24s infinite;
    }

    
    @keyframes pulse {
        0% {
            color: #b2dbee;
            opacity: 1;
        }
        
        20% {
            color: var(--color-magic);
            opacity: 1;
        }
        40% {
            color: var(--color-necro);
            opacity: 0.9;
        }
        60% {
            color: var(--color-melee);
            opacity: 1;
        }
        80% {
            color: var(--color-ranged);
            opacity: 1;
        }
        100% {
            color: #b2dbee;
            opacity: 1;
        }
    }

    
    .responsive-container{
        margin-left: 0% !important;
        margin-right: 0% !important;
        padding-left: 3% !important;
        padding-right: 3% !important;
        max-width: 100% !important;
    }


    
    /* Tool name styling */
    .tool-name {
        display: inline-block;
        font-weight: 600;
        color: #4fd1c5; /* Teal color */
        background-color: rgba(45, 55, 72, 0.5); /* Dark blue-gray background */
        padding: 0.15rem 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid rgba(79, 209, 197, 0.3); /* Subtle teal border */
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.05em;
        transition: all 0.2s ease;
    }
    
    .tool-name:hover {
        background-color: rgba(45, 55, 72, 0.8);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    /* Keybind styling - more subtle than tool-name */
    .keybind {
        display: inline-block;
        font-family: monospace;
        font-weight: 500;
        color: #fbd38d; /* Light amber color */
        background-color: rgba(45, 45, 45, 0.3); /* Very subtle dark background */
        padding: 0.1rem 0.4rem;
        border-radius: 0.2rem;
        border-bottom: 1px solid rgba(251, 211, 141, 0.3); /* Subtle bottom border */
        letter-spacing: 0.03em;
    }

    .keybind-wide {
        min-width: 60px;
        text-align: center;
    }
    
    /* Fancy but lighter style classes for text */
    .text-style {
        display: inline-block;
        font-weight: 600;
        padding: 0 0.2rem;
        position: relative;
        transition: all 0.2s ease;
        letter-spacing: 0.03em;
    }
    
    .text-style::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0px;
        left: 0;
        transform: scaleX(0.80);
        transition: all 0.2s ease;
        opacity: 0.5;
    }
    
    .text-style:hover {
        transform: translateY(-1px);
    }
    
    .text-style:hover::after {
        transform: scaleX(1);
        opacity: 1;
    }
    
    .text-ranged {
        color: var(--color-ranged);
    }
    
    .text-ranged::after {
        background-color: var(--color-ranged);
    }
    
    .text-magic {
        color: var(--card-border-magic);
    }
    
    .text-magic::after {
        background-color: var(--card-border-magic);
    }
    
    .text-melee {
        color: var(--card-border-melee);
    }
    
    .text-melee::after {
        background-color: var(--card-border-melee);
    }
    
    .text-necro {
        color: var(--card-border-necro);
    }
    
    .text-necro::after {
        background-color: var(--card-border-necro);
    }
    
    .text-defence {
        color: #a0a0a0;
    }
    
    .text-defence::after {
        background-color: #a0a0a0;
    }
</style>
