/**
 * @file main.ts
 * @description Refactored ContainerComponent - A modern, user-friendly block editor container
 * with intuitive drag-and-drop, clear visual feedback, and accessible controls.
 */

const body = document.body;

/**
 * ContainerComponent - Modern block editor container with drag-and-drop functionality
 * @class
 */
export class ContainerComponent {
    private readonly element: HTMLElement;
    private readonly contentNode: HTMLElement;
    private readonly leftDropZone: HTMLElement;
    private readonly rightDropZone: HTMLElement;
    private static draggedElement: ContainerComponent | null = null;

    // Class name constants
    private static readonly CLASS_WRAPPER = "block-container";
    private static readonly CLASS_CONTENT = "block-content";
    private static readonly CLASS_DRAGGING = "is-dragging";
    private static readonly CLASS_ZONE_LEFT = "drop-zone-left";
    private static readonly CLASS_ZONE_RIGHT = "drop-zone-right";
    private static readonly CLASS_ACTIVE = "active";

    /**
     * Creates an instance of ContainerComponent.
     * @constructor
     * @param {HTMLElement} nodeElement - The DOM element to be wrapped
     */
    constructor(nodeElement: HTMLElement) {
        this.contentNode = nodeElement;
        ContainerComponent._injectStyles();

        // Build the structure
        this.element = document.createElement("div");
        this.element.className = ContainerComponent.CLASS_WRAPPER;
        this.element.draggable = true; // Enable grabbing

        // Content Area
        const contentVal = document.createElement("div");
        contentVal.className = ContainerComponent.CLASS_CONTENT;
        contentVal.appendChild(this.contentNode);
        this.element.appendChild(contentVal);

        // Creates 2 divs on the bottom
        // 1. Left div (takes all width)
        this.leftDropZone = document.createElement("div");
        this.leftDropZone.className = ContainerComponent.CLASS_ZONE_LEFT;
        this.element.appendChild(this.leftDropZone);

        // 2. Right div (takes 3/4 width)
        this.rightDropZone = document.createElement("div");
        this.rightDropZone.className = ContainerComponent.CLASS_ZONE_RIGHT;
        this.element.appendChild(this.rightDropZone);

        this._addEventListeners();
    }

    /**
     * Returns the main container element.
     * @returns HTMLElement
     */
    public getElement(): HTMLElement {
        return this.element;
    }

    /**
     * Cleanup method to remove event listeners
     */
    public destroy(): void {
        this.element.remove();
    }

    /**
     * Adds event listeners for drag and drop
     * @private
     */
    private _addEventListeners(): void {
        this.element.addEventListener(
            "dragstart",
            this._handleDragStart.bind(this),
        );
        this.element.addEventListener(
            "dragend",
            this._handleDragEnd.bind(this),
        );
        this.element.addEventListener(
            "dragover",
            this._handleDragOver.bind(this),
        );
        this.element.addEventListener(
            "dragleave",
            this._handleDragLeave.bind(this),
        );
        this.element.addEventListener("drop", this._handleDrop.bind(this));
    }

