import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

export class InsertNodeBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { node: NodeInterface; targetNodeID: number };
    constructor(data: { node: NodeInterface; targetNodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.insertNodeBelow(this.data.node, this.data.targetNodeID)
            .ArrayRepresentation;
    }
}
