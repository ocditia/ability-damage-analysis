"""Build local screenshot templates from bundled icons and official PVME emojis.
Assets belong to Jagex/PVME. Only small matching fingerprints are stored.
Run from the repository root; requires Pillow. No user screenshots are uploaded.
"""
import io,json,urllib.request,sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'static/rotation-import'
OUT.mkdir(exist_ok=True)
URL='https://raw.githubusercontent.com/pvme/pvme-settings/master/emojis/emojis_v2.json'
metadata=json.load(urllib.request.urlopen(URL,timeout=30))
emojis=[e for c in metadata['categories'] for e in c['emojis']]
(OUT/'pvme.json').write_text(json.dumps([{'name':e['name'],'id':e['id'],'aliases':e.get('id_aliases',[]),'emoji':e.get('emoji_id','')} for e in emojis],separators=(',',':')),encoding='utf-8')
def fingerprint(data):
    im=Image.open(data).convert('RGBA')
    # Trim transparent margins; detection finds the visible icon rather than its padding.
    box=im.getbbox()
    if box: im=im.crop(box)
    im=im.resize((12,12),Image.Resampling.BILINEAR)
    return list(im.tobytes())
features=[]
for folder in ['ability_icons','effect_icons','equipment_icons']:
    for path in (ROOT/'static'/folder).rglob('*.png'):
        try: features.append({'icon':'/rs-rot/'+path.relative_to(ROOT/'static').as_posix(),'pixels':fingerprint(path)})
        except Exception: pass
selected=[e for c in metadata['categories'] if any(w in c['name'].lower() for w in ['abilities','gear','jewellery','prayers','consumables']) for e in c['emojis'] if e.get('emoji_id')]
def fetch(e):
    try:
        url='https://cdn.discordapp.com/emojis/'+e['emoji_id']+'.png?size=32&quality=lossless'
        with urllib.request.urlopen(url,timeout=12) as r: data=r.read()
        return {'name':e['name'],'id':e['id'],'pixels':fingerprint(io.BytesIO(data))}
    except Exception: return None
remote=[]
# Discord may deny server-side downloads; bundled Wiki sprites remain available.
# Opt in when refreshing PVME fingerprints from a network that permits access.
if '--pvme' in sys.argv:
    with ThreadPoolExecutor(max_workers=8) as pool: remote=list(pool.map(fetch,selected))
features.extend(x for x in remote if x)
(OUT/'templates.json').write_text(json.dumps(features,separators=(',',':')),encoding='utf-8')
print(f'{len(features)} templates; {sum(x is not None for x in remote)}/{len(selected)} PVME sprites. Source: {URL}')
