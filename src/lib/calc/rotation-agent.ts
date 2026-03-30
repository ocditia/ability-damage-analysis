/**
 * Rotation Agent — finds optimal ability rotations via search and learning.
 */

import { abils, ABILITIES } from '$lib/data/abilities';
import { ARMOUR } from '$lib/data/armour';
import { calculateRotationDamageCore, suggestNextAbility, resolveTumekensAsphyxiate } from './rotation_builder/rotation-damage-calculator';
import { SETTINGS } from './settings_rb';
import type { RotationInput } from './types';
import { COOLDOWN_PREFIX } from './rotation_builder/damage_calc_new';

// ─── State & Actions ────────────────────────────────────────

/**
 * Extract a normalised state vector for the Q-network.
 * All values scaled to roughly 0-1 range.
 * Currently focused on magic combat style.
 */
function extractStateVector(settings: Record<string, any>, timers: Record<string, number>, tick: number, barSize: number): number[] {
    const adrenaline = (settings[SETTINGS.ADRENALINE] ?? 0) / 100;
    const tickProgress = tick / barSize;

    // Buff states (0 or 1, or normalised timer)
    const sunshineActive = settings[SETTINGS.SUNSHINE] === true ? 1 : 0;
    const instabilityActive = settings[SETTINGS.INSTABILITY] === true ? 1 : 0;
    const flowBuffActive = settings[SETTINGS.GREATER_FLOW] === true ? 1 : 0;

    // Stack counts (normalised)
    const bloodTithe = (settings[SETTINGS.BLOOD_TITHE] ?? 0) / 12;
    const glacialEmbrace = (settings[SETTINGS.GLACIAL_EMBRACE] ?? 0) / 5;

    // Key cooldowns (normalised: 0 = ready, 1 = max cooldown)
    const getCd = (key: string) => Math.min(1, (timers[COOLDOWN_PREFIX + key] ?? 0) / 30);
    const wildMagicCd = getCd('wild magic');
    const asphyxiateCd = getCd('asphyxiate');
    const smokeTendrilsCd = getCd('smoke tendrils');
    const omniCd = getCd('omnipower');
    const sunshineAbilCd = getCd('greater sunshine');
    const soulfireAbilCd = getCd('soulfire');
    const instabilityAbilCd = getCd('instability');

    return [
        adrenaline,
        tickProgress,
        sunshineActive,
        instabilityActive,
        flowBuffActive,
        bloodTithe,
        glacialEmbrace,
        wildMagicCd,
        asphyxiateCd,
        smokeTendrilsCd,
        omniCd,
        sunshineAbilCd,
        soulfireAbilCd,
        instabilityAbilCd
    ];
}

const STATE_DIM = 11;

const EXCLUDED_CLASSIFICATIONS = new Set([
    'self cast', 'conjure', 'perk', 'proc'
]);

const EXCLUDED_ABILITIES = new Set([
    'chain', 'sonic wave', 'rune flame', 'from the shadows',
    'flames of zamorak', 'saradomin strike', 'devour', 'reap', 'sunshine', 'concentrated blast'
]);

/**
 * Returns the adrenaline cost reduction from the best active Flow buff.
 * Does not consume the buff — only peeks for filtering purposes.
 */
function getFlowReduction(settings: Record<string, any>): number {
    const flowBuffs: Array<{ key: string; reduction: number }> = [
        { key: SETTINGS.GREATER_FLOW_AC, reduction: 45 },
        { key: SETTINGS.FLOW_AC, reduction: 35 },
        { key: SETTINGS.GREATER_FLOW, reduction: 20 },
        { key: SETTINGS.FLOW, reduction: 10 },
    ];
    for (const buff of flowBuffs) {
        if (settings[buff.key]) return buff.reduction;
    }
    return 0;
}

/** Get valid abilities for a given combat style at this tick */
function getValidAbilities(
    settings: Record<string, any>,
    timers: Record<string, number>,
    style: string
): string[] {
    const valid: string[] = [];
    const adrenaline = settings[SETTINGS.ADRENALINE] ?? 0;
    const isMagicStyle = style === 'magic';
    const flowReduction = isMagicStyle ? getFlowReduction(settings) : 0;

    for (const [key, abil] of Object.entries(abils)) {
        if (!abil.title) continue;
        if (abil.mainStyle !== style) continue;
        if (EXCLUDED_CLASSIFICATIONS.has(abil.abilityClassification)) continue;
        if (EXCLUDED_ABILITIES.has(key)) continue;

        const cdKey = COOLDOWN_PREFIX + key;
        if (timers[cdKey] && timers[cdKey] > 0) continue;

        const abilType = abil.abilityType;

        if (abilType === 'threshold') {
            let cost = abil.adrenaline || 50;
            if (isMagicStyle && flowReduction > 0) cost = Math.max(0, Math.floor(cost - flowReduction));
            if (adrenaline < cost) continue;
        } else if (abilType === 'ultimate') {
            let cost = abil.adrenaline ?? 100;
            // Glacial Embrace: each stack reduces Tsunami cost by 12%
            if (key === ABILITIES.TSUNAMI && (settings[SETTINGS.GLACIAL_EMBRACE] ?? 0) > 0) {
                cost = Math.floor(cost * (1 - 0.12 * settings[SETTINGS.GLACIAL_EMBRACE]));
            }
            // Vigour & Conservation of Energy are post-activation refunds, not cost reductions
            if (isMagicStyle && flowReduction > 0) cost = Math.max(0, Math.floor(cost - flowReduction));
            if (adrenaline < cost) continue;
        } else if (abilType === 'special attack') {
            if (adrenaline < (abil.adrenaline ?? 0)) continue;
        }

        valid.push(key);
    }

    return valid;
}

