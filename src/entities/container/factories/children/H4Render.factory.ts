/**
 * src/engine/rendering/factories/H4Render.factory.ts
 * Render factory for H4 heading entities
 *
 * Creates a DOM element representation of an H4 entity following the
 * application's styling guidelines.
 */

import { H4Entity } from "../../../entities-store/h4/H4Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H4 render factory class
 */
export class H4RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H4Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h4Element = document.createElement("h4");
        h4Element.textContent = this.entity.DATA;
        h4Element.className = "editor-content";
        h4Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h4Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h4Element = document.createElement("h4");
        h4Element.textContent = this.entity.DATA;
        h4Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h4Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
