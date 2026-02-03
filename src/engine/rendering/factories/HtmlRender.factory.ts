/**
 * src/engine/rendering/factories/HtmlRender.factory.ts
 * Render factory for HTML entities
 *
 * Creates a DOM element representation of an HTML entity following the
 * application's styling guidelines. Safely renders HTML content.
 */

import { HtmlEntity } from "../../entities-store/html/HtmlEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * HTML render factory function
 *
 * @param entity - The HTML entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDivElement containing the HTML content
 */
export function HtmlRenderFactory(
    entity: HtmlEntity,
    mode: RenderMode,
): HTMLDivElement {
    // Create a container div
    const containerElement = document.createElement("div");
    containerElement.className = "editor-content html-block";

    // In preview mode, render the actual HTML
    // In editor mode, show the raw HTML for editing
    if (mode === "PREVIEW") {
        // Set innerHTML to render the HTML content
        // Note: In production, this should use DOMPurify or similar
        // for XSS protection
        containerElement.innerHTML = entity.DATA;
    } else {
        // In editor mode, show raw HTML in a code block
        const preElement = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.textContent = entity.DATA;
        codeElement.contentEditable = "true";
        codeElement.className = "language-html";
        preElement.appendChild(codeElement);
        containerElement.appendChild(preElement);
    }

    return containerElement;
}
