/**
 * src/engine/rendering/factories/AudioRender.factory.ts
 * Render factory for Audio entities
 *
 * Creates a DOM element representation of an Audio entity following the
 * application's styling guidelines with HTML5 audio controls.
 */

import { AudioEntity } from "../../../entities-store/audio/AudioEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Audio render factory class
 */
export class AudioRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: AudioEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const audioElement = document.createElement("audio");
        audioElement.src = this.entity.DATA.href;
        audioElement.className = "editor-content";
        audioElement.controls = true;
        audioElement.style.width = "100%";
        audioElement.style.maxWidth = "760px";
        audioElement.style.display = "block";
        audioElement.style.margin = "2em auto";
        audioElement.style.borderRadius = "var(--radius-md)";
        audioElement.style.backgroundColor = "var(--bg-card)";
        audioElement.style.padding = "var(--space-2)";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(audioElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const audioElement = document.createElement("audio");
        audioElement.src = this.entity.DATA.href;
        audioElement.className = "editor-content";
        audioElement.controls = true;
        audioElement.style.width = "100%";
        audioElement.style.maxWidth = "760px";
        audioElement.style.display = "block";
        audioElement.style.margin = "2em auto";
        audioElement.style.borderRadius = "var(--radius-md)";
        audioElement.style.backgroundColor = "var(--bg-card)";
        audioElement.style.padding = "var(--space-2)";
        this.CONTAINER.CONTENT_WRAPPER.appendChild(audioElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