// ─── Episode Runner ─────────────────────────────────────────

export interface AgentResult {
    rotation: (string | null)[];
    damage: number;
    ticks: number;
}

type SelectFn = (valid: string[], tick: number, settings: Record<string, any>, timers: Record<string, number>, state?: any) => string | null;

function runEpisode(
    settings: Record<string, any>,
    barSize: number,
    style: string,
    selectAbility: SelectFn
): AgentResult {
    const rotation: RotationInput = {
        abilityBar: Array(barSize).fill(null),
        extraActionBar: Array(barSize).fill(null),
        nulledTicks: Array(barSize).fill(false),
        stalledAbilities: Array(barSize).fill(null),
    };

    let nextAvailableTick = 0;

    const onTick = (tick: number, tickSettings: any, timers: Record<string, number>, rot?: RotationInput, tickState?: any) => {
        if (!rot || tick < nextAvailableTick) return;

        const valid = getValidAbilities(tickSettings, timers, style);
        if (valid.length === 0) return;

        const choice = selectAbility(valid, tick, tickSettings, timers, tickState);
        if (choice) {
            rot.abilityBar[tick] = choice;
            const resolved = resolveTumekensAsphyxiate(choice, tickSettings);
            const duration = typeof abils[resolved]?.duration === 'number' ? abils[resolved].duration : 3;
            nextAvailableTick = tick + duration;
        }
    };

    // JSON round-trip strips Svelte proxies
    const cleanSettings = JSON.parse(JSON.stringify(settings));
    const result = calculateRotationDamageCore(cleanSettings, rotation, barSize, onTick);

    return {
        rotation: rotation.abilityBar,
        damage: result.regularDamage,
        ticks: barSize,
    };
}

// ─── Random Agent ───────────────────────────────────────────

function randomSelect(valid: string[], tick: number): string | null {
    return valid[Math.floor(Math.random() * valid.length)] ?? null;
}

export function findBestRotation(
    settings: Record<string, any>,
    barSize: number,
    style: string,
    episodes: number = 1000
): AgentResult {
    let best: AgentResult = { rotation: [], damage: 0, ticks: barSize };

    for (let i = 0; i < episodes; i++) {
        const result = runEpisode({ ...settings }, barSize, style, randomSelect);
        if (result.damage > best.damage) {
            best = result;
        }
    }

    return best;
}

// ─── Greedy Agent ───────────────────────────────────────────

/**
 * Greedy: at each tick, use suggestNextAbility to simulate each valid ability
 * and pick the one that produces the most damage. Essentially greedy autocomplete.
 */
function greedySelect(valid: string[], tick: number, settings: Record<string, any>, timers: Record<string, number>, state?: any): string | null {
    if (valid.length === 0) return null;
    if (valid.length === 1) return valid[0];
    if (!state) return valid[0];

    // Use the real suggestion engine
    const suggestions = suggestNextAbility(state, settings, valid, 20);
    if (suggestions.length > 0) {
        return suggestions[0].key;
    }

    return valid[0];
}

export function findGreedyRotation(
    settings: Record<string, any>,
    barSize: number,
    style: string
): AgentResult {
    return runEpisode({ ...settings }, barSize, style, greedySelect);
}

// ─── Expert Agent (Magic) ───────────────────────────────────

/**
 * Rule-based expert for magic rotations.
 * Encodes human knowledge about optimal magic rotation priorities:
 *
 * 1. Build to 100% adrenaline (use basics, Greater Sonic Blast for cost reduction)
 * 2. Cast Sunshine + Instability when ready
 * 3. During sunshine: prioritise crit abilities (GConc, Smoke Tendrils, Tempest, Omni)
 * 4. Always use Soulfire when available (it's too strong to delay)
 * 5. Use Tsunami when available (lower priority than sunshine)
 */
