/**
 * src/engine/entities-store/embedding/EmbeddingEntity.spec.ts
 * Unit tests for EmbeddingEntity
 */

import { EmbeddingEntity } from "./EmbeddingEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("EmbeddingEntity", () => {
    it("should initialize with default values", () => {
        const entity = new EmbeddingEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.EMBEDDING);
        expect(entity.DATA).toEqual(new URL("about:blank"));
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("iframe");
    });

    it("should initialize with provided values", () => {
        const data = new URL("https://example.com/embed");
        const entity = new EmbeddingEntity(data);
        expect(entity.DATA).toEqual(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
