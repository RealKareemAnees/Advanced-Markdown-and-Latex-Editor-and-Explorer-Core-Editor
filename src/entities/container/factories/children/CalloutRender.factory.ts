/**
 * src/engine/rendering/factories/CalloutRender.factory.ts
 * Render factory for Callout entities
 *
 * Creates a DOM element representation of a Callout entity following the
 * application's styling guidelines with icon and colored border.
 */

import {
    CalloutEntity,
    type CalloutOptionsType,
} from "../../../entities-store/callout/CalloutEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Maps callout type to icon representation
 */
const CALLOUT_ICONS: Record<CalloutOptionsType["type"], string> = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✅",
};

/**
 * Callout render factory class
 */
export class CalloutRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: CalloutEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const calloutElement = document.createElement("div");
        calloutElement.className = "callout";

        const iconElement = document.createElement("div");
        iconElement.className = "callout-icon";
        iconElement.textContent = CALLOUT_ICONS[this.entity.OPTIONS.type];

        const contentElement = document.createElement("div");
        contentElement.className = "callout-content";
        contentElement.textContent = this.entity.DATA;
        contentElement.contentEditable = "true";

        calloutElement.appendChild(iconElement);
        calloutElement.appendChild(contentElement);

        this.CONTAINER.CONTENT_WRAPPER.appendChild(calloutElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const calloutElement = document.createElement("div");
        calloutElement.className = "callout";

        const iconElement = document.createElement("div");
        iconElement.className = "callout-icon";
        iconElement.textContent = CALLOUT_ICONS[this.entity.OPTIONS.type];

        const contentElement = document.createElement("div");
        contentElement.className = "callout-content";
        contentElement.textContent = this.entity.DATA;

        calloutElement.appendChild(iconElement);
        calloutElement.appendChild(contentElement);

        this.CONTAINER.CONTENT_WRAPPER.appendChild(calloutElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
