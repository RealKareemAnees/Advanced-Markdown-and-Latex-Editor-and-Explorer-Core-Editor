import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

type T = {
    memory: MemoryInterface;
    parentNodeID: number;
    childNodeIDs: number[];
};

export class AppendMultipleChildNodesHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        return data.memory.appendMultipleChildNodes(data.parentNodeID, data.childNodeIDs).ArrayRepresentation;
    }
}
