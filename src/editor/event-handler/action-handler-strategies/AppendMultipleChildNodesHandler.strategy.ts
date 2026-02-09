import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Strategy for appending multiple child nodes to a parent node.
 * Uses all selected node IDs as children and targetNode as parent.
 */
export class AppendMultipleChildNodesHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (!selectedNodes || selectedNodes.length === 0) {
            throw new Error("No child nodes selected");
        }
        if (targetNode === undefined) {
            throw new Error("No parent node specified");
        }
        return memory.appendMultipleChildNodes(targetNode, selectedNodes)
            .ArrayRepresentation;
    }
}
