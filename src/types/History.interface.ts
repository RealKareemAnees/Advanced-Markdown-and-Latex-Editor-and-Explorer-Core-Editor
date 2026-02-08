import type { NodeInterface } from "./Node.interface";

export interface HistoryInterface {
    /**
     * the current state of the history stack,
     */
    get CURRENT(): NodeInterface[];

    /**
     * the length of the forward history stack, this is the number of states that can be redone
     * (CTRL + SHIFT + Z)
     */
    get FORWARD_LENGTH(): number;
    /**
     * the length of the backward history stack, this is the number of states that can be undone
     * (CTRL + Z)
     */
    get BACKWARD_LENGTH(): number;

    /**
     * on doing something, push the state to the history stack
     * @param memory nodes being affected
     */
    do(memory: NodeInterface[]): void;

    /**
     * get the previous state from the history stack and apply it to the current state
     */
    undo(): NodeInterface[];

    /**
     * get the next state from the history stack and apply it to the current state
     */
    redo(): NodeInterface[];

    /**
     * exports JSON string representing the history stack, this can be used to save the history to a file or databases
     */
    export(): string;
}
