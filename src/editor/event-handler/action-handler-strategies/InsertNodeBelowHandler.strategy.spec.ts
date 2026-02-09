import { InsertNodeBelowHandlerStrategy } from "./InsertNodeBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("InsertNodeBelowHandlerStrategy", () => {
    it("should insert node below target node", () => {
        const strategy = new InsertNodeBelowHandlerStrategy({
            node: {} as any,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory, undefined, 1);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no target node is specified", () => {
        const strategy = new InsertNodeBelowHandlerStrategy({
            node: {} as any,
        });
        const memory = new MockMemory();
        expect(() => strategy.handle(memory)).toThrow(
            "No target node specified",
        );
    });
});
