import type { MemoryInterface } from "./Memory.interface";

/**
 * Interface for action handler strategies.
 * the T generic type represents the type of data that the strategy needs in advance
 */
export interface ActionHandlerStrategyInterface<T> {
    handle(data: T): MemoryInterface["ArrayRepresentation"];
}
