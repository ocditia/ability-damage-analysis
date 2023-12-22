const darkbow_auto = require("./abils/dbow_auto");
const th_auto = require("./abils/th_auto");
const mh_auto = require("./abils/mh_auto");
const oh_auto = require("./abils/oh_auto");
const piercing_shot = require("./abils/piercing_shot");
const piercing_shot_bound = require("./abils/piercing_shot_bound");
const binding_shot = require("./abils/binding_shot");
const ricochet = require("./abils/ricochet");
const greater_ricochet = require("./abils/greater_ricochet");
const dazing_shot = require("./abils/dazing_shot");
const greater_dazing_shot = require("./abils/greater_dazing_shot");
const needle_strike = require("./abils/needle_strike");
const snipe = require("./abils/snipe");
const corruption_shot = require("./abils/corruption_shot");
const frag_shot = require("./abils/frag_shot");
const tight_bindings = require("./abils/tight_bindings");
const bombardment = require("./abils/bombardment");
const shadow_tendrils = require("./abils/shadow_tendrils");
const rapid_fire = require("./abils/rapid_fire");
const snapshot = require("./abils/snapshot");
const salt_the_wound = require("./abils/salt_the_wound");
const darkbow_spec = require("./abils/darkbow_spec");
const magic_shortbow_spec = require("./abils/magic_shortbow_spec");
const sgb_spec = require("./abils/sgb_spec.js");
const bolg_spec = require("./abils/bolg_spec");
const deadshot = require("./abils/deadshot");
const unload = require("./abils/unload");
const incendiary_shot = require("./abils/incendiary_shot");
const sacrifice = require("./abils/sacrifice");
const tuska_wrath = require("./abils/tuska_wrath");
const bash = require("./abils/bash");


const abilities = {
    'Dark Bow Auto': {
        title: 'Dark Bow Auto',
        calc: darkbow_auto,
        icon: 'icon_url_2H_Auto',
        weapons: ['Dw'],
      },
    '2H Auto': {
      title: '2H Auto',
      calc: th_auto,
      icon: 'icon_url_2H_Auto',
      weapons: ['Dw'],
    },
    'MH Auto': {
      title: 'MH Auto',
      calc: mh_auto,
      icon: 'icon_url_MH_Auto',
      weapons: ['Dw'],
    },
    'OH Auto': {
      title: 'OH Auto',
      calc: oh_auto,
      icon: 'icon_url_OH_Auto',
      weapons: ['Dw'],
    },
    'Piercing Shot': {
      title: 'Piercing Shot',
      calc: piercing_shot,
      icon: 'icon_url_Piercing_Shot',
      weapons: ['Dw'],
    },
    'Piercing Shot Bound': {
      title: 'Piercing Shot Bound',
      calc: piercing_shot_bound,
      icon: 'icon_url_Piercing_Shot_Bound',
      weapons: ['Dw'],
    },
    'Binding Shot': {
      title: 'Binding Shot',
      calc: binding_shot,
      icon: 'icon_url_Binding_Shot',
      weapons: ['Dw'],
    },
    'Ricochet': {
      title: 'Ricochet',
      calc: ricochet,
      icon: 'icon_url_Ricochet',
      weapons: ['Dw'],
    },
    'Greater Ricochet': {
      title: 'Greater Ricochet',
      calc: greater_ricochet,
      icon: 'icon_url_Greater_Ricochet',
      weapons: ['Dw'],
    },
    'Dazing Shot': {
      title: 'Dazing Shot',
      calc: dazing_shot,
      icon: 'icon_url_Dazing_Shot',
      weapons: ['Dw'],
    },
    'Greater Dazing Shot': {
      title: 'Greater Dazing Shot',
      calc: greater_dazing_shot,
      icon: 'icon_url_Greater_Dazing_Shot',
      weapons: ['Dw'],
    },
    'Needle Strike': {
        title: 'Needle Strike',
        calc: needle_strike,
        icon: 'icon_url_Needle_Strike',
        weapons: ['Dw'],
    },
    'Snipe': {
        title: 'Snipe',
        calc: snipe,
        icon: 'icon_url_Snipe',
        weapons: ['Dw'],
    },
    'Corruption Shot': {
        title: 'Corruption Shot',
        calc: corruption_shot,
        icon: 'icon_url_Corruption_Shot',
        weapons: ['Dw'],
    },
    'Frag Shot': {
        title: 'Frag Shot',
        calc: frag_shot,
        icon: 'icon_url_Frag_Shot',
        weapons: ['Dw'],
    },
    'Tight Bindings': {
        title: 'Tight Bindings',
        calc: tight_bindings,
        icon: 'icon_url_Tight_Bindings',
        weapons: ['Dw'],
    },
    'Bombardment': {
        title: 'Bombardment',
        calc: bombardment,
        icon: 'icon_url_Bombardment',
        weapons: ['Dw'],
    },
    'Shadow Tendrils': {
        title: 'Shadow Tendrils',
        calc: shadow_tendrils,
        icon: 'icon_url_Shadow_Tendrils',
        weapons: ['Dw'],
    },
    'Rapid Fire': {
        title: 'Rapid Fire',
        calc: rapid_fire,
        icon: 'icon_url_Rapid_Fire',
        weapons: ['Dw'],
    },
    'Snapshot': {
        title: 'Snapshot',
        calc: snapshot,
        icon: 'icon_url_Snapshot',
        weapons: ['Dw'],
    },
    'Salt The Wound': {
        title: 'Salt The Wound',
        calc: salt_the_wound,
        icon: 'icon_url_Salt_The_Wound',
        weapons: ['Dw'],
    },
    'DarkBow Spec': {
        title: 'DarkBow Spec',
        calc: darkbow_spec,
        icon: 'icon_url_DarkBow_Spec',
        weapons: ['Dw'],
    },
    'Magic Shortbow Spec': {
        title: 'Magic Shortbow Spec',
        calc: magic_shortbow_spec,
        icon: 'icon_url_Magic_Shortbow_Spec',
        weapons: ['Dw'],
    },
    'SGB Spec': {
        title: 'SGB Spec',
        calc: sgb_spec,
        icon: 'icon_url_SGB_Spec',
        weapons: ['Dw'],
    },
    'Bolg Spec': {
        title: 'Bolg Spec',
        calc: bolg_spec,
        icon: 'icon_url_Bolg_Spec',
        weapons: ['Dw'],
    },
    'Deadshot': {
        title: 'Deadshot',
        calc: deadshot,
        icon: 'icon_url_Deadshot',
        weapons: ['Dw'],
    },
    'Unload': {
        title: 'Unload',
        calc: unload,
        icon: 'icon_url_Unload',
        weapons: ['Dw'],
    },
    'Incendiary Shot': {
        title: 'Incendiary Shot',
        calc: incendiary_shot,
        icon: 'icon_url_Incendiary_Shot',
        weapons: ['Dw'],
    },
    'Sacrifice': {
        title: 'Sacrifice',
        calc: sacrifice,
        icon: 'icon_url_Sacrifice',
        weapons: ['Dw'],
    },
    'Tuska\'s Wrath': {
      title: 'Tuska\'s Wrath',
      calc: tuska_wrath,
      icon: 'icon_url_Tuskas_Wrath',
      weapons: ['Dw'],
    },
    'Bash': {
      title: 'Bash',
      calc: bash,
      icon: 'icon_url_Bash',
      weapons: ['Dw'],
    },
  };

export {abilities}