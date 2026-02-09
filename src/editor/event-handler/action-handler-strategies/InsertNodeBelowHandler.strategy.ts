import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

/**
 * Strategy for inserting a new node below a target node.
 * Uses constructor data for the node to insert and targetNode parameter for position.
 */
export class InsertNodeBelowHandlerStrategy implements ActionHandlerStrategyInterface {
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
            throw new Error("No target node specified");
        }
        return memory.insertNodeBelow(this.data.node, targetNode)
            .ArrayRepresentation;
    }
}
