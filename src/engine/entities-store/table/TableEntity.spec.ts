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
        expect(entity.DATA).toEqual([]);
        expect(entity.OPTIONS).toEqual({ orderBy: "" });
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = [["a"]];
        const options = { orderBy: "a" };
        const entity = new TableEntity(data, options);
        expect(entity.DATA).toEqual(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
