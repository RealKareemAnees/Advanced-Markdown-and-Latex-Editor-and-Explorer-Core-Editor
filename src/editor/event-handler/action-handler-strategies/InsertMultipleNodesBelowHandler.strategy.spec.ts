import { InsertMultipleNodesBelowHandlerStrategy } from "./InsertMultipleNodesBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertMultipleNodesBelowHandlerStrategy", () => {
    it("should insert multiple nodes below target node", () => {
        const strategy = new InsertMultipleNodesBelowHandlerStrategy({
            nodes: [],
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory, undefined, 1);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no target node is specified", () => {
        const strategy = new InsertMultipleNodesBelowHandlerStrategy({
            nodes: [],
        });
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No target node specified",
        );
    });
});
