import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class ExportMemoryHandlerStrategy implements ActionHandlerStrategyInterface {
    constructor() {}
    handle(
        memory: MemoryInterface,
        _selectedNodes?: NodeInterface["ID"][] | undefined,
        _targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"] {
        memory.exportMemory();
        return memory.ArrayRepresentation;
    }
}
