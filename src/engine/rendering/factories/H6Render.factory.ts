/**
 * src/engine/rendering/factories/H6Render.factory.ts
 * Render factory for H6 heading entities
 *
 * Creates a DOM element representation of an H6 entity following the
 * application's styling guidelines.
 */

import { H6Entity } from "../../entities-store/h6/H6Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H6 render factory function
 *
 * @param entity - The H6 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H6RenderFactory(
    entity: H6Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h6 element
    const h6Element = document.createElement("h6");

    // Set the text content from entity data
    h6Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h6Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h6Element.contentEditable = "true";
    }

    return h6Element;
}
