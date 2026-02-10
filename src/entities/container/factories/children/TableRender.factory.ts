/**
 * src/engine/rendering/factories/TableRender.factory.ts
 * Render factory for Table entities
 *
 * Creates a DOM element representation of a Table entity following the
 * application's styling guidelines with proper table structure.
 */

import { TableEntity } from "../../../entities-store/table/TableEntity";
import { ContainerRenderFactoryInterface } from "../ContainerRender.factory.abstract";
import type { ContainerInterface } from "../../../../types/Container.interface";

/**
 * Table render factory class
 */
export class TableRenderFactory extends ContainerRenderFactoryInterface {
    constructor(entity: TableEntity, container: ContainerInterface) {
        super(entity, container);
    }

    protected renderEditorContent(): ContainerRenderFactoryInterface {
        const tableElement = document.createElement("table");
        tableElement.className = "editor-content";

        if (!this.entity.DATA || this.entity.DATA.length === 0) {
            this.CONTAINER.CONTENT_WRAPPER.appendChild(tableElement);
            return this;
        }

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        this.entity.DATA[0].forEach((cellData) => {
            const th = document.createElement("th");
            th.textContent = cellData;
            th.contentEditable = "true";
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        tableElement.appendChild(thead);

        if (this.entity.DATA.length > 1) {
            const tbody = document.createElement("tbody");

            for (let i = 1; i < this.entity.DATA.length; i++) {
                const row = document.createElement("tr");

                this.entity.DATA[i].forEach((cellData) => {
                    const td = document.createElement("td");
                    td.textContent = cellData;
                    td.contentEditable = "true";
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            }

            tableElement.appendChild(tbody);
        }

        this.CONTAINER.CONTENT_WRAPPER.appendChild(tableElement);
        return this;
    }

    protected renderPreviewContent(): ContainerRenderFactoryInterface {
        const tableElement = document.createElement("table");
        tableElement.className = "editor-content";

        if (!this.entity.DATA || this.entity.DATA.length === 0) {
            this.CONTAINER.CONTENT_WRAPPER.appendChild(tableElement);
            return this;
        }

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        this.entity.DATA[0].forEach((cellData) => {
            const th = document.createElement("th");
            th.textContent = cellData;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        tableElement.appendChild(thead);

        if (this.entity.DATA.length > 1) {
            const tbody = document.createElement("tbody");

            for (let i = 1; i < this.entity.DATA.length; i++) {
                const row = document.createElement("tr");

                this.entity.DATA[i].forEach((cellData) => {
                    const td = document.createElement("td");
                    td.textContent = cellData;
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            }

            tableElement.appendChild(tbody);
        }

        this.CONTAINER.CONTENT_WRAPPER.appendChild(tableElement);
        return this;
    }

    protected shipToDOM(): void {
        this.CONTAINER.render();
    }
}
