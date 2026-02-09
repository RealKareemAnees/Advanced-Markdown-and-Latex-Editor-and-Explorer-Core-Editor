import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class MoveMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodeIDs: number[]; targetNodeID: number };
    constructor(data: { nodeIDs: number[]; targetNodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.moveMultipleNodesBelow(
            this.data.nodeIDs,
            this.data.targetNodeID,
        ).ArrayRepresentation;
    }
}
