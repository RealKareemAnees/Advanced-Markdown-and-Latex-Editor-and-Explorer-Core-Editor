import type { NodeInterface } from "./Node.interface";

export interface ContainerInterface {
    get NODE(): NodeInterface;
    get HTML_ELEMENT(): HTMLElement;

    /**
     * the order amongst other siblings in the same parent container, critical for bitmap creation
     */
    get ORDER(): number;
    set ORDER(order: number);

    /**
     * Gets the content wrapper element for external rendering operations
     */
    get CONTENT_WRAPPER(): HTMLElement;

    /**
     * creates the HTML element for the container, ships it to the DOM, thats it
     */
    render(): ContainerInterface;

    /**
     * removes the HTML element from the DOM and cleans up any references
     */
    distroy(): void;
}
