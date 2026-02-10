/**
 * src/engine/rendering/factories/ParagraphRender.factory.ts
 * Render factory for Paragraph entities
 *
 * Creates a DOM element representation of a Paragraph entity following the
 * application's styling guidelines.
 */

import { ParagraphEntity } from "../../../entities-store/paragraph/ParagraphEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Paragraph render factory class
 */
export class ParagraphRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: ParagraphEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const pElement = document.createElement("p");
        pElement.textContent = this.entity.DATA;
        pElement.className = "editor-content";
        pElement.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(pElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const pElement = document.createElement("p");
        pElement.textContent = this.entity.DATA;
        pElement.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(pElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
