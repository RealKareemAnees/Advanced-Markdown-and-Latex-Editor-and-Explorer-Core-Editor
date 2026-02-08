import type { HistoryInterface } from "../../types/History.interface";
import type { NodeInterface } from "../../types/Node.interface";

export class History implements HistoryInterface {
    /**
     * the key s the IDof the node, thee value is the state of the node at a given change, this is used to store the state of the nodes at each change, this is critical for undo and redo operations
     * this increases memory usage but optimizes the performance of undo and redo operations, as we only need to apply the changes to the nodes that were affected by the change, instead of applying the changes to all nodes in the current state
     * the first elementin the tuple is the index of the last state of change, this is used to undo the change, the second element in the tuple is the array of states
     */
    private _map: Map<number, [number, NodeInterface[]]> = new Map();

    /**
     * the history stack, this is used to store the order of the changes, this is critical for undo and redo operations, as we need to know the order of the changes to apply them correctly.
     * if the value is a tuple of two numbers, it represents the ID of the node and the index of the state in the map, this is used for single node changes, if the value is a tuple of two arrays, it represents the IDs of the nodes and the indices of their states in the map, this is used for multiple nodes changes,
     * each ID has a crossponding state in the second array, the index of the state in the second array is the same as the index of the ID in the first array, this is used to apply the changes to the correct nodes when undoing and redoing changes
     */
    private _log: [number[], number[]][] = [[[], []]]; // Initialize with an empty state

    /**
     * Current position in history (0-based index into _log)
     * Points to the log entry representing the current state
     */
    private _currentIndex: number = 0;

    /**
     * Creates a new History instance
     * @param initial - Optional initial state to load into history
     */
    constructor(initial?: NodeInterface[]) {
        if (initial && initial.length > 0) {
            this.load(initial);
        }
    }

    get CURRENT(): NodeInterface[] {
        let current: NodeInterface[] = [];
        for (const [, [currentIndex, states]] of this._map) {
            // Get the state at the current index for this node
            const currentState = states[currentIndex];
            if (currentState) {
                current.push(currentState); // the state at currentIndex is the current state
            }
        }
        return current;
    }

    get FORWARD_LENGTH(): number {
        return this._log.length - 1 - this._currentIndex;
    }

    get BACKWARD_LENGTH(): number {
        return this._currentIndex; // Number of states that can be undone is the current index (since it's 0-based)
    }

    /**
     * Fills the current state of the history stack with the given memory
     * This is used to initialize the history stack with the current state of the application
     * @param memory - The array of nodes to initialize the history with
     */
    load(memory: NodeInterface[]): void {
        if (!memory || memory.length === 0) {
            return; // No nodes to load, leave history empty
        }

        // Clear existing history if present
        if (this._map.size > 0 || this._log.length > 0) {
            this._map.clear();
            this._log = [];
            this._currentIndex = 0;
        }

        // Initialize each node with its initial state at index 0
        memory.forEach((node) => {
            if (!node || typeof node.ID !== "number") {
                throw new Error("Invalid node: missing or invalid ID");
            }
            const id = node.ID;
            this._map.set(id, [0, [node]]);
        });

        // Log the initial state and set current index to 0
        this._log.push([memory.map((node) => node.ID), memory.map(() => 0)]);
        this._currentIndex = 1; // Set to 1 to indicate that we have one state in history (the initial state)
    }

    /**
     * Records a new change to the history stack
     * @param nodes - The nodes being affected by this change
     */
    do(nodes: NodeInterface[]): void {
        if (!nodes || nodes.length === 0) {
            return; // No nodes to record, do nothing
        }

        // If we're in the middle of history, clear forward history
        if (this._currentIndex < this._log.length - 1) {
            this._log = this._log.slice(0, this._currentIndex + 1);
        }

        let ids: number[] = [];
        let newStateIndexes: number[] = [];

        nodes.forEach((node) => {
            if (!node || typeof node.ID !== "number") {
                throw new Error("Invalid node: missing or invalid ID");
            }

            const id = node.ID;
            ids.push(id);

            // Get the current state index for this node, default to -1 if not found
            const entry = this._map.get(id);
            const currentStateIndex = entry ? entry[0] : -1;
            const states = entry ? entry[1] : [];

            // Remove future states if we're in the middle of history
            const trimmedStates = states.slice(0, currentStateIndex + 1);

            // Add the new state
            const newIndex = trimmedStates.length;
            trimmedStates.push(node);

            newStateIndexes.push(newIndex);
            this._map.set(id, [newIndex, trimmedStates]);
        });

        // Add to log and move current index forward
        this._log.push([ids, newStateIndexes]);
        this._currentIndex++;
    }

    /**
     * Undoes the last change, moving backward in history
     */
    undo(): NodeInterface[] {
        if (this._currentIndex < 1) return []; // no more states to undo

        // Move backward in history
        this._currentIndex--;

        // Apply the state at the new current index
        const [ids, stateIndexs] = this._log[this._currentIndex];
        ids.forEach((id, index) => {
            const stateIndex = stateIndexs[index];
            const states = this._map.get(id)?.[1];
            if (states && states[stateIndex]) {
                this._map.set(id, [stateIndex, states]);
            }
        });
        return this.CURRENT;
    }

    /**
     * Redoes the last undone change, moving forward in history
     */
    redo(): NodeInterface[] {
        if (this._currentIndex >= this._log.length - 1) return []; // no more states to redo

        // Move forward in history
        this._currentIndex++;

        // Apply the state at the new current index
        const [ids, stateIndexs] = this._log[this._currentIndex];
        ids.forEach((id, index) => {
            const stateIndex = stateIndexs[index];
            const states = this._map.get(id)?.[1];
            if (states && states[stateIndex]) {
                this._map.set(id, [stateIndex, states]);
            }
        });
        return this.CURRENT;
    }

    /**
     * Exports the history as a JSON string
     * @returns JSON string representing the complete history stack
     */
    export(): string {
        const history = this._log.map(([ids, stateIndexs]) => {
            return ids
                .map((id, index) => {
                    const stateIndex = stateIndexs[index];
                    const states = this._map.get(id)?.[1];
                    if (states && states[stateIndex]) {
                        return {
                            id,
                            state: states[stateIndex],
                        };
                    }
                    return null;
                })
                .filter((item) => item !== null); // Remove null entries
        });
        return JSON.stringify(history);
    }
}