    private _handleDragStart(e: DragEvent): void {
        e.stopPropagation();
        ContainerComponent.draggedElement = this;
        this.element.classList.add(ContainerComponent.CLASS_DRAGGING);

        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", "container-drag"); // Firefox requires data
        }
    }

    private _handleDragEnd(e: DragEvent): void {
        this.element.classList.remove(ContainerComponent.CLASS_DRAGGING);
        this._clearHighlights();
        ContainerComponent.draggedElement = null;
    }

    private _handleDragOver(e: DragEvent): void {
        // Allow drop if we are dragging a container and it's not this container
        if (
            !ContainerComponent.draggedElement ||
            ContainerComponent.draggedElement === this
        ) {
            return;
        }

        e.preventDefault(); // Necessary to allow dropping
        e.stopPropagation();

        const rect = this.element.getBoundingClientRect();
        // Calculate X position relative to the container width (0 to 1)
        const relativeX = (e.clientX - rect.left) / rect.width;

        // Reset highlights first
        this._clearHighlights();

        // Logic:
        // - Left 1/4 (0.25) -> Highlight Left Div (Full Width)
        // - Right 3/4 (> 0.25) -> Highlight Right Div (3/4 Width)
        if (relativeX < 0.25) {
            this.leftDropZone.classList.add(ContainerComponent.CLASS_ACTIVE);
        } else {
            this.rightDropZone.classList.add(ContainerComponent.CLASS_ACTIVE);
        }
    }

    private _handleDragLeave(e: DragEvent): void {
        // Prevent flickering when moving between children
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (this.element.contains(relatedTarget)) {
            return;
        }
        this._clearHighlights();
    }

    private _handleDrop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this._clearHighlights();

        // "only implement grapping and highlighting but dont implement repositioning"
        console.log("Dropped on container");
    }

    private _clearHighlights(): void {
        this.leftDropZone.classList.remove(ContainerComponent.CLASS_ACTIVE);
        this.rightDropZone.classList.remove(ContainerComponent.CLASS_ACTIVE);
    }

    /**
     * Injects CSS styles for the container.
     * @private
     */
    private static _injectStyles(): void {
        const styleId = "block-container-styles";
        if (document.getElementById(styleId)) return;

        const css = `
            .${ContainerComponent.CLASS_WRAPPER} {
                position: relative;
                margin: 4px 0; /* Spacing between blocks */
                transition: all 0.2s ease;
                border-radius: 4px;
                padding-bottom: 8px; /* space for the indicators at bottom */
            }

            .${ContainerComponent.CLASS_WRAPPER}:hover {
                background-color: rgba(0, 0, 0, 0.02);
            }

            .${ContainerComponent.CLASS_WRAPPER}.${ContainerComponent.CLASS_DRAGGING} {
                opacity: 0.5;
                background-color: #f0f0f0;
            }

            .${ContainerComponent.CLASS_CONTENT} {
                padding: 4px 8px;
            }

            /* 
               Bottom Zones 
               They are "on the bottom of the container"
               "Colourless" by default
            */

            /* Left Div: Takes all the width */
            .${ContainerComponent.CLASS_ZONE_LEFT} {
                position: absolute;
                bottom: -2px; /* Visual positioning */
                left: 0;
                width: 100%;
                height: 4px;
                background: transparent; /* Colourless */
                transition: background-color 0.2s ease;
                border-radius: 2px;
                pointer-events: none; /* Let drag events pass through to container */
                margin-bottom: 4px; /* "left div has some margin to the buttom" */
                z-index: 10;
            }

            /* Right Div: Takes 3/4 of the width */
            .${ContainerComponent.CLASS_ZONE_RIGHT} {
                position: absolute;
                bottom: -2px;
                right: 0;
                width: 75%;
                height: 4px;
                background: transparent; /* Colourless */
                transition: background-color 0.2s ease;
                border-radius: 2px;
                pointer-events: none;
                z-index: 10;
            }

            /* Highlighting */
            .${ContainerComponent.CLASS_ZONE_LEFT}.${ContainerComponent.CLASS_ACTIVE} {
                background-color: #2383e2; /* Highlight Color */
                opacity: 1;
            }

            .${ContainerComponent.CLASS_ZONE_RIGHT}.${ContainerComponent.CLASS_ACTIVE} {
                background-color: #2383e2; /* Highlight Color */
                opacity: 1;
            }
        `;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = css;
        document.head.appendChild(style);
    }
}

// ============================================================================
// DEMO CODE - Example usage and testing
// ============================================================================

// Add global body styling for better visual presentation
Object.assign(body.style, {
    margin: "0",
    padding: "40px 60px",
    backgroundColor: "#f7f8fa",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    minHeight: "100vh",
});

// Create a centered container for the examples
const pageContainer = document.createElement("div");
Object.assign(pageContainer.style, {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "60px 40px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
});

/**
 * Creates a Notion-style block element with content and styling.
 * @param type The type of block to create
 * @param content The content for the block
 * @returns HTMLElement styled as a Notion block
 */
