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
     * fill the current state of the history stack with the given memory, this is used to initialize the history stack with the current state of the application
     * @param memory the memory to fill the history stack with
     */
    load(memory: NodeInterface[]): void;

    /**
     * on doing something, push the state to the history stack
     * @param nodes nodes being affected
     */
    do(nodes: NodeInterface[]): void;

    /**
     * get the previous state from the history stack and apply it to the current state
     */
    undo(): void;

    /**
     * get the next state from the history stack and apply it to the current state
     */
    redo(): void;

    /**
     * exports JSON string representing the history stack, this can be used to save the history to a file or databases
     */
    export(): string;
}
