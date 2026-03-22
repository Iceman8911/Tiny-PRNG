import { MAX_INT, MIN_INT } from "./shared/constants";
import { getNextSeed, initSeed } from "./shared/utils";

/** Seedable psuedo-random number generator class. */
export default class PRNG {
	#seed: number;

	constructor(seed: number) {
		this.#seed = initSeed(seed);
	}

	/** Returns the current seed.
	 *
	 * You can use this for persistence or to reinitialize the PRNG with the same seed.
	 */
	get seed(): number {
		return this.#seed;
	}

	/** Return a pseudo-random value between 1 and n */
	next(): number {
		this.#seed = getNextSeed(this.#seed);

		return this.#seed;
	}
	/** Return pseudo-random int between the min (default = 0) and the specified max (default = 1) */
	nextBoundedInt(min = 0, max = 1): number {
		const float = (this.next() - MIN_INT) / (MAX_INT - MIN_INT);

		return Math.floor(float * (max - min) + min);
	}
}
