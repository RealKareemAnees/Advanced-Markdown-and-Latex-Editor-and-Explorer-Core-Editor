/**
 * Unit tests for Node class
 * Tests node initialization, getters, setters, and entity reference
 */

import { Node } from "./Node";
import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
import { BlockTypesEnum } from "../../types/BlockTypes.enum";

/**
 * Creates a mock entity for testing
 */
function createMockEntity(
    type: BlockTypesEnum = BlockTypesEnum.PARAGRAPH,
    data: string = "test data",
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

describe("Node", () => {
    /**
     * Test initialization and construction
     */
    describe("Initialization and Construction", () => {
        it("should construct with default parameters", () => {
            const node = new Node();

            expect(node.ID).toBe(0);
            expect(node.parentNodeID).toBeNull();
            expect(node.leftNodeID).toBeNull();
            expect(node.rightNodeID).toBeNull();
        });

        it("should construct with ID parameter", () => {
            const node = new Node(5);

            expect(node.ID).toBe(5);
            expect(node.parentNodeID).toBeNull();
        });

        it("should construct with ID and parentNodeID", () => {
            const node = new Node(3, 1);

            expect(node.ID).toBe(3);
            expect(node.parentNodeID).toBe(1);
        });

        it("should construct with all parameters including entity", () => {
            const entity = createMockEntity();
            const node = new Node(2, 1, entity);

            expect(node.ID).toBe(2);
            expect(node.parentNodeID).toBe(1);
            expect(node.ENTITY).toBe(entity);
        });

        it("should handle null parentNodeID explicitly", () => {
            const node = new Node(5, null);

            expect(node.ID).toBe(5);
            expect(node.parentNodeID).toBeNull();
        });
    });

    /**
     * Test ID getter and setter
     */
    describe("ID Property", () => {
        it("should get ID correctly", () => {
            const node = new Node(10);

            expect(node.ID).toBe(10);
        });

        it("should set ID correctly", () => {
            const node = new Node(5);
            node.ID = 15;

            expect(node.ID).toBe(15);
        });

        it("should allow ID to be 0", () => {
            const node = new Node(0);

            expect(node.ID).toBe(0);
        });

        it("should handle negative IDs", () => {
            const node = new Node(-1);

            expect(node.ID).toBe(-1);
        });
    });

    /**
     * Test parent, left, and right node ID properties
     */
    describe("Node Relationship Properties", () => {
        it("should get and set parentNodeID", () => {
            const node = new Node();

            node.parentNodeID = 5;
            expect(node.parentNodeID).toBe(5);
        });

        it("should get and set leftNodeID", () => {
            const node = new Node();

            node.leftNodeID = 10;
            expect(node.leftNodeID).toBe(10);
        });

        it("should get and set rightNodeID", () => {
            const node = new Node();

            node.rightNodeID = 15;
            expect(node.rightNodeID).toBe(15);
        });

        it("should allow setting relationship IDs to null", () => {
            const node = new Node(1, 2);
            node.leftNodeID = 3;
            node.rightNodeID = 4;

            node.parentNodeID = null;
            node.leftNodeID = null;
            node.rightNodeID = null;

            expect(node.parentNodeID).toBeNull();
            expect(node.leftNodeID).toBeNull();
            expect(node.rightNodeID).toBeNull();
        });

        it("should initialize all relationship IDs as null by default", () => {
            const node = new Node();

            expect(node.parentNodeID).toBeNull();
            expect(node.leftNodeID).toBeNull();
            expect(node.rightNodeID).toBeNull();
        });
    });

    /**
     * Test entity reference
     */
    describe("Entity Reference", () => {
        it("should return the entity reference", () => {
            const entity = createMockEntity();
            const node = new Node(1, null, entity);

            expect(node.ENTITY).toBe(entity);
        });

        it("should access entity TYPE property", () => {
            const entity = createMockEntity(BlockTypesEnum.H1);
            const node = new Node(1, null, entity);

            expect(node.ENTITY.TYPE).toBe(BlockTypesEnum.H1);
        });

        it("should modify entity TYPE property", () => {
            const entity = createMockEntity(BlockTypesEnum.PARAGRAPH);
            const node = new Node(1, null, entity);

            node.ENTITY.TYPE = BlockTypesEnum.H2;

            expect(node.ENTITY.TYPE).toBe(BlockTypesEnum.H2);
        });

        it("should access entity DATA property", () => {
            const entity = createMockEntity(
                BlockTypesEnum.PARAGRAPH,
                "Hello World",
            );
            const node = new Node(1, null, entity);

            expect(node.ENTITY.DATA).toBe("Hello World");
        });

        it("should modify entity DATA property", () => {
            const entity = createMockEntity(
                BlockTypesEnum.PARAGRAPH,
                "Initial",
            );
            const node = new Node(1, null, entity);

            node.ENTITY.DATA = "Updated";

            expect(node.ENTITY.DATA).toBe("Updated");
        });

        it("should access entity HTML_ELEMENT property", () => {
            const entity = createMockEntity();
            const node = new Node(1, null, entity);

            expect(node.ENTITY.HTML_ELEMENT).toBe(entity.HTML_ELEMENT);
            expect(node.ENTITY.HTML_ELEMENT).toBeDefined();
        });
    });

    /**
     * Test entity properties with various types
     */
    describe("Entity Property Types", () => {
        it("should handle different block types", () => {
            const types = [
                BlockTypesEnum.H1,
                BlockTypesEnum.PARAGRAPH,
                BlockTypesEnum.CHECKBOX,
                BlockTypesEnum.CODE_BLOCK,
            ];

            types.forEach((type) => {
                const entity = createMockEntity(type);
                const node = new Node(1, null, entity);
                expect(node.ENTITY.TYPE).toBe(type);
            });
        });

        it("should handle empty string data", () => {
            const entity = createMockEntity(BlockTypesEnum.PARAGRAPH, "");
            const node = new Node(1, null, entity);

            expect(node.ENTITY.DATA).toBe("");
        });

        it("should handle multiline data", () => {
            const multilineData = "Line 1\nLine 2\nLine 3";
            const entity = createMockEntity(
                BlockTypesEnum.CODE_BLOCK,
                multilineData,
            );
            const node = new Node(1, null, entity);

            expect(node.ENTITY.DATA).toBe(multilineData);
        });

        it("should handle special characters in data", () => {
            const specialData = "<div>Test & \"quotes\" 'more'</div>";
            const entity = createMockEntity(BlockTypesEnum.HTML, specialData);
            const node = new Node(1, null, entity);

            expect(node.ENTITY.DATA).toBe(specialData);
        });

        it("should access entity OPTIONS property", () => {
            const entity = createMockEntity();
            const node = new Node(1, null, entity);

            expect(node.ENTITY.OPTIONS).toBeDefined();
            expect(typeof node.ENTITY.OPTIONS).toBe("object");
        });
    });

    /**
     * Test node with null entity
     */
    describe("Null Entity Handling", () => {
        it("should handle null entity in constructor", () => {
            const node = new Node(1, null, null);

            expect(node.ID).toBe(1);
            expect(node.ENTITY).toBeNull();
        });
    });

    /**
     * Test multiple nodes with relationships
     */
    describe("Multiple Node Relationships", () => {
        it("should create linked chain of nodes", () => {
            const entity1 = createMockEntity();
            const entity2 = createMockEntity();
            const entity3 = createMockEntity();

            const node1 = new Node(1, null, entity1);
            const node2 = new Node(2, 1, entity2);
            const node3 = new Node(3, 2, entity3);

            node1.leftNodeID = 2;
            node2.leftNodeID = 3;

            expect(node1.leftNodeID).toBe(2);
            expect(node2.parentNodeID).toBe(1);
            expect(node2.leftNodeID).toBe(3);
            expect(node3.parentNodeID).toBe(2);
        });

        it("should create tree with nested children", () => {
            const parent = new Node(1);
            const child1 = new Node(2, 1);
            const child2 = new Node(3, 1);

            parent.rightNodeID = 2;
            child1.leftNodeID = 3;

            expect(parent.rightNodeID).toBe(2);
            expect(child1.parentNodeID).toBe(1);
            expect(child1.leftNodeID).toBe(3);
            expect(child2.parentNodeID).toBe(1);
        });
    });
});
