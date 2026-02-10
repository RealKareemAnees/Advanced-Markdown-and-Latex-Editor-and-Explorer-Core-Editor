/**
 * src/engine/rendering/factories/HtmlRender.factory.ts
 * Render factory for HTML entities
 *
 * Creates a DOM element representation of an HTML entity following the
 * application's styling guidelines. Safely renders HTML content.
 */

import { HtmlEntity } from "../../../entities-store/html/HtmlEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * HTML render factory class
 */
export class HtmlRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: HtmlEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content html-block";
        const preElement = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.textContent = this.entity.DATA;
        codeElement.contentEditable = "true";
        codeElement.className = "language-html";
        preElement.appendChild(codeElement);
        containerElement.appendChild(preElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content html-block";
        containerElement.innerHTML = this.entity.DATA;
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
