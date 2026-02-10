/**
 * src/engine/rendering/factories/OiRender.factory.ts
 * Render factory for Ordered List Item (OI) entities
 *
 * Creates a DOM element representation of an ordered list item entity following
 * the application's styling guidelines.
 */

import { OiEntity } from "../../../entities-store/oi/OiEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Ordered List Item render factory class
 */
export class OiRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: OiEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const liElement = document.createElement("li");
        liElement.textContent = this.entity.DATA;
        liElement.className = "editor-content";
        liElement.contentEditable = "true";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(liElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const liElement = document.createElement("li");
        liElement.textContent = this.entity.DATA;
        liElement.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(liElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
