/**
 * src/engine/entities-store/quote/QuoteEntity.spec.ts
 * Unit tests for QuoteEntity
 */

import { QuoteEntity } from "./QuoteEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("QuoteEntity", () => {
    it("should initialize with default values", () => {
        const entity = new QuoteEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.QUOTE);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("blockquote");
    });

    it("should initialize with provided values", () => {
        const data = "This is a quote";
        const options = { author: "Someone" };
        const entity = new QuoteEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
