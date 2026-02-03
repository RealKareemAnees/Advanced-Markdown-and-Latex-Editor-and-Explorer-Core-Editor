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
} from "../../entities-store/callout/CalloutEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

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
 * Callout render factory function
 *
 * @param entity - The Callout entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDivElement with callout styling
 */
export function CalloutRenderFactory(
    entity: CalloutEntity,
    mode: RenderMode,
): HTMLDivElement {
    // Create the callout container
    const calloutElement = document.createElement("div");
    calloutElement.className = "callout";

    // Create icon container
    const iconElement = document.createElement("div");
    iconElement.className = "callout-icon";
    iconElement.textContent = CALLOUT_ICONS[entity.OPTIONS.type];

    // Create content container
    const contentElement = document.createElement("div");
    contentElement.className = "callout-content";
    contentElement.textContent = entity.DATA;

    // Set content editable for content in editor mode
    if (mode === "EDITOR") {
        contentElement.contentEditable = "true";
    }

    // Append icon and content to callout
    calloutElement.appendChild(iconElement);
    calloutElement.appendChild(contentElement);

    return calloutElement;
}
