/**
 * Export/import rotations in pvme Discord emoji format.
 *
 * PVME format: ability names separated by " → " with line breaks.
 * e.g. "grico → snap → rapid → sgb → dbow"
 *
 * The mapping converts between our ABILITIES enum keys (e.g. 'greater ricochet')
 * and pvme emoji aliases (e.g. 'grico').
 */

// Our ability key → pvme emoji name
// Only abilities that differ from the auto-derived name (key with spaces removed) need entries here.
const KEY_TO_PVME = {
    // Ranged
    'greater ricochet': 'grico',
    'snap shot': 'snap',
    'rapid fire': 'rapid',
    'piercing shot': 'piercing',
    'corruption shot': 'corruptshot',
    "death's swiftness": 'ds',
    "greater death's swiftness": 'gds',
    'shadow tendrils': 'shadowtend',
    'binding shot': 'bindingshot',
    'tight bindings': 'tightbindings',
    'bombardment': 'bombard',
    'crystal rain': 'crystalrain',
    'split soul ecb': 'ecb',
    'imbue shadows': 'imbueshadows',
    'ranged auto': 'rangedbasic',
    'deadshot': 'deadshot',
    'igneous deadshot': 'igneousdeadshot',
    'snipe': 'snipe',
    'destructive shot': 'dshot',
    'balanced shot': 'balancedshot',
    'aimed shot': 'aimedshot',
    'restorative shot': 'restorativeshot',
    'galeshot': 'galeshot',
    'deep burn': 'deepburn',
    'soul shot': 'soulshot',
    'twin shot': 'twinshot',

    // Melee
    'assault': 'assault',
    'greater barge': 'gbarge',
    'barge': 'barge',
    'dismember': 'dismember',
    'slaughter': 'slaughter',
    'greater flurry': 'gflurry',
    'flurry': 'flurry',
    'greater fury': 'gfury',
    'fury': 'fury',
    'chaos roar': 'chaosroar',
    'hurricane': 'cane',
    'quake': 'quake',
    'cleave': 'cleave',
    'meteor strike': 'meteorstrike',
    'overpower': 'overpower',
    'pulverise': 'pulverise',
    'bladed dive': 'bd',
    'backhand': 'backhand',
    'igneous cleave': 'igneousoverpower',
    'balance by force': 'balancebyforce',
    'impale': 'impale',
    'sever': 'sever',
    'smash': 'smash',
    'slice n dice': 'slicendice',
    'berserk': 'zerk',
    'melee auto': 'meleebasic',

    // Magic
    'greater concentrated blast': 'gconc',
    'concentrated blast': 'conc',
    'wild magic': 'wm',
    'asphyxiate': 'asphyx',
    'dragon breath': 'dbreath',
    'corruption blast': 'corruptionblast',
    'greater chain': 'gchain',
    'chain': 'chain',
    'combust': 'combust',
    'greater sonic wave': 'gsonic',
    'sonic wave': 'sonic',
    'omnipower': 'omni',
    'smoke tendrils': 'smoketend',
    'tsunami': 'nami',
    'sunshine': 'sun',
    'greater sunshine': 'gsun',
    'magma tempest': 'magmatempest',
    'detonate': 'deto',
    'deep impact': 'deep',
    'impact': 'impact',
    'wrack': 'wrack',
    'magic auto': 'magicbasic',
    'tempest of armadyl': 'intempestofarmadyl',

    // Defence / shared
    'devotion': 'devo',
    'resonance': 'res',
    'debilitate': 'debil',
    'anticipation': 'anti',
    'freedom': 'freedom',
    'reflect': 'reflect',
    'barricade': 'cade',
    'immortality': 'immort',
    'preparation': 'prep',
    'provoke': 'voke',
    'surge': 'surge',
    'escape': 'escape',
    'divert': 'divert',
};

// Reverse map: pvme name → our ability key
const PVME_TO_KEY = {};
for (const [key, pvme] of Object.entries(KEY_TO_PVME)) {
    PVME_TO_KEY[pvme] = key;
}

/**
 * Convert an ability key to its pvme emoji name.
 * Falls back to removing spaces from the key.
 */
function toPvmeName(abilityKey) {
    if (!abilityKey) return null;
    if (KEY_TO_PVME[abilityKey]) return KEY_TO_PVME[abilityKey];
    // Auto-derive: remove spaces
    return abilityKey.replace(/\s+/g, '').replace(/'/g, '');
}

/**
 * Convert a pvme emoji name to our ability key.
 * Falls back to returning the name as-is (may not match).
 */
function fromPvmeName(pvmeName) {
    if (!pvmeName) return null;
    const lower = pvmeName.toLowerCase().trim();
    if (PVME_TO_KEY[lower]) return PVME_TO_KEY[lower];
    // No match found - return as-is for the caller to handle
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

        const name = key ? toPvmeName(key) : '·';
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
            return acc + ' → ' + part;
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
        .split(/→|\n/)
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
