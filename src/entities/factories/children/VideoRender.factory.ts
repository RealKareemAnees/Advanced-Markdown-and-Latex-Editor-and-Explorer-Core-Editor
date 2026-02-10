/**
 * src/engine/rendering/factories/VideoRender.factory.ts
 * Render factory for Video entities
 *
 * Creates a DOM element representation of a Video entity following the
 * application's styling guidelines with HTML5 video controls.
 */

import { VideoEntity } from "../../../entities-store/video/VideoEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Video render factory function
 *
 * @param entity - The Video entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLVideoElement
 */
export function VideoRenderFactory(
    entity: VideoEntity,
    _mode: RenderMode,
): HTMLVideoElement {
    // Create the video element
    const videoElement = document.createElement("video");

    // Set the video source from entity data (URL)
    videoElement.src = entity.DATA.href;

    // Apply styling classes following the design system
    // Similar styling to images: responsive, rounded, shadowed
    videoElement.className = "editor-content";

    // Enable video controls
    videoElement.controls = true;

    // Set responsive dimensions
    videoElement.style.maxWidth = "100%";
    videoElement.style.height = "auto";
    videoElement.style.display = "block";
    videoElement.style.margin = "3.5em auto";
    videoElement.style.borderRadius = "var(--radius-lg)";
    videoElement.style.boxShadow = "var(--shadow-lg)";
    videoElement.style.border = "1px solid var(--border-subtle)";

    // Videos are not directly editable
    // Mode parameter included for consistency with other factories

    return videoElement;
}
