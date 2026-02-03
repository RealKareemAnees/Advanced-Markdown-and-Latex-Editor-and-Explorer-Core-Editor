/**
 * src/engine/rendering/factories/ToggleRender.factory.ts
 * Render factory for Toggle entities
 *
 * Creates a DOM element representation of a Toggle entity following the
 * application's styling guidelines with collapsible content.
 */

import { ToggleEntity } from "../../entities-store/toggle/ToggleEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Toggle render factory function
 *
 * @param entity - The Toggle entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDetailsElement
 */
export function ToggleRenderFactory(
    entity: ToggleEntity,
    mode: RenderMode,
): HTMLDetailsElement {
    // Create the details element for toggle functionality
    const detailsElement = document.createElement("details");
    detailsElement.className = "editor-content";

    // Create summary element (the clickable part)
    const summaryElement = document.createElement("summary");
    summaryElement.textContent = entity.DATA;

    // Set content editable for summary in editor mode
    if (mode === "EDITOR") {
        summaryElement.contentEditable = "true";
    }

    // Append summary to details
    detailsElement.appendChild(summaryElement);

    // Note: Nested content would be added by the container/node system
    // This factory creates the toggle structure itself

    return detailsElement;
}
