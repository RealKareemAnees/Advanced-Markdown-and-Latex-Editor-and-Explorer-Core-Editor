import { UpdateHandlerStrategy } from "./UpdateHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("UpdateHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new UpdateHandlerStrategy({ nodes: [] });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
