import { AppendChildNodeHandlerStrategy } from "./AppendChildNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("AppendChildNodeHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new AppendChildNodeHandlerStrategy({
            parentNodeID: 1,
            childNodeID: 2,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