function expertMagicSelect(valid: string[], tick: number, settings: Record<string, any>, timers: Record<string, number>, state?: any): string | null {
    if (valid.length === 0) return null;

    const adrenaline = settings[SETTINGS.ADRENALINE] ?? 0;
    const sunshineActive = settings[SETTINGS.SUNSHINE] === true;
    const instabilityActive = settings[SETTINGS.INSTABILITY] === true;
    const tsunamiBuffActive = timers['tsunami'] > 0;
    const isDW = settings[SETTINGS.WEAPON] === SETTINGS.WEAPON_VALUES?.DW;

    const has = (key: string) => valid.includes(key);

    // Soulfire is always top priority — too strong to delay
    if (has('soulfire')) return 'soulfire';

    // Combust is very powerful with buffs (conflagrate, kww, lunging, roar+ode DW)
    if (has('combust')) {
        const hasConflagrate = settings[SETTINGS.CONFLAGRATE] === true;
        const hasKWW = settings[SETTINGS.GLOVES] === ARMOUR.KERAPACS_WRISTWRAPS_E;
        const hasLunging = (settings[SETTINGS.LUNGING] ?? 0) > 0;
        if (hasConflagrate || hasKWW || hasLunging) {
            // Prioritise combust when buffed, even over other actions
            if (sunshineActive) return 'combust';
        }
    }

    // If we have 100% adrenaline, cast sunshine first, then instability
    if (adrenaline >= 100 && has('greater sunshine')) return 'greater sunshine';
    if (adrenaline >= 100 && has('sunshine')) return 'sunshine';

    // Instability: use right after sunshine, or when sunshine is already active
    if (sunshineActive && has('instability')) return 'instability';

    // If sunshine is active, prioritise crit-heavy damage abilities
    if (sunshineActive) {

        // Top priority: crit-synergy thresholds during sunshine
        if (has('smoke tendrils')) return 'smoke tendrils';
        if (has('tempest of armadyl')) return 'tempest of armadyl';
        if (has('omnipower')) return 'omnipower';
        if (has('wild magic')) return 'wild magic';
        if (has('asphyxiate')) return 'asphyxiate';

        // Tsunami during sunshine is good
        if (has('tsunami')) return 'tsunami';

        // GConc as filler during sunshine (builds crit stacks)
        if (has('greater concentrated blast')) return 'greater concentrated blast';
        if (has('concentrated blast')) return 'concentrated blast';

        // Combust (always decent, even without special buffs)
        if (has('combust')) return 'combust';

        // Other basics as filler
        if (has('dragon breath')) return 'dragon breath';
        if (has('corruption blast')) return 'corruption blast';
    }

    // Tsunami buff active — use Iban Blast to spend excess adrenaline
    if (tsunamiBuffActive && adrenaline > 50 && has('iban blast')) return 'iban blast';

    // Not in sunshine — build adrenaline
    // Greater Sonic Wave reduces sunshine adrenaline cost
    if (adrenaline < 100 && has('greater sonic wave')) return 'greater sonic wave';

    // Use instability if available (even outside sunshine it's useful)
    if (has('instability')) return 'instability';

    // Build with strong basics
    if (has('greater concentrated blast')) return 'greater concentrated blast';
    if (has('concentrated blast')) return 'concentrated blast';
    if (has('dragon breath')) return 'dragon breath';
    if (has('combust')) return 'combust';
    if (has('corruption blast')) return 'corruption blast';

    // Use thresholds outside sunshine if high adrenaline and sunshine not coming soon
    if (adrenaline >= 50) {
        const sunshineCd = timers[COOLDOWN_PREFIX + 'sunshine'] ?? timers[COOLDOWN_PREFIX + 'greater sunshine'] ?? 0;
        // Only use thresholds outside sunshine if sunshine has >20 ticks cooldown remaining
        if (sunshineCd > 20) {
            if (has('smoke tendrils')) return 'smoke tendrils';
            if (has('wild magic')) return 'wild magic';
            if (has('asphyxiate')) return 'asphyxiate';
        }
    }

    // Tsunami for adrenaline generation
    if (has('tsunami')) return 'tsunami';

    // Weak fillers
    if (has('impact')) return 'impact';
    if (has('shock')) return 'shock';

    return valid[0];
}

export function findExpertRotation(
    settings: Record<string, any>,
    barSize: number,
    style: string
): AgentResult {
    if (style === 'magic') {
        return runEpisode({ ...settings }, barSize, style, expertMagicSelect);
    }
    // Fall back to greedy for other styles
    return runEpisode({ ...settings }, barSize, style, greedySelect);
}

// ─── Neural Q-Network ───────────────────────────────────────

/** Simple 2-layer neural net for Q-value approximation, implemented in plain JS */
class QNetwork {
    // Architecture: input(STATE_DIM) → hidden1(H1) → ReLU → hidden2(H2) → ReLU → output(numActions)
    private w1: number[][]; // STATE_DIM × H1
    private b1: number[];   // H1
    private w2: number[][]; // H1 × H2
    private b2: number[];   // H2
    private w3: number[][]; // H2 × numActions
    private b3: number[];   // numActions
    private actionIndex: Map<string, number> = new Map();
    private actionKeys: string[] = [];
    private h1Size: number;
    private h2Size: number;

