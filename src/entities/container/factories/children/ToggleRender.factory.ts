/**
 * src/engine/rendering/factories/ToggleRender.factory.ts
 * Render factory for Toggle entities
 *
 * Creates a DOM element representation of a Toggle entity following the
 * application's styling guidelines with collapsible content.
 */

import { ToggleEntity } from "../../../entities-store/toggle/ToggleEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Toggle render factory class
 */
export class ToggleRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: ToggleEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const detailsElement = document.createElement("details");
        detailsElement.className = "editor-content";

        const summaryElement = document.createElement("summary");
        summaryElement.textContent = this.entity.DATA;
        summaryElement.contentEditable = "true";

        detailsElement.appendChild(summaryElement);

        this.CONTAINER.CONTENT_WRAPPER.appendChild(detailsElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const detailsElement = document.createElement("details");
        detailsElement.className = "editor-content";

        const summaryElement = document.createElement("summary");
        summaryElement.textContent = this.entity.DATA;

        detailsElement.appendChild(summaryElement);

        this.CONTAINER.CONTENT_WRAPPER.appendChild(detailsElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
