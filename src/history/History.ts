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
        if (initial?.length) {
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
        return this._stack[this._currentIndex];
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
        if (!nodes?.length) {
            return; // No nodes to record, do nothing
        }

        const currentIndex = this._currentIndex;
        const stack = this._stack;

        // If we're in the middle of history, clear forward history in-place
        if (currentIndex < stack.length - 1) {
            // Use splice for O(1) truncation instead of slice + reassignment
            stack.splice(currentIndex + 1);
        }

        // Add the new state to the stack
        stack.push(nodes);

        // Move the current index forward
        this._currentIndex = currentIndex + 1;
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
        return this._stack[this._currentIndex];
    }

    /**
     * Redoes the last undone change, moving forward in history
     * @returns The nodes at the new current state
     */
    redo(): NodeInterface[] {
        const currentIndex = this._currentIndex;
        const maxIndex = this._stack.length - 1;

        // Can only redo if we're not at the end
        if (currentIndex < maxIndex) {
            this._currentIndex = currentIndex + 1;
        }
        return this._stack[this._currentIndex];
    }

    /**
     * Exports the history as a JSON string
     * @returns JSON string representing the complete history stack
     */
    export(): string {
        return JSON.stringify(this._stack);
    }
}
