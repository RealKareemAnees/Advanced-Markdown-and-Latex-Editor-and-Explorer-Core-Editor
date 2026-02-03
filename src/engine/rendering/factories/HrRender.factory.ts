/**
 * src/engine/rendering/factories/HrRender.factory.ts
 * Render factory for Horizontal Rule (HR) entities
 *
 * Creates a DOM element representation of an HR entity following the
 * application's styling guidelines with gradient and section symbol.
 */

import { HrEntity } from "../../entities-store/hr/HrEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Horizontal Rule render factory function
 *
 * @param entity - The HR entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLHRElement
 */
export function HrRenderFactory(
    _entity: HrEntity,
    _mode: RenderMode,
): HTMLHRElement {
    // Create the hr element
    const hrElement = document.createElement("hr");

    // Apply styling classes following the design system
    // CSS in assets/style.css includes:
    // - Gradient background (fade effect)
    // - Section symbol (§) in ::after pseudo-element
    hrElement.className = "editor-content";

    // HR is not editable (it has no content)
    // Mode parameter included for consistency with other factories

    return hrElement;
}
