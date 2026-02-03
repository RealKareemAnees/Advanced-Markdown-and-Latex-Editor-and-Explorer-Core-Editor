/**
 * src/engine/rendering/factories/OiRender.factory.ts
 * Render factory for Ordered List Item (OI) entities
 *
 * Creates a DOM element representation of an ordered list item entity following
 * the application's styling guidelines.
 */

import { OiEntity } from "../../entities-store/oi/OiEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Ordered List Item render factory function
 *
 * @param entity - The OI entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLLIElement (list item)
 */
export function OiRenderFactory(
    entity: OiEntity,
    mode: RenderMode,
): HTMLLIElement {
    // Create the list item element
    const liElement = document.createElement("li");

    // Set the text content from entity data
    liElement.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS in assets/style.css includes:
    // - Accent-colored markers
    // - Proper spacing and padding
    liElement.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        liElement.contentEditable = "true";
    }

    return liElement;
}
