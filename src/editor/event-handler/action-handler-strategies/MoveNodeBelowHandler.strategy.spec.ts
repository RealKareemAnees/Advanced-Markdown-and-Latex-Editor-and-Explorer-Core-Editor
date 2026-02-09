import { MoveNodeBelowHandlerStrategy } from "./MoveNodeBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("MoveNodeBelowHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new MoveNodeBelowHandlerStrategy({
            nodeID: 1,
            targetNodeID: 2,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
