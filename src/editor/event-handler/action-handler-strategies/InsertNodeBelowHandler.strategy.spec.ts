import { InsertNodeBelowHandlerStrategy } from "./InsertNodeBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertNodeBelowHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new InsertNodeBelowHandlerStrategy({
            node: {} as any,
            targetNodeID: 1,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
