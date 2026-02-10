/**
 * src/engine/rendering/factories/CheckboxRender.factory.ts
 * Render factory for Checkbox entities
 *
 * Creates a DOM element representation of a Checkbox entity following the
 * application's styling guidelines with custom styled checkboxes.
 */

import { CheckboxEntity } from "../../../entities-store/checkbox/CheckboxEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Checkbox render factory class
 */
export class CheckboxRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: CheckboxEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "task-list editor-content";
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.className = "editor-content";
        const labelElement = document.createElement("label");
        labelElement.textContent = this.entity.DATA;
        labelElement.contentEditable = "true";
        containerElement.appendChild(checkboxElement);
        containerElement.appendChild(labelElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const containerElement = document.createElement("div");
        containerElement.className = "task-list editor-content";
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.className = "editor-content";
        const labelElement = document.createElement("label");
        labelElement.textContent = this.entity.DATA;
        containerElement.appendChild(checkboxElement);
        containerElement.appendChild(labelElement);
        this.CONTAINER.CONTENT_WRAPPER.appendChild(containerElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
