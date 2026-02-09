import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

type T = {
    memory: MemoryInterface;
    nodeIDs: number[];
    targetNodeID: number;
};

export class MoveMultipleNodesBelowHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        return data.memory.moveMultipleNodesBelow(data.nodeIDs, data.targetNodeID).ArrayRepresentation;
    }
}
