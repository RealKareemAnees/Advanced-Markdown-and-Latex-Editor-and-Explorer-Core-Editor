/**
 * src/engine/rendering/factories/H2Render.factory.ts
 * Render factory for H2 heading entities
 *
 * Creates a DOM element representation of an H2 entity following the
 * application's styling guidelines.
 */

import { H2Entity } from "../../../entities-store/h2/H2Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H2 render factory class
 */
export class H2RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H2Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h2Element = document.createElement("h2");
        h2Element.textContent = this.entity.DATA;
        h2Element.className = "editor-content";
        h2Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h2Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h2Element = document.createElement("h2");
        h2Element.textContent = this.entity.DATA;
        h2Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h2Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
