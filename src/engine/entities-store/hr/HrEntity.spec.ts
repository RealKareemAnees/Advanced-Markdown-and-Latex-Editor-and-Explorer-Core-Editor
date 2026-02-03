/**
 * src/engine/entities-store/hr/HrEntity.spec.ts
 * Unit tests for HrEntity
 */

import { HrEntity } from "./HrEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("HrEntity", () => {
    it("should initialize with default values", () => {
        const entity = new HrEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.HR);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("hr");
    });

    it("should initialize with provided values", () => {
        const data = "";
        const options = { style: "dashed" };
        const entity = new HrEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
