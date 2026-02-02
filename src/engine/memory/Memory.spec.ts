/**
 * Unit tests for Memory class
 * Tests all memory operations including insertion, deletion, and node management
 */

import { Memory } from "./Memory";
import { Node } from "./Node";
import type { NodeInterface } from "../../types/Node.interface";
import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
import { BlockTypesEnum } from "../../types/BlockTypes.enum";

/**
 * Creates a mock entity for testing
 */
function createMockEntity(
    type: BlockTypesEnum = BlockTypesEnum.PARAGRAPH,
    data: string = "test",
): BlockEntityInterface {
    // Use global document from jsdom
    //@ts-ignore
    const element = global.document
        ? //@ts-ignore
          global.document.createElement("div")
        : ({} as HTMLElement);
    return {
        TYPE: type,
        DATA: data,
        OPTIONS: {},
        HTML_ELEMENT: element,
        CONVERTIBLE: true,
    } as BlockEntityInterface;
}

/**
 * Creates a mock node for testing
 */
function createMockNode(
    entity: string = null,
    id: number | null = null,
    leftNodeID: number | null = null,
    rightNodeID: number | null = null,
    parentNodeID: number | null = null,
): NodeInterface {
    return {
        ID: id,
        leftNodeID,
        rightNodeID,
        parentNodeID,
        ENTITY: entity || createMockEntity(),
    } as NodeInterface;
}

