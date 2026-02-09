import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { MemoryInterface } from "../../../types/Memory.interface";

type T = {
    memory: MemoryInterface;
    parentNodeID: number;
    childNodeID: number;
};

export class AppendChildNodeHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        return data.memory.appendChildNode(data.parentNodeID, data.childNodeID).ArrayRepresentation;
    }
}
