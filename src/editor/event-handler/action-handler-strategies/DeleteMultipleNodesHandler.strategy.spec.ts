import { DeleteMultipleNodesHandlerStrategy } from "./DeleteMultipleNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DeleteMultipleNodesHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new DeleteMultipleNodesHandlerStrategy({
            nodeIDs: [1, 2],
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
