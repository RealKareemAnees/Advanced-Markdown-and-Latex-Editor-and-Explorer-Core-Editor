/**
 * src/engine/rendering/factories/VideoRender.factory.ts
 * Render factory for Video entities
 *
 * Creates a DOM element representation of a Video entity following the
 * application's styling guidelines with HTML5 video controls.
 */

import { VideoEntity } from "../../../entities-store/video/VideoEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Video render factory class
 */
export class VideoRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: VideoEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const videoElement = document.createElement("video");
        videoElement.src = this.entity.DATA.href;
        videoElement.className = "editor-content";
        videoElement.controls = true;
        videoElement.style.maxWidth = "100%";
        videoElement.style.height = "auto";
        videoElement.style.display = "block";
        videoElement.style.margin = "3.5em auto";
        videoElement.style.borderRadius = "var(--radius-lg)";
        videoElement.style.boxShadow = "var(--shadow-lg)";
        videoElement.style.border = "1px solid var(--border-subtle)";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(videoElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const videoElement = document.createElement("video");
        videoElement.src = this.entity.DATA.href;
        videoElement.className = "editor-content";
        videoElement.controls = true;
        videoElement.style.maxWidth = "100%";
        videoElement.style.height = "auto";
        videoElement.style.display = "block";
        videoElement.style.margin = "3.5em auto";
        videoElement.style.borderRadius = "var(--radius-lg)";
        videoElement.style.boxShadow = "var(--shadow-lg)";
        videoElement.style.border = "1px solid var(--border-subtle)";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(videoElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
