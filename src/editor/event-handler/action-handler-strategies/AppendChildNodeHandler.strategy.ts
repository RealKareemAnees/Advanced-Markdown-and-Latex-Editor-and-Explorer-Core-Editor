import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Strategy for appending a child node to a parent node.
 * Uses the first selected node ID as child and targetNode as parent.
 */
export class AppendChildNodeHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        if (!selectedNodes || selectedNodes.length === 0) {
            throw new Error("No child node selected");
        }
        if (targetNode === undefined) {
            throw new Error("No parent node specified");
        }
        return memory.appendChildNode(targetNode, selectedNodes[0])
            .ArrayRepresentation;
    }
}
