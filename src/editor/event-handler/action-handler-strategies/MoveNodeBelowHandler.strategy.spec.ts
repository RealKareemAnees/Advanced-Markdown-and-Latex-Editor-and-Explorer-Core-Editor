import { MoveNodeBelowHandlerStrategy } from "./MoveNodeBelowHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("MoveNodeBelowHandlerStrategy", () => {
    it("should move selected node below target node", () => {
        const strategy = new MoveNodeBelowHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [1], 2);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no node is selected", () => {
        const strategy = new MoveNodeBelowHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [], 2)).toThrow(
            "No node selected to move",
        );
    });

    it("should throw error when no target node is specified", () => {
        const strategy = new MoveNodeBelowHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [1])).toThrow(
            "No target node specified",
        );
    });
});
