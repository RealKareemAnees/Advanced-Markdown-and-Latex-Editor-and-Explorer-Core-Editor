/**
 * src/engine/rendering/factories/UiRender.factory.ts
 * Render factory for Unordered List Item (UI) entities
 *
 * Creates a DOM element representation of an unordered list item entity following
 * the application's styling guidelines.
 */

import { UiEntity } from "../../../entities-store/ui/UiEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Unordered List Item render factory function
 *
 * @param entity - The UI entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLLIElement (list item)
 */
export function UiRenderFactory(
    entity: UiEntity,
    mode: RenderMode,
): HTMLLIElement {
    // Create the list item element
    const liElement = document.createElement("li");

    // Set the text content from entity data
    liElement.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS in assets/style.css includes:
    // - Accent-colored bullet markers (::marker)
    // - Proper spacing and padding
    liElement.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        liElement.contentEditable = "true";
    }

    return liElement;
}
