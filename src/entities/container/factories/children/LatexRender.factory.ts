/**
 * src/engine/rendering/factories/LatexRender.factory.ts
 * Render factory for LaTeX entities
 *
 * Creates a DOM element representation of a LaTeX entity following the
 * application's styling guidelines. Renders LaTeX math expressions.
 */

import { LatexEntity } from "../../../entities-store/latex/LatexEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * LaTeX render factory class
 */
export class LatexRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: LatexEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content latex-block";
        const preElement = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.textContent = this.entity.DATA;
        codeElement.contentEditable = "true";
        codeElement.className = "language-latex";
        preElement.appendChild(codeElement);
        containerElement.appendChild(preElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content latex-block";
        containerElement.textContent = `$$ ${this.entity.DATA} $$`;
        containerElement.style.textAlign = "center";
        containerElement.style.padding = "var(--space-6)";
        containerElement.style.margin = "2em 0";
        containerElement.style.backgroundColor = "var(--bg-card)";
        containerElement.style.borderRadius = "var(--radius-md)";
        containerElement.style.fontFamily = "var(--font-serif)";
        containerElement.style.fontSize = "1.2em";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
