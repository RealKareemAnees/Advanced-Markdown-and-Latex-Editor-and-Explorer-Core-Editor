/**
 * src/engine/rendering/factories/TableRender.factory.ts
 * Render factory for Table entities
 *
 * Creates a DOM element representation of a Table entity following the
 * application's styling guidelines with proper table structure.
 */

import { TableEntity } from "../../../entities-store/table/TableEntity";

/**
 * Render mode for the entity
 */
type RenderMode = "EDITOR" | "PREVIEW";

/**
 * Table render factory function
 *
 * @param entity - The Table entity to render
 * @param mode - The render mode (EDITOR or PREVIEW)
 * @returns A rendered HTMLTableElement
 */
export function TableRenderFactory(
    entity: TableEntity,
    mode: RenderMode,
): HTMLTableElement {
    // Create the table element
    const tableElement = document.createElement("table");
    tableElement.className = "editor-content";

    // If no data, return empty table
    if (!entity.DATA || entity.DATA.length === 0) {
        return tableElement;
    }

    // Create thead with first row as headers
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // First row becomes headers
    entity.DATA[0].forEach((cellData) => {
        const th = document.createElement("th");
        th.textContent = cellData;

        if (mode === "EDITOR") {
            th.contentEditable = "true";
        }

        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tableElement.appendChild(thead);

    // Create tbody with remaining rows
    if (entity.DATA.length > 1) {
        const tbody = document.createElement("tbody");

        for (let i = 1; i < entity.DATA.length; i++) {
            const row = document.createElement("tr");

            entity.DATA[i].forEach((cellData) => {
                const td = document.createElement("td");
                td.textContent = cellData;

                if (mode === "EDITOR") {
                    td.contentEditable = "true";
                }

                row.appendChild(td);
            });

            tbody.appendChild(row);
        }

        tableElement.appendChild(tbody);
    }

    return tableElement;
}
