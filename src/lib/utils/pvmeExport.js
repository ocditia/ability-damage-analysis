/**
 * Export/import rotations in pvme Discord emoji format.
 *
 * PVME format: ability names separated by " → " with line breaks.
 * e.g. "grico → snap → rapid → sgb → dbow"
 *
 * Mappings built from official PVME emoji definitions:
 * https://github.com/pvme/pvme-settings/blob/master/emojis/emojis_v2.json
 */

// Our ability key → pvme emoji id (used for export)
const KEY_TO_PVME = {
    // ── Necromancy ──
    'necromancy auto': 'necroauto',
    'touch of death': 'touchofdeath',
    'soul sap': 'soulsap',
    'conjure undead army': 'conjurearmy',
    'conjure skeleton warrior': 'conjureskeleton',
    'command skeleton warrior': 'commandskeleton',
    'conjure vengeful ghost': 'conjureghost',
    'command vengeful ghost': 'commandghost',
    'conjure putrid zombie': 'conjurezombie',
    'command putrid zombie': 'commandzombie',
    'conjure phantom guardian': 'conjurephantom',
    'command phantom guardian': 'commandphantom',
    'life transfer': 'lifetransfer',
    'threads of fate': 'threadsoffate',
    'invoke death': 'invokedeath',
    'split soul necro': 'splitsoul',
    'finger of death': 'fingerofdeath',
    'death skulls': 'deathskulls',
    'soul strike': 'soulstrike',
    'volley of souls': 'volleyofsouls',
    'spectral scythe 1': 'spectralscythe',
    'spectral scythe 2': 'spectralscythe2',
    'spectral scythe 3': 'spectralscythe3',
    'blood siphon': 'bloodsiphon',
    'bloat': 'bloat',
    'living death': 'livingdeath',
    'death grasp': 'handofdoom',

    // ── Ranged ──
    'ranged auto': 'rangedbasic',
    'piercing shot': 'piercingshot',
    'galeshot': 'galeshot',
    'imbue shadows': 'imbueshadows',
    'binding shot': 'bindingshot',
    'snipe': 'snipe',
    'dazing shot': 'dazing',
    'greater dazing shot': 'mds',
    'demoralise': 'demoralise',
    'needle strike': 'needle',
    'fragmentation shot': 'frag',
    'ricochet': 'ricochet',
    'greater ricochet': 'grico',
    'corruption shot': 'corruptshot',
    'snap shot': 'snapshot',
    'tight bindings': 'tight',
    'rout': 'rout',
    'rapid fire': 'rapid',
    'bombardment': 'bombard',
    'salt the wound': 'stw',
    'shadow tendrils': 'shadowtend',
    'deadshot': 'deadshot',
    'igneous_deadshot': 'deadshotigneous',
    'incendiary shot': 'incend',
    'unload': 'unload',
    'split soul ecb': 'ecb',
    'crystal rain': 'crystalrain',
    "death's swiftness": 'deathsswiftness',
    "greater death's swiftness": 'gdeathsswift',
    'balance by force': 'balancebyforce',
    'destructive shot': 'dshot',
    'balanced shot': 'balancedshot',
    'aimed shot': 'aimedshot',
    'restorative shot': 'restorativeshot',
    'deep burn': 'deepburn',
    'soul shot': 'soulshot',
    'twin shot': 'twinshot',

    // ── Melee ──
    'melee auto': 'meleebasic',
    'slice': 'slice',
    'backhand': 'backhand',
    'havoc': 'havoc',
    'smash': 'rend',
    'barge': 'barge',
    'greater barge': 'gbarge',
    'sever': 'sever',
    'bladed dive': 'bd',
    'slaughter': 'slaughter',
    'forceful backhand': 'fbackhand',
    'flurry': 'flurry',
    'greater flurry': 'gflurry',
    'hurricane': 'cane',
    'dismember': 'dismember',
    'fury': 'fury',
    'greater fury': 'gfury',
    'cleave': 'cleave',
    'adaptive strike': 'adaptivestrike',
    'rend': 'rend',
    'chaos roar': 'chaosroar',
    'destroy': 'destroy',
    'quake': 'quake',
    'assault': 'assault',
    'pulverise': 'pulverise',
    'frenzy': 'frenzy',
    'overpower': 'overpower',
    'igneous cleave': 'overpowerigneous',
    'meteor strike': 'meteorstrike',
    'berserk': 'zerk',
    'impale': 'impale',
    'slice & dice': 'slicendice',
    'bloodlust': 'bloodlust',
    'stomp': 'stomp',
    'decimate': 'decimate',

    // ── Magic ──
    'magic auto': 'magicbasic',
    'wrack': 'wrack',
    'wrack and ruin': 'wrackandruin',
    'impact': 'impact',
    'dragon breath': 'dbreath',
    'sonic wave': 'sonic',
    'greater sonic wave': 'gsonic',
    'shock': 'shock',
    'concentrated blast': 'conc',
    'greater concentrated blast': 'gconc',
    'combust': 'combust',
    'chain': 'chain',
    'greater chain': 'gchain',
    'magma tempest': 'magmatemptest',
    'corruption blast': 'corruptionblast',
    'asphyxiate': 'asphyx',
    'deep impact': 'deep',
    'horror': 'horror',
    'detonate': 'deto',
    'wild magic': 'wm',
    'smoke cloud': 'smokecloud',
    'smoke tendrils': 'smoketendrils',
    'omnipower': 'omni',
    'tsunami': 'tsunami',
    'sunshine': 'sunshine',
    'greater sunshine': 'gsunshine',
    'tempest of armadyl': 'temporalanomaly',
    'exsanguinate': 'exsanguinate',
    'incite fear': 'incitefear',
    'instability': 'instability',

    // ── Defence / Shared ──
    'anticipation': 'anti',
    'freedom': 'freedom',
    'resonance': 'res',
    'devotion': 'devo',
    'reflect': 'reflect',
    'divert': 'divert',
    'preparation': 'prep',
    'barricade': 'cade',
    'immortality': 'immort',
    'debilitate': 'debil',
    'natural instinct': 'naturalinstinct',
    'ingenuity of the humans': 'ingen',
    'limitless': 'limitless',
    'surge': 'surge',
    'escape': 'escape',
    'dive': 'dive',
    'vengeance': 'veng',
    'disruption shield': 'disrupt',
    'dragon slayer ability': 'dragonslayer',
    'demon slayer ability': 'demonslayer',
    'undead slayer ability': 'undeadslayer',
    'provoke': 'voke',
    'runic charge': 'runic_charge',
    'revenge': 'revenge',
    'spellbook swap': 'sbs',
};

