/**
 * src/engine/entities-store/image/ImageEntity.spec.ts
 * Unit tests for ImageEntity
 */

import { ImageEntity } from "./ImageEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("ImageEntity", () => {
    it("should initialize with default values", () => {
        const entity = new ImageEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.IMAGE);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("img");
    });

    it("should initialize with provided values", () => {
        const data = "image.png";
        const options = { alt: "Test image" };
        const entity = new ImageEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
