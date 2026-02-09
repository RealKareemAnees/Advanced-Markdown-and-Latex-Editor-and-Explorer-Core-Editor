import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

/**
 * Strategy for inserting a new child node to a target parent node.
 * Uses constructor data for the node to insert and targetNode parameter for the parent.
 */
export class InsertChildNodeHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { node: NodeInterface };
    constructor(data: { node: NodeInterface }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        _selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (targetNode === undefined) {
            throw new Error("No target parent node specified");
        }
        return memory.insertChildNode(this.data.node, targetNode)
            .ArrayRepresentation;
    }
}
