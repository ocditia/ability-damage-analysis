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
      'AD': 1500, //for manual override only
      'level': 120,
      'potion': "Elder overload",
      'Reaper crew': true,

      'mh':{
          'name': 'Wand of the praesul',
          'perks': [['Precise',6], ['aftershock',1]]
      },

      'oh':{
          'name': 'Seismic singularity',
          'perks': [['equilibrium',2], ['aftershock',4]]
      },

      'top':{
          'name': 'Elite tectonic',
          'perks': [['biting',4]]
      },

      'bottom':{
          'name': 'Elite tectonic',
          'perks': [['biting',4]]
      },

      'boots': 'Enhanced blast diffusion',

      'gloves': 'Enhanced Kerapac',

      'ring': 'Channelers',

      'aura': 'Mahjarrat',

      'bonus': 0,

      'cap': 10000,
      'critCap': 15000,

      //on-cast effects
      'Zamorak balance of power': 0,
      'Sophanem corrupted': 0,
      'Raksha inner power': 0,

      //on-hit effects
      //shared
      'Revenge': 0,
      'Spendthrift': 0,
      'Ruthless': 0,

      //pvn only
      'Slayer helm': 0,
      'Fort forinthry guardhouse': false,
      'Salve amulet': false,
      'Ripper demon passive': 0,
      
      //unknown order
      'Berserkers fury': 0,    

      //on-crit effects
      'Animate dead': false,
      'Kalgerion demon familiar': false,
      'Crit-i-kal': false,

      //on-npc effects
      'Vulnerability': false,
      'Corrupted wounds': false, //gop bleed buff
      'Slayer sigil': false,

      //apply somewhere idk
      'nopenopenope': 0, //poh spider buff
      'Ruby aurora': 0,
      'cryptbloom': false,
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
    ability.weapons.forEach(item =>  {
      weaponSelect.add(new Option(item, item))
    })
    table.appendChild(copy);
  }
}

function calculateDamages(settings) {
  document.querySelectorAll(".js--damages-table tr").forEach(row => {
    const key = row.getAttribute('data-ability-key');
    damages = abilities[key].calc('', settings, 1);
    row.querySelector('.js--ability-regular').textContent = damages[0][1];

    // Recalculate with soulsplit
    row.querySelector('.js--ability-splitsoul').textContent = damages[0][1];
  })
}