import { MoveMultipleNodesBelowHandlerStrategy } from "./MoveMultipleNodesBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("MoveMultipleNodesBelowHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new MoveMultipleNodesBelowHandlerStrategy({
            nodeIDs: [1],
            targetNodeID: 2,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
