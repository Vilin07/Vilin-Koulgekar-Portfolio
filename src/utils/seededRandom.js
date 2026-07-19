/**
 * A small deterministic random-number generator. Particle geometry can be
 * recreated consistently without calling Math.random during React rendering.
 */
export function createSeededRandom(seed = 1) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
