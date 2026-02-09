import type { ActionHandlerStrategyInterface } from "../../types/ActionHandler.strategy.interface";
import type { ContainerInterface } from "../../types/Container.interface";
import type { HistoryInterface } from "../../types/History.interface";
import type { MemoryInterface } from "../../types/Memory.interface";
// HistoryInterface intentionally unused here

/**
 * this is reponsible for handling all events and interaction in the app, it is responsible for managing the selected nodes and the target node, and performing actions on them by calling the handle method of the action handler strategy, it also manages the history of actions by calling the do method of the history to store the new state after performing an action, and it also provides undo and redo methods to undo and redo actions respectively
 */
export class EventHandler {
    private _selected: Map<number, number> = new Map<
        ContainerInterface["ORDER"],
        ContainerInterface["NODE"]["ID"]
    >();

    private _target: {
        order: ContainerInterface["ORDER"];
        id: ContainerInterface["NODE"]["ID"];
    } | null = null;

    constructor(
        private memory: MemoryInterface,
        private history: HistoryInterface,
    ) {}

    /**
     * select nodes to perform actions on them, the selected nodes are stored in a map with the order as the key and the node id as the value
     * @param selected
     * @returns
     */
    public select(
        selected: {
            order: ContainerInterface["ORDER"];
            id: ContainerInterface["NODE"]["ID"];
        }[],
    ): EventHandler {
        selected.forEach((item) => {
            this._selected.set(item.order, item.id);
        });
        return this;
    }

    /**
     * deselect nodes to perform actions on them, the deselected nodes are removed from the map, if the selected parameter is undefined, all nodes are deselected
     * @param selected
     * @returns
     */
    public deselect(
        selected:
            | {
                  order: ContainerInterface["ORDER"];
                  id: ContainerInterface["NODE"]["ID"];
              }[]
            | undefined,
    ): EventHandler {
        if (!selected) {
            this._selected.clear();
            return this;
        }
        selected.forEach((item) => {
            this._selected.delete(item.order);
        });
        return this;
    }

    /**
     * the target where the action is performed on.
     * this is used in nesting and movement, the selected nodes are moved or nested under the target node, the target node is identified by its order and id, the order is used to determine the position of the target node in the memory, and the id is used to identify the target node in the memory
     * the target is only needed in the following actions: inserting a child node, nesting child node, moving a node below the target, otherwise actions are performed on the selected nodes without the need for a target
     * @param targeted
     * @returns
     */
    public target(targeted: {
        order: ContainerInterface["ORDER"];
        id: ContainerInterface["NODE"]["ID"];
    }): EventHandler {
        this._target = targeted;
        return this;
    }

    /**
     * submits the action to be performed on the selected nodes and the target node if needed, the action is performed by calling the handle method of the action handler strategy, the handle method takes the data needed for the action and the memory as parameters and returns the new memory array after performing the action, then the new memory array is passed to the history to be stored as a new state in the history, and finally the event handler instance is returned to allow chaining of actions
     * @param action
     * @returns
     */
    public action(action: ActionHandlerStrategyInterface): EventHandler {
        const newMemoryArray = action.handle(
            this.memory,
            Array.from(this._selected.values()),
            this._target?.id,
        ) as MemoryInterface["ArrayRepresentation"];

        this.history.do(newMemoryArray);
        return this;
    }

    undo(): EventHandler {
        this.history.undo();
        return this;
    }

    redo(): EventHandler {
        this.history.redo();
        return this;
    }
}
