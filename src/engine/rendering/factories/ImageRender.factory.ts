/**
 * src/engine/rendering/factories/ImageRender.factory.ts
 * Render factory for Image entities
 *
 * Creates a DOM element representation of an Image entity following the
 * application's styling guidelines with proper styling and borders.
 */

import { ImageEntity } from "../../entities-store/image/ImageEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Image render factory function
 *
 * @param entity - The Image entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLImageElement
 */
export function ImageRenderFactory(
    entity: ImageEntity,
    _mode: RenderMode,
): HTMLImageElement {
    // Create the img element
    const imgElement = document.createElement("img");

    // Set the image source from entity data (URL)
    imgElement.src = entity.DATA.href;

    // Apply styling classes following the design system
    // CSS in assets/style.css includes:
    // - Max-width 100% (responsive)
    // - Border-radius for rounded corners
    // - Box shadow for elevation
    // - Border for subtle framing
    imgElement.className = "editor-content";

    // Set alt text (could be enhanced to use entity options if needed)
    imgElement.alt = "Image";

    // Images are not directly editable in the traditional sense
    // Mode parameter included for consistency with other factories

    return imgElement;
}