    constructor(numActions: number, h1: number = 32, h2: number = 16) {
        this.h1Size = h1;
        this.h2Size = h2;
        const he1 = Math.sqrt(2 / STATE_DIM);
        const he2 = Math.sqrt(2 / h1);
        const he3 = Math.sqrt(2 / h2);
        this.w1 = Array.from({ length: STATE_DIM }, () => Array.from({ length: h1 }, () => (Math.random() - 0.5) * 2 * he1));
        this.b1 = Array(h1).fill(0);
        this.w2 = Array.from({ length: h1 }, () => Array.from({ length: h2 }, () => (Math.random() - 0.5) * 2 * he2));
        this.b2 = Array(h2).fill(0);
        this.w3 = Array.from({ length: h2 }, () => Array(numActions).fill(0).map(() => (Math.random() - 0.5) * 2 * he3));
        this.b3 = Array(numActions).fill(0.1); // Small positive so initial Q-values aren't negative
    }

    setActions(actions: string[]): void {
        this.actionKeys = actions;
        this.actionIndex.clear();
        actions.forEach((a, i) => this.actionIndex.set(a, i));
    }

    private forward(state: number[]): { h1: number[]; h2: number[]; output: number[] } {
        // Layer 1
        const h1 = this.b1.map((b, j) => {
            let sum = b;
            for (let i = 0; i < STATE_DIM; i++) sum += state[i] * this.w1[i][j];
            return Math.max(0, sum); // ReLU
        });
        // Layer 2
        const h2 = this.b2.map((b, j) => {
            let sum = b;
            for (let i = 0; i < this.h1Size; i++) sum += h1[i] * this.w2[i][j];
            return Math.max(0, sum); // ReLU
        });
        // Output layer (no activation — raw Q-values)
        const numActions = this.b3.length;
        const output = this.b3.map((b, j) => {
            let sum = b;
            for (let i = 0; i < this.h2Size; i++) sum += h2[i] * this.w3[i][j];
            return sum;
        });
        return { h1, h2, output };
    }

    predict(state: number[]): number[] {
        return this.forward(state).output;
    }

    getQ(state: number[], action: string): number {
        const idx = this.actionIndex.get(action);
        if (idx === undefined) return 0;
        return this.predict(state)[idx];
    }

    getBestAction(state: number[], valid: string[]): string {
        const qValues = this.predict(state);
        let bestAction = valid[0];
        let bestQ = -Infinity;
        for (const a of valid) {
            const idx = this.actionIndex.get(a);
            if (idx === undefined) continue;
            if (qValues[idx] > bestQ) {
                bestQ = qValues[idx];
                bestAction = a;
            }
        }
        return bestAction;
    }

    /** Backprop for a single (state, actionIdx, target) sample */
    train(state: number[], actionIdx: number, target: number, lr: number): void {
        const { h1, h2, output } = this.forward(state);
        const predicted = output[actionIdx];
        const error = target - predicted;
        const clippedError = Math.max(-50, Math.min(50, error));

        // Output layer gradient (only for the target action)
        const dOutput = Array(output.length).fill(0);
        dOutput[actionIdx] = clippedError;

        // Compute ALL gradients BEFORE updating any weights

        // Gradient for h2 (through w3, before w3 is modified)
        const dH2 = Array(this.h2Size).fill(0);
        for (let i = 0; i < this.h2Size; i++) {
            for (let j = 0; j < output.length; j++) {
                dH2[i] += dOutput[j] * this.w3[i][j];
            }
            dH2[i] *= h2[i] > 0 ? 1 : 0; // ReLU derivative
        }

        // Gradient for h1 (through w2, before w2 is modified)
        const dH1 = Array(this.h1Size).fill(0);
        for (let i = 0; i < this.h1Size; i++) {
            for (let j = 0; j < this.h2Size; j++) {
                dH1[i] += dH2[j] * this.w2[i][j];
            }
            dH1[i] *= h1[i] > 0 ? 1 : 0; // ReLU derivative
        }

        // Now apply all weight updates
        // Layer 3 (output)
        for (let i = 0; i < this.h2Size; i++) {
            for (let j = 0; j < output.length; j++) {
                this.w3[i][j] += lr * dOutput[j] * h2[i];
            }
        }
        for (let j = 0; j < output.length; j++) {
            this.b3[j] += lr * dOutput[j];
        }

        // Layer 2
        for (let i = 0; i < this.h1Size; i++) {
            for (let j = 0; j < this.h2Size; j++) {
                this.w2[i][j] += lr * dH2[j] * h1[i];
            }
        }
        for (let j = 0; j < this.h2Size; j++) {
            this.b2[j] += lr * dH2[j];
        }

        // Layer 1 (input)
        for (let i = 0; i < STATE_DIM; i++) {
            for (let j = 0; j < this.h1Size; j++) {
                this.w1[i][j] += lr * dH1[j] * state[i];
            }
        }
        for (let j = 0; j < this.h1Size; j++) {
            this.b1[j] += lr * dH1[j];
        }
    }
}

// ─── Replay Buffer ──────────────────────────────────────────

interface Transition {
    state: number[];
    actionIdx: number;
    reward: number;
    nextState: number[];
    nextValidIndices: number[];
    terminal: boolean;
}

class ReplayBuffer {
    private buffer: Transition[];
    private maxSize: number;
    private writePos: number = 0;
    private count: number = 0;

    constructor(maxSize: number = 10000) {
        this.maxSize = maxSize;
        this.buffer = [];
    }

