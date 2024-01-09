import { abilities } from './ranged/abilities.js';
import piercing_shot from './ranged/abils/piercing_shot.js';

// list of abilities that multi hit
function getMultiHitAbilityClass(abilityKey) {
  const multiHitAbilities = {
    'Greater ricochet': '.grico-multi',
    'Gen Snipe': '.snipe-multi',
    'Snapshot': '.snap-multi',
    'Seren Godbow': '.sgb-multi',
    'Deadshot': '.deadshot-multi',
    'Shadow tendrils': '.tendril-multi'
  };
  if(abilityKey in multiHitAbilities) {
    return multiHitAbilities[abilityKey];
  }
  return null;
}

// determine whether the row should have a bolg calculator
// applied. Do not calculate for rows with multi-hits or
// for bleeds or dw only.
function shouldCalculateBoLG(abilityKey) {
  const skipBolg = [
    'Corruption Shot',
    'Fragmentation Shot',
    'Deadshot bleed',
    'SGB 2',
    'SGB 3',
    'SGB 4',
    'SGB 5',
    'SGB 6',
    'SGB 7',
    'SGB 8',
    'Needle Strike',
    'Unload'
  ];
  return !getMultiHitAbilityClass(abilityKey) && !skipBolg.includes(abilityKey);
}

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
    'equilibrium': 0,
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
    copy.querySelector('.js--ability').id = abilityKey;
    copy.querySelector('.js--ability').setAttribute('data-ability-key', abilityKey);
    copy.querySelector('.js--ability-title').textContent = ability.title;
    copy.querySelector('.js--ability-icon').setAttribute('src', ability.icon);
    // add onclick callback functions and classes to hide multi-hit
    addOnClickToMultiHit(copy, abilityKey);
    addClassToMultiHit(copy, abilityKey);
    addOnClickForBoLG(copy, abilityKey);
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

// given a stats object with a key and weapon,
// calculate the damage and store the results in stats
function calculateDamage(stats, settings, calculateForBolg) {
  const key = stats.key;
  const weapon = stats.weapon;
  let calculator;
  if(calculateForBolg) {
    calculator = piercing_shot; // TODO: replace with BOLG calc
  }
  else {
    calculator = abilities[key].calc;
  }
  settings['split soul'] = false;
  settings['swift'] = false;
  let damages = calculator(weapon, settings, 1, key);
  stats.ability_regular = damages[damages.length-1];

  // Recalculate with split soul
  settings['split soul'] = true;
  settings['swift'] = false;
  damages = calculator(weapon, settings, 1, key);
  stats.ability_splitsoul = damages[damages.length-1];

  // Recalculate with swift
  settings['split soul'] = false;
  settings['swift'] = true;
  damages = calculator(weapon, settings, 1, key);
  stats.ability_swift = damages[damages.length-1];

  // Recalculate with swift and split soul
  settings['split soul'] = true;
  settings['swift'] = true;
  damages = calculator(weapon, settings, 1, key);
  stats.ability_swift_ss = damages[damages.length-1];
}

// calculate all the damage for the table
function calculateDamages(settings) {
  document.querySelectorAll(".js--damages-table tr").forEach(row => {
    const stats = {
      key: row.getAttribute('data-ability-key'),
      weapon: row.querySelector('.js--ability-weapon').value,
      ability_regular: null,
      ability_splitsoul: null,
      ability_swift: null,
      ability_swift_ss: null
    };
    calculateDamage(stats, settings, false);
    row.querySelector('.js--ability-regular').textContent = stats.ability_regular;
    row.querySelector('.js--ability-splitsoul').textContent = stats.ability_splitsoul;
    row.querySelector('.js--ability-swift').textContent = stats.ability_swift;
    row.querySelector('.js--ability-swift-ss').textContent = stats.ability_swift_ss;
  })
}

