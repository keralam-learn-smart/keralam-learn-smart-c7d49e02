import { QUESTIONS, type Question } from "@/data/questions";

export const TOTAL_SETS = 20;
export const QUESTIONS_PER_SET = 15;
export const SECONDS_PER_QUESTION = 20;
export const PASS_PERCENT = 60;

// Mulberry32 deterministic PRNG so each set is reproducible across reloads.
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build a 25-question set for the given setId (1..TOTAL_SETS).
 * Uses a global deterministic shuffle and a rotating window so each set
 * has a unique mix even when the underlying pool is smaller than
 * TOTAL_SETS * QUESTIONS_PER_SET.
 */
export function getSetQuestions(setId: number): Question[] {
  const pool = seededShuffle(QUESTIONS, 1337);
  const start = ((setId - 1) * QUESTIONS_PER_SET) % pool.length;
  const picked: Question[] = [];
  const used = new Set<string>();
  let i = 0;
  while (picked.length < QUESTIONS_PER_SET && i < pool.length * 2) {
    const q = pool[(start + i) % pool.length];
    if (!used.has(q.id)) {
      used.add(q.id);
      picked.push(q);
    }
    i++;
  }
  // Re-shuffle within the set so order varies per set.
  return seededShuffle(picked, 9000 + setId);
}

export function getMockTestQuestions(): Question[] {
  const seed = (Date.now() & 0xffffffff) >>> 0;
  return seededShuffle(QUESTIONS, seed).slice(0, QUESTIONS_PER_SET);
}

const COMPLETED_KEY = "rto_completed_sets";
const SCORES_KEY = "rto_set_scores";

export function getCompletedSets(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COMPLETED_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function markSetCompleted(setId: number, score: number) {
  if (typeof window === "undefined") return;
  try {
    const completed = new Set(getCompletedSets());
    completed.add(setId);
    window.localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed]));
    const rawScores = window.localStorage.getItem(SCORES_KEY);
    const scores = rawScores ? (JSON.parse(rawScores) as Record<string, number>) : {};
    scores[String(setId)] = score;
    window.localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch {
    /* ignore */
  }
}

export function getSetScores(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SCORES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}
