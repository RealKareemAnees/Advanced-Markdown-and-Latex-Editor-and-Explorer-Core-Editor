/**
 * src/engine/rendering/factories/CheckboxRender.factory.ts
 * Render factory for Checkbox entities
 *
 * Creates a DOM element representation of a Checkbox entity following the
 * application's styling guidelines with custom styled checkboxes.
 */

import { CheckboxEntity } from "../../../entities-store/checkbox/CheckboxEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Checkbox render factory function
 *
 * @param entity - The Checkbox entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLDivElement containing checkbox and label
 */
export function CheckboxRenderFactory(
    entity: CheckboxEntity,
    mode: RenderMode,
): HTMLDivElement {
    // Create container div for checkbox and label
    const containerElement = document.createElement("div");
    containerElement.className = "task-list editor-content";

    // Create the checkbox input element
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.className = "editor-content";

    // Create label for the checkbox text
    const labelElement = document.createElement("label");
    labelElement.textContent = entity.DATA;

    // Set content editable for label in editor mode
    if (mode === "EDITOR") {
        labelElement.contentEditable = "true";
    }

    // Append checkbox and label to container
    containerElement.appendChild(checkboxElement);
    containerElement.appendChild(labelElement);

    return containerElement;
}
