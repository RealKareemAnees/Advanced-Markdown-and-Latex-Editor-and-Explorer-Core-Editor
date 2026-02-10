/**
 * src/engine/rendering/factories/CodeBlockRender.factory.ts
 * Render factory for Code Block entities
 *
 * Creates a DOM element representation of a Code Block entity following the
 * application's styling guidelines with syntax highlighting support.
 */

import { CodeBlockEntity } from "../../../entities-store/code-block/CodeBlockEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Code Block render factory function
 *
 * @param entity - The Code Block entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLPreElement with code element
 */
export function CodeBlockRenderFactory(
    entity: CodeBlockEntity,
    mode: RenderMode,
): HTMLPreElement {
    // Create the pre element
    const preElement = document.createElement("pre");
    preElement.className = "editor-content";

    // Create the code element inside pre
    const codeElement = document.createElement("code");
    codeElement.textContent = entity.DATA;

    // Add language class if specified (for syntax highlighting)
    if (entity.OPTIONS.language) {
        codeElement.className = `language-${entity.OPTIONS.language}`;
    }

    // Set content editable for code in editor mode
    if (mode === "EDITOR") {
        codeElement.contentEditable = "true";
    }

    // Append code to pre
    preElement.appendChild(codeElement);

    return preElement;
}
