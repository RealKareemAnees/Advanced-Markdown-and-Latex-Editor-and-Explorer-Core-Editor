import { ClearMemoryHandlerStrategy } from "./ClearMemoryHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("ClearMemoryHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new ClearMemoryHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
