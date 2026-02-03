/**
 * src/engine/rendering/factories/LatexRender.factory.ts
 * Render factory for LaTeX entities
 *
 * Creates a DOM element representation of a LaTeX entity following the
 * application's styling guidelines. Renders LaTeX math expressions.
 */

import { LatexEntity } from "../../entities-store/latex/LatexEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * LaTeX render factory function
 *
 * @param entity - The LaTeX entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDivElement containing the LaTeX content
 */
export function LatexRenderFactory(
    entity: LatexEntity,
    mode: RenderMode,
): HTMLDivElement {
    // Create a container div
    const containerElement = document.createElement("div");
    containerElement.className = "editor-content latex-block";

    // In preview mode, render the LaTeX using KaTeX or MathJax
    // In editor mode, show the raw LaTeX for editing
    if (mode === "PREVIEW") {
        // Set the LaTeX content
        // Note: In production, this should be processed by KaTeX or MathJax
        // For now, we wrap it in display math delimiters
        containerElement.textContent = `$$ ${entity.DATA} $$`;
        containerElement.style.textAlign = "center";
        containerElement.style.padding = "var(--space-6)";
        containerElement.style.margin = "2em 0";
        containerElement.style.backgroundColor = "var(--bg-card)";
        containerElement.style.borderRadius = "var(--radius-md)";
        containerElement.style.fontFamily = "var(--font-serif)";
        containerElement.style.fontSize = "1.2em";
    } else {
        // In editor mode, show raw LaTeX
        const preElement = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.textContent = entity.DATA;
        codeElement.contentEditable = "true";
        codeElement.className = "language-latex";
        preElement.appendChild(codeElement);
        containerElement.appendChild(preElement);
    }

    return containerElement;
}
