/**
 * src/engine/rendering/factories/EmbeddingRender.factory.ts
 * Render factory for Embedding entities
 *
 * Creates a DOM element representation of an Embedding entity following the
 * application's styling guidelines. Embeds external content via iframes.
 */

import { EmbeddingEntity } from "../../entities-store/embedding/EmbeddingEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Embedding render factory function
 *
 * @param entity - The Embedding entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDivElement containing the embedded content
 */
export function EmbeddingRenderFactory(
    entity: EmbeddingEntity,
    mode: RenderMode,
): HTMLDivElement {
    // Create a container div
    const containerElement = document.createElement("div");
    containerElement.className = "editor-content embedding-block";

    // In preview mode, render the iframe embedding
    // In editor mode, show the URL for editing
    if (mode === "PREVIEW") {
        // Create iframe for embedding
        const iframeElement = document.createElement("iframe");
        iframeElement.src = entity.DATA.href;
        iframeElement.className = "embedded-content";

        // Apply responsive iframe styling
        iframeElement.style.width = "100%";
        iframeElement.style.minHeight = "400px";
        iframeElement.style.border = "1px solid var(--border-medium)";
        iframeElement.style.borderRadius = "var(--radius-lg)";
        iframeElement.style.display = "block";
        iframeElement.style.margin = "2em auto";
        iframeElement.style.boxShadow = "var(--shadow-md)";

        // Security attributes
        iframeElement.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin",
        );
        iframeElement.setAttribute("loading", "lazy");

        containerElement.appendChild(iframeElement);
    } else {
        // In editor mode, show URL for editing
        const inputElement = document.createElement("input");
        inputElement.type = "url";
        inputElement.value = entity.DATA.href;
        inputElement.placeholder = "Enter embedding URL...";
        inputElement.className = "embedding-url-input";

        // Style the input
        inputElement.style.width = "100%";
        inputElement.style.padding = "var(--space-3)";
        inputElement.style.backgroundColor = "var(--bg-code)";
        inputElement.style.border = "1px solid var(--border-medium)";
        inputElement.style.borderRadius = "var(--radius-sm)";
        inputElement.style.color = "var(--text-primary)";
        inputElement.style.fontFamily = "var(--font-mono)";
        inputElement.style.fontSize = "14px";

        containerElement.appendChild(inputElement);
    }

    return containerElement;
}
