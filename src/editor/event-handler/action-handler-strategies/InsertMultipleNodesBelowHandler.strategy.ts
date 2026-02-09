import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

/**
 * Strategy for inserting multiple new nodes below a target node.
 * Uses constructor data for the nodes to insert and targetNode parameter for position.
 */
export class InsertMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodes: NodeInterface[] };
    constructor(data: { nodes: NodeInterface[] }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        _selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (targetNode === undefined) {
            throw new Error("No target node specified");
        }
        return memory.insertMultipleNodesBelow(this.data.nodes, targetNode)
            .ArrayRepresentation;
    }
}
