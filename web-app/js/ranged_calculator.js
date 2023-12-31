import { abilities } from '../../ranged/abilities';

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
    'category': 'none',

    'ability damage': 0, //for manual override only
    'level': 99,
    'potion': 'elder overload',
    
    'two-handed weapon': 'bow of the last guardian',
    'main-hand weapon': 'blightbound',
    'off-hand weapon': 'off-hand blightbound',
    'shield': 1,
    'defender': 1,
    'helmet': 'elite dracolich helmet',
    'body': 'elite dracolich top',
    'leg': 'elite dracolich bottom',
    'gloves': 'elite dracolich gloves',
    'boots': 'elite dracolich boots',
    'necklace': 'essence of finality amulet (or)',
    'ring': 'reavers',
    'cape':'igneous kal-mor',
    'pocket slot': 'grimoire',
    'reaper crew': true,
    'level 20 armour': true,
    'enchantment shadows': true,
    'enchantment dispelling': true,
    'hexhunter': false,

    //perks
    'precise': 6,
    'equilibrium': 2,
    'genocidal percent': 0,
    'spendthrift': 0,
    'ruthless rank': 0,
    'ruthless stacks': 0,
    'slayer perk': false,
    'biting': 4,
    'flanking': 0,
    'flanking position': false,
    'caroming rank': 0,
    
    'aura': 'reckless',
    'split soul': true,
    'bonus': 0,
    'hitcap': 30000,

    'npc size': 1,
    'blocking':false,

    //on-cast effects
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,

    //on-hit effects
    //pre-shared effects
    'stone of jas': 0,

    //shared
    'revenge stacks': 0,
    'prayer': "ruination",
    'swift': false,
    'ful': false,

    //pvn only
    'slayer helmet': 'none',
    'fort forinthry guardhouse': false,
    'Salve amulet': false,
    'ripper demon passive': 0,
    
    //unknown order
    'berserkers fury': 0,
    'living death':false,    

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
  const table = document.querySelector(".js--damages-table")
  const template = document.querySelector("#damage-table-row")

  for (const [abilityKey, ability] of Object.entries(abilities)) {
    const copy = template.content.cloneNode(true);
    copy.querySelector('.js--ability').setAttribute('data-ability-key', abilityKey);
    copy.querySelector('.js--ability-title').textContent = ability.title;
    copy.querySelector('.js--ability-icon').setAttribute('src', ability.icon);
    const weaponSelect = copy.querySelector('.js--ability-weapon')
    weaponSelect.addEventListener('change', (e) => {
      calculateDamages(collectSettings())
    });
    ability.weapons.forEach(item =>  {
      weaponSelect.add(new Option(item, item))
    })

    table.appendChild(copy);
  }
}

function calculateDamages(settings) {
  document.querySelectorAll(".js--damages-table tr").forEach(row => {
    const key = row.getAttribute('data-ability-key');
    const weapon = row.querySelector('.js--ability-weapon').value;
    settings['split soul'] = false;
    settings['swift'] = false;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-regular').textContent = damages[damages.length-1];

    // Recalculate with split soul
    settings['split soul'] = true;
    settings['swift'] = false;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-splitsoul').textContent = damages[damages.length-1];

    // Recalculate with swift
    settings['split soul'] = false;
    settings['swift'] = true;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-swift').textContent = damages[damages.length-1];

    // Recalculate with swift and split soul
    settings['split soul'] = true;
    settings['swift'] = true;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-swift-ss').textContent = damages[damages.length-1];
  })
}