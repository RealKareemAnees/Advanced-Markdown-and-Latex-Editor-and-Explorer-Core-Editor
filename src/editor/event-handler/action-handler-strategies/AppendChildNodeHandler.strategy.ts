import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class AppendChildNodeHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { parentNodeID: number; childNodeID: number };
    constructor(data: { parentNodeID: number; childNodeID: number }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.appendChildNode(
            this.data.parentNodeID,
            this.data.childNodeID,
        ).ArrayRepresentation;
    }
}
