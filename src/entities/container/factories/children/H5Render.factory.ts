/**
 * src/engine/rendering/factories/H5Render.factory.ts
 * Render factory for H5 heading entities
 *
 * Creates a DOM element representation of an H5 entity following the
 * application's styling guidelines.
 */

import { H5Entity } from "../../../entities-store/h5/H5Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H5 render factory class
 */
export class H5RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H5Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h5Element = document.createElement("h5");
        h5Element.textContent = this.entity.DATA;
        h5Element.className = "editor-content";
        h5Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h5Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h5Element = document.createElement("h5");
        h5Element.textContent = this.entity.DATA;
        h5Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h5Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
