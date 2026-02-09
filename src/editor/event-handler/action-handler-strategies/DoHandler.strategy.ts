import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { HistoryInterface } from "../../../types/History.interface";

type T = {
    history: HistoryInterface;
    memorySnapshot: NodeInterface[];
};

export class DoHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        data.history.do(data.memorySnapshot);
        return data.history.CURRENT;
    }
}