function createNotionBlock(
    type: string,
    content: string | HTMLElement,
): HTMLElement {
    const block = document.createElement("div");

    switch (type) {
        case "h1":
            Object.assign(block.style, {
                fontSize: "40px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "4px",
                color: "#37352f",
            });
            block.textContent = typeof content === "string" ? content : "";
            break;

        case "h2":
            Object.assign(block.style, {
                fontSize: "30px",
                fontWeight: "600",
                lineHeight: "1.3",
                marginBottom: "2px",
                color: "#37352f",
            });
            block.textContent = typeof content === "string" ? content : "";
            break;

        case "h3":
            Object.assign(block.style, {
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "1.3",
                color: "#37352f",
            });
            block.textContent = typeof content === "string" ? content : "";
            break;

        case "paragraph":
            Object.assign(block.style, {
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#37352f",
                minHeight: "27px",
            });
            block.textContent = typeof content === "string" ? content : "";
            break;

        case "code":
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.textContent = typeof content === "string" ? content : "";
            Object.assign(pre.style, {
                margin: "0",
                padding: "16px",
                backgroundColor: "#f7f6f3",
                borderRadius: "4px",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily:
                    "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                color: "#eb5757",
                overflow: "auto",
            });
            pre.appendChild(code);
            return pre;

        case "quote":
            const borderDiv = document.createElement("div");
            Object.assign(borderDiv.style, {
                borderLeft: "3px solid #37352f",
                paddingLeft: "16px",
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#37352f",
                fontStyle: "normal",
            });
            borderDiv.textContent = typeof content === "string" ? content : "";
            return borderDiv;

        case "callout":
            const calloutDiv = document.createElement("div");
            Object.assign(calloutDiv.style, {
                display: "flex",
                alignItems: "flex-start",
                padding: "16px",
                backgroundColor: "#f7f6f3",
                borderRadius: "4px",
                gap: "12px",
            });
            const emoji = document.createElement("span");
            emoji.textContent = "💡";
            emoji.style.fontSize = "20px";
            const text = document.createElement("div");
            text.textContent = typeof content === "string" ? content : "";
            Object.assign(text.style, {
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#37352f",
                flex: "1",
            });
            calloutDiv.appendChild(emoji);
            calloutDiv.appendChild(text);
            return calloutDiv;

        case "bulletList":
            const listItem = document.createElement("div");
            Object.assign(listItem.style, {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#37352f",
            });
            const bullet = document.createElement("span");
            bullet.textContent = "•";
            bullet.style.marginTop = "2px";
            const itemText = document.createElement("span");
            itemText.textContent = typeof content === "string" ? content : "";
            listItem.appendChild(bullet);
            listItem.appendChild(itemText);
            return listItem;

        case "checkbox":
            const checkboxDiv = document.createElement("div");
            Object.assign(checkboxDiv.style, {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#37352f",
            });
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            Object.assign(checkbox.style, {
                marginTop: "6px",
                cursor: "pointer",
            });
            const checkboxText = document.createElement("span");
            checkboxText.textContent =
                typeof content === "string" ? content : "";
            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(checkboxText);
            return checkboxDiv;

        default:
            block.textContent = typeof content === "string" ? content : "";
    }

    return block;
}

// Create example blocks with diverse content types
const exampleBlocks = [
    { type: "h1", content: "Drag & Drop Demo" },
    {
        type: "paragraph",
        content:
            "Drag any block to see the drop indicators at the bottom. The highlighting logic is completely rewritten.",
    },
    { type: "h2", content: "How it works" },
    {
        type: "bulletList",
        content:
            "Drag over the LEFT 1/4 of a container -> Highlights the full-width bottom bar.",
    },
    {
        type: "bulletList",
        content:
            "Drag over the RIGHT 3/4 of a container -> Highlights the indented (75%) bottom bar.",
    },
    { type: "h2", content: "Interactive Elements" },
    {
        type: "paragraph",
        content:
            "Try dragging this paragraph around. Notice the blue indicators appearing at the bottom of target containers.",
    },
    {
        type: "callout",
        content:
            "Note: Actual repositioning is disabled as per requirements. Only the 'grabbing' and 'highlighting' visual logic is active.",
    },
    { type: "checkbox", content: "Full width indicator (Left 25% trigger)" },
    { type: "checkbox", content: "Indented indicator (Right 75% trigger)" },
    { type: "h3", content: "Code Logic" },
    {
        type: "code",
        content: `if (mouseX < 0.25 * width) {\n  highlight(leftFullWidthDiv);\n} else {\n  highlight(rightIndentedDiv);\n}`,
    },
    {
        type: "quote",
        content: "Responsive and clean design interactions.",
    },
];

// Create containers for each example block
exampleBlocks.forEach((example) => {
    const node = createNotionBlock(example.type, example.content);
    const container = new ContainerComponent(node);
    pageContainer.appendChild(container.getElement());
});

body.appendChild(pageContainer);