// Reverse map: pvme name/alias → our ability key (used for import)
// Built from KEY_TO_PVME plus all PVME id_aliases
const PVME_TO_KEY = {};

// First populate from our forward map
for (const [key, pvme] of Object.entries(KEY_TO_PVME)) {
    PVME_TO_KEY[pvme] = key;
}

// All known PVME aliases that map to our ability keys.
// Format: [pvmeAlias, ourAbilityKey]
const PVME_ALIASES = [
    // Necromancy
    ['tod', 'touch of death'], ['touch', 'touch of death'],
    ['conjarmy', 'conjure undead army'],
    ['conjskele', 'conjure skeleton warrior'], ['conjureskele', 'conjure skeleton warrior'],
    ['conjskeleton', 'conjure skeleton warrior'], ['conjurewarrior', 'conjure skeleton warrior'],
    ['conjwarrior', 'conjure skeleton warrior'], ['conjurewar', 'conjure skeleton warrior'],
    ['conjwar', 'conjure skeleton warrior'],
    ['comskele', 'command skeleton warrior'], ['commandskele', 'command skeleton warrior'],
    ['comskeleton', 'command skeleton warrior'],
    ['conjghost', 'conjure vengeful ghost'],
    ['comghost', 'command vengeful ghost'],
    ['conjzom', 'conjure putrid zombie'], ['conjzombie', 'conjure putrid zombie'],
    ['conjurezom', 'conjure putrid zombie'],
    ['comzom', 'command putrid zombie'], ['commandzom', 'command putrid zombie'],
    ['comzombie', 'command putrid zombie'],
    ['conjphant', 'conjure phantom guardian'], ['conjphantom', 'conjure phantom guardian'],
    ['conjurephant', 'conjure phantom guardian'],
    ['comphantom', 'command phantom guardian'], ['comphant', 'command phantom guardian'],
    ['commandphant', 'command phantom guardian'],
    ['tof', 'threads of fate'], ['threads', 'threads of fate'],
    ['invdeath', 'invoke death'], ['invoke', 'invoke death'],
    ['necross', 'split soul necro'],
    ['finger', 'finger of death'], ['fod', 'finger of death'],
    ['skulls', 'death skulls'],
    ['igneousskulls', 'death skulls'], ['igneousdeathskulls', 'death skulls'],
    ['vos', 'volley of souls'], ['volley', 'volley of souls'],
    ['specscythe', 'spectral scythe 1'], ['scythe1', 'spectral scythe 1'],
    ['specscythe2', 'spectral scythe 2'], ['scythe2', 'spectral scythe 2'],
    ['specscythe3', 'spectral scythe 3'], ['scythe3', 'spectral scythe 3'],
    ['ld', 'living death'],
    ['hod', 'death grasp'],
    ['necromancyauto', 'necromancy auto'],
    ['dspark', 'death spark'], ['deathspark', 'death spark'],

    // Ranged
    ['rangedauto', 'ranged auto'], ['ranged_basic', 'ranged auto'],
    ['autoranged', 'ranged auto'], ['basicranged', 'ranged auto'],
    ['pierce', 'piercing shot'], ['piercing', 'piercing shot'], ['piercing_shot', 'piercing shot'],
    ['imbuegales', 'galeshot'], ['gales', 'galeshot'],
    ['imbue_shadows', 'imbue shadows'],
    ['snap', 'snap shot'],
    ['rapid', 'rapid fire'], ['rapidfire', 'rapid fire'],
    ['bombard', 'bombardment'],
    ['corruptshot', 'corruption shot'], ['corrshot', 'corruption shot'], ['cshot', 'corruption shot'],
    ['frag', 'fragmentation shot'], ['fragshot', 'fragmentation shot'],
    ['gricocaroming', 'greater ricochet'], ['carominggrico', 'greater ricochet'], ['cgrico', 'greater ricochet'],
    ['shadowtend', 'shadow tendrils'], ['shadowtendrils', 'shadow tendrils'],
    ['incend', 'incendiary shot'],
    ['stw', 'salt the wound'], ['saltthewound', 'salt the wound'],
    ['ds', 'death\'s swiftness'], ['swiftness', 'death\'s swiftness'],
    ['deathswift', 'death\'s swiftness'], ['deaths_swiftness', 'death\'s swiftness'],
    ['deathswiftness', 'death\'s swiftness'],
    ['greaterdeathsswift', 'greater death\'s swiftness'], ['gswift', 'greater death\'s swiftness'],
    ['gds', 'greater death\'s swiftness'],
    ['gdazingshot', 'greater dazing shot'], ['greaterdazing', 'greater dazing shot'],
    ['greaterdazingshot', 'greater dazing shot'], ['gdazing', 'greater dazing shot'],
    ['needle', 'needle strike'],
    ['rico', 'ricochet'],
    ['tight', 'tight bindings'],
    ['ecb', 'split soul ecb'],
    ['dshot', 'destructive shot'],
    ['igneousdeadshot', 'igneous_deadshot'], ['deadshotigneous', 'igneous_deadshot'],

    // Melee
    ['meleeauto', 'melee auto'], ['melee_basic', 'melee auto'],
    ['basicmelee', 'melee auto'], ['automelee', 'melee auto'],
    ['gbarge', 'greater barge'], ['greaterbarge', 'greater barge'],
    ['bd', 'bladed dive'],
    ['cane', 'hurricane'],
    ['gfury', 'greater fury'],
    ['gflurry', 'greater flurry'],
    ['fbackhand', 'forceful backhand'],
    ['croar', 'chaos roar'], ['roar', 'chaos roar'], ['chaos_roar', 'chaos roar'],
    ['meteorstrike', 'meteor strike'], ['meteor', 'meteor strike'], ['meteor_strike', 'meteor strike'],
    ['overpowerigneous', 'igneous cleave'], ['igneousoverpower', 'igneous cleave'],
    ['zerk', 'berserk'],
    ['adaptivestrike', 'adaptive strike'], ['adaptive_strike', 'adaptive strike'], ['adaptive', 'adaptive strike'],
    ['bloodtend', 'blood tendrils'], ['bloodtendril', 'blood tendrils'],
    ['eslice', 'slice'],

    // Magic
    ['magicauto', 'magic auto'], ['magic_basic', 'magic auto'],
    ['automagic', 'magic auto'], ['basicmagic', 'magic auto'],
    ['gconc', 'greater concentrated blast'], ['greaterconc', 'greater concentrated blast'],
    ['greaterconcentrated', 'greater concentrated blast'],
    ['greaterconcentratedblast', 'greater concentrated blast'],
    ['conc', 'concentrated blast'], ['concentratedblast', 'concentrated blast'], ['concblast', 'concentrated blast'],
    ['wm', 'wild magic'], ['wildmagic', 'wild magic'],
    ['asphyx', 'asphyxiate'],
    ['dbreath', 'dragon breath'], ['db', 'dragon breath'],
    ['corruptionblast', 'corruption blast'], ['cblast', 'corruption blast'], ['corruption_blast', 'corruption blast'],
    ['gchain', 'greater chain'], ['greaterchain', 'greater chain'],
    ['gchaincaroming', 'greater chain'],
    ['gsonic', 'greater sonic wave'], ['greatersonic', 'greater sonic wave'],
    ['greatersonicwave', 'greater sonic wave'],
    ['sonic', 'sonic wave'],
    ['omni', 'omnipower'],
    ['omnipowerigneous', 'omnipower'], ['igneousomnipower', 'omnipower'],
    ['smoketend', 'smoke tendrils'], ['smoketends', 'smoke tendrils'],
    ['nami', 'tsunami'],
    ['sun', 'sunshine'],
    ['gsun', 'greater sunshine'], ['greatersunshine', 'greater sunshine'],
    ['deto', 'detonate'], ['detonate', 'detonate'],
    ['deep', 'deep impact'], ['deepimpact', 'deep impact'],
    ['magma', 'magma tempest'], ['magma_tempest', 'magma tempest'],
    ['magmatempest', 'magma tempest'],
    ['superwrack', 'wrack and ruin'],
    ['ewrack', 'wrack'],
    ['wrackenergising', 'wrack'],
    ['exsang', 'exsanguinate'],
    ['sc', 'smoke cloud'],
    ['meta', 'metamorphosis'],
    ['rcharge', 'runic charge'], ['runiccharge', 'runic charge'],

    // Defence / Shared
    ['anti', 'anticipation'], ['anticipate', 'anticipation'],
    ['res', 'resonance'], ['reso', 'resonance'], ['resonance', 'resonance'],
    ['devo', 'devotion'],
    ['debil', 'debilitate'], ['debilitate', 'debilitate'],
    ['cade', 'barricade'], ['barricade', 'barricade'],
    ['immort', 'immortality'],
    ['prep', 'preparation'],
    ['voke', 'provoke'], ['provoke', 'provoke'],
    ['ingen', 'ingenuity of the humans'], ['ioth', 'ingenuity of the humans'],
    ['naturalinstinct', 'natural instinct'], ['natinstinct', 'natural instinct'],
    ['natty', 'natural instinct'], ['nat', 'natural instinct'],
    ['disrupt', 'disruption shield'],
    ['onsl', 'onslaught'], ['onslaught', 'onslaught'],
    ['veng', 'vengeance'], ['vengance', 'vengeance'],
    ['esc', 'escape'],
    ['surgemobile', 'surge'],
    ['escapemobile', 'escape'],
    ['cept', 'intercept'],
    ['dragonslayer', 'dragon slayer ability'],
    ['demonslayer', 'demon slayer ability'],
    ['undeadslayer', 'undead slayer ability'],
    ['eofspec', 'special attack'], ['espec', 'special attack'],
    ['sbs', 'spellbook swap'],
    ['tuskas', 'tuskas wrath'], ['tuska', 'tuskas wrath'],
    ['stormshards', 'storm shard'], ['shard', 'storm shard'],
];

