import { InsertMultipleNodesBelowHandlerStrategy } from "./InsertMultipleNodesBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertMultipleNodesBelowHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new InsertMultipleNodesBelowHandlerStrategy({
            nodes: [],
            targetNodeID: 1,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
