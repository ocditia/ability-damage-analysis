const asphyx = require("../magic/abils/asphyx");
const chain = require("../magic/abils/chain");
const combust = require("../magic/abils/combust");
const conc = require("../magic/abils/conc");
const conc3Hit = require("../magic/abils/conc3Hit");
const corrupt_blast = require("../magic/abils/corrupt_blast");
const deep_impact = require("../magic/abils/deep_impact");
const detonate = require("../magic/abils/detonate");
const dragon_breath = require("../magic/abils/dragon_breath");
const frost_surge = require("../magic/abils/frost_surge");
const gconc = require("../magic/abils/gconc");
const gsonic = require("../magic/abils/gsonic");
const gstaff = require("../magic/abils/gstaff");
const igneous_omni = require("../magic/abils/igneous_omni");
const impact = require("../magic/abils/impact");
const magma = require("../magic/abils/magma");
const mh_auto = require("../magic/abils/mh_auto");
const nami = require("../magic/abils/nami");
const oh_auto = require("../magic/abils/oh_auto");
const omni = require("../magic/abils/omni");
const smoke_tend = require("../magic/abils/smoke_tend");
const sonic = require("../magic/abils/sonic");
const th_auto = require("../magic/abils/th_auto");
const timestrike = require("../magic/abils/timestrike");
const tuska = require("../magic/abils/tuska");
const wild = require("../magic/abils/wild");
const wrack_bound = require("../magic/abils/wrack_bound");
const wrack_ruin_bound = require("../magic/abils/wrack_ruin_bound");
const wrack_ruin = require("../magic/abils/wrack_ruin");
const wrack = require("../magic/abils/wrack");
const { performance } = require("perf_hooks");

const settings = {
  level: 120,
  boostedLvls: 21,
  prayer: 0.12,
  AD: 1756,

  mh: {
    name: "Wand of the praesul",
    tier: 92,
  },

  oh: {
    name: "Seismic singularity",
    tier: 92,
  },

  th: {
    name: "Inquisitor staff",
    tier: 80,
  },

  sh: {
    name: "Kalphite rebounder",
    tier: 90,
    type: "defender",
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

const test = wrack("Two-hand", settings);

console.log(test);

const startTime = performance.now();
for (let i = 0; i < 100; i++) {
  const test1 = wrack("Two-hand", settings);
}
const endTime = performance.now();

console.log("calcing 4 hit asphyx with instability 10,000 times took");
console.log(endTime - startTime);
console.log("miliseconds");
