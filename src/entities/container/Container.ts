/**
 * Container.ts
 * @description A modern, user-friendly block editor container with intuitive drag-and-drop,
 * clear visual feedback, and accessible controls. Implements ContainerInterface for
 * integration with the editor's memory and rendering systems.
 *
 * Features:
 * - Drag-and-drop support with visual drop zone indicators
 * - Two drop zones: left (full-width) for sibling insertion, right (3/4 width) for nesting
 * - Themed using the app's CSS variables (Espresso & Ember palette)
 * - Clean user experience with smooth transitions
 */

import type { ContainerInterface } from "../../types/Container.interface";
import type { NodeInterface } from "../../types/Node.interface";

/**
 * Container class - Wraps block nodes with drag-and-drop functionality
 * @class
 * @implements {ContainerInterface}
 */
export class Container implements ContainerInterface {
    private _NODE: NodeInterface;
    private _HTML_ELEMENT: HTMLElement;
    private _ORDER: number = 0;

    // Internal elements for drag-and-drop
    private _contentWrapper: HTMLElement;
    private _leftDropZone: HTMLElement;
    private _rightDropZone: HTMLElement;

    // Static reference to currently dragged container
    private static _draggedContainer: Container | null = null;

    // CSS class name constants following project naming conventions
    private static readonly CLASS_CONTAINER = "CONTAINER";
    private static readonly CLASS_CONTENT = "CONTAINER__CONTENT";
    private static readonly CLASS_DRAGGING = "CONTAINER--dragging";
    private static readonly CLASS_DROP_ZONE_LEFT = "CONTAINER__drop-zone--left";
    private static readonly CLASS_DROP_ZONE_RIGHT =
        "CONTAINER__drop-zone--right";
    private static readonly CLASS_DROP_ZONE_ACTIVE =
        "CONTAINER__drop-zone--active";

    /**
     * Get the order of the container amongst siblings
     * @returns {number} The order index
     */
    get ORDER(): number {
        return this._ORDER;
    }

    /**
     * Set the order of the container amongst siblings
     * @param {number} order - The new order index
     */
    set ORDER(order: number) {
        this._ORDER = order;
    }

    /**
     * Get the associated node
     * @returns {NodeInterface} The node wrapped by this container
     */
    get NODE(): NodeInterface {
        return this._NODE;
    }

