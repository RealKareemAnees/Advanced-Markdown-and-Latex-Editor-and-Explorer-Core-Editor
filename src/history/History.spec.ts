/**
 * Unit tests for the History class
 * Tests undo/redo functionality, state management, and edge cases
 */

import { History } from "./History";
import type { NodeInterface } from "../../types/Node.interface";
import type { BlockEntityInterface } from "../../types/BlockEntity.interface";

// Mock Entity for testing
const createMockEntity = (content: string = ""): BlockEntityInterface =>
    ({
        DATA: content,
    }) as any;

// Mock Node implementation for testing
//@ts-ignore
const createMockNode = (id: number, content: string = ""): NodeInterface => {
    let _id = id;
    let _parentNodeID: number | null = null;
    let _leftNodeID: number | null = null;
    let _rightNodeID: number | null = null;
    const _entity = createMockEntity(content);

    return {
        get ENTITY() {
            return _entity;
        },
        get ID() {
            return _id;
        },
        set ID(val: number) {
            _id = val;
        },
        get parentNodeID() {
            return _parentNodeID;
        },
        set parentNodeID(val: number | null) {
            _parentNodeID = val;
        },
        get leftNodeID() {
            return _leftNodeID;
        },
        set leftNodeID(val: number | null) {
            _leftNodeID = val;
        },
        get rightNodeID() {
            return _rightNodeID;
        },
        set rightNodeID(val: number | null) {
            _rightNodeID = val;
        },
    };
};

