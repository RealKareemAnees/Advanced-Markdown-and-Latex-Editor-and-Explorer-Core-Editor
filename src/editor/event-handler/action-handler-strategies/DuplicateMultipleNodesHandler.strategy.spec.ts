import { DuplicateMultipleNodesHandlerStrategy } from "./DuplicateMultipleNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DuplicateMultipleNodesHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new DuplicateMultipleNodesHandlerStrategy({
            nodeIDs: [1, 2],
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
