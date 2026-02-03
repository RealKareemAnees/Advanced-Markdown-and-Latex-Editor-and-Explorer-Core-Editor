/**
 * src/engine/entities-store/table/TableEntity.spec.ts
 * Unit tests for TableEntity
 */

import { TableEntity } from "./TableEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("TableEntity", () => {
    it("should initialize with default values", () => {
        const entity = new TableEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.TABLE);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("table");
    });

    it("should initialize with provided values", () => {
        const data = "table data";
        const options = { columns: 3 };
        const entity = new TableEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
