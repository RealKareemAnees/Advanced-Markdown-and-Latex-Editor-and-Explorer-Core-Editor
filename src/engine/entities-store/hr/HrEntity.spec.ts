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
        expect(entity.DATA).toBeNull();
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("hr");
    });

    it("should have null data and options", () => {
        const entity = new HrEntity();
        expect(entity.DATA).toBeNull();
        expect(entity.OPTIONS).toBeNull();
    });
});
