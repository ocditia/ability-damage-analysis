const { Perks } = require('../types/types');
const necroAutoCalc = require("../necromancy/abils/necro_auto");
const { performance } = require("perf_hooks");

// TODO: Use type class instead
const settings = {
  level: 120,
  boostedLvls: 21,
  prayer: 0.12,
  AD: 1756,

  mh: {
    name: "Wand of the praesul",
    perks: [
      [Perks.PRECISE, 6],
      [Perks.AFTERSHOCK, 1],
    ],
  },

  oh: {
    name: "Seismic singularity",
    perks: [
      [Perks.EQUILIBRIUM, 2],
      [Perks.AFTERSHOCK, 4],
    ],
  },

  top: {
    name: "Elite tectonic",
    perks: [[Perks.BITING, 4]],
  },

  bottom: {
    name: "Elite tectonic",
    perks: [[Perks.BITING, 4]],
  },

  boots: "Enhanced blast diffusion",

  gloves: "Enhanced Kerapac",

  ring: "Channelers",

  aura: {
    name: "Maniacal",
    boost: 0.1,
  },

  bonus: 0,

  biting: 0.088,
  grimoire: 1,
  reavers: 0,
  cap: 10000,
  critCap: 15000,

  salve: false,
  scrimshaw: false,
  precise: 0,
  equilibrium: 0,
  ruthless: 0,
  flanking: 0,
  lunging: 0,

  nope: 0,
  vuln: 1,
  sc: 1,
  fsoa: true,
  kalg: 1,
  kalgSpec: 1,
  ful: 0,
  zerkEss: 0,
  reaperCrew: 1,
  gconc: 0,
  enchMeta: true,
  enchAff: true,
  enchFlame: true,
  hexHunter: 1,
  ripperPassive: 0,
  dharok: 0,
  exsang: 0,
  rubyAurora: 0,
  slayerSigil: 0,
  cryptbloom: 0,
  slayerPerk: 0,
  kww: 0,
  revenge: 0,
  flowStacks: 1,
};

const test = necroAutoCalc("Two-hand", settings);

console.log(test);

const startTime = performance.now();
for (let i = 0; i < 100000; i++) {
  necroAutoCalc("Two-hand", settings);
}

const endTime = performance.now();

console.log("calcing necro auto 100,000 times took");
console.log(endTime - startTime);
console.log("miliseconds");
