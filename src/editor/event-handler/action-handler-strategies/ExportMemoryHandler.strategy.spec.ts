import { ExportMemoryHandlerStrategy } from "./ExportMemoryHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("ExportMemoryHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new ExportMemoryHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
