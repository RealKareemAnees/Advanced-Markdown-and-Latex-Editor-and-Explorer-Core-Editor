import type { ActionHandlerStrategyInterface } from "../../../types/ActionHandler.strategy.interface";
import type { NodeInterface } from "../../../types/Node.interface";
import type { HistoryInterface } from "../../../types/History.interface";

type T = {
    history: HistoryInterface;
    
};

export class ExportHandlerStrategy implements ActionHandlerStrategyInterface<T> {
    handle(data: T): NodeInterface[] {
        data.history.export();
        return data.history.CURRENT;
    }
}
