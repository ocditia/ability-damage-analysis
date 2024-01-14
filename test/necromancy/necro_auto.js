import necro_auto from '../../js/necromancy/abils/necro_auto.js';
import assert from 'assert';

describe('necro_auto', function() {
  it('default settings avg hit', function() {
    const settings = {
      'minavgmax': 'avg',
      'category': 'none',
  
      'ability damage': 0, //for manual override only
      'level': 120,
      'potion': 'elder overload',
      
      'two-handed weapon': 1,
      'main-hand weapon': 'omni guard',
      'off-hand weapon': 'soulbound lantern',
      'shield': 1,
      'defender': 1,
      'helmet': 'crown of the first necromancer',
      'body': 'robe top of the first necromancer',
      'leg': 'robe bottom of the first necromancer',
      'gloves': 'hand wraps of the first necromancer',
      'boots': 'foot wraps of the first necromancer',
      'necklace': 'essence of finality amulet (or)',
      'ring': 'reavers',
      'cape':'igneous kal-mor',
      'pocket slot': 'grimoire',
      'reaper crew': true,
      'level 20 armour': true,
  
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
      'skeleton rage stacks': 0,
      'haunted': false,
      'necrosis stacks': 0
    };

    const damage = necro_auto('dw', settings, 1)

    assert.strictEqual(damage[0], 3105, 'Avg hit incorrect')
  })
});