    add(transition: Transition): void {
        if (this.count < this.maxSize) {
            this.buffer.push(transition);
            this.count++;
        } else {
            this.buffer[this.writePos % this.maxSize] = transition;
        }
        this.writePos++;
    }

    sample(batchSize: number): Transition[] {
        const n = Math.min(batchSize, this.count);
        // Fisher-Yates partial shuffle on indices
        const indices = Array.from({ length: this.count }, (_, i) => i);
        for (let i = 0; i < n; i++) {
            const j = i + Math.floor(Math.random() * (this.count - i));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices.slice(0, n).map(i => this.buffer[i]);
    }

    get size(): number {
        return this.count;
    }
}

/**
 * Q-Learning agent with neural network function approximation.
 * Two-layer MLP predicts Q-values for all abilities given the state.
 * Uses experience replay for stable TD-learning.
 */
export class QAgent {
    private net: QNetwork;
    private learningRate: number;
    private discountFactor: number;
    private epsilon: number;
    private epsilonDecay: number;
    private minEpsilon: number;
    private trainedEpisodes: number = 0;
    private actions: string[] = [];
    private actionIndex: Map<string, number> = new Map();
    private replayBuffer: ReplayBuffer;
    private batchSize: number;
    private minBufferSize: number;

    constructor(
        learningRate = 0.0005,
        discountFactor = 0.95,
        epsilon = 1.0,
        epsilonDecay = 0.999,
        minEpsilon = 0.05,
        bufferSize = 10000,
        batchSize = 32,
        minBufferSize = 64
    ) {
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.epsilon = epsilon;
        this.epsilonDecay = epsilonDecay;
        this.minEpsilon = minEpsilon;
        this.replayBuffer = new ReplayBuffer(bufferSize);
        this.batchSize = batchSize;
        this.minBufferSize = minBufferSize;
        // Will be initialised in seedKnowledge or first train call
        this.net = new QNetwork(1);
    }

    /** Initialise network with actions filtered to the target style */
    seedKnowledge(style: string = 'magic'): void {
        const excludedClassifications = new Set([
            'self cast', 'conjure', 'perk', 'proc'
        ]);
        const excludedAbilities = new Set([
            'chain', 'sonic wave', 'rune flame', 'from the shadows',
            'flames of zamorak', 'saradomin strike', 'devour', 'reap',
        ]);
        this.actions = Object.entries(abils)
            .filter(([k, a]) =>
                a.title &&
                a.mainStyle === style &&
                !excludedClassifications.has(a.abilityClassification) &&
                !excludedAbilities.has(k)
            )
            .map(([k]) => k);

        this.actionIndex.clear();
        this.actions.forEach((a, i) => this.actionIndex.set(a, i));
        this.net = new QNetwork(this.actions.length, 64, 32);
        this.net.setActions(this.actions);
    }

    /**
     * Collect expert demonstrations as (state, action) pairs,
     * and optionally populate the replay buffer with expert transitions.
     */
    private collectExpertDemos(
        settings: Record<string, any>,
        barSize: number,
        style: string,
        numDemos: number
    ): { state: number[]; action: string }[] {
        const demos: { state: number[]; action: string }[] = [];

        for (let d = 0; d < numDemos; d++) {
            const trajectory: {
                state: number[];
                action: string;
                dmgBefore: number;
                validIndices: number[];
            }[] = [];

            const expertSelect: SelectFn = (valid, tick, tickSettings, timers, tickState) => {
                if (valid.length === 0) return null;
                const state = extractStateVector(tickSettings, timers, tick, barSize);
                const dmgBefore = tickState?.dmgs?.reduce((a: number, b: number) => a + b, 0) ?? 0;
                const validIndices = valid
                    .map(a => this.actionIndex.get(a))
                    .filter((idx): idx is number => idx !== undefined);
                const action = expertMagicSelect(valid, tick, tickSettings, timers, tickState);
                if (action) {
                    demos.push({ state, action });
                    trajectory.push({ state, action, dmgBefore, validIndices });
                }
                return action;
            };
            const result = runEpisode({ ...settings }, barSize, style, expertSelect);

            // Populate replay buffer with expert transitions
            const n = trajectory.length;
            if (n > 0) {
                const rewardNorm = Math.max(result.damage / Math.max(n, 1), 1);
                for (let i = 0; i < n; i++) {
                    const isTerminal = i === n - 1;
                    const dmgAfter = isTerminal ? result.damage : trajectory[i + 1].dmgBefore;
                    const actionIdx = this.actionIndex.get(trajectory[i].action);
                    if (actionIdx === undefined) continue;

                    this.replayBuffer.add({
                        state: trajectory[i].state,
                        actionIdx,
                        reward: (dmgAfter - trajectory[i].dmgBefore) / rewardNorm,
                        nextState: isTerminal ? trajectory[i].state : trajectory[i + 1].state,
                        nextValidIndices: isTerminal ? [] : trajectory[i + 1].validIndices,
                        terminal: isTerminal,
                    });
                }
            }
        }
        return demos;
    }

