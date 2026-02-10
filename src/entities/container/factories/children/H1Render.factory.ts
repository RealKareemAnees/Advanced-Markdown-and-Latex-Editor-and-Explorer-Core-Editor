/**
 * src/engine/rendering/factories/H1Render.factory.ts
 * Render factory for H1 heading entities
 *
 * Creates a DOM element representation of an H1 entity following the
 * application's styling guidelines.
 */

import { H1Entity } from "../../../entities-store/h1/H1Entity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * H1 render factory class
 */
export class H1RenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: H1Entity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const h1Element = document.createElement("h1");
        h1Element.textContent = this.entity.DATA;
        h1Element.className = "editor-content";
        h1Element.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h1Element);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const h1Element = document.createElement("h1");
        h1Element.textContent = this.entity.DATA;
        h1Element.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(h1Element);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
