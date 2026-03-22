import { MAX_INT, MIN_INT } from "./constants";

/**
 * Create a pseudo-random number generator. The seed must be an integer. Floats are rounded to the nearest integer.
 *
 * Uses the Lehmer / Park-Miller PRNG
 * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 *
 *  Utilizes MINSTD parameters where:
 *  n = 2^31 − 1 = 2,147,483,647 (a Mersenne prime)
 *  g = 7^5 = 16,807 (a primitive root modulo)
 */
export function initSeed(seed: number): number {
	// Initialize seed with a modulo by n
	let newSeed = Math.round(seed) % MAX_INT;

	if (newSeed <= 0) {
		// If seed is negative or zero, add n
		newSeed += MAX_INT - MIN_INT;
	}

	return newSeed;
}

export function getNextSeed(seed: number): number {
	// x_k+1 = (g * x_k) % n
	return (seed * 16807) % MAX_INT;
}
