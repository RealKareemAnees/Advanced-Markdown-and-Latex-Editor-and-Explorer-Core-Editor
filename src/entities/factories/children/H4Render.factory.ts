/**
 * src/engine/rendering/factories/H4Render.factory.ts
 * Render factory for H4 heading entities
 *
 * Creates a DOM element representation of an H4 entity following the
 * application's styling guidelines.
 */

import { H4Entity } from "../../../entities-store/h4/H4Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H4 render factory function
 *
 * @param entity - The H4 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H4RenderFactory(
    entity: H4Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h4 element
    const h4Element = document.createElement("h4");

    // Set the text content from entity data
    h4Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h4Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h4Element.contentEditable = "true";
    }

    return h4Element;
}