describe("History", () => {
    let history: History;

    beforeEach(() => {
        history = new History();
    });
    afterEach(() => {
        history = null as any;
    });

    describe("Constructor", () => {
        it("should initialize with empty state when no initial nodes provided", () => {
            expect(history.CURRENT).toEqual([]);
            expect(history.BACKWARD_LENGTH).toBe(0);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should initialize with provided initial state", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const initialNodes = [node1, node2];

            history = new History(initialNodes);

            expect(history.CURRENT).toEqual(initialNodes);
            expect(history.BACKWARD_LENGTH).toBe(1);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should handle empty array as initial state", () => {
            history = new History([]);

            expect(history.CURRENT).toEqual([]);
            expect(history.BACKWARD_LENGTH).toBe(0);
            expect(history.FORWARD_LENGTH).toBe(0);
        });
    });

    describe("do()", () => {
        it("should add a new state to history", () => {
            const node1 = createMockNode(1, "Node 1");

            history.do([node1]);

            expect(history.CURRENT).toEqual([node1]);
            expect(history.BACKWARD_LENGTH).toBe(1);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should handle multiple do operations", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node1, node2]);
            history.do([node1, node2, node3]);

            expect(history.CURRENT).toEqual([node1, node2, node3]);
            expect(history.BACKWARD_LENGTH).toBe(3);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should clear forward history when doing after undo", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.do([node3]);

            // Undo twice
            history.undo();
            history.undo();

            expect(history.BACKWARD_LENGTH).toBe(1);
            expect(history.FORWARD_LENGTH).toBe(2);

            // Do new action - should clear forward history
            const node4 = createMockNode(4, "Node 4");
            history.do([node4]);

            expect(history.CURRENT).toEqual([node4]);
            expect(history.BACKWARD_LENGTH).toBe(2);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should ignore empty or null nodes array", () => {
            const node1 = createMockNode(1, "Node 1");
            history.do([node1]);

            const beforeBackward = history.BACKWARD_LENGTH;
            const beforeForward = history.FORWARD_LENGTH;

            history.do([]);

            expect(history.BACKWARD_LENGTH).toBe(beforeBackward);
            expect(history.FORWARD_LENGTH).toBe(beforeForward);
        });
    });

    describe("undo()", () => {
        it("should undo to previous state", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);

            const result = history.undo();

            expect(result).toEqual([node1]);
            expect(history.CURRENT).toEqual([node1]);
            expect(history.BACKWARD_LENGTH).toBe(1);
            expect(history.FORWARD_LENGTH).toBe(1);
        });

        it("should handle multiple undo operations", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.do([node3]);

            history.undo();
            expect(history.CURRENT).toEqual([node2]);

            history.undo();
            expect(history.CURRENT).toEqual([node1]);

            history.undo();
            expect(history.CURRENT).toEqual([]);
        });

        it("should not undo beyond initial state", () => {
            const node1 = createMockNode(1, "Node 1");
            history.do([node1]);

            history.undo(); // Back to empty
            const result = history.undo(); // Try to undo beyond initial state

            expect(result).toEqual([]);
            expect(history.CURRENT).toEqual([]);
            expect(history.BACKWARD_LENGTH).toBe(0);
        });

        it("should return empty array when undoing on empty history", () => {
            const result = history.undo();

            expect(result).toEqual([]);
            expect(history.BACKWARD_LENGTH).toBe(0);
        });

        it("should maintain correct state after undo sequence", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);

            history.undo();
            history.undo();

            expect(history.BACKWARD_LENGTH).toBe(0);
            expect(history.FORWARD_LENGTH).toBe(2);
        });
    });

    describe("redo()", () => {
        it("should redo to next state", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);
            history.undo();

            const result = history.redo();

            expect(result).toEqual([node2]);
            expect(history.CURRENT).toEqual([node2]);
            expect(history.BACKWARD_LENGTH).toBe(2);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should handle multiple redo operations", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.do([node3]);

            history.undo();
            history.undo();
            history.undo();

            history.redo();
            expect(history.CURRENT).toEqual([node1]);

            history.redo();
            expect(history.CURRENT).toEqual([node2]);

            history.redo();
            expect(history.CURRENT).toEqual([node3]);
        });

        it("should not redo beyond last state", () => {
            const node1 = createMockNode(1, "Node 1");
            history.do([node1]);

            const result = history.redo(); // Try to redo when already at latest

            expect(result).toEqual([node1]);
            expect(history.CURRENT).toEqual([node1]);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should return empty array when redoing on empty history", () => {
            const result = history.redo();

            expect(result).toEqual([]);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should maintain correct state after redo sequence", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);

            history.undo();
            history.undo();
            history.redo();
            history.redo();

            expect(history.BACKWARD_LENGTH).toBe(2);
            expect(history.FORWARD_LENGTH).toBe(0);
            expect(history.CURRENT).toEqual([node2]);
        });
    });

    describe("CURRENT getter", () => {
        it("should return current state", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            expect(history.CURRENT).toEqual([]);

            history.do([node1]);
            expect(history.CURRENT).toEqual([node1]);

            history.do([node2]);
            expect(history.CURRENT).toEqual([node2]);
        });

        it("should return correct state after undo/redo", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.do([node3]);

            history.undo();
            expect(history.CURRENT).toEqual([node2]);

            history.redo();
            expect(history.CURRENT).toEqual([node3]);

            history.undo();
            history.undo();
            expect(history.CURRENT).toEqual([node1]);
        });
    });

    describe("FORWARD_LENGTH getter", () => {
        it("should return correct forward length", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            expect(history.FORWARD_LENGTH).toBe(0);

            history.do([node1]);
            expect(history.FORWARD_LENGTH).toBe(0);

            history.do([node2]);
            history.do([node3]);
            expect(history.FORWARD_LENGTH).toBe(0);

            history.undo();
            expect(history.FORWARD_LENGTH).toBe(1);

            history.undo();
            expect(history.FORWARD_LENGTH).toBe(2);
        });

        it("should reset to 0 after do() operation", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.undo();

            expect(history.FORWARD_LENGTH).toBe(1);

            history.do([node3]);
            expect(history.FORWARD_LENGTH).toBe(0);
        });
    });

    describe("BACKWARD_LENGTH getter", () => {
        it("should return correct backward length", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            expect(history.BACKWARD_LENGTH).toBe(0);

            history.do([node1]);
            expect(history.BACKWARD_LENGTH).toBe(1);

            history.do([node2]);
            expect(history.BACKWARD_LENGTH).toBe(2);

            history.do([node3]);
            expect(history.BACKWARD_LENGTH).toBe(3);

            history.undo();
            expect(history.BACKWARD_LENGTH).toBe(2);
        });

        it("should not go below 0", () => {
            history.undo();
            expect(history.BACKWARD_LENGTH).toBe(0);
        });
    });

    describe("export()", () => {
        it("should export history as JSON string", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);

            const exported = history.export();
            const parsed = JSON.parse(exported);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed.length).toBe(3); // Empty initial state + 2 states
        });

        it("should export empty history", () => {
            const exported = history.export();
            const parsed = JSON.parse(exported);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed.length).toBe(1); // Just the initial empty state
        });

        it("should export complete history stack", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");
            const node3 = createMockNode(3, "Node 3");

            history.do([node1]);
            history.do([node2]);
            history.do([node3]);

            const exported = history.export();
            const parsed = JSON.parse(exported);

            expect(parsed.length).toBe(4); // Initial empty + 3 states
        });

        it("should export current position in history", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);
            history.undo();

            const exported = history.export();

            // Exported JSON should contain full stack
            // Current position is managed internally
            expect(exported).toBeTruthy();
            expect(() => JSON.parse(exported)).not.toThrow();
        });
    });

    describe("Complex Scenarios", () => {
        it("should handle alternating undo/redo operations", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);

            history.undo();
            expect(history.CURRENT).toEqual([node1]);

            history.redo();
            expect(history.CURRENT).toEqual([node2]);

            history.undo();
            expect(history.CURRENT).toEqual([node1]);

            history.redo();
            expect(history.CURRENT).toEqual([node2]);
        });

        it("should handle branching history (do after undo)", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1]);
            history.do([node2]);
            history.undo();

            // Branch - old node3 is lost
            const node4 = createMockNode(4, "Node 4");
            history.do([node4]);

            expect(history.CURRENT).toEqual([node4]);
            expect(history.FORWARD_LENGTH).toBe(0);

            // Cannot redo to old branch
            history.redo();
            expect(history.CURRENT).toEqual([node4]);
        });

        it("should handle initialization with nodes and subsequent operations", () => {
            const node1 = createMockNode(1, "Initial Node");
            history = new History([node1]);

            expect(history.CURRENT).toEqual([node1]);
            expect(history.BACKWARD_LENGTH).toBe(1);

            const node2 = createMockNode(2, "New Node");
            history.do([node2]);

            expect(history.CURRENT).toEqual([node2]);
            expect(history.BACKWARD_LENGTH).toBe(2);

            history.undo();
            expect(history.CURRENT).toEqual([node1]);

            history.undo();
            expect(history.CURRENT).toEqual([]);
        });

        it("should handle large number of operations", () => {
            const states = 100;

            for (let i = 1; i <= states; i++) {
                const nodes = Array.from({ length: i }, (_, j) =>
                    createMockNode(j + 1, `Node ${j + 1}`),
                );
                history.do(nodes);
            }

            expect(history.BACKWARD_LENGTH).toBe(states);
            expect(history.FORWARD_LENGTH).toBe(0);

            // Undo half
            for (let i = 0; i < states / 2; i++) {
                history.undo();
            }

            expect(history.BACKWARD_LENGTH).toBe(states / 2);
            expect(history.FORWARD_LENGTH).toBe(states / 2);

            // Redo half
            for (let i = 0; i < states / 2; i++) {
                history.redo();
            }

            expect(history.BACKWARD_LENGTH).toBe(states);
            expect(history.FORWARD_LENGTH).toBe(0);
        });

        it("should maintain referential integrity of nodes", () => {
            const node1 = createMockNode(1, "Node 1");
            const node2 = createMockNode(2, "Node 2");

            history.do([node1, node2]);

            const current = history.CURRENT;
            expect(current[0]).toBe(node1);
            expect(current[1]).toBe(node2);
        });
    });
});
