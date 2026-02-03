/**
 * src/engine/entities-store/oi/OiEntity.spec.ts
 * Unit tests for OiEntity
 */

import { OiEntity } from "./OiEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("OiEntity", () => {
    it("should initialize with default values", () => {
        const entity = new OiEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.OI);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("li");
    });

    it("should initialize with provided values", () => {
        const data = "Item 1";
        const entity = new OiEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
