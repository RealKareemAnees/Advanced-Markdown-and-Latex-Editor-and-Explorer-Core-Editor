import { AppendMultipleChildNodesHandlerStrategy } from "./AppendMultipleChildNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("AppendMultipleChildNodesHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new AppendMultipleChildNodesHandlerStrategy({
            parentNodeID: 1,
            childNodeIDs: [2, 3],
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
