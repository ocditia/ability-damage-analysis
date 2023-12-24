import { abilities } from '../../necromancy/abilities';

buildDamagesTable(abilities);
calculateDamages(collectSettings())

const settings = document.getElementsByClassName('js--setting');
for (let setting of settings) {
  setting.addEventListener('change', (e) => {
    calculateDamages(collectSettings())
  });
}

function collectSettings() {
  // Have default settings here
  const settings = {
    'minavgmax': 'avg',

    'ability damage': 0, //for manual override only
    'level': 120,
    'potion': 'elder overload',
    
    'two-handed weapon': 1,
    'main-hand weapon': 'Omni guard',
    'off-hand weapon': 'Soulbound lantern',
    'shield': 1,
    'defender': 1,
    'helmet': 'Crown of the first necromancer',
    'body': 'Robe top of the first necromancer',
    'leg': 'Robe bottom of the first necromancer',
    'gloves': 'Hand wraps of the first necromancer',
    'boots': 'Foot wraps of the first necromancer',
    'necklace': 'Essence of finality amulet (or)',
    'ring': 'Reavers',
    'cape':'Igneous kal-mor',
    'pocket slot': 'Grimoire',
    'reaper crew': true,
    'level 20 armour': true,

    //perks
    'precise': 0,
    'equilibrium': 0,
    'genocidal': 0,
    'spendthrift': 0,
    'ruthless rank': 0,
    'ruthless stacks': 0,
    'slayer perk': false,
    'biting': 4,
    'flanking': 0,
    
    'aura': 'Mahjarrat',
    'split soul': false,
    'bonus': 0,
    'cap': 30000,

    //on-cast effects
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,

    //on-hit effects
    //pre-shared effects
    'stone of jas': 0,

    //shared
    'Revenge': 0,
    'prayer': "sorrow",

    //pvn only
    'slayer helmet': 'none',
    'fort forinthry guardhouse': false,
    'Salve amulet': false,
    'ripper demon passive': 0,
    
    //unknown order
    'berserkers fury': 0,    

    //on-crit effects
    'smoke cloud': false,
    'kalgerion demon familiar': false,
    'crit-i-kal': false,

    //on-npc effects
    'vulnerability': false,
    'corrupted wounds': false, //gop bleed buff
    'slayer sigil': false,

    //apply somewhere idk
    'nopenopenope': 0, //poh spider buff
    'Ruby aurora': 0,
    'death spores': false,
    'Skeleton rage stacks': 2,
    'Zamorak inner chaos': 0,
    'Zamorak guardians triumph': 0,
    'Zamorak sword of edicts': 0,
    'Telos red beam': false,
    'Telos black beam': false,
    'Infernal puzzle box': false,
    'King black dragon wilderness portal': false,
    'Tokkul-zo': false,
};

  document.querySelectorAll('.js--setting').forEach(node => {
    let val = node.value;
    if (node.getAttribute('type') === 'number') {
      val = parseFloat(val);
    } else if (node.getAttribute('type') === 'checkbox') {
      val = node.checked;
    }
    settings[node.getAttribute('data-setting-name')] = val;
  }); 

  return settings;
}

function buildDamagesTable(abilities) {
  console.log("here")
  const table = document.querySelector(".js--damages-table")
  const template = document.querySelector("#damage-table-row")

  for (const [abilityKey, ability] of Object.entries(abilities)) {
    const copy = template.content.cloneNode(true);
    copy.querySelector('.js--ability').setAttribute('data-ability-key', abilityKey);
    copy.querySelector('.js--ability-title').textContent = ability.title;
    copy.querySelector('.js--ability-icon').setAttribute('src', ability.icon);
    const weaponSelect = copy.querySelector('.js--ability-weapon')
    ability.weapons.forEach(item =>  {
      weaponSelect.add(new Option(item, item))
    })
    table.appendChild(copy);
  }
}

function calculateDamages(settings) {
  document.querySelectorAll(".js--damages-table tr").forEach(row => {
    const key = row.getAttribute('data-ability-key');
    settings['split soul'] = false;
    damages = abilities[key].calc('', settings, 1);
    row.querySelector('.js--ability-regular').textContent = damages[damages.length-1];

    // Recalculate with split soul
    settings['split soul'] = true;
    damages = abilities[key].calc('', settings, 1);
    row.querySelector('.js--ability-splitsoul').textContent = damages[damages.length-1];
  })
}