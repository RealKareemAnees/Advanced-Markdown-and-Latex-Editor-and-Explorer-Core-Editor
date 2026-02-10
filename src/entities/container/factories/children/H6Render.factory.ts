/**
 * src/engine/rendering/factories/H6Render.factory.ts
 * Render factory for H6 heading entities
 *
 * Creates a DOM element representation of an H6 entity following the
 * application's styling guidelines.
 */

import { H6Entity } from "../../../entities-store/h6/H6Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H6 render factory class
 */
export class H6RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H6Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h6Element = document.createElement("h6");
        h6Element.textContent = this.entity.DATA;
        h6Element.className = "editor-content";
        h6Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h6Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h6Element = document.createElement("h6");
        h6Element.textContent = this.entity.DATA;
        h6Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h6Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