for (const [alias, key] of PVME_ALIASES) {
    if (!PVME_TO_KEY[alias]) {
        PVME_TO_KEY[alias] = key;
    }
}

/**
 * Convert an ability key to its pvme emoji name.
 * Falls back to removing spaces and apostrophes from the key.
 */
function toPvmeName(abilityKey) {
    if (!abilityKey) return null;
    if (KEY_TO_PVME[abilityKey]) return KEY_TO_PVME[abilityKey];
    // Auto-derive: remove spaces and apostrophes
    return abilityKey.replace(/\s+/g, '').replace(/'/g, '');
}

/**
 * Convert a pvme emoji name to our ability key.
 * Returns null if no match found.
 */
function fromPvmeName(pvmeName) {
    if (!pvmeName) return null;
    const lower = pvmeName.toLowerCase().trim();
    if (PVME_TO_KEY[lower]) return PVME_TO_KEY[lower];
    // No match found
    return null;
}

/**
 * Export a rotation's ability bar to pvme Discord format.
 * @param {(string|null)[]} abilityBar - The ability bar array
 * @param {Object} options
 * @param {number} [options.ticksPerLine=0] - Break lines every N ticks (0 = single line)
 * @param {boolean} [options.skipEmpty=true] - Skip null/empty ticks
 * @returns {string} The pvme-formatted rotation string
 */
export function exportToPvme(abilityBar, options = {}) {
    const { ticksPerLine = 0, skipEmpty = true } = options;

    const parts = [];
    let lineCount = 0;

    for (let i = 0; i < abilityBar.length; i++) {
        const key = abilityBar[i];
        if (!key && skipEmpty) continue;

        const name = key ? toPvmeName(key) : '\u00b7';
        parts.push(name);
        lineCount++;

        if (ticksPerLine > 0 && lineCount % ticksPerLine === 0) {
            parts.push('\n');
        }
    }

    // Join with → , clean up newline formatting
    return parts
        .reduce((acc, part) => {
            if (part === '\n') {
                return acc + '\n';
            }
            if (acc === '' || acc.endsWith('\n')) {
                return acc + part;
            }
            return acc + ' \u2192 ' + part;
        }, '')
        .trim();
}

/**
 * Parse a pvme-formatted rotation string back into an ability key array.
 * @param {string} text - The pvme rotation string
 * @returns {{ abilities: string[], unmatched: string[] }}
 */
export function importFromPvme(text) {
    const abilities = [];
    const unmatched = [];

    // Split on → and newlines, flatten
    const tokens = text
        .split(/\u2192|\n/)
        .map(t => t.trim())
        .filter(t => t.length > 0);

    for (const token of tokens) {
        // Strip Discord emoji format if present: <:name:id> → name
        const emojiMatch = token.match(/<:([^:]+):\d+>/);
        const name = emojiMatch ? emojiMatch[1] : token.toLowerCase().replace(/\s+/g, '');

        const key = fromPvmeName(name);
        if (key) {
            abilities.push(key);
        } else {
            abilities.push(null);
            unmatched.push(token);
        }
    }

    return { abilities, unmatched };
}
