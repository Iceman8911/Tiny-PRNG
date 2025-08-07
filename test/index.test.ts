import { describe, expect, it } from "bun:test";
import { PRNG } from "../src/index";

describe("PRNG", () => {
	it("should produce the same sequence for the same seed", () => {
		const prng1 = new PRNG(12345);
		const prng2 = new PRNG(12345);

		const seq1 = [prng1.next(), prng1.next(), prng1.next()];
		const seq2 = [prng2.next(), prng2.next(), prng2.next()];

		expect(seq1).toEqual(seq2);
	});

	it("should handle negative and zero seeds by normalizing", () => {
		const prngZero = new PRNG(0);
		const prngNeg = new PRNG(-42);

		expect(prngZero.next()).toBeGreaterThan(0);
		expect(prngNeg.next()).toBeGreaterThan(0);
	});

	it("should round float seeds to the nearest integer", () => {
		const prngFloat = new PRNG(123.7);
		const prngInt = new PRNG(124);

		expect(prngFloat.next()).toEqual(prngInt.next());
	});

	it("next() should always return a value in [1, 2147483646]", () => {
		const prng = new PRNG(42);

		for (let i = 0; i < 1000; i++) {
			const val = prng.next();
			expect(val).toBeGreaterThanOrEqual(1);
			expect(val).toBeLessThanOrEqual(2147483646);
		}
	});

	it("nextFloat() should always return a value in [0, 1]", () => {
		const prng = new PRNG(42);

		for (let i = 0; i < 1000; i++) {
			const val = prng.nextFloat();
			expect(val).toBeGreaterThanOrEqual(0);
			expect(val).toBeLessThan(1);
		}
	});

	it("nextBoundedInt(min, max) should return values in [min, max]", () => {
		const prng = new PRNG(123);

		const min = 10;
		const max = 20;
		for (let i = 0; i < 1000; i++) {
			const val = prng.nextBoundedInt(min, max);
			expect(val).toBeGreaterThanOrEqual(min);
			expect(val).toBeLessThan(max);
		}
	});

	it("seed getter should return the current seed", () => {
		const prng = new PRNG(99);
		const first = prng.next();
		expect(prng.seed).toBe(first);
	});
});
