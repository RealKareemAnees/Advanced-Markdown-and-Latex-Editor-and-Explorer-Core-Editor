import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Strategy for getting a node by ID.
 * Uses the first selected node ID from selectedNodes parameter.
 * This is primarily a query operation that doesn't modify memory.
 */
export class GetNodeByIDHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        _targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (!selectedNodes || selectedNodes.length === 0) {
            throw new Error("No node ID provided");
        }
        memory.getNodeByID(selectedNodes[0]);
        return memory.ArrayRepresentation;
    }
}
