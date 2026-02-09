import type { MemoryInterface } from "./Memory.interface";
import type { NodeInterface } from "./Node.interface";
/**
 * Interface for action handler strategies.
 * any extra data neededfor handlining the action can be passed in the constructor of the strategy and the handle method will be called with the memory, selected nodes and target node as parameters, the handle method should return the new memory array after performing the action
 */
export interface ActionHandlerStrategyInterface {
    handle(
        memory: MemoryInterface,
        selectedNodes?: NodeInterface["ID"][] | undefined,
        targetNode?: NodeInterface["ID"] | undefined,
    ): MemoryInterface["ArrayRepresentation"];
}
