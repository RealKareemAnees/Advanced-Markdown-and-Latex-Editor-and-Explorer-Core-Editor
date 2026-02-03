/**
 * src/engine/entities-store/toggle/ToggleEntity.spec.ts
 * Unit tests for ToggleEntity
 */

import { ToggleEntity } from "./ToggleEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("ToggleEntity", () => {
    it("should initialize with default values", () => {
        const entity = new ToggleEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.TOGGLE);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({ opened: false });
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("details");
    });

    it("should initialize with provided values", () => {
        const data = "Toggle heading";
        const options = { opened: true };
        const entity = new ToggleEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