describe("Memory", () => {
    let memory: Memory;
    let node_a: NodeInterface;
    let node_b: NodeInterface;
    let node_c: NodeInterface;
    let node_d: NodeInterface;
    let node_e: NodeInterface;
    beforeEach(() => {
        node_a = createMockNode("a");
        node_b = createMockNode("b");
        node_c = createMockNode("c");
        node_d = createMockNode("d");
        node_e = createMockNode("e");
        memory = new Memory();
    });
    afterEach(() => {
        memory.clearMemory();
        node_a = null;
        node_b = null;
        node_c = null;
        node_d = null;
        node_e = null;
    });

    describe("getNodeByID", () => {
        it("should retrieve node by ID", () => {
            memory.appendNode(node_a);

            memory.appendNode(node_b);

            memory.appendNode(node_c);

            memory.appendNode(node_d);

            const retrievedNode = memory.getNodeByID(0);
            const nonExistentNode = memory.getNodeByID(999);

            expect(retrievedNode.ENTITY).toBe(node_a.ENTITY);
            expect(nonExistentNode).toBeNull();

            expect(memory.ArrayRepresentation.length).toBe(4);
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(3);
        });
    });

    describe("deleteNode", () => {
        it("should delete node in the middle", () => {
            memory.appendNode(node_a);

            memory.appendNode(node_b);

            memory.appendNode(node_c);

            memory.appendNode(node_d);

            memory.deleteNode(1);
            expect(memory.getNodeByID(1)).toBeNull();

            expect(memory.ArrayRepresentation.length).toBe(4);

            expect(memory.getNodeByID(0)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(0);

            expect(memory.getNodeByID(3)?.parentNodeID).toBe(2);
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(3);
        });

        it("should delete head node", () => {
            memory.appendNode(node_a);

            memory.appendNode(node_b);

            memory.appendNode(node_c);

            memory.deleteNode(0);

            expect(memory.getNodeByID(0)).toBeNull();

            expect(memory.HEAD_NODE_ID).toBe(1);
        });

        it("should delete tail node", () => {
            memory.appendNode(node_a);

            memory.appendNode(node_b);

            memory.appendNode(node_c);

            memory.deleteNode(2);

            expect(memory.getNodeByID(2)).toBeNull();

            expect(memory.TAIL_NODE_ID).toBe(1);
        });

        it("should delete node with children", () => {
            memory.appendNode(node_a); // 0

            memory.appendNode(node_b); // 1

            memory.appendNode(node_c); // 2

            memory.insertChildNode(node_d, 1); //3

            memory.insertChildNode(node_e, 3); //4

            memory.deleteNode(1);

            expect(memory.getNodeByID(1)).toBeNull();
            expect(memory.getNodeByID(3)).toBeNull();
            expect(memory.getNodeByID(4)).toBeNull();

            expect(memory.getNodeByID(0)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(0);

            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(2);
        });
    });

    describe("deleteMultipleNodes", () => {
        it("should delete multiple diverse nodes, (nodes below nodes, nodes as intermediate children nodes as heads of children)", () => {
            // Setup: Create a complex structure
            // 0 (a)
            //   -> 1 (b)
            //        -> 3 (d) [child of 1]
            //             -> 4 (e) [child of 3]
            //   -> 2 (c)

            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2
            memory.insertChildNode(node_d, 1); // 3 (child of 1)
            memory.insertChildNode(node_e, 3); // 4 (child of 3)

            // Delete nodes 1 and 2 (node with children and a regular node)
            memory.deleteMultipleNodes([1, 2]);

            // Verify nodes are deleted
            expect(memory.getNodeByID(1)).toBeNull();
            expect(memory.getNodeByID(2)).toBeNull();

            // Verify children of node 1 are also deleted
            expect(memory.getNodeByID(3)).toBeNull();
            expect(memory.getNodeByID(4)).toBeNull();

            // Verify node 0 is updated
            expect(memory.getNodeByID(0)?.leftNodeID).toBeNull();

            // Verify head and tail
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(0);
        });

        it("should delete all nodes when all IDs are provided", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2

            memory.deleteMultipleNodes([0, 1, 2]);

            expect(memory.getNodeByID(0)).toBeNull();
            expect(memory.getNodeByID(1)).toBeNull();
            expect(memory.getNodeByID(2)).toBeNull();
            expect(memory.HEAD_NODE_ID).toBeNull();
            expect(memory.TAIL_NODE_ID).toBeNull();
        });

        it("should handle empty array gracefully", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.deleteMultipleNodes([]);

            expect(memory.getNodeByID(0)).not.toBeNull();
            expect(memory.getNodeByID(1)).not.toBeNull();
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(1);
        });

        it("should handle non-existent node IDs gracefully", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.deleteMultipleNodes([999, 1000]);

            expect(memory.getNodeByID(0)).not.toBeNull();
            expect(memory.getNodeByID(1)).not.toBeNull();
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(1);
        });

        it("should delete nodes in order and maintain correct structure", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2
            memory.appendNode(node_d); // 3

            // Delete first and last nodes
            memory.deleteMultipleNodes([0, 3]);

            expect(memory.getNodeByID(0)).toBeNull();
            expect(memory.getNodeByID(3)).toBeNull();
            expect(memory.getNodeByID(1)).not.toBeNull();
            expect(memory.getNodeByID(2)).not.toBeNull();

            expect(memory.HEAD_NODE_ID).toBe(1);
            expect(memory.TAIL_NODE_ID).toBe(2);

            expect(memory.getNodeByID(1)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(1);
        });
    });

    describe("appendNode", () => {
        it("should append first node and set as head and tail", () => {
            memory.appendNode(node_a);

            expect(memory.getNodeByID(0)).not.toBeNull();
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(0);

            expect(memory.ArrayRepresentation.length).toBe(1);

            expect(memory.getNodeByID(0)?.parentNodeID).toBeNull();
            expect(memory.getNodeByID(0)?.leftNodeID).toBeNull();
        });

        it("should append multiple nodes in sequence", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);
            memory.appendNode(node_c);

            expect(memory.getNodeByID(0)?.leftNodeID).toBe(1);
            expect(memory.getNodeByID(1)?.parentNodeID).toBe(0);
            expect(memory.getNodeByID(1)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(1);
            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(2);
        });
    });

    describe("insertNodeBelow", () => {
        it("should insert node below target in middle", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2

            memory.insertNodeBelow(node_d, 1); // Insert d below b

            expect(memory.getNodeByID(1)?.leftNodeID).toBe(3);
            expect(memory.getNodeByID(3)?.parentNodeID).toBe(1);
            expect(memory.getNodeByID(3)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(3);
        });

        it("should insert node below tail (should append)", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.insertNodeBelow(node_c, 1);

            expect(memory.TAIL_NODE_ID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(1);
        });

        it("should handle inserting below non-existent node", () => {
            memory.appendNode(node_a);

            memory.insertNodeBelow(node_b, 999);

            expect(memory.getNodeByID(1)).toBeNull();
        });
    });

    describe("insertMultipleNodesBelow", () => {
        it("should insert multiple nodes in order", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.insertMultipleNodesBelow([node_c, node_d, node_e], 0);

            expect(memory.getNodeByID(0)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(0);
            expect(memory.getNodeByID(2)?.leftNodeID).toBe(3);
            expect(memory.getNodeByID(3)?.leftNodeID).toBe(4);
            expect(memory.getNodeByID(4)?.leftNodeID).toBe(1);
        });

        it("should handle empty array", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);

            memory.insertMultipleNodesBelow([], 0);

            expect(memory.ArrayRepresentation.length).toBe(2);
        });
    });

    describe("moveNodeBelow", () => {
        it("should move node to new position", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2
            memory.appendNode(node_d); // 3

            memory.moveNodeBelow(3, 0); // Move d below a

            expect(memory.getNodeByID(0)?.leftNodeID).toBe(3);
            expect(memory.getNodeByID(3)?.parentNodeID).toBe(0);
            expect(memory.getNodeByID(3)?.leftNodeID).toBe(1);
            expect(memory.getNodeByID(1)?.parentNodeID).toBe(3);
        });

        it("should handle moving non-existent node", () => {
            memory.appendNode(node_a);

            memory.moveNodeBelow(999, 0);

            expect(memory.ArrayRepresentation.length).toBe(1);
        });
    });

    describe("moveMultipleNodesBelow", () => {
        it("should move multiple nodes below target", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2
            memory.appendNode(node_d); // 3

            memory.moveMultipleNodesBelow([2, 3], 0);

            expect(memory.getNodeByID(2)?.ENTITY).toBe(node_c.ENTITY);
            expect(memory.getNodeByID(3)?.ENTITY).toBe(node_d.ENTITY);
        });

        it("should handle empty array", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);

            memory.moveMultipleNodesBelow([], 0);

            expect(memory.ArrayRepresentation.length).toBe(2);
        });
    });

    describe("insertChildNode", () => {
        it("should insert node as child of target", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.insertChildNode(node_c, 0);

            expect(memory.getNodeByID(0)?.rightNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.parentNodeID).toBe(0);
        });

        it("should push down existing child as sibling", () => {
            memory.appendNode(node_a); // 0
            memory.insertChildNode(node_b, 0); // 1
            memory.insertChildNode(node_c, 0); // 2

            expect(memory.getNodeByID(0)?.rightNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.leftNodeID).toBe(1);
            expect(memory.getNodeByID(1)?.parentNodeID).toBe(2);
        });

        it("should handle inserting child to non-existent node", () => {
            memory.insertChildNode(node_a, 999);

            expect(memory.ArrayRepresentation.length).toBe(0);
        });
    });

    describe("appendChildNode", () => {
        it("should move node as child of target", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2

            memory.appendChildNode(2, 0);

            expect(memory.getNodeByID(0)?.rightNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.ENTITY).toBe(node_c.ENTITY);
        });

        it("should handle non-existent source node", () => {
            memory.appendNode(node_a);

            memory.appendChildNode(999, 0);

            expect(memory.ArrayRepresentation.length).toBe(1);
        });
    });

    describe("appendMultipleChildNodes", () => {
        it("should move multiple nodes as children", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2
            memory.appendNode(node_d); // 3

            memory.appendMultipleChildNodes(0, [2, 3]);

            expect(memory.getNodeByID(0)?.rightNodeID).not.toBeNull();
        });

        it("should handle empty array", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);

            memory.appendMultipleChildNodes(0, []);

            expect(memory.ArrayRepresentation.length).toBe(2);
        });
    });

    describe("duplicateNode", () => {
        it("should create duplicate below original", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1

            memory.duplicateNode(0);

            expect(memory.getNodeByID(2)?.ENTITY).toBe(node_a.ENTITY);
            expect(memory.getNodeByID(0)?.leftNodeID).toBe(2);
            expect(memory.getNodeByID(2)?.leftNodeID).toBe(1);
        });

        it("should handle duplicating non-existent node", () => {
            memory.appendNode(node_a);

            memory.duplicateNode(999);

            expect(memory.ArrayRepresentation.length).toBe(1);
        });
    });

    describe("duplicateMultipleNodes", () => {
        it("should duplicate multiple nodes", () => {
            memory.appendNode(node_a); // 0
            memory.appendNode(node_b); // 1
            memory.appendNode(node_c); // 2

            memory.duplicateMultipleNodes([0, 1]);

            expect(memory.getNodeByID(3)?.ENTITY).toBe(node_a.ENTITY);
            expect(memory.getNodeByID(4)?.ENTITY).toBe(node_b.ENTITY);
            expect(memory.ArrayRepresentation.length).toBe(5);
        });

        it("should handle empty array", () => {
            memory.appendNode(node_a);

            memory.duplicateMultipleNodes([]);

            expect(memory.ArrayRepresentation.length).toBe(1);
        });
    });

    describe("clearMemory", () => {
        it("should clear all nodes and reset state", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);
            memory.appendNode(node_c);

            memory.clearMemory();

            expect(memory.ArrayRepresentation.length).toBe(0);
            expect(memory.HEAD_NODE_ID).toBeNull();
            expect(memory.TAIL_NODE_ID).toBeNull();
        });

        it("should allow reuse after clearing", () => {
            memory.appendNode(node_a);
            memory.clearMemory();
            memory.appendNode(node_b);

            expect(memory.HEAD_NODE_ID).toBe(0);
            expect(memory.TAIL_NODE_ID).toBe(0);
            expect(memory.ArrayRepresentation.length).toBe(1);
        });
    });

    describe("exportMemory", () => {
        it("should export memory state as JSON", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);

            const exported = memory.exportMemory();
            const parsed = JSON.parse(exported);

            expect(parsed.headID).toBe(0);
            expect(parsed.tailID).toBe(1);
            expect(parsed.nodes.length).toBe(2);
            expect(parsed.nodes[0]).not.toBeNull();
            expect(parsed.nodes[1]).not.toBeNull();
        });

        it("should handle empty memory export", () => {
            const exported = memory.exportMemory();
            const parsed = JSON.parse(exported);

            expect(parsed.headID).toBeNull();
            expect(parsed.tailID).toBeNull();
            expect(parsed.nodes.length).toBe(0);
        });

        it("should include null for deleted nodes", () => {
            memory.appendNode(node_a);
            memory.appendNode(node_b);
            memory.appendNode(node_c);
            memory.deleteNode(1);

            const exported = memory.exportMemory();
            const parsed = JSON.parse(exported);

            expect(parsed.nodes[1]).toBeNull();
            expect(parsed.nodes[0]).not.toBeNull();
            expect(parsed.nodes[2]).not.toBeNull();
        });
    });
});
