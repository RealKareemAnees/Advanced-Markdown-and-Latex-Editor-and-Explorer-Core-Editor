import { DuplicateMultipleNodesHandlerStrategy } from "./DuplicateMultipleNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DuplicateMultipleNodesHandlerStrategy", () => {
    it("should duplicate all selected nodes", () => {
        const strategy = new DuplicateMultipleNodesHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1, 2]);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no nodes are selected", () => {
        const strategy = new DuplicateMultipleNodesHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No nodes selected for duplication",
        );
    });
});
