"""Refresh additional combat boss targets from reviewed Wiki infobox variants.

Run with Python and requests installed. No inferred/default defence or affinity
values: missing numeric stats abort generation. Existing encounter simulations
in boss_presets.ts remain authoritative for their original keys.
"""
import json
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import requests

ROOT = Path(__file__).resolve().parent.parent
# Page, monster-infobox index, variants (None means every listed variant).
SOURCES = [
    ('Vorkath', 0, ['1', '2', '3']), ('Zemouregal', 1, ['1', '2', '3']),
    ('Hermod, the Spirit of War', 0, ['1', '2']),
    ('Rasial, the First Necromancer', 0, ['1', '2']),
    ('Vermyx, Brood Mother', 0, None), ('Kezalam, the Wanderer', 0, None),
    ('Nakatra, Devourer Eternal', 0, None), ('Osseous', 0, ['']),
    ('Amascut, the Devourer', 0, None), ('Flesh-hatcher Mhekarnahz', 0, ['']),
    ('Ivar, King of Bones', 0, ['']), ('Silverquill, the Dreadhog', 0, ['']),
    ('Dragith Nurn', 0, ['']), ('Tormented wraith', 0, ['']),
    ('Abomination', 0, None), ('Giant mole', 0, ['2']),
    ('Kerapac, the bound', 0, None), ('Arch-Glacor', 0, ['1']),
    *[(f'Legio {name}', 0, ['']) for name in ['Primus','Secundus','Tertius','Quartus','Quintus','Sextus']],
    *[(name, 0, ['1']) for name in ['Dharok the Wretched','Guthan the Infested','Karil the Tainted','Torag the Corrupted','Verac the Defiled','Akrisae the Doomed']],
    ('Agoroth', 0, ['']), ('Cliff', 0, None), ('Bork', 0, ['1']),
    ('Skeletal horror', 0, None), ('Phoenix', 0, ['']), ('Hollowtoof', 0, ['']),
    ('Avatar of Creation', 0, ['']), ('Avatar of Destruction', 0, ['']),
]
NOTES = {
    'Zemouregal': "Target stats after Vorkath leaves. His barrier while Vorkath is present is not simulated.",
    'Vorkath': 'Solo base health. Group health scaling is not simulated.',
    'Amascut, the Devourer': 'Base target stats; enrage-specific mechanics, barriers and phase health are not simulated.',
    'Kerapac, the bound': 'Target accuracy stats only; phase health and Time Warp are not simulated by this entry.',
    'Arch-Glacor': 'Normal-mode target stats; mechanic-dependent health scaling is not simulated.',
    'Agoroth': 'Combat-level-dependent health and shell mechanics are not simulated.',
    'Avatar of Creation': 'Soul Wars avatar; Slayer-level requirements are not simulated.',
    'Avatar of Destruction': 'Soul Wars avatar; Slayer-level requirements are not simulated.',
    'Akrisae the Doomed': 'Protection prayer changes are not simulated.',
}

def infoboxes(text):
    for match in re.finditer(r'{{Infobox Monster\b', text, re.I):
        start = match.start(); depth = 0
        for token in re.finditer(r'{{|}}', text[start:]):
            depth += 1 if token.group() == '{{' else -1
            if depth == 0:
                block = text[start:start + token.end()]
                yield dict(re.findall(r'^\|[ \t]*([\w]+)[ \t]*=[ \t]*([^\n]*)', block, re.M))
                break

def number(value):
    value = value.strip().replace(',', '')
    if not re.fullmatch(r'\d+(?:\.\d+)?', value):
        raise ValueError(f'Unverified numeric stat: {value!r}')
    return float(value) if '.' in value else int(value)

def fetch(source):
    page, box, variants = source
    url = 'https://runescape.wiki/w/' + requests.utils.quote(page.replace(' ', '_'), safe='')
    response = requests.get(url + '?action=raw', headers={'User-Agent':'rs-rotations (https://github.com/weirdgloop/rs-rotations)'}, timeout=30)
    response.raise_for_status()
    fields = list(infoboxes(response.text))[box]
    versions = variants if variants is not None else [k[7:] for k in fields if re.fullmatch(r'version\d+', k)] or ['']
    output = {}
    for version in versions:
        def value(key): return fields.get(key + version, fields.get(key, '')).strip()
        label = fields.get('version' + version, '') if version else ''
        name = page + (f' ({label})' if label else '')
        affinity = {key: number(value('aff_' + key)) / 100 for key in ['weakness','melee','ranged','magic']}
        if value('weakness').lower() == 'necromancy': affinity['necromancy'] = affinity['weakness']
        entry = dict(name=name, defenceLevel=number(value('defence')), armour=number(value('armour')),
            weakness=value('weakness'), style=value('style').title(), affinities=affinity,
            taggable=False, curseImmune=value('immune_to_drain').lower() == 'yes', popular=True,
            source=url, notes=NOTES.get(page, 'Base target stats; encounter-specific mechanics are not simulated.'))
        if page in ['Hermod, the Spirit of War', 'Rasial, the First Necromancer']:
            entry['allowedStyles'] = ['necromancy']
            entry['notes'] = 'Only Necromancy can directly attack this boss. Encounter-specific mechanics are not simulated.'
        if page not in ['Kerapac, the bound','Arch-Glacor','Amascut, the Devourer']:
            try: entry['health'] = number(value('lifepoints'))
            except ValueError: pass
        output[name] = entry
    return output

if __name__ == '__main__':
    entries = {}
    with ThreadPoolExecutor(max_workers=3) as pool:
        for batch in pool.map(fetch, SOURCES): entries.update(batch)
    path = ROOT / 'src/lib/data/bosses/additional_targets.json'
    path.write_text(json.dumps(dict(sorted(entries.items())), indent=2) + '\n', encoding='utf-8')
    print(f'Wrote {len(entries)} verified targets to {path}')
