import { AppendChildNodeHandlerStrategy } from "./AppendChildNodeHandler.strategy";
import { MockMemory } from "./memory.mock";

describe("AppendChildNodeHandlerStrategy", () => {
    it("should append selected node as child of target node", () => {
        const strategy = new AppendChildNodeHandlerStrategy();
        const memory = new MockMemory();
        const result = strategy.handle(memory, [2], 1);
        expect(result).toBe(memory.ArrayRepresentation);
    });

    it("should throw error when no child node is selected", () => {
        const strategy = new AppendChildNodeHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [], 1)).toThrow(
            "No child node selected",
        );
    });

    it("should throw error when no parent node is specified", () => {
        const strategy = new AppendChildNodeHandlerStrategy();
        const memory = new MockMemory();
        expect(() => strategy.handle(memory, [2])).toThrow(
            "No parent node specified",
        );
    });
});
