/**
 * src/engine/entities-store/html/HtmlEntity.spec.ts
 * Unit tests for HtmlEntity
 */

import { HtmlEntity } from "./HtmlEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("HtmlEntity", () => {
    it("should initialize with default values", () => {
        const entity = new HtmlEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.HTML);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
    });

    it("should initialize with provided values", () => {
        const data = "<div>HTML content</div>";
        const entity = new HtmlEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
