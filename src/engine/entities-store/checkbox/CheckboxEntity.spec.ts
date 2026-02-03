/**
 * src/engine/entities-store/checkbox/CheckboxEntity.spec.ts
 * Unit tests for CheckboxEntity
 */

import { CheckboxEntity } from "./CheckboxEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("CheckboxEntity", () => {
    it("should initialize with default values", () => {
        const entity = new CheckboxEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.CHECKBOX);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
    });

    it("should initialize with provided values", () => {
        const data = "Task item";
        const options = { checked: true };
        const entity = new CheckboxEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
