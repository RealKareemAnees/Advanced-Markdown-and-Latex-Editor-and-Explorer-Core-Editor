/**
 * src/engine/entities-store/ui/UiEntity.spec.ts
 * Unit tests for UiEntity
 */

import { UiEntity } from "./UiEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("UiEntity", () => {
    it("should initialize with default values", () => {
        const entity = new UiEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.UI);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("li");
    });

    it("should initialize with provided values", () => {
        const data = "Bullet item";
        const entity = new UiEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
