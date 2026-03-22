import { describe, expect, it } from "bun:test";
import ImmutablePRNG from "../src/prng-immutable";

describe("PRNG", () => {
	it("should produce the same sequence for the same seed", () => {
		const prng1 = new ImmutablePRNG(12345);
		const prng2 = new ImmutablePRNG(12345);

		const seq1 = [prng1.next(), prng1.next(), prng1.next()];
		const seq2 = [prng2.next(), prng2.next(), prng2.next()];

		expect(seq1).toStrictEqual(seq2);
	});

	it("should handle negative and zero seeds by normalizing", () => {
		const prngZero = new ImmutablePRNG(0);
		const prngNeg = new ImmutablePRNG(-42);

		expect(prngZero.next().seed).toBeGreaterThan(0);
		expect(prngNeg.next().seed).toBeGreaterThan(0);
	});

	it("should round float seeds to the nearest integer", () => {
		const prngFloat = new ImmutablePRNG(123.7);
		const prngInt = new ImmutablePRNG(124);

		expect(prngFloat.next()).toStrictEqual(prngInt.next());
	});

	it("next() should always return a value in [1, 2147483646]", () => {
		const prng = new ImmutablePRNG(42);

		for (let i = 0; i < 1000; i++) {
			const val = prng.next().seed;
			expect(val).toBeGreaterThanOrEqual(1);
			expect(val).toBeLessThanOrEqual(2147483646);
		}
  });

	it("nextBoundedInt(min, max) should return values in [min, max]", () => {
		const prng = new ImmutablePRNG(123);

		const min = 10;
		const max = 20;
		for (let i = 0; i < 1000; i++) {
			const val = prng.nextBoundedInt(min, max).seed;
			expect(val).toBeGreaterThanOrEqual(min);
			expect(val).toBeLessThan(max);
		}
	});

	it("seed getter should return the current seed", () => {
		const prng = new ImmutablePRNG(99);
		const first = prng.next().seed;
		expect(prng.next().seed).toBe(first);
	});
});
