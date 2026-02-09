import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Strategy for duplicating a single node.
 * Uses the first selected node ID from selectedNodes parameter.
 */
export class DuplicateNodeHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        _targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (!selectedNodes || selectedNodes.length === 0) {
            throw new Error("No node selected for duplication");
        }
        return memory.duplicateNode(selectedNodes[0]).ArrayRepresentation;
    }
}
