import { DeleteNodeHandlerStrategy } from "./DeleteNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DeleteNodeHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new DeleteNodeHandlerStrategy({ nodeID: 1 });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
