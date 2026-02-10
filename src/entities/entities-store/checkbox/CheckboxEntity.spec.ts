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
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = "Task item";
        const entity = new CheckboxEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
