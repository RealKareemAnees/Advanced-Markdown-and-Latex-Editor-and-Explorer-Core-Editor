import { DeleteNodeHandlerStrategy } from "./DeleteNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DeleteNodeHandlerStrategy", () => {
    it("should delete the first selected node", () => {
        const strategy = new DeleteNodeHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1]);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no nodes are selected", () => {
        const strategy = new DeleteNodeHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No node selected for deletion",
        );
    });
});
