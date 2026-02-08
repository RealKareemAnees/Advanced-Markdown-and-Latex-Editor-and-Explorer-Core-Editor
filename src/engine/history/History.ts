import type { HistoryInterface } from "../../types/History.interface";
import type { NodeInterface } from "../../types/Node.interface";

export class History implements HistoryInterface {
    /**
     * Stack of memory snapshots, where each snapshot is an array of nodes
     */
    private _stack: NodeInterface[][];

    /**
     * Current position in history (0-based index into _stack)
     * Points to the current state in the stack
     */
    private _currentIndex: number;

    /**
     * Creates a new History instance
     * @param initial - Optional initial state to load into history
     */
    constructor(initial?: NodeInterface[]) {
        if (initial && initial.length > 0) {
            // Initialize with the provided initial state
            this._stack = [[], initial];
            this._currentIndex = 1;
        } else {
            // Initialize with an empty state
            this._stack = [[]];
            this._currentIndex = 0;
        }
    }

    /**
     * Returns the current state (the snapshot at the current index)
     */
    get CURRENT(): NodeInterface[] {
        return this._stack[this._currentIndex] || [];
    }

    /**
     * Returns the number of states that can be redone (forward in history)
     */
    get FORWARD_LENGTH(): number {
        return this._stack.length - 1 - this._currentIndex;
    }

    /**
     * Returns the number of states that can be undone (backward in history)
     */
    get BACKWARD_LENGTH(): number {
        return this._currentIndex;
    }

    /**
     * Records a new change to the history stack
     * @param nodes - The nodes representing the new state
     */
    do(nodes: NodeInterface[]): void {
        if (!nodes || nodes.length === 0) {
            return; // No nodes to record, do nothing
        }

        // If we're in the middle of history, clear forward history
        if (this._currentIndex < this._stack.length - 1) {
            this._stack = this._stack.slice(0, this._currentIndex + 1);
        }

        // Add the new state to the stack
        this._stack.push(nodes);

        // Move the current index forward
        this._currentIndex++;
    }

    /**
     * Undoes the last change, moving backward in history
     * @returns The nodes at the new current state
     */
    undo(): NodeInterface[] {
        // Can only undo if we're not at the beginning
        if (this._currentIndex > 0) {
            this._currentIndex--;
        }
        return this.CURRENT;
    }

    /**
     * Redoes the last undone change, moving forward in history
     * @returns The nodes at the new current state
     */
    redo(): NodeInterface[] {
        // Can only redo if we're not at the end
        if (this._currentIndex < this._stack.length - 1) {
            this._currentIndex++;
        }
        return this.CURRENT;
    }

    /**
     * Exports the history as a JSON string
     * @returns JSON string representing the complete history stack
     */
    export(): string {
        return JSON.stringify(this._stack);
    }
}
