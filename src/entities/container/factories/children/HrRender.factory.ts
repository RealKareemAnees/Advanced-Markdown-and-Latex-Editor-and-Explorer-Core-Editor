/**
 * src/engine/rendering/factories/HrRender.factory.ts
 * Render factory for Horizontal Rule (HR) entities
 *
 * Creates a DOM element representation of an HR entity following the
 * application's styling guidelines with gradient and section symbol.
 */

import { HrEntity } from "../../../entities-store/hr/HrEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Horizontal Rule render factory class
 */
export class HrRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: HrEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const hrElement = document.createElement("hr");
        hrElement.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(hrElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const hrElement = document.createElement("hr");
        hrElement.className = "editor-content";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(hrElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
