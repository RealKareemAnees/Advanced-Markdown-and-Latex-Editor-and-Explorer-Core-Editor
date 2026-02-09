import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class DuplicateMultipleNodesHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodeIDs: number[] };
    constructor(data: { nodeIDs: number[] }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.duplicateMultipleNodes(this.data.nodeIDs)
            .ArrayRepresentation;
    }
}
