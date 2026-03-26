import { abils } from '$lib/data/abilities';
// Group order for display
const GROUP_ORDER = ['buff', 'basic', 'threshold', 'ultimate', 'special attack', 'conjure'];

const LABELS: Record<string, string> = {
    // 'buff': 'B',
    'basic': 'B',
    'threshold': 'T',
    'ultimate': 'U',
    'special attack': 'S',
    'conjure': 'C',
    'other': '?'
};

export function groupAbilitiesByType(abilities: Record<string, any>): Array<{ type: string; label: string; abilities: [string, any][] }> {
    const groups: Record<string, [string, any][]> = {};
    GROUP_ORDER.forEach(t => groups[t] = []);
    groups['other'] = [];

    for (const [key, ability] of Object.entries(abilities)) {
        const abilInfo = abils[key as keyof typeof abils];
        if (!abilInfo) {
            // Abilities not in abils record are buff abilities
            groups['buff'].push([key, ability]);
        } else {
            const type = abilInfo['ability type'] || 'other';
            if (groups[type]) {
                groups[type].push([key, ability]);
            } else {
                groups['other'].push([key, ability]);
            }
        }
    }

    const result: Array<{ type: string; label: string; abilities: [string, any][] }> = [];
    for (const type of [...GROUP_ORDER, 'other']) {
        if (groups[type] && groups[type].length > 0) {
            result.push({ type, label: LABELS[type] || type, abilities: groups[type] });
        }
    }
    console.log(result)
    return result;
}
