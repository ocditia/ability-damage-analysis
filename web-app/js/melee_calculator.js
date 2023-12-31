import { abilities } from '../../melee/abilities';

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
    'level': 120,
    'potion': 'elder overload',
    
    'two-handed weapon': 'ek-zekkil',
    'main-hand weapon': 'dark shard of leng',
    'off-hand weapon': 'dark sliver of leng',
    'shield': 1,
    'defender': 1,
    'helmet': 'vestments of havoc hood',
    'body': 'vestments of havoc robe top',
    'leg': 'vestments of havoc robe bottom',
    'gloves': 'cinderbane gloves',
    'boots': 'vestments of havoc boots',
    'necklace': 'essence of finality amulet (or)',
    'ring': 'reavers',
    'cape':'igneous kal-ket',
    'pocket slot': 'grimoire',
    'reaper crew': true,
    'level 20 armour': true,
    'terrasaur': false,
    'enchantment savagery': true,
    'enchantment agony': true,
    'chaos roar': false,

    //perks
    'precise': 0,
    'equilibrium': 0,
    'genocidal percent': 0,
    'spendthrift': 0,
    'ruthless rank': 0,
    'ruthless stacks': 0,
    'slayer perk': false,
    'biting': 4,
    'flanking': 0,
    'flanking position': false,
    
    'aura': 'mahjarrat',
    'split soul': true,
    'bonus': 0,
    'hitcap': 30000,

    'inquisitor': false,

    //on-cast effects
    'flow stacks': 0,
    'Zamorak balance of power': 0,
    'Sophanem corrupted': 0,
    'Raksha inner power': 0,  

    //on-hit effects
    //pre-shared effects
    'stone of jas': 0,

    //shared
    'revenge stacks': 0,
    'prayer': "affliction",
    'berserk': false,
    'zgs': false,
    'dragon battle axe spec': false,
    'annihilation stacks': 0,
    'gloves of passage': false,
    'ful': false,

    //pvn only
    'slayer helmet': 'none',
    'fort forinthry guardhouse': false,
    'Salve amulet': false,
    'ripper demon passive': 0,
    
    //unknown order
    'berserkers fury': 0,
    'living death':false,    
    'exsanguinate stacks': 0,

    //on-crit effects
    'smoke cloud': false,
    'kalgerion demon familiar': false,
    'crit-i-kal': false,
    'conc stacks': 0,
    'fury stacks': 0,

    //on-npc effects
    'vulnerability': false,
    'corrupted wounds': false, //gop bleed buff
    'slayer sigil': false,
    'metamorphosis': false,

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
    'skeleton rage stacks': 0,
    'haunted': false,

    'ezk bleed': 6,
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
    const weapon = row.querySelector('.js--ability-weapon').value;
    const key = row.getAttribute('data-ability-key');
    settings['berserk'] = false;
    settings['zgs'] = false;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-regular').textContent = damages[damages.length-1];

    // Recalculate with sun
    settings['zgs'] = true;
    settings['berserk'] = false;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-zgs').textContent = damages[damages.length-1];

    // Recalculate with meta
    settings['berserk'] = true;
    settings['zgs'] = false;
    damages = abilities[key].calc(weapon, settings, 1);
    row.querySelector('.js--ability-berserk').textContent = damages[damages.length-1];
  })
}