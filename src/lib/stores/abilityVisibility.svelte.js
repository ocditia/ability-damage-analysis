import { readHiddenAbilities, writeHiddenAbilities } from '$lib/utils/abilityVisibility';

export const abilityVisibility = $state({ hidden: [], message: '', persistent: true });
export function loadAbilityVisibility() {
    try { abilityVisibility.hidden = readHiddenAbilities(localStorage); }
    catch { abilityVisibility.persistent = false; }
}
export function setAbilityHidden(key, hidden, title = key) {
    abilityVisibility.hidden = hidden
        ? [...new Set([...abilityVisibility.hidden, key])]
        : abilityVisibility.hidden.filter(value => value !== key);
    abilityVisibility.message = `${title} ${hidden ? 'hidden from the ability picker' : 'restored'}.`;
    try { abilityVisibility.persistent = writeHiddenAbilities(localStorage, abilityVisibility.hidden); }
    catch { abilityVisibility.persistent = false; }
}
