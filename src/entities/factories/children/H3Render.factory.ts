/**
 * src/engine/rendering/factories/H3Render.factory.ts
 * Render factory for H3 heading entities
 *
 * Creates a DOM element representation of an H3 entity following the
 * application's styling guidelines.
 */

import { H3Entity } from "../../../entities-store/h3/H3Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H3 render factory function
 *
 * @param entity - The H3 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H3RenderFactory(
    entity: H3Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h3 element
    const h3Element = document.createElement("h3");

    // Set the text content from entity data
    h3Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h3Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h3Element.contentEditable = "true";
    }

    return h3Element;
}
