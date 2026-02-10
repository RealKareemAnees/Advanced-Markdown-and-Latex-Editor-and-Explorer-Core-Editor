/**
 * src/engine/rendering/factories/EmbeddingRender.factory.ts
 * Render factory for Embedding entities
 *
 * Creates a DOM element representation of an Embedding entity following the
 * application's styling guidelines. Embeds external content via iframes.
 */

import { EmbeddingEntity } from "../../../entities-store/embedding/EmbeddingEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Embedding render factory class
 */
export class EmbeddingRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: EmbeddingEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content embedding-block";
        const inputElement = document.createElement("input");
        inputElement.type = "url";
        inputElement.value = this.entity.DATA.href;
        inputElement.placeholder = "Enter embedding URL...";
        inputElement.className = "embedding-url-input";
        inputElement.style.width = "100%";
        inputElement.style.padding = "var(--space-3)";
        inputElement.style.backgroundColor = "var(--bg-code)";
        inputElement.style.border = "1px solid var(--border-medium)";
        inputElement.style.borderRadius = "var(--radius-sm)";
        inputElement.style.color = "var(--text-primary)";
        inputElement.style.fontFamily = "var(--font-mono)";
        inputElement.style.fontSize = "14px";
        containerElement.appendChild(inputElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "editor-content embedding-block";
        const iframeElement = document.createElement("iframe");
        iframeElement.src = this.entity.DATA.href;
        iframeElement.className = "embedded-content";
        iframeElement.style.width = "100%";
        iframeElement.style.minHeight = "400px";
        iframeElement.style.border = "1px solid var(--border-medium)";
        iframeElement.style.borderRadius = "var(--radius-lg)";
        iframeElement.style.display = "block";
        iframeElement.style.margin = "2em auto";
        iframeElement.style.boxShadow = "var(--shadow-md)";
        iframeElement.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin",
        );
        iframeElement.setAttribute("loading", "lazy");
        containerElement.appendChild(iframeElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
