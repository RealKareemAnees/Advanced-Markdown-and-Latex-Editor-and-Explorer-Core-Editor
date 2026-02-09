import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class GetNodeByIDHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodeID: number };
    constructor(data: { nodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        memory.getNodeByID(this.data.nodeID);
        return memory.ArrayRepresentation;
    }
}
