/**
 * src/engine/rendering/factories/H3Render.factory.ts
 * Render factory for H3 heading entities
 *
 * Creates a DOM element representation of an H3 entity following the
 * application's styling guidelines.
 */

import { H3Entity } from "../../../entities-store/h3/H3Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H3 render factory class
 */
export class H3RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H3Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h3Element = document.createElement("h3");
        h3Element.textContent = this.entity.DATA;
        h3Element.className = "editor-content";
        h3Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h3Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h3Element = document.createElement("h3");
        h3Element.textContent = this.entity.DATA;
        h3Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h3Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
