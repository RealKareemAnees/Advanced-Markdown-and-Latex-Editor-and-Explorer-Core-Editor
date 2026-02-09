import { InsertChildNodeHandlerStrategy } from "./InsertChildNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertChildNodeHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new InsertChildNodeHandlerStrategy({
            node: {} as any,
            targetNodeID: 1,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
