import { AppendNodeHandlerStrategy } from "./AppendNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("AppendNodeHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new AppendNodeHandlerStrategy({ node: {} as any });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
