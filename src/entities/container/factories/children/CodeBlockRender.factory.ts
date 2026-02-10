/**
 * src/engine/rendering/factories/CodeBlockRender.factory.ts
 * Render factory for Code Block entities
 *
 * Creates a DOM element representation of a Code Block entity following the
 * application's styling guidelines with syntax highlighting support.
 */

import { CodeBlockEntity } from "../../../entities-store/code-block/CodeBlockEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Code Block render factory class
 */
export class CodeBlockRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: CodeBlockEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const preElement = document.createElement("pre");
        preElement.className = "editor-content";
        const codeElement = document.createElement("code");
        codeElement.textContent = this.entity.DATA;
        if (this.entity.OPTIONS.language) {
            codeElement.className = `language-${this.entity.OPTIONS.language}`;
        }
        codeElement.contentEditable = "true";
        preElement.appendChild(codeElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(preElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const preElement = document.createElement("pre");
        preElement.className = "editor-content";
        const codeElement = document.createElement("code");
        codeElement.textContent = this.entity.DATA;
        if (this.entity.OPTIONS.language) {
            codeElement.className = `language-${this.entity.OPTIONS.language}`;
        }
        preElement.appendChild(codeElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(preElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
