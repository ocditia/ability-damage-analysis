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
const magic_shortbow_spec = require("./abils/magic_short_bow_spec");
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
        icon: 'https://runescape.wiki/images/Dark_bow.png',
        weapons: ['Dw'],
      },
    '2H Auto': {
      title: '2H Auto',
      calc: th_auto,
      icon: 'https://i.imgur.com/5DBjkvx.png',
      weapons: ['2h'],
    },
    'MH Auto': {
      title: 'MH Auto',
      calc: mh_auto,
      icon: 'https://i.imgur.com/5DBjkvx.png',
      weapons: ['Dw'],
    },
    'OH Auto': {
      title: 'OH Auto',
      calc: oh_auto,
      icon: 'https://i.imgur.com/5DBjkvx.png',
      weapons: ['Dw'],
    },
    'Piercing Shot': {
      title: 'Piercing Shot',
      calc: piercing_shot,
      icon: 'https://i.imgur.com/RQcz4di.png',
      weapons: ['2h','Dw'],
    },
    'Piercing Shot Bound': {
      title: 'Piercing Shot Bound',
      calc: piercing_shot_bound,
      icon: 'https://i.imgur.com/RQcz4di.png',
      weapons: ['2h','Dw'],
    },
    'Binding Shot': {
      title: 'Binding Shot',
      calc: binding_shot,
      icon: 'https://i.imgur.com/qhi2QbG.png',
      weapons: ['2h','Dw'],
    },
    'Ricochet': {
      title: 'Ricochet',
      calc: ricochet,
      icon: 'https://i.imgur.com/GBNFUd1.png',
      weapons: ['2h','Dw'],
    },
    'Greater Ricochet': {
      title: 'Greater Ricochet',
      calc: greater_ricochet,
      icon: 'https://i.imgur.com/6qoBebL.png',
      weapons: ['2h','Dw'],
    },
    'Dazing Shot': {
      title: 'Dazing Shot',
      calc: dazing_shot,
      icon: 'https://i.imgur.com/RgGEGKO.png',
      weapons: ['2h'],
    },
    'Greater Dazing Shot': {
      title: 'Greater Dazing Shot',
      calc: greater_dazing_shot,
      icon: 'https://i.imgur.com/gYyw3Xz.png',
      weapons: ['2h'],
    },
    'Needle Strike': {
        title: 'Needle Strike',
        calc: needle_strike,
        icon: 'https://i.imgur.com/guilxE7.png',
        weapons: ['Dw'],
    },
    'Snipe': {
        title: 'Snipe',
        calc: snipe,
        icon: 'https://i.imgur.com/oEOkyfc.png',
        weapons: ['2h','Dw'],
    },
    'Corruption Shot': {
        title: 'Corruption Shot',
        calc: corruption_shot,
        icon: 'https://i.imgur.com/YRLh5SZ.png',
        weapons: ['2h','Dw'],
    },
    'Frag Shot': {
        title: 'Frag Shot',
        calc: frag_shot,
        icon: 'https://i.imgur.com/n2Yyfn1.png',
        weapons: ['2h','Dw'],
    },
    'Tight Bindings': {
        title: 'Tight Bindings',
        calc: tight_bindings,
        icon: 'https://i.imgur.com/RYTQR0N.png',
        weapons: ['2h','Dw'],
    },
    'Bombardment': {
        title: 'Bombardment',
        calc: bombardment,
        icon: 'https://i.imgur.com/g43XJu2.png',
        weapons: ['2h','Dw'],
    },
    'Shadow Tendrils': {
        title: 'Shadow Tendrils',
        calc: shadow_tendrils,
        icon: 'https://i.imgur.com/9paKJqu.png',
        weapons: ['2h','Dw'],
    },
    'Rapid Fire': {
        title: 'Rapid Fire',
        calc: rapid_fire,
        icon: 'https://i.imgur.com/WaMRqiu.png',
        weapons: ['2h','Dw'],
    },
    'Snapshot': {
        title: 'Snapshot',
        calc: snapshot,
        icon: 'https://i.imgur.com/JfOGsKN.png',
        weapons: ['2h','Dw'],
    },
    'Salt The Wound': {
        title: 'Salt The Wound',
        calc: salt_the_wound,
        icon: 'https://i.imgur.com/m8D8OvV.png',
        weapons: ['2h','Dw'],
    },
    'DarkBow Spec': {
        title: 'DarkBow Spec',
        calc: darkbow_spec,
        icon: 'https://i.imgur.com/hf8jyil.png',
        weapons: ['2h','Dw'],
    },
    'Magic Shortbow Spec': {
        title: 'Magic Shortbow Spec',
        calc: magic_shortbow_spec,
        icon: 'https://i.imgur.com/LJv6ZJN.png',
        weapons: ['2h','Dw'],
    },
    'SGB Spec': {
        title: 'SGB Spec',
        calc: sgb_spec,
        icon: 'https://i.imgur.com/p3HLoiR.png',
        weapons: ['2h','Dw'],
    },
    'Bolg Spec': {
        title: 'Bolg Spec',
        calc: bolg_spec,
        icon: 'https://i.imgur.com/uxWeQKw.png',
        weapons: ['2h'],
    },
    'Deadshot': {
        title: 'Deadshot',
        calc: deadshot,
        icon: 'https://i.imgur.com/aDDqKRc.png',
        weapons: ['2h','Dw'],
    },
    'Unload': {
        title: 'Unload',
        calc: unload,
        icon: 'https://i.imgur.com/BJ2lemz.png',
        weapons: ['2h','Dw'],
    },
    'Incendiary Shot': {
        title: 'Incendiary Shot',
        calc: incendiary_shot,
        icon: 'https://i.imgur.com/kd6X1cs.png',
        weapons: ['2h'],
    },
    'Sacrifice': {
        title: 'Sacrifice',
        calc: sacrifice,
        icon: 'icon_url_Sacrifice',
        weapons: ['2h','Dw'],
    },
    'Tuska\'s Wrath': {
      title: 'Tuska\'s Wrath',
      calc: tuska_wrath,
      icon: 'icon_url_Tuskas_Wrath',
      weapons: ['2h','Dw'],
    },
    'Bash': {
      title: 'Bash',
      calc: bash,
      icon: 'icon_url_Bash',
      weapons: ['Ms'],
    },
  };

export {abilities}