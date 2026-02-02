/**
 * Unit tests for getFreeSpots utility function
 * Tests the allocation and reuse of free spots in the memory store
 */

import { getFreeSpots } from "./getFreeSpots.util";

describe("getFreeSpots", () => {
    /**
     * Test initialization and basic functionality
     */
    describe("Initialization and Basic Operations", () => {
        it("should return free spots from the freeSpots array when available", () => {
            const freeSpots = [3, 5, 7];
            const store: (any | null)[] = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ];

            const result = getFreeSpots(freeSpots, store, 2);

            expect(result).toEqual([3, 5]);
            expect(freeSpots).toEqual([7]);
            expect(store.length).toBe(8);
        });

        it("should expand store when not enough free spots available", () => {
            const freeSpots = [3];
            const store: (any | null)[] = [null, null, null, null];

            const result = getFreeSpots(freeSpots, store, 3);

            expect(result).toEqual([3, 4, 5]);
            expect(freeSpots).toEqual([]);
            expect(store.length).toBe(6);
            expect(store[4]).toBeNull();
            expect(store[5]).toBeNull();
        });

        it("should expand store when freeSpots array is empty", () => {
            const freeSpots: number[] = [];
            const store: (any | null)[] = [null, null];

            const result = getFreeSpots(freeSpots, store, 3);

            expect(result).toEqual([2, 3, 4]);
            expect(freeSpots).toEqual([]);
            expect(store.length).toBe(5);
        });
    });

    /**
     * Test edge cases
     */
    describe("Edge Cases", () => {
        it("should handle amount of 0", () => {
            const freeSpots = [1, 2, 3];
            const store: (any | null)[] = [null, null];

            const result = getFreeSpots(freeSpots, store, 0);

            expect(result).toEqual([]);
            expect(freeSpots).toEqual([1, 2, 3]);
            expect(store.length).toBe(2);
        });

        it("should handle empty store", () => {
            const freeSpots: number[] = [];
            const store: (any | null)[] = [];

            const result = getFreeSpots(freeSpots, store, 3);

            expect(result).toEqual([0, 1, 2]);
            expect(store.length).toBe(3);
        });

        it("should handle single spot request", () => {
            const freeSpots = [5];
            const store: (any | null)[] = [null, null, null, null, null, null];

            const result = getFreeSpots(freeSpots, store, 1);

            expect(result).toEqual([5]);
            expect(freeSpots).toEqual([]);
            expect(store.length).toBe(6);
        });

        it("should handle large amount request", () => {
            const freeSpots: number[] = [];
            const store: (any | null)[] = [];

            const result = getFreeSpots(freeSpots, store, 100);

            expect(result.length).toBe(100);
            expect(result).toEqual(Array.from({ length: 100 }, (_, i) => i));
            expect(store.length).toBe(100);
        });
    });

    /**
     * Test modifications to original arrays
     */
    describe("Array Modifications", () => {
        it("should modify freeSpots array in place", () => {
            const freeSpots = [1, 2, 3, 4, 5];
            const store: (any | null)[] = Array(10).fill(null);

            getFreeSpots(freeSpots, store, 3);

            expect(freeSpots).toEqual([4, 5]);
        });

        it("should modify store array in place when expanding", () => {
            const freeSpots: number[] = [];
            const store: (any | null)[] = [null, null];
            const originalStore = store;

            getFreeSpots(freeSpots, store, 2);

            expect(store).toBe(originalStore);
            expect(store.length).toBe(4);
        });

        it("should not modify store when enough free spots exist", () => {
            const freeSpots = [5, 6, 7];
            const store: (any | null)[] = Array(10).fill(null);
            const originalLength = store.length;

            getFreeSpots(freeSpots, store, 2);

            expect(store.length).toBe(originalLength);
        });
    });

    /**
     * Test combination scenarios
     */
    describe("Combination Scenarios", () => {
        it("should use free spots first, then expand", () => {
            const freeSpots = [2, 3];
            const store: (any | null)[] = [null, null, null, null];

            const result = getFreeSpots(freeSpots, store, 4);

            expect(result).toEqual([2, 3, 4, 5]);
            expect(freeSpots).toEqual([]);
            expect(store.length).toBe(6);
        });

        it("should handle consecutive calls correctly", () => {
            const freeSpots = [10, 11, 12];
            const store: (any | null)[] = Array(8).fill(null);

            const result1 = getFreeSpots(freeSpots, store, 1);
            expect(result1).toEqual([10]);
            expect(freeSpots).toEqual([11, 12]);

            const result2 = getFreeSpots(freeSpots, store, 2);
            expect(result2).toEqual([11, 12]);
            expect(freeSpots).toEqual([]);

            const result3 = getFreeSpots(freeSpots, store, 2);
            expect(result3).toEqual([8, 9]);
            expect(store.length).toBe(10);
        });
    });

    /**
     * Test return value correctness
     */
    describe("Return Value Correctness", () => {
        it("should return array of correct length", () => {
            const freeSpots = [1, 2, 3];
            const store: (any | null)[] = Array(10).fill(null);

            const result = getFreeSpots(freeSpots, store, 5);

            expect(result.length).toBe(5);
        });

        it("should return indices even with duplicates in freeSpots", () => {
            const freeSpots = [5, 5, 7];
            const store: (any | null)[] = Array(10).fill(null);

            const result = getFreeSpots(freeSpots, store, 3);

            // Should return all 3 spots even if there are duplicates
            expect(result.length).toBe(3);
            expect(result).toEqual([5, 5, 7]);
        });

        it("should return indices in correct order", () => {
            const freeSpots = [3, 5, 7];
            const store: (any | null)[] = Array(10).fill(null);

            const result = getFreeSpots(freeSpots, store, 3);

            expect(result).toEqual([3, 5, 7]);
        });
    });
});
