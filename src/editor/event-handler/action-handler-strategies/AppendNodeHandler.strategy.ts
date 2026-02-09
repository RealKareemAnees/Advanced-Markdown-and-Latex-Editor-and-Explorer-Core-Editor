import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

export class AppendNodeHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { node: NodeInterface };
    constructor(data: { node: NodeInterface }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        _selectedNodes?: NodeInterface["ID"][] | undefined,
        _targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.appendNode(this.data.node).ArrayRepresentation;
    }
}
