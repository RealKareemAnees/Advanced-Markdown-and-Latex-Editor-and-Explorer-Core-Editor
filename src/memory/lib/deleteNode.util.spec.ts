/**
 * Unit tests for deleteNode utility function
 * Tests node deletion including nested children and link updates
 */

import { deleteNode } from "./deleteNode.util";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Creates a mock node for testing
 */
function createMockNode(
    id: number,
    leftNodeID: number | null = null,
    rightNodeID: number | null = null,
    parentNodeID: number | null = null,
): NodeInterface {
    return {
        ID: id,
        leftNodeID,
        rightNodeID,
        parentNodeID,
    } as NodeInterface;
}

describe("deleteNode", () => {
    /**
     * Test initialization and basic functionality
     */
    describe("Initialization and Basic Operations", () => {
        it("should delete a single node with no children", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, null, null, 0),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(freeSpots).toContain(1);
        });

        it("should delete node and update parent's leftNodeID reference", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, 2, null, 0),
                createMockNode(2, null, null, 1),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[0]?.leftNodeID).toBe(2);
            expect(store[2]?.parentNodeID).toBe(0);
        });

        it("should delete node and update parent's rightNodeID reference", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, 1),
                createMockNode(1, 2, null, 0),
                createMockNode(2, null, null, 1),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[0]?.rightNodeID).toBe(2);
            expect(store[2]?.parentNodeID).toBe(0);
        });
    });

    /**
     * Test nested children deletion
     */
    describe("Nested Children Deletion", () => {
        it("should delete node and all its nested children", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, 1),
                createMockNode(1, null, 2, 0),
                createMockNode(2, null, null, 1),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[2]).toBeNull();
            expect(freeSpots).toContain(1);
            expect(freeSpots).toContain(2);
        });

        it("should delete nested children at multiple levels", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, 1),
                createMockNode(1, null, 2, 0),
                createMockNode(2, null, 3, 1),
                createMockNode(3, null, null, 2),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[2]).toBeNull();
            expect(store[3]).toBeNull();
            expect(freeSpots.length).toBe(3);
        });

        it("should delete nested children and their left siblings", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, 1),
                createMockNode(1, null, 2, 0),
                createMockNode(2, 3, null, 1),
                createMockNode(3, null, null, 2),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[2]).toBeNull();
            expect(store[3]).toBeNull();
            expect(freeSpots.length).toBe(3);
        });
    });

    /**
     * Test edge cases
     */
    describe("Edge Cases", () => {
        it("should handle deleting node at index 0", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, null, null, 0),
            ];

            deleteNode(0, store, freeSpots);

            expect(store[0]).toBeNull();
            expect(freeSpots).toContain(0);
        });

        it("should handle invalid nodeID (negative)", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [createMockNode(0)];

            deleteNode(-1, store, freeSpots);

            expect(store[0]).not.toBeNull();
            expect(freeSpots.length).toBe(0);
        });

        it("should handle invalid nodeID (out of bounds)", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [createMockNode(0)];

            deleteNode(10, store, freeSpots);

            expect(store[0]).not.toBeNull();
            expect(freeSpots.length).toBe(0);
        });

        it("should handle already deleted node (null)", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [createMockNode(0), null];

            deleteNode(1, store, freeSpots);

            expect(store[0]).not.toBeNull();
            expect(freeSpots.length).toBe(0);
        });

        it("should handle node with no parent", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, null, null),
            ];

            deleteNode(0, store, freeSpots);

            expect(store[0]).toBeNull();
            expect(freeSpots).toContain(0);
        });
    });

    /**
     * Test complex tree structures
     */
    describe("Complex Tree Structures", () => {
        it("should delete subtree with mixed left and right nodes", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, 2, 5, 0),
                createMockNode(2, null, null, 1),
                null,
                null,
                createMockNode(5, 6, null, 1),
                createMockNode(6, null, null, 5),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            // Node 2 should NOT be deleted because it's a left sibling, not a right child
            expect(store[2]).not.toBeNull();
            expect(store[5]).toBeNull();
            expect(store[6]).toBeNull();
            expect(store[0]?.leftNodeID).toBe(2);
        });

        it("should not delete left siblings of root deletion node", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, 2, null, 0),
                createMockNode(2, null, null, 1),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[1]).toBeNull();
            expect(store[2]).not.toBeNull();
            expect(freeSpots.length).toBe(1);
        });

        it("should handle deletion in middle of chain", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, 2, null, 0),
                createMockNode(2, 3, null, 1),
                createMockNode(3, null, null, 2),
            ];

            deleteNode(2, store, freeSpots);

            expect(store[2]).toBeNull();
            expect(store[1]?.leftNodeID).toBe(3);
            expect(store[3]?.parentNodeID).toBe(1);
        });
    });

    /**
     * Test freeSpots accumulation
     */
    describe("FreeSpots Management", () => {
        it("should add deleted node ID to freeSpots", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0),
                createMockNode(1, null, null, 0),
            ];

            deleteNode(1, store, freeSpots);

            expect(freeSpots).toContain(1);
            expect(freeSpots.length).toBe(1);
        });

        it("should add all deleted children IDs to freeSpots", () => {
            const freeSpots: number[] = [5];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, null, 1),
                createMockNode(1, null, 2, 0),
                createMockNode(2, 3, null, 1),
                createMockNode(3, null, null, 2),
            ];

            deleteNode(1, store, freeSpots);

            expect(freeSpots.length).toBe(4);
            expect(freeSpots).toContain(1);
            expect(freeSpots).toContain(2);
            expect(freeSpots).toContain(3);
            expect(freeSpots).toContain(5);
        });

        it("should preserve existing freeSpots", () => {
            const freeSpots: number[] = [10, 20, 30];
            const store: (NodeInterface | null)[] = Array(40).fill(null);
            store[0] = createMockNode(0);
            store[1] = createMockNode(1, null, null, 0);

            deleteNode(1, store, freeSpots);

            expect(freeSpots).toContain(10);
            expect(freeSpots).toContain(20);
            expect(freeSpots).toContain(30);
            expect(freeSpots).toContain(1);
        });
    });

    /**
     * Test link integrity after deletion
     */
    describe("Link Integrity", () => {
        it("should maintain chain integrity after deletion", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1),
                createMockNode(1, 2, null, 0),
                createMockNode(2, 3, null, 1),
                createMockNode(3, null, null, 2),
            ];

            deleteNode(1, store, freeSpots);

            expect(store[0]?.leftNodeID).toBe(2);
            expect(store[2]?.parentNodeID).toBe(0);
            expect(store[2]?.leftNodeID).toBe(3);
        });

        it("should update both parent references correctly", () => {
            const freeSpots: number[] = [];
            const store: (NodeInterface | null)[] = [
                createMockNode(0, 1, 5),
                createMockNode(1, null, null, 0),
                null,
                null,
                null,
                createMockNode(5, 6, null, 0),
                createMockNode(6, null, null, 5),
            ];

            deleteNode(5, store, freeSpots);

            expect(store[0]?.rightNodeID).toBe(6);
            expect(store[6]?.parentNodeID).toBe(0);
        });
    });
});
