import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class MoveNodeBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodeID: number; targetNodeID: number };
    constructor(data: { nodeID: number; targetNodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.moveNodeBelow(this.data.nodeID, this.data.targetNodeID)
            .ArrayRepresentation;
    }
}