// if the current ability, abilityKey, is an ability 
// that hits multiple times, add an onClick call back to toggle
// the visiblity of the damage of the individual hits
function addOnClickToMultiHit(copy, abilityKey) {
  const multiHitClass = getMultiHitAbilityClass(abilityKey);
  if(multiHitClass) {
    copy.querySelector('.js--ability').addEventListener('click', function() {
      document.querySelectorAll(multiHitClass).forEach(multiRow => {
        if(multiRow.style.display == 'none') {
          multiRow.style.display = '';
        }
        else {
          multiRow.style.display = 'none';
        }
      });
    });
  }
}

// if the current ability, abilityKey, is an individual
// hit of a specific ability, hide the row initially,
// and make it so it can be unhidden by the ability row
function addClassToMultiHit(copy, abilityKey) {
  const multiAbilities = {
    'Grico 1': 'grico-multi',
    'Grico 2': 'grico-multi',
    'Grico 3': 'grico-multi',
    'Snipe': 'snipe-multi',
    'Nightmare Snipe': 'snipe-multi',
    'Snap 1': 'snap-multi',
    'Snap 2': 'snap-multi',
    'SGB 1': 'sgb-multi',
    'SGB 2': 'sgb-multi',
    'SGB 3': 'sgb-multi',
    'SGB 4': 'sgb-multi',
    'SGB 5': 'sgb-multi',
    'SGB 6': 'sgb-multi',
    'SGB 7': 'sgb-multi',
    'SGB 8': 'sgb-multi',
    'Deadshot hit': 'deadshot-multi',
    'Deadshot bleed': 'deadshot-multi',
    'Shadow tendrils 2': 'tendril-multi',
    'Shadow tendrils 3': 'tendril-multi',
    'Shadow tendrils 4': 'tendril-multi',
    'Shadow tendrils 5': 'tendril-multi',
  };
  if(abilityKey in multiAbilities) {
    const row = copy.querySelector('.js--ability');
    row.classList.add(multiAbilities[abilityKey]);
    row.style.display = 'none';
  }
}

// add the onclick callback function for calculating bolg damage
function addOnClickForBoLG(copy, abilityKey) {
  if(shouldCalculateBoLG(abilityKey)) {
    copy.querySelector('.js--ability').addEventListener('click', () => {
      calculateBoLG(abilityKey);
    }, true);
  }
}

// calculate bolg damage callback function
// hide/show the damage after calculation
function calculateBoLG(abilityKey) {
  const element = document.getElementById(abilityKey);
  const settings = collectSettings();
  if(settings['two-handed weapon'] == 'bow of the last guardian') { 
    // if we're already showing the numbers when clicked, remove the numbers
    if(element.showBoLG) {
      element.classList.remove('bolg-row');
      element.querySelector('.js--ability-regular').textContent = element.querySelector('.js--ability-regular').textContent.split('/')[0];
      element.querySelector('.js--ability-splitsoul').textContent = element.querySelector('.js--ability-splitsoul').textContent.split('/')[0];
      element.querySelector('.js--ability-swift').textContent = element.querySelector('.js--ability-swift').textContent.split('/')[0];
      element.querySelector('.js--ability-swift-ss').textContent = element.querySelector('.js--ability-swift-ss').textContent.split('/')[0];
    }
    // calculate and show the bolg numbers
    else {
      const stats = {
        key: abilityKey,
        weapon: element.querySelector('.js--ability-weapon').value,
        bolg_ability: abilityKey,
        ability_regular: null,
        ability_splitsoul: null,
        ability_swift: null,
        ability_swift_ss: null
      };
      calculateDamage(stats, settings,true);
      element.classList.add('bolg-row');
      element.querySelector('.js--ability-regular').textContent += "/" + stats.ability_regular;
      element.querySelector('.js--ability-splitsoul').textContent += "/" + stats.ability_splitsoul;
      element.querySelector('.js--ability-swift').textContent += "/" + stats.ability_swift;
      element.querySelector('.js--ability-swift-ss').textContent += "/" +stats.ability_swift_ss;
    }
    element.showBoLG = !element.showBoLG;
  }
}