    /**
     * Get the main HTML element
     * @returns {HTMLElement} The container's root DOM element
     */
    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }

    /**
     * Creates an instance of Container
     * @constructor
     * @param {NodeInterface} node - The node to wrap in this container
     * @param {any} EventsBus - Event bus for communication (reserved for future use)
     */
    constructor(
        node: NodeInterface,
        _eventsBus: any = null /* EventsBus reserved for future implementation */,
    ) {
        this._NODE = node;

        // Inject styles once on first container creation
        Container._injectStyles();

        // Build the container structure
        this._HTML_ELEMENT = this._createContainerElement();
        this._contentWrapper = this._createContentWrapper();
        this._leftDropZone = this._createDropZone(
            Container.CLASS_DROP_ZONE_LEFT,
        );
        this._rightDropZone = this._createDropZone(
            Container.CLASS_DROP_ZONE_RIGHT,
        );

        // Assemble the structure
        this._HTML_ELEMENT.appendChild(this._contentWrapper);
        this._HTML_ELEMENT.appendChild(this._leftDropZone);
        this._HTML_ELEMENT.appendChild(this._rightDropZone);

        // Setup event listeners for drag-and-drop
        this._addEventListeners();
    }

    /**
     * Renders the container - returns this instance for chaining
     * Note: Entity rendering is handled by the rendering system, not here.
     * The content wrapper is exposed for external rendering operations.
     * @returns {ContainerInterface} This container instance for chaining
     */
    render(): ContainerInterface {
        return this;
    }

    /**
     * Gets the content wrapper element for external rendering operations
     * @returns {HTMLElement} The content wrapper element
     */
    get CONTENT_WRAPPER(): HTMLElement {
        return this._contentWrapper;
    }

    /**
     * Destroys the container, removing it from the DOM and cleaning up references
     * @returns {void}
     */
    distroy(): void {
        // Remove event listeners
        this._removeEventListeners();

        // Remove from DOM
        if (this._HTML_ELEMENT?.parentNode) {
            this._HTML_ELEMENT.parentNode.removeChild(this._HTML_ELEMENT);
        }

        // Clean up references
        this._HTML_ELEMENT = null!;
        this._contentWrapper = null!;
        this._leftDropZone = null!;
        this._rightDropZone = null!;
    }

    // =========================================================================
    // PRIVATE METHODS - Element Creation
    // =========================================================================

    /**
     * Creates the main container element
     * @private
     * @returns {HTMLElement} The container div element
     */
    private _createContainerElement(): HTMLElement {
        const element = document.createElement("div");
        element.className = Container.CLASS_CONTAINER;
        element.draggable = true;
        element.setAttribute("role", "listitem");
        element.setAttribute("aria-grabbed", "false");
        return element;
    }

    /**
     * Creates the content wrapper element
     * @private
     * @returns {HTMLElement} The content wrapper div element
     */
    private _createContentWrapper(): HTMLElement {
        const wrapper = document.createElement("div");
        wrapper.className = Container.CLASS_CONTENT;
        return wrapper;
    }

    /**
     * Creates a drop zone element
     * @private
     * @param {string} className - The CSS class for the drop zone
     * @returns {HTMLElement} The drop zone div element
     */
    private _createDropZone(className: string): HTMLElement {
        const zone = document.createElement("div");
        zone.className = className;
        zone.setAttribute("aria-hidden", "true");
        return zone;
    }

    // =========================================================================
    // PRIVATE METHODS - Event Handling
    // =========================================================================

    /**
     * Adds all event listeners for drag-and-drop functionality
     * @private
     */
    private _addEventListeners(): void {
        this._HTML_ELEMENT.addEventListener("dragstart", this._handleDragStart);
        this._HTML_ELEMENT.addEventListener("dragend", this._handleDragEnd);
        this._HTML_ELEMENT.addEventListener("dragover", this._handleDragOver);
        this._HTML_ELEMENT.addEventListener("dragleave", this._handleDragLeave);
        this._HTML_ELEMENT.addEventListener("drop", this._handleDrop);
    }

    /**
     * Removes all event listeners
     * @private
     */
    private _removeEventListeners(): void {
        if (!this._HTML_ELEMENT) return;

        this._HTML_ELEMENT.removeEventListener(
            "dragstart",
            this._handleDragStart,
        );
        this._HTML_ELEMENT.removeEventListener("dragend", this._handleDragEnd);
        this._HTML_ELEMENT.removeEventListener(
            "dragover",
            this._handleDragOver,
        );
        this._HTML_ELEMENT.removeEventListener(
            "dragleave",
            this._handleDragLeave,
        );
        this._HTML_ELEMENT.removeEventListener("drop", this._handleDrop);
    }

    /**
     * Handles the drag start event
     * @private
     */
    private _handleDragStart = (e: DragEvent): void => {
        e.stopPropagation();

        // Set this container as the currently dragged element
        Container._draggedContainer = this;

        // Add visual dragging state
        this._HTML_ELEMENT.classList.add(Container.CLASS_DRAGGING);
        this._HTML_ELEMENT.setAttribute("aria-grabbed", "true");

        // Configure drag data transfer
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData(
                "text/plain",
                `container-${this._NODE?.ID ?? "unknown"}`,
            );
        }
    };

    /**
     * Handles the drag end event
     * @private
     */
    private _handleDragEnd = (_e: DragEvent): void => {
        // Remove visual dragging state
        this._HTML_ELEMENT.classList.remove(Container.CLASS_DRAGGING);
        this._HTML_ELEMENT.setAttribute("aria-grabbed", "false");

        // Clear all drop zone highlights
        this._clearDropZoneHighlights();

        // Reset static reference
        Container._draggedContainer = null;
    };

    /**
     * Handles the drag over event - determines which drop zone to highlight
     * @private
     */
    private _handleDragOver = (e: DragEvent): void => {
        // Only allow drop if dragging a container and it's not this container
        if (
            !Container._draggedContainer ||
            Container._draggedContainer === this
        ) {
            return;
        }

        // Prevent default to allow dropping
        e.preventDefault();
        e.stopPropagation();

        // Calculate relative X position (0 to 1)
        const rect = this._HTML_ELEMENT.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;

        // Clear existing highlights
        this._clearDropZoneHighlights();

        // Determine which drop zone to highlight based on mouse position
        // Left 1/4 (< 0.25) -> Full width drop zone (sibling insertion)
        // Right 3/4 (>= 0.25) -> Indented drop zone (nesting)
        if (relativeX < 0.25) {
            this._leftDropZone.classList.add(Container.CLASS_DROP_ZONE_ACTIVE);
        } else {
            this._rightDropZone.classList.add(Container.CLASS_DROP_ZONE_ACTIVE);
        }
    };

    /**
     * Handles the drag leave event
     * @private
     */
    private _handleDragLeave = (e: DragEvent): void => {
        // Prevent flickering when moving between child elements
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (this._HTML_ELEMENT.contains(relatedTarget)) {
            return;
        }

        // Clear highlights when truly leaving the container
        this._clearDropZoneHighlights();
    };

    /**
     * Handles the drop event
     * @private
     */
    private _handleDrop = (e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        // Clear visual feedback
        this._clearDropZoneHighlights();

        // Determine drop position based on which zone was active
        const isLeftZone = this._leftDropZone.classList.contains(
            Container.CLASS_DROP_ZONE_ACTIVE,
        );

        // TODO: Implement actual repositioning logic
        // Placeholder for future implementation:
        // - If isLeftZone: Insert dragged container as sibling below this container
        // - If !isLeftZone: Insert dragged container as child (nested) of this container
        // this._handleRepositioning(Container._draggedContainer, isLeftZone);

        console.log(
            `[Container] Drop detected - Target: ${this._NODE?.ID ?? "unknown"}, Zone: ${isLeftZone ? "left (sibling)" : "right (nested)"}`,
        );
    };

    /**
     * Clears all drop zone highlights
     * @private
     */
    private _clearDropZoneHighlights(): void {
        this._leftDropZone.classList.remove(Container.CLASS_DROP_ZONE_ACTIVE);
        this._rightDropZone.classList.remove(Container.CLASS_DROP_ZONE_ACTIVE);
    }

    // =========================================================================
    // PRIVATE STATIC METHODS - Style Injection
    // =========================================================================

    /**
     * Injects CSS styles for the container component
     * Uses the app's CSS variables for consistent theming
     * @private
     * @static
     */
    private static _injectStyles(): void {
        const styleId = "container-component-styles";

        // Only inject once
        if (document.getElementById(styleId)) return;

        const css = `
            /* ============================================
               CONTAINER COMPONENT STYLES
               Uses app CSS variables for theming
               ============================================ */

            .${Container.CLASS_CONTAINER} {
                position: relative;
                margin: var(--space-1, 4px) 0;
                padding-bottom: var(--space-2, 8px);
                border-radius: var(--radius-sm, 6px);
                transition: all var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
                cursor: grab;
            }

            .${Container.CLASS_CONTAINER}:hover {
                background-color: var(--bg-highlight, #2e2a27);
            }

            .${Container.CLASS_CONTAINER}:active {
                cursor: grabbing;
            }

            /* Dragging state */
            .${Container.CLASS_CONTAINER}.${Container.CLASS_DRAGGING} {
                opacity: 0.5;
                background-color: var(--bg-elevated, #2a2522);
                box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.25));
                cursor: grabbing;
            }

            /* Content wrapper */
            .${Container.CLASS_CONTENT} {
                padding: var(--space-1, 4px) var(--space-2, 8px);
            }

            /* ============================================
               DROP ZONE STYLES
               Bottom indicators for drag-and-drop targeting
               ============================================ */

            /* Left drop zone - Full width (for sibling insertion) */
            .${Container.CLASS_DROP_ZONE_LEFT} {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: transparent;
                border-radius: var(--radius-xs, 2px);
                transition: background-color var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
                pointer-events: none;
                z-index: 10;
            }

            /* Right drop zone - 3/4 width (for nesting) */
            .${Container.CLASS_DROP_ZONE_RIGHT} {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 75%;
                height: 4px;
                background: transparent;
                border-radius: var(--radius-xs, 2px);
                transition: background-color var(--transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1));
                pointer-events: none;
                z-index: 10;
            }

            /* Active/highlighted drop zone state */
            .${Container.CLASS_DROP_ZONE_LEFT}.${Container.CLASS_DROP_ZONE_ACTIVE},
            .${Container.CLASS_DROP_ZONE_RIGHT}.${Container.CLASS_DROP_ZONE_ACTIVE} {
                background-color: var(--accent-primary, #e67e4d);
                box-shadow: 0 0 8px var(--accent-glow, rgba(230, 126, 77, 0.08));
            }
        `;

        // Create and inject the style element
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = css;
        document.head.appendChild(style);
    }

    // =========================================================================
    // PUBLIC STATIC METHODS - Utility
    // =========================================================================

    /**
     * Gets the currently dragged container (if any)
     * @static
     * @returns {Container | null} The currently dragged container or null
     */
    static get DRAGGED_CONTAINER(): Container | null {
        return Container._draggedContainer;
    }
}
