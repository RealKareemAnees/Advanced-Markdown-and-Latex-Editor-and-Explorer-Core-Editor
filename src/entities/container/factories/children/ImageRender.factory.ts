/**
 * src/engine/rendering/factories/ImageRender.factory.ts
 * Render factory for Image entities
 *
 * Creates a DOM element representation of an Image entity following the
 * application's styling guidelines with proper styling and borders.
 */

import { ImageEntity } from "../../../entities-store/image/ImageEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Image render factory class
 */
export class ImageRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: ImageEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const imgElement = document.createElement("img");
        imgElement.src = this.entity.DATA.href;
        imgElement.className = "editor-content";
        imgElement.alt = "Image";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(imgElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const imgElement = document.createElement("img");
        imgElement.src = this.entity.DATA.href;
        imgElement.className = "editor-content";
        imgElement.alt = "Image";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(imgElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
