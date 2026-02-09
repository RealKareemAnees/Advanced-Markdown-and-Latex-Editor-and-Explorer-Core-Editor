import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class AppendMultipleChildNodesHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { parentNodeID: number; childNodeIDs: number[] };
    constructor(data: { parentNodeID: number; childNodeIDs: number[] }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.appendMultipleChildNodes(
            this.data.parentNodeID,
            this.data.childNodeIDs,
        ).ArrayRepresentation;
    }
}
