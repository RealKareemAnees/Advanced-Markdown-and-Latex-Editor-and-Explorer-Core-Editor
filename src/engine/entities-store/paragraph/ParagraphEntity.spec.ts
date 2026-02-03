/**
 * src/engine/entities-store/paragraph/ParagraphEntity.spec.ts
 * Unit tests for ParagraphEntity
 */

import { ParagraphEntity } from "./ParagraphEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("ParagraphEntity", () => {
    it("should initialize with default values", () => {
        const entity = new ParagraphEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.PARAGRAPH);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("p");
    });

    it("should initialize with provided values", () => {
        const data = "Test paragraph text";
        const entity = new ParagraphEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
