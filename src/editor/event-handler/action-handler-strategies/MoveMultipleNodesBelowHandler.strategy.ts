import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Strategy for moving multiple nodes below a target node.
 * Uses all selected node IDs from selectedNodes and targetNode parameter.
 */
export class MoveMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (!selectedNodes || selectedNodes.length === 0) {
            throw new Error("No nodes selected to move");
        }
        if (targetNode === undefined) {
            throw new Error("No target node specified");
        }
        return memory.moveMultipleNodesBelow(selectedNodes, targetNode)
            .ArrayRepresentation;
    }
}
