export const HIDDEN_ABILITIES_KEY = 'rsa.hidden-abilities.v1';

export function readHiddenAbilities(storage) {
    try {
        const value = JSON.parse(storage.getItem(HIDDEN_ABILITIES_KEY) || '[]');
        return Array.isArray(value) ? [...new Set(value.filter(key => typeof key === 'string'))] : [];
    } catch { return []; }
}

export function writeHiddenAbilities(storage, keys) {
    try { storage.setItem(HIDDEN_ABILITIES_KEY, JSON.stringify([...new Set(keys)])); return true; }
    catch { return false; }
}
