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
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = "A famous quote";
        const entity = new QuoteEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
