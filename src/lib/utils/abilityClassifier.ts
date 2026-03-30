import { abils } from '$lib/data/abilities';
// Group order for display
const GROUP_ORDER = ['basic', 'threshold', 'ultimate', 'special attack', 'spell', 'conjure'];

const LABELS: Record<string, string> = {
    'basic': 'B',
    'threshold': 'T',
    'ultimate': 'U',
    'special attack': 'SA',
    'spell': 'S',
    'conjure': 'C',
    'other': '?'
};

const TITLES: Record<string, string> = {
    'basic': 'Basic Abilities',
    'threshold': 'Enhanced Abilities',
    'ultimate': 'Ultimate Abilities',
    'special attack': 'Special Attacks',
    'spell': 'Spells & Incantations',
    'conjure': 'Conjures',
    'other': '?'
};

export function groupAbilitiesByType(abilities: Record<string, any>): Array<{ type: string; label: string; title: string; abilities: [string, any][] }> {
    const groups: Record<string, [string, any][]> = {};
    GROUP_ORDER.forEach(t => groups[t] = []);
    groups['other'] = [];

    for (const [key, ability] of Object.entries(abilities)) {
        const abilInfo = abils[key as keyof typeof abils];
        const type = abilInfo.abilityType || 'other';
        if (groups[type]) {
            groups[type].push([key, ability]);
        } else {
            groups['other'].push([key, ability]);
        }
    }

    const result: Array<{ type: string; label: string; title: string, abilities: [string, any][] }> = [];
    for (const type of [...GROUP_ORDER, 'other']) {
        if (groups[type] && groups[type].length > 0) {
            result.push({ type, label: LABELS[type], title: TITLES[type], abilities: groups[type] });
        }
    }
    return result;
}
