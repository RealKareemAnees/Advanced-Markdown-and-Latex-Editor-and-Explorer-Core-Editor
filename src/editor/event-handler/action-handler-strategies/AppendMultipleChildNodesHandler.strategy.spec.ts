import { AppendMultipleChildNodesHandlerStrategy } from "./AppendMultipleChildNodesHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("AppendMultipleChildNodesHandlerStrategy", () => {
    it("should append selected nodes as children of target node", () => {
        const strategy = new AppendMultipleChildNodesHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [2, 3], 1);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no child nodes are selected", () => {
        const strategy = new AppendMultipleChildNodesHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [], 1)).toThrow(
            "No child nodes selected",
        );
    });

    it("should throw error when no parent node is specified", () => {
        const strategy = new AppendMultipleChildNodesHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [2, 3])).toThrow(
            "No parent node specified",
        );
    });
});
