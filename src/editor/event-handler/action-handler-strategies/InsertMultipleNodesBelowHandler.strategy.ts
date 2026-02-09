import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

type T = {
    memory: MemoryInterface;
    nodes: NodeInterface[];
    targetNodeID: number;
};

export class InsertMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        return data.memory.insertMultipleNodesBelow(data.nodes, data.targetNodeID).ArrayRepresentation;
    }
}
