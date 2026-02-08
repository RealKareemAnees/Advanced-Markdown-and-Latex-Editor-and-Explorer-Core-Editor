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
    private _log: [number[], number[]][] = [];

    private _currentIndex: number = 0; // the index of the current state in the history stack, this is used to determine the state of the application when undoing and redoing changes, when we do a change, we push the change to the history stack and increment the current index, when we undo a change, we decrement the current index, when we redo a change, we increment the current index

    constructor(initial?: NodeInterface[]) {
        if (initial) {
            this.load(initial);
        }
    }

    get CURRENT(): NodeInterface[] {
        let current: NodeInterface[] = [];
        for (const [id, [, states]] of this._map) {
            const last = states[states.length - 1];
            if (last) current[id] = last; // the last state of the node is the current state
        }
        return current;
    }

    get FORWARD_LENGTH(): number {
        return this._log.length - this._currentIndex;
    }

    get BACKWARD_LENGTH(): number {
        return this._currentIndex;
    }

    load(memory: NodeInterface[]): void {
        if (this._map.size > 0 || this._log.length > 0) {
            this._map.clear();
            this._log = [];
            this._currentIndex = 0;
        }
        memory.forEach((node) => {
            const id = node.ID;
            this._map.set(id, [0, [node]]);
        });

        this._currentIndex = 1;

        this._log.push([memory.map((node) => node.ID), memory.map(() => 0)]);
    }

    do(nodes: NodeInterface[]): void {
        let ids: number[] = [];
        let currentStateIndexs: number[] = [];
        nodes.forEach((node) => {
            const id = node.ID;
            ids.push(id);

            // get the index of the last state of the node, if the node is not in the map, we initialize it with an empty array, this is used to store the state of the node at each change, this is critical for undo and redo operations
            const currentStateIndex = this._map.get(id)?.[0] || -1;
            currentStateIndexs.push(currentStateIndex + 1);

            const currentState =
                this._map.get(id)?.[1].splice(currentStateIndex) || [];
            this._map.set(id, [currentStateIndex + 1, [...currentState, node]]);
        });
        this._currentIndex++;
        this._log.push([ids, currentStateIndexs]);
    }

    undo(): void {
        if (this._currentIndex === 0) return; // no more states to undo

        const [ids, stateIndexs] = this._log[this._currentIndex - 1];
        ids.forEach((id, index) => {
            const stateIndex = stateIndexs[index];
            const states = this._map.get(id)?.[1];
            if (states) {
                this._map.set(id, [stateIndex - 1, states]);
            }
        });
        this._currentIndex--;
    }

    redo(): void {
        if (this._currentIndex === this._log.length) return; // no more states to redo

        const [ids, stateIndexs] = this._log[this._currentIndex];
        ids.forEach((id, index) => {
            const stateIndex = stateIndexs[index];
            const states = this._map.get(id)?.[1];
            if (states) {
                this._map.set(id, [stateIndex + 1, states]);
            }
        });
        this._currentIndex++;
    }

    export(): string {
        const history = this._log.map(([ids, stateIndexs]) => {
            return ids.map((id, index) => {
                const stateIndex = stateIndexs[index];
                const states = this._map.get(id)?.[1];
                if (states) {
                    return {
                        id,
                        state: states[stateIndex],
                    };
                }
                return null;
            });
        });
        return JSON.stringify(history);
    }
}
