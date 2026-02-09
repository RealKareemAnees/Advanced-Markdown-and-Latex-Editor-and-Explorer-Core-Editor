import { DeleteMultipleNodesHandlerStrategy } from "./DeleteMultipleNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DeleteMultipleNodesHandlerStrategy", () => {
    it("should delete all selected nodes", () => {
        const strategy = new DeleteMultipleNodesHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1, 2]);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no nodes are selected", () => {
        const strategy = new DeleteMultipleNodesHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No nodes selected for deletion",
        );
    });
});
