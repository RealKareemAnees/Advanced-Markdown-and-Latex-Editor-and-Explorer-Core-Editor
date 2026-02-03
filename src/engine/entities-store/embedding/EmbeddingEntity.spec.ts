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
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("iframe");
    });

    it("should initialize with provided values", () => {
        const data = "https://example.com/embed";
        const options = { width: 800, height: 600 };
        const entity = new EmbeddingEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
