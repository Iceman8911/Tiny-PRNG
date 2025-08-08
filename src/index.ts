const MAX_INT = 2147483647; // 2^31 - 1, a Mersenne prime

const MIN_INT = 1; // Minimum value for the PRNG, as we want to avoid zero and negative numbers

/** Seedable psuedo-random number generator class. */
class PRNG {
	#seed: number;

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
	constructor(seed: number) {
		// Initialize seed with a modulo by n
		this.#seed = Math.round(seed) % MAX_INT;

		if (this.#seed <= 0) {
			// If seed is negative or zero, add n
			this.#seed += MAX_INT - MIN_INT;
		}
	}

	/** Return a pseudo-random value between 1 and n */
	next(): number {
		// x_k+1 = (g * x_k) % n
		this.#seed = (this.#seed * 16807) % MAX_INT;

		return this.#seed;
	}

	/** Return a pseudo-random floating point number in range [0, 1] */
	nextFloat(): number {
		// We know that result of next() will be 1 to 2147483646 (inclusive)
		return (this.next() - MIN_INT) / (MAX_INT - MIN_INT);
	}

	/** Return pseudo-random int between 0 and the specified max */
	nextBoundedInt(min: number, max: number): number {
		return Math.floor(this.nextFloat() * (max - min) + min);
	}

	/** Returns the current seed.
	 *
	 * You can use this for persistence or to reinitialize the PRNG with the same seed.
	 */
	get seed(): number {
		return this.#seed;
	}
}

export { PRNG };
