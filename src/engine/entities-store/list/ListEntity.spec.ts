/**
 * src/engine/entities-store/list/ListEntity.spec.ts
 * Unit tests for ListEntity
 */

import { ListEntity } from "./ListEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("ListEntity", () => {
    it("should initialize with default values", () => {
        const entity = new ListEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.LIST);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("ul");
    });

    it("should initialize with provided values", () => {
        const data = "List item";
        const options = { ordered: false };
        const entity = new ListEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
