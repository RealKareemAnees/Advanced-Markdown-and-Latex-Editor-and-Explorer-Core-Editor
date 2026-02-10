/**
 * src/engine/rendering/factories/UiRender.factory.ts
 * Render factory for Unordered List Item (UI) entities
 *
 * Creates a DOM element representation of an unordered list item entity following
 * the application's styling guidelines.
 */

import { UiEntity } from "../../../entities-store/ui/UiEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Unordered List Item render factory class
 */
export class UiRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: UiEntity, container: ContainerInterface) {
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
