import { GetNodeByIDHandlerStrategy } from "./GetNodeByIDHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("GetNodeByIDHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new GetNodeByIDHandlerStrategy({ nodeID: 1 });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
