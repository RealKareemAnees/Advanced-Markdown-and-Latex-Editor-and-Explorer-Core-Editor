/**
 * src/engine/rendering/factories/QuoteRender.factory.ts
 * Render factory for Quote entities
 *
 * Creates a DOM element representation of a Quote entity following the
 * application's styling guidelines with left accent border and decorative quote mark.
 */

import { QuoteEntity } from "../../../entities-store/quote/QuoteEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Quote render factory function
 *
 * @param entity - The Quote entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLQuoteElement (blockquote)
 */
export function QuoteRenderFactory(
    entity: QuoteEntity,
    mode: RenderMode,
): HTMLQuoteElement {
    // Create the blockquote element
    const quoteElement = document.createElement("blockquote");

    // Set the text content from entity data
    quoteElement.textContent = entity.DATA;

    // Apply styling classes following the design system
    // CSS in assets/style.css includes:
    // - Left accent border (5px solid accent color)
    // - Elevated background
    // - Decorative quote mark (::before pseudo-element)
    // - Serif italic font
    quoteElement.className = "editor-content";

    // Set content editable based on mode
    if (mode === "EDITOR") {
        quoteElement.contentEditable = "true";
    }

    return quoteElement;
}
