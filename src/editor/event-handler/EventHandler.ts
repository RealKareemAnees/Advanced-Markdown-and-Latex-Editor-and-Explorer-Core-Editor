import type { ContainerInterface } from "../../types/Container.interface";
import type { HistoryInterface } from "../../types/History.interface";
import type { MemoryInterface } from "../../types/Memory.interface";

export class EventHandler {
    constructor(memory: MemoryInterface, history: HistoryInterface) {}

    public selected(selected: { order: number; id: number }): EventHandler {
        return this;
    }

    public deselected(selected: { order: number; id: number }): EventHandler {
        return this;
    }

    public targeted(targeted: { order: number; id: number }): EventHandler {
        return this;
    }

    public action(action: any): EventHandler {
        return this;
    }
}