    /**
     * Train via behaviour cloning: learn to imitate the expert.
     * For each demo (state, action), train the net to output high value for that action
     * and low value for others. Simple supervised learning.
     */
    pretrainFromExpert(
        settings: Record<string, any>,
        barSize: number,
        style: string,
        numDemos: number = 20,
        pretrainEpochs: number = 10
    ): void {
        const demos = this.collectExpertDemos(settings, barSize, style, numDemos);
        if (demos.length === 0) return;

        for (let epoch = 0; epoch < pretrainEpochs; epoch++) {
            // Shuffle
            for (let i = demos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [demos[i], demos[j]] = [demos[j], demos[i]];
            }

            for (const demo of demos) {
                const actionIdx = this.actionIndex.get(demo.action);
                if (actionIdx === undefined) continue;

                // Train: expert's action should have Q = 1, others should have Q = 0
                // Only update the expert's action to avoid interfering with other action weights
                this.net.train(demo.state, actionIdx, 1.0, this.learningRate * 5);
            }
        }
    }

    /**
     * Train over multiple episodes using experience replay + TD-learning.
     * Collects (s, a, r, s', validActions') transitions into a replay buffer,
     * then samples mini-batches for decorrelated Q-value updates.
     */
    train(
        settings: Record<string, any>,
        barSize: number,
        style: string,
        episodes: number,
        onProgress?: (episode: number, bestDamage: number) => void
    ): AgentResult {
        let bestResult: AgentResult = { rotation: [], damage: 0, ticks: barSize };

        for (let ep = 0; ep < episodes; ep++) {
            const trajectory: {
                state: number[];
                action: string;
                dmgBefore: number;
                validIndices: number[];
            }[] = [];

            const select: SelectFn = (valid, tick, tickSettings, timers, tickState) => {
                if (valid.length === 0) return null;

                const state = extractStateVector(tickSettings, timers, tick, barSize);
                const dmgBefore = tickState?.dmgs?.reduce((a: number, b: number) => a + b, 0) ?? 0;
                const validIndices = valid
                    .map(a => this.actionIndex.get(a))
                    .filter((idx): idx is number => idx !== undefined);

                // Epsilon-greedy with valid action masking
                let action: string;
                if (Math.random() < this.epsilon) {
                    action = valid[Math.floor(Math.random() * valid.length)];
                } else {
                    action = this.net.getBestAction(state, valid);
                }

                trajectory.push({ state, action, dmgBefore, validIndices });
                return action;
            };

            const result = runEpisode({ ...settings }, barSize, style, select);
            const totalDamage = result.damage;
            const n = trajectory.length;

            // Build transitions and add to replay buffer
            if (n > 0) {
                const rewardNorm = Math.max(totalDamage / Math.max(n, 1), 1);

                for (let i = 0; i < n; i++) {
                    const isTerminal = i === n - 1;
                    const dmgAfter = isTerminal ? totalDamage : trajectory[i + 1].dmgBefore;
                    const reward = (dmgAfter - trajectory[i].dmgBefore) / rewardNorm;
                    const actionIdx = this.actionIndex.get(trajectory[i].action);
                    if (actionIdx === undefined) continue;

                    this.replayBuffer.add({
                        state: trajectory[i].state,
                        actionIdx,
                        reward,
                        nextState: isTerminal ? trajectory[i].state : trajectory[i + 1].state,
                        nextValidIndices: isTerminal ? [] : trajectory[i + 1].validIndices,
                        terminal: isTerminal,
                    });
                }

                // Sample mini-batch and do TD updates
                if (this.replayBuffer.size >= this.minBufferSize) {
                    const batch = this.replayBuffer.sample(this.batchSize);
                    for (const t of batch) {
                        let tdTarget: number;
                        if (t.terminal || t.nextValidIndices.length === 0) {
                            tdTarget = t.reward;
                        } else {
                            // TD target: r + γ * max Q(s', a') over valid actions
                            const nextQ = this.net.predict(t.nextState);
                            let maxNextQ = -Infinity;
                            for (const idx of t.nextValidIndices) {
                                if (nextQ[idx] > maxNextQ) maxNextQ = nextQ[idx];
                            }
                            tdTarget = t.reward + this.discountFactor * maxNextQ;
                        }
                        this.net.train(t.state, t.actionIdx, tdTarget, this.learningRate);
                    }
                }
            }

            this.epsilon = Math.max(this.minEpsilon, this.epsilon * this.epsilonDecay);
            this.trainedEpisodes++;

            if (result.damage > bestResult.damage) {
                bestResult = result;
            }

            if (onProgress && ep % 50 === 0) {
                onProgress(ep, bestResult.damage);
            }
        }

        return bestResult;
    }

    /** Run using learned policy (no exploration) */
    exploit(
        settings: Record<string, any>,
        barSize: number,
        style: string
    ): AgentResult {
        const select: SelectFn = (valid, tick, tickSettings, timers) => {
            if (valid.length === 0) return null;
            const state = extractStateVector(tickSettings, timers, tick, barSize);
            return this.net.getBestAction(state, valid);
        };

        return runEpisode({ ...settings }, barSize, style, select);
    }

