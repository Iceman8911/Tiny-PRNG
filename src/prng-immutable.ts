import { MAX_INT, MIN_INT } from "./shared/constants";
import { getNextSeed, initSeed } from "./shared/utils";

/** Seedable psuedo-random number generator class.

Every method call returns a new PRNG object with the changes
*/
export default class ImmutablePRNG {
	readonly #seed: number;

	constructor(seed: number, passthrough = false) {
		if (passthrough) this.#seed = seed;
		else this.#seed = initSeed(seed);
	}

	/** Returns the current seed.
	 *
	 * You can use this for persistence or to reinitialize the PRNG with the same seed.
	 */
	get seed(): number {
		return this.#seed;
	}

	/** Return a pseudo-random value between 1 and n */
	next(): ImmutablePRNG {
		return new ImmutablePRNG(getNextSeed(this.#seed), true);
	}

	/** Return pseudo-random int between 0 and the specified max */
	nextBoundedInt(min: number, max: number): ImmutablePRNG {
		const float = (getNextSeed(this.#seed) - MIN_INT) / (MAX_INT - MIN_INT);

		return new ImmutablePRNG(Math.floor(float * (max - min) + min));
	}
}
