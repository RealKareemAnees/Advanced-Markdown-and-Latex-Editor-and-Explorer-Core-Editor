import { InsertChildNodeHandlerStrategy } from "./InsertChildNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertChildNodeHandlerStrategy", () => {
    it("should insert child node to target parent node", () => {
        const strategy = new InsertChildNodeHandlerStrategy({
            node: {} as any,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory, undefined, 1);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no target parent node is specified", () => {
        const strategy = new InsertChildNodeHandlerStrategy({
            node: {} as any,
        });
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No target parent node specified",
        );
    });
});
