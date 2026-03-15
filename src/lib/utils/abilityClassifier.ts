import { abils } from '$lib/calc/const/const';

// Group order for display
const GROUP_ORDER = ['buff', 'basic', 'threshold', 'ultimate', 'special attack'];

const LABELS: Record<string, string> = {
    'buff': 'B',
    'basic': 'B',
    'threshold': 'T',
    'ultimate': 'U',
    'special attack': 'S',
    'other': '?'
};

export function groupAbilitiesByType(abilities: Record<string, any>): Array<{ type: string; label: string; abilities: [string, any][] }> {
    const groups: Record<string, [string, any][]> = {};
    GROUP_ORDER.forEach(t => groups[t] = []);
    groups['other'] = [];

    for (const [key, ability] of Object.entries(abilities)) {
        const abilInfo = abils[key as keyof typeof abils];
        if (!abilInfo) {
            // Abilities not in abils record are buff abilities (from separate buff_abilities.js files)
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
    return result;
}
