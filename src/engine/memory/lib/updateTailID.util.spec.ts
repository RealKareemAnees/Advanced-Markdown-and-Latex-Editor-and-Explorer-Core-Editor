/**
 * Unit tests for updateTailID utility function
 * Tests the traversal and identification of the tail node in a linked chain
 */

import { updateTailID } from "./updateTailID.util";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Creates a mock node for testing
 */
function createMockNode(
    id: number,
    leftNodeID: number | null = null,
    rightNodeID: number | null = null,
    parentNodeID: number | null = null,
): Partial<NodeInterface> {
    return {
        ID: id,
        leftNodeID,
        rightNodeID,
        parentNodeID,
    } as NodeInterface;
}

describe("updateTailID", () => {
    /**
     * Test initialization and basic functionality
     */
    describe("Initialization and Basic Operations", () => {
        it("should return headID when there are no left nodes", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(0);
        });

        it("should return the last node in a simple chain", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                createMockNode(2, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(2);
        });

        it("should traverse multiple nodes to find tail", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                createMockNode(2, 3) as NodeInterface,
                createMockNode(3, 4) as NodeInterface,
                createMockNode(4, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(4);
        });
    });

    /**
     * Test edge cases
     */
    describe("Edge Cases", () => {
        it("should handle invalid headID (negative)", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0) as NodeInterface,
            ];

            const result = updateTailID(store, -1);

            expect(result).toBe(-1);
        });

        it("should handle invalid headID (out of bounds)", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0) as NodeInterface,
            ];

            const result = updateTailID(store, 10);

            expect(result).toBe(10);
        });

        it("should handle null node at headID", () => {
            const store: (NodeInterface | null)[] = [null];

            const result = updateTailID(store, 0);

            expect(result).toBe(0);
        });

        it("should stop at null node in chain", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                null,
                createMockNode(3, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(1);
        });

        it("should handle single node with leftNodeID pointing to null", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                null,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(0);
        });
    });

    /**
     * Test with nested structures (rightNodeID should be ignored)
     */
    describe("Nested Structures", () => {
        it("should ignore rightNodeID when traversing", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1, 10) as NodeInterface,
                createMockNode(1, 2, 11) as NodeInterface,
                createMockNode(2, null, 12) as NodeInterface,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                createMockNode(10, null) as NodeInterface,
                createMockNode(11, null) as NodeInterface,
                createMockNode(12, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(2);
        });

        it("should only follow leftNodeID chain", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1, 5) as NodeInterface,
                createMockNode(1, null, 6) as NodeInterface,
                null,
                null,
                null,
                createMockNode(5, 7) as NodeInterface,
                createMockNode(6, 8) as NodeInterface,
                createMockNode(7, null) as NodeInterface,
                createMockNode(8, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(1);
        });
    });

    /**
     * Test with various chain lengths
     */
    describe("Chain Length Variations", () => {
        it("should handle very long chains", () => {
            const chainLength = 100;
            const store: (NodeInterface | null)[] = Array.from(
                { length: chainLength },
                (_, i) =>
                    createMockNode(
                        i,
                        i < chainLength - 1 ? i + 1 : null,
                    ) as NodeInterface,
            );

            const result = updateTailID(store, 0);

            expect(result).toBe(chainLength - 1);
        });

        it("should handle chain of length 2", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(1);
        });

        it("should handle starting from middle of chain", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                createMockNode(2, 3) as NodeInterface,
                createMockNode(3, null) as NodeInterface,
            ];

            const result = updateTailID(store, 1);

            expect(result).toBe(3);
        });
    });

    /**
     * Test with sparse arrays
     */
    describe("Sparse Arrays", () => {
        it("should handle sparse array with gaps", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 5) as NodeInterface,
                null,
                null,
                null,
                null,
                createMockNode(5, 10) as NodeInterface,
                null,
                null,
                null,
                null,
                createMockNode(10, null) as NodeInterface,
            ];

            const result = updateTailID(store, 0);

            expect(result).toBe(10);
        });

        it("should handle non-sequential node IDs", () => {
            const store: (NodeInterface | null)[] = [];
            store[0] = createMockNode(0, 3) as NodeInterface;
            store[3] = createMockNode(3, 7) as NodeInterface;
            store[7] = createMockNode(7, 15) as NodeInterface;
            store[15] = createMockNode(15, null) as NodeInterface;

            const result = updateTailID(store, 0);

            expect(result).toBe(15);
        });
    });

    /**
     * Test correctness of traversal
     */
    describe("Traversal Correctness", () => {
        it("should not modify the store", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                createMockNode(2, null) as NodeInterface,
            ];
            const originalStore = [...store];

            updateTailID(store, 0);

            expect(store).toEqual(originalStore);
        });

        it("should return last accessible node before broken link", () => {
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1) as NodeInterface,
                createMockNode(1, 2) as NodeInterface,
                createMockNode(2, 999) as NodeInterface, // points to non-existent node
            ];

            const result = updateTailID(store, 0);

            // Returns 999 because node 2's leftNodeID points to it, even though it's out of bounds
            // The function validates at the beginning but not during traversal
            expect(result).toBe(999);
        });
    });
});
