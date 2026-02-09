import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import { MockMemory } from "./memory.mock";

export class InsertMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodes: NodeInterface[]; targetNodeID: number };
    constructor(data: { nodes: NodeInterface[]; targetNodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.insertMultipleNodesBelow(
            this.data.nodes,
            this.data.targetNodeID,
        ).ArrayRepresentation;
    }
}
describe("InsertMultipleNodesBelowHandlerStrategy", () => {
    it("should call handle and return memory array", () => {
        const strategy = new InsertMultipleNodesBelowHandlerStrategy({
            nodes: [],
            targetNodeID: 1,
        });
        const memory = new MockMemory();
        const result = strategy.handle(memory);
        expect(result).toBe(memory.ArrayRepresentation);
    });
});
