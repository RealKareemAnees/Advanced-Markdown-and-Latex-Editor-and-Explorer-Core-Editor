/**
 * src/engine/rendering/factories/H5Render.factory.ts
 * Render factory for H5 heading entities
 *
 * Creates a DOM element representation of an H5 entity following the
 * application's styling guidelines.
 */

import { H5Entity } from "../../entities-store/h5/H5Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H5 render factory function
 *
 * @param entity - The H5 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H5RenderFactory(
    entity: H5Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h5 element
    const h5Element = document.createElement("h5");

    // Set the text content from entity data
    h5Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h5Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h5Element.contentEditable = "true";
    }

    return h5Element;
}