    /** Stats */
    getStats(): { actions: number; episodes: number; epsilon: number; bufferSize: number } {
        return {
            actions: this.actions.length,
            episodes: this.trainedEpisodes,
            epsilon: Math.round(this.epsilon * 1000) / 1000,
            bufferSize: this.replayBuffer.size,
        };
    }
}

// ─── PPO Agent ──────────────────────────────────────────────

/**
 * Softmax over an array, returning probabilities.
 * Only considers indices in `validIndices` — others get probability 0.
 */
function maskedSoftmax(logits: number[], validIndices: number[]): number[] {
    const probs = Array(logits.length).fill(0);
    if (validIndices.length === 0) return probs;

    // Find max for numerical stability
    let maxLogit = -Infinity;
    for (const i of validIndices) maxLogit = Math.max(maxLogit, logits[i]);

    let sumExp = 0;
    for (const i of validIndices) {
        const e = Math.exp(logits[i] - maxLogit);
        probs[i] = e;
        sumExp += e;
    }
    for (const i of validIndices) probs[i] /= sumExp;
    return probs;
}

/** Sample from a probability distribution, returning the index */
function sampleFromProbs(probs: number[]): number {
    const r = Math.random();
    let cumulative = 0;
    for (let i = 0; i < probs.length; i++) {
        cumulative += probs[i];
        if (r < cumulative) return i;
    }
    return probs.length - 1;
}

interface PPOTransition {
    state: number[];
    actionIdx: number;
    logProb: number;
    reward: number;
    value: number;
    advantage: number;
    returnVal: number;
}

/**
 * PPO Agent — Proximal Policy Optimisation.
 * Uses separate policy and value networks.
 * Collects trajectories, computes advantages, then does multiple update epochs.
 */
export class PPOAgent {
    private policyNet: QNetwork;    // Outputs action logits
    private valueNet: QNetwork;     // Outputs single value (we use output[0])
    private actions: string[] = [];
    private actionIndex: Map<string, number> = new Map();
    private trainedEpisodes: number = 0;
    private policyLR: number;
    private valueLR: number;
    private gamma: number;          // Discount factor
    private lam: number;            // GAE lambda
    private clipEpsilon: number;    // PPO clip range
    private updateEpochs: number;   // Epochs per batch of trajectories

    constructor(
        policyLR = 0.001,
        valueLR = 0.002,
        gamma = 0.95,
        lam = 0.9,
        clipEpsilon = 0.2,
        updateEpochs = 4
    ) {
        this.policyLR = policyLR;
        this.valueLR = valueLR;
        this.gamma = gamma;
        this.lam = lam;
        this.clipEpsilon = clipEpsilon;
        this.updateEpochs = updateEpochs;
        this.policyNet = new QNetwork(1);
        this.valueNet = new QNetwork(1);
    }

    seedKnowledge(style: string = 'magic'): void {
        this.actions = Object.entries(abils)
            .filter(([k, a]) =>
                a.title &&
                a.mainStyle === style &&
                !EXCLUDED_CLASSIFICATIONS.has(a.abilityClassification) &&
                !EXCLUDED_ABILITIES.has(k)
            )
            .map(([k]) => k);
        this.actionIndex.clear();
        this.actions.forEach((a, i) => this.actionIndex.set(a, i));

        this.policyNet = new QNetwork(this.actions.length, 64, 32);
        this.policyNet.setActions(this.actions);
        this.valueNet = new QNetwork(1, 64, 32); // Single output: state value
    }

    /** Pre-train policy from expert demonstrations */
    pretrainFromExpert(
        settings: Record<string, any>,
        barSize: number,
        style: string,
        numDemos: number = 20,
        epochs: number = 10
    ): void {
        const demos: { state: number[]; action: string }[] = [];
        for (let d = 0; d < numDemos; d++) {
            const expertSelect: SelectFn = (valid, tick, tickSettings, timers, tickState) => {
                if (valid.length === 0) return null;
                const state = extractStateVector(tickSettings, timers, tick, barSize);
                const action = expertMagicSelect(valid, tick, tickSettings, timers, tickState);
                if (action) demos.push({ state, action });
                return action;
            };
            runEpisode({ ...settings }, barSize, style, expertSelect);
        }

        for (let epoch = 0; epoch < epochs; epoch++) {
            for (let i = demos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [demos[i], demos[j]] = [demos[j], demos[i]];
            }
            for (const demo of demos) {
                const actionIdx = this.actionIndex.get(demo.action);
                if (actionIdx === undefined) continue;
                // Train policy to output high logit for expert action
                this.policyNet.train(demo.state, actionIdx, 3.0, this.policyLR * 3);
            }
        }
    }

