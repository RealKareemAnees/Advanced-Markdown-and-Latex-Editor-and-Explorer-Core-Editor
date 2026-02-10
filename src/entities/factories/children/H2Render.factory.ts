/**
 * src/engine/rendering/factories/H2Render.factory.ts
 * Render factory for H2 heading entities
 *
 * Creates a DOM element representation of an H2 entity following the
 * application's styling guidelines.
 */

import { H2Entity } from "../../../entities-store/h2/H2Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H2 render factory function
 *
 * @param entity - The H2 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H2RenderFactory(
    entity: H2Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h2 element
    const h2Element = document.createElement("h2");

    // Set the text content from entity data
    h2Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h2Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h2Element.contentEditable = "true";
    }

    return h2Element;
}
