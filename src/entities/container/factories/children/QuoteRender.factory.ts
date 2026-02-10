/**
 * src/engine/rendering/factories/QuoteRender.factory.ts
 * Render factory for Quote entities
 *
 * Creates a DOM element representation of a Quote entity following the
 * application's styling guidelines with left accent border and decorative quote mark.
 */

import { QuoteEntity } from "../../../entities-store/quote/QuoteEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Quote render factory class
 */
export class QuoteRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: QuoteEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const quoteElement = document.createElement("blockquote");
        quoteElement.textContent = this.entity.DATA;
        quoteElement.className = "editor-content";
        quoteElement.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(quoteElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const quoteElement = document.createElement("blockquote");
        quoteElement.textContent = this.entity.DATA;
        quoteElement.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(quoteElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
