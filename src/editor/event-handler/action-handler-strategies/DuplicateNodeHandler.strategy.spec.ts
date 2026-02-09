import { DuplicateNodeHandlerStrategy } from "./DuplicateNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("DuplicateNodeHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new DuplicateNodeHandlerStrategy({ nodeID: 1 });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
