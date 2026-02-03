/**
 * src/engine/rendering/factories/ParagraphRender.factory.ts
 * Render factory for Paragraph entities
 *
 * Creates a DOM element representation of a Paragraph entity following the
 * application's styling guidelines.
 */

import { ParagraphEntity } from "../../entities-store/paragraph/ParagraphEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Paragraph render factory function
 *
 * @param entity - The Paragraph entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLParagraphElement
 */
export function ParagraphRenderFactory(
    entity: ParagraphEntity,
    mode: RenderMode,
): HTMLParagraphElement {
    // Create the paragraph element
    const pElement = document.createElement("p");

    // Set the text content from entity data
    pElement.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS classes are defined in assets/style.css
    pElement.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        pElement.contentEditable = "true";
    }

    return pElement;
}
