import { GetNodeByIDHandlerStrategy } from "./GetNodeByIDHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("GetNodeByIDHandlerStrategy", () => {
    it("should get node by ID from selected nodes", () => {
        const strategy = new GetNodeByIDHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1]);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no node ID is provided", () => {
        const strategy = new GetNodeByIDHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow("No node ID provided");
    });
});