    /**
     * Collect a batch of trajectories, then do PPO updates.
     */
    train(
        settings: Record<string, any>,
        barSize: number,
        style: string,
        episodes: number,
        onProgress?: (episode: number, bestDamage: number) => void
    ): AgentResult {
        let bestResult: AgentResult = { rotation: [], damage: 0, ticks: barSize };
        const allTransitions: PPOTransition[] = [];

        // Collect trajectories
        for (let ep = 0; ep < episodes; ep++) {
            const epTransitions: { state: number[]; actionIdx: number; logProb: number; value: number; dmgBefore: number }[] = [];

            const select: SelectFn = (valid, tick, tickSettings, timers, tickState) => {
                if (valid.length === 0) return null;
                const state = extractStateVector(tickSettings, timers, tick, barSize);
                const dmgBefore = tickState?.dmgs?.reduce((a: number, b: number) => a + b, 0) ?? 0;

                // Get action probabilities from policy
                const logits = this.policyNet.predict(state);
                const validIndices = valid.map(a => this.actionIndex.get(a)).filter(i => i !== undefined) as number[];
                const probs = maskedSoftmax(logits, validIndices);

                // Sample action
                const actionIdx = sampleFromProbs(probs);
                const logProb = Math.log(Math.max(probs[actionIdx], 1e-8));

                // Get state value
                const value = this.valueNet.predict(state)[0];

                epTransitions.push({ state, actionIdx, logProb, value, dmgBefore });
                return this.actions[actionIdx] ?? valid[0];
            };

            const result = runEpisode({ ...settings }, barSize, style, select);
            const totalDamage = result.damage;

            if (result.damage > bestResult.damage) bestResult = result;

            // Compute rewards and advantages using GAE
            const n = epTransitions.length;
            const rewards: number[] = [];
            const maxReward = Math.max(totalDamage / Math.max(n, 1), 1);

            for (let i = 0; i < n; i++) {
                const dmgAfter = i < n - 1 ? epTransitions[i + 1].dmgBefore : totalDamage;
                rewards.push((dmgAfter - epTransitions[i].dmgBefore) / maxReward); // Normalised
            }

            // GAE advantage estimation
            const advantages: number[] = Array(n).fill(0);
            const returns: number[] = Array(n).fill(0);
            let lastAdv = 0;
            for (let i = n - 1; i >= 0; i--) {
                const nextValue = i < n - 1 ? epTransitions[i + 1].value : 0;
                const delta = rewards[i] + this.gamma * nextValue - epTransitions[i].value;
                lastAdv = delta + this.gamma * this.lam * lastAdv;
                advantages[i] = lastAdv;
                returns[i] = advantages[i] + epTransitions[i].value;
            }

            // Store transitions
            for (let i = 0; i < n; i++) {
                allTransitions.push({
                    state: epTransitions[i].state,
                    actionIdx: epTransitions[i].actionIdx,
                    logProb: epTransitions[i].logProb,
                    reward: rewards[i],
                    value: epTransitions[i].value,
                    advantage: advantages[i],
                    returnVal: returns[i],
                });
            }

            this.trainedEpisodes++;
            if (onProgress && ep % 10 === 0) {
                onProgress(ep, bestResult.damage);
            }
        }

        // PPO update epochs
        for (let epoch = 0; epoch < this.updateEpochs; epoch++) {
            // Shuffle transitions
            for (let i = allTransitions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allTransitions[i], allTransitions[j]] = [allTransitions[j], allTransitions[i]];
            }

            for (const t of allTransitions) {
                // Policy update with clipping
                const logits = this.policyNet.predict(t.state);
                const allIndices = Array.from({ length: this.actions.length }, (_, i) => i);
                const probs = maskedSoftmax(logits, allIndices);
                const newLogProb = Math.log(Math.max(probs[t.actionIdx], 1e-8));

                const ratio = Math.exp(newLogProb - t.logProb);
                const clippedRatio = Math.max(1 - this.clipEpsilon, Math.min(1 + this.clipEpsilon, ratio));
                const policyLoss = -Math.min(ratio * t.advantage, clippedRatio * t.advantage);

                // Update policy: increase logit for good actions, decrease for bad
                const target = logits[t.actionIdx] - this.policyLR * policyLoss;
                this.policyNet.train(t.state, t.actionIdx, target, this.policyLR);

                // Value update: predict returns
                this.valueNet.train(t.state, 0, t.returnVal, this.valueLR);
            }
        }

        return bestResult;
    }

    /** Run using learned policy (greedy, no sampling) */
    exploit(
        settings: Record<string, any>,
        barSize: number,
        style: string
    ): AgentResult {
        const select: SelectFn = (valid, tick, tickSettings, timers) => {
            if (valid.length === 0) return null;
            const state = extractStateVector(tickSettings, timers, tick, barSize);
            const logits = this.policyNet.predict(state);
            const validIndices = valid.map(a => this.actionIndex.get(a)).filter(i => i !== undefined) as number[];
            if (validIndices.length === 0) return valid[0];

            let bestIdx = validIndices[0];
            let bestLogit = -Infinity;
            for (const i of validIndices) {
                if (logits[i] > bestLogit) {
                    bestLogit = logits[i];
                    bestIdx = i;
                }
            }
            return this.actions[bestIdx] ?? valid[0];
        };

        return runEpisode({ ...settings }, barSize, style, select);
    }

    getStats(): { actions: number; episodes: number } {
        return {
            actions: this.actions.length,
            episodes: this.trainedEpisodes,
        };
    }
}
