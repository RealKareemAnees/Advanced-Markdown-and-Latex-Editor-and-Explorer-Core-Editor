/**
 * src/engine/rendering/factories/AudioRender.factory.ts
 * Render factory for Audio entities
 *
 * Creates a DOM element representation of an Audio entity following the
 * application's styling guidelines with HTML5 audio controls.
 */

import { AudioEntity } from "../../../entities-store/audio/AudioEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Audio render factory function
 *
 * @param entity - The Audio entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLAudioElement
 */
export function AudioRenderFactory(
    entity: AudioEntity,
    _mode: RenderMode,
): HTMLAudioElement {
    // Create the audio element
    const audioElement = document.createElement("audio");

    // Set the audio source from entity data (URL)
    audioElement.src = entity.DATA.href;

    // Apply styling classes following the design system
    audioElement.className = "editor-content";

    // Enable audio controls
    audioElement.controls = true;

    // Set responsive dimensions
    audioElement.style.width = "100%";
    audioElement.style.maxWidth = "760px";
    audioElement.style.display = "block";
    audioElement.style.margin = "2em auto";
    audioElement.style.borderRadius = "var(--radius-md)";
    audioElement.style.backgroundColor = "var(--bg-card)";
    audioElement.style.padding = "var(--space-2)";

    // Audio elements are not directly editable
    // Mode parameter included for consistency with other factories

    return audioElement;
}
