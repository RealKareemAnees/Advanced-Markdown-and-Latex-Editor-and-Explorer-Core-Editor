import { MoveMultipleNodesBelowHandlerStrategy } from "./MoveMultipleNodesBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("MoveMultipleNodesBelowHandlerStrategy", () => {
    it("should move selected nodes below target node", () => {
        const strategy = new MoveMultipleNodesBelowHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1, 2], 3);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no nodes are selected", () => {
        const strategy = new MoveMultipleNodesBelowHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [], 3)).toThrow(
            "No nodes selected to move",
        );
    });

    it("should throw error when no target node is specified", () => {
        const strategy = new MoveMultipleNodesBelowHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [1, 2])).toThrow(
            "No target node specified",
        );
    });
});
