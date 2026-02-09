import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

export class UpdateHandlerStrategy implements ActionHandlerStrategyInterface {
    private data: { nodes: NodeInterface[] };
    constructor(data: { nodes: NodeInterface[] }) {
        this.data = data;
    }
    handle(
        memory: MemoryInterface,
        _selectedNodes?: NodeInterface["ID"][] | undefined,
        _targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        return memory.update(this.data.nodes).ArrayRepresentation;
    }
}
