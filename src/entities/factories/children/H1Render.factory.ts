/**
 * src/engine/rendering/factories/H1Render.factory.ts
 * Render factory for H1 heading entities
 *
 * Creates a DOM element representation of an H1 entity following the
 * application's styling guidelines.
 */

import { H1Entity } from "../../../entities-store/h1/H1Entity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * H1 render factory function
 *
 * @param entity - The H1 entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHeadingElement
 */
export function H1RenderFactory(
    entity: H1Entity,
    mode: RenderMode,
): HTMLHeadingElement {
    // Create the h1 element
    const h1Element = document.createElement("h1");

    // Set the text content from entity data
    h1Element.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    h1Element.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        h1Element.contentEditable = "true";
    }

    return h1Element;
}
